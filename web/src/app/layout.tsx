import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';

import '@/styles/tokens.css';
import '@/styles/globals.css';
import '@/styles/controles.css';
import { CartoPatternDefs } from '@/components/atlas/CartoPatterns';
import { Dpr } from '@/components/global/Dpr';

/**
 * Fuentes locales. Geist variable cubre los dos papeles que pide la dirección
 * de arte: grotesca geométrica para títulos (500-700) y monoespaciada para
 * datos y etiquetas.
 *
 * Falta una serif editorial para las citas en pausas blancas. No se añade una
 * dependencia externa por eso; queda anotado como diferencia pendiente.
 */
const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
  display: 'swap',
});

const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
  display: 'swap',
});

/**
 * Origen público del sitio.
 *
 * `metadataBase` decide sobre qué dominio se resuelven canonical y Open Graph.
 * Se toma del entorno para que el despliegue no herede la dirección de
 * desarrollo; sin variable, se usa el puerto local y nada apunta a un dominio
 * que todavía no existe.
 */
const ORIGEN = process.env.NEXT_PUBLIC_SITIO ?? 'http://localhost:4100';

export const metadata: Metadata = {
  metadataBase: new URL(ORIGEN),
  title: {
    default: 'Nestor Elihu Arriaga Gallegos — Portafolio territorial',
    template: '%s — Nestor Elihu Arriaga Gallegos',
  },
  description:
    'Portafolio de cartografía, análisis territorial y proyectos de ordenamiento. '
    + 'Quince trabajos en seis territorios de México y cuatro sistemas digitales.',
  authors: [{ name: 'Nestor Elihu Arriaga Gallegos' }],
  creator: 'Nestor Elihu Arriaga Gallegos',
  alternates: { canonical: '/' },
  // El `@` del atlas, no una inicial: es el signo que usa el propio recorrido.
  icons: { icon: [{ url: '/icon.svg', type: 'image/svg+xml' }] },
  openGraph: {
    type: 'website',
    locale: 'es_MX',
    url: '/',
    siteName: 'Nestor Elihu Arriaga Gallegos',
    title: 'Nestor Elihu Arriaga Gallegos — Portafolio territorial',
    description:
      'Cartografía, análisis territorial y proyectos de ordenamiento en seis territorios de México.',
    images: [{ url: '/og.webp', width: 1200, height: 628, alt: 'Portada del atlas territorial' }],
  },
};

export const viewport: Viewport = {
  // El mismo negro del recorrido, no un gris aproximado.
  themeColor: '#080908',
  colorScheme: 'dark',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${geistSans.variable} ${geistMono.variable}`}>
      <head>
        {/*
          Fallback estático. Toda la secuencia de entrada del atlas parte de un
          estado oculto que un IntersectionObserver levanta al aparecer la
          lámina. Sin JavaScript ese observador no existe y la página se
          quedaría en blanco: mapas, contornos y títulos invisibles para
          siempre. Esta hoja entrega directamente el estado final.
        */}
        <noscript>
          <style>{`
            [data-revealed], [data-revealed] * {
              opacity: 1 !important;
              transform: none !important;
              clip-path: none !important;
              stroke-dashoffset: 0 !important;
              transition: none !important;
            }
          `}</style>
        </noscript>
      </head>
      <body>
        {/* Los patrones se montan una sola vez para todo el documento. */}
        {/* Salto al contenido: primer elemento tabulable del documento. */}
        <a className="saltar" href="#contenido">Ir al contenido</a>
        <Dpr />
        <CartoPatternDefs />
        {children}
      </body>
    </html>
  );
}
