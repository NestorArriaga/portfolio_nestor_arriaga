/**
 * Contenido del home.
 *
 * Todo lo de aquí procede del PDF (títulos, territorios, páginas) o de la
 * geometría real (extensiones, escalas). Nada está redactado para rellenar un
 * hueco de composición.
 *
 * Los territorios sin `maskSlug` no tienen geometría local: se nombran en el
 * índice pero no se dibujan en el mapa nacional, porque situarlos "más o menos"
 * sería inventar una posición.
 */

export const identity = {
  name: 'Néstor Elihu Arriaga Gallegos',
  role: 'Ingeniero en Recursos Naturales Renovables',
  line: 'Territorio, ruralidad y paisaje',
  institution: 'Universidad Autónoma Chapingo',
  year: '2026',
  intro:
    'Cartografía, análisis territorial y proyectos que relacionan paisaje, recursos naturales y formas de habitar.',
};

export type Territory = {
  id: string;
  name: string;
  /** Rótulo del mapa. El nombre completo no cabe entre siluetas vecinas. */
  short: string;
  region: string;
  /** Máscara del shapefile, cuando existe geometría local. */
  maskSlug?: string;
  projectIds: string[];
};

export const territories: Territory[] = [
  { id: 'cdmx', name: 'Ciudad de México', short: 'CDMX', region: 'Alcaldía Miguel Hidalgo', maskSlug: 'ciudad-de-mexico', projectIds: ['01'] },
  { id: 'veracruz', name: 'Cuenca de Decozalapa', short: 'Decozalapa', region: 'Veracruz', maskSlug: 'decozalapa', projectIds: ['02', '03', '04'] },
  { id: 'hidalgo', name: 'Reserva de Metztitlán', short: 'Metztitlán', region: 'Hidalgo', projectIds: ['05', '06', '07', '08'] },
  { id: 'aguascalientes', name: 'Aguascalientes y Calvillo', short: 'Aguascalientes', region: 'Aguascalientes', maskSlug: 'aguascalientes', projectIds: ['09', '10', '11', '12', '13'] },
  { id: 'comarca', name: 'Comarca Lagunera', short: 'Comarca', region: 'Coahuila – Durango', projectIds: ['14'] },
  { id: 'merida', name: 'Mérida', short: 'Mérida', region: 'Yucatán', maskSlug: 'yucatan', projectIds: ['15'] },
];

export type ProjectEntry = {
  id: string;
  title: string;
  territoryId: string;
  /** Páginas del PDF de origen. */
  pages: number[];
  scale: string;
};

/** Los quince casos, con su título y páginas tal como están en el PDF. */
export const projects: ProjectEntry[] = [
  { id: '01', title: 'Mapeo y Análisis de Áreas Verdes en la Alcaldía Miguel Hidalgo', territoryId: 'cdmx', pages: [10], scale: 'alcaldía' },
  { id: '02', title: 'Mapeo de Captura de Carbono en la Cuenca de Decozalapa', territoryId: 'veracruz', pages: [12], scale: 'cuenca' },
  { id: '03', title: 'Análisis de Zonas Óptimas para Limón y Café', territoryId: 'veracruz', pages: [12], scale: 'cuenca' },
  { id: '04', title: 'Análisis de Uso Óptimo de Suelo para Limón y Café', territoryId: 'veracruz', pages: [13], scale: 'cuenca' },
  { id: '05', title: 'Análisis Geomorfológico de la Reserva de la Biosfera en Metztitlán', territoryId: 'hidalgo', pages: [14], scale: 'reserva' },
  { id: '06', title: 'Reclasificación de Uso de Suelo y Vegetación', territoryId: 'hidalgo', pages: [14], scale: 'reserva' },
  { id: '07', title: 'Cálculo de Pendiente en Cuatro Intervalos', territoryId: 'hidalgo', pages: [15], scale: 'reserva' },
  { id: '08', title: 'Análisis de Patrones Geomorfológicos', territoryId: 'hidalgo', pages: [15], scale: 'reserva' },
  { id: '09', title: 'Análisis de Clúster para Vocaciones Productivas', territoryId: 'aguascalientes', pages: [17], scale: 'estado' },
  { id: '10', title: 'Mapa de Aptitud para la Conservación', territoryId: 'aguascalientes', pages: [18], scale: 'estado' },
  { id: '11', title: 'Mapa de Aptitud Agrícola', territoryId: 'aguascalientes', pages: [19], scale: 'estado' },
  { id: '12', title: 'Análisis de Degradación del Suelo en Calvillo', territoryId: 'aguascalientes', pages: [20], scale: 'municipio' },
  { id: '13', title: 'Delimitación de Subcuencas e Identificación de Ríos', territoryId: 'aguascalientes', pages: [20], scale: 'municipio' },
  { id: '14', title: 'Tipologías rurales situadas: análisis territorial multiescalar en la Comarca Lagunera', territoryId: 'comarca', pages: [21, 40], scale: 'multiescalar' },
  { id: '15', title: 'Urban Challenge SEDATU × GIZ', territoryId: 'merida', pages: [41, 45], scale: 'parque' },
];

/**
 * Anotación técnica del objeto del hero.
 *
 * Las llamadas describen el espécimen —qué es, de dónde sale, a qué resolución—
 * y se anclan al borde de la silueta, no a puntos interiores.
 *
 * Etiquetar accidentes del interior ("sierra", "vega", "bolsón") exigiría saber
 * dónde caen sobre este recorte concreto, y eso no está verificado contra el
 * PDF ni contra la fuente. Un rótulo geográfico colocado a ojo es un dato
 * inventado, aunque el nombre exista.
 */
export const heroCallouts = [
  { x: 50, y: 4, labelX: 88, labelY: 10, label: 'Territorio', value: 'Comarca Lagunera', align: 'left' as const },
  { x: 12, y: 30, labelX: 4, labelY: 22, label: 'Fuente', value: 'Recorte satelital, QGIS', align: 'right' as const },
  { x: 88, y: 46, labelX: 92, labelY: 40, label: 'Resolución', value: '1832 × 2081 px', align: 'left' as const },
  { x: 14, y: 66, labelX: 4, labelY: 74, label: 'Proyecto', value: 'P14 · quince casos', align: 'right' as const },
  { x: 52, y: 96, labelX: 88, labelY: 92, label: 'Estados', value: 'Coahuila · Durango', align: 'left' as const },
];
