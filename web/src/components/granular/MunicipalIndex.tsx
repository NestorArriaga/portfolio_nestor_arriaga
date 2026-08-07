'use client';

import { useState } from 'react';
import styles from './MunicipalIndex.module.css';
import { useReveal, stagger } from '@/lib/motion';
import type { Municipio } from '@/lib/atlas';

/**
 * Índice de los quince municipios de la Comarca.
 *
 * Cada silueta es geometría vectorial real, trazada con `stroke-dashoffset` al
 * entrar. Son lo único vectorial que hay del territorio; el resto son mapas de
 * bits.
 *
 * No es un mapa y no pretende serlo. Los municipios se exportaron uno por hoja,
 * cada uno escalado para llenarla, así que ni comparten escala ni se pueden
 * situar unos respecto a otros. Presentarlos en una retícula de siluetas es la
 * lectura que la fuente permite; montarlos sobre el mapa de la Comarca pondría
 * cada límite donde no está.
 *
 * El aviso de escala va en la interfaz, no solo en un comentario: quien mire
 * quince siluetas del mismo tamaño supondrá que miden lo mismo si nadie lo
 * desmiente.
 */

type Props = {
  municipios: Municipio[];
  /** Municipios que el texto de la fuente menciona por nombre. */
  highlight?: string[];
};

export function MunicipalIndex({ municipios, highlight = [] }: Props) {
  const { ref, revealed } = useReveal<HTMLDivElement>({ threshold: 0.1 });
  const [active, setActive] = useState<string | null>(null);

  const marked = new Set(highlight);
  const coahuila = municipios.filter((m) => m.estado === 'Coahuila');
  const durango = municipios.filter((m) => m.estado === 'Durango');

  return (
    <div ref={ref} className={styles.index} data-revealed={revealed ? 'true' : 'false'}>
      {[
        { estado: 'Coahuila', items: coahuila },
        { estado: 'Durango', items: durango },
      ].map((group) => (
        <section key={group.estado} className={styles.group}>
          <h3 className={styles.estado}>
            {group.estado}
            <span className={styles.count}>{group.items.length}</span>
          </h3>

          <ul className={styles.grid}>
            {group.items.map((m, i) => (
              <li
                key={m.slug}
                className={styles.cell}
                data-active={active === m.slug ? 'true' : 'false'}
                data-marked={marked.has(m.name) ? 'true' : 'false'}
                style={{ transitionDelay: stagger(i, 60) }}
                onMouseEnter={() => setActive(m.slug)}
                onMouseLeave={() => setActive(null)}
                onFocus={() => setActive(m.slug)}
                onBlur={() => setActive(null)}
                tabIndex={0}
              >
                <svg
                  className={styles.silhouette}
                  viewBox={m.viewBox}
                  role="img"
                  aria-label={`Silueta de ${m.name}`}
                  preserveAspectRatio="xMidYMid meet"
                >
                  {m.paths.map((d, j) => (
                    <path
                      key={j}
                      d={d}
                      pathLength={1}
                      vectorEffect="non-scaling-stroke"
                      style={{ transitionDelay: stagger(i, 60) }}
                    />
                  ))}
                </svg>
                <span className={styles.name}>{m.name}</span>
              </li>
            ))}
          </ul>
        </section>
      ))}

      <p className={styles.note}>
        Siluetas a escala propia, no comparable entre sí: cada municipio se
        exportó escalado a su hoja. Sirven para reconocer forma y nombre, no para
        comparar superficies ni para situar un municipio respecto a otro.
      </p>
    </div>
  );
}
