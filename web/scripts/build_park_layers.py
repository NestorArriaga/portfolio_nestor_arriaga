#!/usr/bin/env python3
"""Capas verificadas de P15 desde PARK CHALLENGE.

Los ocho SVG del proyecto son vectores de verdad —14 884 paths en el maestro,
ningun raster incrustado—, pero **no traen capas**: Illustrator los exporto como
un unico `Capa 1` plano. No hay ids ni data-name que separar.

Lo que si traen es color. Cada dibujo de propuesta esta pintado con exactamente
tres rellenos, y ese relleno *es* la clasificacion del dibujo:

    park_base.svg   #516345 (366)  #839c5e (158)  #fbfcfb (84)
    park2.svg       #546444 (40)   #a4b77c (253)  #fdfdfd (70)

Separar por relleno recupera capas reales del documento, no inventadas. Este
script hace eso y nada mas: reparte los elementos en un SVG por color,
conservando el `viewBox` original de punta a punta.

Conservar el viewBox es lo que permite animarlas: todas las capas de un mismo
archivo comparten lienzo exacto, asi que superponerlas las deja en registro
perfecto y elevarlas 12-28 px no desplaza la geometria.

Que NO hace este script, a proposito:

- **No nombra las capas.** El nombre semantico ("arbolado", "circulacion") se
  decide despues, mirando la separacion renderizada. Aqui solo se registra el
  color y el numero de elementos.
- **No toca parkheat1/2/3.** Sus nombres sugieren calor pero su contenido es
  contexto urbano: modelo de masas construidas, no una variable climatica. Se
  rasterizan enteros y se rotulan por lo que se ve.
- **Un archivo del material de origen queda excluido de la seleccion final.** No
  es un dibujo del proyecto: no aporta ninguna lectura del predio y la direccion
  de arte no admite mapas, datos ni resultados que no procedan del documento.
"""
from __future__ import annotations

import json
import os
import re
import subprocess

from PIL import Image

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
SRC = fuente("PARQUE_FUENTES", "dibujos de Urban Challenge")
OUT = os.path.join(ROOT, "public", "projects", "park")

ELEM_RE = re.compile(r"<(path|polygon|polyline|circle|rect|ellipse|line)\b[^>]*/?>", re.S)
FILL_RE = re.compile(r'fill="([^"]*)"')
VIEWBOX_RE = re.compile(r'viewBox="([^"]+)"')

# Dibujos de propuesta: se separan por relleno.
SPLIT = ["park_base.svg", "park1.svg", "park2.svg", "park4.svg", "parkbase2.svg"]
# Contexto urbano: se rasterizan enteros, sin separar.
WHOLE = ["parkheat1.svg", "parkheat2.svg", "parkheat3.svg"]
MASTER = "diseño_parque_yuc.svg"


def slugify(name: str) -> str:
    stem = os.path.splitext(os.path.basename(name))[0].lower()
    return re.sub(r"[^a-z0-9]+", "-", stem).strip("-")


def read(rel: str) -> str:
    return open(os.path.join(SRC, rel), encoding="utf-8").read()


def split_by_fill(rel: str) -> dict:
    svg = read(rel)
    viewbox = VIEWBOX_RE.search(svg).group(1)
    _, _, vw, vh = (float(v) for v in viewbox.split())

    groups: dict[str, list[str]] = {}
    for m in ELEM_RE.finditer(svg):
        tag = m.group(0)
        fill = FILL_RE.search(tag)
        key = fill.group(1).lower() if fill else "none"
        groups.setdefault(key, []).append(tag)

    slug = slugify(rel)
    layers = []
    for i, (color, tags) in enumerate(
        sorted(groups.items(), key=lambda kv: -len(kv[1]))
    ):
        name = f"{slug}-{i}"
        body = "\n".join(tags)
        out = (
            f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{viewbox}">\n'
            f"{body}\n</svg>\n"
        )
        with open(os.path.join(OUT, f"{name}.svg"), "w") as fh:
            fh.write(out)
        layers.append({
            "name": name,
            "file": f"/projects/park/{name}.svg",
            "color": color,
            "elements": len(tags),
            "bytes": len(out),
        })

    return {
        "slug": slug,
        "source": rel,
        "kind": "split",
        "viewBox": viewbox,
        "ratio": round(vw / vh, 6),
        "layers": layers,
    }


def knockout_white(path: str) -> None:
    """Quita el papel blanco que el propio dibujo trae dentro.

    Rasterizar sin fondo no basta: `parkheat1/2` y la lamina maestra llevan un
    rectangulo blanco pintado como primer elemento, asi que el blanco esta
    *dentro* del SVG y sale opaco igual. Sobre el papel del capitulo eso es un
    recuadro encendido con borde visible.

    Se inunda desde los cuatro lados, como en las laminas del PDF: solo se borra
    el blanco conectado al borde, de modo que los blancos interiores del dibujo
    —cubiertas, pavimentos, claros— se conservan.
    """
    im = Image.open(path).convert("RGBA")
    w, h = im.size
    px = im.load()

    def is_paper(x, y):
        r, g, b, a = px[x, y]
        return a > 0 and r >= 246 and g >= 246 and b >= 246

    stack = [(x, y) for x in range(w) for y in (0, h - 1)]
    stack += [(x, y) for y in range(h) for x in (0, w - 1)]
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

    im.save(path)


def rasterize(rel: str, widths=(1600, 800), background: str | None = None) -> dict:
    """Rasteriza un dibujo entero.

    Sin fondo. Los dibujos estan hechos sobre blanco, y publicarlos con ese
    blanco dentro los convierte en un rectangulo encendido sobre el papel del
    capitulo, con un borde visible donde acaba la imagen. Componerlos con
    `mix-blend-mode: multiply` tampoco vale: la escena animada crea contexto de
    apilamiento y el blend se queda aislado dentro de el, sin fondo contra el
    que multiplicar.

    Con alfa el problema no existe: el papel del capitulo se ve por debajo y el
    dibujo no tiene borde.
    """
    svg = read(rel)
    viewbox = VIEWBOX_RE.search(svg).group(1)
    _, _, vw, vh = (float(v) for v in viewbox.split())
    slug = slugify(rel)

    files = {}
    for w in widths:
        png = os.path.join(OUT, f"{slug}-{w}.png")
        cmd = ["rsvg-convert", "-w", str(w), os.path.join(SRC, rel), "-o", png]
        if background:
            cmd[1:1] = ["-b", background]
        subprocess.run(cmd, check=True)
        knockout_white(png)
        webp = os.path.join(OUT, f"{slug}-{w}.webp")
        # -alpha_q conserva el canal alfa sin engordar el archivo.
        subprocess.run(
            ["cwebp", "-quiet", "-q", "88", "-alpha_q", "100", png, "-o", webp],
            check=False,
        )
        if os.path.exists(webp):
            os.remove(png)
            files[str(w)] = f"/projects/park/{slug}-{w}.webp"
        else:  # sin cwebp, se queda el PNG
            files[str(w)] = f"/projects/park/{slug}-{w}.png"

    return {
        "slug": slug,
        "source": rel,
        "kind": "raster",
        "viewBox": viewbox,
        "ratio": round(vw / vh, 6),
        "files": files,
    }


def main() -> None:
    os.makedirs(OUT, exist_ok=True)
    entries = []

    for rel in SPLIT:
        e = split_by_fill(os.path.join("SVG COLLECTION", rel))
        entries.append(e)
        cols = " ".join(f"{l['color']}:{l['elements']}" for l in e["layers"])
        print(f"  split  {e['slug']:14s} {e['viewBox']:20s} {cols}")

    for rel in WHOLE:
        e = rasterize(os.path.join("SVG COLLECTION", rel))
        entries.append(e)
        print(f"  raster {e['slug']:14s} {e['viewBox']}")

    e = rasterize(MASTER, widths=(2200, 1100))
    entries.append(e)
    print(f"  raster {e['slug']:14s} {e['viewBox']}")

    manifest = os.path.join(OUT, "park-manifest.json")
    with open(manifest, "w") as fh:
        json.dump({"source": SRC, "files": entries}, fh, indent=1)
    print(f"\n{len(entries)} archivos -> {manifest}")


if __name__ == "__main__":
    main()
