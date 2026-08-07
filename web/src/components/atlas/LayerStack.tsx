'use client';

import { CSSProperties, ReactNode, createContext, useContext } from 'react';
import styles from './LayerStack.module.css';
import { useReveal } from '@/lib/motion';

/**
 * Pila de capas del campo cartográfico.
 *
 * Todas las capas comparten la misma extensión geográfica y se apilan en el
 * mismo encuadre. Es la única forma honesta de superponer las capas de GRANULAR:
 * proceden de exportaciones del mismo mapa, así que coinciden pixel a pixel
 * mientras cada una se coloque en el encuadre que registró el manifiesto.
 *
 * Cada capa entra por máscara — un barrido de `clip-path` — en lugar de por
 * desplazamiento. Revelar sobre la misma extensión enseña qué añade la capa;
 * moverla mentiría sobre dónde está.
 *
 * Las imágenes se renderizan siempre, también en el servidor. Montarlas solo
 * tras un IntersectionObserver dejaba el HTML sin ninguna capa, y entonces el
 * fallback de <noscript> no tiene nada que revelar: la lámina queda vacía sin
 * JavaScript. La carga diferida la resuelve `loading="lazy"`, que es lo que hace
 * bien el navegador; `priority` la desactiva en la primera pantalla, donde
 * diferir solo retrasa lo que se ve de inmediato.
 */

const PriorityContext = createContext(false);

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
  const priority = useContext(PriorityContext);
  const [left, top, w, h] = frame;

  return (
    // next/image no aporta aquí y estorba: el pipeline ya emitió cada capa en
    // WebP a 2000/1000/500 px recortada a su contenido, así que el optimizador
    // solo volvería a comprimir lo ya comprimido. Además necesitamos gobernar
    // `sizes`, el encuadre y la prioridad desde el propio componente.
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
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : 'auto'}
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
  /** Para la primera pantalla: carga inmediata en vez de diferida. */
  priority?: boolean;
  className?: string;
  style?: CSSProperties;
};

export function LayerStack({ children, ratio, priority = false, className, style }: Props) {
  const { ref, revealed } = useReveal<HTMLDivElement>({ threshold: 0.15 });

  return (
    <PriorityContext.Provider value={priority}>
      <div
        ref={ref}
        className={[styles.stack, className].filter(Boolean).join(' ')}
        data-revealed={revealed ? 'true' : 'false'}
        style={{
          aspectRatio: String(ratio),
          // El ancho se limita por la altura disponible cuando la proporción lo
          // exige, para que un lienzo vertical no se vaya a 1500 px de alto.
          ['--stack-ratio' as string]: String(ratio),
          // Un mapa en retrato tiene derecho a pasar de una pantalla: la
          // referencia Food es una lámina vertical que se recorre. Apretarlo a
          // la altura del viewport lo encoge y le abre un hueco al lado. Uno
          // apaisado, en cambio, sí debe caber de una vez.
          ['--stack-max-h' as string]: ratio < 0.9 ? '128svh' : '86svh',
          ...style,
        }}
      >
        {children}
      </div>
    </PriorityContext.Provider>
  );
}
