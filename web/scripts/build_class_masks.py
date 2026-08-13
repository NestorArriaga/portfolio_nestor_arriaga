"""Mascaras por clase de leyenda, derivadas del propio raster.

Las laminas del PDF llegan como una sola imagen: no traen capas separadas, asi
que una leyenda "que activa una clase" no podia destacar nada real. Lo que si
existe es el color impreso de cada clase, ya medido contra el PDF y guardado en
`src/content/cases.ts`.

Este script recorre cada lamina y, para cada color de su leyenda, escribe una
mascara donde son opacos los pixeles que estan dentro de una tolerancia de ese
color. No inventa una segmentacion: reproduce la que el propio mapa dibujo.

Reglas de honestidad:

- Si una clase cubre menos del 0.008 % de la lamina no se escribe: por debajo
  de eso son pixeles sueltos del antialias, no una zona. El umbral estuvo en
  0.15 % y descartaba clases pequenas pero reales —la Zona Templada Humeda de
  P06 o el intervalo 0-10 % de P07—, y la leyenda prometia siete clases
  mostrando cuatro.
- Si cubre mas del 70 % tampoco: ese color es el fondo del mapa, no una clase.
- Las clases marcadas `kind: 'node'` en el contenido son puntos, no areas, y se
  saltan.

La salida va a `public/projects/masks/` con su propio manifiesto.
"""

import json
import os
import re

from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PUBLIC = os.path.join(ROOT, "public")
PLATES = os.path.join(PUBLIC, "projects", "plates")
OUT = os.path.join(PUBLIC, "projects", "masks")

# Distancia euclidea maxima en RGB para considerar que un pixel es de la clase.
# 46 sale de probar: por debajo se pierden las tramas suaves del mapa y por
# encima empiezan a mezclarse clases contiguas de la misma familia de color.
TOLERANCIA = 46

MIN_COBERTURA = 0.00008
MAX_COBERTURA = 0.70


def legendas():
    """Lee las leyendas del contenido. La fuente de verdad sigue siendo el TS."""
    src = open(os.path.join(ROOT, "src", "content", "cases.ts")).read()
    salida = {}
    # Cada caso se declara como `const pNN: Case = { ... }`, no como elemento
    # de un array literal. Cortar por esa cabecera es lo unico que separa de
    # verdad un proyecto del siguiente; la version anterior dejaba el bloque
    # abierto hasta el final del archivo y le colgaba a P01 las quince leyendas.
    trozos = re.split(r"\nconst p\d+: Case = \{", src)
    for trozo in trozos[1:]:
        m = re.search(r"artifact:\s*'([^']+)'", trozo)
        if not m:
            continue
        slug, cuerpo = m.group(1), trozo
        claves = []
        for k in re.finditer(
            r"\{\s*label:\s*'([^']+)',\s*color:\s*'(#[0-9a-fA-F]{6})'([^}]*)\}", cuerpo
        ):
            if "kind: 'node'" in k.group(3):
                continue
            claves.append((k.group(1), k.group(2)))
        if claves:
            salida[slug] = claves
    return salida


def rgb(hex_):
    n = int(hex_.lstrip("#"), 16)
    return ((n >> 16) & 255, (n >> 8) & 255, n & 255)


def mayor(slug):
    """La lamina mas grande que exista para ese slug."""
    anchos = []
    for f in os.listdir(PLATES):
        m = re.match(rf"^{re.escape(slug)}-(\d+)\.webp$", f)
        if m:
            anchos.append(int(m.group(1)))
    return max(anchos) if anchos else None


def main():
    os.makedirs(OUT, exist_ok=True)
    entradas = []

    for slug, claves in sorted(legendas().items()):
        ancho = mayor(slug)
        if not ancho:
            continue
        im = Image.open(os.path.join(PLATES, f"{slug}-{ancho}.webp")).convert("RGBA")
        # Se trabaja a 900 px: la mascara se compone encima de la lamina y no
        # necesita mas resolucion que la que el ojo distingue en el borde.
        w = min(900, im.width)
        im = im.resize((w, max(1, round(im.height * w / im.width))), Image.LANCZOS)
        px = im.load()
        total = im.width * im.height

        salida = []
        for etiqueta, color in claves:
            cr, cg, cb = rgb(color)
            mask = Image.new("L", im.size, 0)
            mp = mask.load()
            n = 0
            for y in range(im.height):
                for x in range(im.width):
                    r, g, b, a = px[x, y]
                    if a < 40:
                        continue
                    d = (r - cr) ** 2 + (g - cg) ** 2 + (b - cb) ** 2
                    if d <= TOLERANCIA * TOLERANCIA:
                        mp[x, y] = 255
                        n += 1
            cob = n / total
            if cob < MIN_COBERTURA or cob > MAX_COBERTURA:
                print(f"  {slug:22s} {etiqueta:28s} cobertura {cob:.4f} -> descartada")
                continue

            nombre = re.sub(r"[^a-z0-9]+", "-", etiqueta.lower()).strip("-")
            archivo = f"{slug}--{nombre}.webp"
            # La mascara se guarda como alfa puro sobre negro: el componente le
            # pone el color, asi que no hay color duplicado en dos sitios.
            capa = Image.new("RGBA", im.size, (255, 255, 255, 0))
            capa.putalpha(mask)
            capa.save(os.path.join(OUT, archivo), "WEBP", quality=82, method=5)
            salida.append({"label": etiqueta, "color": color,
                           "file": f"/projects/masks/{archivo}",
                           "cobertura": round(cob, 4)})
            print(f"  {slug:22s} {etiqueta:28s} cobertura {cob:.4f} -> {archivo}")

        if salida:
            entradas.append({"slug": slug, "px": [im.width, im.height], "clases": salida})

    with open(os.path.join(PUBLIC, "projects", "masks-manifest.json"), "w") as fh:
        json.dump({"source": "laminas del PDF, color-keying por leyenda",
                   "tolerancia": TOLERANCIA, "laminas": entradas}, fh, indent=1)
    print(f"\n{len(entradas)} laminas con clases -> masks-manifest.json")


if __name__ == "__main__":
    main()
