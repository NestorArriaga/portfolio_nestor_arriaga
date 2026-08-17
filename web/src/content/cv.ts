/**
 * Currículum · contenido verificado.
 *
 * Transcripción literal de `CV/CV_Nestor_Arriaga_ES.pdf` y su versión inglesa.
 * Los originales se conservan intactos en `CV/`; esta es la fuente de la que
 * salen las copias publicadas, y existe por una sola razón: los archivos
 * originales escriben el texto con subconjuntos de fuente cuyos identificadores
 * de glifo no son ASCII, así que el acento del nombre no se podía corregir sin
 * romperlos.
 *
 * Nada de lo que hay aquí es nuevo. No se añaden experiencias, fechas,
 * resultados ni cifras: lo único que cambia respecto del original es la tilde
 * del nombre de pila, que se retira para firmar igual que el resto del
 * portafolio. Los demás acentos —Autónoma, Sambulá, Sierra Fría, México,
 * Berdegué— se conservan porque pertenecen a nombres propios de instituciones
 * y lugares.
 */

export type Idioma = 'es' | 'en';

/** Un puesto con sus viñetas. */
export type Puesto = {
  fecha: string;
  cargo: string;
  donde: string;
  puntos: string[];
};

/** Una entrada corta: año y descripción en un solo párrafo. */
export type Entrada = { fecha: string; texto: string };

/** Un par etiqueta/contenido de las rejillas de competencias. */
export type Par = { titulo: string; cuerpo: string };

export type Cv = {
  idioma: Idioma;
  /** Valor del atributo `lang` del documento. */
  etiquetaIdioma: string;
  nombre: string;
  titulo: string;
  oficio: string;
  contacto: string[];
  secciones: {
    areas: string;
    perfil: string;
    valor: string;
    experiencia: string;
    formacion: string;
    proyectos: string;
    competencias: string;
    herramientas: string;
    idiomas: string;
    cursos: string;
    comunicacion: string;
  };
  areas: string;
  perfil: string;
  valor: Par[];
  experiencia: Puesto[];
  formacion: Puesto[];
  proyectos: Entrada[];
  competencias: Par[];
  herramientas: string[];
  idiomas: string;
  cursos: string[];
  comunicacion: Entrada[];
  /** Pie de página: `{n}` y `{total}` se sustituyen por el folio. */
  pie: string;
};

const es: Cv = {
  idioma: 'es',
  etiquetaIdioma: 'es-MX',
  nombre: 'Nestor Elihu Arriaga Gallegos',
  titulo: 'Curriculum vitae',
  oficio: 'Ingeniero en Recursos Naturales Renovables | SIG, territorio y paisaje',
  contacto: [
    'Aguascalientes / Texcoco, México',
    '+52 (33) 3487 1084',
    'nestorarriaga.irnr@gmail.com',
    'Nacionalidad mexicana',
    'Inglés B2 (First Certificate in English)',
  ],
  secciones: {
    areas: 'Áreas objetivo',
    perfil: 'Perfil profesional',
    valor: 'Propuesta de valor',
    experiencia: 'Experiencia profesional y de investigación',
    formacion: 'Formación académica',
    proyectos: 'Proyectos y resultados seleccionados',
    competencias: 'Competencias técnicas y metodológicas',
    herramientas: 'Herramientas y software',
    idiomas: 'Idiomas',
    cursos: 'Formación complementaria seleccionada',
    comunicacion: 'Comunicación, representación y trabajo multiactor',
  },
  areas: 'Planeación territorial y del paisaje | SIG y teledetección | Restauración y SbN '
    + '| Agua y cuencas | Evaluación ambiental',
  perfil: 'Ingeniero en Recursos Naturales Renovables, con egreso concluido en junio de 2026 y '
    + 'titulación en trámite, orientado al análisis territorial, SIG y planeación del paisaje. '
    + 'Experiencia en investigación internacional (Horizon Europe), evaluación ambiental, '
    + 'ordenamiento ecológico comunitario y proyectos de cuenca, restauración, carbono y '
    + 'adaptación climática. Integro información biofísica, productiva, social e institucional '
    + 'con QGIS, Google Earth Engine, Python y R para construir mapas, tipologías, indicadores '
    + 'y productos técnicos que apoyan decisiones. Interés profesional en territorio, paisaje, '
    + 'agua, biodiversidad, soluciones basadas en naturaleza y diseño de proyectos '
    + 'socioambientales.',
  valor: [
    {
      titulo: 'Territorio + paisaje',
      cuerpo: 'Diagnóstico multiescalar, rural proofing, ordenamiento y lectura de sistemas '
        + 'socioecológicos para planeación y diseño territorial.',
    },
    {
      titulo: 'SIG + datos ambientales',
      cuerpo: 'QGIS, Google Earth Engine, teledetección, análisis raster/vector, cartografía '
        + 'temática y síntesis espacial para decisiones.',
    },
    {
      titulo: 'Agua + clima + restauración',
      cuerpo: 'Cuencas, presión hídrica, sequía, inundaciones, restauración, biodiversidad, '
        + 'carbono y soluciones basadas en naturaleza.',
    },
    {
      titulo: 'Ciencia + comunicación',
      cuerpo: 'Sistematización de métodos y resultados, reportes, mapas, infografías y trabajo '
        + 'interdisciplinario con actores públicos, privados y académicos.',
    },
  ],
  experiencia: [
    {
      fecha: '2025',
      cargo: 'Estancia de investigación · Proyecto GRANULAR (Horizon Europe)',
      donde: 'CIHEAM-IAMM Montpellier, Francia',
      puntos: [
        'Desarrollé investigación aplicada sobre diversidad rural, presión hídrica e '
        + 'intensificación agroproductiva en la Comarca Lagunera, integrando variables '
        + 'ambientales, productivas, sociales e institucionales.',
        'Construí tipologías territoriales mediante análisis espacial y métodos de '
        + 'agrupamiento, y elaboré cartografía y síntesis metodológica para rural proofing y '
        + 'planeación basada en evidencia.',
        'Trabajé en un equipo internacional y multidisciplinario, adaptando marcos europeos al '
        + 'contexto mexicano y documentando resultados reproducibles.',
      ],
    },
    {
      fecha: '04/2025 – 08/2025',
      cargo: 'Colaborador técnico · Instrumentos de gestión ambiental / Proyecto Agropark',
      donde: 'Grupo INDERS',
      puntos: [
        'Integré información biofísica, territorial y normativa para Estudios Técnicos '
        + 'Justificativos (ETJ) y Manifestaciones de Impacto Ambiental (MIA).',
        'Apoyé la caracterización del área de estudio, la organización de insumos y la '
        + 'elaboración cartográfica y documental para decisiones institucionales, sector privado '
        + 'y autoridades ambientales.',
      ],
    },
    {
      fecha: '2024 – 2025',
      cargo: 'Asistente técnico · Ordenamiento Ecológico Comunitario',
      donde: 'Universidad Autónoma Chapingo – SEMARNAT',
      puntos: [
        'Recopilé, depuré y sistematicé información ambiental y social para procesos de '
        + 'Ordenamiento Ecológico Comunitario en ejidos vinculados al Tren Maya.',
        'Preparé insumos cartográficos y documentales para planeación comunitaria, gestión '
        + 'territorial y toma de decisiones dentro de instrumentos de política ambiental.',
      ],
    },
    {
      fecha: '2023 – 2024',
      cargo: 'Proyecto aplicado · Planificación del paisaje en el sureste de México',
      donde: 'Universidad Autónoma Chapingo – SEMARNAT',
      puntos: [
        'Recopilé, depuré y analicé bases de datos territoriales utilizadas en estudios de '
        + 'planificación del paisaje y ordenamiento socioambiental.',
        'Integré fuentes heterogéneas para apoyar diagnósticos territoriales y construcción de '
        + 'insumos cartográficos.',
      ],
    },
  ],
  formacion: [
    {
      fecha: '2021 – 2026',
      cargo: 'Ingeniería en Recursos Naturales Renovables',
      donde: 'Universidad Autónoma Chapingo – División de Enseñanza e Investigación en Suelos',
      puntos: [
        'Egreso concluido en junio de 2026; titulación en trámite. Formación en manejo de '
        + 'cuencas, recursos hídricos, restauración, biodiversidad, planeación territorial, SIG, '
        + 'evaluación ambiental y sistemas socioecológicos.',
      ],
    },
  ],
  proyectos: [
    {
      fecha: '2026',
      texto: 'Sistema de monitoreo territorial · ANP Sierra Fría, Aguascalientes. Diseñé un '
        + 'sistema de indicadores para 106 263 ha y cinco zonas, integrando vegetación, humedad, '
        + 'agua superficial, riesgo de incendio, erosión y presión social; procesé series '
        + '2010–2025 en QGIS y Google Earth Engine.',
    },
    {
      fecha: '2026',
      texto: 'Diagnóstico y propuesta de manejo de cuenca. Integré información biofísica, '
        + 'productiva y de degradación para una cuenca de 21 210 ha recorrida en Tlaxcala, '
        + 'Puebla, Veracruz y Oaxaca; elaboré mapas de actividades, degradación, manejo '
        + 'prioritario y monitoreo.',
    },
    {
      fecha: '2024',
      texto: 'Programa de carbono · Bacalar, Quintana Roo. Coordiné la preparación cartográfica '
        + 'de un estudio de factibilidad y potencial de captura de carbono, delimitando unidades '
        + 'de análisis para una solución climática basada en naturaleza.',
    },
    {
      fecha: '2025',
      texto: 'Parque Hundido Sambulá, Mérida. Desarrollé una propuesta socioambiental para un '
        + 'espacio urbano de 1.14 ha con infiltración, cobertura vegetal, reducción de isla de '
        + 'calor, soluciones basadas en naturaleza y participación vecinal.',
    },
    {
      fecha: '2024',
      texto: 'Forestería urbana · Universidad Autónoma Chapingo. Cuantifiqué servicios '
        + 'ecosistémicos del arbolado urbano mediante levantamiento y análisis territorial y '
        + 'preparé insumos para comunicar beneficios ambientales medibles.',
    },
    {
      fecha: '2023',
      texto: 'Reutilización de aguas grises en edificios de alta densidad. Desarrollé una '
        + 'propuesta técnica de reúso urbano articulando ingeniería ambiental, eficiencia '
        + 'hídrica y cultura del agua bajo supervisión académica.',
    },
  ],
  competencias: [
    {
      titulo: 'Análisis territorial y paisaje',
      cuerpo: 'Diagnóstico multiescalar, tipologías territoriales, rural proofing, ordenamiento '
        + 'ecológico, integración de variables ambientales, sociales y productivas.',
    },
    {
      titulo: 'SIG y teledetección',
      cuerpo: 'QGIS, Google Earth Engine, cartografía temática, NDVI/NDMI/NBR, hidrología, agua '
        + 'superficial, clasificación y análisis de patrones espaciales.',
    },
    {
      titulo: 'Datos, modelación y biodiversidad',
      cuerpo: 'Python, R/RStudio, estadística, clustering, Vensim, AnyLogic, MaxEnt y Marxan; '
        + 'limpieza de datos, visualización y flujos reproducibles.',
    },
    {
      titulo: 'Evaluación y comunicación técnica',
      cuerpo: 'ETJ, MIA, reportes, síntesis cartográfica, indicadores, Adobe Creative Cloud y '
        + 'traducción de evidencia para públicos técnicos y no especializados.',
    },
  ],
  herramientas: [
    'QGIS, Google Earth Engine, Python, R/RStudio y Microsoft Excel.',
    'Adobe Illustrator, InDesign y Photoshop para comunicación visual.',
    'MaxEnt, Marxan, Vensim y AnyLogic para modelación y análisis aplicado.',
    'AutoCAD, Rhino3D y Blender para representación espacial y documentación.',
    'Gephi, NetworkX y VOSviewer para redes y mapeo de conocimiento.',
    'LaTeX y Microsoft Office para documentación científica y técnica.',
  ],
  idiomas: 'Español: lengua materna. Inglés: B2 / intermedio-alto, First Certificate in English '
    + '(FCE); comprensión de documentación técnica y comunicación profesional funcional.',
  cursos: [
    'Integrated Water Resources Management · UNU-INWEH | 2026',
    'Restauración de bosques y paisajes + monitoreo · FAO | 2026',
    'Big Data Analysis for Water Related Applications · UNU-INWEH | 2026',
    'IPBES and IPCC: Bridging Science, Policy and Practice · RESPIN / Learning for Nature | 2025–2026',
    'Spatiotemporal Drought Assessment with Google Earth Engine · UNU-INWEH / UNESCAP | 2026',
    'Biodiversity Finance · BIOFIN / PNUD / GEF | 2025–2026',
    'Surface Water/Flood Mapping with Satellite Data · UNU-INWEH / UNESCAP | 2026',
    'Introducción a la Geointeligencia Computacional · CentroGeo / MéxicoX | 2024',
    'Remote Sensing of Wildfire Management · UNU-INWEH | 2026',
    'Hidrología Computacional de Cuencas · Purdue University / edX | 2024',
  ],
  comunicacion: [
    {
      fecha: '2026',
      texto: 'Proyecto editorial interdisciplinario · UACh. Coordinación de contenidos en un '
        + 'equipo de siete integrantes; preparación de entrevistas, fichas de contexto y '
        + 'síntesis sobre agua, territorio, ruralidad y ambiente.',
    },
    {
      fecha: '2026',
      texto: 'Congreso Internacional de Emprendimiento Universitario · Panamá. Ponencia y '
        + 'presentación de un proyecto aplicado ante audiencia académica y profesional '
        + 'internacional.',
    },
    {
      fecha: '—',
      texto: 'Consejero Universitario Estudiantil · DEIS, UACh. Representación de la comunidad '
        + 'estudiantil, discusión institucional y comunicación con autoridades universitarias.',
    },
    {
      fecha: '—',
      texto: 'Foro sobre el futuro de la agricultura mexicana. Participación en diálogo '
        + 'académico con el Dr. Julio Berdegué sobre juventud, territorio, desarrollo rural y '
        + 'agenda pública agroterritorial.',
    },
  ],
  pie: 'Nestor Elihu Arriaga Gallegos · Curriculum vitae · Página {n} de {total}',
};

const en: Cv = {
  idioma: 'en',
  etiquetaIdioma: 'en',
  nombre: 'Nestor Elihu Arriaga Gallegos',
  titulo: 'Curriculum vitae',
  oficio: 'Renewable Natural Resources Engineer | Territory, GIS & Landscape',
  contacto: [
    'Aguascalientes / Texcoco, México',
    '+52 (33) 3487 1084',
    'nestorarriaga.irnr@gmail.com',
    'Mexican nationality',
    'English B2 (First Certificate in English)',
  ],
  secciones: {
    areas: 'Target areas',
    perfil: 'Professional profile',
    valor: 'Value proposition',
    experiencia: 'Professional & research experience',
    formacion: 'Education',
    proyectos: 'Selected projects & results',
    competencias: 'Technical & methodological skills',
    herramientas: 'Tools & software',
    idiomas: 'Languages',
    cursos: 'Selected additional training',
    comunicacion: 'Communication, representation & multi-stakeholder work',
  },
  areas: 'Territorial & landscape planning | GIS & remote sensing | Restoration & NbS '
    + '| Water & watersheds | Environmental assessment',
  perfil: 'Renewable Natural Resources Engineer, who completed academic requirements in June '
    + '2026 with degree issuance in progress, focused on territorial analysis, GIS and landscape '
    + 'planning. Experience in international research (Horizon Europe), environmental '
    + 'assessment, community ecological planning, and watershed, restoration, carbon and '
    + 'climate-adaptation projects. Combines biophysical, productive, social and institutional '
    + 'information using QGIS, Google Earth Engine, Python and R to build maps, territorial '
    + 'typologies, indicators and decision-ready technical products. Professional interests '
    + 'include territory, landscape, water, biodiversity, nature-based solutions and '
    + 'socio-environmental project design.',
  valor: [
    {
      titulo: 'Territory + landscape',
      cuerpo: 'Multiscale diagnosis, rural proofing, ecological/landscape planning and '
        + 'socio-ecological systems analysis for territorial design and planning.',
    },
    {
      titulo: 'GIS + environmental data',
      cuerpo: 'QGIS, Google Earth Engine, remote sensing, raster/vector analysis, thematic '
        + 'cartography and spatial synthesis for decision-making.',
    },
    {
      titulo: 'Water + climate + restoration',
      cuerpo: 'Watersheds, water stress, drought, floods, restoration, biodiversity, carbon and '
        + 'nature-based solutions.',
    },
    {
      titulo: 'Science + communication',
      cuerpo: 'Method and results systematization, reports, maps, infographics, and '
        + 'interdisciplinary work with public, private and academic stakeholders.',
    },
  ],
  experiencia: [
    {
      fecha: '2025',
      cargo: 'Research Internship · GRANULAR Project (Horizon Europe)',
      donde: 'CIHEAM-IAMM Montpellier, France',
      puntos: [
        'Conducted applied research on rural diversity, water stress and agricultural '
        + 'intensification in Comarca Lagunera, integrating environmental, productive, social '
        + 'and institutional variables.',
        'Built territorial typologies through spatial analysis and clustering methods, and '
        + 'produced cartography and methodological synthesis for rural proofing and '
        + 'evidence-based planning.',
        'Worked within an international multidisciplinary team, adapting European frameworks to '
        + 'the Mexican context and documenting reproducible results.',
      ],
    },
    {
      fecha: '04/2025 – 08/2025',
      cargo: 'Technical Collaborator · Environmental Management Instruments / Agropark Project',
      donde: 'Grupo INDERS',
      puntos: [
        'Integrated biophysical, territorial and regulatory information for Technical '
        + 'Justification Studies (ETJ) and Environmental Impact Assessments (MIA).',
        'Supported site characterization, data organization, cartographic outputs and technical '
        + 'documentation for institutional decisions, private-sector clients and environmental '
        + 'authorities.',
      ],
    },
    {
      fecha: '2024 – 2025',
      cargo: 'Technical Assistant · Community Ecological Planning',
      donde: 'Universidad Autónoma Chapingo – SEMARNAT',
      puntos: [
        'Collected, cleaned and systematized environmental and social information for Community '
        + 'Ecological Planning processes in ejidos linked to the Tren Maya corridor.',
        'Prepared cartographic and documentary inputs for community planning, territorial '
        + 'management and decision-making within environmental policy instruments.',
      ],
    },
    {
      fecha: '2023 – 2024',
      cargo: 'Applied Project · Landscape Planning in Southeastern Mexico',
      donde: 'Universidad Autónoma Chapingo – SEMARNAT',
      puntos: [
        'Collected, cleaned and analyzed territorial databases used in landscape planning and '
        + 'socio-environmental planning studies.',
        'Integrated heterogeneous sources to support territorial diagnostics and the development '
        + 'of cartographic inputs.',
      ],
    },
  ],
  formacion: [
    {
      fecha: '2021 – 2026',
      cargo: 'Engineering Degree in Renewable Natural Resources',
      donde: 'Universidad Autónoma Chapingo – Division of Soil Science Teaching and Research',
      puntos: [
        'Completed academic requirements in June 2026; degree issuance in progress. Coursework '
        + 'and applied training in watershed management, water resources, restoration, '
        + 'biodiversity, territorial planning, GIS, environmental assessment and socio-ecological '
        + 'systems.',
      ],
    },
  ],
  proyectos: [
    {
      fecha: '2026',
      texto: 'Territorial monitoring system · Sierra Fría Protected Natural Area, Aguascalientes. '
        + 'Designed an indicator system for 106,263 ha and five analysis zones, integrating '
        + 'vegetation, moisture, surface water, wildfire risk, erosion and social pressure; '
        + 'processed 2010–2025 series in QGIS and Google Earth Engine.',
    },
    {
      fecha: '2026',
      texto: 'Watershed diagnosis and management proposal. Integrated biophysical, productive '
        + 'and degradation data for a 21,210 ha watershed surveyed across Tlaxcala, Puebla, '
        + 'Veracruz and Oaxaca; produced maps of activities, degradation, priority management '
        + 'and monitoring.',
    },
    {
      fecha: '2024',
      texto: 'Carbon program · Bacalar, Quintana Roo. Coordinated cartographic preparation for a '
        + 'feasibility and carbon-capture potential study, delineating analysis units for a '
        + 'nature-based climate solution.',
    },
    {
      fecha: '2025',
      texto: 'Parque Hundido Sambulá, Mérida. Developed a socio-environmental proposal for a '
        + '1.14 ha urban space integrating infiltration, vegetation cover, urban heat mitigation, '
        + 'nature-based solutions and community participation.',
    },
    {
      fecha: '2024',
      texto: 'Urban forestry · Universidad Autónoma Chapingo. Quantified urban-tree ecosystem '
        + 'services through field data and territorial analysis, and prepared communication '
        + 'inputs for measurable environmental benefits.',
    },
    {
      fecha: '2023',
      texto: 'Greywater reuse in high-density buildings. Developed a technical urban water-reuse '
        + 'proposal connecting environmental engineering, water efficiency and water culture '
        + 'under academic supervision.',
    },
  ],
  competencias: [
    {
      titulo: 'Territorial & landscape analysis',
      cuerpo: 'Multiscale diagnosis, territorial typologies, rural proofing, ecological '
        + 'planning, and integration of environmental, social and productive variables.',
    },
    {
      titulo: 'GIS & remote sensing',
      cuerpo: 'QGIS, Google Earth Engine, thematic cartography, NDVI/NDMI/NBR, hydrology, '
        + 'surface water, classification and spatial-pattern analysis.',
    },
    {
      titulo: 'Data, modeling & biodiversity',
      cuerpo: 'Python, R/RStudio, statistics, clustering, Vensim, AnyLogic, MaxEnt and Marxan; '
        + 'data cleaning, visualization and reproducible workflows.',
    },
    {
      titulo: 'Assessment & technical communication',
      cuerpo: 'ETJ, MIA, reports, cartographic synthesis, indicators, Adobe Creative Cloud, and '
        + 'translation of evidence for technical and non-specialist audiences.',
    },
  ],
  herramientas: [
    'QGIS, Google Earth Engine, Python, R/RStudio and Microsoft Excel.',
    'Adobe Illustrator, InDesign and Photoshop for visual communication.',
    'MaxEnt, Marxan, Vensim and AnyLogic for applied modeling and analysis.',
    'AutoCAD, Rhino3D and Blender for spatial representation and documentation.',
    'Gephi, NetworkX and VOSviewer for network and knowledge mapping.',
    'LaTeX and Microsoft Office for scientific and technical documentation.',
  ],
  idiomas: 'Spanish: native. English: B2 / upper-intermediate, First Certificate in English '
    + '(FCE); able to read technical documentation and communicate professionally.',
  cursos: [
    'Integrated Water Resources Management · UNU-INWEH | 2026',
    'Forest and Landscape Restoration + Monitoring · FAO | 2026',
    'Big Data Analysis for Water Related Applications · UNU-INWEH | 2026',
    'IPBES and IPCC: Bridging Science, Policy and Practice · RESPIN / Learning for Nature | 2025–2026',
    'Spatiotemporal Drought Assessment with Google Earth Engine · UNU-INWEH / UNESCAP | 2026',
    'Biodiversity Finance · BIOFIN / UNDP / GEF | 2025–2026',
    'Surface Water/Flood Mapping with Satellite Data · UNU-INWEH / UNESCAP | 2026',
    'Introduction to Computational Geointelligence · CentroGeo / MéxicoX | 2024',
    'Remote Sensing of Wildfire Management · UNU-INWEH | 2026',
    'Computational Hydrology of Watersheds · Purdue University / edX | 2024',
  ],
  comunicacion: [
    {
      fecha: '2026',
      texto: 'Interdisciplinary editorial project · UACh. Coordinated content in a seven-person '
        + 'team; prepared interviews, context briefs and syntheses on water, territory, rurality '
        + 'and environment.',
    },
    {
      fecha: '2026',
      texto: 'International University Entrepreneurship Congress · Panama. Presented an applied '
        + 'project to an international academic and professional audience.',
    },
    {
      fecha: '—',
      texto: 'Student University Council Representative · DEIS, UACh. Represented the student '
        + 'community in institutional discussions and communication with university authorities.',
    },
    {
      fecha: '—',
      texto: 'Forum on the future of Mexican agriculture. Participated in an academic dialogue '
        + 'with Dr. Julio Berdegué on youth, territory, rural development and public '
        + 'agro-territorial policy.',
    },
  ],
  pie: 'Nestor Elihu Arriaga Gallegos · Curriculum vitae · Page {n} of {total}',
};

export const curriculos: Record<Idioma, Cv> = { es, en };
