import { MetadataRoute } from 'next';
import { siteRoutes } from '@/content/site/site-routes';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://nestorarriaga.com'; // Placeholder base URL
  
  const publicRoutes = siteRoutes.public.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '/' ? 1 : 0.8,
  }));

  return [...publicRoutes];
}
