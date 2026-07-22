export const project10Data = {
  id: "10",
  slug: "aptitud-conservacion-aguascalientes",
  title: "Mapa de Aptitud para la Conservación",
  shortTitle: "Aptitud para la Conservación",
  reportTitle: "Propuestas Metodológicas para la Planeación del Desarrollo Rural con Enfoque Territorial",
  territory: "Estado de Aguascalientes, México",
  sourcePages: [18],
  themes: ["Aptitud para la conservación", "Planeación rural", "Enfoque territorial", "Cobertura del suelo", "Vegetación natural", "Áreas forestales", "Fragilidad del ecosistema", "Áreas Naturales Protegidas", "Sitios Ramsar", "Función hidrológica forestal", "Corrientes de agua", "Sitios prioritarios de conservación", "CONABIO", "Pendiente", "Inundación", "Ponderación de atributos", "Análisis geoespacial", "Sostenibilidad", "Protección ambiental"],
  accent: "#4caf50", // Verde territorial
  summary: "Mapa de aptitud para la conservación basado en cinco atributos territoriales ponderados en Aguascalientes.",
  introduction: {
    title: "RECONOCER CONDICIONES PARA CONSERVAR",
    text: "El proyecto evalúa la aptitud para la conservación mediante criterios que integran cobertura natural, fragilidad ecológica, función hidrológica y condiciones físicas del terreno. La ponderación permite reunir estos componentes dentro de una lectura territorial común.",
    subtext: "El mapa se plantea como una base para orientar decisiones de uso del suelo y apoyar la preservación de los recursos naturales."
  },
  aptitudeDefinition: {
    text: "Según la formulación recuperada en el portafolio, la aptitud sectorial analiza características ambientales y territoriales para valorar el potencial de un área frente a requerimientos agrícolas o de conservación.",
    attribution: "SEMARNAT (2015)"
  },
  attributes: [
    {
      id: "cover",
      label: "TIPO DE COBERTURA DEL SUELO",
      detail: "Áreas forestales y vegetación natural.",
      weight: 0.25,
      sourceValue: "0.25"
    },
    {
      id: "hydrology",
      label: "FUNCIÓN HIDROLÓGICA FORESTAL",
      detail: "Corrientes de agua y sitios prioritarios de conservación según CONABIO.",
      weight: 0.25,
      sourceValue: "0.25"
    },
    {
      id: "fragility",
      label: "FRAGILIDAD DEL ECOSISTEMA",
      detail: "Áreas Naturales Protegidas y sitios Ramsar.",
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
    { label: "NULO", description: "Nivel representado dentro de la clasificación de aptitud del sector de conservación.", color: "#cccccc" },
    { label: "MEDIO", description: "Nivel representado dentro de la clasificación de aptitud del sector de conservación.", color: "#8bc34a" },
    { label: "ALTO", description: "Nivel representado dentro de la clasificación de aptitud del sector de conservación.", color: "#2e7d32" }
  ],
  observations: [
    "La evaluación integra cinco atributos ponderados.",
    "Cobertura del suelo y función hidrológica forestal reciben los pesos individuales más altos, ambos con 0.25.",
    "Fragilidad del ecosistema tiene un peso de 0.20.",
    "Pendiente y distancia de áreas propensas a inundación tienen un peso de 0.15 cada una.",
    "El mapa organiza el resultado en niveles Nulo, Medio y Alto."
  ],
  limitations: "La página original no documenta metodologías estadísticas adicionales, fuentes de datos detalladas, superficie por clase, ni resultados de validación en campo.",
  previousProject: {
    id: "09",
    slug: "vocaciones-productivas-aguascalientes",
    title: "Vocaciones Productivas",
    territory: "Estado de Aguascalientes"
  },
  nextProject: {
    id: "11",
    slug: "aptitud-agricola-aguascalientes",
    title: "Aptitud Agrícola",
    territory: "Estado de Aguascalientes"
  }
};
