export const project12Data = {
  id: "12",
  slug: "degradacion-suelo-calvillo",
  title: "Análisis de la Degradación del Suelo en Calvillo, Aguascalientes, para un Plan Integral de Manejo Ganadero",
  shortTitle: "DEGRADACIÓN DEL SUELO",
  territory: "CALVILLO, AGUASCALIENTES",
  sourcePages: [20],
  themes: ["degradación del suelo", "territorio ganadero", "sobrepastoreo", "explotación excesiva de recursos", "forraje", "agua", "pastizales", "manejo del suelo", "sostenibilidad", "resiliencia", "capacidad de carga", "biodiversidad", "manejo ganadero", "planeación territorial"],
  accent: "#c18a6d", // Tono tierra / rosa mineral

  summary: "Lectura cartográfica de la condición física del suelo vinculada con una propuesta de manejo ganadero en Calvillo.",
  
  introduction: {
    title: "EL SUELO COMO BASE DEL MANEJO",
    text: "El proyecto sitúa la degradación del suelo dentro de una propuesta de manejo ganadero en Calvillo. La página relaciona esta problemática con el sobrepastoreo y con la sobreutilización de recursos como forraje y agua.",
    subtext: "La cartografía aporta una lectura espacial de áreas diferenciadas dentro del territorio, pero la composición no documenta la denominación, superficie o método de clasificación de cada zona."
  },

  sourceContext: [
    "SOBREPASTOREO",
    "SOBREUTILIZACIÓN DE FORRAJE",
    "SOBREUTILIZACIÓN DE AGUA",
    "DEGRADACIÓN DE PASTIZALES"
  ],

  process: {
    title: "SECUENCIA CARTOGRÁFICA REPRESENTADA",
    steps: [
      {
        step: 1,
        title: "DELIMITACIÓN",
        description: "Delimitación del territorio de Calvillo."
      },
      {
        step: 2,
        title: "REPRESENTACIÓN",
        description: "Representación de áreas diferenciadas."
      },
      {
        step: 3,
        title: "ORGANIZACIÓN",
        description: "Organización de la composición cartográfica."
      },
      {
        step: 4,
        title: "VINCULACIÓN",
        description: "Vinculación del análisis con el contexto ganadero."
      },
      {
        step: 5,
        title: "INCORPORACIÓN",
        description: "Incorporación del mapa dentro de una propuesta de manejo."
      }
    ],
    note: "Secuencia reconstruida a partir del título y de la composición de la página. La fuente no documenta variables, clases, procedimiento, temporalidad ni validación."
  },

  limitations: "La página no documenta clases de degradación, superficies, indicadores, fecha, metodología, validación ni comparación temporal.",
  mapLegendWarning: "La composición original no permite recuperar con suficiente seguridad una leyenda textual completa para todas las áreas coloreadas. La versión web conserva el mapa sin asignar categorías nuevas.",
  sourceNarrativeWarning: "La página presenta afirmaciones de éxito e impacto sin acompañarlas de indicadores, temporalidad, metodología o evidencia de validación. La versión web las conserva como narrativa declarada por el portafolio, no como resultados verificados.",

  observations: [
    "El proyecto utiliza a Calvillo como unidad territorial de análisis.",
    "El mapa diferencia áreas mediante una composición cromática asociada con el análisis de degradación del suelo.",
    "La narrativa relaciona el contexto ganadero con sobrepastoreo y uso intensivo de forraje y agua.",
    "La cartografía se presenta como insumo para una propuesta de manejo ganadero."
  ],

  sharedContextAssets: [
    {
      id: "shared-cattle",
      projectIds: ["12", "13"],
      role: "shared-context",
      type: "image",
      creditStatus: "not-explicitly-documented"
    }
  ],

  previousProject: {
    id: "11",
    slug: "aptitud-agricola-aguascalientes",
    title: "APTITUD AGRÍCOLA",
    shortTitle: "AGRÍCOLA"
  },
  
  nextProject: {
    id: "13",
    slug: "subcuencas-rios-calvillo",
    title: "SUBCUENCAS Y RÍOS",
    shortTitle: "SUBCUENCAS"
  },

  SEO: {
    title: "Degradación del suelo en Calvillo | Néstor Arriaga",
    description: "Análisis de degradación del suelo en Calvillo, Aguascalientes, vinculado con una propuesta de manejo ganadero."
  }
};
