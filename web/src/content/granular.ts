/**
 * GRANULAR — contenido factual de los pilares.
 *
 * Todo procede de las páginas 21–40 del PDF. Se conserva el registro de
 * limitaciones tal como estaba levantado: cuando la fuente no documenta un
 * parámetro, una temporalidad o un criterio, el vacío se declara en vez de
 * rellenarse.
 *
 * `LayerRef.color` no se escribe a mano: se toma del color con el que la capa
 * está realmente dibujada, vía `layerColor()`. Un ráster no se puede recolorear
 * desde CSS, así que una clave con otro tono describiría un mapa distinto.
 */

export type LayerRef = {
  /** Slug del archivo en el manifiesto del atlas. */
  slug: string;
  layer?: number;
  label: string;
  note?: string;
  opacity?: number;
  blend?: 'screen' | 'multiply' | 'normal';
};

export type Category = {
  name: string;
  range?: string;
  desc: string;
  /** Advertencia cuando la categoría aparece en la leyenda pero no en el texto. */
  warning?: string;
};

export type Pillar = {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  pages: number[];
  accentVar: string;
  intro: { title: string; paragraphs: string[] };
  variables: string[];
  plates: {
    id: string;
    title: string;
    subtitle: string;
    page: number;
    caption: string;
    sourceNote?: string;
    /** Base opcional bajo las capas temáticas. */
    base?: LayerRef;
    layers: LayerRef[];
    categories?: Category[];
    reading?: string;
  }[];
  facts?: { label: string; value: string; note?: string }[];
  limitations: { title: string; text: string; points: string[] };
  next: { number: string; title: string; desc: string };
};

export const granularProject = {
  id: '14',
  title: 'Tipologías rurales situadas',
  subtitle: 'Análisis territorial multiescalar en la Comarca Lagunera',
  territory: 'Comarca Lagunera',
  region: 'Coahuila – Durango',
  pages: [21, 40],
};

export const pillars: Pillar[] = [
  {
    id: 'agua',
    number: 'I',
    title: 'Agua',
    subtitle: 'El eje estructurante del territorio',
    pages: [22, 24],
    accentVar: 'var(--g-agua)',
    intro: {
      title: 'Un recurso que organiza el territorio',
      paragraphs: [
        'En la Comarca Lagunera, el portafolio presenta el agua como una dimensión que atraviesa la producción, las condiciones ambientales y las relaciones sociales. Su disponibilidad, calidad y distribución condicionan tanto la agricultura como la viabilidad urbana y rural.',
        'El análisis considera que el agua puede operar simultáneamente como soporte productivo y como fuente de vulnerabilidad ambiental y social.',
        'Esta doble condición organiza el capítulo: primero se observa la calidad del recurso y después la presión territorial sobre los acuíferos.',
      ],
    },
    variables: ['Disponibilidad', 'Calidad', 'Distribución', 'Uso agrícola'],
    plates: [
      {
        id: 'calidad',
        title: 'Calidad del agua',
        subtitle: 'Patrones y severidad',
        page: 23,
        caption:
          'Mapa de calidad del agua en la Comarca Lagunera con categorías de severidad Alto, Medio, Bajo y Sin riesgo aparente.',
        sourceNote:
          'Fuente no identificada de forma explícita en la composición del portafolio.',
        layers: [
          { slug: 'calidad-agua-total', label: 'Calidad del agua', note: 'puntos de muestreo por severidad' },
        ],
        categories: [
          { name: 'Alto', desc: 'El texto lo relaciona con núcleos contaminados y con pozos agrícolas de uso intensivo, usando Torreón y Gómez Palacio como ejemplos.' },
          { name: 'Medio', desc: 'Zonas periurbanas, extracción dispersa y presencia intermitente de bacterias y nitratos.' },
          { name: 'Bajo', desc: 'Localidades periféricas y menor presión hídrica. El texto aclara que no están libres de riesgo.' },
          { name: 'Sin riesgo aparente', desc: 'Categoría visible en la leyenda original.', warning: 'La página no desarrolla su definición ni sus criterios.' },
        ],
        reading:
          'La lectura del portafolio concentra su atención en la franja central de La Laguna y la interpreta como un espacio donde presión hídrica, actividad agrícola y calidad del agua se superponen. La composición no documenta en esta página un análisis causal, temporal ni estadístico que permita atribuir cada patrón a una sola fuente.',
      },
      {
        id: 'acuiferos',
        title: 'Estado de los acuíferos',
        subtitle: 'Extracción frente a recarga',
        page: 24,
        caption:
          'Mapa del estado de los acuíferos de la Comarca Lagunera con las categorías Crítico, Límite, Sobreexplotado y Sostenible.',
        sourceNote:
          'El texto se refiere a un balance oficial de recarga–descarga, sin que la institución o la referencia completa sean legibles en la composición.',
        layers: [
          { slug: 'acuiferos-total', label: 'Estado de los acuíferos', note: 'balance extracción / recarga' },
        ],
        categories: [
          { name: 'Crítico', range: '>100 % de extracción', desc: 'Sectores del oriente de Durango, con San Juan de Guadalupe y Mapimí como ejemplos, y déficits que superan el 150 % respecto a la recarga.' },
          { name: 'Sobreexplotado', range: '100–120 %', desc: 'Incluye el acuífero Principal-Región Lagunera, con Torreón y Gómez Palacio como ejemplos de concentración de pozos urbanos y agrícolas.' },
          { name: 'Límite', range: '≈ 80–100 %', desc: 'Zonas de Nazas y Santa Clara.' },
          { name: 'Sostenible', range: '<80 %', desc: 'Áreas periféricas descritas como cada vez más escasas y con menor densidad de riego.' },
        ],
        reading:
          'La interpretación describe una presión escalonada: el centro metropolitano y agroindustrial se relaciona con acuíferos sobreexplotados, mientras distintas áreas periféricas aparecen asociadas con condiciones de límite o criticidad. La página no muestra una medición directa de vulnerabilidad social ni un modelo causal que cuantifique estas relaciones.',
      },
    ],
    limitations: {
      title: 'Alcance documentado',
      text:
        'La versión web conserva categorías, ejemplos y afirmaciones presentes en las páginas 22–24. Cuando la fuente no documenta parámetros, temporalidad o criterios de clasificación, esos vacíos permanecen explícitos y no se completan con información externa.',
      points: [
        'No se muestran concentraciones, unidades, fechas ni número total de pozos.',
        'No se detalla el método de muestreo ni el procedimiento de clasificación.',
        'No se presenta un balance volumétrico completo ni una serie temporal.',
        'Existe discrepancia en el número de niveles de calidad del agua entre texto y leyenda.',
        'Existe superposición textual en los rangos de acuíferos.',
        'Algunas afirmaciones son interpretativas y no proceden de causalidad comprobada.',
      ],
    },
    next: {
      number: 'II',
      title: 'Agropecuario',
      desc:
        'El sistema productivo depende de la disponibilidad y distribución del agua. El siguiente capítulo observa agricultura de riego y temporal, estructura de cultivos, vulnerabilidad a la sequía y localidades agroproductivas.',
    },
  },

  {
    id: 'agropecuario',
    number: 'II',
    title: 'Agropecuario',
    subtitle: 'El sistema productivo y sus dependencias territoriales',
    pages: [25, 29],
    accentVar: 'var(--g-agro)',
    intro: {
      title: 'Un sistema productivo organizado por el agua',
      paragraphs: [
        'El portafolio presenta la agricultura de la Comarca Lagunera como un sistema profundamente relacionado con el acceso al riego, la estructura de cultivos y la infraestructura territorial.',
        'La modalidad de producción, la especialización municipal y la exposición a la sequía generan configuraciones agrícolas distintas dentro de la región.',
        'El capítulo avanza desde la escala regional y municipal hacia la escala de localidad para observar cómo la productividad se concentra de manera desigual.',
      ],
    },
    variables: ['Riego', 'Temporal', 'Cultivos', 'Sequía', 'Localidades'],
    plates: [
      {
        id: 'modalidades',
        title: 'Dos modalidades',
        subtitle: 'Dos configuraciones territoriales',
        page: 26,
        caption:
          'Agricultura de riego y de temporal en la Comarca Lagunera, con las superficies consignadas en la página fuente.',
        layers: [
          { slug: 'agricultura-riego', label: 'Agricultura de riego', note: '366,912 ha' },
          { slug: 'agricultura-temporal', label: 'Agricultura de temporal', note: '135,541 ha' },
        ],
        reading:
          'El texto asocia San Pedro, Francisco I. Madero y Matamoros al riego y a la estructura productiva principal; y Simón Bolívar, Nazas y San Juan de Guadalupe al temporal, descritos como espacios de mayor vulnerabilidad climática.',
      },
      {
        id: 'sequia',
        title: 'Vulnerabilidad a la sequía',
        subtitle: 'Cinco categorías',
        page: 28,
        caption:
          'Mapa de vulnerabilidad a la sequía en la Comarca Lagunera con cinco categorías visibles en la leyenda.',
        layers: [
          { slug: 'vulnerabilidad-sequia', label: 'Vulnerabilidad a la sequía' },
        ],
        reading:
          'La exposición a la sequía se distribuye de forma desigual y el portafolio la vincula con la modalidad de producción: el temporal aparece asociado a las categorías más altas.',
      },
    ],
    facts: [
      { label: 'Superficie de riego', value: '366,912 ha', note: 'consignada en la página 26' },
      { label: 'Superficie de temporal', value: '135,541 ha', note: 'consignada en la página 26' },
      { label: 'Forrajes bajo riego', value: 'más del 70 %', note: 'sobre todo maíz y avena' },
      { label: 'Cultivos alimentarios directos', value: 'menos del 10 %', note: 'trigo, hortalizas y maíz grano' },
    ],
    limitations: {
      title: 'Alcance documentado',
      text:
        'La versión web conserva las superficies, porcentajes y ejemplos de las páginas 25–29. La “paradoja hídrica” es una lectura del portafolio, no un resultado calculado en esas páginas.',
      points: [
        'La página no presenta un balance de consumo de agua por cultivo.',
        'No se documenta producción pecuaria, disponibilidad ni seguridad alimentaria junto a la afirmación.',
        'La expresión “alimentar vacas, no personas” es una crítica del autor, no un dato.',
        'La clasificación municipal en forrajeros, algodoneros, de transición y metropolitanos es interpretativa.',
      ],
    },
    next: {
      number: 'III',
      title: 'Gobernanza',
      desc:
        'Tras el agua y la estructura productiva, el capítulo siguiente observa las escalas institucionales y los territorios de gobernanza.',
    },
  },
];

export function getPillar(id: string): Pillar | undefined {
  return pillars.find((p) => p.id === id);
}
