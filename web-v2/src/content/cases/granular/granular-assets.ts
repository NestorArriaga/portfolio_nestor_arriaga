export const granularAssets = [
  // Block 16 / Regional Foundation Assets
  {
    id: "project-14-marco-conceptual-work",
    sourcePage: 21,
    type: "text-figure",
    role: "chapter-cover",
    status: "partial"
  },
  
  // WATER (Block 17) Assets
  {
    id: "project-14-water-intro-work",
    sourcePage: 22,
    type: "chapter-cover",
    dimension: "water",
    scale: "regional",
    role: "chapter-cover",
    status: "audited"
  },
  {
    id: "project-14-water-quality-map-work",
    sourcePage: 23,
    type: "primary-map",
    dimension: "water",
    scale: "municipal",
    role: "hero-candidate",
    status: "audited",
    preserveLegend: true
  },
  {
    id: "project-14-aquifer-status-map-work",
    sourcePage: 24,
    type: "primary-map",
    dimension: "water",
    scale: "regional",
    role: "primary-map",
    status: "audited",
    preserveLegend: true
  },
  {
    id: "project-14-water-texture",
    sourcePage: 22,
    type: "texture",
    dimension: "water",
    scale: "regional",
    status: "audited"
  },

  // AGRICULTURE (Block 18) Assets
  {
    id: "project-14-agriculture-intro-work",
    sourcePage: 25,
    type: "chapter-cover",
    dimension: "agriculture",
    scale: "regional",
    role: "chapter-cover",
    status: "audited"
  },
  {
    id: "project-14-irrigation-rainfed-map-work",
    sourcePage: 26,
    type: "primary-map",
    dimension: "agriculture",
    scale: "municipal",
    role: "hero-candidate",
    status: "audited",
    preserveLegend: true
  },
  {
    id: "project-14-crops-chord-work",
    sourcePage: 27,
    type: "data-visualization",
    subtype: "chord-diagram",
    dimension: "agriculture",
    scale: "municipal",
    role: "primary-graphic",
    status: "audited",
    preserveLegend: true
  },
  {
    id: "project-14-drought-map-work",
    sourcePage: 28,
    type: "primary-map",
    dimension: "agriculture",
    scale: "municipal",
    role: "primary-map",
    status: "audited",
    preserveLegend: true
  },
  {
    id: "project-14-productive-localities-map-work",
    sourcePage: 29,
    type: "primary-map",
    dimension: "agriculture",
    scale: "localidad",
    role: "primary-map",
    status: "audited",
    preserveLegend: true
  },
  {
    id: "project-14-agriculture-texture",
    sourcePage: 27,
    type: "texture",
    dimension: "agriculture",
    scale: "municipal",
    status: "audited"
  },

  // GOVERNANCE (Block 19) Assets
  { id: "project-14-governance-chapter-hero", sourcePage: 30, type: "chapter-cover", dimension: "governance", scale: "regional", role: "chapter-cover", status: "audited" },
  { id: "project-14-governance-chapter-gallery", sourcePage: 30, type: "chapter-cover", dimension: "governance", scale: "regional", role: "gallery", status: "audited" },
  { id: "project-14-governance-territory-preview", sourcePage: 31, type: "primary-map", dimension: "governance", scale: "regional", role: "primary-map", status: "audited", preserveLegend: true },
  { id: "project-14-governance-territory-full", sourcePage: 31, type: "primary-map", dimension: "governance", scale: "regional", role: "primary-map", status: "audited", preserveLegend: true },
  { id: "project-14-governance-anp-detail", sourcePage: 31, type: "map-detail", dimension: "governance", scale: "regional", role: "detail", status: "audited" },
  { id: "project-14-governance-rtp-detail", sourcePage: 31, type: "map-detail", dimension: "governance", scale: "regional", role: "detail", status: "audited" },
  { id: "project-14-governance-intersection-preview", sourcePage: 31, type: "map-detail", dimension: "governance", scale: "regional", role: "detail", status: "audited" },
  { id: "project-14-governance-intersection-full", sourcePage: 31, type: "map-detail", dimension: "governance", scale: "regional", role: "detail", status: "audited" },
  { id: "project-14-governance-mapimi-detail", sourcePage: 31, type: "map-detail", dimension: "governance", scale: "regional", role: "detail", status: "audited" },
  { id: "project-14-governance-territory-silhouette", sourcePage: 31, type: "texture", dimension: "governance", scale: "regional", status: "audited" },
  { id: "project-14-governance-texture", sourcePage: 30, type: "texture", dimension: "governance", scale: "regional", status: "audited" },
  { id: "project-14-governance-to-socioeconomy-preview", sourcePage: 32, type: "chapter-cover", dimension: "socioeconomy", scale: "regional", status: "audited" },

  // SOCIOECONOMY (Block 19) Assets
  { id: "project-14-socioeconomy-chapter-hero", sourcePage: 32, type: "chapter-cover", dimension: "socioeconomy", scale: "regional", role: "chapter-cover", status: "audited" },
  { id: "project-14-socioeconomy-chapter-gallery", sourcePage: 32, type: "chapter-cover", dimension: "socioeconomy", scale: "regional", role: "gallery", status: "audited" },
  { id: "project-14-commuting-map-preview", sourcePage: 33, type: "primary-map", dimension: "socioeconomy", scale: "municipal", role: "primary-map", status: "audited", preserveLegend: true },
  { id: "project-14-commuting-map-full", sourcePage: 33, type: "primary-map", dimension: "socioeconomy", scale: "municipal", role: "primary-map", status: "audited", preserveLegend: true },
  { id: "project-14-commuting-legend", sourcePage: 33, type: "legend", dimension: "socioeconomy", scale: "municipal", status: "audited" },
  { id: "project-14-commuting-detail", sourcePage: 33, type: "map-detail", dimension: "socioeconomy", scale: "municipal", status: "audited" },
  { id: "project-14-margination-context-map-preview", sourcePage: 33, type: "primary-map", dimension: "socioeconomy", scale: "uncertain", role: "primary-map", status: "audited" },
  { id: "project-14-margination-context-map-full", sourcePage: 33, type: "primary-map", dimension: "socioeconomy", scale: "uncertain", role: "primary-map", status: "audited" },
  { id: "project-14-margination-localities-map-preview", sourcePage: 33, type: "primary-map", dimension: "socioeconomy", scale: "localidad", role: "primary-map", status: "audited", preserveLegend: true },
  { id: "project-14-margination-localities-map-full", sourcePage: 33, type: "primary-map", dimension: "socioeconomy", scale: "localidad", role: "primary-map", status: "audited", preserveLegend: true },
  { id: "project-14-margination-localities-detail", sourcePage: 33, type: "map-detail", dimension: "socioeconomy", scale: "localidad", status: "audited" },
  { id: "project-14-socioeconomic-territory-silhouette", sourcePage: 33, type: "texture", dimension: "socioeconomy", scale: "regional", status: "audited" },
  { id: "project-14-socioeconomic-texture", sourcePage: 32, type: "texture", dimension: "socioeconomy", scale: "regional", status: "audited" },
  { id: "project-14-socioeconomy-to-environment-preview", sourcePage: 34, type: "chapter-cover", dimension: "environment", scale: "regional", status: "audited" },

  // ENVIRONMENT (Block 20) Assets
  { id: "project-14-environment-chapter-hero", sourcePage: 34, type: "chapter-cover", dimension: "environment", scale: "regional", role: "chapter-cover", status: "audited" },
  { id: "project-14-environment-chapter-gallery", sourcePage: 34, type: "chapter-cover", dimension: "environment", scale: "regional", role: "gallery", status: "audited" },
  { id: "project-14-environment-satellite-texture", sourcePage: 34, type: "texture", dimension: "environment", scale: "regional", status: "audited" },
  { id: "project-14-environment-territory-silhouette", sourcePage: 34, type: "texture", dimension: "environment", scale: "regional", status: "audited" },
  { id: "project-14-soil-classification-map-preview", sourcePage: 35, type: "primary-map", dimension: "environment", scale: "regional", role: "primary-map", status: "audited", preserveLegend: true },
  { id: "project-14-soil-classification-map-full", sourcePage: 35, type: "primary-map", dimension: "environment", scale: "regional", role: "primary-map", status: "audited", preserveLegend: true },
  { id: "project-14-soil-classification-legend", sourcePage: 35, type: "legend", dimension: "environment", scale: "regional", status: "audited" },
  { id: "project-14-soil-classification-detail", sourcePage: 35, type: "map-detail", dimension: "environment", scale: "regional", status: "audited" },
  { id: "project-14-environment-to-connectivity-preview", sourcePage: 35, type: "primary-map", dimension: "connectivity", scale: "uncertain", status: "audited" },

  // CONNECTIVITY (Block 20) Assets
  { id: "project-14-connectivity-chapter-hero", sourcePage: 35, type: "chapter-cover", dimension: "connectivity", scale: "uncertain", role: "chapter-cover", status: "audited" },
  { id: "project-14-connectivity-chapter-gallery", sourcePage: 35, type: "chapter-cover", dimension: "connectivity", scale: "uncertain", role: "gallery", status: "audited" },
  { id: "project-14-connectivity-map-preview", sourcePage: 35, type: "primary-map", dimension: "connectivity", scale: "uncertain", role: "primary-map", status: "audited", preserveLegend: true },
  { id: "project-14-connectivity-map-full", sourcePage: 35, type: "primary-map", dimension: "connectivity", scale: "uncertain", role: "primary-map", status: "audited", preserveLegend: true },
  { id: "project-14-connectivity-distance-legend", sourcePage: 35, type: "legend", dimension: "connectivity", scale: "uncertain", status: "audited" },
  { id: "project-14-connectivity-lines-detail", sourcePage: 35, type: "map-detail", dimension: "connectivity", scale: "uncertain", status: "audited" },
  { id: "project-14-connectivity-localities-detail", sourcePage: 35, type: "map-detail", dimension: "connectivity", scale: "localidad", status: "audited" },
  { id: "project-14-connectivity-territory-silhouette", sourcePage: 35, type: "texture", dimension: "connectivity", scale: "uncertain", status: "audited" },
  { id: "project-14-connectivity-texture", sourcePage: 35, type: "texture", dimension: "connectivity", scale: "uncertain", status: "audited" },
  { id: "project-14-connectivity-to-clustering-preview", sourcePage: 36, type: "chapter-cover", dimension: "clustering", scale: "municipal", status: "audited" },

  // CLUSTERING MUNICIPAL (Block 21) Assets
  { id: "project-14-clustering-chapter-hero", sourcePage: 36, type: "chapter-cover", dimension: "clustering", scale: "municipal", role: "chapter-cover", status: "audited" },
  { id: "project-14-clustering-chapter-gallery", sourcePage: 36, type: "chapter-cover", dimension: "clustering", scale: "municipal", role: "gallery", status: "audited" },
  { id: "project-14-clustering-introduction-preview", sourcePage: 36, type: "texture", dimension: "clustering", scale: "municipal", status: "audited" },
  { id: "project-14-municipal-cluster-diagram-preview", sourcePage: 37, type: "primary-map", dimension: "clustering", scale: "relational-diagram", role: "primary-map", status: "audited" },
  { id: "project-14-municipal-cluster-diagram-full", sourcePage: 37, type: "primary-map", dimension: "clustering", scale: "relational-diagram", role: "primary-map", status: "audited" },
  { id: "project-14-municipal-cluster-map-preview", sourcePage: 37, type: "primary-map", dimension: "clustering", scale: "municipal", role: "primary-map", status: "audited" },
  { id: "project-14-municipal-cluster-map-full", sourcePage: 37, type: "primary-map", dimension: "clustering", scale: "municipal", role: "primary-map", status: "audited" },
  { id: "project-14-municipal-cluster-legend", sourcePage: 37, type: "legend", dimension: "clustering", scale: "municipal", status: "audited" },
  { id: "project-14-municipal-cluster-blue-detail", sourcePage: 37, type: "map-detail", dimension: "clustering", scale: "municipal", status: "audited" },
  { id: "project-14-municipal-cluster-yellow-detail", sourcePage: 37, type: "map-detail", dimension: "clustering", scale: "municipal", status: "audited" },
  { id: "project-14-municipal-cluster-pink-detail", sourcePage: 37, type: "map-detail", dimension: "clustering", scale: "municipal", status: "audited" },
  { id: "project-14-clustering-territory-silhouette", sourcePage: 37, type: "texture", dimension: "clustering", scale: "municipal", status: "audited" },
  { id: "project-14-clustering-texture", sourcePage: 36, type: "texture", dimension: "clustering", scale: "municipal", status: "audited" },

  // LOCALITIES (Block 21) Assets
  { id: "project-14-localities-chapter-hero", sourcePage: 38, type: "chapter-cover", dimension: "localities", scale: "locality", role: "chapter-cover", status: "audited" },
  { id: "project-14-localities-chapter-gallery", sourcePage: 38, type: "chapter-cover", dimension: "localities", scale: "locality", role: "gallery", status: "audited" },
  { id: "project-14-localities-result-preview", sourcePage: 38, type: "primary-map", dimension: "localities", scale: "locality", role: "primary-map", status: "audited" },
  { id: "project-14-localities-result-full", sourcePage: 38, type: "primary-map", dimension: "localities", scale: "locality", role: "primary-map", status: "audited" },
  { id: "project-14-localities-legend", sourcePage: 38, type: "legend", dimension: "localities", scale: "locality", status: "audited" },
  { id: "project-14-localities-detail", sourcePage: 38, type: "map-detail", dimension: "localities", scale: "locality", status: "audited" },
  { id: "project-14-localities-central-detail", sourcePage: 38, type: "map-detail", dimension: "localities", scale: "locality", status: "audited" },
  { id: "project-14-localities-peripheral-detail", sourcePage: 38, type: "map-detail", dimension: "localities", scale: "locality", status: "audited" },
  { id: "project-14-localities-territory-silhouette", sourcePage: 38, type: "texture", dimension: "localities", scale: "locality", status: "audited" },
  { id: "project-14-localities-texture", sourcePage: 38, type: "texture", dimension: "localities", scale: "locality", status: "audited" },

  // TYPOLOGIES (Block 21) Assets
  { id: "project-14-situated-typology-chapter-hero", sourcePage: 39, type: "chapter-cover", dimension: "typology", scale: "multiscale", role: "chapter-cover", status: "audited" },
  { id: "project-14-situated-typology-gallery", sourcePage: 39, type: "chapter-cover", dimension: "typology", scale: "multiscale", role: "gallery", status: "audited" },
  { id: "project-14-situated-typology-preview", sourcePage: 39, type: "primary-map", dimension: "typology", scale: "multiscale", role: "primary-map", status: "audited" },
  { id: "project-14-situated-typology-full", sourcePage: 39, type: "primary-map", dimension: "typology", scale: "multiscale", role: "primary-map", status: "audited" },
  { id: "project-14-situated-typology-detail", sourcePage: 39, type: "map-detail", dimension: "typology", scale: "multiscale", status: "audited" },
  { id: "project-14-multiscale-synthesis-preview", sourcePage: 39, type: "primary-map", dimension: "typology", scale: "multiscale", role: "primary-map", status: "audited" },
  { id: "project-14-multiscale-synthesis-full", sourcePage: 39, type: "primary-map", dimension: "typology", scale: "multiscale", role: "primary-map", status: "audited" },
  { id: "project-14-results-to-system-preview", sourcePage: 40, type: "texture", dimension: "policy", scale: "regional-context", status: "audited" },

  // SYSTEM TERRITORIAL (Block 22) Assets
  { id: "project-14-system-chapter-hero", sourcePage: 40, type: "chapter-cover", dimension: "system", scale: "system", role: "chapter-cover", status: "audited" },
  { id: "project-14-system-chapter-gallery", sourcePage: 40, type: "chapter-cover", dimension: "system", scale: "system", role: "gallery", status: "audited" },
  { id: "project-14-causal-loop-preview", sourcePage: 40, type: "diagram", dimension: "system", scale: "system", role: "primary-map", status: "audited" },
  { id: "project-14-causal-loop-full", sourcePage: 40, type: "diagram", dimension: "system", scale: "system", role: "primary-map", status: "audited" },
  { id: "project-14-causal-loop-center-detail", sourcePage: 40, type: "diagram-detail", dimension: "system", scale: "system", status: "audited" },
  { id: "project-14-causal-loop-pillars-detail", sourcePage: 40, type: "diagram-detail", dimension: "system", scale: "system", status: "audited" },
  { id: "project-14-causal-loop-scales-detail", sourcePage: 40, type: "diagram-detail", dimension: "system", scale: "system", status: "audited" },
  { id: "project-14-causal-loop-results-detail", sourcePage: 40, type: "diagram-detail", dimension: "system", scale: "system", status: "audited" },
  { id: "project-14-causal-loop-method-nodes-detail", sourcePage: 40, type: "diagram-detail", dimension: "system", scale: "system", status: "audited" },
  { id: "project-14-causal-loop-signs-detail", sourcePage: 40, type: "diagram-detail", dimension: "system", scale: "system", status: "audited" },
  { id: "project-14-system-territory-silhouette", sourcePage: 40, type: "texture", dimension: "system", scale: "system", status: "audited" },
  { id: "project-14-system-texture", sourcePage: 40, type: "texture", dimension: "system", scale: "system", status: "audited" },

  // GRAY ZONES (Block 22) Assets
  { id: "project-14-gray-zones-preview", sourcePage: 40, type: "diagram-detail", dimension: "system", scale: "system", status: "audited" },
  { id: "project-14-gray-zones-detail", sourcePage: 40, type: "diagram-detail", dimension: "system", scale: "system", status: "audited" },
  { id: "project-14-gray-zones-context", sourcePage: 31, type: "map-detail", dimension: "governance", scale: "multiscale", status: "audited" },

  // POLICY (Block 22) Assets
  { id: "project-14-policy-chapter-hero", sourcePage: 40, type: "chapter-cover", dimension: "policy", scale: "policy-framework", role: "chapter-cover", status: "audited" },
  { id: "project-14-policy-chapter-gallery", sourcePage: 40, type: "chapter-cover", dimension: "policy", scale: "policy-framework", role: "gallery", status: "audited" },
  { id: "project-14-policy-applications-preview", sourcePage: 40, type: "diagram", dimension: "policy", scale: "policy-framework", role: "primary-map", status: "audited" },
  { id: "project-14-policy-applications-full", sourcePage: 40, type: "diagram", dimension: "policy", scale: "policy-framework", role: "primary-map", status: "audited" },
  { id: "project-14-policy-center-detail", sourcePage: 40, type: "diagram-detail", dimension: "policy", scale: "policy-framework", status: "audited" },
  { id: "project-14-policy-planning-detail", sourcePage: 40, type: "diagram-detail", dimension: "policy", scale: "policy-framework", status: "audited" },
  { id: "project-14-policy-water-detail", sourcePage: 40, type: "diagram-detail", dimension: "policy", scale: "policy-framework", status: "audited" },
  { id: "project-14-policy-social-detail", sourcePage: 40, type: "diagram-detail", dimension: "policy", scale: "policy-framework", status: "audited" },
  { id: "project-14-policy-governance-detail", sourcePage: 40, type: "diagram-detail", dimension: "policy", scale: "policy-framework", status: "audited" },
  { id: "project-14-policy-comparison-detail", sourcePage: 40, type: "diagram-detail", dimension: "policy", scale: "policy-framework", status: "audited" },
  { id: "project-14-policy-outcomes-detail", sourcePage: 40, type: "diagram-detail", dimension: "policy", scale: "policy-framework", status: "audited" },

  // CLOSING (Block 22) Assets
  { id: "project-14-closing-hero", sourcePage: 40, type: "chapter-cover", dimension: "policy", scale: "policy-framework", status: "audited" },
  { id: "project-14-closing-twenty-pages", sourcePage: 40, type: "texture", dimension: "system", scale: "system", status: "audited" },
  { id: "project-14-closing-six-dimensions", sourcePage: 40, type: "texture", dimension: "system", scale: "system", status: "audited" },
  { id: "project-14-closing-two-scales", sourcePage: 40, type: "texture", dimension: "system", scale: "system", status: "audited" },
  { id: "project-14-closing-three-profiles", sourcePage: 40, type: "texture", dimension: "system", scale: "system", status: "audited" },
  { id: "project-14-closing-system-preview", sourcePage: 40, type: "texture", dimension: "system", scale: "system", status: "audited" },
  { id: "project-14-to-urban-challenge-preview", sourcePage: 40, type: "texture", dimension: "system", scale: "system", status: "audited" }
];
