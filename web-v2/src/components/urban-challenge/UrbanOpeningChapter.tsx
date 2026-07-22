"use client";

import UrbanProgress from "./UrbanProgress";
import { urbanFoundation } from "@/content/cases/urban-challenge/urban-foundation";
import UrbanProposalStatus from "./UrbanProposalStatus";

export default function UrbanOpeningChapter() {
  const chapter = urbanFoundation.chapters.find(c => c.id === "00");
  if (!chapter) return null;

  return (
    <section id={chapter.anchor.replace("#", "")} className="w-full pt-12 md:pt-24 pb-16">
      <UrbanProgress currentChapter={chapter.id} page={chapter.sourcePages[0]} />
      
      <div className="flex flex-col gap-12 w-full max-w-4xl">
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-light text-white leading-tight">
          Un vacío urbano<br />como infraestructura viva
        </h2>

        <div className="flex flex-col gap-8">
          <p className="text-lg md:text-xl font-light text-white/90 leading-relaxed">
            La propuesta toma un vacío urbano vulnerable y lo interpreta como una estructura capaz de articular clima, topografía, recorrido, vegetación y vida cotidiana.
          </p>
          <p className="text-base md:text-lg font-light text-white/70 leading-relaxed">
            En lugar de introducir un objeto aislado, el proyecto organiza el parque mediante un sistema de elementos conectados que responden a la morfología existente.
          </p>
          
          <div className="mt-4 border-l border-[var(--urban-accent)] pl-4 py-1">
            <p className="text-mono text-[10px] text-[var(--urban-accent)]/90 uppercase tracking-wide">
              Esta formulación corresponde a la intención del diseño y no documenta desempeño construido.
            </p>
          </div>
        </div>

        <div className="mt-8">
          <UrbanProposalStatus />
        </div>
      </div>
    </section>
  );
}
