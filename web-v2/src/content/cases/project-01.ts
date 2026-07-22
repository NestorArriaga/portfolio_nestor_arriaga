export const project01Data = {
  id: "01",
  slug: "areas-verdes-miguel-hidalgo",
  title: "Mapeo y Análisis de Áreas Verdes en la Alcaldía Miguel Hidalgo",
  shortTitle: "Áreas Verdes",
  territory: "Alcaldía Miguel Hidalgo, Ciudad de México",
  sourcePages: [10],
  themes: ["Cartografía urbana", "Áreas verdes", "Análisis territorial", "Paisaje urbano"],
  summary: "El proyecto analiza la relación entre resiliencia urbana y preservación ecológica mediante la cartografía de espacios verdes, corredores de biodiversidad y áreas de recreación pública.",
  metrics: [
    {
      value: "417,416",
      label: "Habitantes"
    },
    {
      value: "929,230.8",
      unit: "m²",
      label: "Superficie de áreas verdes"
    },
    {
      value: "2.2",
      unit: "m²",
      label: "Por habitante"
    },
    {
      value: "1.38%",
      label: "De la superficie total de áreas verdes de la ciudad"
    }
  ],
  observations: [
    "La superficie verde constituye una fracción limitada dentro del sistema urbano representado.",
    "La disponibilidad promedio se expresa en 2.2 m² de área verde por habitante.",
    "La cartografía permite observar la distribución espacial de los espacios verdes dentro de la alcaldía."
  ],
  process: [
    { step: 1, title: "Delimitación", description: "Definición del territorio de estudio." },
    { step: 2, title: "Representación", description: "Cartografía base de las áreas verdes." },
    { step: 3, title: "Organización", description: "Estructura espacial por colonia." },
    { step: 4, title: "Cálculo", description: "Superficie de áreas verdes." },
    { step: 5, title: "Relación", description: "Intersección con datos poblacionales." },
    { step: 6, title: "Composición", description: "Cartografía final." }
  ],
  nextProject: {
    id: "02",
    slug: "captura-carbono-decozalapa",
    title: "Mapeo de Captura de Carbono y Delimitación de Zonas Críticas",
    territory: "Veracruz"
  }
};
