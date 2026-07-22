"use client";

import { useState } from "react";
import { granularFoundation } from "@/content/cases/granular/granular-foundation";
import Image from "next/image";

export default function GranularScalesChapter() {
  const { chapter02 } = granularFoundation;
  const [activeScaleId, setActiveScaleId] = useState<string>("municipal");

  // Map scales to visual assets (using previews from block 15 audit)
  const scaleVisuals: Record<string, string> = {
    regional: "/portfolio-media/audit/block-15/page-24-audit.png", // Example regional map
    municipal: "/portfolio-media/audit/block-15/page-37-audit.png", // Example municipal map
    localidad: "/portfolio-media/audit/block-15/page-29-audit.png" // Example locality map
  };

  const activeScale = chapter02.scales.find(s => s.id === activeScaleId);

  return (
    <section id="escalas" className="w-full py-24 md:py-32 flex flex-col gap-16 border-b border-white/10">
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        
        {/* TEXT CONTENT */}
        <div className="lg:col-span-5 flex flex-col gap-8 order-2 lg:order-1">
          <h2 className="text-display-md text-white max-w-sm">
            {chapter02.title}
          </h2>
          
          <div className="text-body text-white/70 text-lg flex flex-col gap-6">
            <p>{chapter02.text1}</p>
            <p>{chapter02.text2}</p>
            <p className="text-white/90 font-medium">{chapter02.text3}</p>
          </div>

          <div className="flex flex-col gap-4 mt-8">
            {chapter02.scales.map(scale => {
              const isActive = activeScaleId === scale.id;
              return (
                <button
                  key={scale.id}
                  onClick={() => setActiveScaleId(scale.id)}
                  className={`flex flex-col items-start p-4 md:p-5 rounded transition-all duration-300 text-left border ${isActive ? 'bg-white/10 border-white/20' : 'bg-transparent border-white/5 hover:bg-white/5'}`}
                  aria-current={isActive ? "true" : undefined}
                >
                  <div className={`text-mono text-[11px] uppercase tracking-widest mb-2 ${isActive ? 'text-[var(--granular-dim-water)]' : 'text-white/40'}`}>
                    Escala {scale.name}
                  </div>
                  <div className={`text-sm md:text-base ${isActive ? 'text-white/90' : 'text-white/50'}`}>
                    {scale.desc}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* VISUAL EXPLORER */}
        <div className="lg:col-span-7 order-1 lg:order-2">
          <div className="relative w-full aspect-[4/5] md:aspect-[16/9] lg:aspect-square bg-[#111] border border-white/10 rounded-[var(--radius-panel)] overflow-hidden">
            
            {chapter02.scales.map(scale => {
              const isActive = activeScaleId === scale.id;
              return (
                <div 
                  key={scale.id}
                  className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${isActive ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                >
                  <Image 
                    src={scaleVisuals[scale.id]} 
                    alt={`Representación de la escala ${scale.name}`}
                    fill
                    className="object-cover object-center md:object-top"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]/30" />
                  
                  {/* Etiqueta de contexto */}
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="inline-block bg-[#050505]/80 backdrop-blur border border-white/10 px-4 py-2 rounded text-mono text-[9px] text-white/50 uppercase tracking-widest">
                      Fragmento cartográfico referencial (Bloques Posteriores)
                    </div>
                  </div>
                </div>
              );
            })}
            
          </div>
        </div>
        
      </div>
      
    </section>
  );
}
