'use client';

import React from 'react';
import { siteProfile } from '@/content/site/site-profile';
import Reveal from '../home/motion/Reveal';
import Link from 'next/link';

export default function AboutCapabilities() {
  return (
    <section id="capacidades" className="py-24 px-6 md:px-12 max-w-5xl mx-auto border-t border-white/10">
      <Reveal direction="up" distance={32}>
        <h2 className="text-display-sm text-white tracking-tighter mb-16">03 — CAPACIDADES</h2>
      </Reveal>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
        {siteProfile.capabilities.map((cap, index) => (
          <Reveal key={index} delay={index * 0.05} direction="up" distance={16}>
            <div>
              <h3 className="text-label text-accent tracking-[0.1em] mb-4">{cap.title}</h3>
              <p className="text-body text-white/70 mb-6">{cap.description}</p>
              <div className="flex flex-wrap gap-2">
                {cap.relatedProjects.map(id => (
                  <Link 
                    key={id} 
                    href={`/atlas`} // Or directly to project if known, but atlas is safer as an index
                    className="text-mono text-[10px] text-white/40 border border-white/20 px-2 py-1 rounded hover:bg-white/10 hover:text-white transition-colors"
                  >
                    PROYECTO {id}
                  </Link>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
