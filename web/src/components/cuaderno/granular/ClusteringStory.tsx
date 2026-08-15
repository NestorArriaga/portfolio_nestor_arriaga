'use client';

import { CSSProperties, useEffect, useState } from 'react';

import { granularVisuals } from '@/content/granularVisuals';
import {
  clusteringClasificados, clusteringGrupos, clusteringMetodo, comarcaMunicipios,
} from '@/content/granularClustering';
import { FiguraEditorial } from './FiguraEditorial';
import { GraficaTamanos } from './GraficaTamanos';
import { VisorDetalle } from './VisorDetalle';
import styles from './Granular.module.css';
import propio from './Clustering.module.css';

/**
 * Clustering — la secuencia completa del pilar VII.
 *
 * La página anterior apilaba las cuatro láminas a ancho completo con seis
 * remos de aire entre ellas: el mapa de observaciones, que es un vertical de
 * 2480 × 3507, ocupaba él solo unos 5300 px y dejaba el capítulo convertido en
 * una tira sin lectura. Aquí cada lámina entra en el acto que le corresponde y
 * en la escala que su proporción admite:
 *
 *   I   LOCALIZAR   — el vertical acotado, con su relación territorial al lado
 *   II  CLASIFICAR  — el mapa municipal y su leyenda operativa
 *   III MEDIR       — el tamaño de los grupos, dibujado, no fotografiado
 *   IV  RELACIONAR  — el diagrama de pertenencias, ampliable
 *   V   SINTETIZAR  — las tres configuraciones y su alcance
 *
 * El índice local es una lista compacta que sólo se pega arriba cuando hay
 * altura para ello.
 */

/** Fuente del visor: el mayor derivado, que es lo que se va a ampliar. */
function detalle(v: { asset: { src: string; printSrc?: string } }): string {
  return v.asset.printSrc ?? v.asset.src;
}

const ACTOS = [
  { id: 'localizar', num: 'I', nombre: 'Localizar' },
  { id: 'clasificar', num: 'II', nombre: 'Clasificar' },
  { id: 'medir', num: 'III', nombre: 'Medir' },
  { id: 'relacionar', num: 'IV', nombre: 'Relacionar' },
  { id: 'sintetizar', num: 'V', nombre: 'Sintetizar' },
];

export function ClusteringStory() {
  const [visor, setVisor] = useState<{ src: string; alt: string; titulo: string } | null>(null);
  const [activo, setActivo] = useState('localizar');
  const [grupo, setGrupo] = useState<string | null>(null);

  // Acto en pantalla: un solo observador para todo el capítulo.
  //
  // El observador despierta la lectura, pero quien decide es la posición: con
  // una banda estrecha en el centro había alturas —la apertura, por ejemplo—
  // donde ningún acto la tocaba y el índice se quedaba marcando el último que
  // hubiera pasado, que al cargar la página era el quinto.
  useEffect(() => {
    const nodos = ACTOS
      .map((a) => document.getElementById(a.id))
      .filter((n): n is HTMLElement => Boolean(n));
    if (!nodos.length) return undefined;

    const revisar = () => {
      const medio = window.innerHeight / 2;
      let elegido = nodos[0];
      for (const n of nodos) {
        if (n.getBoundingClientRect().top <= medio) elegido = n;
      }
      setActivo(elegido.id);
    };

    const io = new IntersectionObserver(revisar, {
      threshold: [0, 0.25, 0.5, 0.75, 1],
    });
    nodos.forEach((n) => io.observe(n));
    revisar();
    return () => io.disconnect();
  }, []);

  const loc = granularVisuals.clusteringLoc;
  const clas = granularVisuals.clusteringCoropletico;
  const tam = granularVisuals.clusteringSize;
  const rel = granularVisuals.clusteringRelaciones;

  return (
    <div className={`${styles.ambito} ${propio.capitulo}`}>
      {/* Índice local: compacto, con el acto actual marcado. */}
      <nav className={propio.indice} aria-label="Actos del clustering">
        <ol>
          {ACTOS.map((a) => (
            <li key={a.id}>
              <a href={`#${a.id}`}
                 aria-current={activo === a.id ? 'true' : undefined}
                 data-on={activo === a.id || undefined}>
                <span className={`${propio.indiceNum} mono`}>{a.num}</span>
                <span className={propio.indiceNombre}>{a.nombre}</span>
              </a>
            </li>
          ))}
        </ol>
      </nav>

      {/* --- I · LOCALIZAR ---------------------------------------------------- */}
      <section id="localizar" className={styles.acto}>
        <h2 className={`${styles.actoTitulo} mono`}>
          <span className={styles.actoNum}>I</span>Localizar
          <span className={styles.actoNota}>observaciones sobre el relieve</span>
        </h2>

        <div className={propio.vertical}>
          {/* El vertical se acota por altura: a ancho completo su proporción de
              2480 × 3507 produce sola una sección de cinco viewports. */}
          <FiguraEditorial visual={loc} fondo="tinta" obra={(
            <div className={propio.verticalCaja}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={loc.asset.src} srcSet={loc.asset.srcSet}
                 sizes="(max-width: 1000px) 92vw, 38vw" alt={loc.alt}
                   width={Math.round(loc.asset.width)} height={Math.round(loc.asset.height)}
                   loading="lazy" decoding="async" />
            </div>
          )}>
            <div className={styles.controles}>
              <button type="button" className="btn" data-v="borde" data-touch
                      onClick={() => setVisor({ src: detalle(loc), alt: loc.alt, titulo: loc.title })}>
                Abrir detalle
              </button>
            </div>
          </FiguraEditorial>

          <aside className={propio.relacion}>
            <p className={`${propio.relacionRotulo} mono`}>Relación territorial</p>
            <p className={propio.relacionCifra}>
              <b>{comarcaMunicipios}</b>
              <span className="mono">municipios de la Comarca</span>
            </p>
            <p className={propio.relacionCifra}>
              <b>{clusteringClasificados}</b>
              <span className="mono">clasificados en el modelo</span>
            </p>
            <p className={`${propio.relacionNota} mono`}>
              La distribución cubre el conjunto de la Comarca; la clasificación
              posterior trabaja sobre {clusteringClasificados} de esos {comarcaMunicipios}.
            </p>
          </aside>
        </div>
      </section>

      {/* --- II · CLASIFICAR -------------------------------------------------- */}
      <section id="clasificar" className={styles.acto}>
        <h2 className={`${styles.actoTitulo} mono`}>
          <span className={styles.actoNum}>II</span>Clasificar
          <span className={styles.actoNota}>{`${clusteringGrupos.length} grupos · K = 3`}</span>
        </h2>

        <div className={propio.mesa}>
          <FiguraEditorial visual={clas} obra={(
            /* eslint-disable-next-line @next/next/no-img-element */
            <img src={clas.asset.src} srcSet={clas.asset.srcSet}
                 sizes="(max-width: 1000px) 92vw, 62vw" alt={clas.alt}
                 width={Math.round(clas.asset.width)} height={Math.round(clas.asset.height)}
                 loading="lazy" decoding="async" />
          )}>
            <div className={styles.controles}>
              <button type="button" className="btn" data-v="borde" data-touch
                      onClick={() => setVisor({ src: detalle(clas), alt: clas.alt, titulo: clas.title })}>
                Abrir detalle
              </button>
            </div>
          </FiguraEditorial>

          {/* Leyenda operativa: señalar un grupo lo destaca y muestra su lectura. */}
          <div className={propio.leyenda}>
            <p className={`${propio.leyendaTitulo} mono`}>Grupos de la clasificación</p>

            {/* Leyenda operativa: la clave, el nombre con que la fuente lo
                describe y su conteo. Señalar una fila la aísla en la lectura. */}
            <ul className={propio.grupos}>
              {clusteringGrupos.map((g) => (
                <li key={g.clave}>
                  <button type="button" className={propio.grupo}
                          style={{ '--c': g.color } as CSSProperties}
                          aria-pressed={grupo === g.clave}
                          onPointerEnter={() => setGrupo(g.clave)}
                          onPointerLeave={() => setGrupo(null)}
                          onFocus={() => setGrupo(g.clave)}
                          onBlur={() => setGrupo(null)}
                          onClick={() => setGrupo(grupo === g.clave ? null : g.clave)}>
                    <i aria-hidden="true" />
                    <span className={`${propio.grupoClave} mono`}>{g.clave}</span>
                    <span className={propio.grupoNombre}>{g.nombre}</span>
                    <span className={`${propio.grupoNum} mono`}>{g.municipios}</span>
                  </button>
                </li>
              ))}
            </ul>

            <p className={propio.leyendaLectura} aria-live="polite">
              {grupo
                ? clusteringGrupos.find((g) => g.clave === grupo)?.lectura
                : 'Señala un grupo para leer cómo lo describe la fuente.'}
            </p>

            <p className={`${propio.cautela} mono`}>
              {`${clusteringClasificados} de ${comarcaMunicipios} municipios quedan clasificados.`
                + ' El modelo original no documenta el motivo de la exclusión restante.'}
            </p>
          </div>
        </div>
      </section>

      {/* --- III · MEDIR ------------------------------------------------------ */}
      <section id="medir" className={styles.acto}>
        <h2 className={`${styles.actoTitulo} mono`}>
          <span className={styles.actoNum}>III</span>Medir
          <span className={styles.actoNota}>{tam.unit}</span>
        </h2>

        <GraficaTamanos />

        <p className={`${styles.alcance} mono`}>
          <b>Alcance. </b>{tam.caption}
        </p>
        <dl className={`${styles.pieDatos} mono`}>
          <div><dt>Ámbito</dt><dd>{tam.scope}</dd></div>
          <div><dt>Procedencia</dt><dd>{tam.source}</dd></div>
        </dl>
      </section>

      {/* --- IV · RELACIONAR -------------------------------------------------- */}
      <section id="relacionar" className={styles.acto}>
        <h2 className={`${styles.actoTitulo} mono`}>
          <span className={styles.actoNum}>IV</span>Relacionar
          <span className={styles.actoNota}>pertenencia de cada municipio</span>
        </h2>

        <div className={propio.mesa}>
          <FiguraEditorial visual={rel} obra={(
            /* eslint-disable-next-line @next/next/no-img-element */
            <img src={rel.asset.src} srcSet={rel.asset.srcSet}
                 sizes="(max-width: 1000px) 92vw, 62vw" alt={rel.alt}
                 width={Math.round(rel.asset.width)} height={Math.round(rel.asset.height)}
                 loading="lazy" decoding="async" />
          )}>
            <div className={styles.controles}>
              <button type="button" className="btn" data-v="borde" data-touch
                      onClick={() => setVisor({ src: detalle(rel), alt: rel.alt, titulo: rel.title })}>
                Abrir detalle
              </button>
            </div>
          </FiguraEditorial>

          <div className={propio.leyenda}>
            <p className={`${propio.leyendaTitulo} mono`}>Cómo se lee</p>
            <p className={propio.leyendaLectura}>
              Cada arco une un municipio con el grupo al que el modelo lo asigna.
              El grosor corresponde al número de asignaciones, no a un flujo entre
              territorios.
            </p>
            <p className={`${propio.cautela} mono`}>
              La composición original no documenta el significado, el peso, la
              dirección ni el método de construcción de esos enlaces.
            </p>
          </div>
        </div>
      </section>

      {/* --- V · SINTETIZAR --------------------------------------------------- */}
      <section id="sintetizar" className={styles.acto}>
        <h2 className={`${styles.actoTitulo} mono`}>
          <span className={styles.actoNum}>V</span>Sintetizar
          <span className={styles.actoNota}>tres configuraciones de un mismo territorio</span>
        </h2>

        <ol className={propio.sintesis}>
          {clusteringGrupos.map((g) => (
            <li key={g.clave} style={{ '--c': g.color } as CSSProperties}>
              <p className={`${propio.sintesisClave} mono`}>{g.clave}</p>
              <p className={propio.sintesisNombre}>{g.nombre}</p>
              <p className={propio.sintesisLectura}>{g.lectura}</p>
            </li>
          ))}
        </ol>

        <p className={`${propio.metodo} mono`}>
          <span>Método declarado</span>{clusteringMetodo.join(' · ')}
        </p>
      </section>

      <VisorDetalle
        abierto={Boolean(visor)}
        onCerrar={() => setVisor(null)}
        src={visor?.src ?? ''}
        alt={visor ? `Detalle ampliado. ${visor.alt}` : ''}
        titulo={visor?.titulo ?? ''}
      />
    </div>
  );
}
