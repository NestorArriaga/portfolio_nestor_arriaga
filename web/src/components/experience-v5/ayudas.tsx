'use client';

import { useCallback, useEffect, useId, useState } from 'react';

import styles from './ayudas.module.css';

/**
 * Ayudas de primer uso.
 *
 * No es un tutorial ni un modal de bienvenida: son cinco frases de menos de
 * cinco palabras que aparecen junto al control que explican. Permanecen el
 * tiempo suficiente para leerse y se retiran cuando sucede la acción que
 * describen, no ante cualquier movimiento accidental del puntero.
 *
 * Tres reglas gobiernan el sistema:
 *
 * 1. **Una a la vez.** Un turno global impide que dos ayudas compitan por la
 *    atención; si otra está visible, la siguiente espera a que se vaya.
 * 2. **Presencia por visita.** Cada carga completa vuelve a presentar el mapa
 *    mínimo de interacción. Así una visita anterior o una previsualización del
 *    editor no puede dejar la interfaz sin orientación.
 * 3. **Se relacionan con su control.** Cada ayuda tiene `id` y el control la
 *    referencia con `aria-describedby`, así que un lector de pantalla la lee
 *    como descripción del botón y no como un anuncio suelto que se repite.
 */

/** Turno global: sólo una ayuda puede estar visible. */
let turno: string | null = null;
const espera = new Set<() => void>();
const mostradas = new Set<string>();

function tomar(clave: string): boolean {
  if (turno && turno !== clave) return false;
  turno = clave;
  return true;
}

function soltar(clave: string) {
  if (turno !== clave) return;
  turno = null;
  espera.forEach((f) => f());
}

/**
 * Estado de una ayuda.
 *
 * `activa` es la condición que la hace pertinente —estar en la portada, haber
 * abierto el diálogo, señalar el globo—. El retraso evita que aparezca encima
 * de alguien que ya sabe qué hacer y se desplazó de inmediato.
 */
export function useAyuda(clave: string, activa: boolean, retraso = 900, duracion = 12000) {
  const id = useId();
  const [visible, setVisible] = useState(false);

  const cerrar = useCallback(() => {
    mostradas.add(clave);
    setVisible(false);
    soltar(clave);
  }, [clave]);

  useEffect(() => {
    /**
     * Al dejar de ser pertinente —el puntero sale del globo, el diálogo se
     * cierra— la ayuda se retira. Sin esto quedaba a la vista sin dueño del
     * turno, y la siguiente podía encenderse encima: dos ayudas a la vez.
     */
    if (!activa) { setVisible(false); soltar(clave); return; }
    if (mostradas.has(clave)) return;

    let t = 0;
    const intentar = () => {
      if (mostradas.has(clave) || !tomar(clave)) return;
      t = window.setTimeout(() => {
        mostradas.add(clave);
        setVisible(true);
      }, retraso);
    };
    intentar();
    espera.add(intentar);

    return () => {
      window.clearTimeout(t);
      espera.delete(intentar);
      soltar(clave);
    };
  }, [clave, activa, retraso]);

  /** Caduca sola; el consumidor la cierra con la acción que explica. */
  useEffect(() => {
    if (!visible) return;
    const t = window.setTimeout(cerrar, duracion);
    return () => window.clearTimeout(t);
  }, [visible, cerrar, duracion]);

  return { visible, id, cerrar };
}

/**
 * La pieza visible: punto de señal y una frase corta.
 *
 * `role="status"` en vez de `alert`: orienta, no interrumpe. Cuando el control
 * la referencia con `aria-describedby`, el lector ya la anuncia al enfocarlo,
 * así que el nodo vivo no la repite.
 */
export function Ayuda({
  id, texto, sup = 'tinta', lado,
}: {
  id: string;
  texto: string;
  /** Superficie sobre la que se posa, para conservar el contraste. */
  sup?: 'tinta' | 'papel';
  lado?: 'arriba' | 'abajo' | 'derecha';
}) {
  return (
    <span className={`${styles.ayuda} mono`} id={id} data-sup={sup} data-lado={lado} role="status">
      <i aria-hidden="true" />
      {texto}
    </span>
  );
}

/** ¿Es un puntero fino? Las ayudas de señalamiento no existen en táctil. */
export function usePunteroFino() {
  const [fino, setFino] = useState(false);
  useEffect(() => { setFino(window.matchMedia('(pointer: fine)').matches); }, []);
  return fino;
}

/**
 * ¿El gesto de esta persona es desplazar o deslizar?
 *
 * `pointer: fine` sola se equivoca en los dos sentidos: un portátil con pantalla
 * táctil la declara fina y un emulador móvil puede declararla fina también. Se
 * cruzan tres señales —precisión del puntero, capacidad táctil real y ancho de
 * viewport— y manda el conjunto, no una sola.
 */
export function useGesto(): 'desplazar' | 'deslizar' {
  const [gesto, setGesto] = useState<'desplazar' | 'deslizar'>('desplazar');

  useEffect(() => {
    const medir = () => {
      const fino = window.matchMedia('(pointer: fine)').matches;
      const tactil = window.matchMedia('(any-pointer: coarse)').matches
        || navigator.maxTouchPoints > 0;
      const estrecho = window.innerWidth < 900;
      setGesto(estrecho || (tactil && !fino) ? 'deslizar' : 'desplazar');
    };
    medir();
    window.addEventListener('resize', medir);
    return () => window.removeEventListener('resize', medir);
  }, []);

  return gesto;
}

/**
 * Cierra una ayuda cuando empieza el gesto que explica.
 *
 * Se escucha `wheel` y `touchmove` —el desplazamiento real—, no `pointerdown`
 * ni `keydown`: tocar la pantalla o pulsar una tecla cualquiera no es la acción
 * descrita, y antes consumía la ayuda antes de que llegara a leerse.
 */
export function useCerrarAlDesplazar(visible: boolean, cerrar: () => void) {
  useEffect(() => {
    if (!visible) return;
    const opts = { passive: true, once: true } as const;
    window.addEventListener('wheel', cerrar, opts);
    window.addEventListener('touchmove', cerrar, opts);
    return () => {
      window.removeEventListener('wheel', cerrar);
      window.removeEventListener('touchmove', cerrar);
    };
  }, [visible, cerrar]);
}
