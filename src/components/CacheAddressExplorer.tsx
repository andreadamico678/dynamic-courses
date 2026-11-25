import React, { useState } from 'react';

const CACHE_SIZES = [
  { label: '1 KB', bytes: 1024 },
  { label: '4 KB', bytes: 4096 },
  { label: '16 KB', bytes: 16384 },
  { label: '32 KB', bytes: 32768 },
  { label: '64 KB', bytes: 65536 },
];

const BLOCK_SIZES = [16, 32, 64, 128];
const WAYS = [1, 2, 4, 8];

export default function CacheAddressExplorer() {
  const [cacheBytes, setCacheBytes] = useState(16384);
  const [blockBytes, setBlockBytes] = useState(64);
  const [ways, setWays] = useState(4);
  const [addrHex, setAddrHex] = useState('004012AC');

  const numBlocks = Math.max(1, Math.floor(cacheBytes / blockBytes));
  const effWays = Math.min(ways, numBlocks);
  const numSets = Math.max(1, Math.floor(numBlocks / effWays));

  const mOffset = Math.round(Math.log2(blockBytes));
  const nIndex = Math.round(Math.log2(numSets));
  const tTag = 32 - nIndex - mOffset;

  const parsedAddr = parseInt(addrHex.replace(/^0x/i, '') || '0', 16) >>> 0;
  const offsetVal = parsedAddr & ((1 << mOffset) - 1);
  const indexVal = nIndex === 0 ? 0 : (parsedAddr >>> mOffset) & ((1 << nIndex) - 1);
  const tagVal = tTag === 32 ? parsedAddr : parsedAddr >>> (mOffset + nIndex);
  const blockAddr = Math.floor(parsedAddr / blockBytes);

  return (
    <div className="dc-widget not-content">
      <div className="dc-widget-header">
        <div className="dc-widget-heading">
          <span className="dc-badge">Interactive Lab</span>
          <span className="dc-widget-title">32-Bit Cache Address Partitioning &amp; Set Decoder</span>
        </div>
        <span style={{ fontWeight: 700, fontSize: '0.86rem', color: 'var(--dc-ok)' }}>
          Tag: {tTag}b · Index: {nIndex}b · Offset: {mOffset}b
        </span>
      </div>

      <div className="dc-controls" style={{ gap: '0.65rem', flexWrap: 'wrap' }}>
        <label style={{ fontSize: '0.84rem' }}>
          <span>Capacity C: </span>
          <select value={cacheBytes} onChange={(e) => setCacheBytes(Number(e.target.value))}>
            {CACHE_SIZES.map((c) => (
              <option key={c.bytes} value={c.bytes}>{c.label}</option>
            ))}
          </select>
        </label>
        <label style={{ fontSize: '0.84rem' }}>
          <span>Block B: </span>
          <select value={blockBytes} onChange={(e) => setBlockBytes(Number(e.target.value))}>
            {BLOCK_SIZES.map((b) => (
              <option key={b} value={b}>{b} B</option>
            ))}
          </select>
        </label>
        <label style={{ fontSize: '0.84rem' }}>
          <span>Ways N: </span>
          <select value={ways} onChange={(e) => setWays(Number(e.target.value))}>
            {WAYS.map((w) => (
              <option key={w} value={w}>{w === 1 ? '1 (Direct-Mapped)' : `${w}-Way`}</option>
            ))}
          </select>
        </label>
        <label style={{ fontSize: '0.84rem' }}>
          <span>Hex Addr: 0x</span>
          <input
            type="text"
            maxLength={8}
            value={addrHex}
            onChange={(e) => setAddrHex(e.target.value.replace(/[^0-9a-fA-F]/g, '').toUpperCase())}
            style={{ width: '92px', fontFamily: 'monospace', padding: '0.2rem 0.35rem', borderRadius: '4px', border: '1px solid var(--dc-border)', background: 'var(--dc-surface)', color: 'inherit' }}
          />
        </label>
      </div>

      <div style={{ display: 'flex', width: '100%', height: '38px', borderRadius: '6px', overflow: 'hidden', border: '1px solid var(--dc-border)', margin: '0.6rem 0', fontSize: '0.8rem', fontWeight: 700 }}>
        <div style={{ width: `${(tTag / 32) * 100}%`, background: 'rgba(59, 130, 246, 0.22)', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid var(--dc-border)' }}>
          Tag ({tTag}b)
        </div>
        {nIndex > 0 && (
          <div style={{ width: `${(nIndex / 32) * 100}%`, background: 'rgba(16, 185, 129, 0.24)', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid var(--dc-border)' }}>
            Index ({nIndex}b)
          </div>
        )}
        <div style={{ width: `${(mOffset / 32) * 100}%`, background: 'rgba(245, 158, 11, 0.24)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          Offset ({mOffset}b)
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(175px, 1fr))', gap: '0.6rem', fontSize: '0.83rem' }}>
        <div><strong>Blocks NB = C/B:</strong> {numBlocks}</div>
        <div><strong>Sets NS = NB/N:</strong> {numSets}</div>
        <div><strong>Block # j:</strong> {blockAddr}</div>
        <div><strong>Mapped Set (j mod NS):</strong> Set {indexVal}</div>
        <div><strong>Decoded Tag:</strong> 0x{tagVal.toString(16).toUpperCase()}</div>
        <div><strong>Byte Offset:</strong> {offsetVal} (0x{offsetVal.toString(16).toUpperCase()})</div>
      </div>
    </div>
  );
}
