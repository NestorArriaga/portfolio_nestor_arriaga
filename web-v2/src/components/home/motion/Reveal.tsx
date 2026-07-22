"use client";

import { motion, useReducedMotion } from 'framer-motion';
import { ReactNode } from 'react';
import { MotionTokens } from '@/motion/motion-tokens';

interface RevealProps {
  children: ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  distance?: number;
  duration?: number;
  className?: string;
  amount?: 'some' | 'all' | number;
}

export default function Reveal({
  children,
  delay = 0,
  direction = 'up',
  distance = MotionTokens.distance.revealMedium,
  duration = MotionTokens.duration.normal,
  className = "",
  amount = 0.2
}: RevealProps) {
  const shouldReduceMotion = useReducedMotion();

  const getInitial = () => {
    if (shouldReduceMotion) return { opacity: 0 };
    switch (direction) {
      case 'up': return { opacity: 0, y: distance };
      case 'down': return { opacity: 0, y: -distance };
      case 'left': return { opacity: 0, x: distance };
      case 'right': return { opacity: 0, x: -distance };
      case 'none': return { opacity: 0 };
      default: return { opacity: 0, y: distance };
    }
  };

  const getAnimate = () => {
    if (shouldReduceMotion) return { opacity: 1 };
    switch (direction) {
      case 'up':
      case 'down':
        return { opacity: 1, y: 0 };
      case 'left':
      case 'right':
        return { opacity: 1, x: 0 };
      case 'none':
        return { opacity: 1 };
      default:
        return { opacity: 1, y: 0 };
    }
  };

  return (
    <motion.div
      initial={getInitial()}
      whileInView={getAnimate()}
      viewport={{ once: true, amount }}
      transition={{
        duration: shouldReduceMotion ? MotionTokens.duration.fast : duration,
        delay,
        ease: MotionTokens.ease.enter
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
