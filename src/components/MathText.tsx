import React from 'react';
import katex from 'katex';

interface MathTextProps {
  text: string;
}

interface Segment {
  kind: 'text' | 'math';
  value: string;
}

function splitMath(input: string): Segment[] {
  const out: Segment[] = [];
  let i = 0;
  let buf = '';

  while (i < input.length) {
    if (input[i] === '\\' && input[i + 1] === '$') {
      buf += '$';
      i += 2;
      continue;
    }

    if (input[i] === '$') {
      const close = input.indexOf('$', i + 1);
      if (close > i + 1) {
        if (buf) {
          out.push({ kind: 'text', value: buf });
          buf = '';
        }
        out.push({ kind: 'math', value: input.slice(i + 1, close) });
        i = close + 1;
        continue;
      }
    }

    buf += input[i];
    i += 1;
  }

  if (buf) out.push({ kind: 'text', value: buf });
  return out;
}

export default function MathText({ text }: MathTextProps) {
  const segments = splitMath(text);

  return (
    <>
      {segments.map((seg, idx) => {
        if (seg.kind === 'text') {
          return <React.Fragment key={idx}>{seg.value}</React.Fragment>;
        }
        try {
          const html = katex.renderToString(seg.value, {
            displayMode: false,
            throwOnError: false,
            strict: false,
          });
          return (
            <span
              key={idx}
              className="dc-inline-math"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          );
        } catch {
          return <code key={idx}>{seg.value}</code>;
        }
      })}
    </>
  );
}
