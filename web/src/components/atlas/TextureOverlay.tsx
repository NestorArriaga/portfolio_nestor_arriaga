import { CSSProperties } from 'react';
import styles from './TextureOverlay.module.css';

/**
 * Grano editorial y textura de papel.
 *
 * Se aplica al 2-5 %: suficiente para que los negros tengan materia y no sean
 * masas planas, insuficiente para leerse como un filtro. Siempre decorativo, y
 * por tanto siempre `aria-hidden` y fuera del flujo del puntero.
 *
 * El ruido se genera con `feTurbulence` en un SVG de tamaño fijo que el
 * navegador escala en mosaico. Un turbulence a pantalla completa es de los
 * filtros más caros que existen; a 180x180 y repetido no se nota en el perfil.
 */

type Props = {
  /** `grain` para ruido de impresión; `paper` para fibra de papel. */
  kind?: 'grain' | 'paper';
  opacity?: number;
  className?: string;
  style?: CSSProperties;
};

const NOISE = {
  grain:
    "data:image/svg+xml;utf8," +
    encodeURIComponent(
      `<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180">` +
        `<filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" seed="11"/>` +
        `<feColorMatrix type="saturate" values="0"/></filter>` +
        `<rect width="180" height="180" filter="url(#n)"/></svg>`,
    ),
  paper:
    "data:image/svg+xml;utf8," +
    encodeURIComponent(
      `<svg xmlns="http://www.w3.org/2000/svg" width="240" height="240">` +
        `<filter id="p"><feTurbulence type="fractalNoise" baseFrequency="0.045 0.9" numOctaves="4" seed="3"/>` +
        `<feColorMatrix type="saturate" values="0"/></filter>` +
        `<rect width="240" height="240" filter="url(#p)"/></svg>`,
    ),
};

export function TextureOverlay({ kind = 'grain', opacity, className, style }: Props) {
  return (
    <div
      aria-hidden="true"
      className={[styles.overlay, className].filter(Boolean).join(' ')}
      style={{
        backgroundImage: `url("${NOISE[kind]}")`,
        opacity: opacity ?? (kind === 'grain' ? 'var(--noise-opacity)' : 'var(--texture-opacity)'),
        ...style,
      }}
    />
  );
}
