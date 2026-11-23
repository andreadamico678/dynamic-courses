import React, { useMemo, useState } from 'react';

export default function MosfetExplorer() {
  const [vgs, setVgs] = useState(2.5);
  const [vth, setVth] = useState(0.8);
  const [knMa, setKnMa] = useState(2.0); // mA/V^2
  const [lambda, setLambda] = useState(0.02); // V^-1
  const [vdd, setVdd] = useState(5.0);
  const [rdK, setRdK] = useState(1.2); // kOhm

  const W = 680;
  const H = 250;
  const padL = 56;
  const padR = 24;
  const padT = 18;
  const padB = 34;

  const idMosMa = (vds: number, vg: number) => {
    const vov = vg - vth;
    if (vov <= 0) return 0;
    if (vds < vov) {
      return knMa * (vov * vds - 0.5 * vds * vds) * (1 + lambda * vds);
    }
    return 0.5 * knMa * vov * vov * (1 + lambda * vds);
  };

  const data = useMemo(() => {
    const vMax = Math.max(6, vdd * 1.05);
    const iMax = Math.max(
      12,
      (vdd / rdK) * 1.15,
      idMosMa(vMax, 4.0) * 1.1
    );

    // Solve Q-point where I_D(V_DS) = (V_DD - V_DS) / R_D by bisection on [0, V_DD]
    let lo = 0;
    let hi = vdd;
    for (let k = 0; k < 50; k++) {
      const mid = 0.5 * (lo + hi);
      const diff = idMosMa(mid, vgs) - (vdd - mid) / rdK;
      if (diff > 0) hi = mid;
      else lo = mid;
    }
    const vdsQ = 0.5 * (lo + hi);
    const idQ = (vdd - vdsQ) / rdK;
    const vov = vgs - vth;
    const region =
      vov <= 0 ? 'Interdizione' : vdsQ < vov ? 'Triodo (Lineare)' : 'Saturazione';
    const gmMaV = vov > 0 ? Math.sqrt(2 * knMa * idQ) : 0;
    const roK = lambda > 0 && idQ > 1e-4 ? 1000 / (lambda * idQ) : Infinity;

    const curves: { vg: number; pts: string }[] = [];
    for (const vg of [1.5, 2.0, 2.5, 3.0, 3.5]) {
      const p: string[] = [];
      for (let i = 0; i <= 80; i++) {
        const vds = (i / 80) * vMax;
        p.push(`${vds},${idMosMa(vds, vg)}`);
      }
      curves.push({ vg, pts: p.join(' ') });
    }

    // Active curve for current vgs
    const activePts: { vds: number; id: number }[] = [];
    for (let i = 0; i <= 100; i++) {
      const vds = (i / 100) * vMax;
      activePts.push({ vds, id: idMosMa(vds, vgs) });
    }

    // Pinch-off boundary V_DS = V_OV => I_D = 0.5 * Kn * V_DS^2 * (1 + lambda*V_DS)
    const pinchPts: { vds: number; id: number }[] = [];
    for (let i = 0; i <= 60; i++) {
      const vds = (i / 60) * vMax;
      const id = 0.5 * knMa * vds * vds * (1 + lambda * vds);
      if (id <= iMax) pinchPts.push({ vds, id });
    }

    return { vMax, iMax, vdsQ, idQ, vov, region, gmMaV, roK, curves, activePts, pinchPts };
  }, [vgs, vth, knMa, lambda, vdd, rdK]);

  const toX = (v: number) => padL + (v / data.vMax) * (W - padL - padR);
  const toY = (id: number) => padT + ((data.iMax - id) / data.iMax) * (H - padT - padB);

  const activePath = data.activePts
    .map((p, i) => `${i === 0 ? 'M' : 'L'} ${toX(p.vds).toFixed(1)} ${toY(p.id).toFixed(1)}`)
    .join(' ');
  const pinchPath = data.pinchPts
    .map((p, i) => `${i === 0 ? 'M' : 'L'} ${toX(p.vds).toFixed(1)} ${toY(p.id).toFixed(1)}`)
    .join(' ');

  return (
    <div className="dc-widget">
      <div className="dc-widget-header">
        <div>
          <span className="dc-badge">Simulatore Interattivo</span>{' '}
          <span className="dc-widget-title">Caratteristica I_D–V_DS e Retta di Carico MOSFET</span>
        </div>
        <span className="dc-badge">{data.region}</span>
      </div>

      <div className="dc-explorer-grid">
        <div className="dc-explorer-sidebar">
          <div className="dc-controls" style={{ marginBottom: 0 }}>
            <label>
              <strong>V_GS = {vgs.toFixed(1)} V</strong>
              <input type="range" min={0.5} max={4.0} step={0.1} value={vgs} onChange={(e) => setVgs(Number(e.target.value))} />
            </label>
            <label>
              <strong>V_th = {vth.toFixed(1)} V</strong>
              <input type="range" min={0.5} max={1.5} step={0.1} value={vth} onChange={(e) => setVth(Number(e.target.value))} />
            </label>
            <label>
              <strong>K_n = {knMa.toFixed(1)} mA/V²</strong>
              <input type="range" min={0.5} max={5.0} step={0.25} value={knMa} onChange={(e) => setKnMa(Number(e.target.value))} />
            </label>
            <label>
              <strong>λ = {lambda.toFixed(2)} V⁻¹</strong>
              <input type="range" min={0} max={0.1} step={0.01} value={lambda} onChange={(e) => setLambda(Number(e.target.value))} />
            </label>
            <label>
              <strong>V_DD = {vdd.toFixed(1)} V</strong>
              <input type="range" min={3.0} max={10.0} step={0.5} value={vdd} onChange={(e) => setVdd(Number(e.target.value))} />
            </label>
            <label>
              <strong>R_D = {rdK.toFixed(1)} kΩ</strong>
              <input type="range" min={0.4} max={4.0} step={0.1} value={rdK} onChange={(e) => setRdK(Number(e.target.value))} />
            </label>
          </div>

          <div className="dc-step-box" style={{ marginTop: 0, display: 'grid', gap: '0.35rem', fontSize: '0.86rem' }}>
            <span><strong>V_OV = V_GS − V_th:</strong> {data.vov.toFixed(2)} V</span>
            <span><strong>I_D(Q):</strong> {data.idQ.toFixed(2)} mA</span>
            <span><strong>V_DS(Q):</strong> {data.vdsQ.toFixed(2)} V</span>
            <span><strong>g_m:</strong> {data.gmMaV.toFixed(2)} mA/V</span>
            <span><strong>r_o:</strong> {Number.isFinite(data.roK) ? `${data.roK.toFixed(1)} kΩ` : '∞'}</span>
          </div>
        </div>

        <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', height: 'auto', display: 'block' }}>
          <line x1={padL} y1={toY(0)} x2={W - padR} y2={toY(0)} stroke="var(--sl-color-hairline-light)" strokeWidth={1.3} />
          <line x1={padL} y1={padT} x2={padL} y2={H - padB} stroke="var(--sl-color-hairline-light)" strokeWidth={1.3} />
          <text x={W - padR} y={H - 8} textAnchor="end" fontSize="11" fill="var(--sl-color-gray-3)">V_DS [V]</text>
          <text x={padL - 8} y={padT + 10} textAnchor="end" fontSize="11" fill="var(--sl-color-gray-3)">I_D [mA]</text>

          {data.curves.map((c) => {
            const d = c.pts
              .split(' ')
              .map((pair, idx) => {
                const [xv, yv] = pair.split(',').map(Number);
                return `${idx === 0 ? 'M' : 'L'} ${toX(xv).toFixed(1)} ${toY(Math.min(yv, data.iMax)).toFixed(1)}`;
              })
              .join(' ');
            return <path key={c.vg} d={d} fill="none" stroke="var(--sl-color-hairline-light)" strokeWidth={1.1} />;
          })}

          {pinchPath && (
            <path d={pinchPath} fill="none" stroke="var(--dc-warn)" strokeWidth={1.5} strokeDasharray="5 4" />
          )}
          <path d={activePath} fill="none" stroke="var(--sl-color-accent)" strokeWidth={2.5} />

          <line
            x1={toX(0)}
            y1={toY(Math.min(vdd / rdK, data.iMax))}
            x2={toX(vdd)}
            y2={toY(0)}
            stroke="var(--dc-ok)"
            strokeWidth={1.9}
          />

          <circle cx={toX(data.vdsQ)} cy={toY(data.idQ)} r={5} fill="var(--dc-err)" stroke="#fff" strokeWidth={1.5} />
          <text x={toX(data.vdsQ) + 9} y={toY(data.idQ) - 8} fontSize="11" fontWeight="700" fill="var(--dc-err)">
            Q ({data.vdsQ.toFixed(2)}V, {data.idQ.toFixed(2)}mA)
          </text>
        </svg>
      </div>
    </div>
  );
}
