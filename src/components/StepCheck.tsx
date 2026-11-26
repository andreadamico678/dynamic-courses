import React, { useState } from 'react';
import MathText from './MathText';

interface NumericProps {
  mode?: 'numeric';
  prompt: string;
  expected: number;
  tolerance?: number;
  unit?: string;
  explanation?: string;
  lang?: 'en' | 'it';
}

interface ChoiceProps {
  mode: 'choice';
  prompt: string;
  options: string[];
  correctIndex: number;
  explanation?: string;
  lang?: 'en' | 'it';
}

type StepCheckProps = NumericProps | ChoiceProps;

const CHOICE_KEYS = ['A', 'B', 'C', 'D', 'E', 'F'];

export default function StepCheck(props: StepCheckProps) {
  const [input, setInput] = useState('');
  const [selected, setSelected] = useState<number | null>(null);
  const [status, setStatus] = useState<'idle' | 'ok' | 'err'>('idle');
  const isIt = props.lang === 'it';

  const checkNumeric = (e: React.FormEvent) => {
    e.preventDefault();
    if (props.mode === 'choice') return;
    const val = Number(input.trim().replace(',', '.'));
    if (!Number.isFinite(val)) {
      setStatus('err');
      return;
    }
    const tol = props.tolerance ?? 0.05;
    setStatus(Math.abs(val - props.expected) <= tol ? 'ok' : 'err');
  };

  const pickChoice = (idx: number) => {
    if (props.mode !== 'choice') return;
    setSelected(idx);
    setStatus(idx === props.correctIndex ? 'ok' : 'err');
  };

  return (
    <div className="dc-step-box not-content">
      <div className="dc-step-prompt">
        <MathText text={props.prompt} />
      </div>

      {props.mode === 'choice' ? (
        <div className="dc-choice-list" role="radiogroup">
          {props.options.map((opt, idx) => {
            const isPicked = selected === idx;
            const stateClass = isPicked
              ? status === 'ok'
                ? 'is-ok'
                : 'is-err'
              : '';
            return (
              <button
                key={idx}
                type="button"
                className={`dc-choice-btn ${stateClass}`}
                aria-pressed={isPicked}
                onClick={() => pickChoice(idx)}
              >
                <span className="dc-choice-key">{CHOICE_KEYS[idx] ?? idx + 1}</span>
                <span className="dc-choice-text">
                  <MathText text={opt} />
                </span>
              </button>
            );
          })}
        </div>
      ) : (
        <form onSubmit={checkNumeric} className="dc-numeric-form">
          <input
            type="text"
            className="dc-input"
            placeholder={isIt ? 'Inserisci valore...' : 'Enter number...'}
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              setStatus('idle');
            }}
          />
          {props.unit && (
            <span className="dc-unit">
              <MathText text={props.unit} />
            </span>
          )}
          <button type="submit" className="dc-btn dc-btn-primary">
            {isIt ? 'Verifica' : 'Check'}
          </button>
        </form>
      )}

      {status === 'ok' && (
        <div className="dc-feedback dc-feedback-ok">
          <strong>{isIt ? '✓ Corretto!' : '✓ Correct!'}</strong>{' '}
          {props.explanation ? <MathText text={props.explanation} /> : null}
        </div>
      )}
      {status === 'err' && (
        <div className="dc-feedback dc-feedback-err">
          {props.mode === 'choice'
            ? isIt
              ? '✕ Risposta errata — ripensa al meccanismo e riprova.'
              : '✕ Not quite — rethink the underlying mechanism and try again.'
            : isIt
              ? '✕ Risposta errata — ricontrolla segni, unità di misura o formule e riprova.'
              : '✕ Not quite — double check your signs, corner order, or units and try again.'}
        </div>
      )}
    </div>
  );
}
