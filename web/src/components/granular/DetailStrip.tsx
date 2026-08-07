'use client';

import styles from './DetailStrip.module.css';
import { useReveal, stagger } from '@/lib/motion';
import type { Inset } from '@/lib/atlas';

/**
 * Columna de detalles de un pilar.
 *
 * Recortes reales de las páginas de origen, en marco rectangular con marcas de
 * esquina, como en la referencia de lámina con insets.
 *
 * Lo que no lleva es la línea que une cada recorte con su punto en el mapa. El
 * inventario registra página, dimensión, escala y tipo de cada activo, pero no
 * dónde cae dentro del territorio. Trazar esa línea a un punto elegido a ojo
 * afirmaría una ubicación que no consta en ninguna parte, así que el recorte se
 * presenta por lo que es: un detalle de la página, con su número de página.
 *
 * Solo se monta cuando hay al menos dos recortes. Uno suelto no es una columna
 * de detalles, es una imagen perdida.
 */

export function DetailStrip({ insets, accent }: { insets: Inset[]; accent?: string }) {
  const { ref, revealed } = useReveal<HTMLDivElement>({ threshold: 0.15 });

  return (
    <div
      ref={ref}
      className={styles.strip}
      data-revealed={revealed ? 'true' : 'false'}
      style={accent ? ({ ['--accent' as string]: accent }) : undefined}
    >
      {insets.map((inset, i) => {
        const widths = Object.keys(inset.files).map(Number).sort((a, b) => a - b);
        const largest = String(widths[widths.length - 1]);
        const srcSet = widths.map((w) => `${inset.files[String(w)]} ${w}w`).join(', ');

        return (
          <figure
            key={inset.slug}
            className={styles.inset}
            style={{ transitionDelay: stagger(i, 70) }}
          >
            {/* Ventana de proporción uniforme: con las proporciones naturales
                la tira queda dentada y los pies caen a distinta altura. La
                imagen se recorta con object-fit; el archivo conserva su
                proporción original. */}
            <div className={styles.frame}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={inset.files[largest]}
                srcSet={srcSet}
                sizes="(max-width: 900px) 60vw, 18vw"
                width={inset.native_px[0]}
                height={inset.native_px[1]}
                alt={`Detalle de la página ${inset.page}`}
                loading="lazy"
                decoding="async"
              />
              <svg className={styles.corners} viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                <path
                  d="M0 9 V0 H9 M91 0 H100 V9 M100 91 V100 H91 M9 100 H0 V91"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>
            </div>
            <figcaption className={styles.caption}>
              <span className={styles.page}>p.{inset.page}</span>
              {/* No se rotula tipo ni escala: el inventario los registra por
                  página, no por recorte, y heredarlos etiquetaría cinco
                  detalles distintos con el mismo descriptor. */}
              <span className={styles.scale}>
                {inset.native_px[0]}×{inset.native_px[1]} px
              </span>
            </figcaption>
          </figure>
        );
      })}
    </div>
  );
}
