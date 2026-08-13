'use client';

import { CSSProperties } from 'react';

import { CLOSING, POSTER, lerp, railPos } from './units';
import styles from './UnitField.module.css';

/**
 * Las quince unidades, en una sola capa fija.
 *
 * Es el hilo que cose el recorrido entero: la constelación de la portada, el
 * riel de progreso y el arco del cierre son **los mismos quince elementos**
 * cambiando de sitio. Nunca hay un fundido entre dos conjuntos distintos.
 *
 * Por qué `position: fixed` y no una capa por escena: el riel tiene que seguir
 * visible durante todo el scroll, y la portada ocupa el viewport. Con una capa
 * fija los tres estados comparten sistema de coordenadas —fracciones del
 * viewport— y pasar de uno a otro es interpolar dos números. Una capa por
 * escena obligaría a medir posiciones entre contenedores en cada fotograma.
 *
 * En el riel cada unidad es un botón real: salta a su proyecto dentro del
 * recorrido. Durante la portada no lo es —no habría a dónde saltar todavía— y
 * se marca `aria-hidden`.
 */

export type UnitState = {
  /** 0 = portada, 1 = riel. */
  t: number;
  /** 0 = riel, 1 = arco de cierre. */
  c: number;
  /** Proyecto activo según el scroll. */
  activeId: string | null;
  vw: number;
  vh: number;
  mobile: boolean;
};

type Item = { id: string; accent: string; short: string };

export function UnitField({
  items,
  state,
  onJump,
  onHover,
}: {
  items: Item[];
  state: UnitState;
  onJump: (id: string) => void;
  onHover: (id: string | null) => void;
}) {
  const { t, c, activeId, vw, vh, mobile } = state;
  // El riel solo es interactivo cuando ya se formó. Durante la portada las
  // unidades son composición, no navegación.
  const asRail = t > 0.6;
  // En el cierre recuperan su forma de portada: caja y número. Reunidas como
  // quince trazos finos no se leen como P01–P15, que es lo que cierra el
  // sistema que abrió la portada.
  const closing = c > 0.5;

  return (
    <div
      className={styles.field}
      data-rail={asRail || undefined}
      data-closing={closing || undefined}
    >
      {items.map((it, i) => {
        const rail = railPos(i, vw || 1, vh || 1, mobile);
        const pos = lerp(lerp(POSTER[i], rail, t), CLOSING[i], c);
        const active = activeId === it.id;

        const style = {
          '--x': `${pos.x * (vw || 0)}px`,
          '--y': `${pos.y * (vh || 0)}px`,
          '--s': String(pos.s),
          '--accent': it.accent,
          '--i': String(i),
          zIndex: pos.z,
        } as CSSProperties;

        if (!asRail) {
          return (
            <span key={it.id} className={styles.unit} style={style} aria-hidden="true">
              <span className={styles.box} />
              <span className={styles.num}>{it.id}</span>
            </span>
          );
        }

        return (
          <button
            key={it.id}
            type="button"
            className={styles.unit}
            data-active={active || undefined}
            data-interactive=""
            style={style}
            onClick={() => onJump(it.id)}
            onMouseEnter={() => onHover(it.id)}
            onMouseLeave={() => onHover(null)}
            onFocus={() => onHover(it.id)}
            onBlur={() => onHover(null)}
            aria-current={active ? 'true' : undefined}
          >
            <span className={styles.box} />
            <span className={styles.num}>{it.id}</span>
            {/* El rótulo solo se compone para la marca activa o enfocada; con
                quince rótulos permanentes el riel taparía el mapa. */}
            <span className={styles.label}>
              <span className={styles.labelNum}>P{it.id}</span>
              <span className={styles.labelText}>{it.short}</span>
            </span>
          </button>
        );
      })}
    </div>
  );
}
