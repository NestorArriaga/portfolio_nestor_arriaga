"use client";

import { motion, AnimatePresence, useReducedMotion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { MotionTokens } from '@/motion/motion-tokens';
import { useSafeMode } from './SafeModeContext';
import ActiveProjectInfo from '../ActiveProjectInfo';
import TechnicalMeta from '../TechnicalMeta';

export default function AnimatedHeroScene({ 
  activeProject, 
  assets, 
  defaultTexture 
}: { 
  activeProject: any, 
  assets: any[], 
  defaultTexture: string 
}) {
  const isSafeMode = useSafeMode();
  const shouldReduceMotion = useReducedMotion();
  const disableMotion = isSafeMode || shouldReduceMotion;

  // Encontrar el hero-candidate
  const projectAssets = assets.filter(a => a.projectId === activeProject.id);
  const heroAsset = projectAssets.find(a => a.role === 'hero-candidate') || projectAssets[0];
  const mainImageSrc = heroAsset?.variants?.heroWide || heroAsset?.variants?.originalClean || defaultTexture;
  const isMap = heroAsset?.type === 'map';
  const objectFitClass = isMap ? 'object-contain object-right' : 'object-cover';
  const focusStyle = heroAsset?.focalPoint && !isMap ? { objectPosition: `${heroAsset.focalPoint.x * 100}% ${heroAsset.focalPoint.y * 100}%` } : {};

  // Estado de montaje inicial
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  // Parallax Pointer (solo si no hay reduced motion)
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

  // Transformaciones parallax
  const bgX = useTransform(smoothX, [-1, 1], [-14, 14]);
  const bgY = useTransform(smoothY, [-1, 1], [-14, 14]);
  const fgX = useTransform(smoothX, [-1, 1], [8, -8]);
  const fgY = useTransform(smoothY, [-1, 1], [8, -8]);
  const texX = useTransform(smoothX, [-1, 1], [4, -4]);
  const texY = useTransform(smoothY, [-1, 1], [4, -4]);

  return (
    <div 
      className="absolute top-0 right-0 w-full md:w-[70%] h-full z-10 flex flex-col justify-end pointer-events-none"
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <AnimatePresence mode="wait">
        <motion.div 
          key={activeProject.id}
          className="absolute inset-0 z-0"
          initial={{ opacity: disableMotion ? 1 : 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: disableMotion ? 1 : 0, transition: { duration: MotionTokens.duration.fast } }}
          transition={{ duration: disableMotion ? 0 : MotionTokens.duration.cinematic, ease: MotionTokens.ease.cinematic }}
        >
          {/* CAPA 1: Fondo Ambiental */}
          <motion.div 
            className="absolute inset-0 z-0 overflow-hidden bg-[var(--color-graphite-light)]"
            style={disableMotion ? {} : { x: bgX, y: bgY }}
          >
            <motion.div
              className="absolute inset-0"
              animate={disableMotion ? {} : {
                scale: [MotionTokens.scale.heroIdle, MotionTokens.scale.heroAmbient, MotionTokens.scale.heroIdle]
              }}
              transition={{
                duration: MotionTokens.duration.ambient,
                ease: "linear",
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              <Image 
                src={mainImageSrc} 
                alt="Ambient" 
                fill 
                className="object-cover blur-[100px] opacity-40 mix-blend-screen scale-110 saturate-[1.2]" 
                unoptimized 
                priority
              />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-black)] via-[var(--color-black)]/80 to-transparent w-full md:w-1/2"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-black)] to-transparent h-48 mt-auto"></div>
          </motion.div>

          {/* CAPA 2 y 3: Escena Principal y Textura */}
          <div className="absolute inset-0 z-10 flex items-center justify-end p-6 md:p-12 pb-32">
            <motion.div 
              className="relative w-full h-[70vh] max-w-4xl border border-white/10 shadow-[var(--shadow-image)] bg-[var(--color-black-elevated)] overflow-hidden rounded-[var(--radius-sm)] pointer-events-auto group origin-center"
              initial={disableMotion ? {} : { scale: 1.04, opacity: 0, filter: 'blur(4px)' }}
              animate={disableMotion ? {} : { scale: 1, opacity: 1, filter: 'blur(0px)' }}
              exit={disableMotion ? {} : { scale: 0.96, opacity: 0, filter: 'blur(4px)' }}
              transition={{ duration: disableMotion ? 0 : 0.9, ease: MotionTokens.ease.cinematic }}
              style={disableMotion ? {} : { x: fgX, y: fgY }}
            >
              <Image 
                src={mainImageSrc} 
                alt={activeProject.title} 
                fill 
                className={`${objectFitClass} ${disableMotion ? '' : 'group-hover:scale-[1.02]'} transition-transform duration-[2s] ease-out`} 
                style={focusStyle}
                unoptimized 
                priority
              />
              <motion.div 
                className="absolute inset-0"
                style={disableMotion ? {} : { x: texX, y: texY }}
              >
                <Image 
                  src={defaultTexture} 
                  alt="Texture" 
                  fill 
                  className="object-cover opacity-[0.03] mix-blend-color-dodge pointer-events-none" 
                  unoptimized 
                />
              </motion.div>
            </motion.div>
          </div>

          {/* CAPA 4 y 5: Info y Metadatos */}
          <motion.div 
            className="relative z-20 w-full flex flex-col md:flex-row justify-between items-end p-6 md:p-12 pointer-events-auto"
            initial={disableMotion ? {} : { opacity: 0, y: 20 }}
            animate={disableMotion ? {} : { opacity: 1, y: 0 }}
            exit={disableMotion ? {} : { opacity: 0, y: -20, transition: { duration: MotionTokens.duration.fast } }}
            transition={{ duration: disableMotion ? 0 : MotionTokens.duration.normal, delay: disableMotion ? 0 : 0.2, ease: MotionTokens.ease.exit }}
          >
            <ActiveProjectInfo project={activeProject} />
            <TechnicalMeta project={activeProject} />
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
