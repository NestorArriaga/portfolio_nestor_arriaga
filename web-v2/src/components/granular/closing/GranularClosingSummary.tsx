"use client";

import { granularClosing } from "@/content/cases/granular/granular-closing";

export default function GranularClosingSummary() {
  const { title, subtitle, summaryText, metrics } = granularClosing;

  return (
    <section id="cierre" className="w-full py-24 md:py-32 flex flex-col gap-16 border-b border-white/10 relative overflow-hidden bg-[#0A0A0A]">
      
      <div className="flex flex-col gap-8 max-w-5xl px-6 md:px-12 mx-auto w-full text-center items-center">
        <h3 className="text-display-md text-white">
          <span className="block text-white/50 text-xl md:text-2xl mb-1">{title}</span>
          <span className="block text-white">{subtitle}</span>
        </h3>
        
        <p className="text-body text-white/80 text-lg max-w-2xl">
          {summaryText}
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mt-12 w-full max-w-4xl border-t border-white/10 pt-12">
          {metrics.map((metric, idx) => (
            <div key={idx} className="flex flex-col gap-2 items-center">
               <span className="text-display-md text-white font-light">{metric.value}</span>
               <span className="text-mono text-[9px] text-white/40 uppercase tracking-widest max-w-[120px]">{metric.label}</span>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
