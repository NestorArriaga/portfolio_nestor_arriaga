import fs from 'node:fs';
import path from 'node:path';

/**
 * Acceso en servidor a los activos de P01–P13 y P15.
 *
 * Tres manifiestos, tres procedencias distintas, y conviene no mezclarlas:
 *
 * - `plates-manifest.json`  → bitmaps extraídos de `Portafolio_Sd.pdf`. Son las
 *   láminas protagonistas. Varias no existen en ninguna otra parte.
 * - `projects-manifest.json` → PNG/JPEG de `PORTAFOLIO GIS`: siluetas, iconos,
 *   gráficas y los bloques isométricos del modelo de aptitud.
 * - `park-manifest.json`    → P15, separado por relleno real desde los SVG de
 *   `PARK CHALLENGE`.
 *
 * Todo lo que sale de aquí lleva `width`/`height` nativos. Sin ellos una lámina
 * a sangre provoca CLS, y la dirección de arte pide cero saltos de layout.
 */

const PUBLIC_DIR = path.join(process.cwd(), 'public');
const PROJECTS_DIR = path.join(PUBLIC_DIR, 'projects');

export type Dominant = { hex: string; share: number };

export type Plate = {
  slug: string;
  source: string;
  page?: number;
  projects: string[];
  role: 'map' | 'figure' | 'photo' | 'mask' | 'slab' | 'glyph' | 'texture';
  credit?: string | null;
  crop?: [number, number, number, number] | null;
  /** La lámina se publicó sin fondo: es una silueta con alfa. */
  alpha?: boolean;
  native_px: [number, number];
  trimmed_px?: [number, number];
  frame?: [number, number, number, number];
  ratio: number;
  dominant: Dominant[];
  files: Record<string, string>;
};

function readJson<T>(file: string): T | null {
  const full = path.join(PROJECTS_DIR, file);
  if (!fs.existsSync(full)) return null;
  return JSON.parse(fs.readFileSync(full, 'utf8')) as T;
}

let platesCache: Plate[] | null = null;

/**
 * Índice único de activos.
 *
 * Los dos manifiestos de bitmap se funden en una sola lista para que un caso
 * pueda pedir su artefacto por slug sin saber de qué fuente salió. Las láminas
 * del PDF van primero: cuando un mismo mapa existe en las dos fuentes, la del
 * PDF es la buena —está a resolución completa y sin recomprimir dos veces—.
 */
export function getPlates(): Plate[] {
  if (platesCache) return platesCache;

  const fromPdf =
    readJson<{ plates: Plate[] }>('plates-manifest.json')?.plates ?? [];
  const fromGis =
    readJson<{ assets: Plate[] }>('projects-manifest.json')?.assets ?? [];
  /* Derivados limpios de las láminas que traen guías o insets dentro del mismo
     archivo. Van primero: cuando existe `p07-pendiente-clean`, es la versión
     que debe usarse, y la original queda disponible por su slug. */
  const limpios: Plate[] =
    (readJson<{ derivados: Partial<Plate>[] }>('clean-manifest.json')?.derivados ?? [])
      .map((d) => ({
        ...(d as Plate),
        projects: d.projects ?? [],
        role: d.role ?? 'map',
        dominant: d.dominant ?? [],
      }));

  const seen = new Set([...limpios, ...fromPdf].map((p) => p.slug));
  platesCache = [...limpios, ...fromPdf, ...fromGis.filter((a) => !seen.has(a.slug))];
  return platesCache;
}

export function getPlate(slug: string): Plate | undefined {
  return getPlates().find((p) => p.slug === slug);
}

/** Activos de un caso, en el orden en que el manifiesto los declara. */
export function platesFor(projectId: string, role?: Plate['role']): Plate[] {
  return getPlates().filter(
    (p) => p.projects.includes(projectId) && (!role || p.role === role),
  );
}

export type PlateImage = {
  src: string;
  srcSet: string;
  width: number;
  height: number;
  ratio: number;
};

/** Resuelve `src`, `srcSet` y dimensiones nativas de un activo. */
export function plateImage(plate: Plate | undefined): PlateImage | null {
  if (!plate) return null;
  const widths = Object.keys(plate.files)
    .map(Number)
    .filter((n) => Number.isFinite(n))
    .sort((a, b) => a - b);
  if (!widths.length) return null;

  const largest = widths[widths.length - 1];
  const [w, h] = plate.trimmed_px ?? plate.native_px;

  return {
    src: plate.files[String(largest)],
    srcSet: widths.map((n) => `${plate.files[String(n)]} ${n}w`).join(', '),
    width: w,
    height: h,
    ratio: plate.ratio,
  };
}

/** Atajo: imagen del artefacto dominante de un caso. */
export function artifactImage(slug: string): PlateImage | null {
  return plateImage(getPlate(slug));
}

/**
 * Color más saturado que el activo dibuja realmente.
 *
 * Mismo criterio que `layerColor` del atlas: por superficie ganaría siempre el
 * gris del terreno que casi todas las láminas comparten, y todas las claves
 * saldrían del mismo tono. Lo que distingue a una lámina es su color
 * categórico.
 */
export function plateColor(slug: string, fallback = 'var(--accent)'): string {
  const dominant = getPlate(slug)?.dominant ?? [];
  if (!dominant.length) return fallback;

  const sat = (hex: string) => {
    const m = /^#([0-9a-f]{6})$/i.exec(hex);
    if (!m) return 0;
    const n = parseInt(m[1], 16);
    const r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255;
    const max = Math.max(r, g, b);
    return max === 0 ? 0 : (max - Math.min(r, g, b)) / max;
  };

  const vivid = dominant
    .filter((d) => sat(d.hex) > 0.45)
    .sort((a, b) => sat(b.hex) - sat(a.hex))[0];

  return (vivid ?? dominant[0]).hex;
}

/* -------------------------------------------------------------------------- */
/* Marcadores medidos sobre la lámina                                         */
/* -------------------------------------------------------------------------- */

export type MarkerSet = {
  /** Rótulo de la clase, tal como lo imprime el PDF. */
  label: string;
  source: string;
  /** Centroides en fracciones del encuadre de la lámina. */
  points: { x: number; y: number; r: number }[];
};

let markerCache: Record<string, MarkerSet> | null = null;

/**
 * Puntos de marcador de una lámina, cuando el conjunto está completo.
 *
 * Solo existen para P02 y P08. `build_marker_points.py` mide los marcadores
 * sobre el bitmap y descarta el caso entero si no puede recuperarlos todos:
 * un conjunto parcial animado como resultado afirmaría una distribución que no
 * es la del análisis. Por eso `getMarkers` devuelve `null` con normalidad y
 * quien lo llama tiene que saber seguir sin él.
 */
export function getMarkers(slug: string): MarkerSet | null {
  if (!markerCache) {
    markerCache = readJson<Record<string, MarkerSet>>('markers.json') ?? {};
  }
  return markerCache[slug] ?? null;
}

/* -------------------------------------------------------------------------- */
/* Interludio del rostro territorial                                          */
/* -------------------------------------------------------------------------- */

export type RostroManifest = {
  pagina: { width: number; height: number; ratio: number };
  origen: string;
  trazos: { file: string; viewBox: string; ratio: number; paths: number };
  bases: {
    role: string;
    slug: string;
    source: string;
    layer: number;
    frame: [number, number, number, number];
    files: Record<string, string>;
  }[];
};

export function getRostro(): RostroManifest | null {
  return readJson<RostroManifest>(path.join('rostro', 'rostro-manifest.json'));
}

/**
 * Contenido del SVG de trazos, sin envoltorio.
 *
 * Va inline y no por `mask-image`: los 715 paths tienen que estar en el DOM
 * para poder revelarlos por grupos. Son 86 KB —unos 20 KB comprimidos—, que es
 * el precio de que la silueta sea vectorial a cualquier tamano.
 */
export function rostroTrazos(): string | null {
  const r = getRostro();
  if (!r) return null;
  const full = path.join(PUBLIC_DIR, r.trazos.file.replace(/^\//, ''));
  if (!fs.existsSync(full)) return null;
  return fs
    .readFileSync(full, 'utf8')
    .replace(/^[\s\S]*?<svg[^>]*>/, '')
    .replace(/<\/svg>\s*$/, '')
    .trim();
}

/* -------------------------------------------------------------------------- */
/* P15 — PARK CHALLENGE                                                       */
/* -------------------------------------------------------------------------- */

export type ParkLayer = {
  name: string;
  file: string;
  /** Relleno con el que el dibujo original pinta esta capa. */
  color: string;
  elements: number;
  bytes: number;
};

export type ParkFile = {
  slug: string;
  source: string;
  kind: 'split' | 'raster';
  viewBox: string;
  ratio: number;
  layers?: ParkLayer[];
  files?: Record<string, string>;
};

let parkCache: ParkFile[] | null = null;

export function getParkFiles(): ParkFile[] {
  if (parkCache) return parkCache;
  parkCache =
    readJson<{ files: ParkFile[] }>(path.join('park', 'park-manifest.json'))
      ?.files ?? [];
  return parkCache;
}

export function getParkFile(slug: string): ParkFile | undefined {
  return getParkFiles().find((f) => f.slug === slug);
}

/**
 * Devuelve el contenido de una capa de P15 lista para inline.
 *
 * Va inline y no por `<img>` a propósito: los path tienen que quedar en el DOM
 * para poder trazarlos con `stroke-dashoffset` y elevarlos por separado. Se
 * quita el envoltorio `<svg>` porque el componente aporta el suyo con el
 * viewBox común del archivo, que es lo que mantiene las capas en registro.
 */
export function parkLayerBody(file: string): string | null {
  const full = path.join(PUBLIC_DIR, file.replace(/^\//, ''));
  if (!fs.existsSync(full)) return null;
  const svg = fs.readFileSync(full, 'utf8');
  return svg.replace(/^[\s\S]*?<svg[^>]*>/, '').replace(/<\/svg>\s*$/, '').trim();
}

export function parkRaster(slug: string): PlateImage | null {
  const f = getParkFile(slug);
  if (!f?.files) return null;
  const widths = Object.keys(f.files).map(Number).sort((a, b) => a - b);
  if (!widths.length) return null;
  const largest = widths[widths.length - 1];
  const height = Math.round(largest / f.ratio);
  return {
    src: f.files[String(largest)],
    srcSet: widths
      .map((n) => `${f.files![String(n)]} ${n}w`)
      .join(', '),
    width: largest,
    height,
    ratio: f.ratio,
  };
}
