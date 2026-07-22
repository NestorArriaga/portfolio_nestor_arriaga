"use client";

import Link from "next/link";
import { granularConnectivity } from "@/content/cases/granular/granular-connectivity";

export default function GranularConnectivityToClustering() {
  const { nextChapterPreview } = granularConnectivity;

  return (
    <section className="w-full py-24 md:py-32 flex flex-col gap-12">
      
      <div className="flex flex-col gap-8 px-6 md:px-0">
        
        <div className="flex items-center gap-4">
          <span className="text-mono text-[10px] text-white/50 uppercase tracking-widest bg-white/5 px-3 py-1 rounded-full border border-white/10">
            {nextChapterPreview.status}
          </span>
        </div>

        <h3 className="text-display-md text-white">
          <span className="block text-white/50 text-2xl mb-2">{nextChapterPreview.number}</span>
          <span className="block text-white/90 max-w-2xl">{nextChapterPreview.title}</span>
        </h3>

        <div className="max-w-2xl text-body text-white/80 flex flex-col gap-4">
          <p>{nextChapterPreview.desc1}</p>
          <p>{nextChapterPreview.desc2}</p>
        </div>

        <div className="flex gap-8 border-t border-white/10 pt-8 mt-4 max-w-2xl">
          <div>
            <div className="text-mono text-[9px] text-white/40 uppercase tracking-widest mb-1">Páginas Fuente</div>
            <div className="text-mono text-[12px] text-white/80">{nextChapterPreview.sourcePages.join('–')}</div>
          </div>
        </div>

      </div>

    </section>
  );
}
