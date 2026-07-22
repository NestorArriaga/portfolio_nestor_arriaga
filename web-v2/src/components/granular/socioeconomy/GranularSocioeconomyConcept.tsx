"use client";

import { granularSocioeconomy } from "@/content/cases/granular/granular-socioeconomy";

export default function GranularSocioeconomyConcept() {
  const { chapterIntroduction } = granularSocioeconomy;

  return (
    <section id="condiciones-de-vida" className="w-full py-24 md:py-32 flex flex-col gap-16 border-b border-white/10 relative overflow-hidden">
      
      {/* Decorative Blur */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[var(--granular-dim-socioeconomy)]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="flex flex-col gap-8 max-w-4xl px-6 md:px-0 relative z-10">
        <h3 className="text-display-md text-white">
          {chapterIntroduction.title}
        </h3>
        
        <div className="flex flex-col gap-6 text-body text-white/80 text-lg md:text-xl">
          <p>{chapterIntroduction.text1}</p>
          <p className="border-l-2 border-[var(--granular-dim-socioeconomy)]/50 pl-4">{chapterIntroduction.text2}</p>
          <p>{chapterIntroduction.text3}</p>
          <p>{chapterIntroduction.text4}</p>
        </div>
      </div>

    </section>
  );
}
