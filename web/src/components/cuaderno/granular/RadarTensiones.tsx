'use client';

import { useState } from 'react';
import { FiguraEditorial } from './FiguraEditorial';
import { granularVisuals } from '@/content/granularVisuals';
import styles from './GranularVisuals.module.css';

type RadarState = 'tensiones' | 'efectos' | 'respuestas' | 'sintesis';

const STATES: { id: RadarState; label: string; desc: string }[] = [
  { id: 'tensiones', label: 'Tensiones', desc: 'Presiones históricas (1990-2025). Relaciones documentadas · no causalidad.' },
  { id: 'efectos', label: 'Territorio', desc: 'Impactos en el territorio y acuíferos. Relaciones documentadas · no causalidad.' },
  { id: 'respuestas', label: 'Respuestas', desc: 'Respuestas institucionales y políticas. Relaciones documentadas · no causalidad.' },
  { id: 'sintesis', label: 'Síntesis', desc: 'Sistema completo' },
];

export function RadarTensiones() {
  const visual = granularVisuals.aguaRadar;
  const [active, setActive] = useState<RadarState>('tensiones');

  return (
    <FiguraEditorial
      visual={visual}
      className={styles.radarWrapper}
      renderAsset={() => (
        <div className={styles.radarInteractive} style={{ color: 'var(--gv-ink)' }}>
          <div className={styles.radarContainer}>
            {/* Imagen base */}
            <img
              src={visual.asset.src}
              alt={visual.alt}
              className={styles.radarImg}
              loading="lazy"
              decoding="async"
            />
            {/* Overlays estáticos con opacidad animada */}
            <div 
              className={styles.radarOverlay} 
              style={{ clipPath: 'polygon(0 0, 35% 0, 35% 100%, 0 100%)', opacity: active === 'tensiones' ? 1 : 0 }} 
            />
            <div 
              className={styles.radarOverlay} 
              style={{ clipPath: 'polygon(30% 0, 70% 0, 70% 100%, 30% 100%)', opacity: active === 'efectos' ? 1 : 0 }} 
            />
            <div 
              className={styles.radarOverlay} 
              style={{ clipPath: 'polygon(65% 0, 100% 0, 100% 100%, 65% 100%)', opacity: active === 'respuestas' ? 1 : 0 }} 
            />
            <div 
              className={styles.radarOverlay} 
              style={{ clipPath: 'none', opacity: active === 'sintesis' ? 0 : 0.6 }} 
              data-desc="Esta capa oscurece levemente todo cuando no es síntesis para resaltar el área iluminada, o al revés: mejor iluminar la zona activa."
            />
          </div>
        </div>
      )}
    >
      <div className={styles.controls} role="group" aria-label="Controles del diagrama">
        {STATES.map((s) => (
          <button
            key={s.id}
            type="button"
            className="btn"
            data-v="fantasma"
            aria-pressed={active === s.id}
            onClick={() => setActive(s.id)}
          >
            {s.label}
          </button>
        ))}
      </div>
      <p className={`${styles.detalle} mono`} aria-live="polite">
        {STATES.find(s => s.id === active)?.desc}
      </p>
    </FiguraEditorial>
  );
}
