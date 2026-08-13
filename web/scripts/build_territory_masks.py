#!/usr/bin/env python3
"""Fase 1a - Mascaras territoriales desde los shapefiles reales.

Reproyecta cada shapefile a EPSG:6372 (Lambert conica conforme para Mexico) con
ogr2ogr y lo convierte en un SVG de una sola silueta limpia, normalizado a un
viewBox de 1000 unidades de ancho. La proyeccion conica es la correcta para
Mexico: usar lat/lon crudos deformaria el territorio.

Las siluetas resultantes son el insumo de TerritoryMask y de los interludios
tipograficos, donde el territorio se recorta contra el fondo.

Solo lectura sobre las fuentes.
"""
from __future__ import annotations

import json
import os
import re
import subprocess
import sys
import tempfile
import unicodedata

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
SRC_GIS = fuente("GIS_FUENTES", "salidas GIS de los proyectos")
OUT_GEO = os.path.join(ROOT, "public", "atlas", "geo")
OUT_VEC = os.path.join(ROOT, "public", "atlas", "vector")

TARGET_SRS = "EPSG:6372"  # Mexico ITRF2008 / LCC
VIEW_W = 1000.0
# Tolerancia de simplificacion en metros. A 1000 unidades de ancho para un
# estado, 150 m queda muy por debajo de un pixel: no se pierde forma visible.
SIMPLIFY_M = 150


def slugify(name: str) -> str:
    s = unicodedata.normalize("NFKD", name).encode("ascii", "ignore").decode()
    s = re.sub(r"[^A-Za-z0-9]+", "-", s).strip("-").lower()
    return re.sub(r"-{2,}", "-", s)


def find_shapefiles():
    found = []
    for base, _dirs, files in os.walk(SRC_GIS):
        for f in files:
            if f.lower().endswith(".shp"):
                found.append(os.path.join(base, f))
    return sorted(found)


def to_geojson(shp: str, dest: str, tmp: str) -> dict:
    """Reproyecta y luego simplifica, en ese orden y en dos pasadas.

    ogr2ogr aplica -simplify en las unidades del origen, no en las del destino.
    Combinarlo con -t_srs en una sola llamada colapsa a su caja cualquier fuente
    en grados: una tolerancia de 150 grados se come el poligono entero. Por eso
    se reproyecta primero a metros y se simplifica despues.
    """
    stem = os.path.splitext(os.path.basename(dest))[0]
    projected = os.path.join(tmp, f"{stem}-proj.geojson")
    for path in (projected, dest):
        if os.path.exists(path):
            os.remove(path)

    subprocess.run(["ogr2ogr", "-f", "GeoJSON", "-t_srs", TARGET_SRS, projected, shp],
                   check=True, capture_output=True)
    subprocess.run(["ogr2ogr", "-f", "GeoJSON", "-simplify", str(SIMPLIFY_M),
                    dest, projected],
                   check=True, capture_output=True)
    with open(dest, encoding="utf-8") as fh:
        return json.load(fh)


def rings_of(geom: dict):
    """Devuelve todos los anillos de un Polygon o MultiPolygon."""
    t = geom.get("type")
    if t == "Polygon":
        return list(geom["coordinates"])
    if t == "MultiPolygon":
        return [ring for poly in geom["coordinates"] for ring in poly]
    return []


def build_svg(geojson: dict, title: str):
    rings = []
    for feat in geojson.get("features", []):
        rings.extend(rings_of(feat.get("geometry") or {}))
    if not rings:
        return None, None

    xs = [p[0] for r in rings for p in r]
    ys = [p[1] for r in rings for p in r]
    minx, maxx, miny, maxy = min(xs), max(xs), min(ys), max(ys)
    span_x = maxx - minx or 1.0
    span_y = maxy - miny or 1.0
    scale = VIEW_W / span_x
    view_h = round(span_y * scale, 2)

    def pt(p):
        # Y invertida: en SVG crece hacia abajo, en proyeccion hacia el norte.
        return (round((p[0] - minx) * scale, 2),
                round((maxy - p[1]) * scale, 2))

    paths = []
    for ring in rings:
        if len(ring) < 3:
            continue
        d = []
        for i, p in enumerate(ring):
            x, y = pt(p)
            d.append(("M" if i == 0 else "L") + f"{x} {y}")
        paths.append(" ".join(d) + " Z")

    # fill-rule evenodd para que los anillos interiores queden como huecos.
    body = "".join(f'\n  <path d="{d}"/>' for d in paths)
    svg = (
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {VIEW_W:.0f} {view_h}" '
        f'fill="currentColor" fill-rule="evenodd" role="img" aria-label="{title}">'
        f"{body}\n</svg>\n"
    )
    meta = {
        "viewBox": [0, 0, VIEW_W, view_h],
        "rings": len(paths),
        "points": sum(len(r) for r in rings),
        "srs": TARGET_SRS,
        "extent_m": [round(minx, 1), round(miny, 1), round(maxx, 1), round(maxy, 1)],
        "span_km": [round(span_x / 1000, 1), round(span_y / 1000, 1)],
        "simplify_m": SIMPLIFY_M,
    }
    return svg, meta


def main() -> int:
    os.makedirs(OUT_GEO, exist_ok=True)
    os.makedirs(OUT_VEC, exist_ok=True)

    records = []
    with tempfile.TemporaryDirectory() as tmp:
        for shp in find_shapefiles():
            name = os.path.splitext(os.path.basename(shp))[0]
            slug = slugify(name)
            gj_path = os.path.join(OUT_GEO, f"{slug}.geojson")
            try:
                gj = to_geojson(shp, gj_path, tmp)
            except subprocess.CalledProcessError as exc:
                print(f"  FALLO {name}: {exc.stderr.decode()[:160]}")
                records.append({"slug": slug, "source": shp, "error": "ogr2ogr"})
                continue

            svg, meta = build_svg(gj, name)
            if not svg:
                print(f"  vacio {name}")
                continue
            out = os.path.join(OUT_VEC, f"mask-{slug}.svg")
            with open(out, "w", encoding="utf-8") as fh:
                fh.write(svg)
            meta.update({
                "slug": slug,
                "source": os.path.relpath(shp, SRC_GIS),
                "mask": f"/atlas/vector/mask-{slug}.svg",
                "geojson": f"/atlas/geo/{slug}.geojson",
                "svg_bytes": len(svg),
            })
            records.append(meta)
            print(f"  {name:22} {meta['rings']:3d} anillos  {meta['points']:6d} pts  "
                  f"{meta['span_km'][0]:7.1f} x {meta['span_km'][1]:6.1f} km  "
                  f"{len(svg)/1024:7.1f} KB")

    with open(os.path.join(OUT_GEO, "territory-masks.json"), "w", encoding="utf-8") as fh:
        json.dump({"srs": TARGET_SRS, "masks": records}, fh, indent=1, ensure_ascii=False)
    print(f"\n{len(records)} mascaras -> {OUT_VEC}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
