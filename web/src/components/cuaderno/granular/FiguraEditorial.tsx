import { CSSProperties, ReactNode } from 'react';
import type { GranularVisual } from '@/content/granularVisuals';
import styles from './GranularVisuals.module.css';

interface Props {
  visual: GranularVisual;
  children?: ReactNode;
  /** Componente inyectado para mostrar la visualización interactiva si la hay */
  renderAsset?: () => ReactNode;
  className?: string;
}

export function FiguraEditorial({ visual, children, renderAsset, className = '' }: Props) {
  // Hide empty/burocratic fields
  const showPeriod = visual.period && visual.period.toLowerCase() !== 'no aplica' && visual.period !== 'Año no indicado explícitamente' && visual.period !== 'Año no documentado' && visual.period !== 'Año no indicado';
  const showUnit = visual.unit && visual.unit.toLowerCase() !== 'sin unidad';
  const showScope = visual.scope;
  const sourceText = visual.source === 'Fuente específica no indicada en la composición' ? undefined : visual.source;

  return (
    <figure className={`${styles.figuraEditorial} ${styles.granularScope} ${className}`} aria-label={visual.title}>
      <div className={styles.assetContainer}>
        {renderAsset ? (
          renderAsset()
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={visual.asset.src}
            alt={visual.alt}
            width={visual.asset.width}
            height={visual.asset.height}
            loading="lazy"
            decoding="async"
            style={{
              aspectRatio: `${visual.asset.width} / ${visual.asset.height}`,
              width: '100%',
              height: 'auto',
              display: 'block',
              objectFit: 'contain',
            }}
          />
        )}
      </div>

      <figcaption className={styles.figcaption}>
        <div className={styles.metaRow}>
          <p className={styles.figTitle}>{visual.title}</p>
        </div>

        <div className={styles.metaGrid}>
          {showScope && (
            <div className={styles.metaGroup}>
              <span className={`${styles.metaLabel} mono`}>Ámbito</span>
              <span className={`${styles.metaValue} mono`}>{visual.scope}</span>
            </div>
          )}
          {showPeriod && (
            <div className={styles.metaGroup}>
              <span className={`${styles.metaLabel} mono`}>Periodo</span>
              <span className={`${styles.metaValue} mono`}>{visual.period}</span>
            </div>
          )}
          {showUnit && (
            <div className={styles.metaGroup}>
              <span className={`${styles.metaLabel} mono`}>Unidad</span>
              <span className={`${styles.metaValue} mono`}>{visual.unit}</span>
            </div>
          )}
          {sourceText && (
            <div className={styles.metaGroup}>
              <span className={`${styles.metaLabel} mono`}>Procedencia</span>
              <span className={`${styles.metaValue} mono`}>{sourceText}</span>
            </div>
          )}
        </div>

        {visual.caption && (
          <p className={`${styles.captionText} mono`}>{visual.caption}</p>
        )}

        {visual.limitations && (
          <p className={`${styles.limitations} mono`}>
            <strong>Alcance: </strong>
            {visual.limitations}
          </p>
        )}

        {children}
      </figcaption>
    </figure>
  );
}
