import type { MetadataRoute } from 'next';

/**
 * Reglas de rastreo.
 *
 * Sólo se excluye la ruta de composición del PDF: existe para imprimir, no para
 * leerse, y como resultado de búsqueda sería una copia sin navegación del sitio.
 */
export default function robots(): MetadataRoute.Robots {
  const origen = process.env.NEXT_PUBLIC_SITIO ?? 'http://localhost:4100';
  return {
    rules: [{ userAgent: '*', allow: '/', disallow: '/portafolio-impreso' }],
    sitemap: `${origen.replace(/\/$/, '')}/sitemap.xml`,
  };
}
