"use client";

import Link from "next/link";
import { granularAgriculture } from "@/content/cases/granular/granular-agriculture";

export default function GranularAgricultureToGovernance() {
  const { nextChapterPreview } = granularAgriculture;

  return (
    <section className="w-full py-24 md:py-32 flex flex-col gap-12">
      
      <div className="flex flex-col gap-8 px-6 md:px-0">
        
        <div className="flex items-center gap-4">
          <span className="text-mono text-[10px] text-[var(--granular-dim-governance)] uppercase tracking-widest bg-[var(--granular-dim-governance)]/10 px-3 py-1 rounded-full border border-[var(--granular-dim-governance)]/20">
            {nextChapterPreview.status}
          </span>
        </div>

        <h3 className="text-display-md text-white">
          <span className="block text-white/50 text-2xl mb-2">CAPÍTULO {nextChapterPreview.number}</span>
          <span className="block text-[var(--granular-dim-governance)]">{nextChapterPreview.title}</span>
        </h3>

        <div className="max-w-2xl text-body text-white/80 flex flex-col gap-4">
          <p>{nextChapterPreview.desc}</p>
        </div>

        <div className="flex gap-8 border-t border-white/10 pt-8 mt-4 max-w-2xl">
          <div>
            <div className="text-mono text-[9px] text-white/40 uppercase tracking-widest mb-1">Páginas Fuente</div>
            <div className="text-mono text-[12px] text-white/80">{nextChapterPreview.sourcePages.join('–')}</div>
          </div>
        </div>

        {/* Transition Navigation Anchor */}
        <div className="mt-8">
           <Link 
             href="/projects/granular-comarca-lagunera#gobernanza"
             className="inline-flex items-center gap-3 text-mono text-[11px] text-white bg-white/5 hover:bg-white/10 px-6 py-4 rounded-[var(--radius-panel)] transition-colors border border-white/10 hover:border-[var(--granular-dim-governance)]/50"
           >
             <span>Ver estado del capítulo</span>
             <span>→</span>
           </Link>
        </div>

      </div>

    </section>
  );
}
