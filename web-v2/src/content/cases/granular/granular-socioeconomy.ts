export const granularSocioeconomy = {
  chapterId: "socioeconomy",
  title: "SOCIOECONOMÍA",
  shortTitle: "MOVILIDAD, SERVICIOS Y DESIGUALDAD TERRITORIAL",
  sourcePages: [32, 33],
  dimension: "socioeconomy",
  scales: ["municipal", "localidad", "metropolitana"],
  
  chapterIntroduction: {
    title: "UN MOSAICO DE CONDICIONES SOCIALES",
    text1: "El pilar socioeconómico examina las condiciones de vida y las dinámicas económicas que configuran las comunidades rurales.",
    text2: "Más allá de indicadores agregados, el análisis busca observar cómo se distribuyen las oportunidades, el acceso a servicios y las fuentes de ingreso dentro del territorio.",
    text3: "La página relaciona la expansión agroindustrial con contrastes persistentes entre zonas productivas consolidadas y localidades con rezagos sociales.",
    text4: "Empleo, ingresos, educación y servicios básicos aparecen como dimensiones de esa desigualdad."
  },

  commuting: {
    title: "COMMUTING",
    subtitle: "Desplazamientos cotidianos entre territorios.",
    categories: [
      {
        id: "bajo",
        name: "BAJO",
        desc: "MENOS DEL 30%",
        interpretation: "En municipios periféricos como San Juan de Guadalupe y San Luis del Cordero, el commuting es bajo, con menos del 30%. La página relaciona esta condición con aislamiento y dependencia de la agricultura local."
      },
      {
        id: "medio",
        name: "MEDIO",
        desc: "La categoría aparece en la leyenda, pero la página no desarrolla su rango ni ejemplos textuales.",
        interpretation: ""
      },
      {
        id: "alto",
        name: "ALTO",
        desc: "MÁS DEL 60% (PEA)",
        interpretation: "En Matamoros y San Pedro, más del 60% de la PEA se desplaza diariamente hacia Torreón y Gómez Palacio. La página interpreta a estos municipios como territorios dormitorio del corredor metropolitano."
      }
    ],
    caption: "Representación de commuting en la Comarca Lagunera mediante categorías Baja, Media y Alta, acompañada por ejemplos textuales de desplazamiento diario."
  },

  margination: {
    title: "GRADO DE MARGINACIÓN POR LOCALIDAD",
    profiles: [
      {
        id: "metropolitanas",
        name: "LOCALIDADES METROPOLITANAS",
        threshold: "IMN > 0.85",
        examples: "Torreón, Gómez Palacio y Lerdo.",
        desc: "Colonias y ejidos cercanos a la mancha urbana presentan muy baja marginación. Se mencionan servicios básicos, educación y empleo urbano-industrial."
      },
      {
        id: "rurales",
        name: "LOCALIDADES RURALES AGRÍCOLAS",
        threshold: "",
        examples: "Matamoros, San Pedro, Nazas y Mapimí.",
        desc: "La mayoría aparece en rangos de baja a media marginación. Se mencionan agricultura de riego, carencias en vivienda y servicios, y dependencia del trabajo estacional."
      },
      {
        id: "dispersas",
        name: "LOCALIDADES DISPERSAS PERIFÉRICAS",
        threshold: "IMN < 0.70",
        examples: "San Juan de Guadalupe, Simón Bolívar, Viesca y Rodeo.",
        desc: "Varias de ellas aparecen en alta marginación. Se mencionan comunidades pequeñas (menos de 500 habitantes), falta de servicios básicos, transporte, empleo no agrícola y exclusión territorial."
      }
    ],
    exclusionText1: "La página interpreta la combinación de menor acceso a servicios, transporte y empleo no agrícola como una condición que acentúa la exclusión territorial.",
    exclusionText2: "La composición no muestra indicadores separados que permitan medir la contribución individual de cada factor.",
    captionContext: "Representación contextual del grado de marginación incluida en la página socioeconómica de la Comarca Lagunera.",
    captionLocalities: "Mapa de localidades representadas mediante categorías de marginación dentro de la Comarca Lagunera."
  },

  mapComparison: {
    title: "MOVILIDAD Y MARGINACIÓN NO SON LA MISMA VARIABLE",
    text1: "Las dos figuras muestran dimensiones distintas de la desigualdad territorial: una representa la intensidad de desplazamientos y otra describe contrastes sociales entre localidades.",
    text2: "La coincidencia narrativa entre movilidad, empleo y acceso a servicios no sustituye un análisis estadístico que no se documenta en estas páginas."
  },

  limitations: {
    title: "ALCANCE DOCUMENTADO",
    text: "La versión web conserva fielmente los datos reportados sin calcular índices inexistentes.",
    points: [
      "No se documenta el año del commuting ni la fuente de la PEA.",
      "No se define el rango Medio de commuting ni el umbral general para Alto.",
      "No se muestran volúmenes de viajes, distancias o tiempos.",
      "No se define IMN (su fórmula, fuente, año o dirección).",
      "No se documentan fuentes de marginación ni umbrales intermedios.",
      "No se incluyen niveles de pobreza, carencias medidas ni ingresos monetarios.",
      "ZAP se reserva para una síntesis posterior del proyecto.",
      "Las correlaciones causales son interpretativas."
    ]
  },

  nextChapterPreview: {
    number: "07",
    title: "AMBIENTE",
    sourcePages: [34, 35],
    status: "PRÓXIMO CAPÍTULO",
    desc: "El pilar ambiental examina cómo la estructura territorial interactúa con las restricciones del medio físico y los límites ecológicos."
  }
};
