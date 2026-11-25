import React, { useMemo, useState } from 'react';
import MathText from './MathText';

interface MindMapProps {
  title?: string;
  markdown: string;
  lang?: 'en' | 'it';
  defaultCollapsed?: boolean;
}

interface TreeNode {
  id: string;
  label: string;
  children: TreeNode[];
}

function parseOutline(markdown: string, fallbackRoot: string): TreeNode {
  const lines = markdown
    .split(/\r?\n/)
    .map((l) => l.replace(/\t/g, '  '))
    .filter((l) => l.trim().length > 0);

  let rootLabel = fallbackRoot;
  const startIdx = lines[0]?.trim().startsWith('#') ? 1 : 0;
  if (startIdx === 1) {
    rootLabel = lines[0].trim().replace(/^#+\s*/, '');
  }

  const root: TreeNode = { id: 'root', label: rootLabel, children: [] };
  const stack: { indent: number; node: TreeNode }[] = [{ indent: -1, node: root }];

  lines.slice(startIdx).forEach((raw, idx) => {
    const match = raw.match(/^(\s*)[-*+]\s+(.*)$/);
    const indent = match ? match[1].length : raw.search(/\S/);
    const label = (match ? match[2] : raw.trim()).trim();
    if (!label) return;

    while (stack.length > 1 && stack[stack.length - 1].indent >= indent) {
      stack.pop();
    }

    const parent = stack[stack.length - 1].node;
    const node: TreeNode = { id: `n-${idx}`, label, children: [] };
    parent.children.push(node);
    stack.push({ indent, node });
  });

  return root;
}

function MindMapBranch({
  node,
  depth,
  openMap,
  onToggle,
}: {
  node: TreeNode;
  depth: number;
  openMap: Record<string, boolean>;
  onToggle: (id: string) => void;
}) {
  const hasKids = node.children.length > 0;
  const isOpen = openMap[node.id] ?? true;

  return (
    <li className={`dc-mm-item dc-mm-depth-${Math.min(depth, 3)}`}>
      <div className="dc-mm-row">
        {hasKids ? (
          <button
            type="button"
            className="dc-mm-node dc-mm-branch-btn"
            aria-expanded={isOpen}
            onClick={() => onToggle(node.id)}
          >
            <span className="dc-mm-caret" aria-hidden="true">
              {isOpen ? '▾' : '▸'}
            </span>
            <span>
              <MathText text={node.label} />
            </span>
          </button>
        ) : (
          <span className="dc-mm-node dc-mm-leaf">
            <span className="dc-mm-dot" aria-hidden="true" />
            <span>
              <MathText text={node.label} />
            </span>
          </span>
        )}
      </div>

      {hasKids && isOpen && (
        <ul className="dc-mm-list">
          {node.children.map((child) => (
            <MindMapBranch
              key={child.id}
              node={child}
              depth={depth + 1}
              openMap={openMap}
              onToggle={onToggle}
            />
          ))}
        </ul>
      )}
    </li>
  );
}

export default function MindMap({
  title,
  markdown,
  lang = 'en',
  defaultCollapsed = false,
}: MindMapProps) {
  const isIt = lang === 'it';
  const resolvedTitle = title ?? (isIt ? 'Mappa del Capitolo' : 'Chapter Mind Map');
  const tree = useMemo(() => parseOutline(markdown, resolvedTitle), [markdown, resolvedTitle]);
  const [collapsed, setCollapsed] = useState(defaultCollapsed);
  const [openMap, setOpenMap] = useState<Record<string, boolean>>({});

  const toggleNode = (id: string) => {
    setOpenMap((prev) => ({ ...prev, [id]: !(prev[id] ?? true) }));
  };

  const setAll = (open: boolean) => {
    const next: Record<string, boolean> = {};
    const walk = (n: TreeNode) => {
      if (n.children.length > 0) {
        next[n.id] = open;
        n.children.forEach(walk);
      }
    };
    tree.children.forEach(walk);
    setOpenMap(next);
  };

  return (
    <div className="dc-widget dc-mindmap not-content">
      <div className="dc-widget-header">
        <div className="dc-widget-heading">
          <span className="dc-badge">{isIt ? 'Mappa Concettuale' : 'Concept Map'}</span>
          <span className="dc-widget-title">
            <MathText text={resolvedTitle} />
          </span>
        </div>
        <div className="dc-btn-group">
          {!collapsed && (
            <>
              <button type="button" className="dc-btn" onClick={() => setAll(true)}>
                {isIt ? 'Espandi' : 'Expand All'}
              </button>
              <button type="button" className="dc-btn" onClick={() => setAll(false)}>
                {isIt ? 'Comprimi' : 'Collapse All'}
              </button>
            </>
          )}
          <button
            type="button"
            className="dc-btn"
            onClick={() => setCollapsed((v) => !v)}
          >
            {collapsed
              ? isIt
                ? 'Mostra Mappa'
                : 'Show Map'
              : isIt
                ? 'Nascondi Mappa'
                : 'Hide Map'}
          </button>
        </div>
      </div>

      {!collapsed && (
        <div className="dc-mm-canvas">
          <div className="dc-mm-root">
            <MathText text={tree.label} />
          </div>
          <ul className="dc-mm-list dc-mm-list-root">
            {tree.children.map((child) => (
              <MindMapBranch
                key={child.id}
                node={child}
                depth={1}
                openMap={openMap}
                onToggle={toggleNode}
              />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
