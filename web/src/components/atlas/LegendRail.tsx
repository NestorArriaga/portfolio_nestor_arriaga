import { ReactNode } from 'react';
import styles from './LegendRail.module.css';
import { CartoIcon, CartoIconName } from './CartoIcon';
import { PatternId, pattern } from './CartoPatterns';

/**
 * Leyenda jerárquica de una lámina.
 *
 * Se organiza en grupos con título, como una leyenda impresa, no como una lista
 * plana de filtros. Cada clave declara qué tipo de marca la representa —
 * superficie, trama, línea, nodo o símbolo — y se dibuja con esa misma marca,
 * de modo que la leyenda y el mapa comparten alfabeto.
 *
 * Una clave que no corresponda a una capa real del mapa no debe existir aquí.
 */

export type LayerKeySpec =
  | { kind: 'area'; label: string; color: string; note?: string }
  | { kind: 'pattern'; label: string; patternId: PatternId; color?: string; note?: string }
  | { kind: 'line'; label: string; color?: string; dashed?: boolean; width?: number; note?: string }
  | { kind: 'node'; label: string; color?: string; halo?: boolean; note?: string }
  | { kind: 'symbol'; label: string; icon: CartoIconName; color?: string; note?: string };

export function LayerKey({ spec }: { spec: LayerKeySpec }) {
  const color = 'color' in spec && spec.color ? spec.color : 'var(--accent)';

  return (
    <li className={styles.key}>
      <span className={styles.mark} style={{ color }} aria-hidden="true">
        {spec.kind === 'area' ? (
          <svg viewBox="0 0 18 12"><rect width="18" height="12" fill="currentColor" opacity="0.55" /><rect width="18" height="12" fill="none" stroke="currentColor" strokeWidth="1" /></svg>
        ) : null}

        {spec.kind === 'pattern' ? (
          <svg viewBox="0 0 18 12">
            <rect width="18" height="12" fill={pattern(spec.patternId)} />
            <rect width="18" height="12" fill="none" stroke="currentColor" strokeWidth="0.8" opacity="0.5" />
          </svg>
        ) : null}

        {spec.kind === 'line' ? (
          <svg viewBox="0 0 18 12">
            <line
              x1="0" y1="6" x2="18" y2="6"
              stroke="currentColor"
              strokeWidth={spec.width ?? 1}
              strokeDasharray={spec.dashed ? '3 2.5' : undefined}
            />
          </svg>
        ) : null}

        {spec.kind === 'node' ? (
          <svg viewBox="0 0 18 12">
            {spec.halo ? <circle cx="9" cy="6" r="5" fill="currentColor" opacity="0.22" /> : null}
            <circle cx="9" cy="6" r="2.2" fill="var(--white)" />
            <circle cx="9" cy="6" r="2.2" fill="none" stroke="currentColor" strokeWidth="1" />
          </svg>
        ) : null}

        {spec.kind === 'symbol' ? <CartoIcon name={spec.icon} size={16} /> : null}
      </span>

      <span className={styles.text}>
        <span className={styles.label}>{spec.label}</span>
        {'note' in spec && spec.note ? <span className={styles.note}>{spec.note}</span> : null}
      </span>
    </li>
  );
}

export type LegendGroup = {
  title: string;
  subtitle?: string;
  keys: LayerKeySpec[];
};

export function LegendRail({ groups, children }: { groups: LegendGroup[]; children?: ReactNode }) {
  return (
    <div className={styles.rail}>
      {groups.map((group) => (
        <section key={group.title} className={styles.group}>
          <h3 className={styles.groupTitle}>{group.title}</h3>
          {group.subtitle ? <p className={styles.groupSubtitle}>{group.subtitle}</p> : null}
          <ul className={styles.keys}>
            {group.keys.map((spec) => (
              <LayerKey key={spec.label} spec={spec} />
            ))}
          </ul>
        </section>
      ))}
      {children}
    </div>
  );
}
