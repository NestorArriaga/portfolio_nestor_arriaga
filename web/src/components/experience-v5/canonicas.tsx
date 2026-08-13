'use client';

import { CSSProperties, useState } from 'react';

import { Escenario, Rotulo } from './stage';
import type { Lamina } from './registry';
import type { Pieza } from './relevo';
import { anchoServido } from './obra';
import styles from './canonicas.module.css';

/**
 * Las cuatro escenas canónicas: comparación, atlas, viaje de escala y parque.
 *
 * Son la puerta de calidad del lenguaje de V5. Ninguna reutiliza las soluciones
 * que fallaron: aquí no hay lente, ni pliegue, ni collage, ni tres imágenes
 * cruzadas por opacidad.
 */

/* -------------------------------------------------------------------------- */
/* P03 — comparación registrada                                                */
/* -------------------------------------------------------------------------- */

/**
 * La lente desapareció, y con ella la forma roja desalineada.
 *
 * No existen dos mapas del mismo encuadre para limón y café: la lámina es una
 * sola, con las dos clases pintadas dentro. Así que la comparación honesta no
 * es superponer capas que no hay, sino **recorrer el propio mapa**: un divisor
 * vertical separa las dos lecturas, cada lado se anuncia con su clase real y
 * los catorce puntos de zona óptima —medidos sobre esta misma lámina— se
 * descubren conforme el divisor los alcanza.
 *
 * El divisor lo mueve el scroll y también el puntero, el dedo y las flechas.
 */
export function Comparacion({
  id, num, titulo, lugar, href, lamina, clave, puntos, quieto, alto, superficie, siguiente,
}: {
  id: string; num: string; titulo: string; lugar: string; href: string;
  lamina: Lamina | null;
  clave?: { label: string; color: string }[];
  puntos?: { x: number; y: number }[];
  quieto: boolean; alto: number; superficie: 'tinta' | 'papel' | 'grafito';
  siguiente?: Pieza | null;
}) {
  const [manual, setManual] = useState<number | null>(null);

  const mover = (e: React.PointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    setManual(Math.min(1, Math.max(0, (e.clientX - r.left) / r.width)));
  };

  const teclas = (e: React.KeyboardEvent) => {
    if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
    e.preventDefault();
    setManual((v) => Math.min(1, Math.max(0, (v ?? 0.5) + (e.key === 'ArrowRight' ? 0.06 : -0.06))));
  };

  const izq = clave?.[0]?.label ?? 'Cultivo';
  const der = clave?.[1]?.label ?? 'Cultivo';

  return (
    <Escenario
      id={id} quieto={quieto} alto={alto} superficie={superficie}
      etiqueta={`${num} ${titulo}`}
      sale={lamina ? { num, ...lamina } : null} entra={siguiente}
      terreno={lamina ? (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img className={styles.mapa} src={lamina.src} srcSet={lamina.srcSet} sizes="94vw"
             style={{ '--nativo': String(anchoServido(lamina)) } as CSSProperties}
             width={lamina.width} height={lamina.height}
             alt={`${titulo}. ${lugar}.`} loading="lazy" decoding="async" />
      ) : null}
      geometria={puntos?.length ? (
        <svg className={styles.puntos} viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          {puntos.map((p, i) => (
            <circle key={i} cx={p.x * 100} cy={p.y * 100} r={0.75}
                    data-on={p.x <= (manual ?? 0.5) ? '' : undefined} />
          ))}
        </svg>
      ) : null}
      interaccion={(
        <div
          className={styles.divisorCaja}
          style={{ '--d': String(manual ?? 0.5) } as CSSProperties}
          onPointerMove={mover}
          onPointerDown={mover}
          onKeyDown={teclas}
          tabIndex={0}
          role="slider"
          aria-label={`Comparar ${izq} y ${der}`}
          aria-valuemin={0} aria-valuemax={100}
          aria-valuenow={Math.round((manual ?? 0.5) * 100)}
        >
          <span className={styles.divisor} aria-hidden="true" />
          <span className={`${styles.claseIzq} mono`} style={{ '--c': clave?.[0]?.color } as CSSProperties}>
            <i aria-hidden="true" />{izq}
          </span>
          <span className={`${styles.claseDer} mono`} style={{ '--c': clave?.[1]?.color } as CSSProperties}>
            <i aria-hidden="true" />{der}
          </span>
        </div>
      )}
      instrumento={<Rotulo num={num} titulo={titulo} lugar={lugar} href={href} />}
    />
  );
}

/* -------------------------------------------------------------------------- */
/* P05 — atlas de formas                                                       */
/* -------------------------------------------------------------------------- */

/**
 * El pliegue desapareció, y con él la franja vertical.
 *
 * Los tres fragmentos son **detalles reales de la misma lámina**, encuadrados en
 * tres posiciones distintas con `object-position`: no hay imagen inventada ni
 * recorte que afirme un territorio que no existe. Cada uno llega a su sitio
 * alrededor de la silueta.
 *
 * Los tres patrones de la p.26 van juntos en el instrumento y **no** pegados
 * uno a cada recorte: el PDF empareja cada patrón con su propio inset, y desde
 * este ráster no puedo saber cuál de mis detalles corresponde a cuál. Rotular
 * el par sería inventar la correspondencia.
 *
 * La composición está completa desde el primer fotograma: la silueta se ve
 * entera antes de que ningún fragmento se mueva.
 */
export function AtlasFormas({
  id, num, titulo, lugar, href, lamina, patrones, quieto, alto, superficie, siguiente,
}: {
  id: string; num: string; titulo: string; lugar: string; href: string;
  lamina: Lamina | null;
  patrones: { label: string; value: string }[];
  quieto: boolean; alto: number; superficie: 'tinta' | 'papel' | 'grafito';
  siguiente?: Pieza | null;
}) {
  // Tres encuadres medidos, no repartidos a ojo. La lámina es una silueta con
  // alfa: la primera versión los colocó en 22 %/18 % y cayeron sobre zona
  // transparente, así que los tres marcos salían vacíos. Estas posiciones salen
  // de barrer el ráster en una rejilla de 12×12 y quedarse con celdas de
  // cobertura 90–100 %.
  const encuadres = ['37% 13%', '63% 29%', '63% 46%'];

  return (
    <Escenario
      id={id} quieto={quieto} alto={alto} superficie={superficie}
      etiqueta={`${num} ${titulo}`}
      sale={lamina ? { num, ...lamina } : null} entra={siguiente}
      terreno={lamina ? (
        <div className={styles.siluetaCaja}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className={styles.silueta} src={lamina.src} srcSet={lamina.srcSet} sizes="52vw"
               width={lamina.width} height={lamina.height}
               alt={`${titulo}. ${lugar}.`} loading="lazy" decoding="async" />
        </div>
      ) : null}
      geometria={lamina ? (
        <div className={styles.fragmentos}>
          {patrones.slice(0, 3).map((p, i) => (
            <figure key={p.label} className={styles.fragmento}
                    style={{ '--i': String(i) } as CSSProperties}>
              {/* Fondo y no `img`: `background-position` en porcentaje alinea
                  el punto focal de la imagen con el mismo punto del marco, que
                  es exactamente lo que hace falta para encuadrar un detalle.
                  Con `object-position` no se podía: ampliar y centrar se anulan
                  entre sí. Es una copia decorativa —el territorio con su texto
                  alternativo es la silueta principal—, así que no pierde nada
                  en el árbol de accesibilidad. */}
              <span
                className={styles.fragmentoMarco}
                style={{
                  backgroundImage: `url(${lamina.src})`,
                  backgroundPosition: encuadres[i],
                } as CSSProperties}
              />
              <figcaption className="mono">{`Detalle ${i + 1}`}</figcaption>
            </figure>
          ))}
        </div>
      ) : null}
      instrumento={(
        <>
          <Rotulo num={num} titulo={titulo} lugar={lugar} href={href} />
          {/* Los tres patrones tal como los enumera la p.26. */}
          <ol className={styles.patrones}>
            {patrones.slice(0, 3).map((p, i) => (
              <li key={p.label} className="mono" style={{ '--i': String(i) } as CSSProperties}>
                <b>{p.label}</b><span>{p.value}</span>
              </li>
            ))}
          </ol>
        </>
      )}
    />
  );
}

/* -------------------------------------------------------------------------- */
/* P14 — viaje de escala                                                       */
/* -------------------------------------------------------------------------- */

/**
 * Las tres escalas ya no se cruzan por opacidad sobre la misma composición: eso
 * producía la mezcla oscura y confusa que la revisión señaló.
 *
 * Aquí cada escala ocupa **un estado completo y nítido**, y el paso de una a
 * otra es un barrido registrado sobre el mismo encuadre: la imagen entrante
 * descubre desde el borde en lugar de fundirse encima. Entre estados hay un
 * solapamiento corto para que no se perciba un corte.
 */
export function ViajeEscala({
  id, escalas, href, quieto, alto,
}: {
  id: string;
  escalas: { id: string; titulo: string; nota: string; regla: string; img: Lamina | null }[];
  href: string; quieto: boolean; alto: number;
  siguiente?: Pieza | null;
}) {
  const n = escalas.length;

  return (
    <Escenario
      id={id} quieto={quieto} alto={alto} superficie="tinta"
      etiqueta="P14 GRANULAR"
      terreno={(
        <div className={styles.viaje} style={{ '--n': String(n) } as CSSProperties}>
          {escalas.map((e, i) => (
            e.img ? (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img key={e.id} className={styles.escalaImg}
                   style={{ '--i': String(i) } as CSSProperties}
                   src={e.img.src} srcSet={e.img.srcSet} sizes="100vw"
                   width={e.img.width} height={e.img.height}
                   alt={i === 0 ? 'Comarca Lagunera: región y relieve' : ''}
                   aria-hidden={i === 0 ? undefined : true}
                   loading="lazy" decoding="async" />
            ) : null
          ))}
        </div>
      )}
      instrumento={(
        <>
          <Rotulo num="P14" titulo="GRANULAR" lugar="Comarca Lagunera" href={href} />
          {/* La etiqueta de escala se sustituye sobre una placa local, y la
              regla cambia de verdad con cada nivel. */}
          <div className={styles.escalaHud} style={{ '--n': String(n) } as CSSProperties}>
            {escalas.map((e, i) => (
              <div key={e.id} className={styles.escalaFicha} style={{ '--i': String(i) } as CSSProperties}>
                <p className={`${styles.escalaNum} mono`}>{`${i + 1} / ${n}`}</p>
                <p className={styles.escalaTitulo}>{e.titulo}</p>
                <p className={`${styles.escalaRegla} mono`}>{e.regla}</p>
              </div>
            ))}
          </div>
        </>
      )}
    />
  );
}

/* -------------------------------------------------------------------------- */
/* P15 — el dibujo se vuelve espacio                                           */
/* -------------------------------------------------------------------------- */

export type PiezaPark = {
  id: string; titulo: string; nota?: string; viewBox: string;
  capas: { nombre: string; color: string; body: string }[];
};

/**
 * El collage desapareció. La planta general es protagonista y ocupa la mayor
 * parte del viewport; sus capas reales se encienden en secuencia con el scroll
 * y la leyenda se activa con ellas.
 *
 * Las variaciones no compiten como cuatro imágenes dispersas: son estudios
 * subordinados que se eligen con un selector discreto, y sólo una está a la
 * vista. En móvil el selector es la misma secuencia, sin esconder ninguna.
 */
export function Parque({
  id, base, variaciones, href, quieto, alto, siguiente,
}: {
  id: string; base: PiezaPark; variaciones: PiezaPark[];
  href: string; quieto: boolean; alto: number;
  siguiente?: Pieza | null;
}) {
  const [activa, setActiva] = useState<string | null>(null);
  const estudio = variaciones.find((v) => v.id === activa) ?? null;

  return (
    <Escenario
      id={id} quieto={quieto} alto={alto} superficie="papel"
      etiqueta="P15 Urban Challenge"
      // El parque cierra el recorrido de proyectos: su planta sale hacia el
      // contacto, que no tiene lámina. Se entrega una sola pieza, no dos.
      sale={{ num: 'P15', viewBox: base.viewBox, capas: base.capas }} entra={siguiente}
      terreno={(
        <figure className={styles.planta}>
          <svg viewBox={base.viewBox} className={styles.dibujo} role="img"
               aria-label="Planta general del parque">
            {base.capas.map((c, i) => (
              <g key={c.nombre} className={styles.capaPark}
                 style={{ '--i': String(i) } as CSSProperties}
                 dangerouslySetInnerHTML={{ __html: c.body }} />
            ))}
          </svg>
        </figure>
      )}
      geometria={estudio ? (
        <figure className={styles.estudio}>
          <svg viewBox={estudio.viewBox} className={styles.dibujo} role="img" aria-label={estudio.titulo}>
            {estudio.capas.map((c) => <g key={c.nombre} dangerouslySetInnerHTML={{ __html: c.body }} />)}
          </svg>
          <figcaption className="mono">{estudio.nota ?? estudio.titulo}</figcaption>
        </figure>
      ) : null}
      instrumento={(
        <>
          <Rotulo num="P15" titulo="Urban Challenge" lugar="Mérida, Yucatán" href={href} />
          <ul className={styles.clavePark}>
            {base.capas.map((c, i) => (
              <li key={c.nombre} className="mono" style={{ '--c': c.color, '--i': String(i) } as CSSProperties}>
                <i aria-hidden="true" />{c.nombre}
              </li>
            ))}
          </ul>
        </>
      )}
      interaccion={(
        <div className={styles.selector} role="group" aria-label="Estudios del proyecto">
          <button type="button" data-touch className={styles.opcion}
                  aria-pressed={activa === null} onClick={() => setActiva(null)}>Planta</button>
          {variaciones.map((v) => (
            <button key={v.id} type="button" data-touch className={styles.opcion}
                    aria-pressed={activa === v.id}
                    onClick={() => setActiva(activa === v.id ? null : v.id)}>{v.titulo}</button>
          ))}
        </div>
      )}
    />
  );
}
