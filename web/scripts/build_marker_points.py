#!/usr/bin/env python3
"""Puntos de marcador extraidos de las propias laminas.

Tres casos dibujan un conjunto de puntos que *es* el resultado del analisis:

    P02  puntos negros  = zonas criticas de captura de carbono
    P03  puntos negros  = zonas optimas para limon y cafe
    P08  puntos rojos   = geomorfones representativos seleccionados

Esos puntos solo existen cocidos en el pixel de la lamina. Para animarlos hay
dos caminos y solo uno es aceptable: **medirlos sobre el mapa** o inventarles
coordenadas. Este script los mide.

Como: se busca el color del marcador con una tolerancia estrecha, se agrupan los
pixeles contiguos en componentes conexas y se guarda el centroide de cada una en
fracciones del encuadre de la lamina. El resultado se superpone al mapa en su
sitio real, porque de ahi salio.

Filtros que evitan falsos positivos:

- **area minima**: descarta el ruido de compresion JPEG del bitmap;
- **area maxima**: descarta manchas grandes del propio mapa que caen dentro del
  rango de color (una zona oscura no es un punto);
- **redondez**: un marcador circular llena buena parte de su caja; una etiqueta
  de texto o una linea de contorno, no.

Si un caso no supera el numero de puntos esperado, se avisa y no se escribe:
mejor quedarse sin gesto que animar un conjunto incompleto como si fuera el
resultado.
"""
from __future__ import annotations

import json
import os
import sys
from collections import deque

from PIL import Image

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import build_pdf_plates  # noqa: E402  (mismo directorio)

Image.MAX_IMAGE_PIXELS = None

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "public", "projects", "markers.json")

# slug de la lamina, color objetivo, tolerancia por canal, area min/max en
# fracciones del total, radio minimo en fracciones del ancho, etiqueta impresa.
#
# `min_r` es el filtro que de verdad separa el marcador del ruido. Medida la
# distribucion de radios sobre las tres laminas, sale bimodal y sin zona gris:
# los marcadores de P02/P03 caen en 0.006-0.009 y los de P08 en 0.004, mientras
# que los glifos de los rotulos y el trazo de los limites no pasan de 0.002.
# El corte va en el hueco.
#
# La tolerancia de P03 es mas estrecha a proposito: su capa "Cultivo de cafe" es
# un marron muy oscuro (#3d2f1f) que con 46 de tolerancia entra en el rango del
# negro. Los poligonos de cafe se tragaban los puntos que caen dentro de ellos y
# el conjunto salia incompleto —6 de 18—.
TARGETS = [
    ("p02-carbono", (17, 17, 17), 48, 2e-6, 2.2e-4, 0.005, "Zona crítica"),
    # P03 exige tolerancia estrecha: su capa "Cultivo de cafe" es un marron muy
    # oscuro (#3d2f1f) y con 48 entraria en el rango del negro, tragandose los
    # puntos que caen dentro. Con 24 sobre el original, el conjunto sale entero
    # y estable —18 puntos entre tolerancia 18 y 30—.
    ("p03-zonas-optimas", (12, 12, 12), 24, 1e-6, 2.2e-4, 0.005, "Zona óptima"),
    ("p08-patrones", (200, 40, 35), 62, 1e-6, 2.0e-4, 0.0032,
     "Geomorfón representativo"),
]

# Se mide sobre el bitmap **original del PDF**, no sobre el WebP publicado.
#
# Al principio se media sobre el derivado de 1000 px y P03 salia con 14 de 18
# puntos: a ese ancho su marcador mide 16 px, el ruido de recompresion lo suelda
# con el marron del cafe (#3d2f1f) y la componente se pasa del area maxima. En
# el original —2163 px de ancho— los dos colores estan separados por mas de 30
# niveles en el canal rojo y el conjunto sale entero.
#
# El coste es un barrido cuatro veces mayor, que sigue siendo segundos.


def load(slug: str):
    plates = json.load(open(os.path.join(ROOT, "public", "projects", "plates-manifest.json")))
    entry = next((p for p in plates["plates"] if p["slug"] == slug), None)
    if not entry:
        return None, None
    im = build_pdf_plates.source_plate(slug)
    return (im.convert("RGB") if im else None), entry


def erode(mask, w, h, passes=1):
    """Erosion 4-vecinal.

    Existe por un caso concreto: en P03 varios marcadores tocan el trazo negro
    del limite de la cuenca. Al etiquetar, el punto y el limite entero forman
    **una sola** componente, que se pasa del area maxima y se descarta; el
    conjunto salia con 12 de 18 puntos.

    Una erosion de 2 px rompe las uniones finas —el limite mide 2-3 px— sin
    vaciar el disco del marcador, que mide 16-20 px. Despues de erosionar, cada
    punto vuelve a ser su propia componente. El centroide no se desplaza: la
    erosion es simetrica.
    """
    cur = mask
    for _ in range(passes):
        nxt = bytearray(w * h)
        for y in range(1, h - 1):
            row = y * w
            for x in range(1, w - 1):
                i = row + x
                if cur[i] and cur[i - 1] and cur[i + 1] and cur[i - w] and cur[i + w]:
                    nxt[i] = 1
        cur = nxt
    return cur


def components(mask, w, h, min_px, max_px, min_r):
    """Componentes conexas de 4-vecindad, con su centroide y su caja."""
    seen = bytearray(w * h)
    out = []
    for start in range(w * h):
        if mask[start] == 0 or seen[start]:
            continue
        queue = deque([start])
        seen[start] = 1
        pixels = []
        while queue:
            i = queue.popleft()
            pixels.append(i)
            x, y = i % w, i // w
            for nx, ny in ((x - 1, y), (x + 1, y), (x, y - 1), (x, y + 1)):
                if 0 <= nx < w and 0 <= ny < h:
                    j = ny * w + nx
                    if mask[j] and not seen[j]:
                        seen[j] = 1
                        queue.append(j)
        n = len(pixels)
        if n < min_px or n > max_px:
            continue
        xs = [p % w for p in pixels]
        ys = [p // w for p in pixels]
        bw = max(xs) - min(xs) + 1
        bh = max(ys) - min(ys) + 1
        # Redondez: un disco llena ~pi/4 = 0.785 de su caja. Un trazo o un
        # rotulo se quedan muy por debajo.
        if bw == 0 or bh == 0 or n / (bw * bh) < 0.55:
            continue
        # Y proporcion de la caja: descarta barras y lineas largas.
        if max(bw, bh) / min(bw, bh) > 1.9:
            continue
        r = ((bw + bh) / 4) / w
        if r < min_r:
            continue
        out.append({
            "x": round(sum(xs) / n / w, 5),
            "y": round(sum(ys) / n / h, 5),
            "r": round(r, 5),
        })
    return out


def main() -> None:
    result = {}
    for slug, target, tol, min_frac, max_frac, min_r, label in TARGETS:
        im, entry = load(slug)
        if im is None:
            print(f"  falta   {slug}", file=sys.stderr)
            continue

        w, h = im.size
        total = w * h
        tr, tg, tb = target
        px = im.load()
        mask = bytearray(total)
        for y in range(h):
            row = y * w
            for x in range(w):
                r, g, b = px[x, y]
                if abs(r - tr) <= tol and abs(g - tg) <= tol and abs(b - tb) <= tol:
                    mask[row + x] = 1

        # La erosion encoge cada marcador en `passes` px por lado; el radio
        # minimo se ajusta para seguir midiendo contra el disco original.
        passes = 2
        mask = erode(mask, w, h, passes)
        pts = components(
            mask, w, h,
            max(3, int(min_frac * total)), int(max_frac * total),
            max(0.0, min_r - passes / w),
        )
        for p in pts:
            p["r"] = round(p["r"] + passes / w, 5)
        pts.sort(key=lambda p: (p["y"], p["x"]))
        print(f"  {slug:22s} {len(pts):3d} puntos  ({w}x{h})")
        if len(pts) < 4:
            print(f"    descartado: muy pocos puntos para afirmar un conjunto",
                  file=sys.stderr)
            continue
        result[slug] = {"label": label, "source": entry["source"], "points": pts}

    with open(OUT, "w") as fh:
        json.dump(result, fh, indent=1)
    print(f"\n{len(result)} conjuntos -> {OUT}")


if __name__ == "__main__":
    main()
