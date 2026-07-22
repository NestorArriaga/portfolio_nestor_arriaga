"use client";

import { granularConnectivity } from "@/content/cases/granular/granular-connectivity";

export default function GranularConnectivityLimitations() {
  const { limitations, commutingComparison } = granularConnectivity;

  return (
    <section id="alcance-conectividad" className="w-full py-24 md:py-32 flex flex-col gap-12 border-b border-white/10">
      
      {/* DISTINCION COMMUTING */}
      <div className="px-6 md:px-0 max-w-4xl">
         <div className="flex flex-col gap-4 p-6 md:p-8 bg-[#111] border border-white/5 rounded-[var(--radius-panel)]">
            <h4 className="text-mono text-[12px] text-amber-500/90 uppercase tracking-widest">
              {commutingComparison.title}
            </h4>
            <p className="text-sm md:text-base text-white/80 leading-relaxed">
              {commutingComparison.text1}
            </p>
            <div className="mt-4">
              <a href="#commuting" className="inline-flex items-center gap-2 text-mono text-[10px] text-white hover:text-amber-500 transition-colors uppercase tracking-widest">
                Revisar Socioeconomía →
              </a>
            </div>
         </div>
      </div>

      {/* LIMITACIONES */}
      <div className="flex flex-col gap-4 max-w-3xl px-6 md:px-0 mt-8">
        <h3 className="text-display-md text-white">
          {limitations.title}
        </h3>
        <p className="text-body text-white/80">
          {limitations.text}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-x-12 md:gap-y-6 mt-4 px-6 md:px-0 max-w-5xl">
        {limitations.points.map((point, idx) => (
          <div key={idx} className="flex gap-4 items-start">
             <span className="text-mono text-[10px] text-[var(--granular-dim-connectivity)] mt-1">0{idx+1}</span>
             <p className="text-sm text-white/70">{point}</p>
          </div>
        ))}
      </div>

    </section>
  );
}
