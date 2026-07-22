'use client';

import React from 'react';
import { siteProfile } from '@/content/site/site-profile';
import Reveal from '../home/motion/Reveal';

export default function AboutApproach() {
  return (
    <section id="enfoque" className="py-24 px-6 md:px-12 max-w-4xl mx-auto border-t border-white/10">
      <Reveal direction="up" distance={32}>
        <div className="mb-12">
          <h2 className="text-display-sm text-white tracking-tighter mb-4">02 — ENFOQUE</h2>
          <h3 className="text-display-md text-accent tracking-tighter">{siteProfile.preface.title}</h3>
        </div>
      </Reveal>

      <div className="flex flex-col gap-8 text-body text-white/80 font-serif leading-relaxed italic border-l-2 border-white/20 pl-6 md:pl-12">
        {siteProfile.preface.textBlocks.map((block, index) => (
          <Reveal key={index} delay={index * 0.1} direction="up" distance={16}>
            <p>{block}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
