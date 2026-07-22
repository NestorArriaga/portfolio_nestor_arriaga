"use client";

import { granularAgriculture } from "@/content/cases/granular/granular-agriculture";

export default function GranularWaterParadox() {
  const { waterParadox } = granularAgriculture;

  return (
    <section id="paradoja-hidrica" className="w-full py-24 md:py-32 flex flex-col gap-16 border-b border-white/10 relative overflow-hidden">
      
      {/* Acentos cromáticos sutiles de la dualidad forraje/alimento */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#FF3366]/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#3399FF]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="flex flex-col gap-8 max-w-4xl px-6 md:px-0 relative z-10">
        <h3 className="text-display-md text-white">
          {waterParadox.title}
        </h3>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 px-6 md:px-0 relative z-10 items-start">
        
        {/* NARRATIVA Y DISCLAIMER */}
        <div className="flex flex-col gap-8">
           <div className="text-body text-white/90 text-lg md:text-xl font-medium leading-relaxed border-l-2 border-[var(--granular-dim-agriculture)]/50 pl-6 py-2">
             &ldquo;Alimentar vacas, no personas&rdquo;
           </div>
           <div className="flex flex-col gap-4 text-body text-white/70">
             <p>{waterParadox.narrativeText1}</p>
             <p>{waterParadox.narrativeText2}</p>
           </div>
           
           <div className="mt-8 p-6 border border-white/10 rounded-[var(--radius-panel)] bg-white/5 backdrop-blur-sm">
             <span className="text-mono text-[9px] text-white/40 uppercase tracking-widest block mb-3">
               ALCANCE DE LA AFIRMACIÓN
             </span>
             <p className="text-xs text-white/60">
               {waterParadox.disclaimer}
             </p>
           </div>
        </div>

        {/* CIFRAS CUALITATIVAS */}
        <div className="flex flex-col gap-12 pt-8 lg:pt-0 lg:border-l lg:border-white/10 lg:pl-16">
           
           <div className="flex flex-col gap-4">
             <span className="text-display-xl text-[var(--granular-dim-agriculture)] tracking-tighter">
               {waterParadox.foragePct}
             </span>
             <p className="text-sm md:text-base text-white/80 max-w-sm">
               {waterParadox.forageDesc}
             </p>
           </div>

           <div className="flex flex-col gap-4">
             <span className="text-display-xl text-white/40 tracking-tighter">
               {waterParadox.foodPct}
             </span>
             <p className="text-sm md:text-base text-white/80 max-w-sm">
               {waterParadox.foodDesc}
             </p>
           </div>

           <div className="mt-8 pt-8 border-t border-white/10">
             <a href="#agua" className="text-mono text-[10px] text-white/60 hover:text-white uppercase tracking-widest transition-colors flex items-center gap-2">
                ← REVISAR CAPÍTULO AGUA
             </a>
           </div>

        </div>

      </div>

    </section>
  );
}
