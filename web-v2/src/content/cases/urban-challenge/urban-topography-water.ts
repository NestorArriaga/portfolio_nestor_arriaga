export const urbanTopographyWater = {
  chapterId: "07",
  title: "TOPOGRAFÍA Y COMPORTAMIENTO HÍDRICO",
  shortTitle: "TOPOGRAFÍA Y AGUA",
  sourcePages: [42],
  
  chapterIntroduction: {
    statement: "El proyecto fundamenta su diseño en el parque hundido (antigua sascabera) y la cuenca urbana.",
    concepts: [
      "Parque hundido",
      "Topografía existente",
      "Dinámica hídrica del suelo",
      "Infiltración natural",
      "Continuidad hídrica",
      "Estructura elevada",
      "Anfiteatro hundido"
    ]
  },
  
  topographicEvidence: {
    statement: "MORFOLOGÍA HUNDIDA REPRESENTADA EN LA PROPUESTA",
    note: "Las páginas no muestran cotas, curvas de nivel, pendientes ni un levantamiento topográfico verificable."
  },
  
  hydrologicalBehavior: {
    terms: ["COMPORTAMIENTO HÍDRICO", "DINÁMICA HÍDRICA DEL SUELO", "INFILTRACIÓN NATURAL", "CONTINUIDAD HÍDRICA"],
    statement: "El diseño busca mantener la relación del suelo con la infiltración y evitar que la estructura interrumpa completamente esa condición.",
    note: "La página no presenta pruebas de suelo, tasas de infiltración, escurrimientos o modelación hidráulica."
  },

  elevatedStructure: {
    statement: "La propuesta busca organizar el recorrido mediante estructuras elevadas (pasarela, estructura anular) y conservar la relación del terreno con la infiltración.",
    status: ["design-intention", "performance-not-verified"]
  },

  amphitheaterAnticipation: {
    statement: "El anfiteatro hundido aprovecha la topografía existente y se plantea como infraestructura social activa.",
    note: "ANTICIPACIÓN DEL SISTEMA DE INTERVENCIÓN. Su desarrollo completo corresponde al Plan Maestro."
  },
  
  integratedReading: {
    title: "DEL VACÍO URBANO A LOS CRITERIOS DE INTERVENCIÓN",
    sequence: {
      fabric: "El parque aparece contenido por una trama edificada.",
      edges: "La relación con el entorno permite reconocer condicionantes y accesos potenciales.",
      climate: "La fuente incorpora viento y comportamiento térmico.",
      topography: "La condición hundida organiza la lectura espacial.",
      water: "La propuesta busca conservar infiltración y continuidad hídrica.",
      design: "Vegetación, recorridos, sombra y estructuras ligeras responden a esa lectura."
    },
    note: "LECTURA INTEGRADA DESCRITA POR EL PORTAFOLIO."
  },

  limitations: [
    "Las relaciones topográficas e hídricas se presentan como intenciones de diseño, no como desempeño modelado.",
    "No se muestran delimitaciones de cuenca, volúmenes de almacenamiento o cálculo de escurrimientos."
  ],
  
  figureIds: ["project-15-topography-water-context-full", "project-15-site-response-preview"],
  claimIds: [],
  warningIds: ["topography-not-quantified", "hydrological-behavior-not-modeled"],
  
  nextChapterTransition: "08",
  chapterStatus: "public"
};
