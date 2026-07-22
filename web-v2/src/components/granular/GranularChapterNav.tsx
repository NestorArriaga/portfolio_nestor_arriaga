"use client";

import { useEffect, useState } from "react";
import { granularFoundation } from "@/content/cases/granular/granular-foundation";

interface GranularChapterNavProps {
  activeChapterId: string;
}

export default function GranularChapterNav({ activeChapterId }: GranularChapterNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const chapters = granularFoundation.chapters;
  
  // Agrupar capítulos por acto
  const groupedChapters = chapters.reduce((acc, chap) => {
    if (!acc[chap.act]) acc[chap.act] = [];
    acc[chap.act].push(chap);
    return acc;
  }, {} as Record<number, typeof chapters>);

  const acts = [
    { id: 1, name: "MARCO" },
    { id: 2, name: "DIMENSIONES" },
    { id: 3, name: "RESULTADOS" },
    { id: 4, name: "APLICACIÓN" }
  ];

  return (
    <>
      {/* DESKTOP NAV */}
      <nav className="hidden xl:flex flex-col w-64 shrink-0 sticky top-32 max-h-[calc(100vh-8rem)] overflow-y-auto scrollbar-hide pr-4">
        {acts.map(act => (
          <div key={act.id} className="mb-8">
            <div className="text-mono text-[9px] text-white/30 uppercase tracking-widest mb-3 pb-2 border-b border-white/10">
              {act.name}
            </div>
            <ul className="flex flex-col gap-2">
              {groupedChapters[act.id]?.map((chap) => {
                const isActive = activeChapterId === chap.id;
                const isAvailable = chap.status === 'audited' || chap.status === 'ambiguous';
                
                return (
                  <li key={chap.id}>
                    {isAvailable && chap.act === 1 ? (
                      <a 
                        href={`#${chap.slug}`}
                        className={`text-sm flex flex-col transition-colors ${isActive ? 'text-[var(--granular-dim-water)] font-medium' : 'text-white/60 hover:text-white/90'}`}
                        aria-current={isActive ? 'true' : undefined}
                      >
                        <span>{chap.shortTitle}</span>
                        {isActive && <span className="text-mono text-[9px] mt-1 opacity-80">0{chap.order} / 16</span>}
                      </a>
                    ) : (
                      <div className="text-sm flex flex-col text-white/30 cursor-not-allowed">
                        <span>{chap.shortTitle}</span>
                        <span className="text-mono text-[9px] mt-1 opacity-50">EN DESARROLLO</span>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* MOBILE NAV BAR */}
      <div className="xl:hidden fixed bottom-0 left-0 w-full z-50 bg-[#050505] border-t border-white/10 pb-safe">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex flex-col">
            <span className="text-mono text-[9px] text-white/50 uppercase tracking-widest">
              CAPÍTULO {chapters.find(c => c.id === activeChapterId)?.order.toString().padStart(2, '0')} / 16
            </span>
            <span className="text-body text-white font-medium">
              {chapters.find(c => c.id === activeChapterId)?.shortTitle}
            </span>
          </div>
          <button 
            onClick={() => setIsOpen(true)}
            className="text-mono text-[10px] uppercase tracking-widest bg-white/10 px-4 py-2 rounded hover:bg-white/20 transition-colors"
          >
            Índice
          </button>
        </div>
      </div>

      {/* MOBILE NAV MODAL */}
      {isOpen && (
        <div className="xl:hidden fixed inset-0 z-[100] bg-[#050505] overflow-y-auto">
          <div className="flex justify-between items-center p-4 border-b border-white/10 sticky top-0 bg-[#050505]">
            <span className="text-mono text-[12px] uppercase tracking-widest text-white/50">Índice</span>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-white/70 p-2"
              aria-label="Cerrar índice"
            >
              ✕
            </button>
          </div>
          
          <div className="p-4 flex flex-col gap-8 pb-32">
            {acts.map(act => (
              <div key={act.id}>
                <div className="text-mono text-[10px] text-[var(--granular-dim-water)] uppercase tracking-widest mb-4">
                  {act.name}
                </div>
                <ul className="flex flex-col gap-4">
                  {groupedChapters[act.id]?.map((chap) => {
                    const isActive = activeChapterId === chap.id;
                    const isAvailable = chap.status === 'audited' || chap.status === 'ambiguous';
                    
                    return (
                      <li key={chap.id}>
                        {isAvailable && chap.act === 1 ? (
                          <a 
                            href={`#${chap.slug}`}
                            onClick={() => setIsOpen(false)}
                            className={`block text-lg ${isActive ? 'text-white font-medium' : 'text-white/60'}`}
                          >
                            {chap.title}
                          </a>
                        ) : (
                          <div className="block text-lg text-white/30">
                            {chap.title}
                            <span className="block text-mono text-[10px] mt-1">EN DESARROLLO</span>
                          </div>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
