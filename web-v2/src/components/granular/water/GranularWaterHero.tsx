"use client";

import Image from "next/image";
import { granularWater } from "@/content/cases/granular/granular-water";
import { useSafeMode } from "@/components/home/motion/SafeModeContext";
import { motion } from "framer-motion";

export default function GranularWaterHero() {
  const safeMode = useSafeMode();

  const imgAnim: any = safeMode ? {} : {
    initial: { scale: 1.025, opacity: 0.8 },
    animate: { scale: 1, opacity: 1 },
    transition: { duration: 1.5, ease: [0.2, 0.8, 0.2, 1] }
  };

  const textAnim: any = safeMode ? {} : {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay: 0.2, ease: "easeOut" }
  };

  return (
    <section id="agua" className="relative w-full min-h-[70svh] md:min-h-[80svh] bg-[#050505] overflow-hidden flex flex-col justify-end pb-12 border-b border-white/10 mt-16 pt-16">
      
      {/* BACKGROUND TEXTURE / SILHOUETTE */}
      <div className="absolute inset-0 z-0">
        <motion.div className="w-full h-full relative" {...imgAnim}>
           <Image 
            src="/portfolio-media/audit/block-15/page-22-audit.png" 
            alt="Fondo conceptual de agua"
            fill
            className="object-cover opacity-20 mix-blend-screen"
            unoptimized
           />
           <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-transparent" />
           <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/40 to-transparent" />
        </motion.div>
      </div>

      <div className="relative z-10 w-full px-6 md:px-12 flex flex-col gap-8 md:gap-16">
        
        <motion.div className="flex items-center gap-4" {...textAnim}>
          <span className="text-mono text-[10px] text-white/50 uppercase tracking-widest">
            CAPÍTULO 03
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--granular-dim-water)]" />
          <span className="text-mono text-[10px] text-[var(--granular-dim-water)] uppercase tracking-widest">
            {granularWater.title}
          </span>
        </motion.div>

        <motion.div className="flex flex-col gap-4 max-w-3xl" {...textAnim}>
          <h2 className="text-display-lg leading-[0.9] text-white">
            <span className="block text-white/80">EL EJE</span>
            <span className="block text-white">ESTRUCTURANTE</span>
            <span className="block text-[var(--granular-dim-water)]">DEL TERRITORIO</span>
          </h2>
        </motion.div>

        <motion.div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8 pt-8 border-t border-white/10" {...textAnim}>
          <div className="flex gap-8">
            <div>
              <div className="text-mono text-[9px] text-white/40 uppercase tracking-widest mb-1">Páginas Fuente</div>
              <div className="text-mono text-[12px] text-white/80">{granularWater.sourcePages.join('–')}</div>
            </div>
            <div>
              <div className="text-mono text-[9px] text-white/40 uppercase tracking-widest mb-1">Escala</div>
              <div className="text-mono text-[12px] text-white/80 uppercase">Regional</div>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
             <a href="#calidad-del-agua" className="text-mono text-[10px] text-white hover:text-[var(--granular-dim-water)] uppercase tracking-widest transition-colors flex items-center gap-2">
                Explorar calidad ↓
             </a>
          </div>
        </motion.div>
        
      </div>
    </section>
  );
}
