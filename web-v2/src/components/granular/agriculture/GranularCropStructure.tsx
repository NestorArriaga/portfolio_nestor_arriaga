"use client";

import { useState } from "react";
import Image from "next/image";
import { granularAgriculture } from "@/content/cases/granular/granular-agriculture";
import ImageViewer from "@/components/case-study/ImageViewer";

export default function GranularCropStructure() {
  const { cropStructure } = granularAgriculture;
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  return (
    <section id="cultivos" className="w-full py-24 md:py-32 flex flex-col gap-12 border-b border-white/10">
      
      <div className="flex flex-col gap-4 max-w-3xl px-6 md:px-0">
        <h3 className="text-display-md text-white">
          <span className="block text-white/80">{cropStructure.title}</span>
          <span className="block text-[var(--granular-dim-agriculture)]">{cropStructure.subtitle}</span>
        </h3>
        <p className="text-mono text-[10px] text-white/40 uppercase tracking-widest">
          PÁGINA {cropStructure.sourcePage}
        </p>
      </div>

      <div className="flex flex-col gap-8 px-6 md:px-0">
        
        {/* LECTURA ACCESIBLE */}
        <div className="max-w-4xl p-6 md:p-8 bg-[#111] border border-white/5 rounded-[var(--radius-panel)] flex flex-col gap-4">
           <span className="text-mono text-[10px] text-[var(--granular-dim-agriculture)] uppercase tracking-widest">
             LECTURA DE LA FIGURA
           </span>
           <p className="text-sm md:text-base text-white/80 leading-relaxed">
             {cropStructure.chordAccessibleText}
           </p>
        </div>

        {/* CHORD VIEWER (Image fallback to audit) */}
        <button 
          onClick={() => setIsViewerOpen(true)}
          className="w-full relative aspect-[3/4] md:aspect-[16/9] rounded-[var(--radius-panel)] overflow-hidden border border-white/10 group bg-[#0A0A0A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--granular-dim-agriculture)] focus-visible:ring-offset-4 focus-visible:ring-offset-[#050505]"
          aria-label="Abrir diagrama de relaciones municipio-cultivo"
        >
          <Image
            src="/portfolio-media/audit/block-18/page-27-crops-chord-audit.png" 
            alt={cropStructure.caption}
            fill
            className="object-contain transition-transform duration-700 group-hover:scale-[1.02]"
            unoptimized
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
             <div className="opacity-0 group-hover:opacity-100 bg-black/90 text-white text-mono text-[10px] uppercase tracking-widest px-6 py-3 rounded-full border border-white/20 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0">
               Ampliar diagrama
             </div>
          </div>
        </button>

      </div>

      <div id="relaciones-municipio-cultivo" className="grid grid-cols-1 md:grid-cols-2 gap-6 px-6 md:px-0 mt-8">
         {cropStructure.municipalReadings.map((reading) => (
           <div key={reading.id} className="flex flex-col gap-3 p-6 border border-white/5 rounded-[var(--radius-panel)] hover:bg-white/5 transition-colors">
             <span className="text-mono text-[10px] text-white/50 uppercase tracking-widest">{reading.name}</span>
             <p className="text-sm text-white/90 font-medium">{reading.munis}</p>
             <p className="text-sm text-white/70">{reading.desc}</p>
           </div>
         ))}
         
         <div className="md:col-span-2 text-xs text-amber-500/70 bg-amber-500/5 p-4 rounded mt-4 border border-amber-500/20">
            La página utiliza las formulaciones Francisco I. Madero y Madero para el mismo referente municipal. Esta interfaz conserva ambas tal como se presentan en las citas.
         </div>
      </div>

      <ImageViewer 
        isOpen={isViewerOpen}
        onClose={() => setIsViewerOpen(false)}
        highResSrc="/portfolio-media/audit/block-18/page-27-crops-chord-audit.png"
        altText={cropStructure.caption}
      />
    </section>
  );
}
