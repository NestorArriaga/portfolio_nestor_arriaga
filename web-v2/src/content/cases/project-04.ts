export const project04Data = {
  id: "04",
  slug: "uso-optimo-suelo-limon-cafe",
  title: "Análisis de Uso Óptimo de Suelo para el Cultivo de Limón y Café en la Cuenca de Decozalapa, Veracruz",
  shortTitle: "Uso Óptimo del Suelo",
  territory: "Cuenca de Decozalapa, Veracruz",
  sourcePages: [13],
  themes: ["Uso óptimo del suelo", "Agricultura", "Café", "Limón", "Cuenca", "Aptitud territorial", "Planificación agrícola", "Gestión sostenible de recursos", "Zona templada subhúmeda"],
  accent: "var(--color-accent-earth)", // Un color terroso, marrón o naranja quemado.
  summary: "El proyecto analiza el uso del suelo para los cultivos de café y limón dentro de la cuenca de Decozalapa, destacando áreas continuas compatibles con su aptitud territorial.",
  introduction: "El café y el limón forman parte de sistemas agrícolas vinculados con las condiciones climáticas y edáficas de Veracruz. Dentro de este contexto, la cuenca de Decozalapa aporta una base territorial donde suelo, agua y clima participan en la continuidad de la actividad productiva.",
  environmentalRelations: {
    suelo: "Base física para el establecimiento de los cultivos.",
    clima: "Condición ambiental vinculada con su adaptación regional.",
    agua: "Recurso territorial relacionado con la continuidad productiva."
  },
  observations: [
    "La cartografía representa la cuenca como unidad de análisis para el uso del suelo.",
    "El texto relaciona café y limón con condiciones de suelo, clima y disponibilidad de agua.",
    "La lectura plantea la conservación de estas condiciones territoriales como parte de la continuidad productiva."
  ],
  process: [
    { step: 1, title: "Delimitación", description: "Delimitación del área de estudio." },
    { step: 2, title: "Reconocimiento", description: "Reconocimiento de la cuenca como unidad territorial." },
    { step: 3, title: "Consideración", description: "Consideración de suelo, clima y agua." },
    { step: 4, title: "Representación", description: "Representación del uso del suelo asociado con café y limón." },
    { step: 5, title: "Composición", description: "Composición cartográfica final." }
  ],
  warnings: [
    "La etiqueta 'Temperate Sub-Humid Zone' presente en la cartografía se conserva visualmente, pero no se extrapolaron rangos climáticos adicionales al no estar documentados en la foja."
  ],
  previousProject: {
    id: "03",
    slug: "zonas-optimas-limon-cafe",
    title: "Análisis de Zonas Óptimas",
    territory: "Cuenca de Decozalapa, Veracruz"
  },
  nextProject: {
    id: "05",
    slug: "geomorfologia-metztitlan",
    title: "Análisis Geomorfológico de la Reserva de la Biosfera en Metztitlán, Hidalgo",
    territory: "Metztitlán, Hidalgo"
  }
};
