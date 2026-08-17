'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import { ATLAS_ORBIT_QUERY, abrirProyectoHref } from '@/lib/rutas';

import { useMovimientoReducido } from './director';
import { MomentoProyecto } from './momento';
import { Comparacion } from './canonicas';
import { AtlasFormas } from './atlasFormas';
import { CapituloParque } from './parque';
import { CapituloSistemas } from './sistemas';
import { CapituloGranular, Submomento } from './granular';
import { PortadaV5, PerfilV5, Marcador } from './umbral';
import { Hud, Ficha } from './atlas';
import { VistazoOrbital } from './orbita';
import { Rostro, Contacto, BaseRostro } from './umbralCierre';
import { Suave } from './suave';
import type { Momento, EstadoParque } from './registry';
import type { Sistema } from '@/components/sistemas/registro';
import type { Pieza } from './relevo';
import './v5.css';

/**
 * ATLAS VIVO — la experiencia del portafolio.
 *
 * Un solo escenario atraviesa el recorrido. El orquestador no guarda progreso:
 * eso vive en el director, que escribe variables CSS sobre cada escena sin
 * pasar por React. Aquí sólo se decide qué ocupa cada capa del escenario en
 * cada momento del atlas.
 */

export function Atlas({
  momentos, granular, parque, sistemas, marcadores, recortes, fichas, actos, rostro, descarga,
}: {
  momentos: Momento[];
  granular: Submomento[];
  parque: EstadoParque[];
  sistemas: Sistema[];
  marcadores: Marcador[];
  recortes: { palabra: string; forma: 'contorno' | 'capas' | 'ventana' | 'reticula'; img: Momento['lamina'] }[];
  fichas: Ficha[];
  actos: Record<string, string>;
  rostro: { trazos: string; viewBox: string; bases: BaseRostro[] } | null;
  descarga: { href: string; mb: string; paginas: number } | null;
}) {
  /**
   * La secuencia real del atlas, en el orden en que se recorre. El relevo de
   * cada escena sale de aquí y no de la lista de proyectos: entre P13 y
   * GRANULAR está el rostro, y después de las seis escalas viene el parque.
   * Calcularlo en el orquestador es lo único que garantiza que la lámina que
   * anuncia una transición sea de verdad la siguiente.
   */
  const entrada = (m: Momento | undefined): Pieza | null =>
    m?.lamina ? { num: m.num, ...m.lamina } : null;

  const trasP13: Pieza | null = rostro?.bases[0]
    ? { num: 'ROSTRO', src: rostro.bases[0].src, srcSet: rostro.bases[0].srcSet }
    : (granular[0]?.img ? { num: '14.1', ...granular[0].img } : null);

  // GRANULAR entrega al parque, y el parque abre con su planta: el relevo
  // enseña ese dibujo, que es el material real del primer momento.
  const primeroParque = parque[0]?.dibujo ?? null;
  const trasGranular: Pieza | null = primeroParque
    ? { num: 'P15', viewBox: primeroParque.viewBox, capas: primeroParque.capas }
    : null;

  const [atlas, setAtlas] = useState(false);

  /**
   * Apertura del índice orbital por URL: `?vistazo=1`.
   *
   * Es lo único que se le añade al Vistazo. El componente es el mismo, no hay
   * copia ni variante: sólo se enciende su estado desde la dirección, que es
   * lo que permite que `Vistazo` funcione desde cualquier página interior.
   * Al cerrar se limpia el parámetro con `replaceState`, sin recargar y sin
   * ensuciar el historial con una entrada por apertura.
   */
  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    if (q.get(ATLAS_ORBIT_QUERY) === '1') setAtlas(true);
  }, []);

  /**
   * Aterrizar en una escena por su estado de lectura, no por su borde.
   *
   * Cada escena ocupa varias alturas de viewport y su progreso arranca en 0,
   * donde todavía no ha entrado nada: llegar por `#p10` o desde el Vistazo
   * dejaba una pantalla negra hasta que la persona empezaba a desplazarse.
   * Se entra a un tercio del tramo fijo, que es donde la composición ya está
   * formada y todavía queda recorrido por delante.
   */
  const aterrizar = useCallback((id: string) => {
    const n = document.getElementById(id);
    if (!n) return null;
    const fijo = Math.max(0, n.offsetHeight - window.innerHeight);
    /* Los proyectos aterrizan cuando título, obra e instrumentos ya forman
       una lectura. El rostro es una escena de dibujo: al abrirlo por enlace se
       entrega más avanzado para que se reconozca de inmediato, sin obligar a
       recorrer un vacío antes de entenderlo. */
    const punto = id === 'rostro' ? 0.72 : 0.34;
    const y = n.getBoundingClientRect().top + window.scrollY + fijo * punto;
    window.scrollTo({ top: y, behavior: 'auto' });
    return n;
  }, []);

  /**
   * Llegada directa por ancla, por ejemplo `/#contacto` o `/#p05`.
   *
   * El navegador salta al cargar, cuando el documento todavía mide una
   * fracción de su altura final: las láminas entran después y el destino se
   * desplaza miles de píxeles. Contar fotogramas «quietos» no basta —la altura
   * se estabiliza varias veces mientras siguen cargando imágenes—, así que se
   * reancla durante una ventana con plazo y se suelta en cuanto el usuario
   * toca el scroll, para no pelearse con él.
   */
  useEffect(() => {
    const id = window.location.hash.slice(1);
    if (!id) return;

    let vivo = true;
    /* En navegadores táctiles puede aparecer un `touchstart` sintético durante
       la restauración de la página. Si se escucha desde el primer instante,
       cancela la colocación antes de su primer fotograma y el enlace directo
       deja la escena exactamente en progreso cero. Se garantiza una ventana
       corta de estabilización; después, cualquier gesto real sí toma control. */
    let interrumpible = false;
    const soltar = () => { if (interrumpible) vivo = false; };
    window.addEventListener('wheel', soltar, { passive: true, once: true });
    window.addEventListener('touchstart', soltar, { passive: true, once: true });
    window.addEventListener('keydown', soltar, { once: true });

    const fin = Date.now() + 2500;
    const colocar = () => {
      if (!vivo) return;
      const n = aterrizar(id);
      if (Date.now() < fin) {
        temporizador = window.setTimeout(colocar, 120);
      } else {
        n?.focus({ preventScroll: true });
      }
    };
    let temporizador = window.setTimeout(colocar, 0);
    const habilitarInterrupcion = window.setTimeout(() => { interrumpible = true; }, 500);

    return () => {
      window.clearTimeout(temporizador);
      window.clearTimeout(habilitarInterrupcion);
      vivo = false;
      window.removeEventListener('wheel', soltar);
      window.removeEventListener('touchstart', soltar);
      window.removeEventListener('keydown', soltar);
    };
  }, [aterrizar]);
  const disparador = useRef<HTMLButtonElement | null>(null);
  /** El control que abrió el índice, sea cual sea. */
  const origen = useRef<HTMLElement | null>(null);
  const quieto = useMovimientoReducido();

  const ir = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: quieto ? 'auto' : 'smooth' });
  }, [quieto]);

  /**
   * Ir a una escena y dejar el foco en ella.
   *
   * Además de desplazarse, actualiza el hash y mueve el foco de teclado al
   * destino, así que la lectura por teclado continúa desde donde llegó la
   * vista en vez de volver al principio. `preventScroll` evita el segundo
   * salto que produce `focus()` sobre un elemento que ya está en camino.
   */
  const irYEnfocar = useCallback((id: string) => {
    const n = document.getElementById(id);
    if (!n) return;
    if (window.location.hash !== `#${id}`) {
      window.history.pushState(null, '', `#${id}`);
    }
    n.scrollIntoView({ behavior: quieto ? 'auto' : 'smooth' });
    const previo = n.getAttribute('tabindex');
    if (previo === null) n.setAttribute('tabindex', '-1');
    n.focus({ preventScroll: true });
  }, [quieto]);

  const limpiarQuery = useCallback(() => {
    const q = new URLSearchParams(window.location.search);
    if (!q.has(ATLAS_ORBIT_QUERY)) return;
    q.delete(ATLAS_ORBIT_QUERY);
    const s = q.toString();
    window.history.replaceState(null, '', `${window.location.pathname}${s ? `?${s}` : ''}${window.location.hash}`);
  }, []);

  /**
   * Abrir el índice recordando desde dónde.
   *
   * El foco se devolvía siempre al botón «Índice» del HUD, que es el único que
   * publicaba su referencia. Quien abría el índice desde la portada aterrizaba
   * al cerrarlo en un control distinto del que había pulsado, en otro punto de
   * la página. Ahora se guarda el elemento que tenía el foco.
   */
  const abrirAtlas = useCallback(() => {
    const n = document.activeElement;
    origen.current = n instanceof HTMLElement ? n : null;
    setAtlas(true);
  }, []);

  const cerrarAtlas = useCallback(() => {
    setAtlas(false);
    limpiarQuery();
    // Si el control de origen ya no está en el documento —se abrió desde una
    // página interior, o desde la URL— el HUD es el destino de reserva.
    const n = origen.current;
    if (n && n.isConnected) n.focus();
    else disparador.current?.focus();
  }, [limpiarQuery]);

  /**
   * Elegir un proyecto en el Vistazo.
   *
   * El salto no puede hacerse en el mismo fotograma que el cierre: mientras el
   * diálogo vive, `body` lleva `overflow: hidden` para bloquear el scroll de
   * fondo, y un `scrollIntoView` bajo esa condición no mueve nada. Con un
   * `requestAnimationFrame` el resultado era que el Vistazo cerraba y el
   * recorrido se quedaba donde estaba, sin ancla ni foco.
   *
   * Se guarda el destino y el trabajo lo hace un efecto que sólo corre cuando
   * `atlas` ya es `false`, es decir, cuando React ha desmontado el diálogo y su
   * limpieza ha devuelto el scroll.
   */
  const [destino, setDestino] = useState<string | null>(null);

  const elegir = useCallback((id: string) => {
    setDestino(id);
    setAtlas(false);
    limpiarQuery();
  }, [limpiarQuery]);

  useEffect(() => {
    if (atlas || !destino) return;
    const n = document.getElementById(destino);
    setDestino(null);
    if (!n) return;
    // `replaceState`: el Vistazo es un estado de la misma página, no un destino
    // que deba llenar el historial con una entrada por selección.
    window.history.replaceState(null, '', `/#${destino}`);
    // El foco va primero: Chrome cancela un desplazamiento suave en curso
    // cuando el foco cambia, aunque se pida `preventScroll`, y el recorrido se
    // quedaba en la portada con la URL ya en `#pXX`.
    if (!n.hasAttribute('tabindex')) n.setAttribute('tabindex', '-1');
    n.focus({ preventScroll: true });
    // Llegada directa, no suave. Elegir en el índice es un salto a través del
    // atlas —hasta 17 000 px—: animarlo tarda segundos, se interrumpe con
    // cualquier gesto y dejaba el recorrido en la portada con la URL ya en
    // `#pXX`.
    requestAnimationFrame(() => aterrizar(destino));
  }, [atlas, destino, aterrizar]);

  return (
    <div className="v5">
      {/* Suavizado inercial, sólo aquí. Las páginas interiores conservan el
          scroll nativo. */}
      <Suave />
      <main id="contenido" tabIndex={-1}>
        <PortadaV5
          marcadores={marcadores} quieto={quieto} descarga={descarga} tapada={atlas}
          onRecorrer={() => ir('perfil')}
          onVistazo={abrirAtlas}
          onContacto={() => irYEnfocar('contacto')}
        />

        <PerfilV5
          recortes={recortes.filter((r): r is typeof r & { img: NonNullable<typeof r.img> } => !!r.img)}
          quieto={quieto}
        />

        {momentos.map((m) => {
          // Las escenas canónicas tienen su propio gesto; el resto comparte el
          // tratamiento base del escenario mientras se construyen los suyos.
          if (m.gesto === 'comparacion') {
            return (
              <Comparacion
                key={m.id} id={m.id} num={m.num} titulo={m.titulo} lugar={m.lugar}
                href={m.href} lamina={m.lamina} clave={m.clave} puntos={m.puntos}
                quieto={quieto} alto={m.alto} superficie={m.superficie}
                siguiente={entrada(momentos[momentos.indexOf(m) + 1])}
              />
            );
          }
          if (m.gesto === 'atlas') {
            return (
              <AtlasFormas
                key={m.id} id={m.id} num={m.num} titulo={m.titulo} lugar={m.lugar}
                href={m.href} lamina={m.lamina} guarda={m.guarda} patrones={m.datos}
                quieto={quieto} alto={m.alto}
                siguiente={entrada(momentos[momentos.indexOf(m) + 1])}
              />
            );
          }
          // El último proyecto no entrega a otro proyecto: entrega al rostro.
          const i = momentos.indexOf(m);
          const sig = i + 1 < momentos.length ? entrada(momentos[i + 1]) : trasP13;
          // La coordenada sólo se pasa donde está verificada: cuatro de los
          // seis territorios la tienen derivada de la proyección inversa.
          const c = marcadores.find((x) => x.nombre === m.lugar || m.lugar.includes(x.nombre));
          return (
            <MomentoProyecto key={m.id} d={m} quieto={quieto} siguiente={sig}
                             coordenada={c ? { lat: c.lat, lng: c.lng, nombre: c.nombre } : null}
                             umbral={m.id === 'p08' ? 'RELACIONAR' : null} />
          );
        })}

        {/* El umbral: el cauce de P13 entra aquí y dibuja el perfil. */}
        {rostro ? (
          <Rostro trazos={rostro.trazos} viewBox={rostro.viewBox}
                  bases={rostro.bases} quieto={quieto} />
        ) : null}

        <CapituloGranular submomentos={granular} href={abrirProyectoHref('14', 'granular')} quieto={quieto}
                          siguiente={trasGranular} />

        <CapituloParque estados={parque} href={abrirProyectoHref('15', 'urban-challenge')} quieto={quieto} />

        {/* Familia paralela: capacidad digital, después de los quince
            proyectos territoriales y antes del contacto. */}
        <CapituloSistemas casos={sistemas} quieto={quieto} />

        <Contacto
          marcadores={marcadores}
          correo="nestorarriaga.irnr@gmail.com"
          descarga={descarga}
          quieto={quieto}
          onVistazo={abrirAtlas}
          onInicio={() => ir('portada')}
        />
      </main>

      <Hud
        fichas={fichas} actos={actos}
        onVistazo={abrirAtlas}
        onInicio={() => ir('portada')}
        vistazoRef={(el) => { disparador.current = el; }}
      />

      <VistazoOrbital
        abierto={atlas} fichas={fichas}
        marcadores={marcadores.map((m) => ({ lat: m.lat, lng: m.lng }))}
        onCerrar={cerrarAtlas} onElegir={elegir}
      />
    </div>
  );
}

/**
 * Alias del nombre anterior.
 *
 * El componente se llamaba `ExperienciaV5` cuando la experiencia vivía en una
 * ruta de laboratorio. El nombre público es `Atlas`; este alias existe sólo
 * para no romper importaciones mientras se retira la ruta antigua.
 */
export const ExperienciaV5 = Atlas;
