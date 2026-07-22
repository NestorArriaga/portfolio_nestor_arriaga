"use client";

import { useState } from "react";
import { urbanPlayRing } from "@/content/cases/urban-challenge/urban-play-ring";
import Image from "next/image";
import { urbanAssets } from "@/content/cases/urban-challenge/urban-assets";
import { ExternalLink } from "lucide-react";
import Link from "next/link";

export default function UrbanPlayRingReader() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeComponent = urbanPlayRing.experience.items[activeIndex];

  const perspectiveAsset = urbanAssets.find(a => a.id === urbanPlayRing.hero.assetId);

  return (
    <div className="w-full flex flex-col lg:flex-row border border-white/10 rounded-sm overflow-hidden bg-black/20">
      
      {/* CONTROLES */}
      <div className="w-full lg:w-1/3 flex flex-col border-b lg:border-b-0 lg:border-r border-white/10">
        <div className="p-6 border-b border-white/10">
          <h4 className="text-mono text-[10px] text-white/50 tracking-widest uppercase mb-2">
            LECTOR DE ESPACIO DE JUEGO
          </h4>
          <p className="text-xs text-white/70 font-light leading-relaxed">
            {urbanPlayRing.experience.description}
          </p>
        </div>
        
        <div className="flex flex-col flex-1 p-4 gap-1">
          {urbanPlayRing.experience.items.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => setActiveIndex(idx)}
              className={`text-left px-4 py-3 rounded-sm text-xs font-light transition-colors ${
                activeIndex === idx 
                  ? "bg-white/10 text-white" 
                  : "text-white/40 hover:bg-white/5 hover:text-white/70"
              }`}
            >
              <span className="text-mono text-[9px] mr-3 opacity-50">
                0{idx + 1}
              </span>
              {item.title}
            </button>
          ))}
        </div>
      </div>

      {/* VISOR Y TEXTO */}
      <div className="w-full lg:w-2/3 flex flex-col">
        <div className="relative w-full aspect-[16/9] bg-[#030303] flex items-center justify-center p-8 border-b border-white/10">
          {perspectiveAsset && (
            <div className="relative w-full h-full opacity-80">
              <Image
                src={perspectiveAsset.previewPath}
                alt={activeComponent.title}
                fill
                className="object-contain"
                sizes="(max-width: 1024px) 100vw, 66vw"
              />
            </div>
          )}
          
          <Link
            href="/asset-audit"
            target="_blank"
            className="absolute top-4 right-4 text-mono text-[9px] text-white/30 hover:text-white flex items-center gap-1 transition-colors z-10"
          >
            AUDITORÍA DE ASSET <ExternalLink className="w-3 h-3" />
          </Link>
        </div>

        <div className="p-8 flex flex-col gap-4">
          <h5 className="text-sm text-white tracking-wide">
            {activeComponent.title}
          </h5>
          <p className="text-sm text-white/60 font-light leading-relaxed">
            {activeComponent.description}
          </p>
        </div>
      </div>

    </div>
  );
}
