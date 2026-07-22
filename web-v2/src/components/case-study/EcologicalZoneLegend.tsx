"use client";

import { useState } from 'react';
import Image from 'next/image';
import Reveal from '../home/motion/Reveal';

interface Zone {
  id: string;
  name: string;
  color: string;
  description: string;
}

export default function EcologicalZoneLegend({ zones, legendImage }: { zones: Zone[], legendImage: string }) {
  const [activeId, setActiveId] = useState<string | null>(null);

  const activeZone = zones.find(z => z.id === activeId);

  return (
    <section className="w-full bg-[#050505] py-32 border-t border-white/10">
      <div className="max-w-6xl mx-auto px-6 md:px-12 flex flex-col lg:flex-row gap-16 items-start">
        
        {/* IMAGEN DE LA LEYENDA ORIGINAL */}
        <div className="w-full lg:w-1/3">
          <Reveal direction="up">
            <h2 className="text-display-md text-white mb-8">LEYENDA CARTOGRÁFICA</h2>
            <div className="relative w-full aspect-[4/3] rounded-[var(--radius-sm)] border border-white/10 overflow-hidden bg-white/5 p-4 flex items-center justify-center">
              <Image 
                src={legendImage} 
                alt="Leyenda original de unidades ecológicas" 
                fill 
                className="object-contain saturate-50 hover:saturate-100 transition-all duration-500" 
                unoptimized 
              />
            </div>
            <div className="text-mono text-[10px] text-white/40 mt-4 uppercase tracking-widest">
              Extracto de la página 14.
            </div>
          </Reveal>
        </div>

        {/* SELECTOR INTERACTIVO Y EXPLICACIÓN */}
        <div className="w-full lg:w-2/3 flex flex-col md:flex-row gap-8">
          
          <div className="w-full md:w-1/2 flex flex-col gap-2">
            <div className="text-mono text-[10px] text-[var(--color-accent)] uppercase tracking-widest mb-4">SELECCIONA UNA UNIDAD</div>
            {zones.map(zone => {
              const isActive = zone.id === activeId;
              return (
                <button
                  key={zone.id}
                  onClick={() => setActiveId(isActive ? null : zone.id)}
                  className={`flex items-center gap-4 text-left p-3 rounded-[var(--radius-sm)] transition-colors border ${
                    isActive ? 'bg-white/10 border-white/20' : 'bg-transparent border-transparent hover:bg-white/5'
                  }`}
                  aria-selected={isActive}
                >
                  <div className="w-4 h-4 shrink-0 rounded-full border border-white/20" style={{ backgroundColor: zone.color }}></div>
                  <span className={`text-label ${isActive ? 'text-white' : 'text-white/60'}`}>{zone.name}</span>
                </button>
              );
            })}
          </div>

          <div className="w-full md:w-1/2 bg-white/5 border border-white/10 rounded-[var(--radius-panel)] p-8 flex flex-col justify-center min-h-[300px]">
            {activeZone ? (
              <Reveal direction="up" key={activeZone.id}>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-8 h-8 rounded-full" style={{ backgroundColor: activeZone.color }}></div>
                  <div className="text-mono text-[10px] text-white/50">UNIDAD {activeZone.id}</div>
                </div>
                <h3 className="text-display-sm text-white mb-4" style={{ color: activeZone.color }}>{activeZone.name}</h3>
                <p className="text-body text-white/70">{activeZone.description}</p>
              </Reveal>
            ) : (
              <div className="text-center">
                <div className="w-12 h-12 rounded-full border border-white/10 mx-auto mb-4 flex items-center justify-center opacity-50 text-white/30 text-xl">+</div>
                <p className="text-label text-white/40">Selecciona una unidad de la lista para leer su descripción prudente.</p>
              </div>
            )}
            
            <div className="mt-auto pt-8 border-t border-white/10">
              <p className="text-[10px] text-mono text-white/30">NOTA: No se detallan parámetros climáticos numéricos, especies ni restricciones legales porque no constan explícitamente en el portafolio original.</p>
            </div>
          </div>
          
        </div>

      </div>
    </section>
  );
}
