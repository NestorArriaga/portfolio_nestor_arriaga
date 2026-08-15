/**
 * GRANULAR · clustering — cifras documentadas de la clasificación municipal.
 *
 * Una sola fuente para el sitio y para el PDF. Los valores son los que imprime
 * la composición original: tres grupos sobre catorce municipios clasificados de
 * los quince que componen la Comarca. El porcentaje **no se escribe a mano**, se
 * calcula desde el conteo, así que no puede desalinearse con él.
 *
 * Los nombres largos son los que la página VII de la fuente usa al describir
 * cada grupo. La fuente varía esos nombres entre páginas y no los presenta como
 * una jerarquía causal; por eso el rótulo corto —C1, C2, C3— es el que manda en
 * mapa, gráfica y diagrama.
 */

export type GrupoClustering = {
  /** Rótulo corto, el que aparece en el mapa y en la gráfica. */
  clave: string;
  nombre: string;
  municipios: number;
  /** Color de dato de la composición original. */
  color: string;
  lectura: string;
};

/*
 * Los colores no se eligen: se leen de la leyenda del mapa `Tipología funcional
 * – Municipios`, que declara «paleta cyan/magenta/amarillo» y dibuja C1 en
 * cian, C2 en magenta y C3 en ámbar. Con otra terna la leyenda del sitio
 * describiría un mapa que no es el que se muestra.
 */
export const clusteringGrupos: GrupoClustering[] = [
  {
    clave: 'C1',
    nombre: 'Núcleo agroindustrial',
    municipios: 7,
    color: '#00c5e0',
    lectura:
      'La fuente lo describe como el conjunto más integrado, con la mayor densidad'
      + ' de interacciones y el peso del corredor metropolitano.',
  },
  {
    clave: 'C2',
    nombre: 'Intermedio de transición',
    municipios: 4,
    color: '#e51c69',
    lectura: 'La página lo describe como una bisagra entre los núcleos y las periferias.',
  },
  {
    clave: 'C3',
    nombre: 'Periferia vulnerable',
    municipios: 3,
    color: '#efc518',
    lectura:
      'Caracterizados por la fuente como los municipios más aislados, marginados'
      + ' y ambientalmente frágiles.',
  },
];

/** Municipios clasificados. Sale del conteo, no de una cifra escrita aparte. */
export const clusteringClasificados = clusteringGrupos
  .reduce((a, g) => a + g.municipios, 0);

/** Municipios que componen la Comarca según la caracterización regional. */
export const comarcaMunicipios = 15;

/** Proporción de un grupo sobre el total clasificado, en tanto por ciento. */
export function clusteringPorcentaje(g: GrupoClustering): number {
  return (g.municipios / clusteringClasificados) * 100;
}

/** Método declarado por los diagramas complementarios de la fuente. */
export const clusteringMetodo = [
  'K = 3',
  'Ward.D2',
  'distancia euclídea',
  'validación PAM',
  'estandarización',
];
