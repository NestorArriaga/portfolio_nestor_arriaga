"use client";

import { useState } from "react";
import Image from "next/image";
import { urbanAssets } from "@/content/cases/urban-challenge/urban-assets";
import { urbanVegetationInfiltration } from "@/content/cases/urban-challenge/urban-vegetation-infiltration";
import ImageViewer from "@/components/case-study/ImageViewer";

export default function UrbanVegetationInfiltrationReader() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [viewerOpen, setViewerOpen] = useState(false);
  const { reader } = urbanVegetationInfiltration;

  const currentItem = reader[activeIndex];
  const currentAsset = urbanAssets.find(a => a.id === currentItem.assetId);

  return (
    <div className="w-full flex flex-col md:flex-row gap-12 bg-[#080808] border border-white/5 p-6 md:p-12 rounded-sm">
      
      {/* Control Panel */}
      <div className="w-full md:w-1/3 flex flex-col gap-8">
        <h3 className="text-mono text-[10px] text-white/40 tracking-widest uppercase border-b border-white/10 pb-4">
          DIMENSIÓN AMBIENTAL
        </h3>
        
        <div className="flex flex-col gap-2" role="tablist">
          {reader.map((item, index) => (
            <button
              key={item.id}
              role="tab"
              aria-selected={activeIndex === index}
              onClick={() => setActiveIndex(index)}
              className={`text-left text-sm py-2 px-3 rounded transition-all border-l-2 ${
                activeIndex === index 
                  ? "border-[var(--urban-accent)] text-white bg-white/5" 
                  : "border-transparent text-white/40 hover:text-white/80 hover:bg-white/5"
              }`}
            >
              {item.title}
            </button>
          ))}
        </div>

        <div className="mt-4">
          <p className="text-sm font-light text-white/80 leading-relaxed">
            {currentItem.description}
          </p>
        </div>
      </div>

      {/* Visualizer */}
      <div className="w-full md:w-2/3 flex flex-col gap-4">
        <div 
          className="w-full aspect-[4/3] relative bg-[#111] rounded border border-white/5 flex items-center justify-center p-8 cursor-zoom-in"
          onClick={() => setViewerOpen(true)}
        >
          {currentAsset ? (
            <Image
              src={currentAsset.previewPath}
              alt={currentItem.title}
              fill
              className="object-contain p-8"
            />
          ) : (
            <span className="text-mono text-[10px] text-white/20">RECURSO NO ENCONTRADO</span>
          )}
          <div className="absolute top-4 right-4 text-mono text-[9px] text-white/30 bg-black/50 px-2 py-1 rounded backdrop-blur-sm pointer-events-none">
            AMPLIAR
          </div>
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
