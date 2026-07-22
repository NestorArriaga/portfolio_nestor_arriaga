"use client";

import UrbanProgress from "./UrbanProgress";
import { urbanFoundation } from "@/content/cases/urban-challenge/urban-foundation";

export default function UrbanCompetitionChapter() {
  const chapter = urbanFoundation.chapters.find(c => c.id === "01");
  if (!chapter) return null;

  const { competitionContext } = urbanFoundation;

  return (
    <section id={chapter.anchor.replace("#", "")} className="w-full py-16 border-t border-[var(--urban-border)]">
      <UrbanProgress currentChapter={chapter.id} page={chapter.sourcePages[0]} />
      
      <div className="flex flex-col gap-8 w-full max-w-4xl">
        <h2 className="text-2xl md:text-4xl font-light text-white leading-snug">
          {competitionContext.title}
        </h2>

        <div className="flex flex-col md:flex-row gap-12 mt-4">
          <div className="flex flex-col gap-4 md:w-1/2">
            <span className="text-mono text-[10px] text-white/40 uppercase tracking-widest">
              Entidades nombradas en la página fuente
            </span>
            <ul className="flex flex-col gap-3">
              {competitionContext.entities.map(entity => (
                <li key={entity} className="text-lg font-medium text-white border-l-2 border-white/20 pl-4">
                  {entity}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-4 md:w-1/2 bg-[var(--urban-bg-surface)] p-6 border border-[var(--urban-border)] rounded-sm">
            <span className="text-mono text-[10px] text-[var(--urban-accent)] uppercase tracking-widest">
              Resultado del concurso
            </span>
            <p className="text-sm text-white/70 leading-relaxed">
              {competitionContext.note}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
