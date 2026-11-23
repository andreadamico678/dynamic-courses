import React, { useState } from 'react';

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
    <div className="dc-step-box">
      <div style={{ fontWeight: 600, marginBottom: '0.5rem' }}>{props.prompt}</div>

      {props.mode === 'choice' ? (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          {props.options.map((opt, idx) => (
            <button
              key={idx}
              type="button"
              className="dc-btn"
              style={{
                borderColor:
                  selected === idx
                    ? status === 'ok'
                      ? '#10b981'
                      : '#ef4444'
                    : undefined,
              }}
              onClick={() => pickChoice(idx)}
            >
              {opt}
            </button>
          ))}
        </div>
      ) : (
        <form
          onSubmit={checkNumeric}
          style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.55rem' }}
        >
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
          {props.unit && <span style={{ fontSize: '0.88rem', opacity: 0.8 }}>{props.unit}</span>}
          <button type="submit" className="dc-btn dc-btn-primary">
            {isIt ? 'Verifica' : 'Check'}
          </button>
        </form>
      )}

      {status === 'ok' && (
        <div className="dc-feedback-ok" style={{ marginTop: '0.5rem' }}>
          {isIt ? '✓ Corretto!' : '✓ Correct!'} {props.explanation ?? ''}
        </div>
      )}
      {status === 'err' && (
        <div className="dc-feedback-err" style={{ marginTop: '0.5rem' }}>
          {isIt
            ? '✕ Risposta errata — ricontrolla segni, unità di misura o formule e riprova.'
            : '✕ Not quite — double check your signs, corner order, or units and try again.'}
        </div>
      )}
    </div>
  );
}
