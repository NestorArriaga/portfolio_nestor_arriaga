'use client';

import styles from './MapInsetStack.module.css';
import { useReveal, stagger } from '@/lib/motion';

/**
 * Columna de acercamientos con conexión al mapa principal.
 *
 * Cada inset es un recorte real con marco rectangular, título corto y color de
 * señal. La línea que lo une a su punto del mapa se dibuja en el mismo sistema
 * de coordenadas porcentuales del campo, así que se recoloca al cambiar de
 * tamaño sin recalcular nada en JS ni provocar layout shift.
 *
 * En móvil deja de ser columna y pasa a carrusel horizontal, sin autoplay.
 */

export type InsetSpec = {
  src: string;
  srcSet?: string;
  width: number;
  height: number;
  title: string;
  category?: string;
  /** Color de señal del inset. */
  accent?: string;
  /** Punto del mapa al que corresponde, en % del campo. */
  target?: { x: number; y: number };
};

export function MapInsetStack({ insets }: { insets: InsetSpec[] }) {
  const { ref, revealed } = useReveal<HTMLDivElement>({ threshold: 0.2 });

  return (
    <div ref={ref} className={styles.stack} data-revealed={revealed ? 'true' : 'false'}>
      {insets.map((inset, i) => (
        <figure
          key={inset.title}
          className={styles.inset}
          style={{
            ['--inset-accent' as string]: inset.accent ?? 'var(--accent)',
            transitionDelay: stagger(i, 70),
          }}
        >
          <div className={styles.frame}>
            {/* Recortes ya optimizados por el pipeline; ver LayerStack. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={inset.src}
              srcSet={inset.srcSet}
              sizes="(max-width: 900px) 60vw, 18vw"
              width={inset.width}
              height={inset.height}
              alt={inset.title}
              loading="lazy"
              decoding="async"
            />
            {/* Marcas de esquina: el marco de un recorte, no un borde de tarjeta. */}
            <svg className={styles.corners} viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
              <path d="M0 8 V0 H8 M92 0 H100 V8 M100 92 V100 H92 M8 100 H0 V92"
                fill="none" stroke="currentColor" strokeWidth="1" vectorEffect="non-scaling-stroke" />
            </svg>
          </div>
          <figcaption className={styles.caption}>
            <span className={styles.title}>{inset.title}</span>
            {inset.category ? <span className={styles.category}>{inset.category}</span> : null}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}

/**
 * Líneas que unen cada inset con su punto en el mapa. Se monta dentro del campo
 * cartográfico, no dentro de la columna de insets, porque las coordenadas son
 * las del mapa.
 */
export function InsetConnectors({ insets }: { insets: InsetSpec[] }) {
  const targets = insets.filter((i) => i.target);
  if (!targets.length) return null;

  return (
    <svg className={styles.connectors} viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
      {targets.map((inset) => {
        const t = inset.target!;
        return (
          <g key={inset.title} style={{ color: inset.accent ?? 'var(--accent)' }}>
            <rect x={t.x - 4} y={t.y - 4} width="8" height="8" fill="none"
              stroke="currentColor" strokeWidth="1" vectorEffect="non-scaling-stroke" />
            <path d={`M ${t.x - 4} ${t.y} L 0 ${t.y}`} fill="none" stroke="currentColor"
              strokeWidth="1" strokeDasharray="2 2" vectorEffect="non-scaling-stroke" opacity="0.7" />
          </g>
        );
      })}
    </svg>
  );
}
