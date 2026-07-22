"use client";

import { granularGovernance } from "@/content/cases/granular/granular-governance";

export default function GranularGovernanceConcept() {
  const { chapterIntroduction } = granularGovernance;

  return (
    <section id="instituciones-y-escalas" className="w-full py-24 md:py-32 flex flex-col gap-16 border-b border-white/10 relative overflow-hidden">
      
      {/* Decorative Blur */}
      <div className="absolute top-1/2 -right-32 w-96 h-96 bg-[var(--granular-dim-governance)]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="flex flex-col gap-8 max-w-4xl px-6 md:px-0 relative z-10">
        <h3 className="text-display-md text-white">
          {chapterIntroduction.title}
        </h3>
        
        <div className="flex flex-col gap-6 text-body text-white/80 text-lg md:text-xl">
          <p>{chapterIntroduction.text1}</p>
          <p className="border-l-2 border-[var(--granular-dim-governance)]/50 pl-4">{chapterIntroduction.text2}</p>
          <p>{chapterIntroduction.text3}</p>
        </div>
      </div>

    </section>
  );
}
