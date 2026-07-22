export const granularWarnings = [
  {
    id: "terminology-agriculture-agropecuario",
    type: "terminology",
    description: "Inconsistencia en la fuente entre 'Agricultura' y 'Pilar Agropecuario'. Se usa 'Agricultura' como estándar."
  },
  {
    id: "source-claims-narrative",
    type: "narrative",
    description: "Afirmaciones narrativas fuertes o interpretativas que deben separarse de los datos neutrales."
  },
  {
    id: "ambiguous-assignment",
    type: "architecture",
    description: "La página 35 parece mezclar Ambiente y Conectividad. Los recursos deben asignarse cuidadosamente."
  },
  {
    id: "complex-diagram",
    type: "readability",
    description: "Diagrama complejo (Causal Loop o Chord) que podría requerir un visor dedicado o simplificación en el futuro."
  },
  {
    id: "water-quality-level-count",
    page: 23,
    severity: "medium",
    issue: "El texto describe tres niveles de severidad —Alto, Medio y Bajo—, mientras la leyenda incluye una cuarta categoría denominada 'Sin riesgo aparente'.",
    treatment: "La versión web conserva las cuatro categorías de la leyenda y registra que el texto desarrolla únicamente tres."
  },
  {
    id: "aquifer-range-overlap",
    page: 24,
    severity: "high",
    issue: "Los rangos textuales de las categorías 'Crítico' (>100%) y 'Sobreexplotado' (100–120%) se superponen.",
    treatment: "La versión web conserva los rangos tal como aparecen en el portafolio y evita utilizarlos para recalcular o reasignar categorías."
  },
  {
    id: "agriculture-agropecuario-variation",
    pages: [25, 26, 27, 28, 29],
    severity: "low",
    issue: "La dimensión general se denomina Agricultura, mientras algunas composiciones pueden utilizar la formulación Pilar Agropecuario.",
    treatment: "La navegación conserva Agricultura y registra Agropecuario como variante terminológica de la fuente."
  },
  {
    id: "simon-bolivar-name-variation",
    page: 26,
    severity: "low",
    issue: "La página utiliza la formulación Simón Bolívar, mientras otros registros territoriales pueden emplear General Simón Bolívar.",
    treatment: "La versión web conserva la formulación de la página y registra la variante sin alterar la fuente."
  },
  {
    id: "francisco-i-madero-name-variation",
    page: 27,
    severity: "low",
    issue: "La página utiliza las formulaciones Francisco I. Madero y Madero para el mismo referente municipal.",
    treatment: "La interfaz utiliza Francisco I. Madero como nombre visible y conserva Madero cuando forme parte de una cita o transcripción fuente."
  },
  {
    id: "drought-high-very-high-ambiguity",
    page: 28,
    severity: "high",
    issue: "La leyenda distingue Muy alto y Alto, mientras el texto emplea la expresión Alta vulnerabilidad (>70%) sin aclarar a cuál de las dos categorías corresponde el ejemplo de Torreón (~79%).",
    treatment: "La versión web conserva las cinco categorías y presenta Torreón dentro de los ejemplos textuales de vulnerabilidad alta, sin reasignarlo a Muy alto."
  },
  {
    id: "governance-gray-zones-context",
    page: 31,
    severity: "medium",
    issue: "La expresión 'zonas grises' aparece aquí como interpretación de tensiones institucionales y posteriormente reaparece en la síntesis territorial.",
    treatment: "La versión web evita presentarla en este capítulo como una clase cartográfica o tipología definitiva."
  },
  {
    id: "commuting-incomplete-thresholds",
    page: 33,
    severity: "medium",
    issue: "La leyenda presenta Bajo, Medio y Alto commuting, pero el texto sólo documenta ejemplos superiores al 60% e inferiores al 30%, sin definir todos los umbrales.",
    treatment: "La versión web conserva las tres categorías y evita construir un intervalo numérico para Medio o un umbral general para Alto."
  },
  {
    id: "margination-imn-undefined",
    page: 33,
    severity: "high",
    issue: "La página utiliza la sigla IMN y los umbrales >0.85 y <0.70, pero no documenta su nombre completo, fórmula, fuente, año o dirección.",
    treatment: "La versión web conserva la sigla y los umbrales exactamente como aparecen, sin reinterpretarlos mediante índices externos."
  },
  {
    id: "page-33-margination-text-duplication",
    page: 33,
    severity: "low",
    issue: "La composición repite el bloque descriptivo del índice de marginación.",
    treatment: "La interfaz presenta una única versión del contenido y conserva la página original dentro del visor."
  },
  {
    id: "connectivity-no-independent-pillar-page",
    pages: [35],
    severity: "low",
    issue: "Conectividad no cuenta con una página de apertura independiente; su contenido aparece en la mitad derecha de la página 35.",
    treatment: "La versión web construye el capítulo desde la composición original sin atribuirle una apertura o texto fuente inexistentes."
  },
  {
    id: "soil-productivity-terminology",
    page: 35,
    severity: "medium",
    issue: "La clasificación del suelo utiliza términos de fertilidad y productividad sin documentar indicadores, valores, método o relación con la clasificación agroproductiva de localidades.",
    treatment: "La versión web conserva la terminología de la página y evita convertirla en una medición comparable con otros capítulos."
  },
  {
    id: "soil-classification-method-undefined",
    page: 35,
    severity: "high",
    issue: "La página presenta seis clases de suelo, pero no documenta metodología, fuente, fecha, taxonomía, unidades, superficies o criterios de delimitación.",
    treatment: "La versión web conserva el mapa y sus descripciones como clasificación funcional presentada en el portafolio, sin atribuirle carácter oficial."
  },
  {
    id: "connectivity-distance-method-undefined",
    page: 35,
    severity: "high",
    issue: "La página presenta rangos de distancia respecto de centros urbanos, pero no documenta el método de cálculo, la red utilizada, los centros de referencia ni la fecha.",
    treatment: "La versión web conserva los tres rangos sin reinterpretarlos como distancia vial, tiempo de viaje o accesibilidad calculada."
  },
  {
    id: "connectivity-urban-centers-not-listed",
    page: 35,
    severity: "medium",
    issue: "La clasificación refiere centros urbanos, pero la página no presenta un inventario textual inequívoco de los centros utilizados.",
    treatment: "La versión web utiliza la expresión general de la fuente y evita completar la lista mediante inferencias."
  },
  {
    id: "municipal-clustering-method-not-documented",
    pages: [36, 37],
    severity: "high",
    issue: "Las páginas presentan resultados de clustering municipal, pero no documentan algoritmo, variables, tratamiento de datos, selección del número de grupos, parámetros o validación.",
    treatment: "La versión web conserva los resultados y las interpretaciones de la fuente sin reconstruir ni completar el procedimiento estadístico."
  },
  {
    id: "municipal-relation-meaning-undefined",
    page: 37,
    severity: "high",
    issue: "El diagrama representa relaciones entre municipios y clústeres, pero la página no documenta el significado, peso, dirección o método de construcción de los enlaces.",
    treatment: "La versión web conserva el diagrama y su interpretación textual sin asignar significado adicional a las conexiones."
  },
  {
    id: "locality-typology-projection-method-undefined",
    page: 38,
    severity: "high",
    issue: "La página representa la tipología a escala de localidad, pero no documenta el procedimiento utilizado para proyectar o asignar las categorías municipales.",
    treatment: "La versión web conserva la representación sin describir un algoritmo de transferencia o clasificación."
  },
  {
    id: "situated-typology-integration-method-undefined",
    page: 39,
    severity: "medium",
    issue: "La página afirma presentar una síntesis multiescalar (tipología rural situada), pero no documenta cómo se integran metodológicamente los mapas previos.",
    treatment: "La versión web presenta el contenido como síntesis cualitativa de las etapas anteriores sin afirmar la construcción de un nuevo índice."
  },
  {
    id: "causal-loop-formal-method-not-documented",
    page: 40,
    severity: "high",
    issue: "La figura se titula Causal loop, pero la página no documenta procedimiento de construcción, variables operacionales, dirección completa, ecuaciones, pesos, temporalidad o validación causal.",
    treatment: "La versión web conserva el título y la lógica visual como representación sistémica declarada por el portafolio, sin presentarla como modelo causal formal validado."
  },
  {
    id: "causal-loop-sign-association-partial",
    page: 40,
    severity: "high",
    issue: "La figura contiene signos +, - y ±, pero la asociación y dirección de todos los enlaces no puede recuperarse con plena seguridad únicamente a partir de la composición.",
    treatment: "La versión web explica el significado general de los signos y sólo transcribe relaciones específicas cuando su asociación visual es inequívoca."
  },
  {
    id: "causal-loop-weighted-flows-without-values",
    page: 40,
    severity: "high",
    issue: "El texto menciona flujos ponderados, pero la página no muestra valores, criterios o matriz de ponderaciones.",
    treatment: "La versión web conserva la afirmación con atribución y evita representar pesos nuevos."
  },
  {
    id: "system-validation-process-not-documented",
    page: 40,
    severity: "high",
    issue: "La narrativa afirma que existió control metodológico y evaluación de solidez, pero no presenta procedimiento, métricas ni resultados.",
    treatment: "La versión web conserva la afirmación como descripción del portafolio y evita presentarla como validación demostrada."
  },
  {
    id: "gray-zones-cross-context-ambiguity",
    pages: [31, 39, 40],
    severity: "high",
    issue: "La expresión 'zonas grises' se utiliza en contextos institucionales y de síntesis territorial, pero no se documenta como cuarta clase municipal ni se presenta un método de delimitación.",
    treatment: "La versión web conserva sus distintos contextos y evita asignarle una equivalencia estadística, jurídica o cartográfica no sustentada."
  }
];
