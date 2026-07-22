"use client";

import Image from "next/image";
import { useSafeMode } from "@/components/home/motion/SafeModeContext";
import { useReducedMotion } from "framer-motion";
import { urbanAssets } from "@/content/cases/urban-challenge/urban-assets";
import { urbanVegetationInfiltration } from "@/content/cases/urban-challenge/urban-vegetation-infiltration";
import { urbanProject } from "@/content/cases/urban-challenge/urban-project";

export default function UrbanVegetationHero() {
  const safeMode = useSafeMode();
  const prefersReducedMotion = useReducedMotion();
  const shouldAnimate = !safeMode && !prefersReducedMotion;

  const heroAsset = urbanAssets.find(a => a.id === urbanVegetationInfiltration.hero.assetId);

  return (
    <div className="w-full relative bg-[#050505] border-t border-[var(--urban-border)] pt-24 pb-32">
      <div className="w-full max-w-5xl mx-auto flex flex-col gap-16 px-6">
        
        {/* Header */}
        <div className="flex flex-col gap-4 text-center md:text-left">
          <span className="text-mono text-[10px] text-white/40 tracking-widest uppercase">
            CAPÍTULO {urbanVegetationInfiltration.chapter.number}
          </span>
          <h2 className="text-4xl md:text-6xl font-light text-white leading-tight">
            {urbanVegetationInfiltration.chapter.title}
          </h2>
          <h3 className="text-xl md:text-2xl font-light text-[var(--urban-accent)]">
            {urbanVegetationInfiltration.chapter.subtitle}
          </h3>
        </div>

        {/* Hero Visual */}
        {heroAsset && (
          <div className="w-full aspect-[4/3] md:aspect-[16/9] relative overflow-hidden bg-[#111] rounded border border-white/5 flex items-center justify-center p-8 group">
            <Image
              src={heroAsset.previewPath}
              alt={urbanVegetationInfiltration.hero.alt}
              fill
              className={`object-contain p-4 md:p-12 transition-transform duration-[2000ms] ${shouldAnimate ? "group-hover:scale-105" : ""}`}
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] to-transparent opacity-50 pointer-events-none" />
            
            <div className="absolute bottom-4 right-4 flex items-center gap-3">
              <span className="text-mono text-[9px] text-white/50 tracking-widest uppercase bg-black/50 px-2 py-1 rounded backdrop-blur-sm">
                PÁGINAS {urbanVegetationInfiltration.chapter.pages}
              </span>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
