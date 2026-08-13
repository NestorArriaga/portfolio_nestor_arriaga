'use client';

import { CSSProperties } from 'react';

import styles from './arroba.module.css';

/**
 * La `@` — origen, órbita, coordenada, ruta y contacto.
 *
 * No es un símbolo tipográfico pegado en una esquina ni una textura: es una
 * geometría de tres partes —núcleo, espiral y salida— que se dibuja con la
 * misma construcción en todo el sitio y cambia de papel según dónde aparezca.
 *
 *   origen      en la portada: un punto y su primera órbita
 *   ancla       en un proyecto: marca el punto, territorio o dato activo
 *   entrega     en una transición: la salida se prolonga hacia la escena siguiente
 *   contacto    al final: la órbita se cierra y la espiral conduce al correo
 *
 * El trazado sale de una espiral de Arquímedes muestreada, no de un `path`
 * copiado: así el mismo componente puede abrirse, cerrarse o prolongarse con un
 * solo número sin que la forma deje de ser reconocible.
 */

export type ModoArroba = 'origen' | 'ancla' | 'entrega' | 'contacto';

/** Espiral de Arquímedes: r = a + bθ, muestreada como polilínea suave. */
function espiral(vueltas: number, r0: number, r1: number, giro = 0): string {
  const pasos = Math.max(24, Math.round(vueltas * 48));
  const pts: string[] = [];
  for (let i = 0; i <= pasos; i += 1) {
    const t = i / pasos;
    const a = giro + t * vueltas * Math.PI * 2;
    const r = r0 + (r1 - r0) * t;
    pts.push(`${(50 + Math.cos(a) * r).toFixed(2)} ${(50 + Math.sin(a) * r).toFixed(2)}`);
  }
  return `M${pts[0]} L${pts.slice(1).join(' L')}`;
}

export function Arroba({
  modo = 'ancla', etiqueta, valor, className,
}: {
  modo?: ModoArroba;
  /** Qué señala esta `@`. Sin etiqueta es sólo geometría. */
  etiqueta?: string;
  valor?: string;
  className?: string;
}) {
  // El núcleo es siempre el mismo punto; lo que cambia es cuánto se abre la
  // espiral y cuánto se prolonga la salida.
  const abre = modo === 'origen' ? 0.55 : modo === 'contacto' ? 1.35 : 0.95;
  const trazo = espiral(abre, 6, modo === 'ancla' ? 17 : 30, -Math.PI / 2);

  // La salida: el trazo que entrega la geometría a lo que viene después.
  const salida = modo === 'entrega' || modo === 'contacto';

  return (
    <span className={`${className ?? ''} ${styles.arroba}`} data-modo={modo}>
      <svg viewBox="0 0 100 100" aria-hidden="true" className={styles.svg}>
        <circle className={styles.nucleo} cx="50" cy="50" r="4.5" />
        <path className={styles.orbita} d={trazo} />
        {salida ? (
          <path className={styles.salida} d="M50 20 C 72 20, 88 34, 88 52" />
        ) : null}
      </svg>
      {etiqueta ? (
        <span className={styles.lectura}>
          {valor ? <b className="mono">{valor}</b> : null}
          <i className="mono">{etiqueta}</i>
        </span>
      ) : null}
    </span>
  );
}

/**
 * Ancla de dato: la `@` colocada sobre un punto real de la obra, con una línea
 * de registro corta hasta su lectura.
 *
 * El dato no entra como una caja encima del mapa: sale del punto que explica.
 */
export function Ancla({
  x, y, etiqueta, valor, indice = 0, lado = 'der',
}: {
  x: number; y: number; etiqueta: string; valor?: string;
  indice?: number; lado?: 'izq' | 'der';
}) {
  return (
    <div
      className={styles.ancla}
      data-lado={lado}
      style={{ '--ax': `${x}%`, '--ay': `${y}%`, '--i': String(indice) } as CSSProperties}
    >
      <Arroba modo="ancla" className={styles.anclaMarca} />
      <span className={styles.anclaLinea} aria-hidden="true" />
      <span className={styles.anclaTexto}>
        {valor ? <b className="mono">{valor}</b> : null}
        <i className="mono">{etiqueta}</i>
      </span>
    </div>
  );
}
