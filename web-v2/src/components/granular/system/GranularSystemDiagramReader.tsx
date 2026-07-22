"use client";

import { useState } from "react";
import Image from "next/image";
import ImageViewer from "@/components/case-study/ImageViewer";
import { granularSystem } from "@/content/cases/granular/granular-system";

type SectionKey = "full" | "center" | "pillars" | "results" | "method" | "signs";

export default function GranularSystemDiagramReader() {
  const { diagramCaption, scalesAndPillars, results, methodNodes, signs } = granularSystem;
  
  const [activeSection, setActiveSection] = useState<SectionKey>("full");
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  const sections: Record<SectionKey, { title: string; desc: string; warning?: string; img: string }> = {
    full: {
      title: "FIGURA COMPLETA",
      desc: "Diagrama de relaciones sistémicas. Síntesis gráfica del portafolio.",
      img: "/portfolio-media/audit/block-22/page-40-causal-loop-audit.png"
    },
    center: {
      title: "CENTRO Y ESCALAS",
      desc: scalesAndPillars.text1,
      img: "/portfolio-media/audit/block-22/project-14-causal-loop-center-detail.png" // audit fallback
    },
    pillars: {
      title: "SEIS PILARES",
      desc: scalesAndPillars.text2,
      img: "/portfolio-media/audit/block-22/project-14-causal-loop-pillars-detail.png"
    },
    results: {
      title: "RESULTADOS",
      desc: results.text1,
      warning: results.text2,
      img: "/portfolio-media/audit/block-22/project-14-causal-loop-results-detail.png"
    },
    method: {
      title: "NODOS METODOLÓGICOS",
      desc: methodNodes.text1,
      warning: methodNodes.warning,
      img: "/portfolio-media/audit/block-22/project-14-causal-loop-method-nodes-detail.png"
    },
    signs: {
      title: "SIGNOS",
      desc: signs.definition,
      warning: signs.warning,
      img: "/portfolio-media/audit/block-22/project-14-causal-loop-signs-detail.png"
    }
  };

  const activeData = sections[activeSection];

  return (
    <section id="causal-loop" className="w-full py-24 md:py-32 flex flex-col gap-12 border-b border-white/10 bg-[#0A0A0A]">
      
      <div className="flex flex-col gap-4 max-w-4xl px-6 md:px-12">
        <h3 className="text-display-md text-white">
          <span className="block text-white/50 text-xl md:text-2xl mb-1">CAUSAL LOOP</span>
          <span className="block text-white">DIAGRAMA DE RELACIONES SISTÉMICAS</span>
        </h3>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 px-6 md:px-12">
        
        {/* LADO IZQUIERDO: SELECTOR */}
        <div className="col-span-1 lg:col-span-4 flex flex-col gap-2">
           {(Object.keys(sections) as SectionKey[]).map((key) => (
             <button
                key={key}
                onClick={() => setActiveSection(key)}
                aria-selected={activeSection === key}
                className={`text-left px-4 py-4 border-l-2 transition-all duration-300 ${
                  activeSection === key
                    ? "border-white bg-white/5"
                    : "border-white/10 hover:border-white/30 text-white/50 hover:text-white/80"
                }`}
             >
                <span className="text-mono text-[10px] uppercase tracking-widest">{sections[key].title}</span>
             </button>
           ))}
        </div>

        {/* LADO DERECHO: VISOR DE DETALLE */}
        <div className="col-span-1 lg:col-span-8 flex flex-col gap-6">
           <button 
             onClick={() => setIsViewerOpen(true)}
             className="w-full relative aspect-video rounded-[var(--radius-panel)] overflow-hidden border border-white/10 group bg-[#111] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
           >
             <Image
               src={activeData.img}
               alt={`Detalle del causal loop: ${activeData.title}`}
               fill
               className="object-contain transition-transform duration-700 group-hover:scale-[1.02]"
               unoptimized
             />
             <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 bg-black/80 text-white text-mono text-[10px] uppercase tracking-widest px-4 py-2 rounded-full border border-white/20 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0">
                  Ampliar recorte
                </div>
             </div>
           </button>

           <div className="flex flex-col gap-4">
              <p className="text-sm text-white/80 leading-relaxed max-w-2xl">
                {activeData.desc}
              </p>
              {activeData.warning && (
                <div className="p-3 bg-amber-500/5 border-l-2 border-amber-500/50 max-w-2xl">
                  <p className="text-xs text-amber-500/90 leading-relaxed">{activeData.warning}</p>
                </div>
              )}
           </div>
        </div>

      </div>

      <div className="px-6 md:px-12 mt-8 max-w-5xl">
         <p className="text-xs text-white/50 leading-relaxed">{diagramCaption}</p>
      </div>

      <ImageViewer 
        isOpen={isViewerOpen}
        onClose={() => setIsViewerOpen(false)}
        highResSrc={activeData.img}
        altText={`Detalle ampliado: ${activeData.title}`}
      />
    </section>
  );
}
