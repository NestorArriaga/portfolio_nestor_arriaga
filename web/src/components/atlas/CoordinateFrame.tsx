'use client';

import { CSSProperties, ReactNode } from 'react';
import styles from './CoordinateFrame.module.css';

/**
 * Marco de coordenadas de una lámina cartográfica.
 *
 * Dibuja la cuadrícula interior y las marcas numéricas en los cuatro lados, como
 * en una lámina impresa. Los valores no son decorativos: se interpolan sobre la
 * extensión real que se le pasa, así que las marcas de un mapa corresponden a
 * su territorio.
 *
 * Si no se conoce la extensión, se omiten los números y quedan solo las marcas.
 * Es preferible a inventar coordenadas.
 */

export type Extent = {
  /** [oeste, sur, este, norte] en las unidades del sistema declarado. */
  bbox: [number, number, number, number];
  /** Se muestra en la esquina: "EPSG:6372", "WGS 84". */
  srs?: string;
};

type Props = {
  children: ReactNode;
  extent?: Extent;
  /** Divisiones de la cuadrícula. */
  columns?: number;
  rows?: number;
  className?: string;
  style?: CSSProperties;
};

function formatTick(value: number): string {
  const abs = Math.abs(value);
  if (abs >= 100000) return Math.round(value).toString();
  if (abs >= 100) return value.toFixed(0);
  return value.toFixed(3);
}

export function CoordinateFrame({
  children,
  extent,
  columns = 6,
  rows = 6,
  className,
  style,
}: Props) {
  const xs = Array.from({ length: columns + 1 }, (_, i) => i / columns);
  const ys = Array.from({ length: rows + 1 }, (_, i) => i / rows);
  // Los rieles verticales omiten sus extremos: en las esquinas chocarían con
  // las cifras horizontales, que se leen antes.
  const yTicks = ys.slice(1, -1);

  const at = (t: number, lo: number, hi: number) => lo + t * (hi - lo);
  const bbox = extent?.bbox;

  return (
    <div className={[styles.frame, className].filter(Boolean).join(' ')} style={style}>
      {/* Cuadrícula. Puramente gráfica: el lector la usa para situarse, los
          lectores de pantalla no ganan nada con ella. */}
      <svg className={styles.grid} aria-hidden="true" preserveAspectRatio="none" viewBox="0 0 100 100">
        {xs.slice(1, -1).map((t) => (
          <line key={`v${t}`} x1={t * 100} y1={0} x2={t * 100} y2={100} vectorEffect="non-scaling-stroke" />
        ))}
        {ys.slice(1, -1).map((t) => (
          <line key={`h${t}`} x1={0} y1={t * 100} x2={100} y2={t * 100} vectorEffect="non-scaling-stroke" />
        ))}
      </svg>

      <div className={styles.field}>{children}</div>

      {/* Marcas de los cuatro lados. */}
      <div className={`${styles.rail} ${styles.top}`} aria-hidden="true">
        {xs.map((t) => (
          <span key={t} className={styles.tick} style={{ left: `${t * 100}%` }}>
            {bbox ? formatTick(at(t, bbox[0], bbox[2])) : ''}
          </span>
        ))}
      </div>
      <div className={`${styles.rail} ${styles.bottom}`} aria-hidden="true">
        {xs.map((t) => (
          <span key={t} className={styles.tick} style={{ left: `${t * 100}%` }}>
            {bbox ? formatTick(at(t, bbox[0], bbox[2])) : ''}
          </span>
        ))}
      </div>
      <div className={`${styles.rail} ${styles.left}`} aria-hidden="true">
        {yTicks.map((t) => (
          <span key={t} className={styles.tick} style={{ top: `${t * 100}%` }}>
            {bbox ? formatTick(at(1 - t, bbox[1], bbox[3])) : ''}
          </span>
        ))}
      </div>
      <div className={`${styles.rail} ${styles.right}`} aria-hidden="true">
        {yTicks.map((t) => (
          <span key={t} className={styles.tick} style={{ top: `${t * 100}%` }}>
            {bbox ? formatTick(at(1 - t, bbox[1], bbox[3])) : ''}
          </span>
        ))}
      </div>

      {extent?.srs ? <span className={styles.srs}>{extent.srs}</span> : null}
    </div>
  );
}

/**
 * Barra de escala. Requiere saber cuántos metros mide el ancho del campo; sin
 * ese dato no se dibuja, porque una escala inventada es peor que ninguna.
 */
export function ScaleBar({ metersPerField, fieldFraction = 0.22 }: {
  metersPerField: number;
  fieldFraction?: number;
}) {
  if (!Number.isFinite(metersPerField) || metersPerField <= 0) return null;

  const target = metersPerField * fieldFraction;
  // Redondeo a 1, 2 o 5 por década: los valores que usa una escala impresa.
  const pow = Math.pow(10, Math.floor(Math.log10(target)));
  const nice = [1, 2, 5, 10].map((m) => m * pow).reduce((a, b) =>
    Math.abs(b - target) < Math.abs(a - target) ? b : a);
  const width = (nice / metersPerField) * 100;
  const label = nice >= 1000 ? `${nice / 1000} km` : `${nice} m`;

  return (
    <div className={styles.scale} style={{ width: `${width}%` }}>
      <svg className={styles.scaleBar} viewBox="0 0 100 6" preserveAspectRatio="none" aria-hidden="true">
        <rect x="0" y="2" width="50" height="2" fill="currentColor" />
        <rect x="50" y="2" width="50" height="2" fill="currentColor" opacity="0.28" />
        <path d="M0 0 V6 M50 0 V6 M100 0 V6" stroke="currentColor" strokeWidth="1" vectorEffect="non-scaling-stroke" />
      </svg>
      <span className={styles.scaleLabel}>
        0<span aria-hidden="true">{' '}</span>{label}
      </span>
    </div>
  );
}

/** Rosa de orientación reducida a lo indispensable. */
export function NorthArrow({ size = 34 }: { size?: number }) {
  return (
    <svg
      className={styles.north}
      width={size}
      height={size}
      viewBox="0 0 34 34"
      role="img"
      aria-label="Norte"
      fill="none"
      stroke="currentColor"
    >
      <path d="M17 4 L17 30" strokeWidth="1" />
      <path d="M11 30 L17 4 L23 30" strokeWidth="1" />
      <path d="M11 30 L17 25 L23 30 Z" fill="currentColor" stroke="none" />
      <circle cx="17" cy="17" r="13" strokeWidth="0.8" opacity="0.3" />
      <text x="17" y="3" textAnchor="middle" fontSize="6" fill="currentColor" stroke="none">N</text>
    </svg>
  );
}
