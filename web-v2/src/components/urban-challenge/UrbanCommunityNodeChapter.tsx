"use client";

import { urbanCommunityNode } from "@/content/cases/urban-challenge/urban-community-node";
import UrbanCommunityNodeHero from "./UrbanCommunityNodeHero";
import UrbanCommunityNodeReader from "./UrbanCommunityNodeReader";

export default function UrbanCommunityNodeChapter() {
  return (
    <section 
      id={urbanCommunityNode.chapter.id} 
      className="w-full flex flex-col scroll-mt-24"
    >
      <UrbanCommunityNodeHero />

      <div className="w-full max-w-5xl mx-auto flex flex-col px-6 py-24 gap-24">
        
        {/* Intro */}
        <div className="w-full md:w-2/3 flex flex-col gap-6">
          <h3 className="text-2xl md:text-3xl font-light text-white leading-snug">
            {urbanCommunityNode.chapter.subtitle}
          </h3>
          <div className="flex flex-col gap-4 text-white/60 font-light leading-relaxed">
            <p>La narrativa proyecta el anillo como un soporte abierto para encuentros y usos no predeterminados, donde la vida cotidiana, el encuentro y la permanencia orientan las intenciones espaciales.</p>
          </div>
        </div>

        {/* Narrative Reader */}
        <div className="flex flex-col gap-6">
          <h3 className="text-mono text-[10px] text-white/50 tracking-widest uppercase border-b border-white/10 pb-4">
            {urbanCommunityNode.narrative.title}
          </h3>
          <UrbanCommunityNodeReader />
        </div>

        {/* Scope Limitations */}
        <div className="w-full flex flex-col gap-6 pt-12 border-t border-white/10">
          <h3 className="text-mono text-[10px] text-white/40 tracking-widest uppercase">
            ALCANCE DEL CAPÍTULO Y LA FUENTE
          </h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <li className="flex gap-3 text-sm text-white/50 font-light">
              <span className="text-[var(--urban-accent)] mt-0.5">/</span>
              <span className="leading-relaxed">No se documenta participación vecinal, talleres comunitarios, encuestas o validación social.</span>
            </li>
            <li className="flex gap-3 text-sm text-white/50 font-light">
              <span className="text-[var(--urban-accent)] mt-0.5">/</span>
              <span className="leading-relaxed">No se documenta programa operativo, apropiación observada, aforo real o impacto.</span>
            </li>
            <li className="flex gap-3 text-sm text-white/50 font-light">
              <span className="text-[var(--urban-accent)] mt-0.5">/</span>
              <span className="leading-relaxed">Conversación, asamblea, juego y silencio son posibilidades narrativas expuestas en la fuente.</span>
            </li>
            <li className="flex gap-3 text-sm text-white/50 font-light">
              <span className="text-[var(--urban-accent)] mt-0.5">/</span>
              <span className="leading-relaxed">La vida cotidiana se presenta como un horizonte de diseño y no como resultado comprobable.</span>
            </li>
          </ul>
        </div>

      </div>
    </section>
  );
}
