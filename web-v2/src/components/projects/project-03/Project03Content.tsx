"use client";

import { useState } from 'react';
import Image from 'next/image';
import { project03Data } from '@/content/cases/project-03';
import CaseHero from '@/components/case-study/CaseHero';
import TerritoryIntro from '@/components/case-study/TerritoryIntro';
import ImageViewer from '@/components/case-study/ImageViewer';
import ProcessSequence from '@/components/case-study/ProcessSequence';
import CriteriaStrip from '@/components/case-study/CriteriaStrip';
import CaseNavigation from '@/components/case-study/CaseNavigation';
import RelatedTerritoryCases from '@/components/case-study/RelatedTerritoryCases';
import Reveal from '@/components/home/motion/Reveal';

export default function Project03Content({ assets }: { assets: any[] }) {
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  // Imágenes Curadas del Proyecto 03
  const p3Base = "/portfolio-media/curated/project-03";
  const heroImg = `${p3Base}/project-03-optimal-zones-hero.webp`;
  const highResImg = `${p3Base}/project-03-optimal-zones-full.webp`;
  const territoryPhoto = "/portfolio-media/curated/territories/territory-veracruz-photo-original-clean.webp"; // Página 11
  const nextProjectThumbnail = assets.find(a => a.projectId === "04")?.variants?.thumbnail || "/portfolio-media/curated/identity/identity-relief-hero-wide-original-clean.webp";

  return (
    <article className="bg-[#050505] text-white overflow-x-hidden" style={{ '--color-accent': project03Data.accent } as any}>
      
      {/* 01 — APERTURA */}
      <CaseHero 
        projectNumber={project03Data.id}
        title={project03Data.title}
        territory={project03Data.territory}
        themes={project03Data.themes}
        ambientImage={heroImg}
        mainImage={heroImg}
        pdfPages={project03Data.sourcePages}
      />

      {/* 02 — VERACRUZ */}
      <TerritoryIntro 
        territoryName="Veracruz"
        imageSrc={territoryPhoto}
        imageCredit="Néstor Elihu Arriaga Gallegos"
        text="Veracruz aparece como un territorio donde diversidad ecológica, paisaje y agricultura se encuentran. En esta relación, la cartografía permite analizar cómo las condiciones naturales sostienen actividades productivas y funciones ambientales."
      />

      {/* 03 — TERRITORIO PRODUCTIVO */}
      <section className="max-w-4xl mx-auto px-6 md:px-12 py-32">
        <Reveal direction="up" distance={32}>
          <h2 className="text-display-md text-white mb-8">LOCALIZAR LA APTITUD PRODUCTIVA</h2>
        </Reveal>
        <Reveal delay={0.1} direction="up" distance={16}>
          <div className="text-body-lg text-white/80 leading-relaxed font-light mb-8">
            {project03Data.introduction}
          </div>
        </Reveal>
      </section>

      {/* 04 y 05 — ZONAS ÓPTIMAS / CARTOGRAFÍA AGRÍCOLA */}
      <section className="max-w-[1600px] mx-auto px-6 md:px-12 py-16 flex flex-col items-center">
        <Reveal direction="up" distance={32} className="w-full mb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <h2 className="text-display-md text-white mb-1">MAPA DE ZONAS ÓPTIMAS</h2>
            <div className="text-mono text-[10px] text-[var(--color-accent)] uppercase tracking-widest">CAFÉ Y LIMÓN EN LA CUENCA DE DECOZALAPA</div>
          </div>
          <button 
            onClick={() => setIsViewerOpen(true)}
            className="text-label text-white border border-[var(--color-accent)]/30 hover:border-[var(--color-accent)] hover:bg-[var(--color-accent)] hover:text-black px-6 py-2 rounded-full transition-colors"
          >
            AMPLIAR MAPA ⛶
          </button>
        </Reveal>

        <Reveal direction="up" distance={64} className="w-full">
          <div className="relative w-full aspect-[4/5] md:aspect-video bg-white/5 border border-white/10 rounded-[var(--radius-panel)] p-2 md:p-8 cursor-zoom-in" onClick={() => setIsViewerOpen(true)}>
            <div className="relative w-full h-full">
              <Image src={heroImg} alt="Mapa de zonas consideradas óptimas para café y limón en la cuenca de Decozalapa." fill className="object-contain" unoptimized />
            </div>
          </div>
          <div className="mt-4 flex flex-col md:flex-row justify-between items-start text-mono text-[10px] text-white/40 uppercase tracking-widest gap-4">
            <div>MAPA DE ZONAS CONSIDERADAS ÓPTIMAS PARA CAFÉ Y LIMÓN EN LA CUENCA DE DECOZALAPA.</div>
            <div>ELABORACIÓN INCLUIDA EN EL PORTAFOLIO ORIGINAL. PÁGINA 12.</div>
          </div>
        </Reveal>
      </section>

      <ImageViewer 
        isOpen={isViewerOpen} 
        onClose={() => setIsViewerOpen(false)} 
        highResSrc={highResImg} 
        altText="Mapa de zonas consideradas óptimas para café y limón en la cuenca de Decozalapa." 
      />

      {/* 06 — CRITERIOS MENCIONADOS */}
      <CriteriaStrip criteria={project03Data.criteria} />

      {/* LECTURA TERRITORIAL */}
      <section className="bg-white/5 border-y border-[var(--color-accent)]/10 py-32 mt-32">
        <div className="max-w-6xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <Reveal direction="up">
              <h2 className="text-display-md text-white mb-8">ZONAS ÓPTIMAS</h2>
            </Reveal>
            
            <div className="flex flex-col gap-8">
              {project03Data.observations.map((obs, idx) => (
                <Reveal key={idx} delay={idx * 0.1} direction="up" distance={16} className="flex gap-4 items-start">
                  <div className="text-mono text-[10px] text-[var(--color-accent)] shrink-0 mt-1">0{idx + 1}</div>
                  <div className="text-body font-medium text-white/90">{obs}</div>
                </Reveal>
              ))}
            </div>
          </div>
          
          <Reveal direction="left" distance={32} className="relative aspect-square bg-[#050505] border border-white/10 rounded-[var(--radius-panel)] overflow-hidden">
            <Image src={heroImg} alt="" fill className="object-cover object-center opacity-70 saturate-50 mix-blend-lighten" unoptimized />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] to-transparent"></div>
          </Reveal>
        </div>
      </section>

      {/* 07 — PROCESO REPRESENTADO */}
      <ProcessSequence steps={project03Data.process} />

      <RelatedTerritoryCases />

      {/* 08 y 09 — CIERRE Y NAVEGACIÓN */}
      <CaseNavigation 
        currentProjectNumber={project03Data.id}
        currentProjectTitle="Una representación territorial de áreas consideradas favorables para café y limón dentro de la cuenca de Decozalapa."
        nextProject={{
          ...project03Data.nextProject,
          thumbnailUrl: nextProjectThumbnail
        }}
      />

    </article>
  );
}
