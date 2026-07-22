"use client";

import { granularEnvironment } from "@/content/cases/granular/granular-environment";

export default function GranularEnvironmentConcept() {
  const { chapterIntroduction, concepts } = granularEnvironment;

  return (
    <section id="limites-ecologicos" className="w-full py-24 md:py-32 flex flex-col gap-16 border-b border-white/10 relative overflow-hidden">
      
      {/* Decorative Blur */}
      <div className="absolute top-1/2 -left-32 w-96 h-96 bg-[var(--granular-dim-environment)]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="flex flex-col gap-12 max-w-5xl px-6 md:px-0 relative z-10 mx-auto w-full">
        <h3 className="text-display-md text-white max-w-4xl">
          {chapterIntroduction.title}
        </h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
          <div className="flex flex-col gap-6 text-body text-white/80 text-lg">
            <p>{chapterIntroduction.text1}</p>
            <p className="border-l-2 border-[var(--granular-dim-environment)]/50 pl-4">{chapterIntroduction.text2}</p>
            <p>{chapterIntroduction.text3}</p>
            <p className="text-white/60">{chapterIntroduction.text4}</p>
          </div>

          <div className="flex flex-col justify-center border-l border-white/10 pl-8 lg:pl-12">
            <div className="flex flex-col gap-6">
              {concepts.map((concept, idx) => (
                 <div key={idx} className="flex items-center gap-4">
                   <div className="w-8 h-[1px] bg-white/20" />
                   <span className="text-mono text-xs text-[var(--granular-dim-environment)] tracking-widest">{concept}</span>
                 </div>
              ))}
            </div>
          </div>
        </div>

      </div>

    </section>
  );
}
