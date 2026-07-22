import { granularProjectData } from "./granular-project";
import { granularChapters } from "./granular-chapters";

export const granularFoundation = {
  project: granularProjectData,
  chapters: granularChapters,
  
  hero: {
    backgroundAssetId: "project-14-municipal-clusters-work", 
    fallbackAssetId: "project-14-water-quality-map-work", 
    title: {
      number: "14",
      line1: "TIPOLOGÍAS",
      line2: "RURALES",
      line3: "SITUADAS",
      territory: "COMARCA LAGUNERA"
    }
  },

  chapter00: {
    id: "project-intro",
    title: "UN TERRITORIO MÚLTIPLES RURALIDADES",
    text1: "La clasificación genérica de un territorio como rural puede ocultar diferencias fundamentales en acceso al agua, estructura productiva, capacidad institucional, condiciones sociales, ambiente y conectividad.",
    text2: "El caso de la Comarca Lagunera utiliza estas diferencias para construir una lectura situada y multiescalar de la ruralidad.",
  },

  chapter01: {
    id: "compass",
    title: "RURAL DIVERSITY COMPASS",
    subtitle: "Un marco para observar la diversidad territorial más allá de una definición única de ruralidad.",
    disclaimer: "Las seis dimensiones organizan preguntas distintas sobre el territorio. En esta apertura no representan puntuaciones ni jerarquías.",
    dimensions: [
      { id: "water", number: "01", name: "AGUA", colorVar: "var(--granular-dim-water)", desc: "Disponibilidad, calidad y condición de los sistemas hídricos que estructuran el territorio." },
      { id: "agriculture", number: "02", name: "AGRICULTURA", colorVar: "var(--granular-dim-agriculture)", desc: "Distribución productiva, riego, temporal, cultivos y vulnerabilidad del sistema agroproductivo." },
      { id: "governance", number: "03", name: "GOBERNANZA", colorVar: "var(--granular-dim-governance)", desc: "Instituciones, normas, áreas de conservación, actores y superposiciones territoriales." },
      { id: "socioeconomy", number: "04", name: "SOCIOECONOMÍA", colorVar: "var(--granular-dim-socioeconomy)", desc: "Condiciones de vida, acceso a oportunidades, desigualdad, servicios y relaciones sociales." },
      { id: "environment", number: "05", name: "AMBIENTE", colorVar: "var(--granular-dim-environment)", desc: "Coberturas, recursos, degradación y límites ecológicos del territorio." },
      { id: "connectivity", number: "06", name: "CONECTIVIDAD", colorVar: "var(--granular-dim-connectivity)", desc: "Relaciones de distancia, acceso y articulación entre localidades, servicios y centros territoriales." }
    ]
  },

  chapter02: {
    id: "scales",
    title: "DOS ESCALAS UN MISMO TERRITORIO",
    text1: "La escala municipal permite organizar patrones regionales y comparar estructuras territoriales amplias. Sin embargo, una clasificación municipal puede ocultar diferencias internas.",
    text2: "La escala de localidad permite aproximarse a esa heterogeneidad y observar configuraciones más próximas a la vida cotidiana, la producción y el acceso a recursos.",
    text3: "La articulación de ambas escalas sostiene la construcción de tipologías rurales situadas.",
    scales: [
      { id: "regional", name: "REGIONAL", desc: "Contexto de la Comarca Lagunera como sistema territorial." },
      { id: "municipal", name: "MUNICIPAL", desc: "Escala utilizada para observar estructuras, contrastes y agrupaciones entre municipios." },
      { id: "localidad", name: "LOCALIDAD", desc: "Escala utilizada para observar heterogeneidad interna y diferencias que una clasificación municipal puede ocultar." }
    ]
  },

  conceptFlow: {
    title: "DE LAS DIMENSIONES A LAS TIPOLOGÍAS",
    disclaimer: "Esta sección presenta la arquitectura conceptual del análisis. Los procedimientos, resultados y tipologías se desarrollan en capítulos posteriores.",
    steps: [
      "TERRITORIO",
      "SEIS DIMENSIONES",
      "ESCALA MUNICIPAL",
      "ESCALA DE LOCALIDAD",
      "INTEGRACIÓN TERRITORIAL",
      "TIPOLOGÍAS RURALES SITUADAS"
    ]
  },

  nextChapterPreview: {
    id: "water",
    number: "03",
    title: "AGUA",
    sourcePages: [22, 23, 24],
    desc: "El agua funciona como uno de los ejes estructurantes del territorio lagunero. El siguiente capítulo abordará calidad del agua, severidad de contaminantes y condición de los acuíferos a partir de las representaciones del portafolio.",
    status: "PRÓXIMO CAPÍTULO"
  }
};
