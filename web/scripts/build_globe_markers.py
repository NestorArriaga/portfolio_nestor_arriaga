#!/usr/bin/env python3
"""Marcadores geográficos del globo — derivados, no colocados a ojo.

La dirección lo pide explícitamente: sólo territorios reales, y si falta una
coordenada hay que obtenerla de una geometría local válida en vez de poner un
punto aproximado. Aquí no se escribe ninguna latitud a mano.

De dónde sale cada cosa:

- `public/atlas/geo/territory-masks.json` guarda la extensión real de cada
  máscara territorial en **EPSG:6372** (Mexico ITRF2008 / LCC), que es un cónico
  conforme de Lambert en metros. Su centro se convierte a WGS84 invirtiendo la
  proyección con las fórmulas de Snyder.
- `public/atlas/geo/municipios.json` **no** sirve: sus coordenadas están en el
  espacio del `viewBox` del SVG y el archivo no declara ningún SRS. Sin sistema
  de referencia no hay conversión posible, así que la Comarca Lagunera se queda
  sin marcador.

Territorios que quedan fuera del globo por no ser verificables:

- Comarca Lagunera (P14) — sólo existe como geometría de `viewBox`.
- Reserva de Metztitlán, Hidalgo (P05–P08) — no tiene máscara territorial.

Los dos aparecen en el índice textual. Ninguno se inventa sobre el mapa.
"""
from __future__ import annotations

import json
import math
import os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MASKS = os.path.join(ROOT, "public", "atlas", "geo", "territory-masks.json")
OUT = os.path.join(ROOT, "public", "atlas", "geo", "globe-markers.json")

# EPSG:6372 — Mexico ITRF2008 / LCC. Parámetros oficiales del sistema.
LAT_0, LON_0 = 12.0, -102.0
LAT_1, LAT_2 = 17.5, 29.5
X_0, Y_0 = 2_500_000.0, 0.0
# Elipsoide GRS80.
A = 6_378_137.0
F = 1 / 298.257222101
E = math.sqrt(2 * F - F * F)


def _t(lat: float) -> float:
    s = E * math.sin(lat)
    return math.tan(math.pi / 4 - lat / 2) / ((1 - s) / (1 + s)) ** (E / 2)


def _m(lat: float) -> float:
    s = math.sin(lat)
    return math.cos(lat) / math.sqrt(1 - E * E * s * s)


def _constantes():
    p1, p2 = math.radians(LAT_1), math.radians(LAT_2)
    p0 = math.radians(LAT_0)
    m1, m2 = _m(p1), _m(p2)
    t1, t2, t0 = _t(p1), _t(p2), _t(p0)
    n = (math.log(m1) - math.log(m2)) / (math.log(t1) - math.log(t2))
    big_f = m1 / (n * t1 ** n)
    rho0 = A * big_f * t0 ** n
    return n, big_f, rho0


N, BIG_F, RHO0 = _constantes()


def a_wgs84(x: float, y: float) -> tuple[float, float]:
    """Inversa del cónico conforme de Lambert. Devuelve (lat, lng) en grados."""
    dx = x - X_0
    dy = RHO0 - (y - Y_0)
    rho = math.copysign(math.hypot(dx, dy), N)
    t = (rho / (A * BIG_F)) ** (1 / N)
    theta = math.atan2(dx, dy)

    lat = math.pi / 2 - 2 * math.atan(t)
    # Iteración de Snyder: converge en cuatro o cinco vueltas muy por debajo
    # del milímetro; el corte es por precisión, no por número de pasos.
    for _ in range(12):
        s = E * math.sin(lat)
        nueva = math.pi / 2 - 2 * math.atan(t * ((1 - s) / (1 + s)) ** (E / 2))
        if abs(nueva - lat) < 1e-12:
            lat = nueva
            break
        lat = nueva

    lng = theta / N + math.radians(LON_0)
    return math.degrees(lat), math.degrees(lng)


# Qué territorio del portafolio corresponde a cada máscara.
TERRITORIOS = {
    "ciudad-de-mexico": ("cdmx", "Ciudad de México"),
    "decozalapa": ("veracruz", "Cuenca de Decozalapa"),
    "aguascalientes": ("aguascalientes", "Aguascalientes y Calvillo"),
    "yucatan": ("merida", "Mérida, Yucatán"),
}


def main() -> None:
    datos = json.load(open(MASKS))
    if datos.get("srs") != "EPSG:6372":
        raise SystemExit(f"SRS inesperado: {datos.get('srs')}")

    salida = []
    for m in datos["masks"]:
        par = TERRITORIOS.get(m["slug"])
        if not par:
            continue
        x0, y0, x1, y1 = m["extent_m"]
        lat, lng = a_wgs84((x0 + x1) / 2, (y0 + y1) / 2)
        territorio, nombre = par
        salida.append({
            "territoryId": territorio,
            "nombre": nombre,
            "lat": round(lat, 5),
            "lng": round(lng, 5),
            "origen": f"centro de extent_m de «{m['slug']}» en EPSG:6372",
        })
        print(f"  {m['slug']:20s} → {lat:9.5f}, {lng:10.5f}")

    salida.sort(key=lambda d: d["territoryId"])
    with open(OUT, "w") as fh:
        json.dump({
            "srs_origen": "EPSG:6372",
            "metodo": "inversa de Lambert conforme cónico (Snyder) sobre GRS80",
            "sin_marcador": [
                {"territoryId": "comarca",
                 "motivo": "municipios.json no declara SRS; sus coordenadas son del viewBox"},
                {"territoryId": "hidalgo",
                 "motivo": "no existe máscara territorial para la Reserva de Metztitlán"},
            ],
            "marcadores": salida,
        }, fh, indent=1, ensure_ascii=False)
    print(f"\n  {len(salida)} marcadores → {OUT}")


if __name__ == "__main__":
    main()
