#!/usr/bin/env python3
"""Activos web de P01-P13 desde PORTAFOLIO GIS.

El atlas ya tenia pipeline para los SVG de GRANULAR (P14). Los otros catorce
casos viven en `PORTAFOLIO GIS` como PNG/JPEG sueltos y no tenian ninguno: la
home los nombraba en el indice pero no habia con que dibujarlos.

Qué hace, y por qué:

- **Recorta el margen transparente** y guarda el `frame` que ocupaba dentro del
  lienzo original, en fracciones. Es la misma regla que el pipeline del atlas:
  recortar ahorra mucho peso pero mueve el origen, y dos capas recortadas de
  distinto tamano superpuestas se centrarian una sobre otra. Con el `frame` se
  vuelven a montar en su sitio. Sin el, el mapa mentiria.
- **Mide los colores dominantes** de cada activo. El color de un raster esta
  cocido en el pixel: una leyenda que declare otro tono describe un mapa que no
  es el que se ve. `dominant` es de donde tienen que salir las claves.
- **Emite WebP a 2000/1000/500** y conserva las dimensiones nativas, para poder
  reservar el hueco y no provocar CLS.

Las fuentes no se copian ni se modifican; solo se leen.
"""
from __future__ import annotations

import json
import os
import sys
from collections import Counter

from PIL import Image

Image.MAX_IMAGE_PIXELS = None

def fuente(variable, descripcion):
    """Raiz del material de origen, tomada del entorno.

    Los originales viven en el archivo de trabajo local y no se versionan: el
    repositorio publica los derivados. Antes esta ruta estaba escrita en el
    codigo, y publicarla exponia el arbol de carpetas del autor sin describir
    mejor la procedencia.
    """
    ruta = os.environ.get(variable)
    if not ruta:
        raise SystemExit(
            f"Falta {variable}: ruta al material de origen ({descripcion}). "
            "Vive en el archivo de trabajo local, fuera del repositorio."
        )
    return ruta

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = fuente("GIS_FUENTES", "salidas GIS de los proyectos")
OUT = os.path.join(ROOT, "public", "projects")

WIDTHS = (2000, 1000, 500)
ALPHA_FLOOR = 12  # por debajo de esto el pixel se considera vacio


# Tabla declarativa. Cada fila es: slug, ruta relativa en la fuente, proyectos a
# los que pertenece, rol, y paginas del PDF. `rol` decide como se compone luego:
#   map     lamina cartografica completa, protagonista de una escena
#   figure  grafica o diagrama con datos reales
#   mask    silueta territorial, para recorte tipografico y localizador
#   slab    bloque isometrico de criterio del modelo de aptitud
#   glyph   icono monolineal de categoria
#   texture trama para fondo
#
# La correspondencia proyecto/pagina sale de clasificacion_activos_portafolio.csv.
ASSETS = [
    # --- P01 Areas verdes, Miguel Hidalgo -----------------------------------
    ("cdmx-alcaldias",   "Diseño sin título-4.png", ["01"], "map",     [19]),
    ("cdmx-contorno",    "CDMX.png",                ["01"], "mask",    [18, 19]),
    ("glyph-areas-verdes", "GREENAREA.png",         ["01"], "glyph",   [18, 19]),
    ("cdmx-habitantes",  "inhabitants.png",         ["01"], "figure",  [19]),

    # --- P02 Captura de carbono ---------------------------------------------
    ("carbono-grafica",  "GRAFICA CARBONO.png",     ["02"], "figure",  [22]),
    ("glyph-co2",        "CO2.png",                 ["02"], "glyph",   [22]),

    # --- P03/P04 Limon y cafe ------------------------------------------------
    ("glyph-cafe",       "CAFE ROJO.png",           ["03"], "glyph",   [23]),
    ("glyph-cafe-negro", "Diseño sin título.png",   ["03"], "glyph",   [23]),
    ("glyph-agricultura", "AGRICULTURA.png",        ["04"], "glyph",   [24]),

    # --- P02-P04 Decozalapa --------------------------------------------------
    ("decozalapa-mask",  "DECOZALAPA.png",          ["02", "03", "04"], "mask", [22, 24]),
    ("veracruz-contorno", "VERACRUZ.png",           ["02", "03", "04"], "mask", [20, 24]),
    ("veracruz-mask",    "VERACRUZ2.png",           ["02", "03", "04"], "mask", [20, 24]),

    # --- P05-P08 Metztitlan --------------------------------------------------
    ("metz-apertura",    "metz_base_2.jpeg",        ["05", "06", "07", "08"], "map", [25]),
    ("metz-geomorfologia", "METZ/14.png",           ["05"], "map",     [26]),
    ("metz-uso-suelo",   "METZ/15.png",             ["06"], "map",     [27]),
    ("metz-pendiente",   "METZ/16.png",             ["07"], "map",     [28]),
    ("metz-patrones",    "METZ/17.png",             ["08"], "map",     [29]),
    ("metz-pendiente-grafica", "GRAFICO-SLOPE.png", ["07"], "figure",  [28]),
    ("metz-pendiente-perfil", "SLOPE_METZ.png",     ["07"], "figure",  [28]),
    ("hidalgo-mask",     "HIDALGO.png",             ["05", "06", "07", "08"], "mask", [25, 29]),
    ("glyph-geoformas",  "LANDFORM.png",            ["05"], "glyph",   [26]),
    ("glyph-uso-suelo",  "LANDUSE.png",             ["06"], "glyph",   [27]),

    # --- P09-P13 Aguascalientes / Calvillo -----------------------------------
    ("ags-vocaciones",   "MAPAS AGS/4.png",         ["09"], "map",     [32, 33]),
    ("ags-conservacion", "MAPAS AGS/2.png",         ["10"], "map",     [34, 35]),
    ("ags-agricola",     "MAPAS AGS/3.png",         ["11"], "map",     [36, 37]),
    ("calvillo-suelo",   "suelo.png",               ["12"], "map",     [38]),
    ("calvillo-subcuencas", "SUBCC.png",            ["13"], "map",     [39]),
    ("ags-mask",         "AGUASCALIENTES.png",      ["09", "10", "11", "12", "13"], "mask", [32, 39]),
    ("glyph-conservacion", "CONSERVATION.png",      ["10"], "glyph",   [34, 35]),
    ("slab-1",           "APTITUD/27.png",          ["10", "11"], "slab", [34, 37]),
    ("slab-2",           "APTITUD/28.png",          ["10", "11"], "slab", [34, 37]),
    ("slab-3",           "APTITUD/29.png",          ["10", "11"], "slab", [34, 37]),
    ("slab-4",           "APTITUD/30.png",          ["10", "11"], "slab", [34, 37]),
    ("slab-5",           "APTITUD/31.png",          ["10", "11"], "slab", [34, 37]),
    ("slab-6",           "APTITUD/32.png",          ["10", "11"], "slab", [34, 37]),

    # --- transversales -------------------------------------------------------
    # La firma es del autor y viene con alfa limpia (4206x3676 de trazo útil
    # dentro de un lienzo de 4406x7031). Se recorta a su contenido.
    ("firma",            "firma.png",               [], "signature",   [5]),
    ("textura-topografica", "BASE.png",             [], "texture",     [18, 89]),
    ("mexico-localizador", "mexico.png",            [], "mask",        [8, 9]),
]


def load(path: str) -> Image.Image:
    im = Image.open(path)
    return im.convert("RGBA")


def trim(im: Image.Image):
    """Recorta el margen vacio y devuelve (imagen, frame en fracciones).

    Un JPEG no tiene alfa: su "vacio" es el blanco del papel. Recortarlo por
    luminancia se comeria zonas claras del propio mapa, asi que las imagenes sin
    alfa real se dejan enteras.
    """
    w, h = im.size
    alpha = im.getchannel("A")
    if alpha.getextrema()[0] >= ALPHA_FLOOR:
        return im, [0.0, 0.0, 1.0, 1.0]

    box = alpha.point(lambda a: 255 if a >= ALPHA_FLOOR else 0).getbbox()
    if not box:
        return im, [0.0, 0.0, 1.0, 1.0]

    left, top, right, bottom = box
    frame = [left / w, top / h, (right - left) / w, (bottom - top) / h]
    return im.crop(box), [round(v, 6) for v in frame]


def dominant_colors(im: Image.Image, limit: int = 8):
    """Colores que el activo dibuja realmente, con su superficie relativa.

    Se ignoran los pixeles transparentes: contarlos haria que la clave de
    cualquier capa recortada fuese el color del hueco.
    """
    small = im.copy()
    small.thumbnail((220, 220))
    counts: Counter = Counter()
    total = 0
    for r, g, b, a in small.getdata():
        if a < 128:
            continue
        # cuantizacion a 5 bits por canal: agrupa el ruido de compresion sin
        # fundir dos clases categoricas distintas
        counts[(r >> 3 << 3, g >> 3 << 3, b >> 3 << 3)] += 1
        total += 1
    if not total:
        return []
    return [
        {"hex": "#%02x%02x%02x" % rgb, "share": round(n / total, 4)}
        for rgb, n in counts.most_common(limit)
    ]


def emit(im: Image.Image, slug: str) -> dict:
    files = {}
    for w in WIDTHS:
        if w > im.width:
            continue
        h = max(1, round(im.height * w / im.width))
        out = os.path.join(OUT, "raster", f"{slug}-{w}.webp")
        im.resize((w, h), Image.LANCZOS).save(out, "WEBP", quality=86, method=5)
        files[str(w)] = f"/projects/raster/{slug}-{w}.webp"
    if not files:
        out = os.path.join(OUT, "raster", f"{slug}-{im.width}.webp")
        im.save(out, "WEBP", quality=90, method=5)
        files[str(im.width)] = f"/projects/raster/{slug}-{im.width}.webp"
    return files


def main(only: list[str]) -> None:
    os.makedirs(os.path.join(OUT, "raster"), exist_ok=True)
    entries = []

    for slug, rel, projects, role, pages in ASSETS:
        if only and slug not in only:
            continue
        path = os.path.join(SRC, rel)
        if not os.path.exists(path):
            print(f"  falta   {rel}", file=sys.stderr)
            continue

        im = load(path)
        native = list(im.size)
        cropped, frame = trim(im)
        files = emit(cropped, slug)

        entries.append({
            "slug": slug,
            "source": rel,
            "projects": projects,
            "role": role,
            "pages": pages,
            "native_px": native,
            "trimmed_px": list(cropped.size),
            "frame": frame,
            "ratio": round(cropped.width / cropped.height, 6),
            "dominant": dominant_colors(cropped),
            "files": files,
        })
        print(f"  {slug:26s} {native[0]}x{native[1]} -> {cropped.width}x{cropped.height}")

    manifest = os.path.join(OUT, "projects-manifest.json")
    if only and os.path.exists(manifest):
        prev = json.load(open(manifest))["assets"]
        keep = [a for a in prev if a["slug"] not in {e["slug"] for e in entries}]
        entries = sorted(keep + entries, key=lambda a: a["slug"])

    with open(manifest, "w") as fh:
        json.dump({"source": SRC, "widths": list(WIDTHS), "assets": entries}, fh, indent=1)
    print(f"\n{len(entries)} activos -> {manifest}")


if __name__ == "__main__":
    main(sys.argv[1:])
