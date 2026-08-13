'use client';

import Link from 'next/link';
import { CSSProperties, useEffect, useMemo, useRef, useState } from 'react';

import type { PlateImage } from '@/lib/plates';
import { TextureOverlay } from '@/components/atlas/TextureOverlay';
import styles from './Vistazo.module.css';

/**
 * Vistazo — índice ampliado de acceso rápido.
 *
 * Es una mesa editorial, no una cuadrícula de tarjetas: campo de coordenadas
 * con número grande, título corto y lugar; la previsualización real aparece al
 * activar, y **solo se monta la del proyecto activo**, así que abrir Vistazo no
 * descarga quince imágenes.
 *
 * Contrato de navegación:
 *
 * - se abre solo por decisión del usuario, nunca automáticamente;
 * - `Escape`, el botón de cerrar y un toque fuera lo cierran;
 * - al cerrarse devuelve el foco al control que lo abrió y **no toca el
 *   scroll**: el recorrido sigue exactamente donde estaba, porque el overlay
 *   nunca lo movió;
 * - elegir un proyecto salta a su momento y actualiza el ancla, de modo que la
 *   posición se puede compartir.
 *
 * El foco queda atrapado dentro mientras está abierto: con `role="dialog"` y
 * `aria-modal`, dejar que el tabulador se escape al recorrido de detrás sería
 * mentir sobre el estado de la interfaz.
 */

export type VistazoItem = {
  id: string;
  short: string;
  place: string;
  territoryId: string;
  territoryShort: string;
  family: string;
  familyLabel: string;
  accent: string;
  href: string;
  preview: PlateImage | null;
};

type Props = {
  open: boolean;
  items: VistazoItem[];
  territories: { id: string; short: string }[];
  families: { id: string; label: string }[];
  onClose: () => void;
  onPick: (id: string) => void;
  /** Superficie desde la que se abrió, para heredar el campo. */
  surface: 'dark' | 'paper';
};

export function Vistazo({
  open,
  items,
  territories,
  families,
  onClose,
  onPick,
  surface,
}: Props) {
  const panel = useRef<HTMLDivElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const [territory, setTerritory] = useState<string | null>(null);
  const [family, setFamily] = useState<string | null>(null);
  const [active, setActive] = useState<string | null>(null);

  const visible = useMemo(
    () =>
      items.filter(
        (it) =>
          (!territory || it.territoryId === territory) &&
          (!family || it.family === family),
      ),
    [items, territory, family],
  );

  const activeItem = visible.find((it) => it.id === active) ?? null;

  // Foco al abrir, y atrapado mientras dure.
  useEffect(() => {
    if (!open) return;
    closeBtn.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== 'Tab') return;
      const focusables = panel.current?.querySelectorAll<HTMLElement>(
        'a[href],button:not([disabled])',
      );
      if (!focusables?.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  // El fondo no debe desplazarse detrás del overlay, pero tampoco puede
  // perderse la posición: se bloquea el scroll sin moverlo.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, [open]);

  if (!open) return null;

  return (
    <div
      className={styles.scrim}
      data-surface={surface === 'paper' ? 'paper' : undefined}
      onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        ref={panel}
        className={styles.panel}
        role="dialog"
        aria-modal="true"
        aria-label="Vistazo: índice de proyectos"
      >
        <header className={styles.head}>
          <p className={styles.title}>Vistazo</p>
          <p className={styles.count}>
            {visible.length}<span aria-hidden="true">/</span>{items.length}
          </p>
          <button ref={closeBtn} type="button" className={styles.close} onClick={onClose}>
            Cerrar<span aria-hidden="true"> ✕</span>
          </button>
        </header>

        <div className={styles.filters}>
          <div className={styles.filterRow} role="group" aria-label="Filtrar por territorio">
            <span className={styles.filterLabel}>Territorio</span>
            <button
              type="button" className={styles.chip}
              aria-pressed={territory === null}
              onClick={() => setTerritory(null)}
            >Todos</button>
            {territories.map((t) => (
              <button
                key={t.id} type="button" className={styles.chip}
                aria-pressed={territory === t.id}
                onClick={() => setTerritory(territory === t.id ? null : t.id)}
              >{t.short}</button>
            ))}
          </div>

          <div className={styles.filterRow} role="group" aria-label="Filtrar por familia">
            <span className={styles.filterLabel}>Familia</span>
            <button
              type="button" className={styles.chip}
              aria-pressed={family === null}
              onClick={() => setFamily(null)}
            >Todas</button>
            {families.map((f) => (
              <button
                key={f.id} type="button" className={styles.chip}
                aria-pressed={family === f.id}
                onClick={() => setFamily(family === f.id ? null : f.id)}
              >{f.label}</button>
            ))}
          </div>
        </div>

        <div className={styles.body}>
          <ol className={styles.list} onMouseLeave={() => setActive(null)}>
            {items.map((it) => {
              const hidden = !visible.includes(it);
              return (
                <li key={it.id} className={styles.item} data-hidden={hidden || undefined}>
                  <Link
                    href={`#p${it.id}`}
                    className={styles.row}
                    style={{ '--accent': it.accent } as CSSProperties}
                    data-active={active === it.id || undefined}
                    tabIndex={hidden ? -1 : undefined}
                    onMouseEnter={() => setActive(it.id)}
                    onFocus={() => setActive(it.id)}
                    onClick={(e) => { e.preventDefault(); onPick(it.id); }}
                  >
                    <span className={styles.rowNum}>{it.id}</span>
                    <span className={styles.rowTitle}>{it.short}</span>
                    <span className={styles.rowPlace}>{it.place}</span>
                    <span className={styles.rowFamily}>{it.familyLabel}</span>
                  </Link>
                </li>
              );
            })}
          </ol>

          <div
            className={styles.preview}
            data-on={activeItem ? '' : undefined}
            style={activeItem ? ({ '--accent': activeItem.accent } as CSSProperties) : undefined}
            aria-hidden="true"
          >
            {activeItem?.preview ? (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                key={activeItem.id}
                className={styles.previewImg}
                src={activeItem.preview.src}
                srcSet={activeItem.preview.srcSet}
                sizes="360px"
                alt=""
                loading="lazy"
                decoding="async"
              />
            ) : null}
            {activeItem ? (
              <p className={styles.previewMark}>
                <span>P{activeItem.id}</span>
                <span>{activeItem.territoryShort}</span>
              </p>
            ) : null}
          </div>
        </div>

        <TextureOverlay kind="grain" opacity={0.05} />
      </div>
    </div>
  );
}
