import type { Metadata } from 'next';

import { Atlas } from '@/components/experience-v5/ExperienceV5';
import {
  momentos, granular, parqueEstados, marcadores, recortes, fichas, actos, rostro,
  descargaPdf,
} from '@/components/experience-v5/registry';
import { plano } from '@/components/proyecto/blueprints';
import { sistemas, fichasSistemas } from '@/components/sistemas/registro';
import { identity } from '@/content/home';

/**
 * Portada — la única versión del portafolio.
 *
 * La experiencia vivía en `/laboratorio-v5` mientras se construía, y `/`
 * mostraba una versión anterior. Eso producía el fallo de fondo: desde una
 * página de proyecto, `Atlas` volvía a una portada pasada. Ahora hay una sola
 * ruta canónica y las antiguas redirigen aquí.
 */

export const metadata: Metadata = {
  title: `${identity.name} — Portafolio territorial`,
  description:
    'Portafolio de cartografía, análisis territorial y proyectos de ordenamiento. '
    + 'Quince trabajos en seis territorios de México.',
  authors: [{ name: identity.name }],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'es_MX',
    url: '/',
    siteName: identity.name,
    title: `${identity.name} — Portafolio territorial`,
    description:
      'Cartografía, análisis territorial y proyectos de ordenamiento en seis territorios de México.',
  },
};

/**
 * Hero interior de cada proyecto, para precargarlo desde la portada.
 *
 * Se resuelve aquí y no en `registry`: los planos leen del registro, y pedirle
 * al registro que lea los planos cerraría el ciclo de importaciones.
 */
function conHero() {
  return momentos().map((m) => {
    const r = plano(m.num.replace('P', ''))?.hero.recurso;
    return r ? { ...m, hero: { src: r.img.src, srcSet: r.img.srcSet } } : m;
  });
}

export default function Portada() {
  return (
    <Atlas
      momentos={conHero()}
      granular={granular()}
      parque={parqueEstados()}
      sistemas={sistemas()}
      marcadores={marcadores()}
      recortes={recortes()}
      fichas={[...fichas(), ...fichasSistemas()]}
      actos={actos()}
      rostro={rostro()}
      descarga={descargaPdf()}
    />
  );
}
