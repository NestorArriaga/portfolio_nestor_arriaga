import Reveal from '../home/motion/Reveal';
import Image from 'next/image';

interface MetztitlanTerritoryIntroProps {
  silhouetteSrc: string;
  textureSrc: string;
  accentColor: string;
}

export default function MetztitlanTerritoryIntro({ silhouetteSrc, textureSrc, accentColor }: MetztitlanTerritoryIntroProps) {
  return (
    <section className="relative w-full min-h-[80vh] bg-[#050505] flex items-center overflow-hidden py-32 border-b border-white/10" style={{ '--local-accent': accentColor } as any}>
      
      {/* CAPA DE TEXTURA Y SILUETA (ESTRÍCTAMENTE DEL PORTAFOLIO, SIN FOTOS DE STOCK) */}
      <div className="absolute inset-0 z-0 flex items-center justify-center opacity-30 mix-blend-lighten pointer-events-none">
        <div className="relative w-full max-w-[1200px] aspect-video">
          <Image src={silhouetteSrc} alt="Silueta territorial de Metztitlán" fill className="object-contain saturate-50" unoptimized />
        </div>
      </div>
      
      {/* TEXTURA EXTRAÍDA */}
      <div className="absolute inset-0 z-0 opacity-10" style={{ backgroundImage: `url(${textureSrc})`, backgroundSize: 'cover', backgroundPosition: 'center', mixBlendMode: 'overlay' }}></div>
      <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505] z-0"></div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12 w-full">
        
        <Reveal direction="down" distance={32}>
          <div className="w-12 h-px bg-[var(--local-accent)] mb-8"></div>
        </Reveal>

        <Reveal direction="up" distance={32}>
          <h2 className="text-display-lg text-white mb-2 tracking-tight">METZTITLÁN</h2>
          <div className="text-mono text-[10px] text-[var(--local-accent)] uppercase tracking-widest mb-12">
            FORMAS, RELIEVE Y UNIDADES DEL PAISAJE
          </div>
        </Reveal>
        
        <Reveal delay={0.2} direction="up" distance={16}>
          <p className="text-body-lg text-white/70 font-light leading-relaxed max-w-2xl">
            Metztitlán aparece en el portafolio como un territorio leído a través de sus formas. La clasificación del relieve, los patrones geomorfológicos y las unidades ecológicas permiten observar cómo la estructura física y ambiental organiza el paisaje.
          </p>
        </Reveal>
        
      </div>
    </section>
  );
}
