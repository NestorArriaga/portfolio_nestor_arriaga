"use client";

import { useState } from "react";
import Image from "next/image";
import ImageViewer from "@/components/case-study/ImageViewer";
import { granularPolicy } from "@/content/cases/granular/granular-policy";

export default function GranularPolicyApplicationExplorer() {
  const { introduction, domains, diagramCaption } = granularPolicy;
  
  const [activeDomainId, setActiveDomainId] = useState(domains[0].id);
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  const activeDomain = domains.find(d => d.id === activeDomainId) || domains[0];

  // Map domain IDs to audit detail images based on the prompt list
  const getDetailImage = (id: string) => {
    switch(id) {
      case "planeacion-territorial": return "/portfolio-media/audit/block-22/project-14-policy-planning-detail.png";
      case "gestion-hidrica": return "/portfolio-media/audit/block-22/project-14-policy-water-detail.png";
      case "programas-sociales": return "/portfolio-media/audit/block-22/project-14-policy-social-detail.png";
      case "gobernanza-institucional": return "/portfolio-media/audit/block-22/project-14-policy-governance-detail.png";
      case "comparacion-internacional": return "/portfolio-media/audit/block-22/project-14-policy-comparison-detail.png";
      default: return "/portfolio-media/audit/block-22/project-14-policy-applications-full.png";
    }
  };

  return (
    <section id="tipologia-aplicada" className="w-full py-24 md:py-32 flex flex-col gap-12 border-b border-white/10 bg-[#0A0A0A]">
      
      {/* INTRODUCCIÓN */}
      <div className="flex flex-col gap-6 max-w-4xl px-6 md:px-12 mb-8">
        <h3 className="text-display-md text-white">
          <span className="block text-white/50 text-xl md:text-2xl mb-1">TIPOLOGÍA APLICADA</span>
          <span className="block text-white">CINCO ÁMBITOS ESTRATÉGICOS</span>
        </h3>
        <p className="text-body text-white/80">{introduction.text1}</p>
        <p className="text-body text-white/80">{introduction.text2}</p>
        <p className="text-body text-white/60">{introduction.text3}</p>
      </div>

      <div id="cinco-ambitos" className="grid grid-cols-1 lg:grid-cols-12 gap-8 px-6 md:px-12">
        
        {/* LADO IZQUIERDO: SELECTOR DE ÁMBITOS */}
        <div className="col-span-1 lg:col-span-4 flex flex-col gap-2">
           {domains.map((domain) => (
             <button
                key={domain.id}
                onClick={() => setActiveDomainId(domain.id)}
                aria-selected={activeDomainId === domain.id}
                className={`text-left px-4 py-4 border-l-2 transition-all duration-300 ${
                  activeDomainId === domain.id
                    ? "border-white bg-white/5"
                    : "border-white/10 hover:border-white/30 text-white/50 hover:text-white/80"
                }`}
             >
                <div className="flex gap-4 items-center">
                  <span className="text-mono text-[10px] opacity-50">{domain.number}</span>
                  <span className="text-mono text-[10px] uppercase tracking-widest">{domain.title}</span>
                </div>
             </button>
           ))}
        </div>

        {/* LADO DERECHO: DETALLE DEL ÁMBITO */}
        <div className="col-span-1 lg:col-span-8 flex flex-col gap-6">
           <button 
             onClick={() => setIsViewerOpen(true)}
             className="w-full relative aspect-video rounded-[var(--radius-panel)] overflow-hidden border border-white/10 group bg-[#111] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
             aria-label={`Ampliar recorte de ${activeDomain.title}`}
           >
             <Image
               src={getDetailImage(activeDomain.id)}
               alt={`Detalle de ${activeDomain.title}`}
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

           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* SUBTEMAS */}
              <div className="flex flex-col gap-4">
                 <span className="text-mono text-[10px] text-white/40 uppercase tracking-widest">Subtemas proyectados</span>
                 <ul className="flex flex-col gap-2">
                   {activeDomain.subtopics.map((st, i) => (
                     <li key={i} className="text-sm text-white/80 border-l border-white/10 pl-3 py-1">
                       {st}
                     </li>
                   ))}
                 </ul>
              </div>

              {/* WARNING */}
              <div className="flex flex-col">
                <div className="p-4 bg-amber-500/5 border-l-2 border-amber-500/50 h-full flex items-center">
                  <p className="text-xs text-amber-500/90 leading-relaxed">
                    {activeDomain.warning}
                  </p>
                </div>
              </div>
           </div>
        </div>

      </div>

      {/* PIE DE FIGURA */}
      <div className="px-6 md:px-12 mt-8 max-w-5xl">
         <p className="text-xs text-white/50 leading-relaxed">{diagramCaption}</p>
      </div>

      <ImageViewer 
        isOpen={isViewerOpen}
        onClose={() => setIsViewerOpen(false)}
        highResSrc={getDetailImage(activeDomain.id)}
        altText={`Detalle ampliado de ${activeDomain.title}`}
      />
    </section>
  );
}
