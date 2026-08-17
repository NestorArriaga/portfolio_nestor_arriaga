'use client';

import Link from 'next/link';
import { CSSProperties, useState } from 'react';

import { anchoServido } from '@/lib/densidad';
import type { Lamina } from '@/components/experience-v5/registry';
import styles from './PilarGranular.module.css';
import { RadarTensiones } from './granular/RadarTensiones';
import { PaisajeComparado } from './granular/PaisajeComparado';
import { CultivosExplorer } from './granular/CultivosExplorer';
import { ClusteringStory } from './granular/ClusteringStory';
import { Fragment } from 'react';

/**
 * Un pilar de GRANULAR, dentro del lenguaje de V5.
 *
 * La página anterior era un informe: tres párrafos de apertura, subtítulos
 * explicativos, lecturas largas entre imágenes y una navegación horizontal de
 * siete pilares que se cortaba en pantalla. Todo eso sigue existiendo —no se
 * ha borrado ninguna cautela metodológica— pero se movió a `Notas y alcance`,
 * que se abre a voluntad y no interrumpe el recorrido visual.
 *
 * Lo que queda a la vista: el nombre grande, sus cuatro variables, el mapa, sus
 * categorías, las cifras y los municipios que la fuente nombra.
 */

export type LaminaPilar = {
  id: string;
  titulo: string;
  pagina: number;
  img: Lamina | null;
  sobre: Lamina | null;
  categorias: { name: string; range?: string; desc: string; warning?: string }[];
  municipios: string[];
  /** Pie documentado de la lámina. Es lo que la fuente afirma que se ve. */
  pie?: string;
  /** Lectura larga de la fuente. Va a la bandeja, no al flujo. */
  lectura?: string;
  fuente?: string;
};

export type PilarDatos = {
  id: string;
  numero: string;
  nombre: string;
  variables: string[];
  /** Color de dato del pilar, tal como lo declara el registro. */
  acento: string;
  laminas: LaminaPilar[];
  datos: { label: string; value: string; note?: string }[];
  alcance: { title: string; text: string; points: string[] };
  parrafos: string[];
  pilares: { id: string; numero: string; nombre: string; href: string }[];
  siguiente?: { nombre: string; href: string };
  /** Vecinos a nivel de proyecto: P13 y P15. El paso entre pilares es interno. */
  proyectoAnterior: { num: string; nombre: string; href: string };
  proyectoSiguiente: { num: string; nombre: string; href: string };
  atlasHref: string;
  vistazoHref: string;
};

export function PilarGranular({ d }: { d: PilarDatos }) {
  return (
    <main id="contenido" tabIndex={-1} className={styles.pilar}
          /* El acento documentado del pilar entra una sola vez: los
             instrumentos lo leen de aquí y no lo declaran cada uno. */
          style={{ '--acento': d.acento } as CSSProperties}>
      {/* Nombre grande y cuatro variables. Sin párrafo de apertura. */}
      <header className={styles.apertura}>
        <p className={`${styles.marca} mono`}>{`P14 · Comarca Lagunera · ${d.numero}`}</p>
        {/* El cuerpo responde también a la longitud real del nombre:
            `SOCIOECONOMÍA` a tamaño puramente relativo al viewport se salía. */}
        <h1 className={styles.nombre}
            style={{ '--largo': String(d.nombre.length) } as CSSProperties}>
          {d.nombre.toUpperCase()}
        </h1>
        {/* Cada variable es su propio elemento: como cadena monolítica con
            puntos medios imponía su ancho al grid y era una de las causas del
            desbordamiento en móvil. El separador se dibuja con `::before`, así
            que sólo aparece entre elementos de la misma línea. */}
        <ul className={`${styles.variables} mono`}>
          {d.variables.map((v) => <li key={v}>{v.toUpperCase()}</li>)}
        </ul>
      </header>

      {/* Selector compacto de pilares. No una línea que desborde. */}
      <nav className={styles.pilares} aria-label="Pilares de GRANULAR">
        {d.pilares.map((p) => (
          <Link key={p.id} href={p.href} data-touch
                className={`${styles.pastilla} btn`} data-v="borde"
                aria-current={p.id === d.id ? 'page' : undefined}>
            <span className={styles.pastillaNum}>{p.numero}</span>{p.nombre}
          </Link>
        ))}
      </nav>

      {d.datos.length ? (
        <dl className={styles.cifras}>
          {d.datos.slice(0, 3).map((x) => (
            <div key={x.label}>
              <dt className="mono">{x.label}</dt>
              <dd className="mono">{x.value}</dd>
            </div>
          ))}
        </dl>
      ) : null}

      {d.id === 'agua' ? (
        <section className={styles.instrumento} aria-label="Radar de tensiones y políticas hídricas">
          <RadarTensiones />
        </section>
      ) : null}

      {d.id === 'agropecuario' ? (
        <section className={styles.instrumento} aria-label="Comparador de paisajes productivos">
          <PaisajeComparado />
        </section>
      ) : null}

      {d.id === 'clustering' ? (
        <div className={styles.instrumento}><ClusteringStory /></div>
      ) : null}

      {d.laminas.map((l, index) => (
        <Fragment key={l.id}>
          <LaminaBloque l={l} />
          {d.id === 'agropecuario' && index === d.laminas.length - 1 ? (
            <section className={styles.instrumento} aria-label="Explorador de la estructura agrícola">
              <CultivosExplorer />
            </section>
          ) : null}
        </Fragment>
      ))}

      <section className={styles.alcance}>
        <details>
          <summary className="mono" data-touch>Notas y alcance</summary>
          <div className={styles.alcanceCuerpo}>
            <p className="mono">{d.alcance.text}</p>
            <ul className="mono">
              {d.alcance.points.map((p) => <li key={p}>{p}</li>)}
            </ul>
            {d.parrafos.length ? (
              <>
                <p className={`${styles.alcanceTitulo} mono`}>Planteamiento de la fuente</p>
                {d.parrafos.map((p) => <p key={p.slice(0, 24)} className="mono">{p}</p>)}
              </>
            ) : null}
            {d.laminas.filter((l) => l.lectura).map((l) => (
              <div key={l.id}>
                <p className={`${styles.alcanceTitulo} mono`}>{`${l.titulo} · p.${l.pagina}`}</p>
                <p className="mono">{l.lectura}</p>
                {l.fuente ? <p className={`${styles.fuente} mono`}>{l.fuente}</p> : null}
              </div>
            ))}
          </div>
        </details>
      </section>

      <footer className={styles.salida}>
        <Link className={styles.salto} href={d.proyectoAnterior.href} data-touch>
          <span className={`${styles.saltoDir} mono`}>{`Proyecto anterior · ${d.proyectoAnterior.num}`}</span>
          <span className={styles.saltoNombre}>{d.proyectoAnterior.nombre}</span>
        </Link>

        <div className={styles.centro}>
          <Link className="btn" data-v="borde" href={d.atlasHref}>Volver al recorrido</Link>
          <Link className="btn" data-v="borde" href={d.vistazoHref}>Índice de proyectos</Link>
          {/* El paso entre pilares es interno al proyecto y va aparte del
              anterior/siguiente entre proyectos: son dos movimientos distintos. */}
          {d.siguiente ? (
            <Link className="btn" data-v="borde" href={d.siguiente.href}>
              {`Pilar siguiente · ${d.siguiente.nombre}`}
            </Link>
          ) : null}
        </div>

        <Link className={styles.salto} href={d.proyectoSiguiente.href} data-touch data-dir="adelante">
          <span className={`${styles.saltoDir} mono`}>{`Proyecto siguiente · ${d.proyectoSiguiente.num}`}</span>
          <span className={styles.saltoNombre}>{d.proyectoSiguiente.nombre}</span>
        </Link>
      </footer>
    </main>
  );
}

/**
 * Un mapa del pilar con sus categorías como control.
 *
 * Las categorías vienen con su descripción de la fuente; en el flujo se ve el
 * nombre y el rango, y la descripción aparece al señalar. Así la clasificación
 * es legible de un vistazo y el detalle sigue disponible.
 */
function LaminaBloque({ l }: { l: LaminaPilar }) {
  const [activa, setActiva] = useState<string | null>(null);
  const cat = l.categorias.find((c) => c.name === activa) ?? null;

  return (
    <section className={styles.bloque} aria-label={l.titulo}
             data-instrumento={l.categorias.length || l.municipios.length ? '' : undefined}>
      <div className={styles.mapaCaja}>
        {l.img ? (
          <figure className={styles.mapa}
                  style={{ '--nativo': String(anchoServido(l.img)) } as CSSProperties}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={l.img.src} srcSet={l.img.srcSet} sizes="(max-width: 720px) 92vw, 62vw"
                 width={l.img.width} height={l.img.height}
                 alt={`${l.titulo}. Comarca Lagunera.`} loading="lazy" decoding="async" />
            {l.sobre ? (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img className={styles.sobre} src={l.sobre.src} srcSet={l.sobre.srcSet}
                   sizes="(max-width: 720px) 92vw, 62vw"
                   width={l.sobre.width} height={l.sobre.height}
                   alt="" aria-hidden="true" loading="lazy" decoding="async" />
            ) : null}
          </figure>
        ) : null}
      </div>

      <div className={styles.lectura}>
        <p className={styles.bloqueTitulo}>{l.titulo}</p>
        <p className={`${styles.pagina} mono`}>{`p.${l.pagina}`}</p>

        {/* El pie documentado de la lámina. Sin él, una lámina sin categorías
            dejaba media composición con el título y el folio por toda lectura. */}
        {l.pie ? <p className={styles.pie}>{l.pie}</p> : null}

        {l.categorias.length ? (
          <div className={styles.categorias} role="group" aria-label="Categorías">
            {l.categorias.map((c) => (
              <button key={c.name} type="button" data-touch
                      className={`${styles.categoria} btn`} data-v="fantasma"
                      aria-pressed={activa === c.name}
                      onPointerEnter={() => setActiva(c.name)}
                      onPointerLeave={() => setActiva(null)}
                      onFocus={() => setActiva(c.name)}
                      onBlur={() => setActiva(null)}
                      onClick={() => setActiva(activa === c.name ? null : c.name)}>
                <b>{c.name}</b>
                {c.range ? <span>{c.range}</span> : null}
              </button>
            ))}
          </div>
        ) : null}

        {/* La descripción de la categoría señalada. Una sola a la vez, corta. */}
        <p className={`${styles.detalle} mono`} aria-live="polite">
          {cat ? cat.warning ?? cat.desc : ''}
        </p>

        {l.municipios.length ? (
          <p className={`${styles.municipios} mono`}>
            <span>Municipios nombrados</span>{l.municipios.join(' · ')}
          </p>
        ) : null}
      </div>
    </section>
  );
}
