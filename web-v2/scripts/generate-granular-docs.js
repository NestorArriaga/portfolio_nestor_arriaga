const fs = require('fs');
const path = require('path');

const docsDir = 'docs';

const docs = {
  'GRANULAR_CASE_ARCHITECTURE.md': `# ARQUITECTURA DEL CASO: GRANULAR

## Objetivo
Definir la estructura maestra del Caso de Estudio 14 (Comarca Lagunera) separándolo en 4 Actos y 16 Capítulos.

## Los 4 Actos
1. **MARCO**: Proyecto, Rural Diversity Compass y Escalas.
2. **SEIS DIMENSIONES**: Agua, Agricultura, Gobernanza, Socioeconomía, Ambiente y Conectividad.
3. **RESULTADOS**: Clustering municipal, Escala de localidad y Tipologías rurales situadas.
4. **SÍNTESIS Y APLICACIÓN**: Relaciones sistémicas (Causal Loop), Zonas grises, Aplicaciones de política pública y Cierre.

## Visualidad
El fondo estructural será negro profundo. Cada dimensión utilizará colores acento detectados en la auditoría visual.

## Criterios de Implementación
No se desarrollarán los componentes públicos todavía; la arquitectura se valida primero en \`/granular-lab\`.
`,
  'GRANULAR_PAGE_MAP.md': `# MAPA DE PÁGINAS GRANULAR (21-40)

| Página | Título | Dimensión | Escala | Capítulo | Estado |
|---|---|---|---|---|---|
| 21 | Proyecto GRANULAR | Overview | Regional | project-intro, compass, scales | audited |
| 22 | Pilar I — Agua | Agua | Regional | water | audited |
| 23 | Calidad del agua | Agua | Municipal | water | audited |
| 24 | Estado de los acuíferos | Agua | Regional | water | audited |
| 25 | Pilar II — Agricultura | Agricultura | Regional | agriculture | audited |
| 26 | Agricultura de riego y temporal | Agricultura | Municipal | agriculture | audited |
| 27 | Cultivos | Agricultura | Regional | agriculture | audited |
| 28 | Vulnerabilidad a la sequía | Agricultura | Municipal | agriculture | audited |
| 29 | Localidades agroproductivas | Agricultura | Localidad | agriculture | audited |
| 30 | Pilar III — Gobernanza | Gobernanza | Regional | governance | audited |
| 31 | ANP, RTP e intersecciones | Gobernanza | Regional | governance | audited |
| 32 | Pilar IV — Socioeconomía | Socioeconomía | Regional | socioeconomy | audited |
| 33 | Representaciones socioeconómicas | Socioeconomía | Municipal | socioeconomy | audited |
| 34 | Pilar V — Ambiente | Ambiente | Regional | environment | audited |
| 35 | Conectividad y Ambiente | Ambiente/Conectividad | Municipal | environment, connectivity | ambiguous |
| 36 | Entrada a resultados | Clustering | Regional | clustering | audited |
| 37 | Clustering municipal | Clustering | Municipal | clustering | audited |
| 38 | Proyección a localidad | Tipología | Localidad | localities | audited |
| 39 | Tipología rural situada | Tipología | Localidad | typologies | audited |
| 40 | Síntesis causal | Política | Regional | territorial-system, grey-zones, policy | audited |
`,
  'GRANULAR_CONTENT_MODEL.md': `# MODELO DE CONTENIDO GRANULAR

La estructura de datos se divide en módulos dentro de \`src/content/cases/granular/\`:
- **granular-project.ts**: Metadatos generales.
- **granular-chapters.ts**: Los 16 capítulos narrativos.
- **granular-pages.ts**: Auditoría de las 20 páginas fuente.
- **granular-assets.ts**: Inventario visual de recursos cartográficos y gráficos.
- **granular-claims.ts**: Registro de narrativas y métricas extraídas.
- **granular-navigation.ts**: Definición de la secuencia y hashes de navegación.
- **granular-terminology.ts** y **granular-warnings.ts**: Diccionarios para riesgos editoriales.
`,
  'GRANULAR_CLAIM_REGISTER.md': `# REGISTRO DE AFIRMACIONES GRANULAR

Se han detectado diversas afirmaciones que requieren tratamiento especial:
- **Agua**: "Crisis hídrica". (source-narrative)
- **Agricultura**: "Alimentar vacas, no personas / Paradoja hídrica". (source-interpretation)
- **Gobernanza**: "Auténticas zonas grises / Territorio doblemente normado". (source-interpretation)
- **Resultados**: "Periferia vulnerable". (source-interpretation)

Estas frases no se tratarán como hechos neutrales del portafolio web, sino como posturas analíticas de la fuente.
`,
  'GRANULAR_CONTENT_RISK_REGISTER.md': `# REGISTRO DE RIESGOS DE CONTENIDO

| ID | Riesgo | Severidad | Impacto | Tratamiento | Bloque |
|---|---|---|---|---|---|
| RSK-01 | Afirmaciones interpretativas fuertes | Alta | Sesgo de imparcialidad | Etiquetar como \`source-narrative\` o \`source-interpretation\` | 15+ |
| RSK-02 | Terminología variable (Agricultura vs Agropecuario) | Media | Confusión de navegación | Usar "Agricultura" y documentar la variante | 15+ |
| RSK-03 | Página 35 (Ambiente y Conectividad) | Media | Desfase dimensional | Dividir assets y separar los textos correspondientes | 20 |
| RSK-04 | Causal Loop denso | Alta | Ilegibilidad en móvil | Requerir visor full o versión simplificada futura | 22 |
`,
  'GRANULAR_NAVIGATION_SPEC.md': `# ESPECIFICACIÓN DE NAVEGACIÓN

La navegación final del Caso 14 dependerá de capítulos, no de páginas físicas.

## Desktop
- **Rail lateral** con los 4 Actos y los 16 Capítulos.
- Hash-based routing (\`#agua\`, \`#agricultura\`, etc.).

## Mobile
- Barra compacta inferior o superior.
- Panel desplegable para selección de capítulos.
- Indicador de progreso (Ej: AGUA 03 / 16).
`,
  'GRANULAR_PERFORMANCE_PLAN.md': `# PLAN DE RENDIMIENTO

- **Hero Image**: Solo 1 recurso en alta prioridad (\`priority: high\`).
- **Carga Diferida**: Previews ligeros en scroll; assets pesados solo bajo interacción (Visor).
- **Causal Loop**: Debe montarse condicionalmente y no bloquear el hilo principal.
- **Sin scroll-jacking**: Uso estricto de \`IntersectionObserver\` para cambiar de estado activo.
`,
  'GRANULAR_IMPLEMENTATION_SEQUENCE.md': `# SECUENCIA DE IMPLEMENTACIÓN FUTURA

- **BLOQUE 16**: Fundación pública (Hero, Marco, Compass, Escalas).
- **BLOQUE 17**: Pilar Agua.
- **BLOQUE 18**: Pilar Agricultura.
- **BLOQUE 19**: Gobernanza y Socioeconomía.
- **BLOQUE 20**: Ambiente y Conectividad.
- **BLOQUE 21**: Resultados (Clustering municipal, Localidades, Tipologías).
- **BLOQUE 22**: Síntesis (Causal Loop, Aplicaciones, Zonas Grises, Cierre).
`
};

for (const [filename, content] of Object.entries(docs)) {
  fs.writeFileSync(path.join(docsDir, filename), content);
}
console.log('Documentos arquitectónicos generados.');
