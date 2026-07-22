export const project03Data = {
  id: "03",
  slug: "zonas-optimas-limon-cafe",
  title: "Análisis de Zonas Óptimas para el Cultivo de Limón y Café en la Cuenca de Decozalapa, Veracruz",
  shortTitle: "Zonas Óptimas de Cultivo",
  territory: "Cuenca de Decozalapa, Veracruz",
  sourcePages: [12],
  themes: ["Agricultura", "Aptitud territorial", "Zonificación", "Café", "Limón", "Análisis espacial", "Planeación agrícola"],
  accent: "var(--color-accent-green)", // Assuming a green accent for project 03
  summary: "El mapa destaca mediante puntos negros las zonas consideradas óptimas para el cultivo de café y limón. El texto las relaciona con condiciones de suelo, altitud y clima y plantea su utilidad para orientar la planificación agrícola.",
  introduction: "El proyecto utiliza una representación de zonificación para destacar áreas consideradas óptimas para el cultivo de café y limón dentro de la cuenca de Decozalapa. La lectura relaciona estas áreas con condiciones de suelo, altitud y clima.",
  observations: [
    "El mapa concentra la lectura en zonas seleccionadas dentro de la cuenca.",
    "Los puntos negros representan las áreas consideradas óptimas.",
    "La zonificación se relaciona en el texto con suelo, altitud y clima.",
    "La cartografía se plantea como apoyo para orientar la producción hacia áreas de mayor aptitud."
  ],
  process: [
    { step: 1, title: "Delimitación", description: "Delimitación del área de estudio." },
    { step: 2, title: "Consideración de Criterios", description: "Consideración de suelo, altitud y clima." },
    { step: 3, title: "Identificación de Condiciones", description: "Identificación de áreas con condiciones favorables." },
    { step: 4, title: "Zonificación", description: "Representación mediante puntos." },
    { step: 5, title: "Composición", description: "Composición del mapa de distribución potencial." }
  ],
  criteria: [
    { name: "SUELO", description: "Características edafológicas del terreno." },
    { name: "ALTITUD", description: "Elevación topográfica relevante para el cultivo." },
    { name: "CLIMA", description: "Condiciones meteorológicas y temperatura." }
  ],
  warnings: [
    "La cifra 924.5 km² presente en la página 12 no se etiquetó como superficie óptima debido a que el portafolio original no detalla a qué polígono exacto hace referencia.",
    "El portafolio menciona los criterios de suelo, altitud y clima, pero no documenta en esta página sus rangos ni ponderaciones exactas."
  ],
  previousProject: {
    id: "02",
    slug: "captura-carbono-decozalapa",
    title: "Mapeo de Captura de Carbono",
    territory: "Cuenca de Decozalapa, Veracruz"
  },
  nextProject: {
    id: "04",
    slug: "uso-optimo-suelo-limon-cafe",
    title: "Análisis de Uso Óptimo de Suelo para el Cultivo de Limón y Café",
    territory: "Cuenca de Decozalapa, Veracruz"
  }
};
