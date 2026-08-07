import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';

import '@/styles/tokens.css';
import '@/styles/globals.css';
import { CartoPatternDefs } from '@/components/atlas/CartoPatterns';

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

export const metadata: Metadata = {
  title: 'Néstor Elihu Arriaga Gallegos — Atlas territorial',
  description:
    'Atlas territorial interactivo: cartografía, análisis y proyectos de ordenamiento del territorio.',
};

export const viewport: Viewport = {
  themeColor: '#050505',
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
        <CartoPatternDefs />
        {children}
      </body>
    </html>
  );
}
