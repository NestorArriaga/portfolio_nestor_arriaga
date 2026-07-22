"use client";

import { granularFoundation } from "@/content/cases/granular/granular-foundation";
import { motion } from "framer-motion";
import { useSafeMode } from "@/components/home/motion/SafeModeContext";

export default function GranularConceptFlow() {
  const { conceptFlow } = granularFoundation;
  const safeMode = useSafeMode();

  return (
    <section className="w-full py-24 md:py-32 flex flex-col items-center justify-center border-b border-white/10 text-center px-6">
      
      <div className="max-w-3xl flex flex-col items-center">
        <h2 className="text-display-sm text-white mb-6 uppercase tracking-widest">{conceptFlow.title}</h2>
        <div className="text-mono text-[10px] text-white/40 uppercase tracking-widest border border-white/10 px-4 py-2 rounded mb-16 max-w-xl mx-auto">
          {conceptFlow.disclaimer}
        </div>
        
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 flex-wrap">
          {conceptFlow.steps.map((step, idx) => (
            <div key={idx} className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
              
              <div className="text-mono text-[11px] md:text-[12px] uppercase tracking-widest text-white/80 whitespace-nowrap">
                {step}
              </div>
              
              {idx < conceptFlow.steps.length - 1 && (
                <div className="hidden md:block w-8 h-px bg-white/20" />
              )}
              {idx < conceptFlow.steps.length - 1 && (
                <div className="block md:hidden h-8 w-px bg-white/20" />
              )}
              
            </div>
          ))}
        </div>
      </div>
      
    </section>
  );
}
