import React, { useMemo, useState } from 'react';

type Topo = 'cs' | 'cs-deg' | 'cd' | 'cg';

export default function SingleStageExplorer() {
  const [topo, setTopo] = useState<Topo>('cs');
  const [gmMaV, setGmMaV] = useState(4.0);
  const [roK, setRoK] = useState(50);
  const [rdOrRsK, setRdOrRsK] = useState(5.0);
  const [rsDegK, setRsDegK] = useState(0.5);
  const [rlK, setRlK] = useState(10.0);
  const [rsigK, setRsigK] = useState(1.0);
  const [cgsPf, setCgsPf] = useState(4.0);
  const [cgdPf, setCgdPf] = useState(1.0);

  const par = (a: number, b: number) => (a * b) / (a + b);

  const metrics = useMemo(() => {
    const gm = gmMaV * 1e-3;
    const ro = roK * 1e3;
    const rd = rdOrRsK * 1e3;
    const rs = rsDegK * 1e3;
    const rl = rlK * 1e3;
    const rsig = rsigK * 1e3;
    const cgs = cgsPf * 1e-12;
    const cgd = cgdPf * 1e-12;
    const rgBias = 100e3; // 100 kOhm gate divider equivalent

    let rin = rgBias;
    let rout = par(ro, rd);
    let av = 0;
    let cmPf = 0;
    let fhMhz = 0;

    if (topo === 'cs') {
      rin = rgBias;
      rout = par(ro, rd);
      const rTot = par(rout, rl);
      av = -gm * rTot;
      cmPf = cgdPf * (1 + Math.abs(av));
      const reqIn = par(rsig, rin);
      const reqOut = rTot;
      const tau = reqIn * (cgs + cgd * (1 + Math.abs(av))) + reqOut * cgd;
      fhMhz = 1 / (2 * Math.PI * tau * 1e6);
    } else if (topo === 'cs-deg') {
      rin = rgBias;
      rout = rd; // approx when ro neglected or exact approx (ro + rs + gm*ro*rs) || rd
      const roEff = ro + rs + gm * ro * rs;
      rout = par(roEff, rd);
      const rLoad = par(rd, rl);
      av = -(gm * rLoad) / (1 + gm * rs);
      cmPf = cgdPf * (1 + Math.abs(av));
      const reqIn = par(rsig, rin);
      const tau = (reqIn * cgs) / (1 + gm * rs) + reqIn * cgd * (1 + Math.abs(av)) + par(rout, rl) * cgd;
      fhMhz = 1 / (2 * Math.PI * tau * 1e6);
    } else if (topo === 'cd') {
      rin = rgBias;
      const rLoadEq = par(par(ro, rd), rl);
      av = (gm * rLoadEq) / (1 + gm * rLoadEq);
      rout = par(1 / gm, par(rd, ro));
      cmPf = 0;
      const reqG = par(rsig, rin);
      const tau = reqG * cgd + (par(reqG + rLoadEq, 1 / gm) * 0.5 + reqG * (1 - av)) * cgs;
      fhMhz = 1 / (2 * Math.PI * Math.max(tau, 1e-12) * 1e6);
    } else {
      // Common Gate
      rin = par(rd, 1 / gm);
      const rLoad = par(rd, rl);
      av = gm * par(rLoad, ro);
      rout = par(ro, rd);
      cmPf = 0;
      const reqS = par(rsig, rin);
      const reqD = par(rout, rl);
      const tau = reqS * cgs + reqD * cgd;
      fhMhz = 1 / (2 * Math.PI * tau * 1e6);
    }

    const avs = av * (rin / (rsig + rin));
    return { rin, rout, av, avs, cmPf, fhMhz };
  }, [topo, gmMaV, roK, rdOrRsK, rsDegK, rlK, rsigK, cgsPf, cgdPf]);

  const fmtOhm = (val: number) =>
    val >= 1000 ? `${(val / 1000).toFixed(2)} kΩ` : `${val.toFixed(0)} Ω`;

  return (
    <div className="dc-widget not-content">
      <div className="dc-widget-header">
        <div className="dc-widget-heading">
          <span className="dc-badge">Simulatore Interattivo</span>
          <span className="dc-widget-title">Amplificatori a Singolo Stadio e Banda f<sub>H</sub> (OCTC)</span>
        </div>
        <div className="dc-btn-group">
          {(
            [
              ['cs', 'Common Source'],
              ['cs-deg', 'CS + Degenerazione'],
              ['cd', 'Common Drain'],
              ['cg', 'Common Gate'],
            ] as [Topo, string][]
          ).map(([id, label]) => (
            <button
              key={id}
              type="button"
              className={`dc-btn ${topo === id ? 'dc-btn-primary' : ''}`}
              onClick={() => setTopo(id)}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="dc-controls">
        <label>
          <span>g<sub>m</sub> = {gmMaV.toFixed(1)} mA/V</span>
          <input type="range" min={1} max={10} step={0.5} value={gmMaV} onChange={(e) => setGmMaV(Number(e.target.value))} />
        </label>
        <label>
          <span>{topo === 'cd' || topo === 'cg' ? <>R<sub>S</sub></> : <>R<sub>D</sub></>} = {rdOrRsK.toFixed(1)} kΩ</span>
          <input type="range" min={1} max={20} step={0.5} value={rdOrRsK} onChange={(e) => setRdOrRsK(Number(e.target.value))} />
        </label>
        {topo === 'cs-deg' && (
          <label>
            <span>R<sub>S</sub> (deg.) = {rsDegK.toFixed(2)} kΩ</span>
            <input type="range" min={0.1} max={2.0} step={0.1} value={rsDegK} onChange={(e) => setRsDegK(Number(e.target.value))} />
          </label>
        )}
        <label>
          <span>R<sub>L</sub> = {rlK.toFixed(1)} kΩ</span>
          <input type="range" min={1} max={50} step={1} value={rlK} onChange={(e) => setRlK(Number(e.target.value))} />
        </label>
        <label>
          <span>R<sub>sig</sub> = {rsigK.toFixed(1)} kΩ</span>
          <input type="range" min={0.1} max={10} step={0.2} value={rsigK} onChange={(e) => setRsigK(Number(e.target.value))} />
        </label>
        <label>
          <span>r<sub>o</sub> = {roK} kΩ</span>
          <input type="range" min={10} max={200} step={10} value={roK} onChange={(e) => setRoK(Number(e.target.value))} />
        </label>
        <label>
          <span>C<sub>gs</sub> = {cgsPf.toFixed(1)} pF</span>
          <input type="range" min={1} max={10} step={0.5} value={cgsPf} onChange={(e) => setCgsPf(Number(e.target.value))} />
        </label>
        <label>
          <span>C<sub>gd</sub> = {cgdPf.toFixed(1)} pF</span>
          <input type="range" min={0.2} max={5} step={0.2} value={cgdPf} onChange={(e) => setCgdPf(Number(e.target.value))} />
        </label>
      </div>

      <div className="dc-step-box" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: '0.75rem', fontSize: '0.9rem' }}>
        <div><strong>Guadagno A<sub>v</sub>:</strong> {metrics.av.toFixed(2)} V/V</div>
        <div><strong>Guadagno A<sub>vs</sub>:</strong> {metrics.avs.toFixed(2)} V/V</div>
        <div><strong>R<sub>in</sub>:</strong> {fmtOhm(metrics.rin)}</div>
        <div><strong>R<sub>out</sub>:</strong> {fmtOhm(metrics.rout)}</div>
        <div><strong>Capacità Miller C<sub>M</sub>:</strong> {metrics.cmPf > 0 ? `${metrics.cmPf.toFixed(1)} pF` : 'Assente'}</div>
        <div><strong>Banda f<sub>H</sub> (OCTC):</strong> {metrics.fhMhz.toFixed(2)} MHz</div>
      </div>
    </div>
  );
}
