export const granularChapters = [
  // ACTO I - MARCO
  { id: "project-intro", slug: "proyecto", act: 1, group: "marco", order: 1, title: "Proyecto GRANULAR", shortTitle: "Proyecto", dimension: "overview", scales: ["regional"], sourcePages: [21], purpose: "Marco conceptual", status: "audited", futureImplementationBlock: 16 },
  { id: "compass", slug: "rural-diversity-compass", act: 1, group: "marco", order: 2, title: "Rural Diversity Compass", shortTitle: "Marco", dimension: "overview", scales: ["regional"], sourcePages: [21], purpose: "Adaptación mexicana", status: "audited", futureImplementationBlock: 16 },
  { id: "scales", slug: "escalas", act: 1, group: "marco", order: 3, title: "Escalas municipal y de localidad", shortTitle: "Escalas", dimension: "overview", scales: ["municipal", "localidad"], sourcePages: [21], purpose: "Definición multiescalar", status: "audited", futureImplementationBlock: 16 },

  // ACTO II - SEIS DIMENSIONES
  { id: "water", slug: "agua", act: 2, group: "dimensiones", order: 4, title: "Agua", shortTitle: "Agua", dimension: "water", scales: ["municipal", "regional"], sourcePages: [22, 23, 24], purpose: "Calidad y Acuíferos", status: "audited", futureImplementationBlock: 17 },
  { id: "agriculture", slug: "agricultura", act: 2, group: "dimensiones", order: 5, title: "Agricultura", shortTitle: "Agricultura", dimension: "agriculture", scales: ["municipal", "regional", "localidad"], sourcePages: [25, 26, 27, 28, 29], purpose: "Riego, forraje y sequía", status: "audited", futureImplementationBlock: 18 },
  { id: "governance", slug: "gobernanza", act: 2, group: "dimensiones", order: 6, title: "Gobernanza", shortTitle: "Gobernanza", dimension: "governance", scales: ["regional"], sourcePages: [30, 31], purpose: "Intersecciones ANP/RTP", status: "audited", futureImplementationBlock: 19 },
  { id: "socioeconomy", slug: "socioeconomia", act: 2, group: "dimensiones", order: 7, title: "Socioeconomía", shortTitle: "Socioeconomía", dimension: "socioeconomy", scales: ["municipal"], sourcePages: [32, 33], purpose: "Indicadores sociales", status: "audited", futureImplementationBlock: 19 },
  { id: "environment", slug: "ambiente", act: 2, group: "dimensiones", order: 8, title: "Ambiente", shortTitle: "Ambiente", dimension: "environment", scales: ["municipal", "regional"], sourcePages: [34, 35], purpose: "Límites ecológicos", status: "ambiguous", futureImplementationBlock: 20 },
  { id: "connectivity", slug: "conectividad", act: 2, group: "dimensiones", order: 9, title: "Conectividad", shortTitle: "Conectividad", dimension: "connectivity", scales: ["municipal", "regional"], sourcePages: [35], purpose: "Accesibilidad", status: "ambiguous", futureImplementationBlock: 20 },

  // ACTO III - RESULTADOS
  { id: "clustering", slug: "clustering-municipal", act: 3, group: "resultados", order: 10, title: "Clustering municipal", shortTitle: "Clustering", dimension: "clustering", scales: ["municipal"], sourcePages: [36, 37], purpose: "Clasificación municipal", status: "audited", futureImplementationBlock: 21 },
  { id: "localities", slug: "localidades", act: 3, group: "resultados", order: 11, title: "Escala de localidad", shortTitle: "Localidades", dimension: "typology", scales: ["localidad"], sourcePages: [38], purpose: "Heterogeneidad interna", status: "audited", futureImplementationBlock: 21 },
  { id: "typologies", slug: "tipologias-rurales", act: 3, group: "resultados", order: 12, title: "Tipologías rurales situadas", shortTitle: "Tipologías", dimension: "typology", scales: ["localidad"], sourcePages: [39], purpose: "Perfiles diferenciados", status: "audited", futureImplementationBlock: 21 },

  // ACTO IV - SÍNTESIS Y APLICACIÓN
  { id: "territorial-system", slug: "sistema-territorial", act: 4, group: "aplicacion", order: 13, title: "Relaciones sistémicas", shortTitle: "Sistemas", dimension: "policy", scales: ["regional"], sourcePages: [40], purpose: "Causal loop", status: "audited", futureImplementationBlock: 22 },
  { id: "grey-zones", slug: "zonas-grises", act: 4, group: "aplicacion", order: 14, title: "Zonas grises y límites", shortTitle: "Límites", dimension: "policy", scales: ["regional"], sourcePages: [40], purpose: "Zonas grises del modelo", status: "audited", futureImplementationBlock: 22 },
  { id: "policy", slug: "politica-publica", act: 4, group: "aplicacion", order: 15, title: "Aplicaciones y política", shortTitle: "Política", dimension: "policy", scales: ["regional"], sourcePages: [40], purpose: "Aplicaciones prácticas", status: "audited", futureImplementationBlock: 22 },
  { id: "closing", slug: "cierre", act: 4, group: "aplicacion", order: 16, title: "Cierre del caso", shortTitle: "Cierre", dimension: "overview", scales: ["regional"], sourcePages: [], purpose: "Final del proyecto 14", status: "pending", futureImplementationBlock: 22 }
];
