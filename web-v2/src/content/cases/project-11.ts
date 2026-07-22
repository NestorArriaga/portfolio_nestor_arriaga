export const project11Data = {
  id: "11",
  slug: "aptitud-agricola-aguascalientes",
  title: "Mapa de Aptitud Agrícola",
  shortTitle: "Aptitud Agrícola",
  reportTitle: "Propuestas Metodológicas para la Planeación del Desarrollo Rural con Enfoque Territorial",
  territory: "Estado de Aguascalientes, México",
  sourcePages: [19],
  themes: ["Aptitud agrícola", "Planeación rural", "Enfoque territorial", "Cobertura del suelo", "Áreas agrícolas", "Pastizales inducidos", "Áreas desprovistas de vegetación", "Proximidad a cuerpos de agua", "Pendiente", "Inundación", "Tipo de suelo", "Erosión", "Ponderación", "Análisis geoespacial", "Planificación", "Sostenibilidad", "Geografía viva", "Desarrollo rural"],
  accent: "#ff9800", // Naranja territorial
  summary: "Mapa de aptitud agrícola basado en seis atributos ambientales y territoriales ponderados en Aguascalientes.",
  introduction: {
    title: "LEER EL POTENCIAL AGRÍCOLA",
    text: "El mapa de aptitud agrícola reúne características ambientales y territoriales relacionadas con el uso productivo del suelo. La evaluación considera cobertura, cercanía al agua, pendiente, inundación, tipo de suelo y susceptibilidad a la erosión.",
    subtext: "La ponderación organiza estos atributos dentro de una representación común que se plantea como apoyo para la planificación territorial y el desarrollo rural."
  },
  aptitudeDefinition: {
    text: "Según la formulación recuperada en el portafolio, la aptitud sectorial analiza características ambientales y territoriales para valorar el potencial de un área frente a requerimientos agrícolas o de conservación.",
    attribution: "SEMARNAT (2015)"
  },
  livingGeography: {
    title: "GEOGRAFÍA VIVA",
    text: "El portafolio interpreta la aptitud agrícola como una composición del paisaje donde agua, suelo, pendiente y cobertura interactúan. Desde esta mirada, el territorio no aparece como una superficie inmóvil, sino como un sistema natural y humano en transformación.",
    subtext: "La referencia a tierras que “se abren y permiten ser sembradas” funciona en la página como una metáfora para vincular cartografía, producción y desarrollo rural."
  },
  attributes: [
    {
      id: "cover",
      label: "TIPO DE COBERTURA DEL SUELO",
      detail: "Áreas agrícolas, pastizales inducidos y áreas desprovistas de vegetación.",
      weight: 0.25,
      sourceValue: "0.25"
    },
    {
      id: "water",
      label: "PROXIMIDAD A CUERPOS DE AGUA",
      detail: "",
      weight: 0.20,
      sourceValue: "0.20"
    },
    {
      id: "soil",
      label: "TIPO DE SUELO",
      detail: "",
      weight: 0.20,
      sourceValue: "0.20"
    },
    {
      id: "slope",
      label: "PENDIENTE DEL TERRENO",
      detail: "",
      weight: 0.15,
      sourceValue: "0.15"
    },
    {
      id: "flood",
      label: "DISTANCIA DE ÁREAS PROPENSAS A INUNDACIÓN",
      detail: "",
      weight: 0.15,
      sourceValue: "0.15"
    },
    {
      id: "erosion",
      label: "SUSCEPTIBILIDAD A LA EROSIÓN",
      detail: "",
      weight: 0.05,
      sourceValue: "0.05"
    }
  ],
  totalWeight: "1.00",
  methodologyRoute: {
    intro: "El proyecto utiliza un enfoque técnico-participativo estructurado en las siguientes etapas:",
    steps: [
      { step: 1, text: "DEFINICIÓN DE OBJETIVOS" },
      { step: 2, text: "PONDERACIÓN DE ATRIBUTOS" },
      { step: 3, text: "RECOPILACIÓN DE DATOS GEOESPACIALES" },
      { step: 4, text: "ESTANDARIZACIÓN Y NORMALIZACIÓN DE DATOS" },
      { step: 5, text: "ANÁLISIS GEOESPACIAL Y APLICACIÓN DE PONDERACIONES" },
      { step: 6, text: "VALIDACIÓN Y AJUSTES" },
      { step: 7, text: "GENERACIÓN Y PRESENTACIÓN DEL MAPA FINAL" }
    ],
    note: "La página presenta la ruta general, pero no documenta fuentes de datos, reglas de estandarización, procedimiento participativo ni resultados de validación."
  },
  levels: [
    { label: "NULO", description: "Nivel representado dentro de la clasificación de aptitud del sector agrícola.", color: "#cccccc" },
    { label: "MEDIO", description: "Nivel representado dentro de la clasificación de aptitud del sector agrícola.", color: "#ffb74d" },
    { label: "ALTO", description: "Nivel representado dentro de la clasificación de aptitud del sector agrícola.", color: "#e65100" }
  ],
  observations: [
    "La evaluación agrícola integra seis atributos ponderados.",
    "El tipo de cobertura del suelo tiene el mayor peso individual, con 0.25.",
    "Proximidad a cuerpos de agua y tipo de suelo tienen un peso de 0.20 cada uno.",
    "Pendiente y distancia de áreas propensas a inundación tienen un peso de 0.15 cada uno.",
    "Susceptibilidad a la erosión tiene un peso de 0.05.",
    "El mapa organiza el resultado en niveles Nulo, Medio y Alto."
  ],
  limitations: "La página original no documenta metodologías estadísticas adicionales, fuentes de datos detalladas, superficie por clase, ni resultados de validación en campo.",
  previousProject: {
    id: "10",
    slug: "aptitud-conservacion-aguascalientes",
    title: "Aptitud para la Conservación",
    territory: "Estado de Aguascalientes"
  },
  nextProject: {
    id: "12",
    slug: "degradacion-suelo-calvillo",
    title: "Análisis de la Degradación del Suelo en Calvillo",
    territory: "Calvillo, Aguascalientes"
  }
};
