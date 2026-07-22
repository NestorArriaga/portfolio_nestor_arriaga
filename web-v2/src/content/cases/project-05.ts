export const project05Data = {
  id: "05",
  slug: "geomorfologia-metztitlan",
  title: "Análisis Geomorfológico de la Reserva de la Biosfera en Metztitlán, Hidalgo: Caracterización y Evaluación de las Formas del Terreno",
  shortTitle: "Formas del Terreno",
  territory: "Reserva de la Biosfera en Metztitlán, Hidalgo",
  sourcePages: [14],
  themes: ["Geomorfología", "Geomorfones", "Relieve", "Pendiente", "Curvatura", "Formas del terreno", "Procesos formativos", "Planificación territorial", "Conservación", "Gestión ambiental"],
  accent: "var(--color-accent-mineral)", // Amarillo mineral / cian / magenta en la UI
  summary: "Análisis geomorfológico y caracterización de formas del terreno mediante patrones de geomorfones en Metztitlán, Hidalgo.",
  introduction: "Metztitlán aparece en el portafolio como un territorio leído a través de sus formas. La clasificación del relieve y los patrones geomorfológicos permiten observar cómo la estructura física organiza el paisaje.",
  geomorphonDefinition: {
    title: "CLASIFICAR LA FORMA DEL TERRENO",
    text: "Los geomorfones son herramientas computacionales de la geomorfología que permiten identificar patrones del terreno y clasificar unidades a partir de características morfológicas como la pendiente y la curvatura. Su representación facilita la lectura de las formas dominantes del paisaje.",
    subtext: "Dentro del proyecto, esta clasificación se utiliza para interpretar procesos formativos, apoyar la planificación del uso del suelo y orientar la gestión ambiental y la conservación."
  },
  patterns: [
    {
      id: "01",
      name: "CIMA + CRESTA + ESPOLÓN",
      description: "Este conjunto representa formas elevadas y continuidades del relieve. El portafolio lo relaciona con procesos de levantamiento y con la evolución de estructuras montañosas."
    },
    {
      id: "02",
      name: "DEPRESIÓN + VALLE + HONDONADA",
      description: "Representa áreas bajas y relieves descendentes asociados con acumulación de sedimentos y agua, circulación hídrica, erosión y desarrollo de ecosistemas particulares."
    },
    {
      id: "03",
      name: "HONDONADA + PIE DE MONTE + VALLE + DEPRESIÓN",
      description: "Combina áreas de erosión concentrada, transiciones entre elevaciones y valles, formas vinculadas con procesos fluviales y sectores donde puede acumularse agua."
    }
  ],
  observations: [
    "La clasificación organiza el territorio mediante formas reconocibles del relieve.",
    "Los patrones combinan unidades elevadas, transiciones y áreas deprimidas.",
    "La lectura de estas formas aporta una base territorial para interpretar procesos ambientales y apoyar decisiones de planificación."
  ],
  process: [
    { step: 1, title: "Delimitación", description: "Delimitación del territorio." },
    { step: 2, title: "Lectura", description: "Lectura de características morfológicas." },
    { step: 3, title: "Clasificación", description: "Clasificación de unidades geomorfológicas." },
    { step: 4, title: "Agrupación", description: "Agrupación en patrones representativos." },
    { step: 5, title: "Interpretación", description: "Interpretación de formas del terreno." },
    { step: 6, title: "Composición", description: "Composición cartográfica final." }
  ],
  warnings: [
    "Las interpretaciones corresponden al contenido presentado en la página 14 del portafolio; no se muestran en esta página parámetros, superficies ni resultados de validación."
  ],
  previousProject: {
    id: "04",
    slug: "uso-optimo-suelo-limon-cafe",
    title: "Uso Óptimo de Suelo",
    territory: "Cuenca de Decozalapa, Veracruz"
  },
  nextProject: {
    id: "06",
    slug: "zonas-ecologicas-metztitlan",
    title: "Zonas Ecológicas",
    territory: "Metztitlán, Hidalgo"
  }
};
