"use client";

import { useState } from 'react';
import Image from 'next/image';
import { project07Data } from '@/content/cases/project-07';
import CaseHero from '@/components/case-study/CaseHero';
import SlopeIntervalExplorer from '@/components/case-study/SlopeIntervalExplorer';
import ImageViewer from '@/components/case-study/ImageViewer';
import ProcessSequence from '@/components/case-study/ProcessSequence';
import MetztitlanFamilyOverview from '@/components/case-study/MetztitlanFamilyOverview';
import SourceLimitationNote from '@/components/case-study/SourceLimitationNote';
import Reveal from '@/components/home/motion/Reveal';

export default function Project07Content({ assets }: { assets: any[] }) {
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  // Imágenes Curadas
  const p7Base = "/portfolio-media/curated/project-07";
  const heroImg = `${p7Base}/project-07-slope-hero.webp`;
  const highResImg = `${p7Base}/project-07-slope-map-full.webp`;
  const legendImg = `${p7Base}/project-07-slope-legend.webp`;
  const silhouetteImg = `${p7Base}/project-07-territory-silhouette.webp`;

  const overviewProjects = [
    { id: "05", slug: "geomorfologia-metztitlan", title: "Formas del Terreno", focus: "Caracterización geomorfológica y agrupación de patrones.", thumbnail: `/portfolio-media/curated/project-05/project-05-geomorphons-preview.webp`, accent: "var(--color-accent-mineral)" },
    { id: "06", slug: "zonas-ecologicas-metztitlan", title: "Unidades Ecológicas", focus: "Reclasificación de uso de suelo y vegetación.", thumbnail: `/portfolio-media/curated/project-06/project-06-ecological-zones-preview.webp`, accent: "var(--color-accent-ecology)" },
    { id: "07", slug: "pendiente-metztitlan", title: "Pendiente", focus: "Representación del territorio mediante cuatro intervalos porcentuales.", thumbnail: `${p7Base}/project-07-slope-preview.webp`, accent: "var(--color-accent-mineral)" },
    { id: "08", slug: "geomorfones-representativos", title: "Geomorfones Representativos", focus: "Selección de elementos destacados mediante puntos rojos.", thumbnail: `/portfolio-media/curated/project-08/project-08-representative-geomorphons-preview.webp`, accent: "var(--color-accent)" }
  ];

  return (
    <article className="bg-[#050505] text-white overflow-x-hidden" style={{ '--color-accent': project07Data.accent } as any}>
      
      {/* 01 — APERTURA */}
      <CaseHero 
        projectNumber={project07Data.id}
        title={project07Data.title}
        territory={project07Data.territory}
        themes={project07Data.themes}
        ambientImage={heroImg}
        mainImage={silhouetteImg}
        pdfPages={project07Data.sourcePages}
      />

      {/* 02 — LEER LA INCLINACIÓN */}
      <section className="max-w-4xl mx-auto px-6 md:px-12 py-32">
        <Reveal direction="up" distance={32}>
          <h2 className="text-display-md text-white mb-8">LEER LA INCLINACIÓN DEL TERRITORIO</h2>
        </Reveal>
        <Reveal delay={0.1} direction="up" distance={16}>
          <div className="text-body-lg text-white/80 leading-relaxed font-light mb-6">
            {project07Data.introduction}
          </div>
          <div className="text-body-lg text-[var(--color-accent)] leading-relaxed font-light">
            {project07Data.secondaryContext}
          </div>
        </Reveal>

        {/* NOTA DE INCONSISTENCIA TERMINOLÓGICA (Requisito estricto del bloque 11) */}
        <Reveal delay={0.3} direction="up">
          <div className="mt-12 p-6 border border-white/10 rounded-[var(--radius-sm)] bg-white/5">
            <div className="text-mono text-[10px] text-[var(--color-accent)] uppercase tracking-widest mb-2">NOTA EDITORIAL SOBRE LA FUENTE</div>
            <p className="text-label text-white/60 leading-relaxed">
              {project07Data.terminologyWarning}
            </p>
          </div>
        </Reveal>
      </section>

      {/* 03 — CUATRO INTERVALOS (Explorador) */}
      <SlopeIntervalExplorer intervals={project07Data.slopeIntervals} legendImage={legendImg} />

      {/* 04 — CARTOGRAFÍA DE PENDIENTE */}
      <section className="max-w-[1600px] mx-auto px-6 md:px-12 py-32 flex flex-col items-center">
        <Reveal direction="up" distance={32} className="w-full mb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <h2 className="text-display-md text-white mb-1">PENDIENTE EN CUATRO INTERVALOS</h2>
            <div className="text-mono text-[10px] text-[var(--color-accent)] uppercase tracking-widest">RESERVA DE LA BIOSFERA EN METZTITLÁN</div>
          </div>
          <button 
            onClick={() => setIsViewerOpen(true)}
            className="text-label text-white border border-[var(--color-accent)]/30 hover:border-[var(--color-accent)] hover:bg-[var(--color-accent)] hover:text-black px-6 py-2 rounded-full transition-colors"
          >
            AMPLIAR MAPA ⛶
          </button>
        </Reveal>

        <Reveal direction="up" distance={64} className="w-full">
          <div className="relative w-full aspect-[4/3] md:aspect-video bg-[#050505] border border-white/10 rounded-[var(--radius-panel)] overflow-hidden cursor-zoom-in group" onClick={() => setIsViewerOpen(true)}>
            <Image src={heroImg} alt="Mapa de pendiente en cuatro intervalos porcentuales" fill className="object-contain p-4 group-hover:scale-[1.01] transition-transform duration-700" unoptimized />
          </div>
          
          <div className="mt-4 flex flex-col md:flex-row justify-between items-start text-mono text-[10px] text-white/40 uppercase tracking-widest gap-4">
            <div>MAPA DE PENDIENTE EN CUATRO INTERVALOS PORCENTUALES PARA LA RESERVA DE LA BIOSFERA EN METZTITLÁN, HIDALGO.</div>
            <div>ELABORACIÓN INCLUIDA EN EL PORTAFOLIO ORIGINAL. PÁGINA 15.</div>
          </div>
        </Reveal>
      </section>

      <ImageViewer 
        isOpen={isViewerOpen} 
        onClose={() => setIsViewerOpen(false)} 
        highResSrc={highResImg} 
        altText="Mapa de pendiente en cuatro intervalos porcentuales" 
      />

      {/* 05 — LECTURA DEL RELIEVE (OBSERVACIONES) */}
      <section className="bg-white/5 border-y border-white/10 py-32">
        <div className="max-w-6xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <Reveal direction="up">
              <h2 className="text-display-md text-white mb-8">LECTURA DEL RELIEVE</h2>
            </Reveal>
            
            <div className="flex flex-col gap-8">
              {project07Data.observations.map((obs, idx) => (
                <Reveal key={idx} delay={idx * 0.1} direction="up" distance={16} className="flex gap-4 items-start">
                  <div className="text-mono text-[10px] text-[var(--color-accent)] shrink-0 mt-1">0{idx + 1}</div>
                  <div className="text-body font-medium text-white/90">{obs}</div>
                </Reveal>
              ))}
            </div>
            
            <Reveal direction="up" delay={0.4} className="mt-8 pt-8 border-t border-white/20">
              <SourceLimitationNote message={project07Data.limitations} />
            </Reveal>
          </div>
          
          <Reveal direction="left" distance={32} className="relative aspect-[3/4] border border-white/10 rounded-[var(--radius-panel)] overflow-hidden">
            <Image src={heroImg} alt="" fill className="object-cover object-left opacity-30 saturate-50 mix-blend-lighten" unoptimized />
          </Reveal>
        </div>
      </section>

      {/* 06 — PROCESO REPRESENTADO */}
      <ProcessSequence steps={project07Data.process} />

      {/* 07 — METZTITLAN FAMILY OVERVIEW */}
      <MetztitlanFamilyOverview activeId={project07Data.id} projects={overviewProjects} />

    </article>
  );
}
