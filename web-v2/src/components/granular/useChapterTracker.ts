"use client";

import { useState, useEffect } from "react";

// For tracking current active chapter via IntersectionObserver
export function useChapterTracker(chapterIds: string[]) {
  const [activeId, setActiveId] = useState(chapterIds[0]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    
    chapterIds.forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach(entry => {
              if (entry.isIntersecting) {
                setActiveId(id);
                // Also update URL hash silently
                window.history.replaceState(null, '', `#${id}`);
              }
            });
          },
          { rootMargin: "-20% 0px -70% 0px" } // trigger when near top of screen
        );
        observer.observe(el);
        observers.push(observer);
      }
    });

    return () => {
      observers.forEach(obs => obs.disconnect());
    };
  }, [chapterIds]);

  return activeId;
}
