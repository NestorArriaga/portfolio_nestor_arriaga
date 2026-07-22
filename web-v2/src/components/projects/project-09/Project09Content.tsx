"use client";

import { useState } from 'react';
import Image from 'next/image';
import { project09Data } from '@/content/cases/project-09';
import CaseHero from '@/components/case-study/CaseHero';
import AguascalientesTerritoryIntro from '@/components/case-study/AguascalientesTerritoryIntro';
import MethodRoute from '@/components/case-study/MethodRoute';
import VocationalClusterExplorer from '@/components/case-study/VocationalClusterExplorer';
import ImageViewer from '@/components/case-study/ImageViewer';
import SourceConsistencyNote from '@/components/case-study/SourceConsistencyNote';
import AguascalientesFamilyOverview from '@/components/case-study/AguascalientesFamilyOverview';
import TerritoryTransition from '@/components/case-study/TerritoryTransition';
import Reveal from '@/components/home/motion/Reveal';

export default function Project09Content({ assets }: { assets: any[] }) {
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  // Imágenes Curadas
  const p9Base = "/portfolio-media/curated/project-09";
  const tBase = "/portfolio-media/curated/territories";
  
  const heroImg = `${p9Base}/project-09-cluster-hero.webp`;
  const highResImg = `${p9Base}/project-09-vocational-map-full.webp`;
  const silhouetteImg = `${p9Base}/project-09-state-silhouette.webp`;
  
  const photoPortrait = `${tBase}/territory-aguascalientes-calvillo-photo-portrait.webp`;
  const photoLandscape = `${tBase}/territory-aguascalientes-calvillo-photo-landscape.webp`;

  const overviewProjects = [
    { id: "09", slug: "vocaciones-productivas-aguascalientes", title: "Vocaciones Productivas", focus: "Agrupación municipal con orientaciones hacia conservación y agricultura.", thumbnail: `${p9Base}/project-09-cluster-preview.webp`, accent: "var(--color-accent-agri)" },
    { id: "10", slug: "aptitud-conservacion-aguascalientes", title: "Aptitud para la Conservación", focus: "Mapa territorial de condiciones relacionadas con conservación.", thumbnail: `/portfolio-media/curated/identity/identity-relief-hero-wide-original-clean.webp`, accent: "#4caf50", isPlaceholder: true },
    { id: "11", slug: "aptitud-agricola", title: "Aptitud Agrícola", focus: "Mapa territorial de condiciones relacionadas con agricultura.", thumbnail: `/portfolio-media/curated/identity/identity-relief-hero-wide-original-clean.webp`, accent: "#ff9800", isPlaceholder: true },
    { id: "12", slug: "degradacion-suelo", title: "Degradación del Suelo", focus: "Lectura territorial para un plan integral de manejo ganadero en Calvillo.", thumbnail: `/portfolio-media/curated/identity/identity-relief-hero-wide-original-clean.webp`, accent: "#8d6e63", isPlaceholder: true },
    { id: "13", slug: "subcuencas-rios", title: "Subcuencas y Ríos", focus: "Delimitación hidrológica para el manejo ganadero en Calvillo.", thumbnail: `/portfolio-media/curated/identity/identity-relief-hero-wide-original-clean.webp`, accent: "#29b6f6", isPlaceholder: true }
  ];

  const nextProjectThumbnail = assets.find(a => a.projectId === "10")?.variants?.thumbnail || "/portfolio-media/curated/identity/identity-relief-hero-wide-original-clean.webp";
  const currentFamilySummary = "Una lectura regional de las vocaciones productivas mediante agrupaciones que integran dimensiones ecológicas, sociales y económicas.";

  return (
    <article className="bg-[#050505] text-white overflow-x-hidden" style={{ '--color-accent': project09Data.accent } as any}>
      
      {/* 01 — APERTURA (HERO DEL PROYECTO) */}
      <CaseHero 
        projectNumber={project09Data.id}
        title={project09Data.title}
        territory={project09Data.territory}
        themes={project09Data.themes}
        ambientImage={heroImg}
        mainImage={silhouetteImg}
        pdfPages={project09Data.sourcePages}
      />

      {/* 02 — AGUASCALIENTES (APERTURA TERRITORIAL FOTOGRÁFICA) */}
      <AguascalientesTerritoryIntro 
        photoSrc={photoPortrait} 
        silhouetteSrc={silhouetteImg} 
      />

      {/* 03 — VOCACIÓN TERRITORIAL Y REFERENTES CONCEPTUALES */}
      <section className="max-w-6xl mx-auto px-6 md:px-12 py-32 grid grid-cols-1 md:grid-cols-2 gap-16">
        <div>
          <Reveal direction="up" distance={32}>
            <h2 className="text-display-md text-white mb-8">{project09Data.vocationDefinition.title}</h2>
          </Reveal>
          <Reveal delay={0.1} direction="up" distance={16}>
            <p className="text-body-lg text-white/80 leading-relaxed font-light mb-8">
              {project09Data.vocationDefinition.text}
            </p>
            <figure className="border-l-2 border-[var(--color-accent)] pl-6 py-2">
              <blockquote className="text-body text-[var(--color-accent)] italic mb-2">
                “{project09Data.vocationDefinition.quote}”
              </blockquote>
              <figcaption className="text-mono text-[10px] text-white/50 uppercase tracking-widest">— {project09Data.vocationDefinition.attribution}</figcaption>
            </figure>
          </Reveal>
        </div>

        <div>
          <Reveal direction="up" distance={32}>
            <h2 className="text-display-md text-white mb-8">{project09Data.conceptualReferences.title}</h2>
          </Reveal>
          <Reveal delay={0.1} direction="up" distance={16}>
            <p className="text-body-lg text-white/80 leading-relaxed font-light mb-6">
              {project09Data.conceptualReferences.text}
            </p>
            <p className="text-body-lg text-white/50 leading-relaxed font-light">
              {project09Data.conceptualReferences.subtext}
            </p>
          </Reveal>
        </div>
      </section>

      {/* 04 — RUTA METODOLÓGICA */}
      <MethodRoute steps={project09Data.methodologyRoute} />

      {/* 05 — DOS CLÚSTERES (EXPLORADOR) */}
      <VocationalClusterExplorer clusters={project09Data.clusters} />

      {/* 06 — MAPA VOCACIONAL */}
      <section className="max-w-[1600px] mx-auto px-6 md:px-12 py-32 flex flex-col items-center">
        <Reveal direction="up" distance={32} className="w-full mb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <h2 className="text-display-md text-white mb-1">MAPA VOCACIONAL MUNICIPAL</h2>
            <div className="text-mono text-[10px] text-[var(--color-accent)] uppercase tracking-widest">ESTADO DE AGUASCALIENTES</div>
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
            <Image src={heroImg} alt="Mapa vocacional municipal de Aguascalientes" fill className="object-contain p-4 group-hover:scale-[1.01] transition-transform duration-700" unoptimized />
          </div>
          
          <div className="mt-4 flex flex-col md:flex-row justify-between items-start text-mono text-[10px] text-white/40 uppercase tracking-widest gap-4">
            <div>MAPA VOCACIONAL MUNICIPAL DE AGUASCALIENTES CON DOS AGRUPACIONES ORIENTADAS HACIA LA CONSERVACIÓN Y LA AGRICULTURA.</div>
            <div>ELABORACIÓN INCLUIDA EN EL PORTAFOLIO ORIGINAL. PÁGINA 17.</div>
          </div>
        </Reveal>
      </section>

      <ImageViewer 
        isOpen={isViewerOpen} 
        onClose={() => setIsViewerOpen(false)} 
        highResSrc={highResImg} 
        altText="Mapa vocacional municipal de Aguascalientes" 
      />

      {/* 07 — LECTURA TERRITORIAL (OBSERVACIONES) */}
      <section className="bg-white/5 border-y border-white/10 py-32 relative overflow-hidden">
        
        <div className="absolute inset-0 z-0 opacity-10 mix-blend-screen pointer-events-none">
          <Image src={photoLandscape} alt="" fill className="object-cover" unoptimized />
        </div>

        <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <Reveal direction="up">
              <h2 className="text-display-md text-white mb-8">LECTURA TERRITORIAL</h2>
            </Reveal>
            
            <div className="flex flex-col gap-8">
              {project09Data.observations.map((obs, idx) => (
                <Reveal key={idx} delay={idx * 0.1} direction="up" distance={16} className="flex gap-4 items-start">
                  <div className="text-mono text-[10px] text-[var(--color-accent)] shrink-0 mt-1">0{idx + 1}</div>
                  <div className="text-body font-medium text-white/90">{obs}</div>
                </Reveal>
              ))}
            </div>
          </div>
          
          <Reveal direction="left" distance={32} className="relative aspect-square border border-white/10 rounded-[var(--radius-panel)] overflow-hidden">
            <Image src={heroImg} alt="" fill className="object-contain p-4 opacity-50 saturate-50 mix-blend-lighten" unoptimized />
          </Reveal>
        </div>
      </section>

      {/* 08 — LÍMITES DE LA FUENTE */}
      <SourceConsistencyNote warnings={project09Data.sourceWarnings} limitations={project09Data.limitations} />

      {/* 09 — AGUASCALIENTES FAMILY OVERVIEW */}
      <AguascalientesFamilyOverview activeId={project09Data.id} projects={overviewProjects} />

      {/* 10 — TRANSICIÓN AL SIGUIENTE PROYECTO */}
      <TerritoryTransition 
        currentFamilySummary={currentFamilySummary} 
        nextProject={{
          ...project09Data.nextProject,
          thumbnailUrl: nextProjectThumbnail
        }} 
      />

    </article>
  );
}
