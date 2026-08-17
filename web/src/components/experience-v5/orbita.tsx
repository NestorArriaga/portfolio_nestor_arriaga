'use client';

import dynamic from 'next/dynamic';
import { CSSProperties, useCallback, useEffect, useId, useMemo, useRef, useState } from 'react';

import { Ayuda, useAyuda, usePunteroFino } from './ayudas';
import { GloboEstatico } from './umbral';
import type { Ficha } from './atlas';
import styles from './orbita.module.css';

/**
 * Explorador del Atlas.
 *
 * Un solo modelo para entrar al trabajo: **territorio → proyectos**. Quince
 * proyectos repartidos en seis sitios y cuatro sistemas digitales, no
 * diecinueve códigos flotando alrededor de unos anillos.
 *
 * El globo es contexto, no competidor: sitúa los territorios que tienen
 * geometría verificada. No se reinicia al cambiar de territorio —rehacer la
 * escena WebGL en cada clic costaría más que lo que aporta orientarla— y en
 * pantalla estrecha ni siquiera se monta: un dibujo sostiene la misma lectura
 * sin un contexto 3D.
 *
 * «Relaciones» conserva la órbita como lectura secundaria, con una diferencia
 * que la hace legible: **cada anillo es un territorio**. Antes los tres anillos
 * eran una paginación de cinco en cinco y no significaban nada; ahora el número
 * de nodos de un anillo es el número de proyectos de ese sitio, y eso se puede
 * rotular sin inventar nada.
 */

const Globe = dynamic(() => import('@/components/originkit/ui/globe'), {
  ssr: false,
  loading: () => <div className={styles.nucleoHueco} aria-hidden="true" />,
});

export type Territorio = {
  id: string;
  nombre: string;
  corto: string;
  region: string;
  proyectos: number;
  /** Falso si no hay geometría de la que derivar su punto en el globo. */
  situado: boolean;
  lat: number | null;
  lng: number | null;
};

/** Los sistemas no ocupan territorio: son la herramienta transversal. */
const SISTEMAS: Territorio = {
  id: 'sistemas',
  nombre: 'Sistemas digitales',
  corto: 'Sistemas',
  region: 'Plataformas y herramientas',
  proyectos: 4,
  situado: false,
  lat: null,
  lng: null,
};

/** Radios de los anillos de «Relaciones», del interior al exterior. */
const RADIOS = [15, 22, 29, 36, 43, 48, 52];

export function VistazoOrbital({
  abierto, fichas, territorios, marcadores, onCerrar, onElegir,
}: {
  abierto: boolean;
  fichas: Ficha[];
  territorios: Territorio[];
  marcadores: { lat: number; lng: number }[];
  onCerrar: () => void;
  onElegir: (id: string) => void;
}) {
  const idPanel = useId().replace(/:/g, '');
  const [territorio, setTerritorio] = useState<string | null>(null);
  const [elegido, setElegido] = useState<string | null>(null);
  const [relaciones, setRelaciones] = useState(false);
  const [movil, setMovil] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 900px), (pointer: coarse)');
    const leer = () => setMovil(mq.matches);
    leer();
    mq.addEventListener('change', leer);
    return () => mq.removeEventListener('change', leer);
  }, []);

  const dialogo = useRef<HTMLDivElement>(null);
  const campo = useRef<HTMLDivElement>(null);
  const giro = useRef(0);
  const arrastre = useRef<{ x: number; base: number } | null>(null);
  const partida = useRef<{ x: number; y: number; id: number; activo: boolean } | null>(null);
  const arrastrado = useRef(false);

  /** Los siete grupos, en el orden en que se recorre el atlas. */
  const grupos = useMemo(() => {
    const conSistemas = [...territorios, SISTEMAS];
    return conSistemas
      .map((t) => ({ t, fichas: fichas.filter((f) => f.territorioId === t.id) }))
      .filter((g) => g.fichas.length > 0);
  }, [territorios, fichas]);

  const visibles = useMemo(
    () => (territorio ? fichas.filter((f) => f.territorioId === territorio) : fichas),
    [fichas, territorio],
  );

  /* La ficha nunca queda vacía: si nadie ha elegido, muestra la primera de lo
     que hay a la vista. Un panel en blanco no enseña qué es una ficha. */
  const ficha = useMemo(
    () => visibles.find((f) => f.id === elegido) ?? visibles[0] ?? null,
    [visibles, elegido],
  );

  const situados = territorios.filter((t) => t.situado).length;

  /* --- Relaciones: un anillo por territorio ------------------------------- */
  const nodos = useMemo(() => {
    const out: { f: Ficha; r: number; ang: number }[] = [];
    grupos.forEach((g, anillo) => {
      const r = RADIOS[Math.min(anillo, RADIOS.length - 1)];
      g.fichas.forEach((f, i) => {
        // Cada anillo arranca desplazado para que los nodos de anillos vecinos
        // no se alineen en el mismo radio y se tapen entre sí.
        const ang = (i / g.fichas.length) * 360 + anillo * 17;
        out.push({ f, r, ang });
      });
    });
    return out;
  }, [grupos]);

  const aplicar = useCallback(() => {
    campo.current?.style.setProperty('--giro', `${giro.current.toFixed(2)}deg`);
  }, []);

  /* --- Arrastre en «Relaciones»: gira el atlas sin pasar por React --------- */
  useEffect(() => {
    if (!abierto || !relaciones) return;
    const n = campo.current;
    if (!n) return;

    const UMBRAL = 8;

    const bajar = (e: PointerEvent) => {
      // Un gesto que nace sobre un control es del control, no del campo.
      if ((e.target as HTMLElement).closest('button, a, [role="button"]')) return;
      if (e.pointerType === 'mouse' && e.button !== 0) return;
      partida.current = { x: e.clientX, y: e.clientY, id: e.pointerId, activo: false };
      arrastrado.current = false;
    };

    const mover = (e: PointerEvent) => {
      const p = partida.current;
      if (!p || e.pointerId !== p.id) return;

      if (!p.activo) {
        // Por debajo del umbral todavía puede ser un toque: no se secuestra el
        // gesto, y el desplazamiento vertical del documento sigue funcionando.
        if (Math.hypot(e.clientX - p.x, e.clientY - p.y) < UMBRAL) return;
        p.activo = true;
        arrastrado.current = true;
        arrastre.current = { x: e.clientX, base: giro.current };
        try { n.setPointerCapture(e.pointerId); } catch { /* ya capturado */ }
      }

      const a = arrastre.current;
      if (!a) return;
      giro.current = a.base + (e.clientX - a.x) * 0.35;
      aplicar();
    };

    const soltar = (e: PointerEvent) => {
      const p = partida.current;
      if (!p || e.pointerId !== p.id) return;
      if (p.activo) {
        try { n.releasePointerCapture(e.pointerId); } catch { /* ya soltado */ }
        // Sólo se anula el clic accidental que remata este arrastre.
        setTimeout(() => { arrastrado.current = false; }, 0);
      }
      partida.current = null;
      arrastre.current = null;
    };

    const cancelar = (e: PointerEvent) => {
      if (partida.current?.id === e.pointerId) { partida.current = null; arrastre.current = null; }
      arrastrado.current = false;
    };

    n.addEventListener('pointerdown', bajar);
    window.addEventListener('pointermove', mover);
    window.addEventListener('pointerup', soltar);
    window.addEventListener('pointercancel', cancelar);
    return () => {
      n.removeEventListener('pointerdown', bajar);
      window.removeEventListener('pointermove', mover);
      window.removeEventListener('pointerup', soltar);
      window.removeEventListener('pointercancel', cancelar);
    };
  }, [abierto, relaciones, aplicar]);

  /* --- Teclado y bloqueo de fondo ----------------------------------------- */
  useEffect(() => {
    if (!abierto) return;
    const previo = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    dialogo.current?.focus({ preventScroll: true });

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { e.preventDefault(); onCerrar(); }
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = previo;
    };
  }, [abierto, onCerrar]);

  const fino = usePunteroFino();
  const escape = useAyuda('explorador-escape', abierto, 1400);
  const tocar = useAyuda('explorador-territorio', abierto && !relaciones, 900);

  if (!abierto) return null;

  const abrir = (id: string) => { tocar.cerrar(); onElegir(id); };

  return (
    <div className={styles.fondo} role="dialog" aria-modal="true"
         ref={dialogo} tabIndex={-1} aria-labelledby={`${idPanel}-t`}>
      <div className={styles.panel} data-vista={relaciones ? 'relaciones' : 'explorar'}>

        <header className={styles.cabecera}>
          <div className={styles.rotulo}>
            <h2 id={`${idPanel}-t`} className={styles.titulo}>Explorador del Atlas</h2>
            <p className={`${styles.instruccion} mono`} id={`${idPanel}-i`}>
              Elige un territorio · abre un proyecto
            </p>
          </div>

          <div className={styles.acciones}>
            {/* La órbita es lectura secundaria y se nombra por lo que enseña. */}
            <button type="button" data-touch className={`${styles.accion} mono`}
                    aria-pressed={relaciones}
                    onClick={() => setRelaciones((v) => !v)}>
              {relaciones ? 'Ver territorios' : 'Relaciones'}
            </button>
            <button type="button" data-touch className={`${styles.accion} mono`}
                    data-cerrar=""
                    aria-describedby={escape.visible && fino ? escape.id : undefined}
                    onClick={() => { escape.cerrar(); onCerrar(); }}>
              Cerrar
            </button>
          </div>
        </header>

        {relaciones ? (
          <Relaciones
            campo={campo} grupos={grupos} nodos={nodos}
            arrastrado={arrastrado} onAbrir={abrir}
          />
        ) : (
          <div className={styles.reparto}>
            {/* Contexto: dónde está cada territorio. En pantalla estrecha es un
                dibujo pequeño y no bloquea nada; en escritorio, el globo. */}
            <div className={styles.contexto}>
              <div className={styles.nucleo}>
                {movil ? (
                  /* `listo` significa «el globo 3D ya montó, retírate»: aquí
                     el dibujo es el globo, así que se queda a la vista. */
                  <GloboEstatico
                    marcadores={marcadores.map((m, i) => ({ ...m, territoryId: String(i), nombre: '' }))}
                    listo={false}
                  />
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

              {/* Lo que el globo no puede situar se dice, no se disimula. */}
              {situados < territorios.length ? (
                <p className={`${styles.nota} mono`}>
                  {`${situados} de ${territorios.length} territorios con coordenada verificada`}
                </p>
              ) : null}
            </div>

            <div className={styles.seleccion}>
              <div className={styles.territorios} role="group"
                   aria-label="Territorios del atlas" aria-describedby={`${idPanel}-i`}>
                <button type="button" data-touch className={`${styles.territorio} mono`}
                        aria-pressed={territorio === null}
                        onClick={() => { setTerritorio(null); setElegido(null); }}>
                  <span className={styles.territorioNombre}>Todos</span>
                  <span className={styles.territorioCuenta}>{fichas.length}</span>
                </button>

                {grupos.map(({ t, fichas: fs }) => (
                  <button
                    key={t.id} type="button" data-touch
                    className={`${styles.territorio} mono`}
                    aria-pressed={territorio === t.id}
                    aria-describedby={tocar.visible ? tocar.id : undefined}
                    onClick={() => {
                      tocar.cerrar();
                      setTerritorio(t.id === territorio ? null : t.id);
                      setElegido(null);
                    }}
                  >
                    <span className={styles.territorioNombre}>{t.nombre}</span>
                    <span className={styles.territorioCuenta}>{fs.length}</span>
                    {t.situado ? <i className={styles.territorioPunto} aria-hidden="true" /> : null}
                  </button>
                ))}
              </div>

              {tocar.visible ? <Ayuda id={tocar.id} texto="Toca un territorio" /> : null}

              <ul className={styles.listado}>
                {visibles.map((f) => (
                  <li key={f.id}>
                    <button
                      type="button" data-touch className={styles.fila}
                      data-id={f.id}
                      data-on={ficha?.id === f.id || undefined}
                      onClick={() => abrir(f.id)}
                      onPointerEnter={() => setElegido(f.id)}
                      onFocus={() => setElegido(f.id)}
                      aria-label={`${f.num} ${f.titulo}, ${f.lugar}`}
                    >
                      <span className={styles.filaMini} aria-hidden="true">
                        <Mini f={f} sizes="76px" />
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

              {/* La ficha del proyecto en foco. Entera es el enlace: no hay que
                  encontrar una palabra pequeña para abrirlo. */}
              {ficha && !movil ? (
                <a className={styles.ficha} href={ficha.href}
                   onClick={(e) => { e.preventDefault(); abrir(ficha.id); }}>
                  <span className={styles.fichaMini} aria-hidden="true">
                    <Mini f={ficha} sizes="200px" />
                  </span>
                  <span className={styles.fichaTexto}>
                    <span className={`${styles.fichaNum} mono`}>{ficha.num}</span>
                    <span className={styles.fichaTitulo}>{ficha.titulo}</span>
                    <dl className={`${styles.fichaDatos} mono`}>
                      <div><dt>territorio</dt><dd>{ficha.lugar}</dd></div>
                      <div><dt>método</dt><dd>{ficha.metodo}</dd></div>
                      <div><dt>escala</dt><dd>{ficha.escala}</dd></div>
                    </dl>
                    <span className={`${styles.fichaAbrir} mono`}>Abrir proyecto</span>
                  </span>
                </a>
              ) : null}
            </div>
          </div>
        )}

        {escape.visible && fino ? <Ayuda id={escape.id} texto="Esc cierra" /> : null}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */

/** La miniatura de índice, o el dibujo de planta cuando no hay ráster. */
function Mini({ f, sizes }: { f: Ficha; sizes: string }) {
  if (f.mini) {
    return (
      /* eslint-disable-next-line @next/next/no-img-element */
      <img src={f.mini.src} srcSet={f.mini.srcSet} sizes={sizes}
           width={f.mini.width} height={f.mini.height}
           alt="" loading="lazy" decoding="async" />
    );
  }
  if (f.planta) {
    return (
      <svg viewBox={f.planta.viewBox} className={styles.filaPlanta} aria-hidden="true">
        {f.planta.capas.map((c) => (
          <g key={c.nombre} fill={c.color} stroke={c.color}
             dangerouslySetInnerHTML={{ __html: c.body }} />
        ))}
      </svg>
    );
  }
  return null;
}

/**
 * Relaciones — la órbita como lectura secundaria.
 *
 * Un anillo por territorio. El número de nodos de un anillo es el número de
 * proyectos de ese sitio: la forma dice algo verificable, y por eso se puede
 * rotular sin inventarle un significado.
 */
function Relaciones({
  campo, grupos, nodos, arrastrado, onAbrir,
}: {
  campo: React.RefObject<HTMLDivElement>;
  grupos: { t: Territorio; fichas: Ficha[] }[];
  nodos: { f: Ficha; r: number; ang: number }[];
  arrastrado: React.MutableRefObject<boolean>;
  onAbrir: (id: string) => void;
}) {
  const [foco, setFoco] = useState<string | null>(null);
  const vista = nodos.find((n) => n.f.id === foco)?.f ?? null;

  return (
    <div className={styles.relaciones}>
      <div className={styles.campo} ref={campo} data-campo>
        <svg className={styles.trazas} viewBox="0 0 100 100" aria-hidden="true">
          {grupos.map((g, i) => (
            <circle key={g.t.id} cx="50" cy="50" r={RADIOS[Math.min(i, RADIOS.length - 1)]}
                    className={styles.traza} />
          ))}
        </svg>

        {nodos.map(({ f, r, ang }, i) => (
          <button
            key={f.id} type="button" className={styles.nodo}
            data-on={foco === f.id || undefined}
            style={{ '--r': String(r), '--a': `${ang}deg`, '--i': String(i) } as CSSProperties}
            data-id={f.id}
            onPointerEnter={() => setFoco(f.id)}
            onFocus={() => setFoco(f.id)}
            onClick={() => { if (arrastrado.current) return; onAbrir(f.id); }}
            aria-label={`${f.num} ${f.titulo}, ${f.lugar}`}
          >
            <span className={styles.nodoPunto} aria-hidden="true" />
            <span className={`${styles.nodoNum} mono`}>{f.num}</span>
          </button>
        ))}
      </div>

      {/* Leyenda: qué es un anillo y qué es un nodo. Sin ella los anillos son
          decoración con aspecto de dato. */}
      <div className={styles.leyenda}>
        <p className={`${styles.leyendaTitulo} mono`}>
          Cada anillo es un territorio · cada nodo, un proyecto
        </p>
        <ol className={`${styles.leyendaLista} mono`}>
          {grupos.map((g) => (
            <li key={g.t.id}>
              <span className={styles.leyendaAnillo} aria-hidden="true" />
              <span className={styles.leyendaNombre}>{g.t.nombre}</span>
              <span className={styles.leyendaCuenta}>{g.fichas.length}</span>
            </li>
          ))}
        </ol>
        <p className={`${styles.leyendaLectura} mono`} aria-live="polite">
          {vista ? `${vista.num} · ${vista.titulo} · ${vista.lugar}` : 'Señala un nodo para leerlo'}
        </p>
      </div>
    </div>
  );
}
