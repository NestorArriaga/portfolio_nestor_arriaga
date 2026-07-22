export const granularClaims = [
  // WATER - Page 22 (Apertura)
  { id: "claim-water-axis", page: 22, text: "eje estructurante", dimension: "water", type: "source-interpretation", status: "visually-associated" },
  { id: "claim-water-agri-condition", page: 22, text: "condicionamiento de agricultura", dimension: "water", type: "source-interpretation", status: "visually-associated" },
  { id: "claim-water-health", page: 22, text: "relación con salud pública", dimension: "water", type: "source-interpretation", status: "visually-associated" },
  { id: "claim-water-power", page: 22, text: "relaciones de poder", dimension: "water", type: "source-interpretation", status: "visually-associated" },
  { id: "claim-water-engine", page: 22, text: "motor productivo", dimension: "water", type: "source-interpretation", status: "visually-associated" },
  { id: "claim-water-vuln", page: 22, text: "vulnerabilidad ambiental y social", dimension: "water", type: "source-interpretation", status: "visually-associated" },

  // WATER - Page 23 (Calidad)
  { id: "claim-water-arsenic", page: 23, text: "presencia de arsénico", dimension: "water", type: "direct-text", status: "visually-associated" },
  { id: "claim-water-nitrates", page: 23, text: "presencia de nitratos", dimension: "water", type: "direct-text", status: "visually-associated" },
  { id: "claim-water-coliforms", page: 23, text: "presencia de coliformes", dimension: "water", type: "direct-text", status: "visually-associated" },
  { id: "claim-water-quality-4-levels", page: 23, text: "Niveles Alto, Medio, Bajo y Sin riesgo aparente", dimension: "water", type: "direct-figure", status: "visually-associated" },
  { id: "claim-water-quality-3-levels", page: 23, text: "el análisis hidro-social muestra tres niveles de severidad", dimension: "water", type: "direct-text", status: "visually-associated" },
  { id: "claim-water-central-strip", page: 23, text: "franja central", dimension: "water", type: "source-interpretation", status: "visually-associated" },
  { id: "claim-water-examples-trc", page: 23, text: "Torreón y Gómez Palacio", dimension: "water", type: "direct-text", status: "visually-associated" },
  
  // WATER - Page 24 (Acuíferos)
  { id: "claim-aquifer-status", page: 24, text: "Crítico, Límite, Sobreexplotado y Sostenible", dimension: "water", type: "direct-figure", status: "visually-associated" },
  { id: "claim-aquifer-ranges", page: 24, text: "rangos de extracción respecto a recarga", dimension: "water", type: "direct-text", status: "visually-associated" },
  { id: "claim-aquifer-examples", page: 24, text: "San Juan de Guadalupe, Mapimí, Nazas, Santa Clara, Torreón, Gómez Palacio", dimension: "water", type: "direct-text", status: "visually-associated" },
  { 
    id: "claim-aquifer-deficit-150", 
    page: 24, 
    text: "déficit superior al 150%", 
    dimension: "water", 
    type: "source-claim-unverified", 
    publicUseRecommendation: "publish-with-attribution",
    status: "visually-associated" 
  },
  { id: "claim-aquifer-principal", page: 24, text: "Principal-Región Lagunera", dimension: "water", type: "direct-text", status: "visually-associated" },
  { id: "claim-water-scarcity-geo", page: 24, text: "geografía de la escasez", dimension: "water", type: "source-narrative", status: "visually-associated" },
  { id: "claim-water-hidrosocial-vuln", page: 24, text: "gradiente de vulnerabilidad hidro-social", dimension: "water", type: "source-narrative", status: "visually-associated" },
  { id: "claim-water-crisis", page: 24, text: "Crisis hídrica", dimension: "water", type: "source-narrative", status: "visually-associated" },
  
  // AGRICULTURE
  { id: "claim-irrigation-ha", page: 26, text: "366,912 ha de riego", dimension: "agriculture", type: "direct-text", status: "visually-associated" },
  { id: "claim-rainfed-ha", page: 26, text: "135,541 ha de temporal", dimension: "agriculture", type: "direct-text", status: "visually-associated" },
  { id: "claim-irrigation-examples", page: 26, text: "municipios mencionados para riego", dimension: "agriculture", type: "source-interpretation", status: "visually-associated" },
  { id: "claim-rainfed-examples", page: 26, text: "municipios mencionados para temporal", dimension: "agriculture", type: "source-interpretation", status: "visually-associated" },
  { id: "claim-irrigation-range", page: 26, text: "superficies 20,000–30,000 ha", dimension: "agriculture", type: "direct-text", status: "visually-associated" },
  { id: "claim-rainfed-range", page: 26, text: "superficies superiores a 10,000 ha", dimension: "agriculture", type: "direct-text", status: "visually-associated" },
  { id: "claim-forage-pct", page: 27, text: "más de 70% de superficie bajo riego destinada a forrajes", dimension: "agriculture", type: "direct-text", status: "visually-associated" },
  { id: "claim-food-pct", page: 27, text: "menos de 10% destinada a cultivos alimentarios directos", dimension: "agriculture", type: "direct-text", status: "visually-associated" },
  { id: "claim-cows-not-people", page: 27, text: "Alimentar vacas, no personas / Paradoja hídrica", dimension: "agriculture", type: "source-narrative", status: "visually-associated" },
  { id: "claim-forage-munis", page: 27, text: "municipios forrajeros", dimension: "agriculture", type: "source-interpretation", status: "visually-associated" },
  { id: "claim-forage-crops", page: 27, text: "cultivos forrajeros", dimension: "agriculture", type: "source-interpretation", status: "visually-associated" },
  { id: "claim-cotton-munis", page: 27, text: "municipios algodoneros", dimension: "agriculture", type: "source-interpretation", status: "visually-associated" },
  { id: "claim-cotton-decline", page: 27, text: "algodón en declive", dimension: "agriculture", type: "source-interpretation", status: "visually-associated" },
  { id: "claim-transition-munis", page: 27, text: "municipios de transición", dimension: "agriculture", type: "source-interpretation", status: "visually-associated" },
  { id: "claim-metro-zones", page: 27, text: "zonas metropolitanas", dimension: "agriculture", type: "source-interpretation", status: "visually-associated" },
  { id: "claim-chord-nodes", page: 27, text: "nodos fuertes del chord", dimension: "agriculture", type: "source-interpretation", status: "visually-associated" },
  { id: "claim-drought-levels", page: 28, text: "Muy alto, Alto, Medio, Bajo, Muy bajo", dimension: "agriculture", type: "direct-figure", status: "visually-associated" },
  { id: "claim-drought-torreon", page: 28, text: "Torreón ~79%", dimension: "agriculture", type: "direct-text", status: "visually-associated" },
  { id: "claim-drought-medium-range", page: 28, text: "categoría media 40–50%", dimension: "agriculture", type: "direct-text", status: "visually-associated" },
  { id: "claim-drought-low-range", page: 28, text: "categoría muy baja <10%", dimension: "agriculture", type: "direct-text", status: "visually-associated" },
  { id: "claim-productive-localities-count", page: 29, text: "1,400 localidades", dimension: "agriculture", type: "direct-text", status: "visually-associated" },
  { id: "claim-productive-localities-levels", page: 29, text: "clases Alta, Media y Baja", dimension: "agriculture", type: "direct-figure", status: "visually-associated" },
  { id: "claim-productive-localities-examples", page: 29, text: "ejemplos de localidades", dimension: "agriculture", type: "source-interpretation", status: "visually-associated" },
  { id: "claim-productive-localities-pct", page: 29, text: "más de 60% de localidades de alta productividad en el corredor central", dimension: "agriculture", type: "direct-text", status: "visually-associated" },
  { id: "claim-central-corridor", page: 29, text: "corredor central", dimension: "agriculture", type: "source-interpretation", status: "visually-associated" },
  { id: "claim-territorial-inequality", page: 29, text: "desigualdad territorial", dimension: "agriculture", type: "source-narrative", status: "visually-associated" },

  // GOVERNANCE
  { id: "claim-anp-ha", page: 31, text: "más de 342,000 ha para la Reserva de la Biósfera de Mapimí", dimension: "governance", type: "direct-text", status: "visually-associated" },
  { id: "claim-anp-distribution", page: 31, text: "Durango 62.9%, Coahuila 22.4%, Chihuahua 14.7%", dimension: "governance", type: "direct-text", status: "visually-associated" },
  { id: "claim-anp-first", page: 31, text: "Primera en México y América Latina", dimension: "governance", type: "source-claim-unverified", status: "visually-associated" },
  { id: "claim-governance-grey-zones", page: 31, text: "zonas grises de gobernanza", dimension: "governance", type: "source-interpretation", status: "visually-associated" },

  // SOCIOECONOMY
  { id: "claim-commuting-high", page: 33, text: "más del 60%", dimension: "socioeconomy", type: "direct-text", status: "visually-associated" },
  { id: "claim-commuting-low", page: 33, text: "menos del 30%", dimension: "socioeconomy", type: "direct-text", status: "visually-associated" },
  { id: "claim-commuting-dormitory", page: 33, text: "territorios dormitorio del corredor metropolitano", dimension: "socioeconomy", type: "source-interpretation", status: "visually-associated" },
  { id: "claim-margination-low", page: 33, text: "IMN > 0.85", dimension: "socioeconomy", type: "direct-text", status: "visually-associated" },
  { id: "claim-margination-high", page: 33, text: "IMN < 0.70", dimension: "socioeconomy", type: "direct-text", status: "visually-associated" },
  { id: "claim-margination-exclusion", page: 33, text: "exclusión territorial", dimension: "socioeconomy", type: "source-interpretation", status: "visually-associated" },
  { id: "claim-margination-less-500", page: 33, text: "menos de 500 habitantes", dimension: "socioeconomy", type: "direct-text", status: "visually-associated" },

  // ENVIRONMENT
  { id: "claim-soil-productivity-1", page: 35, text: "bastante fértiles", dimension: "environment", type: "source-interpretation", status: "visually-associated" },
  { id: "claim-soil-productivity-2", page: 35, text: "regular o baja productividad", dimension: "environment", type: "source-interpretation", status: "visually-associated" },
  { id: "claim-soil-weather-dependence", page: 35, text: "dependientes del clima", dimension: "environment", type: "source-interpretation", status: "visually-associated" },

  // CONNECTIVITY
  { id: "claim-distance-accessibility-high", page: 35, text: "Alta accesibilidad, confluencia de transporte y mercados laborales", dimension: "connectivity", type: "source-interpretation", status: "visually-associated" },
  { id: "claim-distance-accessibility-medium", page: 35, text: "Conectividad media; dependen de carreteras secundarias y transporte rural", dimension: "connectivity", type: "source-interpretation", status: "visually-associated" },
  { id: "claim-distance-accessibility-low", page: 35, text: "Baja conectividad; muestran mayor aislamiento físico y menor acceso a servicios básicos", dimension: "connectivity", type: "source-interpretation", status: "visually-associated" },

  // CLUSTERING & TYPOLOGIES
  { id: "claim-cluster-core", page: 36, text: "Núcleo agroindustrial altamente integrado", dimension: "clustering", type: "source-interpretation", status: "visually-associated" },
  { id: "claim-cluster-intermediate", page: 36, text: "Anillo intermedio de transición productiva", dimension: "clustering", type: "source-interpretation", status: "visually-associated" },
  { id: "claim-cluster-periphery", page: 36, text: "Periferia rural más vulnerable y menos conectada", dimension: "clustering", type: "source-interpretation", status: "visually-associated" },
  { id: "claim-relation-density", page: 37, text: "mayor densidad de interacciones", dimension: "clustering", type: "source-interpretation", status: "visually-associated" },
  { id: "claim-relation-hinge", page: 37, text: "bisagra", dimension: "clustering", type: "source-interpretation", status: "visually-associated" },
  { id: "claim-relation-isolated", page: 37, text: "más aislado", dimension: "clustering", type: "source-interpretation", status: "visually-associated" },
  { id: "claim-typology-diversity", page: 39, text: "comprender la diversidad rural regional", dimension: "typology", type: "source-narrative", status: "visually-associated" },

  // SYNTHESIS & SYSTEM TERRITORIAL (Block 22)
  { id: "claim-results-reveal", page: 40, text: "Resultados que revelan una base robusta para políticas públicas", dimension: "policy", type: "source-narrative", status: "visually-associated" },
  { id: "claim-causal-loop-clear", page: 40, text: "una representación causal clara", dimension: "system", type: "source-interpretation", status: "visually-associated" },
  { id: "claim-weighted-flows", page: 40, text: "se dirigen los flujos ponderados de cada pilar", dimension: "system", type: "source-claim-unverified", status: "visually-associated" },
  { id: "claim-robust-base", page: 40, text: "una base robusta para políticas públicas más situadas, coherentes y sensibles a la diversidad rural", dimension: "policy", type: "source-projection", status: "visually-associated" }
];
