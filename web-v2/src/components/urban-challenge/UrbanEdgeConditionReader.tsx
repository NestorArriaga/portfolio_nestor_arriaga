"use client";

import { useState } from "react";
import Image from "next/image";
import { useSafeMode } from "@/components/home/motion/SafeModeContext";
import { urbanAssets } from "@/content/cases/urban-challenge/urban-assets";
import { urbanEdgesAccess } from "@/content/cases/urban-challenge/urban-edges-access";

export default function UrbanEdgeConditionReader() {
  const isSafeMode = useSafeMode();
  const { edgeConditions, evidenceStatus } = urbanEdgesAccess;
  const asset = urbanAssets.find(a => a.id === evidenceStatus.assetId);
  
  const conditions = Object.entries(edgeConditions);
  const [activeTab, setActiveTab] = useState(0);

  if (isSafeMode) {
    return (
      <div className="w-full flex flex-col gap-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {conditions.map(([key, val]) => (
            <div key={key} className="flex flex-col gap-3 p-4 bg-white/5 border border-white/10 rounded">
              <span className="text-mono text-[10px] text-white/50 uppercase tracking-widest">{val.title}</span>
              <p className="text-body text-white/80">{val.description}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col md:flex-row gap-8">
      
      {/* Visual Context */}
      <div className="w-full md:w-1/2 aspect-square relative bg-[#111] border border-white/10 rounded flex items-center justify-center p-4">
        {asset && (
          <Image 
            src={asset.previewPath} 
            alt="Contexto de bordes" 
            fill 
            className="object-contain p-8 opacity-70" 
          />
        )}
      </div>

      {/* Reader Controls */}
      <div className="w-full md:w-1/2 flex flex-col justify-center gap-6">
        <div className="flex flex-col gap-2 border-l border-white/20 pl-6">
          {conditions.map(([key, val], index) => (
            <button
              key={key}
              onClick={() => setActiveTab(index)}
              aria-selected={activeTab === index}
              className={`text-left py-3 flex flex-col gap-1 transition-opacity ${
                activeTab === index ? "opacity-100" : "opacity-40 hover:opacity-70"
              }`}
            >
              <span className="text-mono text-[10px] uppercase tracking-widest text-[var(--urban-accent)]">
                {val.title}
              </span>
              {activeTab === index && (
                <p className="text-body text-white/90 animate-fade-in-fast">
                  {val.description}
                </p>
              )}
            </button>
          ))}
        </div>

        <div className="mt-8 bg-[var(--urban-accent)]/10 border border-[var(--urban-accent)]/30 rounded p-4">
          <span className="text-mono text-[9px] text-[var(--urban-accent)] uppercase tracking-widest block mb-2">
            NIVEL DOCUMENTAL
          </span>
          <p className="text-body text-[var(--urban-accent)]/80 text-sm">
            {evidenceStatus.text}
          </p>
        </div>
      </div>

    </div>
  );
}
