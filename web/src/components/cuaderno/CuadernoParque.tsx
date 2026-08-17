'use client';

import Link from 'next/link';
import { CSSProperties, useState } from 'react';

import styles from './CuadernoParque.module.css';

/**
 * P15 · Urban Challenge — cuaderno del proyecto.
 *
 * La página anterior tenía ocho pasos y abría por el recurso más débil: un
 * modelo de masas del contexto, sin propuesta todavía, ocupando los tres
 * primeros viewports. Aquí el proyecto empieza por lo mejor que tiene.
 *
 * Cuatro momentos: VISTAZO, SISTEMA, VARIACIONES y DETALLE. El material de
 * proceso —el predio, la manzana y el levantamiento— no se borra: vive en una
 * bandeja `Proceso`, cerrada por defecto.
 */

export type Dibujo = {
  id: string;
  titulo: string;
  viewBox: string;
  capas: { nombre: string; color: string; body: string }[];
};

export type Raster = { src: string; srcSet: string; width: number; height: number };

export type ParqueDatos = {
  planta: Dibujo | null;
  /** Circulación real, tomada de la Variación 01. */
  circulacion: { viewBox: string; capa: { nombre: string; color: string; body: string } } | null;
  variaciones: Dibujo[];
  detalle: Dibujo | null;
  tablero: Raster | null;
  piezas: { label: string; caja: [number, number, number, number] }[];
  proceso: { titulo: string; nota?: string; img: Raster | null }[];
  lugar: string;
  escala: string;
  anio?: string;
  identificacion: string;
  anteriorHref: string;
  atlasHref: string;
  vistazoHref: string;
};

const HOTSPOTS: [number, number][] = [[38, 44], [62, 33], [55, 63]];

export function CuadernoParque({ d }: { d: ParqueDatos }) {
  return (
    <main id="contenido" tabIndex={-1} className={styles.parque}>
      <Vistazo d={d} />
      <Sistema d={d} />
      <Variaciones d={d} />
      <Detalle d={d} />
      <Proceso d={d} />

      <footer className={styles.salida}>
        <Link className={styles.salto} href={d.anteriorHref} data-touch>
          <span className={`${styles.saltoDir} mono`}>anterior</span>
          <span className={styles.saltoNombre}>GRANULAR</span>
        </Link>
        <div className={styles.centro}>
          <Link className="btn" data-v="borde" href={d.atlasHref}>Volver al recorrido</Link>
          <Link className="btn" data-v="borde" href={d.vistazoHref}>Índice de proyectos</Link>
        </div>
      </footer>
    </main>
  );
}

/* -------------------------------------------------------------------------- */

/** El proyecto entero en un viewport: planta grande y tres piezas de programa. */
function Vistazo({ d }: { d: ParqueDatos }) {
  const [foco, setFoco] = useState<number | null>(null);

  return (
    <section className={styles.vistazo} aria-label="Vistazo del proyecto">
      <header className={styles.encabezado}>
        <p className={`${styles.num} mono`}>P15</p>
        <h1 className={styles.titulo}>Urban Challenge</h1>
        <dl className={`${styles.ficha} mono`}>
          <div><dt>Territorio</dt><dd>{d.lugar}</dd></div>
          <div><dt>Escala</dt><dd>{d.escala}</dd></div>
          {d.anio ? <div><dt>Año</dt><dd>{d.anio}</dd></div> : null}
          <div><dt>Marco</dt><dd>{d.identificacion}</dd></div>
        </dl>
      </header>

      <div className={styles.plantaCaja}>
        <Planta dibujo={d.planta} />
        {d.piezas.map((p, k) => (
          <button key={p.label} type="button" data-touch
                  className={styles.hotspot}
                  style={{ '--hx': `${HOTSPOTS[k][0]}%`, '--hy': `${HOTSPOTS[k][1]}%` } as CSSProperties}
                  data-on={foco === k || undefined}
                  aria-pressed={foco === k}
                  onPointerEnter={() => setFoco(k)}
                  onPointerLeave={() => setFoco(null)}
                  onFocus={() => setFoco(k)}
                  onBlur={() => setFoco(null)}
                  onClick={() => setFoco(foco === k ? null : k)}>
            <i aria-hidden="true" /><span className="mono">{p.label}</span>
          </button>
        ))}
      </div>

      <div className={styles.bandeja}>
        {d.piezas.map((p, k) => (
          <figure key={p.label} className={styles.recorte}
                  data-on={foco === k || undefined}
                  style={encuadre(p.caja)}
                  onPointerEnter={() => setFoco(k)}
                  onPointerLeave={() => setFoco(null)}>
            <figcaption className="mono">{p.label}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

/** Las tres capas sobre la misma planta, activables. */
function Sistema({ d }: { d: ParqueDatos }) {
  const [sola, setSola] = useState<string | null>(null);
  const capas = ['vegetación', 'circulación'] as const;

  return (
    <section className={styles.sistema} aria-label="Sistema">
      <p className={`${styles.rotulo} mono`}>
        Sistema<span>vegetación y circulación sobre la misma planta</span>
      </p>

      <div className={styles.plantaCaja}>
        <Planta dibujo={d.planta} atenuada={sola === 'circulación'} />
        {d.circulacion ? (
          <svg className={styles.circulacion} viewBox={d.circulacion.viewBox}
               data-off={sola === 'vegetación' || undefined} aria-hidden="true">
            <g fill={d.circulacion.capa.color} stroke="#a5784c"
               dangerouslySetInnerHTML={{ __html: d.circulacion.capa.body }} />
          </svg>
        ) : null}
      </div>

      <div className={styles.selector} role="group" aria-label="Capas">
        <button type="button" data-touch className={`${styles.opcion} btn`} data-v="borde"
                aria-pressed={sola === null} onClick={() => setSola(null)}>todo</button>
        {capas.map((c) => (
          <button key={c} type="button" data-touch className={`${styles.opcion} btn`} data-v="borde"
                  aria-pressed={sola === c}
                  onClick={() => setSola(sola === c ? null : c)}>{c}</button>
        ))}
      </div>
    </section>
  );
}

/**
 * Una variación grande y las otras dos pequeñas, a la misma escala de caja.
 * Se cambia con puntero, teclado o toque.
 */
function Variaciones({ d }: { d: ParqueDatos }) {
  const [sel, setSel] = useState(0);
  if (!d.variaciones.length) return null;

  const mover = (paso: number) =>
    setSel((v) => (v + paso + d.variaciones.length) % d.variaciones.length);

  return (
    <section className={styles.variaciones} aria-label="Variaciones">
      <p className={`${styles.rotulo} mono`}>
        Variaciones<span>una propuesta y sus alternativas</span>
      </p>

      <div
        className={styles.principal}
        role="group"
        tabIndex={0}
        aria-label={`Variación ${sel + 1} de ${d.variaciones.length}`}
        onKeyDown={(e) => {
          if (e.key === 'ArrowRight') { mover(1); e.preventDefault(); }
          if (e.key === 'ArrowLeft') { mover(-1); e.preventDefault(); }
        }}
      >
        <Dibujo d={d.variaciones[sel]} />
        <p className={`${styles.pie} mono`}>{d.variaciones[sel].titulo}</p>
      </div>

      <div className={styles.alternativas}>
        {d.variaciones.map((v, i) => (
          i === sel ? null : (
            <button key={v.id} type="button" data-touch
                    className={styles.alternativa}
                    onClick={() => setSel(i)}
                    aria-label={`Ver ${v.titulo}`}>
              <Dibujo d={v} />
              <span className="mono">{v.titulo}</span>
            </button>
          )
        ))}
      </div>
    </section>
  );
}

/** El mejor axonométrico cierra el cuaderno. */
function Detalle({ d }: { d: ParqueDatos }) {
  if (!d.detalle) return null;
  return (
    <section className={styles.detalle} aria-label="Detalle">
      <p className={`${styles.rotulo} mono`}>
        Detalle<span>foro y mirador circular</span>
      </p>
      <div className={styles.detalleCaja}><Dibujo d={d.detalle} /></div>
      <p className={`${styles.pie} mono`}>Acercamiento al foro y al mirador circular</p>
    </section>
  );
}

/** El material de proceso, disponible pero fuera del recorrido principal. */
function Proceso({ d }: { d: ParqueDatos }) {
  if (!d.proceso.length) return null;
  return (
    <section className={styles.proceso}>
      <details>
        <summary className="mono" data-touch>Proceso</summary>
        <div className={styles.procesoCuerpo}>
          {d.proceso.map((p) => (
            <figure key={p.titulo} className={styles.procesoPieza}>
              {p.img ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img src={p.img.src} srcSet={p.img.srcSet} sizes="(max-width: 720px) 92vw, 30vw"
                     width={p.img.width} height={p.img.height}
                     alt={p.titulo} loading="lazy" decoding="async" />
              ) : null}
              <figcaption className="mono">
                <b>{p.titulo}</b>{p.nota ? <span>{p.nota}</span> : null}
              </figcaption>
            </figure>
          ))}
        </div>
      </details>
    </section>
  );
}

/* -------------------------------------------------------------------------- */

function Planta({ dibujo, atenuada }: { dibujo: Dibujo | null; atenuada?: boolean }) {
  if (!dibujo) return null;
  return (
    <svg className={styles.planta} viewBox={dibujo.viewBox} role="img"
         data-off={atenuada || undefined}
         aria-label="Planta general del parque">
      {dibujo.capas.map((c) => (
        <g key={c.nombre} fill={c.color} stroke={c.color}
           dangerouslySetInnerHTML={{ __html: c.body }} />
      ))}
    </svg>
  );
}

function Dibujo({ d }: { d: Dibujo }) {
  return (
    <svg className={styles.dibujo} viewBox={d.viewBox} role="img" aria-label={d.titulo}>
      {d.capas.map((c) => (
        <g key={c.nombre} fill={c.color} stroke={c.color}
           dangerouslySetInnerHTML={{ __html: c.body }} />
      ))}
    </svg>
  );
}

/** Encuadre medido de una pieza del tablero, en fracciones de la imagen. */
function encuadre([x, y, w, h]: [number, number, number, number]): CSSProperties {
  return {
    backgroundSize: `${(100 / w).toFixed(2)}% ${(100 / h).toFixed(2)}%`,
    backgroundPosition: `${((x / (1 - w)) * 100).toFixed(2)}% ${((y / (1 - h)) * 100).toFixed(2)}%`,
    aspectRatio: `${w * 2200} / ${h * 1556}`,
  } as CSSProperties;
}
