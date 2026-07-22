"use client";

import Image from "next/image";
import { granularSocioeconomy } from "@/content/cases/granular/granular-socioeconomy";
import { useSafeMode } from "@/components/home/motion/SafeModeContext";
import { motion } from "framer-motion";

export default function GranularSocioeconomyHero() {
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
    <section id="socioeconomia" className="relative w-full min-h-[70svh] md:min-h-[90svh] bg-[#050505] overflow-hidden flex flex-col justify-end pb-12 border-b border-white/10 pt-16">
      
      {/* BACKGROUND TEXTURE */}
      <div className="absolute inset-0 z-0 bg-[#050505]">
        <motion.div className="w-full h-full relative" {...imgAnim}>
           {/* Transition from governance purple to socioeconomy orange/warm */}
           <div className="absolute inset-0 bg-gradient-to-br from-[#050505] via-[var(--granular-dim-socioeconomy)]/10 to-[#050505] mix-blend-screen z-10" />
           <Image 
            src="/portfolio-media/audit/block-19/page-32-socioeconomy-audit.png" // Fallback to audit
            alt="Fondo conceptual de socioeconomía"
            fill
            className="object-cover opacity-30 mix-blend-screen"
            unoptimized
           />
           <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/80 to-[#050505]/40 z-10" />
           <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/60 to-transparent z-10" />
        </motion.div>
      </div>

      <div className="relative z-20 w-full px-6 md:px-12 flex flex-col gap-8 md:gap-16">
        
        <motion.div className="flex items-center gap-4" {...textAnim}>
          <span className="text-mono text-[10px] text-white/50 uppercase tracking-widest">
            CAPÍTULO {granularSocioeconomy.nextChapterPreview.number === "07" ? "06" : ""}
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--granular-dim-socioeconomy)]" />
          <span className="text-mono text-[10px] text-[var(--granular-dim-socioeconomy)] uppercase tracking-widest">
            {granularSocioeconomy.title}
          </span>
        </motion.div>

        <motion.div className="flex flex-col gap-4 max-w-4xl" {...textAnim}>
          <h2 className="text-display-lg leading-[0.9] text-white">
            <span className="block text-white/80">MOVILIDAD, SERVICIOS</span>
            <span className="block text-[var(--granular-dim-socioeconomy)]">Y DESIGUALDAD TERRITORIAL</span>
          </h2>
        </motion.div>

        <motion.div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8 pt-8 border-t border-white/10" {...textAnim}>
          <div className="flex gap-8">
            <div>
              <div className="text-mono text-[9px] text-white/40 uppercase tracking-widest mb-1">Páginas Fuente</div>
              <div className="text-mono text-[12px] text-white/80">{granularSocioeconomy.sourcePages.join('–')}</div>
            </div>
            <div>
              <div className="text-mono text-[9px] text-white/40 uppercase tracking-widest mb-1">Escalas</div>
              <div className="text-mono text-[12px] text-white/80 uppercase">Municipal · Localidad</div>
            </div>
          </div>
          
          <div className="flex items-center gap-6">
             <a href="#condiciones-de-vida" className="text-mono text-[10px] text-white hover:text-[var(--granular-dim-socioeconomy)] uppercase tracking-widest transition-colors flex items-center gap-2">
                Explorar →
             </a>
          </div>
        </motion.div>
        
      </div>
    </section>
  );
}
