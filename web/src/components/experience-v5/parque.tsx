'use client';

import { CSSProperties, useState } from 'react';

import { useEscena } from './director';
import { Relevo, Pieza } from './relevo';
import type { EstadoParque } from './registry';
import styles from './parque.module.css';

/**
 * P15 · URBAN CHALLENGE — capítulo en siete estados.
 *
 * Lo que había era una lámina pálida con pestañas. Esto es lo contrario: siete
 * escenas, cada una con material distinto del proyecto y su propia lectura, y
 * un riel de estados que hace de leyenda y de selector a la vez —no hay una
 * fila de pestañas aparte de la leyenda, porque la leyenda **es** el selector.
 *
 * El dibujo ocupa entre 60 % y 78 % del viewport en todos los estados: es la
 * pieza, no una ilustración dentro de una tarjeta. Y el predio no se mueve
 * entre estados: cambia lo que se lee de él, que es lo que permite comparar.
 *
 * El último estado devuelve el contorno del predio hacia el globo, que es como
 * el atlas cierra el recorrido de proyectos.
 */

export function CapituloParque({
  estados, href, quieto, siguiente,
}: {
  estados: EstadoParque[];
  href: string;
  quieto: boolean;
  siguiente?: Pieza | null;
}) {
  const n = estados.length;

  return (
    <>
      <PortadaParque href={href} quieto={quieto} n={n} />
      {estados.map((e, i) => (
        <Estado key={e.id} e={e} i={i} n={n} quieto={quieto}
                entra={i + 1 < n ? null : siguiente ?? null}
                todos={estados} />
      ))}
    </>
  );
}

function PortadaParque({ href, quieto, n }: { href: string; quieto: boolean; n: number }) {
  const ref = useEscena('p15', { z: [1.06, 1] }, quieto);

  return (
    <section
      ref={ref as (node: HTMLElement | null) => void}
      className={styles.portada} id="p15" data-sup="papel" aria-label="P15 Urban Challenge"
    >
      <div className={styles.portadaMarco}>
        <p className={`${styles.portadaNum} mono`}>P15</p>
        <h2 className={styles.portadaTitulo}>Urban Challenge</h2>
        <p className={`${styles.portadaPie} mono`}>
          Mérida, Yucatán · SEDATU × GIZ · {n} momentos
        </p>
        <a className={`${styles.abrir} mono`} href={href} data-touch>abrir proyecto</a>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */

function Estado({
  e, i, n, quieto, entra, todos,
}: {
  e: EstadoParque; i: number; n: number; quieto: boolean;
  entra: Pieza | null; todos: EstadoParque[];
}) {
  // El acercamiento se acumula estado a estado, igual que en GRANULAR: el
  // capítulo entero es una sola aproximación al predio.
  const ref = useEscena(e.id, { z: [1.04 + i * 0.01, 1] }, quieto);

  return (
    <section
      ref={ref as (node: HTMLElement | null) => void}
      className={styles.estado} id={e.id} data-sup="papel"
      style={{ '--i': String(i) } as CSSProperties}
      aria-label={`Urban Challenge ${i + 1} de ${n}: ${e.palabra}`}
    >
      <div className={styles.marco}>
        <div className={styles.pieza}>
          <Material e={e} ultimo={i === n - 1} />
        </div>

        <p className={styles.palabra}>{e.palabra}</p>

        {/* El riel: leyenda y selector en una sola pieza. Marca dónde estamos,
            nombra los siete estados y lleva a cualquiera de ellos. */}
        <nav className={styles.riel} aria-label="Estados del proyecto">
          <p className={`${styles.contador} mono`}>{`${i + 1} / ${n}`}</p>
          <ol>
            {todos.map((x, j) => (
              <li key={x.id}>
                <a href={`#${x.id}`} data-touch
                   className={`${styles.rielItem} mono`}
                   data-on={j === i || undefined}
                   aria-current={j === i ? 'true' : undefined}>
                  <i aria-hidden="true" />{x.palabra}
                </a>
              </li>
            ))}
          </ol>
          <p className={`${styles.nota} mono`}>{e.nota}</p>
        </nav>

        {entra ? <div className={styles.entrega}><Relevo entra={entra} /></div> : null}
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */

/**
 * VISTAZO — la planta grande y sus tres piezas de programa como hotspots.
 *
 * Una sola composición basta para entender el proyecto: qué es el parque y qué
 * hay dentro. Señalar un hotspot expande su pieza **sin ocultar la planta**,
 * que es la diferencia entre un vistazo y una galería.
 *
 * Los tres hotspots caen sobre puntos de la planta, no repartidos a ojo: son
 * las posiciones donde el dibujo tiene el graderío, el mirador y la pérgola.
 */
function Vistazo({ e }: { e: EstadoParque }) {
  const [foco, setFoco] = useState<number | null>(null);
  const puntos: [number, number][] = [[38, 44], [62, 33], [55, 63]];

  return (
    <div className={styles.vistazo}>
      <div className={styles.plantaCaja}>
        <Planta e={e} />
        {e.piezas?.map((p, k) => (
          <button
            key={p.label} type="button" data-touch
            className={styles.hotspot}
            style={{ '--hx': `${puntos[k][0]}%`, '--hy': `${puntos[k][1]}%`, '--k': String(k) } as CSSProperties}
            data-on={foco === k || undefined}
            aria-pressed={foco === k}
            aria-label={p.label}
            onPointerEnter={() => setFoco(k)}
            onPointerLeave={() => setFoco(null)}
            onFocus={() => setFoco(k)}
            onBlur={() => setFoco(null)}
            onClick={() => setFoco(foco === k ? null : k)}
          >
            <i aria-hidden="true" />
            <span className="mono">{p.label}</span>
          </button>
        ))}
      </div>

      {/* Las tres piezas. La señalada crece; las otras siguen visibles. */}
      <div className={styles.bandeja}>
        {e.piezas?.map((p, k) => (
          <figure key={p.label} className={styles.recorte}
                  data-on={foco === k || undefined}
                  style={encuadre(p.caja, k)}
                  onPointerEnter={() => setFoco(k)}
                  onPointerLeave={() => setFoco(null)}>
            <figcaption className="mono">{p.label}</figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}

/**
 * SISTEMA — las tres capas sobre la misma planta.
 *
 * La circulación no vive en la planta de propuesta: es una capa real de la
 * Variación 01. Se registra encima manteniendo su propio `viewBox`, no se
 * redibuja. El selector devuelve a `todo`.
 */
function Sistema({ e }: { e: EstadoParque }) {
  const capas = ['vegetación', 'circulación', 'programa'] as const;
  const [sola, setSola] = useState<string | null>(null);

  return (
    <div className={styles.sistema}>
      <div className={styles.plantaCaja}>
        <Planta e={e} solo={sola} />
        {e.circulacion ? (
          <svg className={styles.circulacion} viewBox={e.circulacion.viewBox}
               data-off={sola && sola !== 'circulación' ? '' : undefined} aria-hidden="true">
            <g fill={e.circulacion.capa.color} stroke="var(--madera, #a5784c)"
               dangerouslySetInnerHTML={{ __html: e.circulacion.capa.body }} />
          </svg>
        ) : null}
      </div>

      <div className={styles.selector} role="group" aria-label="Capas del sistema">
        <button type="button" data-touch className={`${styles.opcion} mono`}
                aria-pressed={sola === null} onClick={() => setSola(null)}>todo</button>
        {capas.map((c) => (
          <button key={c} type="button" data-touch className={`${styles.opcion} mono`}
                  aria-pressed={sola === c}
                  onClick={() => setSola(sola === c ? null : c)}>{c}</button>
        ))}
      </div>
    </div>
  );
}

/** La planta de propuesta, con sus capas reales. */
function Planta({ e, solo }: { e: EstadoParque; solo?: string | null }) {
  if (!e.dibujo) return null;
  const vivas = new Set(e.vivas ?? []);
  const fantasma = new Set(e.fantasma ?? []);

  return (
    <svg className={styles.dibujo} viewBox={e.dibujo.viewBox} role="img"
         data-realce={e.realce || undefined}
         aria-label={`${e.palabra}. ${e.nota}`}>
      {e.dibujo.capas.map((c, k) => (
        vivas.has(k) || fantasma.has(k) ? (
          <g key={c.nombre} className={styles.capa}
             data-estado={vivas.has(k) ? 'viva' : 'fantasma'}
             data-off={solo && solo !== 'vegetación' && vivas.has(k) ? '' : undefined}
             style={{ '--k': String(k) } as CSSProperties}
             fill={c.color} stroke={c.color}
             dangerouslySetInnerHTML={{ __html: c.body }} />
        ) : null
      ))}
    </svg>
  );
}

function Material({ e, ultimo }: { e: EstadoParque; ultimo: boolean }) {
  if (e.modo === 'vistazo') return <Vistazo e={e} />;
  if (e.modo === 'sistema') return <Sistema e={e} />;
  if (e.modo === 'variantes' && e.variantes?.length) return <Variantes lista={e.variantes} />;

  if (e.dibujo) {
    const vivas = new Set(e.vivas ?? []);
    const fantasma = new Set(e.fantasma ?? []);
    return (
      <svg className={styles.dibujo} viewBox={e.dibujo.viewBox} role="img"
           data-realce={e.realce || undefined}
           aria-label={`${e.palabra}. ${e.nota}`}>
        {e.dibujo.capas.map((c, k) => (
          vivas.has(k) || fantasma.has(k) ? (
            <g key={c.nombre} className={styles.capa}
               data-estado={vivas.has(k) ? 'viva' : 'fantasma'}
               style={{ '--k': String(k) } as CSSProperties}
               fill={c.color} stroke={c.color}
               dangerouslySetInnerHTML={{ __html: c.body }} />
          ) : null
        ))}
        {/* El contorno del predio se va hacia el globo y cierra el recorrido. */}
        {ultimo ? (
          <path className={styles.regreso} fill="none" vectorEffect="non-scaling-stroke"
                d="M 40 500 C -180 460, -420 300, -560 120" />
        ) : null}
      </svg>
    );
  }

  return null;
}

/**
 * Los recortes del tablero se componen con `background-size` y
 * `background-position`: es lo único que alinea un encuadre concreto sin
 * depender de que la caja del elemento tenga la proporción exacta del recorte.
 */
function encuadre(
  [x, y, w, h]: [number, number, number, number],
  k: number,
): CSSProperties {
  return {
    backgroundSize: `${(100 / w).toFixed(2)}% ${(100 / h).toFixed(2)}%`,
    backgroundPosition: `${((x / (1 - w)) * 100).toFixed(2)}% ${((y / (1 - h)) * 100).toFixed(2)}%`,
    aspectRatio: `${w * 2200} / ${h * 1556}`,
    '--k': String(k),
  } as CSSProperties;
}

/**
 * Las tres variaciones, comparables de verdad.
 *
 * Compartir caja no basta: cada dibujo trae su propio `viewBox` y el parque
 * ocupa una fracción distinta de cada hoja, así que los tres salían a escalas
 * distintas y comparar dejaba de tener sentido. Ahora las tres comparten caja
 * y línea de base, así que el encuadre y el tamaño de la ventana sí son
 * iguales.
 *
 * Lo que **no** se pudo igualar es la escala aparente del parque dentro de cada
 * dibujo. Intenté reencuadrar midiendo la geometría con `getBBox` y descartando
 * la hoja blanca, y no sirvió: en estos archivos las capas de color también
 * cubren el `viewBox` completo, así que la medida devuelve la hoja en los tres
 * casos. Que el parque ocupe distinta fracción de cada lámina es una propiedad
 * de los dibujos originales, no algo que se arregle desde aquí sin recortarlos.
 */
function Variantes({ lista }: { lista: { id: string; titulo: string; viewBox: string; capas: { nombre: string; color: string; body: string }[] }[] }) {
  const [activa, setActiva] = useState<string | null>(null);
  return (
    <div className={styles.variantes}>
      {lista.map((v, k) => (
        <figure key={v.id} className={styles.variante}
                data-on={activa === v.id || undefined}
                style={{ '--k': String(k) } as CSSProperties}
                onPointerEnter={() => setActiva(v.id)}
                onPointerLeave={() => setActiva(null)}>
          <svg viewBox={v.viewBox} role="img" aria-label={v.titulo}>
            {v.capas.map((c) => (
              <g key={c.nombre} fill={c.color} stroke={c.color}
                 dangerouslySetInnerHTML={{ __html: c.body }} />
            ))}
          </svg>
          <figcaption className="mono">{v.titulo}</figcaption>
        </figure>
      ))}
    </div>
  );
}

