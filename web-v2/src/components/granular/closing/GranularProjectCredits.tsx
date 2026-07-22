"use client";

import { granularClosing } from "@/content/cases/granular/granular-closing";

export default function GranularProjectCredits() {
  const { credits } = granularClosing;

  return (
    <section id="creditos-granular" className="w-full py-16 flex justify-center border-b border-white/10 bg-[#050505]">
      <div className="flex flex-col gap-4 max-w-3xl px-6 md:px-0 text-center items-center">
        <span className="text-mono text-[10px] text-white/40 uppercase tracking-widest">{credits.title}</span>
        <p className="text-xs text-white/60 leading-relaxed max-w-xl">
          {credits.text}
        </p>
      </div>
    </section>
  );
}
