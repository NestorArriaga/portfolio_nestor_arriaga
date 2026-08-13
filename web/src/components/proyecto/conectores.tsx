'use client';

import { RefObject, useCallback, useEffect, useRef, useState } from 'react';

/**
 * Conectores medidos entre dos elementos de la misma composición.
 *
 * Una línea de llamada sólo sirve si toca de verdad los dos extremos. Dibujarla
 * con coordenadas fijas funciona en un ancho y falla en todos los demás, así que
 * aquí se miden las cajas reales y se recalculan cuando la composición cambia de
 * tamaño, de tipografía o de columna.
 *
 * Los extremos se piden mediante una función que se ejecuta en el momento de
 * medir, no mediante nodos capturados en el render: cuando el efecto corre por
 * primera vez las referencias ya están asignadas, y guardarlas antes daría
 * siempre una lista vacía.
 *
 * No hay animación de trazado en este módulo: la línea aparece con el estado y
 * el movimiento lo pone el CSS, que es donde `prefers-reduced-motion` manda.
 */

export type Linea = { x1: number; y1: number; x2: number; y2: number };

export type Lado = 'derecha' | 'izquierda' | 'centro';
export type Par = { de: HTMLElement | null; a: HTMLElement | null; ladoDe?: Lado; ladoA?: Lado };

const punto = (r: DOMRect, base: DOMRect, lado: Lado) => ({
  x: (lado === 'derecha' ? r.right : lado === 'izquierda' ? r.left : r.left + r.width / 2) - base.left,
  y: r.top + r.height / 2 - base.top,
});

/** Líneas en coordenadas del contenedor, una por par declarado. */
export function useConectores(
  contenedor: RefObject<HTMLElement | null>,
  obtener: () => Par[],
  /** Estado del que dependen los extremos: al cambiar, se vuelve a medir. */
  deps: unknown[] = [],
): Linea[] {
  const [lineas, setLineas] = useState<Linea[]>([]);
  const fuente = useRef(obtener);
  fuente.current = obtener;

  const medir = useCallback(() => {
    const base = contenedor.current?.getBoundingClientRect();
    if (!base) return;
    const nuevas = fuente.current().flatMap(({ de, a, ladoDe = 'centro', ladoA = 'izquierda' }) => {
      if (!de || !a) return [];
      const p1 = punto(de.getBoundingClientRect(), base, ladoDe);
      const p2 = punto(a.getBoundingClientRect(), base, ladoA);
      return [{ x1: p1.x, y1: p1.y, x2: p2.x, y2: p2.y }];
    });
    // Sin comparar, cada medición dispararía un render y el `ResizeObserver`
    // volvería a medir en bucle.
    setLineas((viejas) => (JSON.stringify(viejas) === JSON.stringify(nuevas) ? viejas : nuevas));
  }, [contenedor]);

  useEffect(() => {
    const nodo = contenedor.current;
    if (!nodo) return;

    medir();
    // Segunda pasada cuando el navegador ya colocó las láminas: el mapa define
    // la altura de la fila y las marcas se mueven con él.
    const f = requestAnimationFrame(medir);

    const obs = new ResizeObserver(medir);
    obs.observe(nodo);
    nodo.querySelectorAll('img').forEach((img) => {
      if (!img.complete) img.addEventListener('load', medir, { once: true });
    });
    window.addEventListener('resize', medir);

    return () => {
      cancelAnimationFrame(f);
      obs.disconnect();
      window.removeEventListener('resize', medir);
    };
  }, [contenedor, medir]);

  // Los conectores que dependen de un estado —una clase activa, por ejemplo—
  // aparecen y desaparecen con él; sin esto sólo se medirían al montar.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(medir, [medir, ...deps]);

  return lineas;
}
