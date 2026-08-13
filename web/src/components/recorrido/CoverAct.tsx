'use client';

import { forwardRef } from 'react';

import { TextureOverlay } from '@/components/atlas/TextureOverlay';
import styles from './CoverAct.module.css';

/**
 * Acto 0 — portada.
 *
 * Pieza de identidad, no de proyecto: aquí no entra ninguna imagen, ningún
 * mapa y ningún color de proyecto. Solo negro mineral, papel, el amarillo de
 * señal y las quince unidades, que las dibuja `UnitField` por encima.
 *
 * El nombre se dibuja dos veces. La copia de tinta vive dentro de la banda de
 * papel, con `overflow: hidden`, y `.bandInner` deshace exactamente el
 * desplazamiento que la banda le aplicó. Las dos se anulan, así que el registro
 * es exacto por construcción: no hay ningún cálculo por línea que descuadrar al
 * cambiar el cuerpo de letra o el viewport.
 *
 * Las medidas del corte van en `em` del propio nombre. Cuando estaban en
 * porcentaje del viewport, a 900 px de alto la banda ni siquiera tocaba el
 * texto.
 */

type Props = {
  nameLines: readonly string[];
  role: string;
  year: string;
  /** 0 = portada intacta, 1 = ya cedió el paso al recorrido. */
  t: number;
};

export const CoverAct = forwardRef<HTMLElement, Props>(function CoverAct(
  { nameLines, role, year, t },
  ref,
) {
  return (
    <section ref={ref} className={styles.act} data-t={t > 0.6 ? 'out' : undefined}>
      <div className={styles.stage}>
        {/* Retícula: 12 columnas en escritorio. Entra antes que nada. */}
        <svg className={styles.grid} viewBox="0 0 120 100" preserveAspectRatio="none" aria-hidden="true">
          {Array.from({ length: 11 }, (_, i) => (i + 1) * 10).map((x) => (
            <line key={x} x1={x} y1="0" x2={x} y2="100" vectorEffect="non-scaling-stroke" />
          ))}
          {[20, 40, 60, 80].map((y) => (
            <line key={y} x1="0" y1={y} x2="120" y2={y} vectorEffect="non-scaling-stroke" />
          ))}
        </svg>

        {/* Marcas de registro en las cuatro esquinas. */}
        <svg className={styles.marks} viewBox="0 0 120 100" aria-hidden="true">
          {[[6, 6], [114, 6], [6, 94], [114, 94]].map(([x, y]) => (
            <g key={`${x}-${y}`}>
              <line x1={x - 3} y1={y} x2={x + 3} y2={y} vectorEffect="non-scaling-stroke" />
              <line x1={x} y1={y - 3} x2={x} y2={y + 3} vectorEffect="non-scaling-stroke" />
              <circle cx={x} cy={y} r="1.6" fill="none" vectorEffect="non-scaling-stroke" />
            </g>
          ))}
        </svg>

        <h1 className={styles.name}>
          {nameLines.map((l, i) => (
            <span key={l} className={styles.line} data-i={i}>
              <span className={styles.reveal}>{l}</span>
            </span>
          ))}

          <span className={styles.band} aria-hidden="true">
            <span className={styles.bandInner}>
              {nameLines.map((l, i) => (
                <span key={l} className={styles.line} data-i={i}>
                  <span className={styles.reveal}>{l}</span>
                </span>
              ))}
            </span>
          </span>
        </h1>

        <p className={styles.role}>{role}</p>
        <p className={styles.year}>{year}</p>

        <TextureOverlay kind="paper" opacity={0.05} />
      </div>
    </section>
  );
});
