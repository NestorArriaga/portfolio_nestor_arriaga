'use client';

import dynamic from 'next/dynamic';
import { useEffect, useId, useRef, useState } from 'react';

import { useEscena } from './director';
import { Arroba } from './arroba';
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
  trazos: string; viewBox: string; bases: BaseRostro[]; quieto: boolean;
}) {
  const ref = useEscena('rostro', { z: [1.12, 1] }, quieto);
  const uid = useId().replace(/:/g, '');
  const [activa, setActiva] = useState(bases[0]?.role ?? '');
  const [previa, setPrevia] = useState<string | null>(null);
  const caja = useRef<HTMLDivElement>(null);
  const [, , vw, vh] = viewBox.split(/\s+/).map(Number);

  const elegir = (rol: string) => {
    if (rol === activa) return;
    setPrevia(activa);
    setActiva(rol);
    window.setTimeout(() => setPrevia(null), 700);
  };

  // Profundidad al puntero: entre 4 y 8 px, nada más.
  useEffect(() => {
    if (quieto) return;
    const n = caja.current;
    if (!n) return;
    const on = (e: PointerEvent) => {
      const r = n.getBoundingClientRect();
      n.style.setProperty('--px', `${((e.clientX - r.left) / r.width - 0.5) * 8}px`);
      n.style.setProperty('--py', `${((e.clientY - r.top) / r.height - 0.5) * 6}px`);
    };
    n.addEventListener('pointermove', on, { passive: true });
    return () => n.removeEventListener('pointermove', on);
  }, [quieto]);

  return (
    <section
      ref={ref as (n: HTMLElement | null) => void}
      className={styles.rostro} id="rostro" aria-labelledby={`${uid}-t`}
    >
      <div className={styles.rostroMarco} ref={caja}>
        <h2 id={`${uid}-t`} className={styles.oculto}>Rostro territorial</h2>

        <svg className={styles.rostroSvg} viewBox={viewBox} role="img"
             aria-label="Un rostro dibujado con trazos; dentro de la silueta se ve una base territorial real">
          <defs>
            <mask id={`${uid}-m`} maskUnits="userSpaceOnUse" x="0" y="0" width={vw} height={vh}>
              <g fill="#fff" dangerouslySetInnerHTML={{ __html: trazos }} />
            </mask>
            {/* Realce local: sin esto la base se hunde en el negro del fondo y
                el rostro se pierde. No aclara la imagen: le devuelve rango. */}
            <filter id={`${uid}-f`}>
              <feComponentTransfer>
                <feFuncR type="linear" slope="1.5" intercept="-0.06" />
                <feFuncG type="linear" slope="1.5" intercept="-0.06" />
                <feFuncB type="linear" slope="1.5" intercept="-0.06" />
              </feComponentTransfer>
            </filter>
          </defs>

          <g mask={`url(#${uid}-m)`} filter={`url(#${uid}-f)`}>
            <rect x="0" y="0" width={vw} height={vh} fill="#14150f" />
            {bases.map((b) => (
              <image key={b.role} className={styles.base}
                     data-on={b.role === activa || undefined}
                     data-previa={b.role === previa || undefined}
                     href={b.src}
                     x={b.frame[0] * vw} y={b.frame[1] * vh}
                     width={b.frame[2] * vw} height={b.frame[3] * vh}
                     preserveAspectRatio="xMidYMid slice" />
            ))}
          </g>

          <g className={styles.trazo} fill="currentColor" dangerouslySetInnerHTML={{ __html: trazos }} />

          {/* El cauce de P13 llega y se convierte en perfil. */}
          <path className={styles.cauce} fill="none" vectorEffect="non-scaling-stroke"
                d={`M${-vw * 0.34} ${vh * 0.47} C ${vw * 0.08} ${vh * 0.45}, ${vw * 0.3} ${vh * 0.32}, ${vw * 0.53} ${vh * 0.22}`} />
          {/* Y la red sale hacia GRANULAR. */}
          <path className={styles.red} fill="none" vectorEffect="non-scaling-stroke"
                d={`M${vw * 0.6} ${vh * 0.6} C ${vw * 0.86} ${vh * 0.7}, ${vw * 0.99} ${vh * 0.85}, ${vw * 1.34} ${vh * 0.91}`} />
        </svg>

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
  marcadores, correo, descarga, quieto, onVistazo, onInicio,
}: {
  marcadores: { territoryId: string; nombre: string; lat: number; lng: number }[];
  correo: string;
  /** Portafolio en PDF: ruta, peso real y número de páginas. */
  descarga: { href: string; mb: string; paginas: number } | null;
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
            <button type="button" className="btn" data-v="borde" onClick={onVistazo}>vistazo</button>
            <button type="button" className="btn" data-v="borde" onClick={onInicio}>inicio</button>
          </div>

          {/* El archivo se enlaza, no se precarga: el PDF pesa decenas de MB y
              no debe descargarse por abrir la portada. `download` da el nombre
              estable; sin soporte, el navegador simplemente lo abre. */}
          {descarga ? (
            <a className={`${styles.descarga} btn`} data-v="senal"
               href={descarga.href} download
               aria-label={`Descargar portafolio en PDF · ${descarga.paginas} páginas · ${descarga.mb} MB`}>
              Descargar portafolio
              <span className={styles.descargaMeta}>
                {`PDF · ${descarga.paginas} páginas · ${descarga.mb} MB`}
              </span>
            </a>
          ) : null}

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
