'use client';

import { useState } from 'react';
import { FiguraEditorial } from './FiguraEditorial';
import { VisorDiagrama } from './VisorDiagrama';
import { granularVisuals } from '@/content/granularVisuals';
import styles from './GranularVisuals.module.css';

type AlternativaState = 'concentracion' | 'red';

export function CultivosExplorer() {
  const [active, setActive] = useState<AlternativaState>('concentracion');
  const [visorOpen, setVisorOpen] = useState(false);
  const [visorSrc, setVisorSrc] = useState('');
  const [visorTitle, setVisorTitle] = useState('');

  const openVisor = (src: string, title: string) => {
    setVisorSrc(src);
    setVisorTitle(title);
    setVisorOpen(true);
  };

  const flujos = granularVisuals.cultivosFlujos;
  
  const vis = {
    concentracion: granularVisuals.cultivosConcentracion,
    red: granularVisuals.cultivosRed,
  };
  const currentAlternativa = vis[active];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>
      {/* Lectura principal: Flujos */}
      <FiguraEditorial
        visual={flujos}
        renderAsset={() => (
          <div className={styles.assetContainer} style={{ background: '#fff', color: 'var(--gv-ink)' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={flujos.asset.src}
              alt={flujos.alt}
              style={{
                width: '100%',
                aspectRatio: `${flujos.asset.width} / ${flujos.asset.height}`,
                objectFit: 'contain',
                display: 'block'
              }}
              loading="lazy"
              decoding="async"
            />
          </div>
        )}
      >
        <div className={styles.controls}>
          <button
            type="button"
            className="btn"
            data-v="borde"
            onClick={() => openVisor(flujos.asset.src, flujos.title)}
            aria-label="Ampliar diagrama de flujos"
            style={{ marginLeft: 'auto' }}
          >
            Ampliar diagrama
          </button>
        </div>
      </FiguraEditorial>

      {/* Lecturas alternativas: Concentración o Red */}
      <FiguraEditorial
        visual={currentAlternativa}
        renderAsset={() => (
          <div className={styles.assetContainer} style={{ background: '#fff', color: 'var(--gv-ink)' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={currentAlternativa.asset.src}
              alt={currentAlternativa.alt}
              style={{
                width: '100%',
                aspectRatio: `${currentAlternativa.asset.width} / ${currentAlternativa.asset.height}`,
                objectFit: 'contain',
                display: 'block'
              }}
              loading="lazy"
              decoding="async"
            />
          </div>
        )}
      >
        <div className={styles.controls} role="tablist" aria-label="Explorador de alternativas">
          <button
            type="button"
            role="tab"
            className="btn"
            data-v="fantasma"
            aria-selected={active === 'concentracion'}
            onClick={() => setActive('concentracion')}
          >
            Concentración
          </button>
          <button
            type="button"
            role="tab"
            className="btn"
            data-v="fantasma"
            aria-selected={active === 'red'}
            onClick={() => setActive('red')}
          >
            Red Radial
          </button>
          <button
            type="button"
            className="btn"
            data-v="borde"
            onClick={() => openVisor(currentAlternativa.asset.src, currentAlternativa.title)}
            aria-label="Ampliar diagrama"
            style={{ marginLeft: 'auto' }}
          >
            Ampliar diagrama
          </button>
        </div>
      </FiguraEditorial>

      <VisorDiagrama
        isOpen={visorOpen}
        onClose={() => setVisorOpen(false)}
        src={visorSrc}
        alt={`Vista ampliada: ${visorTitle}`}
      />
    </div>
  );
}
