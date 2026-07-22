"use client";

import { useState } from "react";
import Image from "next/image";
import { granularAgriculture } from "@/content/cases/granular/granular-agriculture";
import ImageViewer from "@/components/case-study/ImageViewer";
import { useSafeMode } from "@/components/home/motion/SafeModeContext";

export default function GranularIrrigationRainfedComparison() {
  const { irrigationRainfed } = granularAgriculture;
  const [activeTab, setActiveTab] = useState<"irrigation" | "rainfed">("irrigation");
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const safeMode = useSafeMode();

  return (
    <section id="riego-temporal" className="w-full py-24 md:py-32 flex flex-col gap-12 border-b border-white/10">
      
      <div className="flex flex-col gap-4 max-w-3xl px-6 md:px-0">
        <h3 className="text-display-md text-white">
          <span className="block text-white/80">{irrigationRainfed.title}</span>
          <span className="block text-[var(--granular-dim-agriculture)]">{irrigationRainfed.subtitle}</span>
        </h3>
        <p className="text-mono text-[10px] text-white/40 uppercase tracking-widest">
          PÁGINA {irrigationRainfed.sourcePage}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        
        {/* SELECTOR */}
        <div className="lg:col-span-5 flex flex-col gap-6 px-6 md:px-0 order-2 lg:order-1">
          
          <div className="flex flex-col gap-4" role="tablist" aria-label="Selector de modalidad agrícola">
            
            {/* TAB RIEGO */}
            <button
              onClick={() => setActiveTab("irrigation")}
              role="tab"
              aria-selected={activeTab === "irrigation"}
              className={`w-full text-left p-6 rounded-[var(--radius-panel)] transition-all duration-300 border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--granular-dim-agriculture)] ${activeTab === "irrigation" ? 'bg-white/10 border-white/20' : 'bg-transparent border-white/5 hover:bg-white/5'}`}
            >
              <div className="flex flex-col gap-2 mb-4">
                 <span className={`text-mono text-[10px] uppercase tracking-widest transition-colors ${activeTab === "irrigation" ? 'text-white' : 'text-white/50'}`}>
                   {irrigationRainfed.irrigation.label}
                 </span>
                 <span className={`text-display-lg transition-colors ${activeTab === "irrigation" ? 'text-[var(--granular-dim-agriculture)]' : 'text-white/80'}`}>
                   {irrigationRainfed.irrigation.value}
                 </span>
                 <span className="text-mono text-[8px] text-white/30 tracking-widest">
                   {irrigationRainfed.irrigation.note}
                 </span>
              </div>
              
              <div className={`overflow-hidden transition-all duration-500 flex flex-col gap-2 ${activeTab === "irrigation" || safeMode ? 'max-h-64 opacity-100 mt-4' : 'max-h-0 opacity-0'}`}>
                <span className="text-mono text-[9px] text-white/50 uppercase tracking-widest">
                   {irrigationRainfed.irrigation.examplesLabel}
                </span>
                <p className="text-sm text-white/80 border-l-2 border-[var(--granular-dim-agriculture)]/50 pl-3">
                   {irrigationRainfed.irrigation.examples}
                </p>
              </div>
            </button>

            {/* TAB TEMPORAL */}
            <button
              onClick={() => setActiveTab("rainfed")}
              role="tab"
              aria-selected={activeTab === "rainfed"}
              className={`w-full text-left p-6 rounded-[var(--radius-panel)] transition-all duration-300 border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--granular-dim-agriculture)] ${activeTab === "rainfed" ? 'bg-white/10 border-white/20' : 'bg-transparent border-white/5 hover:bg-white/5'}`}
            >
              <div className="flex flex-col gap-2 mb-4">
                 <span className={`text-mono text-[10px] uppercase tracking-widest transition-colors ${activeTab === "rainfed" ? 'text-white' : 'text-white/50'}`}>
                   {irrigationRainfed.rainfed.label}
                 </span>
                 <span className={`text-display-lg transition-colors ${activeTab === "rainfed" ? 'text-white' : 'text-white/80'}`}>
                   {irrigationRainfed.rainfed.value}
                 </span>
                 <span className="text-mono text-[8px] text-white/30 tracking-widest">
                   {irrigationRainfed.rainfed.note}
                 </span>
              </div>
              
              <div className={`overflow-hidden transition-all duration-500 flex flex-col gap-2 ${activeTab === "rainfed" || safeMode ? 'max-h-64 opacity-100 mt-4' : 'max-h-0 opacity-0'}`}>
                <span className="text-mono text-[9px] text-white/50 uppercase tracking-widest">
                   {irrigationRainfed.rainfed.examplesLabel}
                </span>
                <p className="text-sm text-white/80 border-l-2 border-white/30 pl-3">
                   {irrigationRainfed.rainfed.examples}
                </p>
                <div className="mt-2 text-xs text-amber-500/80 bg-amber-500/5 p-2 rounded">
                  La página utiliza la formulación Simón Bolívar; otros registros territoriales pueden emplear General Simón Bolívar.
                </div>
              </div>
            </button>

          </div>

        </div>

        {/* MAPA Y VISOR */}
        <div className="lg:col-span-7 flex flex-col gap-4 order-1 lg:order-2 px-6 md:px-0">
          <button 
            onClick={() => setIsViewerOpen(true)}
            className="w-full relative aspect-[4/3] md:aspect-square lg:aspect-[4/3] rounded-[var(--radius-panel)] overflow-hidden border border-white/10 group bg-[#0A0A0A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--granular-dim-agriculture)] focus-visible:ring-offset-4 focus-visible:ring-offset-[#050505]"
            aria-label="Abrir mapa de riego y temporal en visor completo"
          >
            <Image
              src="/portfolio-media/audit/block-18/page-26-irrigation-rainfed-audit.png" // Fallback to audit
              alt={irrigationRainfed.caption}
              fill
              className="object-contain transition-transform duration-700 group-hover:scale-[1.02]"
              unoptimized
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
               <div className="opacity-0 group-hover:opacity-100 bg-black/80 text-white text-mono text-[10px] uppercase tracking-widest px-4 py-2 rounded-full border border-white/20 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0">
                 Ampliar figura
               </div>
            </div>
          </button>
          
          <div className="flex flex-col gap-2 px-2">
            <p className="text-body text-sm text-white/70">
              {irrigationRainfed.caption}
            </p>
          </div>
        </div>

      </div>

      <ImageViewer 
        isOpen={isViewerOpen}
        onClose={() => setIsViewerOpen(false)}
        highResSrc="/portfolio-media/audit/block-18/page-26-irrigation-rainfed-audit.png"
        altText={irrigationRainfed.caption}
      />
    </section>
  );
}
