'use client';

import dynamic from 'next/dynamic';
import { CSSProperties, useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { Ayuda, useAyuda, usePunteroFino } from './ayudas';
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
  const [eje, setEje] = useState<Eje>('territorio');
  const [foco, setFoco] = useState<string | null>(null);
  const [lista, setLista] = useState(false);   // vista accesible alternativa
  const panel = useRef<HTMLDivElement>(null);
  const campo = useRef<HTMLDivElement>(null);
  const primero = useRef<HTMLButtonElement>(null);
  const giro = useRef(0);
  const arrastre = useRef<{ x: number; base: number } | null>(null);

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

  /**
   * La previsualización se abre hacia dentro del panel. Un nodo abajo a la
   * derecha abriría fuera de la pantalla, así que al señalarlo se mide su
   * posición real —que cambia con el giro del atlas— y se marca el lado. Es una
   * medición por señalamiento, no por fotograma.
   */
  useEffect(() => {
    if (!foco) return;
    const n = campo.current?.querySelector<HTMLElement>(`[data-id="${foco}"]`);
    const p = panel.current;
    if (!n || !p) return;
    const a = n.getBoundingClientRect();
    const b = p.getBoundingClientRect();
    n.dataset.vert = (a.top + a.height / 2 - b.top) / b.height > 0.56 ? 'arriba' : 'abajo';
    const x = (a.left + a.width / 2 - b.left) / b.width;
    n.dataset.lado = x > 0.76 ? 'izq' : x < 0.24 ? 'der' : 'centro';
  }, [foco, eje]);

  /* --- Arrastre: gira el atlas sin pasar por React ------------------------- */
  const aplicar = useCallback(() => {
    campo.current?.style.setProperty('--giro', `${giro.current.toFixed(2)}deg`);
  }, []);

  useEffect(() => {
    if (!abierto) return;
    const n = campo.current;
    if (!n) return;

    const abajo = (e: PointerEvent) => { arrastre.current = { x: e.clientX, base: giro.current }; };
    const mover = (e: PointerEvent) => {
      if (!arrastre.current) return;
      giro.current = arrastre.current.base + (e.clientX - arrastre.current.x) * 0.35;
      aplicar();
    };
    const arriba = () => { arrastre.current = null; };

    n.addEventListener('pointerdown', abajo);
    window.addEventListener('pointermove', mover);
    window.addEventListener('pointerup', arriba);
    return () => {
      n.removeEventListener('pointerdown', abajo);
      window.removeEventListener('pointermove', mover);
      window.removeEventListener('pointerup', arriba);
    };
  }, [abierto, aplicar]);

  /* --- Teclado: flechas recorren, Enter abre, Escape cierra ---------------- */
  useEffect(() => {
    if (!abierto) return;
    const previo = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    primero.current?.focus();

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
    <div className={styles.fondo} role="dialog" aria-modal="true" aria-label="Atlas orbital de proyectos">
      <div className={styles.panel} ref={panel}>
        {/* Tres anillos-instrumento. No son chips: son los ejes del atlas. */}
        <div className={styles.anillos} role="group" aria-label="Reordenar la órbita">
          {(['territorio', 'metodo', 'escala'] as Eje[]).map((x, i) => (
            <button
              key={x} type="button" data-touch
              ref={i === 0 ? primero : undefined}
              className={`${styles.anillo} mono`}
              aria-pressed={eje === x}
              onClick={() => setEje(x)}
            >
              <span className={styles.anilloArco} aria-hidden="true" />
              {x}
            </button>
          ))}
        </div>

        <div className={styles.campo} ref={campo}>
          {/* El núcleo: el mismo globo, reducido, como contexto. */}
          <div className={styles.nucleo}>
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
              onClick={() => { elegir.cerrar(); onElegir(f.id); }}
              aria-label={`${f.num} ${f.titulo}, ${f.lugar}`}
            >
              {/* El nodo es una etiqueta, no una caja: número y punto. La
                  miniatura sólo aparece al señalar, y lo hace junto al nodo
                  para que se lea como una previsualización de ese punto de la
                  órbita y no como una tarjeta suelta. */}
              <span className={styles.nodoPunto} aria-hidden="true" />
              <span className={`${styles.nodoNum} mono`}>{f.num}</span>
              <span className={styles.nodoPrevia} aria-hidden="true">
                {f.mini ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img src={f.mini.src} srcSet={f.mini.srcSet} sizes="18vw"
                       width={f.mini.width} height={f.mini.height}
                       alt="" loading="lazy" decoding="async" />
                ) : f.planta ? (
                  <svg className={styles.nodoPlanta} viewBox={f.planta.viewBox}>
                    {f.planta.capas.map((c) => (
                      <g key={c.nombre} fill={c.color} stroke={c.color}
                         dangerouslySetInnerHTML={{ __html: c.body }} />
                    ))}
                  </svg>
                ) : null}
                <span className={`${styles.nodoPreviaTitulo} mono`}>{f.titulo}</span>
              </span>
            </button>
          ))}
        </div>

        {/* Al enfocar: número, título, lugar, método y escala. Nada más. */}
        <div className={styles.lectura} aria-live="polite">
          {vista ? (
            <>
              <p className={`${styles.lecturaNum} mono`}>{vista.num}</p>
              <p className={styles.lecturaTitulo}>{vista.titulo}</p>
              <p className={`${styles.lecturaMeta} mono`}>
                {`${vista.lugar} · ${vista.metodo} · ${vista.escala}`}
              </p>
            </>
          ) : (
            <p className={`${styles.lecturaMeta} mono`}>
              {`${fichas.length} entradas en órbita`}
            </p>
          )}
          {/* La segunda ayuda nombra una tecla, así que sólo tiene sentido
              donde hay teclado. En táctil manda el botón de cierre, que ya
              lleva su nombre accesible completo. */}
          {elegir.visible ? <Ayuda id={elegir.id} texto="Selecciona un proyecto" />
            : (escape.visible && fino) ? <Ayuda id={escape.id} texto="Esc cierra" /> : null}
        </div>

        <div className={styles.controles}>
          <button type="button" data-touch className={`${styles.control} mono`}
                  aria-label={lista ? 'Ver el índice como órbita' : 'Ver el índice como lista'}
                  aria-pressed={lista} onClick={() => setLista(!lista)}>
            {lista ? 'órbita' : 'lista'}
          </button>
          <button type="button" data-touch className={`${styles.control} mono`}
                  aria-label="Cerrar el índice de proyectos"
                  aria-describedby={escape.visible && fino ? escape.id : undefined}
                  onClick={() => { escape.cerrar(); onCerrar(); }}>
            cerrar
          </button>
        </div>

        {/* Vista accesible alternativa. La principal sigue siendo la órbita. */}
        {lista ? (
          <ul className={styles.listaPlana}>
            {nodos.map(({ f }) => (
              <li key={f.id}>
                <button type="button" data-touch className={styles.filaPlana}
                        onClick={() => { elegir.cerrar(); onElegir(f.id); }} onFocus={() => setFoco(f.id)}>
                  <span className={`${styles.filaNum} mono`}>{f.num}</span>
                  <span className={styles.filaTitulo}>{f.titulo}</span>
                  <span className={`${styles.filaMeta} mono`}>{f.lugar}</span>
                </button>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </div>
  );
}
