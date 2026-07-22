"use client";

import UrbanClimateHero from "./UrbanClimateHero";
import UrbanClimateEvidenceReader from "./UrbanClimateEvidenceReader";
import { urbanClimate } from "@/content/cases/urban-challenge/urban-climate";

export default function UrbanClimateChapter() {
  const { chapterIntroduction, climateDesignRelationship } = urbanClimate;

  return (
    <section id="viento-y-calor" className="w-full flex flex-col gap-24 pb-32 border-b border-white/10">
      <UrbanClimateHero />

      <div className="w-full max-w-4xl mx-auto flex flex-col gap-16 px-6">
        
        {/* Intro */}
        <div className="flex flex-col gap-8">
          <h3 className="text-heading text-white">{chapterIntroduction.statement}</h3>
          <p className="text-body text-white/70">Esta información orientó:</p>
          <ul className="flex flex-col gap-2">
            {chapterIntroduction.orientation.map((item, i) => (
              <li key={i} className="text-body text-white/50 flex gap-4">
                <span className="text-[var(--urban-accent)]">•</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Evidence Reader */}
        <div className="w-full flex flex-col gap-8 border-t border-white/10 pt-16">
          <UrbanClimateEvidenceReader />
        </div>

        {/* Causal Sequence Note */}
        <div className="w-full flex flex-col gap-4 bg-[var(--urban-accent)]/10 border border-[var(--urban-accent)]/30 rounded p-6">
          <h4 className="text-mono text-xs text-[var(--urban-accent)] tracking-widest uppercase mb-4">
            SECUENCIA DE DECISIONES DESCRITA EN LA PÁGINA
          </h4>
          <div className="flex flex-wrap items-center gap-2 text-mono text-[9px] text-[var(--urban-accent)]/80">
            {climateDesignRelationship.sequence.map((step, idx) => (
              <span key={step} className="flex items-center gap-2">
                <span className="bg-[var(--urban-accent)]/20 px-2 py-1 rounded">{step}</span>
                {idx < climateDesignRelationship.sequence.length - 1 && <span>→</span>}
              </span>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
