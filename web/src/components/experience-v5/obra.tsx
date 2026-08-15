'use client';

import { CSSProperties } from 'react';

import { anchoServido } from '@/lib/densidad';
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

/* La guarda vive en `@/lib/densidad`: la comparte con la composición impresa,
   que se resuelve en el servidor y no puede importar de un módulo de cliente. */
export { anchoServido };

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
