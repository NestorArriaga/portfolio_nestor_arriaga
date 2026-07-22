"use client";

import { useState } from "react";
import Image from "next/image";
import { granularClustering } from "@/content/cases/granular/granular-clustering";
import ImageViewer from "@/components/case-study/ImageViewer";
import { useSafeMode } from "@/components/home/motion/SafeModeContext";

export default function GranularMunicipalTypologyExplorer() {
  const { typologies, spatialization } = granularClustering;
  const [activeClass, setActiveClass] = useState<string | null>(null);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const safeMode = useSafeMode();

  return (
    <section id="tres-tipologias" className="w-full py-24 md:py-32 flex flex-col gap-12 border-b border-white/10">
      
      <div className="flex flex-col gap-4 max-w-3xl px-6 md:px-12">
        <h3 className="text-display-md text-white">
          <span className="block text-white/80">{typologies.title}</span>
        </h3>
      </div>

      <div id="espacializacion-municipal" className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start px-6 md:px-12">
        
        {/* SELECTOR DE CLASES */}
        <div className="lg:col-span-5 flex flex-col gap-4 order-2 lg:order-1">
          <div className="flex flex-col gap-4" role="tablist">
            {typologies.classes.map((cls) => {
              const isActive = activeClass === cls.id;
              
              // Map source colors to hex for UI
              let colorHex = "#3b82f6"; // Blue
              if (cls.color === "AMARILLO") colorHex = "#fbbf24";
              if (cls.color === "ROSA") colorHex = "#ec4899";

              if (safeMode) {
                return (
                  <div key={cls.id} className="p-4 border border-white/10 bg-[#111] rounded-[var(--radius-panel)]">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="w-3 h-3 rounded-full" style={{ backgroundColor: colorHex }} />
                      <span className="text-mono text-[11px] text-white uppercase tracking-widest">{cls.name}</span>
                    </div>
                    <p className="text-sm text-white/70 mb-3">{cls.desc}</p>
                    <div className="flex flex-col gap-1">
                       <span className="text-mono text-[9px] text-white/40 uppercase tracking-widest mb-1">Variantes de la fuente:</span>
                       {cls.variants.map((v, i) => (
                         <span key={i} className="text-xs text-white/50 italic">- &quot;{v}&quot;</span>
                       ))}
                    </div>
                  </div>
                );
              }

              return (
                <button
                  key={cls.id}
                  onClick={() => setActiveClass(isActive ? null : cls.id)}
                  role="tab"
                  aria-current={isActive ? "true" : undefined}
                  className={`w-full text-left p-6 rounded-[var(--radius-panel)] transition-all duration-300 border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 ${isActive ? 'bg-white/5 border-white/20' : 'bg-transparent border-white/5 hover:bg-white/5'}`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span className="w-2.5 h-2.5 rounded-full transition-transform duration-300" style={{ backgroundColor: colorHex, transform: isActive ? 'scale(1.2)' : 'scale(1)' }} />
                    <span className={`text-mono text-[11px] uppercase tracking-widest transition-colors ${isActive ? 'text-white' : 'text-white/60'}`}>
                      {cls.name}
                    </span>
                  </div>
                  
                  <div className={`overflow-hidden transition-all duration-500 ${isActive ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'}`}>
                    <p className="text-sm text-white/80 leading-relaxed mb-4">
                      {cls.desc}
                    </p>
                    <div className="flex flex-col gap-2 pt-3 border-t border-white/10">
                       <span className="text-mono text-[9px] text-white/40 uppercase tracking-widest">Variantes terminológicas en el texto:</span>
                       {cls.variants.map((v, i) => (
                         <span key={i} className="text-xs text-white/60 border-l border-white/10 pl-2">&quot;{v}&quot;</span>
                       ))}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* MAPA Y VISOR */}
        <div className="lg:col-span-7 flex flex-col gap-4 order-1 lg:order-2">
          <button 
            onClick={() => setIsViewerOpen(true)}
            className="w-full relative aspect-[4/3] md:aspect-square lg:aspect-[4/3] rounded-[var(--radius-panel)] overflow-hidden border border-white/10 group bg-[#0A0A0A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
            aria-label="Abrir mapa de clasificación municipal"
          >
            <Image
              src="/portfolio-media/audit/block-21/page-37-municipal-results-audit.png" // Fallback to audit
              alt={spatialization.caption}
              fill
              className="object-contain transition-transform duration-700 group-hover:scale-[1.02]"
              unoptimized
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
               <div className="opacity-0 group-hover:opacity-100 bg-black/80 text-white text-mono text-[10px] uppercase tracking-widest px-4 py-2 rounded-full border border-white/20 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0">
                 Ampliar clasificación
               </div>
            </div>
          </button>
          
          <div className="flex flex-col gap-2 px-2">
            <p className="text-body text-sm text-white/70">
              {spatialization.caption}
            </p>
            <p className="text-xs text-white/40 italic">
              {spatialization.text1}
            </p>
            <div className="mt-2 p-2 bg-amber-500/5 border-l-2 border-amber-500/50">
               <p className="text-xs text-amber-500/80 leading-relaxed">{spatialization.sourceNote}</p>
            </div>
          </div>
        </div>

      </div>

      <ImageViewer 
        isOpen={isViewerOpen}
        onClose={() => setIsViewerOpen(false)}
        highResSrc="/portfolio-media/audit/block-21/page-37-municipal-results-audit.png"
        altText="Clasificación municipal de la Comarca Lagunera"
      />
    </section>
  );
}
