import React from 'react';
import Link from 'next/link';
import Reveal from '../home/motion/Reveal';
import { siteClosing } from '@/content/site/site-closing';

interface Props {
  variant: 'full' | 'compact';
}

export default function PortfolioClosing({ variant }: Props) {
  if (variant === 'compact') {
    return (
      <footer className="py-24 px-6 md:px-12 bg-black border-t border-white/10 relative overflow-hidden flex flex-col items-center justify-center min-h-[40vh]">
        <div className="relative z-10 text-center max-w-2xl mx-auto">
          <Reveal direction="up" distance={32}>
            <div className="text-label text-[var(--color-text-muted)] tracking-widest mb-6">
              FIN DEL RECORRIDO DE PROYECTOS
            </div>
          </Reveal>
          <Reveal delay={0.1} direction="up" distance={32}>
            <h2 className="text-display-sm text-white mb-8 tracking-tighter">
              15 CASOS DOCUMENTADOS
            </h2>
          </Reveal>
          <Reveal delay={0.2} direction="up" distance={16}>
            <div className="flex flex-wrap justify-center gap-6 text-label tracking-widest">
              <Link href="/atlas" className="text-white hover:text-accent transition-colors">ABRIR ATLAS</Link>
              <Link href="/about" className="text-white/50 hover:text-white transition-colors">CONOCER EL PERFIL</Link>
              <a href="/Portafolio_pliego.pdf" target="_blank" rel="noreferrer" className="text-white/50 hover:text-white transition-colors">ABRIR PDF ↗</a>
            </div>
          </Reveal>
        </div>
      </footer>
    );
  }

  return (
    <footer className="py-32 px-6 md:px-12 bg-black relative overflow-hidden flex flex-col items-center justify-center min-h-[70vh]">
      <div className="relative z-10 text-center max-w-4xl mx-auto">
        
        <Reveal direction="up" distance={32}>
          <div className="text-label text-[var(--color-text-muted)] tracking-widest mb-8">
            GRACIAS
          </div>
        </Reveal>

        <Reveal delay={0.1} direction="up" distance={32}>
          <h2 className="text-display-xl text-white mb-16 tracking-tighter leading-[0.85] whitespace-pre-line">
            {siteClosing.finalPhrase.text}
          </h2>
        </Reveal>
        
        <Reveal delay={0.2} direction="up" distance={16}>
          <div className="flex flex-col items-center gap-4 mb-20 max-w-2xl mx-auto">
            <p className="text-body text-white/60 font-serif italic">
              {siteClosing.quote.text}
            </p>
            <div className="text-caption text-white/40">
              — {siteClosing.quote.author}, {siteClosing.quote.source}, {siteClosing.quote.year}.
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.3} direction="up" distance={16}>
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
        © 2026. {siteClosing.finalPhrase.note.toUpperCase()}
      </div>
    </footer>
  );
}
