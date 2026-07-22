export const project02Data = {
  id: "02",
  slug: "captura-carbono-decozalapa",
  title: "Mapeo de Captura de Carbono y Delimitación de Zonas Críticas en la Cuenca de Decozalapa, Veracruz",
  shortTitle: "Captura de Carbono",
  territory: "Cuenca de Decozalapa, Veracruz",
  sourcePages: [12],
  themes: ["Captura de carbono", "Cuenca", "Función ecológica", "Zonas críticas", "Cartografía ambiental", "Conservación"],
  accent: "var(--color-accent-red)", // Assuming red accent for project 02
  summary: "El proyecto representa espacialmente la captura de carbono y delimita zonas críticas dentro de la cuenca de Decozalapa. La lectura destaca el papel ecológico de la cuenca y la presencia de áreas con alto potencial de captura.",
  introduction: "La cartografía reúne función ecológica y análisis espacial para representar áreas con diferente potencial de captura de carbono dentro de la cuenca de Decozalapa. La delimitación de zonas críticas permite observar cómo esta función ambiental se distribuye territorialmente.",
  observations: [
    "La variación espacial del rango de captura de carbono se hace visible a lo largo de la cuenca.",
    "La cartografía destaca la concentración de áreas ecológicamente relevantes.",
    "La delimitación de la cuenca proporciona el límite para observar la función ambiental.",
    "Se identifican áreas diferenciadas que contribuyen al potencial de captura regional."
  ],
  process: [
    { step: 1, title: "Delimitación", description: "Delimitación de la cuenca." },
    { step: 2, title: "Representación Espacial", description: "Representación del rango de captura." },
    { step: 3, title: "Identificación Visual", description: "Identificación visual de zonas diferenciadas." },
    { step: 4, title: "Zonificación Crítica", description: "Delimitación de áreas críticas." },
    { step: 5, title: "Composición", description: "Composición cartográfica final." }
  ],
  warnings: [
    "La cifra 924.5 km² presente en la página 12 no se extrajo como indicador principal dado que su asociación semántica exacta (superficie de la cuenca vs áreas óptimas) no está confirmada sin ambigüedades."
  ],
  nextProject: {
    id: "03",
    slug: "zonas-optimas-limon-cafe",
    title: "Análisis de Zonas Óptimas para el Cultivo de Limón y Café",
    territory: "Cuenca de Decozalapa, Veracruz"
  }
};
