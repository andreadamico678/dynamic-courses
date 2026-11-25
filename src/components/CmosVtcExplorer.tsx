import React, { useMemo, useState } from 'react';

export default function CmosVtcExplorer() {
  const [vdd, setVdd] = useState(3.3);
  const [vth, setVth] = useState(0.7);
  const [kr, setKr] = useState(1.0); // Kn / Kp

  const W = 680;
  const H = 240;
  const padL = 52;
  const padR = 24;
  const padT = 18;
  const padB = 34;

  const evalVout = (vin: number) => {
    const vtn = vth;
    const vtpAbs = vth;
    if (vin <= vtn) return vdd;
    if (vin >= vdd - vtpAbs) return 0;

    // Solve I_Dn(V_in, V_out) = I_Dp(V_in, V_out) by bisection on [0, V_DD]
    const iN = (vout: number) => {
      const vov = vin - vtn;
      if (vov <= 0) return 0;
      return vout < vov ? kr * (vov * vout - 0.5 * vout * vout) : 0.5 * kr * vov * vov;
    };
    const iP = (vout: number) => {
      const vovp = vdd - vin - vtpAbs;
      const vsdp = vdd - vout;
      if (vovp <= 0) return 0;
      return vsdp < vovp ? vovp * vsdp - 0.5 * vsdp * vsdp : 0.5 * vovp * vovp;
    };

    let lo = 0;
    let hi = vdd;
    for (let k = 0; k < 50; k++) {
      const mid = 0.5 * (lo + hi);
      if (iN(mid) > iP(mid)) hi = mid;
      else lo = mid;
    }
    return 0.5 * (lo + hi);
  };

  const vtc = useMemo(() => {
    const sqrtKr = Math.sqrt(kr);
    const vm = (vdd - vth + sqrtKr * vth) / (1 + sqrtKr);

    // Closed-form V_IL and V_IH for square-law CMOS inverter
    const vil = (2 * Math.sqrt(kr) * (vdd - vth - vth) / ((kr - 1) || 1e9));
    // Better: find numerical points where dV_out/dV_in = -1
    const pts: { x: number; y: number }[] = [];
    const steps = 160;
    let vilNum = vth;
    let vihNum = vdd - vth;
    let foundVil = false;
    for (let i = 0; i <= steps; i++) {
      const x = (i / steps) * vdd;
      const y = evalVout(x);
      pts.push({ x, y });
      if (i > 0) {
        const prev = pts[i - 1];
        const slope = (y - prev.y) / (x - prev.x);
        if (!foundVil && slope <= -1) {
          vilNum = x;
          foundVil = true;
        }
        if (slope <= -1) {
          vihNum = x;
        }
      }
    }
    void vil;
    const nml = vilNum;
    const nmh = vdd - vihNum;
    return { pts, vm, vilNum, vihNum, nml, nmh };
  }, [vdd, vth, kr]);

  const toX = (v: number) => padL + (v / vdd) * (W - padL - padR);
  const toY = (v: number) => padT + ((vdd - v) / vdd) * (H - padT - padB);

  const pathD = vtc.pts
    .map((p, i) => `${i === 0 ? 'M' : 'L'} ${toX(p.x).toFixed(1)} ${toY(p.y).toFixed(1)}`)
    .join(' ');

  return (
    <div className="dc-widget not-content">
      <div className="dc-widget-header">
        <div className="dc-widget-heading">
          <span className="dc-badge">Simulatore Interattivo</span>
          <span className="dc-widget-title">Caratteristica VTC dell'Invertitore CMOS</span>
        </div>
        <span className="dc-badge">V<sub>M</sub> = {vtc.vm.toFixed(2)} V</span>
      </div>

      <div className="dc-explorer-grid">
        <div className="dc-explorer-sidebar">
          <div className="dc-controls" style={{ marginBottom: 0 }}>
            <label>
              <span>V<sub>DD</sub> = {vdd.toFixed(1)} V</span>
              <input type="range" min={1.8} max={5.0} step={0.1} value={vdd} onChange={(e) => setVdd(Number(e.target.value))} />
            </label>
            <label>
              <span>V<sub>th</sub> = {vth.toFixed(2)} V</span>
              <input type="range" min={0.4} max={1.1} step={0.05} value={vth} onChange={(e) => setVth(Number(e.target.value))} />
            </label>
            <label>
              <span>Rapporto K<sub>n</sub> / K<sub>p</sub> = {kr.toFixed(2)}</span>
              <input type="range" min={0.25} max={4.0} step={0.05} value={kr} onChange={(e) => setKr(Number(e.target.value))} />
            </label>
          </div>
          <div className="dc-step-box" style={{ marginTop: 0, display: 'grid', gap: '0.35rem', fontSize: '0.86rem' }}>
            <span><strong>V<sub>M</sub>:</strong> {vtc.vm.toFixed(2)} V (V<sub>DD</sub>/2 = {(vdd / 2).toFixed(2)} V)</span>
            <span><strong>V<sub>IL</sub>:</strong> {vtc.vilNum.toFixed(2)} V</span>
            <span><strong>V<sub>IH</sub>:</strong> {vtc.vihNum.toFixed(2)} V</span>
            <span><strong>NM<sub>L</sub>:</strong> {vtc.nml.toFixed(2)} V</span>
            <span><strong>NM<sub>H</sub>:</strong> {vtc.nmh.toFixed(2)} V</span>
          </div>
        </div>

        <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', maxWidth: '620px', height: 'auto', display: 'block' }}>
          <line x1={padL} y1={toY(0)} x2={W - padR} y2={toY(0)} stroke="var(--sl-color-hairline-light)" strokeWidth={1.3} />
          <line x1={padL} y1={padT} x2={padL} y2={H - padB} stroke="var(--sl-color-hairline-light)" strokeWidth={1.3} />
          <line x1={toX(0)} y1={toY(0)} x2={toX(vdd)} y2={toY(vdd)} stroke="var(--sl-color-gray-3)" strokeWidth={1.2} strokeDasharray="5 4" />

          <path d={pathD} fill="none" stroke="var(--sl-color-accent)" strokeWidth={2.5} />

          <circle cx={toX(vtc.vm)} cy={toY(vtc.vm)} r={5} fill="var(--dc-err)" stroke="#fff" strokeWidth={1.5} />
          <text x={toX(vtc.vm) + 8} y={toY(vtc.vm) - 6} fontSize="11" fontWeight="700" fill="var(--dc-err)">
            V_M = {vtc.vm.toFixed(2)}V
          </text>

          <text x={W - padR} y={H - 8} textAnchor="end" fontSize="11" fill="var(--sl-color-gray-3)">V_in [V]</text>
          <text x={padL - 8} y={padT + 10} textAnchor="end" fontSize="11" fill="var(--sl-color-gray-3)">V_out [V]</text>
        </svg>
      </div>
    </div>
  );
}
