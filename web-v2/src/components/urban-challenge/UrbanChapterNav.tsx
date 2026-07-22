"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { urbanChapters } from "@/content/cases/urban-challenge/urban-chapters";

interface UrbanChapterNavProps {
  currentChapterId: string;
}

export default function UrbanChapterNav({ currentChapterId }: UrbanChapterNavProps) {
  const [activeHash, setActiveHash] = useState("");

  useEffect(() => {
    // Basic hash detection for highlighting
    const handleHashChange = () => setActiveHash(window.location.hash);
    window.addEventListener("hashchange", handleHashChange);
    // Initial check
    setActiveHash(window.location.hash);
    
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const acts = [
    { num: "I", name: "CONTEXTO" },
    { num: "II", name: "LECTURA" },
    { num: "III", name: "PROPUESTA" },
    { num: "IV", name: "VIDA COTIDIANA" }
  ];

  const availableIds = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15"];

  return (
    <nav 
      aria-label="Navegación del caso"
      className="hidden lg:flex flex-col w-64 shrink-0 sticky top-32 max-h-[calc(100vh-8rem)] overflow-y-auto overflow-x-hidden pr-4 scrollbar-thin scrollbar-thumb-white/10"
    >
      <div className="flex flex-col gap-8">
        {acts.map(act => {
          const actChapters = urbanChapters.filter(c => c.act === act.num);
          return (
            <div key={act.num} className="flex flex-col gap-3">
              <span className="text-mono text-[9px] text-white/30 uppercase tracking-widest border-b border-white/5 pb-1">
                {act.name}
              </span>
              <ul className="flex flex-col gap-1">
                {actChapters.map(chapter => {
                  const isAvailable = availableIds.includes(chapter.id);
                  const isActive = currentChapterId === chapter.id || activeHash === chapter.anchor;

                  return (
                      <li key={chapter.id}>
                        {isAvailable ? (
                          <Link 
                            href={chapter.anchor}
                          className={`group flex items-start gap-2 py-1 text-sm transition-colors ${
                            isActive ? "text-white" : "text-white/40 hover:text-white/80"
                          }`}
                          aria-current={isActive ? "step" : undefined}
                        >
                          <span className={`text-mono text-[9px] mt-1 shrink-0 ${isActive ? "text-[var(--urban-accent)]" : ""}`}>
                            {chapter.id}
                          </span>
                          <span className="leading-snug">{chapter.title}</span>
                        </Link>
                      ) : (
                        <div className="flex items-start gap-2 py-1 text-sm text-white/20 cursor-not-allowed">
                          <span className="text-mono text-[9px] mt-1 shrink-0">{chapter.id}</span>
                          <span className="leading-snug">{chapter.title}</span>
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
    </nav>
  );
}
