"use client";

import { granularWater } from "@/content/cases/granular/granular-water";

export default function GranularWaterLimitations() {
  const { limitations } = granularWater;

  return (
    <section id="alcance-agua" className="w-full py-24 md:py-32 flex flex-col gap-8 border-b border-white/10">
      
      <div className="flex flex-col gap-4 max-w-3xl px-6 md:px-0">
        <h3 className="text-display-md text-white">
          {limitations.title}
        </h3>
        <p className="text-body text-white/80">
          {limitations.text}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-x-12 md:gap-y-6 mt-4 px-6 md:px-0 max-w-4xl">
        {limitations.points.map((point, idx) => (
          <div key={idx} className="flex gap-4 items-start">
             <span className="text-mono text-[10px] text-white/30 mt-1">0{idx+1}</span>
             <p className="text-sm text-white/70">{point}</p>
          </div>
        ))}
      </div>

    </section>
  );
}
