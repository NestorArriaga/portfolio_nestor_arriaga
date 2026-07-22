"use client";

import { urbanCentralRing } from "@/content/cases/urban-challenge/urban-central-ring";
import UrbanCentralRingHero from "./UrbanCentralRingHero";
import UrbanCentralRingReader from "./UrbanCentralRingReader";

export default function UrbanCentralRingChapter() {
  return (
    <section 
      id={urbanCentralRing.chapter.id} 
      className="w-full flex flex-col scroll-mt-24"
    >
      <UrbanCentralRingHero />

      <div className="w-full max-w-5xl mx-auto flex flex-col px-6 py-24 gap-24">
        
        {/* Intro */}
        <div className="w-full md:w-2/3 flex flex-col gap-6">
          <h3 className="text-2xl md:text-3xl font-light text-white leading-snug">
            {urbanCentralRing.chapter.subtitle}
          </h3>
          <div className="flex flex-col gap-4 text-white/60 font-light leading-relaxed">
            <p>El nodo central se configura como un sistema anular que vincula el recorrido, la topografía y el clima, articulando el parque.</p>
            <p className="text-[11px] text-[var(--urban-accent)] uppercase tracking-widest mt-2">
              FORO O VACÍO CENTRAL: Espacio central contenido dentro del sistema anular, no tratado como estructura independiente.
            </p>
          </div>
        </div>

        {/* System Reader */}
        <div className="flex flex-col gap-6">
          <h3 className="text-mono text-[10px] text-white/50 tracking-widest uppercase border-b border-white/10 pb-4">
            {urbanCentralRing.system.title}
          </h3>
          <UrbanCentralRingReader />
        </div>

        {/* Scope Limitations */}
        <div className="w-full flex flex-col gap-6 pt-12 border-t border-white/10">
          <h3 className="text-mono text-[10px] text-white/40 tracking-widest uppercase">
            ALCANCE DEL CAPÍTULO Y LA FUENTE
          </h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <li className="flex gap-3 text-sm text-white/50 font-light">
              <span className="text-[var(--urban-accent)] mt-0.5">/</span>
              <span className="leading-relaxed">No se documentan dimensiones, escala, estructura, apoyos ni cimentación.</span>
            </li>
            <li className="flex gap-3 text-sm text-white/50 font-light">
              <span className="text-[var(--urban-accent)] mt-0.5">/</span>
              <span className="leading-relaxed">No se documenta accesibilidad, aforo, programa ni construcción real.</span>
            </li>
            <li className="flex gap-3 text-sm text-white/50 font-light">
              <span className="text-[var(--urban-accent)] mt-0.5">/</span>
              <span className="leading-relaxed">No se documenta estudio solar, ventilación, superficie permeable, infiltración o compactación de forma calculada.</span>
            </li>
            <li className="flex gap-3 text-sm text-white/50 font-light">
              <span className="text-[var(--urban-accent)] mt-0.5">/</span>
              <span className="leading-relaxed">Foro y vacío central se relacionan como el contenedor y el espacio libre contenido; todas las prestaciones permanecen como intenciones.</span>
            </li>
          </ul>
        </div>

      </div>
    </section>
  );
}
