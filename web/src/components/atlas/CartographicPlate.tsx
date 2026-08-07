import { CSSProperties, ReactNode } from 'react';
import styles from './CartographicPlate.module.css';

/**
 * Lámina cartográfica editorial.
 *
 * Reparte 28 % de columna informativa y 72 % de campo cartográfico, la
 * proporción de las referencias Food y Tourism. El mapa nunca vive dentro de
 * una tarjeta: el campo es un contenedor a sangre sin borde propio ni fondo
 * elevado.
 *
 * En móvil no encoge: reordena a título, mapa, leyenda, detalles. Esa es la
 * razón de que la columna se parta en dos ranuras (`aside` antes del campo,
 * `detail` después) en vez de ser un solo bloque.
 */

type Props = {
  /** Encabezado de la lámina: título y subtítulo. Va sobre la columna. */
  heading: ReactNode;
  /** Leyenda y claves. En móvil aparece después del mapa. */
  aside?: ReactNode;
  /** Notas, fuentes o advertencias. Siempre al final. */
  detail?: ReactNode;
  /** El campo cartográfico. */
  children: ReactNode;
  /** Acento del capítulo. Se inyecta como `--accent` para todo el subárbol. */
  accent?: string;
  /** Marca de sección: número de proyecto, región, disciplina. */
  marks?: ReactNode;
  className?: string;
  style?: CSSProperties;
};

export function CartographicPlate({
  heading,
  aside,
  detail,
  children,
  accent,
  marks,
  className,
  style,
}: Props) {
  const vars = accent ? ({ '--accent': accent } as CSSProperties) : undefined;

  return (
    <section
      className={[styles.plate, className].filter(Boolean).join(' ')}
      style={{ ...vars, ...style }}
    >
      {marks ? <div className={styles.marks}>{marks}</div> : null}

      <div className={styles.column}>
        <header className={styles.heading}>{heading}</header>
        {aside ? <div className={styles.aside}>{aside}</div> : null}
        {detail ? <div className={styles.detail}>{detail}</div> : null}
      </div>

      <div className={styles.field}>{children}</div>
    </section>
  );
}

/** Título de lámina. Grotesca condensada, sin adorno. */
export function PlateTitle({ children, kicker }: { children: ReactNode; kicker?: ReactNode }) {
  return (
    <>
      {kicker ? <p className={styles.kicker}>{kicker}</p> : null}
      <h2 className={styles.title}>{children}</h2>
    </>
  );
}

export function PlateLede({ children }: { children: ReactNode }) {
  return <p className={styles.lede}>{children}</p>;
}

/** Fila de datos técnicos: par etiqueta/valor en monoespaciada. */
export function PlateFacts({ items }: { items: { label: string; value: ReactNode }[] }) {
  return (
    <dl className={styles.facts}>
      {items.map((it) => (
        <div key={it.label} className={styles.fact}>
          <dt>{it.label}</dt>
          <dd>{it.value}</dd>
        </div>
      ))}
    </dl>
  );
}
