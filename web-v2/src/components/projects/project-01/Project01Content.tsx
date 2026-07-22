"use client";

import { useState } from 'react';
import { project01Data } from '@/content/cases/project-01';
import CaseHero from '@/components/case-study/CaseHero';
import MetricStrip from '@/components/case-study/MetricStrip';
import ImageViewer from '@/components/case-study/ImageViewer';
import ProcessSequence from '@/components/case-study/ProcessSequence';
import CaseNavigation from '@/components/case-study/CaseNavigation';
import Reveal from '@/components/home/motion/Reveal';
import Image from 'next/image';

export default function Project01Content({ assets }: { assets: any[] }) {
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  // Mapear recursos reales extraídos
  const heroAsset = assets.find(a => a.projectId === "01" && a.role === "hero-candidate") || assets.find(a => a.projectId === "01");
  const ambientImg = "/portfolio-media/curated/project-01/project-01-map-ambient.webp";
  // Si no tenemos ambiente dedicado, podemos usar la misma con CSS, pero el CaseHero ya le pone filtros blur
  const heroImg = heroAsset?.variants?.originalClean || "/portfolio-media/curated/project-01/project-01-map-original-clean.webp";
  const highResImg = heroAsset?.variants?.gallery || heroImg;
  const nextProjectThumbnail = assets.find(a => a.projectId === "02")?.variants?.thumbnail || "/portfolio-media/curated/identity/identity-relief-hero-wide-original-clean.webp";

  return (
    <article className="bg-[#050505] text-white overflow-x-hidden">
      
      {/* 01 — APERTURA */}
      <CaseHero 
        projectNumber={project01Data.id}
        title={project01Data.title}
        territory={project01Data.territory}
        themes={project01Data.themes}
        ambientImage={heroImg}
        mainImage={heroImg}
        pdfPages={project01Data.sourcePages}
      />

      {/* 02 — CONTEXTO */}
      <section className="max-w-4xl mx-auto px-6 md:px-12 py-32">
        <Reveal direction="up" distance={32}>
          <h2 className="text-display-md text-white mb-8">CARTOGRAFIAR EL VERDE URBANO</h2>
        </Reveal>
        <Reveal delay={0.1} direction="up" distance={16}>
          <div className="text-body-lg text-white/80 leading-relaxed font-light">
            {project01Data.summary}
          </div>
        </Reveal>
      </section>

      {/* 03 — INDICADORES */}
      <MetricStrip metrics={project01Data.metrics} />

      {/* 04 — CARTOGRAFÍA PRINCIPAL */}
      <section className="max-w-[1600px] mx-auto px-6 md:px-12 py-32 flex flex-col items-center">
        <Reveal direction="up" distance={32} className="w-full mb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <h2 className="text-display-md text-white mb-1">MAPA DE ÁREAS VERDES</h2>
            <div className="text-mono text-[10px] text-[var(--color-accent)] uppercase tracking-widest">ALCALDÍA MIGUEL HIDALGO</div>
          </div>
          <button 
            onClick={() => setIsViewerOpen(true)}
            className="text-label text-white border border-white/20 hover:border-white hover:bg-white hover:text-black px-6 py-2 rounded-full transition-colors"
          >
            AMPLIAR MAPA ⛶
          </button>
        </Reveal>

        <Reveal direction="up" distance={64} className="w-full">
          <div className="relative w-full aspect-[4/5] md:aspect-video bg-white/5 border border-white/10 rounded-[var(--radius-panel)] p-2 md:p-8 cursor-zoom-in" onClick={() => setIsViewerOpen(true)}>
            <div className="relative w-full h-full">
              <Image src={heroImg} alt="Mapa de áreas verdes" fill className="object-contain" unoptimized />
            </div>
          </div>
          <div className="mt-4 flex flex-col md:flex-row justify-between items-start text-mono text-[10px] text-white/40 uppercase tracking-widest gap-4">
            <div>MAPA DE DISTRIBUCIÓN DE ÁREAS VERDES EN LA ALCALDÍA MIGUEL HIDALGO.</div>
            <div>ELABORACIÓN INCLUIDA EN EL PORTAFOLIO ORIGINAL.</div>
          </div>
        </Reveal>
      </section>

      {/* VISOR MODAL */}
      <ImageViewer 
        isOpen={isViewerOpen} 
        onClose={() => setIsViewerOpen(false)} 
        highResSrc={highResImg} 
        altText="Visor ampliado de mapa de áreas verdes" 
      />

      {/* 05 — LECTURA TERRITORIAL */}
      <section className="bg-white/5 border-y border-white/10 py-32">
        <div className="max-w-6xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-16">
          <div>
            <Reveal direction="up">
              <h2 className="text-display-md text-white mb-8">LECTURA TERRITORIAL</h2>
              <p className="text-body text-white/70 leading-relaxed mb-12">
                La tensión entre expansión urbana y gestión ambiental se materializa en la distribución de los espacios con funciones de biodiversidad y recreación pública.
              </p>
            </Reveal>
            
            <div className="flex flex-col gap-8">
              {project01Data.observations.map((obs, idx) => (
                <Reveal key={idx} delay={idx * 0.1} direction="up" distance={16} className="flex gap-4 items-start">
                  <div className="text-mono text-[10px] text-[var(--color-accent)] shrink-0 mt-1">0{idx + 1}</div>
                  <div className="text-body font-medium text-white/90">{obs}</div>
                </Reveal>
              ))}
            </div>
          </div>
          
          <Reveal direction="left" distance={32} className="relative aspect-square md:aspect-auto md:h-full bg-[#050505] border border-white/10 rounded-[var(--radius-panel)] overflow-hidden">
            {/* Recorte simulado usando object-position centrado o bottom para variar */}
            <Image src={heroImg} alt="" fill className="object-cover object-bottom opacity-50 saturate-0 mix-blend-lighten" unoptimized />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] to-transparent"></div>
          </Reveal>
        </div>
      </section>

      {/* 06 — PROCESO Y ALCANCE */}
      <ProcessSequence steps={project01Data.process} />

      {/* TRANSICIÓN EDITORIAL CIUDAD DE MÉXICO */}
      <section className="max-w-4xl mx-auto px-6 md:px-12 py-32 text-center">
        <Reveal direction="up">
          <div className="text-mono text-sm text-[var(--color-accent)] mb-6 uppercase tracking-widest">CIUDAD DE MÉXICO</div>
          <p className="text-display-sm text-white/80 leading-tight">
            La ciudad aparece en el portafolio como un territorio de capas históricas, ambientales y urbanas, donde cartografiar implica reconocer las transformaciones del paisaje y las huellas que permanecen bajo la expansión metropolitana.
          </p>
        </Reveal>
      </section>

      {/* 07 y 08 — CIERRE Y NAVEGACIÓN */}
      <CaseNavigation 
        currentProjectNumber={project01Data.id}
        currentProjectTitle={project01Data.title}
        nextProject={{
          ...project01Data.nextProject,
          thumbnailUrl: nextProjectThumbnail
        }}
      />

    </article>
  );
}
