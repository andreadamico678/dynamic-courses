import React, { useState } from 'react';
import MathText from './MathText';

interface ExerciseProps {
  id?: string;
  title: string;
  level?: string;
  difficulty?: string;
  hint?: string;
  lang?: 'en' | 'it';
  children?: React.ReactNode;
}

export default function Exercise({
  id,
  title,
  level,
  difficulty,
  hint,
  lang = 'en',
  children,
}: ExerciseProps) {
  const [showHint, setShowHint] = useState(false);
  const isIt = lang === 'it';
  const resolvedLevel =
    level ?? difficulty ?? (isIt ? 'Livello 1 · Base' : 'Level 1 · Warm-Up');

  return (
    <section id={id} className="dc-exercise">
      <div className="dc-widget-header not-content">
        <div className="dc-widget-title">
          <MathText text={title} />
        </div>
        <span className="dc-badge">{resolvedLevel}</span>
      </div>

      <div className="dc-exercise-body">{children}</div>

      {hint && (
        <div className="dc-exercise-hint not-content">
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
            <div className="dc-hint-box">
              <strong>{isIt ? 'Suggerimento:' : 'Hint:'}</strong>{' '}
              <MathText text={hint} />
            </div>
          )}
        </div>
      )}
    </section>
  );
}
