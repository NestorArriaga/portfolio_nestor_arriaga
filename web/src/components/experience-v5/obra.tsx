'use client';

import { CSSProperties } from 'react';

import type { Guarda, Lamina } from './registry';
import styles from './obra.module.css';

/**
 * La obra: una lámina presentada como objeto, con guarda de densidad.
 *
 * Sustituye al patrón anterior —`object-fit: cover` a pantalla completa más
 * `transform: scale(var(--z))` durante el scroll— que era la causa directa de
 * que las láminas pequeñas del PDF salieran blandas, con sus rótulos impresos
 * gigantes y el territorio recortado por los bordes. Ninguna cantidad de
 * nitidez artificial arregla eso: hay que dejar de ampliarlas.
 *
 * Aquí el ancho máximo lo fija el propio material. `--nativo` es el ancho real
 * del ráster dentro del PDF y `--dpr` el del visitante, así que
 *
 *     ancho máximo en px CSS = nativo / dpr
 *
 * garantiza al menos un píxel de origen por píxel de pantalla. La banda de la
 * composición (54–68vw sobre negro, 44–58vw sobre papel) sólo puede hacer la
 * pieza más pequeña, nunca mayor que su guarda. El scroll desplaza, enmascara
 * o cambia de capa; no agranda el ráster.
 */

/**
 * Ancho del archivo más grande que se sirve para una lámina.
 *
 * No sirve el ancho nativo del manifiesto: el ancho nativo dice qué resolución
 * hay dentro del PDF, pero la guarda tiene que mirar el archivo que el
 * navegador va a descargar de verdad. Se lee del `srcSet`, que es la lista
 * literal de los derivados existentes.
 */
export function anchoServido(img: { srcSet?: string; width: number }): number {
  const anchos = [...(img.srcSet ?? '').matchAll(/\s(\d+)w/g)].map((m) => Number(m[1]));
  return anchos.length ? Math.max(...anchos) : img.width;
}

export function Obra({
  img, guarda, alt, banda = 'negro', clase, nombreVista, children,
}: {
  img: Lamina;
  guarda: Guarda | null;
  alt: string;
  /** Banda de composición: la de negro es más ancha que la de papel. */
  banda?: 'negro' | 'papel' | 'detalle';
  clase?: string;
  /** Nombre de transición de vista: emparejar esta obra con el hero interior
      hace que abrir el proyecto sea una continuación y no un corte. */
  nombreVista?: string;
  /** Geometría registrada sobre la obra, en su mismo encuadre. */
  children?: React.ReactNode;
}) {
  // El techo es el archivo servido más grande; el nativo del PDF sólo cuenta
  // si además existe un derivado de ese tamaño.
  const nativo = Math.min(anchoServido(img), guarda?.nativo ?? Infinity);

  return (
    <figure
      className={`${styles.obra}${clase ? ` ${clase}` : ''}`}
      data-banda={banda}
      style={{
        '--nativo': String(nativo), '--ratio': String(img.ratio),
        ...(nombreVista ? { viewTransitionName: nombreVista } : null),
      } as CSSProperties}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className={styles.pieza}
        src={img.src} srcSet={img.srcSet}
        sizes="(max-width: 720px) 92vw, 62vw"
        width={img.width} height={img.height}
        alt={alt} loading="lazy" decoding="async"
      />
      {children}
    </figure>
  );
}
