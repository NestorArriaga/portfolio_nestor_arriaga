"use client";

import { useState } from 'react';
import Image from 'next/image';
import { project12Data } from '@/content/cases/project-12';
import CaseHero from '@/components/case-study/CaseHero';
import CalvilloTerritoryIntro from '@/components/case-study/CalvilloTerritoryIntro';
import SharedLivestockPlanContext from '@/components/case-study/SharedLivestockPlanContext';
import SoilMapLimitation from '@/components/case-study/SoilMapLimitation';
import SourceNarrativeClaim from '@/components/case-study/SourceNarrativeClaim';
import GeneralDetailView from '@/components/case-study/GeneralDetailView';
import ProcessSequence from '@/components/case-study/ProcessSequence';
import ImageViewer from '@/components/case-study/ImageViewer';
import CalvilloTerritorialPair from '@/components/case-study/CalvilloTerritorialPair';
import Reveal from '@/components/home/motion/Reveal';
import Link from 'next/link';

export default function Project12Content({ assets }: { assets: any[] }) {
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  // Imágenes Curadas
  const p12Base = "/portfolio-media/curated/project-12";
  const tBase = "/portfolio-media/curated/territories";
  
  const heroImg = `${p12Base}/project-12-soil-degradation-hero.webp`;
  const highResImg = `${p12Base}/project-12-soil-degradation-map-full.webp`;
  const silhouetteImg = `${p12Base}/project-12-territory-silhouette.webp`;
  const textureImg = `${p12Base}/project-12-soil-texture.webp`;
  const cowImg = `${p12Base}/project-12-cattle-photo.webp`;
  
  const photoCalvillo = `${tBase}/territory-aguascalientes-calvillo-photo-landscape.webp`;

  return (
    <article className="bg-[#050505] text-white overflow-x-hidden" style={{ '--color-accent': project12Data.accent } as any}>
      
      {/* 01 — APERTURA (HERO DEL PROYECTO) */}
      <CaseHero 
        projectNumber={project12Data.id}
        title={project12Data.title}
        territory={project12Data.territory}
        themes={project12Data.themes}
        ambientImage={heroImg}
        mainImage={silhouetteImg}
        pdfPages={project12Data.sourcePages}
      />

      {/* 02 & 03 — CALVILLO (SUELO Y ACTIVIDAD GANADERA) */}
      <CalvilloTerritoryIntro photoSrc={photoCalvillo} />

      {/* 04 & 05 — MAPA DE DEGRADACIÓN Y ÁREAS DIFERENCIADAS */}
      <section className="max-w-[1600px] mx-auto px-6 md:px-12 py-32 flex flex-col items-center">
        <Reveal direction="up" distance={32} className="w-full mb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <h2 className="text-display-md text-white mb-1">DEGRADACIÓN DEL SUELO</h2>
            <div className="text-mono text-[10px] text-[var(--color-accent)] uppercase tracking-widest">CALVILLO, AGUASCALIENTES</div>
          </div>
        </Reveal>

        <GeneralDetailView 
          generalSrc={heroImg} 
          detailSrc={textureImg} 
          title="ÁREAS DIFERENCIADAS" 
          onExpand={() => setIsViewerOpen(true)}
          accentColor={project12Data.accent}
          isSoil={true}
        />

        <div className="w-full max-w-4xl mr-auto mt-8">
          <div className="text-mono text-[10px] text-white/40 uppercase tracking-widest mb-4">
            MAPA DE ANÁLISIS DE DEGRADACIÓN DEL SUELO EN CALVILLO, AGUASCALIENTES, DENTRO DE UNA PROPUESTA DE MANEJO GANADERO.<br/>
            ELABORACIÓN INCLUIDA EN EL PORTAFOLIO ORIGINAL. PÁGINA 20.
          </div>
          <SoilMapLimitation message={project12Data.mapLegendWarning} />
        </div>
      </section>

      <ImageViewer 
        isOpen={isViewerOpen} 
        onClose={() => setIsViewerOpen(false)} 
        highResSrc={highResImg} 
        altText="Mapa de análisis de degradación del suelo" 
      />

      {/* 06 — CONTEXTO MENCIONADO */}
      <SharedLivestockPlanContext photoSrc={cowImg} />

      {/* 07 — ALCANCE DOCUMENTADO (LECTURA Y NARRATIVA) */}
      <section className="bg-white/5 border-y border-[var(--color-accent)]/10 py-32 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 md:px-12">
          <Reveal direction="up">
            <h2 className="text-display-md text-white mb-8">LECTURA TERRITORIAL</h2>
          </Reveal>
          
          <div className="flex flex-col gap-8 mb-16">
            {project12Data.observations.map((obs, idx) => (
              <Reveal key={idx} delay={idx * 0.1} direction="up" distance={16} className="flex gap-4 items-start">
                <div className="text-mono text-[10px] text-[var(--color-accent)] shrink-0 mt-1">0{idx + 1}</div>
                <div className="text-body font-medium text-white/90">{obs}</div>
              </Reveal>
            ))}
          </div>

          <Reveal direction="up" distance={16} className="mt-12 border-l border-[var(--color-accent)] pl-6 py-2">
            <div className="text-mono text-[10px] text-[var(--color-accent)] uppercase tracking-widest mb-2">LÍMITE DE LA LECTURA</div>
            <div className="text-label text-white/70">{project12Data.limitations}</div>
          </Reveal>

          <SourceNarrativeClaim message={project12Data.sourceNarrativeWarning} />
        </div>
      </section>

      {/* 08 — PROCESO REPRESENTADO */}
      <section className="w-full bg-[#050505] py-32 border-t border-[var(--color-accent)]/20">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <ProcessSequence 
            title={project12Data.process.title} 
            steps={project12Data.process.steps} 
            note={project12Data.process.note} 
            accentColor={project12Data.accent} 
          />
        </div>
      </section>

      {/* 09 — DOS COMPONENTES DEL MANEJO */}
      <CalvilloTerritorialPair currentProjectId={project12Data.id} />

      {/* 10 & 11 — CIERRE Y SIGUIENTE PROYECTO */}
      <section className="w-full bg-[#111] py-32 border-t border-white/10">
        <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
          <Reveal direction="up">
            <h2 className="text-display-sm text-white mb-6">FIN DEL PROYECTO 12</h2>
            <p className="text-body text-white/50 mb-12">{project12Data.summary}</p>
          </Reveal>

          <Reveal delay={0.1} direction="up" distance={16}>
            <Link href="/projects/subcuencas-rios-calvillo" scroll={false} className="inline-block group">
              <div className="text-mono text-[10px] text-[var(--color-accent)] uppercase tracking-widest mb-4">SIGUIENTE PROYECTO</div>
              <div className="flex items-center gap-6 border border-white/10 group-hover:border-[var(--color-accent)] rounded-[var(--radius-panel)] p-4 bg-black transition-colors">
                <div className="w-24 h-24 relative rounded-md overflow-hidden shrink-0">
                  <Image src="/portfolio-media/curated/project-13/project-13-subbasins-rivers-thumbnail.webp" alt="Siguiente" fill className="object-cover" unoptimized />
                </div>
                <div className="text-left">
                  <div className="text-display-xs text-white group-hover:text-[var(--color-accent)] transition-colors">SUBCUENCAS Y RÍOS</div>
                  <div className="text-label text-white/50 mt-1">CALVILLO</div>
                </div>
              </div>
            </Link>
          </Reveal>
        </div>
      </section>

    </article>
  );
}
