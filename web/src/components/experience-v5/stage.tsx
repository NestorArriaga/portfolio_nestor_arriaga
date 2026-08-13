'use client';

import { CSSProperties, ReactNode } from 'react';

import { useEscena, Camara } from './director';
import { Relevo, Pieza } from './relevo';
import styles from './stage.module.css';

/**
 * World Stage — el escenario persistente del atlas.
 *
 * Ninguna escena trae su propio fondo ni su propio efecto. Todas se montan en
 * el mismo escenario, con las mismas seis capas, y lo que cambia entre una y
 * otra es **qué ocupa cada capa**, no la arquitectura. Es lo que hace que el
 * recorrido se lea como una cámara atravesando un territorio y no como quince
 * módulos pegados por scroll.
 *
 *   atmósfera    el fondo: tinta, papel o color del propio territorio
 *   terreno      el mapa, el relieve o la lámina real
 *   geometría    SVG sobre el terreno, en su mismo registro
 *   instrumento  leyenda, escala, dato, comparación
 *   interacción  lo que responde al puntero, al foco o al dedo
 *   entrega      la forma que se convierte en la escena siguiente
 *
 * El orden de apilado es fijo y no se negocia por escena: así una leyenda nunca
 * queda debajo de un mapa ni una entrega tapa el instrumento.
 */

export type Superficie = 'tinta' | 'papel' | 'grafito';

export function Escenario({
  id, camara, quieto, superficie = 'tinta', alto = 220,
  atmosfera, terreno, geometria, instrumento, interaccion, entrega,
  sale, entra, etiqueta,
}: {
  id: string;
  camara?: Camara;
  quieto: boolean;
  superficie?: Superficie;
  /** Alto del tramo en svh. Lo decide la cantidad real de transformación. */
  alto?: number;
  atmosfera?: ReactNode;
  terreno?: ReactNode;
  geometria?: ReactNode;
  instrumento?: ReactNode;
  interaccion?: ReactNode;
  entrega?: ReactNode;
  /** Las dos láminas del relevo: de qué escena sale y a cuál entra. */
  sale?: Pieza | null;
  entra?: Pieza | null;
  etiqueta?: string;
}) {
  const ref = useEscena(id, camara, quieto);

  return (
    <section
      ref={ref as (n: HTMLElement | null) => void}
      className={styles.escenario}
      id={id}
      data-sup={superficie === 'tinta' ? undefined : superficie}
      style={{ '--alto': `${alto}svh` } as CSSProperties}
      aria-label={etiqueta}
    >
      <div className={styles.marco}>
        {atmosfera ? <div className={styles.atmosfera}>{atmosfera}</div> : null}
        {terreno ? <div className={styles.terreno}>{terreno}</div> : null}
        {geometria ? <div className={styles.geometria}>{geometria}</div> : null}
        {instrumento ? <div className={styles.instrumento}>{instrumento}</div> : null}
        {interaccion ? <div className={styles.interaccion}>{interaccion}</div> : null}
        {entrega || sale || entra ? (
          <div className={styles.entrega} aria-hidden="true">
            {entrega}
            <Relevo sale={sale} entra={entra} />
          </div>
        ) : null}
      </div>
    </section>
  );
}

/**
 * Rótulo de escena: número, título, lugar y acceso al caso.
 *
 * Vive en la capa de instrumento, alineado a la retícula, y nunca se apoya
 * sobre el centro de la obra. El texto del atlas es escaso a propósito.
 */
export function Rotulo({
  num, titulo, lugar, href, lado = 'izq', escala,
}: {
  num: string; titulo: string; lugar: string; href: string;
  lado?: 'izq' | 'der'; escala?: string;
}) {
  return (
    <div className={styles.rotulo} data-lado={lado}>
      <p className={`${styles.num} mono`}>{num}</p>
      <h2 className={`${styles.titulo} titulo`}>{titulo}</h2>
      <p className={`${styles.lugar} mono`}>
        {lugar}{escala ? <span className={styles.escala}>{escala}</span> : null}
      </p>
      <a href={href} className={`${styles.abrir} mono`} data-touch>Abrir proyecto</a>
    </div>
  );
}

/** Dato anclado a un punto real de la lámina por una línea muy corta. */
export function Anclaje({
  x, y, etiqueta, valor, indice = 0,
}: {
  x: number; y: number; etiqueta: string; valor: string; indice?: number;
}) {
  return (
    <div
      className={styles.anclaje}
      style={{ '--ax': `${x}%`, '--ay': `${y}%`, '--i': String(indice) } as CSSProperties}
    >
      <span className={styles.anclajePunto} aria-hidden="true" />
      <span className={styles.anclajeLinea} aria-hidden="true" />
      <span className={styles.anclajeTexto}>
        <b className="mono">{valor}</b>
        <i className="mono">{etiqueta}</i>
      </span>
    </div>
  );
}
