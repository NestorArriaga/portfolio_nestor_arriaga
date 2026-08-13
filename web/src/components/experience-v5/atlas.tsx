'use client';

import { CSSProperties, useCallback, useEffect, useMemo, useRef, useState } from 'react';

import type { Lamina } from './registry';
import styles from './atlas.module.css';

/**
 * Vistazo — el atlas de proyectos, y el HUD que lo acompaña.
 *
 * Lo que hace «inteligente» al índice no es un adorno: es que las relaciones
 * que ofrece son reales. Territorio, método y escala salen del registro de los
 * quince proyectos, no de etiquetas inventadas para tener filtros.
 */

export type Ficha = {
  id: string;
  num: string;
  titulo: string;
  lugar: string;
  territorio: string;
  metodo: string;
  escala: string;
  href: string;
  mini: Lamina | null;
  planta?: { viewBox: string; capas: { nombre: string; color: string; body: string }[] } | null;
};

/* -------------------------------------------------------------------------- */
/* Vistazo                                                                     */
/* -------------------------------------------------------------------------- */

export function Vistazo({
  abierto, fichas, onCerrar, onElegir,
}: {
  abierto: boolean;
  fichas: Ficha[];
  onCerrar: () => void;
  onElegir: (id: string) => void;
}) {
  const [eje, setEje] = useState<'territorio' | 'metodo' | 'escala'>('territorio');
  const [grupo, setGrupo] = useState<string | null>(null);
  const [foco, setFoco] = useState<string | null>(null);
  const panel = useRef<HTMLDivElement>(null);
  const primero = useRef<HTMLButtonElement>(null);
  const posiciones = useRef(new Map<string, DOMRect>());

  const grupos = useMemo(
    () => Array.from(new Set(fichas.map((f) => f[eje]))).filter(Boolean),
    [fichas, eje],
  );

  const lista = useMemo(() => {
    const orden = grupo ? fichas.filter((f) => f[eje] === grupo) : fichas;
    // Al ordenar por un eje, las fichas se agrupan por él: la reordenación
    // enseña la relación, no sólo filtra.
    return [...orden].sort((a, b) => (a[eje] as string).localeCompare(b[eje] as string)
      || a.num.localeCompare(b.num));
  }, [fichas, eje, grupo]);

  /* --- FLIP: se mide antes y se anima el delta, sin animar el layout ------- */
  useEffect(() => {
    if (!abierto) return;
    const nodos = panel.current?.querySelectorAll<HTMLElement>('[data-ficha]');
    if (!nodos) return;
    nodos.forEach((n) => {
      const id = n.dataset.ficha!;
      const antes = posiciones.current.get(id);
      const ahora = n.getBoundingClientRect();
      if (antes) {
        const dx = antes.left - ahora.left;
        const dy = antes.top - ahora.top;
        if (Math.abs(dx) > 1 || Math.abs(dy) > 1) {
          n.animate(
            [{ transform: `translate(${dx}px, ${dy}px)` }, { transform: 'none' }],
            { duration: 420, easing: 'cubic-bezier(.16,1,.3,1)' },
          );
        }
      }
      posiciones.current.set(id, ahora);
    });
  }, [lista, abierto]);

  /* --- Escape, trampa de foco y bloqueo del fondo -------------------------- */
  useEffect(() => {
    if (!abierto) return;
    const previo = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    primero.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { e.preventDefault(); onCerrar(); return; }
      if (e.key !== 'Tab') return;
      const f = panel.current?.querySelectorAll<HTMLElement>('button, a[href], [tabindex]:not([tabindex="-1"])');
      if (!f?.length) return;
      const a = f[0], z = f[f.length - 1];
      if (e.shiftKey && document.activeElement === a) { e.preventDefault(); z.focus(); }
      else if (!e.shiftKey && document.activeElement === z) { e.preventDefault(); a.focus(); }
    };

    document.addEventListener('keydown', onKey);
    // Se captura el Map ahora, no en el cleanup: para entonces el `ref` puede
    // apuntar a otro objeto y se limpiaría el equivocado.
    const medidas = posiciones.current;
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = previo;
      medidas.clear();
    };
  }, [abierto, onCerrar]);

  if (!abierto) return null;

  const vista = lista.find((f) => f.id === foco) ?? lista[0] ?? null;

  return (
    <div className={styles.fondo} role="dialog" aria-modal="true" aria-label="Atlas de proyectos">
      <div className={styles.panel} ref={panel}>
        <header className={styles.cabecera}>
          <p className={styles.titulo}>Atlas</p>
          <p className={`${styles.cuenta} mono`}>{`${lista.length} / ${fichas.length}`}</p>
          <button type="button" className={`${styles.cerrar} mono`} data-touch onClick={onCerrar}>
            Cerrar
          </button>
        </header>

        <div className={styles.ejes}>
          <div className={styles.grupoEjes} role="group" aria-label="Organizar por">
            {(['territorio', 'metodo', 'escala'] as const).map((x, i) => (
              <button
                key={x} type="button" data-touch className={`${styles.chip} mono`}
                ref={i === 0 ? primero : undefined}
                aria-pressed={eje === x}
                onClick={() => { setEje(x); setGrupo(null); }}
              >{x}</button>
            ))}
          </div>
          <div className={styles.grupoEjes} role="group" aria-label="Filtrar">
            <button type="button" data-touch className={`${styles.chip} mono`}
                    aria-pressed={grupo === null} onClick={() => setGrupo(null)}>todos</button>
            {grupos.map((g) => (
              <button key={g} type="button" data-touch className={`${styles.chip} mono`}
                      aria-pressed={grupo === g} onClick={() => setGrupo(grupo === g ? null : g)}>{g}</button>
            ))}
          </div>
        </div>

        <div className={styles.mesa}>
          <ul className={styles.rejilla}>
            {lista.map((f) => (
              <li key={f.id} data-ficha={f.id} data-on={vista?.id === f.id || undefined}>
                <button
                  type="button" className={styles.ficha} data-touch
                  onClick={() => onElegir(f.id)}
                  onPointerEnter={() => setFoco(f.id)}
                  onFocus={() => setFoco(f.id)}
                >
                  <span className={styles.miniCaja}>
                    {f.mini ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img src={f.mini.src} srcSet={f.mini.srcSet} sizes="20vw"
                           width={f.mini.width} height={f.mini.height}
                           alt="" loading="lazy" decoding="async" />
                    ) : null}
                  </span>
                  <span className={`${styles.fichaNum} mono`}>{f.num}</span>
                  <span className={styles.fichaTitulo}>{f.titulo}</span>
                </button>
              </li>
            ))}
          </ul>

          <aside className={styles.detalle}>
            {vista ? (
              <>
                <figure className={styles.detalleImg}>
                  {vista.mini ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img key={vista.id} src={vista.mini.src} srcSet={vista.mini.srcSet} sizes="40vw"
                         width={vista.mini.width} height={vista.mini.height}
                         alt={`${vista.titulo}. ${vista.lugar}.`} loading="lazy" decoding="async" />
                  ) : null}
                </figure>
                <p className={styles.detalleTitulo}>{vista.titulo}</p>
                <p className={`${styles.detalleLugar} mono`}>{vista.lugar}</p>
                <p className={`${styles.detalleEjes} mono`}>
                  {`${vista.metodo} · ${vista.escala}`}
                </p>
                <a href={vista.href} className={`${styles.detalleCaso} mono`} data-touch>Abrir caso</a>
              </>
            ) : null}
          </aside>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* HUD contextual                                                              */
/* -------------------------------------------------------------------------- */

/**
 * No es una cabecera: es el instrumento. Quince marcas, el proyecto activo, su
 * acto y su territorio. En escenas densas se reduce a las marcas y vuelve
 * entero al mover el puntero, enfocar o cambiar el sentido del scroll.
 */
export function Hud({
  fichas, actos, onVistazo, onInicio, vistazoRef,
}: {
  fichas: Ficha[];
  actos: Record<string, string>;
  onVistazo: () => void;
  onInicio: () => void;
  vistazoRef: (el: HTMLButtonElement | null) => void;
}) {
  const [activo, setActivo] = useState<string | null>(null);
  const [superficie, setSuperficie] = useState<string>('tinta');
  const [entero, setEntero] = useState(true);
  const ultimo = useRef(0);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entradas) => {
        // Se observan **todas** las escenas, no sólo las que empiezan por `p`.
        // Con el filtro anterior GRANULAR y el parque no entraban nunca, y el
        // HUD seguía anunciando el último proyecto visto: sobre la escena de
        // AGUA se leía «P05 Geomorfología».
        let mejor: HTMLElement | null = null;
        let r = 0.25;
        for (const e of entradas) {
          if (e.intersectionRatio > r) { r = e.intersectionRatio; mejor = e.target as HTMLElement; }
        }
        if (!mejor) return;
        const id = mejor.dataset.k5 ?? null;
        setActivo(id);
        // La superficie de la escena manda sobre el color del HUD: sobre papel
        // el velo oscuro tapaba la composición.
        setSuperficie(mejor.dataset.sup ?? 'tinta');
      },
      { threshold: [0.25, 0.5, 0.75] },
    );
    document.querySelectorAll<HTMLElement>('[data-k5]').forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    let frame = 0;
    const medir = () => {
      frame = 0;
      const y = window.scrollY;
      // Se recoge al bajar y vuelve al subir. Cambiar de sentido es la señal.
      if (y > ultimo.current + 6 && y > 400) setEntero(false);
      else if (y < ultimo.current - 6) setEntero(true);
      ultimo.current = y;
    };
    const on = () => { cancelAnimationFrame(frame); frame = requestAnimationFrame(medir); };
    window.addEventListener('scroll', on, { passive: true });
    return () => { window.removeEventListener('scroll', on); cancelAnimationFrame(frame); };
  }, []);

  const f = fichas.find((x) => x.id === activo) ?? null;

  return (
    <div
      className={styles.hud}
      data-sup={superficie === 'tinta' ? undefined : superficie}
      data-entero={entero || undefined}
      onPointerEnter={() => setEntero(true)}
      onFocusCapture={() => setEntero(true)}
    >
      <button type="button" className={`${styles.hudInicio} mono`} data-touch onClick={onInicio}>
        Atlas
      </button>

      {/* Quince marcas: una línea de 1 px por proyecto, no una barra gruesa. */}
      <ol className={styles.marcas} aria-hidden="true">
        {fichas.map((x) => (
          <li key={x.id} data-on={x.id === activo || undefined} />
        ))}
      </ol>

      <p className={`${styles.hudActivo} mono`} aria-live="polite">
        {f ? (
          <>
            <span className={styles.hudNum}>{f.num}</span>
            <span>{f.titulo}</span>
            <span className={styles.hudActo}>{actos[f.id] ?? ''}</span>
            <span className={styles.hudTerritorio}>{f.territorio}</span>
          </>
        ) : null}
      </p>

      <button ref={vistazoRef} type="button" className={`${styles.hudVistazo} mono`}
              data-touch aria-label="Abrir índice de proyectos"
              onClick={onVistazo}>Vistazo</button>
    </div>
  );
}
