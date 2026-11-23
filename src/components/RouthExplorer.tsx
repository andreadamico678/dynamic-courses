import React, { useMemo, useState } from 'react';

interface Complex {
  re: number;
  im: number;
}

// Durand-Kerner root solver for s^3 + 7 s^2 + 14 s + (8 + K) = 0
function solveCubicRoots(k: number): Complex[] {
  const c2 = 7;
  const c1 = 14;
  const c0 = 8 + k;
  const evalPoly = (z: Complex): Complex => {
    const z2 = { re: z.re * z.re - z.im * z.im, im: 2 * z.re * z.im };
    const z3 = { re: z2.re * z.re - z2.im * z.im, im: z2.re * z.im + z2.im * z.re };
    return {
      re: z3.re + c2 * z2.re + c1 * z.re + c0,
      im: z3.im + c2 * z2.im + c1 * z.im,
    };
  };
  let roots: Complex[] = [
    { re: -0.9, im: 0.2 },
    { re: -2.1, im: 1.7 },
    { re: -4.0, im: -1.9 },
  ];
  for (let iter = 0; iter < 50; iter++) {
    roots = roots.map((r, i) => {
      const num = evalPoly(r);
      let den: Complex = { re: 1, im: 0 };
      for (let j = 0; j < 3; j++) {
        if (i === j) continue;
        const d = { re: r.re - roots[j].re, im: r.im - roots[j].im };
        den = { re: den.re * d.re - den.im * d.im, im: den.re * d.im + den.im * d.re };
      }
      const mag2 = den.re * den.re + den.im * den.im + 1e-14;
      const q = {
        re: (num.re * den.re + num.im * den.im) / mag2,
        im: (num.im * den.re - num.re * den.im) / mag2,
      };
      return { re: r.re - q.re, im: r.im - q.im };
    });
  }
  return roots;
}

export default function RouthExplorer() {
  const [k, setK] = useState(20);

  const b1 = (90 - k) / 7;
  const a0 = 8 + k;
  const roots = useMemo(() => solveCubicRoots(k), [k]);

  const col1 = [1, 7, b1, a0];
  let signChanges = 0;
  for (let i = 0; i < col1.length - 1; i++) {
    if (col1[i] * col1[i + 1] < 0) signChanges++;
  }
  const isCritical = Math.abs(k - 90) < 1e-6 || Math.abs(k + 8) < 1e-6;
  const statusText = isCritical
    ? 'Boundary (Marginal / Zero Row)'
    : signChanges === 0 && b1 > 0 && a0 > 0
      ? 'Asymptotically Stable'
      : `Unstable (${signChanges} RHP root${signChanges === 1 ? '' : 's'})`;

  // s-plane coordinates
  const W = 320;
  const H = 220;
  const toX = (re: number) => 20 + ((re - -8) / (3 - -8)) * (W - 40);
  const toY = (im: number) => 16 + ((6 - im) / (6 - -6)) * (H - 32);

  return (
    <div className="dc-widget">
      <div className="dc-widget-header">
        <div>
          <span className="dc-badge">Interactive Lab</span>{' '}
          <span className="dc-widget-title">Parametric Routh Table &amp; Pole Migration</span>
        </div>
        <span
          style={{
            fontWeight: 700,
            fontSize: '0.86rem',
            color: isCritical ? '#f59e0b' : signChanges === 0 ? '#10b981' : '#ef4444',
          }}
        >
          {statusText}
        </span>
      </div>

      <p style={{ margin: '0 0 0.75rem', fontSize: '0.9rem' }}>
        Closed-loop polynomial: <code>s³ + 7s² + 14s + (8 + K) = 0</code> (stability window:{' '}
        <code>-8 &lt; K &lt; 90</code>, critical oscillation at{' '}
        <code>K_crit = 90 ⇒ ω_osc = √14 ≈ 3.74 rad/s</code>).
      </p>

      <div className="dc-controls">
        <label style={{ flex: 1, minWidth: '220px' }}>
          <span>Gain K = {k}</span>
          <input
            type="range"
            min={-12}
            max={115}
            step={1}
            value={k}
            onChange={(e) => setK(Number(e.target.value))}
          />
        </label>
        <div style={{ display: 'flex', gap: '0.45rem', flexWrap: 'wrap' }}>
          <button type="button" className="dc-btn" onClick={() => setK(20)}>
            K = 20 (Stable)
          </button>
          <button type="button" className="dc-btn" onClick={() => setK(90)}>
            K = 90 (K_crit)
          </button>
          <button type="button" className="dc-btn" onClick={() => setK(105)}>
            K = 105 (Unstable)
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem', alignItems: 'center' }}>
        <table style={{ width: '100%', fontSize: '0.9rem', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ textAlign: 'left', padding: '0.35rem' }}>Row</th>
              <th style={{ textAlign: 'left', padding: '0.35rem' }}>Col 1 (Pivot)</th>
              <th style={{ textAlign: 'left', padding: '0.35rem' }}>Col 2</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: '0.35rem' }}>s³</td>
              <td style={{ padding: '0.35rem' }}>+1</td>
              <td style={{ padding: '0.35rem' }}>14</td>
            </tr>
            <tr style={{ background: Math.abs(k - 90) < 1e-6 ? 'rgba(245,158,11,0.14)' : undefined }}>
              <td style={{ padding: '0.35rem' }}>s² (α₁, α₂)</td>
              <td style={{ padding: '0.35rem' }}>+7</td>
              <td style={{ padding: '0.35rem' }}>{a0}</td>
            </tr>
            <tr style={{ background: b1 <= 0 ? 'rgba(239,68,68,0.14)' : undefined }}>
              <td style={{ padding: '0.35rem' }}>s¹</td>
              <td style={{ padding: '0.35rem', fontWeight: 700 }}>{b1.toFixed(2)}</td>
              <td style={{ padding: '0.35rem' }}>0</td>
            </tr>
            <tr style={{ background: a0 <= 0 ? 'rgba(239,68,68,0.14)' : undefined }}>
              <td style={{ padding: '0.35rem' }}>s⁰</td>
              <td style={{ padding: '0.35rem', fontWeight: 700 }}>{a0}</td>
              <td style={{ padding: '0.35rem' }}>0</td>
            </tr>
          </tbody>
        </table>

        <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', height: 'auto', border: '1px solid var(--sl-color-hairline)', borderRadius: '0.5rem' }}>
          {/* LHP shading */}
          <rect x={0} y={0} width={toX(0)} height={H} fill="#10b981" fillOpacity={0.07} />
          {/* Axes */}
          <line x1={20} x2={W - 20} y1={toY(0)} y2={toY(0)} stroke="currentColor" strokeOpacity={0.35} />
          <line x1={toX(0)} x2={toX(0)} y1={10} y2={H - 10} stroke="currentColor" strokeWidth={1.5} strokeOpacity={0.55} />
          <text x={toX(0) + 5} y={20} fontSize="10" fill="currentColor" opacity={0.7}>
            jω
          </text>
          <text x={W - 30} y={toY(0) - 5} fontSize="10" fill="currentColor" opacity={0.7}>
            Re(s)
          </text>

          {/* Roots */}
          {roots.map((r, i) => (
            <g key={i} transform={`translate(${toX(r.re).toFixed(1)}, ${toY(r.im).toFixed(1)})`}>
              <line x1={-5} y1={-5} x2={5} y2={5} stroke={r.re > 0.01 ? '#ef4444' : '#3b82f6'} strokeWidth={2.2} />
              <line x1={-5} y1={5} x2={5} y2={-5} stroke={r.re > 0.01 ? '#ef4444' : '#3b82f6'} strokeWidth={2.2} />
            </g>
          ))}
        </svg>
      </div>
    </div>
  );
}
