"use client";

import { urbanTopographyWater } from "@/content/cases/urban-challenge/urban-topography-water";

export default function UrbanIntegratedSiteReading() {
  const { integratedReading } = urbanTopographyWater;

  return (
    <div className="w-full bg-[var(--urban-accent)]/5 border border-[var(--urban-accent)]/20 p-8 md:p-12 rounded mt-24">
      <div className="flex flex-col gap-8 max-w-4xl mx-auto">
        <h3 className="text-2xl font-light text-white text-center mb-8">
          {integratedReading.title}
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {Object.entries(integratedReading.sequence).map(([key, val]) => (
            <div key={key} className="flex flex-col gap-2 relative pl-4 border-l border-[var(--urban-accent)]/30">
              <span className="text-mono text-[9px] text-[var(--urban-accent)] uppercase tracking-widest">{key}</span>
              <p className="text-body text-white/80 text-sm">{val}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center border-t border-[var(--urban-accent)]/20 pt-8">
          <span className="text-mono text-[10px] text-[var(--urban-accent)]/60 tracking-widest uppercase">
            {integratedReading.note}
          </span>
        </div>
      </div>
    </div>
  );
}
