#!/usr/bin/env python3
"""Laminas de P01-P13 extraidas de Portafolio_Sd.pdf.

`PORTAFOLIO GIS` guarda iconos, siluetas y algunas composiciones, pero **no** el
mapa protagonista de varios casos: P01, P02, P03, P04 y P09 no tienen ahi su
lamina. Esa lamina si existe, incrustada a resolucion completa, dentro del PDF
—2328x3263 px el mapa de areas verdes, 2478x3421 el de carbono—.

La direccion de arte dice que si una imagen necesaria solo existe en el PDF hay
que extraerla con calidad suficiente, no recrearla por aproximacion. Eso hace
este script: saca el bitmap incrustado tal cual, sin recomprimir dos veces y sin
tocar color.

Se extrae **por pagina declarada**, no barriendo el documento entero:

- Cada entrada dice de que pagina sale y a que proyecto pertenece, y esa
  correspondencia viene del propio PDF (el numero de caso esta impreso en la
  pagina), no de adivinar por tamano.
- Se ignoran las imagenes pequenas: son iconos que ya vienen del GIS.
- La p.17 lleva un mural de Diego Rivera. Es obra de un tercero y no se extrae.

Las fotografias si se extraen cuando el propio PDF las acredita al autor
("Foto: Nestor Elihu Arriaga Gallegos"); ese credito es lo que las hace
publicables aqui, y va con ellas al manifiesto.
"""
from __future__ import annotations

import io
import json
import os
import sys
from collections import Counter

import fitz
from PIL import Image

Image.MAX_IMAGE_PIXELS = None

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PDF = os.path.join(os.path.dirname(ROOT), "Portafolio_Sd.pdf")
OUT = os.path.join(ROOT, "public", "projects")

WIDTHS = (2000, 1000, 500)
MIN_PX = 400_000

# slug, pagina (1-based), indice dentro de las imagenes grandes de esa pagina,
# proyectos, rol, credito
#
# `CROP` recorta la lamina a su campo cartografico. Tres de estas laminas traen
# el bloque de leyenda maquetado dentro del propio bitmap: publicarlas enteras
# dejaria la informacion de la leyenda rasterizada, ilegible al ampliar y muda
# para un lector de pantalla. Se recorta el mapa y la leyenda se vuelve a
# componer en HTML con los mismos rotulos y valores que trae impresos.
# Fracciones [left, top, width, height].
CROP = {
    "p01-areas-verdes":  [0.0, 0.0, 1.0, 0.732],   # leyenda al pie
    "p02-carbono":       [0.0, 0.0, 1.0, 0.756],   # leyenda al pie
    "p03-zonas-optimas": [0.0, 0.0, 0.693, 1.0],   # leyenda a la derecha
}

# Laminas que son una silueta recortada sobre papel blanco, no una hoja
# completa. Publicadas tal cual, aparecen como un rectangulo blanco encendido
# en medio de un campo negro: el fondo pesa mas que el territorio y la lamina
# parece pegada, no compuesta.
#
# `KNOCKOUT` elimina ese blanco y deja el territorio con alfa, de modo que
# flota sobre el campo del capitulo con sus colores categoricos intactos. Es la
# unica manera de que estas laminas funcionen en modo atlas oscuro sin
# recolorearlas —que seria mentir sobre sus clases—.
#
# Solo se aplica donde el blanco es fondo. P01-P04 son hojas cartograficas
# completas, con marco, escala y norte impresos: ahi el blanco es la hoja y
# quitarlo destruiria la lamina.
KNOCKOUT = {
    "p05-geomorfones", "p06-zonas-ecologicas", "p07-pendiente", "p08-patrones",
    "p09-vocaciones", "p10-conservacion", "p11-agricola",
    "p12-degradacion", "p13-subcuencas",
}

# Umbral de blanco. 244 deja pasar el papel y el gris muy claro del margen sin
# tocar la clase "Nulo" de P10 (#d8d8d8) ni el beige de P11 (#f2e6c9), que si
# son datos.
WHITE_FLOOR = 244

PLATES = [
    ("p01-areas-verdes",     19, 0, ["01"], "map",    None),
    ("p01-colonias-grafica", 19, 1, ["01"], "figure", None),
    ("veracruz-foto",        21, 0, ["02", "03", "04"], "photo",
     "Veracruz en un viaje de estudio. Foto: Nestor Elihu Arriaga Gallegos"),
    ("p02-carbono",          22, 0, ["02"], "map",    None),
    ("p03-zonas-optimas",    23, 0, ["03"], "map",    None),
    ("p04-uso-optimo",       24, 0, ["04"], "map",    None),
    ("p05-geomorfones",      26, 0, ["05"], "map",    None),
    ("p06-zonas-ecologicas", 27, 0, ["06"], "map",    None),
    ("p07-pendiente",        28, 0, ["07"], "map",    None),
    ("p07-pendiente-grafica", 28, 1, ["07"], "figure", None),
    ("p08-patrones",         29, 0, ["08"], "map",    None),
    ("calvillo-foto",        30, 0, ["12", "13"], "photo",
     "Calvillo, Aguascalientes: mi pueblo natal. Foto: Nestor Elihu Arriaga Gallegos"),
    ("p09-vocaciones",       33, 0, ["09"], "map",    None),
    ("p10-conservacion",     34, 0, ["10"], "map",    None),
    ("p11-agricola",         37, 0, ["11"], "map",    None),
    ("p12-degradacion",      38, 0, ["12"], "map",    None),
    ("p12-suelo-foto",       38, 1, ["12"], "photo",  None),
    ("p13-subcuencas",       39, 0, ["13"], "map",    None),
]


def big_images(doc: fitz.Document, page_no: int):
    """Imagenes grandes de una pagina, en el orden en que la pagina las declara."""
    out = []
    for info in doc[page_no - 1].get_images(full=True):
        xref, _, w, h = info[0], info[1], info[2], info[3]
        if w * h < MIN_PX:
            continue
        out.append((xref, w, h))
    return out


def knockout_white(im: Image.Image) -> Image.Image:
    """Quita el papel blanco y deja el territorio con alfa.

    Se ataca solo el blanco **conectado al borde**, no todo pixel claro del
    bitmap. La diferencia importa: un relleno global tambien vaciaria los
    huecos interiores del mapa —el embalse de P13, los claros de P10— y el
    territorio saldria agujereado. Un relleno por inundacion desde los cuatro
    lados solo alcanza el fondo, porque el contorno impreso lo detiene.

    Los bordes quedan duros, sin el halo gris que deja un umbral simple: los
    pixeles del antialias del contorno no tocan el borde de la imagen y por
    tanto la inundacion no llega a ellos.
    """
    im = im.convert("RGBA")
    w, h = im.size
    px = im.load()

    def is_paper(x: int, y: int) -> bool:
        r, g, b, _ = px[x, y]
        return r >= WHITE_FLOOR and g >= WHITE_FLOOR and b >= WHITE_FLOOR

    stack = []
    for x in range(w):
        stack.append((x, 0))
        stack.append((x, h - 1))
    for y in range(h):
        stack.append((0, y))
        stack.append((w - 1, y))

    seen = bytearray(w * h)
    while stack:
        x, y = stack.pop()
        i = y * w + x
        if seen[i] or not is_paper(x, y):
            continue
        seen[i] = 1
        px[x, y] = (255, 255, 255, 0)
        if x > 0: stack.append((x - 1, y))
        if x < w - 1: stack.append((x + 1, y))
        if y > 0: stack.append((x, y - 1))
        if y < h - 1: stack.append((x, y + 1))

    # Segunda pasada: bolsas de papel que la inundacion no alcanza.
    #
    # P05, P06 y P08 llevan un marco localizador —dos lineas finas que unen el
    # mapa principal con su inset—. Esas lineas cierran un triangulo de papel
    # que no toca ningun borde, asi que la inundacion se queda fuera y el
    # triangulo sobrevive como una cuna blanca en medio del campo negro.
    #
    # Se borran las bolsas **grandes**: por encima del 0.4 % del bitmap, una
    # region uniformemente blanca es fondo atrapado, no un dato. Los huecos
    # interiores que si son dato —el embalse de P13, los claros de P10— no
    # entran por dos motivos: son mucho mas pequenos y ninguno es blanco puro.
    min_pocket = int(0.004 * w * h)
    for sy in range(0, h, 2):
        for sx in range(0, w, 2):
            i0 = sy * w + sx
            if seen[i0] or not is_paper(sx, sy):
                continue
            pocket = []
            queue = [(sx, sy)]
            seen[i0] = 1
            while queue:
                x, y = queue.pop()
                pocket.append((x, y))
                for nx, ny in ((x - 1, y), (x + 1, y), (x, y - 1), (x, y + 1)):
                    if 0 <= nx < w and 0 <= ny < h:
                        j = ny * w + nx
                        if not seen[j] and is_paper(nx, ny):
                            seen[j] = 1
                            queue.append((nx, ny))
            if len(pocket) >= min_pocket:
                for x, y in pocket:
                    px[x, y] = (255, 255, 255, 0)

    return im.crop(im.getchannel("A").getbbox() or (0, 0, w, h))


def dominant_colors(im: Image.Image, limit: int = 8):
    small = im.copy().convert("RGBA")
    small.thumbnail((220, 220))
    counts: Counter = Counter()
    total = 0
    for r, g, b, a in small.getdata():
        if a < 128:
            continue
        counts[(r >> 3 << 3, g >> 3 << 3, b >> 3 << 3)] += 1
        total += 1
    if not total:
        return []
    return [
        {"hex": "#%02x%02x%02x" % rgb, "share": round(n / total, 4)}
        for rgb, n in counts.most_common(limit)
    ]


def source_plate(slug: str):
    """Devuelve la lamina tal como sale del PDF, ya recortada y con el papel
    quitado si le toca.

    La usa `build_marker_points.py`. Medir los marcadores sobre el WebP emitido
    daba un conjunto incompleto: a 1000 px de ancho el punto mide 16 px y el
    ruido de compresion lo suelda con el marron oscuro del cafe. Sobre el
    bitmap original —2163 px— la separacion es limpia.
    """
    entry = next((p for p in PLATES if p[0] == slug), None)
    if not entry:
        return None
    _, page, index, *_ = entry
    doc = fitz.open(PDF)
    imgs = big_images(doc, page)
    if index >= len(imgs):
        return None
    raw = doc.extract_image(imgs[index][0])
    im = Image.open(io.BytesIO(raw["image"])).convert("RGB")
    crop = CROP.get(slug)
    if crop:
        l, t, cw, ch = crop
        im = im.crop((
            round(l * im.width), round(t * im.height),
            round((l + cw) * im.width), round((t + ch) * im.height),
        ))
    if slug in KNOCKOUT:
        im = knockout_white(im)
    return im


def prune(kept: set) -> None:
    """Borra derivados de ejecuciones anteriores que ya nadie declara.

    Cambiar un recorte cambia el tamano nativo y con el la lista de anchos
    emitidos: al anadir el recorte de P03 su ancho nativo bajo de 2163 a 1499 y
    el `-2000.webp` de la corrida previa se quedo en disco. Un archivo huerfano
    no rompe la pagina —el manifiesto no lo nombra— pero si engana a cualquiera
    que lo abra creyendo que es el activo vigente.
    """
    folder = os.path.join(OUT, "plates")
    for name in os.listdir(folder):
        path = os.path.join(folder, name)
        if os.path.isfile(path) and f"/projects/plates/{name}" not in kept:
            os.remove(path)
            print(f"  huerfano borrado  {name}")


def main() -> None:
    os.makedirs(os.path.join(OUT, "plates"), exist_ok=True)
    doc = fitz.open(PDF)
    entries = []

    for slug, page, index, projects, role, credit in PLATES:
        imgs = big_images(doc, page)
        if index >= len(imgs):
            print(f"  falta   {slug}: p.{page} tiene {len(imgs)} imagenes grandes",
                  file=sys.stderr)
            continue

        xref, w, h = imgs[index]
        raw = doc.extract_image(xref)
        im = Image.open(io.BytesIO(raw["image"])).convert("RGB")

        crop = CROP.get(slug)
        if crop:
            l, t, cw, ch = crop
            im = im.crop((
                round(l * im.width), round(t * im.height),
                round((l + cw) * im.width), round((t + ch) * im.height),
            ))

        knocked = slug in KNOCKOUT
        if knocked:
            im = knockout_white(im)

        # La escalera fija (2000/1000/500) descartaba cualquier ancho mayor que
        # el pedido, asi que una lamina incrustada a 1600 px solo llegaba a
        # 1000: se perdia el 60 % de la resolucion que el PDF si trae. Se anade
        # el ancho nativo como peldano superior cuando cae entre dos escalones.
        # No es reescalado: es la lamina tal como esta dentro del documento.
        escalera = sorted(
            {w for w in WIDTHS if w <= im.width} | ({im.width} if im.width < max(WIDTHS) else set()),
            reverse=True,
        )

        files = {}
        for width in escalera:
            if width > im.width:
                continue
            height = max(1, round(im.height * width / im.width))
            dest = os.path.join(OUT, "plates", f"{slug}-{width}.webp")
            im.resize((width, height), Image.LANCZOS).save(
                dest, "WEBP", quality=86, method=5
            )
            files[str(width)] = f"/projects/plates/{slug}-{width}.webp"
        if not files:
            dest = os.path.join(OUT, "plates", f"{slug}-{im.width}.webp")
            im.save(dest, "WEBP", quality=90, method=5)
            files[str(im.width)] = f"/projects/plates/{slug}-{im.width}.webp"

        entries.append({
            "slug": slug,
            "source": f"Portafolio_Sd.pdf p.{page}",
            "page": page,
            "projects": projects,
            "role": role,
            "credit": credit,
            "crop": crop,
            # `alpha` avisa al componente de que la lámina no trae fondo: se
            # compone sobre el campo del capítulo en vez de recortarse.
            "alpha": knocked,
            "native_px": [im.width, im.height],
            "ratio": round(im.width / im.height, 6),
            "dominant": dominant_colors(im),
            "files": files,
        })
        print(f"  {slug:24s} p.{page:2d} {im.width}x{im.height}")

    prune({f for e in entries for f in e["files"].values()})

    with open(os.path.join(OUT, "plates-manifest.json"), "w") as fh:
        json.dump({"source": "Portafolio_Sd.pdf", "widths": list(WIDTHS),
                   "plates": entries}, fh, indent=1)
    print(f"\n{len(entries)} laminas -> {OUT}/plates-manifest.json")


if __name__ == "__main__":
    main()
