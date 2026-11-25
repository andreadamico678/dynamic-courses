import React, { useMemo, useState } from 'react';

export default function DiodeRectifierExplorer() {
  const [topology, setTopology] = useState<'half' | 'bridge'>('half');
  const [vp, setVp] = useState(12);
  const [freq, setFreq] = useState(50);
  const [rl, setRl] = useState(500);
  const [capUf, setCapUf] = useState(47);
  const [vOn, setVOn] = useState(0.7);

  const W = 680;
  const H = 230;
  const padL = 52;
  const padR = 20;
  const padT = 18;
  const padB = 30;

  const stats = useMemo(() => {
    const nDiodes = topology === 'half' ? 1 : 2;
    const vPeakOut = Math.max(0, vp - nDiodes * vOn);
    const period = 1 / freq;
    const fRip = topology === 'half' ? freq : 2 * freq;
    const capF = capUf * 1e-6;

    // Simulate 3 full periods with small time steps to capture steady-state capacitor waveform
    const steps = 600;
    const tMax = 2 * period;
    const dt = (3 * period) / (steps * 1.5);
    let vc = 0;
    const pts: { t: number; vin: number; vout: number }[] = [];
    const totalSteps = Math.round((3 * period) / dt);
    const recordFrom = totalSteps - Math.round(tMax / dt);

    for (let i = 0; i <= totalSteps; i++) {
      const t = i * dt;
      const vin = vp * Math.sin(2 * Math.PI * freq * t);
      const rectTarget =
        topology === 'half' ? vin - vOn : Math.abs(vin) - 2 * vOn;

      if (capUf === 0) {
        vc = Math.max(0, rectTarget);
      } else {
        const tau = rl * capF;
        const vcDecay = vc * Math.exp(-dt / tau);
        vc = Math.max(0, Math.max(vcDecay, rectTarget));
      }

      if (i >= recordFrom) {
        pts.push({ t: t - recordFrom * dt, vin, vout: vc });
      }
    }

    const vMin = pts.reduce((m, p) => Math.min(m, p.vout), Infinity);
    const vMax = pts.reduce((m, p) => Math.max(m, p.vout), 0);
    const vrSim = Math.max(0, vMax - vMin);
    const vrApprox = capUf > 0 ? vPeakOut / (fRip * rl * capF) : vPeakOut;
    const piv = topology === 'half' ? (capUf > 0 ? 2 * vp : vp) : vp;
    const deltaTMs =
      capUf > 0 && vPeakOut > 0
        ? (Math.sqrt((2 * Math.min(vrApprox, vPeakOut)) / vPeakOut) / (2 * Math.PI * freq)) * 1000
        : (1000 / (2 * fRip));

    return { pts, tMax, vPeakOut, vrSim, vrApprox, piv, deltaTMs };
  }, [topology, vp, freq, rl, capUf, vOn]);

  const toX = (t: number) => padL + (t / stats.tMax) * (W - padL - padR);
  const yLim = Math.max(vp * 1.15, 5);
  const toY = (v: number) =>
    padT + ((yLim - v) / (2 * yLim)) * (H - padT - padB);

  const vinPath = stats.pts
    .map((p, i) => `${i === 0 ? 'M' : 'L'} ${toX(p.t).toFixed(1)} ${toY(p.vin).toFixed(1)}`)
    .join(' ');
  const voutPath = stats.pts
    .map((p, i) => `${i === 0 ? 'M' : 'L'} ${toX(p.t).toFixed(1)} ${toY(p.vout).toFixed(1)}`)
    .join(' ');

  return (
    <div className="dc-widget not-content">
      <div className="dc-widget-header">
        <div className="dc-widget-heading">
          <span className="dc-badge">Simulatore Interattivo</span>
          <span className="dc-widget-title">Raddrizzatore con Filtro Capacitivo</span>
        </div>
        <div className="dc-btn-group">
          <button
            type="button"
            className={`dc-btn ${topology === 'half' ? 'dc-btn-primary' : ''}`}
            onClick={() => setTopology('half')}
          >
            Singola Semionda
          </button>
          <button
            type="button"
            className={`dc-btn ${topology === 'bridge' ? 'dc-btn-primary' : ''}`}
            onClick={() => setTopology('bridge')}
          >
            Ponte di Graetz
          </button>
        </div>
      </div>

      <div className="dc-explorer-grid">
        <div className="dc-explorer-sidebar">
          <div className="dc-controls" style={{ marginBottom: 0 }}>
            <label>
              <span>Picco <strong>V<sub>p</sub> = {vp} V</strong></span>
              <input type="range" min={5} max={25} step={1} value={vp} onChange={(e) => setVp(Number(e.target.value))} />
            </label>
            <label>
              <span>Frequenza <strong>f = {freq} Hz</strong></span>
              <input type="range" min={50} max={200} step={25} value={freq} onChange={(e) => setFreq(Number(e.target.value))} />
            </label>
            <label>
              <span>Carico <strong>R<sub>L</sub> = {rl} Ω</strong></span>
              <input type="range" min={100} max={2000} step={50} value={rl} onChange={(e) => setRl(Number(e.target.value))} />
            </label>
            <label>
              <span>Filtro <strong>C = {capUf} μF</strong></span>
              <input type="range" min={0} max={220} step={5} value={capUf} onChange={(e) => setCapUf(Number(e.target.value))} />
            </label>
            <label>
              <span>Modello diodo</span>
              <select value={vOn} onChange={(e) => setVOn(Number(e.target.value))}>
                <option value={0.7}>CVD (0.7 V)</option>
                <option value={0}>Ideale (0 V)</option>
              </select>
            </label>
          </div>
          <div className="dc-step-box" style={{ marginTop: 0, display: 'grid', gap: '0.35rem', fontSize: '0.86rem' }}>
            <span><strong>V<sub>out,max</sub>:</strong> {stats.vPeakOut.toFixed(2)} V</span>
            <span><strong>Ripple V<sub>r</sub> (simulato):</strong> {stats.vrSim.toFixed(2)} V</span>
            <span><strong>Stima V<sub>r</sub>:</strong> {stats.vrApprox.toFixed(2)} V</span>
            <span><strong>ΔT conduzione:</strong> {stats.deltaTMs.toFixed(2)} ms</span>
            <span><strong>PIV richiesto:</strong> {stats.piv.toFixed(1)} V</span>
          </div>
        </div>

        <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', maxWidth: '620px', height: 'auto', display: 'block' }}>
          <line x1={padL} y1={toY(0)} x2={W - padR} y2={toY(0)} stroke="var(--sl-color-hairline-light)" strokeWidth={1.2} />
          <line x1={padL} y1={padT} x2={padL} y2={H - padB} stroke="var(--sl-color-hairline-light)" strokeWidth={1.2} />
          <text x={padL - 8} y={toY(vp) + 4} textAnchor="end" fontSize="11" fill="var(--sl-color-gray-3)">+{vp}V</text>
          <text x={padL - 8} y={toY(0) + 4} textAnchor="end" fontSize="11" fill="var(--sl-color-gray-3)">0V</text>
          <text x={padL - 8} y={toY(-vp) + 4} textAnchor="end" fontSize="11" fill="var(--sl-color-gray-3)">-{vp}V</text>

          <path d={vinPath} fill="none" stroke="var(--sl-color-gray-3)" strokeWidth={1.5} strokeDasharray="5 4" />
          <path d={voutPath} fill="none" stroke="var(--sl-color-accent)" strokeWidth={2.4} />

          <text x={W - padR - 4} y={padT + 14} textAnchor="end" fontSize="11" fill="var(--sl-color-gray-3)">
            --- v_in(t)
          </text>
          <text x={W - padR - 4} y={padT + 29} textAnchor="end" fontSize="11" fill="var(--sl-color-accent-high)">
            — v_out(t)
          </text>
        </svg>
      </div>
    </div>
  );
}
