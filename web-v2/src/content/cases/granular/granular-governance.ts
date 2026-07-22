export const granularGovernance = {
  chapterId: "governance",
  title: "GOBERNANZA",
  shortTitle: "INSTITUCIONES, NORMAS Y PODER TERRITORIAL",
  sourcePages: [30, 31],
  dimension: "governance",
  scales: ["institutional", "regional"],
  
  chapterIntroduction: {
    title: "DECIDIR SOBRE UN MISMO TERRITORIO",
    text1: "La gobernanza territorial se presenta en el portafolio como el conjunto de instituciones, normas y actores que intervienen en la gestión del territorio y de sus recursos.",
    text2: "En la Comarca Lagunera, el análisis destaca una superposición de escalas de decisión —ejidos, municipios, estados y federación— que pueden operar mediante marcos normativos fragmentados o contradictorios.",
    text3: "El pilar relaciona estas configuraciones con la distribución de recursos, la gestión del agua, la regulación de la actividad agropecuaria y la capacidad de las comunidades para incidir en decisiones territoriales."
  },

  institutionalScales: {
    title: "ESCALAS DE DECISIÓN",
    scales: [
      {
        id: "ejidos",
        name: "EJIDOS",
        desc: "Escala de decisión mencionada dentro de la lectura institucional del territorio."
      },
      {
        id: "municipios",
        name: "MUNICIPIOS",
        desc: "Escala de decisión mencionada dentro de la lectura institucional del territorio."
      },
      {
        id: "estados",
        name: "ESTADOS",
        desc: "Escala de decisión mencionada dentro de la lectura institucional del territorio."
      },
      {
        id: "federacion",
        name: "FEDERACIÓN",
        desc: "Escala de decisión mencionada dentro de la lectura institucional del territorio."
      }
    ]
  },

  anpAndRtp: {
    anp: {
      title: "RESERVA DE LA BIÓSFERA DE MAPIMÍ",
      totalArea: "MÁS DE 342,000 HA",
      distribution: [
        { state: "Durango", pct: "62.9%" },
        { state: "Coahuila", pct: "22.4%" },
        { state: "Chihuahua", pct: "14.7%" }
      ],
      unverifiedClaim: "El portafolio presenta a la Reserva de la Biósfera de Mapimí, decretada en 1979, como la primera de su tipo en México y América Latina.",
      species: ["TORTUGA DEL BOLSÓN", "Gopherus flavomarginatus", "ÁGUILA REAL"]
    },
    rtp: {
      title: "REGIONES TERRESTRES PRIORITARIAS",
      regions: [
        { name: "CUCHILLAS DE LA ZARCA", zones: "Nazas, San Luis del Cordero." },
        { name: "MAPIMÍ", zones: "Vinculada directamente con la Reserva de la Biósfera." },
        { name: "SIERRA LA FRAGUA", zones: "Francisco I. Madero." }
      ],
      functions: [
        "Conectividad ecológica",
        "Conservación de especies",
        "Mantenimiento de servicios ecosistémicos",
        "Paisajes agrícolas"
      ]
    },
    intersection: {
      title: "UN TERRITORIO DOBLEMENTE NORMADO",
      text1: "La página interpreta la coincidencia entre la Reserva y la RTP Mapimí como un territorio sujeto a marcos de conservación y planificación que se superponen.",
      text2: "Dentro de esta lectura, la organización ejidal y la expansión agroindustrial aparecen en tensión con la política ambiental.",
      disclaimer: "La composición no documenta expedientes, normas específicas, actores concretos ni eventos de conflicto que permitan convertir esta interpretación en una conclusión jurídica."
    }
  },

  mapCaption: "Representación de Áreas Naturales Protegidas, Regiones Terrestres Prioritarias y su intersección dentro de la lectura de gobernanza de la Comarca Lagunera.",
  
  limitations: {
    title: "ALCANCE DOCUMENTADO",
    text: "La versión web conserva las figuras, cifras y lecturas institucionales de las páginas 30–31. Las interpretaciones sobre tensión, fricción y zonas grises permanecen atribuidas al portafolio y no se convierten en conclusiones jurídicas.",
    points: [
      "No se documentan normas específicas ni competencias institucionales.",
      "No se cuantifica geográficamente la intersección.",
      "No se muestran expedientes de conflicto, ni actores particulares.",
      "No se evalúa capacidad institucional ni se mide participación comunitaria.",
      "La condición 'primera en México y América Latina' no se verifica externamente.",
      "Las 'zonas grises' son una interpretación narrativa.",
      "ANP y RTP no deben tratarse como categorías jurídicas equivalentes.",
      "Las cifras de distribución corresponden a la Reserva descrita en su totalidad."
    ]
  },

  nextChapterPreview: {
    number: "06",
    title: "SOCIOECONOMÍA",
    sourcePages: [32, 33],
    status: "PRÓXIMO CAPÍTULO",
    desc1: "Las estructuras institucionales no operan sobre un territorio socialmente homogéneo.",
    desc2: "El siguiente capítulo observa cómo oportunidades, servicios, empleo, movilidad y marginación se distribuyen de forma desigual entre municipios y localidades."
  }
};
