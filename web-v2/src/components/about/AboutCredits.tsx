'use client';

import React from 'react';
import { siteCredits } from '@/content/site/site-credits';
import Reveal from '../home/motion/Reveal';

export default function AboutCredits() {
  return (
    <section id="creditos" className="py-24 px-6 md:px-12 max-w-4xl mx-auto border-t border-white/10">
      <Reveal direction="up" distance={32}>
        <h2 className="text-display-sm text-white tracking-tighter mb-12">04 — CRÉDITOS Y AGRADECIMIENTOS</h2>
      </Reveal>

      <div className="flex flex-col gap-12">
        <Reveal direction="up" distance={16}>
          <div>
            <div className="text-label text-[var(--color-text-muted)] tracking-widest mb-2">
              {siteCredits.mainRole.role}
            </div>
            <div className="text-display-xs text-white">
              {siteCredits.mainRole.name}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1} direction="up" distance={16}>
          <div>
            <div className="text-label text-[var(--color-text-muted)] tracking-widest mb-4">
              AGRADECIMIENTOS
            </div>
            <p className="text-body text-white/70 font-serif leading-relaxed">
              {siteCredits.acknowledgments.text}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
