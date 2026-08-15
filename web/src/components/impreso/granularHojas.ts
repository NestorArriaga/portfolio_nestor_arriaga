import { granularVisuals, type GranularVisual } from '@/content/granularVisuals';

/**
 * Secuencia impresa de GRANULAR.
 *
 * Antes las hojas del capítulo se decidían con una cadena —`'radar'`,
 * `'paisaje'`, `'loc-clas'`— dentro de un componente que resolvía sus activos
 * con `require()` en tiempo de render. Eso dejaba las composiciones fuera del
 * sistema de tipos: una vista mal escrita no fallaba, imprimía una hoja vacía.
 *
 * Aquí cada hoja declara **qué familia de página maestra es** y **qué material
 * lleva**. El sitio y el PDF leen el mismo registro de visuales, así que un pie,
 * una procedencia o una cautela no pueden divergir entre pantalla y papel.
 */

export type HojaGranular =
  /** Apertura regional: la caracterización y el índice de pilares. */
  | { clase: 'apertura' }
  /** Una figura dominante con su columna editorial. */
  | { clase: 'instrumento'; numero: string; titulo: string; visual: GranularVisual }
  /** Dos figuras comparables en el mismo encuadre. */
  | {
    clase: 'diptico'; numero: string; titulo: string;
    a: GranularVisual; b: GranularVisual; lectura: string;
  }
  /** Tres lecturas del mismo conjunto de datos, rotuladas. */
  | { clase: 'triptico'; numero: string; titulo: string; piezas: GranularVisual[]; lectura: string }
  /** Medición dibujada: sin ráster, con los valores documentados. */
  | { clase: 'medicion'; numero: string; titulo: string; visual: GranularVisual };

/**
 * Hojas propias de un pilar, además de sus láminas cartográficas.
 *
 * Los pilares que no aparecen aquí imprimen únicamente su lámina, que es lo que
 * la fuente les dedica.
 */
export const hojasGranular: Record<string, HojaGranular[]> = {
  // I · Agua — el radar abre el capítulo y los mapas quedan como evidencia.
  I: [
    {
      clase: 'instrumento',
      numero: 'I',
      titulo: 'Tensiones y políticas hídricas',
      visual: granularVisuals.aguaRadar,
    },
  ],

  // II · Agropecuario — díptico de paisajes y tríptico de estructura agrícola.
  II: [
    {
      clase: 'diptico',
      numero: 'II',
      titulo: 'Dos paisajes productivos',
      a: granularVisuals.paisajeAgricola,
      b: granularVisuals.paisajeAgropecuario,
      lectura: 'El mismo encuadre en dos estados: el paisaje agrícola y el'
        + ' paisaje agropecuario intensificado, tal como los esquematiza la fuente.',
    },
    {
      clase: 'triptico',
      numero: 'II',
      titulo: 'Estructura agrícola',
      piezas: [
        granularVisuals.cultivosFlujos,
        granularVisuals.cultivosConcentracion,
        granularVisuals.cultivosRed,
      ],
      lectura: 'Tres lecturas del mismo conjunto —cultivos y municipios en'
        + ' hectáreas—: el flujo entre unos y otros, la concentración por'
        + ' municipio y la red funcional.',
    },
  ],

  // VII · Clustering — localizar y clasificar; después medir y relacionar.
  VII: [
    {
      clase: 'diptico',
      numero: 'VII',
      titulo: 'Localizar y clasificar',
      a: granularVisuals.clusteringLoc,
      b: granularVisuals.clusteringCoropletico,
      lectura: 'La distribución de observaciones sobre el relieve y la'
        + ' clasificación municipal en tres grupos que resulta de ella.',
    },
    {
      clase: 'medicion',
      numero: 'VII',
      titulo: 'Medir y relacionar',
      visual: granularVisuals.clusteringRelaciones,
    },
  ],
};

/** Las hojas propias de un pilar, o ninguna. */
export function hojasDePilar(numero: string): HojaGranular[] {
  return hojasGranular[numero] ?? [];
}
