"use client";

import { useState } from "react";
import Image from "next/image";
import { granularSocioeconomy } from "@/content/cases/granular/granular-socioeconomy";
import ImageViewer from "@/components/case-study/ImageViewer";
import { useSafeMode } from "@/components/home/motion/SafeModeContext";

export default function GranularSocioeconomicProfileExplorer() {
  const { margination } = granularSocioeconomy;
  const [activeProfile, setActiveProfile] = useState<string | null>(null);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const safeMode = useSafeMode();

  return (
    <section id="perfiles-socioeconomicos" className="w-full py-24 md:py-32 flex flex-col gap-12 border-b border-white/10">
      
      <div className="flex flex-col gap-4 max-w-3xl px-6 md:px-0">
        <h3 className="text-display-md text-white">
          <span className="block text-white/80" id="marginacion-localidad">GRADO DE MARGINACIÓN</span>
          <span className="block text-[var(--granular-dim-socioeconomy)]">POR LOCALIDAD</span>
        </h3>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        
        {/* SELECTOR DE PERFILES */}
        <div className="lg:col-span-5 flex flex-col gap-6 px-6 md:px-0 order-2 lg:order-1">
          
          <div className="text-mono text-[10px] text-white/50 uppercase tracking-widest mb-2">
            Perfiles Socioeconómicos
          </div>

          <div className="flex flex-col gap-4" role="tablist">
            {margination.profiles.map((profile) => {
              const isActive = activeProfile === profile.id;
              
              if (safeMode) {
                return (
                  <div key={profile.id} className="p-4 border border-white/10 bg-[#111] rounded-[var(--radius-panel)]">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-mono text-[11px] text-white uppercase tracking-widest">{profile.name}</span>
                    </div>
                    {profile.threshold && <span className="text-display-md text-[var(--granular-dim-socioeconomy)] block mb-2">{profile.threshold}</span>}
                    <p className="text-sm text-white/70 mb-3">{profile.desc}</p>
                    <p className="text-xs text-white/50"><span className="text-white/80">Ejemplos territoriales:</span> {profile.examples}</p>
                    
                    {(profile.id === "metropolitanas" || profile.id === "dispersas") && (
                      <div className="mt-3 text-xs text-amber-500/90 border-l-2 border-amber-500/50 pl-3">
                        Advertencia: No se documenta la fórmula, el año ni la fuente completa del Índice de Marginación (IMN).
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <button
                  key={profile.id}
                  onClick={() => setActiveProfile(isActive ? null : profile.id)}
                  role="tab"
                  aria-current={isActive ? "true" : undefined}
                  className={`w-full text-left p-6 rounded-[var(--radius-panel)] transition-all duration-300 border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--granular-dim-socioeconomy)] ${isActive ? 'bg-white/10 border-white/20' : 'bg-transparent border-white/5 hover:bg-white/5'}`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`text-mono text-[11px] uppercase tracking-widest transition-colors ${isActive ? 'text-white' : 'text-white/60'}`}>
                      {profile.name}
                    </span>
                  </div>
                  
                  <div className={`overflow-hidden transition-all duration-500 ${isActive ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'}`}>
                    {profile.threshold && <span className="text-display-md text-[var(--granular-dim-socioeconomy)] block mb-3">{profile.threshold}</span>}
                    <p className="text-sm text-white/80 leading-relaxed mb-3">{profile.desc}</p>
                    <p className="text-xs text-white/50 border-l border-white/10 pl-2"><span className="text-white/80">Ejemplos territoriales:</span> {profile.examples}</p>
                    
                    {(profile.id === "metropolitanas" || profile.id === "dispersas") && (
                      <p className="mt-4 text-xs text-amber-500/90 border-l-2 border-amber-500/50 pl-3 bg-amber-500/5 py-2 pr-2">
                        Advertencia: No se documenta la fórmula, el año ni la fuente completa del Índice de Marginación (IMN).
                      </p>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

        </div>

        {/* MAPA Y VISOR */}
        <div className="lg:col-span-7 flex flex-col gap-4 order-1 lg:order-2 px-6 md:px-0">
          <button 
            onClick={() => setIsViewerOpen(true)}
            className="w-full relative aspect-[4/3] md:aspect-square lg:aspect-[4/3] rounded-[var(--radius-panel)] overflow-hidden border border-white/10 group bg-[#0A0A0A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--granular-dim-socioeconomy)] focus-visible:ring-offset-4 focus-visible:ring-offset-[#050505]"
            aria-label="Abrir mapas de marginación"
          >
            <Image
              src="/portfolio-media/audit/block-19/page-33-commuting-margination-audit.png" // Fallback to audit
              alt="Mapa de localidades representadas mediante categorías de marginación dentro de la Comarca Lagunera."
              fill
              className="object-contain transition-transform duration-700 group-hover:scale-[1.02]"
              unoptimized
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
               <div className="opacity-0 group-hover:opacity-100 bg-black/80 text-white text-mono text-[10px] uppercase tracking-widest px-4 py-2 rounded-full border border-white/20 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0">
                 Ampliar mapas
               </div>
            </div>
          </button>
          
          <div className="flex flex-col gap-2 px-2">
            <p className="text-body text-sm text-white/70">
              {margination.captionLocalities}
            </p>
          </div>
        </div>

      </div>

      {/* EXCLUSIÓN TERRITORIAL */}
      <div className="mt-8 px-6 md:px-0">
         <div className="max-w-4xl flex flex-col gap-6 p-6 md:p-8 bg-[#111] border border-white/5 rounded-[var(--radius-panel)]">
            <h4 className="text-mono text-[10px] text-[var(--granular-dim-socioeconomy)] uppercase tracking-widest">
              Interpretación de la Fuente
            </h4>
            <div className="text-sm md:text-base text-white/80 leading-relaxed flex flex-col gap-4">
              <p>{margination.exclusionText1}</p>
              <p className="text-xs text-amber-500/80 border-l-2 border-amber-500/30 pl-3">
                {margination.exclusionText2}
              </p>
            </div>
         </div>
      </div>

      <ImageViewer 
        isOpen={isViewerOpen}
        onClose={() => setIsViewerOpen(false)}
        highResSrc="/portfolio-media/audit/block-19/page-33-commuting-margination-audit.png"
        altText="Mapa de localidades y marginación"
      />
    </section>
  );
}
