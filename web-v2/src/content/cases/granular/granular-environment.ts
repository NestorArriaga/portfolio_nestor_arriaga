export const granularEnvironment = {
  chapterId: "environment",
  title: "AMBIENTE",
  shortTitle: "SOPORTE BIOFÍSICO Y LÍMITES ECOLÓGICOS",
  sourcePages: [34, 35],
  dimension: "environment",
  scales: ["regional"],
  
  chapterIntroduction: {
    title: "LO QUE SOSTIENE TAMBIÉN LIMITA",
    text1: "El pilar ambiental analiza las condiciones ecológicas que sostienen —y al mismo tiempo limitan— las actividades humanas dentro del territorio.",
    text2: "En una región semiárida como la Comarca Lagunera, el portafolio relaciona estas condiciones con la intensificación agrícola, la sobreexplotación hídrica y la transformación del paisaje.",
    text3: "La lectura considera cobertura del suelo, degradación ambiental y disponibilidad de recursos naturales para observar la relación entre procesos productivos y límites ecológicos.",
    text4: "El ambiente aparece así como soporte biofísico y como componente para interpretar la sostenibilidad o fragilidad de las dinámicas rurales."
  },

  concepts: [
    "COBERTURA DEL SUELO",
    "DEGRADACIÓN AMBIENTAL",
    "DISPONIBILIDAD DE RECURSOS NATURALES",
    "PROCESOS PRODUCTIVOS",
    "LÍMITES ECOLÓGICOS"
  ],

  soilClassification: {
    title: "CLASIFICACIÓN FUNCIONAL DEL SUELO",
    disclaimer: "La expresión 'funcional' se utiliza en la versión web para distinguir esta composición de una taxonomía edafológica oficial. Los nombres de las seis clases se conservan conforme a la página fuente.",
    classes: [
      {
        id: "class-1",
        name: "AGRÍCOLAS BASTANTE FÉRTILES",
        color: "VERDE BRILLANTE",
        desc: "Suelos de valle, con buena retención de agua y nutrientes, sostienen los cultivos de riego más productivos."
      },
      {
        id: "class-2",
        name: "AGRÍCOLAS DE REGULAR O BAJA PRODUCTIVIDAD",
        color: "VERDE AMARILLENTO VIVO",
        desc: "Menor fertilidad natural; requieren fertilización y riego constante para mantener rendimientos."
      },
      {
        id: "class-3",
        name: "AGRÍCOLAS DEPENDIENTES DEL CLIMA",
        color: "AMARILLO FUERTE",
        desc: "Suelos de temporal; su productividad varía según las lluvias y presentan alta vulnerabilidad a sequías."
      },
      {
        id: "class-4",
        name: "CON EXCESO DE SALES",
        color: "AZUL VIVO",
        desc: "Suelos afectados por salinidad y sodicidad; limitan el crecimiento de cultivos convencionales."
      },
      {
        id: "class-5",
        name: "EROSIONADOS APTOS PARA PASTIZALES",
        color: "NARANJA FUERTE",
        desc: "Suelos degradados, con poca capacidad agrícola; aún sostienen vegetación natural o uso ganadero extensivo."
      },
      {
        id: "class-6",
        name: "JÓVENES CON POCO DESARROLLO",
        color: "COBRE",
        desc: "Suelos incipientes, poco evolucionados, comunes en piedemontes y laderas."
      }
    ],
    caption: "Clasificación funcional del suelo representada en la Comarca Lagunera mediante seis clases productivas y ambientales descritas en la página fuente.",
    sourceNote: "Fuente no identificada de forma explícita en la composición del portafolio. La página no documenta la metodología ni la fuente utilizada para delimitar las seis clases. La versión web conserva la clasificación sin asignarle equivalencias con sistemas edafológicos externos."
  },

  environmentalReading: {
    title: "UN TERRITORIO CON CAPACIDADES Y RESTRICCIONES DISTINTAS",
    text1: "La clasificación diferencia áreas descritas mediante condiciones de fertilidad, dependencia climática, salinidad, erosión y desarrollo del suelo.",
    text2: "Dentro de la narrativa del portafolio, estas diferencias permiten observar que las posibilidades productivas no se distribuyen de manera homogénea y que cada zona enfrenta límites ambientales distintos.",
    text3: "La lectura no determina usos obligatorios ni sustituye estudios de suelo detallados."
  },

  limitations: {
    title: "ALCANCE DOCUMENTADO",
    text: "La versión web conserva las seis clases, sus colores y sus descripciones. Los vacíos de metodología, fuente y cuantificación permanecen explícitos y no se completan mediante clasificaciones externas.",
    points: [
      "No se documenta metodología de clasificación.",
      "No se documenta fuente, fecha o escala.",
      "No se documentan superficies ni porcentajes.",
      "No se presentan unidades taxonómicas ni parámetros de fertilidad.",
      "No se presentan análisis de laboratorio ni valores de salinidad/sodicidad.",
      "No se presenta grado de erosión ni rendimientos medidos.",
      "No se muestran cambios temporales.",
      "Las descripciones productivas deben mantenerse atribuidas.",
      "La clasificación no equivale a una regulación de uso."
    ]
  },

  nextChapterPreview: {
    number: "08",
    title: "CONECTIVIDAD",
    sourcePages: [35],
    status: "PRÓXIMO CAPÍTULO",
    titleTransition: "DE LAS CONDICIONES DEL SUELO A LAS RELACIONES DE DISTANCIA",
    desc1: "Las condiciones ambientales describen capacidades y restricciones del territorio. La conectividad añade otra pregunta: qué tan próximas o alejadas se encuentran las localidades respecto de los centros urbanos representados.",
    desc2: "La distancia no sustituye el análisis de infraestructura, transporte o servicios, pero permite organizar una lectura espacial inicial."
  }
};
