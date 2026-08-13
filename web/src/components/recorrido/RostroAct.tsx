'use client';

import { CSSProperties, useId, useState } from 'react';

import { useReveal } from '@/lib/motion';
import { TextureOverlay } from '@/components/atlas/TextureOverlay';
import styles from './RostroAct.module.css';

/**
 * Interludio del rostro territorial — entre P13 y P14.
 *
 * El rostro es una máscara: dentro de su silueta se ve territorio real. Los
 * 715 trazos de `rostro.svg` van inline —86 KB, ~20 KB comprimidos— porque es
 * la única forma de que la silueta sea nítida a cualquier tamaño y de que los
 * trazos entren por grupos. Vienen repartidos en un grupo de perfil y seis
 * bandas por `build_rostro.py`, así que la coreografía necesita siete
 * transiciones y no 715.
 *
 * **Las bases se muestran de una en una, no apiladas.**
 *
 * La composición prevista era relieve y sombreado superpuestos al 25–50 % y
 * 55–75 % dentro de la silueta. Medida la correlación entre las cuatro bases
 * sobre la página A4 que comparten, sale −0.002 entre `hill` y
 * `hillshade_base`, y por debajo de 0.04 en todos los demás pares: sus crestas
 * no coinciden en ningún punto. No son relieve y sombra del mismo terreno,
 * sino cuatro territorios distintos.
 *
 * Superponerlas habría compuesto una imagen que afirma un relieve que no
 * existe. Aislarlas —que es lo que el control permite— enseña cada base tal
 * como es y mantiene la lectura por capas sin inventar la relación.
 */

export type RostroBase = {
  role: string;
  label: string;
  slug: string;
  source: string;
  /** [left, top, width, height] en fracciones de la página A4 compartida. */
  frame: [number, number, number, number];
  src: string;
  srcSet: string;
};

type Props = {
  /** Contenido del SVG de trazos, sin envoltorio. */
  trazos: string;
  viewBox: string;
  bases: RostroBase[];
};

export function RostroAct({ trazos, viewBox, bases }: Props) {
  const { ref, revealed, reduced } = useReveal<HTMLElement>({ threshold: 0.25 });
  const uid = useId().replace(/:/g, '');
  const [active, setActive] = useState<string>(bases[0]?.role ?? '');
  const base = bases.find((b) => b.role === active) ?? bases[0] ?? null;

  const [, , vw, vh] = viewBox.split(/\s+/).map(Number);

  return (
    <section
      ref={ref}
      className={styles.act}
      id="rostro"
      data-revealed={revealed || undefined}
      data-reduced={reduced || undefined}
      aria-labelledby={`${uid}-t`}
    >
      <h2 id={`${uid}-t`} className={styles.srOnly}>
        Rostro territorial: interludio entre P13 y P14
      </h2>

      <div className={styles.stage}>
        <div className={styles.figure} style={{ '--ratio': String(vw / vh) } as CSSProperties}>
          <svg className={styles.svg} viewBox={viewBox} role="img"
               aria-label="Silueta de un rostro que enmarca una base territorial real">
            <defs>
              {/* La máscara es el propio dibujo: blanco = deja ver. */}
              <mask id={`${uid}-m`} maskUnits="userSpaceOnUse"
                    x="0" y="0" width={vw} height={vh}>
                <g
                  className={styles.maskInk}
                  fill="#fff"
                  dangerouslySetInnerHTML={{ __html: trazos }}
                />
              </mask>
            </defs>

            {/* Territorio dentro de la silueta. La base se coloca por su
                `frame` dentro de la página A4, no estirada al viewBox: es lo
                que impide deformarla para forzar la alineación. */}
            {base ? (
              <g mask={`url(#${uid}-m)`}>
                <rect x="0" y="0" width={vw} height={vh} fill="#0b0b0b" />
                <image
                  href={base.src}
                  x={base.frame[0] * vw}
                  y={base.frame[1] * vh}
                  width={base.frame[2] * vw}
                  height={base.frame[3] * vh}
                  preserveAspectRatio="xMidYMid slice"
                />
              </g>
            ) : null}

            {/* Trazo por encima de la textura: el contorno no se pierde. */}
            <g
              className={styles.stroke}
              fill="currentColor"
              dangerouslySetInnerHTML={{ __html: trazos }}
            />

            {/* La línea que llega del agua de P13 y entra en el perfil. */}
            <path
              className={styles.thread}
              d={`M0 ${vh * 0.42} C ${vw * 0.22} ${vh * 0.40}, ${vw * 0.34} ${vh * 0.3}, ${vw * 0.52} ${vh * 0.26}`}
              fill="none"
              stroke="var(--signal)"
              strokeWidth="1.4"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
        </div>

        <div className={styles.side}>
          <p className={styles.kicker}>Interludio</p>

          <fieldset className={styles.layers}>
            <legend className={styles.legend}>Base bajo la silueta</legend>
            {bases.map((b) => (
              <label key={b.role} className={styles.layer}>
                <input
                  type="radio"
                  name={`${uid}-base`}
                  className={styles.radio}
                  checked={active === b.role}
                  onChange={() => setActive(b.role)}
                />
                <span className={styles.layerName}>{b.label}</span>
              </label>
            ))}
          </fieldset>

          {/* Tres llamadas técnicas, ni una más. */}
          <dl className={styles.calls}>
            <div><dt>Trazos</dt><dd>715</dd></div>
            <div><dt>Base</dt><dd>{base?.source ?? '—'}</dd></div>
            <div><dt>Página</dt><dd>A4 · 2480 × 3507</dd></div>
          </dl>

          {/* Por qué no se apilan. Es un dato de método, no un párrafo. */}
          <p className={styles.note}>
            Las bases no comparten territorio: se muestran de una en una.
          </p>
        </div>
      </div>

      <TextureOverlay kind="grain" />
    </section>
  );
}
