'use client';

import { CSSProperties } from 'react';

import { useEscena } from './director';
import { Arroba } from './arroba';
import { Relevo, Pieza } from './relevo';
import { anchoServido } from './obra';
import type { Lamina } from './registry';
import styles from './granular.module.css';

/**
 * GRANULAR — capítulo mayor.
 *
 * No es una lámina con tres escalas cruzadas por opacidad. Son seis
 * submomentos, cada uno con su propio material real, encadenados por una
 * cámara continua que va de la región al sistema.
 *
 * Los seis salen de un inventario, no de una lista deseada: región, agua,
 * agricultura, conectividad, localidades y tipologías son las seis categorías
 * del proyecto que tienen capas verdaderas en el atlas. Si una no hubiera
 * tenido evidencia, no estaría aquí.
 *
 * La **referencia espacial persiste**: el contador y la regla no desaparecen
 * durante un salto de escala, que es justo lo que hace que el viaje se entienda
 * en lugar de sentirse como seis mapas seguidos.
 */

export type Submomento = {
  id: string;
  palabra: string;
  /** Qué muestra esta capa, en una línea. Sale del material, no del deseo. */
  nota: string;
  /** Escala real del encuadre. */
  regla: string;
  img: Lamina | null;
  /** Segunda capa registrada sobre la misma extensión, si existe. */
  sobre?: Lamina | null;
};

export function CapituloGranular({
  submomentos, href, quieto, siguiente,
}: {
  submomentos: Submomento[];
  href: string;
  quieto: boolean;
  /** Lo que sigue al capítulo entero: el relevo de la última escala. */
  siguiente?: Pieza | null;
}) {
  const n = submomentos.length;
  const pieza = (s: Submomento | undefined, i: number): Pieza | null =>
    s?.img ? { num: `14.${i + 1}`, ...s.img } : null;

  return (
    <>
      {/* Un momento de título grande y limpio antes de entrar al sistema. */}
      <PortadaCapitulo href={href} quieto={quieto} entra={pieza(submomentos[0], 0)} />

      {submomentos.map((s, i) => (
        <Escala key={s.id} s={s} indice={i} total={n} quieto={quieto}
                entra={i + 1 < n ? pieza(submomentos[i + 1], i + 1) : siguiente ?? null} />
      ))}
    </>
  );
}

function PortadaCapitulo({
  href, quieto, entra,
}: { href: string; quieto: boolean; entra: Pieza | null }) {
  const ref = useEscena('p14', { z: [1.06, 1] }, quieto);

  return (
    <section
      ref={ref as (n: HTMLElement | null) => void}
      className={styles.portada} id="p14" aria-label="GRANULAR"
    >
      <div className={styles.portadaMarco}>
        <Arroba modo="entrega" className={styles.arrobaCapitulo} />
        <h2 className={styles.tituloCapitulo}>GRANULAR</h2>
        <p className={`${styles.subtitulo} mono`}>Comarca Lagunera · seis lecturas</p>
        <a className={`${styles.abrir} mono`} href={href} data-touch>abrir proyecto</a>
        {/* La portada del capítulo ya enseña a qué escala entra. */}
        <div className={styles.entrega}><Relevo entra={entra} /></div>
      </div>
    </section>
  );
}

/**
 * Un submomento. La capa entra por barrido registrado sobre el mismo encuadre
 * —no por opacidad— para que cada escala sea un estado completo y nítido.
 */
function Escala({
  s, indice, total, quieto, entra,
}: {
  s: Submomento; indice: number; total: number; quieto: boolean;
  entra: Pieza | null;
}) {
  // El acercamiento se acumula a lo largo del capítulo: cada escala entra un
  // poco más cerca que la anterior, así el viaje se siente continuo.
  const z0 = 1.05 + indice * 0.012;
  const ref = useEscena(s.id, { z: [z0, 1] }, quieto);

  return (
    <section
      ref={ref as (n: HTMLElement | null) => void}
      className={styles.escala} id={s.id}
      style={{ '--i': String(indice) } as CSSProperties}
      aria-label={`GRANULAR ${indice + 1} de ${total}: ${s.palabra}`}
    >
      <div className={styles.escalaMarco}>
        {/* El ancho nativo de la capa más pequeña manda: si una de las dos no
            aguanta la sangre completa, la pareja se compone como pieza. */}
        <div
          className={styles.capas}
          style={{ '--nativo': String(Math.min(
            s.img ? anchoServido(s.img) : 2000,
            s.sobre ? anchoServido(s.sobre) : 9999,
          )) } as CSSProperties}
        >
          {s.img ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img className={styles.base} src={s.img.src} srcSet={s.img.srcSet} sizes="100vw"
                 width={s.img.width} height={s.img.height}
                 alt={`${s.palabra}. Comarca Lagunera.`} loading="lazy" decoding="async" />
          ) : null}
          {s.sobre ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img className={styles.sobre} src={s.sobre.src} srcSet={s.sobre.srcSet} sizes="100vw"
                 width={s.sobre.width} height={s.sobre.height}
                 alt="" aria-hidden="true" loading="lazy" decoding="async" />
          ) : null}
        </div>

        <p className={styles.palabra}>{s.palabra}</p>

        {/* Referencia espacial persistente: dónde estamos y a qué escala.
            No desaparece durante el salto. */}
        <div className={styles.referencia}>
          <p className={`${styles.contador} mono`}>{`${indice + 1} / ${total}`}</p>
          <p className={`${styles.regla} mono`}>
            <span className={styles.reglaBarra} aria-hidden="true" />
            {s.regla}
          </p>
          <p className={`${styles.nota} mono`}>{s.nota}</p>
        </div>

        {/* El relevo entre escalas: se ve de qué lectura sale y a cuál entra. */}
        <div className={styles.entrega}>
          <Relevo
            sale={s.img ? { num: `14.${indice + 1}`, ...s.img } : null}
            entra={entra}
          />
        </div>
      </div>
    </section>
  );
}
