export const project06Data = {
  id: "06",
  slug: "zonas-ecologicas-metztitlan",
  title: "Reclasificación de Uso de Suelo y Vegetación para Determinar Zonas Ecológicas en la Reserva de la Biosfera en Metztitlán, Hidalgo",
  shortTitle: "Unidades Ecológicas",
  territory: "Reserva de la Biosfera en Metztitlán, Hidalgo",
  sourcePages: [14],
  themes: ["Uso de suelo", "Vegetación", "Ecología del paisaje", "Zonificación ecológica", "Clima", "Suelo", "Litología", "Planificación espacial", "Gestión de recursos naturales", "Conservación", "Recursos hídricos", "Adaptación al cambio climático"],
  accent: "var(--color-accent-ecology)", // Verde/amarillo/naranja en UI
  summary: "Reclasificación de uso de suelo y vegetación para representar unidades ecológicas en Metztitlán, Hidalgo.",
  introduction: "Metztitlán aparece en el portafolio como un territorio leído a través de sus unidades ecológicas que permiten observar cómo la estructura ambiental organiza el paisaje.",
  landscapeEcology: {
    title: "EL PAISAJE COMO SISTEMA",
    text: "La reclasificación de uso de suelo y vegetación se plantea desde la ecología del paisaje, un enfoque que analiza los ecosistemas considerando factores integrados. En el mapa, clima, suelo, vegetación y litología contribuyen a distinguir unidades ecológicas con características ambientales diferentes.",
    subtext: "Esta lectura permite observar el territorio como un ensamblaje de zonas y no como una superficie homogénea."
  },
  integratedFactors: [
    { title: "CLIMA", description: "Condición ambiental considerada en la diferenciación de las unidades." },
    { title: "SUELO", description: "Componente territorial integrado en la lectura del paisaje." },
    { title: "VEGETACIÓN", description: "Cobertura utilizada dentro de la reclasificación representada." },
    { title: "LITOLOGÍA", description: "Base física mencionada como parte de los factores integrados." }
  ],
  ecologicalZones: [
    { id: "01", name: "ÁREAS DE EXCLUSIÓN", color: "#c62828", description: "Categoría incluida en la leyenda original; la página no especifica en este punto el criterio de exclusión." },
    { id: "02", name: "ZONA ÁRIDA", color: "#e65100", description: "Unidad ecológica representada en la reclasificación del paisaje." },
    { id: "03", name: "ZONA CÁLIDA SUBHÚMEDA", color: "#ffb300", description: "Unidad ecológica representada en la reclasificación del paisaje." },
    { id: "04", name: "ZONA DESÉRTICA", color: "#ff9800", description: "Unidad ecológica representada en la reclasificación del paisaje." },
    { id: "05", name: "ZONA SEMIÁRIDA", color: "#ffd54f", description: "Unidad ecológica representada en la reclasificación del paisaje." },
    { id: "06", name: "ZONA TEMPLADA HÚMEDA", color: "#2e7d32", description: "Unidad ecológica representada en la reclasificación del paisaje." },
    { id: "07", name: "ZONA TEMPLADA SUBHÚMEDA", color: "#1565c0", description: "Unidad ecológica representada en la reclasificación del paisaje." }
  ],
  observations: [
    "El mapa diferencia siete unidades ecológicas dentro del territorio representado.",
    "La reclasificación integra factores como clima, suelo, vegetación y litología.",
    "Las unidades expresan condiciones ambientales distintas dentro de un mismo paisaje.",
    "La zonificación se plantea como apoyo para la planificación espacial y la gestión de recursos naturales."
  ],
  planningApplications: [
    "Planificación espacial",
    "Gestión de recursos naturales",
    "Conservación",
    "Gestión de recursos hídricos",
    "Adaptación al cambio climático"
  ],
  process: [
    { step: 1, title: "Delimitación", description: "Delimitación del territorio." },
    { step: 2, title: "Consideración", description: "Consideración integrada de clima, suelo, vegetación y litología." },
    { step: 3, title: "Reclasificación", description: "Reclasificación de uso de suelo y vegetación." },
    { step: 4, title: "Diferenciación", description: "Diferenciación de unidades ecológicas." },
    { step: 5, title: "Organización", description: "Organización de la leyenda." },
    { step: 6, title: "Composición", description: "Composición cartográfica final." }
  ],
  warnings: [
    "La interpretación se limita al contenido documentado en la página 14 del portafolio.",
    "La página no documenta rangos, ponderaciones ni procedimientos de integración."
  ],
  previousProject: {
    id: "05",
    slug: "geomorfologia-metztitlan",
    title: "Formas del Terreno",
    territory: "Metztitlán, Hidalgo"
  },
  nextProject: {
    id: "07",
    slug: "pendiente-metztitlan",
    title: "Cálculo de Pendiente en Cuatro Intervalos para la Reserva de la Biosfera en Metztitlán, Hidalgo",
    territory: "Metztitlán, Hidalgo"
  }
};
