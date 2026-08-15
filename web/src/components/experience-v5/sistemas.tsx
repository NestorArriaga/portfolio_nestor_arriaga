'use client';

import { CSSProperties } from 'react';

import { useEscena } from './director';
import type { Imagen, Sistema } from '@/components/sistemas/registro';
import styles from './sistemas.module.css';

/**
 * SISTEMAS — la capacidad digital del atlas.
 *
 * Va después de Urban Challenge y antes de Contacto, y no renumera nada: los
 * quince proyectos territoriales siguen siendo P01–P15 y estos cuatro casos
 * llevan su propia serie S. Es una familia paralela, no una continuación.
 *
 * Cada caso ocupa una escena con la misma gramática del resto del atlas —marco
 * fino, folio, palabra y material a tamaño de lectura—. Lo que cambia es el
 * material: una captura real de una aplicación propia. Por eso no hay ventana
 * de navegador dibujada ni semáforos de colores: la interfaz ya es la pieza, y
 * enmarcarla en un dibujo de navegador sólo añadiría una mentira decorativa.
 *
 * El color de cada aplicación se queda dentro de su captura. Fuera de ella
 * mandan tinta, papel, blanco y el amarillo de señal.
 */

export function CapituloSistemas({ casos, quieto }: { casos: Sistema[]; quieto: boolean }) {
  if (!casos.length) return null;

  return (
    <>
      <AperturaSistemas quieto={quieto} n={casos.length} />
      {casos.map((s, i) => (
        <CasoSistema key={s.id} s={s} i={i} n={casos.length} quieto={quieto} />
      ))}
    </>
  );
}

/** Apertura limpia: el nombre de la familia y tres palabras. Nada más. */
function AperturaSistemas({ quieto, n }: { quieto: boolean; n: number }) {
  const ref = useEscena('sistemas', { z: [1.05, 1] }, quieto);

  return (
    <section
      ref={ref as (node: HTMLElement | null) => void}
      className={styles.apertura} id="sistemas" data-sup="tinta"
      aria-label="Sistemas: capacidad digital aplicada al territorio"
    >
      <div className={styles.aperturaMarco}>
        <p className={`${styles.serie} mono`}>{`S01 — S0${n}`}</p>
        <h2 className={styles.aperturaTitulo}>SISTEMAS</h2>
        <p className={`${styles.tresPalabras} mono`}>territorio · datos · decisión</p>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */

function CasoSistema({ s, i, n, quieto }: { s: Sistema; i: number; n: number; quieto: boolean }) {
  const ref = useEscena(s.id, { z: [1.03, 1] }, quieto);
  const href = `/sistema/${s.slug}`;

  return (
    <section
      ref={ref as (node: HTMLElement | null) => void}
      className={styles.caso} id={s.id} data-sup="tinta"
      style={{ '--i': String(i) } as CSSProperties}
      aria-label={`${s.codigo} ${s.nombre}, ${s.estado}`}
    >
      <div className={styles.marco}>
        <header className={styles.cabecera}>
          <p className={`${styles.folio} mono`}>{s.codigo}</p>
          <h3 className={styles.nombre}>{s.nombre}</h3>
          <p className={`${styles.estado} mono`}>{s.estado}</p>
        </header>

        {/* La captura principal manda; los detalles la acompañan debajo, en la
            misma columna, para que su pie quepa entero. Metidos en la banda
            lateral medían nueve rem y el texto se cortaba a media frase. */}
        <div className={styles.pieza}>
          {s.principal ? <Captura im={s.principal} sizes="(max-width: 900px) 92vw, 58vw" prioridad={i === 0} /> : null}

          {s.detalles.length ? (
            <div className={styles.detalles}>
              {s.detalles.slice(0, 2).map((d) => (
                <Captura key={d.src} im={d} sizes="(max-width: 900px) 44vw, 28vw" chico />
              ))}
            </div>
          ) : null}
        </div>

        <div className={styles.lateral}>
          <p className={styles.capacidad}>{s.capacidad}</p>
          <ul className={`${styles.acciones} mono`}>
            {s.acciones.map((a) => <li key={a}>{a}</li>)}
          </ul>

          {s.segundo?.imagen ? (
            <figure className={styles.segundo}>
              <Captura im={s.segundo.imagen} sizes="(max-width: 900px) 92vw, 34vw" chico />
              <figcaption className="mono">
                <b>{s.segundo.titulo}</b>
                <span>{s.segundo.estado}</span>
              </figcaption>
            </figure>
          ) : null}

          <a className={`${styles.abrir} mono`} href={href} data-touch>ver sistema</a>
        </div>

        <p className={`${styles.contador} mono`} aria-hidden="true">{`${i + 1} / ${n}`}</p>
      </div>
    </section>
  );
}

/**
 * Una captura dentro de su guarda.
 *
 * El ancho máximo lo fija el archivo: una interfaz ampliada por encima de su
 * resolución se lee blanda a DPR 2, y aquí el texto de la propia aplicación es
 * parte del dato. `--nativo` traduce ese techo a la caja.
 */
export function Captura({
  im, sizes, chico, prioridad,
}: { im: Imagen; sizes: string; chico?: boolean; prioridad?: boolean }) {
  return (
    <figure className={`${styles.captura}${chico ? ` ${styles.capturaChica}` : ''}`}
            style={{ '--nativo': String(im.nativo), '--ratio': String(im.ratio) } as CSSProperties}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={im.src} srcSet={im.srcSet} sizes={sizes}
           width={im.width} height={im.height} alt={im.pie}
           loading={prioridad ? 'eager' : 'lazy'}
           decoding={prioridad ? 'sync' : 'async'}
           fetchPriority={prioridad ? 'high' : undefined} />
      <figcaption className="mono">{im.pie}</figcaption>
    </figure>
  );
}
