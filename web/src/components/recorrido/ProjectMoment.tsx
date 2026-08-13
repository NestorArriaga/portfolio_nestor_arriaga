'use client';

import Link from 'next/link';
import { CSSProperties } from 'react';

import type { PlateImage } from '@/lib/plates';
import { useReveal, stagger } from '@/lib/motion';
import { TextureOverlay } from '@/components/atlas/TextureOverlay';
import styles from './ProjectMoment.module.css';

/**
 * Un proyecto dentro del recorrido: un viewport, un artefacto, tres datos.
 *
 * No sustituye al caso completo — para eso está `Abrir proyecto` —, sino que
 * da su carácter: color, textura, gesto y la lámina real. Cero párrafos.
 *
 * La composición **alterna** con el índice del proyecto (`layout`), porque dos
 * aperturas seguidas con el título en la misma esquina y el mismo movimiento
 * hacen que quince momentos se lean como uno repetido quince veces.
 *
 * El gesto de entrada lo hereda de `data-gesture`, el mismo vocabulario que
 * usan las páginas de caso: la escena del recorrido y la del caso se mueven
 * igual porque son el mismo proyecto.
 */

export type MomentData = {
  id: string;
  short: string;
  place: string;
  accent: string;
  surface: 'dark' | 'paper';
  gesture: string;
  href: string;
  artifact: PlateImage | null;
  alpha?: boolean;
  /** Cómo encuadrar la lámina. Lo decide su proporción real. */
  fit: 'cover' | 'contain';
  facts: { label: string; value: string }[];
  /** Alterna la posición del bloque de identidad. */
  layout: 'left' | 'right' | 'low';
};

export function ProjectMoment({
  data,
  onEnter,
}: {
  data: MomentData;
  onEnter: (id: string) => void;
}) {
  const { ref, revealed } = useReveal<HTMLElement>({ threshold: 0.35, rootMargin: '0px' });

  return (
    <section
      ref={ref}
      className={styles.moment}
      id={`p${data.id}`}
      data-layout={data.layout}
      data-surface={data.surface === 'paper' ? 'paper' : undefined}
      data-alpha={data.alpha || undefined}
      data-fit={data.fit}
      data-gesture={data.gesture}
      data-revealed={revealed || undefined}
      style={{ '--accent': data.accent } as CSSProperties}
      aria-labelledby={`p${data.id}-titulo`}
    >
      <div className={styles.field}>
        {data.artifact ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            className={`${styles.plate} gesture-target`}
            src={data.artifact.src}
            srcSet={data.artifact.srcSet}
            sizes="(max-width: 900px) 100vw, 78vw"
            width={data.artifact.width}
            height={data.artifact.height}
            alt={`${data.short}. ${data.place}.`}
            loading="lazy"
            decoding="async"
          />
        ) : null}
        <TextureOverlay kind={data.surface === 'paper' ? 'paper' : 'grain'} />
      </div>

      <div className={styles.identity}>
        <p className={styles.num}>P{data.id}</p>
        <h2 id={`p${data.id}-titulo`} className={styles.title}>{data.short}</h2>
        <p className={styles.place}>{data.place}</p>

        {data.facts.length ? (
          <dl className={styles.facts}>
            {data.facts.slice(0, 3).map((f, i) => (
              <div key={f.label} style={{ transitionDelay: stagger(i, 80, 240) }}>
                <dt>{f.label}</dt>
                <dd>{f.value}</dd>
              </div>
            ))}
          </dl>
        ) : null}

        <Link href={data.href} className={styles.open} onFocus={() => onEnter(data.id)}>
          Abrir proyecto
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  );
}
