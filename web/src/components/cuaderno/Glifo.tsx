import styles from './Glifo.module.css';

/**
 * Simbología territorial de los quince proyectos.
 *
 * No son iconos de librería: cada glifo dibuja la operación que el proyecto
 * hace sobre el territorio, con la misma caja, el mismo trazo y las mismas
 * terminaciones. Comparten `viewBox` de 24 y trazo 1.4, así que se leen igual a
 * 24, 32, 64 y 120 px, y usan `currentColor` para heredar la superficie.
 *
 * La lectura de cada uno sale del contenido real del caso, no de una metáfora
 * decorativa:
 *
 *   P01 polígono y unidad          P09 límite que se bifurca
 *   P02 puntos concéntricos        P10 criterios ponderados
 *   P03 plano dividido             P11 matriz estratificada
 *   P04 capas superpuestas         P12 hachura erosionada
 *   P05 curvas de nivel            P13 cauce ramificado
 *   P06 bandas clasificadas        P14 red multiescala
 *   P07 intervalos de pendiente    P15 anillo, ruta y estancia
 *   P08 agrupación espacial
 */

const TRAZOS: Record<string, string> = {
  // Un límite cerrado con su punto interior: el área y su unidad.
  '01': 'M4 8l6-4 10 3-2 11-9 2-5-6z M11 11h2v2h-2z',
  // Anillos concéntricos con núcleo: concentración por proximidad.
  '02': 'M12 12m-2 0a2 2 0 1 0 4 0a2 2 0 1 0-4 0 M12 12m-6 0a6 6 0 1 0 12 0a6 6 0 1 0-12 0 M12 12m-9.5 0a9.5 9.5 0 1 0 19 0a9.5 9.5 0 1 0-19 0',
  // Un mismo plano partido en dos aptitudes.
  '03': 'M3 5h18v14H3z M12 5v14 M6 9h3 M6 12h3 M15 13h3 M15 16h3',
  // Capas superpuestas que se resuelven en una síntesis.
  '04': 'M12 3l9 4-9 4-9-4z M3 12l9 4 9-4 M3 17l9 4 9-4',
  // Curvas de nivel y su vaguada.
  '05': 'M2 17c4-5 7 2 10-3s6-4 10-7 M2 12c4-5 7 2 10-3 M2 21c4-4 8 1 12-2',
  // Bandas clasificadas sobre el mismo territorio.
  '06': 'M3 6h18 M3 10h18 M3 14h18 M3 18h18 M8 6v12 M16 6v12',
  // Intervalos sobre una pendiente.
  '07': 'M3 20L21 5 M3 20h18 M8 20v-4 M13 20v-8 M18 20v-12',
  // Agrupación espacial en torno a una centralidad.
  '08': 'M12 12m-1.5 0a1.5 1.5 0 1 0 3 0a1.5 1.5 0 1 0-3 0 M6 6h.01 M18 7h.01 M5 15h.01 M17 16h.01 M9 19h.01 M12 4h.01 M20 12h.01 M4 10h.01',
  // Un límite que se bifurca: transición entre dos vocaciones.
  '09': 'M12 3v7 M12 10c-3 2-5 4-6 11 M12 10c3 2 5 4 6 11 M3 21h18',
  // Criterios de peso distinto que suman una aptitud.
  '10': 'M4 6h16 M4 10h11 M4 14h7 M4 18h13 M21 6v12',
  // Matriz estratificada: la misma retícula recompuesta.
  '11': 'M3 4h8v8H3z M13 4h8v8h-8z M3 14h8v6H3z M13 14h8v6h-8z M13 8h8 M3 17h8',
  // Hachura que se rompe: degradación.
  '12': 'M4 7h16 M4 11h11 M4 15h14 M4 19h6 M17 15h3 M13 19h3 M19 19h1',
  // Cauce ramificado hacia su salida.
  '13': 'M12 21c0-6 2-8 2-12 M12 21c0-5-3-7-3-11 M14 9c0-2 2-3 3-5 M9 10C9 8 7 7 6 5 M12 21h.01',
  // Red multiescala: nodos de tamaño distinto enlazados.
  '14': 'M5 6h.01 M19 8h.01 M12 13h.01 M7 18h.01 M18 18h.01 M5 6l7 7 M19 8l-7 5 M12 13l-5 5 M12 13l6 5',
  // Anillo, recorrido y estancia.
  '15': 'M12 12m-6 0a6 6 0 1 0 12 0a6 6 0 1 0-12 0 M12 12m-2 0a2 2 0 1 0 4 0a2 2 0 1 0-4 0 M3 20c3-1 5-4 5-8 M21 5c-3 1-5 4-5 8',
};

export function Glifo({
  id, tam = 24, etiqueta, clase,
}: {
  /** `01`…`15`. */
  id: string;
  tam?: number;
  /** Si se pasa, el glifo es contenido; si no, es decorativo. */
  etiqueta?: string;
  clase?: string;
}) {
  const d = TRAZOS[id];
  if (!d) return null;

  return (
    <svg
      className={`${styles.glifo}${clase ? ` ${clase}` : ''}`}
      viewBox="0 0 24 24" width={tam} height={tam}
      role={etiqueta ? 'img' : undefined}
      aria-label={etiqueta}
      aria-hidden={etiqueta ? undefined : true}
      focusable="false"
    >
      <path d={d} />
    </svg>
  );
}
