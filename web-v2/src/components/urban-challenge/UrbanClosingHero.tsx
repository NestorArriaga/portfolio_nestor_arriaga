"use client";

import Image from "next/image";
import { useSafeMode } from "@/components/home/motion/SafeModeContext";
import { useReducedMotion } from "framer-motion";
import { urbanAssets } from "@/content/cases/urban-challenge/urban-assets";
import { urbanClosing } from "@/content/cases/urban-challenge/urban-closing";

export default function UrbanClosingHero() {
  const safeMode = useSafeMode();
  const prefersReducedMotion = useReducedMotion();
  const shouldAnimate = !safeMode && !prefersReducedMotion;

  const heroAsset = urbanAssets.find(a => a.id === urbanClosing.hero.assetId);

  return (
    <div className="relative w-full h-[80vh] min-h-[600px] flex items-center justify-center bg-[#050505] overflow-hidden group border-b border-white/5">
      
      {/* BACKGROUND ASSET */}
      <div className="absolute inset-0 w-full h-full p-8 md:p-16 flex items-center justify-center">
        {heroAsset && (
          <div className="relative w-full max-w-5xl aspect-[16/9]">
            <Image
              src={heroAsset.previewPath}
              alt={urbanClosing.hero.alt}
              fill
              className={`object-contain p-4 md:p-12 transition-transform duration-[2000ms] ${shouldAnimate ? "group-hover:scale-[1.015]" : ""}`}
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] to-transparent opacity-40 pointer-events-none" />
          </div>
        )}
      </div>

      {/* CONTENT OVERLAY */}
      <div className="relative z-10 w-full h-full flex flex-col justify-end px-6 md:px-12 pb-16">
        <div className="max-w-5xl mx-auto w-full">
          
          {/* Header */}
          <div className="flex flex-col gap-4 text-center md:text-left">
            <span className="text-mono text-[10px] text-[var(--urban-accent)] tracking-widest uppercase bg-[var(--urban-accent)]/10 self-start px-2 py-1 rounded-sm border border-[var(--urban-accent)]/20">
              PROYECTO 15 COMPLETADO
            </span>
            <span className="text-mono text-[10px] text-white/40 tracking-widest uppercase">
              CAPÍTULO {urbanClosing.chapter.number}
            </span>
            <h2 className="text-4xl md:text-6xl font-light text-white leading-tight">
              {urbanClosing.chapter.title}
            </h2>
            <div className="flex flex-col md:flex-row gap-4 items-center md:items-end justify-between border-t border-white/10 pt-6 mt-4">
              <span className="text-xl md:text-2xl text-white/70 font-light tracking-wide max-w-xl">
                {urbanClosing.hero.title}
              </span>
              <div className="flex flex-col items-center md:items-end gap-1">
                <span className="text-mono text-[10px] text-white/40 uppercase tracking-widest">
                  PÁGINA {urbanClosing.chapter.sourcePage}
                </span>
                <span className="text-mono text-[10px] text-white/40 uppercase tracking-widest">
                  CONTEXTO AÉREO
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
