import { CSSProperties } from 'react';

import { Glifo } from '@/components/cuaderno/Glifo';
import type { Lamina } from '@/components/experience-v5/registry';
import type { HojaImpresa, HojaSistema } from './hojas';
import type { Imagen } from '@/components/sistemas/registro';
import styles from './Impreso.module.css';

/**
 * Portafolio impreso — A4 horizontal, 297 × 210 mm.
 *
 * Horizontal porque conserva la relación espacial de los mapas del sitio: en
 * vertical, una lámina apaisada se queda en una franja y pierde el detalle que
 * justifica el proyecto.
 *
 * Es la misma dirección visual del atlas —portada negra, papel marfil, tinta,
 * amarillo de señal y los quince glifos—, no una plantilla editorial aparte.
 * El texto es mínimo: mandan las imágenes, las leyendas y las cifras.
 *
 * La numeración distingue dos cosas que se confunden con facilidad: `PXX` es el
 * código del proyecto y el folio es la página del documento. GRANULAR numera
 * sus pilares como `P14.I`–`P14.VII`.
 */

export type PaginaProyecto = {
  id: string;
  corto: string;
  oficial: string;
  lugar: string;
  escala: string;
  anio?: string;
  lamina: Lamina | null;
  apoyos: { img: Lamina; papel: string }[];
  datos: { label: string; value: string }[];
  clave: { label: string; color: string }[];
  fuente?: string;
  creditos?: string[];
  origen?: string;
};

type Pilar = {
  numero: string;
  nombre: string;
  variables: string[];
  laminas: {
    titulo: string; pagina: number; img: Lamina | null;
    categorias: { name: string; range?: string }[];
    municipios: string[]; fuente?: string;
  }[];
  datos: { label: string; value: string }[];
  alcance: { title: string; text: string; points: string[] };
};

type Dibujo = { id: string; titulo: string; viewBox: string; capas: { nombre: string; color: string; body: string }[] };

export function Impreso({
  identidad, hojas: hojasProyecto, sistemas, proyectos, granular, parque, correo,
}: {
  identidad: { nombre: string; linea: string };
  /** Hojas traducidas desde los planos. Sustituyen a la composición anterior,
      que salía de `support[]` y repetía la misma lámina dos páginas seguidas. */
  hojas: HojaImpresa[];
  /** Capítulo SISTEMAS: capacidad digital, con su estado declarado por hoja. */
  sistemas: HojaSistema[];
  proyectos: PaginaProyecto[];
  granular: { titulo: string; territorio: string; region: string; pilares: Pilar[] };
  parque: {
    titulo: string; marco: string; lugar: string;
    planta: Dibujo | null; variaciones: Dibujo[]; detalle: Dibujo | null;
    piezas: { label: string; caja: [number, number, number, number] }[];
    proceso: { titulo: string; img: { src: string; srcSet: string; width: number; height: number } }[];
  };
  correo: string;
}) {
  /**
   * El documento se describe primero como datos y se renderiza después.
   *
   * El índice necesita el folio real de inicio de cada proyecto y cada pie
   * necesita el total, y ninguno se conoce hasta haber recorrido el documento
   * entero. Con una lista de descriptores se cuenta una sola vez, sin construir
   * dos veces el árbol de React, y tanto el índice como el total se actualizan
   * solos al añadir material.
   *
   * Las tres primeras hojas —portada, perfil e índice— van fuera de la lista
   * porque no pertenecen a ningún proyecto.
   */
  /**
   * Hojas previas al cuerpo: portada, perfil, trayectoria e índice.
   *
   * El folio de cada proyecto se calcula desde aquí, así que basta cambiar este
   * número para que el índice entero se recoloque. Escribir un folio a mano es
   * exactamente lo que hace que un índice envejezca mal.
   */
  const PREVIAS = 4;

  type Hoja =
    | { tipo: 'hoja'; h: HojaImpresa }
    | { tipo: 'granular' }
    | { tipo: 'granularCustom'; pilarId: string; vista: string; titulo: string; numero: string }
    | { tipo: 'pilar'; pilar: Pilar }
    | { tipo: 'parque' }
    | { tipo: 'parqueVar' }
    | { tipo: 'parqueDet' }
    | { tipo: 'sistemasApertura' }
    | { tipo: 'sistema'; s: HojaSistema }
    | { tipo: 'creditos' }
    | { tipo: 'contacto' };

  const hojas: Hoja[] = hojasProyecto.map((h) => ({ tipo: 'hoja' as const, h }));
  hojas.push({ tipo: 'granular' });
  granular.pilares.forEach((pilar) => {
    if (pilar.numero === 'I') {
      hojas.push({ tipo: 'granularCustom', pilarId: 'agua', vista: 'radar', titulo: 'Tensiones y políticas hídricas', numero: pilar.numero });
      hojas.push({ tipo: 'pilar', pilar }); // Include the rest of the pillar (calidad, acuiferos)
    } else if (pilar.numero === 'II') {
      hojas.push({ tipo: 'granularCustom', pilarId: 'agropecuario', vista: 'paisaje', titulo: 'Dos paisajes productivos', numero: pilar.numero });
      hojas.push({ tipo: 'granularCustom', pilarId: 'agropecuario', vista: 'flujos', titulo: 'Estructura agrícola · Flujos', numero: pilar.numero });
      hojas.push({ tipo: 'pilar', pilar }); // Include the rest of the pillar
    } else if (pilar.numero === 'VII') {
      hojas.push({ tipo: 'granularCustom', pilarId: 'clustering', vista: 'loc-clas', titulo: 'Localización y clasificación', numero: pilar.numero });
      hojas.push({ tipo: 'granularCustom', pilarId: 'clustering', vista: 'tamano', titulo: 'Tamaño de los grupos', numero: pilar.numero });
      hojas.push({ tipo: 'pilar', pilar }); // Also include the standard plates of clustering if any
    } else {
      hojas.push({ tipo: 'pilar', pilar });
    }
  });
  hojas.push({ tipo: 'parque' });
  if (parque.variaciones.length) hojas.push({ tipo: 'parqueVar' });
  if (parque.detalle) hojas.push({ tipo: 'parqueDet' });
  if (sistemas.length) {
    hojas.push({ tipo: 'sistemasApertura' });
    sistemas.forEach((s) => hojas.push({ tipo: 'sistema', s }));
  }
  hojas.push({ tipo: 'creditos' }, { tipo: 'contacto' });

  const total = hojas.length + PREVIAS;

  // Folio de inicio de cada proyecto, para el índice.
  const folios: { codigo: string; titulo: string; folio: number }[] = [];
  hojas.forEach((h, i) => {
    const folio = i + 1 + PREVIAS;
    if (h.tipo === 'hoja' && h.h.clase === 'apertura-mapa') {
      folios.push({ codigo: `P${h.h.proyecto}`, titulo: h.h.titulo, folio });
    }
    if (h.tipo === 'granular') folios.push({ codigo: 'P14', titulo: granular.titulo, folio });
    if (h.tipo === 'pilar') folios.push({ codigo: `P14.${h.pilar.numero}`, titulo: h.pilar.nombre, folio });
    if (h.tipo === 'parque') folios.push({ codigo: 'P15', titulo: parque.titulo, folio });
    if (h.tipo === 'sistemasApertura') folios.push({ codigo: 'S01–S04', titulo: 'Sistemas', folio });
    // Sólo la primera hoja de cada código entra al índice: S01 ocupa
    // dos y no debe aparecer dos veces con el mismo código.
    if (h.tipo === 'sistema' && !folios.some((f) => f.codigo === h.s.codigo)) {
      folios.push({ codigo: h.s.codigo, titulo: h.s.nombre, folio });
    }
  });

  const cuerpoFinal = hojas.map((h, i) => {
    const folio = i + 1 + PREVIAS;
    switch (h.tipo) {
      case 'hoja': return <HojaProyecto key={`${h.h.proyecto}${h.h.clase}${i}`} h={h.h} folio={folio} total={total} />;
      case 'granular': return <PaginaGranular key="g0" granular={granular} folio={folio} total={total} />;
      case 'granularCustom': return <GranularCustomImpresa key={`gc${i}`} pilarId={h.pilarId} vista={h.vista} titulo={h.titulo} numero={h.numero} folio={folio} total={total} />;
      case 'pilar': return <PilarImpreso key={`g${h.pilar.numero}`} pilar={h.pilar} folio={folio} total={total} />;
      case 'parque': return <ParqueApertura key="pk0" parque={parque} folio={folio} total={total} />;
      case 'parqueVar': return <ParqueVariaciones key="pk1" parque={parque} folio={folio} total={total} />;
      case 'parqueDet': return <ParqueDetalle key="pk2" parque={parque} folio={folio} total={total} />;
      case 'sistemasApertura': return <SistemasApertura key="sis" hojas={sistemas} folio={folio} total={total} />;
      case 'sistema': return <HojaSistemaImpresa key={`s${i}`} s={h.s} folio={folio} total={total} />;
      case 'creditos': return <Creditos key="cred" proyectos={proyectos} granular={granular} sistemas={sistemas} folio={folio} total={total} />;
      default: return <Contacto key="cont" identidad={identidad} correo={correo} folio={folio} total={total} />;
    }
  });

  return (
    <div className={styles.doc}>
      {/* 1 · Portada */}
      <section className={styles.hoja} data-sup="tinta" data-portada="">
        <p className={`${styles.marca} mono`}>Portafolio 2026</p>
        <h1 className={styles.nombre}>{identidad.nombre}</h1>
        <p className={`${styles.linea} mono`}>{identidad.linea}</p>
        <p className={`${styles.territorios} mono`}>
          Ciudad de México · Cuenca de Decozalapa · Reserva de Metztitlán ·
          Aguascalientes y Calvillo · Comarca Lagunera · Mérida
        </p>
      </section>

      {/* 2 · Perfil y campo de trabajo */}
      <Perfil identidad={identidad} total={total} />

      {/* 3 · Trayectoria y capacidades */}
      <Trayectoria total={total} />

      {/* 4 · Índice */}
      <section className={styles.hoja} data-sup="papel">
        <h2 className={styles.titulo2}>Índice</h2>
        {/* Dos columnas exactas: las filas salen del número real de entradas,
            así que añadir un capítulo no deja una tercera columna con una sola
            línea. */}
        <ol className={`${styles.indice} mono`}
            style={{ '--filas': String(Math.ceil(folios.length / 2)) } as CSSProperties}>
          {folios.map((f) => (
            <li key={f.codigo}>
              {/* El glifo existe para P01–P15; los códigos S no lo tienen y la
                  columna se alinea por el propio código. */}
              <span className={styles.indiceCod}>
                <Glifo id={f.codigo.replace('P', '').split('.')[0]} tam={14} />{f.codigo}
              </span>
              <span className={styles.indiceTit}>{f.titulo}</span>
              <span className={styles.indiceFolio}>{f.folio}</span>
            </li>
          ))}
        </ol>
        <p className={`${styles.folio} mono`}>4 / {total}</p>
      </section>

      {cuerpoFinal}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Apertura editorial                                                          */
/* -------------------------------------------------------------------------- */

/**
 * Hoja 2 · Perfil y campo de trabajo.
 *
 * Una apertura, no una hoja de vida. El párrafo dice qué hace esta persona con
 * la información territorial; las fichas dan el marco verificable —formación,
 * fechas, lugar, idioma, contacto— y nada más. Sin nacionalidad, sin puesto
 * solicitado, sin texto dirigido a una vacante.
 *
 * El retrato del CV existe a 194 × 270 px. Para ocupar el quinto de hoja que
 * pediría esta composición habría que llevarlo a unos 45 dpi, y ampliar una
 * fotografía por encima de su resolución es justo lo que el resto del documento
 * no hace con ningún mapa. En su lugar manda el lenguaje del atlas: los glifos
 * territoriales, que además son material propio.
 */
function Perfil({ identidad, total }: { identidad: Parametros['identidad']; total: number }) {
  const fichas: [string, string][] = [
    ['Formación', 'Ingeniería en Recursos Naturales Renovables'],
    ['Universidad', 'Universidad Autónoma Chapingo · 2021–2026'],
    ['Situación', 'Egreso: junio de 2026 · titulación en trámite'],
    ['Base', 'Aguascalientes / Texcoco, México'],
    ['Idioma', 'Inglés B2 · First Certificate in English'],
    ['Contacto', 'nestorarriaga.irnr@gmail.com'],
  ];

  return (
    <section className={styles.hoja} data-sup="papel" data-clase="perfil">
      <p className={`${styles.marca} mono`}>Perfil · campo de trabajo</p>

      <div className={styles.perfilMarco}>
        <div className={styles.perfilTexto}>
          <h2 className={styles.perfilNombre}>{identidad.nombre}</h2>
          <p className={styles.perfilLinea}>
            Ingeniero en Recursos Naturales Renovables con experiencia en investigación
            internacional, gestión ambiental, planeación territorial y proyectos de cuenca.
            Integro información ambiental, productiva, social e institucional para convertir
            evidencia compleja en cartografía, indicadores, reportes y herramientas de decisión.
          </p>
        </div>

        <div className={styles.perfilLateral}>
          <dl className={`${styles.perfilFichas} mono`}>
            {fichas.map(([k, v]) => (
              <div key={k}><dt>{k}</dt><dd>{v}</dd></div>
            ))}
          </dl>

        </div>

        {/* Los seis territorios del atlas, con su glifo. Es la misma clave que
            abre cada proyecto: la identidad se enseña con el trabajo. */}
        <ul className={`${styles.perfilGlifos} mono`} aria-label="Territorios del atlas">
          {[['01', 'Ciudad de México'], ['02', 'Cuenca de Decozalapa'],
            ['05', 'Reserva de Metztitlán'], ['09', 'Aguascalientes y Calvillo'],
            ['14', 'Comarca Lagunera'], ['15', 'Mérida']].map(([id, nombre]) => (
              <li key={id}><Glifo id={id} tam={17} />{nombre}</li>
            ))}
        </ul>
      </div>

      <Pie folio={2} total={total} />
    </section>
  );
}

/**
 * Hoja 3 · Trayectoria y capacidades.
 *
 * Cuatro hitos en una línea y cuatro grupos de capacidad. Sin barras de
 * porcentaje: un «85 % de QGIS» no es una medición de nada. Las tres cifras van
 * atadas al proyecto que las produjo y se rotulan como escala de trabajo, no
 * como impacto.
 */
function Trayectoria({ total }: { total: number }) {
  const hitos: [string, string, string][] = [
    ['2025', 'CIHEAM-IAMM / GRANULAR', 'Investigación territorial, diversidad rural y presión hídrica.'],
    ['2025', 'Grupo INDERS / Agropark', 'Instrumentos de gestión ambiental y trazabilidad documental.'],
    ['2025', 'C+Lab / Tecnológico de Monterrey', 'Restauración socioambiental y gobernanza territorial.'],
    ['2024–2025', 'Universidad Autónoma Chapingo / SEMARNAT', 'Ordenamiento ecológico comunitario.'],
  ];

  const capacidades: [string, string][] = [
    ['Territorio', 'cuencas · agua · restauración · biodiversidad · ordenamiento'],
    ['Datos', 'QGIS · Google Earth Engine · Python · R'],
    ['Comunicación', 'cartografía · indicadores · reportes · presentaciones'],
    ['Diseño', 'Illustrator · InDesign · Photoshop'],
  ];

  const escalas: [string, string][] = [
    ['106 263 ha', 'Sistema de monitoreo territorial'],
    ['21 210 ha', 'Diagnóstico de cuenca'],
    ['1.14 ha', 'Parque Hundido Sambulá'],
  ];

  return (
    <section className={styles.hoja} data-sup="tinta" data-clase="trayectoria">
      <p className={`${styles.marca} mono`}>Trayectoria · capacidades</p>

      <div className={styles.trayMarco}>
        <ol className={styles.hitos}>
          {hitos.map(([anio, donde, que]) => (
            <li key={donde}>
              <span className={`${styles.hitoAnio} mono`}>{anio}</span>
              <span className={styles.hitoDonde}>{donde}</span>
              <span className={`${styles.hitoQue} mono`}>{que}</span>
            </li>
          ))}
        </ol>

        <div className={styles.trayLateral}>
          <dl className={styles.capacidades}>
            {capacidades.map(([grupo, lista]) => (
              <div key={grupo}>
                <dt>{grupo}</dt>
                <dd className="mono">{lista}</dd>
              </div>
            ))}
          </dl>

          {/* Escala de trabajo, no resultado: cada cifra nombra el proyecto en
              el que se midió. */}
          <div className={styles.escalas}>
            <p className={`${styles.escalasRotulo} mono`}>escala de trabajo</p>
            <dl className={`${styles.escalasLista} mono`}>
              {escalas.map(([cifra, donde]) => (
                <div key={cifra}><dt>{cifra}</dt><dd>{donde}</dd></div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      <Pie folio={3} total={total} />
    </section>
  );
}

/* -------------------------------------------------------------------------- */

function Pie({ folio, total, codigo }: { folio: number; total: number; codigo?: string }) {
  return (
    <p className={`${styles.folio} mono`}>
      {codigo ? <span className={styles.folioCod}>{codigo}</span> : null}
      {`${folio} / ${total}`}
    </p>
  );
}

/**
 * Una hoja de proyecto.
 *
 * La clase decide la composición. Ninguna reutiliza el DOM interactivo: un
 * comparador se imprime como díptico calibrado, unos nodos animados como mapa
 * numerado con su contador, y unas máscaras como mapa completo con su leyenda
 * al lado. Los controles de la web —botones, foco, índice pegajoso, «Ir al
 * contenido»— no existen aquí.
 */
function HojaProyecto({ h, folio, total }: { h: HojaImpresa; folio: number; total: number }) {
  const codigo = `P${h.proyecto}`;

  return (
    <section className={styles.hoja} data-sup={h.superficie} data-clase={h.clase}>
      <p className={`${styles.codigoChico} mono`}>
        <span className={styles.folioCod}>{codigo}</span>{h.titulo}
      </p>

      {h.clase === 'comparacion' ? <Diptico h={h} /> : null}
      {h.clase === 'evidencia' ? <Contacto2 h={h} /> : null}
      {h.clase === 'metricas' ? <Cifras h={h} /> : null}
      {h.clase === 'atlas-detalle' ? <AtlasDetalle h={h} /> : null}
      {h.clase === 'perfil' ? <PerfilImpreso h={h} /> : null}
      {h.clase === 'criterios' ? <Matriz h={h} /> : null}
      {(h.clase === 'apertura-mapa' || h.clase === 'flujo') ? <MapaHoja h={h} /> : null}

      <Pie folio={folio} total={total} codigo={codigo} />
    </section>
  );
}

/** Mapa dominante con su leyenda, sus cifras y —si los hay— sus nodos. */
function MapaHoja({ h }: { h: HojaImpresa }) {
  const r = h.recursos[0];
  // Sin leyenda, cifras, nodos ni matriz, la columna de instrumentos sólo
  // llevaría la fuente: entonces el mapa toma la hoja entera y la fuente baja
  // al pie, que es donde se lee en una lámina.
  const instrumentos = !!(h.clases?.length || h.metricas?.length || h.nodos?.length || h.criterios?.length);

  return (
    <div className={styles.lecturaMarco} data-solo={instrumentos ? undefined : ''}>
      {r ? (
        <figure className={styles.mapaFig}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className={styles.mapa} src={r.img.src} srcSet={r.img.srcSet} sizes="186mm"
               width={r.img.width} height={r.img.height} alt={r.pie} />
          {/* El `viewBox` toma las dimensiones nativas de la lámina y el `<svg>`
              cubre la misma caja que el `<img>`: al encajar ambos por «meet»,
              los nodos caen sobre el dato y no junto a él, que en cartografía es
              sencillamente estar mal. */}
          {h.nodos?.length ? (
            <svg className={styles.nodosImp} viewBox={`0 0 ${r.img.width} ${r.img.height}`} aria-hidden="true">
              {h.nodos.map((n, i) => (
                <circle key={i} cx={n.x * r.img.width} cy={n.y * r.img.height}
                        r={Math.max(4, n.r * r.img.width)} />
              ))}
            </svg>
          ) : null}
        </figure>
      ) : null}

      <div className={styles.instrumento} hidden={!instrumentos}>
        {h.nodos?.length ? (
          <p className={styles.contadorImp}>
            <b>{h.nodos.length}</b><span className="mono">{(h.contador ?? h.titulo).toLowerCase()}</span>
          </p>
        ) : null}

        {h.metricas?.length ? (
          <dl className={`${styles.datos} mono`}>
            {h.metricas.map((m) => (
              <div key={m.etiqueta}><dt>{m.etiqueta}</dt><dd>{m.valor}</dd></div>
            ))}
          </dl>
        ) : null}

        {h.criterios?.length ? <Pesos criterios={h.criterios} /> : null}

        {h.clases?.length ? (
          <ul className={`${styles.clave} mono`}>
            {h.clases.map((k) => (
              <li key={k.label} style={{ '--c': k.color } as CSSProperties}>
                <i aria-hidden="true" />{k.label}
              </li>
            ))}
          </ul>
        ) : null}

        {r?.origen ? <p className={`${styles.fuente} mono`}>{r.origen}</p> : null}
        {h.fuente ? <p className={`${styles.fuente} mono`}>{h.fuente}</p> : null}
      </div>

      {!instrumentos && (r?.origen || h.fuente) ? (
        <p className={`${styles.fuenteAlPie} mono`}>{r?.origen ?? h.fuente}</p>
      ) : null}
    </div>
  );
}

/** Díptico calibrado: los dos estados en el mismo marco y a la misma escala. */
function Diptico({ h }: { h: HojaImpresa }) {
  return (
    <div className={styles.piezas} data-n="2">
      {h.recursos.slice(0, 2).map((r, i) => (
        <figure key={r.img.src}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={r.img.src} srcSet={r.img.srcSet} sizes="130mm"
               width={r.img.width} height={r.img.height} alt={r.pie} />
          <figcaption className="mono">
            <b>{h.etiquetas?.[i] ?? ''}</b> {r.pie}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}

/**
 * Detalles: mandan las ventanas.
 *
 * En pantalla el detalle es un gesto sobre el mapa; imprimir otra vez el mapa
 * entero sólo produciría dos hojas gemelas. Aquí la jerarquía se invierte —los
 * recortes ocupan la página a resolución nativa y el mapa baja a localizador
 * numerado—, que es la misma lectura por otros medios.
 */
function AtlasDetalle({ h }: { h: HojaImpresa }) {
  const r = h.recursos[0];
  if (!r) return null;
  const puntos = h.puntos ?? [];

  return (
    <div className={styles.detalleInvertido}>
      <ol className={styles.ventanas} data-n={String(puntos.length)}>
        {puntos.map((pt, i) => (
          <li key={i}>
            <span style={{
              backgroundImage: `url(${r.img.src})`,
              backgroundPosition: `${pt.x}% ${pt.y}%`,
            } as CSSProperties} />
            <p className="mono"><b>{String(i + 1).padStart(2, '0')}</b>{pt.nombre}</p>
          </li>
        ))}
      </ol>

      <div className={styles.instrumento}>
        <figure className={styles.localizador}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={r.img.src} srcSet={r.img.srcSet} sizes="58mm"
               width={r.img.width} height={r.img.height} alt={r.pie} />
          <svg className={styles.nodosImp} viewBox={`0 0 ${r.img.width} ${r.img.height}`} aria-hidden="true">
            {puntos.map((pt, i) => (
              <circle key={i} cx={(pt.x / 100) * r.img.width} cy={(pt.y / 100) * r.img.height}
                      r={r.img.width * 0.026} />
            ))}
          </svg>
        </figure>
        <p className={`${styles.fuente} mono`}>
          Ventanas a resolución nativa. {r.pie}
          {r.origen ? <span className={styles.origenPie}>{r.origen}</span> : null}
        </p>
      </div>
    </div>
  );
}

/** Perfil grande con sus llamadas cromáticas y el mapa como referencia. */
function PerfilImpreso({ h }: { h: HojaImpresa }) {
  const [perfil, mapa] = h.recursos;
  return (
    <div className={styles.lecturaMarco}>
      {perfil ? (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img className={styles.mapa} src={perfil.img.src} srcSet={perfil.img.srcSet} sizes="170mm"
             width={perfil.img.width} height={perfil.img.height} alt={perfil.pie} />
      ) : null}
      <div className={styles.instrumento}>
        {h.clases?.length ? (
          <ul className={`${styles.clave} mono`}>
            {h.clases.map((k) => (
              <li key={k.label} style={{ '--c': k.color } as CSSProperties}>
                <i aria-hidden="true" />{k.label}
              </li>
            ))}
          </ul>
        ) : null}
        {mapa ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img className={styles.miniatura} src={mapa.img.src} srcSet={mapa.img.srcSet} sizes="60mm"
               width={mapa.img.width} height={mapa.img.height} alt={mapa.pie} />
        ) : null}
        {perfil?.origen ? <p className={`${styles.fuente} mono`}>{perfil.origen}</p> : null}
      </div>
    </div>
  );
}

/** Barras a escala del mayor peso. La suma se calcula, no se escribe. */
function Pesos({ criterios }: { criterios: { nombre: string; peso: number }[] }) {
  const max = Math.max(...criterios.map((c) => c.peso), 0.01);
  const suma = criterios.reduce((a, c) => a + c.peso, 0);
  return (
    <ol className={styles.matrizImp}>
      {criterios.map((c) => (
        <li key={c.nombre} style={{ '--w': `${(c.peso / max) * 100}%` } as CSSProperties}>
          <span>{c.nombre}</span>
          <i aria-hidden="true" />
          <b className="mono">{c.peso.toFixed(2)}</b>
        </li>
      ))}
      <li data-suma=""><span>Suma</span><i aria-hidden="true" /><b className="mono">{suma.toFixed(2)}</b></li>
    </ol>
  );
}

/** Matriz de pesos a escala, con el mapa de resultado al lado. */
function Matriz({ h }: { h: HojaImpresa }) {
  const r = h.recursos[0];
  return (
    <div className={styles.lecturaMarco}>
      <Pesos criterios={h.criterios ?? []} />
      {r ? (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img className={styles.mapa} src={r.img.src} srcSet={r.img.srcSet} sizes="110mm"
             width={r.img.width} height={r.img.height} alt={r.pie} />
      ) : null}
    </div>
  );
}

/** Contacto editorial: las fotografías numeradas con su pie completo. */
function Contacto2({ h }: { h: HojaImpresa }) {
  return (
    <div className={styles.piezas} data-n={String(h.recursos.length)}>
      {h.recursos.map((r, i) => (
        <figure key={r.img.src}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={r.img.src} srcSet={r.img.srcSet} sizes="130mm"
               width={r.img.width} height={r.img.height} alt={r.pie} />
          <figcaption className="mono">
            <b>{String(i + 1).padStart(2, '0')}</b> {r.pie}{r.origen ? ` · ${r.origen}` : ''}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}

/** Cifras alineadas con su apoyo gráfico, si existe. */
function Cifras({ h }: { h: HojaImpresa }) {
  const r = h.recursos[0];
  // Sin apoyo gráfico la hoja deja de ser una lectura a dos columnas: las
  // cifras se componen a página completa en vez de dejar media hoja vacía.
  return (
    <div className={styles.lecturaMarco} data-solo={r ? undefined : ''}>
      <dl className={`${styles.cifrasImp} mono`}>
        {h.metricas?.map((m) => (
          <div key={m.etiqueta}><dd>{m.valor}</dd><dt>{m.etiqueta}</dt></div>
        ))}
      </dl>
      {r ? (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img className={styles.mapa} src={r.img.src} srcSet={r.img.srcSet} sizes="100mm"
             width={r.img.width} height={r.img.height} alt={r.pie} />
      ) : null}
    </div>
  );
}

/**
 * Separador del capítulo SISTEMAS.
 *
 * Cambia de familia con una hoja limpia: el nombre, tres palabras y la lista de
 * códigos con su estado. Nada de portada vacía ni de logotipos.
 */
function SistemasApertura({ hojas, folio, total }: { hojas: HojaSistema[]; folio: number; total: number }) {
  // Un código por caso: S01 ocupa dos hojas y no se enumera dos veces.
  const codigos = hojas.filter((h, i) => hojas.findIndex((x) => x.codigo === h.codigo) === i);

  return (
    <section className={styles.hoja} data-sup="tinta" data-separador="">
      <p className={`${styles.marca} mono`}>Capacidad digital</p>
      <h2 className={styles.tituloFamilia}>SISTEMAS</h2>
      <p className={`${styles.tresPalabras} mono`}>territorio · datos · decisión</p>

      <ol className={`${styles.listaSistemas} mono`}>
        {codigos.map((h) => (
          <li key={h.codigo}>
            <span className={styles.folioCod}>{h.codigo}</span>
            <span className={styles.sisNombre}>{h.nombre}</span>
            <span className={styles.sisEstado}>{h.estado}</span>
          </li>
        ))}
      </ol>

      <Pie folio={folio} total={total} codigo="S" />
    </section>
  );
}

/**
 * Una hoja de sistema.
 *
 * Captura dominante, hasta dos detalles y una ficha corta. El estado va junto
 * al nombre porque es parte de lo que la hoja afirma: un demostrador con datos
 * simulados no es un producto en operación.
 */
function HojaSistemaImpresa({ s, folio, total }: { s: HojaSistema; folio: number; total: number }) {
  return (
    <section className={styles.hoja} data-sup="tinta" data-clase="sistema">
      <p className={`${styles.codigoChico} mono`}>
        <span className={styles.folioCod}>{s.codigo}</span>{s.nombre}
      </p>

      <div className={styles.sisMarco}>
        <div className={styles.sisPieza}>
          {s.principal ? (
            <CapturaImpresa im={s.principal} ancho="176mm"
                            estado={s.secuencia?.[0]} conPie={!s.secuencia} />
          ) : null}
          {s.detalles.length ? (
            <div className={styles.sisDetalles} data-n={String(s.detalles.length)}>
              {s.detalles.map((d, k) => (
                <CapturaImpresa key={d.src} im={d} ancho="86mm"
                                estado={s.secuencia?.[k + 1]} conPie={!s.secuencia} />
              ))}
            </div>
          ) : null}
        </div>

        <div className={styles.instrumento}>
          <p className={styles.sisCapacidad}>{s.capacidad}</p>
          <p className={`${styles.sisEstadoCaja} mono`}>{s.estado}</p>
          <ul className={`${styles.variables} mono`}>
            {s.acciones.map((a) => <li key={a}>{a}</li>)}
          </ul>
          <p className={styles.sisAnotacion}>{s.anotacion}</p>
          <dl className={`${styles.sisFicha} mono`}>
            <div><dt>Rol</dt><dd>{s.rol}</dd></div>
            <div><dt>Alcance</dt><dd>{s.alcance}</dd></div>
          </dl>
          {s.principal?.credito ? (
            <p className={`${styles.fuente} mono`}>{s.principal.credito}</p>
          ) : null}
        </div>
      </div>

      <Pie folio={folio} total={total} codigo={s.codigo} />
    </section>
  );
}

/**
 * Captura de interfaz con su pie. Nunca por encima de su ancho nativo.
 *
 * `estado` numera el paso dentro de una secuencia; cuando la hoja lo usa, el pie
 * deja de repetir proyecto y estado bajo cada imagen —eso ya lo dice la hoja una
 * sola vez— y se queda con lo que distingue a esta pantalla.
 */
function CapturaImpresa({
  im, ancho, estado, conPie = true,
}: { im: Imagen; ancho: string; estado?: string; conPie?: boolean }) {
  return (
    <figure className={styles.sisCaptura}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={im.src} srcSet={im.srcSet} sizes={ancho}
           width={im.width} height={im.height} alt={im.pie} />
      <figcaption className="mono">
        {estado ? <b className={styles.sisPaso}>{estado}</b> : null}
        {im.pie}
        {conPie ? <span>{`${im.proyecto} · ${im.estado}`}</span> : null}
      </figcaption>
    </figure>
  );
}

function PaginaGranular({
  granular, folio, total,
}: { granular: { titulo: string; territorio: string; region: string; pilares: Pilar[] }; folio: number; total: number }) {
  return (
    <section className={styles.hoja} data-sup="tinta">
      <div className={styles.aperturaMarco}>
        <div className={styles.aperturaTexto} style={{ flex: '0 0 auto', width: '60mm' }}>
          <p className={`${styles.codigo} mono`}><Glifo id="14" tam={20} />P14</p>
          <h2 className={styles.tituloProyecto} style={{ '--largo': '26' } as CSSProperties}>GRANULAR</h2>
          <dl className={`${styles.ficha} mono`}>
            <div><dt>Proyecto</dt><dd>{granular.titulo}</dd></div>
            <div><dt>Territorio</dt><dd>{granular.territorio}</dd></div>
            <div><dt>Región</dt><dd>{granular.region}</dd></div>
            <div><dt>Pilares</dt><dd>{`${granular.pilares.length}`}</dd></div>
          </dl>
          <ol className={`${styles.pilaresLista} mono`} style={{ marginTop: '2rem' }}>
            {granular.pilares.map((p) => (
              <li key={p.numero}><span>{p.numero}</span>{p.nombre}</li>
            ))}
          </ol>
        </div>
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/projects/granular/analisis/p14-comarca-caracterizacion.svg" alt="Caracterizacion" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
        </div>
      </div>
      <Pie folio={folio} total={total} codigo="P14" />
    </section>
  );
}

function GranularCustomImpresa({ pilarId, vista, titulo, numero, folio, total }: { pilarId: string; vista: string; titulo: string; numero: string; folio: number; total: number; }) {
  const { granularVisuals } = require('@/content/granularVisuals');
  
  let v1 = null;
  let v2 = null;
  if (vista === 'radar') v1 = granularVisuals.aguaRadar;
  if (vista === 'paisaje') {
    v1 = granularVisuals.paisajeAgricola;
    v2 = granularVisuals.paisajeAgropecuario;
  }
  if (vista === 'flujos') v1 = granularVisuals.cultivosFlujos;
  if (vista === 'loc-clas') {
    v1 = granularVisuals.clusteringLoc;
    v2 = granularVisuals.clusteringCoropletico;
  }
  if (vista === 'tamano') v1 = granularVisuals.clusteringSize;

  return (
    <section className={styles.hoja} data-sup="tinta">
      <div className={styles.lecturaMarco}>
        {v1 && !v2 && (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img className={styles.mapa} src={v1.asset.src} style={{ objectFit: 'contain', width: '100%', height: '100%' }} alt={titulo} />
        )}
        {v1 && v2 && (
          <div className={styles.piezas} data-n="2" style={{ flex: 1, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <figure>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={v1.asset.src} style={{ objectFit: 'contain', width: '100%', maxHeight: '100%' }} alt={v1.title} />
              <figcaption className="mono" style={{ fontSize: '0.65rem' }}>{v1.title}</figcaption>
            </figure>
            <figure>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={v2.asset.src} style={{ objectFit: 'contain', width: '100%', maxHeight: '100%' }} alt={v2.title} />
              <figcaption className="mono" style={{ fontSize: '0.65rem' }}>{v2.title}</figcaption>
            </figure>
          </div>
        )}
        <div className={styles.instrumento}>
          <p className={`${styles.codigoChico} mono`}>{`P14.${numero}`}</p>
          <h3 className={styles.tituloPilar} style={{ fontSize: '1rem', marginTop: '1rem' }}>{titulo}</h3>
          <p className={`${styles.fuente} mono`} style={{ marginTop: '1rem' }}>{v1?.caption}</p>
          <p className={`${styles.fuente} mono`} style={{ opacity: 0.6 }}>{v1?.source}</p>
        </div>
      </div>
      <Pie folio={folio} total={total} codigo={`P14.${numero}`} />
    </section>
  );
}

function PilarImpreso({ pilar, folio, total }: { pilar: Pilar; folio: number; total: number }) {
  const l = pilar.laminas[0];
  return (
    <section className={styles.hoja} data-sup="tinta">
      <div className={styles.lecturaMarco}>
        {l?.img ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img className={styles.mapa} src={l.img.src} srcSet={l.img.srcSet}
               sizes="186mm"
               width={l.img.width} height={l.img.height}
               alt={`${l.titulo}. Comarca Lagunera.`} />
        ) : null}
        <div className={styles.instrumento}>
          <p className={`${styles.codigoChico} mono`}>{`P14.${pilar.numero}`}</p>
          <h3 className={styles.tituloPilar}>{pilar.nombre.toUpperCase()}</h3>
          <ul className={`${styles.variables} mono`}>
            {pilar.variables.map((v) => <li key={v}>{v}</li>)}
          </ul>
          {l?.categorias.length ? (
            <ul className={`${styles.clave} mono`} data-simple="">
              {l.categorias.map((c) => (
                <li key={c.name}>{c.name}{c.range ? <b>{c.range}</b> : null}</li>
              ))}
            </ul>
          ) : null}
          {l ? <p className={`${styles.fuente} mono`}>{`${l.titulo} · p.${l.pagina}`}</p> : null}
        </div>
      </div>
      <Pie folio={folio} total={total} codigo={`P14.${pilar.numero}`} />
    </section>
  );
}

function Plano({ d, clase }: { d: Dibujo | null; clase?: string }) {
  if (!d) return null;
  return (
    <svg className={clase} viewBox={d.viewBox} role="img" aria-label={d.titulo}>
      {d.capas.map((c) => (
        <g key={c.nombre} fill={c.color} stroke={c.color}
           dangerouslySetInnerHTML={{ __html: c.body }} />
      ))}
    </svg>
  );
}

function ParqueApertura({ parque, folio, total }: { parque: Parametros['parque']; folio: number; total: number }) {
  return (
    <section className={styles.hoja} data-sup="papel">
      <div className={styles.lecturaMarco}>
        <Plano d={parque.planta} clase={styles.plano} />
        <div className={styles.instrumento}>
          <p className={`${styles.codigo} mono`}><Glifo id="15" tam={20} />P15</p>
          <h2 className={styles.tituloProyecto} style={{ '--largo': '16' } as CSSProperties}>{parque.titulo}</h2>
          <dl className={`${styles.ficha} mono`}>
            <div><dt>Territorio</dt><dd>{parque.lugar}</dd></div>
            <div><dt>Escala</dt><dd>parque</dd></div>
            <div><dt>Marco</dt><dd>{parque.marco}</dd></div>
          </dl>
          <ul className={`${styles.clave} mono`} data-simple="">
            {parque.piezas.map((p) => <li key={p.label}>{p.label}</li>)}
          </ul>
        </div>
      </div>
      <Pie folio={folio} total={total} codigo="P15" />
    </section>
  );
}

function ParqueVariaciones({ parque, folio, total }: { parque: Parametros['parque']; folio: number; total: number }) {
  return (
    <section className={styles.hoja} data-sup="papel">
      <p className={`${styles.codigoChico} mono`}>P15 · Variaciones</p>
      <div className={styles.piezas} data-n={String(parque.variaciones.length)}>
        {parque.variaciones.map((v) => (
          <figure key={v.id}>
            <Plano d={v} clase={styles.planoChico} />
            <figcaption className="mono">{v.titulo}</figcaption>
          </figure>
        ))}
      </div>
      <Pie folio={folio} total={total} codigo="P15" />
    </section>
  );
}

function ParqueDetalle({ parque, folio, total }: { parque: Parametros['parque']; folio: number; total: number }) {
  return (
    <section className={styles.hoja} data-sup="papel">
      <p className={`${styles.codigoChico} mono`}>P15 · Detalle</p>
      <div className={styles.detalleMarco}>
        <Plano d={parque.detalle} clase={styles.plano} />
      </div>
      <p className={`${styles.fuente} mono`}>Acercamiento axonométrico al foro y al mirador circular</p>
      <Pie folio={folio} total={total} codigo="P15" />
    </section>
  );
}

/**
 * Fuentes y procedencia.
 *
 * No es un directorio de personas ni una página de agradecimientos: dice, por
 * código, de dónde salió el dato de cada proyecto y hasta dónde llega. Cuando la
 * lámina original no registra el conjunto, el año o el portal, la hoja lo dice
 * en vez de atribuirlo a una institución genérica.
 */
function Creditos({
  proyectos, granular, sistemas, folio, total,
}: {
  proyectos: PaginaProyecto[];
  granular: { pilares: Pilar[] };
  sistemas: HojaSistema[];
  folio: number; total: number;
}) {
  const conFuente = proyectos.filter((p) => p.fuente);

  // Un estado por código de sistema; S01 ocupa dos hojas y no se repite.
  const estados = sistemas.filter(
    (h, i) => sistemas.findIndex((x) => x.codigo === h.codigo) === i,
  );

  return (
    <section className={styles.hoja} data-sup="papel" data-clase="fuentes">
      <h2 className={styles.titulo2}>Fuentes y procedencia</h2>

      <div className={styles.fuentesMarco}>
        <div>
          <p className={`${styles.fuentesRotulo} mono`}>proyectos territoriales</p>
          <dl className={`${styles.fuentesLista} mono`}>
            {conFuente.map((p) => (
              <div key={p.id}>
                <dt>{`P${p.id}`}</dt>
                <dd>{p.fuente}</dd>
              </div>
            ))}
          </dl>

          <p className={`${styles.fuentesRotulo} mono`}>sistemas</p>
          <dl className={`${styles.fuentesLista} mono`}>
            {estados.map((h) => (
              <div key={h.codigo}>
                <dt>{h.codigo}</dt>
                <dd>{`${h.nombre} · ${h.estado}. ${h.principal?.credito ?? ''}`.trim()}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className={`${styles.alcance} mono`}>
          <p className={`${styles.fuentesRotulo} mono`}>alcance documentado</p>
          {granular.pilares.slice(0, 1).map((p) => (
            <p key={p.numero}>{`${p.nombre}: ${p.alcance.text}`}</p>
          ))}
          <p>
            Las láminas de P01–P15 proceden del documento original del portafolio; la
            página de origen se indica en cada proyecto. Donde la fuente no registra el
            año, no se declara ninguno.
          </p>
          <p>
            Las capturas de S01–S04 son pantallas de aplicaciones propias. Las que
            trabajan con datos simulados lo declaran en su pie y no se presentan como
            resultados productivos.
          </p>
          <p>
            <b>Autoría del portafolio.</b> Dirección, diseño editorial, cartografía y
            desarrollo: Nestor Elihu Arriaga Gallegos. Los créditos de equipo y las
            instituciones de cada trabajo se conservan en la ficha del proyecto
            correspondiente.
          </p>
        </div>
      </div>

      <Pie folio={folio} total={total} />
    </section>
  );
}

/**
 * Cierre del documento.
 *
 * Cierra el recorrido con lo que hace falta para escribir: quién, qué hace,
 * dónde está y cómo se le contacta. Correo y perfil van como enlaces reales del
 * PDF, no como texto que haya que copiar a mano.
 */
function Contacto({
  identidad, correo, folio, total,
}: { identidad: { nombre: string; linea: string }; correo: string; folio: number; total: number }) {
  return (
    <section className={styles.hoja} data-sup="tinta" data-cierre="">
      <div className={styles.cierreMarco}>
        <div>
          <h2 className={styles.nombre}>{identidad.nombre}</h2>
          <p className={`${styles.linea} mono`}>Ingeniero en Recursos Naturales Renovables</p>
          <p className={`${styles.cierreCampo} mono`}>
            Cartografía · análisis territorial · sistemas de visualización
          </p>
        </div>

        <dl className={`${styles.cierreDatos} mono`}>
          <div><dt>Base</dt><dd>Aguascalientes / Texcoco, México</dd></div>
          <div>
            <dt>Correo</dt>
            <dd><a className={styles.cierreEnlace} href={`mailto:${correo}`}>{correo}</a></dd>
          </div>
          <div><dt>Teléfono</dt><dd>+52 (33) 3487 1084</dd></div>
          <div>
            <dt>Perfil</dt>
            <dd>
              <a className={styles.cierreEnlace}
                 href="https://www.linkedin.com/in/nestor-arriaga-9198072b5/">
                linkedin.com/in/nestor-arriaga
              </a>
            </dd>
          </div>
          <div><dt>Idioma</dt><dd>Inglés B2</dd></div>
        </dl>
      </div>

      <p className={`${styles.cierreAutoria} mono`}>
        Dirección, diseño editorial, cartografía y desarrollo del portafolio:
        {' '}Nestor Elihu Arriaga Gallegos.
      </p>

      <Pie folio={folio} total={total} />
    </section>
  );
}

type Parametros = Parameters<typeof Impreso>[0];
