/**
 * GRANULAR — Registro central de evidencia visual y derivadas complejas.
 *
 * Contiene metadatos, procedencia, alcance y limitaciones de cada pieza
 * gráfica inyectada en P14. La arquitectura separa esta configuración de los
 * componentes para facilitar la revisión de datos.
 */

export type GranularVisualKind =
  | 'caracterizacion'
  | 'radar'
  | 'paisaje'
  | 'cultivos'
  | 'clustering-loc'
  | 'clustering-coropletico'
  | 'clustering-size'
  | 'clustering-chord';

export type GranularVisual = {
  id: string;
  kind: GranularVisualKind;
  title: string;
  pillar: string; // O ruta general si aplica
  asset: {
    src: string;
    /**
     * Escalera para pantalla.
     *
     * Sin ella el navegador servía siempre el derivado de 1440 px y en una
     * pantalla de 1920 la figura se pintaba a 1792: por debajo de la densidad
     * a la que el diagrama se lee. Es la misma escalera de impresión, en WebP.
     */
    srcSet?: string;
    width: number;
    height: number;
    /**
     * Escalera de derivados para impresión.
     *
     * Un único archivo obligaba a elegir entre imprimir a 700 ppp una figura
     * que ocupa media hoja —tres veces más de lo necesario y el triple de
     * peso— o servir a todas la variante pequeña. Con la escalera, la
     * composición declara su caja en milímetros y el navegador toma el
     * derivado que corresponde a esa caja.
     */
    printSrcSet?: string;
    /** Mayor derivado disponible; se usa como `src` de impresión. */
    printSrc?: string;
  };
  scope: string;
  period: string;
  unit: string;
  source: string;
  caption: string;
  alt: string;
  limitations?: string;
};

export const granularVisuals: Record<string, GranularVisual> = {
  caracterizacion: {
    id: 'caracterizacion',
    kind: 'caracterizacion',
    title: 'Caracterización de la Comarca',
    pillar: 'entrada',
    asset: {
      src: '/projects/granular/analisis/webp/p14-comarca-caracterizacion-1440.webp',
      srcSet: '/projects/granular/analisis/webp/p14-comarca-caracterizacion-960.webp 960w, /projects/granular/analisis/webp/p14-comarca-caracterizacion-1440.webp 1440w, /projects/granular/analisis/webp/p14-comarca-caracterizacion-2480.webp 2480w',
      printSrc: '/projects/granular/analisis/webp/p14-comarca-caracterizacion-2480.webp',
      printSrcSet: '/projects/granular/analisis/webp/p14-comarca-caracterizacion-960.webp 960w, /projects/granular/analisis/webp/p14-comarca-caracterizacion-1440.webp 1440w, /projects/granular/analisis/webp/p14-comarca-caracterizacion-2480.webp 2480w',
      width: 1138.0038,
      height: 711.2501,
    },
    scope: 'Comarca Lagunera (15 municipios)',
    period: 'Año no documentado',
    unit: 'Población y superficie',
    source: 'Procedencia gráfica: EPI CIHEAM',
    caption: 'Composición de la Comarca Lagunera con indicadores demográficos básicos y división municipal.',
    alt: 'Mapa de la Comarca Lagunera con sus 15 municipios. Población 1,628,629, repartida 49.2 % / 50.8 %.',
    limitations: 'La composición no documenta el año exacto del dato poblacional. Los 15 municipios mostrados son la base regional, pero contrastan con los 14 municipios clasificados en modelos posteriores.',
  },
  aguaRadar: {
    id: 'agua-radar',
    kind: 'radar',
    title: 'Tensiones y políticas hídricas',
    pillar: 'agua',
    asset: {
      src: '/projects/granular/analisis/webp/p14-agua-tensiones-politicas-1990-2025-1440.webp',
      srcSet: '/projects/granular/analisis/webp/p14-agua-tensiones-politicas-1990-2025-960.webp 960w, /projects/granular/analisis/webp/p14-agua-tensiones-politicas-1990-2025-1440.webp 1440w, /projects/granular/analisis/webp/p14-agua-tensiones-politicas-1990-2025-2480.webp 2480w',
      printSrc: '/projects/granular/analisis/webp/p14-agua-tensiones-politicas-1990-2025-2480.webp',
      printSrcSet: '/projects/granular/analisis/webp/p14-agua-tensiones-politicas-1990-2025-960.webp 960w, /projects/granular/analisis/webp/p14-agua-tensiones-politicas-1990-2025-1440.webp 1440w, /projects/granular/analisis/webp/p14-agua-tensiones-politicas-1990-2025-2480.webp 2480w',
      width: 733.8936,
      height: 574.047,
    },
    scope: 'Comarca Lagunera',
    period: '1990–2025',
    unit: 'Hitos e instituciones',
    source: 'Procedencia gráfica: EPI CIHEAM',
    caption: 'Diagrama analítico de las relaciones entre tensiones hídricas, efectos territoriales y respuestas institucionales.',
    alt: 'Diagrama que muestra en la izquierda las tensiones, en el centro los efectos, y a la derecha las políticas hídricas.',
    limitations: 'Lectura interpretativa, no de medición causal. Relaciona programas y efectos narrativamente sin calcular correlaciones estadísticas.',
  },
  paisajeAgricola: {
    id: 'paisaje-agricola',
    kind: 'paisaje',
    title: 'Paisaje Agrícola',
    pillar: 'agropecuario',
    asset: {
      src: '/projects/granular/analisis/webp/p14-paisaje-agricola-1440.webp',
      srcSet: '/projects/granular/analisis/webp/p14-paisaje-agricola-960.webp 960w, /projects/granular/analisis/webp/p14-paisaje-agricola-1440.webp 1440w, /projects/granular/analisis/webp/p14-paisaje-agricola-2480.webp 2480w',
      printSrc: '/projects/granular/analisis/webp/p14-paisaje-agricola-2480.webp',
      printSrcSet: '/projects/granular/analisis/webp/p14-paisaje-agricola-960.webp 960w, /projects/granular/analisis/webp/p14-paisaje-agricola-1440.webp 1440w, /projects/granular/analisis/webp/p14-paisaje-agricola-2480.webp 2480w',
      width: 841.89,
      height: 595.28,
    },
    scope: 'Comarca Lagunera',
    period: 'No aplica',
    unit: 'Esquema de paisaje',
    source: 'Procedencia gráfica: EPI CIHEAM',
    caption: 'Esquema representativo del paisaje agrícola.',
    alt: 'Ilustración del paisaje agrícola de la Comarca Lagunera.',
  },
  paisajeAgropecuario: {
    id: 'paisaje-agropecuario',
    kind: 'paisaje',
    title: 'Paisaje Agropecuario',
    pillar: 'agropecuario',
    asset: {
      src: '/projects/granular/analisis/webp/p14-paisaje-agropecuario-1440.webp',
      srcSet: '/projects/granular/analisis/webp/p14-paisaje-agropecuario-960.webp 960w, /projects/granular/analisis/webp/p14-paisaje-agropecuario-1440.webp 1440w, /projects/granular/analisis/webp/p14-paisaje-agropecuario-2480.webp 2480w',
      printSrc: '/projects/granular/analisis/webp/p14-paisaje-agropecuario-2480.webp',
      printSrcSet: '/projects/granular/analisis/webp/p14-paisaje-agropecuario-960.webp 960w, /projects/granular/analisis/webp/p14-paisaje-agropecuario-1440.webp 1440w, /projects/granular/analisis/webp/p14-paisaje-agropecuario-2480.webp 2480w',
      width: 841.89,
      height: 595.28,
    },
    scope: 'Comarca Lagunera',
    period: 'No aplica',
    unit: 'Esquema de paisaje',
    source: 'Procedencia gráfica: EPI CIHEAM',
    caption: 'Esquema representativo del paisaje agropecuario.',
    alt: 'Ilustración del paisaje agropecuario de la Comarca Lagunera.',
  },
  cultivosFlujos: {
    id: 'cultivos-flujos',
    kind: 'cultivos',
    title: 'Estructura agrícola · Flujos',
    pillar: 'agropecuario',
    asset: {
      src: '/projects/granular/analisis/webp/p14-cultivos-flujos-1440.webp',
      srcSet: '/projects/granular/analisis/webp/p14-cultivos-flujos-960.webp 960w, /projects/granular/analisis/webp/p14-cultivos-flujos-1440.webp 1440w, /projects/granular/analisis/webp/p14-cultivos-flujos-2480.webp 2480w',
      printSrc: '/projects/granular/analisis/webp/p14-cultivos-flujos-2480.webp',
      printSrcSet: '/projects/granular/analisis/webp/p14-cultivos-flujos-960.webp 960w, /projects/granular/analisis/webp/p14-cultivos-flujos-1440.webp 1440w, /projects/granular/analisis/webp/p14-cultivos-flujos-2480.webp 2480w',
      width: 841.68,
      height: 595.44,
    },
    scope: 'Grupo de municipios',
    period: 'Año no indicado',
    unit: 'hectáreas (ha)',
    source: 'Procedencia gráfica: MAPPING CIHEAM',
    caption: 'Relación lineal cultivo-municipio dentro del grupo documentado.',
    alt: 'Diagrama de flujos que muestra la relación entre cultivos y municipios en hectáreas.',
  },
  cultivosConcentracion: {
    id: 'cultivos-concentracion',
    kind: 'cultivos',
    title: 'Estructura agrícola · Concentración',
    pillar: 'agropecuario',
    asset: {
      src: '/projects/granular/analisis/webp/p14-cultivos-concentracion-1440.webp',
      srcSet: '/projects/granular/analisis/webp/p14-cultivos-concentracion-960.webp 960w, /projects/granular/analisis/webp/p14-cultivos-concentracion-1440.webp 1440w, /projects/granular/analisis/webp/p14-cultivos-concentracion-2480.webp 2480w',
      printSrc: '/projects/granular/analisis/webp/p14-cultivos-concentracion-2480.webp',
      printSrcSet: '/projects/granular/analisis/webp/p14-cultivos-concentracion-960.webp 960w, /projects/granular/analisis/webp/p14-cultivos-concentracion-1440.webp 1440w, /projects/granular/analisis/webp/p14-cultivos-concentracion-2480.webp 2480w',
      width: 841.68,
      height: 595.44,
    },
    scope: 'Grupo de municipios',
    period: 'Año no indicado',
    unit: 'hectáreas (ha)',
    source: 'Procedencia gráfica: MAPPING CIHEAM',
    caption: 'Relación de concentración de cultivos por municipio.',
    alt: 'Diagrama de cuerda mostrando concentración de cultivos por municipio.',
  },
  cultivosRed: {
    id: 'cultivos-red',
    kind: 'cultivos',
    title: 'Estructura agrícola · Red Radial',
    pillar: 'agropecuario',
    asset: {
      src: '/projects/granular/analisis/webp/p14-cultivos-red-radial-1440.webp',
      srcSet: '/projects/granular/analisis/webp/p14-cultivos-red-radial-960.webp 960w, /projects/granular/analisis/webp/p14-cultivos-red-radial-1440.webp 1440w, /projects/granular/analisis/webp/p14-cultivos-red-radial-2480.webp 2480w',
      printSrc: '/projects/granular/analisis/webp/p14-cultivos-red-radial-2480.webp',
      printSrcSet: '/projects/granular/analisis/webp/p14-cultivos-red-radial-960.webp 960w, /projects/granular/analisis/webp/p14-cultivos-red-radial-1440.webp 1440w, /projects/granular/analisis/webp/p14-cultivos-red-radial-2480.webp 2480w',
      width: 841.68,
      height: 595.44,
    },
    scope: 'Grupo de municipios',
    period: 'Año no indicado',
    unit: 'hectáreas (ha)',
    source: 'Procedencia gráfica: MAPPING CIHEAM',
    caption: 'Red funcional (radial) que relaciona cultivos y municipios.',
    alt: 'Diagrama de red radial mostrando la relación entre cultivos y municipios.',
  },
  clusteringLoc: {
    id: 'clustering-loc',
    kind: 'clustering-loc',
    title: 'Localización de observaciones',
    pillar: 'clustering',
    asset: {
      src: '/projects/granular/analisis/webp/p14-clustering-localizacion-1440.webp',
      srcSet: '/projects/granular/analisis/webp/p14-clustering-localizacion-960.webp 960w, /projects/granular/analisis/webp/p14-clustering-localizacion-1440.webp 1440w, /projects/granular/analisis/webp/p14-clustering-localizacion-2480.webp 2480w',
      printSrc: '/projects/granular/analisis/webp/p14-clustering-localizacion-2480.webp',
      printSrcSet: '/projects/granular/analisis/webp/p14-clustering-localizacion-960.webp 960w, /projects/granular/analisis/webp/p14-clustering-localizacion-1440.webp 1440w, /projects/granular/analisis/webp/p14-clustering-localizacion-2480.webp 2480w',
      width: 2480,
      height: 3507,
    },
    scope: 'Comarca Lagunera',
    period: 'Año no indicado',
    unit: 'Puntos de observación',
    source: 'Procedencia gráfica: EPI CIHEAM',
    caption: 'Localización espacial de observaciones.',
    alt: 'Mapa de puntos distribuidos en la Comarca Lagunera.',
    limitations: 'El significado exacto de los puntos y sus colores no se encuentra documentado en la fuente de origen.',
  },
  clusteringCoropletico: {
    id: 'clustering-coropletico',
    kind: 'clustering-coropletico',
    title: 'Clasificación municipal',
    pillar: 'clustering',
    asset: {
      src: '/projects/granular/analisis/webp/p14-clustering-clasificacion-1440.webp',
      srcSet: '/projects/granular/analisis/webp/p14-clustering-clasificacion-960.webp 960w, /projects/granular/analisis/webp/p14-clustering-clasificacion-1440.webp 1440w, /projects/granular/analisis/webp/p14-clustering-clasificacion-2480.webp 2480w',
      printSrc: '/projects/granular/analisis/webp/p14-clustering-clasificacion-2480.webp',
      printSrcSet: '/projects/granular/analisis/webp/p14-clustering-clasificacion-960.webp 960w, /projects/granular/analisis/webp/p14-clustering-clasificacion-1440.webp 1440w, /projects/granular/analisis/webp/p14-clustering-clasificacion-2480.webp 2480w',
      width: 576,
      height: 403.2,
    },
    scope: 'Comarca Lagunera (14 municipios)',
    period: 'Año no indicado',
    unit: 'Clasificación K=3',
    source: 'Procedencia gráfica: MAPPING CIHEAM',
    caption: 'Distribución municipal de los tres grupos (C1, C2, C3).',
    alt: 'Mapa coroplético clasificando 14 municipios de la Comarca Lagunera en tres clusters.',
    limitations: 'Clasifica 14 de los 15 municipios de la Comarca, dejando 1 sin asignación en el modelo original.',
  },
  clusteringSize: {
    id: 'clustering-size',
    kind: 'clustering-size',
    title: 'Tamaño de los grupos',
    pillar: 'clustering',
    asset: {
      src: '/projects/granular/analisis/webp/p14-clustering-tamano-1440.webp',
      srcSet: '/projects/granular/analisis/webp/p14-clustering-tamano-960.webp 960w, /projects/granular/analisis/webp/p14-clustering-tamano-1440.webp 1440w, /projects/granular/analisis/webp/p14-clustering-tamano-2480.webp 2480w',
      printSrc: '/projects/granular/analisis/webp/p14-clustering-tamano-2480.webp',
      printSrcSet: '/projects/granular/analisis/webp/p14-clustering-tamano-960.webp 960w, /projects/granular/analisis/webp/p14-clustering-tamano-1440.webp 1440w, /projects/granular/analisis/webp/p14-clustering-tamano-2480.webp 2480w',
      width: 540,
      height: 360,
    },
    scope: 'Comarca Lagunera (14 municipios)',
    period: 'Año no indicado',
    unit: 'Municipios y porcentaje',
    source: 'Procedencia gráfica: MAPPING CIHEAM',
    caption: 'Proporción de municipios asignados a cada uno de los tres grupos. Totaliza 14 municipios clasificados.',
    alt: 'Diagrama mostrando que el Cluster 1 tiene 7 municipios, Cluster 2 tiene 4 y Cluster 3 tiene 3.',
  },
  clusteringRelaciones: {
    id: 'clustering-relaciones',
    kind: 'clustering-chord',
    title: 'Relaciones de pertenencia',
    pillar: 'clustering',
    asset: {
      src: '/projects/granular/analisis/webp/p14-clustering-relaciones-1440.webp',
      srcSet: '/projects/granular/analisis/webp/p14-clustering-relaciones-960.webp 960w, /projects/granular/analisis/webp/p14-clustering-relaciones-1440.webp 1440w, /projects/granular/analisis/webp/p14-clustering-relaciones-2480.webp 2480w',
      printSrc: '/projects/granular/analisis/webp/p14-clustering-relaciones-2480.webp',
      printSrcSet: '/projects/granular/analisis/webp/p14-clustering-relaciones-960.webp 960w, /projects/granular/analisis/webp/p14-clustering-relaciones-1440.webp 1440w, /projects/granular/analisis/webp/p14-clustering-relaciones-2480.webp 2480w',
      width: 626.4,
      height: 626.4,
    },
    scope: 'Comarca Lagunera (14 municipios)',
    period: 'Año no indicado',
    unit: 'Asignaciones a C1-C3',
    source: 'Procedencia gráfica: MAPPING CIHEAM',
    caption: 'Diagrama de cuerdas relacionando cada municipio con su grupo asignado.',
    alt: 'Diagrama de cuerdas relacionando 14 municipios con los tres clusters.',
  },
};
