import { MetadataRoute } from 'next';
import { siteRoutes } from '@/content/site/site-routes';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://nestorarriaga.com';

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: siteRoutes.internal,
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
