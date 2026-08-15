'use client';

import { CSSProperties, useState } from 'react';

import { granularVisuals } from '@/content/granularVisuals';
import { FiguraEditorial } from './FiguraEditorial';
import styles from './Granular.module.css';
import propio from './Radar.module.css';

/**
 * Agua — lectura progresiva del radar de tensiones y políticas, 1990–2025.
 *
 * El diagrama original ordena su contenido en tres franjas de izquierda a
 * derecha: las tensiones, sus efectos sobre el territorio y los acuíferos, y
 * las respuestas institucionales. La página anterior superponía tres capas con
 * `clip-path` fijo y un velo que se activaba al revés, así que el gesto no
 * descubría nada: las tres franjas se veían igual en todos los estados.
 *
 * Aquí hay **una sola fuente de progreso** —el paso activo— y un único velo que
 * se recorta sobre la franja correspondiente. Nada se anima por debajo; el
 * cambio es un estado discreto, operable con puntero, teclado y tacto.
 */

type Paso = {
  id: string;
  etiqueta: string;
  /** Franja del diagrama, en porcentaje del ancho. */
  desde: number;
  hasta: number;
  lectura: string;
};

/* Los cortes salen de la composición: tres columnas de contenido con un
   solape corto entre ellas, que es donde el diagrama traza sus enlaces. */
const PASOS: Paso[] = [
  {
    id: 'tensiones',
    etiqueta: 'Tensiones',
    desde: 0,
    hasta: 36,
    lectura: 'Las presiones que el diagrama sitúa en el origen del sistema.',
  },
  {
    id: 'territorio',
    etiqueta: 'Territorio',
    desde: 32,
    hasta: 70,
    lectura: 'Los efectos que la composición registra sobre el territorio y los acuíferos.',
  },
  {
    id: 'respuestas',
    etiqueta: 'Respuestas',
    desde: 64,
    hasta: 100,
    lectura: 'Las instituciones y políticas con las que la fuente cierra la secuencia.',
  },
  {
    id: 'sistema',
    etiqueta: 'Sistema',
    desde: 0,
    hasta: 100,
    lectura: 'Las tres franjas a la vez, con los enlaces que las relacionan.',
  },
];

export function RadarTensiones() {
  const visual = granularVisuals.aguaRadar;
  const [i, setI] = useState(0);
  const paso = PASOS[i];
  const completo = paso.desde === 0 && paso.hasta === 100;

  return (
    <FiguraEditorial visual={visual} tituloComo="h3" fondo="tinta" obra={(
      <div className={styles.escenario}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={visual.asset.src} srcSet={visual.asset.srcSet}
             sizes="92vw" alt={visual.alt}
             width={Math.round(visual.asset.width)} height={Math.round(visual.asset.height)}
             loading="lazy" decoding="async" />
        {/* Un velo, no tres capas: lo que no está en el paso activo se atenúa
            en lugar de taparse, para no perder la lectura del conjunto. */}
        <span className={styles.velo} aria-hidden="true"
              style={{
                '--a': `${paso.desde}%`,
                '--b': `${paso.hasta}%`,
                opacity: completo ? 0 : 1,
              } as CSSProperties} />
      </div>
    )}>
      <div className={propio.instrumento}>
        {/* Línea temporal del propio diagrama: 1990–2025, tal como la rotula. */}
        <p className={`${propio.tiempo} mono`} aria-hidden="true">
          <span>1990</span><i /><span>2025</span>
        </p>

        <ul className={styles.estados} role="group" aria-label="Recorrido del diagrama">
          {PASOS.map((p, n) => (
            <li key={p.id}>
              <button type="button" className={styles.estado}
                      style={{ '--c': 'var(--acento)' } as CSSProperties}
                      aria-pressed={i === n}
                      onClick={() => setI(n)}>
                <i aria-hidden="true" />
                <span>{p.etiqueta}</span>
              </button>
            </li>
          ))}
        </ul>

        <p className={`${propio.lectura} mono`} aria-live="polite">{paso.lectura}</p>

        <p className={`${propio.cautela} mono`}>
          Relaciones documentadas por la fuente. La composición no calcula
          correlaciones ni afirma causalidad.
        </p>
      </div>
    </FiguraEditorial>
  );
}
