"use client";

import Image from "next/image";
import Link from "next/link";
import { useSafeMode } from "@/components/home/motion/SafeModeContext";
import { granularFoundation } from "@/content/cases/granular/granular-foundation";
import { motion } from "framer-motion";

export default function GranularHero() {
  const safeMode = useSafeMode();
  const foundation = granularFoundation;
  
  // Base animations if safeMode is off
  const imgAnim: any = safeMode ? {} : {
    initial: { scale: 1.02, opacity: 0.8 },
    animate: { scale: 1, opacity: 1 },
    transition: { duration: 1.5, ease: [0.2, 0.8, 0.2, 1] }
  };
  
  const textAnim: any = safeMode ? {} : {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay: 0.3, ease: "easeOut" }
  };

  return (
    <section className="relative w-full min-h-[100svh] bg-[#050505] overflow-hidden flex flex-col justify-end pb-12">
      {/* BACKGROUND LAYER */}
      <div className="absolute inset-0 z-0">
        <motion.div className="w-full h-full relative" {...imgAnim}>
          <Image 
            src={`/portfolio-media/audit/block-15/page-37-audit.png`} 
            alt="Fondo territorial - Tipologías resultantes"
            fill
            className="object-cover opacity-30 mix-blend-screen"
            priority
            unoptimized
          />
          {/* Gradients para fundir el mapa con el negro profundo */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-transparent to-[#050505]" />
        </motion.div>
      </div>
      
      {/* CONTENIDO PRINCIPAL */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 md:px-12 flex flex-col gap-12 md:gap-24">
        
        {/* NAVEGACIÓN SUPERIOR */}
        <motion.div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mt-8 md:mt-12" {...textAnim}>
          <Link href="/projects" className="text-mono text-[10px] text-white/50 hover:text-white uppercase tracking-widest transition-colors flex items-center gap-2">
            <span>← VOLVER A PROYECTOS</span>
          </Link>
          <div className="text-mono text-[10px] text-white/50 uppercase tracking-widest">
            {foundation.project.id} / 15
          </div>
        </motion.div>

        {/* DIMENSIONES FLOTANTES */}
        <motion.div className="hidden md:flex gap-4 md:gap-8 flex-wrap" {...textAnim}>
          {foundation.chapter01.dimensions.map(dim => (
            <div key={dim.id} className="flex items-center gap-2 text-mono text-[9px] uppercase tracking-widest text-white/40">
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: dim.colorVar }} />
              {dim.name}
            </div>
          ))}
        </motion.div>

        {/* TÍTULO */}
        <motion.div className="flex flex-col gap-4 max-w-4xl" {...textAnim}>
          <div className="text-mono text-sm text-[var(--granular-dim-water)] tracking-widest mb-2 flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
            <span>{foundation.hero.title.number}</span>
            <span className="hidden md:inline h-px w-8 bg-white/20"></span>
            <span>{foundation.project.initiative}</span>
          </div>
          
          <h1 className="text-display-lg leading-[0.9] text-white">
            <span className="block">{foundation.hero.title.line1}</span>
            <span className="block text-white/80">{foundation.hero.title.line2}</span>
            <span className="block text-white/60">{foundation.hero.title.line3}</span>
          </h1>
          
          <div className="text-mono text-[12px] md:text-[14px] text-white/70 uppercase tracking-widest mt-4">
            {foundation.hero.title.territory}
          </div>
        </motion.div>
        
        {/* METADATOS Y ACCIONES */}
        <motion.div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 border-t border-white/10 pt-8" {...textAnim}>
          <div className="grid grid-cols-2 md:flex gap-8 md:gap-16">
            <div>
              <div className="text-mono text-[10px] text-white/40 uppercase tracking-widest mb-1">Páginas Fuente</div>
              <div className="text-mono text-[12px] text-white/80">{foundation.project.totalSourcePages}</div>
            </div>
            <div>
              <div className="text-mono text-[10px] text-white/40 uppercase tracking-widest mb-1">Dimensiones</div>
              <div className="text-mono text-[12px] text-white/80">{foundation.project.dimensions.length}</div>
            </div>
            <div>
              <div className="text-mono text-[10px] text-white/40 uppercase tracking-widest mb-1">Escalas</div>
              <div className="text-mono text-[12px] text-white/80">{foundation.project.scales.join(' y ')}</div>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="text-mono text-[9px] bg-white/10 px-3 py-1.5 rounded text-white/60 tracking-widest uppercase">
              PARTE I — MARCO TERRITORIAL
            </div>
            <a href="#proyecto" className="text-mono text-[10px] text-white hover:text-[var(--granular-dim-water)] uppercase tracking-widest transition-colors flex items-center gap-2">
              Explorar el marco ↓
            </a>
          </div>
        </motion.div>
        
      </div>
    </section>
  );
}
