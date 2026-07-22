"use client";

import { urbanElevatedSpine } from "@/content/cases/urban-challenge/urban-elevated-spine";
import UrbanElevatedSpineHero from "./UrbanElevatedSpineHero";
import UrbanElevatedSpineReader from "./UrbanElevatedSpineReader";

export default function UrbanElevatedSpineChapter() {
  return (
    <section 
      id="espina-dorsal" 
      className="w-full flex flex-col scroll-mt-24"
    >
      <UrbanElevatedSpineHero />

      <div className="w-full max-w-5xl mx-auto flex flex-col px-6 py-24 gap-24">
        
        {/* Intro / Funciones */}
        <div className="flex flex-col gap-12">
          <div className="w-full border-b border-white/10 pb-6 flex items-center justify-between">
            <h3 className="text-mono text-[10px] text-white/50 tracking-widest uppercase">
              FUNCIONES DESCRITAS
            </h3>
            <span className="text-mono text-[9px] text-[var(--urban-accent)] px-2 py-1 bg-[var(--urban-accent)]/10 rounded">
              INTENCIONES PROYECTADAS
            </span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {urbanElevatedSpine.functions.map(func => (
              <div key={func.id} className="flex flex-col gap-3">
                <span className="text-mono text-[10px] text-white/70 uppercase tracking-widest border-l-2 border-[var(--urban-accent)] pl-3">
                  {func.title}
                </span>
                <p className="text-sm font-light text-white/50 leading-relaxed pl-3.5">
                  {func.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Notes (Water, Shade, Wind) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/5 p-6 rounded-sm border border-white/10 flex flex-col gap-4">
            <span className="text-mono text-[9px] text-[var(--urban-accent)] tracking-widest uppercase">
              DINÁMICA HÍDRICA
            </span>
            <p className="text-sm text-white/80 font-light leading-relaxed">
              {urbanElevatedSpine.hydrologicalNote.text}
            </p>
            <p className="text-[11px] text-white/40 pt-4 border-t border-white/10">
              {urbanElevatedSpine.hydrologicalNote.limitation}
            </p>
          </div>
          
          <div className="bg-white/5 p-6 rounded-sm border border-white/10 flex flex-col gap-4">
            <span className="text-mono text-[9px] text-[var(--urban-accent)] tracking-widest uppercase">
              SOMBRA CONTINUA
            </span>
            <p className="text-sm text-white/80 font-light leading-relaxed">
              {urbanElevatedSpine.shadeNote.text}
            </p>
            <p className="text-[11px] text-white/40 pt-4 border-t border-white/10">
              {urbanElevatedSpine.shadeNote.limitation}
            </p>
          </div>

          <div className="bg-white/5 p-6 rounded-sm border border-white/10 flex flex-col gap-4">
            <span className="text-mono text-[9px] text-[var(--urban-accent)] tracking-widest uppercase">
              VENTILACIÓN CRUZADA
            </span>
            <p className="text-sm text-white/80 font-light leading-relaxed">
              {urbanElevatedSpine.ventilationNote.text}
            </p>
            <p className="text-[11px] text-white/40 pt-4 border-t border-white/10">
              {urbanElevatedSpine.ventilationNote.limitation}
            </p>
          </div>
        </div>

        {/* Reader */}
        <UrbanElevatedSpineReader />

        {/* Scope Limitations */}
        <div className="w-full flex flex-col gap-6 pt-12 border-t border-white/10">
          <h3 className="text-mono text-[10px] text-white/40 tracking-widest uppercase">
            ALCANCE DE LA ESTRUCTURA EN LA FUENTE
          </h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {urbanElevatedSpine.scopeLimitations.map((limitation, i) => (
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
