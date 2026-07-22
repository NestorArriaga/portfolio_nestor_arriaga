"use client";

import { granularTypologies } from "@/content/cases/granular/granular-typologies";

export default function GranularTypologiesLimitations() {
  const { limitations } = granularTypologies;

  return (
    <section id="alcance-tipologias" className="w-full py-24 md:py-32 flex flex-col gap-12 border-b border-white/10">
      
      <div className="flex flex-col gap-4 max-w-3xl px-6 md:px-0">
        <h3 className="text-display-md text-white">
          {limitations.title}
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-x-12 md:gap-y-6 mt-4 px-6 md:px-0 max-w-5xl">
        {limitations.points.map((point, idx) => (
          <div key={idx} className="flex gap-4 items-start">
             <span className="text-mono text-[10px] text-white/40 mt-1">0{idx+1}</span>
             <p className="text-sm text-white/70">{point}</p>
          </div>
        ))}
      </div>

    </section>
  );
}
