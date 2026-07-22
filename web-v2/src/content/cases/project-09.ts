export const project09Data = {
  id: "09",
  slug: "vocaciones-productivas-aguascalientes",
  title: "Análisis de Clúster para la Identificación de Vocaciones Productivas en el Estado de Aguascalientes",
  shortTitle: "Vocaciones Productivas",
  reportTitle: "Propuestas Metodológicas para la Planeación del Desarrollo Rural con Enfoque Territorial",
  territory: "Estado de Aguascalientes, México",
  sourcePages: [17],
  themes: ["Análisis de clúster", "K-means", "Vocaciones productivas", "Planeación rural", "Enfoque territorial", "Conservación", "Agricultura", "Límites administrativos"],
  accent: "var(--color-accent-agri)", // Naranja/Verde
  summary: "Análisis de clúster para representar orientaciones productivas municipales en el estado de Aguascalientes.",
  introduction: "Aguascalientes aparece en el portafolio como un territorio vinculado con identidad, pertenencia y memoria. Desde Calvillo, lugar de origen del autor, la lectura del paisaje se extiende hacia la planeación rural, la conservación, la agricultura y el manejo de los recursos naturales.",
  vocationDefinition: {
    title: "¿QUÉ PUEDE SOSTENER UN TERRITORIO?",
    text: "La vocación territorial no se limita a determinar si un suelo es físicamente adecuado. En el proyecto se plantea como una lectura integral que considera factores ecológicos, sociales y económicos para identificar actividades productivas compatibles con las características de cada región.",
    attribution: "Jara (2008)",
    quote: "La capacidad de un área para desarrollar ciertas actividades productivas de manera sostenible."
  },
  conceptualReferences: {
    title: "AGRUPAR PARA DIFERENCIAR",
    text: "El portafolio menciona como referencia el trabajo de Rathwell y Peterson (2012), quienes organizaron municipios de las cuencas de los ríos Richelieu y Yamaska, en Quebec, en grupos productivos vinculados con servicios ecosistémicos y límites biofísicos.",
    subtext: "El análisis adapta esta idea al contexto de Aguascalientes utilizando los límites administrativos de la entidad como referencia para integrar información y organizar regiones con orientaciones productivas diferentes."
  },
  methodologyRoute: [
    { step: 1, text: "IDENTIFICACIÓN Y/O CARACTERIZACIÓN DE CLÚSTERES" },
    { step: 2, text: "ANÁLISIS DE CLÚSTER (K-MEANS) PARA VOCACIONES PRODUCTIVAS REGIONALES" },
    { step: 3, text: "ANÁLISIS DE APTITUD TERRITORIAL Y SECTORES ESPECÍFICOS EN EL MARCO DEL NEARSHORING" },
    { step: 4, text: "FOCALIZACIÓN Y/O PLANIFICACIÓN DE PROGRAMAS POR REGIÓN" }
  ],
  clusters: [
    {
      id: "cluster-2",
      label: "CLÚSTER 2",
      orientation: "ORIENTADO A LA CONSERVACIÓN",
      colorToken: "#4caf50", // Verde
      description: "La descripción identifica municipios con áreas rurales y agrícolas más pequeñas y casi sin uso forestal. El texto relaciona estas características con una menor presión sobre los recursos naturales y con una orientación hacia la preservación ambiental.",
      recommendationsMentioned: [
        "fortalecer la protección ambiental",
        "explorar vías de desarrollo sostenible alineadas con la conservación"
      ],
      visibleLabels: ["San José de Gracia", "Calvillo", "Asientos", "Aguascalientes"],
      warning: null
    },
    {
      id: "cluster-1",
      label: "CLÚSTER 1",
      orientation: "AGRÍCOLA",
      colorToken: "#ff9800", // Naranja
      description: "La descripción señala municipios con grandes áreas rurales, una alta proporción de tierras agrícolas y de riego, además de algunas áreas de conservación. El enfoque se presenta como rural y agroindustrial, orientado a equilibrar producción y protección ambiental.",
      recommendationsMentioned: [
        "mejorar la infraestructura de riego",
        "promover prácticas agrícolas sostenibles",
        "conservar los recursos naturales"
      ],
      visibleLabels: ["El Llano", "Tepezalá", "Asientos", "Cosío", "Pabellón de Arteaga", "San Francisco de los Romo", "Jesús María"],
      warning: "Asientos aparece también etiquetado dentro del Clúster 2 en la página original."
    }
  ],
  observations: [
    "La cartografía organiza los municipios mediante dos orientaciones productivas.",
    "El clúster verde se describe con énfasis en conservación y menor presión sobre los recursos naturales.",
    "El clúster naranja se describe mediante una mayor presencia rural, agrícola y de riego.",
    "El análisis se plantea como apoyo para focalizar programas y orientar la planeación regional."
  ],
  sourceWarnings: [
    "El título y el mapa presentan un análisis estatal con unidades municipales, mientras que el párrafo introductorio utiliza la expresión 'municipio de Aguascalientes'. La versión web conserva el alcance indicado por el título y registra la discrepancia."
  ],
  limitations: "La página no documenta variables, valores, parámetros, validación estadística ni pertenencia municipal definitiva más allá de las etiquetas visibles en la composición.",
  previousProject: {
    id: "08",
    slug: "geomorfones-representativos",
    title: "Geomorfones Representativos",
    territory: "Metztitlán, Hidalgo"
  },
  nextProject: {
    id: "10",
    slug: "aptitud-conservacion-aguascalientes",
    title: "Aptitud para la Conservación",
    territory: "Estado de Aguascalientes"
  }
};
