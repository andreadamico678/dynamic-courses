import React, { useEffect, useMemo, useState } from 'react';

type PresetKey = 'node' | 'focus' | 'saddle' | 'center';

interface Preset {
  label: string;
  desc: string;
  step: (t: number, x0: [number, number]) => [number, number];
  eigenLines?: { dx: number; dy: number; color: string; name: string }[];
  tMax: number;
}

const PRESETS: Record<PresetKey, Preset> = {
  node: {
    label: 'Stable Node (Slow/Fast)',
    desc: 'λ₁ = −1 along v₁=[2,1], λ₂ = −4 along v₂=[−1,2]: trajectories bend tangentially onto the slow manifold v₁.',
    tMax: 4,
    eigenLines: [
      { dx: 2, dy: 1, color: 'var(--sl-color-accent)', name: 'v₁ (slow)' },
      { dx: -1, dy: 2, color: 'var(--dc-err)', name: 'v₂ (fast)' },
    ],
    step: (t, [x10, x20]) => {
      // x0 = c1*[2,1] + c2*[-1,2] -> c1 = (2*x10 + x20)/5, c2 = (-x10 + 2*x20)/5
      const c1 = (2 * x10 + x20) / 5;
      const c2 = (-x10 + 2 * x20) / 5;
      const e1 = Math.exp(-t);
      const e2 = Math.exp(-4 * t);
      return [c1 * 2 * e1 - c2 * e2, c1 * e1 + c2 * 2 * e2];
    },
  },
  focus: {
    label: 'Stable Focus (Spiral)',
    desc: 'λ = −0.25 ± j1.2: damped complex conjugate eigenvalues spiral inward to the origin.',
    tMax: 12,
    step: (t, [x10, x20]) => {
      const e = Math.exp(-0.25 * t);
      const c = Math.cos(1.2 * t);
      const s = Math.sin(1.2 * t);
      return [e * (x10 * c - x20 * s), e * (x10 * s + x20 * c)];
    },
  },
  saddle: {
    label: 'Saddle (Unstable)',
    desc: 'λ₁ = −1 (stable axis), λ₂ = +0.7 (unstable axis): trajectories approach along x₁ and diverge along x₂.',
    tMax: 2.2,
    eigenLines: [
      { dx: 1, dy: 0, color: 'var(--dc-ok)', name: 'stable λ₁=−1' },
      { dx: 0, dy: 1, color: 'var(--dc-err)', name: 'unstable λ₂=+0.7' },
    ],
    step: (t, [x10, x20]) => [x10 * Math.exp(-t), x20 * Math.exp(0.7 * t)],
  },
  center: {
    label: 'Marginal Center',
    desc: 'λ = ±j1.5 (purely imaginary): closed periodic orbits—simply stable, not asymptotically stable.',
    tMax: 4.5,
    step: (t, [x10, x20]) => {
      const c = Math.cos(1.5 * t);
      const s = Math.sin(1.5 * t);
      return [x10 * c - x20 * s, x10 * s + x20 * c];
    },
  },
};

export default function PhaseFlowExplorer({ initialPreset = 'node' }: { initialPreset?: PresetKey }) {
  const [presetKey, setPresetKey] = useState<PresetKey>(initialPreset);
  const [x0, setX0] = useState<[number, number]>([-2.6, 0.8]);
  const [t, setT] = useState(0);
  const [playing, setPlaying] = useState(false);

  const preset = PRESETS[presetKey];

  useEffect(() => {
    if (!playing) return;
    const id = setInterval(() => {
      setT((prev) => (prev + 0.04 > preset.tMax ? 0 : prev + 0.04));
    }, 30);
    return () => clearInterval(id);
  }, [playing, preset.tMax]);

  const W = 380;
  const H = 260;
  const toX = (x: number) => 20 + ((x - -3.5) / 7) * (W - 40);
  const toY = (y: number) => 16 + ((3 - y) / 6) * (H - 32);

  const path = useMemo(() => {
    const pts: string[] = [];
    const n = 120;
    for (let i = 0; i <= n; i++) {
      const ti = (i / n) * preset.tMax;
      const [x1, x2] = preset.step(ti, x0);
      pts.push(`${i === 0 ? 'M' : 'L'} ${toX(x1).toFixed(1)} ${toY(x2).toFixed(1)}`);
    }
    return pts.join(' ');
  }, [preset, x0]);

  const cur = preset.step(t, x0);

  return (
    <div className="dc-widget not-content">
      <div className="dc-widget-header">
        <div className="dc-widget-heading">
          <span className="dc-badge">Interactive Lab</span>
          <span className="dc-widget-title">Phase-Plane State Flow x(t) = e^(At) x₀</span>
        </div>
        <div style={{ display: 'flex', gap: '0.45rem' }}>
          <button type="button" className="dc-btn dc-btn-primary" onClick={() => setPlaying((p) => !p)}>
            {playing ? 'Pause' : 'Play'}
          </button>
          <button
            type="button"
            className="dc-btn"
            onClick={() => {
              setPlaying(false);
              setT(0);
            }}
          >
            Reset t=0
          </button>
        </div>
      </div>

      <div className="dc-controls">
        {(Object.keys(PRESETS) as PresetKey[]).map((key) => (
          <button
            key={key}
            type="button"
            className="dc-btn"
            style={{
              borderColor: presetKey === key ? 'var(--sl-color-accent)' : undefined,
              fontWeight: presetKey === key ? 700 : 500,
            }}
            onClick={() => {
              setPresetKey(key);
              setT(0);
              setX0(key === 'saddle' ? [-2.4, 0.25] : [-2.6, 0.8]);
            }}
          >
            {PRESETS[key].label}
          </button>
        ))}
      </div>

      <p style={{ margin: '0 0 0.65rem', fontSize: '0.86rem', opacity: 0.9 }}>{preset.desc}</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem', alignItems: 'center' }}>
        <svg
          viewBox={`0 0 ${W} ${H}`}
          style={{ width: '100%', maxWidth: '460px', height: 'auto', border: '1px solid var(--sl-color-hairline-light)', borderRadius: 'var(--dc-radius)', cursor: 'crosshair' }}
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const px = ((e.clientX - rect.left) / rect.width) * W;
            const py = ((e.clientY - rect.top) / rect.height) * H;
            const nx = -3.5 + ((px - 20) / (W - 40)) * 7;
            const ny = 3 - ((py - 16) / (H - 32)) * 6;
            setX0([Number(nx.toFixed(2)), Number(ny.toFixed(2))]);
            setT(0);
          }}
        >
          <line x1={20} x2={W - 20} y1={toY(0)} y2={toY(0)} stroke="currentColor" strokeOpacity={0.3} />
          <line x1={toX(0)} x2={toX(0)} y1={12} y2={H - 12} stroke="currentColor" strokeOpacity={0.3} />

          {preset.eigenLines?.map((el, idx) => (
            <line
              key={idx}
              x1={toX(-4 * el.dx)}
              y1={toY(-4 * el.dy)}
              x2={toX(4 * el.dx)}
              y2={toY(4 * el.dy)}
              stroke={el.color}
              strokeOpacity={0.55}
              strokeDasharray="5 4"
            />
          ))}

          <path d={path} fill="none" stroke="var(--sl-color-accent)" strokeWidth={2.4} />
          <circle cx={toX(x0[0])} cy={toY(x0[1])} r={4.5} fill="var(--dc-err)" />
          <circle cx={toX(cur[0])} cy={toY(cur[1])} r={5.5} fill="var(--dc-ok)" />
        </svg>

        <div style={{ fontSize: '0.88rem' }}>
          <label style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem', marginBottom: '0.75rem' }}>
            <span>Time t = {t.toFixed(2)} s</span>
            <input
              type="range"
              min={0}
              max={preset.tMax}
              step={0.05}
              value={t}
              onChange={(e) => {
                setPlaying(false);
                setT(Number(e.target.value));
              }}
            />
          </label>
          <div><strong>Click anywhere on the plane</strong> to move initial state x₀.</div>
          <div style={{ marginTop: '0.5rem' }}>
            <span style={{ color: 'var(--dc-err)' }}>● x(0)</span> = [{x0[0].toFixed(2)}, {x0[1].toFixed(2)}]ᵀ
          </div>
          <div>
            <span style={{ color: 'var(--dc-ok)' }}>● x(t)</span> = [{cur[0].toFixed(2)}, {cur[1].toFixed(2)}]ᵀ
          </div>
        </div>
      </div>
    </div>
  );
}
