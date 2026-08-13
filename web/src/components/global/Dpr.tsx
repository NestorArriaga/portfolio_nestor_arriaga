'use client';

import { useEffect } from 'react';

/**
 * Publica el `devicePixelRatio` del visitante como `--dpr` en la raíz.
 *
 * La guarda de densidad de cada lámina se resuelve en la hoja de estilo
 * (`min(banda, nativo / dpr)`), así que este valor tiene que existir en todas
 * las páginas, no sólo en el recorrido. Se actualiza al cambiar de zoom o de
 * pantalla, que es cuando el DPR cambia de verdad.
 */
export function Dpr() {
  useEffect(() => {
    const raiz = document.documentElement;
    const poner = () => raiz.style.setProperty('--dpr', String(Math.max(1, window.devicePixelRatio || 1)));
    poner();
    const mq = window.matchMedia(`(resolution: ${window.devicePixelRatio}dppx)`);
    mq.addEventListener('change', poner);
    window.addEventListener('resize', poner);
    return () => {
      mq.removeEventListener('change', poner);
      window.removeEventListener('resize', poner);
    };
  }, []);
  return null;
}
