#!/usr/bin/env python3
"""Recortes de detalle de GRANULAR para la columna de insets.

Toma las imágenes que el pipeline anterior extrajo de las páginas 21-40 del PDF
y las reduce al tamaño en que se muestran. Vienen a 2000-3507 px y entre 0.9 y
2.4 MB cada una; en pantalla ocupan unos 200 px.

Sobre los conectores. La referencia de lámina con insets une cada recorte con su
punto en el mapa mediante una línea fina. Aqui no se dibuja ninguna: el
inventario registra pagina, dimension, escala y tipo de cada activo, pero no su
posicion dentro del mapa. Una linea trazada a un punto elegido a ojo afirmaria
que el detalle esta ahi, y eso no consta en ninguna parte. Se presentan como
columna de detalles, que es lo que la fuente respalda.

Salida: web/public/atlas/insets/ + insets.json
"""
from __future__ import annotations

import json
import os
import re

from PIL import Image

Image.MAX_IMAGE_PIXELS = None

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(os.path.dirname(ROOT), "web-v2", "public", "portfolio-media")
EXTRACTED = os.path.join(SRC, "extracted")
INVENTORY = os.path.join(SRC, "audit", "block-15", "granular-visual-inventory.json")
OUT_DIR = os.path.join(ROOT, "public", "atlas", "insets")
OUT_JSON = os.path.join(ROOT, "public", "atlas", "insets.json")

WIDTHS = (600, 300)
QUALITY = 80
PAGE_RE = re.compile(r"^p(\d{3})-")

# Paginas de GRANULAR en el PDF.
FIRST_PAGE, LAST_PAGE = 21, 40

# La lamina de un pilar solo muestra recortes de sus propias paginas.
DIMENSION_LABEL = {
    "water": "agua",
    "agriculture": "agropecuario",
    "governance": "gobernanza",
    "socioeconomy": "socioeconomia",
    "environment": "ambiente",
    "connectivity": "conectividad",
    "clustering": "clustering",
    "overview": "overview",
    "synthesis": "sintesis",
}


def load_page_meta():
    """Mapa pagina -> dimension desde el inventario.

    El inventario describe la pagina, no cada recorte: la primera entrada de la
    pagina 34 es su portada de capitulo, y heredarla haria que los cinco
    detalles de esa pagina se rotularan "chapter cover". Solo se conserva la
    dimension, que si es de la pagina entera y por tanto de todos sus recortes.
    """
    if not os.path.exists(INVENTORY):
        return {}
    data = json.load(open(INVENTORY, encoding="utf-8"))
    meta = {}
    for item in data.get("inventory", []):
        page = item.get("page")
        if page is None or page in meta:
            continue
        meta[page] = {
            "dimension": DIMENSION_LABEL.get(item.get("dimension", ""), item.get("dimension", "")),
        }
    return meta


def main() -> int:
    os.makedirs(OUT_DIR, exist_ok=True)
    meta = load_page_meta()
    if not os.path.isdir(EXTRACTED):
        print(f"No existe {EXTRACTED}")
        return 1

    records = []
    for name in sorted(os.listdir(EXTRACTED)):
        m = PAGE_RE.match(name)
        if not m or not name.endswith(".webp"):
            continue
        page = int(m.group(1))
        if not (FIRST_PAGE <= page <= LAST_PAGE):
            continue

        slug = os.path.splitext(name)[0].replace("project-project-14", "p14")
        src = os.path.join(EXTRACTED, name)

        with Image.open(src) as im:
            im = im.convert("RGB")
            native = [im.width, im.height]
            files = {}
            for w in WIDTHS:
                if w > im.width:
                    continue
                h = max(1, round(im.height * w / im.width))
                out = im.resize((w, h), Image.LANCZOS)
                fname = f"{slug}-{w}.webp"
                out.save(os.path.join(OUT_DIR, fname), "WEBP", quality=QUALITY, method=5)
                files[str(w)] = f"/atlas/insets/{fname}"

        if not files:
            continue

        info = meta.get(page, {})
        records.append({
            "slug": slug,
            "page": page,
            "dimension": info.get("dimension"),
            "native_px": native,
            "ratio": round(native[0] / native[1], 4),
            "files": files,
        })
        print(f"  p.{page:02d} {slug[:44]:44} {native[0]}x{native[1]} -> {len(files)} tamaños")

    with open(OUT_JSON, "w", encoding="utf-8") as fh:
        json.dump({
            "note": ("Recortes reales de las paginas 21-40. El inventario no "
                     "registra su posicion dentro del mapa, asi que no se "
                     "dibujan conectores: seria afirmar una ubicacion que no "
                     "consta."),
            "insets": records,
        }, fh, ensure_ascii=False, separators=(",", ":"))

    size = sum(os.path.getsize(os.path.join(OUT_DIR, f))
               for f in os.listdir(OUT_DIR)) / 1024 / 1024
    print(f"\n{len(records)} recortes | {size:.1f} MB -> {OUT_DIR}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
