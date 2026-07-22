# URBAN CHALLENGE SEDATU × GIZ
## REGISTRO DE RIESGOS DOCUMENTALES (Páginas 41–45)

Este documento unifica y clasifica las advertencias o limitaciones detectadas en el análisis de las páginas fuente del Proyecto 15.

| ID | Severidad | Impacto | Issue | Tratamiento Editorial |
|---|---|---|---|---|
| `urban-challenge-built-status` | **CRITICAL** | Tergiversación de portafolio y fraude curricular. | El portafolio presenta la propuesta mediante renders y planos para concurso, pero no documenta construcción, presupuesto, fechas ni adopción por parte de SEDATU o Gobierno de Yucatán. | Utilizar términos como "propuesta", "diseño" o "intervención proyectada". PROHIBIDO usar "construido", "ejecutado" o "finalizado". |
| `aerial-images-comparison-undefined` | **CRITICAL** | Error cronológico y posible copyright. | La pág. 45 contiene capturas aéreas, pero no hay un rótulo que indique fecha, proveedor, o si existe un "antes y después". | Tratarlas como "contexto aéreo" estático. No afirmar transformación constructiva. Verificar licencias (ej. Google Earth) antes de un uso protagónico. |
| `urban-basin-conceptual-status` | HIGH | Riesgo de falsa validez técnica. | Se denomina al sitio "cuenca urbana" pero no hay estudio geológico, hidrológico ni periodo de retorno documentado. | Conservar el término estrictamente como "lectura territorial y morfológica" propuesta por los diseñadores, no como clasificación hidrológica gubernamental. |
| `wind-thermal-simulation-undocumented` | HIGH | Atribución de métodos no sustentados. | Se mencionan simulaciones de viento y calor, pero no se presentan mapas, vectores, software, inputs o resultados numéricos. | Presentar el análisis climático como parte narrativa del diseño. PROHIBIDO construir capas de simulación interactiva inventadas. |
| `environmental-performance-not-quantified` | HIGH | Lavado verde (greenwashing) involuntario. | Se atribuyen beneficios de infiltración, sombra y continuidad hídrica sin números, porcentajes ni modelos de escorrentía explícitos. | Redactar como "intenciones de diseño" (`design-intention`) y criterios de proyecto, nunca como impacto validado post-ocupación. |
| `community-participation-not-documented` | HIGH | Falsa atribución de procesos sociales. | Se habla de "nodo comunitario" y "encuentro", pero no hay rastro de talleres participativos, entrevistas o asambleas con vecinos. | Enfatizar que se trata de "intenciones espaciales y programáticas" del autor, no del resultado de un proceso de co-diseño vecinal. |
| `circular-nodes-distinction` | HIGH | Confusión de arquitectura del plan. | Se usan términos superpuestos: "anillo central", "foro", "anfiteatro", "anillo de juego", "sistema radial". | Cada componente UI (nodo central vs. juego vs. anfiteatro) debe asegurar que las imágenes se asignen verificando su posición en el master plan de la pág 43. |
| `elevated-spine-terminology` | MEDIUM | Duplicación de elementos estructurales. | Se nombran "pasarela elevada", "espina dorsal elevada" y "estructura ligera". Podrían ser el mismo objeto. | Mantener las formulaciones originales pero relacionarlas lógicamente como descripciones del mismo sistema longitudinal continuo. |

### Acciones Derivadas
Todos los riesgos aquí listados deberán registrarse programáticamente en el archivo `urban-warnings.ts` para que los componentes del laboratorio (y posteriormente del sitio público) lean la severidad y muestren bloqueos o avisos de seguridad.
