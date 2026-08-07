'use client';

import { ReactNode } from 'react';
import styles from './SignalPoster.module.css';
import { useReveal } from '@/lib/motion';
import { TerritoryMask } from './TerritoryMask';
import type { TerritoryMaskData } from '@/lib/atlas';

/**
 * Interludio tipográfico a pantalla completa — Modo C.
 *
 * Sirve para cambiar de territorio o de familia temática, nunca para presentar
 * datos. Un solo color de señal, retícula visible, silueta real del territorio
 * y un título enorme fragmentado que la atraviesa.
 *
 * La silueta entra 24 px y el título se desplaza 16 px en dirección contraria.
 * Sin rebote, sin glitch: la dirección de arte lo prohíbe explícitamente.
 */

export type PosterVariant = 'signal' | 'mineral';

type Props = {
  /** Palabras del título. Cada una ocupa su propia línea y puede recortarse. */
  words: string[];
  variant?: PosterVariant;
  mask?: TerritoryMaskData | null;
  /** Marcas de borde: número de proyecto, región, disciplina. */
  marks?: { label: string; value: ReactNode }[];
  note?: ReactNode;
  /** Rotar el título a vertical, como en la referencia amarilla. */
  vertical?: boolean;
};

export function SignalPoster({
  words,
  variant = 'signal',
  mask,
  marks = [],
  note,
  vertical = false,
}: Props) {
  const { ref, revealed } = useReveal<HTMLElement>({ threshold: 0.35 });

  return (
    <section
      ref={ref}
      className={styles.poster}
      data-variant={variant}
      data-vertical={vertical ? 'true' : 'false'}
      data-revealed={revealed ? 'true' : 'false'}
    >
      {/* Retícula visible: parte de la composición, no una guía oculta. */}
      <svg className={styles.grid} viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        {[1, 2, 3, 4, 5].map((i) => (
          <line key={`v${i}`} x1={i * 16.66} y1="0" x2={i * 16.66} y2="100" vectorEffect="non-scaling-stroke" />
        ))}
        {[1, 2, 3, 4].map((i) => (
          <line key={`h${i}`} x1="0" y1={i * 20} x2="100" y2={i * 20} vectorEffect="non-scaling-stroke" />
        ))}
      </svg>

      {mask ? (
        <div className={styles.territory}>
          <TerritoryMask mask={mask} trace={false} filled fillOpacity={1} strokeWidth={0} />
        </div>
      ) : null}

      <h2 className={styles.title} aria-label={words.join(' ')}>
        {words.map((word, i) => (
          <span key={`${word}-${i}`} className={styles.word} style={{ transitionDelay: `${i * 70}ms` }} aria-hidden="true">
            {word}
          </span>
        ))}
      </h2>

      {marks.length ? (
        <dl className={styles.marks}>
          {marks.map((m) => (
            <div key={m.label} className={styles.mark}>
              <dt>{m.label}</dt>
              <dd>{m.value}</dd>
            </div>
          ))}
        </dl>
      ) : null}

      {note ? <p className={styles.note}>{note}</p> : null}
    </section>
  );
}
