"use client";

import Image from "next/image";
import { urbanAssets } from "@/content/cases/urban-challenge/urban-assets";
import { urbanEdgesAccess } from "@/content/cases/urban-challenge/urban-edges-access";

export default function UrbanEdgesHero() {
  const { title, shortTitle } = urbanEdgesAccess;
  const asset = urbanAssets.find(a => a.id === "project-15-edges-access-context-preview");

  return (
    <div className="relative w-full min-h-[80vh] flex flex-col justify-between bg-[#050505] overflow-hidden pt-24 pb-12 border-b border-white/10">
      
      <div className="absolute inset-0 w-full h-full opacity-30 mix-blend-screen pointer-events-none">
        {asset && (
          <Image
            src={asset.previewPath}
            alt="Bordes y Accesos"
            fill
            className="object-cover md:object-contain object-right md:object-center transform scale-100 animate-fade-in-slow"
          />
        )}
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col gap-4">
        <span className="text-mono text-[10px] text-white/50 uppercase tracking-widest">
          CAPÍTULO 05
        </span>
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-light text-white leading-[0.9] tracking-wide max-w-3xl">
          {shortTitle}
        </h2>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-12">
        <div className="flex flex-col gap-2 max-w-sm">
          <p className="text-body text-white/80">
            CÓMO EL VACÍO<br/>SE RELACIONA CON LA TRAMA
          </p>
        </div>
        
        <div className="text-mono text-[10px] text-white/40 uppercase tracking-widest text-right">
          PÁGINA {urbanEdgesAccess.sourcePages[0]}
        </div>
      </div>
      
    </div>
  );
}
