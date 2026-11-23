import React, { useState } from 'react';

interface ExerciseProps {
  id: string;
  title: string;
  level?: string;
  hint?: string;
  lang?: 'en' | 'it';
  children?: React.ReactNode;
}

export default function Exercise({
  id,
  title,
  level,
  hint,
  lang = 'en',
  children,
}: ExerciseProps) {
  const [showHint, setShowHint] = useState(false);
  const isIt = lang === 'it';
  const resolvedLevel = level ?? (isIt ? 'Livello 1 · Base' : 'Level 1 · Warm-Up');

  return (
    <section id={id} className="dc-exercise">
      <div className="dc-widget-header">
        <div className="dc-widget-title">{title}</div>
        <span className="dc-badge">{resolvedLevel}</span>
      </div>

      <div>{children}</div>

      {hint && (
        <div style={{ marginTop: '0.85rem' }}>
          <button
            type="button"
            className="dc-btn"
            onClick={() => setShowHint((v) => !v)}
          >
            {showHint
              ? isIt
                ? 'Nascondi Suggerimento'
                : 'Hide Hint'
              : isIt
                ? 'Mostra Suggerimento'
                : 'Show Hint'}
          </button>
          {showHint && (
            <div className="dc-step-box" style={{ borderLeft: '3px solid var(--sl-color-accent)' }}>
              <strong>{isIt ? 'Suggerimento:' : 'Hint:'}</strong> {hint}
            </div>
          )}
        </div>
      )}
    </section>
  );
}
