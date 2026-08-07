'use client';

import { CSSProperties } from 'react';
import styles from './TerritoryMask.module.css';
import { useReveal } from '@/lib/motion';
import type { TerritoryMaskData } from '@/lib/atlas';

/**
 * Silueta territorial trazada.
 *
 * Al entrar en viewport dibuja el contorno con `stroke-dashoffset` y después
 * revela el relleno. Con movimiento reducido aparece ya trazada.
 *
 * El truco de la longitud: `stroke-dasharray` necesita un número, y medir la
 * longitud real exigiría `getTotalLength()` sobre cada path en el cliente. En
 * su lugar se usa `pathLength="1"`, que reescala cualquier path a longitud 1 y
 * permite trabajar en fracciones. Un solo atributo evita medir en runtime.
 */

type Props = {
  mask: TerritoryMaskData;
  /** Trazar el contorno al entrar. */
  trace?: boolean;
  /** Rellenar la silueta además de trazarla. */
  filled?: boolean;
  fillOpacity?: number;
  strokeWidth?: number;
  className?: string;
  style?: CSSProperties;
  title?: string;
};

export function TerritoryMask({
  mask,
  trace = true,
  filled = false,
  fillOpacity = 0.14,
  strokeWidth = 1,
  className,
  style,
  title,
}: Props) {
  const { ref, revealed } = useReveal<HTMLDivElement>({ threshold: 0.2 });

  return (
    <div
      ref={ref}
      className={[styles.wrap, className].filter(Boolean).join(' ')}
      style={style}
      data-revealed={revealed || !trace ? 'true' : 'false'}
    >
      <svg
        viewBox={mask.viewBox}
        className={styles.svg}
        role={title ? 'img' : undefined}
        aria-label={title}
        aria-hidden={title ? undefined : 'true'}
        preserveAspectRatio="xMidYMid meet"
      >
        {filled ? (
          <g className={styles.fill} fillRule="evenodd" style={{ opacity: revealed ? fillOpacity : 0 }}>
            {mask.paths.map((d, i) => (
              <path key={i} d={d} fill="currentColor" />
            ))}
          </g>
        ) : null}

        <g className={styles.outline} fill="none" stroke="currentColor" strokeWidth={strokeWidth}>
          {mask.paths.map((d, i) => (
            <path
              key={i}
              d={d}
              pathLength={1}
              vectorEffect="non-scaling-stroke"
              // Los anillos pequeños (islas) entran con el conjunto, no en
              // secuencia: 63 retardos encadenados se leerían como ruido.
              style={{ transitionDelay: `${Math.min(i, 6) * 40}ms` }}
            />
          ))}
        </g>
      </svg>
    </div>
  );
}
