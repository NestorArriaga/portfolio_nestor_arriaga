export type GallerySize = 'feature' | 'large' | 'medium' | 'small';
export type GalleryLayout = 'wide' | 'portrait' | 'landscape' | 'square' | 'editorial' | 'compact';

export interface ProjectGalleryConfig {
  id: string;
  slug: string;
  featuredAssetId: string;
  gallerySize: GallerySize;
  galleryLayout: GalleryLayout;
  priority: number; // For ordering
  themes: string[];
  summary: string;
  status?: string;
}

export const galleryConfig: ProjectGalleryConfig[] = [
  {
    id: "14",
    slug: "granular-comarca-lagunera",
    featuredAssetId: "project-14-water-quality-map",
    gallerySize: "feature",
    galleryLayout: "wide",
    priority: 1,
    themes: ["agua", "agricultura", "ruralidad", "análisis territorial"],
    summary: "Análisis multiescalar de la diversidad rural mediante seis dimensiones territoriales: agua, agricultura, gobernanza, socioeconomía, ambiente y conectividad."
  },
  {
    id: "01",
    slug: "areas-verdes-miguel-hidalgo",
    featuredAssetId: "project-01-map",
    gallerySize: "large",
    galleryLayout: "portrait",
    priority: 2,
    themes: ["cartografía urbana", "áreas verdes", "análisis territorial"],
    summary: "Mapeo y Análisis de Áreas Verdes en la Alcaldía Miguel Hidalgo."
  },
  {
    id: "15",
    slug: "urban-challenge-merida",
    featuredAssetId: "project-15-walkway-render",
    gallerySize: "feature",
    galleryLayout: "editorial",
    priority: 3,
    themes: ["regeneración urbana", "infraestructura verde", "paisaje"],
    summary: "Propuesta de regeneración urbana para un parque hundido en Mérida.",
    status: "CASO EN DESARROLLO"
  },
  {
    id: "09",
    slug: "vocaciones-productivas-aguascalientes",
    featuredAssetId: "project-09-cluster-map",
    gallerySize: "large",
    galleryLayout: "square",
    priority: 4,
    themes: ["vocaciones productivas", "planeación rural", "análisis territorial"],
    summary: "Análisis de Clúster para la Identificación de Vocaciones Productivas en Aguascalientes."
  },
  {
    id: "02",
    slug: "captura-carbono-decozalapa",
    featuredAssetId: "project-02-carbon-map",
    gallerySize: "medium",
    galleryLayout: "square",
    priority: 5,
    themes: ["carbono", "conservación", "cuenca", "cartografía"],
    summary: "Mapeo de Captura de Carbono y Delimitación de Zonas Críticas en la Cuenca de Decozalapa."
  },
  {
    id: "03",
    slug: "zonas-optimas-limon-cafe",
    featuredAssetId: "project-03-coffee-map",
    gallerySize: "medium",
    galleryLayout: "landscape",
    priority: 6,
    themes: ["agricultura", "aptitud", "análisis espacial"],
    summary: "Análisis de Zonas Óptimas para el Cultivo de Limón y Café en la Cuenca de Decozalapa."
  },
  {
    id: "05",
    slug: "geomorfologia-metztitlan",
    featuredAssetId: "project-05-geomorphology-map",
    gallerySize: "large",
    galleryLayout: "portrait",
    priority: 7,
    themes: ["geomorfología", "relieve", "conservación"],
    summary: "Análisis Geomorfológico de la Reserva de la Biosfera en Metztitlán."
  },
  {
    id: "06",
    slug: "zonas-ecologicas-metztitlan",
    featuredAssetId: "project-06-ecology-map",
    gallerySize: "medium",
    galleryLayout: "landscape",
    priority: 8,
    themes: ["uso de suelo", "zonificación ecológica", "paisaje"],
    summary: "Reclasificación de Uso de Suelo y Vegetación para Determinar Zonas Ecológicas."
  },
  {
    id: "07",
    slug: "pendiente-metztitlan",
    featuredAssetId: "project-07-slope-map",
    gallerySize: "small",
    galleryLayout: "compact",
    priority: 9,
    themes: ["pendiente", "relieve", "análisis espacial"],
    summary: "Cálculo de Pendiente en Cuatro Intervalos en Metztitlán."
  },
  {
    id: "08",
    slug: "geomorfones-representativos",
    featuredAssetId: "project-08-geomorphons-map",
    gallerySize: "small",
    galleryLayout: "compact",
    priority: 10,
    themes: ["geomorfología", "patrones territoriales"],
    summary: "Análisis de Patrones Geomorfológicos en la Selección de Geomorfones Representativos."
  },
  {
    id: "10",
    slug: "aptitud-conservacion-aguascalientes",
    featuredAssetId: "project-10-conservation",
    gallerySize: "large",
    galleryLayout: "portrait",
    priority: 11,
    themes: ["conservación", "aptitud territorial"],
    summary: "Mapa de Aptitud para la Conservación en Aguascalientes."
  },
  {
    id: "11",
    slug: "aptitud-agricola-aguascalientes",
    featuredAssetId: "project-11-agriculture",
    gallerySize: "large",
    galleryLayout: "square",
    priority: 12,
    themes: ["agricultura", "aptitud territorial"],
    summary: "Mapa de Aptitud Agrícola en Aguascalientes."
  },
  {
    id: "04",
    slug: "uso-optimo-suelo-limon-cafe",
    featuredAssetId: "project-04-landuse-map",
    gallerySize: "medium",
    galleryLayout: "landscape",
    priority: 13,
    themes: ["uso del suelo", "agricultura", "cuenca"],
    summary: "Análisis de Uso Óptimo de Suelo para el Cultivo de Limón y Café."
  },
  {
    id: "12",
    slug: "degradacion-suelo-calvillo",
    featuredAssetId: "project-12-degradation",
    gallerySize: "medium",
    galleryLayout: "square",
    priority: 14,
    themes: ["degradación", "suelo", "manejo territorial"],
    summary: "Análisis de Degradación del Suelo en Calvillo."
  },
  {
    id: "13",
    slug: "subcuencas-rios-calvillo",
    featuredAssetId: "project-13-basins",
    gallerySize: "medium",
    galleryLayout: "landscape",
    priority: 15,
    themes: ["hidrología", "subcuencas", "manejo territorial"],
    summary: "Delimitación de Subcuencas e Identificación de Ríos en Calvillo."
  }
];

// Helper para extraer temas y territorios únicos
export const THEMES = Array.from(new Set(galleryConfig.flatMap(c => c.themes))).sort();
// Territorios conocidos mapeados desde portfolio-projects
export const TERRITORIES = [
  "Ciudad de México",
  "Veracruz",
  "Metztitlán, Hidalgo",
  "Aguascalientes",
  "Calvillo, Aguascalientes",
  "Comarca Lagunera",
  "Mérida, Yucatán"
];
