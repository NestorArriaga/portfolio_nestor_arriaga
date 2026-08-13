'use client';

import { CSSProperties } from 'react';

import type { PlateImage } from '@/lib/plates';
import { useReveal, stagger } from '@/lib/motion';
import { TextureOverlay } from '@/components/atlas/TextureOverlay';
import styles from './PersonalAct.module.css';

/**
 * Momento personal, justo después de la portada.
 *
 * Campo papel: es la primera inversión de material del recorrido y marca que
 * esto no es un proyecto. La portada era negra; los actos siguientes vuelven al
 * negro. Este blanco existe para que la escena se lea como una pausa.
 *
 * Composición asimétrica: el resumen a la izquierda sobre 6 columnas, la firma
 * y los microdatos a la derecha, y una ventana con material abstracto del
 * archivo —trazos de la trama topográfica real, sin revelar todavía ningún
 * proyecto—. Una línea continúa la del nombre de portada y organiza el bloque.
 *
 * El resumen aparece **por líneas**, no letra a letra: son dos frases, y una
 * máquina de escribir sobre dos frases es ruido, no ritmo.
 */

type Props = {
  summary: string[];
  role: string;
  institution: string;
  year: string;
  email: string;
  signature: PlateImage | null;
  texture: PlateImage | null;
};

export function PersonalAct({
  summary,
  role,
  institution,
  year,
  email,
  signature,
  texture,
}: Props) {
  const { ref, revealed } = useReveal<HTMLElement>({ threshold: 0.3 });

  return (
    <section
      ref={ref}
      className={styles.act}
      id="acerca"
      data-revealed={revealed || undefined}
      aria-labelledby="acerca-titulo"
    >
      <h2 id="acerca-titulo" className={styles.srOnly}>Sobre mí</h2>

      {/* La línea que continúa el nombre de la portada. */}
      <span className={styles.rule} aria-hidden="true" />

      <div className={styles.text}>
        {summary.map((line, i) => (
          <p
            key={line}
            className={styles.line}
            style={{ transitionDelay: stagger(i, 120, 240) }}
          >
            {line}
          </p>
        ))}

        <a className={styles.micro} href={`mailto:${email}`}>
          {email}
        </a>
      </div>

      <div className={styles.side}>
        {/* Ventana de material: fragmentos reales de la trama topográfica del
            archivo de trabajo. No es un mapa de ningún proyecto: es materia. */}
        {texture ? (
          <span className={styles.window} aria-hidden="true">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className={styles.windowImg}
              src={texture.src}
              srcSet={texture.srcSet}
              sizes="(max-width: 900px) 40vw, 22vw"
              width={texture.width}
              height={texture.height}
              alt=""
              loading="lazy"
              decoding="async"
            />
          </span>
        ) : null}

        {signature ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            className={styles.signature}
            src={signature.src}
            srcSet={signature.srcSet}
            sizes="(max-width: 900px) 52vw, 20vw"
            width={signature.width}
            height={signature.height}
            alt={`Firma de ${role.replace(/^Estudiante de /, '')}`}
            loading="lazy"
            decoding="async"
          />
        ) : null}

        <dl className={styles.meta}>
          <div><dt>Perfil</dt><dd>{role}</dd></div>
          <div><dt>Universidad</dt><dd>{institution}</dd></div>
          <div><dt>Año</dt><dd>{year}</dd></div>
        </dl>
      </div>

      <TextureOverlay kind="paper" opacity={0.055} />
    </section>
  );
}
