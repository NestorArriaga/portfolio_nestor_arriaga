export const homeData = {
  profile: {
    name: "NÉSTOR ELIHU ARRIAGA GALLEGOS",
    profession: "Ingeniero en Recursos Naturales Renovables",
    tagline: "Cartografía, análisis territorial y proyectos que relacionan paisaje, recursos naturales y formas de habitar.",
    description: "El portafolio reúne quince proyectos desarrollados en contextos urbanos, rurales, agrícolas y de conservación.",
    email: "nestorarriagagallegos@gmail.com",
    cvUrl: "/Portafolio_pliego.pdf"
  },
  featuredProjects: [
    {
      id: "14",
      slug: "granular-comarca-lagunera",
      title: "Tipologías rurales situadas",
      subtitle: "Análisis territorial multiescalar en la Comarca Lagunera",
      category: "GRANULAR — HORIZON EUROPE",
      territory: "Comarca Lagunera, México",
      description: "Análisis multiescalar de la diversidad rural mediante seis dimensiones territoriales: agua, agricultura, gobernanza, socioeconomía, ambiente y conectividad, aplicado a municipios y localidades de la Comarca Lagunera.",
      categories: ["Análisis territorial", "Ruralidad", "Agua", "Agricultura", "Gobernanza"],
      pagesRelated: "21–40",
      accent: "var(--accent-granular)",
      shortTitle: "GRANULAR"
    },
    {
      id: "01",
      slug: "areas-verdes-miguel-hidalgo",
      title: "Mapeo de Áreas Verdes",
      territory: "Ciudad de México",
      accent: "var(--accent-cdmx)",
      shortTitle: "Áreas Verdes"
    },
    {
      id: "09",
      slug: "vocaciones-productivas-aguascalientes",
      title: "Vocaciones Productivas",
      territory: "Aguascalientes",
      accent: "var(--accent-aguascalientes)",
      shortTitle: "Clústeres"
    },
    {
      id: "15",
      slug: "urban-challenge-merida",
      title: "Urban Challenge SEDATU × GIZ",
      territory: "Mérida",
      accent: "var(--accent-merida)",
      shortTitle: "Urban Challenge"
    }
  ],
  territories: [
    { name: "Ciudad de México", count: 1, range: "01", accent: "var(--accent-cdmx)" },
    { name: "Veracruz", count: 3, range: "02–04", accent: "var(--accent-veracruz)" },
    { name: "Metztitlán", count: 4, range: "05–08", accent: "var(--accent-metztitlan)" },
    { name: "Aguascalientes", count: 5, range: "09–13", accent: "var(--accent-aguascalientes)" },
    { name: "Comarca Lagunera", count: 1, range: "14", accent: "var(--accent-granular)" },
    { name: "Mérida", count: 1, range: "15", accent: "var(--accent-merida)" }
  ],
  microGallery: [
    { id: "veracruz", territory: "Veracruz", title: "Bosque", assetId: "territory-veracruz-photo" },
    { id: "aguascalientes", territory: "Aguascalientes", title: "Conservación", assetId: "project-10-conservation" },
    { id: "merida", territory: "Mérida", title: "Pasarelas", assetId: "project-15-walkway-render" }
  ]
};
