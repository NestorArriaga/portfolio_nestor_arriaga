"use client";

import { useState } from "react";
import Image from "next/image";
import ImageViewer from "@/components/case-study/ImageViewer";
import { granularGrayZones } from "@/content/cases/granular/granular-gray-zones";

type ContextKey = "governance" | "synthesis";

export default function GranularGrayZonesContexts() {
  const { concept } = granularGrayZones;
  
  const [activeContext, setActiveContext] = useState<ContextKey>("governance");
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  const contexts: Record<ContextKey, { title: string; desc: string; img: string }> = {
    governance: {
      title: "USO 1: TENSIÓN EN GOBERNANZA",
      desc: concept.governanceContext,
      img: "/portfolio-media/audit/block-22/project-14-gray-zones-context.png" // from p31
    },
    synthesis: {
      title: "USO 2: SÍNTESIS TERRITORIAL",
      desc: concept.synthesisContext,
      img: "/portfolio-media/audit/block-22/project-14-gray-zones-detail.png" // from p40
    }
  };

  const activeData = contexts[activeContext];

  return (
    <section id="contextos-grises" className="w-full py-24 md:py-32 flex flex-col gap-12 border-b border-white/10 bg-[#0A0A0A]">
      
      <div className="flex flex-col gap-4 max-w-4xl px-6 md:px-12">
        <h3 className="text-display-md text-white">
          <span className="block text-white/50 text-xl md:text-2xl mb-1">CONTINUIDAD DEL CONCEPTO</span>
          <span className="block text-white">DOS USOS DOCUMENTADOS</span>
        </h3>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 px-6 md:px-12">
        
        {/* SELECTOR */}
        <div className="col-span-1 lg:col-span-4 flex flex-col gap-2">
           {(Object.keys(contexts) as ContextKey[]).map((key) => (
             <button
                key={key}
                onClick={() => setActiveContext(key)}
                aria-selected={activeContext === key}
                className={`text-left px-4 py-4 border-l-2 transition-all duration-300 ${
                  activeContext === key
                    ? "border-white bg-white/5"
                    : "border-white/10 hover:border-white/30 text-white/50 hover:text-white/80"
                }`}
             >
                <span className="text-mono text-[10px] uppercase tracking-widest">{contexts[key].title}</span>
             </button>
           ))}
        </div>

        {/* VISOR */}
        <div className="col-span-1 lg:col-span-8 flex flex-col gap-6">
           <button 
             onClick={() => setIsViewerOpen(true)}
             className="w-full relative aspect-video rounded-[var(--radius-panel)] overflow-hidden border border-white/10 group bg-[#111] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
           >
             <Image
               src={activeData.img}
               alt={activeData.title}
               fill
               className="object-contain transition-transform duration-700 group-hover:scale-[1.02]"
               unoptimized
             />
             <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 bg-black/80 text-white text-mono text-[10px] uppercase tracking-widest px-4 py-2 rounded-full border border-white/20 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0">
                  Ampliar detalle
                </div>
             </div>
           </button>

           <div className="flex flex-col gap-4">
              <p className="text-sm text-white/80 leading-relaxed max-w-2xl">
                {activeData.desc}
              </p>
           </div>
        </div>

      </div>

      <ImageViewer 
        isOpen={isViewerOpen}
        onClose={() => setIsViewerOpen(false)}
        highResSrc={activeData.img}
        altText={`Detalle: ${activeData.title}`}
      />
    </section>
  );
}
