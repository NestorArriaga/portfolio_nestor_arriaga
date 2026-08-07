'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Utilidades de movimiento del atlas.
 *
 * Dos reglas gobiernan todo lo de aquí:
 *
 * 1. El movimiento explica territorio. Una animación entra una vez, al aparecer
 *    la lámina, y deja el estado final visible. No hay loops de entrada ni
 *    repeticiones al volver a hacer scroll.
 * 2. Con `prefers-reduced-motion` no se degrada: se entrega directamente el
 *    estado final. Por eso `useReveal` devuelve `revealed: true` de entrada
 *    cuando el usuario lo pide, en lugar de animar en 1 ms.
 */

export function usePrefersReducedMotion(): boolean {
  // Arranca en false para que servidor y cliente coincidan en el primer render;
  // el efecto corrige antes de que nada se anime.
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  return reduced;
}

type RevealOptions = {
  /** Fracción visible que dispara la secuencia. */
  threshold?: number;
  /** Margen para adelantar el disparo y que la lámina no entre ya empezada. */
  rootMargin?: string;
};

/**
 * Marca un elemento como revelado la primera vez que entra en viewport.
 * Se desconecta al disparar: la secuencia de una lámina ocurre una sola vez.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>(
  { threshold = 0.25, rootMargin = '0px 0px -10% 0px' }: RevealOptions = {},
) {
  const ref = useRef<T>(null);
  const reduced = usePrefersReducedMotion();
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (revealed) return;
    const node = ref.current;
    if (!node) return;

    // Sin soporte de IntersectionObserver, mostrar en vez de esconder.
    if (typeof IntersectionObserver === 'undefined') {
      setRevealed(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [revealed, threshold, rootMargin]);

  return { ref, revealed: reduced ? true : revealed, reduced };
}

/**
 * Progreso de scroll de una sección, de 0 a 1, para el desplazamiento de capas
 * de un relieve. Se mide con rAF sobre el scroll para no forzar layout en cada
 * evento, y se detiene cuando la sección no está a la vista.
 */
export function useScrollProgress<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null);
  const reduced = usePrefersReducedMotion();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (reduced) {
      setProgress(0);
      return;
    }
    const node = ref.current;
    if (!node) return;

    let frame = 0;
    let visible = false;

    const measure = () => {
      frame = 0;
      const rect = node.getBoundingClientRect();
      const total = rect.height + window.innerHeight;
      if (total <= 0) return;
      const raw = (window.innerHeight - rect.top) / total;
      setProgress(Math.min(1, Math.max(0, raw)));
    };

    const onScroll = () => {
      if (!visible || frame) return;
      frame = requestAnimationFrame(measure);
    };

    const observer = new IntersectionObserver((entries) => {
      visible = entries.some((e) => e.isIntersecting);
      if (visible) onScroll();
    });
    observer.observe(node);

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    measure();

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [reduced]);

  return { ref, progress, reduced };
}

/**
 * Retardo escalonado para entradas en grupo (nodos, insets, entradas de
 * leyenda). Se corta a `max` para que un grupo grande no alargue la secuencia
 * más allá de los 2.2 s que fija la dirección de arte.
 */
export function stagger(index: number, step = 45, max = 520): string {
  return `${Math.min(index * step, max)}ms`;
}
