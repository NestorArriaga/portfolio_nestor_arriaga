"use client";

import { urbanVegetationInfiltration } from "@/content/cases/urban-challenge/urban-vegetation-infiltration";
import UrbanVegetationHero from "./UrbanVegetationHero";
import UrbanVegetationInfiltrationReader from "./UrbanVegetationInfiltrationReader";

export default function UrbanVegetationInfiltrationChapter() {
  return (
    <section 
      id="vegetacion-e-infiltracion" 
      className="w-full flex flex-col scroll-mt-24"
    >
      <UrbanVegetationHero />

      <div className="w-full max-w-5xl mx-auto flex flex-col px-6 py-24 gap-24">
        
        {/* Notes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white/5 p-6 rounded-sm border border-white/10 flex flex-col gap-4">
            <span className="text-mono text-[9px] text-[var(--urban-accent)] tracking-widest uppercase">
              DISEÑO DE VEGETACIÓN
            </span>
            <p className="text-sm text-white/80 font-light leading-relaxed">
              {urbanVegetationInfiltration.vegetationDesign.text}
            </p>
            <p className="text-[11px] text-white/40 pt-4 border-t border-white/10">
              {urbanVegetationInfiltration.vegetationDesign.limitation}
            </p>
          </div>
          
          <div className="bg-white/5 p-6 rounded-sm border border-white/10 flex flex-col gap-4">
            <span className="text-mono text-[9px] text-[var(--urban-accent)] tracking-widest uppercase">
              INTENCIÓN DE INFILTRACIÓN
            </span>
            <p className="text-sm text-white/80 font-light leading-relaxed">
              {urbanVegetationInfiltration.infiltrationDesign.text}
            </p>
            <p className="text-[11px] text-white/40 pt-4 border-t border-white/10">
              {urbanVegetationInfiltration.infiltrationDesign.limitation}
            </p>
          </div>
        </div>

        {/* Reader */}
        <UrbanVegetationInfiltrationReader />

        {/* Scope Limitations */}
        <div className="w-full flex flex-col gap-6 pt-12 border-t border-white/10">
          <h3 className="text-mono text-[10px] text-white/40 tracking-widest uppercase">
            ALCANCE DE LA VEGETACIÓN EN LA FUENTE
          </h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {urbanVegetationInfiltration.scopeLimitations.map((limitation, i) => (
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
