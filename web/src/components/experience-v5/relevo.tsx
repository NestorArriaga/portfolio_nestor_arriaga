'use client';

import { Arroba } from './arroba';
import styles from './relevo.module.css';

/**
 * El relevo — la transición, vista.
 *
 * Cada paso entre escenas enseña **las dos láminas en pequeño, rotuladas**: de
 * qué mapa sale el recorrido y a cuál entra, con la `@` y un hilo entre las
 * dos. Es el mismo recurso que usan los detalles del atlas de Metztitlán, un
 * recorte pequeño y registrado junto a la pieza grande, y aquí hace que el
 * cambio de proyecto se vea además de sentirse.
 *
 * Aparece al final del tramo (`--e` por encima de 0.78), no antes: primero se
 * lee la escena, después se anuncia la siguiente. Nunca captura el puntero.
 */

/**
 * Una pieza del relevo. La mayoría de escenas entregan un ráster real; P15
 * entrega su planta, que es un dibujo vectorial. Se admiten las dos formas
 * porque reducir la planta a una captura sería inventar un material que el
 * proyecto no tiene.
 */
export type Pieza =
  | { num: string; src: string; srcSet?: string; width?: number; height?: number }
  | { num: string; viewBox: string; capas: { nombre: string; color: string; body: string }[] };

export function Relevo({ sale, entra }: { sale?: Pieza | null; entra?: Pieza | null }) {
  // Sin ninguna de las dos láminas no hay nada que enseñar: no se dibuja un
  // marco vacío para rellenar el gesto.
  if (!sale && !entra) return null;

  return (
    <div className={styles.relevo}>
      {sale ? <Mini p={sale} papel="sale" /> : null}
      <span className={styles.hilo} aria-hidden="true" />
      <Arroba modo="entrega" className={styles.arroba} />
      {entra ? <Mini p={entra} papel="entra" /> : null}
    </div>
  );
}

function Mini({ p, papel }: { p: Pieza; papel: 'sale' | 'entra' }) {
  return (
    <figure className={styles.pieza} data-papel={papel}>
      {'viewBox' in p ? (
        <svg className={styles.dibujo} viewBox={p.viewBox} aria-hidden="true">
          {p.capas.map((c) => (
            <g key={c.nombre} fill={c.color} stroke={c.color}
               dangerouslySetInnerHTML={{ __html: c.body }} />
          ))}
        </svg>
      ) : (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img src={p.src} srcSet={p.srcSet} sizes="12vw"
             width={p.width} height={p.height}
             alt="" loading="lazy" decoding="async" />
      )}
      <figcaption className="mono">{p.num}</figcaption>
    </figure>
  );
}
