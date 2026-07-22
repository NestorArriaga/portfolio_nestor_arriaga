"use client";

import Image from 'next/image';
import { motion, useReducedMotion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { useSafeMode } from '../home/motion/SafeModeContext';
import Link from 'next/link';
import { MotionTokens } from '@/motion/motion-tokens';

interface CaseHeroProps {
  projectNumber: string;
  title: string;
  territory: string;
  themes: string[];
  ambientImage: string;
  mainImage: string;
  pdfPages: number[];
}

export default function CaseHero({
  projectNumber,
  title,
  territory,
  themes,
  ambientImage,
  mainImage,
  pdfPages
}: CaseHeroProps) {
  const isSafeMode = useSafeMode();
  const shouldReduceMotion = useReducedMotion();
  const disableMotion = !!(isSafeMode || shouldReduceMotion);

  // Parallax Pointer (sólo si no hay reduced motion)
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 40, stiffness: 150, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (disableMotion || !ref.current) return;
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = (clientX / innerWidth - 0.5) * 2;
    const y = (clientY / innerHeight - 0.5) * 2;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const bgX = useTransform(smoothX, [-1, 1], [-10, 10]);
  const bgY = useTransform(smoothY, [-1, 1], [-10, 10]);
  const mapX = useTransform(smoothX, [-1, 1], [15, -15]);
  const mapY = useTransform(smoothY, [-1, 1], [15, -15]);
  const textX = useTransform(smoothX, [-1, 1], [5, -5]);
  const textY = useTransform(smoothY, [-1, 1], [5, -5]);

  return (
    <section 
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full min-h-[100svh] flex flex-col justify-end overflow-hidden bg-[#050505]"
    >
      {/* CAPA 2: Ambiente Urbano */}
      <motion.div 
        className="absolute inset-0 z-0 opacity-30"
        style={disableMotion ? {} : { x: bgX, y: bgY }}
      >
        <motion.div
          className="absolute inset-0"
          animate={disableMotion ? {} : {
            scale: [1, 1.025, 1]
          }}
          transition={{
            duration: MotionTokens.duration.ambient,
            ease: "linear",
            repeat: Infinity,
            repeatType: "reverse"
          }}
        >
          <Image 
            src={ambientImage} 
            alt="" 
            fill 
            className="object-cover blur-[20px] mix-blend-screen saturate-0" 
            unoptimized
            priority
          />
        </motion.div>
        {/* Gradients to blend with background */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/80 to-transparent h-1/2 mt-auto"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/80 to-transparent w-full md:w-1/2"></div>
      </motion.div>

      {/* CAPA 3: Mapa Principal (Marco Editorial) */}
      <div className="absolute inset-0 z-10 flex items-center justify-end p-6 md:p-12 lg:p-24 pb-32 md:pb-24 pointer-events-none">
        <motion.div 
          className="relative w-full md:w-[60%] lg:w-[50%] aspect-[3/4] md:aspect-auto md:h-full max-h-[800px] border border-white/10 rounded-[var(--radius-sm)] overflow-hidden shadow-[var(--shadow-ambient)]"
          initial={disableMotion ? {} : { opacity: 0, scale: 0.95, filter: 'blur(4px)' }}
          animate={disableMotion ? {} : { opacity: 1, scale: 1, filter: 'blur(0px)' }}
          transition={{ duration: disableMotion ? 0 : 1.2, ease: MotionTokens.ease.cinematic }}
          style={disableMotion ? {} : { x: mapX, y: mapY }}
        >
          <Image 
            src={mainImage} 
            alt="Mapa principal" 
            fill 
            className="object-cover md:object-contain object-right-top md:object-center mix-blend-lighten"
            unoptimized
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent to-[#050505]/40 mix-blend-multiply"></div>
        </motion.div>
      </div>

      {/* CAPA 4: Tipografía */}
      <motion.div 
        className="relative z-20 w-full p-6 md:p-12 lg:p-24 max-w-4xl pointer-events-none"
        style={disableMotion ? {} : { x: textX, y: textY }}
      >
        <div className="overflow-hidden mb-4">
          <motion.div
            initial={disableMotion ? {} : { y: '100%' }}
            animate={disableMotion ? {} : { y: 0 }}
            transition={{ duration: 0.8, ease: MotionTokens.ease.exit }}
            className="text-mono text-sm md:text-base text-[var(--color-accent)] tracking-widest flex items-center gap-4"
          >
            <span>PROYECTO {projectNumber}</span>
            <div className="w-12 h-px bg-[var(--color-accent)]/50"></div>
          </motion.div>
        </div>
        
        <h1 className="text-display-xl md:text-[6rem] lg:text-[7.5rem] leading-[0.85] text-white tracking-tighter mix-blend-difference mb-8">
          {title.split(' en ').map((part, i, arr) => (
            <span key={i} className="block overflow-hidden pb-2">
              <motion.span 
                className="block"
                initial={disableMotion ? {} : { y: '100%', opacity: 0 }}
                animate={disableMotion ? {} : { y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.1 + (i * 0.1), ease: MotionTokens.ease.exit }}
              >
                {part}{i !== arr.length - 1 ? ' en' : ''}
              </motion.span>
            </span>
          ))}
        </h1>
      </motion.div>

      {/* CAPA 5: Metadatos y Navegación Básica */}
      <motion.div 
        className="relative z-30 w-full p-6 md:p-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-start md:items-end gap-8 bg-[#050505]/80 backdrop-blur-sm"
        initial={disableMotion ? {} : { opacity: 0 }}
        animate={disableMotion ? {} : { opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <div className="flex flex-col gap-2 max-w-xl">
          <div className="text-mono text-[10px] text-white/50 uppercase tracking-widest">{territory}</div>
          <div className="flex flex-wrap gap-x-4 gap-y-2 text-label text-white/70">
            {themes.map(t => <span key={t}>{t}</span>)}
          </div>
        </div>

        <div className="flex flex-col md:items-end gap-4 text-mono text-[10px] text-white/50">
          <div className="flex items-center gap-6">
            <Link href="/projects" scroll={false} className="hover:text-white transition-colors">
              ← GALERÍA
            </Link>
            <a href="/Portafolio_pliego.pdf" target="_blank" rel="noreferrer" className="text-[var(--color-accent)] hover:text-white transition-colors">
              PDF PÁG. {pdfPages.join('-')} ↗
            </a>
            <div>01 / 15</div>
          </div>
          <div className="animate-pulse hidden md:block">↓ DESCUBRIR</div>
        </div>
      </motion.div>
    </section>
  );
}
