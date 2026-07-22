"use client";

import { urbanAmphitheater } from "@/content/cases/urban-challenge/urban-amphitheater";
import UrbanAmphitheaterHero from "./UrbanAmphitheaterHero";
import UrbanAmphitheaterReader from "./UrbanAmphitheaterReader";

export default function UrbanAmphitheaterChapter() {
  return (
    <section 
      id="anfiteatro" 
      className="w-full flex flex-col scroll-mt-24"
    >
      <UrbanAmphitheaterHero />

      <div className="w-full max-w-5xl mx-auto flex flex-col px-6 py-24 gap-24">
        
        {/* Notes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white/5 p-6 rounded-sm border border-white/10 flex flex-col gap-4">
            <span className="text-mono text-[9px] text-[var(--urban-accent)] tracking-widest uppercase">
              INFRAESTRUCTURA SOCIAL ACTIVA
            </span>
            <p className="text-sm text-white/80 font-light leading-relaxed">
              {urbanAmphitheater.socialInfrastructure.text}
            </p>
            <p className="text-[11px] text-white/40 pt-4 border-t border-white/10">
              {urbanAmphitheater.socialInfrastructure.limitation}
            </p>
          </div>
          
          <div className="bg-white/5 p-6 rounded-sm border border-white/10 flex flex-col gap-4">
            <span className="text-mono text-[9px] text-[var(--urban-accent)] tracking-widest uppercase">
              RELACIÓN HÍDRICA
            </span>
            <p className="text-sm text-white/80 font-light leading-relaxed">
              {urbanAmphitheater.hydrologicalFunction.text}
            </p>
            <p className="text-[11px] text-white/40 pt-4 border-t border-white/10">
              {urbanAmphitheater.hydrologicalFunction.limitation}
            </p>
          </div>
        </div>

        {/* Reader */}
        <UrbanAmphitheaterReader />

        {/* Scope Limitations */}
        <div className="w-full flex flex-col gap-6 pt-12 border-t border-white/10">
          <h3 className="text-mono text-[10px] text-white/40 tracking-widest uppercase">
            ALCANCE DEL ANFITEATRO EN LA FUENTE
          </h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {urbanAmphitheater.scopeLimitations.map((limitation, i) => (
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
