# Prompts visuales y de movimiento V2

Este documento complementa `CLAUDE.md`. Está diseñado para que Claude/Fable produzca un portafolio mucho más cercano a las referencias y no se limite a acomodar los recursos existentes.

## 1. ADN visual medible

### Proporción general

- 70 % atlas oscuro.
- 20 % laboratorio mineral blanco/negro.
- 10 % póster de señal.
- 55-75 % de cada hero debe estar ocupado por un territorio, objeto, mapa o dibujo dominante.
- El texto narrativo nunca debe competir en superficie con la evidencia visual.

### Densidad de mapa

Una lámina cartográfica terminada debe contener, cuando los datos lo permitan:

- base satelital o relieve;
- contorno territorial;
- entre 2 y 5 familias de capas;
- hachuras o texturas categóricas;
- nodos o puntos;
- red o rutas;
- leyenda real;
- escala;
- orientación;
- coordenadas o marcas de cuadrícula;
- 2-5 llamadas o insets;
- una jerarquía tipográfica clara.

No añadir categorías que no existan. Si faltan datos, el espacio negativo es preferible a una capa ficticia.

### Acabado

- mapas en escala de grises con acento localizado;
- negros con detalle, no masas planas sin información;
- ruido de 2-4 %;
- líneas técnicas de 0.8-1.2 px;
- líneas de cuadrícula a 5-12 % de opacidad;
- glow máximo de 12-24 px y solo en nodos activos;
- textura de papel o fotocopia a 3-8 %;
- color máximo simultáneo: dos acentos, excepto mapas categóricos.

## 2. Prompt maestro para Claude/Fable

```text
Trabaja en /Users/nestorarriagagallegos/Documents/ProjectsHub/PORTAFOLIO. Lee CLAUDE.md completo y considera Portafolio_Sd.pdf como fuente factual, clasificacion_activos_portafolio.csv como índice de recursos y las nueve imágenes de INSPO como contrato visual.

Quiero un atlas territorial web interactivo de calidad editorial internacional. No quiero una interfaz genérica, un dashboard, una cuadrícula de tarjetas ni un portafolio de agencia. La apariencia debe aproximarse estrictamente a las referencias: mapas satelitales nocturnos con capas finas, leyendas densas, coordenadas, nodos, redes, hachuras y halos; relieves 2.5D con perfiles; objetos naturales aislados con anotación científica; composiciones minerales de piedra; pósteres tipográficos negros, blancos y amarillo ácido; y dibujos axonométricos.

Genera también los recursos visuales que falten: patrones SVG, máscaras, texturas, íconos monolineales, dibujos técnicos, perfiles, insets, sistemas de nodos, arcos, partículas, relieves por capas y pósteres de transición. Distingue siempre dato de decoración. Nunca generes texto, cifras, leyendas o geometrías cartográficas con un modelo de imagen. Todo dato debe ser HTML o SVG real y debe provenir del PDF o de los archivos existentes.

El movimiento debe explicar procesos: trazar redes, revelar capas, separar estratos, conectar nodos, barrer un espécimen, mostrar secciones y cambiar de escala. No uses animaciones constantes ni muevas el layout. Incluye prefers-reduced-motion y fallbacks estáticos.

Antes de modificar archivos, revisa git status. Si hay fuentes rastreadas eliminadas, no las restaures de forma destructiva sin autorización. Primero presenta un diagnóstico breve y un plan de recuperación. Después construye por fases: sistema visual, home, GRANULAR, Metztitlán, Urban Challenge y el resto de familias. Cada fase debe terminar con capturas comparativas contra INSPO y una lista de diferencias visibles pendientes.

El resultado debe ser estable y responsive. En escritorio, los mapas editoriales usan aproximadamente 28 % de columna informativa y 72 % de campo cartográfico. En móvil se reordena la lámina: título, mapa, leyenda, detalles e insets; no se encoge todo. Reserva dimensiones para evitar CLS y usa SVG/Canvas antes que WebGL.
```

## 3. Traducción exacta de cada referencia

### Referencia Food - atlas agroproductivo

Aplicar principalmente a P03, P04 y al Pilar Agropecuario de GRANULAR.

```text
Compón un mapa vertical nocturno con relieve o satélite monocromo de alto detalle. Reserva 28 % del ancho para título, subtítulo y leyenda jerárquica; usa el 72 % restante para el territorio. Delinea municipios en blanco fino. Superpone agricultura mediante hachuras diagonales, puntos pequeños, zonas oliva translúcidas, nodos verde ácido y símbolos monolineales. Extiende líneas de conexión hacia el margen y añade escala, norte y coordenadas. Mantén negros profundos con información en sombra. No uses tarjetas, bordes redondeados ni degradados. Todos los símbolos y leyendas deben corresponder a datos reales.
```

### Referencia Tourism - red territorial luminosa

Aplicar a commuting, conectividad, nodos urbanos y clustering.

```text
Sobre una base territorial oscura, dibuja rutas principales en violeta claro de 1 px, conexiones exteriores en líneas finas, nodos con centro blanco y halo magenta localizado, círculos de influencia punteados y áreas de actividad mediante hachura violeta o verde. La red debe tener jerarquía: troncal, secundaria y conexión externa. La leyenda queda fija en el margen y explica cada símbolo. Anima el trazado una vez y mueve partículas muy lentamente sobre rutas reales. Sin estética cyberpunk ni resplandor excesivo.
```

### Referencia relieve hidrológico 2.5D

Aplicar a P13 y Pilar Agua de GRANULAR.

```text
Construye una losa topográfica oblicua con textura satelital desaturada. Eleva el relieve con capas de 12-36 px. Dibuja ríos en cian, áreas de agua con transparencia controlada y conexiones entre localidades mediante arcos blancos. Desde cada nodo baja una línea vertical al terreno. Añade una sección territorial continua en la parte inferior con relieve, río, acuífero, suelo y costa o descarga. Las etiquetas son HTML/SVG reales. El scroll separa la losa, las redes y el perfil; reduced-motion muestra la composición final estática.
```

### Referencia mapa territorial con insets

Aplicar a todos los proyectos cartográficos.

```text
Diseña una lámina cartográfica de borde a borde con cuadrícula de coordenadas, marcas numéricas en los cuatro lados, un mapa principal oscuro y una columna de cinco acercamientos rectangulares. Cada inset debe usar una ortofoto o detalle real, título corto, color de señal y un marco que se conecta al punto del mapa mediante línea fina. Incluye río, topografía, caminos, usos y leyenda inferior cuando existan. Mantén la composición plana, precisa y de publicación; no simules un dashboard.
```

### Referencia Reality by Design - objeto territorial como interfaz

Aplicar al home y a aperturas de capítulo.

```text
Coloca un fragmento de territorio, roca, cuenca o relieve aislado en el centro de un campo negro o blanco. El objeto ocupa 50-65 % del viewport y parece fotografiado o escaneado con calidad de museo. Conecta entre cuatro y siete características mediante líneas ortogonales, puntos cuadrados y microventanas técnicas. Deja mucho espacio negativo. En modo oscuro, el objeto puede tener un resplandor físico muy tenue; en modo blanco, usa sombra corta y real. La tipografía y los datos permanecen fuera de la imagen.
```

### Referencia espécimen luminoso

Aplicar a agricultura, ambiente, agua y biodiversidad como recurso conceptual, nunca como dato.

```text
Aísla sobre negro un espécimen relacionado con el proyecto: raíz, semilla, perfil de suelo, gota, organismo acuático o forma vegetal. Trátalo como radiografía científica translúcida en el color del capítulo. A la derecha compón una nube de valores decorativos, curvas de medición y cajas técnicas; cualquier cifra real debe provenir del proyecto, de lo contrario usa trazos abstractos sin números legibles. Anima un solo barrido de escaneo y líneas de medición. Sin texto generado dentro del bitmap.
```

### Referencia piedra - composición material

Aplicar a Metztitlán y degradación del suelo.

```text
Crea una composición de bloques de roca o placas de suelo en blanco y negro, fotografiadas desde arriba, con juntas negras irregulares que se convierten en áreas tipográficas. Inserta títulos y notas en HTML sobre las juntas, no dentro de la fotografía. Alterna piedras claras y oscuras para crear ritmo. Usa la textura como máscara de transición hacia mapas geomorfológicos. Evita que parezca un moodboard; debe conservar retícula y lectura editorial.
```

### Referencia póster amarillo

Aplicar solo a interludios de territorio o método.

```text
Crea una pantalla amarillo ácido #F2EA16 con retícula blanca fina y una silueta real de territorio en relieve gris. Cruza sobre la silueta una palabra enorme fragmentada o vertical, usando tipografía real y mezcla de recorte y rotación. Coloca número de proyecto, región y disciplina en los bordes. La pantalla dura un capítulo y se transforma después en mapa. No usar el amarillo como fondo continuo de todo el caso.
```

### Referencia póster negro mineral

Aplicar a portada, cierre y cambios de bloque.

```text
Usa una macrotextura mineral negra con contraste fino y grano de impresión. Compón el título en letras blancas enormes, partidas entre líneas y atravesadas por guiones o marcas de registro. Distribuye fecha, lugar, número y texto corto en columnas pequeñas con mucho aire. Añade un único punto de color de señal. La textura no debe reducir la legibilidad.
```

## 4. Biblioteca de recursos generables

Los siguientes prompts son para producir texturas o recursos decorativos. **No contienen datos**.

### A. Fragmento territorial del home

```text
Objeto topográfico flotante de la Comarca Lagunera, relieve semiárido realista, parcelas agrícolas, textura satelital monocroma, río como incisión sutil, corte geológico visible en el borde, iluminación lateral de museo, fondo transparente, composición horizontal, detalle extremo, negros ricos, sin texto, sin símbolos, sin fronteras, sin leyenda, sin edificios inventados.
```

Salida: PNG/WebP transparente 2400 px y versión ligera 1400 px.

### B. Textura satelital nocturna

```text
Terreno semiárido visto desde satélite, monocromo, contraste alto con detalle en sombras, parcelas, cauces secos, relieve, grano de película muy fino, sin carreteras dibujadas, sin límites administrativos, sin texto, sin etiquetas, sin glow, formato panorámico 16:9.
```

### C. Macrorradiografía botánica

```text
Espécimen botánico translúcido relacionado con agricultura de zonas áridas, raíz y venación visibles, apariencia de radiografía científica, color verde cian o magenta según capítulo, aislado sobre negro absoluto, iluminación interna, alta definición, sin texto, sin números, sin diagramas, sin marco.
```

### D. Piedra y suelo

```text
Conjunto ortogonal de placas de roca caliza y suelo erosionado, vista cenital, blanco y negro, juntas negras profundas, textura táctil, luz rasante, alto detalle, composición editorial con huecos amplios para superponer tipografía, sin texto, sin símbolos, sin objetos humanos.
```

### E. Corte geológico

```text
Corte lateral de terreno semiárido, estratos de roca, suelo, grava, raíces y nivel freático, visual científico monocromo, fondo transparente, borde superior topográfico continuo, dibujo detallado entre grabado y fotografía, sin texto, sin flechas, sin cifras, sin leyenda.
```

### F. Grano editorial

```text
Textura uniforme de tinta impresa y papel fotocopiado, grano fino de 2 a 4 por ciento, sin manchas dominantes, seamless, escala de grises, alta resolución, sin texto ni formas reconocibles.
```

## 5. Recursos que deben dibujarse con código

No generar estos recursos como imágenes. Construirlos con SVG, Canvas o CSS:

- límites territoriales;
- redes de caminos, commuting y flujos;
- puntos de pozos y localidades;
- círculos de influencia;
- arcos entre territorios;
- hachuras categóricas;
- leyendas, escalas y norte;
- coordenadas;
- perfiles con datos;
- gráficas;
- diagramas metodológicos;
- capas de aptitud;
- textos y cifras;
- anotaciones y líneas de llamada.

### Prompt para hachuras SVG

```text
Crea una biblioteca SVG reusable de patrones cartográficos: diagonal fina, diagonal cruzada, puntos regulares, puntos dispersos, grano de parcelas, ondas de agua, líneas de cultivo, bosque abstracto y mancha urbana. Cada patrón debe usar currentColor, aceptar opacidad, tener versión oscura y clara, mantener legibilidad a 1x y 2x y no incrementar excesivamente el DOM. Entrega componentes documentados y una página de prueba.
```

### Prompt para íconos cartográficos

```text
Dibuja un sistema de íconos SVG monolineales de 24 unidades con stroke de 1.25: agua, pozo, acuífero, cultivo, granja, localidad, industria, bosque, ANP, gobernanza, movilidad, carretera, río, suelo, sequía, conservación y nodo urbano. Usa terminales rectas y geometría técnica. Sin rellenos decorativos ni estilos mezclados. Incluye aria-label solo cuando el icono sea informativo.
```

### Prompt para insets

```text
Construye un componente MapInsetStack que muestre de tres a cinco acercamientos reales. Cada inset tiene proporción fija, título, categoría, color de señal, marco rectangular y línea de conexión al mapa principal. La conexión se recalcula sin causar layout shift. En móvil, los insets se convierten en carrusel horizontal sin autoplay.
```

## 6. Especificación de animación

### A. Entrada de mapa

```text
Al entrar la lámina: 1) aparece la base satelital con fade de 450 ms; 2) se dibuja el contorno en 900 ms; 3) aparecen hachuras por máscara en 600 ms; 4) entran nodos en grupos de 6-12 durante 500 ms; 5) se trazan redes en 900 ms; 6) aparece la leyenda sin desplazamiento. La secuencia completa no supera 2.2 segundos. Reduced-motion presenta el estado final.
```

### B. Relieve por scroll

```text
Durante un tramo de scroll fijado, separar visualmente base, relieve, agua, red y etiquetas en el eje vertical. Cada capa se mueve entre 12 y 36 px, mantiene la misma extensión geográfica y vuelve a ensamblarse antes de continuar. No rotar más de 2 grados ni cambiar escala más de 4 %. Incluir fallback estático.
```

### C. Red de flujo

```text
Dibujar rutas con stroke-dashoffset. Una partícula pequeña recorre cada ruta principal a velocidad constante durante 10-16 segundos. No usar más de 18 partículas simultáneas. Pausar animación cuando la sección no sea visible y con reduced-motion.
```

### D. Scan de espécimen

```text
Revelar el espécimen mediante una línea horizontal de 1 px y una máscara suave durante 900 ms. Las líneas de medición aparecen después. Ejecutar una sola vez. El objeto mantiene posición y dimensiones reservadas desde el primer render.
```

### E. Póster de transición

```text
La silueta territorial entra 24 px, el título grande se desplaza en dirección opuesta 16 px y las marcas de retícula aparecen por opacidad. Duración total 800-1100 ms. No usar rebote, elástico ni glitch continuo.
```

## 7. Recetas visuales por proyecto

### P01 - Áreas verdes

- Base: atlas oscuro.
- Acento: verde eléctrico.
- Crear: red de áreas verdes, tres instrumentos de datos, máscara de alcaldía, inset urbano y patrón de arbolado.
- Movimiento: expansión suave de manchas verdes; trazado del perímetro.
- Referencias dominantes: Food + Reality by Design.

### P02 - Carbono

- Base: negro carbón y rojo.
- Crear: nube de puntos críticos, halo de severidad, diagrama de captura y textura forestal.
- Movimiento: nodos se encienden por clase; gráfica real se traza.
- Referencias: Tourism + espécimen.

### P03-P04 - Café, limón y uso óptimo

- Base: atlas oscuro con amarillo cultivo y rojo café.
- Crear: hachuras agrícolas, espécimen botánico decorativo, comparación de capas, insets de suelo/cultivo.
- Movimiento: alternancia estable de aptitud y uso; no mover la extensión.
- Referencias: Food + póster amarillo.

### P05-P08 - Metztitlán

- Base: laboratorio mineral.
- Crear: piedra, placas de geomorfones, perfiles, puntos de registro, secciones y silueta de reserva.
- Movimiento: relieve por capas, zoom a muestras y líneas de llamada.
- Referencias: piedra + mapa con insets + póster negro.

### P09 - Vocaciones

- Base: atlas oscuro.
- Crear: grafo de clúster, rutas metodológicas, máscaras municipales y nodos.
- Movimiento: red se arma de centro a periferia.
- Referencias: Tourism.

### P10-P11 - Aptitud

- Base: negro/papel con verde para conservación y rojo para agricultura.
- Crear: pila isométrica de criterios, pesos reales, patrón de cada criterio y comparación sincronizada.
- Movimiento: capas se separan y vuelven a apilar.
- Referencias: relieve 2.5D + mapa territorial.

### P12 - Degradación del suelo

- Base: piedra y suelo en blanco/negro con rosa mineral.
- Crear: textura macro de suelo, mapa enmascarado, llamadas y foto documental.
- Movimiento: grietas funcionan como máscara de revelado.
- Referencias: piedra.

### P13 - Subcuencas

- Base: relieve 2.5D negro y cian.
- Crear: losa topográfica, red de ríos, sección de cuenca, arcos y perfil.
- Movimiento: separación de estratos y flujo de agua.
- Referencias: relieve hidrológico.

### P14 - GRANULAR

- Base: atlas oscuro de máxima densidad.
- Agua: cian/azul; Agro: verde/magenta; Gobernanza: violeta/naranja; Socioeconomía: naranja; Ambiente: magenta/verde; Conectividad: rojo/azul; Clustering: paleta categórica real.
- Crear: shell cartográfico, panel de capas, mapas por pilar, insets, nodos, redes, diagramas y pósteres de transición.
- Movimiento: una gramática común, un comportamiento específico por pilar.
- Referencias: Food + Tourism + mapa con insets + relieve hidrológico.

### P15 - Urban Challenge

- Base: laboratorio arquitectónico blanco/negro y madera.
- Crear: axonometría explotada, plantas, secciones, anillo, pasarela, anfiteatro y detalles de materialidad.
- Movimiento: explotar capas 16-28 px y conectarlas con líneas.
- Referencias: Reality by Design + laboratorio blanco.

## 8. Secuencia de prompts para ejecutar con Claude

### Fase 0 - Auditoría

```text
Revisa el repositorio sin modificarlo. Lee CLAUDE.md y los tres documentos de fuente. Inspecciona git status y usa git show para entender la implementación anterior si los archivos están eliminados. Entrega: estado del worktree, stack, activos disponibles, riesgos, archivos que requerirían restauración y propuesta de fases. No restaures ni borres nada todavía.
```

### Fase 1 - Sistema visual

```text
Con autorización para trabajar, construye primero tokens, retícula, tipografía, patrones SVG, componentes cartográficos, texturas, motion tokens y fallbacks. Crea una página interna de laboratorio visual que muestre todos los patrones, líneas, íconos, insets, relieves y transiciones. Compara con las nueve referencias y corrige antes de tocar los 15 casos.
```

### Fase 2 - Home

```text
Construye el home completo con objeto territorial flotante, anotación técnica, mapa nacional de estaciones, índice por coordenadas, pósteres de transición y GRANULAR destacado. No uses cards. Entrega capturas 1440, 768 y 390 px y enumera diferencias restantes respecto a Reality by Design, póster amarillo y póster negro.
```

### Fase 3 - GRANULAR

```text
Implementa GRANULAR como caso maestro. Usa sus SVG reales y crea una lámina por pilar con gramática común: columna editorial, mapa, leyenda, coordenadas, insets, capas y movimiento. No inventes datos. Entrega primero Agua y Agropecuario; valida la fidelidad antes de extender a los demás pilares.
```

### Fase 4 - Familias restantes

```text
Implementa Metztitlán, Aguascalientes/Calvillo, Veracruz/CDMX y Urban Challenge por familias visuales. Reutiliza estructura, pero no la misma apariencia. Cada caso necesita hero, evidencia, método, detalle, hallazgo y transición propia. Genera o dibuja recursos decorativos según la matriz V2.
```

### Fase 5 - Auditoría final

```text
Audita el sitio contra el PDF, CSV y referencias. Verifica datos, textos, créditos, contraste, foco, reduced-motion, carga, CLS, responsive y fallbacks. Captura home, GRANULAR, Metztitlán y Urban Challenge en 1440, 1024, 768 y 390 px. Para cada captura, compara densidad, composición, escala, textura y precisión con INSPO. No declares terminado con diferencias visibles importantes.
```

## 9. Lista de rechazo inmediato

Rehacer una sección si:

- la solución principal son tarjetas;
- el mapa está encerrado en un panel pequeño;
- solo se cambió la paleta del diseño anterior;
- no existen dibujos o capas nuevas;
- los fondos son planos y sin profundidad territorial;
- las leyendas parecen filtros de e-commerce;
- hay gradientes púrpura/azul genéricos;
- las animaciones son rebotes, zooms o fades sin significado;
- se usa un bitmap para texto o cifras;
- el contenido móvil es ilegible;
- el resultado no puede asociarse visualmente a ninguna referencia de `INSPO/`.

## 10. Criterio final

La web debe verse como si los mapas Food/Tourism, el relieve hidrológico, Reality by Design, el laboratorio biológico, la piedra y los pósteres tipográficos pertenecieran a una sola identidad construida para este portafolio.

No basta con inspirarse. Deben coincidir la escala, la oscuridad, la densidad de información, la precisión de línea, el espacio negativo, la materialidad y el ritmo editorial, usando siempre los datos y territorios reales de Nestor.
