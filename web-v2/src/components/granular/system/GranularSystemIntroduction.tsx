"use client";

import { granularSystem } from "@/content/cases/granular/granular-system";

export default function GranularSystemIntroduction() {
  const { introduction } = granularSystem;

  return (
    <section id="concepto-sistema" className="w-full py-24 md:py-32 flex flex-col gap-16 border-b border-white/10 relative overflow-hidden bg-[#0A0A0A]">
      
      <div className="flex flex-col gap-12 max-w-5xl px-6 md:px-0 relative z-10 mx-auto w-full">
        <h3 className="text-display-md text-white max-w-3xl">
          LA LÓGICA COMPLETA DEL ANÁLISIS
        </h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
          <div className="flex flex-col gap-6 text-body text-white/80 text-lg">
            <p>{introduction.text1}</p>
            <p>{introduction.text2}</p>
            <p className="text-white/60">{introduction.text3}</p>
          </div>

          <div className="flex flex-col justify-center border-l border-white/10 pl-8 lg:pl-12">
            <div className="p-4 bg-amber-500/5 border-l-2 border-amber-500/50">
              <p className="text-xs text-amber-500/90 leading-relaxed">
                {introduction.warning}
              </p>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}
