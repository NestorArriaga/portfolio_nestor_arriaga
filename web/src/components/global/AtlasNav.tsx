'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import styles from './AtlasNav.module.css';

/**
 * Navegación del atlas.
 *
 * Una barra fija y delgada, en la misma familia que las marcas de lámina: no es
 * una cabecera de sitio con logotipo y menú, es el riel de una publicación.
 *
 * **El riel es contextual.** Los siete pilares solo aparecen dentro de
 * `/granular`. Antes se mostraban en todas las páginas, y el efecto era que
 * quince proyectos compartían una barra que solo hablaba de uno: en un caso de
 * Metztitlán o de Calvillo, la única navegación visible eran los capítulos de
 * la Comarca. P14 es el caso más extenso, pero eso no le da la barra.
 *
 * Se retira al bajar y vuelve al subir: en una lámina a sangre, una barra
 * permanente le come el borde superior al mapa. El umbral evita que parpadee
 * con el rebote del scroll.
 */

export type NavSection = { href: string; label: string; kicker?: string };

/** Proyecto en curso, para orientar dentro del recorrido P01–P15. */
export type NavCurrent = { id: string; short: string; place: string; accent: string };

const THRESHOLD = 12;

export function AtlasNav({
  sections,
  chapters = [],
  chapterScope = '/granular',
  cases = [],
}: {
  /** Secciones permanentes. Visibles en todo el sitio. */
  sections: NavSection[];
  /** Capítulos de un caso. Solo dentro de `chapterScope`. */
  chapters?: NavSection[];
  chapterScope?: string;
  /** Los quince casos, en orden, para situar el actual y su vecino. */
  cases?: (NavCurrent & { href: string })[];
}) {
  const pathname = usePathname();

  // El recorrido monta su propio HUD. Dos barras fijas apiladas en la misma
  // esquina serían dos navegaciones para lo mismo. Y las páginas interiores
  // montan `RielCaso`, que sí conoce el proyecto y su regreso.
  const onRecorrido =
    pathname === '/' ||
    (pathname?.startsWith('/laboratorio') ?? false) ||
    (pathname?.startsWith('/caso') ?? false) ||
    (pathname?.startsWith('/granular') ?? false);

  const inScope = pathname?.startsWith(chapterScope) ?? false;
  const visible = inScope ? [...sections, ...chapters] : sections;

  // Proyecto actual: el riel deja de ser solo un menú y pasa a decir dónde
  // estás dentro de los quince. Sin esto, en una página de caso la única pista
  // de posición era el número impreso en la apertura, que desaparece al
  // desplazarse.
  const at = cases.findIndex((c) => c.href === pathname);
  const current = at >= 0 ? cases[at] : null;
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let frame = 0;
    let accumulated = 0;
    let lastY = window.scrollY;

    const measure = () => {
      frame = 0;
      const y = window.scrollY;
      setScrolled(y > 40);

      const dy = y - lastY;
      lastY = y;

      if ((dy > 0 && accumulated < 0) || (dy < 0 && accumulated > 0)) {
        accumulated = 0;
      }
      accumulated += dy;

      if (accumulated > 45 && y > 120) {
        setHidden(true);
        accumulated = 0;
      } else if (accumulated < -45) {
        setHidden(false);
        accumulated = 0;
      }
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    measure();
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  if (onRecorrido) return null;

  return (
    <nav
      className={styles.nav}
      data-hidden={hidden ? 'true' : 'false'}
      data-scrolled={scrolled ? 'true' : 'false'}
      aria-label="Secciones del atlas"
    >
      <Link href="/" className={styles.home}>
        Atlas
      </Link>

      {current ? (
        <p className={styles.current} style={{ '--accent': current.accent } as React.CSSProperties}>
          <span className={styles.currentNum}>P{current.id}</span>
          <span className={styles.currentName}>{current.short}</span>
          <span className={styles.currentPlace}>{current.place}</span>
          <span className={styles.currentOf}>
            {at + 1}<span aria-hidden="true">/</span>{cases.length}
          </span>
        </p>
      ) : null}

      <ul className={styles.list}>
        {visible.map((s) => {
          const here = pathname === s.href;
          return (
            <li key={s.href}>
              <Link
                href={s.href}
                className={styles.link}
                data-current={here ? 'true' : 'false'}
                aria-current={here ? 'page' : undefined}
              >
                {s.kicker ? <span className={styles.kicker}>{s.kicker}</span> : null}
                {s.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
