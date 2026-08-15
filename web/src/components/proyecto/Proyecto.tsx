'use client';

import Link from 'next/link';
import { CSSProperties, useEffect, useRef, useState } from 'react';

import { Glifo } from '@/components/cuaderno/Glifo';
import { anchoServido } from '@/lib/densidad';
import type { Capitulo, Clase, Plano, Recurso } from './blueprints';
import { useConectores } from './conectores';
import styles from './Proyecto.module.css';

/**
 * Atlas operativo — página interior de un proyecto.
 *
 * No es una ficha con una imagen: es una mesa de trabajo territorial. La
 * estructura de navegación es común a los trece —riel, índice de capítulos,
 * retícula, microdatos, amarillo de señal y salida—, pero la composición de
 * cada capítulo la decide el material, no una plantilla.
 *
 * Cada instrumento hace una operación cartográfica concreta: localizar,
 * clasificar, aislar, recorrer un gradiente, converger nodos, comparar dos
 * estados, ampliar un detalle, sincronizar mapa y perfil, ensamblar criterios
 * ponderados o seguir el agua. El movimiento existe para explicar esa
 * operación; donde no explica nada, no hay movimiento.
 */

export function Proyecto({
  p, vecinos, atlasHref, vistazoHref,
}: {
  p: Plano;
  vecinos: {
    anterior?: { id: string; corto: string; href: string };
    siguiente?: { id: string; corto: string; href: string };
  };
  atlasHref: string;
  vistazoHref: string;
}) {
  const [activo, setActivo] = useState<string>('apertura');

  // Capítulo actual: un solo observador para toda la página.
  useEffect(() => {
    const io = new IntersectionObserver(
      (es) => {
        const v = es.filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (v) setActivo((v.target as HTMLElement).id);
      },
      { rootMargin: '-42% 0px -42% 0px', threshold: [0, 0.5, 1] },
    );
    document.querySelectorAll('[data-capitulo]').forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, [p.id]);

  const puntos = [{ id: 'apertura', nombre: 'apertura' },
    ...p.capitulos.map((c) => ({ id: c.id, nombre: c.nombre })),
    { id: 'salida', nombre: 'salida' }];

  return (
    <main
      id="contenido" tabIndex={-1}
      className={styles.proyecto}
      data-sup={p.superficie}
      data-familia={p.familia}
    >
      <Apertura p={p} />

      {/* Índice de capítulos: puntos, etiqueta al señalar, estado actual. */}
      <nav className={styles.indice} aria-label="Capítulos del proyecto">
        <ol>
          {puntos.map((x) => (
            <li key={x.id}>
              <a href={`#${x.id}`} data-on={activo === x.id || undefined}
                 aria-current={activo === x.id ? 'true' : undefined}>
                <i aria-hidden="true" />
                <span className="mono">{x.nombre}</span>
              </a>
            </li>
          ))}
        </ol>
      </nav>

      {p.capitulos.map((c) => <Seccion key={c.id} c={c} p={p} />)}

      <Salida p={p} vecinos={vecinos} atlasHref={atlasHref} vistazoHref={vistazoHref} />
    </main>
  );
}

/* -------------------------------------------------------------------------- */
/* Apertura                                                                    */
/* -------------------------------------------------------------------------- */

/**
 * Medidas del rótulo, para que el cuerpo salga del ancho real de su columna.
 *
 * El tamaño no puede depender sólo del viewport: `Geomorfología` es una sola
 * palabra de trece signos que no admite corte, y a 7.2vw medía casi 740 px
 * dentro de una columna de 540 px, así que se metía debajo de la obra. Se
 * publican dos medidas y el CSS aplica la más restrictiva:
 *
 * - `--palabra`: la palabra más larga, que tiene que caber en un renglón;
 * - `--largo`: el rótulo completo, que tiene que caber en dos.
 */
function medidaRotulo(rotulo: string): CSSProperties {
  const palabras = rotulo.split(/\s+/).filter(Boolean);
  const palabra = Math.max(...palabras.map((w) => w.length), 1);
  return {
    '--largo': String(rotulo.length),
    '--palabra': String(palabra),
  } as CSSProperties;
}

function Apertura({ p }: { p: Plano }) {
  return (
    <header id="apertura" data-capitulo="" className={styles.apertura}>
      <div className={styles.aperturaTexto}>
        <p className={`${styles.codigo} mono`}>
          <Glifo id={p.id} tam={22} />{`P${p.id}`}
        </p>
        <h1 className={styles.titulo} style={medidaRotulo(p.corto)}>
          {p.corto}
        </h1>
        <dl className={`${styles.ficha} mono`}>
          <div><dt>Territorio</dt><dd>{p.lugar}</dd></div>
          <div><dt>Escala</dt><dd>{p.escala}</dd></div>
          <div><dt>Operación</dt><dd>{p.operacion}</dd></div>
        </dl>

        {p.hero.metrica ? (
          <p className={styles.heroMetrica}>
            <b>{p.hero.metrica.valor}</b>
            <span className="mono">{p.hero.metrica.etiqueta}</span>
          </p>
        ) : null}

        {/* Microinstrumento: un preludio de la operación del proyecto, dentro
            del primer viewport y en la propia composición, no en una tarjeta.
            Sale del primer capítulo con material medible. */}
        <Preludio p={p} />
      </div>

      {p.hero.recurso
        ? <Pieza r={p.hero.recurso} clase={styles.heroObra} tramo={7} prioridad
                 nombreVista={`obra-p${p.id}`} />
        : null}
    </header>
  );
}

/**
 * Preludio de la apertura.
 *
 * Anticipa la operación con el material real del proyecto: la rampa reducida,
 * las clases comparables, el contador de nodos, los pesos o las bandas del
 * perfil. Si el proyecto no tiene ninguno, no se dibuja nada: una tarjeta vacía
 * sería peor que el espacio.
 */
function Preludio({ p }: { p: Plano }) {
  // Se recorren los capítulos en su orden y se dibuja el primero con material
  // medible. Antes se buscaba por una lista fija de tipos, así que P05 —cuyo
  // primer mapa no declara clases— caía en el vacío y su apertura se quedaba
  // sin instrumento aunque el proyecto sí tiene tres ventanas de detalle.
  for (const c of p.capitulos) {
    const pieza = preludioDe(c);
    if (pieza) return pieza;
  }
  return null;
}

function preludioDe(c: Capitulo) {
  switch (c.tipo) {
    case 'nodos':
      return (
        <p className={`${styles.preludio} mono`}>
          <b>{c.nodos.length}</b>{c.etiqueta}
        </p>
      );

    case 'criterios': {
      const suma = c.criterios.reduce((a, x) => a + x.peso, 0);
      const max = Math.max(...c.criterios.map((x) => x.peso));
      return (
        <div className={styles.preludio}>
          <ul className={styles.preludioReglas} aria-hidden="true">
            {c.criterios.map((k) => (
              <li key={k.nombre} style={{ '--w': `${(k.peso / max) * 100}%` } as CSSProperties} />
            ))}
          </ul>
          {/* La suma se calcula desde los pesos, no se escribe a mano. */}
          <span className="mono">{`${c.criterios.length} criterios · ${suma.toFixed(2)}`}</span>
        </div>
      );
    }

    case 'detalles':
      return (
        <p className={`${styles.preludio} mono`}>
          <b>{c.puntos.length}</b>ventanas de detalle
        </p>
      );

    case 'comparador':
      return (
        <p className={`${styles.preludio} mono`}>
          <b>2</b>{`${c.etiquetaA} / ${c.etiquetaB}`}
        </p>
      );

    case 'evidencia':
      return (
        <p className={`${styles.preludio} mono`}>
          <b>{c.piezas.length}</b>
          {c.piezas.length === 1 ? 'registro de campo' : 'registros de campo'}
        </p>
      );

    case 'mapa':
    case 'gradiente':
    case 'perfil':
    case 'flujo': {
      if (!c.clases.length) return null;
      return (
        <div className={styles.preludio}>
          <ul className={styles.preludioCinta} aria-hidden="true">
            {c.clases.map((k) => <li key={k.label} style={{ '--c': k.color } as CSSProperties} />)}
          </ul>
          <span className="mono">{`${c.clases.length} clases`}</span>
        </div>
      );
    }

    default:
      return null;
  }
}

/* -------------------------------------------------------------------------- */
/* Instrumentos                                                                */
/* -------------------------------------------------------------------------- */

function Seccion({ c, p }: { c: Capitulo; p: Plano }) {
  return (
    <section id={c.id} data-capitulo="" className={styles.capitulo} data-tipo={c.tipo}>
      <p className={`${styles.capituloNombre} mono`}>{c.nombre}</p>
      {contenido(c, p)}
    </section>
  );
}

function contenido(c: Capitulo, p: Plano) {
  switch (c.tipo) {
    case 'localizador': return <Localizador c={c} />;
    case 'mapa': return <Mapa c={c} />;
    case 'gradiente': return <Gradiente c={c} />;
    case 'nodos': return <Nodos c={c} />;
    case 'metricas': return <Metricas c={c} />;
    case 'comparador': return <Comparador c={c} />;
    case 'detalles': return <Detalles c={c} />;
    case 'perfil': return <Perfil c={c} />;
    case 'criterios': return <Criterios c={c} fuente={p.fuente} />;
    case 'evidencia': return <Evidencia c={c} />;
    case 'flujo': return <Flujo c={c} />;
    default: return null;
  }
}

/**
 * Anchos servidos, deducidos del tramo que la pieza ocupa en la retícula.
 *
 * Los valores de `sizes` se escribían a mano y hacía tiempo que no coincidían
 * con la composición: la banda de evidencia declaraba `34vw` sobre una caja de
 * 745 px, así que el navegador descargaba el derivado de 500 px y la fotografía
 * llegaba a dos tercios de la densidad necesaria. Al salir del mismo número de
 * columnas que usa la hoja de estilo, el anuncio y la caja no pueden separarse.
 *
 * El ancho editorial ocupa alrededor del 92 % del viewport, de ahí el factor.
 * Bajo 1100 px la retícula apila a una columna y la pieza pasa a ocupar
 * prácticamente todo el ancho útil.
 */
function anchos(tramo: number): string {
  const escritorio = Math.round((tramo / 12) * 92);
  return `(max-width: 720px) 92vw, (max-width: 1100px) 94vw, ${escritorio}vw`;
}

/**
 * Una pieza dentro de su guarda de densidad. Nunca por encima de 1:1.
 *
 * `prioridad` reserva la caja con la proporción exacta del recurso y pide la
 * descarga antes que nada: la apertura mostraba el pie de foto durante 700–900
 * ms mientras el navegador decodificaba la imagen, y lo primero que se leía de
 * un proyecto era su crédito.
 */
function Pieza({
  r, clase, tramo = 8, prioridad, nombreVista, children,
}: {
  r: Recurso;
  clase?: string;
  /** Columnas de la retícula de 12 que ocupa la pieza en escritorio. */
  tramo?: number;
  prioridad?: boolean;
  /** Nombre de transición: el mismo que lleva la obra en la portada. */
  nombreVista?: string;
  children?: React.ReactNode;
}) {
  return (
    <figure
      className={`${styles.pieza}${clase ? ` ${clase}` : ''}`}
      data-prioridad={prioridad || undefined}
      style={{
        /* El techo es el archivo que el navegador puede descargar de verdad; el
           nativo del documento sólo cuenta si existe un derivado de ese tamaño.
           Con `r.nativo` a secas la guarda autorizaba anchos para los que no
           hay píxeles servidos. */
        '--nativo': String(Math.min(r.nativo[0], anchoServido(r.img))),
        '--ratio': String(r.img.ratio),
        ...(nombreVista ? { viewTransitionName: nombreVista } : null),
      } as CSSProperties}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={r.img.src} srcSet={r.img.srcSet} sizes={anchos(tramo)}
           width={r.img.width} height={r.img.height}
           alt={r.pie}
           loading={prioridad ? 'eager' : 'lazy'}
           decoding={prioridad ? 'sync' : 'async'}
           /* React 18.3 ya reenvía `fetchPriority` al DOM. En minúsculas lo
              rechaza como propiedad desconocida y avisa por consola en cada
              lámina, que era el único fallo que devolvía la auditoría de rutas. */
           fetchPriority={prioridad ? 'high' : undefined} />
      {children}
      <figcaption className="mono">
        {r.pie}{r.origen ? <span>{r.origen}</span> : null}
      </figcaption>
    </figure>
  );
}

/**
 * Localizador: del territorio amplio al área de estudio.
 *
 * El paso se hace con un contorno que se traza, no con un zoom del ráster.
 */
function Localizador({ c }: { c: Extract<Capitulo, { tipo: 'localizador' }> }) {
  return (
    <div className={styles.localizador}>
      {c.contorno ? <Pieza r={c.contorno} tramo={5} /> : null}
      <div className={styles.localizadorDatos}>
        <p className={styles.foco}>{c.foco}</p>
        {/* Los tres datos de orientación se reparten el ancho de la columna en
            vez de apilarse en un margen: la banda técnica es lo que convierte
            una imagen situada en una lectura territorial. */}
        <dl className={`${styles.orientacion} mono`}>
          {c.coordenada ? (
            <div><dt>coordenada</dt><dd>{c.coordenada}</dd></div>
          ) : null}
          <div><dt>escala</dt><dd><Escala /></dd></div>
          <div><dt>norte</dt><dd><Norte /></dd></div>
        </dl>
      </div>
    </div>
  );
}

/** Mapa con su leyenda como instrumento: señalar una clase la aísla. */
function Mapa({ c }: { c: Extract<Capitulo, { tipo: 'mapa' }> }) {
  const [activa, setActiva] = useState<string | null>(null);
  const clase = c.clases.find((x) => x.label === activa);

  return (
    <div className={styles.mesa}>
      <div className={styles.mapaCaja} data-aislado={clase?.mascara ? '' : undefined}>
        <Pieza r={c.recurso}>
          {clase?.mascara ? (
            <span className={styles.mascara} aria-hidden="true"
                  style={{ '--c': clase.color, '--m': `url(${clase.mascara})` } as CSSProperties} />
          ) : null}
        </Pieza>
      </div>
      <Leyenda clases={c.clases} activa={activa} onActiva={setActiva} nota={c.nota}
               resumen={clase ? `${clase.label}` : `${c.clases.length} clases reunidas`} />
    </div>
  );
}

/**
 * Leyenda-instrumento.
 *
 * Sólo son botones las clases cuya máscara existe: una clase que no cambia el
 * mapa se presenta como información, no como un control que no hace nada.
 */
function Leyenda({
  clases, activa, onActiva, nota, resumen,
}: {
  clases: Clase[]; activa: string | null;
  onActiva: (v: string | null) => void; nota?: string; resumen?: string;
}) {
  if (!clases.length) return nota ? <p className={`${styles.nota} mono`}>{nota}</p> : null;

  const activables = clases.filter((k) => k.mascara).length;
  const i = clases.findIndex((k) => k.label === activa);

  return (
    <div className={styles.leyenda}>
      <p className={`${styles.leyendaTitulo} mono`}>
        {activa ? `${i + 1} de ${clases.length}` : `${clases.length} clases`}
        {activables < clases.length ? <span>{`${activables} aislables`}</span> : null}
      </p>

      {/* Estado activo con muestra grande: nombre y color en una sola línea
          legible, para que la selección se lea sin volver a la lista. */}
      {activa ? (
        <p className={styles.activo} style={{ '--c': clases[i]?.color } as CSSProperties}>
          <i aria-hidden="true" />
          <b>{activa}</b>
        </p>
      ) : null}
      <ul>
        {clases.map((k) => (
          <li key={k.label} style={{ '--c': k.color } as CSSProperties}>
            {k.mascara ? (
              <button type="button" className="mono" aria-pressed={activa === k.label}
                      onPointerEnter={() => onActiva(k.label)}
                      onPointerLeave={() => onActiva(null)}
                      onFocus={() => onActiva(k.label)}
                      onBlur={() => onActiva(null)}
                      onClick={() => onActiva(activa === k.label ? null : k.label)}>
                <i aria-hidden="true" />{k.label}
              </button>
            ) : (
              <p className="mono"><i aria-hidden="true" />{k.label}</p>
            )}
          </li>
        ))}
      </ul>
      {nota ? <p className={`${styles.nota} mono`}>{nota}</p> : null}

      {/* Cierre del capítulo: la síntesis del estado, y un reinicio para volver
          al conjunto sin buscar la clase activa en la lista. */}
      <p className={`${styles.resuelto} mono`} aria-live="polite">
        {resumen}
        {activa ? (
          <button type="button" onClick={() => onActiva(null)}>ver todo</button>
        ) : null}
      </p>
    </div>
  );
}

/**
 * Gradiente: una rampa de valores que revela su máscara sobre el mismo mapa.
 *
 * El valor activo, su muestra de color y el área que ocupa quedan relacionados
 * en un solo gesto.
 */
/** Degradado con paradas duras: cada tramo ocupa su parte exacta de la regla. */
function degradado(clases: Clase[]): string {
  const paso = 100 / clases.length;
  return clases
    .map((k, n) => `${k.color} ${(n * paso).toFixed(2)}% ${((n + 1) * paso).toFixed(2)}%`)
    .join(', ');
}

function Gradiente({ c }: { c: Extract<Capitulo, { tipo: 'gradiente' }> }) {
  const [i, setI] = useState(-1);
  const clase = c.clases[i];

  return (
    <div className={styles.mesa}>
      <div className={styles.mapaCaja} data-aislado={clase?.mascara ? '' : undefined}>
        <Pieza r={c.recurso}>
          {clase?.mascara ? (
            <span className={styles.mascara} aria-hidden="true"
                  style={{ '--c': clase.color, '--m': `url(${clase.mascara})` } as CSSProperties} />
          ) : null}
        </Pieza>
      </div>

      <div className={styles.rampa} role="group" aria-label="Rampa de captura">
        <p className={`${styles.leyendaTitulo} mono`}>
          {c.unidad ? `captura · ${c.unidad}` : 'captura'}
        </p>

        {/* Regla cromática continua: la rampa es un continuo y una lista de
            renglones la partía en ocho cosas separadas. Las marcas mantienen el
            control con teclado y puntero. */}
        <div className={styles.rampaBanda}
             style={{ '--tramos': degradado(c.clases) } as CSSProperties}>
          <span className={styles.rampaColor} aria-hidden="true" />
          <ol>
            {c.clases.map((k, n) => (
              <li key={k.label}>
                <button type="button" className="mono" aria-pressed={i === n}
                        aria-label={`${k.label}${c.unidad ? ` ${c.unidad}` : ''}`}
                        onPointerEnter={() => setI(n)}
                        onFocus={() => setI(n)}
                        onClick={() => setI(i === n ? -1 : n)}>
                  <i aria-hidden="true" />
                  <b>{k.label}</b>
                </button>
              </li>
            ))}
          </ol>
        </div>

        <p className={styles.rampaActivo} aria-live="polite">
          {clase ? (
            <>
              <b>{clase.label}</b>
              {c.unidad ? <span className="mono">{c.unidad}</span> : null}
            </>
          ) : <span className="mono">recorre la rampa</span>}
        </p>
      </div>
    </div>
  );
}

/** Nodos verificados que convergen sobre el mapa, con su contador. */
function Nodos({ c }: { c: Extract<Capitulo, { tipo: 'nodos' }> }) {
  const [foco, setFoco] = useState<number | null>(null);

  return (
    <div className={styles.mesa}>
      <div className={styles.mapaCaja}>
        <Pieza r={c.recurso}>
          <svg className={styles.nodos} viewBox="0 0 100 100" preserveAspectRatio="none">
            <title>{`${c.nodos.length} ${c.etiqueta}`}</title>
            {c.nodos.map((n, k) => (
              <circle key={k} cx={n.x * 100} cy={n.y * 100} r={Math.max(0.6, n.r * 100)}
                      style={{ '--i': String(k) } as CSSProperties}
                      data-on={foco === k || undefined}
                      onPointerEnter={() => setFoco(k)}
                      onPointerLeave={() => setFoco(null)} />
            ))}
          </svg>
        </Pieza>
      </div>

      <div className={styles.contador}>
        <p className={styles.contadorCifra}>{c.nodos.length}</p>
        <p className={`${styles.contadorEtiqueta} mono`}>{c.etiqueta}</p>
        {foco !== null ? (
          <p className={`${styles.coord} mono`} aria-live="polite">
            {`${(c.nodos[foco].x * 100).toFixed(1)} · ${(c.nodos[foco].y * 100).toFixed(1)} del encuadre`}
          </p>
        ) : null}
      </div>
    </div>
  );
}

/**
 * Cifras compuestas, no tarjetas.
 *
 * La regla comparativa sólo se dibuja cuando todas las cifras comparten unidad:
 * comparar metros cuadrados con habitantes y con un porcentaje en la misma barra
 * produciría una relación que los datos no afirman.
 */
function Metricas({ c }: { c: Extract<Capitulo, { tipo: 'metricas' }> }) {
  const leidas = c.metricas.map((m) => {
    const n = Number(m.valor.replace(/[^0-9.,]/g, '').replace(/\s/g, '').replace(/,/g, ''));
    const unidad = m.valor.replace(/[0-9.,\s]/g, '');
    return { ...m, n, unidad };
  });
  const unidades = new Set(leidas.map((m) => m.unidad));
  const comparables = unidades.size === 1 && leidas.every((m) => Number.isFinite(m.n) && m.n > 0);
  const mayor = Math.max(...leidas.map((m) => m.n));

  // Hay capítulos donde las «cifras» no son cifras sino enunciados —los tres
  // patrones dominantes de una reserva, por ejemplo—. Compuestos a 72 px se
  // parten en tres renglones y dejan de leerse; se componen como especímenes
  // numerados, que es lo que son.
  const textual = leidas.every((m) => !/\d/.test(m.valor));
  if (textual) {
    return (
      <div className={styles.metricas}>
        <ol className={styles.especimenes}>
          {leidas.map((m, i) => (
            <li key={m.etiqueta}>
              <span className={`${styles.especimenNum} mono`}>{String(i + 1).padStart(2, '0')}</span>
              <p className={styles.especimenValor}>{m.valor}</p>
              <p className={`${styles.especimenPie} mono`}>{m.etiqueta}</p>
            </li>
          ))}
        </ol>
        {c.apoyo ? <Pieza r={c.apoyo} clase={styles.apoyo} tramo={4} /> : null}
      </div>
    );
  }

  return (
    <div className={styles.metricas}>
      <dl data-comparable={comparables ? '' : undefined}>
        {leidas.map((m) => (
          <div key={m.etiqueta}>
            <dd className="mono">{m.valor}</dd>
            {comparables ? (
              <span className={styles.reglaCifra} aria-hidden="true"
                    style={{ '--w': `${(m.n / mayor) * 100}%` } as CSSProperties} />
            ) : null}
            <dt className="mono">{m.etiqueta}</dt>
          </div>
        ))}
      </dl>
      {c.apoyo ? <Pieza r={c.apoyo} clase={styles.apoyo} tramo={4} /> : null}
    </div>
  );
}

/**
 * Comparador calibrado entre dos artefactos reales.
 *
 * En escritorio, un divisor arrastrable; en táctil, dos botones con fundido:
 * un tirador de pocos píxeles no se opera con un dedo.
 */
function Comparador({ c }: { c: Extract<Capitulo, { tipo: 'comparador' }> }) {
  const [x, setX] = useState(50);
  const [modo, setModo] = useState<'a' | 'b' | 'mixto'>('mixto');
  const caja = useRef<HTMLDivElement>(null);

  const mover = (e: React.PointerEvent) => {
    const n = caja.current;
    if (!n || e.buttons === 0) return;
    const r = n.getBoundingClientRect();
    setX(Math.max(0, Math.min(100, ((e.clientX - r.left) / r.width) * 100)));
    setModo('mixto');
  };

  const corte = modo === 'a' ? 100 : modo === 'b' ? 0 : x;

  return (
    <div className={styles.comparador}>
      <div className={styles.comparadorCaja} ref={caja} onPointerMove={mover}
           style={{ '--x': `${corte}%` } as CSSProperties}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className={styles.compA} src={c.a.img.src} srcSet={c.a.img.srcSet} sizes={anchos(11)}
             width={c.a.img.width} height={c.a.img.height} alt={c.a.pie} loading="lazy" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className={styles.compB} src={c.b.img.src} srcSet={c.b.img.srcSet} sizes={anchos(11)}
             width={c.b.img.width} height={c.b.img.height} alt={c.b.pie} loading="lazy" />
        <span className={styles.divisor} aria-hidden="true" />
        <span className={`${styles.compEtiqueta} mono`} data-lado="a">{c.etiquetaA}</span>
        <span className={`${styles.compEtiqueta} mono`} data-lado="b">{c.etiquetaB}</span>
      </div>

      <div className={styles.compControles} role="group" aria-label="Estado de la comparación">
        <button type="button" className="btn" data-v="borde" aria-pressed={modo === 'a'}
                onClick={() => setModo('a')}>{c.etiquetaA}</button>
        <button type="button" className="btn" data-v="borde" aria-pressed={modo === 'mixto'}
                onClick={() => setModo('mixto')}>ambos</button>
        <button type="button" className="btn" data-v="borde" aria-pressed={modo === 'b'}
                onClick={() => setModo('b')}>{c.etiquetaB}</button>
        <label className={`${styles.deslizador} mono`}>
          <span>corte</span>
          <input type="range" min={0} max={100} value={Math.round(corte)}
                 onChange={(e) => { setX(Number(e.target.value)); setModo('mixto'); }} />
        </label>
      </div>
    </div>
  );
}

/**
 * Atlas de detalles: el mapa general y tres recortes unidos por conectores.
 *
 * Los recortes se componen con `background-position`, que alinea un punto focal
 * concreto sin depender de que la caja tenga la proporción exacta, y nunca se
 * amplían por encima del recurso nativo.
 */
/** Acercamiento del recorte. El CSS lee el mismo número que la etiqueta. */
const ZOOM = 3;

function Detalles({ c }: { c: Extract<Capitulo, { tipo: 'detalles' }> }) {
  const [activo, setActivo] = useState<number | null>(null);
  const caja = useRef<HTMLDivElement>(null);
  const marcas = useRef<(HTMLButtonElement | null)[]>([]);
  const recortes = useRef<(HTMLSpanElement | null)[]>([]);

  const lineas = useConectores(caja, () =>
    c.puntos.map((_, i) => ({ de: marcas.current[i], a: recortes.current[i] })));

  return (
    <div className={styles.atlas} ref={caja}>
      {/* Las llamadas se miden entre la marca y su recorte: una línea que no
          toca los dos extremos no explica nada, sólo decora. */}
      <svg className={styles.llamadas} aria-hidden="true">
        {lineas.map((l, i) => (
          <line key={i} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} data-on={activo === i || undefined} />
        ))}
      </svg>

      <div className={styles.atlasMapa}>
        <Pieza r={c.recurso} tramo={7}>
          {c.puntos.map((pt, i) => (
            <button key={i} type="button" className={styles.marca}
                    ref={(n) => { marcas.current[i] = n; }}
                    style={{ '--mx': `${pt.x}%`, '--my': `${pt.y}%` } as CSSProperties}
                    data-on={activo === i || undefined}
                    aria-pressed={activo === i}
                    aria-label={`Detalle ${i + 1}`}
                    onPointerEnter={() => setActivo(i)}
                    onPointerLeave={() => setActivo(null)}
                    onFocus={() => setActivo(i)}
                    onBlur={() => setActivo(null)}
                    onClick={() => setActivo(activo === i ? null : i)}>
              <i aria-hidden="true" />
              <span className="mono">{String(i + 1).padStart(2, '0')}</span>
            </button>
          ))}
        </Pieza>
      </div>

      <ol className={styles.atlasDetalles} style={{ '--zoom': String(ZOOM) } as CSSProperties}>
        {c.puntos.map((pt, i) => (
          <li key={i} data-on={activo === i || undefined}
              onPointerEnter={() => setActivo(i)}
              onPointerLeave={() => setActivo(null)}>
            <span className={styles.recorte} aria-hidden="true"
                  ref={(n) => { recortes.current[i] = n; }}
                  style={{
                    backgroundImage: `url(${c.recurso.img.src})`,
                    backgroundPosition: `${pt.x}% ${pt.y}%`,
                  } as CSSProperties} />
            <p className="mono">
              <b>{String(i + 1).padStart(2, '0')}</b>{pt.nombre}
              {/* El factor sale del mismo número que compone el recorte, no de
                  una escala geográfica que la lámina no declara. */}
              <span className={styles.factor}>{`${ZOOM}× del encuadre`}</span>
            </p>
          </li>
        ))}
      </ol>
    </div>
  );
}

/**
 * Sincronía mapa–perfil.
 *
 * Activar un intervalo ilumina su máscara en el mapa y su banda en el perfil a
 * la vez: son dos representaciones del mismo fenómeno y el estado es uno solo.
 */
function Perfil({ c }: { c: Extract<Capitulo, { tipo: 'perfil' }> }) {
  const [activa, setActiva] = useState<string | null>(null);
  const clase = c.clases.find((x) => x.label === activa);

  const caja = useRef<HTMLDivElement>(null);
  const mapa = useRef<HTMLDivElement>(null);
  const bandas = useRef<(HTMLLIElement | null)[]>([]);
  const iActiva = c.clases.findIndex((x) => x.label === activa);

  // Una guía fina, neutral y medida: dice que la mancha del mapa y la banda del
  // perfil son el mismo intervalo, sin competir con el color de la clase.
  const guia = useConectores(caja, () => (
    activa ? [{ de: mapa.current, a: bandas.current[iActiva], ladoDe: 'derecha' as const }] : []
  ), [activa]);

  return (
    <div className={styles.sincro} ref={caja}>
      <svg className={styles.llamadas} aria-hidden="true">
        {guia.map((l, i) => <line key={i} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} data-on="" />)}
      </svg>

      <div className={styles.mapaCaja} ref={mapa} data-aislado={clase?.mascara ? '' : undefined}>
        <Pieza r={c.mapa} tramo={7}>
          {clase?.mascara ? (
            <span className={styles.mascara} aria-hidden="true"
                  style={{ '--c': clase.color, '--m': `url(${clase.mascara})` } as CSSProperties} />
          ) : null}
        </Pieza>
      </div>

      <div className={styles.perfilCaja}>
        <Pieza r={c.perfil} tramo={5} />
        <ul className={styles.bandas} role="group" aria-label="Intervalos de pendiente">
          {c.clases.map((k, n) => (
            <li key={k.label} ref={(el) => { bandas.current[n] = el; }}
                style={{ '--c': k.color } as CSSProperties}>
              <button type="button" className="mono" aria-pressed={activa === k.label}
                      onPointerEnter={() => setActiva(k.label)}
                      onPointerLeave={() => setActiva(null)}
                      onFocus={() => setActiva(k.label)}
                      onBlur={() => setActiva(null)}
                      onClick={() => setActiva(activa === k.label ? null : k.label)}>
                <i aria-hidden="true" />
                <b>{k.label}</b>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/**
 * Matriz de criterios con su peso dibujado a escala.
 *
 * La suma se calcula desde los pesos declarados. Si los criterios verificados
 * suman 1.00, la hoja lo enseña porque es cierto, no porque esté escrito.
 */
function Criterios({ c, fuente }: { c: Extract<Capitulo, { tipo: 'criterios' }>; fuente?: string }) {
  const [activo, setActivo] = useState<string | null>(null);
  const max = Math.max(...c.criterios.map((x) => x.peso));
  const suma = c.criterios.reduce((a, x) => a + x.peso, 0);

  return (
    <div className={styles.criterios}>
      <ol className={styles.matriz}>
        {c.criterios.map((k) => (
          <li key={k.nombre} data-on={activo === k.nombre || undefined}
              style={{ '--w': `${(k.peso / max) * 100}%` } as CSSProperties}
              onPointerEnter={() => setActivo(k.nombre)}
              onPointerLeave={() => setActivo(null)}>
            <span className={styles.criterioNombre}>{k.nombre}</span>
            <span className={styles.criterioRegla} aria-hidden="true" />
            <span className={`${styles.criterioPeso} mono`}>{k.peso.toFixed(2)}</span>
          </li>
        ))}
        <li data-suma="">
          <span className={styles.criterioNombre}>Suma de pesos</span>
          <span className={styles.criterioRegla} aria-hidden="true" />
          <span className={`${styles.criterioPeso} mono`}>{suma.toFixed(2)}</span>
        </li>
      </ol>
      <div className={styles.criteriosMapa}>
        <Pieza r={c.recurso} tramo={5} />
        {fuente ? <p className={`${styles.fuenteCriterios} mono`}>{fuente}</p> : null}
      </div>
    </div>
  );
}

/**
 * Evidencia de campo: banda de contacto numerada.
 *
 * No se traza ninguna línea entre fotografía y punto del mapa: no hay
 * geolocalización que la respalde, y dibujarla afirmaría un lugar exacto.
 */
function Evidencia({ c }: { c: Extract<Capitulo, { tipo: 'evidencia' }> }) {
  return (
    <ol className={styles.evidencia}>
      {c.piezas.map((r, i) => (
        <li key={r.img.src}>
          <span className={`${styles.contactoNum} mono`} aria-hidden="true">
            {String(i + 1).padStart(2, '0')}
          </span>
          {/* La banda reparte el ancho editorial entre las piezas que trae. */}
          <Pieza r={r} tramo={Math.max(4, Math.floor(12 / c.piezas.length))} />
        </li>
      ))}
    </ol>
  );
}

/**
 * Trazado aguas abajo.
 *
 * La red se dibuja con `stroke-dashoffset` sobre la geometría del propio mapa;
 * la dirección se indica con pulsos discretos, no con partículas continuas.
 */
function Flujo({ c }: { c: Extract<Capitulo, { tipo: 'flujo' }> }) {
  const [activa, setActiva] = useState<string | null>(null);
  const [pase, setPase] = useState(0);
  const clase = c.clases.find((x) => x.label === activa);
  const caja = useRef<HTMLDivElement>(null);

  // La secuencia corre una vez al entrar en pantalla y se repite a petición. Un
  // bucle permanente convierte una lectura —hacia dónde baja— en un adorno que
  // nunca termina.
  useEffect(() => {
    const nodo = caja.current;
    if (!nodo) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setPase((n) => n + 1); obs.disconnect(); }
    }, { threshold: 0.4 });
    obs.observe(nodo);
    return () => obs.disconnect();
  }, []);

  return (
    <div className={styles.mesa} ref={caja}>
      <div className={styles.mapaCaja} data-aislado={clase?.mascara ? '' : undefined}>
        <Pieza r={c.recurso} tramo={8}>
          {clase?.mascara ? (
            <span className={styles.mascara} aria-hidden="true"
                  style={{ '--c': clase.color, '--m': `url(${clase.mascara})` } as CSSProperties} />
          ) : null}
          <svg className={styles.cauce} viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            {/* Trazo indicativo de dirección sobre el eje del valle, no una
                geometría hidrológica inventada: marca hacia dónde baja. */}
            <path key={pase} d="M52 8 C 50 30, 48 44, 50 62 S 54 84, 56 96" data-pase={pase || undefined} />
          </svg>
        </Pieza>
      </div>

      <div className={styles.leyenda}>
        <Leyenda clases={c.clases} activa={activa} onActiva={setActiva}
                 nota="El trazo marca la dirección aguas abajo sobre el eje del valle; no es la geometría del cauce." />
        <button type="button" className="btn" data-v="borde" onClick={() => setPase((n) => n + 1)}>
          repetir dirección
        </button>
        {c.detalle ? (
          <figure className={styles.apoyoDetalle}>
            <Pieza r={c.detalle} clase={styles.apoyo} tramo={4} />
            <figcaption className="mono">Detalle a mayor aumento del mismo encuadre</figcaption>
          </figure>
        ) : null}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Piezas menores                                                              */
/* -------------------------------------------------------------------------- */

function Escala() {
  return (
    <p className={`${styles.escala} mono`}>
      <i aria-hidden="true" />escala del encuadre
    </p>
  );
}

function Norte() {
  return (
    <svg className={styles.norte} viewBox="0 0 24 24" role="img" aria-label="Norte">
      <path d="M12 3v18 M12 3l-4 6 M12 3l4 6" />
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/* Salida                                                                      */
/* -------------------------------------------------------------------------- */

function Salida({
  p, vecinos, atlasHref, vistazoHref,
}: {
  p: Plano;
  vecinos: { anterior?: { id: string; corto: string; href: string };
    siguiente?: { id: string; corto: string; href: string } };
  atlasHref: string; vistazoHref: string;
}) {
  return (
    <footer id="salida" data-capitulo="" className={styles.salida}>
      <details className={styles.notas}>
        <summary className="mono">Notas y alcance</summary>
        <dl className="mono">
          <div><dt>Título oficial</dt><dd>{p.oficial}</dd></div>
          {p.fuente ? <div><dt>Fuente</dt><dd>{p.fuente}</dd></div> : null}
          {/* Sólo se lista cuando queda más de un nombre: una línea con un
              único nombre no describe una coautoría, y afirmar autoría
              exclusiva a partir de un dato que la fuente no registra sería
              inventarla. */}
          {p.creditos && p.creditos.length > 1
            ? <div><dt>Coautoría</dt><dd>{p.creditos.join(' · ')}</dd></div> : null}
          {p.descartes.length ? (
            <div>
              <dt>Recursos no usados</dt>
              <dd>{p.descartes.map((d) => `${d.slug}: ${d.motivo}`).join(' ')}</dd>
            </div>
          ) : null}
        </dl>
      </details>

      <nav className={styles.saltos} aria-label="Navegación entre proyectos">
        {vecinos.anterior ? (
          <Link className={styles.salto} href={vecinos.anterior.href}>
            <span className={`${styles.saltoDir} mono`}>anterior</span>
            <span className={`${styles.saltoNum} mono`}>
              <Glifo id={vecinos.anterior.id} tam={16} />{`P${vecinos.anterior.id}`}
            </span>
            <span className={styles.saltoCorto}>{vecinos.anterior.corto}</span>
          </Link>
        ) : <span />}

        <div className={styles.centro}>
          <Link className="btn" data-v="borde" href={atlasHref}>Atlas</Link>
          <Link className="btn" data-v="borde" href={vistazoHref}
                aria-label="Vistazo · abrir índice de proyectos">Vistazo</Link>
        </div>

        {vecinos.siguiente ? (
          <Link className={styles.salto} href={vecinos.siguiente.href} data-dir="adelante">
            <span className={`${styles.saltoDir} mono`}>siguiente</span>
            <span className={`${styles.saltoNum} mono`}>
              <Glifo id={vecinos.siguiente.id} tam={16} />{`P${vecinos.siguiente.id}`}
            </span>
            <span className={styles.saltoCorto}>{vecinos.siguiente.corto}</span>
          </Link>
        ) : <span />}
      </nav>
    </footer>
  );
}
