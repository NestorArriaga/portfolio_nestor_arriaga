"use client";

import { useState } from 'react';
import Image from 'next/image';
import { project11Data } from '@/content/cases/project-11';
import CaseHero from '@/components/case-study/CaseHero';
import AguascalientesTerritoryIntro from '@/components/case-study/AguascalientesTerritoryIntro';
import SectorAptitudeDefinition from '@/components/case-study/SectorAptitudeDefinition';
import WeightedAttributeComposition from '@/components/case-study/WeightedAttributeComposition';
import MethodRoute from '@/components/case-study/MethodRoute';
import ImageViewer from '@/components/case-study/ImageViewer';
import SourceLimitationNote from '@/components/case-study/SourceLimitationNote';
import LivingGeographySection from '@/components/case-study/LivingGeographySection';
import AguascalientesAptitudePair from '@/components/case-study/AguascalientesAptitudePair';
import TerritoryTransition from '@/components/case-study/TerritoryTransition';
import Reveal from '@/components/home/motion/Reveal';

export default function Project11Content({ assets }: { assets: any[] }) {
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  // Imágenes Curadas
  const p10Base = "/portfolio-media/curated/project-10";
  const p11Base = "/portfolio-media/curated/project-11";
  const tBase = "/portfolio-media/curated/territories";
  
  const heroImg = `${p11Base}/project-11-agricultural-aptitude-hero.webp`;
  const highResImg = `${p11Base}/project-11-agricultural-map-full.webp`;
  const silhouetteImg = `${p11Base}/project-11-state-silhouette.webp`;
  const map10Img = `${p10Base}/project-10-conservation-map-preview.webp`;
  const textureImg = `${p11Base}/project-11-agricultural-texture.webp`;
  
  const photoPortrait = `${tBase}/territory-aguascalientes-calvillo-photo-portrait.webp`;

  const nextProjectThumbnail = assets.find(a => a.projectId === "12")?.variants?.thumbnail || "/portfolio-media/curated/identity/identity-relief-hero-wide-original-clean.webp";
  const currentFamilySummary = "Una evaluación territorial que organiza cobertura, agua, pendiente, inundación, suelo y erosión para representar aptitud del sector agrícola.";

  return (
    <article className="bg-[#050505] text-white overflow-x-hidden" style={{ '--color-accent': project11Data.accent } as any}>
      
      {/* 01 — APERTURA (HERO DEL PROYECTO) */}
      <CaseHero 
        projectNumber={project11Data.id}
        title={project11Data.title}
        territory={project11Data.territory}
        themes={project11Data.themes}
        ambientImage={heroImg}
        mainImage={silhouetteImg}
        pdfPages={project11Data.sourcePages}
      />

      {/* 02 — AGUASCALIENTES (APERTURA TERRITORIAL FOTOGRÁFICA) */}
      <AguascalientesTerritoryIntro 
        photoSrc={photoPortrait} 
        silhouetteSrc={silhouetteImg} 
      />

      {/* 03 — APTITUD AGRÍCOLA (INTRO) */}
      <section className="max-w-4xl mx-auto px-6 md:px-12 py-32">
        <Reveal direction="up" distance={32}>
          <h2 className="text-display-md text-white mb-8">{project11Data.introduction.title}</h2>
        </Reveal>
        <Reveal delay={0.1} direction="up" distance={16}>
          <p className="text-body-lg text-white/80 leading-relaxed font-light mb-8">
            {project11Data.introduction.text}
          </p>
          <p className="text-body-lg text-white/50 leading-relaxed font-light mb-12">
            {project11Data.introduction.subtext}
          </p>
        </Reveal>

        <SectorAptitudeDefinition 
          text={project11Data.aptitudeDefinition.text} 
          attribution={project11Data.aptitudeDefinition.attribution} 
        />
      </section>

      {/* 04 & 05 — SEIS ATRIBUTOS Y PONDERACIÓN */}
      <section className="w-full bg-[#050505] py-32 border-t border-[var(--color-accent)]/20">
        <div className="max-w-4xl mx-auto px-6 md:px-12">
          <Reveal direction="up" className="mb-16">
            <h2 className="text-display-md text-white mb-4">SEIS ATRIBUTOS PONDERADOS</h2>
            <p className="text-body text-white/50 leading-relaxed">
              La tabla organiza las variables seleccionadas y su peso proporcional dentro de la evaluación de aptitud agrícola.
            </p>
          </Reveal>
          
          <WeightedAttributeComposition 
            attributes={project11Data.attributes} 
            totalWeight={project11Data.totalWeight} 
          />
        </div>
      </section>

      {/* 06 — RUTA METODOLÓGICA */}
      <MethodRoute steps={project11Data.methodologyRoute.steps} />
      
      {/* 07 & 08 — MAPA DE APTITUD Y NIVELES */}
      <section className="max-w-[1600px] mx-auto px-6 md:px-12 py-32 flex flex-col items-center">
        <Reveal direction="up" distance={32} className="w-full mb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <h2 className="text-display-md text-white mb-1">APTITUD DEL SECTOR AGRÍCOLA</h2>
            <div className="text-mono text-[10px] text-[var(--color-accent)] uppercase tracking-widest">AGUASCALIENTES</div>
          </div>
          <button 
            onClick={() => setIsViewerOpen(true)}
            className="text-label text-white border border-[var(--color-accent)]/30 hover:border-[var(--color-accent)] hover:bg-[var(--color-accent)] hover:text-black px-6 py-2 rounded-full transition-colors"
          >
            AMPLIAR MAPA ⛶
          </button>
        </Reveal>

        <Reveal direction="up" distance={64} className="w-full">
          <div className="relative w-full aspect-[4/3] md:aspect-video bg-[#050505] border border-[var(--color-accent)]/20 rounded-[var(--radius-panel)] overflow-hidden cursor-zoom-in group" onClick={() => setIsViewerOpen(true)}>
            <Image src={heroImg} alt="Mapa de aptitud agrícola en Aguascalientes" fill className="object-contain p-4 group-hover:scale-[1.01] transition-transform duration-700" unoptimized />
          </div>
          
          <div className="mt-4 flex flex-col md:flex-row justify-between items-start text-mono text-[10px] text-white/40 uppercase tracking-widest gap-4">
            <div>MAPA DE APTITUD DEL SECTOR AGRÍCOLA. ORGANIZADO EN NIVELES NULO, MEDIO Y ALTO.</div>
            <div>ELABORACIÓN INCLUIDA EN EL PORTAFOLIO ORIGINAL. PÁGINA 19.</div>
          </div>
        </Reveal>
      </section>

      <ImageViewer 
        isOpen={isViewerOpen} 
        onClose={() => setIsViewerOpen(false)} 
        highResSrc={highResImg} 
        altText="Mapa de aptitud agrícola en Aguascalientes" 
      />

      {/* 09 — GEOGRAFÍA VIVA */}
      <LivingGeographySection 
        title={project11Data.livingGeography.title!}
        text={project11Data.livingGeography.text!}
        subtext={project11Data.livingGeography.subtext!}
        photoSrc={textureImg}
      />

      {/* 10 & 11 — LECTURA TERRITORIAL Y ALCANCE DOCUMENTADO */}
      <section className="bg-white/5 border-y border-[var(--color-accent)]/10 py-32 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <Reveal direction="up">
              <h2 className="text-display-md text-white mb-8">LECTURA TERRITORIAL</h2>
            </Reveal>
            
            <div className="flex flex-col gap-8 mb-16">
              {project11Data.observations.map((obs, idx) => (
                <Reveal key={idx} delay={idx * 0.1} direction="up" distance={16} className="flex gap-4 items-start">
                  <div className="text-mono text-[10px] text-[var(--color-accent)] shrink-0 mt-1">0{idx + 1}</div>
                  <div className="text-body font-medium text-white/90">{obs}</div>
                </Reveal>
              ))}
            </div>

            <Reveal direction="up">
              <SourceLimitationNote message={project11Data.limitations} />
            </Reveal>
          </div>
          
          <Reveal direction="left" distance={32} className="relative aspect-square border border-[var(--color-accent)]/20 rounded-[var(--radius-panel)] overflow-hidden">
            <Image src={heroImg} alt="" fill className="object-cover opacity-30 saturate-50 mix-blend-lighten" unoptimized />
          </Reveal>
        </div>
      </section>

      {/* 12 — DOS APTITUDES (Comparación) */}
      <AguascalientesAptitudePair currentProjectId={project11Data.id} map10Src={map10Img} map11Src={heroImg} />

      {/* 13 & 14 — CIERRE Y TRANSICIÓN */}
      <TerritoryTransition 
        currentFamilySummary={currentFamilySummary} 
        nextProject={{
          ...project11Data.nextProject,
          thumbnailUrl: nextProjectThumbnail
        }} 
      />

    </article>
  );
}
