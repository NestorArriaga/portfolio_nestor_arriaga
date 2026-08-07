'use client';

import { ReactNode } from 'react';
import styles from './TechnicalCallout.module.css';
import { useReveal } from '@/lib/motion';

/**
 * Anotación técnica sobre un objeto o un mapa.
 *
 * Punto de anclaje cuadrado, quiebre ortogonal y etiqueta al final: la gramática
 * de Reality by Design y de la lámina con insets. Nunca diagonal libre.
 *
 * Las llamadas aparecen *después* del objeto, no antes. Por eso el retardo base
 * de la secuencia es el trazado completo del objeto.
 *
 * El codo se dibuja con dos divs de 1 px, no con un `<path>`. Un SVG con
 * `viewBox` estirado por `preserveAspectRatio="none"` deforma el trazo y, al
 * combinarlo con `stroke-dasharray`, parte la línea en guiones irregulares. Dos
 * bordes CSS dan líneas exactas de 1 px en cualquier proporción, y se animan
 * con `transform: scale`, que va en el compositor.
 */

export type CalloutSpec = {
  /** Punto anclado al objeto, en % del contenedor. */
  x: number;
  y: number;
  /** Posición de la etiqueta, en % del contenedor. */
  labelX: number;
  labelY: number;
  label: ReactNode;
  value?: ReactNode;
  /** Lado por el que la línea entra en la etiqueta. */
  align?: 'left' | 'right';
};

export function TechnicalCallout({
  callouts,
  delay = 'var(--dur-trace)',
}: {
  callouts: CalloutSpec[];
  delay?: string;
}) {
  const { ref, revealed } = useReveal<HTMLDivElement>({ threshold: 0.3 });

  return (
    <div
      ref={ref}
      className={styles.wrap}
      data-revealed={revealed ? 'true' : 'false'}
      style={{ ['--callout-delay' as string]: delay }}
    >
      {callouts.map((c, i) => {
        const align = c.align ?? (c.labelX > c.x ? 'left' : 'right');
        const stepDelay = `calc(var(--callout-delay) + ${i * 90}ms)`;
        // Tramo horizontal: del ancla hasta la vertical de la etiqueta.
        const hLeft = Math.min(c.x, c.labelX);
        const hWidth = Math.abs(c.labelX - c.x);
        // Tramo vertical: de la altura del ancla hasta la de la etiqueta.
        const vTop = Math.min(c.y, c.labelY);
        const vHeight = Math.abs(c.labelY - c.y);

        return (
          <div key={i} className={styles.callout}>
            <span
              className={styles.horizontal}
              style={{
                left: `${hLeft}%`,
                top: `${c.y}%`,
                width: `${hWidth}%`,
                // Se dibuja desde el ancla hacia la etiqueta, no al revés.
                transformOrigin: c.labelX > c.x ? 'left center' : 'right center',
                transitionDelay: stepDelay,
              }}
            />
            <span
              className={styles.vertical}
              style={{
                left: `${c.labelX}%`,
                top: `${vTop}%`,
                height: `${vHeight}%`,
                transformOrigin: c.labelY > c.y ? 'center top' : 'center bottom',
                transitionDelay: `calc(${stepDelay} + 120ms)`,
              }}
            />
            {/* Ancla cuadrada, no circular: es una marca de registro. */}
            <span
              className={styles.anchor}
              style={{ left: `${c.x}%`, top: `${c.y}%`, transitionDelay: stepDelay }}
            />

            <figure
              className={styles.label}
              data-align={align}
              style={{
                left: `${c.labelX}%`,
                top: `${c.labelY}%`,
                transitionDelay: `calc(${stepDelay} + 240ms)`,
              }}
            >
              <figcaption className={styles.labelText}>{c.label}</figcaption>
              {c.value ? <span className={styles.labelValue}>{c.value}</span> : null}
            </figure>
          </div>
        );
      })}
    </div>
  );
}
