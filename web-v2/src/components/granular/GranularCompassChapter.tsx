"use client";

import { useState } from "react";
import { granularFoundation } from "@/content/cases/granular/granular-foundation";
import Image from "next/image";

export default function GranularCompassChapter() {
  const { chapter01 } = granularFoundation;
  const [activeDimId, setActiveDimId] = useState<string | null>(null);

  const activeDim = activeDimId ? chapter01.dimensions.find(d => d.id === activeDimId) : null;

  return (
    <section id="rural-diversity-compass" className="w-full py-24 md:py-32 flex flex-col gap-16 border-b border-white/10">
      
      {/* HEADER */}
      <div className="flex flex-col gap-4 max-w-3xl">
        <h2 className="text-display-md text-white">{chapter01.title}</h2>
        <p className="text-body text-white/70 text-lg">{chapter01.subtitle}</p>
        <div className="bg-yellow-900/10 border border-yellow-500/20 p-4 rounded text-sm text-yellow-500/80 mt-4">
          {chapter01.disclaimer}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mt-8">
        
        {/* COMPASS VISUAL / LIST */}
        <div className="flex flex-col gap-8">
          <div className="relative aspect-square w-full max-w-md mx-auto bg-white/5 border border-white/10 rounded-full flex items-center justify-center overflow-hidden p-8">
             {/* Using a preview of the macro page 21 since we don't have the isolated compass SVG yet */}
             <div className="absolute inset-0 opacity-20 mix-blend-screen pointer-events-none">
                <Image src="/portfolio-media/audit/block-15/page-21-audit.png" alt="Compass contextual" fill className="object-cover" unoptimized />
             </div>
             
             {/* Interactive Dimension List (Fallback for Compass Radar) */}
             <div className="relative z-10 w-full flex flex-col gap-2">
                {chapter01.dimensions.map((dim) => {
                  const isActive = activeDimId === dim.id;
                  return (
                    <button
                      key={dim.id}
                      onClick={() => setActiveDimId(isActive ? null : dim.id)}
                      className={`w-full flex items-center justify-between p-3 md:p-4 rounded transition-all duration-300 ${isActive ? 'bg-white/10 border-l-2' : 'hover:bg-white/5 border-l-2 border-transparent'}`}
                      style={{ borderLeftColor: isActive ? dim.colorVar : 'transparent' }}
                      aria-current={isActive ? "true" : undefined}
                    >
                      <div className="flex items-center gap-4">
                        <span className="text-mono text-[10px] text-white/40">{dim.number}</span>
                        <span className={`text-sm md:text-base font-medium tracking-wide ${isActive ? 'text-white' : 'text-white/60'}`}>
                          {dim.name}
                        </span>
                      </div>
                      <div 
                        className={`w-2 h-2 rounded-full transition-opacity ${isActive ? 'opacity-100' : 'opacity-0'}`} 
                        style={{ backgroundColor: dim.colorVar }} 
                      />
                    </button>
                  );
                })}
             </div>
          </div>
          <div className="text-center text-mono text-[9px] text-white/30 uppercase tracking-widest">
            Selecciona una dimensión para explorar su definición
          </div>
        </div>

        {/* DIMENSION DESCRIPTION */}
        <div className="bg-white/5 border border-white/10 rounded-[var(--radius-panel)] p-8 min-h-[300px] flex flex-col justify-center transition-colors duration-500"
             style={{ 
               backgroundColor: activeDim ? `color-mix(in srgb, ${activeDim.colorVar} 5%, rgba(255,255,255,0.05))` : undefined,
               borderColor: activeDim ? `color-mix(in srgb, ${activeDim.colorVar} 20%, rgba(255,255,255,0.1))` : undefined,
             }}>
          
          {activeDim ? (
            <div className="flex flex-col gap-6 animate-fade-in">
              <div className="flex items-center gap-4">
                <span className="text-display-sm" style={{ color: activeDim.colorVar }}>{activeDim.number}</span>
                <h3 className="text-display-xs text-white">{activeDim.name}</h3>
              </div>
              
              <p className="text-body text-white/80 text-lg">
                {activeDim.desc}
              </p>
              
              <div className="mt-8 pt-6 border-t border-white/10">
                <div className="text-mono text-[10px] text-white/40 uppercase tracking-widest mb-2">Estado del Capítulo</div>
                <div className="inline-block px-3 py-1.5 rounded text-mono text-[9px] uppercase tracking-widest bg-white/10 text-white/50">
                  En Desarrollo
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center text-center gap-4 opacity-50">
              <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center">
                <span className="text-white/40 text-xl">↗</span>
              </div>
              <p className="text-body text-white/60">
                Explora las seis dimensiones que organizan<br/>el análisis territorial de GRANULAR.
              </p>
            </div>
          )}

        </div>

      </div>
      
    </section>
  );
}
