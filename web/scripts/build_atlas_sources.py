#!/usr/bin/env python3
"""Fase 1a - Pipeline de activos del atlas.

Lee (sin modificar) los SVG originales de GRANULAR exportados desde QGIS y los
separa en sus dos naturalezas:

  1. Rasteres incrustados en base64. Vienen partidos en mosaicos de <=2000 px
     que hay que recomponer. Cada grupo de mosaicos que cubre el lienzo una vez
     es una capa logica. Se recompone, se recorta al contenido y se exporta a
     WebP en varias anchuras.
  2. El vector restante: contornos, poligonos tematicos, diagramas. Se limpia
     de rasteres y se guarda como SVG utilizable.

Produce ademas un manifiesto con lo que realmente existe por archivo, que es lo
que determina que laminas se pueden construir sin inventar datos.

Solo lectura sobre las fuentes. Todo lo escrito vive bajo web/public/atlas/.
"""
from __future__ import annotations

import base64
import io
import json
import os
import re
import sys
import time
import unicodedata
from dataclasses import dataclass, field, asdict

from PIL import Image

Image.MAX_IMAGE_PIXELS = None

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC_SVG = (
    "/Users/nestorarriagagallegos/Documents/EPI /GRANULAR/"
    "DISEÑO IMAGEN Y PRESENTACION/B VECTORES SVG AI EPS/EPI CIHEAM/ELEMENTOS"
)
OUT_RASTER = os.path.join(ROOT, "public", "atlas", "raster")
OUT_VECTOR = os.path.join(ROOT, "public", "atlas", "vector")
MANIFEST = os.path.join(ROOT, "public", "atlas", "atlas-manifest.json")

# Anchuras de salida. La mayor sirve para laminas a sangre en 2x; la menor para
# el fallback estatico y el poster de los canvas.
WIDTHS = (2000, 1000, 500)
WEBP_QUALITY = 82
# Por debajo de este alfa un pixel cuenta como vacio al recortar.
ALPHA_FLOOR = 8

IMAGE_TAG_RE = re.compile(rb"<image\b[^>]*?(?:/>|>.*?</image>)", re.S)
ATTR_RE = re.compile(rb'([\w:-]+)\s*=\s*"([^"]*)"')
DATA_URI_RE = re.compile(rb"data:image/(png|jpe?g);base64,\s*([A-Za-z0-9+/=\s]+)")
VIEWBOX_RE = re.compile(rb'viewBox\s*=\s*"([^"]+)"')
SVG_WH_RE = re.compile(rb"<svg\b[^>]*>", re.S)
FILL_RE = re.compile(rb'(?:fill|stroke)\s*[:=]\s*"?\s*(#[0-9a-fA-F]{3,8}|rgb\([^)]*\))')
PATHISH_RE = re.compile(rb"<(path|polygon|polyline|circle|rect|line|ellipse|text)\b")


def slugify(name: str) -> str:
    stem = os.path.splitext(name)[0]
    stem = unicodedata.normalize("NFKD", stem).encode("ascii", "ignore").decode()
    stem = re.sub(r"[^A-Za-z0-9]+", "-", stem).strip("-").lower()
    return re.sub(r"-{2,}", "-", stem) or "sin-nombre"


def parse_len(value: str) -> float:
    """Convierte '1234.5px' o '100%' a float en unidades de usuario."""
    m = re.match(r"^\s*(-?[\d.]+(?:[eE]-?\d+)?)", value or "")
    return float(m.group(1)) if m else 0.0


@dataclass
class Placed:
    """Un <image> con su posicion declarada en el lienzo del SVG."""
    index: int
    x: float
    y: float
    w: float
    h: float
    fmt: str
    payload: bytes

    @property
    def box(self):
        return (self.x, self.y, self.x + self.w, self.y + self.h)


@dataclass
class LayerOut:
    layer: int
    tiles: int
    native_px: list
    trimmed_px: list
    trim_ratio: float
    has_alpha: bool
    mean_saturation: float
    opaque_ratio: float
    role: str
    # Colores que la capa dibuja de verdad, para que la leyenda no mienta.
    dominant: list = field(default_factory=list)
    # Posición de la capa dentro del lienzo comun del archivo, en fracciones
    # [left, top, width, height]. Sin esto, apilar dos capas recortadas de
    # distinto tamano las centra una sobre otra y el mapa miente.
    frame: list = field(default_factory=list)
    files: dict = field(default_factory=dict)


def overlaps(a, b, tol: float = 1.0) -> bool:
    ax0, ay0, ax1, ay1 = a
    bx0, by0, bx1, by1 = b
    return (ax0 < bx1 - tol and bx0 < ax1 - tol
            and ay0 < by1 - tol and by0 < ay1 - tol)


def group_into_layers(placed: list) -> list:
    """Agrupa mosaicos en capas logicas.

    Los mosaicos de una misma capa nunca se solapan; cuando una imagen pisa
    territorio ya cubierto, empieza una capa nueva. Esto reconstruye la pila de
    capas que QGIS aplano al exportar.
    """
    layers = []
    current = []
    for img in placed:
        if any(overlaps(img.box, prev.box) for prev in current):
            layers.append(current)
            current = [img]
        else:
            current.append(img)
    if current:
        layers.append(current)
    return layers


def composite(tiles: list):
    """Recompone los mosaicos de una capa en una sola imagen RGBA.

    Devuelve tambien el rectangulo que ocupa la capa en unidades de usuario del
    SVG, que es el espacio comun a todas las capas del archivo.
    """
    x0 = min(t.x for t in tiles)
    y0 = min(t.y for t in tiles)
    x1 = max(t.x + t.w for t in tiles)
    y1 = max(t.y + t.h for t in tiles)

    # Escala unidades de usuario -> pixeles nativos usando el primer mosaico.
    probe = Image.open(io.BytesIO(tiles[0].payload))
    scale = probe.width / tiles[0].w if tiles[0].w else 1.0
    probe.close()

    cw = max(1, round((x1 - x0) * scale))
    ch = max(1, round((y1 - y0) * scale))
    canvas = Image.new("RGBA", (cw, ch), (0, 0, 0, 0))

    for t in tiles:
        with Image.open(io.BytesIO(t.payload)) as im:
            im = im.convert("RGBA")
            px = round((t.x - x0) * scale)
            py = round((t.y - y0) * scale)
            tw = max(1, round(t.w * scale))
            th = max(1, round(t.h * scale))
            if (im.width, im.height) != (tw, th):
                im = im.resize((tw, th), Image.LANCZOS)
            canvas.alpha_composite(im, (px, py))
    return canvas, (x0, y0, x1, y1), scale


def measure(im):
    """Saturacion, cobertura opaca y colores dominantes de una capa.

    La saturacion distingue base satelital (casi gris) de capa tematica (con
    color categorico). La cobertura distingue una base que llena el lienzo de
    una sobreposicion recortada, y decide si vale la pena una version gris.

    Los colores dominantes existen por una razon concreta: el color de una capa
    rasterizada esta cocido en el pixel y no se puede cambiar desde CSS. Si la
    leyenda declara un acento distinto, la leyenda miente sobre el mapa. Estos
    valores permiten que la clave use el color que el mapa dibuja de verdad.
    """
    small = im.convert("RGBA")
    small.thumbnail((160, 160), Image.LANCZOS)
    rgb = small.convert("RGB")
    alpha = list(small.getchannel("A").getdata())
    sat = list(rgb.convert("HSV").getchannel("S").getdata())
    vals = [s for s, a in zip(sat, alpha) if a > 128]
    saturation = round(sum(vals) / len(vals) / 255, 4) if vals else 0.0
    opaque = round(sum(1 for a in alpha if a > 250) / len(alpha), 4) if alpha else 0.0

    # Se cuentan solo pixeles opacos y con color: los grises del relieve y los
    # bordes semitransparentes no dicen nada de la categoria de la capa.
    buckets: dict = {}
    for (r, g, b), a, s in zip(rgb.getdata(), alpha, sat):
        if a < 200 or s < 60:
            continue
        key = (r // 24, g // 24, b // 24)
        acc = buckets.setdefault(key, [0, 0, 0, 0])
        acc[0] += r
        acc[1] += g
        acc[2] += b
        acc[3] += 1

    top = sorted(buckets.values(), key=lambda v: -v[3])[:4]
    total = sum(v[3] for v in buckets.values()) or 1
    dominant = [
        {
            "hex": "#%02x%02x%02x" % (v[0] // v[3], v[1] // v[3], v[2] // v[3]),
            "share": round(v[3] / total, 3),
        }
        for v in top
    ]
    return saturation, opaque, dominant


def emit(im, slug: str, layer_idx: int, gray: bool) -> dict:
    """Escribe las variantes WebP de una capa y devuelve sus rutas."""
    files = {}
    base = im
    if gray:
        alpha = base.getchannel("A")
        g = base.convert("L")
        base = Image.merge("RGBA", (g, g, g, alpha))

    suffix = "gray" if gray else "color"
    for w in WIDTHS:
        if w > base.width:
            continue
        h = max(1, round(base.height * w / base.width))
        out = base.resize((w, h), Image.LANCZOS)
        name = f"{slug}--l{layer_idx}-{suffix}-{w}.webp"
        out.save(os.path.join(OUT_RASTER, name), "WEBP",
                 quality=WEBP_QUALITY, method=5)
        files[str(w)] = f"/atlas/raster/{name}"
    return files


def strip_rasters(blob: bytes) -> bytes:
    """Elimina los <image> dejando el vector intacto."""
    return IMAGE_TAG_RE.sub(b"", blob)


def vector_stats(blob: bytes) -> dict:
    counts = {}
    for m in PATHISH_RE.finditer(blob):
        tag = m.group(1).decode()
        counts[tag] = counts.get(tag, 0) + 1
    colors = {}
    for m in FILL_RE.finditer(blob):
        c = m.group(1).decode().lower()
        colors[c] = colors.get(c, 0) + 1
    vb = VIEWBOX_RE.search(blob)
    top = SVG_WH_RE.search(blob)
    width = height = None
    if top:
        attrs = dict((k.decode(), v.decode()) for k, v in ATTR_RE.findall(top.group(0)))
        width, height = attrs.get("width"), attrs.get("height")
    return {
        "elements": counts,
        "element_total": sum(counts.values()),
        "colors": dict(sorted(colors.items(), key=lambda kv: -kv[1])[:24]),
        "distinct_colors": len(colors),
        "viewBox": vb.group(1).decode() if vb else None,
        "width": width,
        "height": height,
        "bytes": len(blob),
    }


def process(name: str) -> dict:
    path = os.path.join(SRC_SVG, name)
    slug = slugify(name)
    with open(path, "rb") as fh:
        blob = fh.read()

    record = {
        "source": name,
        "slug": slug,
        "source_bytes": os.path.getsize(path),
        "canvas": None,
        "layers": [],
        "vector": None,
    }

    # --- rasteres -----------------------------------------------------------
    placed = []
    for i, m in enumerate(IMAGE_TAG_RE.finditer(blob)):
        tag = m.group(0)
        attrs = dict((k.decode(), v.decode()) for k, v in ATTR_RE.findall(tag))
        data = DATA_URI_RE.search(tag)
        if not data:
            continue
        payload = base64.b64decode(re.sub(rb"\s", b"", data.group(2)))
        placed.append(Placed(
            index=i,
            x=parse_len(attrs.get("x", "0")),
            y=parse_len(attrs.get("y", "0")),
            w=parse_len(attrs.get("width", "0")),
            h=parse_len(attrs.get("height", "0")),
            fmt=data.group(1).decode(),
            payload=payload,
        ))

    groups = group_into_layers(placed)

    # Lienzo comun del archivo: la union de todas las capas en unidades de
    # usuario del SVG. Es el espacio en el que las capas se registran entre si.
    if groups:
        cx0 = min(t.x for g in groups for t in g)
        cy0 = min(t.y for g in groups for t in g)
        cx1 = max(t.x + t.w for g in groups for t in g)
        cy1 = max(t.y + t.h for g in groups for t in g)
        record["canvas"] = {
            "user_box": [round(cx0, 3), round(cy0, 3), round(cx1, 3), round(cy1, 3)],
            "ratio": round((cx1 - cx0) / (cy1 - cy0), 5) if cy1 > cy0 else None,
        }
    else:
        cx0 = cy0 = cx1 = cy1 = 0.0

    cw = (cx1 - cx0) or 1.0
    ch = (cy1 - cy0) or 1.0

    for li, tiles in enumerate(groups, start=1):
        try:
            canvas, user_box, scale = composite(tiles)
        except Exception as exc:  # una capa rota no debe tumbar el lote
            record["layers"].append({"layer": li, "error": "%s: %s" % (type(exc).__name__, exc)})
            continue

        native = [canvas.width, canvas.height]
        bbox = canvas.getchannel("A").point(lambda a: 255 if a > ALPHA_FLOOR else 0).getbbox()
        has_alpha = bbox is not None and bbox != (0, 0, canvas.width, canvas.height)
        if bbox and bbox != (0, 0, canvas.width, canvas.height):
            canvas = canvas.crop(bbox)
        if canvas.width == 0 or canvas.height == 0:
            record["layers"].append({"layer": li, "error": "capa vacia"})
            continue

        # El recorte al contenido ahorra mucho peso pero mueve el origen de la
        # capa. Se traduce de vuelta a unidades de usuario y de ahi a fracciones
        # del lienzo comun, para poder recolocarla exactamente donde estaba.
        off_x = (bbox[0] / scale) if bbox else 0.0
        off_y = (bbox[1] / scale) if bbox else 0.0
        lx = user_box[0] + off_x
        ly = user_box[1] + off_y
        frame = [
            round((lx - cx0) / cw, 6),
            round((ly - cy0) / ch, 6),
            round((canvas.width / scale) / cw, 6),
            round((canvas.height / scale) / ch, 6),
        ]

        sat, opaque, dominant = measure(canvas)
        out = LayerOut(
            layer=li,
            tiles=len(tiles),
            native_px=native,
            trimmed_px=[canvas.width, canvas.height],
            trim_ratio=round(1 - (canvas.width * canvas.height) / (native[0] * native[1]), 3),
            has_alpha=has_alpha,
            mean_saturation=sat,
            opaque_ratio=opaque,
            role="base" if opaque > 0.9 else "overlay",
            dominant=dominant,
            frame=frame,
            files={},
        )
        out.files["color"] = emit(canvas, slug, li, gray=False)
        # El gris solo sirve para bases que llenan el encuadre y traen color que
        # apagar. Una sobreposicion tematica necesita conservar su categoria.
        if out.role == "base" and sat > 0.06:
            out.files["gray"] = emit(canvas, slug, li, gray=True)
        record["layers"].append(asdict(out))
        canvas.close()

    # --- vector -------------------------------------------------------------
    vec = strip_rasters(blob)
    stats = vector_stats(vec)
    if stats["element_total"] > 0:
        vname = "%s.svg" % slug
        with open(os.path.join(OUT_VECTOR, vname), "wb") as fh:
            fh.write(vec)
        stats["file"] = "/atlas/vector/%s" % vname
    record["vector"] = stats
    return record


def main() -> int:
    os.makedirs(OUT_RASTER, exist_ok=True)
    os.makedirs(OUT_VECTOR, exist_ok=True)

    names = sorted(n for n in os.listdir(SRC_SVG) if n.lower().endswith(".svg"))
    only = sys.argv[1:]
    if only:
        names = [n for n in names if n in only]

    records = []
    t0 = time.time()
    for i, name in enumerate(names, start=1):
        t = time.time()
        try:
            rec = process(name)
        except Exception as exc:
            rec = {"source": name, "slug": slugify(name),
                   "error": "%s: %s" % (type(exc).__name__, exc)}
        rec["seconds"] = round(time.time() - t, 2)
        records.append(rec)
        nl = len([l for l in rec.get("layers", []) if "error" not in l])
        nv = (rec.get("vector") or {}).get("element_total", 0)
        print("[%3d/%d] %-52s capas=%2d vector=%6d %6.2fs"
              % (i, len(names), name[:52], nl, nv, rec["seconds"]), flush=True)

    manifest = {
        "generated": time.strftime("%Y-%m-%dT%H:%M:%S"),
        "source_dir": SRC_SVG,
        "widths": list(WIDTHS),
        "webp_quality": WEBP_QUALITY,
        "files": records,
    }
    with open(MANIFEST, "w", encoding="utf-8") as fh:
        json.dump(manifest, fh, indent=1, ensure_ascii=False)

    print("\nlisto en %.0fs -> %s" % (time.time() - t0, MANIFEST))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
