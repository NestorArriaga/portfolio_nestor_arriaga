export const granularWater = {
  chapterId: "water",
  title: "AGUA",
  shortTitle: "EL EJE ESTRUCTURANTE DEL TERRITORIO",
  sourcePages: [22, 23, 24],
  dimension: "water",
  scales: ["regional", "municipal"],
  
  chapterIntroduction: {
    title: "UN RECURSO QUE ORGANIZA EL TERRITORIO",
    text1: "En la Comarca Lagunera, el portafolio presenta el agua como una dimensión que atraviesa la producción, las condiciones ambientales y las relaciones sociales. Su disponibilidad, calidad y distribución condicionan tanto la agricultura como la viabilidad urbana y rural.",
    text2: "El análisis considera que el agua puede operar simultáneamente como soporte productivo y como fuente de vulnerabilidad ambiental y social.",
    text3: "Esta doble condición organiza el capítulo: primero se observa la calidad del recurso y después la presión territorial sobre los acuíferos.",
  },

  conceptualVariables: [
    "DISPONIBILIDAD",
    "CALIDAD",
    "DISTRIBUCIÓN",
    "USO AGRÍCOLA"
  ],

  qualitySection: {
    title: "CALIDAD DEL AGUA",
    subtitle: "PATRONES Y SEVERIDAD",
    sourcePage: 23,
    caption: "Mapa de calidad del agua en la Comarca Lagunera con categorías de severidad Alto, Medio, Bajo y Sin riesgo aparente.",
    sourceNote: "Fuente no identificada de forma explícita en la composición del portafolio.",
    centralStripNote: "La lectura del portafolio concentra su atención en la franja central de La Laguna y la interpreta como un espacio donde presión hídrica, actividad agrícola y calidad del agua se superponen. La composición no documenta en esta página un análisis causal, temporal ni estadístico que permita atribuir cada patrón a una sola fuente."
  },

  qualityCategories: [
    {
      id: "alto",
      name: "ALTO",
      desc: "El texto lo relaciona con núcleos contaminados y con pozos agrícolas de uso intensivo, utilizando Torreón y Gómez Palacio como ejemplos.",
      color: "#FF3366" // approximate from typical vulnerability maps, will use a thematic color
    },
    {
      id: "medio",
      name: "MEDIO",
      desc: "El texto lo relaciona con zonas periurbanas, extracción dispersa y presencia intermitente de bacterias y nitratos.",
      color: "#FF9933"
    },
    {
      id: "bajo",
      name: "BAJO",
      desc: "El texto lo relaciona con localidades periféricas y menor presión hídrica, aclarando que no están libres de riesgo.",
      color: "#FFCC00"
    },
    {
      id: "sin-riesgo",
      name: "SIN RIESGO APARENTE",
      desc: "Categoría visible en la leyenda original. La página no desarrolla en el texto sus criterios, valores o alcance.",
      warning: "La leyenda incluye esta categoría, pero el texto de la página no desarrolla su definición ni criterios.",
      color: "#66CC99"
    }
  ],

  aquiferSection: {
    title: "ESTADO DE LOS ACUÍFEROS",
    subtitle: "EN LA COMARCA LAGUNERA",
    sourcePage: 24,
    caption: "Mapa del estado de los acuíferos de la Comarca Lagunera con las categorías Crítico, Límite, Sobreexplotado y Sostenible.",
    sourceNote: "El texto del portafolio se refiere a un balance oficial de recarga–descarga, sin que la institución o referencia completa sea legible en esta composición.",
    scarcityGeoNote: "La interpretación del portafolio describe una presión escalonada: el centro metropolitano y agroindustrial se relaciona con acuíferos sobreexplotados, mientras distintas áreas periféricas aparecen asociadas con condiciones de límite o criticidad. Esta lectura plantea que la crisis hídrica no se distribuye de forma homogénea y que sus efectos se vinculan con estructuras productivas y sociales distintas. La página no muestra una medición directa de vulnerabilidad social ni un modelo causal que cuantifique estas relaciones."
  },

  aquiferCategories: [
    {
      id: "critico",
      name: "CRÍTICO",
      range: ">100% de extracción",
      desc: "Sectores del oriente de Durango, con San Juan de Guadalupe y Mapimí como ejemplos, y déficits que superan el 150% respecto a la recarga.",
      color: "#990033"
    },
    {
      id: "sobreexplotado",
      name: "SOBREEXPLOTADO",
      range: "100–120%",
      desc: "Incluye el acuífero Principal-Región Lagunera, con Torreón y Gómez Palacio como ejemplos de concentración de pozos urbanos y agrícolas.",
      color: "#CC3333"
    },
    {
      id: "limite",
      name: "LÍMITE",
      range: "Aproximadamente 80–100%",
      desc: "Zonas de Nazas y Santa Clara.",
      color: "#FF9933"
    },
    {
      id: "sostenible",
      name: "SOSTENIBLE",
      range: "<80%",
      desc: "Áreas periféricas descritas como cada vez más escasas y con menor densidad de riego.",
      color: "#3399CC"
    }
  ],

  integratedReading: {
    title: "CALIDAD Y DISPONIBILIDAD NO SON EL MISMO PROBLEMA",
    text1: "Los dos mapas muestran dimensiones distintas de una misma tensión territorial: uno se refiere a la calidad del recurso y otro a la presión sobre los sistemas subterráneos.",
    text2: "La proximidad conceptual entre ambos problemas no sustituye un análisis estadístico o causal, que no se documenta en estas páginas."
  },

  limitations: {
    title: "ALCANCE DOCUMENTADO",
    text: "La versión web conserva categorías, ejemplos y afirmaciones presentes en las páginas 22–24. Cuando la fuente no documenta parámetros, temporalidad o criterios de clasificación, esos vacíos permanecen explícitos y no se completan mediante información externa.",
    points: [
      "No se muestran concentraciones, unidades, fechas ni número total de pozos.",
      "No se detalla el método de muestreo ni el procedimiento de clasificación.",
      "No se presenta un balance volumétrico completo ni una serie temporal.",
      "Existe discrepancia en el número de niveles de calidad del agua entre texto y leyenda.",
      "Existe superposición textual en los rangos de acuíferos.",
      "Algunas afirmaciones tienen carácter interpretativo y no proceden de causalidad comprobada."
    ]
  },

  nextChapterPreview: {
    number: "04",
    title: "AGRICULTURA",
    sourcePages: [25, 26, 27, 28, 29],
    desc: "El sistema productivo de la Comarca Lagunera depende de la disponibilidad y distribución del agua. El siguiente capítulo observará agricultura de riego y temporal, estructura de cultivos, vulnerabilidad a la sequía y localidades agroproductivas. La lectura hídrica conduce hacia la estructura productiva: comprender dónde y cómo se utiliza el agua permite situar las preguntas agrícolas que siguen.",
    status: "PRÓXIMO CAPÍTULO"
  }
};
