import React, { useState } from 'react';

export default function AmdahlExplorer() {
  const [fraction, setFraction] = useState(0.75);
  const [speedup, setSpeedup] = useState(4);

  const unenhanced = 1 - fraction;
  const enhancedAfter = fraction / speedup;
  const newTime = unenhanced + enhancedAfter;
  const overallSpeedup = 1 / newTime;
  const maxSpeedup = fraction >= 0.999 ? Infinity : 1 / unenhanced;

  const W = 360;
  const H = 190;
  const padL = 38;
  const padR = 16;
  const padT = 18;
  const padB = 28;
  const plotW = W - padL - padR;
  const plotH = H - padT - padB;
  const yMax = Math.min(20, Math.max(6, Math.ceil((isFinite(maxSpeedup) ? maxSpeedup : 20) * 1.15)));

  const toX = (s: number) => padL + ((s - 1) / 31) * plotW;
  const toY = (val: number) => padT + plotH - (Math.min(val, yMax) / yMax) * plotH;

  const points: string[] = [];
  for (let s = 1; s <= 32; s += 0.5) {
    const st = 1 / ((1 - fraction) + fraction / s);
    points.push(`${toX(s).toFixed(1)},${toY(st).toFixed(1)}`);
  }

  return (
    <div className="dc-widget not-content">
      <div className="dc-widget-header">
        <div className="dc-widget-heading">
          <span className="dc-badge">Interactive Lab</span>
          <span className="dc-widget-title">Amdahl&apos;s Law &amp; Asymptotic Speedup Ceiling</span>
        </div>
        <span style={{ fontWeight: 700, fontSize: '0.88rem', color: 'var(--dc-ok)' }}>
          S_tot = {overallSpeedup.toFixed(2)}× (Ceiling: {isFinite(maxSpeedup) ? `${maxSpeedup.toFixed(2)}×` : '∞'})
        </span>
      </div>

      <div className="dc-controls">
        <label style={{ flex: 1, minWidth: '190px' }}>
          <span>Enhanced Fraction F = {(fraction * 100).toFixed(0)}%</span>
          <input
            type="range"
            min={0.05}
            max={0.95}
            step={0.05}
            value={fraction}
            onChange={(e) => setFraction(Number(e.target.value))}
          />
        </label>
        <label style={{ flex: 1, minWidth: '190px' }}>
          <span>Local Speedup S = {speedup}×</span>
          <input
            type="range"
            min={1}
            max={32}
            step={1}
            value={speedup}
            onChange={(e) => setSpeedup(Number(e.target.value))}
          />
        </label>
        <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
          <button type="button" className="dc-btn" onClick={() => { setFraction(0.75); setSpeedup(4); }}>
            F=75%, S=4×
          </button>
          <button type="button" className="dc-btn" onClick={() => { setFraction(0.9); setSpeedup(10); }}>
            F=90%, S=10×
          </button>
          <button type="button" className="dc-btn" onClick={() => { setFraction(0.5); setSpeedup(32); }}>
            F=50% Bottleneck
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem', alignItems: 'center' }}>
        <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', height: 'auto', display: 'block' }}>
          <line x1={padL} y1={padT} x2={padL} y2={padT + plotH} stroke="var(--dc-border)" />
          <line x1={padL} y1={padT + plotH} x2={padL + plotW} y2={padT + plotH} stroke="var(--dc-border)" />
          {isFinite(maxSpeedup) && maxSpeedup <= yMax && (
            <>
              <line
                x1={padL}
                y1={toY(maxSpeedup)}
                x2={padL + plotW}
                y2={toY(maxSpeedup)}
                stroke="var(--dc-warn)"
                strokeDasharray="4 3"
              />
              <text x={padL + 6} y={toY(maxSpeedup) - 4} fontSize="10" fill="var(--dc-warn)">
                Max = 1/(1−F) = {maxSpeedup.toFixed(2)}×
              </text>
            </>
          )}
          <polyline fill="none" stroke="var(--dc-accent)" strokeWidth="2.2" points={points.join(' ')} />
          <circle cx={toX(speedup)} cy={toY(overallSpeedup)} r={4.5} fill="var(--dc-ok)" />
          <text x={padL + plotW / 2} y={H - 6} textAnchor="middle" fontSize="10.5" fill="var(--dc-muted)">
            Local Speedup S (1× → 32×)
          </text>
          <text x={12} y={padT + plotH / 2} textAnchor="middle" fontSize="10.5" fill="var(--dc-muted)" transform={`rotate(-90 12 ${padT + plotH / 2})`}>
            S_tot
          </text>
        </svg>

        <div style={{ fontSize: '0.88rem' }}>
          <div style={{ marginBottom: '0.55rem', fontWeight: 600 }}>Normalized Execution Time</div>
          <div style={{ marginBottom: '0.35rem', fontSize: '0.8rem', color: 'var(--dc-muted)' }}>Before (100%):</div>
          <div style={{ display: 'flex', height: '22px', borderRadius: '4px', overflow: 'hidden', marginBottom: '0.65rem', border: '1px solid var(--dc-border)' }}>
            <div style={{ width: `${unenhanced * 100}%`, background: 'var(--dc-warn)', opacity: 0.75 }} title="Unenhanced (1 - F)" />
            <div style={{ width: `${fraction * 100}%`, background: 'var(--dc-accent)', opacity: 0.75 }} title="Enhanced (F)" />
          </div>
          <div style={{ marginBottom: '0.35rem', fontSize: '0.8rem', color: 'var(--dc-muted)' }}>
            After ({(newTime * 100).toFixed(1)}% = {(unenhanced * 100).toFixed(1)}% serial + {(enhancedAfter * 100).toFixed(1)}% accelerated):
          </div>
          <div style={{ display: 'flex', height: '22px', borderRadius: '4px', overflow: 'hidden', border: '1px solid var(--dc-border)' }}>
            <div style={{ width: `${unenhanced * 100}%`, background: 'var(--dc-warn)', opacity: 0.85 }} />
            <div style={{ width: `${enhancedAfter * 100}%`, background: 'var(--dc-ok)', opacity: 0.85 }} />
          </div>
        </div>
      </div>
    </div>
  );
}
