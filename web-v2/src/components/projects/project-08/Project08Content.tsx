"use client";

import { useState } from 'react';
import Image from 'next/image';
import { project08Data } from '@/content/cases/project-08';
import CaseHero from '@/components/case-study/CaseHero';
import MentionedLandformComposition from '@/components/case-study/MentionedLandformComposition';
import ImageViewer from '@/components/case-study/ImageViewer';
import ProcessSequence from '@/components/case-study/ProcessSequence';
import MetztitlanFamilyOverview from '@/components/case-study/MetztitlanFamilyOverview';
import TerritoryTransition from '@/components/case-study/TerritoryTransition';
import SourceLimitationNote from '@/components/case-study/SourceLimitationNote';
import Reveal from '@/components/home/motion/Reveal';

export default function Project08Content({ assets }: { assets: any[] }) {
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  // Imágenes Curadas
  const p8Base = "/portfolio-media/curated/project-08";
  const heroImg = `${p8Base}/project-08-representative-geomorphons-hero.webp`;
  const highResImg = `${p8Base}/project-08-representative-geomorphons-map-full.webp`;
  const detailImg = `${p8Base}/project-08-red-points-detail.webp`;
  const silhouetteImg = `${p8Base}/project-08-territory-silhouette.webp`;

  const overviewProjects = [
    { id: "05", slug: "geomorfologia-metztitlan", title: "Formas del Terreno", focus: "Caracterización geomorfológica y agrupación de patrones.", thumbnail: `/portfolio-media/curated/project-05/project-05-geomorphons-preview.webp`, accent: "var(--color-accent-mineral)" },
    { id: "06", slug: "zonas-ecologicas-metztitlan", title: "Unidades Ecológicas", focus: "Reclasificación de uso de suelo y vegetación.", thumbnail: `/portfolio-media/curated/project-06/project-06-ecological-zones-preview.webp`, accent: "var(--color-accent-ecology)" },
    { id: "07", slug: "pendiente-metztitlan", title: "Pendiente", focus: "Representación del territorio mediante cuatro intervalos porcentuales.", thumbnail: `/portfolio-media/curated/project-07/project-07-slope-preview.webp`, accent: "var(--color-accent-mineral)" },
    { id: "08", slug: "geomorfones-representativos", title: "Geomorfones Representativos", focus: "Selección de elementos destacados mediante puntos rojos.", thumbnail: `${p8Base}/project-08-representative-geomorphons-preview.webp`, accent: "var(--color-accent)" }
  ];

  const nextProjectThumbnail = assets.find(a => a.projectId === "09")?.variants?.thumbnail || "/portfolio-media/curated/identity/identity-relief-hero-wide-original-clean.webp";
  const currentFamilySummary = "Los cuatro proyectos construyen una lectura del paisaje basada en su estructura física y ambiental: clasifican formas, diferencian unidades ecológicas, representan la pendiente y seleccionan geomorfones significativos.";

  return (
    <article className="bg-[#050505] text-white overflow-x-hidden" style={{ '--color-accent': project08Data.accent } as any}>
      
      {/* 01 — APERTURA */}
      <CaseHero 
        projectNumber={project08Data.id}
        title={project08Data.title}
        territory={project08Data.territory}
        themes={project08Data.themes}
        ambientImage={heroImg}
        mainImage={silhouetteImg}
        pdfPages={project08Data.sourcePages}
      />

      {/* 02 — SELECCIONAR PARA INTERPRETAR */}
      <section className="max-w-4xl mx-auto px-6 md:px-12 py-32">
        <Reveal direction="up" distance={32}>
          <h2 className="text-display-md text-white mb-8">SELECCIONAR PARA INTERPRETAR</h2>
        </Reveal>
        <Reveal delay={0.1} direction="up" distance={16}>
          <div className="text-body-lg text-white/80 leading-relaxed font-light mb-6">
            {project08Data.introduction}
          </div>
          <div className="text-body-lg text-[var(--color-accent)] leading-relaxed font-light">
            {project08Data.secondaryContext}
          </div>
        </Reveal>
      </section>

      {/* 03 — PUNTOS DESTACADOS EN EL MAPA */}
      <section className="w-full bg-[#050505] py-32 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col lg:flex-row gap-16 items-center">
          
          <div className="w-full lg:w-1/3">
            <Reveal direction="up">
              <h2 className="text-display-md text-white mb-8">PUNTOS DESTACADOS EN EL MAPA</h2>
              <p className="text-body text-white/70 leading-relaxed mb-8">
                Los puntos rojos funcionan como marcadores visuales dentro de la estructura general del paisaje. No representan estaciones de muestreo ni áreas validadas en campo, sino elementos seleccionados para sintetizar características representativas.
              </p>
              <div className="text-mono text-[10px] text-[var(--color-accent)] uppercase tracking-widest pt-4 border-t border-white/10">
                Detalle del mapa original
              </div>
            </Reveal>
          </div>

          <div className="w-full lg:w-2/3">
            <Reveal direction="left" distance={32}>
              <div className="relative w-full aspect-video md:aspect-[21/9] rounded-[var(--radius-panel)] overflow-hidden border border-white/10">
                <Image 
                  src={detailImg} 
                  alt="Detalle de puntos rojos representativos" 
                  fill 
                  className="object-cover" 
                  unoptimized 
                />
              </div>
            </Reveal>
          </div>
          
        </div>
      </section>

      {/* 04 — FORMAS MENCIONADAS */}
      <MentionedLandformComposition landforms={project08Data.mentionedLandforms} />

      {/* 05 — CARTOGRAFÍA DE SELECCIÓN */}
      <section className="max-w-[1600px] mx-auto px-6 md:px-12 py-32 flex flex-col items-center">
        <Reveal direction="up" distance={32} className="w-full mb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <h2 className="text-display-md text-white mb-1">SELECCIÓN DE GEOMORFONES REPRESENTATIVOS</h2>
            <div className="text-mono text-[10px] text-[var(--color-accent)] uppercase tracking-widest">METZTITLÁN, HIDALGO</div>
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
            <Image src={heroImg} alt="Mapa de selección de geomorfones representativos" fill className="object-contain p-4 group-hover:scale-[1.01] transition-transform duration-700" unoptimized />
          </div>
          
          <div className="mt-4 flex flex-col md:flex-row justify-between items-start text-mono text-[10px] text-white/40 uppercase tracking-widest gap-4">
            <div>MAPA DE SELECCIÓN DE GEOMORFONES REPRESENTATIVOS, DESTACADOS MEDIANTE PUNTOS ROJOS, EN METZTITLÁN, HIDALGO.</div>
            <div>ELABORACIÓN INCLUIDA EN EL PORTAFOLIO ORIGINAL. PÁGINA 15.</div>
          </div>
        </Reveal>
      </section>

      <ImageViewer 
        isOpen={isViewerOpen} 
        onClose={() => setIsViewerOpen(false)} 
        highResSrc={highResImg} 
        altText="Mapa de selección de geomorfones representativos" 
      />

      {/* 06 — LECTURA TERRITORIAL (OBSERVACIONES) */}
      <section className="bg-white/5 border-y border-white/10 py-32">
        <div className="max-w-6xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <Reveal direction="up">
              <h2 className="text-display-md text-white mb-8">LECTURA TERRITORIAL</h2>
            </Reveal>
            
            <div className="flex flex-col gap-8">
              {project08Data.observations.map((obs, idx) => (
                <Reveal key={idx} delay={idx * 0.1} direction="up" distance={16} className="flex gap-4 items-start">
                  <div className="text-mono text-[10px] text-[var(--color-accent)] shrink-0 mt-1">0{idx + 1}</div>
                  <div className="text-body font-medium text-white/90">{obs}</div>
                </Reveal>
              ))}
            </div>
            
            <Reveal direction="up" delay={0.4} className="mt-8 pt-8 border-t border-white/20">
              <SourceLimitationNote message={project08Data.limitations} />
            </Reveal>
          </div>
          
          <Reveal direction="left" distance={32} className="relative aspect-[3/4] border border-white/10 rounded-[var(--radius-panel)] overflow-hidden">
            <Image src={heroImg} alt="" fill className="object-cover object-right opacity-30 saturate-50 mix-blend-lighten" unoptimized />
          </Reveal>
        </div>
      </section>

      {/* 07 — PROCESO REPRESENTADO */}
      <ProcessSequence steps={project08Data.process} />

      {/* 08 — METZTITLAN FAMILY OVERVIEW */}
      <MetztitlanFamilyOverview activeId={project08Data.id} projects={overviewProjects} />

      {/* 09 — CIERRE DE LA FAMILIA METZTITLAN Y TRANSICIÓN AL SIGUIENTE TERRITORIO */}
      <TerritoryTransition 
        currentFamilySummary={currentFamilySummary} 
        nextProject={{
          ...project08Data.nextProject,
          thumbnailUrl: nextProjectThumbnail
        }} 
      />

    </article>
  );
}
