'use client';

import { CSSProperties, useState } from 'react';

import { granularVisuals } from '@/content/granularVisuals';
import { FiguraEditorial } from './FiguraEditorial';
import { VisorDetalle } from './VisorDetalle';
import styles from './Granular.module.css';

/**
 * Agropecuario — explorador de la estructura agrícola en tres vistas.
 *
 * Los tres diagramas describen **el mismo conjunto de datos** —cultivos y
 * municipios en hectáreas— con tres lecturas distintas: el flujo entre unos y
 * otros, la concentración por municipio y la red funcional. Presentarlos como
 * tres figuras consecutivas hacía pensar en tres análisis; presentarlos como
 * tres estados de una misma pieza es lo que la fuente afirma.
 *
 * El cambio es discreto y accesible: pestañas con `aria-selected`, navegables
 * con las flechas del teclado como manda el patrón de tablist.
 */

const VISTAS = [
  { id: 'flujos', etiqueta: 'Flujos', visual: () => granularVisuals.cultivosFlujos },
  { id: 'concentracion', etiqueta: 'Concentración', visual: () => granularVisuals.cultivosConcentracion },
  { id: 'red', etiqueta: 'Red radial', visual: () => granularVisuals.cultivosRed },
];

export function CultivosExplorer() {
  const [i, setI] = useState(0);
  const [visor, setVisor] = useState(false);
  const visual = VISTAS[i].visual();

  const flecha = (e: React.KeyboardEvent) => {
    const paso = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
    if (!paso) return;
    e.preventDefault();
    const n = (i + paso + VISTAS.length) % VISTAS.length;
    setI(n);
    // El foco sigue a la pestaña activa, como espera el patrón.
    (e.currentTarget.parentElement?.querySelectorAll('button')[n] as HTMLElement)?.focus();
  };

  return (
    <>
      <FiguraEditorial visual={visual} tituloComo="h3" obra={(
        /* eslint-disable-next-line @next/next/no-img-element */
        <img src={visual.asset.src} srcSet={visual.asset.srcSet}
             sizes="92vw" alt={visual.alt}
             width={Math.round(visual.asset.width)} height={Math.round(visual.asset.height)}
             loading="lazy" decoding="async" />
      )}>
        <div className={styles.controles}>
          <ul className={styles.estados} role="tablist"
              aria-label="Lecturas de la estructura agrícola">
            {VISTAS.map((v, n) => (
              <li key={v.id} role="presentation">
                <button type="button" role="tab" className={styles.estado}
                        style={{ '--c': 'var(--acento)' } as CSSProperties}
                        aria-selected={i === n}
                        tabIndex={i === n ? 0 : -1}
                        onKeyDown={flecha}
                        onClick={() => setI(n)}>
                  <i aria-hidden="true" />
                  <span>{v.etiqueta}</span>
                </button>
              </li>
            ))}
          </ul>

          <button type="button" className={`btn ${styles.controlesFin}`} data-v="borde" data-touch
                  onClick={() => setVisor(true)}>
            Abrir detalle
          </button>
        </div>
      </FiguraEditorial>

      <VisorDetalle
        abierto={visor}
        onCerrar={() => setVisor(false)}
        src={visual.asset.printSrc ?? visual.asset.src}
        alt={`Detalle ampliado. ${visual.alt}`}
        titulo={visual.title}
      />
    </>
  );
}
