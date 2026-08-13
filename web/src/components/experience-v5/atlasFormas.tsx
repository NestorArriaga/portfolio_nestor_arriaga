'use client';

import { CSSProperties, useState } from 'react';

import { useEscena } from './director';
import { Obra } from './obra';
import { Arroba } from './arroba';
import { Relevo, Pieza } from './relevo';
import type { Guarda, Lamina } from './registry';
import styles from './atlasFormas.module.css';

/**
 * P05 · Geomorfología — la lámina de atlas.
 *
 * Es la dirección editorial del capítulo de papel: un mapa principal como
 * objeto, detalles registrados a puntos verdaderos, leyenda que participa de la
 * composición y vacío intencional. Lo que se corrigió de la versión anterior:
 *
 * - El mapa principal no aparecía: sólo flotaban los tres detalles. Ahora la
 *   silueta manda y ocupa su banda de papel.
 * - `Detalle 3` caía sobre el título y el lugar. La esquina inferior izquierda
 *   queda reservada para `P05`, el título, el lugar y la acción; ningún detalle
 *   entra en ella.
 * - Los rótulos estaban duplicados y los conectores cruzaban media pantalla.
 *   Ahora cada detalle lleva su número una sola vez y la correspondencia se
 *   hace con una marca corta sobre el punto real del mapa.
 * - Los patrones se leían al 30 % de opacidad. Ahora el activo va a texto pleno
 *   y los inactivos a secundario, que sigue cumpliendo AA sobre papel.
 *
 * Los tres encuadres no están repartidos a ojo: salen de barrer el ráster en
 * una rejilla de 12×12 y quedarse con celdas de cobertura 90–100 %, porque la
 * lámina es una silueta con alfa y los marcos caían sobre zona transparente.
 */

const ENCUADRES: [number, number][] = [[37, 13], [63, 29], [63, 46]];

export function AtlasFormas({
  id, num, titulo, lugar, href, lamina, guarda, patrones, quieto, alto, siguiente,
}: {
  id: string; num: string; titulo: string; lugar: string; href: string;
  lamina: Lamina | null;
  guarda: Guarda | null;
  patrones: { label: string; value: string }[];
  quieto: boolean; alto: number;
  siguiente?: Pieza | null;
}) {
  const ref = useEscena(id, undefined, quieto);
  const [activo, setActivo] = useState<number | null>(null);
  const lista = patrones.slice(0, 3);

  return (
    <section
      ref={ref as (n: HTMLElement | null) => void}
      className={styles.escena} id={id} data-sup="papel"
      style={{ '--alto': `${alto}svh` } as CSSProperties}
      aria-labelledby={`t-${id}`}
    >
      <div className={styles.marco}>
        {/* Mapa principal: objeto completo dentro de la banda de papel. */}
        <div className={styles.campo}>
          {lamina ? (
            <Obra img={lamina} guarda={guarda} banda="papel"
                  alt={`${titulo}. ${lugar}.`} clase={styles.mapa}>
              {/* Las tres marcas, sobre el punto real de cada detalle. */}
              {ENCUADRES.map(([x, y], i) => (
                <button
                  key={i} type="button" data-touch
                  className={styles.marca}
                  style={{ '--mx': `${x}%`, '--my': `${y}%`, '--i': String(i) } as CSSProperties}
                  data-on={activo === i || undefined}
                  aria-pressed={activo === i}
                  aria-label={`Detalle ${i + 1}: ${lista[i]?.label ?? ''}`}
                  onPointerEnter={() => setActivo(i)}
                  onPointerLeave={() => setActivo(null)}
                  onFocus={() => setActivo(i)}
                  onBlur={() => setActivo(null)}
                  onClick={() => setActivo(activo === i ? null : i)}
                >
                  <i className={styles.marcaPunto} aria-hidden="true" />
                  <i className={styles.marcaLinea} aria-hidden="true" />
                  <span className={`${styles.marcaNum} mono`}>{i + 1}</span>
                </button>
              ))}
            </Obra>
          ) : null}
        </div>

        {/* Tres detalles, en columna, cada uno con su número una sola vez. */}
        <div className={styles.detalles}>
          {lamina && ENCUADRES.map(([x, y], i) => (
            <figure
              key={i} className={styles.detalle}
              data-on={activo === i || undefined}
              style={{ '--i': String(i) } as CSSProperties}
              onPointerEnter={() => setActivo(i)}
              onPointerLeave={() => setActivo(null)}
            >
              {/* Copia decorativa: el territorio con su texto alternativo es la
                  silueta principal, así que el recorte no repite información en
                  el árbol de accesibilidad. */}
              <span
                className={styles.recorte} aria-hidden="true"
                style={{
                  backgroundImage: `url(${lamina.src})`,
                  backgroundPosition: `${x}% ${y}%`,
                } as CSSProperties}
              />
              <figcaption className="mono">
                <b>{i + 1}</b>{lista[i]?.label ?? `Detalle ${i + 1}`}
              </figcaption>
            </figure>
          ))}
        </div>

        {/* Los tres patrones tal como los enumera la p.26. */}
        <ol className={styles.patrones}>
          {lista.map((p, i) => (
            <li key={p.label} data-on={activo === i || undefined}>
              <button type="button" data-touch className="mono"
                      aria-pressed={activo === i}
                      onPointerEnter={() => setActivo(i)}
                      onPointerLeave={() => setActivo(null)}
                      onFocus={() => setActivo(i)}
                      onBlur={() => setActivo(null)}
                      onClick={() => setActivo(activo === i ? null : i)}>
                <b>{p.label}</b><span>{p.value}</span>
              </button>
            </li>
          ))}
        </ol>

        {/* Zona reservada: número, título, lugar y acción. Nada más entra aquí. */}
        <div className={styles.rotulo}>
          <p className={`${styles.num} mono`}>{num}</p>
          <h2 id={`t-${id}`} className={styles.titulo}>{titulo}</h2>
          <p className={`${styles.lugar} mono`}>{lugar}</p>
          <a className={`${styles.abrir} mono`} href={href} data-touch>abrir proyecto</a>
        </div>

        {/* La espiral amarilla es el instrumento de paso hacia P06. */}
        <div className={styles.paso}>
          <Arroba modo="entrega" className={styles.espiral} />
          <Relevo entra={siguiente} />
        </div>
      </div>
    </section>
  );
}
