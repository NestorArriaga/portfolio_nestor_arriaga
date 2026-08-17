import type { Cv, Entrada, Par, Puesto } from '@/content/cv';

import styles from './Cv.module.css';

/**
 * Currículum impreso · dos hojas A4 verticales.
 *
 * Comparte la retícula del portafolio: una columna estrecha de rótulos a la
 * izquierda y el campo de contenido a la derecha, papel marfil, Geist Sans para
 * el texto y Geist Mono para fechas y datos técnicos. No es un documento
 * distinto del portafolio: es el mismo trabajo en formato de expediente.
 *
 * El reparto en dos hojas es el del original —trayectoria y formación en la
 * primera, proyectos y capacidades en la segunda— para que quien tenga las dos
 * versiones encuentre lo mismo en el mismo sitio.
 */
export function CvImpreso({ cv }: { cv: Cv }) {
  return (
    <>
      <Hoja cv={cv} folio={1}>
        <Cabecera cv={cv} />

        <Bloque rotulo={cv.secciones.areas}>
          <p className={styles.areas}>{cv.areas}</p>
        </Bloque>

        <Bloque rotulo={cv.secciones.perfil}>
          <p className={styles.parrafo}>{cv.perfil}</p>
        </Bloque>

        <Bloque rotulo={cv.secciones.valor}>
          <Rejilla pares={cv.valor} />
        </Bloque>

        <Bloque rotulo={cv.secciones.experiencia}>
          <ol className={styles.puestos}>
            {cv.experiencia.map((p) => <Puesto_ key={p.cargo} p={p} />)}
          </ol>
        </Bloque>

        <Bloque rotulo={cv.secciones.formacion}>
          <ol className={styles.puestos}>
            {cv.formacion.map((p) => <Puesto_ key={p.cargo} p={p} />)}
          </ol>
        </Bloque>
      </Hoja>

      <Hoja cv={cv} folio={2}>
        <Bloque rotulo={cv.secciones.proyectos}>
          <ol className={styles.entradas}>
            {cv.proyectos.map((e) => <Entrada_ key={e.texto} e={e} />)}
          </ol>
        </Bloque>

        <Bloque rotulo={cv.secciones.competencias}>
          <Rejilla pares={cv.competencias} />
        </Bloque>

        <Bloque rotulo={cv.secciones.herramientas}>
          <ul className={styles.herramientas}>
            {cv.herramientas.map((h) => <li key={h}>{h}</li>)}
          </ul>
        </Bloque>

        <Bloque rotulo={cv.secciones.idiomas}>
          <p className={styles.parrafo}>{cv.idiomas}</p>
        </Bloque>

        <Bloque rotulo={cv.secciones.cursos}>
          <ul className={styles.cursos}>
            {cv.cursos.map((c) => <li key={c} className="mono">{c}</li>)}
          </ul>
        </Bloque>

        <Bloque rotulo={cv.secciones.comunicacion}>
          <ol className={styles.entradas}>
            {cv.comunicacion.map((e) => <Entrada_ key={e.texto} e={e} />)}
          </ol>
        </Bloque>
      </Hoja>
    </>
  );
}

/* -------------------------------------------------------------------------- */

function Hoja({ cv, folio, children }: { cv: Cv; folio: number; children: React.ReactNode }) {
  return (
    <section className={styles.hoja} data-hoja="">
      <div className={styles.cuerpo}>{children}</div>
      <p className={`${styles.pie} mono`}>
        {cv.pie.replace('{n}', String(folio)).replace('{total}', '2')}
      </p>
    </section>
  );
}

/**
 * La cabecera lleva el nombre a tamaño de portada y el contacto en una banda
 * monoespaciada: los datos con los que alguien va a escribir o llamar se leen
 * como datos, no como prosa.
 */
function Cabecera({ cv }: { cv: Cv }) {
  return (
    <header className={styles.cabecera}>
      <p className={`${styles.tipo} mono`}>{cv.titulo}</p>
      <h1 className={styles.nombre}>{cv.nombre}</h1>
      <p className={styles.oficio}>{cv.oficio}</p>
      <ul className={`${styles.contacto} mono`}>
        {cv.contacto.map((c) => <li key={c}>{c}</li>)}
      </ul>
    </header>
  );
}

/** Rótulo a la izquierda, contenido a la derecha. La retícula del atlas. */
function Bloque({ rotulo, children }: { rotulo: string; children: React.ReactNode }) {
  return (
    <section className={styles.bloque}>
      <h2 className={`${styles.rotulo} mono`}>{rotulo}</h2>
      <div className={styles.campo}>{children}</div>
    </section>
  );
}

function Rejilla({ pares }: { pares: Par[] }) {
  return (
    <dl className={styles.rejilla}>
      {pares.map((p) => (
        <div key={p.titulo}>
          <dt>{p.titulo}</dt>
          <dd>{p.cuerpo}</dd>
        </div>
      ))}
    </dl>
  );
}

function Puesto_({ p }: { p: Puesto }) {
  return (
    <li>
      <p className={`${styles.fecha} mono`}>{p.fecha}</p>
      <div>
        <h3 className={styles.cargo}>{p.cargo}</h3>
        <p className={`${styles.donde} mono`}>{p.donde}</p>
        <ul className={styles.puntos}>
          {p.puntos.map((t) => <li key={t}>{t}</li>)}
        </ul>
      </div>
    </li>
  );
}

function Entrada_({ e }: { e: Entrada }) {
  return (
    <li>
      <p className={`${styles.fecha} mono`}>{e.fecha}</p>
      <p className={styles.parrafo}>{e.texto}</p>
    </li>
  );
}
