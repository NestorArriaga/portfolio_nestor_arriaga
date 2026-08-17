'use client';

import dynamic from 'next/dynamic';
import { CSSProperties, useEffect, useRef, useState } from 'react';

import { useEscena } from './director';
import { Ayuda, useAyuda, useCerrarAlDesplazar, useGesto, usePunteroFino } from './ayudas';
import { anchoServido } from './obra';
import type { Lamina } from './registry';
import styles from './umbral.module.css';

/**
 * El umbral del atlas: portada y perfil.
 *
 * Las dos comparten una estructura de coordenadas — la misma retícula
 * cartográfica casi invisible atraviesa el nombre y el mundo—, y el paso de una
 * a otra no es un fundido: un marcador del globo se convierte en la ventana por
 * la que entra el perfil.
 */

const Globe = dynamic(() => import('@/components/originkit/ui/globe'), {
  ssr: false,
  loading: () => <div className={styles.globoHueco} aria-hidden="true" />,
});

export type Marcador = { territoryId: string; nombre: string; lat: number; lng: number };

/**
 * Globo de contexto sin WebGL.
 *
 * Una proyección ortográfica dibujada con seis elipses y un punto por
 * territorio. Sostiene la lectura —dónde está cada proyecto— sin montar una
 * escena 3D, que para una pieza de contexto es un coste que no se devuelve.
 */
export function GloboEstatico({ marcadores, listo }: { marcadores: Marcador[]; listo: boolean }) {
  const paralelos = [-60, -30, 0, 30, 60];
  const meridianos = [0, 30, 60, 90, 120, 150];

  return (
    <svg className={styles.globoBase} data-listo={listo || undefined}
         viewBox="-100 -100 200 200" aria-hidden="true">
      <circle r="92" className={styles.globoDisco} />
      {paralelos.map((lat) => {
        const y = -92 * Math.sin((lat * Math.PI) / 180);
        const rx = 92 * Math.cos((lat * Math.PI) / 180);
        return <ellipse key={lat} cx="0" cy={y} rx={rx} ry={rx * 0.18} className={styles.globoMalla} />;
      })}
      {meridianos.map((lng) => (
        <ellipse key={lng} cx="0" cy="0" rx={92 * Math.abs(Math.cos((lng * Math.PI) / 180))} ry="92"
                 className={styles.globoMalla} />
      ))}
      {marcadores.map((m) => {
        // Proyección ortográfica centrada en 23 °N, 102 °O: el mismo encuadre
        // que abre el globo interactivo.
        const la = (m.lat * Math.PI) / 180;
        const lo = ((m.lng + 102) * Math.PI) / 180;
        const la0 = (23 * Math.PI) / 180;
        const x = 92 * Math.cos(la) * Math.sin(lo);
        const y = -92 * (Math.cos(la0) * Math.sin(la) - Math.sin(la0) * Math.cos(la) * Math.cos(lo));
        const visible = Math.sin(la0) * Math.sin(la) + Math.cos(la0) * Math.cos(la) * Math.cos(lo) > 0;
        return visible ? <circle key={m.territoryId} cx={x} cy={y} r="2.6" className={styles.globoMarca} /> : null;
      })}
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/* Portada                                                                     */
/* -------------------------------------------------------------------------- */

/**
 * El nombre se alinea con el horizonte del globo y comparte su retícula, en
 * lugar de ocupar un bloque izquierdo convencional. El globo entra recortado
 * por la derecha a propósito: es un mundo que sigue más allá del encuadre, no
 * una esfera centrada en una caja.
 *
 * Los cuatro territorios no son una lista apilada permanente. Son marcas sobre
 * la retícula que se anuncian de una en una, y sólo la señalada muestra su
 * ubicación.
 */
export function PortadaV5({
  marcadores, quieto, descarga, tapada = false, onRecorrer, onVistazo, onContacto,
}: {
  marcadores: Marcador[];
  quieto: boolean;
  /** El Vistazo está abierto encima: aquí no hay nada que orientar. */
  tapada?: boolean;
  /** Peso y páginas se miden sobre el archivo generado, no se escriben. */
  descarga: { href: string; mb: string; paginas: number } | null;
  onRecorrer: () => void;
  onVistazo: () => void;
  onContacto: () => void;
}) {
  const ref = useEscena('portada', { z: [1, 1.3] }, quieto);
  const caja = useRef<HTMLDivElement>(null);
  const [dentro, setDentro] = useState(false);
  const [activo, setActivo] = useState<string | null>(null);

  useEffect(() => {
    const n = caja.current;
    if (!n) return;
    const io = new IntersectionObserver(([e]) => setDentro(e.isIntersecting), { rootMargin: '40% 0px' });
    io.observe(n);
    return () => io.disconnect();
  }, []);

  // Gesto de puntero muy contenido: mueve la luz del globo unos pocos píxeles,
  // no persigue al cursor.
  const gesto = (e: React.PointerEvent<HTMLElement>) => {
    const n = e.currentTarget;
    n.style.setProperty('--gx', `${((e.clientX / window.innerWidth) - 0.5) * 8}px`);
    n.style.setProperty('--gy', `${((e.clientY / window.innerHeight) - 0.5) * 6}px`);
  };

  const visto = marcadores.find((m) => m.territoryId === activo) ?? null;

  /* --- Ayudas de primer uso --------------------------------------------- */
  const fino = usePunteroFino();
  // `gesto` ya nombra el movimiento de luz del globo en este componente.
  const modoGesto = useGesto();
  // La primera orienta el gesto principal; el texto cambia con el dispositivo
  // porque el gesto cambia.
  const recorrer = useAyuda('portada-recorrer', dentro && !tapada, 1000);
  const vistazo = useAyuda('portada-vistazo', dentro && !tapada, 1200);
  // Sólo donde el gesto principal es desplazar y el puntero es fino: en táctil
  // no hay arrastre que anunciar antes de tocar, y la ayuda taparía el globo.
  const [sobreGlobo, setSobreGlobo] = useState(false);
  const globo = useAyuda('portada-globo', fino && modoGesto === 'desplazar' && sobreGlobo && !tapada, 700);

  // Sólo el desplazamiento cierra la ayuda de recorrido: es la acción que
  // describe. Un toque o una tecla cualquiera no la consumen.
  useCerrarAlDesplazar(recorrer.visible, recorrer.cerrar);

  return (
    <section
      ref={ref as (n: HTMLElement | null) => void}
      className={styles.portada}
      id="portada"
      aria-label="Portada"
      onPointerMove={quieto ? undefined : gesto}
    >
      <div className={styles.portadaMarco}>
        {/* Retícula casi invisible: la estructura que comparten nombre y mundo. */}
        <svg className={styles.reticula} viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          {[18, 34, 50, 66, 82].map((x) => <line key={`v${x}`} x1={x} y1="0" x2={x} y2="100" />)}
          {[26, 50, 74].map((y) => <line key={`h${y}`} x1="0" y1={y} x2="100" y2={y} />)}
        </svg>

        <div ref={caja} className={styles.globo}
             onPointerEnter={() => setSobreGlobo(true)}
             onPointerLeave={() => setSobreGlobo(false)}>
          {/* Un solo globo WebGL a la vez: con el índice abierto, el de la
              portada se desmonta y deja su sitio al dibujo de contexto. */}
          {dentro && !tapada ? (
            <Globe
              markerConfig={{
                markers: marcadores.map((m) => ({ lat: m.lat, lng: m.lng })),
                color: '#e9ff3a', size: 32,
              }}
              fill="dots"
              dots={{ color: '#f6f7f2', size: 4, density: 9, allDots: false }}
              fillColor="#f6f7f2"
              oceanColor="#080908"
              outlineColor="#f6f7f2"
              outlineWidth={1}
              showOutline
              graticuleColor="#26261f"
              showGrid
              // El signo va invertido: el componente asigna la rotación en
              // radianes, y girar +X trae al frente el meridiano −X.
              initialLatitude={23}
              initialLongitude={102}
              scale={8}
              speed={quieto ? 0 : 0.3}
              direction="left"
              stopOnHover
              dragSpeed={4}
              detail={5}
              smoothing={9}
              style={{ width: '100%', height: '100%' }}
            />
          ) : null}
          {/* Respaldo dibujado, no un hueco. Ocupa la misma geometría que el
              globo definitivo desde el primer render, así que no hay salto de
              layout ni media pantalla vacía mientras carga; y si WebGL falla,
              esto es lo que se queda. */}
          <GloboEstatico marcadores={marcadores} listo={dentro} />
        </div>

        {globo.visible ? (
          <p className={styles.ayudaGlobo}>
            <Ayuda id={globo.id} texto="Arrastra para explorar" />
          </p>
        ) : null}

        {/* El nombre se apoya en la línea del horizonte del globo. */}
        <h1 className={styles.nombre}>
          <span>Nestor Elihu</span>
          <span>Arriaga Gallegos</span>
        </h1>

        <p className={`${styles.disciplina} mono`}>
          Ingeniería en Recursos Naturales Renovables
          <span className={styles.anio}>Portafolio 2026</span>
        </p>

        {/* Los territorios: marcas sobre la retícula, no una lista apilada. */}
        <div className={styles.territorios} role="group" aria-label="Territorios del atlas">
          {marcadores.map((m, i) => (
            <button
              key={m.territoryId} type="button" data-touch
              className={`${styles.territorio} mono`}
              style={{ '--i': String(i) } as CSSProperties}
              aria-pressed={activo === m.territoryId}
              onPointerEnter={() => setActivo(m.territoryId)}
              onPointerLeave={() => setActivo(null)}
              onFocus={() => setActivo(m.territoryId)}
              onBlur={() => setActivo(null)}
              onClick={() => setActivo(activo === m.territoryId ? null : m.territoryId)}
            >
              <i aria-hidden="true" />{m.nombre}
            </button>
          ))}
          <p className={`${styles.ubicacion} mono`} aria-live="polite">
            {visto ? `${visto.lat.toFixed(2)}°  ${visto.lng.toFixed(2)}°` : ''}
          </p>
        </div>

        {/* Cuatro acciones, un solo sistema: contacto es la de señal y las
            otras tres, estructura. El PDF no compite con contacto: lleva borde
            y un identificador pequeño. */}
        <div className={styles.acciones}>
          <button type="button" className="btn" data-v="borde"
                  aria-describedby={recorrer.visible ? recorrer.id : undefined}
                  onClick={() => { recorrer.cerrar(); onRecorrer(); }}>Recorrer</button>

          <button type="button" className="btn" data-v="borde"
                  aria-describedby={vistazo.visible ? vistazo.id : undefined}
                  onClick={() => { vistazo.cerrar(); onVistazo(); }}>Índice de proyectos</button>

          {descarga ? (
            <a className="btn" data-v="borde" href={descarga.href} download
               aria-label={`Descargar portafolio en PDF · ${descarga.paginas} páginas · ${descarga.mb} MB`}>
              Descargar
              <span className={styles.formato}>{`PDF · ${descarga.paginas} · ${descarga.mb} MB`}</span>
            </a>
          ) : null}

          <a className="btn" data-v="senal" href="#contacto"
             onClick={(e) => { e.preventDefault(); onContacto(); }}>Contacto</a>

          {/* Ranura propia para la ayuda: ocupa su sitio en la fila en vez de
              posarse encima de los territorios o de una acción. Sólo una es
              visible a la vez, así que una ranura basta. */}
          <span className={styles.ranuraAyuda}>
            {recorrer.visible ? (
              <Ayuda id={recorrer.id}
                     texto={modoGesto === 'desplazar' ? 'Desplázate para recorrer' : 'Desliza para recorrer'} />
            ) : vistazo.visible ? (
              <Ayuda id={vistazo.id} texto="Abre el índice de todos los proyectos" />
            ) : null}
          </span>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Perfil                                                                      */
/* -------------------------------------------------------------------------- */

/**
 * Una frase y una identificación. Nada más.
 *
 * Las cuatro palabras abren recortes reales, y cada máscara está relacionada
 * con lo que la palabra significa: el territorio entra como contorno, los mapas
 * como registro de capas horizontal, el paisaje como ventana ancha y el diseño
 * como una retícula que se abre. Al pasar de una a otra la máscara interpola;
 * no se apaga una imagen antes de abrir la siguiente.
 */
export function PerfilV5({
  recortes, quieto,
}: {
  recortes: { palabra: string; forma: 'contorno' | 'capas' | 'ventana' | 'reticula'; img: Lamina }[];
  quieto: boolean;
}) {
  const ref = useEscena('perfil', { z: [1.05, 1] }, quieto);
  const [activa, setActiva] = useState<string | null>(null);

  // Sin frase. Cuatro palabras y una identificación: la personalidad viene de
  // la selección y la secuencia, no de describirse.
  const palabras = ['territorio', 'cartografía', 'paisaje', 'sistemas'];

  return (
    <section
      ref={ref as (n: HTMLElement | null) => void}
      className={styles.perfil}
      id="perfil"
      aria-label="Perfil"
    >
      <div className={styles.perfilMarco}>
        <div className={styles.recortes} aria-hidden="true">
          {recortes.map((r) => (
            <div key={r.palabra} className={styles.recorte}
                 style={{ '--nativo': String(anchoServido(r.img)) } as CSSProperties}
                 data-forma={r.forma} data-on={activa === r.palabra || undefined}>
              {/* El recorte ocupa el ancho completo del umbral, no cuatro quintos:
                  con `80vw` el navegador traía la variante de 1152 px para una
                  caja de 1440 y las palabras se abrían sobre una imagen blanda. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={r.img.src} srcSet={r.img.srcSet} sizes="100vw"
                   width={r.img.width} height={r.img.height} alt=""
                   loading="lazy" decoding="async" />
            </div>
          ))}
        </div>

        <p className={styles.identidad}>
          <span className={styles.identidadNombre}>Nestor Elihu Arriaga Gallegos</span>
          <span className={`${styles.identidadGrado} mono`}>Ingeniero en Recursos Naturales Renovables</span>
        </p>

        {/* Cuatro puertas visuales. Cada una abre una muestra real de un
            proyecto, con la máscara que le corresponde por su significado. */}
        <p className={styles.frase}>
          {palabras.map((w, i) => (
            <span key={w}>
              <button
                type="button" className={styles.palabra}
                data-on={activa === w || undefined}
                onPointerEnter={() => setActiva(w)}
                onPointerLeave={() => setActiva(null)}
                onFocus={() => setActiva(w)}
                onBlur={() => setActiva(null)}
                onClick={() => setActiva(activa === w ? null : w)}
                aria-pressed={activa === w}
              >{w}</button>
              {i < palabras.length - 1 ? <span className={styles.punto}> · </span> : null}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
