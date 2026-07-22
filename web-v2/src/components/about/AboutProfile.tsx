'use client';

import React from 'react';
import { siteProfile } from '@/content/site/site-profile';
import Reveal from '../home/motion/Reveal';

export default function AboutProfile() {
  return (
    <section id="perfil" className="pt-40 pb-24 px-6 md:px-12 max-w-4xl mx-auto">
      <Reveal direction="up" distance={32}>
        <div className="mb-16">
          <h1 className="text-display-lg text-white tracking-tighter leading-[0.9] mb-6">
            NÉSTOR ELIHU<br />
            ARRIAGA GALLEGOS
          </h1>
          <h2 className="text-display-sm text-[var(--color-text-muted)] tracking-tighter leading-tight mb-4">
            INGENIERO EN RECURSOS<br />
            NATURALES RENOVABLES
          </h2>
          <div className="text-label tracking-[0.1em] text-accent">
            TERRITORIO, RURALIDAD Y PAISAJE
          </div>
        </div>
      </Reveal>

      <div className="flex flex-col gap-8 text-body text-white/80 font-serif leading-relaxed">
        {siteProfile.textBlocks.map((block, index) => (
          <Reveal key={index} delay={index * 0.1} direction="up" distance={16}>
            <p>{block}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
