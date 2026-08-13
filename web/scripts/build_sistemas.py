"""Derivados publicables de las capturas del capitulo SISTEMAS.

Las capturas nacen fuera del portafolio: son pantallas reales de cinco
aplicaciones propias. Este script hace lo unico que debe entrar al repositorio
publico —imagenes optimizadas y un manifiesto neutral— y deja fuera lo demas.

Reglas que impone:

- No se amplia ninguna captura. La escalera de anchos se recorta al ancho nativo
  del archivo, porque una interfaz ampliada se lee blanda a DPR 2 y en el PDF.
- Cuando una captura trae dentro de su interfaz un rotulo que no debe publicarse,
  la fuente declara un `recorte` en fracciones del archivo. Es un recorte
  editorial: deja fuera esa zona y conserva la lectura —mapa, indices, parcela,
  prescripcion, resultado—. No se tapa con un parche ni se desenfoca, porque un
  parche sobre una interfaz real la convierte en una interfaz falsa.
- Se convierte a sRGB explicito. Un perfil raro viaja distinto en pantalla y en
  papel.
- El manifiesto publicado no lleva rutas locales: nombra proyecto, pantalla,
  estado y credito. La procedencia con rutas vive en el archivo de trabajo,
  fuera del repositorio, y se pasa por argumento.

    SISTEMAS_FUENTES=<ruta/sistemas-fuentes.json> npm run sistemas

La ruta apunta al archivo de trabajo local, fuera del repositorio: ahi viven los
originales y su procedencia. El repositorio publica solo los derivados y el
manifiesto neutral que sale de aqui.
"""

import argparse
import json
import os

from PIL import Image, ImageCms

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DESTINO = os.path.join(ROOT, "public", "sistemas")

# Escalones de ancho. El de 2400 solo aparece si el archivo lo soporta; el de
# 800 es la miniatura del indice y del Vistazo.
ANCHOS = (2400, 1600, 800)


def srgb(im):
    """Devuelve la imagen en sRGB, convirtiendo si trae otro perfil."""
    perfil = im.info.get("icc_profile")
    if perfil:
        try:
            origen = ImageCms.ImageCmsProfile(__import__("io").BytesIO(perfil))
            im = ImageCms.profileToProfile(im, origen, ImageCms.createProfile("sRGB"),
                                           outputMode="RGB")
        except Exception:
            im = im.convert("RGB")
    return im.convert("RGB")


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--fuentes", required=True,
                    help="JSON de procedencia; vive fuera del repositorio")
    args = ap.parse_args()

    base = os.path.dirname(os.path.abspath(args.fuentes))
    with open(args.fuentes) as fh:
        fuentes = json.load(fh)

    entradas = []
    for c in fuentes["capturas"]:
        origen = os.path.join(base, c["archivo"])
        if not os.path.exists(origen):
            print(f"  falta {c['id']}")
            continue

        im = srgb(Image.open(origen))

        recorte = c.get("recorte")
        if recorte:
            x, y, w, h = recorte
            im = im.crop((round(x * im.width), round(y * im.height),
                          round((x + w) * im.width), round((y + h) * im.height)))
        carpeta = os.path.join(DESTINO, c["caso"])
        os.makedirs(carpeta, exist_ok=True)

        archivos = {}
        for w in sorted({w for w in ANCHOS if w < im.width} | {min(im.width, max(ANCHOS))},
                        reverse=True):
            h = max(1, round(im.height * w / im.width))
            copia = im if w == im.width else im.resize((w, h), Image.LANCZOS)
            nombre = f"{c['id']}-{w}.webp"
            copia.save(os.path.join(carpeta, nombre), "WEBP", quality=82, method=6)
            archivos[str(w)] = f"/sistemas/{c['caso']}/{nombre}"

        entradas.append({
            "id": c["id"],
            "caso": c["caso"],
            "proyecto": c["proyecto"],
            "pantalla": c["pantalla"],
            "estado": c["estado"],
            "papel": c["papel"],
            "fecha": c["fecha"],
            "credito": c.get("credito", ""),
            "nativo": [im.width, im.height],
            "ratio": round(im.width / im.height, 6),
            "archivos": archivos,
        })
        print(f"  {c['id']:24} {im.width}x{im.height} -> {len(archivos)} anchos")

    os.makedirs(DESTINO, exist_ok=True)
    with open(os.path.join(DESTINO, "manifest.json"), "w") as fh:
        json.dump({
            "fuente": "capturas propias de aplicaciones del autor, optimizadas para publicacion",
            "capturas": entradas,
        }, fh, indent=1, ensure_ascii=False)
    print(f"\n{len(entradas)} capturas -> public/sistemas/manifest.json")


if __name__ == "__main__":
    main()
