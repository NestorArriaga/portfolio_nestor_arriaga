import fs from 'node:fs';
import path from 'node:path';

/**
 * Elección del derivado de impresión.
 *
 * En pantalla se deja negociar al navegador con `srcSet` y `sizes`, porque el
 * ancho real depende del viewport. En papel el ancho es conocido —la hoja mide
 * 297 × 210 mm y cada composición declara su caja— así que la negociación sobra
 * y además no es fiable: al exportar, el candidato elegido no siempre respeta
 * el factor de escala, y bastaba una lámina mal negociada para imprimir a
 * 159 ppp una figura que tenía derivado suficiente.
 *
 * Aquí el archivo se decide con una cuenta explícita: cuántos píxeles hacen
 * falta para la caja declarada, y cuál es el derivado más pequeño que los tiene.
 */

/** Densidad de destino. El encargo pide 160 ppp como mínimo y 180–200 ideal. */
export const PPP_IMPRESION = 200;

/** Densidad por debajo de la cual una figura se considera blanda en papel. */
export const PPP_MINIMO = 160;

export type LaminaServible = { src: string; srcSet?: string; width: number };

/**
 * Derivados de impresión generados por `build-print-derivatives`.
 *
 * Son los mismos rásteres al ancho que pide su caja, aplanados sobre el fondo
 * de su hoja y guardados como JPEG de alta calidad. Existen porque el
 * exportador incrusta un WebP con alfa sin pérdida —85 MB de documento— y en
 * cambio deja pasar un JPEG tal cual. Si el manifiesto no está, la composición
 * sigue funcionando con los derivados de pantalla: el PDF pesa más, pero se
 * genera igual.
 */
let derivadosImpresos: Record<string, { archivo: string; ancho: number }> | null = null;

function manifiestoImpreso(): Record<string, { archivo: string; ancho: number }> {
  if (derivadosImpresos) return derivadosImpresos;
  // Se lee del disco, no se importa: el manifiesto es un artefacto de build y
  // la primera vez que se compone la hoja puede no existir todavía.
  const f = path.join(process.cwd(), 'public', 'print', 'manifest.json');
  derivadosImpresos = fs.existsSync(f) ? JSON.parse(fs.readFileSync(f, 'utf8')) : {};
  return derivadosImpresos ?? {};
}

/** Los derivados declarados en un `srcSet`, de menor a mayor. */
function derivados(img: LaminaServible): { ancho: number; url: string }[] {
  const lista = [...(img.srcSet ?? '').matchAll(/(\S+)\s+(\d+)w/g)]
    .map((m) => ({ url: m[1], ancho: Number(m[2]) }))
    .sort((a, b) => a.ancho - b.ancho);
  return lista.length ? lista : [{ url: img.src, ancho: img.width }];
}

/** Píxeles necesarios para una caja en milímetros a la densidad de destino. */
export function pixelesPara(cajaMm: number, ppp = PPP_IMPRESION): number {
  return Math.ceil((cajaMm / 25.4) * ppp);
}

/**
 * Fuente de impresión para una caja declarada en milímetros.
 *
 * Devuelve el derivado más pequeño que alcanza la densidad de destino; si
 * ninguno llega, el mayor disponible —ampliar no crea detalle, y la guarda de
 * la hoja se encarga de que la caja no crezca por encima de lo que el archivo
 * sostiene.
 */
export function fuenteImpresa(img: { src: string; srcSet?: string; width: number },
  cajaMm: number): string {
  return atributosImpresos(img, cajaMm).src;
}

/**
 * Atributos de una figura impresa: la fuente y su origen.
 *
 * `data-origen` conserva la URL del derivado vectorial antes de sustituirlo por
 * el JPEG de impresión. Es lo que hace que el generador de derivados pueda
 * volver a ejecutarse sin morderse la cola: sin ese rastro, la segunda pasada
 * mediría los JPEG que acababa de escribir, los tomaría por originales y
 * dejaría las láminas de verdad fuera del manifiesto.
 */
export function atributosImpresos(img: { src: string; srcSet?: string; width: number },
  cajaMm: number): { src: string; 'data-origen': string } {
  const necesarios = pixelesPara(cajaMm);
  const lista = derivados(img);
  const elegido = (lista.find((d) => d.ancho >= necesarios) ?? lista[lista.length - 1]).url;
  return {
    src: manifiestoImpreso()[elegido]?.archivo ?? elegido,
    'data-origen': elegido,
  };
}

/** Ancho en píxeles del derivado que se va a imprimir. */
export function anchoImpreso(img: { src: string; srcSet?: string; width: number },
  cajaMm: number): number {
  const necesarios = pixelesPara(cajaMm);
  const lista = derivados(img);
  return (lista.find((d) => d.ancho >= necesarios) ?? lista[lista.length - 1]).ancho;
}
