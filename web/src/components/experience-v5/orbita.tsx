'use client';

import dynamic from 'next/dynamic';
import { CSSProperties, useCallback, useEffect, useId, useMemo, useRef, useState } from 'react';

import { Ayuda, useAyuda, usePunteroFino } from './ayudas';
import { GloboEstatico } from './umbral';
import type { Ficha } from './atlas';
import styles from './orbita.module.css';

/**
 * Vistazo orbital — el índice que emana del Globe.
 *
 * No es una galería superpuesta. El globo se queda como **núcleo y contexto**;
 * los quince proyectos se separan de su superficie y salen por arcos hasta
 * quedar en tres órbitas legibles. La órbita exterior termina de cerrar una `@`
 * espacial: núcleo, espiral y salida.
 *
 * Los tres ejes —territorio, método, escala— no son chips flotando: son tres
 * anillos que reordenan la órbita. Cambiar de anillo redistribuye los nodos por
 * ese criterio, y la reordenación es la que enseña la relación.
 *
 * La rotación del atlas vive en una variable CSS, no en el estado de React:
 * arrastrar el índice no vuelve a renderizar quince nodos por fotograma.
 */

const Globe = dynamic(() => import('@/components/originkit/ui/globe'), {
  ssr: false,
  loading: () => <div className={styles.nucleoHueco} aria-hidden="true" />,
});

type Eje = 'territorio' | 'metodo' | 'escala';

/** Los tres ejes, con la etiqueta que se lee en pantalla. */
const EJES: { id: Eje; etiqueta: string }[] = [
  { id: 'territorio', etiqueta: 'Por territorio' },
  { id: 'metodo', etiqueta: 'Por método' },
  { id: 'escala', etiqueta: 'Por escala' },
];

/**
 * Tres órbitas: 5, 5 y 5. Radios en `vmin`. La exterior se queda en 44 y no en
 * 50 porque el nodo ya no es una caja centrada sino una etiqueta con su número
 * debajo: a 50 los rótulos de arriba se salían del panel.
 */
const RADIOS = [26, 35, 44];

export function VistazoOrbital({
  abierto, fichas, marcadores, onCerrar, onElegir,
}: {
  abierto: boolean;
  fichas: Ficha[];
  marcadores: { lat: number; lng: number }[];
  onCerrar: () => void;
  onElegir: (id: string) => void;
}) {
  const idPanel = useId().replace(/:/g, '');
  const [eje, setEje] = useState<Eje>('territorio');
  const [foco, setFoco] = useState<string | null>(null);
  /**
   * Vista del índice.
   *
   * En una pantalla estrecha la órbita no puede ser la interfaz principal: los
   * nodos son puntos de seis píxeles con el código debajo y el título no se ve,
   * así que elegir exige apuntar a ciegas. En móvil se abre la lista y la
   * órbita queda como modo visual opcional; en escritorio, al revés.
   */
  const [lista, setLista] = useState(false);
  const [movil, setMovil] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 860px), (pointer: coarse)');
    const leer = () => { setMovil(mq.matches); setLista(mq.matches); };
    leer();
    mq.addEventListener('change', leer);
    return () => mq.removeEventListener('change', leer);
  }, []);
  const panel = useRef<HTMLDivElement>(null);
  const campo = useRef<HTMLDivElement>(null);
  const dialogo = useRef<HTMLDivElement>(null);
  const giro = useRef(0);
  const arrastre = useRef<{ x: number; base: number } | null>(null);
  /** Origen del gesto en curso, mientras se decide si es toque o arrastre. */
  const partida = useRef<{ x: number; y: number; id: number; activo: boolean } | null>(null);
  /** Verdadero sólo durante el clic que remata un arrastre real. */
  const arrastrado = useRef(false);

  /**
   * El orden de los nodos depende del eje activo: al cambiarlo, los proyectos
   * del mismo territorio, método o escala quedan contiguos en la órbita. Es la
   * reordenación la que enseña la relación.
   */
  const nodos = useMemo(() => {
    const orden = [...fichas].sort(
      (a, b) => String(a[eje]).localeCompare(String(b[eje])) || a.num.localeCompare(b.num),
    );
    // El reparto sale del número real de entradas, no de un cinco fijo: con
    // los cuatro casos de SISTEMAS la cuarta tanda caía en el mismo radio que
    // la tercera y los rótulos se encimaban.
    const porAnillo = Math.ceil(orden.length / RADIOS.length);
    return orden.map((f, i) => {
      const anillo = Math.min(RADIOS.length - 1, Math.floor(i / porAnillo));
      const enAnillo = i % porAnillo;
      const total = Math.min(porAnillo, orden.length - anillo * porAnillo);
      // Cada anillo arranca desplazado para que los nodos no se alineen en
      // radios idénticos y la órbita se lea como órbita.
      const ang = (enAnillo / total) * 360 + anillo * 24;
      return { f, anillo, ang, i };
    });
  }, [fichas, eje]);

  /* La previsualización ya no se abre junto al nodo —tapaba a sus vecinos y se
     salía del panel por los bordes—, así que no hace falta medir hacia qué
     lado cabe: vive en la banda de lectura, que tiene sitio siempre. */

  /* --- Arrastre: gira el atlas sin pasar por React ------------------------- */
  const aplicar = useCallback(() => {
    campo.current?.style.setProperty('--giro', `${giro.current.toFixed(2)}deg`);
  }, []);

  /**
   * Arrastre del campo, separado del toque sobre un proyecto.
   *
   * Antes cualquier `pointerdown` sobre el campo iniciaba el giro, y como los
   * diecinueve nodos viven dentro del campo, tocar un proyecto en un teléfono
   * arrastraba el atlas en lugar de abrirlo: el dedo nunca está del todo quieto.
   *
   * Ahora el gesto se decide por lo que hace, no por dónde empieza:
   *
   * - si el toque nace en un control —nodo, botón o enlace— no hay arrastre;
   * - hasta los 8 px de recorrido el gesto sigue siendo un toque, y el clic del
   *   nodo llega intacto;
   * - pasados los 8 px empieza el giro y se anula **sólo** el clic inmediato;
   * - el movimiento vertical no se captura: la página sigue desplazándose.
   */
  useEffect(() => {
    if (!abierto) return undefined;
    const n = campo.current;
    if (!n) return undefined;

    /** Recorrido mínimo para considerar que el gesto es un arrastre. */
    const UMBRAL = 8;

    const abajo = (e: PointerEvent) => {
      if (e.button !== 0 && e.pointerType === 'mouse') return;
      const destino = e.target as HTMLElement | null;
      // Un toque que nace en un control le pertenece a ese control.
      if (destino?.closest('button, a, input, [role="button"]')) return;
      arrastre.current = { x: e.clientX, base: giro.current };
      partida.current = { x: e.clientX, y: e.clientY, id: e.pointerId, activo: false };
    };

    const mover = (e: PointerEvent) => {
      const p = partida.current;
      if (!p || !arrastre.current || e.pointerId !== p.id) return;
      const dx = e.clientX - p.x;
      const dy = e.clientY - p.y;

      if (!p.activo) {
        // Por debajo del umbral todavía no hay gesto. Y si el recorrido es
        // sobre todo vertical, el gesto es de la página, no del atlas.
        if (Math.hypot(dx, dy) < UMBRAL) return;
        if (Math.abs(dy) > Math.abs(dx)) { arrastre.current = null; partida.current = null; return; }
        p.activo = true;
        n.setPointerCapture?.(e.pointerId);
      }

      giro.current = arrastre.current.base + dx * 0.35;
      aplicar();
    };

    const soltar = (e: PointerEvent) => {
      const p = partida.current;
      if (p?.activo) {
        // Sólo se anula el clic que remata este arrastre, no los siguientes.
        arrastrado.current = true;
        window.setTimeout(() => { arrastrado.current = false; }, 0);
        n.releasePointerCapture?.(e.pointerId);
      }
      arrastre.current = null;
      partida.current = null;
    };

    const cancelar = (e: PointerEvent) => {
      if (partida.current?.activo) n.releasePointerCapture?.(e.pointerId);
      arrastre.current = null;
      partida.current = null;
    };

    n.addEventListener('pointerdown', abajo);
    window.addEventListener('pointermove', mover);
    window.addEventListener('pointerup', soltar);
    window.addEventListener('pointercancel', cancelar);
    return () => {
      n.removeEventListener('pointerdown', abajo);
      window.removeEventListener('pointermove', mover);
      window.removeEventListener('pointerup', soltar);
      window.removeEventListener('pointercancel', cancelar);
    };
  }, [abierto, aplicar]);

  /* --- Teclado: flechas recorren, Enter abre, Escape cierra ---------------- */
  useEffect(() => {
    if (!abierto) return;
    const previo = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    dialogo.current?.focus({ preventScroll: true });

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { e.preventDefault(); onCerrar(); return; }

      if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        const i = nodos.findIndex((n) => n.f.id === foco);
        const sig = e.key === 'ArrowRight'
          ? (i + 1 + nodos.length) % nodos.length
          : (i - 1 + nodos.length) % nodos.length;
        setFoco(nodos[sig]?.f.id ?? null);
        // El atlas gira para traer al frente el nodo enfocado: navegar con
        // teclado mueve la órbita igual que arrastrarla.
        giro.current = -(nodos[sig]?.ang ?? 0) + 270;
        aplicar();
        e.preventDefault();
        return;
      }

      if (e.key !== 'Tab') return;
      const f = panel.current?.querySelectorAll<HTMLElement>('button, a[href]');
      if (!f?.length) return;
      const a = f[0], z = f[f.length - 1];
      if (e.shiftKey && document.activeElement === a) { e.preventDefault(); z.focus(); }
      else if (!e.shiftKey && document.activeElement === z) { e.preventDefault(); a.focus(); }
    };

    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = previo;
    };
  }, [abierto, onCerrar, nodos, foco, aplicar]);

  /* Dos ayudas de primer uso, nunca a la vez: el turno global las ordena.
     La segunda sólo tiene sentido mientras el diálogo sigue abierto. */
  const fino = usePunteroFino();
  const elegir = useAyuda('vistazo-elegir', abierto, 900);
  const escape = useAyuda('vistazo-escape', abierto, 1400);

  if (!abierto) return null;

  const vista = nodos.find((n) => n.f.id === foco)?.f ?? null;

  return (
    <div className={styles.fondo} role="dialog" aria-modal="true"
         ref={dialogo} tabIndex={-1}
         aria-labelledby={`${idPanel}-t`}>
      <div className={styles.panel} ref={panel} data-vista={lista ? 'lista' : 'orbita'}>

        {/* Encabezado: qué es esto, qué se puede hacer y cómo se sale. Va
            pegado arriba para que el cierre no desaparezca al desplazar. */}
        <header className={styles.cabecera}>
          <div className={styles.rotulo}>
            <h2 id={`${idPanel}-t`} className={styles.titulo}>Índice de proyectos</h2>
            <p className={`${styles.instruccion} mono`}>
              Selecciona un proyecto · organiza por territorio, método o escala
            </p>
          </div>

          <div className={styles.acciones}>
            <button type="button" data-touch className={`${styles.accion} mono`}
                    aria-pressed={!lista}
                    onClick={() => setLista(!lista)}>
              {lista ? 'Ver órbita' : 'Ver lista'}
            </button>
            <button type="button" data-touch className={`${styles.accion} mono`}
                    data-cerrar=""
                    aria-describedby={escape.visible && fino ? escape.id : undefined}
                    onClick={() => { escape.cerrar(); onCerrar(); }}>
              Cerrar
            </button>
          </div>
        </header>

        {/* Los tres ejes reordenan el índice. Etiqueta completa y estado
            evidente: antes eran tres arcos en minúscula y el activo se
            distinguía por un recuadro que parecía un error de foco. */}
        <div className={styles.ejes} role="group" aria-label="Organizar el índice">
          {(EJES).map(({ id, etiqueta }, i) => (
            <button
              key={id} type="button" data-touch
              className={`${styles.eje} mono`}
              aria-pressed={eje === id}
              onClick={() => setEje(id)}
            >
              <span className={styles.ejeArco} aria-hidden="true" />
              {etiqueta}
            </button>
          ))}
        </div>

        {lista ? (
          /* Lista: una columna, fila completa pulsable, miniatura recortada.
             En tres columnas —código, título, territorio— los títulos largos
             se metían debajo del territorio y los textos se solapaban. */
          <ul className={styles.listado}>
            {nodos.map(({ f }) => (
              <li key={f.id}>
                <button type="button" data-touch className={styles.fila}
                        data-id={f.id}
                        onClick={() => { elegir.cerrar(); onElegir(f.id); }}
                        onFocus={() => setFoco(f.id)}>
                  <span className={styles.filaMini} aria-hidden="true">
                    {f.mini ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img src={f.mini.src} srcSet={f.mini.srcSet} sizes="72px"
                           width={f.mini.width} height={f.mini.height}
                           alt="" loading="lazy" decoding="async" />
                    ) : f.planta ? (
                      <svg viewBox={f.planta.viewBox} className={styles.filaPlanta}>
                        {f.planta.capas.map((c) => (
                          <g key={c.nombre} fill={c.color} stroke={c.color}
                             dangerouslySetInnerHTML={{ __html: c.body }} />
                        ))}
                      </svg>
                    ) : null}
                  </span>
                  <span className={styles.filaTexto}>
                    <span className={`${styles.filaNum} mono`}>{f.num}</span>
                    <span className={styles.filaTitulo}>{f.titulo}</span>
                    <span className={`${styles.filaLugar} mono`}>{f.lugar}</span>
                  </span>
                  <span className={styles.filaFlecha} aria-hidden="true" />
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <>
            <div className={styles.campo} ref={campo} data-campo>
              {/* El núcleo es contexto, no protagonista. En móvil ni siquiera
                  se monta la escena 3D: un dibujo sostiene la misma lectura. */}
              <div className={styles.nucleo}>
                {movil ? (
                  <GloboEstatico marcadores={marcadores.map((m, i) => ({ ...m, territoryId: String(i), nombre: '' }))} listo />
                ) : (
                  <Globe
                    markerConfig={{ markers: marcadores, color: '#e9ff3a', size: 26 }}
                    fill="dots"
                    dots={{ color: '#f6f7f2', size: 3, density: 8, allDots: false }}
                    fillColor="#f6f7f2" oceanColor="#080908"
                    outlineColor="#f6f7f2" outlineWidth={1} showOutline
                    graticuleColor="#22221c" showGrid
                    initialLatitude={23} initialLongitude={102}
                    scale={9} speed={0.18} direction="left"
                    stopOnHover dragSpeed={3} detail={5} smoothing={9}
                    style={{ width: '100%', height: '100%' }}
                  />
                )}
              </div>

              {/* Las tres órbitas y la salida que cierra la `@`. */}
              <svg className={styles.trazas} viewBox="0 0 100 100" aria-hidden="true">
                {RADIOS.map((r) => (
                  <circle key={r} cx="50" cy="50" r={r} className={styles.traza} />
                ))}
                <path className={styles.salida}
                      d="M50 19 C 76 19, 92 34, 92 52 C 92 70, 78 82, 62 82" />
              </svg>

              {nodos.map(({ f, anillo, ang, i }) => (
                <button
                  key={f.id}
                  type="button"
                  className={styles.nodo}
                  data-on={foco === f.id || undefined}
                  style={{
                    '--r': String(RADIOS[anillo]),
                    '--a': `${ang}deg`,
                    '--i': String(i),
                  } as CSSProperties}
                  data-id={f.id}
                  onPointerEnter={() => setFoco(f.id)}
                  onFocus={() => setFoco(f.id)}
                  onClick={() => { if (arrastrado.current) return; elegir.cerrar(); onElegir(f.id); }}
                  aria-label={`${f.num} ${f.titulo}, ${f.lugar}`}
                >
                  <span className={styles.nodoPunto} aria-hidden="true" />
                  <span className={`${styles.nodoNum} mono`}>{f.num}</span>
                </button>
              ))}
            </div>

            {/* La lectura del proyecto señalado: una sola composición con la
                miniatura dentro. Antes la previsualización salía flotando junto
                al nodo y tapaba los proyectos vecinos, mientras el título vivía
                en otra esquina del panel. */}
            <div className={styles.lectura} aria-live="polite">
              {vista ? (
                <>
                  <span className={styles.lecturaMini} aria-hidden="true">
                    {vista.mini ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img src={vista.mini.src} srcSet={vista.mini.srcSet} sizes="180px"
                           width={vista.mini.width} height={vista.mini.height}
                           alt="" decoding="async" />
                    ) : vista.planta ? (
                      <svg viewBox={vista.planta.viewBox} className={styles.filaPlanta}>
                        {vista.planta.capas.map((c) => (
                          <g key={c.nombre} fill={c.color} stroke={c.color}
                             dangerouslySetInnerHTML={{ __html: c.body }} />
                        ))}
                      </svg>
                    ) : null}
                  </span>
                  <span className={styles.lecturaTexto}>
                    <span className={`${styles.lecturaNum} mono`}>{vista.num}</span>
                    <span className={styles.lecturaTitulo}>{vista.titulo}</span>
                    <span className={`${styles.lecturaMeta} mono`}>
                      {`${vista.lugar} · ${vista.metodo} · ${vista.escala}`}
                    </span>
                  </span>
                </>
              ) : (
                <span className={`${styles.lecturaMeta} mono`}>
                  {`${fichas.length} proyectos · señala uno para verlo`}
                </span>
              )}
            </div>
          </>
        )}

        {/* La ayuda de teclado sólo tiene sentido donde hay teclado. */}
        {escape.visible && fino && !lista
          ? <Ayuda id={escape.id} texto="Esc cierra" /> : null}
      </div>
    </div>
  );
}
