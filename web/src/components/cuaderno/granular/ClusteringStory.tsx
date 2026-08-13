'use client';

import { useState } from 'react';
import { FiguraEditorial } from './FiguraEditorial';
import { VisorDiagrama } from './VisorDiagrama';
import { granularVisuals } from '@/content/granularVisuals';
import styles from './GranularVisuals.module.css';

export function ClusteringStory() {
  const [visorOpen, setVisorOpen] = useState(false);
  const [visorSrc, setVisorSrc] = useState('');
  const [visorTitle, setVisorTitle] = useState('');

  const openVisor = (src: string, title: string) => {
    setVisorSrc(src);
    setVisorTitle(title);
    setVisorOpen(true);
  };

  const secciones = [
    { id: 'loc', visual: granularVisuals.clusteringLoc },
    { id: 'clas', visual: granularVisuals.clusteringCoropletico, canZoom: true },
    { id: 'tam', visual: granularVisuals.clusteringSize },
    { id: 'rel', visual: granularVisuals.clusteringRelaciones, canZoom: true },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6rem' }}>
      {/* Riel de navegación local opcional */}
      <nav style={{ position: 'sticky', top: '0', background: 'var(--tinta)', zIndex: 10, padding: '1rem 0', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        <div className={styles.controls} style={{ margin: 0, justifyContent: 'center' }}>
          {secciones.map(s => (
            <a key={s.id} href={`#clustering-${s.id}`} className="btn" data-v="fantasma" data-touch>
              {s.visual.title.split(' ')[0]}
            </a>
          ))}
        </div>
      </nav>

      {secciones.map((s, index) => (
        <div key={s.id} id={`clustering-${s.id}`} style={{ scrollMarginTop: '6rem' }}>
          <FiguraEditorial
            visual={s.visual}
            renderAsset={() => (
              <div className={styles.assetContainer} style={{ background: '#fff', color: 'var(--gv-ink)' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={s.visual.asset.src}
                  alt={s.visual.alt}
                  style={{
                    width: '100%',
                    aspectRatio: `${s.visual.asset.width} / ${s.visual.asset.height}`,
                    maxHeight: index === 0 ? 'none' : '70vh',
                    objectFit: 'contain',
                    display: 'block'
                  }}
                  loading="lazy"
                  decoding="async"
                />
              </div>
            )}
          >
            {s.canZoom && (
              <div className={styles.controls}>
                <button
                  type="button"
                  className="btn"
                  data-v="borde"
                  onClick={() => openVisor(s.visual.asset.src, s.visual.title)}
                  aria-label={`Ampliar diagrama de ${s.visual.title}`}
                  style={{ marginLeft: 'auto' }}
                >
                  Ampliar diagrama
                </button>
              </div>
            )}
          </FiguraEditorial>
        </div>
      ))}

      <VisorDiagrama
        isOpen={visorOpen}
        onClose={() => setVisorOpen(false)}
        src={visorSrc}
        alt={`Vista ampliada: ${visorTitle}`}
      />
    </div>
  );
}
