"use client";

import { useState } from 'react';
import Image from 'next/image';
import { project13Data } from '@/content/cases/project-13';
import CaseHero from '@/components/case-study/CaseHero';
import CalvilloTerritoryIntro from '@/components/case-study/CalvilloTerritoryIntro';
import SharedLivestockPlanContext from '@/components/case-study/SharedLivestockPlanContext';
import HydrologyMapLimitation from '@/components/case-study/HydrologyMapLimitation';
import SourceNarrativeClaim from '@/components/case-study/SourceNarrativeClaim';
import GeneralDetailView from '@/components/case-study/GeneralDetailView';
import ProcessSequence from '@/components/case-study/ProcessSequence';
import ImageViewer from '@/components/case-study/ImageViewer';
import CalvilloTerritorialPair from '@/components/case-study/CalvilloTerritorialPair';
import AguascalientesFamilyClosing from '@/components/case-study/AguascalientesFamilyClosing';
import GranularTransitionPreview from '@/components/case-study/GranularTransitionPreview';
import Reveal from '@/components/home/motion/Reveal';

export default function Project13Content({ assets }: { assets: any[] }) {
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  // Imágenes Curadas
  const p13Base = "/portfolio-media/curated/project-13";
  const tBase = "/portfolio-media/curated/territories";
  
  const heroImg = `${p13Base}/project-13-subbasins-rivers-hero.webp`;
  const highResImg = `${p13Base}/project-13-hydrology-map-full.webp`;
  const silhouetteImg = `${p13Base}/project-13-territory-silhouette.webp`;
  const detailImg = `${p13Base}/project-13-river-network-detail.webp`;
  const personImg = `${p13Base}/project-13-livestock-photo.webp`;
  
  const photoCalvillo = `${tBase}/territory-aguascalientes-calvillo-photo-landscape.webp`;

  return (
    <article className="bg-[#050505] text-white overflow-x-hidden" style={{ '--color-accent': project13Data.accent } as any}>
      
      {/* 01 — APERTURA (HERO DEL PROYECTO) */}
      <CaseHero 
        projectNumber={project13Data.id}
        title={project13Data.title}
        territory={project13Data.territory}
        themes={project13Data.themes}
        ambientImage={heroImg}
        mainImage={silhouetteImg}
        pdfPages={project13Data.sourcePages}
      />

      {/* 02 & 03 — CALVILLO (EL AGUA COMO ESTRUCTURA TERRITORIAL) */}
      <CalvilloTerritoryIntro photoSrc={photoCalvillo} />

      {/* 04, 05 & 06 — RED HIDROGRÁFICA Y MAPA DE SUBCUENCAS */}
      <section className="max-w-[1600px] mx-auto px-6 md:px-12 py-32 flex flex-col items-center">
        <Reveal direction="up" distance={32} className="w-full mb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <h2 className="text-display-md text-white mb-1">SUBCUENCAS Y RÍOS</h2>
            <div className="text-mono text-[10px] text-[var(--color-accent)] uppercase tracking-widest">CALVILLO, AGUASCALIENTES</div>
          </div>
        </Reveal>

        <GeneralDetailView 
          generalSrc={heroImg} 
          detailSrc={detailImg} 
          title="UNA RED REPRESENTADA EN EL PAISAJE" 
          onExpand={() => setIsViewerOpen(true)}
          accentColor={project13Data.accent}
          isSoil={false}
        />

        <div className="w-full max-w-4xl mr-auto mt-8">
          <div className="text-mono text-[10px] text-white/40 uppercase tracking-widest mb-4">
            MAPA DE DELIMITACIÓN HIDROLÓGICA E IDENTIFICACIÓN DE RÍOS PARA UNA PROPUESTA DE MANEJO GANADERO EN CALVILLO, AGUASCALIENTES.<br/>
            ELABORACIÓN INCLUIDA EN EL PORTAFOLIO ORIGINAL. PÁGINA 20.
          </div>
          <HydrologyMapLimitation message={project13Data.hydrologyDetailWarning} />
        </div>
      </section>

      <ImageViewer 
        isOpen={isViewerOpen} 
        onClose={() => setIsViewerOpen(false)} 
        highResSrc={highResImg} 
        altText="Mapa de delimitación hidrológica e identificación de ríos" 
      />

      {/* 07 — RELACIÓN CON EL MANEJO GANADERO */}
      <SharedLivestockPlanContext photoSrc={personImg} />

      {/* 08 — ALCANCE DOCUMENTADO (LECTURA TERRITORIAL) */}
      <section className="bg-white/5 border-y border-[var(--color-accent)]/10 py-32 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 md:px-12">
          <Reveal direction="up">
            <h2 className="text-display-md text-white mb-8">LECTURA TERRITORIAL</h2>
          </Reveal>
          
          <div className="flex flex-col gap-8 mb-16">
            {project13Data.observations.map((obs, idx) => (
              <Reveal key={idx} delay={idx * 0.1} direction="up" distance={16} className="flex gap-4 items-start">
                <div className="text-mono text-[10px] text-[var(--color-accent)] shrink-0 mt-1">0{idx + 1}</div>
                <div className="text-body font-medium text-white/90">{obs}</div>
              </Reveal>
            ))}
          </div>

          <Reveal direction="up" distance={16} className="mt-12 border-l border-[var(--color-accent)] pl-6 py-2">
            <div className="text-mono text-[10px] text-[var(--color-accent)] uppercase tracking-widest mb-2">LÍMITE DE LA LECTURA</div>
            <div className="text-label text-white/70">{project13Data.limitations}</div>
          </Reveal>

          <SourceNarrativeClaim message={project13Data.sourceNarrativeWarning} />
        </div>
      </section>

      {/* 09 — PROCESO REPRESENTADO */}
      <section className="w-full bg-[#050505] py-32 border-t border-[var(--color-accent)]/20">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <ProcessSequence 
            title={project13Data.process.title} 
            steps={project13Data.process.steps} 
            note={project13Data.process.note} 
            accentColor={project13Data.accent} 
          />
        </div>
      </section>

      {/* 10 — DOS COMPONENTES DEL MANEJO */}
      <CalvilloTerritorialPair currentProjectId={project13Data.id} />

      {/* 11 & 12 — CINCO LECTURAS DE AGUASCALIENTES Y CIERRE TERRITORIAL */}
      <AguascalientesFamilyClosing photoSrc={photoCalvillo} />

      {/* 13 — SIGUIENTE PROYECTO (TRANSICIÓN HACIA GRANULAR) */}
      <GranularTransitionPreview />

    </article>
  );
}
