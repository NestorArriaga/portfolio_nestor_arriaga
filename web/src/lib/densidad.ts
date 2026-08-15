/**
 * Guarda de densidad: cuántos píxeles de origen hay disponibles de verdad.
 *
 * El ancho nativo del manifiesto dice qué resolución existe dentro del
 * documento original, pero la guarda tiene que mirar el archivo que el
 * navegador va a descargar. Se lee del `srcSet`, que es la lista literal de los
 * derivados que existen.
 *
 * Vive fuera de los componentes porque la usan tanto el recorrido —de cliente—
 * como la composición impresa, que se resuelve en el servidor.
 */
export function anchoServido(img: { srcSet?: string; width: number }): number {
  const anchos = [...(img.srcSet ?? '').matchAll(/\s(\d+)w/g)].map((m) => Number(m[1]));
  return anchos.length ? Math.max(...anchos) : img.width;
}
