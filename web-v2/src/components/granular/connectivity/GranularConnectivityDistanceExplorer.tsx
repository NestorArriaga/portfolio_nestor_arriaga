"use client";

import { useState } from "react";
import Image from "next/image";
import { granularConnectivity } from "@/content/cases/granular/granular-connectivity";
import ImageViewer from "@/components/case-study/ImageViewer";
import { useSafeMode } from "@/components/home/motion/SafeModeContext";

export default function GranularConnectivityDistanceExplorer() {
  const { distanceClasses, connectivityReading } = granularConnectivity;
  const [activeClass, setActiveClass] = useState<string | null>(null);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const safeMode = useSafeMode();

  return (
    <section id="distancias-explorador" className="w-full py-24 md:py-32 flex flex-col gap-12 border-b border-white/10 bg-[#0F0F0F]">
      
      <div className="flex flex-col gap-4 max-w-3xl px-6 md:px-12">
        <h3 className="text-display-md text-white">
          <span className="block text-white/80">{distanceClasses.title}</span>
        </h3>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start px-6 md:px-12">
        
        {/* SELECTOR DE DISTANCIAS */}
        <div className="lg:col-span-5 flex flex-col gap-4 order-2 lg:order-1">
          <div className="flex flex-col gap-4" role="tablist">
            {distanceClasses.classes.map((cls, idx) => {
              const isActive = activeClass === cls.id;
              
              if (safeMode) {
                return (
                  <div key={cls.id} className="p-4 border border-white/10 bg-[#111] rounded-[var(--radius-panel)]">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-mono text-[10px] text-white/40">0{idx + 1}</span>
                      <span className="text-mono text-[11px] text-white uppercase tracking-widest">{cls.name}</span>
                    </div>
                    <p className="text-sm text-white/70 mb-2">{cls.desc}</p>
                    <p className="text-xs text-amber-500/80 border-l-2 border-amber-500/50 pl-2 mt-2">{distanceClasses.methodUndefinedNote}</p>
                  </div>
                );
              }

              return (
                <button
                  key={cls.id}
                  onClick={() => setActiveClass(isActive ? null : cls.id)}
                  role="tab"
                  aria-current={isActive ? "true" : undefined}
                  className={`w-full text-left p-6 rounded-[var(--radius-panel)] transition-all duration-300 border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--granular-dim-connectivity)] ${isActive ? 'bg-white/10 border-white/20' : 'bg-transparent border-white/5 hover:bg-white/5'}`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`text-mono text-[10px] transition-colors ${isActive ? 'text-[var(--granular-dim-connectivity)]' : 'text-white/40'}`}>0{idx + 1}</span>
                    <span className={`text-mono text-[11px] uppercase tracking-widest transition-colors ${isActive ? 'text-white' : 'text-white/60'}`}>
                      {cls.name}
                    </span>
                  </div>
                  
                  <div className={`overflow-hidden transition-all duration-500 ${isActive ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'}`}>
                    <p className="text-sm text-white/80 leading-relaxed mb-3">
                      <span className="text-[var(--granular-dim-connectivity)]">La página relaciona:</span> {cls.desc}
                    </p>
                    <div className="p-3 bg-amber-500/5 border-l-2 border-amber-500/50 mt-3">
                       <p className="text-xs text-amber-500/90">{distanceClasses.methodUndefinedNote}</p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* MAPA Y VISOR */}
        <div className="lg:col-span-7 flex flex-col gap-4 order-1 lg:order-2 bg-white p-2 rounded-[var(--radius-panel)]">
          {/* FOND BLANCO CONTROLADO PARA MAPA DE CONECTIVIDAD */}
          <button 
            onClick={() => setIsViewerOpen(true)}
            className="w-full relative aspect-[4/3] md:aspect-square lg:aspect-[4/3] rounded-[calc(var(--radius-panel)-8px)] overflow-hidden border border-black/10 group bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--granular-dim-connectivity)] focus-visible:ring-offset-4 focus-visible:ring-offset-white"
            aria-label="Abrir mapa de distancias y patrones espaciales"
          >
            <Image
              src="/portfolio-media/audit/block-20/page-35-connectivity-audit.png" // Fallback to audit
              alt={distanceClasses.caption}
              fill
              className="object-contain transition-transform duration-700 group-hover:scale-[1.02]"
              unoptimized
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
               <div className="opacity-0 group-hover:opacity-100 bg-black text-white text-mono text-[10px] uppercase tracking-widest px-4 py-2 rounded-full transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0">
                 Ampliar figura
               </div>
            </div>
          </button>
          
          <div className="flex flex-col gap-2 px-4 py-2">
            <p className="text-body text-sm text-black/70">
              {distanceClasses.caption}
            </p>
            <p className="text-xs text-black/50 italic">
              {distanceClasses.sourceNote}
            </p>
          </div>
        </div>

      </div>

      {/* LECTURA CONECTIVIDAD */}
      <div id="lectura-conectividad" className="mt-8 px-6 md:px-12">
         <div className="max-w-4xl flex flex-col gap-6 p-6 md:p-8 bg-[#111] border border-white/5 rounded-[var(--radius-panel)]">
            <h4 className="text-mono text-[12px] text-[var(--granular-dim-connectivity)] uppercase tracking-widest">
              {connectivityReading.title}
            </h4>
            <div className="text-sm md:text-base text-white/80 leading-relaxed flex flex-col gap-4">
              <p>{connectivityReading.text1}</p>
              <p>{connectivityReading.text2}</p>
              <p className="text-xs text-amber-500/80 border-l-2 border-amber-500/30 pl-3">
                {connectivityReading.text3}
              </p>
            </div>
         </div>
      </div>

      <ImageViewer 
        isOpen={isViewerOpen}
        onClose={() => setIsViewerOpen(false)}
        highResSrc="/portfolio-media/audit/block-20/page-35-connectivity-audit.png"
        altText="Mapa de distancias y patrones espaciales"
      />
    </section>
  );
}
