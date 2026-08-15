'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useRef, useState } from 'react';

import { Ayuda, useAyuda } from '@/components/experience-v5/ayudas';
import { Glifo } from '@/components/cuaderno/Glifo';
import { regresoAtlas, vistazoHref } from '@/lib/rutas';
import styles from './RielCaso.module.css';

/**
 * Riel de las páginas interiores.
 *
 * Es la misma pieza que el HUD del recorrido —posición, superficie, dos
 * accesos— pero arriba y con el proyecto ya fijado. Lo que muestra:
 *
 *   Atlas · PXX · nombre corto · territorio · X/15 · Vistazo
 *
 * `Atlas` vuelve al proyecto exacto dentro del recorrido, usando el origen que
 * viaja en `?from=` cuando existe y el ancla del proyecto cuando no. Nunca a
 * `/`. `Vistazo` abre el índice orbital aprobado por URL.
 *
 * Se retira al bajar y vuelve al subir: sobre una lámina a sangre, una barra
 * permanente le come el borde superior al mapa.
 */

export type RielDatos = {
  id: string;
  corto: string;
  territorio: string;
  superficie: 'tinta' | 'papel';
  /** Posición dentro de los quince. */
  posicion: number;
  total: number;
};

const UMBRAL = 12;

export function RielCaso(props: RielDatos) {
  return (
    <Suspense fallback={<Riel {...props} from={null} />}>
      <RielConOrigen {...props} />
    </Suspense>
  );
}

function RielConOrigen(props: RielDatos) {
  const q = useSearchParams();
  return <Riel {...props} from={q.get('from')} />;
}

function Riel({ id, corto, territorio, superficie, posicion, total, from }: RielDatos & { from: string | null }) {
  const [visible, setVisible] = useState(true);
  const ultimo = useRef(0);
  const pathname = usePathname();

  useEffect(() => {
    let frame = 0;
    let accumulated = 0;
    let lastY = window.scrollY;

    const medir = () => {
      frame = 0;
      const y = window.scrollY;
      const dy = y - lastY;
      lastY = y;

      if ((dy > 0 && accumulated < 0) || (dy < 0 && accumulated > 0)) {
        accumulated = 0;
      }
      accumulated += dy;

      if (accumulated > 45 && y > 320) {
        setVisible(false);
        accumulated = 0;
      } else if (accumulated < -45) {
        setVisible(true);
        accumulated = 0;
      }
    };
    const on = () => { cancelAnimationFrame(frame); frame = requestAnimationFrame(medir); };
    window.addEventListener('scroll', on, { passive: true });
    return () => { window.removeEventListener('scroll', on); cancelAnimationFrame(frame); };
  }, []);

  // Cambiar de página deja el riel a la vista: si no, al llegar por
  // «siguiente» aparecía escondido.
  useEffect(() => { setVisible(true); }, [pathname]);

  // Una sola vez por sesión, en el primer proyecto que se abre: `Atlas` no es
  // un nombre evidente para «volver al recorrido».
  const ayuda = useAyuda('proyecto-atlas', visible, 1100);

  return (
    <nav
      className={styles.riel}
      data-sup={superficie === 'papel' ? 'papel' : undefined}
      data-visible={visible || undefined}
      aria-label="Navegación del atlas"
    >
      <span className={styles.conAyuda}>
        <Link className={`${styles.atlas} btn`} data-v="fantasma" href={regresoAtlas(id, from)}
              aria-label="Atlas · volver al recorrido"
              aria-describedby={ayuda.visible ? ayuda.id : undefined}
              onClick={ayuda.cerrar}>
          Atlas
        </Link>
        {ayuda.visible ? (
          <Ayuda id={ayuda.id} lado="abajo" sup={superficie === 'papel' ? 'papel' : 'tinta'}
                 texto="Atlas · volver al recorrido" />
        ) : null}
      </span>

      <p className={styles.actual}>
        <Glifo id={id} tam={18} clase={styles.glifo} />
        <span className={`${styles.num} mono`}>{`P${id}`}</span>
        <span className={styles.corto}>{corto}</span>
        <span className={`${styles.territorio} mono`}>{territorio}</span>
      </p>

      <p className={`${styles.posicion} mono`}>{`${posicion}/${total}`}</p>

      <Link className={`${styles.vistazo} btn`} data-v="fantasma" href={vistazoHref()}
            aria-label="Vistazo · abrir índice de proyectos">
        Vistazo
      </Link>
    </nav>
  );
}
