"use client";

import { useState } from "react";
import { granularGovernance } from "@/content/cases/granular/granular-governance";
import { useSafeMode } from "@/components/home/motion/SafeModeContext";

export default function GranularInstitutionalScaleExplorer() {
  const { institutionalScales } = granularGovernance;
  const [activeScale, setActiveScale] = useState<string | null>(null);
  const safeMode = useSafeMode();

  return (
    <section className="w-full py-16 md:py-24 flex flex-col gap-12 border-b border-white/10">
      
      <div className="flex flex-col gap-4 max-w-3xl px-6 md:px-0">
        <h3 className="text-display-sm text-[var(--granular-dim-governance)] uppercase tracking-widest">
          {institutionalScales.title}
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 px-6 md:px-0 relative z-10">
        {institutionalScales.scales.map((scale, idx) => {
          const isActive = activeScale === scale.id;

          if (safeMode) {
             return (
               <div key={scale.id} className="p-6 bg-white/5 border border-white/10 rounded-[var(--radius-panel)] flex flex-col gap-4">
                 <div className="text-mono text-[10px] text-white/30">0{idx + 1}</div>
                 <h4 className="text-display-md text-white">{scale.name}</h4>
                 <p className="text-sm text-white/60 leading-relaxed border-l-2 border-white/10 pl-3">
                   {scale.desc}
                 </p>
               </div>
             );
          }

          return (
            <button
              key={scale.id}
              onClick={() => setActiveScale(isActive ? null : scale.id)}
              className={`p-6 md:p-8 rounded-[var(--radius-panel)] text-left transition-all duration-500 border relative overflow-hidden group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--granular-dim-governance)]
                ${isActive ? 'bg-[var(--granular-dim-governance)]/10 border-[var(--granular-dim-governance)]/30' : 'bg-[#0A0A0A] border-white/5 hover:border-white/20'}`}
              aria-expanded={isActive}
            >
              {/* Background fill animation */}
              <div 
                className={`absolute inset-0 bg-gradient-to-br from-[var(--granular-dim-governance)]/5 to-transparent transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-0'}`} 
              />
              
              <div className="flex flex-col gap-4 relative z-10">
                <div className={`text-mono text-[10px] transition-colors duration-300 ${isActive ? 'text-[var(--granular-dim-governance)]' : 'text-white/30'}`}>
                  0{idx + 1}
                </div>
                
                <h4 className={`text-display-md transition-colors duration-300 ${isActive ? 'text-white' : 'text-white/70'}`}>
                  {scale.name}
                </h4>

                <div 
                  className={`overflow-hidden transition-all duration-500 origin-top ${isActive ? 'max-h-40 opacity-100 mt-2' : 'max-h-0 opacity-0'}`}
                >
                  <p className="text-sm text-white/60 leading-relaxed border-l-2 border-[var(--granular-dim-governance)]/50 pl-3">
                    {scale.desc}
                  </p>
                </div>
              </div>
            </button>
          );
        })}
      </div>
      
      <div className="px-6 md:px-0">
        <div className="text-xs text-white/40 max-w-3xl mt-4 px-4 border-l border-white/10">
          Las instituciones exactas, leyes o mecanismos de coordinación no se documentan a nivel de detalle. El análisis reconoce su superposición sobre el mismo espacio.
        </div>
      </div>

    </section>
  );
}
