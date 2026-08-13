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
    /**
     * `stack` superpone las capas sobre un mismo encuadre. `compare` las pone
     * una al lado de otra.
     *
     * Apilar solo es honesto cuando las capas superiores tienen transparencia.
     * Las tres clases de commuting traen cada una su propia base satelital
     * opaca: superpuestas, la de arriba tapa a las otras dos y la leyenda
     * prometería tres capas mostrando una.
     */
    mode?: 'stack' | 'compare';
    categories?: Category[];
    /** Municipios que el texto de la fuente menciona por nombre. */
    highlightMunicipios?: string[];
    reading?: string;
  }[];
  facts?: { label: string; value: string; note?: string }[];
  /** Ciclo de flujo del capítulo, cuando la fuente lo documenta como tal. */
  cycle?: {
    title: string;
    page: number;
    nodes: { label: string }[];
    caption: string;
    reading: string;
    disclaimer: string;
  };
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
        highlightMunicipios: ['Torreón', 'Gómez Palacio'],
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
        highlightMunicipios: ['San Juan de Guadalupe', 'Mapimí', 'Torreón', 'Gómez Palacio', 'Nazas', 'Santa Clara'],
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
    cycle: {
      title: 'La paradoja hídrica',
      page: 27,
      // Los cuatro términos y el sentido del ciclo vienen del diagrama radial
      // de la página 27. La circunferencia solo los ordena.
      nodes: [
        { label: 'Agua' },
        { label: 'Forrajes' },
        { label: 'Vacas' },
        { label: 'Leche' },
      ],
      caption: 'Diagrama radial de la página 27, reconstruido con texto real.',
      reading:
        'A partir del peso de los forrajes dentro de la superficie bajo riego, la página formula una crítica al destino productivo del agua y utiliza la expresión «alimentar vacas, no personas». La narrativa interpreta este patrón como una contradicción entre alta productividad agroindustrial, presión hídrica y producción directa de alimentos.',
      disclaimer:
        'La página no presenta junto a esta afirmación un balance de consumo de agua por cultivo, producción pecuaria, disponibilidad alimentaria ni seguridad alimentaria. La expresión entrecomillada es del autor, no un resultado calculado.',
    },
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

  {
    id: 'gobernanza',
    number: 'III',
    title: 'Gobernanza',
    subtitle: 'Instituciones, normas y poder territorial',
    pages: [30, 31],
    accentVar: 'var(--g-gobernanza)',
    intro: {
      title: 'Decidir sobre un mismo territorio',
      paragraphs: [
        'La gobernanza territorial se presenta como el conjunto de instituciones, normas y actores que intervienen en la gestión del territorio y de sus recursos.',
        'El análisis destaca una superposición de escalas de decisión —ejidos, municipios, estados y federación— que pueden operar mediante marcos normativos fragmentados o contradictorios.',
        'El pilar relaciona estas configuraciones con la distribución de recursos, la gestión del agua, la regulación de la actividad agropecuaria y la capacidad de las comunidades para incidir en decisiones territoriales.',
      ],
    },
    variables: ['Ejidos', 'Municipios', 'Estados', 'Federación'],
    plates: [
      {
        id: 'anp-rtp',
        title: 'Áreas protegidas y regiones prioritarias',
        subtitle: 'Dos figuras que no son equivalentes',
        page: 31,
        caption:
          'Reserva de la Biósfera de Mapimí y Regiones Terrestres Prioritarias sobre la Comarca Lagunera.',
        sourceNote:
          'ANP y RTP no son categorías jurídicas equivalentes. La página no documenta normas específicas ni competencias institucionales.',
        mode: 'compare',
        layers: [
          { slug: 'anp', label: 'Áreas Naturales Protegidas', note: '14 154 elementos' },
          { slug: 'rtp', label: 'Regiones Terrestres Prioritarias', note: '14 674 elementos' },
        ],
        categories: [
          { name: 'Cuchillas de la Zarca', desc: 'Nazas, San Luis del Cordero.' },
          { name: 'Mapimí', desc: 'Vinculada directamente con la Reserva de la Biósfera.' },
          { name: 'Sierra La Fragua', desc: 'Francisco I. Madero.' },
        ],
        highlightMunicipios: ['Nazas', 'San Luis del Cordero', 'Mapimí', 'Francisco I. Madero'],
        reading:
          'El portafolio presenta la Reserva de la Biósfera de Mapimí, decretada en 1979, como la primera de su tipo en México y América Latina. Esa condición no se verifica externamente en la fuente. Las llamadas «zonas grises» donde se superponen figuras son una interpretación narrativa, no una delimitación jurídica.',
      },
    ],
    facts: [
      { label: 'Superficie de la Reserva', value: 'más de 342,000 ha', note: 'la Reserva descrita en su totalidad' },
      { label: 'Durango', value: '62.9 %' },
      { label: 'Coahuila', value: '22.4 %' },
      { label: 'Chihuahua', value: '14.7 %' },
    ],
    limitations: {
      title: 'Alcance documentado',
      text:
        'La versión web conserva las figuras, cifras y lecturas institucionales de las páginas 30–31. Las interpretaciones sobre tensión, fricción y zonas grises permanecen atribuidas al portafolio y no se convierten en conclusiones jurídicas.',
      points: [
        'No se documentan normas específicas ni competencias institucionales.',
        'No se cuantifica geográficamente la intersección entre figuras.',
        'No se muestran expedientes de conflicto ni actores particulares.',
        'No se evalúa capacidad institucional ni se mide participación comunitaria.',
        'La condición «primera en México y América Latina» no se verifica externamente.',
        'Las «zonas grises» son una interpretación narrativa.',
        'ANP y RTP no deben tratarse como categorías jurídicas equivalentes.',
        'Las cifras de distribución corresponden a la Reserva descrita en su totalidad.',
      ],
    },
    next: {
      number: 'IV',
      title: 'Socioeconomía',
      desc:
        'Las estructuras institucionales no operan sobre un territorio socialmente homogéneo. El siguiente capítulo observa cómo oportunidades, servicios, empleo, movilidad y marginación se distribuyen de forma desigual entre municipios y localidades.',
    },
  },

  {
    id: 'socioeconomia',
    number: 'IV',
    title: 'Socioeconomía',
    subtitle: 'Movilidad, servicios y desigualdad territorial',
    pages: [32, 33],
    accentVar: 'var(--g-socio)',
    intro: {
      title: 'Un mosaico de condiciones sociales',
      paragraphs: [
        'El pilar socioeconómico examina las condiciones de vida y las dinámicas económicas que configuran las comunidades rurales.',
        'Más allá de indicadores agregados, el análisis busca observar cómo se distribuyen las oportunidades, el acceso a servicios y las fuentes de ingreso dentro del territorio.',
        'La página relaciona la expansión agroindustrial con contrastes persistentes entre zonas productivas consolidadas y localidades con rezagos sociales.',
      ],
    },
    variables: ['Empleo', 'Ingresos', 'Educación', 'Servicios', 'Movilidad'],
    plates: [
      {
        id: 'commuting',
        title: 'Commuting',
        subtitle: 'Desplazamientos cotidianos entre territorios',
        page: 32,
        caption:
          'Representación de commuting en la Comarca Lagunera mediante categorías Baja, Media y Alta, acompañada por ejemplos textuales de desplazamiento diario.',
        sourceNote:
          'No se documenta el año del commuting ni la fuente de la PEA.',
        mode: 'compare',
        layers: [
          { slug: 'commuting-bajo', label: 'Bajo', note: 'menos del 30 %' },
          { slug: 'commuting-medio', label: 'Medio', note: 'rango no definido' },
          { slug: 'commuting-alto', label: 'Alto', note: 'más del 60 % de la PEA' },
        ],
        categories: [
          { name: 'Bajo', range: 'menos del 30 %', desc: 'En municipios periféricos como San Juan de Guadalupe y San Luis del Cordero. La página relaciona esta condición con aislamiento y dependencia de la agricultura local.' },
          { name: 'Medio', desc: 'La categoría aparece en la leyenda.', warning: 'La página no desarrolla su rango ni sus ejemplos.' },
          { name: 'Alto', range: 'más del 60 % (PEA)', desc: 'En Matamoros y San Pedro, más del 60 % de la PEA se desplaza diariamente hacia Torreón y Gómez Palacio. La página los interpreta como territorios dormitorio del corredor metropolitano.' },
        ],
        highlightMunicipios: ['San Juan de Guadalupe', 'San Luis del Cordero', 'Matamoros', 'San Pedro', 'Torreón', 'Gómez Palacio'],
        reading:
          'La movilidad y la marginación son variables distintas: una representa la intensidad de desplazamientos y otra describe contrastes sociales entre localidades. La coincidencia narrativa entre movilidad, empleo y acceso a servicios no sustituye un análisis estadístico, que no se documenta en estas páginas.',
      },
      {
        id: 'marginacion',
        title: 'Grado de marginación',
        subtitle: 'Por localidad',
        page: 33,
        caption:
          'Mapa de localidades representadas mediante categorías de marginación dentro de la Comarca Lagunera.',
        sourceNote:
          'No se define el IMN —su fórmula, fuente, año o dirección— ni los umbrales intermedios.',
        layers: [
          { slug: 'marginacion-localidades', label: 'Marginación por localidad' },
        ],
        categories: [
          { name: 'Localidades metropolitanas', range: 'IMN > 0.85', desc: 'Torreón, Gómez Palacio y Lerdo. Colonias y ejidos cercanos a la mancha urbana con muy baja marginación: servicios básicos, educación y empleo urbano-industrial.' },
          { name: 'Rurales agrícolas', desc: 'Matamoros, San Pedro, Nazas y Mapimí. La mayoría en rangos de baja a media marginación, con agricultura de riego, carencias en vivienda y servicios, y dependencia del trabajo estacional.' },
          { name: 'Dispersas periféricas', range: 'IMN < 0.70', desc: 'San Juan de Guadalupe, Simón Bolívar, Viesca y Rodeo. Varias en alta marginación: comunidades de menos de 500 habitantes, falta de servicios básicos, transporte y empleo no agrícola.' },
        ],
        highlightMunicipios: ['Torreón', 'Gómez Palacio', 'Lerdo', 'Matamoros', 'San Pedro', 'Nazas', 'Mapimí', 'San Juan de Guadalupe', 'General Simón Bolívar', 'Viesca'],
        reading:
          'La página interpreta la combinación de menor acceso a servicios, transporte y empleo no agrícola como una condición que acentúa la exclusión territorial. La composición no muestra indicadores separados que permitan medir la contribución individual de cada factor.',
      },
    ],
    limitations: {
      title: 'Alcance documentado',
      text: 'La versión web conserva los datos reportados sin calcular índices inexistentes.',
      points: [
        'No se documenta el año del commuting ni la fuente de la PEA.',
        'No se define el rango Medio de commuting ni el umbral general para Alto.',
        'No se muestran volúmenes de viajes, distancias ni tiempos.',
        'No se define el IMN: fórmula, fuente, año ni dirección.',
        'No se documentan fuentes de marginación ni umbrales intermedios.',
        'No se incluyen niveles de pobreza, carencias medidas ni ingresos monetarios.',
        'Las correlaciones causales son interpretativas.',
      ],
    },
    next: {
      number: 'V',
      title: 'Ambiente',
      desc:
        'El pilar ambiental examina cómo la estructura territorial interactúa con las restricciones del medio físico y los límites ecológicos.',
    },
  },

  {
    id: 'ambiente',
    number: 'V',
    title: 'Ambiente',
    subtitle: 'Soporte biofísico y límites ecológicos',
    pages: [34, 35],
    accentVar: 'var(--g-ambiente)',
    intro: {
      title: 'Un territorio con capacidades y restricciones distintas',
      paragraphs: [
        'La clasificación diferencia áreas descritas mediante condiciones de fertilidad, dependencia climática, salinidad, erosión y desarrollo del suelo.',
        'Dentro de la narrativa del portafolio, estas diferencias permiten observar que las posibilidades productivas no se distribuyen de manera homogénea y que cada zona enfrenta límites ambientales distintos.',
        'La lectura no determina usos obligatorios ni sustituye estudios de suelo detallados.',
      ],
    },
    variables: ['Fertilidad', 'Clima', 'Salinidad', 'Erosión', 'Desarrollo'],
    plates: [
      {
        id: 'suelos',
        title: 'Clasificación funcional del suelo',
        subtitle: 'Seis clases',
        page: 34,
        caption:
          'Clasificación funcional del suelo representada en la Comarca Lagunera mediante seis clases productivas y ambientales descritas en la página fuente.',
        sourceNote:
          'La página no documenta la metodología ni la fuente utilizada para delimitar las seis clases. «Funcional» distingue esta composición de una taxonomía edafológica oficial; no se le asignan equivalencias con sistemas externos.',
        layers: [
          { slug: 'class-edaf', label: 'Clasificación funcional del suelo', note: 'seis clases' },
        ],
        categories: [
          { name: 'Agrícolas bastante fértiles', desc: 'Suelos de valle, con buena retención de agua y nutrientes; sostienen los cultivos de riego más productivos.' },
          { name: 'Agrícolas de regular o baja productividad', desc: 'Menor fertilidad natural; requieren fertilización y riego constante para mantener rendimientos.' },
          { name: 'Agrícolas dependientes del clima', desc: 'Suelos de temporal; su productividad varía según las lluvias y presentan alta vulnerabilidad a sequías.' },
          { name: 'Con exceso de sales', desc: 'Afectados por salinidad y sodicidad; limitan el crecimiento de cultivos convencionales.' },
          { name: 'Erosionados aptos para pastizales', desc: 'Degradados, con poca capacidad agrícola; aún sostienen vegetación natural o uso ganadero extensivo.' },
          { name: 'Jóvenes con poco desarrollo', desc: 'Suelos incipientes, poco evolucionados, comunes en piedemontes y laderas.' },
        ],
        reading:
          'Los nombres de las seis clases se conservan conforme a la página fuente. La versión web no les asigna equivalencias con sistemas edafológicos externos porque la fuente no las documenta.',
      },
    ],
    limitations: {
      title: 'Alcance documentado',
      text:
        'La versión web conserva la clasificación de las páginas 34–35 sin traducirla a ninguna taxonomía oficial.',
      points: [
        'No se documenta la metodología de delimitación de las clases.',
        'No se identifica la fuente de los datos edafológicos.',
        'No se presentan perfiles, muestreos ni análisis de laboratorio.',
        'El término «funcional» es de la versión web, para distinguirla de una taxonomía oficial.',
      ],
    },
    next: {
      number: 'VI',
      title: 'Conectividad',
      desc:
        'Tras el soporte biofísico, el capítulo siguiente observa la posición espacial de las localidades respecto de los centros urbanos.',
    },
  },

  {
    id: 'conectividad',
    number: 'VI',
    title: 'Conectividad',
    subtitle: 'Distancias y patrones espaciales',
    pages: [35, 35],
    accentVar: 'var(--g-conectividad)',
    intro: {
      title: 'La distancia como lectura territorial',
      paragraphs: [
        'La página organiza las localidades mediante tres rangos de distancia respecto de centros urbanos.',
        'Cada rango se vincula en la fuente con una condición distinta de accesibilidad, transporte, relación con mercados laborales y acceso a servicios.',
        'La composición no documenta el método de distancia, la red utilizada ni la identidad de todos los centros urbanos.',
      ],
    },
    variables: ['Proximidad', 'Transporte', 'Mercados', 'Servicios'],
    plates: [
      {
        id: 'distancias',
        title: 'Tres rangos espaciales',
        subtitle: 'Localidades y centros urbanos',
        page: 35,
        caption:
          'Representación de localidades de la Comarca Lagunera mediante rangos de distancia respecto de centros urbanos y líneas de relación espacial.',
        sourceNote:
          'La composición no especifica si las distancias corresponden a línea recta, red vial u otro procedimiento. Fuente no identificada de forma explícita.',
        layers: [
          { slug: 'conectividad', label: 'Relaciones de distancia', note: 'líneas de relación espacial' },
        ],
        categories: [
          { name: 'Menos de 10 km', desc: 'Alta accesibilidad, confluencia de transporte y mercados laborales.' },
          { name: 'Entre 10 y 30 km', desc: 'Conectividad media; dependen de carreteras secundarias y transporte rural.' },
          { name: 'Más de 30 km', desc: 'Baja conectividad; mayor aislamiento físico y menor acceso a servicios básicos.' },
        ],
        reading:
          'Estas relaciones corresponden a la interpretación de la página y no sustituyen una evaluación de infraestructura, frecuencia de transporte, calidad vial o disponibilidad real de servicios. La conectividad y el commuting no son la misma variable: una organiza por distancia, el otro representa desplazamientos cotidianos, y las páginas no documentan una equivalencia entre ambos.',
      },
    ],
    limitations: {
      title: 'Alcance documentado',
      text:
        'La página 35 clasifica por distancia sin documentar cómo se midió.',
      points: [
        'No se documenta si la distancia es euclidiana o por red vial.',
        'No se identifica el inventario completo de centros urbanos utilizados.',
        'No se combinan ambiente y conectividad en un índice conjunto; eso ocurre después, en el clustering.',
        'No se documenta equivalencia entre distancia y commuting.',
      ],
    },
    next: {
      number: 'VII',
      title: 'Clustering',
      desc:
        'Las seis dimensiones anteriores se integran en una clasificación municipal de tres grupos.',
    },
  },

  {
    id: 'clustering',
    number: 'VII',
    title: 'Clustering',
    subtitle: 'Tres configuraciones de un mismo territorio',
    pages: [36, 37],
    accentVar: 'var(--p09-agua)',
    intro: {
      title: 'Tres grupos territoriales',
      paragraphs: [
        'El análisis integra las dimensiones anteriores en una clasificación municipal de tres agrupaciones.',
        'La página interpreta su distribución mediante una lógica centro–intermedio–periferia.',
        'La composición no documenta una prueba de autocorrelación, contigüidad o significancia espacial, ni proporciona una tabla exhaustiva de asignaciones municipales.',
      ],
    },
    variables: ['Núcleo', 'Intermedio', 'Periferia'],
    plates: [
      {
        id: 'espacializacion',
        title: 'Espacialización municipal',
        subtitle: 'Centro, intermedio y periferia',
        page: 37,
        caption:
          'Clasificación municipal de la Comarca Lagunera en tres agrupaciones representadas mediante azul, amarillo y rosa.',
        sourceNote:
          'La composición no documenta una prueba de autocorrelación, contigüidad o significancia espacial. Tampoco proporciona una tabla exhaustiva de asignaciones municipales.',
        layers: [
          { slug: 'comarca-caracterizacion', label: 'Agrupaciones municipales', note: 'tres grupos' },
        ],
        categories: [
          { name: 'Núcleo agroindustrial', desc: 'Interpretado en la fuente como altamente integrado, con mayor densidad de interacciones y reflejo del peso del corredor metropolitano.' },
          { name: 'Intermedio de transición', desc: 'La página describe este conjunto como una bisagra entre núcleos y periferias.' },
          { name: 'Periferia vulnerable', desc: 'Caracterizados por la fuente como municipios más aislados, marginados y ambientalmente frágiles.' },
        ],
        reading:
          'La página afirma que el grupo azul concentra la mayor densidad de interacciones, el amarillo funciona como bisagra y el rosa aparece más aislado. El diagrama de relaciones que acompaña esta clasificación no documenta el significado, peso, dirección ni método de construcción de sus enlaces.',
      },
    ],
    limitations: {
      title: 'Alcance documentado',
      text:
        'La clasificación en tres grupos se documenta parcialmente en diagramas complementarios (K=3, Ward.D2, distancia euclídea, validación PAM y estandarización).',
      points: [
        'Se clasifican 14 municipios de los 15 que componen la Comarca Lagunera, sin documentar el motivo de exclusión.',
        'Siguen sin documentarse las variables de entrada exactas, sus pesos y el tratamiento de datos faltantes.',
        'No hay prueba explícita de autocorrelación, contigüidad ni significancia espacial.',
        'Los nombres de los grupos varían entre páginas de la fuente y no deben interpretarse como una jerarquía causal.',
      ],
    },
    next: {
      number: '—',
      title: 'Cierre',
      desc:
        'El recorrido cubre las siete dimensiones documentadas en las páginas 21–40 del portafolio.',
    },
  },
];

export function getPillar(id: string): Pillar | undefined {
  return pillars.find((p) => p.id === id);
}
