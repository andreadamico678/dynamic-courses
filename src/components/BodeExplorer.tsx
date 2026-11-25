import React, { useMemo, useState } from 'react';

interface BodeExplorerProps {
  initialKb?: number;
  initialType?: number;
  initialPole?: number;
  initialZero?: number;
  initialRhpZero?: boolean;
  showComplexOption?: boolean;
}

export default function BodeExplorer({
  initialKb = 10,
  initialType = 1,
  initialPole = 2,
  initialZero = 5,
  initialRhpZero = false,
  showComplexOption = true,
}: BodeExplorerProps) {
  const [kb, setKb] = useState(initialKb);
  const [g, setG] = useState(initialType);
  const [wp, setWp] = useState(initialPole);
  const [useZero, setUseZero] = useState(true);
  const [rhpZero, setRhpZero] = useState(initialRhpZero);
  const [wz, setWz] = useState(initialZero);
  const [useComplex, setUseComplex] = useState(false);
  const [wn, setWn] = useState(15);
  const [zeta, setZeta] = useState(0.25);
  const [showExact, setShowExact] = useState(true);

  const wMin = 0.1;
  const wMax = 100;
  const logMin = Math.log10(wMin);
  const logMax = Math.log10(wMax);

  const W = 680;
  const Hm = 178;
  const Hp = 166;
  const padL = 54;
  const padR = 18;
  const padT = 14;
  const padB = 26;

  const toX = (w: number) =>
    padL + ((Math.log10(w) - logMin) / (logMax - logMin)) * (W - padL - padR);

  const magMin = -60;
  const magMax = 50;
  const toYm = (db: number) =>
    padT + ((magMax - db) / (magMax - magMin)) * (Hm - padT - padB);

  const phMin = -270;
  const phMax = 90;
  const toYp = (deg: number) =>
    padT + ((phMax - deg) / (phMax - phMin)) * (Hp - padT - padB);

  const evalExact = (w: number) => {
    const kbDb = 20 * Math.log10(kb);
    let mag = kbDb - 20 * g * Math.log10(w) - 10 * Math.log10(1 + (w / wp) ** 2);
    let ph = -g * 90 - (Math.atan(w / wp) * 180) / Math.PI;
    if (useZero) {
      mag += 10 * Math.log10(1 + (w / wz) ** 2);
      ph += (rhpZero ? -1 : 1) * ((Math.atan(w / wz) * 180) / Math.PI);
    }
    if (useComplex) {
      const r = w / wn;
      mag -= 10 * Math.log10((1 - r * r) ** 2 + (2 * zeta * r) ** 2);
      ph -= (Math.atan2(2 * zeta * r, 1 - r * r) * 180) / Math.PI;
    }
    return { mag, ph };
  };

  const { magAsymPath, magExactPath, phAsymPath, phExactPath, vertices, anchorY, wc, pm } =
    useMemo(() => {
      const kbDb = 20 * Math.log10(kb);
      // Magnitude corners
      const magCorners: { w: number; ds: number }[] = [{ w: wp, ds: -20 }];
      if (useZero) magCorners.push({ w: wz, ds: 20 });
      if (useComplex) magCorners.push({ w: wn, ds: -40 });
      magCorners.sort((a, b) => a.w - b.w);

      // Merge identical frequencies
      const mergedMag: { w: number; ds: number }[] = [];
      for (const c of magCorners) {
        const last = mergedMag[mergedMag.length - 1];
        if (last && Math.abs(last.w - c.w) < 1e-6) last.ds += c.ds;
        else mergedMag.push({ ...c });
      }

      let curW = wMin;
      let curS = -20 * g;
      let curDb = kbDb - 20 * g * Math.log10(wMin);
      const magPts: { w: number; db: number }[] = [{ w: curW, db: curDb }];
      for (const c of mergedMag) {
        if (c.w > curW && c.w < wMax) {
          curDb = curDb + curS * Math.log10(c.w / curW);
          curW = c.w;
          magPts.push({ w: curW, db: curDb });
        }
        curS += c.ds;
      }
      const endDb = curDb + curS * Math.log10(wMax / curW);
      magPts.push({ w: wMax, db: endDb });

      const magAsymPath = magPts
        .map((p, i) => `${i === 0 ? 'M' : 'L'} ${toX(p.w).toFixed(1)} ${toYm(p.db).toFixed(1)}`)
        .join(' ');

      // Phase ramps [0.1 wc, 10 wc]
      const phEvents: { w: number; ds: number }[] = [
        { w: 0.1 * wp, ds: -45 },
        { w: 10 * wp, ds: 45 },
      ];
      if (useZero) {
        const zSign = rhpZero ? -1 : 1;
        phEvents.push({ w: 0.1 * wz, ds: 45 * zSign }, { w: 10 * wz, ds: -45 * zSign });
      }
      if (useComplex) {
        phEvents.push({ w: 0.1 * wn, ds: -90 }, { w: 10 * wn, ds: 90 });
      }
      phEvents.sort((a, b) => a.w - b.w);

      let pW = wMin;
      let pS = 0;
      let pDeg = -g * 90;
      for (const ev of phEvents) {
        if (ev.w <= wMin) pS += ev.ds;
      }
      const phPts: { w: number; deg: number }[] = [{ w: pW, deg: pDeg }];
      for (const ev of phEvents) {
        if (ev.w > wMin && ev.w < wMax) {
          pDeg = pDeg + pS * Math.log10(ev.w / pW);
          pW = ev.w;
          phPts.push({ w: pW, deg: pDeg });
          pS += ev.ds;
        }
      }
      phPts.push({ w: wMax, deg: pDeg + pS * Math.log10(wMax / pW) });

      const phAsymPath = phPts
        .map((p, i) => `${i === 0 ? 'M' : 'L'} ${toX(p.w).toFixed(1)} ${toYp(p.deg).toFixed(1)}`)
        .join(' ');

      // Exact curves + crossover search
      const samples = 180;
      const exMagPts: string[] = [];
      const exPhPts: string[] = [];
      let prevW = wMin;
      let prevMag = evalExact(wMin).mag;
      let foundWc: number | null = null;
      for (let i = 0; i <= samples; i++) {
        const w = 10 ** (logMin + (i / samples) * (logMax - logMin));
        const { mag, ph } = evalExact(w);
        exMagPts.push(`${i === 0 ? 'M' : 'L'} ${toX(w).toFixed(1)} ${toYm(mag).toFixed(1)}`);
        exPhPts.push(`${i === 0 ? 'M' : 'L'} ${toX(w).toFixed(1)} ${toYp(ph).toFixed(1)}`);
        if (i > 0 && foundWc === null && ((prevMag >= 0 && mag <= 0) || (prevMag <= 0 && mag >= 0))) {
          const frac = Math.abs(prevMag) / (Math.abs(prevMag) + Math.abs(mag) + 1e-9);
          foundWc = prevW + frac * (w - prevW);
        }
        prevW = w;
        prevMag = mag;
      }

      const pm = foundWc ? 180 + evalExact(foundWc).ph : null;

      return {
        magAsymPath,
        magExactPath: exMagPts.join(' '),
        phAsymPath,
        phExactPath: exPhPts.join(' '),
        vertices: magPts,
        anchorY: kbDb,
        wc: foundWc,
        pm,
      };
    }, [kb, g, wp, useZero, rhpZero, wz, useComplex, wn, zeta]);

  const mrDb =
    useComplex && zeta < Math.SQRT1_2
      ? 20 * Math.log10(1 / (2 * zeta * Math.sqrt(1 - zeta * zeta)))
      : null;

  return (
    <div className="dc-widget not-content">
      <div className="dc-widget-header">
        <div className="dc-widget-heading">
          <span className="dc-badge">Interactive Lab</span>
          <span className="dc-widget-title">Bode Magnitude &amp; Phase Explorer</span>
        </div>
        <label className="dc-check-inline">
          <input
            type="checkbox"
            checked={showExact}
            onChange={(e) => setShowExact(e.target.checked)}
          />
          <span>Show exact curve</span>
        </label>
      </div>

      <div className="dc-explorer-grid">
        <div className="dc-explorer-sidebar">
          <label>
            <span>
              Bode Gain K<sub>B</sub> = {kb.toFixed(1)} ({(20 * Math.log10(kb)).toFixed(1)} dB)
            </span>
            <input
              type="range"
              min={0.5}
              max={40}
              step={0.5}
              value={kb}
              onChange={(e) => setKb(Number(e.target.value))}
            />
          </label>

          <label>
            <span>System Type g = {g}</span>
            <input
              type="range"
              min={-1}
              max={2}
              step={1}
              value={g}
              onChange={(e) => setG(Number(e.target.value))}
            />
          </label>

          <label>
            <span>Real Pole ω<sub>p</sub> = {wp} rad/s</span>
            <input
              type="range"
              min={0.5}
              max={30}
              step={0.5}
              value={wp}
              onChange={(e) => setWp(Number(e.target.value))}
            />
          </label>

          <label>
            <span className="dc-check-inline">
              <input
                type="checkbox"
                checked={useZero}
                onChange={(e) => setUseZero(e.target.checked)}
              />
              <span>Real Zero ω<sub>z</sub> = {wz} rad/s</span>
            </span>
            <input
              type="range"
              min={0.5}
              max={40}
              step={0.5}
              disabled={!useZero}
              value={wz}
              onChange={(e) => setWz(Number(e.target.value))}
            />
          </label>

          {useZero && (
            <label className="dc-check-inline">
              <input
                type="checkbox"
                checked={rhpZero}
                onChange={(e) => setRhpZero(e.target.checked)}
              />
              <span>RHP zero (1 − s/ω<sub>z</sub>)</span>
            </label>
          )}

          {showComplexOption && (
            <label>
              <span className="dc-check-inline">
                <input
                  type="checkbox"
                  checked={useComplex}
                  onChange={(e) => setUseComplex(e.target.checked)}
                />
                <span>Complex Poles (ω<sub>n</sub>={wn}, ζ={zeta.toFixed(2)})</span>
              </span>
              <input
                type="range"
                min={0.08}
                max={1.1}
                step={0.02}
                disabled={!useComplex}
                value={zeta}
                onChange={(e) => setZeta(Number(e.target.value))}
              />
            </label>
          )}
        </div>

        <div className="dc-explorer-plots">

      {/* Magnitude SVG */}
      <svg viewBox={`0 0 ${W} ${Hm}`} style={{ width: '100%', height: 'auto', display: 'block' }}>
        {[0.1, 1, 10, 100].map((w) => (
          <g key={w}>
            <line
              x1={toX(w)}
              x2={toX(w)}
              y1={padT}
              y2={Hm - padB}
              stroke="currentColor"
              strokeOpacity={0.18}
            />
            <text
              x={toX(w)}
              y={Hm - 10}
              textAnchor="middle"
              fontSize="11"
              fill="currentColor"
              opacity={0.75}
            >
              {w}
            </text>
          </g>
        ))}
        {[-40, -20, 0, 20, 40].map((db) => (
          <g key={db}>
            <line
              x1={padL}
              x2={W - padR}
              y1={toYm(db)}
              y2={toYm(db)}
              stroke="currentColor"
              strokeOpacity={db === 0 ? 0.45 : 0.14}
              strokeDasharray={db === 0 ? '4 3' : undefined}
            />
            <text
              x={padL - 8}
              y={toYm(db) + 4}
              textAnchor="end"
              fontSize="11"
              fill="currentColor"
              opacity={0.75}
            >
              {db} dB
            </text>
          </g>
        ))}

        <path d={magAsymPath} fill="none" stroke="var(--sl-color-accent)" strokeWidth={2.5} />
        {showExact && (
          <path
            d={magExactPath}
            fill="none"
            stroke="var(--dc-err)"
            strokeWidth={2}
            strokeDasharray="6 4"
          />
        )}

        {/* Anchor dot at omega = 1 */}
        <circle cx={toX(1)} cy={toYm(anchorY)} r={4.5} fill="var(--dc-ok)" />
        {/* Vertices */}
        {vertices.slice(1, -1).map((v, idx) => (
          <circle key={idx} cx={toX(v.w)} cy={toYm(v.db)} r={4} fill="var(--sl-color-accent)" />
        ))}
      </svg>

      {/* Phase SVG */}
      <svg viewBox={`0 0 ${W} ${Hp}`} style={{ width: '100%', height: 'auto', display: 'block' }}>
        {[0.1, 1, 10, 100].map((w) => (
          <line
            key={w}
            x1={toX(w)}
            x2={toX(w)}
            y1={padT}
            y2={Hp - padB}
            stroke="currentColor"
            strokeOpacity={0.18}
          />
        ))}
        {[-270, -180, -90, 0, 90].map((deg) => (
          <g key={deg}>
            <line
              x1={padL}
              x2={W - padR}
              y1={toYp(deg)}
              y2={toYp(deg)}
              stroke="currentColor"
              strokeOpacity={deg === -180 ? 0.5 : 0.14}
              strokeDasharray={deg === -180 ? '4 3' : undefined}
            />
            <text
              x={padL - 8}
              y={toYp(deg) + 4}
              textAnchor="end"
              fontSize="11"
              fill="currentColor"
              opacity={0.75}
            >
              {deg}°
            </text>
          </g>
        ))}
        <path d={phAsymPath} fill="none" stroke="var(--sl-color-accent)" strokeWidth={2.5} />
        {showExact && (
          <path
            d={phExactPath}
            fill="none"
            stroke="var(--dc-err)"
            strokeWidth={2}
            strokeDasharray="6 4"
          />
        )}
        <text x={W / 2} y={Hp - 6} textAnchor="middle" fontSize="11" fill="currentColor" opacity={0.75}>
          Angular Frequency ω [rad/s] (log scale)
        </text>
      </svg>

      <div className="dc-metrics-bar">
        <span>
          <strong style={{ color: 'var(--dc-ok)' }}>● Anchor (1 rad/s):</strong> {(20 * Math.log10(kb)).toFixed(2)} dB
        </span>
        <span>
          <strong>Gain Crossover ω<sub>gc</sub>:</strong> {wc ? `${wc.toFixed(2)} rad/s` : 'none in window'}
        </span>
        <span>
          <strong>Phase Margin φ<sub>m</sub>:</strong>{' '}
          {pm !== null ? (
            <span style={{ color: pm > 0 ? 'var(--dc-ok)' : 'var(--dc-err)', fontWeight: 700 }}>
              {pm.toFixed(1)}°
            </span>
          ) : (
            '—'
          )}
        </span>
        {useZero && (
          <span>
            <strong>Zero Half-Plane:</strong>{' '}
            <span style={{ color: rhpZero ? 'var(--dc-err)' : 'var(--dc-ok)', fontWeight: 700 }}>
              {rhpZero ? `RHP (1 - s/${wz}) [NMP]` : `LHP (1 + s/${wz}) [MP]`}
            </span>
          </span>
        )}
        {mrDb !== null && (
          <span>
            <strong>Resonant Peak M<sub>r</sub>:</strong> +{mrDb.toFixed(2)} dB (ζ &lt; 0.707)
          </span>
        )}
      </div>
        </div>
      </div>
    </div>
  );
}
