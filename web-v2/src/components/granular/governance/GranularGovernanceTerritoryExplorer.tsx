"use client";

import { useState } from "react";
import Image from "next/image";
import { granularGovernance } from "@/content/cases/granular/granular-governance";
import ImageViewer from "@/components/case-study/ImageViewer";
import { useSafeMode } from "@/components/home/motion/SafeModeContext";

export default function GranularGovernanceTerritoryExplorer() {
  const { anpAndRtp, mapCaption } = granularGovernance;
  const [activeLayer, setActiveLayer] = useState<"anp" | "rtp" | "intersection">("intersection");
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const safeMode = useSafeMode();

  return (
    <section id="anp-rtp" className="w-full py-24 md:py-32 flex flex-col gap-12 border-b border-white/10">
      
      <div className="flex flex-col gap-4 max-w-3xl px-6 md:px-0">
        <h3 className="text-display-md text-white">
          <span className="block text-white/80">ÁREAS NATURALES PROTEGIDAS</span>
          <span className="block text-white/60 text-display-sm my-2">Y</span>
          <span className="block text-[var(--granular-dim-governance)]">REGIONES TERRESTRES PRIORITARIAS</span>
        </h3>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        
        {/* SELECTOR */}
        <div className="lg:col-span-5 flex flex-col gap-4 px-6 md:px-0 order-2 lg:order-1">
          
          <div className="flex flex-col gap-4" role="tablist">
            
            {/* ANP TAB */}
            <button
              onClick={() => setActiveLayer("anp")}
              role="tab"
              aria-selected={activeLayer === "anp"}
              className={`w-full text-left p-6 rounded-[var(--radius-panel)] transition-all duration-300 border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--granular-dim-governance)] ${activeLayer === "anp" ? 'bg-white/10 border-white/20' : 'bg-transparent border-white/5 hover:bg-white/5'}`}
            >
              <div className="flex flex-col gap-2 mb-2">
                 <span id="reserva-mapimi" className={`text-mono text-[10px] uppercase tracking-widest transition-colors ${activeLayer === "anp" ? 'text-white' : 'text-white/50'}`}>
                   ANP
                 </span>
                 <span className={`text-display-sm transition-colors ${activeLayer === "anp" ? 'text-[var(--granular-dim-governance)]' : 'text-white/80'}`}>
                   {anpAndRtp.anp.title}
                 </span>
              </div>
              
              <div className={`overflow-hidden transition-all duration-500 flex flex-col gap-4 ${activeLayer === "anp" || safeMode ? 'max-h-[500px] opacity-100 mt-4' : 'max-h-0 opacity-0'}`}>
                
                <div className="flex flex-col gap-1">
                  <span className="text-display-md text-white">{anpAndRtp.anp.totalArea}</span>
                  <div className="flex gap-4 text-mono text-[10px] text-white/60">
                    {anpAndRtp.anp.distribution.map(d => (
                      <span key={d.state}>{d.pct} {d.state}</span>
                    ))}
                  </div>
                </div>

                <div className="p-3 bg-white/5 border border-white/10 rounded">
                  <p className="text-xs text-white/70 italic">
                    {anpAndRtp.anp.unverifiedClaim}
                  </p>
                </div>

                <div className="flex flex-col gap-2 mt-2">
                  <span className="text-mono text-[9px] text-white/40 uppercase tracking-widest">Especies mencionadas</span>
                  <ul className="text-sm text-white/80 list-disc pl-4 space-y-1">
                    {anpAndRtp.anp.species.map(s => (
                       <li key={s}>{s}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </button>

            {/* RTP TAB */}
            <button
              onClick={() => setActiveLayer("rtp")}
              role="tab"
              aria-selected={activeLayer === "rtp"}
              className={`w-full text-left p-6 rounded-[var(--radius-panel)] transition-all duration-300 border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--granular-dim-governance)] ${activeLayer === "rtp" ? 'bg-white/10 border-white/20' : 'bg-transparent border-white/5 hover:bg-white/5'}`}
            >
              <div className="flex flex-col gap-2 mb-2">
                 <span className={`text-mono text-[10px] uppercase tracking-widest transition-colors ${activeLayer === "rtp" ? 'text-white' : 'text-white/50'}`}>
                   RTP
                 </span>
                 <span className={`text-display-sm transition-colors ${activeLayer === "rtp" ? 'text-[var(--granular-dim-governance)]' : 'text-white/80'}`}>
                   {anpAndRtp.rtp.title}
                 </span>
              </div>
              
              <div className={`overflow-hidden transition-all duration-500 flex flex-col gap-4 ${activeLayer === "rtp" || safeMode ? 'max-h-[500px] opacity-100 mt-4' : 'max-h-0 opacity-0'}`}>
                <div className="flex flex-col gap-3">
                  {anpAndRtp.rtp.regions.map(r => (
                    <div key={r.name} className="flex flex-col gap-1 border-l-2 border-white/20 pl-3">
                      <span className="text-sm text-white font-medium">{r.name}</span>
                      <span className="text-xs text-white/60">{r.zones}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col gap-2 mt-2">
                  <span className="text-mono text-[9px] text-white/40 uppercase tracking-widest">Función atribuida</span>
                  <ul className="text-sm text-white/80 list-disc pl-4 space-y-1">
                    {anpAndRtp.rtp.functions.map(f => (
                       <li key={f}>{f}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </button>

            {/* INTERSECTION TAB */}
            <button
              onClick={() => setActiveLayer("intersection")}
              role="tab"
              aria-selected={activeLayer === "intersection"}
              className={`w-full text-left p-6 rounded-[var(--radius-panel)] transition-all duration-300 border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--granular-dim-governance)] ${activeLayer === "intersection" ? 'bg-[var(--granular-dim-governance)]/10 border-[var(--granular-dim-governance)]/40' : 'bg-transparent border-white/5 hover:bg-white/5'}`}
            >
              <div className="flex flex-col gap-2 mb-2">
                 <span id="interseccion-anp-rtp" className={`text-mono text-[10px] uppercase tracking-widest transition-colors ${activeLayer === "intersection" ? 'text-white' : 'text-white/50'}`}>
                   INTERSECCIÓN
                 </span>
                 <span className={`text-display-sm transition-colors ${activeLayer === "intersection" ? 'text-white' : 'text-white/80'}`}>
                   {anpAndRtp.intersection.title}
                 </span>
              </div>
              
              <div className={`overflow-hidden transition-all duration-500 flex flex-col gap-4 ${activeLayer === "intersection" || safeMode ? 'max-h-[500px] opacity-100 mt-4' : 'max-h-0 opacity-0'}`}>
                <p className="text-sm text-white/80 leading-relaxed">
                  {anpAndRtp.intersection.text1}
                </p>
                <p className="text-sm text-white/80 leading-relaxed">
                  {anpAndRtp.intersection.text2}
                </p>
                <div id="zonas-grises-gobernanza" className="p-3 mt-2 border-l-2 border-amber-500/50 bg-amber-500/5">
                  <p className="text-xs text-amber-500/90">
                    Zonas Grises: La composición no documenta expedientes, normas específicas, actores concretos ni eventos de conflicto que permitan convertir esta interpretación narrativa en una conclusión jurídica.
                  </p>
                </div>
              </div>
            </button>

          </div>

        </div>

        {/* MAPA Y VISOR */}
        <div className="lg:col-span-7 flex flex-col gap-4 order-1 lg:order-2 px-6 md:px-0">
          <button 
            onClick={() => setIsViewerOpen(true)}
            className="w-full relative aspect-[4/3] md:aspect-square lg:aspect-[4/3] rounded-[var(--radius-panel)] overflow-hidden border border-white/10 group bg-[#0A0A0A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--granular-dim-governance)] focus-visible:ring-offset-4 focus-visible:ring-offset-[#050505]"
            aria-label="Abrir mapa de gobernanza en visor completo"
          >
            <Image
              src="/portfolio-media/audit/block-19/page-31-anp-rtp-audit.png" // Fallback to audit
              alt={mapCaption}
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
              {mapCaption}
            </p>
          </div>
        </div>

      </div>

      <ImageViewer 
        isOpen={isViewerOpen}
        onClose={() => setIsViewerOpen(false)}
        highResSrc="/portfolio-media/audit/block-19/page-31-anp-rtp-audit.png"
        altText={mapCaption}
      />
    </section>
  );
}
