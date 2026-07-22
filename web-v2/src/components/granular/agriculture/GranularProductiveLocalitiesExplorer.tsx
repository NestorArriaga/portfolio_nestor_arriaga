"use client";

import { useState } from "react";
import Image from "next/image";
import { granularAgriculture } from "@/content/cases/granular/granular-agriculture";
import ImageViewer from "@/components/case-study/ImageViewer";
import { useSafeMode } from "@/components/home/motion/SafeModeContext";

export default function GranularProductiveLocalitiesExplorer() {
  const { productiveLocalities } = granularAgriculture;
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const safeMode = useSafeMode();

  return (
    <section id="localidades-agroproductivas" className="w-full py-24 md:py-32 flex flex-col gap-12 border-b border-white/10">
      
      <div className="flex flex-col gap-4 max-w-3xl px-6 md:px-0">
        <h3 className="text-display-md text-white">
          <span className="block text-white/80">{productiveLocalities.title}</span>
          <span className="block text-[var(--granular-dim-agriculture)]">{productiveLocalities.subtitle}</span>
        </h3>
        <p className="text-mono text-[10px] text-white/40 uppercase tracking-widest">
          PÁGINA {productiveLocalities.sourcePage}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        
        {/* MAPA Y VISOR */}
        <div className="lg:col-span-7 flex flex-col gap-4 px-6 md:px-0">
          <button 
            onClick={() => setIsViewerOpen(true)}
            className="w-full relative aspect-[4/3] md:aspect-square lg:aspect-[4/3] rounded-[var(--radius-panel)] overflow-hidden border border-white/10 group bg-[#0A0A0A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--granular-dim-agriculture)] focus-visible:ring-offset-4 focus-visible:ring-offset-[#050505]"
            aria-label="Abrir mapa de localidades agroproductivas"
          >
            <Image
              src="/portfolio-media/audit/block-18/page-29-localities-audit.png" // Fallback
              alt={productiveLocalities.caption}
              fill
              className="object-contain transition-transform duration-700 group-hover:scale-[1.02]"
              unoptimized
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
               <div className="opacity-0 group-hover:opacity-100 bg-black/80 text-white text-mono text-[10px] uppercase tracking-widest px-4 py-2 rounded-full border border-white/20 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0">
                 Ampliar mapa
               </div>
            </div>
          </button>
          
          <div className="flex flex-col gap-2 px-2">
            <p className="text-body text-sm text-white/70">
              {productiveLocalities.caption}
            </p>
          </div>
        </div>

        {/* SELECTOR DE LOCALIDADES */}
        <div className="lg:col-span-5 flex flex-col gap-6 px-6 md:px-0">
          
          <div className="p-4 bg-white/5 border border-white/10 rounded-[var(--radius-panel)]">
            <p className="text-xs text-white/70 leading-relaxed">
              {productiveLocalities.introText}
            </p>
          </div>

          <div className="text-mono text-[10px] text-white/50 uppercase tracking-widest mt-2 mb-2">
            Niveles Productivos
          </div>

          <div className="flex flex-col gap-4" role="tablist">
            {productiveLocalities.classes.map((cat) => {
              const isActive = activeCategory === cat.id;
              
              if (safeMode) {
                return (
                  <div key={cat.id} className="p-4 border border-white/10 bg-[#111] rounded-[var(--radius-panel)]">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="w-3 h-3 rounded-full" style={{ backgroundColor: cat.color }} />
                      <span className="text-mono text-[11px] text-white uppercase tracking-widest">{cat.name}</span>
                    </div>
                    <p className="text-sm text-white/70 mb-3">{cat.desc}</p>
                    {cat.zones && <p className="text-xs text-white/50"><span className="text-white/80">Zonas:</span> {cat.zones}</p>}
                    {cat.examples && <p className="text-xs text-white/50 mt-1"><span className="text-white/80">Ejemplos:</span> {cat.examples}</p>}
                  </div>
                );
              }

              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(isActive ? null : cat.id)}
                  role="tab"
                  aria-current={isActive ? "true" : undefined}
                  className={`w-full text-left p-4 rounded-[var(--radius-panel)] transition-all duration-300 border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--granular-dim-agriculture)] ${isActive ? 'bg-white/10 border-white/20' : 'bg-transparent border-white/5 hover:bg-white/5'}`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span 
                      className="w-3 h-3 rounded-full transition-all duration-300" 
                      style={{ 
                        backgroundColor: cat.color,
                        boxShadow: isActive ? `0 0 12px ${cat.color}60` : 'none'
                      }} 
                    />
                    <span className={`text-mono text-[11px] uppercase tracking-widest transition-colors ${isActive ? 'text-white' : 'text-white/60'}`}>
                      {cat.name}
                    </span>
                  </div>
                  
                  <div className={`overflow-hidden transition-all duration-500 ${isActive ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'}`}>
                    <p className="text-sm text-white/80 mb-3">{cat.desc}</p>
                    {cat.zones && <p className="text-xs text-white/50 border-l border-white/10 pl-2 mb-2"><span className="text-white/80">Zonas:</span> {cat.zones}</p>}
                    {cat.examples && <p className="text-xs text-white/50 border-l border-white/10 pl-2"><span className="text-white/80">Ejemplos:</span> {cat.examples}</p>}
                  </div>
                </button>
              );
            })}
          </div>

        </div>

      </div>

      {/* CONCENTRACIÓN EN EL CORREDOR CENTRAL */}
      <div className="mt-8 px-6 md:px-0">
         <div className="max-w-4xl flex flex-col gap-6 p-6 md:p-8 bg-[#111] border border-white/5 rounded-[var(--radius-panel)]">
            <h4 className="text-display-sm text-[var(--granular-dim-agriculture)]">
              {productiveLocalities.concentrationText}
            </h4>
            <p className="text-sm md:text-base text-white/80 leading-relaxed">
              {productiveLocalities.concentrationInterpretation}
            </p>
         </div>
      </div>

      <ImageViewer 
        isOpen={isViewerOpen}
        onClose={() => setIsViewerOpen(false)}
        highResSrc="/portfolio-media/audit/block-18/page-29-localities-audit.png"
        altText={productiveLocalities.caption}
      />
    </section>
  );
}
