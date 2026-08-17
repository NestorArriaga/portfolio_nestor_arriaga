'use client';

import dynamic from 'next/dynamic';
import { CSSProperties, useEffect, useId, useRef, useState } from 'react';

import { useEscena } from './director';
import { Arroba } from './arroba';
import { Descargas, type Catalogo } from '@/components/global/Descargas';

import styles from './umbralCierre.module.css';

/**
 * Umbral y cierre: el rostro territorial y el contacto.
 *
 * Las dos escenas cierran el sistema que abre la portada. El cauce de P13 entra
 * al rostro y lo dibuja; del rostro sale una red que abre GRANULAR; y al final
 * la órbita vuelve a ser una `@` completa junto al correo.
 */

const Globe = dynamic(() => import('@/components/originkit/ui/globe'), {
  ssr: false,
  loading: () => <div className={styles.globoHueco} aria-hidden="true" />,
});

export type BaseRostro = {
  role: string; label: string;
  frame: [number, number, number, number];
  src: string; srcSet: string;
};

/* -------------------------------------------------------------------------- */
/* Rostro territorial                                                          */
/* -------------------------------------------------------------------------- */

/**
 * El rostro ocupa la pantalla y **no es negro sobre negro**: la máscara lleva
 * un realce de contraste local, así que el territorio dentro de la silueta se
 * lee sin convertirse en una fotografía brillante.
 *
 * Las cuatro lecturas no son pestañas rectangulares: son marcas laterales
 * inscritas en la geometría, y al cambiar se conserva un resto de la anterior
 * durante la interpolación para percibir que son capas de una misma pieza.
 * Ese resto es un fundido, no una superposición: las bases no comparten
 * territorio y apilarlas afirmaría un relieve que no existe.
 */
export function Rostro({
  trazos, viewBox, bases, quieto,
}: {
  /** Ruta del SVG de trazos. Se usa como máscara, no se inserta en el DOM. */
  trazos: string; viewBox: string; bases: BaseRostro[]; quieto: boolean;
}) {
  const ref = useEscena('rostro', { z: [1.12, 1] }, quieto);
  const uid = useId().replace(/:/g, '');
  /* Relieve es la primera lectura: describe el perfil incluso antes de que la
     persona pruebe los controles. La vista satelital se conserva como capa,
     pero sobre el fondo oscuro no debe ser la única pista de que hay un rostro. */
  const [activa, setActiva] = useState(
    bases.find((b) => b.role === 'relieve')?.role ?? bases[0]?.role ?? '',
  );
  const [previa, setPrevia] = useState<string | null>(null);
  const caja = useRef<HTMLDivElement>(null);
  const [, , vw, vh] = viewBox.split(/\s+/).map(Number);

  /* La escena se monta cuando se acerca, no al cargar la página.
   *
   * Antes se montaba siempre: en un teléfono de 360 px eso significaba
   * descargar las cuatro bases de 2000 px —casi 14 MB— antes de que nadie
   * hubiera llegado al rostro. */
  const [cerca, setCerca] = useState(false);
  useEffect(() => {
    const n = caja.current;
    if (!n || cerca) return undefined;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setCerca(true); io.disconnect(); }
    }, { rootMargin: '120% 0px' });
    io.observe(n);
    return () => io.disconnect();
  }, [cerca]);

  /* Cambio de lectura con un resto de la anterior durante el fundido.
   *
   * El temporizador se guarda para poder cancelarlo: si el visitante cambia de
   * capa dos veces seguidas, o abandona la escena, el anterior seguía vivo y
   * escribía estado sobre un componente ya desmontado. */
  const relevo = useRef<number | null>(null);
  const elegir = (rol: string) => {
    if (rol === activa) return;
    setPrevia(activa);
    setActiva(rol);
    if (relevo.current) window.clearTimeout(relevo.current);
    relevo.current = window.setTimeout(() => { setPrevia(null); relevo.current = null; }, 700);
  };
  useEffect(() => () => { if (relevo.current) window.clearTimeout(relevo.current); }, []);

  /* Profundidad al puntero: entre 4 y 8 px, y sólo donde hay puntero fino.
   *
   * En táctil no aporta nada —no hay hover— y en cambio obliga a recalcular
   * estilo en cada `pointermove`, que es justo mientras se arrastra la página. */
  useEffect(() => {
    if (quieto || !cerca) return undefined;
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return undefined;
    const n = caja.current;
    if (!n) return undefined;
    const on = (e: PointerEvent) => {
      const r = n.getBoundingClientRect();
      n.style.setProperty('--px', `${((e.clientX - r.left) / r.width - 0.5) * 8}px`);
      n.style.setProperty('--py', `${((e.clientY - r.top) / r.height - 0.5) * 6}px`);
    };
    n.addEventListener('pointermove', on, { passive: true });
    return () => n.removeEventListener('pointermove', on);
  }, [quieto, cerca]);

  // Sólo se montan la lectura activa y, mientras dura el fundido, la anterior.
  const visibles = bases.filter((b) => b.role === activa || b.role === previa);

  return (
    <section
      ref={ref as (n: HTMLElement | null) => void}
      className={styles.rostro} id="rostro" aria-labelledby={`${uid}-t`}
    >
      <div className={styles.rostroMarco} ref={caja}
           style={{ '--trazos': `url(${trazos})`, '--ratio': String(vw / vh) } as CSSProperties}>
        <h2 id={`${uid}-t`} className={styles.oculto}>Rostro territorial</h2>

        <div className={styles.rostroPieza}>
          {/* El lienzo conserva la proporción del dibujo y se centra en la
              caja, igual que hacía el `viewBox` del SVG: la máscara y los
              encuadres de las bases se miden contra él, no contra la pantalla. */}
          <div className={styles.lienzo}
               role="img"
               aria-label="Un rostro dibujado con trazos; dentro de la silueta se ve una base territorial real">
            {/* La silueta recorta el territorio. La máscara es el propio
                dibujo, servido como archivo externo: son 715 trazos que el
                navegador decodifica una vez y no entran al DOM. */}
            <div className={styles.ventana}>
              {cerca ? visibles.map((b) => (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  key={b.role}
                  className={styles.base}
                  data-on={b.role === activa || undefined}
                  src={b.src}
                  srcSet={b.srcSet}
                  /* La caja del rostro nunca pasa de la altura del viewport,
                     así que en un teléfono basta la variante de 500 o 1000 px. */
                  sizes="(max-width: 720px) 100vw, 62vw"
                  alt=""
                  loading="lazy"
                  decoding="async"
                  style={{
                    left: `${b.frame[0] * 100}%`,
                    top: `${b.frame[1] * 100}%`,
                    width: `${b.frame[2] * 100}%`,
                    height: `${b.frame[3] * 100}%`,
                  } as CSSProperties}
                />
              )) : null}
            </div>

            {/* El trazo por encima del territorio: el mismo archivo, ahora
                como máscara de un plano de tinta, para llevar el color del
                sistema sin insertar el dibujo por segunda vez. */}
            <div className={styles.trazo} aria-hidden="true" />

            {/* Los dos hilos que entran y salen de la escena. Dos, no más. */}
            <svg className={styles.hilos} viewBox={viewBox} aria-hidden="true">
              <path className={styles.cauce} fill="none" vectorEffect="non-scaling-stroke"
                    d={`M${-vw * 0.34} ${vh * 0.47} C ${vw * 0.08} ${vh * 0.45}, ${vw * 0.3} ${vh * 0.32}, ${vw * 0.53} ${vh * 0.22}`} />
              <path className={styles.red} fill="none" vectorEffect="non-scaling-stroke"
                    d={`M${vw * 0.6} ${vh * 0.6} C ${vw * 0.86} ${vh * 0.7}, ${vw * 0.99} ${vh * 0.85}, ${vw * 1.34} ${vh * 0.91}`} />
            </svg>
          </div>
        </div>

        {/* Marcas laterales, no pestañas: cada lectura es una línea con su
            nombre, inscrita en el borde del dibujo. */}
        <div className={styles.lecturas} role="group" aria-label="Lectura del territorio">
          {bases.map((b) => (
            <button key={b.role} type="button" data-touch
                    className={`${styles.lectura} mono`}
                    aria-pressed={b.role === activa}
                    onClick={() => elegir(b.role)}>
              <i aria-hidden="true" />{b.label}
            </button>
          ))}
        </div>

        <p className={`${styles.palabras} mono`}>TERRITORIO · CUERPO · SISTEMA</p>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Contacto                                                                    */
/* -------------------------------------------------------------------------- */

/**
 * El cierre completa el sistema: la órbita vuelve a ser una `@` legible y
 * conduce al correo. El globo reaparece cerca y sereno, con los territorios
 * recorridos encendidos.
 */
export function Contacto({
  marcadores, correo, descargas, quieto, onVistazo, onInicio,
}: {
  marcadores: { territoryId: string; nombre: string; lat: number; lng: number }[];
  correo: string;
  /** Los tres documentos publicados, medidos sobre el disco. */
  descargas: Catalogo;
  quieto: boolean;
  onVistazo: () => void;
  onInicio: () => void;
}) {
  const ref = useEscena('contacto', { z: [1.08, 1] }, quieto);
  const caja = useRef<HTMLDivElement>(null);
  const [dentro, setDentro] = useState(false);
  const [copiado, setCopiado] = useState(false);

  useEffect(() => {
    const n = caja.current;
    if (!n) return;
    const io = new IntersectionObserver(([e]) => setDentro(e.isIntersecting), { rootMargin: '40% 0px' });
    io.observe(n);
    return () => io.disconnect();
  }, []);

  const copiar = async () => {
    try {
      await navigator.clipboard.writeText(correo);
      setCopiado(true);
      window.setTimeout(() => setCopiado(false), 2400);
    } catch {
      // Sin permiso de portapapeles el correo sigue a la vista y el `mailto`
      // funciona: no se anuncia un éxito que no ocurrió.
      setCopiado(false);
    }
  };

  return (
    <section
      ref={ref as (n: HTMLElement | null) => void}
      className={styles.contacto} id="contacto" tabIndex={-1} aria-labelledby="contacto-t"
    >
      <div className={styles.contactoMarco}>
        <div ref={caja} className={styles.globoCierre}>
          {dentro ? (
            <Globe
              markerConfig={{
                markers: marcadores.map((m) => ({ lat: m.lat, lng: m.lng })),
                color: '#e9ff3a', size: 30,
              }}
              fill="dots"
              dots={{ color: '#f6f7f2', size: 4, density: 9, allDots: false }}
              fillColor="#f6f7f2" oceanColor="#080908"
              outlineColor="#f6f7f2" outlineWidth={1} showOutline
              graticuleColor="#26261f" showGrid
              initialLatitude={23} initialLongitude={102}
              scale={11} speed={quieto ? 0 : 0.12} direction="left"
              stopOnHover dragSpeed={3} detail={5} smoothing={9}
              style={{ width: '100%', height: '100%' }}
            />
          ) : <div className={styles.globoHueco} aria-hidden="true" />}
        </div>

        <div className={styles.bloque}>
          <Arroba modo="contacto" className={styles.arrobaCierre} />

          <h2 id="contacto-t" className={`${styles.nombre} titulo`}>Nestor Elihu Arriaga Gallegos</h2>
          <p className={`${styles.grado} mono`}>Ingeniero en Recursos Naturales Renovables</p>
          <p className={`${styles.vocabulario} mono`}>territorio · cartografía · paisaje · sistemas</p>

          {/* El correo es la acción de señal; copiar, vistazo e inicio son
              estructura. Todos del mismo sistema, misma altura y mismos
              estados. */}
          <div className={styles.acciones}>
            <a className={`${styles.correo} btn`} data-v="senal" href={`mailto:${correo}`}>{correo}</a>
            <button type="button" className="btn" data-v="borde" onClick={copiar}
                    data-copiado={copiado || undefined}>
              {copiado ? 'copiado' : 'copiar'}
            </button>
            <button type="button" className="btn" data-v="borde" onClick={onVistazo}>Índice de proyectos</button>
            <button type="button" className="btn" data-v="borde" onClick={onInicio}>inicio</button>
          </div>

          {/* El mismo centro de descargas que la portada: una sola pieza, una
              sola lógica. Ningún archivo se precarga. */}
          <Descargas catalogo={descargas} variante="senal"
                     className={styles.descarga} />

          <p className={`${styles.aviso} mono`} role="status" aria-live="polite">
            {copiado ? 'Correo copiado al portapapeles' : ''}
          </p>

          {/* Autoría del portafolio, separada de la de cada proyecto: dirigir y
              construir este atlas no es firmar el trabajo de sus coautores. */}
          <p className={`${styles.autoria} mono`}>
            Dirección, diseño editorial, cartografía y desarrollo del portafolio:
            {' '}Nestor Elihu Arriaga Gallegos.
            <span>Créditos y colaboraciones específicas se indican en cada proyecto.</span>
          </p>
        </div>
      </div>
    </section>
  );
}
