"use client";

import { granularWater } from "@/content/cases/granular/granular-water";

export default function GranularWaterConcept() {
  const { chapterIntroduction, conceptualVariables } = granularWater;

  return (
    <section id="agua-como-eje" className="w-full py-24 md:py-32 flex flex-col gap-16 border-b border-white/10">
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
        
        {/* TEXTO EDITORIAL */}
        <div className="flex flex-col gap-8 max-w-2xl">
          <h3 className="text-display-md text-white">
            {chapterIntroduction.title}
          </h3>
          
          <div className="text-body text-white/80 text-lg flex flex-col gap-6">
            <p>{chapterIntroduction.text1}</p>
            <p>{chapterIntroduction.text2}</p>
            <p className="text-white/90 font-medium">{chapterIntroduction.text3}</p>
          </div>
        </div>

        {/* COMPOSICIÓN CONCEPTUAL */}
        <div className="flex flex-col gap-8 bg-[#111] p-8 md:p-12 rounded-[var(--radius-panel)] border border-white/5 relative overflow-hidden">
          
          {/* Subtle background context */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--granular-dim-water)]/5 rounded-full blur-3xl" />

          <div className="text-mono text-[9px] text-[var(--granular-dim-water)]/70 uppercase tracking-widest mb-4">
            Variables de la lectura hídrica
          </div>

          <div className="flex flex-col gap-6 relative z-10">
            {conceptualVariables.map((variable, idx) => (
              <div key={idx} className="flex items-center gap-4">
                <span className="text-mono text-[10px] text-white/30">0{idx + 1}</span>
                <div className="h-px w-8 bg-white/10" />
                <span className="text-display-sm text-white/90 tracking-wide">{variable}</span>
              </div>
            ))}
          </div>
          
        </div>
        
      </div>
      
    </section>
  );
}
