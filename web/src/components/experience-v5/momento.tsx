'use client';

import { CSSProperties, useRef, useState } from 'react';

import { useEscena } from './director';
import { Obra } from './obra';
import { Relevo, Pieza } from './relevo';
import { Instrumentos } from './instrumentos';
import type { Momento as Datos } from './registry';
import styles from './momento.module.css';

/**
 * Un proyecto en cuatro pulsos.
 *
 * La partitura conserva los nombres, pero no el comportamiento anterior:
 *
 *   0.00–0.16  TÍTULO       grande y limpio, sin mapa compitiendo y sin barra
 *                           negra detrás; después se pliega al HUD y **deja de
 *                           ocupar la escena**
 *   0.16–0.46  COMPOSICIÓN  la obra entra completa dentro de su tamaño
 *                           autorizado, por máscara y unos pocos píxeles de
 *                           desplazamiento; nunca por encima de escala 1
 *   0.46–0.78  LECTURA      se activa una función real —leyenda, foco, dato— y
 *                           la obra no crece
 *   0.78–1.00  ENTREGA      un borde real construye la escena siguiente
 *
 * Lo que se retiró y por qué: la lámina era un fondo `cover` a pantalla completa
 * escalado con `--z`, y eso ampliaba rásteres de 1600 px hasta el ancho del
 * viewport, revelando sus píxeles y agrandando los rótulos impresos dentro del
 * mapa. El título se plegaba encima con un rectángulo de tinta detrás para
 * poder leerse, que era un parche sobre el síntoma. Ahora el título tiene zona
 * reservada en la retícula y se marcha antes de que empiece la lectura, así que
 * no necesita fondo ninguno.
 */

/** Dónde ancla cada dato sobre la obra. Reparto por gesto, no aleatorio. */
const ANCLAJES: Record<string, [number, number][]> = {
  campo:         [[30, 34], [58, 52], [44, 70]],
  concentracion: [[38, 30], [56, 46], [46, 66]],
  sintesis:      [[34, 38], [62, 40], [50, 66]],
  clasificacion: [[32, 32], [60, 50], [44, 68]],
  barrido:       [[28, 40], [54, 30], [66, 60]],
  constelacion:  [[36, 30], [62, 44], [48, 64]],
  dual:          [[32, 44], [64, 40], [48, 66]],
  criterios:     [[34, 34], [58, 48], [46, 68]],
  recomposicion: [[36, 36], [60, 46], [46, 66]],
  erosion:       [[30, 36], [58, 44], [48, 68]],
  flujo:         [[34, 30], [56, 48], [46, 70]],
};

export function MomentoProyecto({
  d, siguiente, coordenada, umbral, quieto,
}: {
  d: Datos;
  siguiente?: Pieza | null;
  /** Palabra del umbral amarillo, cuando esta escena cierra un capítulo. */
  umbral?: string | null;
  /** Coordenada verificada del territorio, si existe para él. */
  coordenada?: { lat: number; lng: number; nombre: string } | null;
  quieto: boolean;
}) {
  // Sin cámara de zoom: escalar el ráster es justo lo que se retiró. El
  // acercamiento vive en la composición, no en la imagen.
  const ref = useEscena(d.id, undefined, quieto);
  const anclas = ANCLAJES[d.gesto] ?? ANCLAJES.campo;

  // La lectura es una función real: la clave enciende su clase sobre la obra.
  const [activa, setActiva] = useState<string | null>(null);
  // La leyenda enumera lo que el mapa imprime; sólo tienen control las clases
  // cuya geometría se pudo separar del propio ráster.
  const clases = d.clases ?? [];
  const conMascara = new Set(clases.map((c) => c.label));
  const claves = (d.clave ?? []).slice(0, 6)
    .map((k) => ({ ...k, activable: conMascara.has(k.label) }));
  const encendida = clases.find((c) => c.label === activa) ?? null;

  const banda = d.superficie === 'papel' ? 'papel' : 'negro';

  /**
   * Precarga del hero interior al apuntar o enfocar «abrir proyecto».
   *
   * El hero de la página de proyecto ya se pide con prioridad alta, pero la
   * petición no empieza hasta que la ruta responde. Adelantarla al gesto hace
   * que la nueva página llegue con su lámina decodificada y la transición no
   * abra sobre un hueco. Se hace una sola vez por escena.
   */
  const precargado = useRef(false);
  const precargarHero = () => {
    if (precargado.current || !d.hero) return;
    precargado.current = true;
    const i = new Image();
    i.sizes = '(max-width: 720px) 92vw, 52vw';
    i.srcset = d.hero.srcSet;
    i.src = d.hero.src;
  };

  return (
    <section
      ref={ref as (n: HTMLElement | null) => void}
      className={styles.momento}
      id={d.id}
      data-sup={d.superficie === 'tinta' ? undefined : d.superficie}
      data-gesto={d.gesto}
      data-modo={d.modo}
      data-clase={encendida ? '' : undefined}
      data-umbral={umbral || undefined}
      style={{ '--alto': `${d.alto}svh` } as CSSProperties}
      aria-labelledby={`t-${d.id}`}
    >
      <div className={styles.marco}>
        {/* PULSO 1 · TÍTULO — zona reservada de la retícula, sin fondo propio. */}
        <h2 id={`t-${d.id}`} className={styles.titulo}>
          <span className={`${styles.tituloNum} mono`}>{d.num}</span>
          <span className={styles.tituloTexto}>{d.titulo}</span>
        </h2>

        {/* PULSO 2 · COMPOSICIÓN — la obra completa, dentro de su guarda. */}
        <div className={styles.campo}>
          {d.lamina ? (
            <Obra
              img={d.lamina} guarda={d.guarda} banda={banda}
              alt={`${d.titulo}. ${d.lugar}.`}
              clase={styles.obra}
              nombreVista={`obra-${d.id}`}
            >
              {/* PULSO 3 · LECTURA — los datos salen del punto que explican. */}
              {d.datos.slice(0, 3).map((x, i) => (
                <Ancla
                  key={x.label}
                  x={anclas[i]?.[0] ?? 50} y={anclas[i]?.[1] ?? 50}
                  etiqueta={x.label} valor={x.value} indice={i}
                  lado={(anclas[i]?.[0] ?? 50) > 52 ? 'izq' : 'der'}
                />
              ))}

              {/* La clase encendida: sus píxeles reales, sin ampliar el mapa.
                  La máscara sale del propio ráster por separación de color, así
                  que lo que se ilumina es la geometría que el mapa dibujó. */}
              {encendida ? (
                <span
                  className={styles.clase} aria-hidden="true"
                  style={{
                    '--c': encendida.color,
                    '--m': `url(${encendida.file})`,
                  } as CSSProperties}
                />
              ) : null}

              {/* Los marcadores medidos, cuando el proyecto los tiene. */}
              {d.puntos?.length ? (
                <svg className={styles.puntos} viewBox="0 0 100 100"
                     preserveAspectRatio="none" aria-hidden="true">
                  {d.puntos.map((p, i) => (
                    <circle key={i} cx={p.x * 100} cy={p.y * 100} r={0.7}
                            style={{ '--i': String(i) } as CSSProperties} />
                  ))}
                </svg>
              ) : null}
            </Obra>
          ) : null}
        </div>

        {/* Instrumentos reales: coordenada verificada y leyenda activa. */}
        <Instrumentos
          coordenada={coordenada}
          claves={claves}
          activa={activa}
          onActiva={setActiva}
          acto={d.acto}
        />

        {/* Banda territorial: lugar, coordenada y acceso en una sola pieza.
            El topónimo y sus grados dejan de vivir en bloques distintos. */}
        <div className={styles.pie}>
          <p className={`${styles.lugar} mono`}>
            <b>{d.lugar}</b>
            {coordenada ? (
              <span className={styles.grados}>
                {`${coordenada.lat.toFixed(2)}° ${coordenada.lng.toFixed(2)}°`}
              </span>
            ) : null}
          </p>
          <a className={`${styles.abrir} mono`} href={d.href} data-touch
             onPointerEnter={precargarHero} onFocus={precargarHero}>abrir proyecto</a>
        </div>

        {/* PULSO 4 · ENTREGA — fuera del campo de la obra, nunca encima. */}
        <div className={styles.entrega}>
          <Relevo
            sale={d.lamina ? { num: d.num, ...d.lamina } : null}
            entra={siguiente}
          />
        </div>
      </div>

      {/* El umbral amarillo: el atlas cambia de acto.

          Va fuera del marco y por encima del HUD a propósito. Dentro del marco
          quedaba por debajo del velo —el marco es `sticky`, así que su
          `z-index` interno no compite con el del velo— y la palabra no se veía;
          y por debajo del HUD dejaba los rótulos claros del HUD sobre amarillo,
          que es la combinación prohibida. Durante este momento breve el HUD
          cede el paso. */}
      {umbral ? (
        <div className={styles.umbral} aria-hidden="true">
          <p className={styles.umbralActo}>{umbral}</p>
          <p className={`${styles.umbralPie} mono`}>Aguascalientes · cinco proyectos</p>
        </div>
      ) : null}
    </section>
  );
}

/**
 * Dato anclado a un punto real de la obra.
 *
 * Vive dentro del encuadre de la lámina, no del viewport: así la línea corta
 * apunta al mismo sitio del mapa a cualquier tamaño de pantalla.
 */
function Ancla({
  x, y, etiqueta, valor, indice, lado,
}: {
  x: number; y: number; etiqueta: string; valor: string;
  indice: number; lado: 'izq' | 'der';
}) {
  return (
    <span
      className={styles.ancla}
      data-lado={lado}
      style={{ '--ax': `${x}%`, '--ay': `${y}%`, '--i': String(indice) } as CSSProperties}
    >
      <i className={styles.anclaPunto} aria-hidden="true" />
      <i className={styles.anclaLinea} aria-hidden="true" />
      <span className={styles.anclaTexto}>
        <b className="mono">{valor}</b>
        <em className="mono">{etiqueta}</em>
      </span>
    </span>
  );
}
