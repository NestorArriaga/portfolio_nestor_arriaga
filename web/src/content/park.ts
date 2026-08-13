/**
 * P15 · Urban Challenge — lectura verificada de los archivos.
 *
 * Cada afirmación de este archivo se comprobó **renderizando** el archivo, no
 * leyendo su nombre. La dirección de arte lo pedía explícitamente y con razón:
 * la lectura por nombre habría salido mal en tres de ocho archivos.
 *
 * Lo que resultó ser cada cosa:
 *
 * - `parkheat1/2/3` **no son mapas de calor.** No hay ninguna variable
 *   climática en ellos. Son el levantamiento del contexto urbano: la manzana
 *   construida alrededor del predio, en tres estados de acabado. Rotularlos
 *   como calor, viento, sombra o asoleamiento —que es lo que sugiere el
 *   nombre— habría puesto una leyenda climática sobre un modelo de masas.
 * - Los dieciséis JPEG de `PORTFOLIO BASE` **no son fotografías**. Sus medidas
 *   coinciden exactamente con los `viewBox` de los SVG (1184×864, 1088×960,
 *   1280×720, 831.5×498.5…): son exportaciones de los mismos dibujos. No hay
 *   ninguna foto de sitio en el proyecto, así que no se promete ninguna.
 * - Un archivo del material de origen quedó excluido de la selección final:
 *   no es un dibujo del proyecto y no aporta una lectura del predio.
 *
 * Y lo que sí hay: cinco dibujos de propuesta pintados con exactamente tres
 * rellenos cada uno. Ese relleno es la clasificación del dibujo, y separarlo
 * devuelve capas reales del documento. Los nombres de capa de aquí abajo salen
 * de mirar cada separación renderizada, una por una.
 */

export type ParkLayerRole = 'arbolado' | 'superficie' | 'circulacion' | 'huella';

export type ParkStep = {
  id: string;
  /** Rótulo de la escena. Dos o tres palabras. */
  title: string;
  /** Archivo del manifiesto de P15. */
  file: string;
  kind: 'raster' | 'split';
  /** Qué es cada capa separada, en el orden en que el manifiesto las declara. */
  roles?: ParkLayerRole[];
  /** Nota de una línea sobre la procedencia. */
  note?: string;
};

/** Qué dibuja cada relleno, comprobado en la separación renderizada. */
export const LAYER_NAMES: Record<ParkLayerRole, string> = {
  arbolado: 'Arbolado',
  superficie: 'Superficie verde',
  circulacion: 'Circulación y plaza',
  // La hoja blanca del dibujo, con el parque recortado. No es una capa
  // temática: invertida, da el contorno exacto del predio.
  huella: 'Huella del predio',
};

/**
 * Secuencia del caso: sitio → condición → decisiones → variaciones →
 * experiencia espacial → ensamblaje.
 *
 * El orden no es cronológico ni arbitrario: va de lo que estaba a lo que se
 * propone, manteniendo el mismo predio a la vista en todos los pasos.
 */
export const steps: ParkStep[] = [
  {
    id: 'sitio',
    title: 'El predio',
    file: 'parkheat3',
    kind: 'raster',
    note: 'Modelo de masas del contexto construido. Sin propuesta todavía.',
  },
  {
    id: 'contexto',
    title: 'La manzana',
    file: 'parkheat2',
    kind: 'raster',
    note: 'El mismo modelo con la masa arbórea del predio levantada sobre él.',
  },
  {
    id: 'levantamiento',
    title: 'Levantamiento',
    file: 'parkheat1',
    kind: 'raster',
    note: 'Traza de la manzana en línea, con el predio dentro.',
  },
  {
    id: 'decisiones',
    title: 'Las capas',
    file: 'park-base',
    kind: 'split',
    roles: ['arbolado', 'superficie', 'huella'],
    note: 'Planta de propuesta, separada por sus tres rellenos.',
  },
  {
    id: 'variacion-a',
    title: 'Variación 01',
    file: 'park1',
    kind: 'split',
    roles: ['circulacion', 'arbolado', 'huella'],
    note: 'Esquema formal: plaza elíptica y paseos radiales.',
  },
  {
    id: 'variacion-b',
    title: 'Variación 02',
    file: 'park2',
    kind: 'split',
    // Ojo con el orden: el manifiesto ordena por número de elementos, no por
    // capa, y aquí la hoja blanca queda en medio (#fdfdfd, 70) entre la
    // superficie (253) y el arbolado (40).
    roles: ['superficie', 'huella', 'arbolado'],
    note: 'Esquema desarrollado: graderío, foro y recorrido continuo.',
  },
  {
    id: 'variacion-c',
    title: 'Variación 03',
    file: 'parkbase2',
    kind: 'split',
    roles: ['superficie', 'arbolado', 'huella'],
  },
  {
    id: 'fragmento',
    title: 'Fragmento',
    file: 'park4',
    kind: 'split',
    roles: ['arbolado', 'superficie', 'huella'],
    note: 'Acercamiento axonométrico al foro y al mirador circular.',
  },
];

/** Paleta del proyecto. Los tres primeros salen medidos de los dibujos. */
export const palette = {
  papel: '#f3f2ec',
  tinta: '#0a0a0a',
  arbolado: '#516345',
  superficie: '#a4b77c',
  madera: '#a5784c',
};

export const credits = {
  title: 'Urban Challenge SEDATU × GIZ',
  place: 'Mérida, Yucatán',
};
