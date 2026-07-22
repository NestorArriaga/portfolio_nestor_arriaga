import Image from 'next/image';
import Link from 'next/link';
import Reveal from '../home/motion/Reveal';

interface VeracruzFamilyClosingProps {
  territoryPhoto: string;
  photoCredit: string;
}

export default function VeracruzFamilyClosing({ territoryPhoto, photoCredit }: VeracruzFamilyClosingProps) {
  return (
    <section className="w-full relative min-h-[80vh] flex flex-col justify-center items-center overflow-hidden bg-[#050505] text-white border-y border-white/10">
      
      {/* IMAGEN DE FONDO */}
      <div className="absolute inset-0 z-0">
        <Image 
          src={territoryPhoto} 
          alt="Territorio de Veracruz" 
          fill 
          className="object-cover opacity-30 saturate-0"
          unoptimized 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/80 to-[#050505]"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12 text-center flex flex-col items-center">
        
        <Reveal direction="up" distance={32}>
          <h2 className="text-display-lg text-white mb-6 tracking-tight">VERACRUZ</h2>
        </Reveal>
        
        <Reveal delay={0.1} direction="up" distance={16}>
          <div className="flex flex-wrap justify-center gap-4 text-mono text-[10px] text-[var(--color-accent)] uppercase tracking-widest mb-12">
            <span>CUENCA</span>
            <span>•</span>
            <span>PAISAJE</span>
            <span>•</span>
            <span>PRODUCCIÓN</span>
            <span>•</span>
            <span>FUNCIÓN ECOLÓGICA</span>
          </div>
        </Reveal>

        <Reveal delay={0.2} direction="up" distance={16}>
          <p className="text-body-lg text-white/70 font-light leading-relaxed max-w-2xl mx-auto mb-16">
            Los tres proyectos reúnen lecturas distintas de la cuenca de Decozalapa: su función ecológica, la localización de zonas agrícolas favorables y la relación entre uso del suelo y continuidad productiva.
          </p>
        </Reveal>

        <Reveal delay={0.3} direction="up">
          <div className="flex flex-col sm:flex-row gap-6 items-center">
            <Link 
              href="/projects" 
              className="text-label text-white border border-white/20 hover:border-white hover:bg-white hover:text-black px-8 py-3 rounded-full transition-colors"
            >
              VOLVER A GALERÍA
            </Link>
            <a 
              href="/Portafolio_pliego.pdf" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-label text-white/50 hover:text-white transition-colors flex items-center gap-2"
            >
              ABRIR PDF ↗
            </a>
          </div>
        </Reveal>
        
      </div>

      {/* CRÉDITO ABSOLUTO */}
      <div className="absolute bottom-6 left-6 right-6 text-mono text-[10px] text-white/30 uppercase tracking-widest text-center z-10 pointer-events-none">
        FOTOGRAFÍA: {photoCredit}
      </div>

    </section>
  );
}
