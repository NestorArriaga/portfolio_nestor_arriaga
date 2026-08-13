#!/usr/bin/env python3
"""Interludio del rostro territorial — P13 → P14.

Cuatro archivos, cuatro problemas distintos:

    rostro.svg            92 KB   715 paths negros sueltos, A4 vertical
    hh}.svg               15 MB   raster base64 incrustado
    hill.svg              25 MB   raster base64 incrustado
    hillshade_base.svg    21 MB   raster base64 incrustado

Los tres pesados **no** se pueden enviar al navegador y ya estaban recuperados:
`build_atlas_sources.py` los procesó en su día y dejó su raster extraído en
WebP a 2000/1000/500 dentro de `atlas-manifest.json`. Este script no vuelve a
extraerlos —sería recomprimir lo ya comprimido—: los localiza, comprueba su
registro y publica el conjunto con su procedencia.

Lo que sí produce:

1. **Registro real entre bases.** Cada archivo tiene su propio `canvas`, que
   desborda la página A4 en una cantidad distinta: hill la desborda 4 px por la
   izquierda y hillshade 102 px. Superponerlas por su caja recortada las
   centraría una sobre otra y el relieve no coincidiría con el sombreado. Aquí
   cada capa se sitúa dentro de la **página A4 compartida** (0 0 2480 3507),
   que es el único sistema que las cinco comparten de verdad.

2. **Máscara agrupada.** Los 715 paths se reparten en seis bandas por su
   centroide vertical. La coreografía pide que los trazos entren en grupos y no
   los 715 a la vez; con seis grupos hacen falta seis transiciones en vez de
   715 listeners.

3. **Grupo de perfil.** Los paths de mayor superficie —los que dibujan el
   perfil— se marcan aparte para que la línea que llega de P13 pueda trazarlos
   primero.

Los originales no se tocan: se leen y se copian a `_trabajo/`.
"""
from __future__ import annotations

import json
import os
import re
import shutil
import sys

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
SRC = fuente("ATLAS_FUENTES_SVG", "vectores del rostro territorial")
WORK = os.path.join(ROOT, "..", "_trabajo-rostro")
OUT = os.path.join(ROOT, "public", "projects", "rostro")

# Página A4 a 300 dpi. Es el lienzo que los cinco archivos comparten.
PAGE_W, PAGE_H = 2480.0, 3507.0

ORIGINALS = ["rostro.svg", "hh}.svg", "hill.svg", "hillshade_base.svg",
             "satelite_base_rostro.svg"]

# slug en atlas-manifest -> papel en la escena
BASES = {
    "hillshade-base": "sombra",
    "hill": "relieve",
    "satelite-base-rostro": "satelite",
    "hh": "atmosfera",
}

NUM = re.compile(r"-?\d*\.?\d+(?:e-?\d+)?")


def copy_originals() -> list[str]:
    """Copias de trabajo. Los originales quedan intactos."""
    os.makedirs(WORK, exist_ok=True)
    done = []
    for name in ORIGINALS:
        src = os.path.join(SRC, name)
        if not os.path.exists(src):
            print(f"  falta   {name}", file=sys.stderr)
            continue
        dst = os.path.join(WORK, name.replace("}", "_cierre"))
        if not os.path.exists(dst) or os.path.getsize(dst) != os.path.getsize(src):
            shutil.copy2(src, dst)
        done.append(name)
    return done


def path_bbox(d: str):
    """Caja aproximada de un path.

    Se toman todos los números del `d` como pares x,y. Es aproximado —ignora
    que en una curva los puntos de control quedan fuera del trazo— y no importa:
    solo sirve para repartir los paths en bandas y ordenarlos por tamaño, no
    para dibujar nada.
    """
    n = [float(v) for v in NUM.findall(d)]
    if len(n) < 2:
        return None
    xs, ys = n[0::2], n[1::2]
    # Los comandos relativos hacen que los valores crudos no sean absolutos;
    # se acumulan para tener una posición aproximada real.
    ax = ay = 0.0
    axs, ays = [], []
    for x, y in zip(xs, ys):
        ax += x
        ay += y
        axs.append(ax)
        ays.append(ay)
    return min(axs), min(ays), max(axs), max(ays)


def build_mask(svg: str) -> dict:
    """Reparte los paths en bandas y marca el grupo de perfil."""
    viewbox = re.search(r'viewBox="([^"]+)"', svg).group(1)
    _, _, vw, vh = (float(v) for v in viewbox.split())

    paths = re.findall(r'<path[^>]*\sd="([^"]+)"', svg)
    items = []
    for d in paths:
        bb = path_bbox(d)
        if not bb:
            continue
        x0, y0, x1, y1 = bb
        cy = (y0 + y1) / 2
        area = max(1e-6, (x1 - x0) * (y1 - y0))
        items.append({"d": d, "cy": cy, "area": area})

    if not items:
        return {}

    # Perfil: los trazos de mayor superficie. Son los que dibujan la cara; el
    # resto es textura de pincel.
    order = sorted(items, key=lambda p: -p["area"])
    perfil = {id(p) for p in order[: max(6, len(order) // 24)]}

    lo = min(p["cy"] for p in items)
    hi = max(p["cy"] for p in items)
    span = max(1e-6, hi - lo)
    BANDS = 6

    groups: dict[int, list[str]] = {i: [] for i in range(BANDS)}
    perfil_d: list[str] = []
    for p in items:
        if id(p) in perfil:
            perfil_d.append(p["d"])
            continue
        b = min(BANDS - 1, int((p["cy"] - lo) / span * BANDS))
        groups[b].append(p["d"])

    def g(ds: list[str], name: str) -> str:
        body = "".join(f'<path d="{d}"/>' for d in ds)
        return f'<g id="{name}">{body}</g>'

    body = g(perfil_d, "perfil") + "".join(
        g(groups[i], f"banda{i}") for i in range(BANDS) if groups[i]
    )
    svg_out = (
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{viewbox}" '
        f'fill="currentColor">{body}</svg>'
    )

    dest = os.path.join(OUT, "rostro-trazos.svg")
    with open(dest, "w") as fh:
        fh.write(svg_out)

    return {
        "file": "/projects/rostro/rostro-trazos.svg",
        "viewBox": viewbox,
        "ratio": round(vw / vh, 6),
        "paths": len(items),
        "perfil": len(perfil_d),
        "bandas": [len(groups[i]) for i in range(BANDS) if groups[i]],
        "bytes": len(svg_out),
    }


def register(atlas: dict) -> list[dict]:
    """Sitúa cada base dentro de la página A4 compartida."""
    out = []
    for f in atlas["files"]:
        role = BASES.get(f["slug"])
        if not role:
            continue
        canvas = f.get("canvas") or {}
        box = canvas.get("user_box")
        if not box:
            continue
        x0, y0, x1, y1 = box
        cw, ch = x1 - x0, y1 - y0

        for layer in f["layers"]:
            if "error" in layer:
                continue
            fr = layer.get("frame") or [0, 0, 1, 1]
            # Rectángulo de la capa en unidades de la página.
            lx = x0 + fr[0] * cw
            ly = y0 + fr[1] * ch
            lw = fr[2] * cw
            lh = fr[3] * ch
            files = (layer.get("files") or {}).get("color") or {}
            if not files:
                continue
            out.append({
                "role": role,
                "slug": f["slug"],
                "source": f["source"],
                "layer": layer["layer"],
                # Fracciones de la página A4. Es lo que el componente usa para
                # colocarlas sin estirar ninguna.
                "frame": [round(lx / PAGE_W, 6), round(ly / PAGE_H, 6),
                          round(lw / PAGE_W, 6), round(lh / PAGE_H, 6)],
                "px": layer["trimmed_px"],
                "files": files,
            })
    return out


def main() -> None:
    os.makedirs(OUT, exist_ok=True)
    copied = copy_originals()
    print(f"  copias de trabajo: {len(copied)} -> {os.path.normpath(WORK)}")

    atlas = json.load(open(os.path.join(ROOT, "public", "atlas", "atlas-manifest.json")))

    rostro_file = next((f for f in atlas["files"] if f["slug"] == "rostro"), None)
    svg = open(os.path.join(SRC, "rostro.svg"), encoding="utf-8").read()
    mask = build_mask(svg)
    print(f"  trazos   {mask['paths']} paths -> perfil {mask['perfil']} + bandas {mask['bandas']}"
          f"  ({mask['bytes']/1024:.0f} KB)")

    bases = register(atlas)
    for b in bases:
        print(f"  base     {b['role']:9s} {b['slug']:22s} frame={b['frame']}")

    # Raster del propio rostro, por si hace falta un fallback estático.
    rostro_raster = None
    if rostro_file:
        for l in rostro_file["layers"]:
            if "error" in l:
                continue
            rostro_raster = (l.get("files") or {}).get("color")

    manifest = {
        "pagina": {"width": PAGE_W, "height": PAGE_H, "ratio": round(PAGE_W / PAGE_H, 6)},
        "origen": SRC,
        "trabajo": os.path.normpath(WORK),
        "trazos": mask,
        "rostroRaster": rostro_raster,
        "bases": bases,
    }
    dest = os.path.join(OUT, "rostro-manifest.json")
    with open(dest, "w") as fh:
        json.dump(manifest, fh, indent=1)
    print(f"\n  manifiesto -> {dest}")


if __name__ == "__main__":
    main()
