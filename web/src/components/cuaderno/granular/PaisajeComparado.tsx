'use client';

import { CSSProperties, useState } from 'react';

import { granularVisuals } from '@/content/granularVisuals';
import { FiguraEditorial } from './FiguraEditorial';
import styles from './Granular.module.css';

/**
 * Agropecuario — los dos paisajes como un solo comparador.
 *
 * Antes eran dos imágenes en una rejilla, una junto a la otra y sin dirección:
 * el lector veía dos ilustraciones, no un cambio. Aquí ocupan el mismo encuadre
 * y se alternan, que es lo que convierte la pareja en una lectura: lo que se
 * mueve entre un estado y otro es exactamente lo que la fuente documenta.
 *
 * El control son dos botones con `aria-pressed`, operables con teclado y con el
 * dedo. No hay tirador de un píxel ni dependencia del scroll.
 */

export function PaisajeComparado() {
  const agricola = granularVisuals.paisajeAgricola;
  const agropecuario = granularVisuals.paisajeAgropecuario;
  const [estado, setEstado] = useState<'agricola' | 'agropecuario'>('agricola');

  const activo = estado === 'agricola' ? agricola : agropecuario;

  // La ficha del comparador es la de la pieza en pantalla, con el título de la
  // pareja: los dos esquemas comparten ámbito y procedencia.
  const ficha = {
    ...activo,
    title: 'Dos paisajes productivos',
    caption:
      'El mismo encuadre en dos estados: el paisaje agrícola y el paisaje'
      + ' agropecuario intensificado, tal como los esquematiza la fuente.',
  };

  return (
    <FiguraEditorial visual={ficha} tituloComo="h3" obra={(
      <div className={styles.parejaEstados}>
        {[agricola, agropecuario].map((v, n) => (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img key={v.id} src={v.asset.src} srcSet={v.asset.srcSet}
               sizes="92vw" alt={v.alt}
               width={Math.round(v.asset.width)} height={Math.round(v.asset.height)}
               data-on={String((n === 0) === (estado === 'agricola'))}
               aria-hidden={(n === 0) !== (estado === 'agricola')}
               loading="lazy" decoding="async" />
        ))}
      </div>
    )}>
      <ul className={styles.estados} role="group" aria-label="Estados del paisaje">
        {([['agricola', agricola], ['agropecuario', agropecuario]] as const).map(([id, v]) => (
          <li key={id}>
            <button type="button" className={styles.estado}
                    style={{ '--c': 'var(--acento)' } as CSSProperties}
                    aria-pressed={estado === id}
                    onClick={() => setEstado(id)}>
              <i aria-hidden="true" />
              <span>{v.title}</span>
            </button>
          </li>
        ))}
      </ul>
    </FiguraEditorial>
  );
}
