import type { Metadata } from 'next';
import Link from 'next/link';

import { granularProject, pillars } from '@/content/granular';
import { RielCaso } from '@/components/global/RielCaso';
import { CaracterizacionComarca } from '@/components/cuaderno/granular/CaracterizacionComarca';
import { IndicePilares } from '@/components/cuaderno/granular/IndicePilares';
import { atlasHref, vistazoHref } from '@/lib/rutas';
import styles from '@/components/cuaderno/PilarGranular.module.css';
import entrada from '@/components/cuaderno/granular/Entrada.module.css';

export const metadata: Metadata = {
  title: `${granularProject.title} — GRANULAR`,
  description: `P14 · ${granularProject.territory} · ${granularProject.subtitle}.`,
};

/**
 * Entrada de GRANULAR.
 *
 * Orienta primero —territorio, cifras y municipios— y después ofrece el índice
 * de los siete pilares a lo ancho de la página. La versión anterior componía
 * esta página con estilos en línea y dejaba el índice comprimido en una columna
 * estrecha con una gran superficie negra sin función a su derecha.
 */
export default function GranularPage() {
  return (
    <>
      <RielCaso
        id="14"
        corto={granularProject.title}
        territorio={granularProject.territory}
        superficie="tinta"
        posicion={14}
        total={15}
      />

      <main id="contenido" tabIndex={-1} className={styles.pilar}>
        <header className={styles.apertura}>
          <p className={`${styles.marca} mono`}>P14 · GRANULAR</p>
          <h1 className={styles.nombre} style={{ '--largo': '8' } as React.CSSProperties}>
            GRANULAR
          </h1>
          <ul className={`${styles.variables} mono`}>
            <li>{granularProject.territory.toUpperCase()}</li>
            <li>{granularProject.region.toUpperCase()}</li>
            <li>{`${pillars.length} PILARES`}</li>
          </ul>
        </header>

        <section className={entrada.seccion} aria-label="Caracterización regional">
          <CaracterizacionComarca />
        </section>

        <section className={entrada.seccion}>
          <h2 className={`${entrada.rotulo} mono`}>
            <span>Siete pilares</span>
            <span className={entrada.rotuloNota}>de la caracterización a la clasificación</span>
          </h2>
          <IndicePilares />
        </section>

        <footer className={styles.salida}>
          <Link className={styles.salto} href="/caso/subcuencas-y-rios-calvillo" data-touch>
            <span className={`${styles.saltoDir} mono`}>Proyecto anterior · P13</span>
            <span className={styles.saltoNombre}>Subcuencas y ríos</span>
          </Link>

          <div className={styles.centro}>
            <Link className="btn" data-v="borde" href={atlasHref('14')}>Volver al recorrido</Link>
            <Link className="btn" data-v="borde" href={vistazoHref()}>Índice de proyectos</Link>
          </div>

          <Link className={styles.salto} href="/caso/urban-challenge" data-touch data-dir="adelante">
            <span className={`${styles.saltoDir} mono`}>Proyecto siguiente · P15</span>
            <span className={styles.saltoNombre}>Urban Challenge</span>
          </Link>
        </footer>
      </main>
    </>
  );
}
