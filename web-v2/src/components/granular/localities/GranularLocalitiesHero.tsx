"use client";

import Image from "next/image";
import { granularLocalities } from "@/content/cases/granular/granular-localities";
import { useSafeMode } from "@/components/home/motion/SafeModeContext";
import { motion } from "framer-motion";

export default function GranularLocalitiesHero() {
  const safeMode = useSafeMode();

  const imgAnim: any = safeMode ? {} : {
    initial: { scale: 1.02, opacity: 0.8 },
    animate: { scale: 1, opacity: 1 },
    transition: { duration: 1.5, ease: [0.2, 0.8, 0.2, 1] }
  };

  const textAnim: any = safeMode ? {} : {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay: 0.2, ease: "easeOut" }
  };

  return (
    <section id="localidades" className="relative w-full min-h-[70svh] md:min-h-[90svh] bg-[#050505] overflow-hidden flex flex-col justify-end pb-12 border-b border-white/10 pt-16">
      
      {/* BACKGROUND TEXTURE */}
      <div className="absolute inset-0 z-0 bg-[#050505]">
        <motion.div className="w-full h-full relative" {...imgAnim}>
           <Image 
            src="/portfolio-media/audit/block-21/page-38-localities-audit.png" // Fallback to audit
            alt="Fondo introductorio de localidades"
            fill
            className="object-cover opacity-30 mix-blend-screen"
            unoptimized
           />
           <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/90 to-[#050505]/40 z-10" />
        </motion.div>
      </div>

      <div className="relative z-20 w-full px-6 md:px-12 flex flex-col gap-8 md:gap-16">
        
        <motion.div className="flex items-center gap-4" {...textAnim}>
          <span className="text-mono text-[10px] text-white/50 uppercase tracking-widest">
            CAPÍTULO 10
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-white" />
          <span className="text-mono text-[10px] text-white uppercase tracking-widest">
            {granularLocalities.title}
          </span>
        </motion.div>

        <motion.div className="flex flex-col gap-4 max-w-4xl" {...textAnim}>
          <h2 className="text-display-lg leading-[0.9] text-white">
            <span className="block text-white/80">LA HETEROGENEIDAD</span>
            <span className="block text-white">DENTRO DEL MUNICIPIO</span>
          </h2>
        </motion.div>

        <motion.div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8 pt-8 border-t border-white/10" {...textAnim}>
          <div className="flex gap-8">
            <div>
              <div className="text-mono text-[9px] text-white/40 uppercase tracking-widest mb-1">Página Fuente</div>
              <div className="text-mono text-[12px] text-white/80">{granularLocalities.sourcePages.join('–')}</div>
            </div>
            <div>
              <div className="text-mono text-[9px] text-white/40 uppercase tracking-widest mb-1">Escalas</div>
              <div className="text-mono text-[12px] text-white/80 uppercase">Localidad</div>
            </div>
          </div>
          
          <div className="flex items-center gap-6">
             <a href="#cambio-de-escala" className="text-mono text-[10px] text-white hover:text-white/70 uppercase tracking-widest transition-colors flex items-center gap-2">
                Explorar →
             </a>
          </div>
        </motion.div>
        
      </div>
    </section>
  );
}
