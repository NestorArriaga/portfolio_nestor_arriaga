"use client";

import Link from "next/link";
import { granularClosing } from "@/content/cases/granular/granular-closing";
import { ArrowRightIcon } from "lucide-react";

export default function GranularNextProject() {
  const { nextProject } = granularClosing;

  return (
    <section id="next-project" className="w-full py-32 flex flex-col justify-center items-center px-6 border-b border-white/10 bg-[#0A0A0A] hover:bg-white/5 transition-colors group cursor-not-allowed">
      <span className="text-mono text-[10px] text-white/50 uppercase tracking-widest mb-4">
        {nextProject.status}
      </span>
      <h3 className="text-display-sm text-white max-w-2xl mb-2 text-center opacity-50 group-hover:opacity-100 transition-opacity">
        {nextProject.title}
      </h3>
      <h2 className="text-display-md text-white max-w-3xl mb-8 text-center opacity-50 group-hover:opacity-100 transition-opacity">
        {nextProject.subtitle}
      </h2>
      
      <div className="flex items-center gap-2 text-white/40">
         <span className="text-mono text-[10px] uppercase tracking-widest">NO DISPONIBLE</span>
      </div>
    </section>
  );
}
