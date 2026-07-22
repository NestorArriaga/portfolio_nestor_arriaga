import Link from 'next/link';
import Reveal from './motion/Reveal';

export default function PortfolioFooter() {
  return (
    <footer className="py-24 px-6 md:px-12 bg-black border-t border-white/10 relative overflow-hidden flex flex-col items-center justify-center min-h-[50vh]">
      
      {/* Background Texture - Using the identity relief as a faint subtle map */}
      <div className="absolute inset-0 z-0 opacity-[0.03] mix-blend-screen pointer-events-none" style={{
        backgroundImage: 'url(/portfolio-media/curated/identity/identity-relief-hero-wide-original-clean.webp)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        filter: 'grayscale(100%)'
      }}></div>

      <div className="relative z-10 text-center max-w-4xl mx-auto">
        <Reveal direction="up" distance={64} duration={0.8}>
          <h2 className="text-display-xl text-white mb-8 tracking-tighter leading-[0.85]">
            TODA LA TIERRA,<br/>
            <span className="text-[var(--color-text-faint)]">NO PEDAZOS DE TIERRA.</span>
          </h2>
        </Reveal>
        
        <Reveal delay={0.2} direction="up" distance={16}>
          <div className="flex flex-col items-center gap-2 mb-16">
            <div className="text-body text-white/60">Néstor Elihu Arriaga Gallegos</div>
            <div className="text-caption text-white/40">Ingeniero en Recursos Naturales Renovables</div>
          </div>
        </Reveal>

        <Reveal delay={0.4} direction="up" distance={16}>
          <div className="flex flex-wrap justify-center gap-8 text-label text-white/50">
            <a href="/Portafolio_pliego.pdf" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">DESCARGAR PDF</a>
            <Link href="#top" className="hover:text-white transition-colors">VOLVER ARRIBA ↑</Link>
          </div>
        </Reveal>
      </div>

      <div className="absolute bottom-6 w-full text-center text-mono text-[10px] text-white/20">
        © 2026. BASADO EN PORTAFOLIO ORIGINAL.
      </div>
    </footer>
  );
}
