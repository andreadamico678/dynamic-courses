import React, { useMemo, useState } from 'react';

interface Instr {
  asm: string;
  op: 'lw' | 'sw' | 'alu';
  rd: string | null;
  rs: string[];
}

const TRACES: { label: string; note: string; code: Instr[] }[] = [
  {
    label: 'Load-Use + ALU Chain (Exam Classic)',
    note: 'Full forwarding eliminates ALU→ALU stalls, but lw→add at distance 1 still forces 1 Load-Use stall bubble.',
    code: [
      { asm: 'lw   x1, 0(x2)', op: 'lw', rd: 'x1', rs: ['x2'] },
      { asm: 'add  x3, x1, x4', op: 'alu', rd: 'x3', rs: ['x1', 'x4'] },
      { asm: 'sub  x5, x3, x6', op: 'alu', rd: 'x5', rs: ['x3', 'x6'] },
      { asm: 'or   x7, x1, x8', op: 'alu', rd: 'x7', rs: ['x1', 'x8'] },
    ],
  },
  {
    label: 'Scheduled Code (Zero Stalls)',
    note: 'Interleaving an independent lw fills the Load-Use delay slot so full forwarding runs at 0 stalls!',
    code: [
      { asm: 'lw   t0, 0(s0)', op: 'lw', rd: 't0', rs: ['s0'] },
      { asm: 'lw   t2, 4(s0)', op: 'lw', rd: 't2', rs: ['s0'] },
      { asm: 'add  t1, t0, s1', op: 'alu', rd: 't1', rs: ['t0', 's1'] },
      { asm: 'sub  t3, t2, s3', op: 'alu', rd: 't3', rs: ['t2', 's3'] },
    ],
  },
  {
    label: 'ALU Cascade (Distance 1 & 2)',
    note: 'Without forwarding, distance-1 RAW costs 2 stalls; with EX/MEM & MEM/WB forwarding, 0 stalls!',
    code: [
      { asm: 'add  x1, x2, x3', op: 'alu', rd: 'x1', rs: ['x2', 'x3'] },
      { asm: 'sub  x4, x1, x5', op: 'alu', rd: 'x4', rs: ['x1', 'x5'] },
      { asm: 'and  x6, x1, x7', op: 'alu', rd: 'x6', rs: ['x1', 'x7'] },
      { asm: 'xor  x8, x4, x6', op: 'alu', rd: 'x8', rs: ['x4', 'x6'] },
    ],
  },
];

interface SimRow {
  asm: string;
  cells: string[];
  badge: string;
}

function simulatePipeline(code: Instr[], forwarding: boolean): { rows: SimRow[]; totalCycles: number; totalStalls: number } {
  // Track for each instruction: cycle of IF, ID, EX, MEM, WB
  const stagesHistory: { IF: number; ID: number; EX: number; MEM: number; WB: number; op: Instr['op']; rd: string | null }[] = [];
  const rows: SimRow[] = [];
  let totalStalls = 0;

  for (let i = 0; i < code.length; i++) {
    const ins = code[i];
    const ifCyc = i === 0 ? 1 : stagesHistory[i - 1].ID; // enters IF when previous enters ID
    let idCyc = i === 0 ? 2 : Math.max(ifCyc + 1, stagesHistory[i - 1].EX);
    let exCyc = idCyc + 1;
    const badges: string[] = [];

    // Check RAW hazards against all older instructions j < i
    for (let j = Math.max(0, i - 3); j < i; j++) {
      const prod = stagesHistory[j];
      if (!prod.rd || prod.rd === 'x0') continue;
      if (!ins.rs.includes(prod.rd)) continue;

      if (!forwarding) {
        // With double-pumped Register File, operand is readable in ID on or after prod.WB
        // Wait: stall happens in ID so EX starts at prod.WB + 1 (meaning ID completes at prod.WB)
        if (exCyc <= prod.WB) {
          exCyc = prod.WB + 1;
          badges.push(`RAW(${prod.rd})`);
        }
      } else {
        // Forwarding available: ALU result ready after prod.EX (usable in EX at prod.EX + 1)
        // Load result ready after prod.MEM (usable in EX at prod.MEM + 1)
        const readyForEx = prod.op === 'lw' ? prod.MEM + 1 : prod.EX + 1;
        if (exCyc < readyForEx) {
          exCyc = readyForEx;
          badges.push(`Load-Use(${prod.rd})`);
        } else if (exCyc === prod.EX + 1 && prod.op === 'alu') {
          badges.push(`EX→EX(${prod.rd})`);
        } else if (exCyc === prod.MEM + 1) {
          badges.push(`MEM→EX(${prod.rd})`);
        }
      }
    }

    const stallsHere = exCyc - (idCyc + 1);
    totalStalls += stallsHere;
    const memCyc = exCyc + 1;
    const wbCyc = memCyc + 1;
    stagesHistory.push({ IF: ifCyc, ID: idCyc, EX: exCyc, MEM: memCyc, WB: wbCyc, op: ins.op, rd: ins.rd });

    const cells: string[] = [];
    for (let c = 1; c <= wbCyc; c++) {
      if (c === ifCyc) cells.push('IF');
      else if (c > ifCyc && c < idCyc) cells.push('—');
      else if (c === idCyc) cells.push('ID');
      else if (c > idCyc && c < exCyc) cells.push('STALL');
      else if (c === exCyc) cells.push('EX');
      else if (c === memCyc) cells.push('MEM');
      else if (c === wbCyc) cells.push('WB');
      else cells.push('');
    }
    rows.push({ asm: ins.asm, cells, badge: badges.join(', ') || 'No hazard' });
  }

  const totalCycles = stagesHistory[stagesHistory.length - 1].WB;
  return { rows, totalCycles, totalStalls };
}

export default function PipelineExplorer() {
  const [traceIdx, setTraceIdx] = useState(0);
  const [forwarding, setForwarding] = useState(true);

  const trace = TRACES[traceIdx];
  const sim = useMemo(() => simulatePipeline(trace.code, forwarding), [trace, forwarding]);
  const cpi = sim.totalCycles / trace.code.length;

  return (
    <div className="dc-widget not-content">
      <div className="dc-widget-header">
        <div className="dc-widget-heading">
          <span className="dc-badge">Interactive Lab</span>
          <span className="dc-widget-title">5-Stage RISC-V Pipeline Hazard &amp; Forwarding Simulator</span>
        </div>
        <span style={{ fontWeight: 700, fontSize: '0.86rem', color: sim.totalStalls === 0 ? 'var(--dc-ok)' : 'var(--dc-warn)' }}>
          {sim.totalCycles} Cycles · {sim.totalStalls} Stall{sim.totalStalls === 1 ? '' : 's'} · Eff. {cpi.toFixed(2)} cyc/instr
        </span>
      </div>

      <div className="dc-controls" style={{ gap: '0.6rem', flexWrap: 'wrap' }}>
        <select
          value={traceIdx}
          onChange={(e) => setTraceIdx(Number(e.target.value))}
          style={{ padding: '0.35rem 0.6rem', borderRadius: '6px', border: '1px solid var(--dc-border)', background: 'var(--dc-surface)', color: 'inherit', fontSize: '0.86rem' }}
        >
          {TRACES.map((t, idx) => (
            <option key={t.label} value={idx}>
              {t.label}
            </option>
          ))}
        </select>

        <button
          type="button"
          className="dc-btn"
          onClick={() => setForwarding(true)}
          style={{ fontWeight: forwarding ? 700 : 400, borderColor: forwarding ? 'var(--dc-ok)' : undefined }}
        >
          Full Forwarding: ON
        </button>
        <button
          type="button"
          className="dc-btn"
          onClick={() => setForwarding(false)}
          style={{ fontWeight: !forwarding ? 700 : 400, borderColor: !forwarding ? 'var(--dc-warn)' : undefined }}
        >
          Forwarding: OFF (Stall Only)
        </button>
      </div>

      <p style={{ margin: '0 0 0.65rem', fontSize: '0.85rem', color: 'var(--dc-muted)' }}>{trace.note}</p>

      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem', fontFamily: 'var(--sl-font-mono, monospace)' }}>
          <thead>
            <tr>
              <th style={{ textAlign: 'left', padding: '0.35rem 0.5rem', borderBottom: '1px solid var(--dc-border)' }}>Instruction</th>
              {Array.from({ length: sim.totalCycles }, (_, idx) => (
                <th key={idx} style={{ textAlign: 'center', padding: '0.35rem 0.3rem', borderBottom: '1px solid var(--dc-border)', minWidth: '34px' }}>
                  C{idx + 1}
                </th>
              ))}
              <th style={{ textAlign: 'left', padding: '0.35rem 0.5rem', borderBottom: '1px solid var(--dc-border)' }}>Hazard / Bypass</th>
            </tr>
          </thead>
          <tbody>
            {sim.rows.map((r, rIdx) => (
              <tr key={rIdx}>
                <td style={{ padding: '0.35rem 0.5rem', whiteSpace: 'nowrap', borderBottom: '1px solid var(--dc-border)' }}>{r.asm}</td>
                {Array.from({ length: sim.totalCycles }, (_, cIdx) => {
                  const stage = r.cells[cIdx] ?? '';
                  const isStall = stage === 'STALL';
                  return (
                    <td
                      key={cIdx}
                      style={{
                        textAlign: 'center',
                        padding: '0.3rem 0.2rem',
                        borderBottom: '1px solid var(--dc-border)',
                        fontWeight: stage ? 600 : 400,
                        color: isStall ? 'var(--dc-err)' : undefined,
                        background: isStall ? 'rgba(220, 53, 69, 0.12)' : stage ? 'rgba(59, 130, 246, 0.08)' : undefined,
                      }}
                    >
                      {isStall ? 'BUB' : stage}
                    </td>
                  );
                })}
                <td style={{ padding: '0.35rem 0.5rem', whiteSpace: 'nowrap', borderBottom: '1px solid var(--dc-border)', fontSize: '0.76rem', color: 'var(--dc-muted)' }}>
                  {r.badge}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
