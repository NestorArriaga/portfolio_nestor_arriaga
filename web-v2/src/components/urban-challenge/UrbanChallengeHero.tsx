"use client";

import { useSafeMode } from "@/components/home/motion/SafeModeContext";
import { useReducedMotion } from "framer-motion";
import Image from "next/image";
import { urbanAssets } from "@/content/cases/urban-challenge/urban-assets";
import { urbanFoundation } from "@/content/cases/urban-challenge/urban-foundation";

export default function UrbanChallengeHero() {
  const safeMode = useSafeMode();
  const prefersReducedMotion = useReducedMotion();
  const shouldAnimate = !safeMode && !prefersReducedMotion;

  // Use the recommended master plan work file, fallback to central ring axonometric
  const heroAsset = urbanAssets.find(a => a.id === urbanFoundation.hero.assetId) 
    || urbanAssets.find(a => a.id === urbanFoundation.hero.fallbackAssetId);

  return (
    <section className="relative w-full min-h-[100svh] bg-[#050505] flex flex-col items-center justify-center overflow-hidden">
      
      {/* BACKGROUND ASSET LAYER */}
      <div className={`absolute inset-0 w-full h-full ${shouldAnimate ? "animate-fade-in-slow" : ""}`}>
        {heroAsset && (
          <Image
            src={heroAsset.previewPath}
            alt={urbanFoundation.hero.caption}
            fill
            sizes="100vw"
            priority
            className={`object-cover object-center opacity-80 ${shouldAnimate ? "scale-[1.02] origin-center animate-subtle-zoom" : ""}`}
            quality={90}
          />
        )}
        {/* Subtle gradient overlay to ensure text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/80 via-transparent to-[#050505]/80" />
      </div>

      {/* CONTENT LAYER */}
      <div className="relative z-10 w-full max-w-[1440px] px-6 md:px-12 xl:px-24 flex flex-col justify-end h-full min-h-[100svh] pb-24 pt-32">
        
        <div className="flex flex-col md:flex-row justify-between items-end gap-12 w-full">
          
          <div className="flex flex-col gap-2 max-w-3xl">
            <span className="text-mono text-xs md:text-sm text-[var(--urban-accent)] tracking-widest uppercase">
              {urbanFoundation.hero.titleLayers.number} / 15
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-light text-white leading-none tracking-tight">
              {urbanFoundation.hero.titleLayers.main}
            </h1>
            <h2 className="text-xl md:text-2xl text-white/70 font-light mt-2 tracking-wide">
              {urbanFoundation.hero.titleLayers.territory}
            </h2>
          </div>

          <div className="flex flex-col items-start md:items-end gap-4">
            <div className="flex flex-col gap-1 text-left md:text-right">
              <span className="text-mono text-[10px] text-white/50 uppercase tracking-widest">Estado</span>
              <span className="text-mono text-xs text-white uppercase tracking-widest">{urbanFoundation.proposalStatus.type}</span>
            </div>
            
            <div className="flex flex-wrap md:justify-end gap-2 md:max-w-[300px]">
              {urbanFoundation.hero.titleLayers.words.map((word) => (
                <span key={word} className="text-mono text-[9px] text-white/40 border border-white/10 px-2 py-0.5 rounded-sm">
                  {word}
                </span>
              ))}
            </div>
          </div>
          
        </div>
      </div>
      
      {/* SCROLL INDICATOR */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-mono text-[9px] text-white/40 uppercase tracking-widest">Explorar el sitio</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-white/20 to-transparent" />
      </div>

    </section>
  );
}
