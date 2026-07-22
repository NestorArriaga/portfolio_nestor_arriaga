"use client";

import { granularFoundation } from "@/content/cases/granular/granular-foundation";
import Image from "next/image";

export default function GranularNextChapter() {
  const { nextChapterPreview } = granularFoundation;

  return (
    <section id="siguiente-capitulo" className="w-full py-24 md:py-32 flex flex-col items-center border-b border-white/10">
      
      <div className="w-full max-w-5xl relative aspect-[21/9] md:aspect-[3/1] bg-white/5 border border-white/10 rounded-[var(--radius-panel)] overflow-hidden flex flex-col justify-end p-6 md:p-12 group cursor-default">
        
        {/* TEXTURA O PREVIEW (Low opacity) */}
        <div className="absolute inset-0 z-0">
           <Image 
            src="/portfolio-media/audit/block-15/page-22-audit.png" 
            alt="Preview Capítulo 03 Agua"
            fill
            className="object-cover opacity-20 mix-blend-screen transition-transform duration-700 group-hover:scale-105"
            unoptimized
           />
           <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/80 to-transparent" />
        </div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-8">
          
          <div className="flex flex-col gap-4 max-w-xl">
            <div className="flex items-center gap-4">
              <span className="text-mono text-[10px] bg-white/10 text-white/60 px-3 py-1.5 rounded uppercase tracking-widest">
                {nextChapterPreview.status}
              </span>
              <span className="text-mono text-[10px] text-white/40 uppercase tracking-widest">
                CAPÍTULO {nextChapterPreview.number}
              </span>
            </div>
            
            <h3 className="text-display-md text-white" style={{ color: "var(--granular-dim-water)" }}>
              {nextChapterPreview.title}
            </h3>
            
            <p className="text-body text-white/70">
              {nextChapterPreview.desc}
            </p>
          </div>

          <div className="flex flex-col gap-1 text-left md:text-right">
             <span className="text-mono text-[9px] text-white/30 uppercase tracking-widest">Páginas Fuente</span>
             <span className="text-mono text-[11px] text-white/60 uppercase">{nextChapterPreview.sourcePages.join(', ')}</span>
          </div>

        </div>

      </div>
      
    </section>
  );
}
