"use client";

import { urbanPlayRing } from "@/content/cases/urban-challenge/urban-play-ring";
import UrbanPlayRingHero from "./UrbanPlayRingHero";
import UrbanPlayRingReader from "./UrbanPlayRingReader";

export default function UrbanPlayRingChapter() {
  return (
    <section 
      id={urbanPlayRing.chapter.id} 
      className="w-full flex flex-col scroll-mt-24"
    >
      <UrbanPlayRingHero />

      <div className="w-full max-w-5xl mx-auto flex flex-col px-6 py-24 gap-24">
        
        {/* Intro */}
        <div className="w-full md:w-2/3 flex flex-col gap-6">
          <h3 className="text-2xl md:text-3xl font-light text-white leading-snug">
            {urbanPlayRing.chapter.subtitle}
          </h3>
          <div className="flex flex-col gap-4 text-white/60 font-light leading-relaxed">
            <p>Un espacio de juego que evita funcionar como un área aislada con aparatos, proponiendo en cambio una estructura para moverse y activar el cuerpo a través del propio recorrido.</p>
            <p className="text-[11px] text-[var(--urban-accent)] uppercase tracking-widest mt-2">
              DISTINCIÓN TÉCNICA: El Anillo de Juego corresponde a una narrativa y geometría independientes al Anillo Central. No son el mismo elemento.
            </p>
          </div>
        </div>

        {/* Narrative Reader */}
        <div className="flex flex-col gap-6">
          <h3 className="text-mono text-[10px] text-white/50 tracking-widest uppercase border-b border-white/10 pb-4">
            {urbanPlayRing.experience.title}
          </h3>
          <UrbanPlayRingReader />
        </div>

        {/* Scope Limitations */}
        <div className="w-full flex flex-col gap-6 pt-12 border-t border-white/10">
          <h3 className="text-mono text-[10px] text-white/40 tracking-widest uppercase">
            ALCANCE DEL CAPÍTULO Y LA FUENTE
          </h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <li className="flex gap-3 text-sm text-white/50 font-light">
              <span className="text-[var(--urban-accent)] mt-0.5">/</span>
              <span className="leading-relaxed">El juego se presenta como experiencia espacial y no como un catálogo de aparatos u objetos estáticos.</span>
            </li>
            <li className="flex gap-3 text-sm text-white/50 font-light">
              <span className="text-[var(--urban-accent)] mt-0.5">/</span>
              <span className="leading-relaxed">No se documentan parámetros como edades recomendadas, material amortiguante o alturas de caída.</span>
            </li>
            <li className="flex gap-3 text-sm text-white/50 font-light">
              <span className="text-[var(--urban-accent)] mt-0.5">/</span>
              <span className="leading-relaxed">No se incluye análisis de seguridad infantil, evaluación de riesgos, ni cumplimiento normativo sobre juegos infantiles.</span>
            </li>
            <li className="flex gap-3 text-sm text-white/50 font-light">
              <span className="text-[var(--urban-accent)] mt-0.5">/</span>
              <span className="leading-relaxed">No se documentan dimensiones arquitectónicas o estructurales para las plataformas ni para el recorrido continuo.</span>
            </li>
          </ul>
        </div>

      </div>
    </section>
  );
}
