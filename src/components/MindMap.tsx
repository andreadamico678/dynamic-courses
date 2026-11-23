import React, { useEffect, useRef, useState } from 'react';
import { Transformer } from 'markmap-lib';
import { Markmap } from 'markmap-view';

interface MindMapProps {
  title?: string;
  markdown: string;
  lang?: 'en' | 'it';
}

const transformer = new Transformer();

export default function MindMap({
  title,
  markdown,
  lang = 'en',
}: MindMapProps) {
  const isIt = lang === 'it';
  const resolvedTitle = title ?? (isIt ? 'Mappa del Capitolo' : 'Chapter Mind Map');
  const svgRef = useRef<SVGSVGElement | null>(null);
  const mmRef = useRef<Markmap | null>(null);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    if (collapsed || !svgRef.current) return;
    const svg = svgRef.current;
    svg.innerHTML = '';
    const { root } = transformer.transform(markdown);
    const mm = Markmap.create(
      svg,
      {
        initialExpandLevel: 2,
        duration: 240,
        paddingX: 14,
      },
      root
    );
    mmRef.current = mm;
    const timer = setTimeout(() => mm.fit(), 60);
    return () => {
      clearTimeout(timer);
      mm.destroy();
      mmRef.current = null;
    };
  }, [markdown, collapsed]);

  return (
    <div className="dc-widget">
      <div className="dc-widget-header">
        <div>
          <span className="dc-badge">{isIt ? 'Mappa Matryoshka' : 'Matryoshka Map'}</span>{' '}
          <span className="dc-widget-title">{resolvedTitle}</span>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {!collapsed && (
            <button
              type="button"
              className="dc-btn"
              onClick={() => mmRef.current?.fit()}
            >
              {isIt ? 'Adatta Vista' : 'Fit View'}
            </button>
          )}
          <button
            type="button"
            className="dc-btn"
            onClick={() => setCollapsed((v) => !v)}
          >
            {collapsed
              ? isIt
                ? 'Mostra Mappa'
                : 'Show Map'
              : isIt
                ? 'Nascondi Mappa'
                : 'Hide Map'}
          </button>
        </div>
      </div>
      {!collapsed && (
        <>
          <svg ref={svgRef} className="dc-mindmap-svg" />
          <p style={{ margin: '0.45rem 0 0', fontSize: '0.78rem', opacity: 0.75 }}>
            {isIt
              ? 'Clicca sui nodi per espandere o comprimere i rami. Scorri per lo zoom, trascina per spostarti.'
              : 'Click nodes to fold/unfold branches. Scroll to zoom, drag to pan.'}
          </p>
        </>
      )}
    </div>
  );
}
