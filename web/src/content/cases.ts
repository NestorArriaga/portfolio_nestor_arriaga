/**
 * Dirección de arte de los quince casos.
 *
 * Un caso = un artefacto real dominante + un color de señal + una textura + un
 * gesto de movimiento. Este archivo fija esas cuatro decisiones para P01–P15 y
 * nada más; la composición vive en los componentes.
 *
 * Reglas que este archivo hace cumplir:
 *
 * - **Cero párrafos.** No hay campo `description`. Lo único escribible es
 *   `fragment`, de 3 a 8 palabras, y solo lo llevan cuatro casos: aquellos donde
 *   el salto de territorio no se entiende con la imagen sola.
 * - **Los datos salen del PDF.** Cada cifra de `facts` y cada rótulo de `legend`
 *   está impreso en la página que declara `pages`. No hay ninguno derivado,
 *   redondeado ni completado.
 * - **Los colores de leyenda salen del mapa.** Cuando una clave describe una
 *   clase de un ráster, su `color` es el que el ráster dibuja —medido por el
 *   pipeline en `dominant`—, no el acento de la familia. Una clave que declare
 *   otro tono describe un mapa que no es el que se ve.
 * - **El acento sí es de la paleta.** Es el color de la interfaz alrededor del
 *   mapa (líneas, número, riel), no una afirmación sobre el dato.
 */

export type Gesture =
  | 'trace'       // trazar un límite o una red con stroke-dashoffset
  | 'mask-reveal' // una máscara descubre una condición sobre el mismo encuadre
  | 'strata'      // separar capas en profundidad y volver a ensamblarlas
  | 'sweep'       // barrido comparativo entre dos estados
  | 'scope'       // una mira recorre ubicaciones verificadas
  | 'nodes'       // nodos que convergen en sus grupos reales
  | 'downstream'  // trazado en dirección aguas abajo
  | 'abrasion'    // máscara de abrasión
  | 'assemble';   // despiece y ensamblaje espacial

export type TextureKind =
  | 'grain'
  | 'photocopy'
  | 'hatch-agri'
  | 'limestone'
  | 'grid-method'
  | 'soil'
  | 'streamline'
  | 'paper';

/**
 * Familia temática. Es el segundo eje de filtrado de Vistazo, junto al
 * territorio: dos proyectos del mismo lugar pueden pertenecer a familias
 * distintas —P12 y P13 comparten Calvillo pero uno es suelo y el otro cuenca—,
 * y agrupar solo por territorio los mezclaría.
 */
export type Family =
  | 'urbano'
  | 'agricultura'
  | 'geomorfologia'
  | 'aptitud'
  | 'multiescalar'
  | 'paisaje';

export const FAMILY_LABEL: Record<Family, string> = {
  urbano: 'Urbano',
  agricultura: 'Agricultura y carbono',
  geomorfologia: 'Geomorfología',
  aptitud: 'Aptitud y cuenca',
  multiescalar: 'Multiescalar',
  paisaje: 'Paisaje y arquitectura',
};

export type LegendKey = {
  label: string;
  /** Color real con el que el mapa dibuja esta clase. */
  color: string;
  kind?: 'area' | 'line' | 'node';
  note?: string;
};

export type Case = {
  id: string;
  slug: string;
  /** Título oficial, tal como está impreso en el PDF. */
  title: string;
  /** Título corto del índice. */
  index: string;
  territoryId: string;
  family: Family;
  place: string;
  pages: number[];
  scale: string;

  /** Color de señal de la interfaz del caso. */
  accent: string;
  accent2?: string;
  surface: 'dark' | 'paper';
  texture: TextureKind;
  gesture: Gesture;

  /** Artefacto dominante: slug en plates-manifest o projects-manifest. */
  artifact: string;
  /** Piezas secundarias verificadas del mismo proyecto. */
  support?: string[];

  /** Claves de leyenda, con los rótulos y colores impresos en el PDF. */
  legend?: { title: string; keys: LegendKey[] }[];
  /** Cifras impresas en el PDF. */
  facts?: { label: string; value: string }[];
  /** 3–8 palabras. Solo donde la transición visual no funciona sin ellas. */
  fragment?: string;
  /** Coautoría impresa en la lámina. */
  credits?: string[];
  /** Fuente de los datos, cuando la lámina la acredita. */
  dataSource?: string;
  /**
   * Año real del proyecto.
   *
   * Opcional a propósito y hoy vacío en los quince: ni el PDF, ni el CSV, ni
   * los metadatos de las láminas registran la fecha de cada trabajo. La página
   * mostraba `2026` para todos, que es el año de edición del portafolio, no el
   * del proyecto. Donde no hay fuente, la fila `Año` no se dibuja.
   */
  year?: string;
};

/* ---------------------------------------------------------------------------
   P01 · Ciudad de México
   -------------------------------------------------------------------------- */

const p01: Case = {
  id: '01',
  slug: 'areas-verdes-miguel-hidalgo',
  title: 'Mapeo y Análisis de Áreas Verdes en la Alcaldía Miguel Hidalgo',
  index: 'Áreas verdes',
  territoryId: 'cdmx',
  family: 'urbano',
  place: 'Alcaldía Miguel Hidalgo',
  pages: [18, 19],
  scale: 'alcaldía',
  accent: 'var(--p01-verde)',
  surface: 'dark',
  texture: 'grain',
  gesture: 'trace',
  artifact: 'p01-areas-verdes',
  support: ['p01-colonias-grafica', 'cdmx-alcaldias'],
  legend: [
    {
      title: 'Áreas verdes',
      keys: [{ label: 'Áreas verdes', color: '#3cd63c' }],
    },
    {
      title: 'Reto verde',
      keys: [
        { label: 'Bosques Urbanos', color: '#dff5d8' },
        { label: 'Jornada Interinstitucional', color: '#b9e8ac' },
        { label: 'Pilares', color: '#8ade7c' },
        { label: 'Proyectos (Vialidades)', color: '#5bd155' },
        { label: 'Sembrando Parques', color: '#2eb84a' },
      ],
    },
    {
      title: 'Otras superficies',
      keys: [{ label: 'Áreas de valor ambiental', color: '#4bb6dd' }],
    },
  ],
  facts: [
    { label: 'Superficie de áreas verdes', value: '929 230.8 m²' },
    { label: 'Por habitante', value: '2.2 m²' },
    { label: 'De la superficie verde de la ciudad', value: '1.38 %' },
    { label: 'Habitantes', value: '417 416' },
  ],
  credits: [
    'Arriaga Gallegos Nestor Elihu',
    'Rivera Valdivia Isabella',
  ],
  // La lámina original no nombra el conjunto de datos, su año ni el portal del
  // que salió: sólo imprime el inventario y la población. Se describe lo que
  // hay y se declara lo que falta, en vez de atribuirlo a una institución
  // genérica que la fuente no menciona.
  dataSource: 'Inventario de áreas verdes y población de la Ciudad de México, '
    + 'según la lámina original del proyecto. Procedencia específica no indicada '
    + 'en la lámina original.',
};

/* ---------------------------------------------------------------------------
   P02–P04 · Cuenca de Decozalapa, Veracruz
   -------------------------------------------------------------------------- */

const p02: Case = {
  id: '02',
  slug: 'captura-de-carbono-decozalapa',
  title:
    'Mapeo de Captura de Carbono y Delimitación de Zonas Críticas en la Cuenca de Decozalapa',
  index: 'Captura de carbono',
  territoryId: 'veracruz',
  family: 'agricultura',
  place: 'Cuenca de Decozalapa, Veracruz',
  pages: [22],
  scale: 'cuenca',
  accent: 'var(--p02-carbono)',
  surface: 'dark',
  texture: 'grain',
  // Las 17 zonas críticas se midieron sobre la propia lámina y el conjunto
  // salió completo, así que se pueden animar como resultado. Ver
  // `scripts/build_marker_points.py`.
  gesture: 'nodes',
  artifact: 'p02-carbono',
  support: ['veracruz-foto', 'carbono-grafica'],
  legend: [
    {
      // Los ocho valores y su rampa están impresos en la leyenda de la lámina.
      title: 'Captura de carbono',
      keys: [
        { label: '0', color: '#fdf0ea' },
        { label: '30', color: '#fbdccf' },
        { label: '40', color: '#f7c3ae' },
        { label: '50', color: '#f2a58c' },
        { label: '60', color: '#e8836c' },
        { label: '70', color: '#d95f54' },
        { label: '80', color: '#c4404a' },
        { label: '90', color: '#a52b41' },
      ],
    },
    {
      title: 'Zonas críticas',
      keys: [{ label: 'Punto crítico', color: '#111111', kind: 'node' }],
    },
  ],
};

const p03: Case = {
  id: '03',
  slug: 'zonas-optimas-limon-cafe',
  title:
    'Análisis de Zonas Óptimas para el Cultivo de Limón y Café en la Cuenca de Decozalapa',
  index: 'Zonas óptimas, limón y café',
  territoryId: 'veracruz',
  family: 'agricultura',
  place: 'Cuenca de Decozalapa, Veracruz',
  pages: [23],
  scale: 'cuenca',
  accent: 'var(--p03-cafe)',
  accent2: 'var(--p04-cultivo)',
  surface: 'dark',
  texture: 'hatch-agri',
  // Sus 14 zonas óptimas sí se miden completas —medidas sobre el original del
  // PDF, no sobre el WebP reescalado— y se dibujan como marcadores.
  //
  // El gesto, en cambio, no es `nodes` sino máscara, y a propósito: P02 va
  // justo antes y ya converge nodos sobre un campo rojo. Dos casos seguidos
  // con el mismo reveal y la misma familia de color se leen como el mismo
  // proyecto repetido. Aquí la máscara descubre las dos clases de cultivo y
  // los marcadores entran encima como dato, no como coreografía.
  gesture: 'mask-reveal',
  artifact: 'p03-zonas-optimas',
  support: ['glyph-cafe'],
  legend: [
    {
      title: 'Cultivo',
      keys: [
        { label: 'Cultivo de limón', color: '#6cf06c' },
        { label: 'Cultivo de café', color: '#3d2f1f' },
      ],
    },
    {
      title: 'Zonificación',
      keys: [{ label: 'Zona óptima', color: '#111111', kind: 'node' }],
    },
  ],
  // La p.23 une la cifra al glifo del café con un conector dibujado, y el
  // rótulo compartido dice qué mide: la distribución potencial del cultivo.
  // No es la superficie de la cuenca, que es lo que este dato decía antes.
  facts: [{ label: 'Distribución potencial del cultivo de café', value: '924.5 km²' }],
  dataSource: 'CONABIO',
};

const p04: Case = {
  id: '04',
  slug: 'uso-optimo-de-suelo-limon-cafe',
  title:
    'Análisis de Uso Óptimo de Suelo para el Cultivo de Limón y Café en la Cuenca de Decozalapa',
  index: 'Uso óptimo de suelo',
  territoryId: 'veracruz',
  family: 'agricultura',
  place: 'Cuenca de Decozalapa, Veracruz',
  pages: [24],
  scale: 'cuenca',
  accent: 'var(--p04-cultivo)',
  accent2: 'var(--p03-cafe)',
  surface: 'dark',
  texture: 'hatch-agri',
  // La lámina de P04 llega como una sola composición: no existen las capas
  // "uso actual" y "uso óptimo" por separado, así que no se finge un
  // comparador. El barrido ocurre entre P03 y P04, que sí son dos estados
  // reales del mismo encuadre.
  gesture: 'sweep',
  artifact: 'p04-uso-optimo',
  support: ['p03-zonas-optimas', 'glyph-agricultura'],
};

/* ---------------------------------------------------------------------------
   P05–P08 · Reserva de la Biosfera de Metztitlán, Hidalgo
   -------------------------------------------------------------------------- */

const p05: Case = {
  id: '05',
  slug: 'geomorfologia-metztitlan',
  title:
    'Análisis Geomorfológico de la Reserva de la Biosfera en Metztitlán, Hidalgo: Caracterización y Evaluación de las Formas del Terreno',
  index: 'Geomorfología',
  territoryId: 'hidalgo',
  family: 'geomorfologia',
  place: 'Reserva de la Biosfera, Hidalgo',
  pages: [25, 26],
  scale: 'reserva',
  accent: 'var(--p05-mineral)',
  accent2: 'var(--p05-registro)',
  surface: 'paper',
  texture: 'limestone',
  gesture: 'strata',
  artifact: 'p05-geomorfones',
  support: ['metz-apertura', 'glyph-geoformas'],
  // Sin leyenda: la p.26 no imprime ninguna.
  //
  // Aquí había una de dos claves de color, y las dos estaban mal. La página no
  // rotula colores por patrón —muestra tres detalles circulares del ráster,
  // cada uno unido por una línea a su descripción—, así que aquellos #c56ac9 y
  // #d6dd6f eran tonos dominantes de la lámina presentados como clave. Y los
  // patrones descritos son tres, no dos: faltaba el tercero entero.
  //
  // Van como datos, que es lo que son: el nombre de cada patrón y las geoformas
  // que lo componen, tal como la p.26 los enumera.
  facts: [
    { label: 'Primer patrón', value: 'Cima + Cresta + Espolón' },
    { label: 'Segundo patrón', value: 'Depresión + Valle + Hondonada' },
    { label: 'Tercer patrón', value: 'Hondonada + Pie de Monte + Valle + Depresión' },
  ],
  fragment: 'Aquí cambió la escala.',
};

const p06: Case = {
  id: '06',
  slug: 'zonas-ecologicas-metztitlan',
  title:
    'Reclasificación de Uso de Suelo y Vegetación para Determinar Zonas Ecológicas en la Reserva de la Biosfera en Metztitlán, Hidalgo',
  index: 'Zonas ecológicas',
  territoryId: 'hidalgo',
  family: 'geomorfologia',
  place: 'Reserva de la Biosfera, Hidalgo',
  pages: [27],
  scale: 'reserva',
  accent: 'var(--p05-mineral)',
  surface: 'paper',
  texture: 'photocopy',
  gesture: 'sweep',
  artifact: 'p06-zonas-ecologicas',
  support: ['glyph-uso-suelo'],
  legend: [
    {
      // Las siete unidades y sus colores están impresos en la leyenda de la
      // p.27. Cada hex está muestreado de su propia muestra en esa leyenda.
      //
      // Los valores anteriores no correspondían: emparejaban naranja con Áreas
      // de Exclusión, amarillo con Zona Árida, cian con Cálida Subhúmeda... la
      // serie entera corrida respecto a la impresa. Un mapa con esta leyenda
      // habría contradicho a su propio ráster en las siete clases.
      title: 'Zonas ecológicas',
      keys: [
        { label: 'Áreas de Exclusión', color: '#6fcbcf' },
        { label: 'Zona Árida', color: '#a04e52' },
        { label: 'Zona Cálida Subhúmeda', color: '#24408f' },
        { label: 'Zona Desértica', color: '#6bbf57' },
        { label: 'Zona Semiárida', color: '#febe2b' },
        { label: 'Zona Templada Húmeda', color: '#5d489d' },
        { label: 'Zona Templada Subhúmeda', color: '#73c380' },
      ],
    },
  ],
};

const p07: Case = {
  id: '07',
  slug: 'pendiente-metztitlan',
  title:
    'Cálculo de Pendiente en 4 Intervalos para la Reserva de la Biosfera en Metztitlán, Hidalgo',
  index: 'Pendiente en cuatro intervalos',
  territoryId: 'hidalgo',
  family: 'geomorfologia',
  place: 'Reserva de la Biosfera, Hidalgo',
  pages: [28],
  scale: 'reserva',
  accent: 'var(--p05-registro)',
  surface: 'paper',
  texture: 'limestone',
  gesture: 'strata',
  artifact: 'p07-pendiente',
  support: ['p07-pendiente-grafica', 'metz-pendiente-perfil'],
  legend: [
    {
      // La p.28 no imprime una leyenda de muestras: dibuja un perfil de cuatro
      // bandas apiladas y lleva cada rótulo a su banda con una línea de
      // llamada. El color de cada intervalo se muestrea del trazo superior de
      // la banda donde termina su línea.
      //
      // 0–10 % y 25–50 % estaban intercambiados. Seguir el orden intuitivo
      // —lo suave abajo, lo escarpado arriba— contradice el dibujo: la línea
      // de 25–50 % baja hasta la banda verde del fondo y la de 0–10 % apunta
      // a la morada, justo debajo del negro.
      title: 'Pendiente',
      keys: [
        { label: '0 – 10 %', color: '#9c76b3' },
        { label: '10 – 25 %', color: '#2f679e' },
        { label: '25 – 50 %', color: '#7ec9a1' },
        { label: '> 50 %', color: '#00020c' },
      ],
    },
  ],
};

const p08: Case = {
  id: '08',
  slug: 'patrones-geomorfologicos',
  title:
    'Análisis de Patrones Geomorfológicos en la Selección de Geomorfones Representativos',
  index: 'Patrones geomorfológicos',
  territoryId: 'hidalgo',
  family: 'geomorfologia',
  place: 'Reserva de la Biosfera, Hidalgo',
  pages: [29],
  scale: 'reserva',
  accent: 'var(--p05-registro)',
  surface: 'paper',
  texture: 'photocopy',
  gesture: 'scope',
  artifact: 'p08-patrones',
  legend: [
    {
      title: 'Selección',
      keys: [
        { label: 'Geomorfón representativo', color: '#e03a2f', kind: 'node' },
      ],
    },
  ],
};

/* ---------------------------------------------------------------------------
   P09–P13 · Aguascalientes y Calvillo
   -------------------------------------------------------------------------- */

const p09: Case = {
  id: '09',
  slug: 'vocaciones-productivas-aguascalientes',
  title:
    'Análisis de Clúster para la Identificación de Vocaciones Productivas en el Estado de Aguascalientes',
  index: 'Vocaciones productivas',
  territoryId: 'aguascalientes',
  family: 'aptitud',
  place: 'Aguascalientes',
  pages: [32, 33],
  scale: 'estado',
  accent: 'var(--p09-verde)',
  accent2: '#c8792f',
  surface: 'dark',
  texture: 'grid-method',
  gesture: 'nodes',
  artifact: 'p09-vocaciones',
  legend: [
    {
      // Los dos clústeres, su lectura y sus muestras están impresos en la
      // p.33. Los hex salen de esas muestras: los de antes eran versiones
      // apagadas de memoria, no los del mapa.
      title: 'Clúster municipal',
      keys: [
        { label: 'Orientado a la conservación', color: '#30823f' },
        { label: 'Orientado a la agricultura', color: '#d65e27' },
      ],
    },
  ],
  fragment: 'Quise ver qué conectaba.',
};

const p10: Case = {
  id: '10',
  slug: 'aptitud-conservacion',
  title:
    'Mapa de Aptitud para la Conservación como parte del informe “Propuestas Metodológicas para la Planeación del Desarrollo Rural con Enfoque Territorial”',
  index: 'Aptitud para conservación',
  territoryId: 'aguascalientes',
  family: 'aptitud',
  place: 'Aguascalientes',
  pages: [34, 35],
  scale: 'estado',
  accent: 'var(--p09-verde)',
  surface: 'dark',
  texture: 'grid-method',
  gesture: 'strata',
  artifact: 'p10-conservacion',
  support: ['slab-1', 'slab-2', 'slab-3'],
  legend: [
    {
      // Muestreado de la leyenda impresa de la p.34.
      title: 'Aptitud del sector de conservación',
      keys: [
        { label: 'Nulo', color: '#f0f0f0' },
        { label: 'Medio', color: '#4ab85f' },
        { label: 'Alto', color: '#0c562c' },
      ],
    },
  ],
  // Pesos impresos en la tabla "Atributos del Sector de Conservación", p.35.
  facts: [
    { label: 'Tipo de cobertura del suelo', value: '0.25' },
    { label: 'Función hidrológica forestal', value: '0.25' },
    { label: 'Fragilidad del ecosistema', value: '0.20' },
    { label: 'Pendiente del terreno', value: '0.15' },
    { label: 'Distancia a áreas inundables', value: '0.15' },
  ],
};

const p11: Case = {
  id: '11',
  slug: 'aptitud-agricola',
  title:
    'Mapa de Aptitud Agrícola como parte del informe “Propuestas Metodológicas para la Planeación del Desarrollo Rural con Enfoque Territorial”',
  index: 'Aptitud agrícola',
  territoryId: 'aguascalientes',
  family: 'aptitud',
  place: 'Aguascalientes',
  pages: [36, 37],
  scale: 'estado',
  accent: 'var(--p09-rojo)',
  surface: 'dark',
  texture: 'grid-method',
  gesture: 'mask-reveal',
  artifact: 'p11-agricola',
  support: ['p10-conservacion', 'slab-4', 'slab-5', 'slab-6'],
  legend: [
    {
      // Muestreado de la leyenda impresa de la p.37. `Nulo` es el mismo
      // blanco que en P10 —las dos láminas comparten la clase vacía—, no el
      // crema que declaraba antes.
      title: 'Aptitud del sector agrícola',
      keys: [
        { label: 'Nulo', color: '#f0f0f0' },
        { label: 'Medio', color: '#f8982d' },
        { label: 'Alto', color: '#d65e27' },
      ],
    },
  ],
  // Pesos impresos en la tabla "Atributos del Sector Agrícola", p.36.
  facts: [
    { label: 'Tipo de cobertura del suelo', value: '0.25' },
    { label: 'Proximidad a cuerpos de agua', value: '0.20' },
    { label: 'Tipo de suelo', value: '0.20' },
    { label: 'Pendiente del terreno', value: '0.15' },
    { label: 'Distancia a áreas inundables', value: '0.15' },
    { label: 'Susceptibilidad a la erosión', value: '0.05' },
  ],
  dataSource: 'SEMARNAT (2015)',
};

const p12: Case = {
  id: '12',
  slug: 'degradacion-del-suelo-calvillo',
  title:
    'Análisis de Degradación del Suelo en Calvillo, Aguascalientes, para un Plan Integral de Manejo Ganadero',
  index: 'Degradación del suelo',
  territoryId: 'aguascalientes',
  family: 'aptitud',
  place: 'Calvillo, Aguascalientes',
  pages: [38],
  scale: 'municipio',
  accent: '#e0246a',
  surface: 'dark',
  texture: 'soil',
  gesture: 'abrasion',
  artifact: 'p12-degradacion',
  support: ['p12-suelo-foto', 'calvillo-foto'],
};

const p13: Case = {
  id: '13',
  slug: 'subcuencas-y-rios-calvillo',
  title:
    'Delimitación de Subcuencas e Identificación de Ríos para un Plan Integral de Manejo Ganadero en Calvillo, Aguascalientes',
  index: 'Subcuencas y ríos',
  territoryId: 'aguascalientes',
  family: 'aptitud',
  place: 'Calvillo, Aguascalientes',
  pages: [39],
  scale: 'municipio',
  accent: 'var(--p09-agua)',
  surface: 'dark',
  texture: 'streamline',
  gesture: 'downstream',
  artifact: 'p13-subcuencas',
  support: ['calvillo-subcuencas'],
  fragment: 'Seguí el agua.',
};

/* ---------------------------------------------------------------------------
   P14 · Comarca Lagunera — el caso ya construido
   -------------------------------------------------------------------------- */

const p14: Case = {
  id: '14',
  slug: 'granular',
  title:
    'Tipologías rurales situadas: análisis territorial multiescalar en la Comarca Lagunera',
  index: 'GRANULAR',
  territoryId: 'comarca',
  family: 'multiescalar',
  place: 'Comarca Lagunera, Coahuila – Durango',
  pages: [21, 40],
  scale: 'multiescalar',
  // Gobernanza y no conectividad: el rojo de conectividad (#ff3b4d) es el mismo
  // valor exacto que `--p02-carbono`, así que en el índice P02 y P14 salían con
  // el mismo filete y dejaban de distinguirse. El violeta sigue siendo de la
  // paleta de GRANULAR y no lo repite nadie.
  accent: 'var(--g-gobernanza)',
  surface: 'dark',
  texture: 'grain',
  gesture: 'trace',
  // P14 no se compone aquí: tiene sus siete pilares en /granular/[pilar]. Esta
  // entrada existe para que el índice y las transiciones lo traten igual que a
  // los demás, no para resumirlo en una portada.
  artifact: 'comarca-base-conectividad',
};

/* ---------------------------------------------------------------------------
   P15 · Mérida — Urban Challenge
   -------------------------------------------------------------------------- */

const p15: Case = {
  id: '15',
  slug: 'urban-challenge-merida',
  title: 'Urban Challenge SEDATU × GIZ',
  index: 'Urban Challenge',
  territoryId: 'merida',
  family: 'paisaje',
  place: 'Mérida, Yucatán',
  pages: [41, 45],
  scale: 'parque',
  accent: 'var(--p15-bosque)',
  accent2: 'var(--p15-madera)',
  surface: 'paper',
  texture: 'paper',
  gesture: 'assemble',
  artifact: 'dise-o-parque-yuc',
};

export const cases: Case[] = [
  p01, p02, p03, p04, p05, p06, p07, p08, p09, p10, p11, p12, p13, p14, p15,
];

export function getCase(id: string): Case | undefined {
  return cases.find((c) => c.id === id);
}

export function getCaseBySlug(slug: string): Case | undefined {
  return cases.find((c) => c.slug === slug);
}

/** Caso anterior y siguiente, para la transición de salida. */
export function neighbours(id: string): { prev?: Case; next?: Case } {
  const i = cases.findIndex((c) => c.id === id);
  if (i < 0) return {};
  return { prev: cases[i - 1], next: cases[i + 1] };
}
