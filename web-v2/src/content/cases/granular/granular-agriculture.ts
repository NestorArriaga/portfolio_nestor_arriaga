export const granularAgriculture = {
  chapterId: "agriculture",
  title: "AGRICULTURA",
  shortTitle: "EL SISTEMA PRODUCTIVO Y SUS DEPENDENCIAS TERRITORIALES",
  sourcePages: [25, 26, 27, 28, 29],
  dimension: "agriculture",
  scales: ["regional", "municipal", "localidad"],
  
  chapterIntroduction: {
    title: "UN SISTEMA PRODUCTIVO ORGANIZADO POR EL AGUA",
    text1: "El portafolio presenta la agricultura de la Comarca Lagunera como un sistema profundamente relacionado con el acceso al riego, la estructura de cultivos y la infraestructura territorial.",
    text2: "La modalidad de producción, la especialización municipal y la exposición a la sequía generan configuraciones agrícolas distintas dentro de la región.",
    text3: "El capítulo avanza desde la escala regional y municipal hacia la escala de localidad para observar cómo la productividad se concentra de manera desigual."
  },

  conceptualVariables: [
    "RIEGO",
    "TEMPORAL",
    "CULTIVOS",
    "SEQUÍA",
    "LOCALIDADES"
  ],

  irrigationRainfed: {
    title: "DOS MODALIDADES",
    subtitle: "DOS CONFIGURACIONES TERRITORIALES",
    sourcePage: 26,
    caption: "Representación de la agricultura de riego y temporal en la Comarca Lagunera, acompañada por las superficies consignadas en la página fuente.",
    irrigation: {
      label: "RIEGO",
      value: "366,912 ha",
      note: "SUPERFICIE REPRESENTADA EN LA PÁGINA",
      examplesLabel: "EJEMPLOS MENCIONADOS EN EL TEXTO",
      examples: "San Pedro, Francisco I. Madero y Matamoros, asociados textual y visualmente al riego y la estructura productiva principal."
    },
    rainfed: {
      label: "TEMPORAL",
      value: "135,541 ha",
      note: "SUPERFICIE REPRESENTADA EN LA PÁGINA",
      examplesLabel: "EJEMPLOS MENCIONADOS EN EL TEXTO",
      examples: "Simón Bolívar, Nazas y San Juan de Guadalupe, descritos en la página como espacios de temporal con mayor vulnerabilidad climática."
    }
  },

  cropStructure: {
    title: "CULTIVOS",
    subtitle: "Y ESPECIALIZACIÓN TERRITORIAL",
    sourcePage: 27,
    caption: "Diagrama de relaciones entre municipios y cultivos en la Comarca Lagunera.",
    chordAccessibleText: "La figura representa conexiones entre municipios y cultivos. El texto del portafolio destaca los vínculos de San Pedro y Francisco I. Madero con maíz y avena forrajera, así como la presencia de algodón y cultivos de temporal.",
    
    municipalReadings: [
      {
        id: "forraje",
        name: "MUNICIPIOS FORRAJEROS",
        munis: "San Pedro, Francisco I. Madero y Matamoros.",
        desc: "Cultivos mencionados: maíz forrajero y avena forrajera de riego. Interpretados como base de la cuenca lechera."
      },
      {
        id: "algodon",
        name: "MUNICIPIOS ALGODONEROS",
        munis: "Principalmente San Pedro y Madero.",
        desc: "Interpretación: mantienen superficies considerables de algodón de riego, aunque en declive frente a los forrajes."
      },
      {
        id: "transicion",
        name: "MUNICIPIOS DE TRANSICIÓN",
        munis: "Nazas, Cuencamé y Santa Clara.",
        desc: "Cultivos mencionados: trigo, maíz grano, temporal y superficies menores de riego. Interpretados con mayor vulnerabilidad a sequías."
      },
      {
        id: "metropolitano",
        name: "ZONAS METROPOLITANAS",
        munis: "Torreón, Gómez Palacio y Lerdo.",
        desc: "Interpretación: menor superficie agrícola, con cultivos especializados e intensivos bajo riego."
      }
    ]
  },

  waterParadox: {
    title: "LA “PARADOJA HÍDRICA” SEGÚN LA LECTURA DEL PORTAFOLIO",
    sourcePage: 27,
    foragePct: "MÁS DEL 70%",
    forageDesc: "de la superficie bajo riego se destina a forrajes, especialmente maíz y avena.",
    foodPct: "MENOS DEL 10%",
    foodDesc: "se dedica a cultivos alimentarios directos, mencionando trigo, hortalizas y maíz grano.",
    narrativeText1: "A partir del peso de los forrajes dentro de la superficie bajo riego, la página formula una crítica al destino productivo del agua y utiliza la expresión “alimentar vacas, no personas”.",
    narrativeText2: "La narrativa interpreta este patrón como una contradicción entre alta productividad agroindustrial, presión hídrica y producción directa de alimentos.",
    disclaimer: "La página no presenta junto a esta afirmación un balance de consumo de agua por cultivo, producción pecuaria, disponibilidad alimentaria o seguridad alimentaria."
  },

  droughtVulnerability: {
    title: "VULNERABILIDAD",
    subtitle: "A LA SEQUÍA",
    sourcePage: 28,
    caption: "Mapa de vulnerabilidad a la sequía en la Comarca Lagunera con cinco categorías visibles en la leyenda.",
    categories: [
      {
        id: "muy-alto",
        name: "MUY ALTO",
        desc: "La categoría aparece en la leyenda, pero la página no desarrolla en texto su rango ni ejemplos.",
        color: "#d94801" // Theme appropriate, wait, we'll use var(--granular-drought-very-high)
      },
      {
        id: "alto",
        name: "ALTO",
        desc: "Texto fuente indica >70%. Ejemplo textual: Torreón (~79%). Interpretación de la fuente: presión hídrica y dependencia de pozos.",
        color: "#f16913"
      },
      {
        id: "medio",
        name: "MEDIO",
        desc: "Texto fuente indica 40–50%. Ejemplos: Nazas, San Juan de Guadalupe, Santa Clara, Cuencamé, Simón Bolívar, Viesca. Interpretación: territorios agrícolas donde la sequía afecta directamente la producción de temporal.",
        color: "#fd8d3c"
      },
      {
        id: "bajo",
        name: "BAJO",
        desc: "La categoría aparece en la leyenda, pero la página no desarrolla en texto su rango ni ejemplos.",
        color: "#fdd0a2"
      },
      {
        id: "muy-bajo",
        name: "MUY BAJO",
        desc: "Texto fuente indica <10%. Ejemplos: Rodeo y algunos municipios periféricos. Interpretación: menor superficie agrícola intensiva.",
        color: "#feedde"
      }
    ]
  },

  productiveLocalities: {
    title: "1,400 LOCALIDADES",
    subtitle: "TRES NIVELES PRODUCTIVOS",
    sourcePage: 29,
    caption: "Mapa de localidades agroproductivas de la Comarca Lagunera clasificadas en niveles Alto, Medio y Bajo.",
    introText: "La clasificación de 1,400 localidades según su grado productivo revela un patrón espacial. La categoría “productividad” se conserva conforme a la página fuente. La composición no documenta en este punto las variables, umbrales o procedimiento de clasificación.",
    concentrationText: "MÁS DEL 60% de las localidades de alta productividad se concentra en el corredor central agroindustrial de la Laguna.",
    concentrationInterpretation: "El portafolio interpreta esta concentración como una expresión de desigualdad territorial entre nodos con mayor acceso a agua, riego e infraestructura y localidades situadas en rangos medios o bajos. La página no presenta la base, el método de clasificación ni la delimitación exacta del corredor central.",
    classes: [
      {
        id: "alta",
        name: "ALTA",
        desc: "Núcleos periurbanos y rurales vinculados con sistemas de riego y agroindustria forrajera.",
        zones: "Torreón, Gómez Palacio, Lerdo, Matamoros, San Pedro, Madero, oriente lagunero.",
        examples: "Las Cuevas, La Noria, Las Palomas.",
        color: "#FF3333"
      },
      {
        id: "media",
        name: "MEDIA",
        desc: "Localidades con actividad agrícola diversificada entre forraje, grano y ganadería, conectadas por la red vial y con superficies de riego menores.",
        examples: "El Milagro, San Nicolás, San Felipe.",
        color: "#FF9933"
      },
      {
        id: "baja",
        name: "BAJA",
        desc: "Localidades rurales dispersas, dependientes del temporal y más expuestas a sequías.",
        zones: "Nazas, Rodeo, Viesca, San Juan de Guadalupe.",
        examples: "El Zorrillo, El Sauz, La Esperanza.",
        color: "#FFCC33"
      }
    ]
  },

  scaleComparison: {
    title: "AGUA, PRODUCCIÓN Y DESIGUALDAD TERRITORIAL",
    text1: "Las páginas muestran que el sistema agroproductivo no se distribuye de forma homogénea. Riego, especialización forrajera, exposición a sequía e infraestructura se combinan de maneras distintas entre municipios y localidades.",
    text2: "La concentración de localidades de alta productividad en el corredor central es interpretada por el portafolio como una expresión de acceso territorial desigual a agua, riego e infraestructura.",
    disclaimer: "Estas relaciones se presentan como lectura territorial de las páginas fuente. No se documenta en ellas un modelo causal o estadístico que mida la contribución independiente de cada factor.",
    municipalScaleText: "ESCALA MUNICIPAL: La lectura municipal organiza patrones productivos amplios (riego, cultivos, sequía).",
    localityScaleText: "ESCALA DE LOCALIDAD: La escala de localidad permite observar cómo esas estructuras se fragmentan en configuraciones más próximas y desiguales."
  },

  limitations: {
    title: "ALCANCE DOCUMENTADO",
    text: "La versión web conserva cifras, categorías, ejemplos e interpretaciones presentes en las páginas 25–29. Los vacíos metodológicos y las ambigüedades permanecen visibles y no se completan mediante cálculos o fuentes externas.",
    points: [
      "No se documenta el año de las superficies.",
      "No se define con precisión el universo de las hectáreas cuando no sea legible.",
      "No se muestran superficies municipales exactas ni valores de producción o rendimiento.",
      "No se muestra consumo de agua por cultivo.",
      "No se muestra metodología del chord ni valores de cada conexión.",
      "No se define el indicador de productividad ni las variables de clasificación de localidades.",
      "No se muestran umbrales para todas las categorías de sequía (ambigüedad Alto/Muy alto).",
      "No se documenta la delimitación exacta del corredor central.",
      "Las frases críticas y lecturas territoriales se mantienen estrictamente atribuidas al documento original."
    ]
  },

  nextChapterPreview: {
    number: "05",
    title: "GOBERNANZA",
    sourcePages: [30, 31, 32],
    desc: "La gobernanza ambiental en la Comarca Lagunera se observa a través de las Áreas Naturales Protegidas y los vacíos institucionales.",
    status: "PRÓXIMO CAPÍTULO"
  }
};
