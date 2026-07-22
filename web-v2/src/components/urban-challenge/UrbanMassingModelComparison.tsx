"use client";

import { useState } from "react";
import Image from "next/image";
import { useSafeMode } from "@/components/home/motion/SafeModeContext";
import { urbanAssets } from "@/content/cases/urban-challenge/urban-assets";
import { urbanUrbanFabric } from "@/content/cases/urban-challenge/urban-urban-fabric";
import ImageViewer from "@/components/case-study/ImageViewer";

export default function UrbanMassingModelComparison() {
  const isSafeMode = useSafeMode();
  const { modelAssets, modelDescriptions, limitations } = urbanUrbanFabric;
  
  const modelA = urbanAssets.find(a => a.id === modelAssets.modelA);
  const modelB = urbanAssets.find(a => a.id === modelAssets.modelB);
  
  const [activeModel, setActiveModel] = useState<"A" | "B">("A");
  const [viewerOpen, setViewerOpen] = useState(false);
  const [viewerImage, setViewerImage] = useState<{src: string, alt: string} | null>(null);

  const openViewer = (src: string, alt: string) => {
    setViewerImage({ src, alt });
    setViewerOpen(true);
  };

  if (isSafeMode) {
    return (
      <div className="w-full flex flex-col gap-12">
        <div className="w-full aspect-video relative bg-[#111] border border-white/10 rounded overflow-hidden">
           {modelA && (
             <Image src={modelA.previewPath} alt={modelDescriptions.modelA.title} fill className="object-contain p-4" />
           )}
        </div>
        <div className="w-full aspect-video relative bg-[#111] border border-white/10 rounded overflow-hidden">
           {modelB && (
             <Image src={modelB.previewPath} alt={modelDescriptions.modelB.title} fill className="object-contain p-4" />
           )}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-6">
      
      <div className="flex justify-center gap-4 border-b border-white/10 pb-4">
        <button
          onClick={() => setActiveModel("A")}
          aria-selected={activeModel === "A"}
          className={`text-mono text-xs tracking-widest px-4 py-2 transition-colors ${
            activeModel === "A" ? "text-white border-b border-white" : "text-white/40 hover:text-white/80"
          }`}
        >
          {modelDescriptions.modelA.title}
        </button>
        <button
          onClick={() => setActiveModel("B")}
          aria-selected={activeModel === "B"}
          className={`text-mono text-xs tracking-widest px-4 py-2 transition-colors ${
            activeModel === "B" ? "text-white border-b border-white" : "text-white/40 hover:text-white/80"
          }`}
        >
          {modelDescriptions.modelB.title}
        </button>
      </div>

      <div className="w-full aspect-video relative bg-[#111] border border-white/10 rounded overflow-hidden group">
        {modelA && (
          <Image 
            src={modelA.previewPath} 
            alt={modelDescriptions.modelA.title} 
            fill 
            className={`object-contain p-4 transition-opacity duration-700 ease-[var(--urban-ease)] ${
              activeModel === "A" ? "opacity-100 z-10" : "opacity-0 z-0"
            }`} 
          />
        )}
        {modelB && (
          <Image 
            src={modelB.previewPath} 
            alt={modelDescriptions.modelB.title} 
            fill 
            className={`object-contain p-4 transition-opacity duration-700 ease-[var(--urban-ease)] ${
              activeModel === "B" ? "opacity-100 z-10" : "opacity-0 z-0"
            }`} 
          />
        )}
        
        <button
          onClick={() => openViewer(
            activeModel === "A" ? (modelA?.previewPath || "") : (modelB?.previewPath || ""),
            activeModel === "A" ? modelDescriptions.modelA.title : modelDescriptions.modelB.title
          )}
          className="absolute bottom-4 right-4 bg-black/80 backdrop-blur text-white text-mono text-[9px] px-3 py-1.5 rounded opacity-0 group-hover:opacity-100 transition-opacity z-20 border border-white/10"
        >
          AMPLIAR
        </button>
      </div>
      
      <div className="flex flex-col gap-2 mt-4">
        <p className="text-body text-white/70">
          {activeModel === "A" ? modelDescriptions.modelA.caption : modelDescriptions.modelB.caption}
        </p>
      </div>

      <ImageViewer 
        isOpen={viewerOpen}
        onClose={() => setViewerOpen(false)}
        highResSrc={viewerImage?.src || ""}
        altText={viewerImage?.alt || ""}
      />
    </div>
  );
}
