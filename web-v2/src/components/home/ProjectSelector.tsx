"use client";

import Link from 'next/link';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { useSafeMode } from './motion/SafeModeContext';

export default function ProjectSelector({ projects, activeId, assets }: { projects: any[], activeId: string, assets: any[] }) {
  const isSafeMode = useSafeMode();
  const shouldReduceMotion = useReducedMotion();
  const disableMotion = isSafeMode || shouldReduceMotion;

  return (
    <motion.div 
      className="absolute bottom-6 left-6 md:left-12 z-30 flex flex-row gap-2 md:gap-4 overflow-x-auto max-w-[calc(100vw-3rem)] pb-4 pointer-events-auto snap-x"
      initial={disableMotion ? {} : { opacity: 0, y: 20 }}
      animate={disableMotion ? {} : { opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
    >
      {projects.map((p) => {
        const isActive = p.id === activeId;
        const asset = assets.find(a => a.projectId === p.id && (a.role === 'thumbnail' || a.role === 'hero-candidate'));
        const thumbSrc = asset?.variants?.thumbnail || asset?.variants?.originalClean || '/portfolio-media/curated/identity/identity-relief-hero-wide-original-clean.webp';

        return (
          <Link key={p.id} href={`/?project=${p.id}`} scroll={false} className="snap-start flex-shrink-0 group">
            <div className={`relative w-40 md:w-48 h-24 p-3 border transition-all duration-300 overflow-hidden rounded-[var(--radius-sm)] flex flex-col justify-end ${isActive ? 'border-[var(--color-accent)] bg-black/80 shadow-[var(--shadow-ambient)]' : 'border-white/10 bg-[var(--color-graphite-light)] hover:border-white/30'}`}>
              
              {/* Background Thumbnail */}
              <div className="absolute inset-0 z-0">
                <Image src={thumbSrc} alt={p.title} fill className={`object-cover transition-opacity duration-500 ${isActive ? 'opacity-40' : 'opacity-10 grayscale group-hover:grayscale-0 group-hover:opacity-30'}`} unoptimized />
              </div>

              {/* Content */}
              <div className="relative z-10 flex flex-col">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-mono text-[10px]" style={{ color: isActive ? p.accent || 'var(--color-accent)' : 'var(--color-text-faint)' }}>{p.id}</span>
                </div>
                <div className={`text-label truncate ${isActive ? 'text-white' : 'text-white/60'}`}>{p.shortTitle || p.title}</div>
                <div className="text-mono text-[8px] text-white/40 truncate mt-1">{p.territory}</div>
              </div>
            </div>
          </Link>
        );
      })}
    </motion.div>
  );
}
