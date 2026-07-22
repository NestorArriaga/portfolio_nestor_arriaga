"use client";

import { granularAgriculture } from "@/content/cases/granular/granular-agriculture";

export default function GranularAgricultureConcept() {
  const { chapterIntroduction, conceptualVariables } = granularAgriculture;

  return (
    <section id="sistema-agroproductivo" className="w-full py-24 md:py-32 flex flex-col gap-16 border-b border-white/10">
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
        
        {/* TEXTO EDITORIAL */}
        <div className="flex flex-col gap-8 max-w-2xl">
          <h3 className="text-display-md text-white">
            {chapterIntroduction.title}
          </h3>
          
          <div className="text-body text-white/80 text-lg flex flex-col gap-6">
            <p>{chapterIntroduction.text1}</p>
            <p className="border-l-2 border-[var(--granular-dim-agriculture)]/50 pl-4">{chapterIntroduction.text2}</p>
            <p>{chapterIntroduction.text3}</p>
          </div>
        </div>

        {/* COMPOSICIÓN CONCEPTUAL */}
        <div className="flex flex-col gap-8 bg-[#111] p-8 md:p-12 rounded-[var(--radius-panel)] border border-white/5 relative overflow-hidden">
          
          <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--granular-dim-agriculture)]/5 rounded-full blur-3xl" />

          <div className="text-mono text-[9px] text-[var(--granular-dim-agriculture)]/70 uppercase tracking-widest mb-4 relative z-10">
            Variables de la lectura agrícola
          </div>

          <div className="flex flex-col gap-6 relative z-10">
            {conceptualVariables.map((variable, idx) => (
              <div key={idx} className="flex items-center gap-4 group">
                <span className="text-mono text-[10px] text-white/30 group-hover:text-white/60 transition-colors">0{idx + 1}</span>
                <div className="h-px w-8 bg-white/10 group-hover:bg-[var(--granular-dim-agriculture)]/50 transition-colors" />
                <span className="text-display-sm text-white/90 tracking-wide">{variable}</span>
              </div>
            ))}
          </div>
          
        </div>
        
      </div>
      
    </section>
  );
}
