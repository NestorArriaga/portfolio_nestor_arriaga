export const project07Data = {
  id: "07",
  slug: "pendiente-metztitlan",
  title: "Cálculo de Pendiente en Cuatro Intervalos para la Reserva de la Biosfera en Metztitlán, Hidalgo",
  shortTitle: "Pendiente en Intervalos",
  territory: "Reserva de la Biosfera en Metztitlán, Hidalgo",
  sourcePages: [15],
  themes: ["Pendiente", "Relieve", "Geomorfología", "Intervalos", "Estructura del paisaje", "Procesos superficiales", "Planificación territorial", "Conservación", "Gestión de recursos"],
  accent: "var(--color-accent-mineral)", // Amarillo, naranja, rojo
  summary: "Representación cartográfica de la pendiente en cuatro intervalos porcentuales para la Reserva de la Biosfera en Metztitlán, Hidalgo.",
  introduction: "La pendiente permite diferenciar la inclinación del terreno y observar cómo cambia la estructura del relieve dentro de Metztitlán. En este proyecto, el territorio se organiza en cuatro intervalos porcentuales que facilitan una lectura comparativa de sus formas.",
  secondaryContext: "El portafolio vincula esta representación con la interpretación de procesos superficiales y con la necesidad de una planificación territorial fundamentada en las condiciones físicas del paisaje.",
  slopeIntervals: [
    { id: "01", range: "0–10%", name: "INTERVALO 01", color: "#fbc02d", description: "Intervalo de pendiente representado en la clasificación cartográfica del proyecto." },
    { id: "02", range: "10–25%", name: "INTERVALO 02", color: "#f57c00", description: "Intervalo de pendiente representado en la clasificación cartográfica del proyecto." },
    { id: "03", range: "25–50%", name: "INTERVALO 03", color: "#e64a19", description: "Intervalo de pendiente representado en la clasificación cartográfica del proyecto." },
    { id: "04", range: ">50%", name: "INTERVALO 04", color: "#c62828", description: "Intervalo de pendiente representado en la clasificación cartográfica del proyecto." }
  ],
  observations: [
    "La cartografía diferencia cuatro intervalos porcentuales de pendiente.",
    "La clasificación permite observar variaciones en la inclinación del terreno dentro del territorio representado.",
    "El portafolio relaciona estas variaciones con una lectura más amplia de los procesos geomorfológicos del paisaje.",
    "La representación se plantea como apoyo para la planificación territorial, la conservación y la gestión de recursos."
  ],
  process: [
    { step: 1, title: "Delimitación", description: "Delimitación del territorio." },
    { step: 2, title: "Representación", description: "Representación de la inclinación del terreno." },
    { step: 3, title: "Organización", description: "Organización en cuatro intervalos porcentuales." },
    { step: 4, title: "Construcción", description: "Construcción de la leyenda." },
    { step: 5, title: "Lectura", description: "Lectura comparativa del relieve." },
    { step: 6, title: "Composición", description: "Composición cartográfica final." }
  ],
  terminologyWarning: "El texto descriptivo de la página utiliza la expresión 'intervalos de profundidad', mientras que el título, la leyenda y los porcentajes representan intervalos de pendiente. La versión web adopta 'pendiente' y registra la discrepancia editorial.",
  limitations: "El mapa representa intervalos de pendiente. La página no muestra superficies por clase, parámetros de cálculo, fuente del modelo de elevación ni resultados de validación.",
  processLimitation: "Secuencia reconstruida a partir del contenido mostrado en el portafolio. La página no documenta fuente, resolución, software, fórmula ni procedimiento detallado de cálculo.",
  previousProject: {
    id: "06",
    slug: "zonas-ecologicas-metztitlan",
    title: "Zonas Ecológicas",
    territory: "Metztitlán, Hidalgo"
  },
  nextProject: {
    id: "08",
    slug: "geomorfones-representativos",
    title: "Geomorfones Representativos",
    territory: "Metztitlán, Hidalgo"
  }
};
