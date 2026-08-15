import { ReactNode } from 'react';

import type { GranularVisual } from '@/content/granularVisuals';
import styles from './Granular.module.css';

/**
 * Figura de GRANULAR con su pie editorial.
 *
 * La versión anterior colgaba de cada imagen una rejilla de cuatro celdas —
 * ámbito, periodo, unidad y procedencia— dentro de un recuadro que pesaba más
 * que la propia lámina y hacía que siete pilares distintos parecieran el mismo
 * formulario. Aquí los mismos datos se componen como una línea técnica: se leen
 * cuando hacen falta y no compiten con la evidencia.
 *
 * Los campos que la fuente no documenta no se imprimen. Un `Periodo: año no
 * indicado` convierte la ausencia de dato en protagonista visual; la cautela va
 * en `alcance`, que es donde la fuente la declara.
 */

/** Marcas de «este campo no consta» que la fuente escribe como si fueran valor. */
const SIN_DATO = [
  'no aplica',
  'año no indicado explícitamente',
  'año no documentado',
  'año no indicado',
  'sin unidad',
  'fuente específica no indicada en la composición',
];

function util(valor?: string): string | undefined {
  if (!valor) return undefined;
  return SIN_DATO.includes(valor.trim().toLowerCase()) ? undefined : valor;
}

export function FiguraEditorial({
  visual, children, obra, fondo, tituloComo = 'p',
}: {
  visual: GranularVisual;
  /** Controles del instrumento; van bajo el pie, no encima de la obra. */
  children?: ReactNode;
  /** Composición propia del instrumento. Sin ella se monta la lámina base. */
  obra?: ReactNode;
  /** Superficie del montaje cuando la pieza ya trae fondo oscuro. */
  fondo?: 'papel' | 'tinta';
  tituloComo?: 'p' | 'h3';
}) {
  const datos = [
    ['Ámbito', util(visual.scope)],
    ['Periodo', util(visual.period)],
    ['Unidad', util(visual.unit)],
    ['Procedencia', util(visual.source)],
  ].filter((x): x is [string, string] => Boolean(x[1]));

  const Titulo = tituloComo;

  return (
    <figure className={styles.figura}>
      <div className={styles.montaje} data-fondo={fondo === 'tinta' ? 'tinta' : undefined}>
        {obra ?? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={visual.asset.src}
            srcSet={visual.asset.srcSet}
            sizes="92vw"
            alt={visual.alt}
            width={Math.round(visual.asset.width)}
            height={Math.round(visual.asset.height)}
            loading="lazy"
            decoding="async"
          />
        )}
      </div>

      <figcaption className={styles.pie}>
        <Titulo className={styles.pieTitulo}>{visual.title}</Titulo>

        {datos.length ? (
          <dl className={`${styles.pieDatos} mono`}>
            {datos.map(([k, v]) => (
              <div key={k}><dt>{k}</dt><dd>{v}</dd></div>
            ))}
          </dl>
        ) : null}

        {visual.caption ? <p className={styles.pieLectura}>{visual.caption}</p> : null}

        {visual.limitations ? (
          <p className={`${styles.alcance} mono`}>
            <b>Alcance. </b>{visual.limitations}
          </p>
        ) : null}

        {children}
      </figcaption>
    </figure>
  );
}
