"use client";

import Image from "next/image";
import { urbanAssets } from "@/content/cases/urban-challenge/urban-assets";
import { urbanUrbanFabric } from "@/content/cases/urban-challenge/urban-urban-fabric";

export default function UrbanFabricHero() {
  const { title, shortTitle, modelAssets } = urbanUrbanFabric;
  
  const modelA = urbanAssets.find(a => a.id === modelAssets.modelA);
  const modelB = urbanAssets.find(a => a.id === modelAssets.modelB);

  return (
    <div className="relative w-full min-h-[80vh] flex flex-col justify-between bg-[#050505] overflow-hidden pt-24 pb-12 border-b border-white/10">
      
      {/* Background Models */}
      <div className="absolute inset-0 w-full h-full opacity-30 mix-blend-screen pointer-events-none">
        {modelA && (
          <Image
            src={modelA.previewPath}
            alt="Modelo Volumétrico A"
            fill
            className="object-cover md:object-contain object-left md:object-center transform scale-100 animate-fade-in-slow"
            priority
          />
        )}
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col gap-4">
        <span className="text-mono text-[10px] text-white/50 uppercase tracking-widest">
          CAPÍTULO 04
        </span>
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-light text-white leading-[0.9] tracking-wide max-w-3xl">
          {shortTitle}
        </h2>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-12">
        <div className="flex flex-col gap-2 max-w-sm">
          <p className="text-body text-white/80">
            EL PARQUE COMO<br/>VACÍO ESTRUCTURAL
          </p>
          <span className="text-mono text-[9px] text-[var(--urban-accent)] uppercase tracking-widest border border-[var(--urban-accent)]/30 px-2 py-1 rounded w-fit mt-2">
            LECTURA MORFOLÓGICA
          </span>
        </div>
        
        <div className="text-mono text-[10px] text-white/40 uppercase tracking-widest text-right">
          PÁGINA {urbanUrbanFabric.sourcePages[0]}
        </div>
      </div>
      
    </div>
  );
}
