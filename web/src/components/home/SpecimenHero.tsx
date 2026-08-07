'use client';

import styles from './SpecimenHero.module.css';
import { LayerStack, StackLayer } from '@/components/atlas/LayerStack';
import { TechnicalCallout, CalloutSpec } from '@/components/atlas/TechnicalCallout';
import { TextureOverlay } from '@/components/atlas/TextureOverlay';
import type { LayerImage } from '@/lib/atlas';

/**
 * Hero del home — gramática de Reality by Design.
 *
 * Un fragmento de territorio real aislado sobre campo negro, tratado como
 * espécimen escaneado, con líneas de llamada ortogonales y mucho espacio
 * negativo. El objeto ocupa entre el 50 y el 65 % del viewport; la tipografía y
 * los datos viven fuera de la imagen, nunca incrustados en ella.
 *
 * Las llamadas entran después del objeto: primero se reconoce qué es, luego se
 * lee cómo está hecho.
 */

type Props = {
  object: LayerImage;
  ratio: number;
  callouts: CalloutSpec[];
  identity: {
    name: string;
    role: string;
    line: string;
    institution: string;
    year: string;
    intro: string;
  };
};

export function SpecimenHero({ object, ratio, callouts, identity }: Props) {
  return (
    <header className={styles.hero}>
      <div className={styles.marks}>
        <span>{identity.institution}</span>
        <span>{identity.line}</span>
        <span>{identity.year}</span>
      </div>

      <div className={styles.stage}>
        <div className={styles.object}>
          <LayerStack ratio={ratio} className={styles.stack}>
            <StackLayer
              {...object}
              alt="Recorte satelital de la Comarca Lagunera"
              sizes="(max-width: 900px) 86vw, 46vw"
            />
          </LayerStack>
          <TechnicalCallout callouts={callouts} delay="var(--dur-layer)" />
        </div>
      </div>

      <div className={styles.identity}>
        <h1 className={styles.name}>{identity.name}</h1>
        <p className={styles.role}>{identity.role}</p>
        <p className={styles.intro}>{identity.intro}</p>
      </div>

      <TextureOverlay kind="grain" />
    </header>
  );
}
