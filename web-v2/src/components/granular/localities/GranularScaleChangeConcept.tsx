"use client";

import { granularLocalities } from "@/content/cases/granular/granular-localities";

export default function GranularScaleChangeConcept() {
  const { scaleChange, localHeterogeneity } = granularLocalities;

  return (
    <section id="cambio-de-escala" className="w-full py-24 md:py-32 flex flex-col gap-24 border-b border-white/10 relative overflow-hidden bg-[#0A0A0A]">
      
      {/* SECCIÓN CAMBIO DE ESCALA */}
      <div className="flex flex-col gap-12 max-w-5xl px-6 md:px-0 relative z-10 mx-auto w-full">
        <h3 className="text-display-md text-white max-w-3xl">
          {scaleChange.title}
        </h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
          <div className="flex flex-col gap-6 text-body text-white/80 text-lg">
            <p>{scaleChange.text1}</p>
            <p>{scaleChange.text2}</p>
          </div>

          <div className="flex flex-col justify-center border-l border-white/10 pl-8 lg:pl-12">
            <div className="p-4 bg-amber-500/5 border-l-2 border-amber-500/50">
              <p className="text-xs text-amber-500/90 leading-relaxed">
                {scaleChange.sourceNote}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* SECCIÓN HETEROGENEIDAD INTERNA */}
      <div id="heterogeneidad-interna" className="flex flex-col gap-12 max-w-5xl px-6 md:px-0 relative z-10 mx-auto w-full">
        <h3 className="text-display-md text-white max-w-3xl">
          {localHeterogeneity.title}
        </h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
          <div className="flex flex-col gap-6 text-body text-white/80 text-lg">
            <p>{localHeterogeneity.text1}</p>
            <p className="text-white/60">{localHeterogeneity.text2}</p>
          </div>

          <div className="flex flex-col justify-center border-l border-white/10 pl-8 lg:pl-12">
            <div className="p-4 bg-amber-500/5 border-l-2 border-amber-500/50">
              <p className="text-xs text-amber-500/90 leading-relaxed">
                {localHeterogeneity.sourceNote}
              </p>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}
