import Image from 'next/image';
import Reveal from '../home/motion/Reveal';

interface CalvilloTerritoryIntroProps {
  photoSrc: string;
}

export default function CalvilloTerritoryIntro({ photoSrc }: CalvilloTerritoryIntroProps) {
  return (
    <section className="relative w-full h-[80vh] min-h-[600px] flex items-center justify-center overflow-hidden bg-[#050505]">
      
      {/* IMAGEN DE FONDO (CALVILLO) */}
      <div className="absolute inset-0 z-0">
        <Image 
          src={photoSrc} 
          alt="Paisaje de Calvillo, Aguascalientes" 
          fill 
          className="object-cover opacity-30 saturate-50" 
          priority
          unoptimized 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-80"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-[#050505]/40 to-transparent"></div>
      </div>

      <div className="relative z-10 w-full max-w-4xl mx-auto px-6 md:px-12 text-center mt-20">
        
        <Reveal direction="up" distance={32}>
          <div className="inline-block border border-white/20 rounded-full px-6 py-2 mb-8 backdrop-blur-sm bg-black/30">
            <h2 className="text-mono text-[10px] text-white/70 uppercase tracking-[0.3em]">
              CALVILLO
            </h2>
          </div>
        </Reveal>

        <Reveal delay={0.1} direction="up" distance={32}>
          <h3 className="text-display-md text-white mb-8">
            SUELO, AGUA Y ACTIVIDAD GANADERA
          </h3>
        </Reveal>

        <Reveal delay={0.2} direction="up" distance={32}>
          <p className="text-body-lg text-white/80 leading-relaxed font-light mb-8 max-w-3xl mx-auto">
            Los proyectos 12 y 13 cambian la escala estatal por una lectura localizada en Calvillo. La degradación del suelo y la organización de subcuencas y ríos se presentan como componentes territoriales vinculados con una propuesta de manejo ganadero.
          </p>
          <p className="text-body text-white/50 leading-relaxed font-light max-w-2xl mx-auto">
            La cartografía permite observar dos dimensiones distintas del mismo territorio: la condición física del suelo y la estructura superficial del agua.
          </p>
        </Reveal>

      </div>

      {/* CRÉDITO FOTOGRÁFICO EN LA ESQUINA INFERIOR */}
      <div className="absolute bottom-8 right-8 z-20">
        <div className="text-mono text-[10px] text-white/30 tracking-widest text-right backdrop-blur-sm bg-black/20 px-3 py-1 rounded">
          CALVILLO, AGUASCALIENTES: MI PUEBLO NATAL<br/>
          FOTOGRAFÍA: NÉSTOR ELIHU ARRIAGA GALLEGOS
        </div>
      </div>

    </section>
  );
}
