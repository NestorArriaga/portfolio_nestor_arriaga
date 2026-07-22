export const urbanPages = [
  {
    pdfPage: 41,
    casePage: 1,
    title: "Apertura del Proyecto",
    function: "introduction",
    act: "ACTO I — SITIO Y PROBLEMA",
    chapterIds: ["00", "01", "02", "03"],
    sourceTextId: "urban-text-p41",
    previewAssetId: "project-15-urban-opening",
    detectedAssetIds: ["project-15-urban-opening-work"],
    designPhase: "diagnostic",
    claims: [
      "riesgos climáticos, hídricos y térmicos",
      "cuenca urbana"
    ],
    intentions: [
      "infraestructura verde"
    ],
    sources: ["Portafolio original, p. 41"],
    credits: ["Sin crédito independiente confirmado para la imagen tallada"],
    warnings: ["urban-basin-conceptual-status"],
    auditImage: "page-41-urban-introduction-audit.png",
    confidence: "high"
  },
  {
    pdfPage: 42,
    casePage: 2,
    title: "Lectura del Sitio y Organización Preliminar",
    function: "context-and-schema",
    act: "ACTO II — LECTURA DEL LUGAR",
    chapterIds: ["04", "05", "06", "07"],
    sourceTextId: "urban-text-p42",
    previewAssetId: "project-15-urban-massing-model",
    detectedAssetIds: [
      "project-15-urban-massing-model-work",
      "project-15-preliminary-plan-work",
      "project-15-radial-plan-work",
      "project-15-ring-plan-work",
      "project-15-amphitheater-plan-work"
    ],
    designPhase: "schema",
    claims: [
      "vacío estructural",
      "trama compacta",
      "comportamiento térmico"
    ],
    intentions: [
      "ventilación cruzada"
    ],
    sources: ["Portafolio original, p. 42"],
    credits: [],
    warnings: ["wind-thermal-simulation-undocumented"],
    auditImage: "page-42-site-modeling-audit.png",
    confidence: "high"
  },
  {
    pdfPage: 43,
    casePage: 3,
    title: "Sistema Integrado de Intervención",
    function: "master-plan",
    act: "ACTO III — SISTEMA DE INTERVENCIÓN",
    chapterIds: ["08", "09", "10", "11", "12"],
    sourceTextId: "urban-text-p43",
    previewAssetId: "project-15-site-master-plan",
    detectedAssetIds: [
      "project-15-site-master-plan-work",
      "project-15-elevated-spine-work"
    ],
    designPhase: "development",
    claims: [],
    intentions: [
      "sombra",
      "infiltración",
      "continuidad hídrica"
    ],
    sources: ["Portafolio original, p. 43"],
    credits: [],
    warnings: ["environmental-performance-not-quantified"],
    auditImage: "page-43-integrated-design-audit.png",
    confidence: "high"
  },
  {
    pdfPage: 44,
    casePage: 4,
    title: "Nodo Central y Sistema Anular",
    function: "detail",
    act: "ACTO IV — ESPACIO Y VIDA COTIDIANA",
    chapterIds: ["13"],
    sourceTextId: "urban-text-p44",
    previewAssetId: "project-15-central-ring-axonometric",
    detectedAssetIds: [
      "project-15-central-ring-axonometric-work",
      "project-15-central-ring-detail-work"
    ],
    designPhase: "detail",
    claims: [],
    intentions: [
      "encuentro comunitario",
      "superficie permeable"
    ],
    sources: ["Portafolio original, p. 44"],
    credits: [],
    warnings: ["community-participation-not-documented"],
    auditImage: "page-44-central-ring-audit.png",
    confidence: "high"
  },
  {
    pdfPage: 45,
    casePage: 5,
    title: "Espacio de Juego y Contexto Aéreo",
    function: "detail-and-context",
    act: "ACTO IV — ESPACIO Y VIDA COTIDIANA",
    chapterIds: ["14", "15"],
    sourceTextId: "urban-text-p45",
    previewAssetId: "project-15-play-ring-render",
    detectedAssetIds: [
      "project-15-play-ring-render-work",
      "project-15-aerial-context-west-work",
      "project-15-aerial-context-east-work"
    ],
    designPhase: "detail",
    claims: [
      "Parque Pedro Infante Hundido"
    ],
    intentions: [
      "juego",
      "movimiento corporal"
    ],
    sources: ["Portafolio original, p. 45"],
    credits: ["Posible copyright de proveedor de satélite en p. 45"],
    warnings: ["aerial-images-comparison-undefined"],
    aerialComparisonStatus: "unverified",
    auditImage: "page-45-play-and-aerial-context-audit.png",
    confidence: "high"
  }
];
