"use client";

import { useState } from 'react';
import Image from 'next/image';
import Reveal from '../home/motion/Reveal';

interface Pattern {
  id: string;
  name: string;
  description: string;
  imageSrc: string;
}

export default function PatternExplorer({ patterns }: { patterns: Pattern[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activePattern = patterns[activeIndex];

  return (
    <section className="w-full bg-[#050505] py-32 border-t border-white/10">
      <div className="max-w-6xl mx-auto px-6 md:px-12 flex flex-col md:flex-row gap-16 items-center">
        
        {/* SELECTOR / TEXTOS */}
        <div className="w-full md:w-1/2 flex flex-col order-2 md:order-1">
          <Reveal direction="up">
            <h2 className="text-display-md text-white mb-8">LOS TRES PATRONES</h2>
          </Reveal>
          
          <div className="flex flex-col gap-4 mb-12">
            {patterns.map((pattern, idx) => {
              const isActive = idx === activeIndex;
              return (
                <button
                  key={pattern.id}
                  onClick={() => setActiveIndex(idx)}
                  className={`text-left p-4 rounded-[var(--radius-sm)] border transition-all duration-300 ${isActive ? 'bg-[var(--color-accent)]/10 border-[var(--color-accent)]/50' : 'bg-transparent border-white/10 hover:border-white/30'}`}
                  aria-selected={isActive}
                >
                  <div className="flex items-center gap-4">
                    <span className={`text-mono text-[10px] ${isActive ? 'text-[var(--color-accent)]' : 'text-white/40'}`}>
                      {pattern.id}
                    </span>
                    <span className={`text-body font-bold uppercase tracking-wide ${isActive ? 'text-white' : 'text-white/60'}`}>
                      {pattern.name}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="min-h-[120px]">
            <p className="text-body-lg text-white/70 leading-relaxed font-light">
              {activePattern.description}
            </p>
          </div>
          
          <div className="text-label text-white/30 mt-8 pt-4 border-t border-white/10">
            Nota: Interpretación derivada del portafolio. No se comprueba actividad volcánica reciente ni se presentan parámetros de algoritmos.
          </div>
        </div>
        
        {/* VISUALIZADOR (RECORTES CIRCULARES) */}
        <div className="w-full md:w-1/2 order-1 md:order-2 flex justify-center">
          <Reveal direction="left" distance={32} className="relative w-full max-w-[400px] aspect-square rounded-full border border-[var(--color-accent)]/30 overflow-hidden shadow-[0_0_50px_rgba(255,255,255,0.02)]">
            {patterns.map((pattern, idx) => (
              <Image 
                key={pattern.id}
                src={pattern.imageSrc}
                alt={pattern.name}
                fill
                className={`object-cover transition-opacity duration-700 ease-in-out ${idx === activeIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-110 pointer-events-none'}`}
                unoptimized
              />
            ))}
            
            <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(5,5,5,0.8)] pointer-events-none rounded-full"></div>
            
            {/* Lupa UI */}
            <div className="absolute inset-0 border-[4px] border-[var(--color-accent)]/10 rounded-full pointer-events-none"></div>
            <div className="absolute inset-0 border border-white/10 rounded-full pointer-events-none scale-95"></div>
          </Reveal>
        </div>

      </div>
    </section>
  );
}
