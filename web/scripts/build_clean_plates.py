"""Derivados limpios de P05, P06 y P07.

Tres laminas del PDF traen, dentro del mismo archivo, elementos que no son el
mapa: lineas guia diagonales y un inset periferico. En la web y en el PDF esas
lineas aparecen como si fueran decisiones del sistema nuevo —cruzan la apertura,
compiten con el atlas de detalles y reaparecen en cada capitulo— cuando en
realidad pertenecen a la composicion original de la pagina impresa.

Este script separa, sin redibujar nada:

- `*-clean`  el mapa de datos, recortado a la caja que ocupan sus pixeles.
- `*-inset`  el detalle periferico, cuando existe y tiene datos propios.

Las cajas no se eligen a ojo: salen de barrer el raster y quedarse con las
componentes conexas de pixeles **saturados**, que es lo que distingue el dato
cartografico de un trazo negro de guia. Se conservan los pixeles originales: no
hay reescalado hacia arriba, ni filtros, ni reconstruccion.
"""

import json
import os
import glob

from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PLATES = os.path.join(ROOT, "public", "projects", "plates")

# Cajas medidas por componentes conexas de pixeles saturados, en fracciones del
# archivo de mayor resolucion. Se aplica un margen de seguridad para no cortar
# el borde exterior del dato.
MARGEN = 0.012

RECORTES = {
    "p05-geomorfones": {
        "clean": (0.2100, 0.0000, 0.7900, 0.7000),
        # La pieza pequena de abajo a la izquierda es la misma reserva a menor
        # escala: la lamina original la une al mapa grande con dos diagonales
        # para decir «esto se amplia aqui». Extraida como pieza propia sirve de
        # localizador, y la relacion la dibuja la interfaz en vez de una linea
        # heredada que cruza la composicion.
        "locator": (0.0000, 0.8381, 0.1800, 0.1619),
    },
    "p06-zonas-ecologicas": {
        # 0.625 y no 0.922: la caja ancha venia de la componente que **incluye**
        # la diagonal, porque la linea toca el mapa. La de pixeles saturados se
        # detiene donde termina el dato.
        "clean": (0.0000, 0.1324, 0.6250, 0.8603),
    },
    "p07-pendiente": {
        "clean": (0.0000, 0.1340, 0.9600, 0.8612),
    },
}

WIDTHS = (2000, 1000, 500)


def mayor(slug):
    anchos = [
        int(f.rsplit("-", 1)[1].split(".")[0])
        for f in glob.glob(os.path.join(PLATES, f"{slug}-*.webp"))
        if "-clean" not in f and "-inset" not in f
    ]
    return max(anchos) if anchos else None


def mascaras_derivadas(slug, hijo, caja):
    """Recorta las mascaras de clase con la misma caja que la lamina.

    Las mascaras se generaron sobre el archivo original. Si la lamina pasa a ser
    un recorte y las mascaras no, el aislamiento de una clase queda desplazado:
    el color aparece junto a su territorio y no encima. Se recortan con la misma
    transformacion, que es la unica forma de que sigan coincidiendo pixel a
    pixel.
    """
    ruta = os.path.join(ROOT, "public", "projects", "masks-manifest.json")
    with open(ruta) as fh:
        man = json.load(fh)

    origen = next((l for l in man["laminas"] if l["slug"] == slug), None)
    if not origen:
        return man, None

    x, y, w, h = caja
    nuevas = []
    for cl in origen["clases"]:
        f = os.path.join(ROOT, "public", cl["file"].lstrip("/"))
        if not os.path.exists(f):
            continue
        m = Image.open(f).convert("RGBA")
        x0 = max(0, round((x - MARGEN) * m.width))
        y0 = max(0, round((y - MARGEN) * m.height))
        x1 = min(m.width, round((x + w + MARGEN) * m.width))
        y1 = min(m.height, round((y + h + MARGEN) * m.height))
        corte = m.crop((x0, y0, x1, y1))
        nombre = os.path.basename(cl["file"]).replace(slug, hijo, 1)
        corte.save(os.path.join(ROOT, "public", "projects", "masks", nombre), "WEBP",
                   quality=88, method=5)
        nuevas.append({**cl, "file": f"/projects/masks/{nombre}"})

    if not nuevas:
        return man, None

    entrada = {"slug": hijo, "px": list(origen["px"]), "clases": nuevas}
    man["laminas"] = [l for l in man["laminas"] if l["slug"] != hijo] + [entrada]
    with open(ruta, "w") as fh:
        json.dump(man, fh, indent=1)
    return man, len(nuevas)


def main():
    salida = []

    for slug, cortes in RECORTES.items():
        ancho = mayor(slug)
        if not ancho:
            print(f"  {slug}: sin archivo base")
            continue
        base = Image.open(os.path.join(PLATES, f"{slug}-{ancho}.webp")).convert("RGBA")

        for nombre, (x, y, w, h) in cortes.items():
            x0 = max(0, round((x - MARGEN) * base.width))
            y0 = max(0, round((y - MARGEN) * base.height))
            x1 = min(base.width, round((x + w + MARGEN) * base.width))
            y1 = min(base.height, round((y + h + MARGEN) * base.height))
            corte = base.crop((x0, y0, x1, y1))

            hijo = f"{slug}-{nombre}"
            files = {}
            # Se emite el ancho nativo del recorte y los escalones menores. Nunca
            # un ancho mayor que el recorte: seria reescalar hacia arriba.
            escalera = sorted({w2 for w2 in WIDTHS if w2 < corte.width} | {corte.width},
                              reverse=True)
            for w2 in escalera:
                h2 = max(1, round(corte.height * w2 / corte.width))
                dest = os.path.join(PLATES, f"{hijo}-{w2}.webp")
                (corte if w2 == corte.width else corte.resize((w2, h2), Image.LANCZOS)).save(
                    dest, "WEBP", quality=88, method=5
                )
                files[str(w2)] = f"/projects/plates/{hijo}-{w2}.webp"

            salida.append({
                "slug": hijo,
                "source": f"{slug} (recorte medido por componentes saturadas)",
                "crop": [x, y, w, h],
                "native_px": [corte.width, corte.height],
                "ratio": round(corte.width / corte.height, 6),
                "files": files,
            })
            if nombre == "clean":
                _, n = mascaras_derivadas(slug, hijo, (x, y, w, h))
                if n:
                    print(f"  {hijo:34} {corte.width}x{corte.height}  + {n} mascaras")
                    continue
            print(f"  {hijo:34} {corte.width}x{corte.height}")

    with open(os.path.join(ROOT, "public", "projects", "clean-manifest.json"), "w") as fh:
        json.dump({"source": "derivados limpios de laminas con guias e insets",
                   "derivados": salida}, fh, indent=1)
    print(f"\n{len(salida)} derivados -> clean-manifest.json")


if __name__ == "__main__":
    main()
