'use client';

import { useId } from 'react';
import styles from './FlowCycle.module.css';
import { useReveal } from '@/lib/motion';

/**
 * Ciclo de flujo con partículas.
 *
 * Reconstruye el diagrama radial de la fuente —agua, forrajes, vacas, leche—
 * como geometría dibujada y texto real. El original trae los rótulos como
 * contornos vectoriales: se ven bien pero no son texto, así que no se
 * seleccionan, no se buscan y un lector de pantalla no los encuentra. La
 * dirección de arte lo prohíbe explícitamente.
 *
 * La geometría es un círculo, y eso no es una afirmación territorial: el
 * diagrama de origen tampoco lo es. Lo que viene de la fuente son los cuatro
 * términos y el sentido del ciclo; la circunferencia solo los ordena.
 *
 * Aquí el movimiento sí explica algo. Una partícula recorriendo el ciclo
 * muestra que el agua vuelve a entrar: es la forma del argumento del capítulo,
 * no un adorno. Por eso es de los pocos sitios donde hay un bucle continuo, y
 * dura más de los ocho segundos que fija la dirección de arte.
 */

export type CycleNode = { label: string; note?: string };

type Props = {
  nodes: CycleNode[];
  /** Segundos de una vuelta completa. Nunca por debajo de 8. */
  period?: number;
  caption?: string;
};

const R = 34;
const CENTER = 50;

export function FlowCycle({ nodes, period = 16, caption }: Props) {
  const { ref, revealed, reduced } = useReveal<HTMLDivElement>({ threshold: 0.3 });
  const uid = useId().replace(/:/g, '');

  const count = nodes.length;
  // Se arranca arriba y se gira en el sentido de las agujas del reloj, que es
  // el del diagrama de origen.
  const angleOf = (i: number) => (i / count) * Math.PI * 2 - Math.PI / 2;
  const pointOf = (i: number) => ({
    x: CENTER + R * Math.cos(angleOf(i)),
    y: CENTER + R * Math.sin(angleOf(i)),
  });

  /** Arco entre dos nodos consecutivos, curvado por el propio radio. */
  const arc = (i: number) => {
    const a = pointOf(i);
    const b = pointOf((i + 1) % count);
    return `M ${a.x.toFixed(2)} ${a.y.toFixed(2)} A ${R} ${R} 0 0 1 ${b.x.toFixed(2)} ${b.y.toFixed(2)}`;
  };

  return (
    <div ref={ref} className={styles.wrap} data-revealed={revealed ? 'true' : 'false'}>
      <svg className={styles.svg} viewBox="0 0 100 100" role="img"
        aria-label={`Ciclo: ${nodes.map((n) => n.label).join(' → ')}, y vuelta al inicio`}>
        <defs>
          {nodes.map((_, i) => (
            <path key={i} id={`${uid}-arc-${i}`} d={arc(i)} fill="none" />
          ))}
        </defs>

        {/* Circunferencia de referencia, muy tenue. */}
        <circle className={styles.ring} cx={CENTER} cy={CENTER} r={R} />

        {nodes.map((_, i) => (
          <g key={`seg-${i}`}>
            <path
              className={styles.arc}
              d={arc(i)}
              pathLength={1}
              vectorEffect="non-scaling-stroke"
              style={{ transitionDelay: `${i * 160}ms` }}
            />
            {/* Punta de flecha al final del arco, para que el sentido se lea
                sin depender del movimiento. */}
            <use
              className={styles.head}
              href={`#${uid}-arc-${i}`}
              markerEnd={`url(#${uid}-head)`}
            />
          </g>
        ))}

        <defs>
          <marker id={`${uid}-head`} viewBox="0 0 8 8" refX="6" refY="4"
            markerWidth="5" markerHeight="5" orient="auto-start-reverse">
            <path d="M0 0 L8 4 L0 8 z" fill="currentColor" />
          </marker>
        </defs>

        {/* Las partículas solo existen si van a moverse. Con movimiento
            reducido, un punto quieto sobre un arco no significa nada. */}
        {!reduced && revealed
          ? nodes.map((_, i) => (
              <circle key={`p-${i}`} className={styles.particle} r="1.1">
                <animateMotion
                  dur={`${period / count}s`}
                  begin={`${(i * period) / count}s`}
                  repeatCount="indefinite"
                  rotate="auto"
                >
                  <mpath href={`#${uid}-arc-${i}`} />
                </animateMotion>
              </circle>
            ))
          : null}

        {nodes.map((n, i) => {
          const p = pointOf(i);
          return (
            <g key={`n-${i}`} className={styles.node} style={{ transitionDelay: `${i * 160 + 300}ms` }}>
              <circle className={styles.halo} cx={p.x} cy={p.y} r="5.5" />
              <circle className={styles.dot} cx={p.x} cy={p.y} r="2" />
              <text
                className={styles.label}
                x={p.x}
                y={p.y}
                textAnchor="middle"
                dy={p.y < CENTER ? -8 : 12}
              >
                {n.label}
              </text>
            </g>
          );
        })}
      </svg>

      {caption ? <p className={styles.caption}>{caption}</p> : null}
    </div>
  );
}
