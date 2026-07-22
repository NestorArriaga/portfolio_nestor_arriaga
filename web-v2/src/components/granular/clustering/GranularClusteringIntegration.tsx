"use client";

import { granularClustering } from "@/content/cases/granular/granular-clustering";

export default function GranularClusteringIntegration() {
  const { chapterIntroduction } = granularClustering;

  return (
    <section id="integracion-dimensional" className="w-full py-24 md:py-32 flex flex-col gap-16 border-b border-white/10 relative overflow-hidden bg-[#0A0A0A]">
      
      <div className="flex flex-col gap-12 max-w-5xl px-6 md:px-0 relative z-10 mx-auto w-full">
        <h3 className="text-display-md text-white max-w-3xl">
          {chapterIntroduction.title}
        </h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
          <div className="flex flex-col gap-6 text-body text-white/80 text-lg">
            <p>{chapterIntroduction.text1}</p>
            <p>{chapterIntroduction.text2}</p>
            <div className="p-3 bg-amber-500/5 border-l-2 border-amber-500/50 mt-4">
              <p className="text-xs text-amber-500/90 leading-relaxed">
                {chapterIntroduction.sourceNote}
              </p>
            </div>
          </div>

          <div className="flex flex-col justify-center border-l border-white/10 pl-8 lg:pl-12">
            <div className="grid grid-cols-2 gap-x-8 gap-y-6">
              {chapterIntroduction.dimensions.map((dim, idx) => (
                 <div key={idx} className="flex items-center gap-3">
                   <div className="w-4 h-[1px] bg-white/20" />
                   <span className="text-mono text-[10px] text-white/60 tracking-widest">{dim}</span>
                 </div>
              ))}
            </div>
          </div>
        </div>

      </div>

    </section>
  );
}
