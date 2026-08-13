import type { Metadata } from 'next';
import Link from 'next/link';

import { granularProject, pillars } from '@/content/granular';
import { RielCaso } from '@/components/global/RielCaso';
import { CaracterizacionComarca } from '@/components/cuaderno/granular/CaracterizacionComarca';
import { atlasHref, vistazoHref } from '@/lib/rutas';
import styles from '@/components/cuaderno/PilarGranular.module.css';

export const metadata: Metadata = {
  title: `${granularProject.title} — GRANULAR`,
  description: `P14 · ${granularProject.territory} · ${granularProject.subtitle}.`,
};

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
        <header className={styles.apertura} style={{ paddingBottom: '3rem' }}>
          <p className={`${styles.marca} mono`}>{`P14 · GRANULAR`}</p>
          <h1 className={styles.nombre} style={{ '--largo': '8' } as React.CSSProperties}>
            GRANULAR
          </h1>
          <ul className={`${styles.variables} mono`}>
            <li>{granularProject.territory.toUpperCase()}</li>
            <li>{granularProject.region.toUpperCase()}</li>
          </ul>
        </header>

        <section style={{ marginBottom: '4rem' }}>
          <CaracterizacionComarca />
        </section>

        <section style={{ marginBottom: '4rem' }}>
          <h2 className="mono" style={{ fontSize: '1rem', marginBottom: '1.5rem', textTransform: 'uppercase' }}>
            Siete Pilares
          </h2>
          <nav className={styles.pilares} aria-label="Pilares de GRANULAR" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'flex-start' }}>
            {pillars.map((p) => (
              <Link key={p.id} href={`/granular/${p.id}`} data-touch
                    className={`${styles.pastilla} btn`} data-v="borde"
                    style={{ width: '100%', maxWidth: '400px', justifyContent: 'flex-start' }}>
                <span className={styles.pastillaNum}>{p.number}</span>{p.title}
              </Link>
            ))}
          </nav>
        </section>

        <footer className={styles.salida}>
          <Link className={styles.salto} href="/caso/subcuencas-y-rios-calvillo" data-touch>
            <span className={`${styles.saltoDir} mono`}>anterior · P13</span>
            <span className={styles.saltoNombre}>Subcuencas y ríos</span>
          </Link>

          <div className={styles.centro}>
            <Link className="btn" data-v="borde" href={atlasHref('14')}>Atlas</Link>
            <Link className="btn" data-v="borde" href={vistazoHref()}>Vistazo</Link>
          </div>

          <Link className={styles.salto} href="/caso/urban-challenge" data-touch data-dir="adelante">
            <span className={`${styles.saltoDir} mono`}>siguiente · P15</span>
            <span className={styles.saltoNombre}>Urban Challenge</span>
          </Link>
        </footer>
      </main>
    </>
  );
}
