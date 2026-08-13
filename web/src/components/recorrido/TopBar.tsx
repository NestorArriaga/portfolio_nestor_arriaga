'use client';

import Link from 'next/link';
import { useRef } from 'react';

import type { MomentData } from './ProjectMoment';
import styles from './TopBar.module.css';

/**
 * Navegación mínima persistente.
 *
 * Cuatro destinos —Recorrido, Vistazo, Acerca, Contacto— y el proyecto activo.
 * Nada más: el riel de las quince unidades ya cubre el salto proyecto a
 * proyecto, y duplicarlo aquí sería dar dos navegaciones para lo mismo.
 *
 * "Recorrido / Vistazo" es un par de dos estados, no un icono: el control dice
 * en qué vista estás y a cuál pasas, sin necesitar leyenda.
 */

export function TopBar({
  open,
  onOpen,
  onClose,
  activeId,
  moments,
}: {
  open: boolean;
  onOpen: (el: HTMLButtonElement) => void;
  onClose: () => void;
  activeId: string | null;
  moments: MomentData[];
}) {
  const btn = useRef<HTMLButtonElement>(null);
  const active = moments.find((m) => m.id === activeId) ?? null;

  return (
    <header className={styles.bar}>
      <Link href="/" className={styles.home}>Atlas</Link>

      <div className={styles.toggle} role="group" aria-label="Vista">
        <button
          type="button"
          className={styles.mode}
          aria-pressed={!open}
          onClick={onClose}
        >
          Recorrido
        </button>
        <button
          ref={btn}
          type="button"
          className={styles.mode}
          aria-pressed={open}
          aria-haspopup="dialog"
          aria-expanded={open}
          onClick={() => (open ? onClose() : onOpen(btn.current!))}
        >
          Vistazo
        </button>
      </div>

      {/* Proyecto en curso: número, nombre y posición dentro de los quince. */}
      {active ? (
        <p className={styles.current} style={{ ['--accent' as string]: active.accent }}>
          <span className={styles.currentNum}>P{active.id}</span>
          <span className={styles.currentName}>{active.short}</span>
          <span className={styles.currentOf}>
            {moments.findIndex((m) => m.id === active.id) + 1}
            <span aria-hidden="true">/</span>{moments.length}
          </span>
        </p>
      ) : (
        <p className={styles.current} aria-hidden="true" />
      )}

      <nav className={styles.links} aria-label="Secciones">
        <a href="#acerca" className={styles.link}>Acerca</a>
        <a href="#contacto" className={styles.link}>Contacto</a>
      </nav>
    </header>
  );
}
