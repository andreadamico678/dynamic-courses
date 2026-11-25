import React, { useEffect, useRef, useState } from 'react';

type HighlightColor = 'yellow' | 'blue' | 'green';

interface SavedHighlight {
  id: string;
  color: HighlightColor;
  start: number;
  end: number;
  text: string;
}

interface ToolbarState {
  x: number;
  y: number;
  mode: 'new' | 'edit';
  activeId?: string;
}

const COLORS: { id: HighlightColor; label: string; swatch: string }[] = [
  { id: 'yellow', label: 'Yellow highlight', swatch: '#facc15' },
  { id: 'blue', label: 'Blue highlight', swatch: '#38bdf8' },
  { id: 'green', label: 'Green highlight', swatch: '#4ade80' },
];

const EXCLUDED_SELECTOR =
  'script, style, button, input, textarea, select, .katex, .dc-hl-toolbar, .dc-hl-status, .dc-mindmap-svg, .expressive-code';

function getStorageKey(): string {
  return `dc-highlights:${window.location.pathname}`;
}

function getEligibleTextNodes(root: HTMLElement): Text[] {
  const nodes: Text[] = [];
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      const parent = node.parentElement;
      if (!parent) return NodeFilter.FILTER_REJECT;
      if (parent.closest(EXCLUDED_SELECTOR)) return NodeFilter.FILTER_REJECT;
      if (!node.nodeValue || node.nodeValue.length === 0) return NodeFilter.FILTER_REJECT;
      return NodeFilter.FILTER_ACCEPT;
    },
  });
  let current = walker.nextNode();
  while (current) {
    nodes.push(current as Text);
    current = walker.nextNode();
  }
  return nodes;
}

function computeGlobalOffset(root: HTMLElement, targetNode: Node, targetOffset: number): number | null {
  const range = document.createRange();
  const nodes = getEligibleTextNodes(root);
  let total = 0;

  for (const node of nodes) {
    if (node === targetNode) {
      return total + targetOffset;
    }
    range.selectNodeContents(node);
    const cmpStart = range.comparePoint(targetNode, targetOffset);
    if (cmpStart <= 0) {
      return total;
    }
    total += node.nodeValue?.length ?? 0;
  }
  return total;
}

function wrapOffsetRange(root: HTMLElement, start: number, end: number, id: string, color: HighlightColor): boolean {
  if (end <= start) return false;
  const nodes = getEligibleTextNodes(root);
  const slices: { node: Text; localStart: number; localEnd: number }[] = [];
  let cursor = 0;

  for (const node of nodes) {
    const len = node.nodeValue?.length ?? 0;
    const nodeStart = cursor;
    const nodeEnd = cursor + len;
    cursor = nodeEnd;

    if (nodeEnd <= start) continue;
    if (nodeStart >= end) break;

    const localStart = Math.max(0, start - nodeStart);
    const localEnd = Math.min(len, end - nodeStart);
    if (localEnd > localStart && node.nodeValue?.slice(localStart, localEnd).trim() !== '') {
      slices.push({ node, localStart, localEnd });
    }
  }

  if (slices.length === 0) return false;

  for (const { node, localStart, localEnd } of slices) {
    if (node.parentElement?.closest('mark.dc-hl')) continue;
    let target: Text = node;
    if (localEnd < (target.nodeValue?.length ?? 0)) {
      target.splitText(localEnd);
    }
    if (localStart > 0) {
      target = target.splitText(localStart);
    }
    const mark = document.createElement('mark');
    mark.className = `dc-hl dc-hl-${color}`;
    mark.dataset.hlId = id;
    mark.title = 'Click to change color or remove highlight';
    target.parentNode?.insertBefore(mark, target);
    mark.appendChild(target);
  }

  return true;
}

function unwrapHighlightById(root: HTMLElement, id: string): void {
  const marks = root.querySelectorAll(`mark.dc-hl[data-hl-id="${CSS.escape(id)}"]`);
  marks.forEach((mark) => {
    const parent = mark.parentNode;
    if (!parent) return;
    while (mark.firstChild) {
      parent.insertBefore(mark.firstChild, mark);
    }
    parent.removeChild(mark);
    parent.normalize();
  });
}

function clearAllDomHighlights(root: HTMLElement): void {
  const marks = root.querySelectorAll('mark.dc-hl');
  marks.forEach((mark) => {
    const parent = mark.parentNode;
    if (!parent) return;
    while (mark.firstChild) {
      parent.insertBefore(mark.firstChild, mark);
    }
    parent.removeChild(mark);
    parent.normalize();
  });
}

function readSaved(): SavedHighlight[] {
  try {
    const raw = window.localStorage.getItem(getStorageKey());
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeSaved(items: SavedHighlight[]): void {
  try {
    if (items.length === 0) {
      window.localStorage.removeItem(getStorageKey());
    } else {
      window.localStorage.setItem(getStorageKey(), JSON.stringify(items));
    }
  } catch {
    // Ignore storage quota errors
  }
  window.dispatchEvent(new CustomEvent('dc-highlights-changed'));
}

export default function TextHighlighter() {
  const [toolbar, setToolbar] = useState<ToolbarState | null>(null);
  const pendingRangeRef = useRef<Range | null>(null);

  const getRoot = (): HTMLElement | null => document.querySelector('.sl-markdown-content');

  const restoreAll = () => {
    const root = getRoot();
    if (!root) return;
    clearAllDomHighlights(root);
    const saved = readSaved();
    for (const item of saved) {
      wrapOffsetRange(root, item.start, item.end, item.id, item.color);
    }
    window.dispatchEvent(new CustomEvent('dc-highlights-changed'));
  };

  useEffect(() => {
    restoreAll();

    const handlePageLoad = () => {
      setToolbar(null);
      pendingRangeRef.current = null;
      restoreAll();
    };

    const handleClearEvent = () => {
      const root = getRoot();
      if (root) clearAllDomHighlights(root);
      writeSaved([]);
      setToolbar(null);
    };

    const positionFromRect = (rect: DOMRect) => {
      const x = Math.min(Math.max(rect.left + rect.width / 2, 110), window.innerWidth - 110);
      const y = Math.max(rect.top - 46, 56);
      return { x, y };
    };

    const handleMouseUp = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (target?.closest('.dc-hl-toolbar, .dc-workspace-dock')) return;

      const root = getRoot();
      if (!root) return;

      window.setTimeout(() => {
        const sel = window.getSelection();
        if (sel && !sel.isCollapsed && sel.rangeCount > 0) {
          const range = sel.getRangeAt(0);
          const text = sel.toString().trim();
          if (
            text.length > 0 &&
            root.contains(range.commonAncestorContainer) &&
            !(range.startContainer.parentElement?.closest(EXCLUDED_SELECTOR))
          ) {
            pendingRangeRef.current = range.cloneRange();
            const pos = positionFromRect(range.getBoundingClientRect());
            setToolbar({ ...pos, mode: 'new' });
            return;
          }
        }

        const mark = target?.closest('mark.dc-hl') as HTMLElement | null;
        if (mark && root.contains(mark) && mark.dataset.hlId) {
          pendingRangeRef.current = null;
          const pos = positionFromRect(mark.getBoundingClientRect());
          setToolbar({ ...pos, mode: 'edit', activeId: mark.dataset.hlId });
          return;
        }

        setToolbar(null);
        pendingRangeRef.current = null;
      }, 10);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setToolbar(null);
        pendingRangeRef.current = null;
      }
    };

    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('astro:page-load', handlePageLoad);
    window.addEventListener('dc-clear-highlights', handleClearEvent);

    return () => {
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('astro:page-load', handlePageLoad);
      window.removeEventListener('dc-clear-highlights', handleClearEvent);
    };
  }, []);

  const applyNewHighlight = (color: HighlightColor) => {
    const root = getRoot();
    const range = pendingRangeRef.current;
    if (!root || !range) return;

    const start = computeGlobalOffset(root, range.startContainer, range.startOffset);
    const end = computeGlobalOffset(root, range.endContainer, range.endOffset);
    const text = range.toString();

    if (start === null || end === null || end <= start) {
      setToolbar(null);
      return;
    }

    const id = `hl-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    if (wrapOffsetRange(root, start, end, id, color)) {
      const next = [...readSaved(), { id, color, start, end, text }];
      writeSaved(next);
    }

    window.getSelection()?.removeAllRanges();
    pendingRangeRef.current = null;
    setToolbar(null);
  };

  const recolorActive = (color: HighlightColor) => {
    const root = getRoot();
    if (!root || !toolbar?.activeId) return;
    const marks = root.querySelectorAll(`mark.dc-hl[data-hl-id="${CSS.escape(toolbar.activeId)}"]`);
    marks.forEach((mark) => {
      mark.className = `dc-hl dc-hl-${color}`;
    });
    const next = readSaved().map((item) =>
      item.id === toolbar.activeId ? { ...item, color } : item,
    );
    writeSaved(next);
    setToolbar(null);
  };

  const removeActive = () => {
    const root = getRoot();
    if (!root || !toolbar?.activeId) return;
    unwrapHighlightById(root, toolbar.activeId);
    const next = readSaved().filter((item) => item.id !== toolbar.activeId);
    writeSaved(next);
    setToolbar(null);
  };

  if (!toolbar) return null;

  return (
    <div
      className="dc-hl-toolbar"
      role="toolbar"
      aria-label="Highlight text"
      style={{ left: `${toolbar.x}px`, top: `${toolbar.y}px` }}
    >
      {COLORS.map((c) => (
        <button
          key={c.id}
          type="button"
          className="dc-hl-swatch"
          aria-label={c.label}
          title={c.label}
          style={{ background: c.swatch }}
          onClick={() =>
            toolbar.mode === 'new' ? applyNewHighlight(c.id) : recolorActive(c.id)
          }
        />
      ))}
      {toolbar.mode === 'edit' && (
        <button type="button" className="dc-hl-action" onClick={removeActive}>
          Remove
        </button>
      )}
    </div>
  );
}
