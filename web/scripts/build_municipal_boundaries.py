#!/usr/bin/env python3
"""Siluetas municipales de la Comarca Lagunera, en vector real.

Quince municipios, uno por archivo. Todos declaran el mismo
`viewBox="0 0 3507 2480"`, que es también el de las capas ráster de GRANULAR,
pero **eso no significa que estén co-registrados**: cada municipio se exportó
escalado para llenar su propia hoja. Torreón y Tlahualillo ocupan cajas de
tamaño parecido pese a tener superficies muy distintas.

Comprobado renderizando los originales. Superponerlos sobre el mapa de la
Comarca colocaría cada límite donde no está, así que aquí se tratan por lo que
son: siluetas individuales, cada una con su propio encuadre, útiles como índice
municipal y no como capa cartográfica.

Son la única geometría vectorial verdadera del proyecto, así que son lo único
que se puede trazar con `stroke-dashoffset` y colorear con `currentColor`.

El problema es la densidad: el contorno de Torreón trae 2 653 puntos con dos
decimales. Quince municipios así son medio mega de `d` incrustado en el HTML. A
la escala a la que se dibujan, una unidad del viewBox es menos de un tercio de
píxel, así que la mayoría de esos puntos no se distinguen. Se simplifican con
Douglas-Peucker y se redondea la coordenada.

Salida: web/public/atlas/geo/municipios.json
"""
from __future__ import annotations

import json
import math
import os
import re

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
VECTOR_DIR = os.path.join(ROOT, "public", "atlas", "vector")
OUT = os.path.join(ROOT, "public", "atlas", "geo", "municipios.json")

# Tolerancia en unidades del viewBox. A 1000 px de ancho de render, 3507
# unidades caben en 1000 px: 2.5 unidades son 0.7 px. Invisible.
TOLERANCE = 2.5
# Un anillo con menos puntos que esto es un marco o un artefacto, no un límite.
MIN_POINTS = 40

PATH_RE = re.compile(r'<path[^>]*\sd="([^"]+)"')
POINT_RE = re.compile(r"[ML]\s*(-?[\d.]+)[,\s]+(-?[\d.]+)")

# Nombre editorial de cada archivo. El del archivo trae erratas ("Franciso") y
# guiones bajos que no deben llegar a pantalla.
MUNICIPIOS = {
    "torreon": ("Torreón", "Coahuila"),
    "matamoros": ("Matamoros", "Coahuila"),
    "san-pedro": ("San Pedro", "Coahuila"),
    "franciso-i-madero": ("Francisco I. Madero", "Coahuila"),
    "viesca": ("Viesca", "Coahuila"),
    "gomez-palacio": ("Gómez Palacio", "Durango"),
    "lerdo": ("Lerdo", "Durango"),
    "mapimi": ("Mapimí", "Durango"),
    "tlahualillo": ("Tlahualillo", "Durango"),
    "nazas": ("Nazas", "Durango"),
    "cuencame": ("Cuencamé", "Durango"),
    "santa-clara": ("Santa Clara", "Durango"),
    "san-juan-de-guadalupe": ("San Juan de Guadalupe", "Durango"),
    "san-luis-del-cordero": ("San Luis del Cordero", "Durango"),
    "general-simon-bolivar": ("General Simón Bolívar", "Durango"),
}


def perpendicular_distance(p, a, b) -> float:
    (px, py), (ax, ay), (bx, by) = p, a, b
    dx, dy = bx - ax, by - ay
    if dx == 0 and dy == 0:
        return math.hypot(px - ax, py - ay)
    # Proyección del punto sobre el segmento, acotada a sus extremos.
    t = max(0.0, min(1.0, ((px - ax) * dx + (py - ay) * dy) / (dx * dx + dy * dy)))
    return math.hypot(px - (ax + t * dx), py - (ay + t * dy))


def simplify(points, tol: float):
    """Douglas-Peucker iterativo.

    Iterativo y no recursivo a proposito: un anillo de 2 600 puntos casi
    colineales desborda la pila de Python por recursion.
    """
    if len(points) < 3:
        return points

    keep = [False] * len(points)
    keep[0] = keep[-1] = True
    stack = [(0, len(points) - 1)]

    while stack:
        first, last = stack.pop()
        if last <= first + 1:
            continue
        worst, index = 0.0, first
        for i in range(first + 1, last):
            d = perpendicular_distance(points[i], points[first], points[last])
            if d > worst:
                worst, index = d, i
        if worst > tol:
            keep[index] = True
            stack.append((first, index))
            stack.append((index, last))

    return [p for p, k in zip(points, keep) if k]


def parse_rings(svg: str):
    rings = []
    for d in PATH_RE.findall(svg):
        pts = [(float(x), float(y)) for x, y in POINT_RE.findall(d)]
        if len(pts) >= MIN_POINTS:
            rings.append(pts)
    return rings


def to_path(points) -> str:
    if not points:
        return ""
    head = f"M{points[0][0]:.1f} {points[0][1]:.1f}"
    body = "".join(f"L{x:.1f} {y:.1f}" for x, y in points[1:])
    return head + body + "Z"


def centroid(points):
    """Centroide del área por la fórmula del polígono, no la media de vértices:
    con puntos desigualmente repartidos, la media se va hacia el lado denso."""
    a = cx = cy = 0.0
    n = len(points)
    for i in range(n):
        x0, y0 = points[i]
        x1, y1 = points[(i + 1) % n]
        cross = x0 * y1 - x1 * y0
        a += cross
        cx += (x0 + x1) * cross
        cy += (y0 + y1) * cross
    if abs(a) < 1e-9:
        return points[0]
    a *= 0.5
    return (round(cx / (6 * a), 1), round(cy / (6 * a), 1))


def main() -> int:
    out = []
    before = after = 0

    for slug, (name, estado) in MUNICIPIOS.items():
        path = os.path.join(VECTOR_DIR, f"{slug}.svg")
        if not os.path.exists(path):
            print(f"  falta {slug}.svg")
            continue

        svg = open(path, encoding="utf-8", errors="ignore").read()
        rings = parse_rings(svg)
        if not rings:
            print(f"  {slug}: sin anillos utilizables")
            continue

        simplified = [simplify(r, TOLERANCE) for r in rings]
        before += sum(len(r) for r in rings)
        after += sum(len(r) for r in simplified)

        # Encuadre propio: cada silueta se normaliza a su caja, no a la hoja.
        xs = [p[0] for r in simplified for p in r]
        ys = [p[1] for r in simplified for p in r]
        x0, y0, x1, y1 = min(xs), min(ys), max(xs), max(ys)
        pad = max(x1 - x0, y1 - y0) * 0.03

        biggest = max(simplified, key=len)
        cx, cy = centroid(biggest)
        out.append({
            "slug": slug,
            "name": name,
            "estado": estado,
            "paths": [to_path(r) for r in simplified],
            "viewBox": (f"{x0 - pad:.0f} {y0 - pad:.0f} "
                        f"{(x1 - x0) + pad * 2:.0f} {(y1 - y0) + pad * 2:.0f}"),
            "ratio": round((x1 - x0) / (y1 - y0), 4) if y1 > y0 else 1.0,
            "label": [cx, cy],
            "points": sum(len(r) for r in simplified),
        })
        print(f"  {name:24} {len(rings)} anillos  "
              f"{sum(len(r) for r in rings):5d} -> {sum(len(r) for r in simplified):5d} pts")

    data = {
        "note": ("Cada municipio trae su propio viewBox. No están a una escala "
                 "común ni co-registrados con las capas ráster: son siluetas "
                 "individuales exportadas a página completa."),
        "tolerance": TOLERANCE,
        "municipios": sorted(out, key=lambda m: m["name"]),
    }
    os.makedirs(os.path.dirname(OUT), exist_ok=True)
    with open(OUT, "w", encoding="utf-8") as fh:
        json.dump(data, fh, ensure_ascii=False, separators=(",", ":"))

    size = os.path.getsize(OUT) / 1024
    print(f"\n{len(out)} municipios | {before} -> {after} puntos "
          f"({100 - after * 100 // max(before, 1)} % menos) | {size:.0f} KB -> {OUT}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
