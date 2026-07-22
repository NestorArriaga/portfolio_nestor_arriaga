"use client";

import { useState } from 'react';
import Image from 'next/image';
import { project05Data } from '@/content/cases/project-05';
import CaseHero from '@/components/case-study/CaseHero';
import MetztitlanTerritoryIntro from '@/components/case-study/MetztitlanTerritoryIntro';
import PatternExplorer from '@/components/case-study/PatternExplorer';
import ImageViewer from '@/components/case-study/ImageViewer';
import ProcessSequence from '@/components/case-study/ProcessSequence';
import MetztitlanReadings from '@/components/case-study/MetztitlanReadings';
import NextProject from '@/components/case-study/NextProject';
import Reveal from '@/components/home/motion/Reveal';

export default function Project05Content({ assets }: { assets: any[] }) {
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  // Imágenes Curadas
  const p5Base = "/portfolio-media/curated/project-05";
  const heroImg = `${p5Base}/project-05-geomorphons-hero.webp`;
  const highResImg = `${p5Base}/project-05-geomorphons-map-full.webp`;
  const silhouetteImg = `${p5Base}/project-05-territory-silhouette.webp`;
  const textureImg = `${p5Base}/project-05-relief-texture.webp`;

  const patterns = project05Data.patterns.map(p => ({
    ...p,
    imageSrc: `${p5Base}/project-05-pattern-${p.id}.webp`
  }));

  // Thumbnails para Metztitlan Readings
  const p5Thumb = `${p5Base}/project-05-geomorphons-preview.webp`;
  const p6Thumb = `/portfolio-media/curated/project-06/project-06-ecological-zones-preview.webp`;
  const nextProjectThumbnail = assets.find(a => a.projectId === "06")?.variants?.thumbnail || "/portfolio-media/curated/identity/identity-relief-hero-wide-original-clean.webp";

  const readings = [
    { id: "05", slug: "geomorfologia-metztitlan", title: "Formas del Terreno", focus: "Clasificación geomorfológica y patrones del relieve.", thumbnail: p5Thumb },
    { id: "06", slug: "zonas-ecologicas-metztitlan", title: "Unidades Ecológicas", focus: "Reclasificación de uso de suelo y vegetación en zonas ambientales.", thumbnail: p6Thumb }
  ];

  return (
    <article className="bg-[#050505] text-white overflow-x-hidden" style={{ '--color-accent': project05Data.accent } as any}>
      
      {/* 01 — APERTURA */}
      <CaseHero 
        projectNumber={project05Data.id}
        title={project05Data.title}
        territory={project05Data.territory}
        themes={project05Data.themes}
        ambientImage={heroImg}
        mainImage={silhouetteImg}
        pdfPages={project05Data.sourcePages}
      />

      {/* 02 — METZTITLÁN (Intro Territorial) */}
      <MetztitlanTerritoryIntro 
        silhouetteSrc={silhouetteImg} 
        textureSrc={textureImg}
        accentColor={project05Data.accent}
      />

      {/* 03 — LEER LAS FORMAS DEL TERRENO */}
      <section className="max-w-4xl mx-auto px-6 md:px-12 py-32">
        <Reveal direction="up" distance={32}>
          <h2 className="text-display-md text-white mb-8">LEER LAS FORMAS DEL TERRENO</h2>
        </Reveal>
        <Reveal delay={0.1} direction="up" distance={16}>
          <div className="text-body-lg text-white/80 leading-relaxed font-light">
            {project05Data.introduction}
          </div>
        </Reveal>
      </section>

      {/* 04 — QUÉ SON LOS GEOMORFONES */}
      <section className="bg-white/5 py-32 border-y border-white/10">
        <div className="max-w-4xl mx-auto px-6 md:px-12">
          <Reveal direction="up">
            <h3 className="text-display-sm text-white mb-8">{project05Data.geomorphonDefinition.title}</h3>
            <p className="text-body-lg text-white/80 mb-6 font-light leading-relaxed">{project05Data.geomorphonDefinition.text}</p>
            <p className="text-body-lg text-white/80 font-light leading-relaxed">{project05Data.geomorphonDefinition.subtext}</p>
          </Reveal>
        </div>
      </section>

      {/* 05 — TRES PATRONES (Explorador Interactivo) */}
      <PatternExplorer patterns={patterns} />

      {/* 06 — CARTOGRAFÍA GEOMORFOLÓGICA */}
      <section className="max-w-[1600px] mx-auto px-6 md:px-12 py-32 flex flex-col items-center">
        <Reveal direction="up" distance={32} className="w-full mb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <h2 className="text-display-md text-white mb-1">FORMAS DEL TERRENO</h2>
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
            <Image src={heroImg} alt="Mapa de patrones geomorfológicos" fill className="object-contain p-4 group-hover:scale-[1.01] transition-transform duration-700" unoptimized />
          </div>
          
          <div className="mt-4 flex flex-col md:flex-row justify-between items-start text-mono text-[10px] text-white/40 uppercase tracking-widest gap-4">
            <div>MAPA DE PATRONES GEOMORFOLÓGICOS Y FORMAS DEL TERRENO EN LA RESERVA DE LA BIOSFERA EN METZTITLÁN.</div>
            <div>ELABORACIÓN INCLUIDA EN EL PORTAFOLIO ORIGINAL. PÁGINA 14.</div>
          </div>
        </Reveal>
      </section>

      <ImageViewer 
        isOpen={isViewerOpen} 
        onClose={() => setIsViewerOpen(false)} 
        highResSrc={highResImg} 
        altText="Mapa de patrones geomorfológicos" 
      />

      {/* 07 — LECTURA DEL RELIEVE (OBSERVACIONES) */}
      <section className="bg-white/5 border-y border-white/10 py-32">
        <div className="max-w-6xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <Reveal direction="up">
              <h2 className="text-display-md text-white mb-8">LECTURA DEL RELIEVE</h2>
            </Reveal>
            
            <div className="flex flex-col gap-8">
              {project05Data.observations.map((obs, idx) => (
                <Reveal key={idx} delay={idx * 0.1} direction="up" distance={16} className="flex gap-4 items-start">
                  <div className="text-mono text-[10px] text-[var(--color-accent)] shrink-0 mt-1">0{idx + 1}</div>
                  <div className="text-body font-medium text-white/90">{obs}</div>
                </Reveal>
              ))}
            </div>
            
            <Reveal direction="up" delay={0.4} className="mt-8 pt-8 border-t border-white/20">
              <div className="text-label text-white/40">
                Nota: {project05Data.warnings[0]}
              </div>
            </Reveal>
          </div>
          
          <Reveal direction="left" distance={32} className="relative aspect-square border border-white/10 rounded-[var(--radius-panel)] overflow-hidden">
            <Image src={heroImg} alt="" fill className="object-cover object-left opacity-30 saturate-50 mix-blend-lighten" unoptimized />
          </Reveal>
        </div>
      </section>

      {/* 08 — PROCESO REPRESENTADO */}
      <ProcessSequence steps={project05Data.process} />

      {/* 09 — DOS LECTURAS DE METZTITLÁN */}
      <MetztitlanReadings activeId={project05Data.id} readings={readings} />

      {/* 10 — SIGUIENTE PROYECTO */}
      <div className="bg-[#050505] pt-12">
        <NextProject nextProject={{
          ...project05Data.nextProject,
          thumbnailUrl: nextProjectThumbnail
        }} />
      </div>

    </article>
  );
}
