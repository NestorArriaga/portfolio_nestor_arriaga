"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { granularFoundation } from "@/content/cases/granular/granular-foundation";

export default function GranularHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-[#050505]/90 backdrop-blur border-b border-white/10 py-3' : 'bg-transparent py-6'}`}>
      <div className="w-full max-w-[1440px] mx-auto px-6 md:px-12 flex items-center justify-between">
        
        <div className="flex items-center gap-4">
          <Link href="/projects" className="text-mono text-[10px] text-white/50 hover:text-white uppercase tracking-widest transition-colors">
            N.A.
          </Link>
          <span className="text-white/20">|</span>
          <span className="text-mono text-[10px] text-white/80 uppercase tracking-widest hidden md:inline-block">
            {granularFoundation.project.shortTitle}
          </span>
        </div>
        
        <div className="flex items-center gap-4 md:gap-8">
          <span className="text-mono text-[10px] text-white/40 uppercase tracking-widest hidden md:inline-block">
            14 / 15
          </span>
          <a href="/Portafolio_pliego.pdf" target="_blank" rel="noopener noreferrer" className="text-mono text-[10px] text-white/50 hover:text-white uppercase tracking-widest transition-colors underline underline-offset-4">
            PDF
          </a>
        </div>
        
      </div>
    </header>
  );
}
