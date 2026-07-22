import Reveal from '../home/motion/Reveal';
import Image from 'next/image';

interface SharedLivestockPlanContextProps {
  photoSrc: string;
}

export default function SharedLivestockPlanContext({ photoSrc }: SharedLivestockPlanContextProps) {
  return (
    <section className="w-full bg-[#050505] py-32 border-t border-white/10">
      <div className="max-w-6xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        
        <div>
          <Reveal direction="up">
            <h2 className="text-display-sm text-white mb-8">CONTEXTO MENCIONADO EN LA FUENTE</h2>
            <p className="text-body text-white/70 mb-12 leading-relaxed">
              La narrativa de la página 20 vincula el análisis territorial con un escenario caracterizado por las siguientes problemáticas:
            </p>
          </Reveal>
          
          <div className="flex flex-col gap-6">
            <Reveal delay={0.1} direction="up" distance={16} className="border-l border-white/20 pl-6 py-2">
              <div className="text-display-xs text-white/90">SOBREPASTOREO</div>
            </Reveal>
            <Reveal delay={0.2} direction="up" distance={16} className="border-l border-white/20 pl-6 py-2">
              <div className="text-display-xs text-white/90">SOBREUTILIZACIÓN DE FORRAJE</div>
            </Reveal>
            <Reveal delay={0.3} direction="up" distance={16} className="border-l border-white/20 pl-6 py-2">
              <div className="text-display-xs text-white/90">SOBREUTILIZACIÓN DE AGUA</div>
            </Reveal>
            <Reveal delay={0.4} direction="up" distance={16} className="border-l border-white/20 pl-6 py-2">
              <div className="text-display-xs text-white/90">DEGRADACIÓN DE PASTIZALES</div>
            </Reveal>
          </div>
        </div>

        <Reveal direction="left" distance={32} className="relative aspect-square md:aspect-[4/3] rounded-[var(--radius-panel)] overflow-hidden border border-white/10">
          <Image 
            src={photoSrc} 
            alt="Contexto ganadero" 
            fill 
            className="object-cover opacity-60 saturate-50 mix-blend-lighten" 
            unoptimized 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
          <div className="absolute bottom-4 left-4 text-mono text-[10px] text-white/50 tracking-widest uppercase">
            FOTOGRAFÍA INCLUIDA EN LA COMPOSICIÓN ORIGINAL
          </div>
        </Reveal>

      </div>
    </section>
  );
}
