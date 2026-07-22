export const granularConnectivity = {
  chapterId: "connectivity",
  title: "CONECTIVIDAD",
  shortTitle: "DISTANCIAS Y PATRONES ESPACIALES",
  sourcePages: [35],
  dimension: "connectivity",
  scales: ["localidad", "territorial"],
  
  chapterIntroduction: {
    title: "LA DISTANCIA COMO LECTURA TERRITORIAL",
    text1: "La página organiza las localidades mediante tres rangos de distancia respecto de centros urbanos.",
    text2: "Cada rango se vincula en la fuente con una condición distinta de accesibilidad, transporte, relación con mercados laborales y acceso a servicios.",
    text3: "La composición no documenta el método de distancia, la red utilizada ni la identidad de todos los centros urbanos."
  },

  distanceClasses: {
    title: "TRES RANGOS ESPACIALES",
    classes: [
      {
        id: "menos-10",
        name: "LOCALIDADES A MENOS DE 10 KM DE LOS CENTROS URBANOS",
        desc: "Alta accesibilidad, confluencia de transporte y mercados laborales."
      },
      {
        id: "entre-10-30",
        name: "LOCALIDADES ENTRE 10–30 KM",
        desc: "Conectividad media; dependen de carreteras secundarias y transporte rural."
      },
      {
        id: "mas-30",
        name: "LOCALIDADES A MÁS DE 30 KM",
        desc: "Baja conectividad; muestran mayor aislamiento físico y menor acceso a servicios básicos."
      }
    ],
    caption: "Representación de localidades de la Comarca Lagunera mediante rangos de distancia respecto de centros urbanos y líneas de relación espacial.",
    sourceNote: "La página no documenta el método de distancia ni presenta un inventario textual completo de los centros utilizados. Fuente no identificada de forma explícita en la composición del portafolio.",
    methodUndefinedNote: "La composición no especifica si las distancias corresponden a línea recta, red vial u otro procedimiento."
  },

  connectivityReading: {
    title: "PROXIMIDAD, ACCESO Y AISLAMIENTO",
    text1: "La clasificación organiza el territorio mediante tres rangos de distancia y vincula la proximidad urbana con distintas condiciones de acceso.",
    text2: "Las localidades más cercanas aparecen relacionadas con transporte y mercados laborales; las intermedias, con carreteras secundarias y transporte rural; y las más alejadas, con mayor aislamiento físico y menor acceso a servicios básicos.",
    text3: "Estas relaciones corresponden a la interpretación de la página y no sustituyen una evaluación completa de infraestructura, frecuencia de transporte, calidad vial o disponibilidad real de servicios."
  },

  environmentConnectivityComparison: {
    title: "DOS CONDICIONES DE LA RURALIDAD",
    envLabel: "AMBIENTE",
    envDesc: "Describe capacidades y restricciones biofísicas.",
    connLabel: "CONECTIVIDAD",
    connDesc: "Describe relaciones de proximidad respecto de centros urbanos.",
    text1: "Las condiciones ambientales y la conectividad observan dimensiones distintas del territorio. Una se concentra en el soporte biofísico; la otra, en la posición espacial de las localidades.",
    text2: "La página no combina ambas dimensiones dentro de un índice conjunto. Su integración ocurre posteriormente dentro del análisis de clustering."
  },

  commutingComparison: {
    title: "DISTANCIA Y DESPLAZAMIENTO NO SON LA MISMA VARIABLE",
    text1: "La conectividad organiza localidades mediante rangos de distancia. El commuting representa desplazamientos cotidianos. Aunque ambos temas se relacionan con acceso y movilidad, las páginas no documentan una equivalencia ni un análisis conjunto."
  },

  limitations: {
    title: "ALCANCE DOCUMENTADO",
    text: "La versión web conserva los tres rangos y las relaciones espaciales representadas en la página. La ausencia de método, red de referencia y centros urbanos explícitos impide convertir la figura en una medición interactiva de accesibilidad.",
    points: [
      "No se documenta el método de distancia.",
      "No se documenta si se utilizó red vial ni tiempos de viaje.",
      "No se documenta fecha ni se identifica la fuente.",
      "No se listan todos los centros urbanos.",
      "No se muestra número de localidades ni porcentajes por rango.",
      "No se presentan frecuencias de transporte ni calidad de carreteras.",
      "No se presentan servicios concretos ni mercados laborales medidos.",
      "Las líneas no deben interpretarse como rutas.",
      "Conectividad y commuting no son equivalentes.",
      "Las relaciones de acceso son interpretaciones de la fuente."
    ]
  },

  nextChapterPreview: {
    number: "09",
    title: "CLUSTERING MUNICIPAL",
    sourcePages: [36, 37],
    status: "SIGUIENTE CAPÍTULO",
    desc1: "Las seis dimensiones han sido presentadas por separado. El siguiente capítulo observará cómo agua, agricultura, gobernanza, socioeconomía, ambiente y conectividad se integran dentro de una clasificación territorial a escala municipal.",
    desc2: "Después de observar cada dimensión por separado, el análisis avanza hacia su integración. El clustering municipal busca reconocer tipologías que emergen de la coincidencia espacial de los seis pilares."
  }
};
