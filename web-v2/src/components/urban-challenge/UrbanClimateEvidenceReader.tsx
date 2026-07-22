"use client";

import { urbanClimate } from "@/content/cases/urban-challenge/urban-climate";
import { urbanAssets } from "@/content/cases/urban-challenge/urban-assets";
import Image from "next/image";

export default function UrbanClimateEvidenceReader() {
  const { windAnalysis, thermalAnalysis, climateDesignRelationship, limitations } = urbanClimate;
  const overlayAsset = urbanAssets.find(a => a.id === "project-15-possible-wind-overlay");
  
  return (
    <div className="w-full flex flex-col gap-12">
      
      {/* Visual Header */}
      <div className="w-full aspect-video md:aspect-[21/9] relative bg-[#111] border border-white/10 rounded flex items-center justify-center p-8">
        {overlayAsset && (
          <Image 
            src={overlayAsset.previewPath} 
            alt="Gráfica conceptual de clima" 
            fill 
            className="object-contain opacity-70 p-4 md:p-8" 
          />
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Wind */}
        <div className="flex flex-col gap-3 p-6 bg-white/5 border border-white/10 rounded">
          <span className="text-mono text-[10px] text-white/50 uppercase tracking-widest">TEXTO FUENTE</span>
          <h4 className="text-body font-medium text-white">{windAnalysis.term}</h4>
          <p className="text-body text-white/70 mt-2">{windAnalysis.statement}</p>
          <div className="mt-4 pt-4 border-t border-[var(--urban-accent)]/20">
            <span className="text-mono text-[9px] text-[var(--urban-accent)] uppercase block mb-1">Limitación</span>
            <span className="text-body text-[var(--urban-accent)]/80 text-sm">{windAnalysis.limitation}</span>
          </div>
        </div>

        {/* Heat */}
        <div className="flex flex-col gap-3 p-6 bg-white/5 border border-white/10 rounded">
          <span className="text-mono text-[10px] text-white/50 uppercase tracking-widest">TEXTO FUENTE</span>
          <h4 className="text-body font-medium text-white">{thermalAnalysis.term}</h4>
          <div className="mt-auto pt-4 border-t border-[var(--urban-accent)]/20">
            <span className="text-mono text-[9px] text-[var(--urban-accent)] uppercase block mb-1">Limitación</span>
            <span className="text-body text-[var(--urban-accent)]/80 text-sm">{thermalAnalysis.limitation}</span>
          </div>
        </div>

        {/* Response */}
        <div className="flex flex-col gap-3 p-6 bg-white/5 border border-white/10 rounded lg:col-span-1 md:col-span-2">
          <span className="text-mono text-[10px] text-white/50 uppercase tracking-widest">RESPUESTA DE DISEÑO</span>
          <h4 className="text-body font-medium text-white">ORIENTACIÓN ESPACIAL</h4>
          <p className="text-body text-white/70 mt-2">{climateDesignRelationship.statement}</p>
          <div className="mt-4 pt-4 border-t border-[var(--urban-accent)]/20">
            <span className="text-mono text-[9px] text-[var(--urban-accent)] uppercase block mb-1">Limitación</span>
            <span className="text-body text-[var(--urban-accent)]/80 text-sm">{climateDesignRelationship.note}</span>
          </div>
        </div>
      </div>

    </div>
  );
}
