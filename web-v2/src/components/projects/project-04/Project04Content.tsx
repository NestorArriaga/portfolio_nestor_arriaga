"use client";

import { useState } from 'react';
import Image from 'next/image';
import { project04Data } from '@/content/cases/project-04';
import CaseHero from '@/components/case-study/CaseHero';
import TerritoryIntro from '@/components/case-study/TerritoryIntro';
import EnvironmentalRelations from '@/components/case-study/EnvironmentalRelations';
import ImageViewer from '@/components/case-study/ImageViewer';
import ProcessSequence from '@/components/case-study/ProcessSequence';
import DecozalapaReadings from '@/components/case-study/DecozalapaReadings';
import VeracruzFamilyClosing from '@/components/case-study/VeracruzFamilyClosing';
import NextProject from '@/components/case-study/NextProject';
import Reveal from '@/components/home/motion/Reveal';

export default function Project04Content({ assets }: { assets: any[] }) {
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  // Imágenes Curadas
  const p4Base = "/portfolio-media/curated/project-04";
  const heroImg = `${p4Base}/project-04-land-use-hero.webp`;
  const highResImg = `${p4Base}/project-04-land-use-full.webp`;
  const territoryPhoto = "/portfolio-media/curated/territories/territory-veracruz-photo-original-clean.webp";

  // Thumbnails para Decozalapa Readings
  const p2Thumb = assets.find(a => a.projectId === "02")?.variants?.thumbnail || "/portfolio-media/curated/project-02/project-02-carbon-map-thumbnail.webp";
  const p3Thumb = assets.find(a => a.projectId === "03")?.variants?.thumbnail || "/portfolio-media/curated/project-03/project-03-hero-thumbnail.webp";
  const p4Thumb = `${p4Base}/project-04-land-use-preview.webp`;
  
  // Thumbnail para Metztitlán
  const nextProjectThumbnail = assets.find(a => a.projectId === "05")?.variants?.thumbnail || "/portfolio-media/curated/identity/identity-relief-hero-wide-original-clean.webp";

  const readings = [
    { id: "02", slug: "captura-carbono-decozalapa", title: "Captura de Carbono", focus: "Función ecológica y zonas críticas.", thumbnail: p2Thumb },
    { id: "03", slug: "zonas-optimas-limon-cafe", title: "Zonas Óptimas", focus: "Áreas favorables para café y limón.", thumbnail: p3Thumb },
    { id: "04", slug: "uso-optimo-suelo-limon-cafe", title: "Uso del Suelo", focus: "Relación territorial entre cultivos, suelo, clima y agua.", thumbnail: p4Thumb }
  ];

  return (
    <article className="bg-[#050505] text-white overflow-x-hidden" style={{ '--color-accent': project04Data.accent } as any}>
      
      {/* 01 — APERTURA */}
      <CaseHero 
        projectNumber={project04Data.id}
        title={project04Data.title}
        territory={project04Data.territory}
        themes={project04Data.themes}
        ambientImage={territoryPhoto} // Usamos Veracruz como textura ambiental desenfocada
        mainImage={heroImg}
        pdfPages={project04Data.sourcePages}
      />

      {/* 02 — VERACRUZ */}
      <TerritoryIntro 
        territoryName="Veracruz"
        imageSrc={territoryPhoto}
        imageCredit="Néstor Elihu Arriaga Gallegos"
        text="Veracruz aparece en el portafolio como un territorio donde paisaje, agricultura y diversidad ecológica se encuentran. En la cuenca de Decozalapa, esta relación permite analizar cómo suelo, clima y disponibilidad de agua sostienen sistemas productivos como café y limón."
      />

      {/* 03 — LA CUENCA PRODUCTIVA */}
      <section className="max-w-4xl mx-auto px-6 md:px-12 py-32">
        <Reveal direction="up" distance={32}>
          <h2 className="text-display-md text-white mb-8">UNA CUENCA QUE SOSTIENE EL CULTIVO</h2>
        </Reveal>
        <Reveal delay={0.1} direction="up" distance={16}>
          <div className="text-body-lg text-white/80 leading-relaxed font-light mb-8">
            {project04Data.introduction}
          </div>
        </Reveal>
        <Reveal delay={0.2} direction="up" distance={16}>
          <div className="text-body-lg text-white/80 leading-relaxed font-light">
            Comprender estas relaciones permite representar el territorio no sólo como superficie disponible, sino como un sistema ambiental del que depende la permanencia de los cultivos.
          </div>
        </Reveal>
      </section>

      {/* 04 — RELACIONES AMBIENTALES (USO DEL SUELO) */}
      <EnvironmentalRelations relations={project04Data.environmentalRelations} mapImage={heroImg} />

      {/* 05 — CARTOGRAFÍA TERRITORIAL */}
      <section className="max-w-[1600px] mx-auto px-6 md:px-12 py-32 flex flex-col items-center">
        <Reveal direction="up" distance={32} className="w-full mb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <h2 className="text-display-md text-white mb-1">USO ÓPTIMO DEL SUELO</h2>
            <div className="text-mono text-[10px] text-[var(--color-accent)] uppercase tracking-widest">CUENCA DE DECOZALAPA</div>
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
              <Image src={heroImg} alt="Mapa de análisis de uso del suelo para café y limón en la cuenca de Decozalapa." fill className="object-contain" unoptimized />
            </div>
            
            {/* Etiqueta Climática Verificada */}
            <div className="absolute top-8 right-8 bg-[#050505]/80 backdrop-blur-md border border-[var(--color-accent)]/30 px-4 py-2 rounded-[var(--radius-sm)] pointer-events-none hidden md:block">
              <div className="text-mono text-[9px] text-white/50 mb-1">ETIQUETA ORIGINAL DEL MAPA</div>
              <div className="text-label text-[var(--color-accent)]">Temperate Sub-Humid Zone</div>
              <div className="text-body text-white font-medium">ZONA TEMPLADA SUBHÚMEDA</div>
            </div>
          </div>
          
          <div className="mt-4 flex flex-col md:flex-row justify-between items-start text-mono text-[10px] text-white/40 uppercase tracking-widest gap-4">
            <div>MAPA DE ANÁLISIS DE USO ÓPTIMO DEL SUELO PARA CAFÉ Y LIMÓN EN LA CUENCA DE DECOZALAPA, VERACRUZ.</div>
            <div>ELABORACIÓN INCLUIDA EN EL PORTAFOLIO ORIGINAL. PÁGINA 13.</div>
          </div>
        </Reveal>
      </section>

      <ImageViewer 
        isOpen={isViewerOpen} 
        onClose={() => setIsViewerOpen(false)} 
        highResSrc={highResImg} 
        altText="Mapa de análisis de uso del suelo para café y limón en la cuenca de Decozalapa." 
      />

      {/* 06 — LECTURA TERRITORIAL (OBSERVACIONES) */}
      <section className="bg-white/5 border-y border-[var(--color-accent)]/10 py-32">
        <div className="max-w-6xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <Reveal direction="up">
              <h2 className="text-display-md text-white mb-8">LECTURA TERRITORIAL</h2>
            </Reveal>
            
            <div className="flex flex-col gap-8">
              {project04Data.observations.map((obs, idx) => (
                <Reveal key={idx} delay={idx * 0.1} direction="up" distance={16} className="flex gap-4 items-start">
                  <div className="text-mono text-[10px] text-[var(--color-accent)] shrink-0 mt-1">0{idx + 1}</div>
                  <div className="text-body font-medium text-white/90">{obs}</div>
                </Reveal>
              ))}
            </div>
            
            <Reveal direction="up" delay={0.4} className="mt-8 pt-8 border-t border-[var(--color-accent)]/20">
              <div className="text-label text-white/40">
                Nota: La interpretación se limita al contenido documentado en la página 13 del portafolio. {project04Data.warnings[0]}
              </div>
            </Reveal>
          </div>
          
          <Reveal direction="left" distance={32} className="relative aspect-square bg-[#050505] border border-white/10 rounded-[var(--radius-panel)] overflow-hidden">
            <Image src={heroImg} alt="" fill className="object-cover object-left opacity-70 saturate-50 mix-blend-lighten" unoptimized />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] to-transparent"></div>
          </Reveal>
        </div>
      </section>

      {/* 07 — PROCESO REPRESENTADO */}
      <ProcessSequence steps={project04Data.process} />

      {/* 08 — TRES LECTURAS DE DECOZALAPA */}
      <DecozalapaReadings activeId={project04Data.id} readings={readings} />

      {/* 09 — CIERRE DE LA FAMILIA VERACRUZ */}
      <VeracruzFamilyClosing territoryPhoto={territoryPhoto} photoCredit="Néstor Elihu Arriaga Gallegos" />

      {/* 10 — SIGUIENTE TERRITORIO */}
      {/* Usamos NextProject directamente porque CaseNavigation asume el mismo territorio, y aquí saltamos a Metztitlán. */}
      <div className="bg-[#050505] pt-12">
        <NextProject nextProject={{
          ...project04Data.nextProject,
          thumbnailUrl: nextProjectThumbnail
        }} />
      </div>

    </article>
  );
}
