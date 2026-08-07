'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import styles from './AtlasNav.module.css';

/**
 * Navegación del atlas.
 *
 * Una barra fija y delgada, en la misma familia que las marcas de lámina: no es
 * una cabecera de sitio con logotipo y menú, es el riel de una publicación. Da
 * acceso directo a cualquier capítulo desde cualquier punto, que es lo que le
 * faltaba al recorrido.
 *
 * Se retira al bajar y vuelve al subir: en una lámina a sangre, una barra
 * permanente le come el borde superior al mapa. El umbral evita que parpadee
 * con el rebote del scroll.
 */

export type NavSection = { href: string; label: string; kicker?: string };

const THRESHOLD = 12;

export function AtlasNav({ sections }: { sections: NavSection[] }) {
  const pathname = usePathname();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let last = window.scrollY;
    let frame = 0;

    const measure = () => {
      frame = 0;
      const y = window.scrollY;
      setScrolled(y > 40);
      if (Math.abs(y - last) > THRESHOLD) {
        setHidden(y > last && y > 120);
        last = y;
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

      <ul className={styles.list}>
        {sections.map((s) => {
          const current = pathname === s.href;
          return (
            <li key={s.href}>
              <Link
                href={s.href}
                className={styles.link}
                data-current={current ? 'true' : 'false'}
                aria-current={current ? 'page' : undefined}
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
