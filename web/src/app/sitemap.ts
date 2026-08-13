import type { MetadataRoute } from 'next';

import { cases } from '@/content/cases';
import { sistemas } from '@/components/sistemas/registro';
import { pillars } from '@/content/granular';
import { projectHref } from '@/lib/rutas';

/**
 * Mapa del sitio, derivado de las rutas que existen de verdad.
 *
 * No se escribe a mano: sale de los mismos registros que generan las páginas,
 * así que no puede quedar anunciando una ruta retirada ni olvidar una nueva.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const origen = process.env.NEXT_PUBLIC_SITIO ?? 'http://localhost:4100';
  const u = (ruta: string) => `${origen.replace(/\/$/, '')}${ruta}`;

  return [
    { url: u('/'), priority: 1 },
    ...cases
      .filter((c) => c.id !== '14' && c.id !== '15')
      .map((c) => ({ url: u(projectHref(c.id, c.slug)), priority: 0.8 })),
    ...pillars.map((p) => ({ url: u(`/granular/${p.id}`), priority: 0.7 })),
    { url: u('/caso/urban-challenge'), priority: 0.7 },
    ...sistemas().map((s) => ({ url: u(`/sistema/${s.slug}`), priority: 0.7 })),
  ];
}
