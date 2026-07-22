"use client";

import { granularSocioeconomy } from "@/content/cases/granular/granular-socioeconomy";

export default function GranularSocioeconomicMapComparison() {
  const { mapComparison } = granularSocioeconomy;

  return (
    <section id="lectura-socioeconomica" className="w-full py-24 md:py-32 flex flex-col gap-12 border-b border-white/10 bg-[var(--granular-dim-socioeconomy)]/5">
      
      <div className="flex flex-col gap-6 max-w-3xl px-6 md:px-12">
        <h3 className="text-display-md text-white">
          {mapComparison.title}
        </h3>
        <div className="flex flex-col gap-4 text-body text-white/80">
          <p>{mapComparison.text1}</p>
          <p className="border-l-2 border-amber-500/50 pl-4 text-amber-500/90 bg-amber-500/5 py-2">
            {mapComparison.text2}
          </p>
        </div>
      </div>

    </section>
  );
}
