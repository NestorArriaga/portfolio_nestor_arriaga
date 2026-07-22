"use client";

import { useState } from "react";
import Image from "next/image";
import { useSafeMode } from "@/components/home/motion/SafeModeContext";
import { urbanTopographyWater } from "@/content/cases/urban-challenge/urban-topography-water";
import { urbanAssets } from "@/content/cases/urban-challenge/urban-assets";

export default function UrbanTopographyWaterReader() {
  const isSafeMode = useSafeMode();
  const { topographicEvidence, hydrologicalBehavior, elevatedStructure, amphitheaterAnticipation } = urbanTopographyWater;
  
  const assetResponse = urbanAssets.find(a => a.id === "project-15-site-response-preview");
  
  const blocks = [
    {
      title: "CONDICIÓN HUNDIDA",
      content: topographicEvidence.statement,
      limitation: topographicEvidence.note
    },
    {
      title: "INFILTRACIÓN",
      content: hydrologicalBehavior.statement,
      limitation: hydrologicalBehavior.note
    },
    {
      title: "CONTINUIDAD HÍDRICA",
      content: elevatedStructure.statement,
      limitation: "INTENCIÓN DE DISEÑO (Desempeño no verificado)"
    },
    {
      title: "RESPUESTA ESPACIAL",
      content: amphitheaterAnticipation.statement,
      limitation: amphitheaterAnticipation.note
    }
  ];

  const [activeTab, setActiveTab] = useState(0);

  if (isSafeMode) {
    return (
      <div className="w-full flex flex-col gap-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {blocks.map((block, i) => (
            <div key={i} className="flex flex-col gap-3 p-4 bg-white/5 border border-white/10 rounded">
              <span className="text-mono text-[10px] text-[var(--urban-accent)] uppercase tracking-widest">{block.title}</span>
              <p className="text-body text-white/80">{block.content}</p>
              <span className="text-mono text-[9px] text-white/40 uppercase mt-2 pt-2 border-t border-white/10">
                {block.limitation}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col md:flex-row gap-8 items-center">
      
      {/* Visual Context */}
      <div className="w-full md:w-1/2 aspect-square relative bg-[#111] border border-white/10 rounded flex items-center justify-center p-4">
        {assetResponse && (
          <Image 
            src={assetResponse.previewPath} 
            alt="Respuesta espacial topográfica" 
            fill 
            className="object-contain p-8 opacity-70" 
          />
        )}
      </div>

      {/* Reader Controls */}
      <div className="w-full md:w-1/2 flex flex-col justify-center gap-6">
        <div className="flex flex-col gap-2 border-l border-white/20 pl-6">
          {blocks.map((block, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              aria-selected={activeTab === index}
              className={`text-left py-3 flex flex-col gap-1 transition-opacity ${
                activeTab === index ? "opacity-100" : "opacity-40 hover:opacity-70"
              }`}
            >
              <span className="text-mono text-[10px] uppercase tracking-widest text-[var(--urban-accent)]">
                {block.title}
              </span>
              {activeTab === index && (
                <div className="flex flex-col gap-3 animate-fade-in-fast mt-2">
                  <p className="text-body text-white/90">
                    {block.content}
                  </p>
                  <span className="text-mono text-[9px] text-[var(--urban-accent)]/80 uppercase">
                    {block.limitation}
                  </span>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

    </div>
  );
}
