# PORTAFOLIO - instrucciones maestras para Claude/Fable

## Objetivo

Construir en esta carpeta un portafolio web de alta fidelidad para Nestor Elihu Arriaga Gallegos. El resultado debe sentirse literalmente dentro del mismo universo visual de las nueve referencias guardadas en `INSPO/`: cartografía territorial nocturna, publicación científica experimental, lámina geológica, espécimen biológico escaneado, póster tipográfico brutalista y objeto natural convertido en interfaz.

No se busca una plantilla de portafolio. Se busca un **atlas territorial interactivo, editorial y cinematográfico** que use los mapas, cifras, textos y recursos reales del portafolio.

Lee completamente antes de actuar:

1. `Portafolio_Sd.pdf`
2. `clasificacion_activos_portafolio.csv`
3. `sistema_visual_y_prompts_portafolio_web.md`
4. `PROMPTS_VISUALES_Y_MOVIMIENTO_V2.md`
5. las nueve imágenes de `INSPO/`

## Preflight obligatorio

Antes de implementar:

1. Ejecuta una revisión no destructiva del árbol y de `git status`.
2. Si los archivos rastreados del sitio aparecen eliminados, **no ejecutes reset, checkout, restore ni limpieza masiva**. Informa el estado y pide autorización antes de restaurar contenido.
3. Puedes inspeccionar versiones anteriores con `git show HEAD:ruta/del/archivo` sin modificar el worktree.
4. No sobrescribas las imágenes de `INSPO/`, el PDF, el CSV ni los documentos de dirección de arte.
5. No comiences por instalar dependencias. Primero identifica la implementación existente, su stack y lo que puede reutilizarse.

## Fuente de verdad

- El PDF manda sobre títulos, textos, cifras, categorías, unidades, leyendas y créditos.
- El CSV manda sobre la correspondencia entre archivo, proyecto, páginas y uso recomendado.
- Los recursos cartográficos reales mandan sobre geometrías, límites, puntos y redes.
- `INSPO/` manda sobre composición, textura, densidad, ritmo, contraste y movimiento.
- Si una imagen necesaria solo existe en el PDF, extráela con calidad suficiente o recupera su vínculo original. No la recrees por aproximación.

## Resultado visual obligatorio

El sitio debe combinar tres modos coherentes:

### Modo A - Atlas oscuro, 70 % del sitio

Derivado de las referencias Food, Tourism, mapa territorial con insets y diagrama hidrológico 2.5D.

- fondo entre `#050505` y `#111111`;
- imagen satelital o relieve desaturado, oscuro y muy detallado;
- límites blancos de 0.8-1.2 px;
- una sola familia de acento por capítulo;
- hachuras, puntos, círculos de influencia, rutas y redes;
- columna editorial izquierda de 25-30 % y campo cartográfico de 70-75 % en escritorio;
- coordenadas en bordes, escala, norte, números de cuadrícula y leyenda real;
- mapas grandes: no colocar la cartografía dentro de tarjetas.

### Modo B - Laboratorio mineral, 20 % del sitio

Derivado de Reality by Design, espécimen biológico, piedra y perfiles territoriales.

- fondos negros absolutos o blanco papel `#F3F2EC`;
- objetos aislados: roca, relieve, planta, cuenca, nube de puntos o axonometría;
- líneas de llamada rectas, puntos de anclaje cuadrados y ventanas técnicas;
- dibujos SVG, perfiles, secciones, tramas y despieces;
- textura fotocopiada o grano fino, nunca un filtro pesado;
- mucho espacio negativo alrededor del objeto principal.

### Modo C - Póster de señal, 10 % del sitio

Derivado de los pósteres amarillo y negro.

- interludios de pantalla completa;
- título enorme fragmentado, girado o vertical;
- retícula visible;
- un solo color de señal muy intenso;
- información mínima y precisa;
- sirve para cambiar de territorio o familia temática, no para páginas de datos.

## Referencias locales y su función

- `INSPO/Imagen de Codex 7 ago 2026, 11_01_19 a.m..png`: estándar para mapas agroproductivos de GRANULAR.
- `INSPO/Imagen de Codex 7 ago 2026, 11_01_15 a.m..png`: estándar para redes, movilidad, conectividad y capas con halos.
- `INSPO/Imagen de Codex 7 ago 2026, 11_01_10 a.m..png`: estándar para relieve 2.5D, perfiles y flujos arqueados.
- `INSPO/Imagen de Codex 7 ago 2026, 11_01_07 a.m..png`: estándar para láminas territoriales con insets, coordenadas y grilla.
- `INSPO/Imagen de Codex 7 ago 2026, 11_01_02 a.m..png`: estándar para home, objetos naturales aislados y anotación técnica.
- `INSPO/Imagen de Codex 7 ago 2026, 11_00_59 a.m..png`: estándar para especímenes ambientales o agrobiológicos luminosos.
- `INSPO/Imagen de Codex 7 ago 2026, 11_00_55 a.m..png`: estándar para geología, suelo y máscaras de material.
- `INSPO/Imagen de Codex 7 ago 2026, 11_00_52 a.m..png`: estándar para interludios amarillos y composición tipográfica territorial.
- `INSPO/Imagen de Codex 7 ago 2026, 11_00_46 a.m..png`: estándar para portadas negras, textura mineral y tipografía fragmentada.

No copies los textos, marcas, logos ni datos de esas referencias. Replica con precisión su gramática visual.

## Sistema de composición

- Retícula principal: 12 columnas, 24 px de gutter, márgenes de 48-80 px.
- En mapas editoriales: 3.2 columnas para leyenda y 8.8 para mapa.
- En objetos de laboratorio: objeto entre 48 y 66 % del viewport, con 20-35 % de espacio negativo.
- En pósteres: título entre 16 y 26 vw, permitiendo recorte controlado.
- Alterna densidad: una lámina muy densa debe ir seguida por una pausa de baja densidad.
- Bordes rectos. Radio máximo habitual: 0. Solo controles pequeños pueden usar 2-4 px.
- Sombras únicamente físicas: debajo de un relieve, roca o panel flotante. No usar sombras de tarjeta.
- Todo dato se compone con HTML o SVG real. Nunca rasterizar tipografía informativa.

## Tipografía

Prioriza las fuentes locales ya presentes en el proyecto.

- Títulos: grotesca geométrica o condensada, peso 500-700.
- Datos y etiquetas: monoespaciada.
- Citas: serif editorial únicamente en pausas blancas.
- Títulos de caso: 72-160 px en escritorio, 42-76 px en móvil.
- Cuerpo: 16-20 px; ancho de línea 45-75 caracteres.
- Etiquetas técnicas: 11-13 px; nunca menos de 11 px en escritorio ni 12 px en móvil.

## Color

Base:

```css
--black: #050505;
--black-soft: #111111;
--charcoal: #1b1b1b;
--paper: #f3f2ec;
--paper-cool: #e5e6e2;
--line-dark: #363636;
--line-light: #c8cac6;
--white: #f7f7f2;
```

Acentos por familia:

- P01 áreas verdes: `#78F36A`.
- P02 carbono: `#FF3B4D`.
- P03-P04 cultivos: `#E53131` y `#D7EC31`.
- P05-P08 Metztitlán: `#D7C62A`, blanco y rojo de registro `#FF3A2E`.
- P09-P13 Aguascalientes: verde `#5ED57B`, rojo `#E83B3B`, azul agua `#5ED6E8`, amarillo señal `#F2EA16`.
- P14 GRANULAR: un acento por pilar; nunca todos simultáneamente salvo clustering.
- P15 Urban Challenge: papel, negro, verde bosque `#416B48` y madera `#A5784C`.

No usar gradientes decorativos. Se permite glow físico muy localizado en nodos, especímenes o áreas críticas.

## Recursos visuales que deben crearse

Crear, reutilizar o derivar de los activos reales:

1. máscaras territoriales limpias en SVG;
2. fondos satelitales monocromos;
3. relieves 2.5D con borde de corte;
4. perfiles topográficos y secciones de cuenca;
5. sistemas de hachura para agricultura, bosque, conservación, suelo y mancha urbana;
6. redes de puntos, nodos, halos y círculos de influencia;
7. líneas de flujo y arcos entre territorios;
8. íconos cartográficos monolineales consistentes;
9. insets de ortofoto con marcos cuadrados;
10. objetos de laboratorio: roca, suelo, cuenca, cultivo o relieve aislado;
11. texturas minerales y grano editorial;
12. interludios tipográficos amarillos, negros y blancos;
13. dibujos axonométricos y explotados para Urban Challenge;
14. leyendas, escalas, norte, coordenadas y rieles de proyecto;
15. fallbacks estáticos para toda visualización animada.

Los recursos decorativos deben vivir separados de los datos y usar `aria-hidden="true"`.

## Componentes visuales esperados

Usa o crea equivalentes de:

- `AtlasShell`
- `CartographicPlate`
- `LegendRail`
- `CoordinateFrame`
- `LayerKey`
- `MapInsetStack`
- `TopographicSlab`
- `TerritoryMask`
- `FlowArcField`
- `ParticleNetwork`
- `TechnicalCallout`
- `SpecimenStage`
- `SectionProfile`
- `StoneMaskLayout`
- `SignalPoster`
- `AxonometricExploder`
- `ProjectProgressRail`
- `TextureOverlay`
- `MotionFallback`

No crear un componente `Card` genérico para resolver el sitio.

## Movimiento obligatorio

El movimiento debe explicar territorio, no adornarlo.

1. Dibujar límites y redes con `stroke-dashoffset` al entrar en viewport.
2. Revelar capas mediante `clipPath` o máscara, siempre sobre la misma extensión.
3. Animar partículas lentamente sobre rutas reales.
4. Elevar capas de un relieve 2.5D entre 12 y 36 px durante el scroll.
5. Conectar nodos con arcos que aparecen en secuencia.
6. Mostrar líneas de llamada después del objeto, no antes.
7. Usar parallax físico máximo de 24 px para texturas y 40 px para objetos.
8. En pósteres, desplazar letras o rotarlas levemente; no usar glitch continuo.
9. En especímenes, usar scanline o barrido de opacidad una sola vez.
10. Todos los estados deben funcionar con `prefers-reduced-motion`.

Duraciones:

- microinteracción: 120-220 ms;
- revelado de capa: 450-750 ms;
- trazado de red: 700-1200 ms;
- transición de capítulo: 900-1400 ms;
- ningún loop evidente menor de 8 segundos.

Solo animar `transform`, `opacity`, `filter` localizado y propiedades SVG. No producir layout shift.

## Estabilidad y rendimiento

- Define `width`, `height` o `aspect-ratio` para todos los medios.
- Evita animar propiedades que recalculen layout.
- Usa SVG/Canvas antes que WebGL. Usa WebGL solo para relieve o nube de puntos cuando aporte una diferencia visible.
- Carga diferida de mapas pesados y visualizaciones.
- Usa poster/fallback para cada canvas.
- No sacrifiques legibilidad por densidad gráfica.
- Objetivo: cero CLS perceptible, desplazamiento estable y 60 fps en equipo medio.
- En móvil, no reducir toda la lámina: reordenar leyenda, mapa, detalles e insets.

## Receta por familia de proyectos

- P01: atlas urbano verde; mapa protagonista, indicadores como instrumentos.
- P02-P04: atlas de carbono y agricultura; rojo, amarillo ácido, tramas y especímenes botánicos.
- P05-P08: laboratorio mineral; roca, relieve, geomorfones, perfiles y puntos de registro.
- P09-P13: metodología territorial; capas isométricas, redes, degradación de suelo y cuencas.
- P14: gran atlas nocturno; máxima densidad cartográfica e interacción por pilares.
- P15: lámina arquitectónica; axonometría, despiece, plantas y líneas de llamada.

## Orden de ejecución

No intentes terminar 15 casos de una vez.

1. Auditoría del estado actual y recuperación autorizada del código si corresponde.
2. Sistema de tokens, retícula, tipografía, textura y movimiento.
3. Home de alta fidelidad.
4. Caso GRANULAR completo como patrón maestro.
5. Caso Metztitlán como patrón mineral.
6. Caso Urban Challenge como patrón arquitectónico.
7. Casos restantes por familias.
8. QA factual contra PDF.
9. QA visual con capturas en 1440, 1024, 768 y 390 px.

## Definición de terminado

No declares terminado si ocurre cualquiera de estas condiciones:

- parece una plantilla de agencia o un dashboard;
- el mapa ocupa menos de la mitad de la composición principal;
- hay tarjetas redondeadas repetitivas;
- faltan texturas, dibujos, insets o anotaciones técnicas;
- el sitio depende de imágenes con texto incrustado;
- se inventaron datos o geometrías;
- las animaciones mueven el layout;
- todos los proyectos se ven iguales;
- la versión móvil es solo una reducción del escritorio;
- no existen fallbacks para movimiento reducido;
- no se comparó visualmente con las nueve referencias.

El criterio final no es "funciona". El criterio es: **funciona, permanece estable y podría confundirse con una publicación digital del mismo universo visual que las referencias**.
