'use client';

import React from 'react';
import { siteContact } from '@/content/site/site-contact';
import Reveal from '../home/motion/Reveal';

export default function AboutContact() {
  return (
    <section id="contacto" className="py-24 px-6 md:px-12 max-w-4xl mx-auto border-t border-white/10">
      <Reveal direction="up" distance={32}>
        <h2 className="text-display-sm text-white tracking-tighter mb-8">05 — {siteContact.title}</h2>
      </Reveal>

      <Reveal delay={0.1} direction="up" distance={16}>
        <p className="text-body text-white/80 mb-12 max-w-2xl">
          {siteContact.text}
        </p>
      </Reveal>

      <div className="flex flex-col gap-6 max-w-md">
        {siteContact.publicEmail && (
          <Reveal delay={0.2} direction="up" distance={16}>
            <a 
              href={`mailto:${siteContact.publicEmail}`}
              className="flex items-center justify-between p-6 bg-white/5 border border-white/10 hover:border-accent hover:bg-white/10 transition-colors group rounded-[var(--radius-sm)]"
            >
              <span className="text-label tracking-widest text-white/70 group-hover:text-white">CORREO ELECTRÓNICO</span>
              <span className="text-white">↗</span>
            </a>
          </Reveal>
        )}
        
        {siteContact.linkedinUrl && (
          <Reveal delay={0.3} direction="up" distance={16}>
            <a 
              href={siteContact.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-6 bg-white/5 border border-white/10 hover:border-accent hover:bg-white/10 transition-colors group rounded-[var(--radius-sm)]"
            >
              <span className="text-label tracking-widest text-white/70 group-hover:text-white">LINKEDIN</span>
              <span className="text-white">↗</span>
            </a>
          </Reveal>
        )}
      </div>
      
      <Reveal delay={0.4} direction="up" distance={16}>
        <div className="mt-16 text-caption text-white/40 max-w-xl">
          {siteContact.privacyNote}
        </div>
      </Reveal>
    </section>
  );
}
