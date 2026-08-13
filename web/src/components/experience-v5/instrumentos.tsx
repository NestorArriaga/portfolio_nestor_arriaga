'use client';

import { CSSProperties } from 'react';

import type { Acto } from './registry';
import styles from './instrumentos.module.css';

/**
 * Los instrumentos que acompañan a una obra.
 *
 * El espacio que queda libre alrededor de la lámina no se rellena con adorno:
 * lleva las dos únicas cosas que el proyecto puede afirmar con material real.
 *
 *   COORDENADA  la posición verificada del territorio, sobre una retícula de
 *               meridianos y paralelos. Sólo aparece donde existe: cuatro de
 *               los seis territorios tienen coordenada derivada de la
 *               proyección inversa; Metztitlán y la Comarca no, y ahí el
 *               instrumento sencillamente no se dibuja.
 *   LEYENDA     las clases impresas en la lámina, como control. Señalar una
 *               enciende su clase sobre el mapa; las demás bajan contraste
 *               pero siguen legibles, que es lo que permite comparar.
 *
 * No hay barra de escala porque no hay extensión medida para estas láminas.
 * Dibujar una sería inventar una distancia.
 */

export function Instrumentos({
  coordenada, claves, activa, onActiva, acto,
}: {
  coordenada?: { lat: number; lng: number; nombre: string } | null;
  claves: { label: string; color: string; activable?: boolean }[];
  activa: string | null;
  onActiva: (v: string | null) => void;
  acto: Acto;
}) {
  if (!coordenada && !claves.length) return null;

  return (
    <div className={styles.instrumentos}>
      <p className={`${styles.acto} mono`}>{acto}</p>

      {coordenada ? <Coordenada {...coordenada} /> : null}

      {claves.length ? (
        <div className={styles.leyenda} role="group" aria-label="Clases de la lámina">
          {claves.map((k, i) => (
            k.activable === false ? (
              // Sin máscara no hay nada que encender: la clase sigue en la
              // leyenda como información, pero no finge ser un control.
              <p key={k.label} className={`${styles.clase} mono`} data-inerte=""
                 style={{ '--c': k.color, '--i': String(i) } as CSSProperties}>
                <i aria-hidden="true" />{k.label}
              </p>
            ) : (
              <button
                key={k.label}
                type="button" data-touch
                className={`${styles.clase} mono`}
                style={{ '--c': k.color, '--i': String(i) } as CSSProperties}
                aria-pressed={activa === k.label}
                onPointerEnter={() => onActiva(k.label)}
                onPointerLeave={() => onActiva(null)}
                onFocus={() => onActiva(k.label)}
                onBlur={() => onActiva(null)}
                onClick={() => onActiva(activa === k.label ? null : k.label)}
              >
                <i aria-hidden="true" />{k.label}
              </button>
            )
          ))}
        </div>
      ) : null}
    </div>
  );
}

/**
 * La coordenada sobre una retícula mínima. El punto cae donde le corresponde
 * por su latitud y longitud dentro del encuadre de México continental
 * (14–33 °N, 118–86 °O), que es el mismo marco del que salieron los
 * marcadores del globo.
 */
function Coordenada({ lat, lng, nombre }: { lat: number; lng: number; nombre: string }) {
  const x = ((lng + 118) / 32) * 100;
  const y = ((33 - lat) / 19) * 100;

  return (
    <figure className={styles.coordenada}>
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        {[25, 50, 75].map((v) => (
          <line key={`v${v}`} x1={v} y1="0" x2={v} y2="100" className={styles.malla} />
        ))}
        {[25, 50, 75].map((v) => (
          <line key={`h${v}`} x1="0" y1={v} x2="100" y2={v} className={styles.malla} />
        ))}
        <line x1={x} y1="0" x2={x} y2="100" className={styles.cruz} />
        <line x1="0" y1={y} x2="100" y2={y} className={styles.cruz} />
        <circle cx={x} cy={y} r="2.6" className={styles.punto} />
      </svg>
      <figcaption className="mono">
        <b>{nombre}</b>
        <span>{`${lat.toFixed(2)}° ${lng.toFixed(2)}°`}</span>
      </figcaption>
    </figure>
  );
}
