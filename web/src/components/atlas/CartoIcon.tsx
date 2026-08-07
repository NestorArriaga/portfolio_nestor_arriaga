/**
 * Sistema de íconos cartográficos monolineales.
 *
 * Geometría de 24 unidades, trazo 1.25, terminales rectas, sin rellenos
 * decorativos. Todos comparten el mismo peso óptico para que una leyenda con
 * ocho símbolos se lea como un solo alfabeto.
 *
 * Accesibilidad: un ícono es decorativo salvo que se le pase `label`. Con
 * `label` pasa a `role="img"` y se anuncia; sin él queda `aria-hidden`, que es
 * lo correcto cuando el texto de la leyenda ya dice lo mismo.
 */

export const CARTO_ICONS = {
  agua: 'M12 3.5c3.6 4.2 5.6 7.1 5.6 9.6a5.6 5.6 0 0 1-11.2 0c0-2.5 2-5.4 5.6-9.6Z',
  pozo: 'M7 21V9m10 12V9M4.5 9h15M12 9V3.5M8.5 6.2h7M10 21h4',
  // Acuífero: estratos con agua confinada entre ellos. Sin las gotas era
  // indistinguible del ícono de suelo.
  acuifero: 'M3 5h18M3 19h18M3 5c0 0 3 2.5 9 2.5S21 5 21 5M5.5 11.5c0-1.6 1.6-3 1.6-3s1.6 1.4 1.6 3a1.6 1.6 0 0 1-3.2 0ZM11.2 14.5c0-1.6 1.6-3 1.6-3s1.6 1.4 1.6 3a1.6 1.6 0 0 1-3.2 0ZM16.9 11.5c0-1.6 1.6-3 1.6-3s1.6 1.4 1.6 3a1.6 1.6 0 0 1-3.2 0Z',
  cultivo: 'M12 21V8m0 13c0-3.2-1.6-5-4.5-5.4M12 21c0-3.2 1.6-5 4.5-5.4M12 12c0-2.6-1.3-4.2-3.7-4.6M12 12c0-2.6 1.3-4.2 3.7-4.6',
  granja: 'M3.5 20V10l8.5-6 8.5 6v10M3.5 20h17M9.5 20v-6h5v6',
  localidad: 'M4 20V6.5h7V20M11 20V11h9v9M4 20h16M6.5 9.5h2M6.5 13.5h2M14 14.5h3M14 17.5h3',
  industria: 'M3 20V11l5 3V11l5 3V6h8v14M3 20h18M17 10h1.5M17 14h1.5',
  bosque: 'M12 20v-3.5M12 16.5 7 9.5h3L7 4.5h10L14 9.5h3ZM4 20h16',
  anp: 'M12 3 4 6.5v6c0 4.4 3.4 7.3 8 8.5 4.6-1.2 8-4.1 8-8.5v-6Zm-3.5 9 2.5 2.6L16 9.4',
  gobernanza: 'M3.5 20h17M5 20V10m4.5 10V10m5 10V10M19 20V10M3 10h18L12 4Z',
  movilidad: 'M4 12h16M4 12l4-4M4 12l4 4M20 18H8M20 18l-4-4M20 18l-4 4',
  carretera: 'M8 21 10.5 3h3L16 21M12 5.5v3M12 12v3M12 18.5v1.5',
  rio: 'M3 6c3.5 0 3.5 4 7 4s3.5-4 7-4 3.5 4 4 4M3 15c3.5 0 3.5 4 7 4s3.5-4 7-4 3.5 4 4 4',
  suelo: 'M3 7h18M3 7c2-1.4 4-1.4 6 0s4 1.4 6 0 4-1.4 6 0M3 12h18M3 17h18M3 21h18M7 7v14M12 7v14M17 7v14',
  // Sequía: gota tachada sobre suelo agrietado. El sol con rayos que había
  // antes era idéntico al de nodo urbano.
  sequia: 'M10 3.5c2.6 3 4 5.1 4 6.9a4 4 0 0 1-8 0c0-1.8 1.4-3.9 4-6.9ZM4 3l12 12M3 19h18M6 19l1.5-3M12 19l-1.5-3M18 19l-1.5-3',
  conservacion: 'M12 21c-4.5-2.5-7-5.8-7-9.5A4.5 4.5 0 0 1 12 8a4.5 4.5 0 0 1 7 3.5c0 3.7-2.5 7-7 9.5ZM12 8V3',
  // Nodo urbano: núcleo con anillo de influencia y cuatro enlaces con sus
  // nodos satélite. Un nodo de red, no un sol.
  'nodo-urbano': 'M12 10a2 2 0 1 1 0 4 2 2 0 0 1 0-4ZM12 7.5V4.2M12 16.5v3.3M7.5 12H4.2M16.5 12h3.3M12 2.4a1.8 1.8 0 1 1 0 3.6 1.8 1.8 0 0 1 0-3.6ZM12 18a1.8 1.8 0 1 1 0 3.6 1.8 1.8 0 0 1 0-3.6ZM2.4 10.2a1.8 1.8 0 1 1 0 3.6 1.8 1.8 0 0 1 0-3.6ZM21.6 10.2a1.8 1.8 0 1 1 0 3.6 1.8 1.8 0 0 1 0-3.6Z',
} as const;

export type CartoIconName = keyof typeof CARTO_ICONS;

export const CARTO_ICON_NAMES = Object.keys(CARTO_ICONS) as CartoIconName[];

type Props = {
  name: CartoIconName;
  size?: number;
  /** Solo cuando el ícono aporta información que el texto vecino no da. */
  label?: string;
  className?: string;
};

export function CartoIcon({ name, size = 24, label, className }: Props) {
  const informative = Boolean(label);
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.25}
      strokeLinecap="butt"
      strokeLinejoin="miter"
      role={informative ? 'img' : undefined}
      aria-label={informative ? label : undefined}
      aria-hidden={informative ? undefined : 'true'}
      focusable="false"
    >
      <path d={CARTO_ICONS[name]} />
    </svg>
  );
}
