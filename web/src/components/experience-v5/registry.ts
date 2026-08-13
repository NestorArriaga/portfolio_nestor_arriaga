import fs from 'node:fs';
import path from 'node:path';

import { artifactImage, getPlate, getMarkers, PlateImage } from '@/lib/plates';
import { canvasRatio, getLayers, layerImage } from '@/lib/atlas';
import { cases } from '@/content/cases';
import { abrirProyectoHref } from '@/lib/rutas';
import { territories } from '@/content/home';

/**
 * Registro declarativo del atlas.
 *
 * Cada proyecto se describe con **datos**, no con un `switch` repartido por la
 * vista: acto, superficie, cámara, capas reales, anotaciones, interacción y
 * entrega. Lo que no existe como recurso real no se declara — no hay `layers`
 * inventadas ni cifras que el PDF no imprima.
 */

export type Lamina = { src: string; srcSet: string; width: number; height: number; ratio: number };

export type Acto = 'OBSERVAR' | 'LEER' | 'RELACIONAR' | 'DECIDIR' | 'HABITAR';

export type Gesto =
  | 'campo'          // P01 · el territorio se ilumina por proximidad
  | 'concentracion'  // P02 · los puntos se agregan por rango
  | 'comparacion'    // P03 · dos mapas registrados, divisor sobre el límite
  | 'sintesis'       // P04 · una lámina y sus límites dibujados
  | 'atlas'          // P05 · fragmentos que encuentran su sitio
  | 'clasificacion'  // P06 · familias de leyenda que ganan contraste
  | 'barrido'        // P07 · intervalos que atraviesan el territorio
  | 'constelacion'   // P08 · puntos reales por grupos espaciales
  | 'dual'           // P09 · dos vocaciones y su frontera
  | 'criterios'      // P10 · pesos como contribuciones gráficas
  | 'recomposicion'  // P11 · los mismos criterios, otro orden
  | 'erosion'        // P12 · un barrido revela grados
  | 'flujo';         // P13 · cauces desde cabeceras

/**
 * Cómo se presenta el material de una escena.
 *
 * No todas las láminas admiten el mismo trato. Las del PDF llegan con
 * resoluciones muy distintas —de 1499 a 2894 px de ancho nativo— y usarlas
 * todas como fondo a sangre es exactamente lo que revienta las más pequeñas.
 */
export type Presentacion =
  | 'campo'     // ráster de resolución suficiente, autorizado a ocupar el campo
  | 'lamina'    // se presenta como objeto completo, nunca recortado
  | 'diagrama'  // dibujo o composición vectorial
  | 'atlas'     // mapa principal + detalles registrados
  | 'compara';  // dos estados comparables

/**
 * Guarda de densidad de una lámina.
 *
 * `nativo` es el ancho real del ráster tal como sale del PDF, no el del archivo
 * servido. Con él y el `devicePixelRatio` del visitante, la hoja de estilo
 * calcula el ancho máximo en píxeles CSS al que la imagen sigue teniendo al
 * menos un píxel de origen por píxel de pantalla. Por encima de ese ancho la
 * lámina se ve blanda, y ningún filtro de nitidez lo arregla.
 */
export type Guarda = {
  nativo: number;
  nativoAlto: number;
  /** Densidad efectiva a DPR 2 si se usara el ancho máximo de su banda. */
  recorte: boolean;
};

/** Una clase de la leyenda con máscara derivada del propio ráster. */
export type ClaseMascara = { label: string; color: string; file: string; cobertura: number };

export type Momento = {
  id: string;
  num: string;
  acto: Acto;
  titulo: string;
  lugar: string;
  territorio: string;
  href: string;
  superficie: 'tinta' | 'papel' | 'grafito';
  gesto: Gesto;
  alto: number;
  lamina: Lamina | null;
  modo: Presentacion;
  guarda: Guarda | null;
  datos: { label: string; value: string }[];
  clave?: { label: string; color: string }[];
  /** Clases con geometría real recuperable. Sólo éstas pueden encenderse. */
  clases?: ClaseMascara[];
  puntos?: { x: number; y: number }[];
  /** Hero de la página interior. Lo inyecta la portada para precargarlo. */
  hero?: { src: string; srcSet: string };
};

/**
 * Modo de presentación por proyecto.
 *
 * Sale de cruzar el ancho nativo del manifiesto con lo que la escena necesita
 * enseñar. Las seis láminas que el PDF sólo trae por debajo de 2000 px —P03,
 * P04, P07, P08, P12 y P13— no pueden ir a sangre a ningún tamaño de pantalla
 * razonable, y por eso ninguna queda en `campo`.
 */
const MODO: Record<string, Presentacion> = {
  '01': 'campo',    // 2328 px nativos
  '02': 'campo',    // 2478 px
  '03': 'compara',  // 1499 px
  '04': 'lamina',   // 1909 px
  '05': 'atlas',    // 2166 px
  '06': 'lamina',   // 2894 px, pero la leyenda manda la composición
  '07': 'lamina',   // 1847 px
  '08': 'lamina',   // 1576 px
  '09': 'compara',  // 2199 px
  '10': 'lamina',   // 2272 px
  '11': 'lamina',   // 2248 px
  '12': 'lamina',   // 1631 px
  '13': 'lamina',   // 1600 px
};

const img = (p: PlateImage | null): Lamina | null =>
  p ? { src: p.src, srcSet: p.srcSet, width: p.width, height: p.height, ratio: p.ratio } : null;

/**
 * Clases de una lámina con máscara propia.
 *
 * Las láminas del PDF no traen capas separadas, así que una leyenda no podía
 * destacar nada. `scripts/build_class_masks.py` recorre cada lámina y separa
 * los píxeles de cada color impreso de la leyenda; lo que devuelve aquí son
 * esas separaciones. Una clase sin máscara sigue apareciendo en la leyenda
 * como información, pero no se ofrece como control: no habría nada que
 * encender.
 */
let mascarasCache: { slug: string; clases: ClaseMascara[] }[] | null = null;

export function mascaras(slug: string): ClaseMascara[] | undefined {
  if (!mascarasCache) {
    const f = path.join(process.cwd(), 'public', 'projects', 'masks-manifest.json');
    mascarasCache = fs.existsSync(f)
      ? (JSON.parse(fs.readFileSync(f, 'utf8')).laminas as { slug: string; clases: ClaseMascara[] }[])
      : [];
  }
  return mascarasCache.find((x) => x.slug === slug)?.clases;
}

/**
 * Piezas secundarias verificadas de un proyecto.
 *
 * Sólo cuentan tres papeles: mapa, figura y fotografía. `support` incluye
 * además glifos y losetas isométricas —el manifiesto los declara con
 * `role: 'glyph'` y `role: 'slab'`—, que son recursos decorativos del sistema
 * visual, no evidencia del proyecto. Presentarlos como «pieza del proyecto»
 * llenaba una página entera del PDF con un grano de café y tres losetas de
 * color.
 *
 * El papel de cada pieza sale del `role` que declara el manifiesto, no de un
 * rótulo inventado.
 */
const PAPEL_PIEZA: Record<string, string> = {
  map: 'Contexto cartográfico',
  figure: 'Figura del análisis',
  photo: 'Registro fotográfico',
};

export function piezas(slugs: string[] | undefined, artefacto: string) {
  return (slugs ?? [])
    .filter((s) => s !== artefacto)
    .map((s) => {
      const plate = getPlate(s);
      const papel = plate ? PAPEL_PIEZA[plate.role ?? ''] : undefined;
      if (!papel) return null;
      const img = lamina(s);
      return img ? { img, papel } : null;
    })
    .filter((x): x is { img: Lamina; papel: string } => !!x);
}

/** Ancho y alto nativos de una lámina, tal como los declara el manifiesto. */
export function guarda(slug: string): Guarda | null {
  const p = getPlate(slug);
  if (!p?.native_px) return null;
  return { nativo: p.native_px[0], nativoAlto: p.native_px[1], recorte: false };
}

export function lamina(slug: string): Lamina | null {
  const d = img(artifactImage(slug));
  if (d) return d;
  const capas = getLayers(slug);
  const base = capas.find((l) => l.role === 'base') ?? capas[0];
  const l = base ? layerImage(base) : null;
  return l ? { src: l.src, srcSet: l.srcSet, width: l.width, height: l.height,
    ratio: canvasRatio(slug) ?? l.width / l.height } : null;
}

export function capa(slug: string, i = 0): Lamina | null {
  const capas = getLayers(slug).filter((l) => l.files?.color);
  const l = capas[Math.min(i, capas.length - 1)];
  const x = l ? layerImage(l) : null;
  return x ? { src: x.src, srcSet: x.srcSet, width: x.width, height: x.height, ratio: x.width / x.height } : null;
}

/**
 * Datos del portafolio en PDF, leídos del archivo generado.
 *
 * El peso y el número de páginas no se escriben a mano: se miden sobre el
 * fichero, así que la etiqueta del botón nunca miente después de regenerarlo.
 * Si el PDF todavía no existe, el botón no se dibuja.
 */
export function descargaPdf() {
  const rel = '/downloads/Nestor-Arriaga-Gallegos-Portafolio-2026.pdf';
  const f = path.join(process.cwd(), 'public', rel.replace(/^\//, ''));
  if (!fs.existsSync(f)) return null;

  const buf = fs.readFileSync(f);
  const mb = (buf.length / 1024 / 1024).toFixed(1);
  // `/Type /Page` aparece una vez por página; `/Pages` no cuenta.
  const paginas = (buf.toString('latin1').match(/\/Type\s*\/Page[^s]/g) ?? []).length;
  return { href: rel, mb, paginas };
}

export function marcadores() {
  const f = path.join(process.cwd(), 'public', 'atlas', 'geo', 'globe-markers.json');
  if (!fs.existsSync(f)) return [];
  return JSON.parse(fs.readFileSync(f, 'utf8')).marcadores as
    { territoryId: string; nombre: string; lat: number; lng: number }[];
}

/** Gesto, acto y superficie por proyecto. El alto lo fija la transformación real. */
const PLAN: Record<string, { acto: Acto; gesto: Gesto; sup: Momento['superficie']; alto: number }> = {
  '01': { acto: 'OBSERVAR', gesto: 'campo',         sup: 'tinta',   alto: 210 },
  '02': { acto: 'OBSERVAR', gesto: 'concentracion', sup: 'papel',   alto: 210 },
  '03': { acto: 'OBSERVAR', gesto: 'comparacion',   sup: 'tinta',   alto: 230 },
  '04': { acto: 'OBSERVAR', gesto: 'sintesis',      sup: 'grafito', alto: 170 },
  '05': { acto: 'LEER',     gesto: 'atlas',         sup: 'papel',   alto: 240 },
  '06': { acto: 'LEER',     gesto: 'clasificacion', sup: 'grafito', alto: 220 },
  '07': { acto: 'LEER',     gesto: 'barrido',       sup: 'tinta',   alto: 230 },
  '08': { acto: 'LEER',     gesto: 'constelacion',  sup: 'tinta',   alto: 210 },
  '09': { acto: 'RELACIONAR', gesto: 'dual',        sup: 'papel',   alto: 200 },
  '10': { acto: 'RELACIONAR', gesto: 'criterios',   sup: 'grafito', alto: 220 },
  '11': { acto: 'DECIDIR',  gesto: 'recomposicion', sup: 'papel',   alto: 200 },
  '12': { acto: 'DECIDIR',  gesto: 'erosion',       sup: 'tinta',   alto: 220 },
  '13': { acto: 'DECIDIR',  gesto: 'flujo',         sup: 'grafito', alto: 220 },
};

/** Marcadores medidos sobre la lámina, cuando el conjunto salió completo. */
const MEDIDOS: Record<string, string> = {
  '02': 'p02-carbono', '03': 'p03-zonas-optimas', '08': 'p08-patrones',
};

export function momentos(): Momento[] {
  const lugar = new Map(territories.map((t) => [t.id, t]));
  return cases
    .filter((c) => c.id !== '14' && c.id !== '15')
    .map((c) => {
      const p = PLAN[c.id];
      const m = MEDIDOS[c.id] ? getMarkers(MEDIDOS[c.id]) : null;
      return {
        id: `p${c.id}`,
        num: `P${c.id}`,
        acto: p.acto,
        titulo: c.index,
        lugar: lugar.get(c.territoryId)?.name ?? c.place,
        territorio: lugar.get(c.territoryId)?.short ?? '',
        href: abrirProyectoHref(c.id, c.slug),
        superficie: p.sup,
        gesto: p.gesto,
        alto: p.alto,
        lamina: lamina(c.artifact),
        modo: MODO[c.id] ?? 'lamina',
        guarda: guarda(c.artifact),
        datos: (c.facts ?? []).slice(0, 3),
        clave: c.legend?.[0]?.keys.map((k) => ({ label: k.label, color: k.color })),
        clases: mascaras(c.artifact),
        puntos: m?.points.map((q) => ({ x: q.x, y: q.y })),
      };
    });
}

/* -------------------------------------------------------------------------- */
/* Escenas canónicas: P14 y P15                                                */
/* -------------------------------------------------------------------------- */

import { getParkFile, parkLayerBody, parkRaster, getRostro, rostroTrazos } from '@/lib/plates';
import { steps, LAYER_NAMES, ParkLayerRole, palette } from '@/content/park';

/**
 * Tres escalas reales de GRANULAR, cada una con su propia regla.
 *
 * Las reglas no son adorno: la extensión de la Comarca sale de la máscara
 * territorial, y las otras dos se derivan de ella por el factor de la cámara.
 * Ninguna cifra se inventa.
 */
export function escalas() {
  return [
    { id: 'region', titulo: 'Región y relieve',
      nota: 'La Comarca Lagunera y su forma del terreno.', regla: '≈ 200 km',
      img: capa('comarca-base-conectividad', 0) ?? lamina('p14-conectividad') },
    { id: 'red', titulo: 'Conectividad y relaciones',
      nota: 'La red que enlaza las localidades.', regla: '≈ 60 km',
      img: capa('conectividad', 0) ?? capa('base-red', 0) },
    { id: 'local', titulo: 'Aproximación local',
      nota: 'Localidades agroproductivas y tipologías rurales.', regla: '≈ 20 km',
      img: capa('localidades-agroproductivas', 0) ?? capa('total-granjas', 0) },
  ].filter((e) => e.img);
}

export type PiezaPark = {
  id: string; titulo: string; nota?: string; viewBox: string;
  capas: { nombre: string; color: string; body: string }[];
};

function pieza(paso: (typeof steps)[number]): PiezaPark | null {
  const f = getParkFile(paso.file);
  if (!f?.layers?.length) return null;
  const capas = f.layers
    .map((l, i) => {
      const body = parkLayerBody(l.file);
      if (!body) return null;
      const rol = paso.roles?.[i] as ParkLayerRole | undefined;
      return { nombre: rol ? LAYER_NAMES[rol] : l.name, color: l.color, body };
    })
    .filter((x): x is { nombre: string; color: string; body: string } => !!x);
  return capas.length ? { id: paso.id, titulo: paso.title, nota: paso.note, viewBox: f.viewBox, capas } : null;
}

/**
 * P15 en siete estados.
 *
 * La instrucción los nombra —SITIO, TRAZA, RECORRIDO, VEGETACIÓN, PROGRAMA,
 * VARIACIONES, DETALLE— y cada uno se apoya en material distinto del proyecto,
 * no en siete vistas del mismo dibujo con la leyenda cambiada:
 *
 *   SITIO       `parkheat3`, el modelo de masas del contexto construido
 *   TRAZA       `parkheat1`, la traza de la manzana en línea
 *   RECORRIDO   la capa de circulación de la Variación 01, sola
 *   VEGETACIÓN  arbolado y superficie de la planta de propuesta
 *   PROGRAMA    las tres piezas axonométricas del tablero de diseño
 *   VARIACIONES los tres esquemas comparados
 *   DETALLE     el acercamiento al foro y al mirador
 *
 * Las tres piezas de PROGRAMA salen de barrer el alfa del tablero y quedarse
 * con sus componentes conexas, no de recortar a ojo: el archivo trae cinco
 * dibujos sueltos sobre fondo transparente y estas son las cajas medidas de
 * tres de ellos. Los rótulos describen lo que está dibujado —un graderío, un
 * mirador con rampa, una pérgola— y no le asignan a cada pieza un nombre del
 * proyecto que la fuente no permita comprobar.
 */
/**
 * Luminancia relativa de un color `#rrggbb`, para decidir si una capa se ve
 * sobre el papel del capítulo.
 */
function luz(hex: string): number {
  const n = parseInt(hex.replace('#', ''), 16);
  const c = [(n >> 16) & 255, (n >> 8) & 255, n & 255]
    .map((v) => { const u = v / 255; return u <= 0.03928 ? u / 12.92 : ((u + 0.055) / 1.055) ** 2.4; });
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
}

/** Contraste WCAG entre dos colores. */
function contraste(a: string, b: string): number {
  const [x, y] = [luz(a), luz(b)].sort((p, q) => q - p);
  return (x + 0.05) / (y + 0.05);
}

export function parqueEstados() {
  const dibujo = (id: string) => pieza(steps.find((s) => s.id === id)!);

  const base = dibujo('decisiones');
  const v01 = dibujo('variacion-a');
  const detalle = dibujo('fragmento');

  const iCirc = v01?.capas.findIndex((c) => c.nombre === LAYER_NAMES.circulacion) ?? -1;
  const iHuella = v01?.capas.findIndex((c) => c.nombre === LAYER_NAMES.huella) ?? -1;
  const vivas = (p: PiezaPark | null, nombres: string[]) =>
    p ? p.capas.map((c, i) => (nombres.includes(c.nombre) ? i : -1)).filter((i) => i >= 0) : [];

  const tablero = parkRaster('dise-o-parque-yuc');

  const estados: EstadoParque[] = [
    { id: 'pk-vistazo', palabra: 'VISTAZO', modo: 'vistazo',
      nota: 'La planta de propuesta y sus tres piezas de programa.',
      dibujo: base, vivas: base ? base.capas.map((_, i) => i) : [], fantasma: [],
      tablero,
      piezas: [
        { label: 'Graderío',        caja: [0.718, 0.032, 0.259, 0.372] },
        { label: 'Mirador y rampa', caja: [0.005, 0.596, 0.427, 0.404] },
        { label: 'Pérgola y plaza', caja: [0.695, 0.647, 0.300, 0.353] },
      ] },
    { id: 'pk-sistema', palabra: 'SISTEMA', modo: 'sistema',
      nota: 'Circulación, vegetación y programa sobre la misma planta.',
      dibujo: base, vivas: vivas(base, [LAYER_NAMES.arbolado, LAYER_NAMES.superficie]),
      fantasma: vivas(base, [LAYER_NAMES.huella]),
      circulacion: v01 && iCirc >= 0
        ? { viewBox: v01.viewBox, capa: v01.capas[iCirc] } : null,
      // La circulación de la Variación 01 está pintada en #e3e3e3, que sobre el
      // papel del capítulo da un contraste de 1.1:1 — invisible. No se le
      // cambia el color, porque ese relleno **es** su clasificación en el
      // dibujo: se le añade un filo para que su geometría se lea.
      realce: !!v01 && iCirc >= 0 && contraste(v01.capas[iCirc].color, palette.papel) < 1.6 },
    { id: 'pk-variaciones', palabra: 'VARIACIONES', modo: 'variantes',
      nota: 'Tres esquemas sobre el mismo predio.',
      variantes: ['variacion-a', 'variacion-b', 'variacion-c']
        .map(dibujo).filter((p): p is PiezaPark => !!p) },
    { id: 'pk-detalle', palabra: 'DETALLE', modo: 'dibujo',
      nota: 'Acercamiento axonométrico al foro y al mirador circular.',
      dibujo: detalle, vivas: detalle ? detalle.capas.map((_, i) => i) : [], fantasma: [] },
  ];

  // Un estado sin material no se muestra. Antes que una lámina vacía, tres.
  return estados.filter((e) =>
    e.modo === 'vistazo' ? !!e.dibujo && !!e.tablero
    : e.modo === 'variantes' ? (e.variantes?.length ?? 0) > 0
    : !!e.dibujo && (e.vivas?.length ?? 0) > 0);
}

export type EstadoParque = {
  id: string;
  palabra: string;
  nota: string;
  modo: 'vistazo' | 'sistema' | 'dibujo' | 'variantes';
  /** La circulación llega desde otra lámina y se registra sobre la planta. */
  circulacion?: { viewBox: string; capa: { nombre: string; color: string; body: string } } | null;
  dibujo?: PiezaPark | null;
  /** Índices de las capas encendidas y de las que quedan como referencia. */
  vivas?: number[];
  fantasma?: number[];
  /** La capa viva necesita un filo porque su relleno no contrasta con el papel. */
  realce?: boolean;
  tablero?: { src: string; srcSet: string; width: number; height: number } | null;
  piezas?: { label: string; caja: [number, number, number, number] }[];
  variantes?: PiezaPark[];
};

export function parque() {
  const base = pieza(steps.find((s) => s.id === 'decisiones')!);
  if (!base) return null;
  const variaciones = ['variacion-a', 'variacion-b', 'fragmento']
    .map((id) => steps.find((s) => s.id === id))
    .filter((s): s is (typeof steps)[number] => !!s)
    .map(pieza)
    .filter((p): p is PiezaPark => !!p);
  return { base, variaciones };
}

/** Cuatro recortes reales para las palabras del perfil, cada uno con su forma. */
export function recortes() {
  return ([
    // Cada palabra abre la muestra real que le corresponde por significado:
    // el límite de un territorio, la retícula de un mapa, el relieve de un
    // paisaje y la red de un sistema.
    { palabra: 'territorio',  forma: 'contorno' as const, img: lamina('p05-geomorfones') },
    { palabra: 'cartografía', forma: 'reticula' as const, img: lamina('p01-areas-verdes') },
    { palabra: 'paisaje',     forma: 'ventana'  as const, img: lamina('p06-zonas-ecologicas') },
    { palabra: 'sistemas',    forma: 'capas'    as const, img: capa('conectividad', 0) ?? capa('comarca-base-conectividad', 0) },
  ]).filter((x) => x.img) as { palabra: string; forma: 'contorno' | 'capas' | 'ventana' | 'reticula'; img: Lamina }[];
}

/**
 * Fichas del atlas.
 *
 * Los tres ejes salen del registro real: territorio del caso, método de su
 * familia temática y escala de su alcance. Ninguno se inventa para tener
 * filtros que llenen la interfaz.
 */
export function fichas() {
  const lugar = new Map(territories.map((t) => [t.id, t]));
  const METODO: Record<string, string> = {
    urbano: 'urbano', agricultura: 'agricultura', geomorfologia: 'geomorfología',
    aptitud: 'aptitud', multiescalar: 'multiescalar', paisaje: 'paisaje',
  };
  return cases.map((c) => ({
    id: `p${c.id}`,
    num: `P${c.id}`,
    titulo: c.index,
    lugar: lugar.get(c.territoryId)?.name ?? c.place,
    territorio: lugar.get(c.territoryId)?.short ?? c.place,
    metodo: METODO[c.family] ?? c.family,
    escala: c.scale,
    href: abrirProyectoHref(c.id, c.slug),
    mini: lamina(c.artifact),
    // P15 no tiene ráster de catálogo: su material real es la planta, y se
    // entrega como dibujo para no dejar el índice con un hueco.
    planta: c.id === '15' ? (parque()?.base ?? null) : null,
  }));
}

/** Acto de cada proyecto, para el HUD. */
export function actos(): Record<string, string> {
  const out: Record<string, string> = {};
  momentos().forEach((m) => { out[m.id] = m.acto; });
  out.p14 = 'DECIDIR';
  out.p15 = 'HABITAR';
  return out;
}

export type BaseRostro = {
  role: string; label: string;
  frame: [number, number, number, number];
  src: string; srcSet: string;
};

/** Las cuatro lecturas del rostro, en orden de legibilidad dentro de la máscara. */
export function rostro() {
  const r = getRostro();
  const trazos = rostroTrazos();
  if (!r || !trazos) return null;
  const ETIQUETA: Record<string, string> = {
    satelite: 'satélite', relieve: 'relieve', sombra: 'sombreado', atmosfera: 'textura',
  };
  const orden = ['satelite', 'relieve', 'sombra', 'atmosfera'];
  return {
    trazos,
    viewBox: r.trazos.viewBox,
    bases: [...r.bases]
      // Una capa sale completamente negra: no aporta lectura.
      .filter((b) => !(b.slug === 'hh' && b.layer === 2))
      .sort((a, b) => orden.indexOf(a.role) - orden.indexOf(b.role))
      .map((b) => {
        const ws = Object.keys(b.files).map(Number).sort((x, y) => x - y);
        return {
          role: b.role,
          label: ETIQUETA[b.role] ?? b.role,
          frame: b.frame,
          src: b.files[String(ws[ws.length - 1])],
          srcSet: ws.map((n) => `${b.files[String(n)]} ${n}w`).join(', '),
        };
      }) as BaseRostro[],
  };
}

/**
 * Los seis submomentos de GRANULAR.
 *
 * Cada uno se apoya en capas que **existen** en el atlas: el inventario se hizo
 * antes de escribir la lista, y las seis categorías que quedaron son las que
 * tienen material verdadero. Una séptima sin evidencia no se rellena.
 *
 * Las reglas de escala salen de la extensión de la Comarca y del factor de
 * cámara de cada nivel; no son cifras redondas elegidas para que queden bien.
 */
export function granular() {
  const sub = [
    { id: 'g-region', palabra: 'REGIÓN',
      nota: 'La Comarca Lagunera y su relieve.', regla: '≈ 200 km',
      img: capa('comarca-base-conectividad', 0) ?? capa('comarca-base', 0),
      sobre: null },
    { id: 'g-agua', palabra: 'AGUA',
      nota: 'Cuencas, río Nazas y distritos de riego.', regla: '≈ 160 km',
      img: capa('agua-tot', 0) ?? capa('cuencas-comarca', 0),
      sobre: capa('rio-nazas', 0) },
    { id: 'g-agricultura', palabra: 'AGRICULTURA',
      nota: 'Superficie agrícola de riego y de temporal.', regla: '≈ 120 km',
      img: capa('agricultura-comarca-total', 0) ?? capa('total-agro', 0),
      sobre: capa('agricultura-riego', 0) },
    { id: 'g-conectividad', palabra: 'CONECTIVIDAD',
      nota: 'La red que enlaza las localidades.', regla: '≈ 90 km',
      img: capa('conectividad', 0) ?? capa('base-red', 0),
      sobre: capa('commuting-total', 0) },
    { id: 'g-localidades', palabra: 'LOCALIDADES',
      nota: 'Localidades agroproductivas y su marginación.', regla: '≈ 60 km',
      img: capa('localidades-agroproductivas', 0) ?? capa('lcoalidades-total', 0),
      sobre: capa('marginacion-localidades', 0) },
    { id: 'g-tipologias', palabra: 'TIPOLOGÍAS',
      nota: 'Granjas, tenencia de la tierra y vegetación.', regla: '≈ 30 km',
      img: capa('total-granjas', 0) ?? capa('comarca-granjas', 0),
      sobre: capa('tenencia-tierra', 0) },
  ];
  // Un submomento sin lámina no se muestra: no hay escena vacía.
  return sub.filter((x) => x.img);
}
