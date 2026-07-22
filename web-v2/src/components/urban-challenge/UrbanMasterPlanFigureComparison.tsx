"use client";

import { useState } from "react";
import Image from "next/image";
import { urbanAssets } from "@/content/cases/urban-challenge/urban-assets";
import ImageViewer from "@/components/case-study/ImageViewer";

export default function UrbanMasterPlanFigureComparison() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [viewerOpen, setViewerOpen] = useState(false);

  // We compare the general views from page 43
  const figures = [
    {
      title: "CANDIDATO A",
      description: "Vista general en perspectiva (superior izquierda). Muestra la relación entre espina dorsal, nodos, vegetación y recorridos.",
      assetId: "page-43-upper-left-system-audit",
      fallback: "project-15-master-plan-full" // if audit asset not available yet, use the curated one
    },
    {
      title: "CANDIDATO B",
      description: "Composición central. Detalle del tejido y nodos de conexión.",
      assetId: "page-43-central-system-audit",
      fallback: "project-15-master-plan-full"
    },
    {
      title: "CANDIDATO C",
      description: "Gran composición derecha. Adoptada como el plan maestro definitivo para la experiencia web por su nivel de detalle y relación espacial.",
      assetId: "project-15-master-plan-full",
      fallback: "project-15-master-plan-full"
    }
  ];

  const currentItem = figures[activeIndex];
  const currentAsset = urbanAssets.find(a => a.id === currentItem.assetId) || urbanAssets.find(a => a.id === currentItem.fallback);

  return (
    <div className="w-full flex flex-col md:flex-row gap-8 bg-[#050505] border border-white/5 p-6">
      
      {/* Controls */}
      <div className="w-full md:w-1/3 flex flex-col gap-6">
        <h3 className="text-mono text-[10px] text-white/40 tracking-widest uppercase">
          EVALUACIÓN DE PLAN MAESTRO
        </h3>
        
        <div className="flex flex-col gap-2">
          {figures.map((fig, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`text-left text-sm py-3 px-4 rounded border ${
                activeIndex === idx
                  ? "border-white/20 bg-white/5 text-white"
                  : "border-transparent text-white/40 hover:text-white/80 hover:bg-white/5"
              }`}
            >
              <span className="block text-mono text-[9px] mb-1">{fig.title}</span>
              <span className="block font-light leading-snug">{fig.description}</span>
            </button>
          ))}
        </div>
      </div>

      {/* View */}
      <div className="w-full md:w-2/3">
        <div 
          className="w-full aspect-[4/3] relative bg-[#111] rounded flex items-center justify-center p-4 cursor-zoom-in group"
          onClick={() => setViewerOpen(true)}
        >
          {currentAsset && (
            <Image
              src={currentAsset.previewPath}
              alt={currentItem.title}
              fill
              className="object-contain p-4 group-hover:scale-105 transition-transform duration-700"
            />
          )}
          <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
        </div>
      </div>

      <ImageViewer 
        isOpen={viewerOpen}
        onClose={() => setViewerOpen(false)}
        highResSrc={currentAsset?.previewPath || ""}
        altText={currentItem.title}
      />
    </div>
  );
}
