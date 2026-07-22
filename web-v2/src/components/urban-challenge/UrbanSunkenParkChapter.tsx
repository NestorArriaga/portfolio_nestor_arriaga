"use client";

import UrbanProgress from "./UrbanProgress";
import { urbanFoundation } from "@/content/cases/urban-challenge/urban-foundation";
import UrbanVoidReading from "./UrbanVoidReading";

export default function UrbanSunkenParkChapter() {
  const chapter = urbanFoundation.chapters.find(c => c.id === "02");
  if (!chapter) return null;

  return (
    <section id={chapter.anchor.replace("#", "")} className="w-full py-16 border-t border-[var(--urban-border)]">
      <UrbanProgress currentChapter={chapter.id} page={chapter.sourcePages[0]} />
      
      <div className="flex flex-col gap-12 w-full max-w-5xl">
        <h2 className="text-3xl md:text-5xl font-light text-white leading-tight">
          Parque hundido<br />antigua sascabera
        </h2>

        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-1/2 flex flex-col gap-6">
            <p className="text-lg font-light text-white/90 leading-relaxed">
              El sitio se presenta como un parque hundido situado dentro de una trama urbana compacta. La página lo identifica también como una antigua sascabera.
            </p>
            <p className="text-base font-light text-white/70 leading-relaxed">
              La condición de vacío y la diferencia topográfica se convierten en el punto de partida para interpretar el lugar como una estructura territorial, no como un espacio aislado.
            </p>
            <div className="mt-2 border-l border-white/20 pl-4 py-1">
              <p className="text-mono text-[10px] text-white/50 uppercase tracking-wide">
                La página no documenta en este punto la historia, fecha, explotación, profundidad, geología o delimitación de la antigua sascabera.
              </p>
            </div>
          </div>
        </div>

        <div className="w-full mt-8">
          <UrbanVoidReading />
        </div>
      </div>
    </section>
  );
}
