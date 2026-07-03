'use client';

import { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';

let initialized = false;

export default function MermaidDiagram({ chart }: { chart: string }) {
  const [svg, setSvg] = useState('');
  const idRef = useRef(`mermaid-${Math.random().toString(36).slice(2)}`);

  useEffect(() => {
    if (!initialized) {
      mermaid.initialize({
        startOnLoad: false,
        theme: 'neutral',
        fontFamily: 'inherit',
      });
      initialized = true;
    }
    mermaid
      .render(idRef.current, chart)
      .then(({ svg }) => setSvg(svg))
      .catch(console.error);
  }, [chart]);

  if (!svg) return null;

  return (
    <figure
      className="my-6 flex flex-col items-center gap-3"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
