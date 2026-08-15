'use client';

import { useCallback, useEffect, useRef } from 'react';

import styles from './Granular.module.css';

/**
 * Visor de detalle de una figura.
 *
 * Atrapa el foco mientras está abierto, cierra con Escape o con el fondo y
 * devuelve el foco al control que lo abrió. La versión anterior sólo escuchaba
 * Escape: el tabulador seguía recorriendo la página de debajo y, al cerrar, el
 * foco se perdía al principio del documento.
 *
 * La imagen se sirve al ancho que quepa. Antes se le imponía un mínimo de
 * 1000 px, así que en un teléfono el detalle desbordaba por los dos lados y no
 * había forma de ver la pieza completa.
 */
export function VisorDetalle({
  abierto, onCerrar, src, alt, titulo,
}: {
  abierto: boolean;
  onCerrar: () => void;
  src: string;
  alt: string;
  titulo: string;
}) {
  const panel = useRef<HTMLDivElement>(null);
  const cerrar = useRef<HTMLButtonElement>(null);
  const previo = useRef<HTMLElement | null>(null);

  const alCerrar = useCallback(() => {
    onCerrar();
    // El foco vuelve a su origen; si el nodo ya no existe, no se fuerza nada.
    previo.current?.focus?.();
  }, [onCerrar]);

  useEffect(() => {
    if (!abierto) return undefined;

    previo.current = document.activeElement as HTMLElement | null;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    cerrar.current?.focus();

    const tecla = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { e.preventDefault(); alCerrar(); return; }
      if (e.key !== 'Tab') return;

      // Ciclo de foco dentro del panel.
      const focos = panel.current?.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );
      if (!focos?.length) return;
      const primero = focos[0];
      const ultimo = focos[focos.length - 1];
      const activo = document.activeElement;
      if (e.shiftKey && (activo === primero || !panel.current?.contains(activo))) {
        e.preventDefault(); ultimo.focus();
      } else if (!e.shiftKey && activo === ultimo) {
        e.preventDefault(); primero.focus();
      }
    };

    window.addEventListener('keydown', tecla, true);
    return () => {
      window.removeEventListener('keydown', tecla, true);
      document.body.style.overflow = overflow;
    };
  }, [abierto, alCerrar]);

  if (!abierto) return null;

  return (
    <div
      className={styles.visorFondo}
      role="dialog"
      aria-modal="true"
      aria-label={`Detalle · ${titulo}`}
      ref={panel}
      onClick={(e) => { if (e.target === e.currentTarget) alCerrar(); }}
    >
      <div className={styles.visorBarra}>
        <p className={`${styles.visorTitulo} mono`}>{titulo}</p>
        <button type="button" className="btn" data-v="borde" data-touch
                ref={cerrar} onClick={alCerrar}>
          Cerrar
        </button>
      </div>

      <div className={styles.visorLienzo}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt} decoding="async" />
      </div>
    </div>
  );
}
