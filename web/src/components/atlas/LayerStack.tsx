'use client';

import { CSSProperties, ReactNode, createContext, useContext, useEffect, useRef, useState } from 'react';
import styles from './LayerStack.module.css';
import { usePrefersReducedMotion } from '@/lib/motion';

/**
 * Pila de capas del campo cartográfico.
 *
 * Todas las capas comparten la misma extensión geográfica y se apilan en el
 * mismo encuadre. Es la única forma honesta de superponer las capas de GRANULAR:
 * proceden de exportaciones del mismo mapa, así que coinciden pixel a pixel
 * mientras no se recorte ninguna por separado.
 *
 * Cada capa entra por máscara — un barrido de `clip-path` — en lugar de por
 * desplazamiento. Revelar sobre la misma extensión enseña qué añade la capa;
 * moverla mentiría sobre dónde está.
 *
 * La carga va en dos fases:
 *
 *   1. `armed` — la pila se acerca al viewport (400 px antes). Se montan las
 *      imágenes y empiezan a descargarse.
 *   2. `revealed` — la pila entra de verdad. Corre el barrido de clip-path.
 *
 * Se prefiere esto a `loading="lazy"` porque une la descarga con la secuencia:
 * las capas terminan de llegar antes de que empiece el barrido, así que el
 * revelado no descubre un hueco vacío. Además el margen de 400 px es explícito,
 * en vez de depender de la heurística de cada navegador.
 */

type StackState = { armed: boolean; revealed: boolean };

const StackContext = createContext<StackState>({ armed: true, revealed: true });

export type StackLayerProps = {
  src: string;
  srcSet?: string;
  width: number;
  height: number;
  /** Texto solo si la capa aporta información que no está en la leyenda. */
  alt?: string;
  opacity?: number;
  /** Orden de entrada dentro de la secuencia. */
  step?: number;
  /** `multiply`/`screen` para fundir una trama sobre la base sin taparla. */
  blend?: CSSProperties['mixBlendMode'];
  /** Ancho que ocupará el campo, para que el navegador elija bien en srcSet. */
  sizes?: string;
  /**
   * Posición dentro del lienzo común, en fracciones [left, top, w, h]. Viene
   * del manifiesto. Cada capa se recortó a su propio contenido para ahorrar
   * peso, así que sin este encuadre dos capas del mismo mapa se centrarían una
   * sobre otra y el resultado sería geográficamente falso.
   */
  frame?: [number, number, number, number];
  className?: string;
};

export function StackLayer({
  src,
  srcSet,
  width,
  height,
  alt,
  opacity = 1,
  step = 0,
  blend,
  sizes = '(max-width: 900px) 100vw, 72vw',
  frame = [0, 0, 1, 1],
  className,
}: StackLayerProps) {
  const { armed } = useContext(StackContext);

  // Hasta que la pila se arma no hay src: no se descarga nada de una lámina
  // que el lector todavía no va a ver.
  if (!armed) return null;

  const [left, top, w, h] = frame;

  return (
    // next/image no aporta aquí y estorba: el pipeline ya emitió cada capa en
    // WebP a 2000/1000/500 px recortada a su contenido, así que el optimizador
    // solo volvería a comprimir lo ya comprimido. Además necesitamos gobernar
    // `sizes`, el encuadre y el momento de carga desde el propio componente.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className={[styles.layer, className].filter(Boolean).join(' ')}
      src={src}
      srcSet={srcSet}
      sizes={sizes}
      width={width}
      height={height}
      alt={alt ?? ''}
      aria-hidden={alt ? undefined : 'true'}
      decoding="async"
      style={{
        left: `${left * 100}%`,
        top: `${top * 100}%`,
        width: `${w * 100}%`,
        height: `${h * 100}%`,
        opacity,
        mixBlendMode: blend,
        transitionDelay: `${step * 140}ms`,
      }}
    />
  );
}

type Props = {
  children: ReactNode;
  /** Proporción del campo. Reservarla evita CLS al cargar las capas. */
  ratio: number;
  className?: string;
  style?: CSSProperties;
};

export function LayerStack({ children, ratio, className, style }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const [state, setState] = useState<StackState>({ armed: false, revealed: false });

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (typeof IntersectionObserver === 'undefined') {
      setState({ armed: true, revealed: true });
      return;
    }

    // Dos umbrales: uno holgado para empezar a descargar, otro ajustado para
    // disparar el barrido cuando la lámina ya está en pantalla.
    const arm = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setState((s) => ({ ...s, armed: true }));
          arm.disconnect();
        }
      },
      { rootMargin: '400px 0px' },
    );

    const show = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setState({ armed: true, revealed: true });
          show.disconnect();
        }
      },
      { threshold: 0.15 },
    );

    arm.observe(node);
    show.observe(node);
    return () => {
      arm.disconnect();
      show.disconnect();
    };
  }, []);

  const value = reduced ? { armed: state.armed, revealed: true } : state;

  return (
    <StackContext.Provider value={value}>
      <div
        ref={ref}
        className={[styles.stack, className].filter(Boolean).join(' ')}
        data-revealed={value.revealed ? 'true' : 'false'}
        style={{ aspectRatio: String(ratio), ...style }}
      >
        {children}
      </div>
    </StackContext.Provider>
  );
}
