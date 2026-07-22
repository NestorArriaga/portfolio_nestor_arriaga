"use client";

import { useState } from "react";
import Image from "next/image";
import { useSafeMode } from "@/components/home/motion/SafeModeContext";
import { urbanAssets } from "@/content/cases/urban-challenge/urban-assets";

export default function UrbanVoidReading() {
  const safeMode = useSafeMode();
  const [activeTab, setActiveTab] = useState<number>(0);

  const tabs = [
    { title: "TRAMA URBANA", desc: "El tejido inmediato se caracteriza por una retícula compacta sin vacíos significativos alrededor." },
    { title: "VACÍO ESTRUCTURAL", desc: "El sitio representa una interrupción morfológica drástica en la continuidad de la colonia." },
    { title: "PARQUE HUNDIDO", desc: "La diferencia topográfica de la antigua sascabera define los bordes y accesos limitados del parque." }
  ];

  const asset = urbanAssets.find(a => a.id === "project-15-urban-massing-model-work");

  if (safeMode) {
    return (
      <div className="flex flex-col gap-8 w-full">
        {tabs.map((tab, i) => (
          <div key={i} className="flex flex-col gap-2 p-4 border-l border-white/20">
            <h4 className="text-sm font-medium text-white">{tab.title}</h4>
            <p className="text-sm text-white/60">{tab.desc}</p>
          </div>
        ))}
        {asset && (
          <div className="w-full aspect-video relative bg-[#111] rounded">
            <Image src={asset.previewPath} alt="Contexto" fill className="object-contain p-4 opacity-50" />
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 w-full">
      <div className="flex flex-col sm:flex-row gap-4 border-b border-white/10 pb-4" role="tablist">
        {tabs.map((tab, i) => (
          <button
            key={i}
            role="tab"
            aria-selected={activeTab === i}
            onClick={() => setActiveTab(i)}
            className={`flex flex-col gap-1 text-left px-4 py-2 border-l-2 transition-all outline-none focus-visible:ring-2 ring-[var(--urban-accent)] ${
              activeTab === i 
                ? "border-[var(--urban-accent)]" 
                : "border-transparent hover:border-white/20"
            }`}
          >
            <span className={`text-mono text-[10px] tracking-widest ${activeTab === i ? "text-[var(--urban-accent)]" : "text-white/40"}`}>
              0{i + 1}
            </span>
            <span className={`text-sm ${activeTab === i ? "text-white font-medium" : "text-white/60"}`}>
              {tab.title}
            </span>
          </button>
        ))}
      </div>

      <div className="flex flex-col md:flex-row gap-8 items-start min-h-[300px]">
        <div className="w-full md:w-1/3 flex flex-col gap-4">
          <p className="text-lg font-light text-white leading-relaxed animate-fade-in">
            {tabs[activeTab].desc}
          </p>
        </div>
        
        <div className="w-full md:w-2/3 aspect-video relative bg-[#0a0a0a] border border-white/5 rounded flex items-center justify-center p-4">
          {asset && (
            <Image 
              src={asset.previewPath} 
              alt={tabs[activeTab].title} 
              fill 
              className={`object-contain p-8 transition-opacity duration-700 ease-[var(--urban-ease)] ${
                activeTab === 0 ? "opacity-70" :
                activeTab === 1 ? "opacity-40 invert mix-blend-screen" :
                "opacity-50"
              }`}
            />
          )}
          {/* Subtle overlays based on active tab to suggest meaning without GIS complexity */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {activeTab === 1 && (
              <div className="w-1/3 h-1/2 bg-[var(--urban-accent)] mix-blend-overlay opacity-20 rounded-full blur-3xl animate-fade-in" />
            )}
            {activeTab === 2 && (
              <div className="w-1/2 h-1/2 border border-[var(--urban-accent)] opacity-20 rounded-[40%] animate-fade-in" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
