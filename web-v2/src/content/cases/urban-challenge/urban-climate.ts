export const urbanClimate = {
  chapterId: "06",
  title: "VIENTO Y COMPORTAMIENTO TÉRMICO",
  shortTitle: "VIENTO Y CALOR",
  sourcePages: [42],
  
  chapterIntroduction: {
    statement: "A partir de la lectura morfológica se incorporó el análisis de flujos de viento predominantes y comportamiento térmico.",
    orientation: [
      "Masas arbóreas.",
      "Recorridos.",
      "Dispositivos de sombra.",
      "Configuración espacial."
    ]
  },
  
  windAnalysis: {
    term: "FLUJOS DE VIENTO PREDOMINANTES",
    statement: "La página indica que el análisis consideró flujos predominantes para reconocer zonas de ventilación cruzada.",
    limitation: "La composición no presenta dirección, velocidad, periodo o condiciones de simulación.",
    crossVentilation: "ZONAS DE VENTILACIÓN CRUZADA (mencionadas como resultado sin validación de desempeño)"
  },
  
  thermalAnalysis: {
    term: "ÁREAS SUSCEPTIBLES A ACUMULACIÓN DE CALOR",
    limitation: "No existe un mapa térmico independiente visible en la página."
  },

  climateDesignRelationship: {
    sequence: ["LECTURA MORFOLÓGICA", "VIENTO Y CALOR", "MASAS ARBÓREAS", "RECORRIDOS", "SOMBRA"],
    statement: "El portafolio afirma que la lectura climática orientó la disposición de vegetación, recorridos y dispositivos de sombra.",
    note: "No se muestran alternativas comparadas ni resultados de desempeño."
  },
  
  limitations: [
    "No se documenta software, archivo climático, fecha ni escenarios.",
    "No se muestran escalas térmicas, direcciones, velocidades ni temperaturas.",
    "El dibujo de viento puede ser conceptual; la relación con vegetación es una decisión descrita, no un desempeño cuantificado."
  ],
  
  figureIds: ["project-15-climate-reading-full", "project-15-possible-wind-overlay"],
  claimIds: [],
  warningIds: ["wind-overlay-association-partial", "thermal-zones-not-visually-mapped"],
  
  nextChapterTransition: "07",
  chapterStatus: "public"
};
