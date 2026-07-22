"use client";

import { useState } from "react";
import Image from "next/image";
import ImageViewer from "@/components/case-study/ImageViewer";
import { granularLocalities } from "@/content/cases/granular/granular-localities";

export default function GranularMunicipalLocalityComparison() {
  const { localityReading } = granularLocalities;
  const [activeViewer, setActiveViewer] = useState<"municipal" | "locality" | null>(null);

  return (
    <section id="lectura-localidades" className="w-full py-24 md:py-32 flex flex-col gap-12 border-b border-white/10 bg-[#0A0A0A]">
      
      <div className="flex flex-col gap-4 max-w-4xl px-6 md:px-12">
        <h3 className="text-display-md text-white">
          <span className="block text-white">COMPARATIVA DE ESCALAS</span>
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-6 md:px-12">
        
        {/* RESULTADO MUNICIPAL */}
        <div className="flex flex-col gap-4">
          <button 
            onClick={() => setActiveViewer("municipal")}
            className="w-full relative aspect-square md:aspect-[4/3] rounded-[var(--radius-panel)] overflow-hidden border border-white/10 group bg-[#111] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
            aria-label="Abrir mapa municipal"
          >
            <Image
              src="/portfolio-media/audit/block-21/page-37-municipal-results-audit.png"
              alt="Resultado municipal"
              fill
              className="object-contain transition-transform duration-700 group-hover:scale-[1.02]"
              unoptimized
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
               <div className="opacity-0 group-hover:opacity-100 bg-black/80 text-white text-mono text-[10px] uppercase tracking-widest px-4 py-2 rounded-full border border-white/20 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0">
                 Ampliar Municipal
               </div>
            </div>
          </button>
          <div className="flex flex-col gap-1 px-2">
            <span className="text-mono text-[10px] text-white/50 uppercase tracking-widest">Escala Municipal (Pág. 37)</span>
            <p className="text-sm text-white/80">Patrones estructurales amplios en tres configuraciones.</p>
          </div>
        </div>

        {/* RESULTADO LOCALIDAD */}
        <div className="flex flex-col gap-4">
          <button 
            onClick={() => setActiveViewer("locality")}
            className="w-full relative aspect-square md:aspect-[4/3] rounded-[var(--radius-panel)] overflow-hidden border border-white/10 group bg-[#111] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
            aria-label="Abrir mapa de localidades"
          >
            <Image
              src="/portfolio-media/audit/block-21/page-38-localities-audit.png"
              alt="Resultado localidades"
              fill
              className="object-contain transition-transform duration-700 group-hover:scale-[1.02]"
              unoptimized
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
               <div className="opacity-0 group-hover:opacity-100 bg-black/80 text-white text-mono text-[10px] uppercase tracking-widest px-4 py-2 rounded-full border border-white/20 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0">
                 Ampliar Localidades
               </div>
            </div>
          </button>
          <div className="flex flex-col gap-1 px-2">
            <span className="text-mono text-[10px] text-white/50 uppercase tracking-widest">Escala de Localidad (Pág. 38)</span>
            <p className="text-sm text-white/80">Lectura de mayor proximidad y distribución fragmentada.</p>
          </div>
        </div>

      </div>

      {/* OBSERVACIONES */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 px-6 md:px-12 mt-8">
        <h4 className="text-xl text-white/90 font-light">{localityReading.title}</h4>
        <div className="flex flex-col gap-4">
          {localityReading.points.map((point, idx) => (
             <div key={idx} className="flex gap-4 items-start">
               <span className="text-mono text-[10px] text-white/40 mt-1">0{idx+1}</span>
               <p className="text-sm text-white/70">{point}</p>
             </div>
          ))}
        </div>
      </div>

      <ImageViewer 
        isOpen={activeViewer !== null}
        onClose={() => setActiveViewer(null)}
        highResSrc={activeViewer === "municipal" ? "/portfolio-media/audit/block-21/page-37-municipal-results-audit.png" : "/portfolio-media/audit/block-21/page-38-localities-audit.png"}
        altText={activeViewer === "municipal" ? "Resultado Municipal" : "Resultado Localidades"}
      />
    </section>
  );
}
