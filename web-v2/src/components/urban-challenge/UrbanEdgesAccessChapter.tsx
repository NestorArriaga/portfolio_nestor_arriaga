"use client";

import UrbanEdgesHero from "./UrbanEdgesHero";
import UrbanEdgeConditionReader from "./UrbanEdgeConditionReader";
import { urbanEdgesAccess } from "@/content/cases/urban-challenge/urban-edges-access";

export default function UrbanEdgesAccessChapter() {
  const { chapterIntroduction, socialDynamicsTreatment, limitations } = urbanEdgesAccess;

  return (
    <section id="bordes-y-accesos" className="w-full flex flex-col gap-24 pb-32 border-b border-white/10">
      <UrbanEdgesHero />

      <div className="w-full max-w-4xl mx-auto flex flex-col gap-16 px-6">
        
        {/* Intro */}
        <div className="flex flex-col gap-8">
          <h3 className="text-heading text-white">{chapterIntroduction.statement}</h3>
          <p className="text-body text-white/50">{chapterIntroduction.note}</p>
        </div>

        {/* Reader */}
        <div className="w-full flex flex-col gap-8 border-t border-white/10 pt-16">
          <UrbanEdgeConditionReader />
        </div>

        {/* Dinámicas Sociales */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-white/10 pt-16">
          <div className="flex flex-col gap-3">
            <span className="text-mono text-[10px] text-white/50 uppercase tracking-widest">DINÁMICAS SOCIALES</span>
            <p className="text-body text-white/80">{socialDynamicsTreatment.statement}</p>
          </div>
          <div className="flex flex-col gap-3 bg-white/5 p-6 rounded border border-white/10">
            <span className="text-mono text-[10px] text-[var(--urban-accent)] uppercase tracking-widest">
              RESTRICCIÓN DOCUMENTAL
            </span>
            <p className="text-body text-[var(--urban-accent)]/80 text-sm">{socialDynamicsTreatment.note}</p>
          </div>
        </div>

      </div>
    </section>
  );
}
