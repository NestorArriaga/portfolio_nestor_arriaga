/**
 * Geometría de las quince unidades.
 *
 * Las mismas quince marcas hacen tres papeles a lo largo del recorrido:
 * constelación de portada, riel de progreso y cierre alrededor del contacto.
 * No son tres conjuntos que se sustituyen: es uno que se recoloca, y por eso
 * las tres posiciones viven juntas en este archivo.
 *
 * Todo se expresa en **fracciones del viewport**, porque la capa de unidades es
 * `position: fixed`. Así los tres estados comparten sistema de coordenadas y la
 * interpolación entre ellos es una resta, sin medir nada en cada fotograma.
 */

export type UnitPos = { x: number; y: number; s: number; z: number };

/**
 * Portada. Retícula de 12 columnas, tres bandas, tres escalones de tamaño.
 *
 * Solo dos unidades cruzan el nombre —una por delante y otra por detrás—, y a
 * los lados, donde no hay descendentes. Cuando eran cinco en mitad de la caja
 * tipográfica el número quedaba ilegible sobre las astas.
 */
export const POSTER: UnitPos[] = [
  { x: 0.083, y: 0.130, s: 1.35, z: 1 },
  { x: 0.250, y: 0.090, s: 0.85, z: 1 },
  { x: 0.417, y: 0.160, s: 1.00, z: 1 },
  { x: 0.667, y: 0.100, s: 0.85, z: 1 },
  { x: 0.833, y: 0.145, s: 1.20, z: 1 },

  { x: 0.070, y: 0.395, s: 0.85, z: 0 },
  { x: 0.930, y: 0.360, s: 1.35, z: 2 },

  { x: 0.135, y: 0.700, s: 1.00, z: 1 },
  { x: 0.300, y: 0.755, s: 0.85, z: 1 },
  { x: 0.455, y: 0.690, s: 1.20, z: 1 },
  { x: 0.610, y: 0.760, s: 0.85, z: 1 },
  { x: 0.760, y: 0.700, s: 1.00, z: 1 },
  { x: 0.905, y: 0.755, s: 0.85, z: 1 },
  { x: 0.375, y: 0.880, s: 0.85, z: 1 },
  { x: 0.690, y: 0.885, s: 1.00, z: 1 },
];

/** Alto de una ranura del riel vertical, en px. */
export const RAIL_STEP = 22;
/** Separación del riel al borde derecho, en px. */
export const RAIL_INSET = 34;

/**
 * Cierre. Las quince vuelven a reunirse alrededor del correo.
 *
 * Es un arco y no una retícula: la retícula ya la usó la portada, y repetirla
 * leería como volver al principio en vez de cerrar. El arco deja libre el
 * centro, que es donde va el contacto.
 */
export const CLOSING: UnitPos[] = Array.from({ length: 15 }, (_, i) => {
  // Semicírculo abierto hacia abajo, de -100° a +100°.
  const a = (-100 + (200 * i) / 14) * (Math.PI / 180);
  return {
    x: 0.5 + Math.sin(a) * 0.30,
    y: 0.52 - Math.cos(a) * 0.26,
    s: 1,
    z: 1,
  };
});

/** Posición de la unidad `i` en el riel, en fracciones del viewport. */
export function railPos(i: number, vw: number, vh: number, mobile: boolean): UnitPos {
  if (mobile) {
    // Riel horizontal al pie: en móvil una columna vertical de 15 marcas se
    // come el borde derecho, que es justo por donde se desliza el pulgar.
    const step = Math.min(RAIL_STEP, (vw * 0.86) / 15);
    const total = step * 15;
    const left = (vw - total) / 2;
    return { x: (left + step * (i + 0.5)) / vw, y: (vh - 30) / vh, s: 0.62, z: 1 };
  }
  const total = RAIL_STEP * 15;
  const top = (vh - total) / 2;
  return {
    x: (vw - RAIL_INSET) / vw,
    y: (top + RAIL_STEP * (i + 0.5)) / vh,
    s: 0.62,
    z: 1,
  };
}

/** Interpolación lineal entre dos posiciones. */
export function lerp(a: UnitPos, b: UnitPos, t: number): UnitPos {
  return {
    x: a.x + (b.x - a.x) * t,
    y: a.y + (b.y - a.y) * t,
    s: a.s + (b.s - a.s) * t,
    z: t > 0.5 ? b.z : a.z,
  };
}
