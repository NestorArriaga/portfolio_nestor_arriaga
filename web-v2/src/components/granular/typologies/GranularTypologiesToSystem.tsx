"use client";

import { granularTypologies } from "@/content/cases/granular/granular-typologies";

export default function GranularTypologiesToSystem() {
  const { nextChapterPreview } = granularTypologies;

  return (
    <section id="sistema-territorial-preview" className="w-full py-24 md:py-32 flex flex-col justify-center items-center text-center px-6 border-b border-white/10 bg-[#0A0A0A]">
      <span className="text-mono text-[10px] text-white/50 uppercase tracking-widest mb-4">
        {nextChapterPreview.status}
      </span>
      <h3 className="text-display-sm text-white max-w-2xl mb-6">
        {nextChapterPreview.title}
      </h3>
      <p className="text-body text-white/70 max-w-xl">
        {nextChapterPreview.text1}
      </p>
    </section>
  );
}
