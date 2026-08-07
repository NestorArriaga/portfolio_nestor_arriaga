# Inventario de fuentes del atlas — Fase 1a

Qué material real existe, en qué estado, y qué láminas permite construir sin
inventar datos. Generado por `scripts/build_atlas_sources.py` y
`scripts/build_territory_masks.py`.

## Fuentes (fuera del repositorio, solo lectura)

| Origen | Ruta | Contenido |
|---|---|---|
| SVG GRANULAR | `~/Documents/EPI /GRANULAR/DISEÑO IMAGEN Y PRESENTACION/B VECTORES SVG AI EPS/EPI CIHEAM/ELEMENTOS` | 102 SVG, 996 MB |
| GIS portafolio | `~/Documents/self/PORTAFOLIO GIS` | 51 PNG, 6 shapefiles, 4 CSV del modelo de aptitud |
| Documento factual | `PORTAFOLIO/Portafolio_Sd.pdf` | 93 páginas, A4 apaisado |

Las fuentes **no se copian ni se modifican**. Si se mueven, el pipeline deja de
poder regenerarse; por eso los derivados sí se versionan.

## Qué eran realmente los SVG

El 98 % de los 996 MB era ráster incrustado en base64. No son mapas vectoriales:
son exportaciones de QGIS donde cada capa se rasterizó y, cuando excedía 2000 px,
se partió en mosaicos.

El pipeline reconstruye esos mosaicos. Dos imágenes de una misma capa nunca se
solapan; cuando una pisa territorio ya cubierto, empieza una capa nueva. Ese
criterio recupera la pila original: `comarca_base_conectividad.svg` (58 MB, 10
imágenes) se separa en 4 capas independientes — relieve, satélite, contorno y red
de conectividad — cada una compositable y animable por separado.

**Resultado: 996 MB → 137 MB.** 102 capas ráster (52 base, 50 sobreposición con
transparencia) en WebP a 2000/1000/500 px, más 102 SVG limpios de ráster.

Resolución nativa dominante: 2480×3507 y 3507×2480 (A4 a 300 dpi). Sobra para
láminas a sangre en pantallas 2x.

### Registro entre capas

Cada capa se recorta a su contenido, lo que ahorra mucho peso pero mueve su
origen. Superponer dos capas recortadas de distinto tamaño las centraría una
sobre otra y **el mapa mentiría**: en la primera versión la red de conectividad
(2057×2343) aparecía centrada dentro del relieve (3589×2570), desplazada del
territorio que describe.

Por eso el manifiesto guarda, por archivo, un `canvas` en unidades de usuario del
SVG —el espacio común a todas sus capas— y, por capa, un `frame`
`[left, top, width, height]` en fracciones de ese lienzo. `LayerStack` posiciona
cada capa con esas fracciones. La proporción del campo se toma de
`canvas.ratio`, no de una capa suelta.

Esto vale **dentro de un archivo**. Dos archivos distintos no comparten lienzo:
no se pueden mezclar capas de `sequia.svg` con las de `comarca_base.svg` sin
verificar antes que su encuadre coincide.

### Color real de cada capa

El color de un ráster está cocido en el pixel y CSS no puede cambiarlo. Una
clave de leyenda que declare otro tono describe un mapa que no es el que se ve
—la red de conectividad se dibuja en `#ff6a19`, no en el rojo de la paleta—.
El manifiesto guarda por capa sus colores dominantes con su superficie relativa,
y `layerColor()` los expone para que la leyenda tome el color del mapa.

## Material por familia de proyecto

`base` = capa opaca que llena el encuadre (relieve, satélite).
`sobre` = capa con transparencia, superponible sobre una base común.
`vec` = archivos con geometría vectorial real aprovechable.

| Familia | Arch. | Base | Sobre | Vec | Paths |
|---|---:|---:|---:|---:|---:|
| P14 identidad / base territorial | 23 | 11 | 22 | 17 | 2 405 |
| P14 Pilar II Agropecuario | 17 | 10 | 1 | 6 | 29 680 |
| P14 capas municipales | 15 | 0 | 0 | 15 | 61 |
| P14 Pilar I Agua | 9 | 8 | 1 | 0 | 0 |
| P14 Pilar IV Socioeconomía | 9 | 6 | 3 | 0 | 0 |
| P14 Pilar III Gobernanza | 6 | 3 | 0 | 3 | 28 845 |
| P14 clustering | 5 | 5 | 2 | 1 | 3 |
| P14 Conectividad | 4 | 2 | 5 | 3 | 32 |
| P14 Pilar V Ambiente | 4 | 3 | 1 | 0 | 0 |
| P14 síntesis y aplicaciones | 3 | 0 | 0 | 3 | 55 |
| P14 aplicaciones y gobernanza | 2 | 0 | 14 | 2 | 606 |
| P14 exploraciones no confirmadas | 4 | 2 | 1 | 4 | 10 939 |
| P13 Subcuencas y ríos de Calvillo | 1 | 2 | 0 | 0 | 0 |

## Geometría vectorial real

Lo que se puede trazar, animar con `stroke-dashoffset` y colorear con
`currentColor`, sin depender de un bitmap:

| Recurso | Elementos | Uso |
|---|---:|---|
| `anp.svg` | 14 084 | Áreas Naturales Protegidas — Pilar Ambiente / Gobernanza |
| `rtp.svg` | 14 599 | Regiones Terrestres Prioritarias |
| `agricultura_temporal.svg` | 10 850 | Parcelas de temporal — Pilar Agropecuario |
| `agricultura_riego.svg` | 10 151 | Parcelas de riego — Pilar Agropecuario |
| `vulnerabilidad_sequia.svg` | 7 634 | Vulnerabilidad a sequía |
| `paisaje_comarca.svg` | 1 079 | Paisaje |
| `riego_2.svg` | 467 | Superficie de riego |
| 14 municipios de la Comarca | 3 c/u | Límites municipales — `TerritoryMask`, retícula de gobernanza |
| 5 diagramas metodológicos | 5-11 | `granular_flow`, `methodology_flow`, `critical_layers`, `mexico_typologies`, `agricultura1` |

Municipios disponibles: Torreón, Gómez Palacio, Lerdo, Matamoros, Viesca, San
Pedro, Francisco I. Madero, Mapimí, Tlahualillo, Nazas, Cuencamé, Santa Clara,
San Juan de Guadalupe, San Luis del Cordero, General Simón Bolívar.

## Máscaras territoriales desde shapefiles

Reproyectadas a EPSG:6372 (cónica conforme de Lambert para México) y
normalizadas a 1000 unidades de ancho.

| Máscara | Anillos | Puntos | Extensión | Peso |
|---|---:|---:|---|---:|
| `mask-decozalapa` | 1 | 182 | 79 × 46 km | 2.7 KB |
| `mask-aguascalientes` | 1 | 297 | 107 × 92 km | 4.4 KB |
| `mask-ciudad-de-mexico` | 1 | 135 | 45 × 60 km | 2.1 KB |
| `mask-jalisco` | 52 | 3 991 | 434 × 423 km | 58.0 KB |
| `mask-veracruz` | 63 | 6 342 | 552 × 569 km | 91.7 KB |
| `mask-yucatan` | 63 | 1 221 | 494 × 329 km | 18.2 KB |

`ogr2ogr` aplica `-simplify` en las unidades del origen, no del destino.
Combinarlo con `-t_srs` en una sola llamada colapsa a su caja cualquier fuente en
grados. El pipeline reproyecta primero y simplifica después; sin eso, Decozalapa
salía como un rectángulo de 4 puntos.

## Modelo de aptitud — dato tabular real

`~/Documents/self/PORTAFOLIO GIS/MODELO APTITUD/` contiene el grafo de criterios
con pesos reales de P10-P11:

- **Agrícola**: 6 criterios, 6 aristas ponderadas (cobertura de suelo, cercanía a
  cuerpos de agua, pendiente, lejanía a áreas inundables, tipo de suelo,
  susceptibilidad a la erosión).
- **Conservación**: 5 criterios, 4 aristas (cobertura de suelo, fragilidad
  ecosistémica, función hidrológica forestal, pendiente, lejanía a inundables).

Se dibuja íntegramente con código. Es el insumo de la pila isométrica de
criterios de P10-P11.

## Limitaciones que condicionan el diseño

1. **Tres pilares de GRANULAR no tienen vector.** Agua, Socioeconomía y Ambiente
   existen solo como ráster. Sus capas se revelan con `clipPath` o máscara sobre
   una base común — permitido por la dirección de arte — pero **no** se pueden
   trazar con `stroke-dashoffset` ni recolorear por categoría. La leyenda de esas
   láminas debe componerse aparte, en HTML/SVG, contra el PDF.

2. **Los shapefiles son siluetas, no datos.** Un polígono por archivo: sirven
   como máscara y recorte tipográfico, no como capa temática.

3. **No hay shapefile de la Comarca Lagunera.** Su geometría solo existe dentro
   de los SVG de GRANULAR, en la proyección con la que se exportaron. Todas las
   capas de la Comarca deben componerse en ese mismo encuadre; mezclarlas con las
   máscaras EPSG:6372 desalinearía el territorio.

4. **Verificar texto incrustado antes de publicar cada capa.** Las revisadas
   (`sequia`, `conectividad`) salen limpias, con el territorio recortado y sin
   rótulos. No se ha revisado una por una.

## Regenerar

```bash
.venv/bin/python web/scripts/build_atlas_sources.py      # 102 SVG, ~85 s
.venv/bin/python web/scripts/build_territory_masks.py    # 6 shapefiles
```

Ambos aceptan nombres de archivo sueltos para reprocesar solo una parte.
