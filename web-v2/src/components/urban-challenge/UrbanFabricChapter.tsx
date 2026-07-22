"use client";

import UrbanFabricHero from "./UrbanFabricHero";
import UrbanMassingModelComparison from "./UrbanMassingModelComparison";
import { urbanUrbanFabric } from "@/content/cases/urban-challenge/urban-urban-fabric";

export default function UrbanFabricChapter() {
  const { chapterId, chapterIntroduction, modelDescriptions, structuralVoidReading, compactFabricTreatment, homogeneityTreatment, limitations } = urbanUrbanFabric;

  return (
    <section id="tejido-urbano" className="w-full flex flex-col gap-24 pb-32 border-b border-white/10">
      <UrbanFabricHero />

      <div className="w-full max-w-4xl mx-auto flex flex-col gap-16 px-6">
        
        {/* Intro */}
        <div className="flex flex-col gap-8">
          <h3 className="text-heading text-white">{modelDescriptions.explanation}</h3>
          <p className="text-body text-white/70">{chapterIntroduction.statement}</p>
          <ul className="flex flex-col gap-2">
            {chapterIntroduction.purpose.map((item, i) => (
              <li key={i} className="text-body text-white/50 flex gap-4">
                <span className="text-[var(--urban-accent)]">•</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Model Comparison */}
        <div className="w-full flex flex-col gap-8 border-t border-white/10 pt-16">
          <div className="flex flex-col gap-2">
            <span className="text-mono text-xs text-[var(--urban-accent)] tracking-widest uppercase">
              #modelacion-tridimensional
            </span>
            <h4 className="text-2xl font-light text-white">DOS PERSPECTIVAS DEL ENTORNO INMEDIATO</h4>
          </div>
          
          <UrbanMassingModelComparison />
        </div>

        {/* Lleno/Vacío Reading */}
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-white/10 pt-16">
          {structuralVoidReading.blocks.map((block, i) => (
            <div key={i} className="flex flex-col gap-3">
              <span className="text-mono text-[10px] text-white/50 uppercase tracking-widest">{block.title}</span>
              <p className="text-body text-white/80">{block.description}</p>
            </div>
          ))}
          <div className="col-span-1 md:col-span-3 text-mono text-[10px] text-white/40 mt-4 border-l border-white/10 pl-4">
            {structuralVoidReading.note}
          </div>
        </div>

        {/* Warning: Homogeneity */}
        <div className="w-full flex flex-col gap-4 bg-[var(--urban-accent)]/10 border border-[var(--urban-accent)]/30 rounded p-6">
          <h4 className="text-mono text-xs text-[var(--urban-accent)] tracking-widest uppercase">
            RESTRICCIÓN DOCUMENTAL
          </h4>
          <p className="text-body text-[var(--urban-accent)]/90">
            {compactFabricTreatment} {homogeneityTreatment}
          </p>
        </div>

      </div>
    </section>
  );
}
