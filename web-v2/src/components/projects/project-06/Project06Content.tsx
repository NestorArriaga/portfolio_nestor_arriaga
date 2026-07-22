"use client";

import { useState } from 'react';
import Image from 'next/image';
import { project06Data } from '@/content/cases/project-06';
import CaseHero from '@/components/case-study/CaseHero';
import MetztitlanTerritoryIntro from '@/components/case-study/MetztitlanTerritoryIntro';
import EnvironmentalFactorComposition from '@/components/case-study/EnvironmentalFactorComposition';
import EcologicalZoneLegend from '@/components/case-study/EcologicalZoneLegend';
import ImageViewer from '@/components/case-study/ImageViewer';
import ProcessSequence from '@/components/case-study/ProcessSequence';
import MetztitlanReadings from '@/components/case-study/MetztitlanReadings';
import NextProject from '@/components/case-study/NextProject';
import Reveal from '@/components/home/motion/Reveal';

export default function Project06Content({ assets }: { assets: any[] }) {
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  // Imágenes Curadas
  const p6Base = "/portfolio-media/curated/project-06";
  const heroImg = `${p6Base}/project-06-ecological-zones-hero.webp`;
  const highResImg = `${p6Base}/project-06-ecological-zones-map-full.webp`;
  const legendImg = `${p6Base}/project-06-zone-legend.webp`;
  const silhouetteImg = `${p6Base}/project-06-territory-silhouette.webp`;
  const textureImg = `${p6Base}/project-06-landscape-texture.webp`;

  // Thumbnails para Metztitlan Readings
  const p5Thumb = `/portfolio-media/curated/project-05/project-05-geomorphons-preview.webp`;
  const p6Thumb = `${p6Base}/project-06-ecological-zones-preview.webp`;
  const nextProjectThumbnail = assets.find(a => a.projectId === "07")?.variants?.thumbnail || "/portfolio-media/curated/identity/identity-relief-hero-wide-original-clean.webp";

  const readings = [
    { id: "05", slug: "geomorfologia-metztitlan", title: "Formas del Terreno", focus: "Clasificación geomorfológica y patrones del relieve.", thumbnail: p5Thumb },
    { id: "06", slug: "zonas-ecologicas-metztitlan", title: "Unidades Ecológicas", focus: "Reclasificación de uso de suelo y vegetación en zonas ambientales.", thumbnail: p6Thumb }
  ];

  return (
    <article className="bg-[#050505] text-white overflow-x-hidden" style={{ '--color-accent': project06Data.accent } as any}>
      
      {/* 01 — APERTURA */}
      <CaseHero 
        projectNumber={project06Data.id}
        title={project06Data.title}
        territory={project06Data.territory}
        themes={project06Data.themes}
        ambientImage={heroImg}
        mainImage={silhouetteImg}
        pdfPages={project06Data.sourcePages}
      />

      {/* 02 — METZTITLÁN (Intro Territorial Variante para Ecología) */}
      <MetztitlanTerritoryIntro 
        silhouetteSrc={silhouetteImg} 
        textureSrc={textureImg}
        accentColor={project06Data.accent}
      />

      {/* 03 — ECOLOGÍA DEL PAISAJE */}
      <section className="max-w-4xl mx-auto px-6 md:px-12 py-32">
        <Reveal direction="up" distance={32}>
          <h2 className="text-display-md text-white mb-8">{project06Data.landscapeEcology.title}</h2>
        </Reveal>
        <Reveal delay={0.1} direction="up" distance={16}>
          <div className="text-body-lg text-white/80 leading-relaxed font-light mb-6">
            {project06Data.landscapeEcology.text}
          </div>
          <div className="text-body-lg text-[var(--color-accent)] leading-relaxed font-light">
            {project06Data.landscapeEcology.subtext}
          </div>
        </Reveal>
      </section>

      {/* 04 — FACTORES INTEGRADOS */}
      <EnvironmentalFactorComposition factors={project06Data.integratedFactors} />

      {/* 05 — LAS SIETE UNIDADES ECOLÓGICAS (Leyenda Interactiva) */}
      <EcologicalZoneLegend zones={project06Data.ecologicalZones} legendImage={legendImg} />

      {/* 06 — CARTOGRAFÍA DE ZONAS */}
      <section className="max-w-[1600px] mx-auto px-6 md:px-12 py-32 flex flex-col items-center">
        <Reveal direction="up" distance={32} className="w-full mb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <h2 className="text-display-md text-white mb-1">UNIDADES ECOLÓGICAS</h2>
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
          <div className="relative w-full aspect-[3/4] md:aspect-video bg-[#050505] border border-white/10 rounded-[var(--radius-panel)] overflow-hidden cursor-zoom-in group" onClick={() => setIsViewerOpen(true)}>
            <Image src={heroImg} alt="Mapa de reclasificación ecológica" fill className="object-contain p-4 group-hover:scale-[1.01] transition-transform duration-700" unoptimized />
          </div>
          
          <div className="mt-4 flex flex-col md:flex-row justify-between items-start text-mono text-[10px] text-white/40 uppercase tracking-widest gap-4">
            <div>MAPA DE RECLASIFICACIÓN DE USO DE SUELO Y VEGETACIÓN PARA DETERMINAR ZONAS ECOLÓGICAS EN METZTITLÁN, HIDALGO.</div>
            <div>ELABORACIÓN INCLUIDA EN EL PORTAFOLIO ORIGINAL. PÁGINA 14.</div>
          </div>
        </Reveal>
      </section>

      <ImageViewer 
        isOpen={isViewerOpen} 
        onClose={() => setIsViewerOpen(false)} 
        highResSrc={highResImg} 
        altText="Mapa de reclasificación ecológica" 
      />

      {/* 07 — LECTURA TERRITORIAL (OBSERVACIONES) */}
      <section className="bg-white/5 border-y border-white/10 py-32">
        <div className="max-w-6xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <Reveal direction="up">
              <h2 className="text-display-md text-white mb-8">LECTURA TERRITORIAL</h2>
            </Reveal>
            
            <div className="flex flex-col gap-8">
              {project06Data.observations.map((obs, idx) => (
                <Reveal key={idx} delay={idx * 0.1} direction="up" distance={16} className="flex gap-4 items-start">
                  <div className="text-mono text-[10px] text-[var(--color-accent)] shrink-0 mt-1">0{idx + 1}</div>
                  <div className="text-body font-medium text-white/90">{obs}</div>
                </Reveal>
              ))}
            </div>
            
            <Reveal direction="up" delay={0.4} className="mt-8 pt-8 border-t border-white/20">
              <div className="text-label text-white/40">
                Nota: {project06Data.warnings[0]}
              </div>
            </Reveal>
          </div>
          
          <Reveal direction="left" distance={32} className="relative aspect-square border border-white/10 rounded-[var(--radius-panel)] overflow-hidden">
            <Image src={heroImg} alt="" fill className="object-cover object-right opacity-30 saturate-50 mix-blend-lighten" unoptimized />
          </Reveal>
        </div>
      </section>

      {/* 08 — ALCANCE PARA LA PLANIFICACIÓN */}
      <section className="max-w-4xl mx-auto px-6 md:px-12 py-32 border-b border-white/10">
        <Reveal direction="up">
          <h2 className="text-display-md text-white mb-8">DIFERENCIAR PARA PLANIFICAR</h2>
        </Reveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {project06Data.planningApplications.map((app, idx) => (
            <Reveal key={idx} delay={idx * 0.1} direction="up" className="border-l border-[var(--color-accent)]/50 pl-4 py-2">
              <div className="text-body-lg text-white/80">{app}</div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* 09 — PROCESO REPRESENTADO */}
      <ProcessSequence steps={project06Data.process} />

      {/* 10 — DOS LECTURAS DE METZTITLÁN */}
      <MetztitlanReadings activeId={project06Data.id} readings={readings} />

      {/* 11 — SIGUIENTE PROYECTO */}
      <div className="bg-[#050505] pt-12">
        <NextProject nextProject={{
          ...project06Data.nextProject,
          thumbnailUrl: nextProjectThumbnail
        }} />
      </div>

    </article>
  );
}
