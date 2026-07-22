import Reveal from '../home/motion/Reveal';
import Image from 'next/image';

interface AguascalientesIntroProps {
  photoSrc: string;
  silhouetteSrc: string;
}

export default function AguascalientesTerritoryIntro({ photoSrc, silhouetteSrc }: AguascalientesIntroProps) {
  return (
    <section className="relative w-full min-h-[90vh] bg-[#050505] flex items-center overflow-hidden py-32 border-b border-white/10">
      
      {/* CAPA DE FOTOGRAFÍA (CALVILLO) */}
      <div className="absolute inset-0 z-0">
        <Image 
          src={photoSrc} 
          alt="Paisaje de Calvillo, Aguascalientes, fotografiado por Néstor Elihu Arriaga Gallegos" 
          fill 
          className="object-cover opacity-30 saturate-50 mix-blend-screen transition-opacity duration-1000" 
          unoptimized 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505] opacity-90"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/80 to-transparent"></div>
      </div>
      
      {/* SILUETA ESTATAL SUTÍL */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-full md:w-1/2 aspect-square z-0 opacity-10 pointer-events-none mix-blend-overlay">
        <Image src={silhouetteSrc} alt="" fill className="object-contain" unoptimized />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 w-full flex flex-col md:flex-row gap-16 items-center">
        
        <div className="w-full md:w-2/3">
          <Reveal direction="down" distance={32}>
            <div className="w-12 h-px bg-[var(--color-accent)] mb-8"></div>
          </Reveal>

          <Reveal direction="up" distance={32}>
            <h2 className="text-display-lg text-white mb-2 tracking-tight">AGUASCALIENTES</h2>
            <div className="text-mono text-[10px] text-[var(--color-accent)] uppercase tracking-widest mb-12">
              TERRITORIO, PRODUCCIÓN Y PLANEACIÓN RURAL
            </div>
          </Reveal>
          
          <Reveal delay={0.2} direction="up" distance={16}>
            <p className="text-body-lg text-white/80 font-light leading-relaxed max-w-2xl mb-6">
              Aguascalientes aparece en el portafolio como un territorio vinculado con identidad, pertenencia y memoria. Desde Calvillo, lugar de origen del autor, la lectura del paisaje se extiende hacia la planeación rural, la conservación, la agricultura y el manejo de los recursos naturales.
            </p>
            <p className="text-body-lg text-white/50 font-light leading-relaxed max-w-2xl">
              La apertura del portafolio relaciona Aguascalientes con la búsqueda de identidad evocada por Octavio Paz en <i>El laberinto de la soledad</i>.
            </p>
          </Reveal>
        </div>

        <div className="w-full md:w-1/3 flex justify-end">
          <Reveal direction="left" delay={0.4} className="text-right">
            <div className="text-mono text-[10px] text-white/30 uppercase tracking-widest max-w-[200px]">
              FOTOGRAFÍA ORIGINAL DE CALVILLO. CRÉDITO: NÉSTOR ELIHU ARRIAGA GALLEGOS.
            </div>
          </Reveal>
        </div>
        
      </div>
    </section>
  );
}
