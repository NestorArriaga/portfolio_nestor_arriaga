"use client";

import { useState } from "react";
import Image from "next/image";
import { granularWater } from "@/content/cases/granular/granular-water";
import ImageViewer from "@/components/case-study/ImageViewer";
import { useSafeMode } from "@/components/home/motion/SafeModeContext";

export default function GranularWaterQualityExplorer() {
  const { qualitySection, qualityCategories } = granularWater;
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const safeMode = useSafeMode();

  return (
    <section id="calidad-del-agua" className="w-full py-24 md:py-32 flex flex-col gap-12 border-b border-white/10">
      
      <div className="flex flex-col gap-4 max-w-3xl px-6 md:px-0">
        <h3 className="text-display-md text-white">
          <span className="block text-white/80">{qualitySection.title}</span>
          <span className="block text-[var(--granular-dim-water)]">{qualitySection.subtitle}</span>
        </h3>
        <p className="text-mono text-[10px] text-white/40 uppercase tracking-widest">
          PÁGINA {qualitySection.sourcePage}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        
        {/* MAPA Y VISOR */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          <button 
            onClick={() => setIsViewerOpen(true)}
            className="w-full relative aspect-[4/3] md:aspect-square lg:aspect-[4/3] rounded-[var(--radius-panel)] overflow-hidden border border-white/10 group bg-[#0A0A0A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--granular-dim-water)] focus-visible:ring-offset-4 focus-visible:ring-offset-[#050505]"
            aria-label="Abrir mapa de calidad del agua en visor completo"
          >
            <Image
              src="/portfolio-media/audit/block-17/page-23-water-quality-audit.png" // Fallback to audit image for now
              alt={qualitySection.caption}
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
              {qualitySection.caption}
            </p>
            <p className="text-mono text-[9px] text-white/40">
              {qualitySection.sourceNote}
            </p>
          </div>
        </div>

        {/* SELECTOR DE SEVERIDAD */}
        <div className="lg:col-span-5 flex flex-col gap-6 px-6 md:px-0">
          <div className="text-mono text-[10px] text-white/50 uppercase tracking-widest mb-2">
            Niveles de severidad mencionados
          </div>

          <div className="flex flex-col gap-4" role="tablist">
            {qualityCategories.map((cat) => {
              const isActive = activeCategory === cat.id;
              
              if (safeMode) {
                return (
                  <div key={cat.id} className="p-4 border border-white/10 bg-[#111] rounded-[var(--radius-panel)]">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="w-3 h-3 rounded-full" style={{ backgroundColor: cat.color }} />
                      <span className="text-mono text-[11px] text-white uppercase tracking-widest">{cat.name}</span>
                    </div>
                    <p className="text-sm text-white/70">{cat.desc}</p>
                    {cat.warning && (
                      <p className="mt-3 text-xs text-amber-500/90 border-l-2 border-amber-500/50 pl-3">{cat.warning}</p>
                    )}
                  </div>
                );
              }

              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(isActive ? null : cat.id)}
                  role="tab"
                  aria-current={isActive ? "true" : undefined}
                  className={`w-full text-left p-4 rounded-[var(--radius-panel)] transition-all duration-300 border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--granular-dim-water)] ${isActive ? 'bg-white/10 border-white/20' : 'bg-transparent border-white/5 hover:bg-white/5'}`}
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
                  
                  <div className={`overflow-hidden transition-all duration-500 ${isActive ? 'max-h-64 opacity-100 mt-4' : 'max-h-0 opacity-0'}`}>
                    <p className="text-sm text-white/80">{cat.desc}</p>
                    {cat.warning && (
                      <p className="mt-4 text-xs text-amber-500/90 border-l-2 border-amber-500/50 pl-3 bg-amber-500/5 py-2 pr-2">
                        {cat.warning}
                      </p>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          <div className="mt-8 p-6 bg-[var(--granular-dim-water)]/5 border border-[var(--granular-dim-water)]/20 rounded-[var(--radius-panel)]">
            <h4 className="text-mono text-[10px] text-[var(--granular-dim-water)] uppercase tracking-widest mb-3">
              LECTURA DE LA FRANJA CENTRAL
            </h4>
            <p className="text-sm text-white/80">
              {qualitySection.centralStripNote}
            </p>
          </div>

        </div>
      </div>

      <ImageViewer 
        isOpen={isViewerOpen}
        onClose={() => setIsViewerOpen(false)}
        highResSrc="/portfolio-media/audit/block-17/page-23-water-quality-audit.png"
        altText={qualitySection.caption}
      />
    </section>
  );
}
