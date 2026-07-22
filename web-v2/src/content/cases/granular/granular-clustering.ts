export const granularClustering = {
  chapterId: "clustering-municipal",
  title: "CLUSTERING MUNICIPAL",
  shortTitle: "TRES CONFIGURACIONES DE UN MISMO TERRITORIO",
  sourcePages: [36, 37],
  dimension: "clustering",
  scales: ["municipal"],
  
  chapterIntroduction: {
    title: "SEIS DIMENSIONES UNA LECTURA MUNICIPAL",
    dimensions: [
      "AGUA",
      "AGRICULTURA",
      "GOBERNANZA",
      "SOCIOECONOMÍA",
      "AMBIENTE",
      "CONECTIVIDAD"
    ],
    text1: "Después de analizar cada dimensión por separado, el portafolio las reúne dentro de una clasificación territorial a escala municipal.",
    text2: "La integración busca reconocer patrones estructurales y distinguir configuraciones rurales con condiciones productivas, ambientales, sociales e institucionales diferentes.",
    sourceNote: "La página no documenta qué variables de cada dimensión ingresaron al clustering ni cómo fueron ponderadas."
  },

  typologies: {
    title: "TRES GRUPOS TERRITORIALES",
    classes: [
      {
        id: "nucleo",
        name: "NÚCLEO AGROINDUSTRIAL",
        variants: [
          "Núcleo agroindustrial altamente integrado",
          "Corredor agroindustrial-metropolitano",
          "Núcleo agroindustrial y urbano"
        ],
        color: "AZUL",
        desc: "Grupo interpretado en la fuente como altamente integrado, con mayor densidad de interacciones y reflejo del peso del corredor metropolitano."
      },
      {
        id: "intermedio",
        name: "INTERMEDIO DE TRANSICIÓN",
        variants: [
          "Anillo intermedio de transición productiva",
          "Municipios agrícolas intermedios",
          "Municipios agrícolas de transición",
          "Anillo intermedio"
        ],
        color: "AMARILLO",
        desc: "La página describe este conjunto como una bisagra entre núcleos y periferias."
      },
      {
        id: "periferia",
        name: "PERIFERIA VULNERABLE",
        variants: [
          "Periferia rural más vulnerable y menos conectada",
          "Periferia rural frágil",
          "Periferia rural",
          "Periferia marginada",
          "Municipios rurales y ambientalmente vulnerables"
        ],
        color: "ROSA",
        desc: "Caracterizados por la fuente como municipios más aislados, marginados y ambientalmente frágiles."
      }
    ]
  },

  relationDiagram: {
    title: "CLUSTER TOTAL MUNICIPAL DIAGRAMA DE RELACIONES",
    caption: "Diagrama de relaciones entre municipios y tres grupos del clustering territorial de la Comarca Lagunera.",
    readingText1: "La página afirma que el clúster azul concentra la mayor densidad de interacciones; el amarillo funciona como bisagra; y el rosa aparece más aislado.",
    sourceNote: "El diagrama representa relaciones entre municipios y clústeres, pero la página no documenta el significado, peso, dirección o método de construcción de los enlaces."
  },

  spatialization: {
    title: "ESPACIALIZACIÓN MUNICIPAL",
    caption: "Clasificación municipal de la Comarca Lagunera en tres agrupaciones representadas mediante azul, amarillo y rosa.",
    text1: "La página interpreta la distribución de los tres grupos mediante una lógica centro–intermedio–periferia.",
    sourceNote: "La composición no documenta una prueba de autocorrelación, contigüidad o significancia espacial. Tampoco proporciona una tabla exhaustiva de asignaciones municipales. Fuente no identificada de forma explícita en la composición."
  },

  limitations: {
    title: "ALCANCE DOCUMENTADO",
    text: "La versión web conserva los tres grupos, sus colores y las interpretaciones de las páginas 36–37. El procedimiento estadístico y las asignaciones completas no se reconstruyen con información externa.",
    points: [
      "No se documenta algoritmo de clustering.",
      "No se documentan variables, pesos ni tratamiento de datos.",
      "No se documenta la selección estadística de tres grupos.",
      "No se documentan parámetros ni validación.",
      "No se muestran perfiles numéricos ni centroides.",
      "No se presenta tabla exhaustiva de asignaciones.",
      "No se define el significado de las relaciones del diagrama.",
      "No se presentan pruebas espaciales de contigüidad.",
      "Las descripciones de los grupos contienen interpretación territorial.",
      "Las variantes terminológicas no constituyen clases distintas."
    ]
  }
};
