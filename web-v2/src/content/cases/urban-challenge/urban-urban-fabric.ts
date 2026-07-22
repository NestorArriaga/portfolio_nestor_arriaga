export const urbanUrbanFabric = {
  chapterId: "04",
  title: "TEJIDO URBANO Y VACÍO ESTRUCTURAL",
  shortTitle: "TEJIDO URBANO",
  sourcePages: [42],
  
  chapterIntroduction: {
    statement: "La intervención inició con la modelación tridimensional del tejido urbano inmediato.",
    purpose: [
      "Comprender el parque como vacío estructural.",
      "Situarlo dentro de una trama compacta.",
      "Observar relaciones de borde.",
      "Reconocer accesos potenciales.",
      "Identificar condicionantes espaciales.",
      "Comprender el comportamiento del sitio."
    ]
  },
  
  modelAssets: {
    modelA: "project-15-urban-fabric-model-a-full",
    modelB: "project-15-urban-fabric-model-b-full",
    comparison: "project-15-urban-fabric-comparison"
  },
  
  modelDescriptions: {
    modelA: {
      title: "MODELO VOLUMÉTRICO A",
      caption: "El parque como vacío entre edificaciones."
    },
    modelB: {
      title: "MODELO VOLUMÉTRICO B",
      caption: "Segunda perspectiva del tejido urbano inmediato."
    },
    explanation: "Los modelos representan el tejido construido que contiene el parque y permiten observar la diferencia entre el vacío del sitio y las edificaciones circundantes."
  },
  
  structuralVoidReading: {
    blocks: [
      {
        title: "LLENO",
        description: "Edificaciones que contienen el sitio."
      },
      {
        title: "VACÍO",
        description: "Espacio central sin edificación representado como parque."
      },
      {
        title: "BORDE",
        description: "Relación espacial entre el vacío y el tejido inmediato."
      }
    ],
    note: "La noción de vacío estructural corresponde a la lectura morfológica presentada por la página."
  },

  compactFabricTreatment: "La página describe a las edificaciones como homogéneas y a la trama como compacta.",
  homogeneityTreatment: "La composición no muestra alturas, dimensiones, usos, escala o parámetros que permitan cuantificar esa homogeneidad.",
  
  limitations: [
    "No se documenta software, fuente geométrica, escala ni alturas.",
    "La homogeneidad y compactación de la trama no están cuantificadas.",
    "Los modelos no son navegables; el vacío estructural es una interpretación morfológica."
  ],
  
  figureIds: ["project-15-urban-fabric-comparison", "project-15-urban-fabric-model-a-full", "project-15-urban-fabric-model-b-full"],
  claimIds: [],
  warningIds: ["urban-fabric-homogeneity-not-quantified", "page-42-analysis-methods-not-documented"],
  
  nextChapterTransition: "05",
  chapterStatus: "public"
};
