import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { curriculos, type Idioma } from '@/content/cv';
import { CvImpreso } from '@/components/impreso/Cv';

import styles from '@/components/impreso/Cv.module.css';

/**
 * Ruta de composición del currículum impreso.
 *
 * Como la del portafolio: no es una página del sitio, es la plancha desde la
 * que el generador exporta el PDF. Lee `content/cv.ts`, así que una corrección
 * en el contenido llega a las dos versiones sin tocar dos sitios.
 *
 * No se enlaza desde ninguna parte y va marcada `noindex`.
 */

const IDIOMAS: Idioma[] = ['es', 'en'];

export function generateStaticParams() {
  return IDIOMAS.map((lang) => ({ lang }));
}

export const metadata: Metadata = {
  title: 'Curriculum vitae impreso',
  robots: { index: false, follow: false },
};

export default function CvPrint({ params }: { params: { lang: string } }) {
  const lang = params.lang as Idioma;
  if (!IDIOMAS.includes(lang)) notFound();

  const cv = curriculos[lang];

  return (
    <div className={styles.doc} lang={cv.etiquetaIdioma}>
      <CvImpreso cv={cv} />
    </div>
  );
}
