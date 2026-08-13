'use client';

import { CSSProperties, useId } from 'react';

import { useReveal } from '@/lib/motion';
import styles from './Seam.module.css';

/**
 * Costura entre dos proyectos.
 *
 * Cada proyecto entrega un elemento al siguiente. Cuando ese elemento existe
 * como dato real —las 17 zonas críticas de P02, los 81 geomorfones de P08— la
 * costura los lleva literalmente: son las coordenadas medidas sobre la propia
 * lámina, no una nube decorativa.
 *
 * Cuando no existe, la costura usa **forma, color o retícula** y nada más: una
 * línea, una hachura, una pila de barras. Deliberadamente sin números, sin
 * escala y sin leyenda, para que no pueda leerse como una medición. Un símbolo
 * que insinúa una variable inexistente es justo lo que la dirección prohíbe.
 *
 * Por eso la costura es `aria-hidden`: es continuidad visual entre dos escenas,
 * no información. Lo que hay que anunciar ya lo anuncian los dos proyectos que
 * separa.
 */

export type SeamKind =
  | 'linea'    // una línea que cruza
  | 'puntos'   // puntos reales del proyecto saliente
  | 'hachura'  // trama agrícola
  | 'senal'    // golpe de amarillo: cambio de acto
  | 'materia'  // grano mineral
  | 'clases'   // franjas con los colores reales de una leyenda
  | 'perfil'   // líneas de perfil
  | 'nodos'    // nodos enlazados
  | 'capas'    // estratos apilados
  | 'mascara'  // barrido de máscara
  | 'drenaje'  // ramificación
  | 'agua'     // curva continua
  | 'reticula' // retícula de síntesis
  | 'circulo'; // geometría circular

export type SeamData = {
  kind: SeamKind;
  from: string;
  to: string;
  /** Posiciones reales, en fracciones de la lámina, cuando lo entregado es dato. */
  points?: { x: number; y: number }[];
  /** Colores reales de una leyenda, cuando lo entregado son sus clases. */
  swatches?: string[];
};

const W = 1200;
const H = 120;

export function Seam({ data }: { data: SeamData }) {
  const { ref, revealed } = useReveal<HTMLDivElement>({ threshold: 0.6, rootMargin: '0px' });

  // El identificador del degradado sale de `useId` y no del acento. Los acentos
  // son custom properties —`var(--p05-registro)`—, y meter uno en el id dejaba
  // un `url(#g-puntos-var(--p05-registro))` con paréntesis anidados: el
  // navegador no resuelve esa referencia y la costura entera se pintaba en
  // negro sobre negro. `useId` además distingue las dos costuras de puntos.
  const grad = `seam-${useId().replace(/:/g, '')}`;

  return (
    <div
      ref={ref}
      className={styles.seam}
      data-revealed={revealed || undefined}
      data-kind={data.kind}
      aria-hidden="true"
      style={{ '--from': data.from, '--to': data.to } as CSSProperties}
    >
      <svg className={styles.art} viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none">
        <defs>
          {/* El degradado es la entrega: el acento que sale se convierte en el
              que entra. Es la única pieza del sitio donde dos acentos conviven.

              `userSpaceOnUse` y no la caja del objeto: por defecto el degradado
              se reescala a la caja de **cada** elemento, así que los 81 puntos
              recibían la rampa completa dentro de sus 5 px y salían todos del
              mismo color medio. En espacio de usuario la rampa cruza la banda
              una sola vez y cada punto toma el color que le toca por su sitio. */}
          <linearGradient id={grad} gradientUnits="userSpaceOnUse"
                          x1="0" y1="0" x2={W} y2="0">
            {/* El paso por el papel no es un tercer color inventado: es la
                superficie clara que el propio recorrido alterna. Interpolar en
                sRGB de un acento al siguiente hunde el centro en un pardo que
                sobre negro no se ve —los puntos de en medio desaparecían—, y
                los acentos complementarios son justo los peores. Con los
                extremos anclados en 0.08 y 0.92, cada mitad sigue siendo el
                color de su proyecto. */}
            <stop offset="0" stopColor="var(--from)" />
            <stop offset="0.08" stopColor="var(--from)" />
            <stop offset="0.5" stopColor="var(--paper)" />
            <stop offset="0.92" stopColor="var(--to)" />
            <stop offset="1" stopColor="var(--to)" />
          </linearGradient>
        </defs>

        <g stroke={`url(#${grad})`} fill="none" strokeWidth="1.2"
           vectorEffect="non-scaling-stroke">
          {render(data, grad)}
        </g>
      </svg>
    </div>
  );
}

function render(d: SeamData, grad: string) {
  const mid = H / 2;

  switch (d.kind) {
    case 'puntos': {
      // Posiciones reales del proyecto que sale, con sus dos coordenadas. La
      // banda es más baja que la lámina, así que la vertical va comprimida —una
      // proyección, no un recorte—: se conserva qué punto queda por encima de
      // cuál y dónde se agrupan. Quedarse solo con la X habría convertido una
      // distribución en un transecto.
      //
      // Radio fijo: el tamaño no codifica nada y hacerlo variar insinuaría una
      // magnitud que el análisis no midió.
      const pts = d.points ?? [];
      return (
        <g className="seam-points">
          {pts.map((p, i) => (
            <circle key={i} cx={p.x * W} cy={mid + (p.y - 0.5) * (H * 0.62)} r={2.4}
                    fill={`url(#${grad})`} stroke="none" />
          ))}
        </g>
      );
    }

    case 'clases':
      return (
        <g className="seam-classes" stroke="none">
          {(d.swatches ?? []).map((c, i, a) => (
            <rect key={c + i} x={(i / a.length) * W} y={mid - 5}
                  width={W / a.length - 3} height={10} fill={c} />
          ))}
        </g>
      );

    case 'hachura':
      return (
        <g className="seam-hatch">
          {Array.from({ length: 46 }, (_, i) => (
            <line key={i} x1={i * 26} y1={mid + 16} x2={i * 26 + 18} y2={mid - 16} />
          ))}
        </g>
      );

    case 'perfil':
      return (
        <g className="seam-profile">
          {[0, 7, 14].map((o, i) => (
            <path key={i}
                  d={`M0 ${mid + o} L200 ${mid - 18 + o} L380 ${mid + 6 + o} L560 ${mid - 24 + o} L760 ${mid + 2 + o} L980 ${mid - 12 + o} L1200 ${mid + o}`} />
          ))}
        </g>
      );

    case 'capas':
      return (
        <g className="seam-layers">
          {[-14, -5, 4, 13].map((o, i) => (
            <line key={i} x1={90 + i * 22} y1={mid + o} x2={W - 90 - i * 22} y2={mid + o} />
          ))}
        </g>
      );

    case 'nodos':
      return (
        <g className="seam-nodes">
          <line x1="60" y1={mid} x2={W - 60} y2={mid} />
          {[0.12, 0.28, 0.41, 0.55, 0.68, 0.83].map((p, i) => (
            <circle key={i} cx={p * W} cy={mid} r={3.5} fill="var(--black)" />
          ))}
        </g>
      );

    case 'drenaje':
      return (
        <g className="seam-drain">
          <path d={`M0 ${mid} L420 ${mid}`} />
          <path d={`M420 ${mid} L620 ${mid - 26}`} />
          <path d={`M420 ${mid} L640 ${mid + 22}`} />
          <path d={`M640 ${mid + 22} L860 ${mid + 4}`} />
          <path d={`M620 ${mid - 26} L900 ${mid - 8}`} />
          <path d={`M900 ${mid - 8} L1200 ${mid}`} />
        </g>
      );

    case 'agua':
      return (
        <path className="seam-water"
              d={`M0 ${mid - 10} C 240 ${mid + 26}, 420 ${mid - 30}, 640 ${mid + 8} S 1000 ${mid - 18}, 1200 ${mid + 4}`} />
      );

    case 'reticula':
      return (
        <g className="seam-grid" strokeWidth="0.8">
          {Array.from({ length: 25 }, (_, i) => (
            <line key={`v${i}`} x1={i * 50} y1={mid - 22} x2={i * 50} y2={mid + 22} />
          ))}
          {[-22, -8, 8, 22].map((y, i) => (
            <line key={`h${i}`} x1="0" y1={mid + y} x2={W} y2={mid + y} />
          ))}
        </g>
      );

    case 'circulo':
      return (
        <g className="seam-circle">
          {[26, 18, 10].map((r, i) => (
            <circle key={i} cx={W / 2} cy={mid} r={r} />
          ))}
          <line x1="0" y1={mid} x2={W / 2 - 34} y2={mid} />
          <line x1={W / 2 + 34} y1={mid} x2={W} y2={mid} />
        </g>
      );

    case 'materia':
      return (
        <g className="seam-matter" strokeWidth="0.9">
          {Array.from({ length: 16 }, (_, i) => {
            const x = 40 + i * 72;
            const h = 10 + ((i * 37) % 22);
            return <rect key={i} x={x} y={mid - h / 2} width={54} height={h} />;
          })}
        </g>
      );

    case 'mascara':
      return (
        <g className="seam-mask" stroke="none">
          <rect x="0" y={mid - 7} width={W} height={14}
                fill={`url(#${grad})`} />
        </g>
      );

    case 'senal':
      return (
        <g className="seam-signal">
          <line x1="0" y1={mid} x2={W} y2={mid} strokeWidth="2" />
          <rect x={W / 2 - 26} y={mid - 9} width={52} height={18}
                fill="var(--signal)" stroke="none" />
        </g>
      );

    case 'linea':
    default:
      return <line className="seam-line" x1="0" y1={mid + 14} x2={W} y2={mid - 14} />;
  }
}
