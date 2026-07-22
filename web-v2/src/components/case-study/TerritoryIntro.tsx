"use client";

import Image from 'next/image';
import Reveal from '../home/motion/Reveal';

interface TerritoryIntroProps {
  territoryName: string;
  imageSrc: string;
  imageCredit: string;
  text: string;
}

export default function TerritoryIntro({ territoryName, imageSrc, imageCredit, text }: TerritoryIntroProps) {
  return (
    <section className="w-full relative overflow-hidden bg-[#050505]">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-32 flex flex-col md:flex-row items-center gap-16 relative z-10">
        
        {/* Foto Editorial */}
        <Reveal direction="up" distance={32} className="w-full md:w-1/2">
          <div className="relative aspect-[3/4] md:aspect-square w-full rounded-[var(--radius-panel)] overflow-hidden border border-white/10">
            <Image 
              src={imageSrc} 
              alt={`Fotografía de ${territoryName}`} 
              fill 
              className="object-cover saturate-50 contrast-125 hover:saturate-100 transition-all duration-1000"
              unoptimized 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/80 via-transparent to-transparent pointer-events-none"></div>
            
            {/* Crédito */}
            <div className="absolute bottom-6 left-6 right-6 text-mono text-[10px] text-white/50 uppercase tracking-widest flex justify-between">
              <span>{territoryName}</span>
              <span>Crédito: {imageCredit}</span>
            </div>
          </div>
        </Reveal>

        {/* Texto Contextual */}
        <div className="w-full md:w-1/2">
          <Reveal direction="up" delay={0.2} distance={16}>
            <h2 className="text-display-md text-white mb-8 tracking-tight">{territoryName.toUpperCase()}</h2>
            <div className="text-body-lg text-white/80 leading-relaxed font-light">
              {text}
            </div>
          </Reveal>
        </div>

      </div>
      
      {/* Fondo extendido y difuminado */}
      <div className="absolute top-0 right-0 w-[80%] h-full opacity-10 pointer-events-none z-0">
        <Image src={imageSrc} alt="" fill className="object-cover blur-[100px]" unoptimized />
      </div>
    </section>
  );
}
