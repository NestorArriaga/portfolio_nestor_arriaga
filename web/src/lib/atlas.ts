import fs from 'node:fs';
import path from 'node:path';

/**
 * Acceso en servidor a los activos del atlas producidos en la Fase 1a.
 *
 * Las máscaras se leen del disco y se entregan como listas de `d`, no como
 * `<img src>`. La diferencia importa: un contorno inline hereda `currentColor`
 * y se puede trazar con `stroke-dashoffset`; una imagen no. Todo lo que el
 * movimiento tenga que dibujar debe pasar por aquí.
 *
 * Los rásteres sí van por `<img>`: son bases y superficies, no geometría.
 */

const PUBLIC_DIR = path.join(process.cwd(), 'public');
const VECTOR_DIR = path.join(PUBLIC_DIR, 'atlas', 'vector');
const GEO_DIR = path.join(PUBLIC_DIR, 'atlas', 'geo');

export type TerritoryMaskData = {
  slug: string;
  viewBox: string;
  width: number;
  height: number;
  paths: string[];
};

export type MaskMeta = {
  slug: string;
  source: string;
  mask: string;
  geojson: string;
  rings: number;
  points: number;
  span_km: [number, number];
  extent_m: [number, number, number, number];
  srs: string;
};

const VIEWBOX_RE = /viewBox="([^"]+)"/;
const PATH_D_RE = /<path[^>]*\sd="([^"]+)"/g;

/** Lee una máscara territorial y devuelve su geometría lista para inline. */
export function getTerritoryMask(slug: string): TerritoryMaskData | null {
  const file = path.join(VECTOR_DIR, `mask-${slug}.svg`);
  if (!fs.existsSync(file)) return null;

  const svg = fs.readFileSync(file, 'utf8');
  const vb = VIEWBOX_RE.exec(svg)?.[1];
  if (!vb) return null;

  const [, , w, h] = vb.split(/\s+/).map(Number);
  const paths: string[] = [];
  // exec en bucle en vez de matchAll: la regex es global y compartida a nivel
  // de módulo, así que hay que reiniciar lastIndex en cada lectura.
  PATH_D_RE.lastIndex = 0;
  let match: RegExpExecArray | null;
  while ((match = PATH_D_RE.exec(svg)) !== null) paths.push(match[1]);

  return { slug, viewBox: vb, width: w, height: h, paths };
}

export function listTerritoryMasks(): MaskMeta[] {
  const file = path.join(GEO_DIR, 'territory-masks.json');
  if (!fs.existsSync(file)) return [];
  const data = JSON.parse(fs.readFileSync(file, 'utf8')) as { masks: MaskMeta[] };
  return data.masks.filter((m) => m.mask);
}

export type Municipio = {
  slug: string;
  name: string;
  estado: string;
  paths: string[];
  /** Encuadre propio de la silueta. Cada municipio tiene el suyo. */
  viewBox: string;
  ratio: number;
  /** Centroide del área. */
  label: [number, number];
  points: number;
};

export type MunicipalSet = {
  note: string;
  municipios: Municipio[];
};

/**
 * Siluetas municipales de la Comarca.
 *
 * Los quince archivos declaran el mismo viewBox que las capas ráster, pero no
 * están co-registrados: cada municipio se exportó escalado a su propia hoja
 * —comprobado renderizando los originales—. Se entregan con su encuadre propio
 * y sirven como índice de formas, no como capa cartográfica.
 *
 * Son la única geometría vectorial verdadera del proyecto: lo único trazable,
 * coloreable e interactivo.
 */
export function getMunicipios(): MunicipalSet | null {
  const file = path.join(GEO_DIR, 'municipios.json');
  if (!fs.existsSync(file)) return null;
  return JSON.parse(fs.readFileSync(file, 'utf8')) as MunicipalSet;
}

export type NationalPlacement = {
  slug: string;
  mask: TerritoryMaskData;
  /** Rectángulo que ocupa dentro del marco compartido, en unidades del viewBox. */
  x: number;
  y: number;
  width: number;
  height: number;
};

export type NationalFrame = {
  width: number;
  height: number;
  /** Extensión real cubierta: [oeste, sur, este, norte] en metros EPSG:6372. */
  extent: [number, number, number, number];
  /** Ancho real del marco, para dibujar una escala verdadera. */
  metersWide: number;
  placements: NationalPlacement[];
};

/**
 * Coloca las máscaras en un único marco geográfico compartido.
 *
 * Cada máscara se normalizó a 1000 unidades de ancho, lo que borra su posición
 * absoluta. Aquí se recupera desde `extent_m`: se calcula la unión de todas las
 * extensiones en EPSG:6372 y se sitúa cada silueta en su rectángulo real dentro
 * de ella. El resultado es un mapa verdadero de dónde está cada territorio, no
 * una composición decorativa.
 *
 * Solo aparecen los territorios con geometría local. Los que no la tienen no se
 * dibujan en una posición aproximada: se listan aparte.
 */
export function getNationalFrame(slugs?: string[], viewWidth = 1000): NationalFrame | null {
  const metas = listTerritoryMasks().filter((m) => !slugs || slugs.includes(m.slug));
  if (!metas.length) return null;

  const minX = Math.min(...metas.map((m) => m.extent_m[0]));
  const minY = Math.min(...metas.map((m) => m.extent_m[1]));
  const maxX = Math.max(...metas.map((m) => m.extent_m[2]));
  const maxY = Math.max(...metas.map((m) => m.extent_m[3]));

  const spanX = maxX - minX || 1;
  const spanY = maxY - minY || 1;
  const scale = viewWidth / spanX;

  const placements: NationalPlacement[] = [];
  for (const meta of metas) {
    const mask = getTerritoryMask(meta.slug);
    if (!mask) continue;
    const [x0, y0, x1, y1] = meta.extent_m;
    placements.push({
      slug: meta.slug,
      mask,
      x: (x0 - minX) * scale,
      // Y invertida: la proyección crece al norte, el SVG hacia abajo.
      y: (maxY - y1) * scale,
      width: (x1 - x0) * scale,
      height: (y1 - y0) * scale,
    });
  }

  return {
    width: viewWidth,
    height: spanY * scale,
    extent: [minX, minY, maxX, maxY],
    metersWide: spanX,
    placements,
  };
}

/* -------------------------------------------------------------------------- */

export type AtlasLayerFiles = Partial<Record<'color' | 'gray', Record<string, string>>>;

export type AtlasLayer = {
  layer: number;
  tiles: number;
  native_px: [number, number];
  trimmed_px: [number, number];
  trim_ratio: number;
  has_alpha: boolean;
  mean_saturation: number;
  opaque_ratio: number;
  role: 'base' | 'overlay';
  /** Colores que la capa dibuja realmente, ordenados por superficie. */
  dominant: { hex: string; share: number }[];
  /** [left, top, width, height] en fracciones del lienzo común del archivo. */
  frame: [number, number, number, number];
  files: AtlasLayerFiles;
};

export type AtlasFile = {
  source: string;
  slug: string;
  source_bytes: number;
  /** Lienzo común: el espacio en el que se registran todas las capas. */
  canvas: { user_box: [number, number, number, number]; ratio: number | null } | null;
  layers: (AtlasLayer | { layer: number; error: string })[];
  vector: {
    element_total: number;
    elements: Record<string, number>;
    colors: Record<string, number>;
    distinct_colors: number;
    viewBox: string | null;
    bytes: number;
    file?: string;
  } | null;
};

export type AtlasManifest = {
  generated: string;
  widths: number[];
  files: AtlasFile[];
};

let cached: AtlasManifest | null = null;

export function getAtlasManifest(): AtlasManifest {
  if (cached) return cached;
  const file = path.join(PUBLIC_DIR, 'atlas', 'atlas-manifest.json');
  cached = JSON.parse(fs.readFileSync(file, 'utf8')) as AtlasManifest;
  return cached;
}

export function getAtlasFile(slug: string): AtlasFile | undefined {
  return getAtlasManifest().files.find((f) => f.slug === slug);
}

function isLayer(l: AtlasFile['layers'][number]): l is AtlasLayer {
  return !('error' in l);
}

/** Capas utilizables de un archivo, ya filtradas de las que fallaron. */
export function getLayers(slug: string, role?: 'base' | 'overlay'): AtlasLayer[] {
  const file = getAtlasFile(slug);
  if (!file) return [];
  const layers = file.layers.filter(isLayer);
  return role ? layers.filter((l) => l.role === role) : layers;
}

export type LayerImage = {
  src: string;
  srcSet: string;
  width: number;
  height: number;
  /** Posición dentro del lienzo común, para apilar sin desregistrar. */
  frame: [number, number, number, number];
};

/**
 * Resuelve la fuente de una capa. Devuelve también `srcSet`, las dimensiones
 * nativas —sin `width`/`height` reservados una lámina a sangre provoca CLS— y
 * el encuadre relativo, que es lo que permite superponerla en su sitio real.
 */
export function layerImage(
  layer: AtlasLayer,
  variant: 'color' | 'gray' = 'color',
): LayerImage | null {
  const set = layer.files[variant] ?? layer.files.color;
  if (!set) return null;

  const widths = Object.keys(set)
    .map(Number)
    .sort((a, b) => a - b);
  if (!widths.length) return null;

  const largest = widths[widths.length - 1];
  const [tw, th] = layer.trimmed_px;

  return {
    src: set[String(largest)],
    srcSet: widths.map((w) => `${set[String(w)]} ${w}w`).join(', '),
    width: tw,
    height: th,
    frame: layer.frame ?? [0, 0, 1, 1],
  };
}

/** Proporción del lienzo común de un archivo, para reservar el campo. */
export function canvasRatio(slug: string): number | null {
  return getAtlasFile(slug)?.canvas?.ratio ?? null;
}

/**
 * Color con el que una capa rasterizada está realmente dibujada.
 *
 * El color de un ráster está cocido en el pixel: CSS no puede recolorearlo. Una
 * clave de leyenda que declare otro tono estaría describiendo un mapa que no es
 * el que se ve. Estas claves deben tomar su color de aquí, no de la paleta.
 */
export function layerColor(layer: AtlasLayer, fallback = 'var(--accent)'): string {
  return layer.dominant?.[0]?.hex ?? fallback;
}
