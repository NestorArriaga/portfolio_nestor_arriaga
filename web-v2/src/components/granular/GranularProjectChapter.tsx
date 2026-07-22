"use client";

import { granularFoundation } from "@/content/cases/granular/granular-foundation";
import { motion } from "framer-motion";

export default function GranularProjectChapter() {
  const { chapter00, project } = granularFoundation;
  
  return (
    <section id="proyecto" className="w-full pt-32 pb-24 md:py-48 flex flex-col gap-16 border-b border-white/10">
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
        
        {/* TEXTO EDITORIAL */}
        <div className="lg:col-span-7 flex flex-col gap-8">
          <h2 className="text-display-md text-white max-w-2xl">
            {chapter00.title}
          </h2>
          
          <div className="text-body text-white/80 max-w-xl flex flex-col gap-6 text-lg">
            <p>{chapter00.text1}</p>
            <p>{chapter00.text2}</p>
          </div>
        </div>

        {/* FICHA TÉCNICA */}
        <div className="lg:col-span-5 bg-white/5 border border-white/10 p-6 md:p-8 rounded-[var(--radius-panel)] flex flex-col gap-8">
          <div className="grid grid-cols-2 gap-y-8 gap-x-4">
            
            <div>
              <div className="text-mono text-[10px] text-white/40 uppercase tracking-widest border-b border-white/10 pb-2 mb-3">Proyecto</div>
              <div className="text-sm text-white/90 font-medium">GRANULAR</div>
            </div>
            
            <div>
              <div className="text-mono text-[10px] text-white/40 uppercase tracking-widest border-b border-white/10 pb-2 mb-3">Iniciativa</div>
              <div className="text-sm text-white/90">{project.initiative.replace('Proyecto GRANULAR — ', '')}</div>
            </div>
            
            <div>
              <div className="text-mono text-[10px] text-white/40 uppercase tracking-widest border-b border-white/10 pb-2 mb-3">Caso</div>
              <div className="text-sm text-white/90">{project.territory}</div>
            </div>
            
            <div>
              <div className="text-mono text-[10px] text-white/40 uppercase tracking-widest border-b border-white/10 pb-2 mb-3">Marco</div>
              <div className="text-sm text-white/90">{project.framework}</div>
            </div>

          </div>

          <div className="grid grid-cols-3 gap-4 pt-8 border-t border-white/10">
            <div className="flex flex-col items-center text-center">
              <div className="text-display-sm text-[var(--granular-dim-water)]">{project.dimensions.length}</div>
              <div className="text-mono text-[9px] text-white/50 uppercase tracking-widest">Dimensiones</div>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="text-display-sm text-white">{project.scales.length}</div>
              <div className="text-mono text-[9px] text-white/50 uppercase tracking-widest">Escalas</div>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="text-display-sm text-white/70">{project.totalSourcePages}</div>
              <div className="text-mono text-[9px] text-white/50 uppercase tracking-widest">Páginas Fuente</div>
            </div>
          </div>
        </div>
        
      </div>
      
    </section>
  );
}
