"use client";

import { motion, useReducedMotion } from 'framer-motion';
import { MotionTokens } from '@/motion/motion-tokens';
import { useSafeMode } from './SafeModeContext';

export default function AnimatedHeroIdentity({ profile }: { profile: any }) {
  const isSafeMode = useSafeMode();
  const shouldReduceMotion = useReducedMotion();
  const disableMotion = isSafeMode || shouldReduceMotion;

  const container = {
    hidden: { opacity: disableMotion ? 1 : 0 },
    show: {
      opacity: 1,
      transition: disableMotion ? {} : {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const item = {
    hidden: { opacity: disableMotion ? 1 : 0, y: disableMotion ? 0 : 20 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: disableMotion ? {} : { duration: MotionTokens.duration.normal, ease: MotionTokens.ease.exit }
    }
  };

  return (
    <motion.div 
      className="absolute top-1/4 left-6 md:left-12 z-30 pointer-events-none max-w-xl xl:max-w-3xl mix-blend-difference"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <h1 className="text-display-xl text-white mb-6 md:mb-12 overflow-hidden">
        <motion.span variants={item} className="block drop-shadow-xl">NÉSTOR ELIHU</motion.span>
        <motion.span variants={item} className="block drop-shadow-xl">ARRIAGA GALLEGOS</motion.span>
      </h1>
      
      <div className="max-w-md pl-1 md:pl-2 overflow-hidden">
        <motion.p variants={item} className="text-body-lg text-white/90 mb-2 font-medium tracking-wide">
          {profile.profession}
        </motion.p>
        <motion.p variants={item} className="text-body text-white/70 leading-relaxed font-light">
          {profile.tagline}
        </motion.p>
      </div>
    </motion.div>
  );
}
