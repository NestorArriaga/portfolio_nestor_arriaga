'use client';

import { Fragment, useCallback, useEffect, useRef, useState } from 'react';

import type { PlateImage } from '@/lib/plates';
import { usePrefersReducedMotion } from '@/lib/motion';
import { CoverAct } from './CoverAct';
import { PersonalAct } from './PersonalAct';
import { ProjectMoment, MomentData } from './ProjectMoment';
import { ContactAct } from './ContactAct';
import { RostroAct, RostroBase } from './RostroAct';
import { Seam, SeamData } from './Seam';
import { UnitField } from './UnitField';
import { Vistazo, VistazoItem } from './Vistazo';
import { TopBar } from './TopBar';
import styles from './Recorrido.module.css';

/**
 * El recorrido completo.
 *
 * Un solo componente cliente coordina las tres cosas que tienen que estar de
 * acuerdo en todo momento: el progreso de la portada (`t`), el proyecto activo
 * según el scroll, y el estado de Vistazo. Repartirlo en tres componentes
 * obligaría a sincronizarlos por contexto para un estado que cambia en cada
 * fotograma.
 *
 * Medición: **un solo** `IntersectionObserver` para los quince momentos y una
 * sola lectura de rect por fotograma para el progreso de portada y cierre. No
 * hay un observador por elemento ni un `getBoundingClientRect` por sección.
 *
 * Vistazo no altera el scroll: se limita a bloquearlo mientras está abierto.
 * Por eso "volver al punto exacto del recorrido" no necesita guardar ni
 * restaurar nada — nunca se perdió.
 */

export type RecorridoProps = {
  identity: {
    name: string;
    nameLines: readonly string[];
    role: string;
    roleShort: string;
    institution: string;
    year: string;
  };
  summary: string[];
  contact: { email: string; mailtoSubject: string };
  signature: PlateImage | null;
  texture: PlateImage | null;
  moments: MomentData[];
  /** Lo que cada proyecto entrega al siguiente, por número de proyecto. */
  seams: Record<string, SeamData>;
  vistazo: VistazoItem[];
  /** Interludio entre P13 y P14. Ausente si faltan sus activos. */
  rostro: { trazos: string; viewBox: string; bases: RostroBase[] } | null;
  territories: { id: string; short: string }[];
  families: { id: string; label: string }[];
};

export function Recorrido({
  identity,
  summary,
  contact,
  signature,
  texture,
  moments,
  seams,
  vistazo,
  rostro,
  territories,
  families,
}: RecorridoProps) {
  const coverRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const vistazoTrigger = useRef<HTMLButtonElement | null>(null);

  const reduced = usePrefersReducedMotion();
  const [t, setT] = useState(0);
  const [c, setC] = useState(0);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [hoverId, setHoverId] = useState<string | null>(null);
  const [box, setBox] = useState({ vw: 0, vh: 0, mobile: false });
  const [open, setOpen] = useState(false);

  /* --- Tamaño del viewport --------------------------------------------- */
  useEffect(() => {
    const read = () => {
      const vw = window.innerWidth;
      setBox({ vw, vh: window.innerHeight, mobile: vw <= 900 });
    };
    read();
    window.addEventListener('resize', read, { passive: true });
    return () => window.removeEventListener('resize', read);
  }, []);

  /* --- Progreso de portada y de cierre ---------------------------------- */
  useEffect(() => {
    if (reduced) {
      // Con movimiento reducido el riel existe desde el principio y el cierre
      // no se reorganiza: se entrega el estado estable de cada tramo.
      setT(1);
      setC(0);
      return;
    }

    let frame = 0;
    const measure = () => {
      frame = 0;
      const cover = coverRef.current;
      if (cover) {
        const r = cover.getBoundingClientRect();
        const travel = r.height - window.innerHeight;
        setT(travel <= 0 ? 1 : Math.min(1, Math.max(0, -r.top / (travel * 0.72))));
      }
      const close = contactRef.current;
      if (close) {
        const r = close.getBoundingClientRect();
        // El arco se forma mientras el cierre entra en pantalla.
        const raw = (window.innerHeight - r.top) / window.innerHeight;
        setC(Math.min(1, Math.max(0, (raw - 0.15) / 0.7)));
      }
    };

    // Cancelar y volver a pedir: un rAF pedido con la pestaña oculta no llega a
    // ejecutarse, y con el guard `if (!frame)` el identificador se quedaba vivo
    // y mataba todos los scrolls siguientes de forma permanente.
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(measure);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    document.addEventListener('visibilitychange', onScroll);
    measure();
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      document.removeEventListener('visibilitychange', onScroll);
      cancelAnimationFrame(frame);
    };
  }, [reduced]);

  /* --- Proyecto activo: un observador para los quince ------------------- */
  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return;
    const seen = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          const id = (e.target as HTMLElement).dataset.moment;
          if (id) seen.set(id, e.intersectionRatio);
        }
        // Gana el momento más visible, no el último que disparó: con secciones
        // de un viewport, dos entradas casi simultáneas hacían parpadear el
        // riel entre dos marcas.
        let best: string | null = null;
        let ratio = 0.12;
        for (const [id, r] of seen) {
          if (r > ratio) { ratio = r; best = id; }
        }
        setActiveId(best);
      },
      { threshold: [0, 0.15, 0.35, 0.6, 0.85] },
    );

    document
      .querySelectorAll<HTMLElement>('[data-moment]')
      .forEach((n) => observer.observe(n));
    return () => observer.disconnect();
  }, [moments.length]);

  /* --- Saltos ----------------------------------------------------------- */
  const jump = useCallback(
    (id: string) => {
      const node = document.getElementById(`p${id}`);
      if (!node) return;
      node.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
      // El ancla permite compartir la posición. `replaceState` y no `hash`
      // directo: asignar `location.hash` provoca un segundo salto instantáneo
      // que anula el desplazamiento suave.
      window.history.replaceState(null, '', `#p${id}`);
    },
    [reduced],
  );

  const pick = useCallback(
    (id: string) => {
      setOpen(false);
      // El salto se pide después de cerrar para que el scroll ya esté
      // desbloqueado cuando el navegador lo ejecute.
      requestAnimationFrame(() => jump(id));
    },
    [jump],
  );

  const closeVistazo = useCallback(() => {
    setOpen(false);
    vistazoTrigger.current?.focus();
  }, []);

  const railId = hoverId ?? activeId;

  return (
    <>
      <TopBar
        open={open}
        onOpen={(el) => { vistazoTrigger.current = el; setOpen(true); }}
        onClose={closeVistazo}
        activeId={activeId}
        moments={moments}
      />

      <main className={styles.main}>
        <CoverAct
          ref={coverRef}
          nameLines={identity.nameLines}
          role={identity.roleShort}
          year={identity.year}
          t={t}
        />

        <PersonalAct
          summary={summary}
          role={identity.role}
          institution={identity.institution}
          year={identity.year}
          email={contact.email}
          signature={signature}
          texture={texture}
        />

        {moments.map((m) => (
          <Fragment key={m.id}>
            <div data-moment={m.id}>
              <ProjectMoment data={m} onEnter={setActiveId} />
            </div>

            {/* Lo que este proyecto entrega al siguiente. Va antes del rostro
                cuando toca, porque el agua de P13 es justo lo que el rostro
                recoge como hilo. */}
            {seams[m.id] ? <Seam data={seams[m.id]} /> : null}

            {/* El rostro va justo donde el agua de P13 entrega su trazo y antes
                de que GRANULAR abra su densidad. Fuera de ahí no tendría
                lectura: es la bisagra entre los dos, no una portada. */}
            {rostro && m.id === '13' ? (
              <RostroAct
                trazos={rostro.trazos}
                viewBox={rostro.viewBox}
                bases={rostro.bases}
              />
            ) : null}
          </Fragment>
        ))}

        <div ref={contactRef}>
          <ContactAct
            name={identity.name}
            role={identity.role}
            institution={identity.institution}
            year={identity.year}
            email={contact.email}
            subject={contact.mailtoSubject}
          />
        </div>
      </main>

      <UnitField
        items={moments.map((m) => ({ id: m.id, accent: m.accent, short: m.short }))}
        state={{ t, c, activeId: railId, vw: box.vw, vh: box.vh, mobile: box.mobile }}
        onJump={jump}
        onHover={setHoverId}
      />

      <Vistazo
        open={open}
        items={vistazo}
        territories={territories}
        families={families}
        onClose={closeVistazo}
        onPick={pick}
        surface="dark"
      />
    </>
  );
}
