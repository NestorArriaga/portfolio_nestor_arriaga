export const urbanWarnings = [
  {
    id: "urban-challenge-built-status",
    pages: [41, 42, 43, 44, 45],
    severity: "critical",
    issue: "El portafolio presenta una propuesta de concurso mediante planos, modelos y renders, pero no documenta construcción, ejecución o adopción.",
    treatment: "La versión pública debe utilizar 'propuesta', 'diseño' o 'intervención proyectada' y nunca mostrar el caso como obra construida."
  },
  {
    id: "aerial-images-comparison-undefined",
    pages: [45],
    severity: "critical",
    issue: "La página contiene dos capturas aéreas, pero no incorpora un rótulo inequívoco que permita tratarlas como antes y después, comparación temporal o evidencia de obra construida.",
    treatment: "La versión web las registra como 'contexto aéreo' hasta verificar fechas, proveedor, encuadre y función editorial."
  },
  {
    id: "urban-basin-conceptual-status",
    pages: [41],
    severity: "high",
    issue: "La página describe el parque hundido y antigua sascabera como una cuenca urbana, pero no documenta delimitación hidrológica, estudio geológico o modelación hidráulica.",
    treatment: "La versión web conserva la expresión como lectura territorial y morfológica del proyecto, sin presentarla como clasificación hidrológica oficial."
  },
  {
    id: "wind-thermal-simulation-undocumented",
    pages: [42],
    severity: "high",
    issue: "El texto menciona simulaciones de viento y comportamiento térmico, pero las páginas no documentan software, método, parámetros o resultados numéricos.",
    treatment: "La versión web conserva la lectura climática como parte del proceso descrito y evita recrear simulaciones inexistentes (ej. mapas de calor interactivos)."
  },
  {
    id: "environmental-performance-not-quantified",
    pages: [41, 42, 43, 44],
    severity: "high",
    issue: "La propuesta atribuye beneficios de infiltración, sombra y continuidad hídrica, pero las páginas no muestran valores, escenarios o métricas de verificación.",
    treatment: "La versión web presenta estos beneficios como intenciones y criterios de diseño, no como resultados cuantificados."
  },
  {
    id: "community-participation-not-documented",
    pages: [41, 42, 43, 44, 45],
    severity: "high",
    issue: "La narrativa plantea encuentro, asamblea y activación comunitaria, pero no documenta procesos participativos o validación vecinal.",
    treatment: "La versión web presenta la dimensión comunitaria como intención espacial del diseño, no como resultado de participación social demostrada."
  },
  {
    id: "circular-nodes-distinction",
    pages: [42, 43, 44, 45],
    severity: "high",
    issue: "Las páginas muestran varios elementos circulares (anillo central, anfiteatro, anillo de juego) que no deben confundirse entre sí.",
    treatment: "Cada recurso debe asociarse con su función únicamente después de revisar su posición dentro del master plan."
  },
  {
    id: "elevated-spine-terminology",
    pages: [41, 42, 43],
    severity: "medium",
    issue: "La fuente utiliza las expresiones pasarela elevada, espina dorsal elevada y estructura ligera.",
    treatment: "La arquitectura web conserva las variantes y sólo las trata como un mismo sistema cuando la continuidad gráfica sea inequívoca."
  },
  {
    id: "page-42-analysis-methods-not-documented",
    pages: [42],
    severity: "high",
    issue: "La página describe modelación tridimensional, análisis volumétrico, flujos de viento, comportamiento térmico y dinámica hídrica, pero no documenta software, datos, parámetros, escala, escenarios, valores o procedimiento reproducible.",
    treatment: "La versión web conserva la secuencia de lectura y las figuras del portafolio sin reconstruir ni ampliar sus métodos."
  },
  {
    id: "urban-fabric-homogeneity-not-quantified",
    pages: [42],
    severity: "medium",
    issue: "El texto describe edificaciones homogéneas y una trama compacta, pero no presenta variables, mediciones o criterios para caracterizarlas.",
    treatment: "La versión web conserva estas expresiones como lectura morfológica de la fuente y evita transformarlas en indicadores urbanos."
  },
  {
    id: "potential-accesses-not-spatially-documented",
    pages: [42],
    severity: "high",
    issue: "El texto afirma que se identificaron accesos potenciales, pero la página no presenta una lista, simbología o localización inequívoca de cada acceso.",
    treatment: "La versión web conserva la afirmación textual y evita dibujar, enumerar o jerarquizar accesos no documentados."
  },
  {
    id: "wind-overlay-association-partial",
    pages: [42],
    severity: "high",
    issue: "La página incluye un dibujo lineal próximo al segundo modelo volumétrico y al texto sobre viento, pero no presenta título, leyenda, flechas, valores o método suficientes para clasificarlo como simulación reproducible.",
    treatment: "La versión web lo presenta como gráfica conceptual asociada con la lectura del viento y evita describir velocidades, direcciones o resultados numéricos."
  },
  {
    id: "thermal-zones-not-visually-mapped",
    pages: [42],
    severity: "high",
    issue: "El texto menciona áreas susceptibles a acumulación de calor, pero la composición no presenta una superficie térmica, leyenda, valores o delimitación independiente claramente identificable.",
    treatment: "La versión web mantiene la afirmación en formato textual y evita crear un mapa térmico o localizar zonas por inferencia."
  },
  {
    id: "topography-not-quantified",
    pages: [41, 42],
    severity: "high",
    issue: "El proyecto utiliza la condición hundida y la topografía existente como fundamento de diseño, pero las páginas no muestran cotas, curvas de nivel, pendientes, secciones o un levantamiento topográfico verificable.",
    treatment: "La versión web conserva la lectura morfológica y evita producir una representación topográfica nueva."
  },
  {
    id: "hydrological-behavior-not-modeled",
    pages: [41, 42],
    severity: "high",
    issue: "La narrativa menciona comportamiento hídrico, infiltración natural y continuidad hídrica, pero no presenta delimitación, parámetros del suelo, precipitaciones, escurrimientos, volúmenes o simulación.",
    treatment: "La versión web presenta estas relaciones como intenciones y criterios de diseño, no como desempeño hidráulico demostrado."
  },
  {
    id: "master-plan-editorial-label",
    pages: [43],
    severity: "low",
    issue: "La arquitectura web utiliza 'Plan maestro' como título editorial del capítulo, aunque la página puede describir la figura como consolidación o sistema integrado de la propuesta.",
    treatment: "El título organiza la experiencia web, mientras los captions conservan la formulación exacta de la fuente y evitan atribuir una etiqueta técnica inexistente."
  },
  {
    id: "page-43-scale-dimensions-not-documented",
    pages: [43],
    severity: "high",
    issue: "Las plantas y axonometrías de la página 43 no documentan de forma legible escala, dimensiones, cotas, pendientes, superficies o medidas constructivas.",
    treatment: "La versión web presenta organización, relaciones espaciales e intenciones del diseño sin derivar dimensiones ni superficies desde las imágenes."
  },
  {
    id: "forum-central-ring-relationship",
    pages: [43, 44],
    severity: "medium",
    issue: "La página 43 menciona foro central y anillo central. La página 44 desarrolla un nodo central configurado como sistema anular y un vacío destinado a encuentro y permanencia.",
    treatment: "La versión web distingue el sistema arquitectónico —anillo central— de su vacío o foro de encuentro cuando la asociación visual sea inequívoca. Cualquier relación no resuelta permanece explícita."
  },
  {
    id: "page-43-environmental-performance-not-verified",
    pages: [43],
    severity: "high",
    issue: "La página atribuye a la propuesta ventilación cruzada, sombra continua, infiltración, dinámica hídrica y desempeño ambiental, pero no presenta valores, simulaciones, estudios o verificación.",
    treatment: "La versión web presenta estas afirmaciones como intenciones y cualidades proyectadas del diseño."
  },
  {
    id: "continuous-shade-not-measured",
    pages: [43],
    severity: "high",
    issue: "La fuente utiliza la expresión sombra continua, pero no presenta estudio solar, fecha, horario, superficie o porcentaje de cobertura.",
    treatment: "La versión web conserva la expresión como intención del diseño y evita tratarla como desempeño verificado."
  },
  {
    id: "existing-proposed-vegetation-not-separated",
    pages: [42, 43],
    severity: "high",
    issue: "Las figuras contienen masas vegetales, pero no presentan una leyenda inequívoca que diferencie vegetación existente, conservada y propuesta.",
    treatment: "La versión web utiliza el término vegetación representada y evita atribuir cada elemento a una fase específica."
  },
  {
    id: "amphitheater-figure-identification",
    pages: [42, 43],
    severity: "medium",
    issue: "El anfiteatro aparece dentro de composiciones con varios nodos circulares y debe diferenciarse del anillo central y del foro.",
    treatment: "La versión web utiliza únicamente recursos cuya asociación con el anfiteatro esté respaldada por líneas, texto y posición dentro del plan."
  },
  {
    id: "central-ring-climate-performance-not-measured",
    pages: [44],
    severity: "high",
    issue: "La fuente atribuye a la cubierta filtración solar y ventilación natural, pero no presenta estudio solar, simulación climática, valores o evaluación.",
    treatment: "La versión web conserva estas cualidades como intenciones del diseño."
  },
  {
    id: "central-ring-permeable-surface-not-quantified",
    pages: [44],
    severity: "high",
    issue: "La página utiliza la expresión superficie permeable, pero no presenta superficies, porcentajes, materiales o pruebas de infiltración.",
    treatment: "La versión web conserva la afirmación con atribución y evita calcular valores a partir del render."
  },
  {
    id: "central-ring-ground-performance-not-verified",
    pages: [44],
    severity: "high",
    issue: "La fuente atribuye menor compactación y continuidad hídrica a la estructura elevada, pero no documenta apoyos, huella, materiales, pruebas de suelo o modelación.",
    treatment: "La versión web presenta ambas cualidades como criterios proyectados."
  },
  {
    id: "central-ring-play-ring-distinction",
    pages: [44, 45],
    severity: "high",
    issue: "Ambas páginas presentan sistemas circulares de madera, pero corresponden a elementos y narrativas distintas.",
    treatment: "La versión web los desarrolla en capítulos independientes, con assets, funciones y claims separados."
  },
  {
    id: "community-participation-not-documented",
    pages: [41, 42, 43, 44, 45],
    severity: "high",
    issue: "La narrativa plantea encuentro, asamblea, juego, permanencia y activación comunitaria, pero no documenta procesos participativos, consulta, uso construido o evaluación social.",
    treatment: "La versión web presenta la dimensión comunitaria como intención espacial y narrativa del diseño."
  }
];
