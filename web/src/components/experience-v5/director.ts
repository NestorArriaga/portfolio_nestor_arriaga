'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Director de movimiento — el único reloj de V5.
 *
 * Todo el recorrido cuelga de aquí: un `requestAnimationFrame` central, una
 * lectura agrupada de geometría y una escritura agrupada de variables CSS. El
 * progreso **nunca** pasa por el estado de React, así que atravesar el atlas no
 * vuelve a renderizar ningún componente.
 *
 * El registro cuelga del **nodo**, no del efecto. Es la lección cara de V4: en
 * Strict Mode React monta, desmonta y remonta los efectos pero no vuelve a
 * ejecutar el `ref`, de modo que un `delete` en el cleanup dejaba el mapa vacío
 * y dieciocho escenas congeladas. Aquí el efecto sólo enciende y apaga el
 * bucle; el alta y la baja son del ciclo del nodo, que es el único que React
 * garantiza.
 *
 * Además del progreso crudo (`--p`) el director publica un valor **suavizado en
 * el tiempo** (`--e`): no es un retraso fijo respecto al scroll, es una
 * persecución exponencial normalizada por el delta de cada fotograma. Es lo que
 * da la sensación de peso sin secuestrar el scroll ni añadir latencia al
 * detenerse.
 */

export type Camara = {
  /** Escala de la cámara a lo largo de la escena. */
  z?: [number, number];
  /** Desplazamiento en porcentaje del encuadre. */
  x?: [number, number];
  y?: [number, number];
};

type Ficha = {
  nodo: HTMLElement;
  camara?: Camara;
  visible: boolean;
  /** Progreso crudo del último fotograma escrito. */
  p: number;
  /** Progreso suavizado en el tiempo. */
  e: number;
  escrito: number;
};

const fichas = new Map<HTMLElement, Ficha>();

let io: IntersectionObserver | null = null;
let frame = 0;
let vivo = false;
let duenos = 0;
let ultimoT = 0;

const acota = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
const mezcla = (a: number, b: number, t: number) => a + (b - a) * t;

/**
 * Progreso de una escena: 0 cuando su escenario queda fijo al borde superior,
 * 1 cuando está a punto de soltarse.
 *
 * La primera versión medía de otra manera —0 al asomar por abajo, 1 al salir
 * por arriba— y esa cuenta reparte el progreso por un recorrido de `alto + vh`
 * cuando el escenario, que es `sticky` a 100svh, sólo está fijo durante
 * `alto - vh`. Con una sección de 175svh y un viewport de 750 px eso dejaba la
 * ventana visible entre 0.36 y 0.64: **el 73 % de la animación ocurría con el
 * escenario fuera de sitio**, entrando o saliendo. Los pulsos de cada proyecto,
 * los barridos de capa y los contadores estaban descritos para leerse con la
 * escena a la vista, así que la cuenta correcta es la del tramo fijo.
 *
 * Las escenas más cortas que el viewport no tienen tramo fijo; para ésas se
 * conserva la medida de travesía, que es la única que tiene sentido.
 */
function progreso(nodo: HTMLElement, vh: number): number {
  const c = nodo.getBoundingClientRect();
  const fijo = c.height - vh;
  if (fijo > 1) return acota(-c.top / fijo);
  const total = c.height + vh;
  return total <= 0 ? 0 : acota((vh - c.top) / total);
}

function publicar(f: Ficha) {
  const est = f.nodo.style;
  est.setProperty('--p', f.p.toFixed(4));
  est.setProperty('--e', f.e.toFixed(4));

  if (f.camara) {
    const { z, x, y } = f.camara;
    if (z) est.setProperty('--z', mezcla(z[0], z[1], f.e).toFixed(4));
    if (x) est.setProperty('--x', `${mezcla(x[0], x[1], f.e).toFixed(3)}%`);
    if (y) est.setProperty('--y', `${mezcla(y[0], y[1], f.e).toFixed(3)}%`);
  }
  f.escrito = f.e;
}

function latir(t: number) {
  frame = 0;
  const dt = ultimoT ? Math.min((t - ultimoT) / 1000, 0.05) : 0.016;
  ultimoT = t;
  const vh = window.innerHeight;

  // Lectura agrupada: primero toda la geometría, después toda la escritura.
  // Mezclarlas provoca un reflow por escena en cada fotograma.
  const pendientes: Ficha[] = [];
  fichas.forEach((f) => {
    if (!f.visible) return;
    f.p = progreso(f.nodo, vh);
    pendientes.push(f);
  });

  let sigue = false;
  for (const f of pendientes) {
    // Persecución exponencial: independiente de los fps, sin retraso fijo.
    const k = 1 - Math.exp(-dt * 9);
    f.e += (f.p - f.e) * k;
    if (Math.abs(f.p - f.e) > 0.0004) sigue = true;
    if (Math.abs(f.e - f.escrito) > 0.0004) publicar(f);
  }

  // El bucle sólo continúa mientras algo se esté acomodando. En reposo el
  // director se calla y no consume un fotograma por nada.
  if (sigue) pedir();
}

function pedir() {
  cancelAnimationFrame(frame);
  frame = requestAnimationFrame(latir);
}

function observador(): IntersectionObserver {
  if (io) return io;
  io = new IntersectionObserver(
    (entradas) => {
      for (const e of entradas) {
        const f = fichas.get(e.target as HTMLElement);
        if (f) f.visible = e.isIntersecting;
      }
      pedir();
    },
    // La escena empieza a medirse antes de asomar: nunca se ve entrar sin
    // composición.
    { rootMargin: '30% 0px' },
  );
  fichas.forEach((f) => io!.observe(f.nodo));
  return io;
}

function reiniciar() {
  const vh = typeof window === 'undefined' ? 0 : window.innerHeight;
  fichas.forEach((f) => { f.p = progreso(f.nodo, vh); f.escrito = -1; });
  ultimoT = 0;
  pedir();
}

function encender() {
  if (vivo) return;
  vivo = true;
  window.addEventListener('scroll', pedir, { passive: true });
  window.addEventListener('resize', reiniciar, { passive: true });
  // Con la pestaña oculta el rAF no corre; al volver hay que remedir todo.
  document.addEventListener('visibilitychange', reiniciar);
  observador();
  pedir();
}

function apagar() {
  if (!vivo) return;
  vivo = false;
  window.removeEventListener('scroll', pedir);
  window.removeEventListener('resize', reiniciar);
  document.removeEventListener('visibilitychange', reiniciar);
  cancelAnimationFrame(frame);
  frame = 0;
  io?.disconnect();
  io = null;
}

/**
 * Cuelga una escena del director. Devuelve el `ref` del elemento que define su
 * tramo de scroll.
 *
 * Con `quieto` la escena se sella en su estado final y no entra en el bucle:
 * es la versión editorial completa que pide `prefers-reduced-motion`, no un
 * componente congelado a mitad.
 */
export function useEscena(id: string, camara?: Camara, quieto = false) {
  const actual = useRef<HTMLElement | null>(null);
  const camaraRef = useRef(camara);
  camaraRef.current = camara;

  const ref = useCallback((nodo: HTMLElement | null) => {
    const previo = actual.current;
    if (previo && previo !== nodo) {
      io?.unobserve(previo);
      fichas.delete(previo);
    }
    actual.current = nodo;
    if (!nodo) return;

    nodo.dataset.k5 = id;
    const c = camaraRef.current;

    if (quieto) {
      const est = nodo.style;
      est.setProperty('--p', '1');
      est.setProperty('--e', '1');
      if (c?.z) est.setProperty('--z', String(c.z[1]));
      if (c?.x) est.setProperty('--x', `${c.x[1]}%`);
      if (c?.y) est.setProperty('--y', `${c.y[1]}%`);
      return;
    }

    const vh = typeof window === 'undefined' ? 0 : window.innerHeight;
    const p = progreso(nodo, vh);
    // Estado inicial válido antes del primer paint: ninguna escena puede
    // existir un solo fotograma sin `--p` y `--e`.
    const f: Ficha = { nodo, camara: c, visible: false, p, e: p, escrito: -1 };
    fichas.set(nodo, f);
    publicar(f);

    if (vivo) { observador().observe(nodo); pedir(); }
  }, [id, quieto]);

  useEffect(() => {
    if (quieto) return;
    duenos += 1;
    encender();
    return () => {
      duenos -= 1;
      // El registro no se toca aquí: pertenece al nodo.
      if (duenos <= 0) { duenos = 0; apagar(); }
    };
  }, [quieto]);

  return ref;
}

/**
 * Sonda de desarrollo: mide de forma síncrona, sin pasar por el rAF.
 *
 * Con la pestaña en segundo plano el navegador estrangula el rAF, así que una
 * comprobación automatizada ve escenas «congeladas» que en realidad funcionan.
 * Sin esto, auditar el motor da falsos negativos.
 */
if (typeof window !== 'undefined' && process.env.NODE_ENV !== 'production') {
  (window as unknown as { __v5?: () => number }).__v5 = () => {
    const vh = window.innerHeight;
    fichas.forEach((f) => {
      const c = f.nodo.getBoundingClientRect();
      f.visible = c.bottom > -vh * 0.3 && c.top < vh * 1.3;
      if (!f.visible) return;
      f.p = progreso(f.nodo, vh);
      f.e = f.p;             // sin suavizado: el auditor quiere el valor exacto
      f.escrito = -1;
      publicar(f);
    });
    return fichas.size;
  };
}

export function useMovimientoReducido(): boolean {
  const [r, setR] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setR(mq.matches);
    const on = (e: MediaQueryListEvent) => setR(e.matches);
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);
  return r;
}
