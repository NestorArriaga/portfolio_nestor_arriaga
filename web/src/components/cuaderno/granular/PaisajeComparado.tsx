'use client';

import { FiguraEditorial } from './FiguraEditorial';
import { granularVisuals } from '@/content/granularVisuals';

export function PaisajeComparado() {
  const visAgricola = granularVisuals.paisajeAgricola;
  const visAgropecuario = granularVisuals.paisajeAgropecuario;

  const baseVisual = {
    ...visAgricola,
    title: 'DOS PAISAJES PRODUCTIVOS',
    caption: 'Comparación del paisaje agrícola (izquierda/arriba) frente al paisaje agropecuario intensificado (derecha/abajo).',
  };

  return (
    <FiguraEditorial
      visual={baseVisual}
      renderAsset={() => (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
          gap: '1rem',
          background: '#fff',
          padding: '1rem',
          alignItems: 'end'
        }}>
          <div>
            <p className="mono" style={{ fontSize: '0.75rem', marginBottom: '0.5rem', color: 'var(--gv-ink)' }}>AGRÍCOLA</p>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={visAgricola.asset.src}
              alt={visAgricola.alt}
              style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'contain' }}
              loading="lazy"
              decoding="async"
            />
          </div>
          <div>
            <p className="mono" style={{ fontSize: '0.75rem', marginBottom: '0.5rem', color: 'var(--gv-ink)' }}>AGROPECUARIO</p>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={visAgropecuario.asset.src}
              alt={visAgropecuario.alt}
              style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'contain' }}
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      )}
    />
  );
}
