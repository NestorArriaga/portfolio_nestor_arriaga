# Sistema visual y biblioteca de prompts para el portafolio web

> **Actualización:** este documento conserva la clasificación y estructura base. Para la dirección de arte definitiva y las instrucciones que debe ejecutar Claude/Fable, usar primero `CLAUDE.md` y `PROMPTS_VISUALES_Y_MOVIMIENTO_V2.md`.

## 1. Resultado del cruce

Se revisó el portafolio de 93 páginas y se inventariaron los 212 archivos de las dos carpetas indicadas.

- 166 recursos visuales: 102 SVG, 2 AI, 51 PNG, 7 JPG, 2 JPEG y 2 PDF.
- 4 fuentes de maquetación InDesign.
- 40 archivos de datos o soporte GIS.
- 2 archivos de sistema que deben excluirse.
- La tabla completa está en `clasificacion_activos_portafolio.csv`.

La clasificación usa tres grados de certeza:

- `directa`: nombre, contenido y composición coinciden con el PDF.
- `probable`: el recurso pertenece claramente al proyecto, pero no se confirmó como vínculo exacto de InDesign.
- `baja`: boceto, duplicado o archivo sin aparición inequívoca en el PDF.

**Hallazgo de disponibilidad:** `GREEN AREA.pdf` y `CAFE.pdf` son iconos vectoriales, no los mapas principales. Las cartografías completas de P01-P04 y las láminas/renders de P15 sí aparecen en el PDF o en la maquetación InDesign, pero no están presentes como archivos gráficos independientes con nombres inequívocos en las carpetas revisadas. Antes de construir esos casos se deben recuperar desde el paquete de vínculos de InDesign o extraer del PDF a resolución de publicación; no deben recrearse por aproximación.

## 2. El principio rector

**Concepto:** `ATLAS VIVO - EL TERRITORIO COMO INTERFAZ`.

El portafolio no debe sentirse como una colección de tarjetas. Debe operar como un atlas territorial interactivo: el visitante entra por una superficie geológica, navega por coordenadas, activa capas, abre ventanas de evidencia y descubre cada proyecto como una investigación espacial.

La calidad de las referencias se logra trasladando su gramática visual, no copiando sus textos, logos o composiciones literalmente:

- fondos negro mineral y blanco papel;
- imágenes de territorio a gran escala, recortadas o flotantes;
- tipografía de alto contraste y jerarquía extrema;
- retículas, coordenadas, líneas de llamada, miras y ventanas técnicas;
- cartografía oscura con uno o dos acentos por proyecto;
- diagramas axonométricos o explotados en arquitectura;
- grano, tramado, dither y textura fotocopiada muy sutiles;
- espacio negativo generoso;
- alternancia editorial entre páginas densas y pausas visuales.

## 3. Fuente de verdad y reglas no negociables

1. El texto, los nombres de proyecto, las cifras, las leyendas y las unidades deben provenir del PDF. No resumir ni reescribir sin aprobación.
2. Los mapas y diagramas deben usar los archivos existentes. No pedir a un generador de imágenes que reconstruya datos.
3. Todo texto, cifra, leyenda, escala, coordenada y control debe ser HTML o SVG real, legible y seleccionable.
4. Las imágenes generadas por IA solo pueden funcionar como atmósfera: textura, relieve, objeto territorial, fondo o transición. Nunca deben contener texto, cifras, leyendas, límites administrativos ni datos.
5. Mantener los mapas completos. El recorte cinematográfico puede usarse en el hero, pero debe existir una vista completa accesible.
6. No publicar `.indd`, `.ai`, shapefiles, CSV de modelo ni páginas JPG completas como interfaz final. Son fuentes o referencias.
7. Evitar la estética de dashboard corporativo: nada de tarjetas redondeadas repetitivas, degradados genéricos, sombras suaves de SaaS, iconos inconsistentes o neón excesivo.
8. No usar líneas menores a 1 px en pantalla. En móvil, las etiquetas importantes deben conservar al menos 12 px.
9. Respetar `prefers-reduced-motion`; todos los datos deben seguir accesibles sin animación.

## 4. Correspondencia entre PDF y activos

| Proyecto | Páginas | Activos principales | Tratamiento web |
|---|---:|---|---|
| Apertura, cobertura e índice | 1-17 | `mexico.jpeg`, `mexico.png`, `elementos portada/*`, `firma.png`, `usgs-*.jpg` | Portada como territorio escaneado; índice por coordenadas, no por tarjetas. |
| 01 Áreas verdes, Miguel Hidalgo | 18-19 | `GREEN AREA.pdf`/`GREENAREA.png` (icono), `CDMX.png`, `Diseño sin título-4.png`, `inhabitants.png`, SHAPE CDMX | Verde luminoso sobre negro; recuperar la cartografía principal desde InDesign/PDF y conservar tres indicadores exactos. |
| 02 Captura de carbono, Decozalapa | 22 | `DECOZALAPA.*`, `CO2.png`, `GRAFICA CARBONO.png`, SHAPE Veracruz | Rojo carbón, mapa como evidencia central y gráfica reconstruida en SVG. |
| 03 Zonas óptimas de limón y café | 23 | `CAFE.pdf`/`CAFE ROJO.png` (icono), `Diseño sin título.png`, `VERACRUZ*.png` | Atlas agrícola con puntos de aptitud; recuperar la cartografía principal desde InDesign/PDF. |
| 04 Uso óptimo de suelo para limón y café | 24 | `AGRICULTURA.png`, `DECOZALAPA.*`, SHAPE Veracruz | Comparación por capas de uso; leyenda fija y detalle ampliable. |
| 05 Geomorfología de Metztitlán | 25-26 | `metz_base_2.jpeg`, `METZ/14.png`, `LANDFORM.png`, `HIDALGO.png` | Blanco y negro mineral; geomorfones como placas de microscopio territorial. |
| 06 Uso de suelo y zonas ecológicas | 27 | `METZ/15.png`, `LANDUSE.png`, `HIDALGO.png` | Mapa cromático aislado sobre campo oscuro y leyenda editorial. |
| 07 Pendiente en cuatro intervalos | 28 | `METZ/16.png`, `SLOPE_METZ.png`, `GRAFICO-SLOPE.png` | Perfil de pendiente y cuatro estratos con lectura progresiva. |
| 08 Patrones geomorfológicos | 29 | `METZ/17.png`, `LANDFORM.png` | Conectores finos, puntos rojos y zoomes de geomorfones. |
| 09 Vocaciones productivas, Aguascalientes | 32-33 | `AGS.jpg`, `AGS2.jpg`, `MAPAS AGS/4.png`, SHAPE Aguascalientes | Mapa vocacional con nodos y recorrido metodológico. |
| 10 Aptitud para conservación | 34-35 | `AGS3.jpg`, `AGS4.jpg`, `MAPAS AGS/2.png`, `CONSERVATION.png`, `APTITUD/27-29.png`, CSV de modelo | Verde conservación; capas isométricas y pesos mostrados como datos vivos. |
| 11 Aptitud agrícola | 36-37 | `AGS5.jpg`, `AGS6.jpg`, `MAPAS AGS/3.png`, `AGRICULTURA.png`, `APTITUD/30-32.png`, CSV de modelo | Rojo agrícola; misma plantilla para comparación directa con P10. |
| 12 Degradación del suelo, Calvillo | 38 | `suelo.png`, `AGUASCALIENTES.png` | Mapa rosa mineral, foto documental y lectura de manejo ganadero. |
| 13 Subcuencas y ríos, Calvillo | 39 | `SUBCC.png`, `PROYECTO FINAL MANEJO DE CUENCAS.svg` | Azul hídrico; red de drenaje, subcuencas y secciones técnicas. |
| 14 GRANULAR | 40-79 | Capas de la carpeta GRANULAR clasificadas por pilar en el CSV | Caso principal interactivo; capas reales, filtros, mapas, diagramas y narrativa multiescalar. |
| 15 Urban Challenge, Mérida | 80-89 | SHAPE Yucatán y composiciones del PDF | Axonometría blanca sobre negro, despiece arquitectónico y planes anotados. |
| Cierre | 90-93 | créditos, citas e imágenes del PDF | Epílogo sobrio, negro y blanco, sin interfaz ornamental. |

## 5. Arquitectura del sitio

### Inicio

1. Hero territorial de pantalla completa.
2. Declaración breve: perfil, disciplinas y territorio de trabajo.
3. Índice de 15 proyectos como coordenadas o estaciones.
4. Mapa de México con los territorios del portafolio.
5. Cuatro familias narrativas: urbano, carbono/agricultura, geomorfología, planificación territorial.
6. Caso destacado GRANULAR.
7. Perfil, créditos y contacto.

### Página de proyecto

1. Portada con número, título, lugar, año y disciplina.
2. Resumen del PDF sin cambios de sentido.
3. Mapa o visual principal completo.
4. Evidencias: cifras, método, capas y hallazgos.
5. Secuencia de detalles o acercamientos.
6. Resultado y aplicación.
7. Navegación al proyecto anterior/siguiente.

### Página GRANULAR

1. Apertura territorial.
2. Pilar I Agua.
3. Pilar II Agropecuario.
4. Pilar III Gobernanza.
5. Pilar IV Socioeconomía.
6. Pilar V Ambiente.
7. Conectividad.
8. Resultados del clustering.
9. Tipología rural situada.
10. Aplicaciones y proyecciones.

## 6. Sistema visual

### Paleta base

```css
--ink: #090909;
--ink-soft: #151515;
--paper: #f4f3ee;
--paper-cool: #e8e9e6;
--line-dark: #343434;
--line-light: #c9cbc7;
--signal-orange: #f05a24;
--signal-green: #62d884;
--signal-red: #d43745;
--signal-yellow: #d8bd31;
--signal-cyan: #5ac6d6;
--signal-magenta: #d21b86;
--timber: #a77b4f;
```

El color de señal cambia por proyecto; el negro y el blanco permanecen constantes. No usar más de dos acentos simultáneos, excepto en mapas categóricos que lo requieran.

### Tipografía sugerida

- Display: Space Grotesk o una grotesca geométrica equivalente.
- Datos y coordenadas: IBM Plex Mono.
- Pasajes editoriales y citas: Source Serif 4.
- Títulos: 72-144 px en escritorio, con composición partida y gran interletraje cuando corresponda.
- Texto: 17-20 px en escritorio; 16-18 px en móvil.
- Etiquetas: 11-13 px, mayúsculas, tracking amplio.

### Retícula

- Escritorio: 12 columnas, margen 48-80 px, gutter 16-24 px.
- Tableta: 8 columnas, margen 32 px.
- Móvil: 4 columnas, margen 18-20 px.
- Separación vertical base: múltiplos de 8 px.
- Regla de densidad: un bloque denso debe estar seguido por un bloque de respiración visual.

### Componentes distintivos

- riel lateral de coordenadas y número de proyecto;
- líneas de llamada con punto de anclaje cuadrado;
- marcos de detalle e insets cartográficos;
- miras, cruces y escala gráfica;
- leyenda fija que se vuelve drawer en móvil;
- chips rectangulares, nunca píldoras;
- títulos partidos en dos o tres líneas;
- numeración vertical;
- panel de capas con estados visible/oculto;
- transición de máscara territorial entre proyectos;
- grano de 2-4 % y retícula de 1 px a baja opacidad;
- cursor contextual únicamente en escritorio.

### Movimiento

- parallax máximo de 20-40 px;
- aparición de líneas como trazado de 500-900 ms;
- contadores solo cuando la cifra entra en pantalla;
- cambios de capa por crossfade, no por giros 3D;
- zoom cartográfico limitado y con botón de restablecer;
- no animar simultáneamente más de tres sistemas visuales.

## 7. Prompt maestro para construir el sitio

```text
Diseña y construye un portafolio web editorial e interactivo para Nestor Elihu Arriaga Gallegos. El concepto es "ATLAS VIVO - EL TERRITORIO COMO INTERFAZ". Debe transmitir cartografía, análisis territorial, arquitectura del paisaje e investigación con una calidad visual de publicación internacional.

Usa como fuente de verdad el PDF Portafolio_Sd.pdf y como inventario de activos clasificacion_activos_portafolio.csv. Conserva exactamente los nombres, cifras, unidades, leyendas, categorías y créditos del PDF. No inventes datos ni reconstruyas mapas con IA. Usa los SVG, PNG, PDF cartográficos y fuentes GIS existentes según la clasificación. Todo texto y dato debe ser HTML o SVG real y seleccionable.

Dirección de arte: alternancia entre negro mineral #090909 y blanco papel #f4f3ee; tipografía grotesca geométrica para títulos, monoespaciada para datos y serif editorial para citas; grandes áreas de espacio negativo; mapas y texturas de territorio a escala monumental; retícula de 12 columnas; coordenadas, líneas de llamada, miras, recuadros técnicos, escalas, leyendas compactas y numeración vertical. La interfaz debe recordar un atlas científico contemporáneo y una instalación digital, no un dashboard ni una plantilla de agencia.

Estructura: Inicio, índice territorial de 15 proyectos, páginas de caso y una experiencia ampliada para GRANULAR. El inicio contiene un fragmento topográfico flotante, una declaración breve, un mapa de México con los territorios del portafolio, el índice por coordenadas, el caso destacado GRANULAR y el perfil/contacto. Cada caso contiene portada, resumen fiel, visual principal, método, datos, detalles, hallazgos y navegación secuencial.

Interacción: panel de capas, zoom controlado, acercamientos, anotaciones que aparecen al desplazarse, transiciones de máscara territorial, líneas que se trazan, contadores sobrios y un modo de movimiento reducido. El comportamiento móvil debe conservar la lectura cartográfica: leyendas en drawer, mapas completos ampliables, riel de proyecto simplificado y ningún texto menor a 12 px.

No uses tarjetas redondeadas repetitivas, gradientes decorativos, sombras de SaaS, glassmorphism, iconos genéricos, texto dentro de imágenes generadas, mapas ficticios, neón excesivo ni animaciones constantes. No copies logos ni textos de las referencias visuales. Traduce su gramática de composición, contraste, textura y precisión técnica.

Primero entrega: 1) mapa del sitio, 2) sistema de diseño, 3) wireframe del inicio, 4) wireframe del caso GRANULAR, 5) inventario de componentes, 6) plan responsive y accesible. Después implementa un prototipo de alta fidelidad del inicio y del caso GRANULAR antes de construir los otros 14 casos.
```

## 8. Prompt para el inicio

```text
Crea la página de inicio del portafolio como un atlas territorial vivo. Abre con un fragmento tridimensional del territorio mexicano o de la Comarca Lagunera suspendido sobre un campo negro mineral. El objeto debe tener textura satelital, relieve realista y bordes de corte limpios. Conecta cuatro puntos del relieve mediante líneas técnicas a etiquetas HTML: Cartografía, Análisis territorial, Paisaje y Políticas públicas. Coloca el nombre Nestor Elihu Arriaga Gallegos en gran escala, dividido en líneas, con número de proyectos, ubicación y año en tipografía monoespaciada.

Al desplazarse, transforma el fragmento en un mapa plano de México y revela las estaciones Ciudad de México, Veracruz, Metztitlán, Aguascalientes/Calvillo, Comarca Lagunera y Mérida. Cada estación abre el conjunto de proyectos correspondiente. El índice no debe ser una cuadrícula de tarjetas: debe ser una lista cartográfica con número, coordenada, disciplina y miniatura recortada.

Alterna una sección oscura y una sección blanca. Usa líneas de 1 px, ventanas técnicas rectangulares, coordenadas, escala, marcas de registro, grano sutil y amplios vacíos. La información debe ser nítida, no decorativa. En móvil, sustituye el objeto 3D por una imagen ligera y conserva todas las etiquetas como contenido real.
```

## 9. Prompts por proyecto

### P01 - Áreas verdes en Miguel Hidalgo

```text
Diseña el caso P01 con negro mineral, blanco papel y verde señal. Usa GREEN AREA.pdf o GREENAREA.png como icono; CDMX.png y Diseño sin título-4.png como localizadores; inhabitants.png para el indicador demográfico. Recupera la cartografía principal desde los vínculos de InDesign o desde la página 19 del PDF; no confundas el icono con el mapa. Reproduce exactamente 929,230.8 m² de superficie verde, 417,416 habitantes y 2.2 m² por habitante. Presenta las cifras como instrumentos cartográficos conectados al mapa mediante líneas de llamada. No inventes áreas, colonias ni porcentajes.
```

### P02 - Captura de carbono y zonas críticas

```text
Diseña P02 como un atlas de carbono en rojo oscuro, negro y papel. Usa la cuenca DECOZALAPA como máscara territorial, el mapa del PDF como evidencia central, CO2.png como glifo y GRAFICA CARBONO.png solo como referencia para reconstruir la gráfica en SVG accesible. Añade un riel de severidad, acercamientos rectangulares y una trama de puntos que nunca oculte la cartografía. Conserva las clases, cifras, leyendas y unidades exactamente como aparecen en el PDF.
```

### P03 - Zonas óptimas para limón y café

```text
Construye P03 con un fondo negro, mapa claro y rojo café como único acento. Usa CAFE.pdf o CAFE ROJO.png como icono temático. Recupera la cartografía principal desde los vínculos de InDesign o desde la página 23 del PDF; no confundas el icono con el mapa. Si se dispone de la fuente cartográfica, convierte los puntos de aptitud en una capa activable; si no, conserva el mapa extraído como una imagen de alta resolución sin fabricar geometrías. Incluye un recorte de Veracruz y otro de la cuenca. No alteres categorías ni generes puntos ficticios.
```

### P04 - Uso óptimo de suelo

```text
Diseña P04 como comparación entre uso actual, aptitud y uso óptimo. Usa la cuenca DECOZALAPA y los datos del PDF; el icono AGRICULTURA.png funciona como identificador. Recupera la cartografía principal desde los vínculos de InDesign o desde la página 24 del PDF. Solo divide la sección en capas alternables si se recuperan sus geometrías originales; en caso contrario, muestra la composición cartográfica completa a alta resolución. Coloca la leyenda fija en escritorio y como drawer en móvil. Mantén intactos textos, superficies y categorías.
```

### P05 - Geomorfología de Metztitlán

```text
Diseña P05 como una investigación geológica en blanco y negro, inspirada en macrofotografía de roca, fotocopia fina y coordenadas de gran escala. Usa metz_base_2.jpeg como apertura y METZ/14.png como composición principal. Aísla los tres acercamientos de geomorfones en ventanas técnicas y conéctalos al territorio mediante líneas. Usa amarillo mineral solo para enfatizar. El texto descriptivo debe ser real, no formar parte de la imagen.
```

### P06 - Uso de suelo y zonas ecológicas

```text
Diseña P06 como una placa cromática suspendida sobre negro. Usa METZ/15.png y LANDUSE.png. La cartografía debe ocupar la mayor parte del viewport; la leyenda queda en una columna editorial estrecha. Revela cada clase por barrido vertical, sin modificar sus colores ni límites. Añade textura mineral solamente fuera del mapa.
```

### P07 - Pendiente en cuatro intervalos

```text
Diseña P07 con METZ/16.png como mapa y SLOPE_METZ.png/GRAFICO-SLOPE.png como referencia del perfil. Reconstruye los cuatro intervalos como un gráfico SVG exacto y accesible. Usa líneas de sección, cotas y una animación progresiva de menor a mayor pendiente. El mapa completo siempre debe poder verse sin recorte.
```

### P08 - Patrones geomorfológicos

```text
Diseña P08 como una mesa de inspección geomorfológica. Usa METZ/17.png, puntos rojos, conectores finos y acercamientos con aumento. La composición debe combinar un mapa dominante con ventanas de muestra, coordenadas tenues y grandes números territoriales en el fondo. Conserva exactamente la selección y explicación de geomorfones del PDF.
```

### P09 - Vocaciones productivas en Aguascalientes

```text
Diseña P09 como un diagrama territorial de vocaciones. Usa MAPAS AGS/4.png como mapa base y AGS.jpg/AGS2.jpg como referencia de maquetación. Reproduce los nodos del clustering y la ruta metodológica como SVG interactivo. Al seleccionar un nodo, resalta su municipio o grupo sin cambiar la clasificación. Naranja y verde son los acentos; el resto permanece negro, blanco y gris.
```

### P10 - Aptitud para conservación

```text
Diseña P10 en verde conservación. Usa MAPAS AGS/2.png, CONSERVATION.png, APTITUD/27.png, 28.png y 29.png, además de los CSV de conservación como datos fuente. Construye una pila isométrica de criterios que se separa ligeramente al hacer scroll y muestra los pesos exactos del PDF. El mapa de aptitud es el resultado final y no debe ser recoloreado arbitrariamente.
```

### P11 - Aptitud agrícola

```text
Diseña P11 como contraparte directa de P10, manteniendo la misma retícula y comportamiento para permitir comparación. Usa MAPAS AGS/3.png, AGRICULTURA.png, APTITUD/30.png, 31.png y 32.png, además de los CSV agrícolas. Cambia el acento a rojo agrícola. Muestra criterios, pesos y resultado exactamente como en el PDF y ofrece una vista comparativa P10/P11.
```

### P12 - Degradación del suelo en Calvillo

```text
Diseña P12 como una ficha de diagnóstico rural: mapa suelo.png en gran formato, acento rosa mineral, texto editorial y fotografía documental. Añade una textura de suelo ampliada como fondo de transición, sin cubrir el mapa. Las llamadas deben señalar zonas y procesos mencionados en el PDF. No deduzcas nuevas áreas ni porcentajes.
```

### P13 - Subcuencas y ríos en Calvillo

```text
Diseña P13 con SUBCC.png como mapa principal y revisa PROYECTO FINAL MANEJO DE CUENCAS.svg como posible composición editable. Usa azul hídrico, líneas de drenaje finas, cotas y nombres reales. Presenta las subcuencas como capas con control visible/oculto y conecta el análisis con el Plan Integral de Manejo Ganadero. No suavices ni redibujes los cauces de forma decorativa.
```

### P14 - GRANULAR

```text
Construye GRANULAR como la experiencia central del portafolio. Usa los 102 SVG clasificados en el CSV y organiza el recorrido en Agua, Agropecuario, Gobernanza, Socioeconomía, Ambiente, Conectividad, Clustering, Tipología rural situada y Aplicaciones. La base visual es satélite monocroma sobre negro, con un color de señal distinto por pilar. Incluye panel de capas, escala, coordenadas, leyenda, restablecer vista y vínculos entre municipio y localidad.

En Agua usa pilar_agua.svg, calidad_agua_total.svg, acuiferos total.svg, pozos y plantas.svg y las capas de cuencas. En Agropecuario usa agricultura_temporal.svg, agricultura_riego.svg, sup_riego.svg, total_granjas*.svg, vulnerabilidad_sequia.svg y localidades_agroproductivas.svg. En Gobernanza usa gobernanza.svg, anp.svg, RTP.svg, anp_rtp.svg, tenencia_tierra.svg y critical_layers.svg. En Socioeconomía usa commuting*.svg, marginacion*.svg y grado_rezago.svg. En Ambiente usa suelos.svg, class_edaf.svg, edafologia_cs.svg y vegetacion.svg. En Conectividad usa conectividad.svg, base_red.svg, circuito_radial_laguna.svg y comarca_base_conectividad.svg. Para resultados usa granular_flow.svg, methodology_flow.svg, mexico_typologies.svg y las capas de clasificación.

Conserva las cifras y conclusiones del PDF. No conviertas la experiencia en un visor GIS genérico: cada interacción debe apoyar una idea narrativa. Usa vistas completas para análisis y recortes cinematográficos solo en transiciones.
```

### P15 - Urban Challenge

```text
Diseña P15 como una lámina arquitectónica digital en negro, blanco y madera. Abre con una axonometría o despiece explotado del parque, dibujado con líneas blancas de 1 px y etiquetas horizontales. Después alterna plantas limpias en fondo papel con acercamientos al anillo central, pasarela, anfiteatro, vegetación y topografía. Usa los textos y composiciones de las páginas 81-89 como fuente de verdad. Las líneas de llamada deben responder al viewport; en móvil se convierten en una lista numerada enlazada a cada detalle.
```

## 10. Prompts para generar únicamente elementos atmosféricos

### Relieve flotante del hero

```text
Fragmento topográfico flotante de la Comarca Lagunera, relieve realista construido con textura satelital semiárida, corte geológico limpio en los bordes, pequeñas parcelas agrícolas y una línea de río sutil, iluminación de estudio lateral, fondo transparente o negro puro, composición horizontal 16:10, amplio espacio negativo alrededor, precisión científica, fotografía de producto de museo, detalle 8K. Sin texto, sin números, sin leyenda, sin etiquetas, sin logotipos, sin interfaz, sin fronteras inventadas.
```

### Textura mineral para Metztitlán

```text
Macrofotografía monocroma de roca caliza erosionada y estratos sedimentarios, contraste alto pero con detalle en sombras, grano fino de impresión, apariencia de escaneo científico y placa geológica, luz rasante, composición abstracta horizontal, sin objetos humanos. Sin texto, sin cifras, sin símbolos, sin mapas, sin marcos.
```

### Textura territorial para Veracruz

```text
Dosel forestal húmedo y suelo volcánico vistos como un escaneo territorial abstracto, verde muy oscuro, negro y rojo óxido controlado, mezcla de fotografía aérea y textura de laboratorio, alto detalle, profundidad atmosférica sutil, área central limpia para superponer cartografía. Sin texto, sin iconos, sin datos, sin carreteras ni límites administrativos inventados.
```

### Fondo axonométrico para Urban Challenge

```text
Fondo negro mineral con una retícula arquitectónica extremadamente sutil, líneas topográficas grises de 1 px, polvo y grano casi imperceptibles, iluminación uniforme, gran espacio negativo, apariencia de lámina técnica de museo. Sin edificio, sin texto, sin números, sin logotipos, sin cotas.
```

## 11. Prompt de control de calidad

```text
Audita el prototipo contra el PDF y el inventario CSV. Verifica proyecto por proyecto: título, número, lugar, texto, cifras, unidades, leyendas, categorías, colores cartográficos, fuente del activo y créditos. Marca cualquier dato inventado, texto rasterizado, mapa incompleto, etiqueta ilegible, línea menor a 1 px, contraste insuficiente, recorte que oculte evidencia o animación que impida la lectura. Comprueba escritorio, tableta, móvil, teclado, lector de pantalla y prefers-reduced-motion. La auditoría debe terminar con una tabla de hallazgos, prioridad, archivo/componente afectado y corrección propuesta. No apruebes el sitio mientras exista una diferencia factual con el PDF.
```

## 12. Orden recomendado de producción

1. Optimizar y normalizar los activos marcados `publicar_svg_optimizado` y `publicar_optimizado`.
2. Construir el inicio y el sistema de diseño.
3. Construir GRANULAR como caso maestro.
4. Construir P05-P08 con una plantilla geológica compartida.
5. Construir P09-P13 con una plantilla metodológica comparativa.
6. Construir P01-P04.
7. Construir P15.
8. Integrar cierre, créditos, accesibilidad, rendimiento y auditoría factual.

La primera revisión de alta fidelidad debería cubrir solo el inicio y GRANULAR. Si ambos alcanzan la calidad esperada, el resto del portafolio podrá crecer sobre un sistema ya probado sin perder consistencia.
