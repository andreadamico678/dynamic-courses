import React, { useEffect, useState } from 'react';

type MeasureMode = '72ch' | '104ch' | '100%';
type FontMode = 'sans' | 'serif';

interface StudyPrefs {
  measure: MeasureMode;
  font: FontMode;
  size: number;
}

const DEFAULT_PREFS: StudyPrefs = {
  measure: '100%',
  font: 'sans',
  size: 16,
};

const STORAGE_KEY = 'dc-study-prefs';

function readPrefs(): StudyPrefs {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_PREFS;
    const parsed = JSON.parse(raw);
    return {
      measure: parsed.measure ?? DEFAULT_PREFS.measure,
      font: parsed.font === 'serif' ? 'serif' : 'sans',
      size: typeof parsed.size === 'number' ? Math.min(20, Math.max(14, parsed.size)) : 16,
    };
  } catch {
    return DEFAULT_PREFS;
  }
}

function applyPrefs(prefs: StudyPrefs): void {
  const root = document.documentElement;
  root.style.setProperty('--dc-measure', prefs.measure);
  root.style.setProperty(
    '--dc-font-body',
    prefs.font === 'serif' ? 'var(--dc-font-serif)' : 'var(--sl-font)',
  );
  root.style.setProperty('--dc-body-size', `${prefs.size}px`);
}

export default function StudyWorkspace() {
  const [open, setOpen] = useState(false);
  const [prefs, setPrefs] = useState<StudyPrefs>(DEFAULT_PREFS);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const [highlightCount, setHighlightCount] = useState(0);

  const syncHighlightCount = () => {
    setHighlightCount(document.querySelectorAll('mark.dc-hl').length > 0 ? getSavedCount() : 0);
  };

  useEffect(() => {
    const initial = readPrefs();
    setPrefs(initial);
    applyPrefs(initial);

    const onUpdate = () => syncHighlightCount();
    syncHighlightCount();
    window.addEventListener('dc-highlights-changed', onUpdate);
    document.addEventListener('astro:page-load', onUpdate);
    return () => {
      window.removeEventListener('dc-highlights-changed', onUpdate);
      document.removeEventListener('astro:page-load', onUpdate);
    };
  }, []);

  const updatePrefs = (next: StudyPrefs) => {
    setPrefs(next);
    applyPrefs(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // Ignore storage errors
    }
  };

  const toggleAllSolutions = () => {
    const details = document.querySelectorAll('details.dc-solution');
    const nextOpen = !solutionsOpen;
    details.forEach((el) => {
      if (nextOpen) el.setAttribute('open', '');
      else el.removeAttribute('open');
    });
    setSolutionsOpen(nextOpen);
  };

  const clearPageHighlights = () => {
    window.dispatchEvent(new CustomEvent('dc-clear-highlights'));
  };

  return (
    <div className="dc-workspace-dock">
      {open && (
        <div className="dc-workspace-panel" role="dialog" aria-label="Reader settings">
          <div className="dc-workspace-row">
            <span className="dc-workspace-label">Width</span>
            <div className="dc-seg">
              {(['72ch', '104ch', '100%'] as MeasureMode[]).map((m) => (
                <button
                  key={m}
                  type="button"
                  className={prefs.measure === m ? 'is-active' : ''}
                  onClick={() => updatePrefs({ ...prefs, measure: m })}
                >
                  {m === '100%' ? 'Wide' : m === '104ch' ? 'Med' : 'Narrow'}
                </button>
              ))}
            </div>
          </div>

          <div className="dc-workspace-row">
            <span className="dc-workspace-label">Font</span>
            <div className="dc-seg">
              {(['sans', 'serif'] as FontMode[]).map((f) => (
                <button
                  key={f}
                  type="button"
                  className={prefs.font === f ? 'is-active' : ''}
                  onClick={() => updatePrefs({ ...prefs, font: f })}
                >
                  {f === 'sans' ? 'Sans' : 'Serif'}
                </button>
              ))}
            </div>
          </div>

          <div className="dc-workspace-row">
            <span className="dc-workspace-label">Scale</span>
            <div className="dc-seg">
              <button
                type="button"
                onClick={() => updatePrefs({ ...prefs, size: Math.max(14, prefs.size - 1) })}
              >
                A−
              </button>
              <button type="button" className="is-active" disabled>
                {prefs.size}px
              </button>
              <button
                type="button"
                onClick={() => updatePrefs({ ...prefs, size: Math.min(20, prefs.size + 1) })}
              >
                A+
              </button>
            </div>
          </div>

          <div className="dc-workspace-row">
            <span className="dc-workspace-label">Solutions</span>
            <button type="button" className="dc-btn" onClick={toggleAllSolutions}>
              {solutionsOpen ? 'Collapse All' : 'Expand All'}
            </button>
          </div>
        </div>
      )}

      <div className="dc-workspace-bar">
        {highlightCount > 0 && (
          <div className="dc-hl-status">
            <span>{highlightCount} marked</span>
            <button type="button" className="dc-hl-clear" onClick={clearPageHighlights}>
              Clear
            </button>
          </div>
        )}
        <button type="button" className="dc-btn" onClick={() => setOpen((v) => !v)}>
          {open ? 'Close View' : 'View'}
        </button>
      </div>
    </div>
  );
}

function getSavedCount(): number {
  try {
    const raw = window.localStorage.getItem(`dc-highlights:${window.location.pathname}`);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed.length : 0;
  } catch {
    return 0;
  }
}
