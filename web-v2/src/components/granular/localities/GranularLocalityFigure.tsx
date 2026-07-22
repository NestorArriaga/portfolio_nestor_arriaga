"use client";

import { useState } from "react";
import Image from "next/image";
import ImageViewer from "@/components/case-study/ImageViewer";

export default function GranularLocalityFigure() {
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  return (
    <section id="proyeccion-localidades" className="w-full py-24 md:py-32 flex flex-col gap-12 border-b border-white/10">
      
      <div className="flex flex-col gap-4 max-w-4xl px-6 md:px-12">
        <h3 className="text-display-md text-white">
          <span className="block text-white/50 text-xl md:text-2xl mb-1">PROYECCIÓN O CLASIFICACIÓN</span>
          <span className="block text-white">REPRESENTACIÓN A ESCALA DE LOCALIDAD</span>
        </h3>
        <p className="text-body text-white/80 mt-4">
          La página presenta resultados a escala de localidad sin especificar documentalmente el algoritmo de asignación o proyección empleado.
        </p>
      </div>

      <div className="flex flex-col gap-4 px-6 md:px-12 items-center">
        
        {/* FIGURA Y VISOR */}
        <button 
          onClick={() => setIsViewerOpen(true)}
          className="w-full max-w-5xl relative aspect-[4/3] rounded-[var(--radius-panel)] overflow-hidden border border-white/10 group bg-[#111] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
          aria-label="Abrir figura de localidades"
        >
          <Image
            src="/portfolio-media/audit/block-21/page-38-localities-audit.png" // Fallback to audit
            alt="Proyección de tipologías a escala de localidad"
            fill
            className="object-contain transition-transform duration-700 group-hover:scale-[1.02]"
            unoptimized
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
             <div className="opacity-0 group-hover:opacity-100 bg-black/80 text-white text-mono text-[10px] uppercase tracking-widest px-4 py-2 rounded-full border border-white/20 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0">
               Ampliar mapa de localidades
             </div>
          </div>
        </button>
        
        <div className="flex flex-col gap-2 px-2 max-w-5xl w-full">
          <p className="text-sm text-white/70">
            Representación territorial de localidades vinculada con las tipologías del proyecto (Página 38).
          </p>
          <div className="mt-2 p-3 bg-amber-500/5 border-l-2 border-amber-500/50">
             <p className="text-xs text-amber-500/90 leading-relaxed">
               La página presenta resultados a escala de localidad, pero no permite determinar con seguridad si proceden de una proyección directa, una asignación a posteriori, o un clustering estadístico independiente.
             </p>
          </div>
        </div>

      </div>

      <ImageViewer 
        isOpen={isViewerOpen}
        onClose={() => setIsViewerOpen(false)}
        highResSrc="/portfolio-media/audit/block-21/page-38-localities-audit.png"
        altText="Proyección de tipologías a escala de localidad"
      />
    </section>
  );
}
