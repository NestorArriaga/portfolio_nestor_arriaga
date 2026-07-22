"use client";

import { urbanMasterPlan } from "@/content/cases/urban-challenge/urban-master-plan";
import UrbanMasterPlanHero from "./UrbanMasterPlanHero";
import UrbanMasterPlanSystemReader from "./UrbanMasterPlanSystemReader";
import UrbanMasterPlanFigureComparison from "./UrbanMasterPlanFigureComparison";

export default function UrbanMasterPlanChapter() {
  return (
    <section 
      id="plan-maestro" 
      className="w-full flex flex-col scroll-mt-24"
    >
      <UrbanMasterPlanHero />

      <div className="w-full max-w-5xl mx-auto flex flex-col px-6 py-24 gap-24">
        
        {/* Intro */}
        <div className="w-full md:w-2/3 flex flex-col gap-6">
          <h3 className="text-2xl md:text-3xl font-light text-white leading-snug">
            {urbanMasterPlan.intro[0]}
          </h3>
          <div className="flex flex-col gap-4 text-white/60 font-light leading-relaxed">
            <p>{urbanMasterPlan.intro[1]}</p>
            <p>{urbanMasterPlan.intro[2]}</p>
            <p>{urbanMasterPlan.intro[3]}</p>
            <p className="text-[11px] text-[var(--urban-accent)] uppercase tracking-widest mt-2">
              {urbanMasterPlan.intro[4]}
            </p>
          </div>
        </div>

        {/* Geometry Note */}
        <div className="w-full bg-[var(--urban-accent)]/5 border border-[var(--urban-accent)]/10 p-6 rounded-sm flex flex-col md:flex-row gap-6 items-start">
          <span className="text-mono text-[10px] text-[var(--urban-accent)] tracking-widest uppercase shrink-0 mt-1">
            MORFOLOGÍA
          </span>
          <div className="flex flex-col gap-2">
            <p className="text-sm font-light text-white/90">
              {urbanMasterPlan.geometryNote.text}
            </p>
            <p className="text-[11px] text-white/40">
              {urbanMasterPlan.geometryNote.limitation}
            </p>
          </div>
        </div>

        {/* Figure Comparison */}
        <div className="flex flex-col gap-6">
          <h3 className="text-mono text-[10px] text-white/50 tracking-widest uppercase border-b border-white/10 pb-4">
            IDENTIFICACIÓN DOCUMENTAL
          </h3>
          <UrbanMasterPlanFigureComparison />
        </div>

        {/* System Reader */}
        <div className="flex flex-col gap-6">
          <h3 className="text-mono text-[10px] text-white/50 tracking-widest uppercase border-b border-white/10 pb-4">
            LECTURA DEL SISTEMA
          </h3>
          <UrbanMasterPlanSystemReader />
        </div>

        {/* Scope Limitations */}
        <div className="w-full flex flex-col gap-6 pt-12 border-t border-white/10">
          <h3 className="text-mono text-[10px] text-white/40 tracking-widest uppercase">
            ALCANCE DEL CAPÍTULO Y LA FUENTE
          </h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {urbanMasterPlan.scopeLimitations.map((limitation, i) => (
              <li key={i} className="flex gap-3 text-sm text-white/50 font-light">
                <span className="text-[var(--urban-accent)] mt-0.5">/</span>
                <span className="leading-relaxed">{limitation}</span>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </section>
  );
}
