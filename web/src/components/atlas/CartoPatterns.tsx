/**
 * Biblioteca de patrones cartográficos en SVG.
 *
 * Todos usan `currentColor`, de modo que una capa hereda el acento de su
 * capítulo sin que el patrón tenga que conocerlo. La opacidad se controla desde
 * fuera, en el elemento que rellena.
 *
 * Se monta una sola vez por documento (`<CartoPatternDefs />` en el layout) y
 * las capas la referencian por id: `fill="url(#hatch-diagonal)"`. Repetir los
 * defs por lámina multiplicaría el DOM sin ganar nada.
 */

export const PATTERN_IDS = [
  'hatch-diagonal',
  'hatch-cross',
  'dots-regular',
  'dots-scattered',
  'parcel-grain',
  'water-waves',
  'crop-rows',
  'forest-abstract',
  'urban-fabric',
] as const;

export type PatternId = (typeof PATTERN_IDS)[number];

/** Etiqueta legible de cada patrón, para la leyenda y la página de laboratorio. */
export const PATTERN_LABELS: Record<PatternId, string> = {
  'hatch-diagonal': 'Diagonal fina',
  'hatch-cross': 'Diagonal cruzada',
  'dots-regular': 'Puntos regulares',
  'dots-scattered': 'Puntos dispersos',
  'parcel-grain': 'Grano de parcelas',
  'water-waves': 'Ondas de agua',
  'crop-rows': 'Líneas de cultivo',
  'forest-abstract': 'Bosque abstracto',
  'urban-fabric': 'Mancha urbana',
};

/** Referencia lista para usar en `fill` o `stroke`. */
export function pattern(id: PatternId): string {
  return `url(#${id})`;
}

export function CartoPatternDefs() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      width="0"
      height="0"
      style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }}
    >
      <defs>
        {/* Las líneas se mantienen en 0.8-1.2px a escala 1x. A 2x el patrón se
            repite al doble de densidad aparente y sigue legible. */}
        <pattern id="hatch-diagonal" width="6" height="6" patternUnits="userSpaceOnUse">
          <path d="M-1 1 L1 -1 M0 6 L6 0 M5 7 L7 5" stroke="currentColor" strokeWidth="0.8" fill="none" />
        </pattern>

        <pattern id="hatch-cross" width="7" height="7" patternUnits="userSpaceOnUse">
          <path d="M-1 1 L1 -1 M0 7 L7 0 M6 8 L8 6" stroke="currentColor" strokeWidth="0.8" fill="none" />
          <path d="M-1 6 L1 8 M0 1 L7 8 M6 -1 L8 1" stroke="currentColor" strokeWidth="0.8" fill="none" />
        </pattern>

        <pattern id="dots-regular" width="6" height="6" patternUnits="userSpaceOnUse">
          <circle cx="3" cy="3" r="0.9" fill="currentColor" />
        </pattern>

        {/* Dispersión fija, no aleatoria en tiempo de render: un patrón que
            cambia entre servidor y cliente provoca hidratación inconsistente. */}
        <pattern id="dots-scattered" width="24" height="24" patternUnits="userSpaceOnUse">
          <circle cx="3" cy="5" r="0.8" fill="currentColor" />
          <circle cx="14" cy="2" r="0.6" fill="currentColor" />
          <circle cx="20" cy="9" r="0.9" fill="currentColor" />
          <circle cx="8" cy="13" r="0.7" fill="currentColor" />
          <circle cx="18" cy="18" r="0.6" fill="currentColor" />
          <circle cx="5" cy="21" r="0.85" fill="currentColor" />
          <circle cx="12" cy="8" r="0.5" fill="currentColor" />
        </pattern>

        {/* Parcelas: retícula irregular que evoca el catastro agrícola. */}
        <pattern id="parcel-grain" width="16" height="16" patternUnits="userSpaceOnUse">
          <path
            d="M0 0 H16 M0 6 H10 M0 11 H16 M6 0 V16 M12 0 V7 M12 11 V16"
            stroke="currentColor"
            strokeWidth="0.8"
            fill="none"
          />
        </pattern>

        <pattern id="water-waves" width="14" height="8" patternUnits="userSpaceOnUse">
          <path
            d="M0 6 q3.5 -4 7 0 t7 0"
            stroke="currentColor"
            strokeWidth="0.9"
            fill="none"
          />
          <path
            d="M-7 2 q3.5 -4 7 0 t7 0 t7 0"
            stroke="currentColor"
            strokeWidth="0.9"
            fill="none"
            opacity="0.55"
          />
        </pattern>

        {/* Surcos: paralelas densas con una marca de linde cada tanto. */}
        <pattern id="crop-rows" width="10" height="10" patternUnits="userSpaceOnUse">
          <path d="M0 2 H10 M0 5 H10 M0 8 H10" stroke="currentColor" strokeWidth="0.8" fill="none" />
          <path d="M0 0 V10" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.6" />
        </pattern>

        <pattern id="forest-abstract" width="14" height="14" patternUnits="userSpaceOnUse">
          <path d="M3 11 v-3 M3 8 l-1.7 -2.4 M3 8 l1.7 -2.4 M3 5.6 l-1.3 -1.9 M3 5.6 l1.3 -1.9"
            stroke="currentColor" strokeWidth="0.8" fill="none" />
          <path d="M10 13.5 v-3 M10 10.5 l-1.7 -2.4 M10 10.5 l1.7 -2.4"
            stroke="currentColor" strokeWidth="0.8" fill="none" opacity="0.7" />
        </pattern>

        {/* Mancha urbana: manzanas de tamaño desigual, sin ninguna redonda. */}
        <pattern id="urban-fabric" width="12" height="12" patternUnits="userSpaceOnUse">
          <rect x="1" y="1" width="3.4" height="2.6" fill="currentColor" />
          <rect x="6" y="1.6" width="2.2" height="2.2" fill="currentColor" opacity="0.8" />
          <rect x="1.8" y="5.4" width="2.4" height="3.2" fill="currentColor" opacity="0.9" />
          <rect x="6.4" y="6" width="3.8" height="2.4" fill="currentColor" opacity="0.7" />
          <rect x="3.4" y="9.6" width="2.8" height="1.8" fill="currentColor" opacity="0.85" />
        </pattern>

        {/* Grano editorial. Un solo turbulence reutilizado por TextureOverlay:
            es el filtro más caro del sistema y no debe duplicarse. */}
        <filter id="editorial-grain" x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.82" numOctaves="3" seed="7" result="n" />
          <feColorMatrix in="n" type="saturate" values="0" />
        </filter>
      </defs>
    </svg>
  );
}
