"use client";

import { useState } from 'react';
import Image from 'next/image';
import Reveal from '../home/motion/Reveal';

interface Interval {
  id: string;
  range: string;
  name: string;
  color: string;
  description: string;
}

export default function SlopeIntervalExplorer({ intervals, legendImage }: { intervals: Interval[], legendImage: string }) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const activeInterval = intervals.find(i => i.id === activeId);

  return (
    <section className="w-full bg-[#050505] py-32 border-t border-white/10">
      <div className="max-w-6xl mx-auto px-6 md:px-12 flex flex-col lg:flex-row gap-16 items-start">
        
        {/* LEYENDA ORIGINAL */}
        <div className="w-full lg:w-1/3">
          <Reveal direction="up">
            <h2 className="text-display-md text-white mb-8">CUATRO INTERVALOS</h2>
            <div className="relative w-full aspect-[4/3] rounded-[var(--radius-sm)] border border-white/10 overflow-hidden bg-white/5 p-4 flex items-center justify-center">
              <Image 
                src={legendImage} 
                alt="Leyenda original de pendiente en cuatro intervalos" 
                fill 
                className="object-contain hover:scale-105 transition-transform duration-500" 
                unoptimized 
              />
            </div>
            <div className="text-mono text-[10px] text-white/40 mt-4 uppercase tracking-widest">
              Extracto de la página 15.
            </div>
          </Reveal>
        </div>

        {/* SELECTOR INTERACTIVO Y EXPLICACIÓN */}
        <div className="w-full lg:w-2/3 flex flex-col md:flex-row gap-8">
          
          <div className="w-full md:w-1/2 flex flex-col gap-2">
            <div className="text-mono text-[10px] text-[var(--color-accent)] uppercase tracking-widest mb-4">SELECCIONA UN INTERVALO</div>
            {intervals.map(interval => {
              const isActive = interval.id === activeId;
              return (
                <button
                  key={interval.id}
                  onClick={() => setActiveId(isActive ? null : interval.id)}
                  className={`flex items-center gap-4 text-left p-3 rounded-[var(--radius-sm)] transition-colors border ${
                    isActive ? 'bg-white/10 border-white/20' : 'bg-transparent border-transparent hover:bg-white/5'
                  }`}
                  aria-selected={isActive}
                >
                  <div className="w-4 h-4 shrink-0 rounded-full border border-white/20" style={{ backgroundColor: interval.color }}></div>
                  <div className="flex flex-col">
                    <span className={`text-label ${isActive ? 'text-white' : 'text-white/60'}`}>{interval.name}</span>
                    <span className={`text-mono text-[12px] font-bold ${isActive ? 'text-[var(--color-accent)]' : 'text-white/40'}`}>{interval.range}</span>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="w-full md:w-1/2 bg-white/5 border border-white/10 rounded-[var(--radius-panel)] p-8 flex flex-col justify-center min-h-[300px]">
            {activeInterval ? (
              <Reveal direction="up" key={activeInterval.id}>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-8 h-8 rounded-full shadow-[0_0_15px_rgba(255,255,255,0.2)]" style={{ backgroundColor: activeInterval.color }}></div>
                  <div className="text-mono text-[10px] text-white/50">SELECCIÓN ACTIVA</div>
                </div>
                <h3 className="text-display-xl tracking-tighter text-white mb-2" style={{ color: activeInterval.color }}>{activeInterval.range}</h3>
                <p className="text-body text-white/70">{activeInterval.description}</p>
              </Reveal>
            ) : (
              <div className="text-center">
                <div className="w-12 h-12 rounded-full border border-white/10 mx-auto mb-4 flex items-center justify-center opacity-50 text-white/30 text-xl">+</div>
                <p className="text-label text-white/40">Selecciona un rango de pendiente de la lista.</p>
              </div>
            )}
            
            <div className="mt-auto pt-8 border-t border-white/10">
              <p className="text-[10px] text-mono text-white/30">NOTA: No se detallan superficies ni algoritmos de reclasificación porque no constan explícitamente en el portafolio original.</p>
            </div>
          </div>
          
        </div>

      </div>
    </section>
  );
}
