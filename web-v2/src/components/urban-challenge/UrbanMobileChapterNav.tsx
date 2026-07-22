"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { urbanChapters } from "@/content/cases/urban-challenge/urban-chapters";

interface UrbanMobileChapterNavProps {
  currentChapterId: string;
}

export default function UrbanMobileChapterNav({ currentChapterId }: UrbanMobileChapterNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeHash, setActiveHash] = useState("");

  useEffect(() => {
    const handleHashChange = () => setActiveHash(window.location.hash);
    window.addEventListener("hashchange", handleHashChange);
    setActiveHash(window.location.hash);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const currentChapter = urbanChapters.find(c => c.id === currentChapterId) || urbanChapters[0];

  const acts = [
    { num: "I", name: "CONTEXTO" },
    { num: "II", name: "LECTURA" },
    { num: "III", name: "PROPUESTA" },
    { num: "IV", name: "VIDA COTIDIANA" }
  ];

  const availableIds = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15"];

  return (
    <div className="lg:hidden w-full sticky top-[60px] z-40 bg-[#050505]/90 backdrop-blur-md border-b border-white/10">
      <div className="flex items-center justify-between p-4">
        <div className="flex flex-col">
          <span className="text-mono text-[9px] text-[var(--urban-accent)] uppercase">Capítulo {currentChapter.id}</span>
          <span className="text-sm font-medium text-white">{currentChapter.title}</span>
        </div>
        <button 
          onClick={() => setIsOpen(true)}
          className="text-mono text-[10px] text-white/70 border border-white/20 px-3 py-1.5 rounded-sm hover:text-white hover:bg-white/5 transition-colors"
          aria-expanded={isOpen}
          aria-controls="mobile-chapter-menu"
        >
          ÍNDICE
        </button>
      </div>

      {isOpen && (
        <div 
          id="mobile-chapter-menu"
          className="fixed inset-0 z-50 bg-[#050505] flex flex-col pt-16 pb-safe overflow-y-auto"
          role="dialog"
          aria-label="Menú de Capítulos"
        >
          <div className="flex items-center justify-between p-6 border-b border-white/10">
            <span className="text-sm font-medium">Urban Challenge</span>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-mono text-[10px] text-white/50 p-2 uppercase"
              autoFocus
            >
              CERRAR
            </button>
          </div>
          
          <div className="p-6 flex flex-col gap-8">
            {acts.map(act => {
              const actChapters = urbanChapters.filter(c => c.act === act.num);
              return (
                <div key={act.num} className="flex flex-col gap-4">
                  <span className="text-mono text-[10px] text-white/40 uppercase tracking-widest border-b border-white/10 pb-2">
                    {act.name}
                  </span>
                  <ul className="flex flex-col gap-3">
                    {actChapters.map(chapter => {
                      const isAvailable = availableIds.includes(chapter.id);
                      const isActive = currentChapterId === chapter.id || activeHash === chapter.anchor;

                      return (
                        <li key={chapter.id}>
                          {isAvailable ? (
                            <Link 
                              href={chapter.anchor}
                              onClick={() => setIsOpen(false)}
                              className={`flex items-start gap-3 text-sm ${isActive ? "text-white font-medium" : "text-white/60"}`}
                            >
                              <span className={`text-mono text-[10px] mt-0.5 shrink-0 ${isActive ? "text-[var(--urban-accent)]" : ""}`}>
                                {chapter.id}
                              </span>
                              <span>{chapter.title}</span>
                            </Link>
                          ) : (
                            <div className="flex items-start gap-3 text-sm text-white/20">
                              <span className="text-mono text-[10px] mt-0.5 shrink-0">{chapter.id}</span>
                              <span>{chapter.title}</span>
                            </div>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
