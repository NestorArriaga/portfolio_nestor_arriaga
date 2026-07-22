"use client";

import { granularGrayZones } from "@/content/cases/granular/granular-gray-zones";

export default function GranularGrayZonesConcept() {
  const { concept, clusteringRelation, ambiguityInterpretation } = granularGrayZones;

  return (
    <section id="concepto-zonas-grises" className="w-full py-24 md:py-32 flex flex-col gap-16 border-b border-white/10 relative overflow-hidden bg-[#0A0A0A]">
      
      <div className="flex flex-col gap-8 max-w-5xl px-6 md:px-0 relative z-10 mx-auto w-full">
        <h3 className="text-display-md text-white max-w-3xl">
          <span className="block text-white/50 text-xl md:text-2xl mb-1">CAPÍTULO 13</span>
          <span className="block text-white">ZONAS GRISES</span>
        </h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 mt-8">
          <div className="flex flex-col gap-6 text-body text-white/80 text-lg">
            <p>{concept.text1}</p>
            <p>{clusteringRelation.text1}</p>
            <p>{ambiguityInterpretation.text1}</p>
          </div>

          <div className="flex flex-col gap-4 border-l border-white/10 pl-8 lg:pl-12">
            <div className="p-4 bg-amber-500/5 border-l-2 border-amber-500/50">
              <p className="text-xs text-amber-500/90 leading-relaxed mb-3">
                {clusteringRelation.warning}
              </p>
              <p className="text-xs text-amber-500/90 leading-relaxed">
                {ambiguityInterpretation.warning}
              </p>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}
