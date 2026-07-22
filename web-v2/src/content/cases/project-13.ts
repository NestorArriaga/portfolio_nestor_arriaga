export const project13Data = {
  id: "13",
  slug: "subcuencas-rios-calvillo",
  title: "Delimitación de Subcuencas e Identificación de Ríos para un Plan Integral de Manejo Ganadero en Calvillo, Aguascalientes",
  shortTitle: "SUBCUENCAS Y RÍOS",
  territory: "CALVILLO, AGUASCALIENTES",
  sourcePages: [20],
  themes: ["subcuencas", "ríos", "red hidrográfica", "agua superficial", "territorio", "manejo ganadero", "forraje", "disponibilidad de recursos", "planeación", "conectividad hídrica", "organización territorial", "sostenibilidad", "resiliencia"],
  accent: "#4a9eb4", // Azul hídrico / turquesa

  summary: "Representación hidrológica de subcuencas y ríos vinculada con una propuesta de manejo ganadero territorial.",
  
  introduction: {
    title: "EL AGUA COMO ESTRUCTURA DEL TERRITORIO",
    text: "El proyecto representa subcuencas y ríos dentro de Calvillo como componentes territoriales relacionados con una propuesta de manejo ganadero. La red hidrográfica permite situar espacialmente el agua superficial dentro del área de estudio.",
    subtext: "La composición conecta esta lectura con la necesidad de considerar suelo, agua y actividad productiva dentro de una planeación común."
  },

  sourceContext: [
    "SUELO",
    "AGUA",
    "FORRAJE",
    "GANADERÍA"
  ],

  process: {
    title: "SECUENCIA HIDROLÓGICA REPRESENTADA",
    steps: [
      {
        step: 1,
        title: "TERRITORIO",
        description: "Delimitación del territorio de Calvillo."
      },
      {
        step: 2,
        title: "RED",
        description: "Representación de la red hidrográfica."
      },
      {
        step: 3,
        title: "UNIDADES",
        description: "Delimitación visual de unidades hidrológicas."
      },
      {
        step: 4,
        title: "REFERENCIAS",
        description: "Organización cartográfica de referencias territoriales."
      },
      {
        step: 5,
        title: "MANEJO",
        description: "Vinculación con una propuesta de manejo ganadero."
      }
    ],
    note: "Secuencia reconstruida a partir del título y de la composición de la página. La fuente no documenta procedimiento, insumos, jerarquía, parámetros, fuentes ni validación."
  },

  limitations: "La página no presenta inventario de subcuencas, nombres de ríos, caudales, disponibilidad, permanencia, jerarquía, metodología o validación.",
  hydrologyDetailWarning: "La página no documenta en texto el número, nombre, superficie o jerarquía de las subcuencas y corrientes representadas.",
  sourceNarrativeWarning: "La página presenta afirmaciones de éxito e impacto sin acompañarlas de indicadores, temporalidad, metodología o evidencia de validación. La versión web las conserva como narrativa declarada por el portafolio, no como resultados verificados.",

  observations: [
    "El mapa utiliza Calvillo como unidad territorial de análisis.",
    "La composición representa una red de corrientes dentro del territorio.",
    "El título relaciona la delimitación hidrológica con una propuesta de manejo ganadero.",
    "La cartografía aporta una referencia espacial para considerar el agua dentro de la planeación territorial."
  ],

  sharedContextAssets: [
    {
      id: "shared-person-cattle",
      projectIds: ["12", "13"],
      role: "shared-context",
      type: "image",
      creditStatus: "not-explicitly-documented"
    }
  ],

  previousProject: {
    id: "12",
    slug: "degradacion-suelo-calvillo",
    title: "DEGRADACIÓN DEL SUELO",
    shortTitle: "DEGRADACIÓN"
  },
  
  nextProject: {
    id: "14",
    slug: "granular-comarca-lagunera",
    title: "TIPOLOGÍAS RURALES SITUADAS",
    shortTitle: "GRANULAR"
  },

  SEO: {
    title: "Subcuencas y ríos en Calvillo | Néstor Arriaga",
    description: "Delimitación hidrológica e identificación de ríos para un plan integral de manejo ganadero en Calvillo."
  }
};
