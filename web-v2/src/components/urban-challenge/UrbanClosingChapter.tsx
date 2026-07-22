"use client";

import { urbanClosing } from "@/content/cases/urban-challenge/urban-closing";
import UrbanClosingHero from "./UrbanClosingHero";
import UrbanClosingSynthesis from "./UrbanClosingSynthesis";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function UrbanClosingChapter() {
  return (
    <section 
      id={urbanClosing.chapter.id} 
      className="w-full flex flex-col scroll-mt-24 pb-24"
    >
      <UrbanClosingHero />

      <div className="w-full max-w-5xl mx-auto flex flex-col px-6 py-24 gap-24">
        
        {/* Intro */}
        <div className="w-full md:w-2/3 flex flex-col gap-6">
          <h3 className="text-2xl md:text-3xl font-light text-white leading-snug">
            {urbanClosing.chapter.subtitle}
          </h3>
          <div className="flex flex-col gap-4 text-white/60 font-light leading-relaxed">
            <p>Se cierra el caso de regeneración urbana de Mérida, concebido como un sistema integral de lectura territorial, intervención arquitectónica y horizonte comunitario.</p>
          </div>
        </div>

        {/* Synthesis Reader */}
        <div className="flex flex-col gap-6">
          <UrbanClosingSynthesis />
        </div>

        {/* Scope Limitations */}
        <div className="w-full flex flex-col gap-6 pt-12 border-t border-white/10">
          <h3 className="text-mono text-[10px] text-white/40 tracking-widest uppercase">
            ALCANCE DEL CAPÍTULO Y LA FUENTE
          </h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <li className="flex gap-3 text-sm text-white/50 font-light">
              <span className="text-[var(--urban-accent)] mt-0.5">/</span>
              <span className="leading-relaxed">El portafolio presenta una propuesta de concurso mediante planos, modelos y renders. No documenta construcción, ejecución o adopción.</span>
            </li>
            <li className="flex gap-3 text-sm text-white/50 font-light">
              <span className="text-[var(--urban-accent)] mt-0.5">/</span>
              <span className="leading-relaxed">Las capturas proporcionan contexto aéreo del sitio etiquetado en la plataforma cartográfica y no muestran un proyecto construido, evolución temporal, o estado &quot;antes/después&quot;.</span>
            </li>
          </ul>
        </div>
        
        {/* Back to Portfolio */}
        <div className="w-full flex justify-center mt-12">
          <Link
            href="/projects"
            className="flex items-center gap-3 px-8 py-4 bg-[var(--urban-accent)]/10 text-[var(--urban-accent)] border border-[var(--urban-accent)]/20 hover:bg-[var(--urban-accent)] hover:text-black transition-colors rounded-sm uppercase tracking-widest text-xs font-medium group"
          >
            VOLVER AL ÍNDICE DE PROYECTOS
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

      </div>
    </section>
  );
}
