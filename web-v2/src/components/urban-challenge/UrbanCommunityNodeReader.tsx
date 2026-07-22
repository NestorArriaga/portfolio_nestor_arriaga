"use client";

import { useState } from "react";
import { urbanCommunityNode } from "@/content/cases/urban-challenge/urban-community-node";

export default function UrbanCommunityNodeReader() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeComponent = urbanCommunityNode.narrative.items[activeIndex];

  return (
    <div className="w-full flex flex-col lg:flex-row border border-white/10 rounded-sm overflow-hidden bg-black/20">
      
      {/* CONTROLES */}
      <div className="w-full lg:w-1/3 flex flex-col border-b lg:border-b-0 lg:border-r border-white/10">
        <div className="p-6 border-b border-white/10">
          <h4 className="text-mono text-[10px] text-white/50 tracking-widest uppercase mb-2">
            NARRATIVA SOCIAL Y DIMENSIÓN COMUNITARIA
          </h4>
          <p className="text-xs text-white/70 font-light leading-relaxed">
            {urbanCommunityNode.narrative.description}
          </p>
        </div>
        
        <div className="flex flex-col flex-1 p-4 gap-1">
          {urbanCommunityNode.narrative.items.map((item, idx) => (
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
      <div className="w-full lg:w-2/3 flex flex-col justify-center items-center bg-[#030303] p-12 lg:p-24 min-h-[400px]">
        <div className="flex flex-col gap-6 max-w-md text-center">
          <h5 className="text-2xl md:text-3xl font-light text-white tracking-wide">
            {activeComponent.title}
          </h5>
          <div className="w-8 h-[1px] bg-[var(--urban-accent)] mx-auto opacity-50" />
          <p className="text-base text-white/60 font-light leading-relaxed">
            {activeComponent.description}
          </p>
          
          <div className="mt-8 border border-white/10 bg-white/5 p-4 rounded-sm text-left">
            <span className="text-mono text-[9px] text-[var(--urban-accent)] uppercase tracking-widest block mb-2">
              ESTADO DOCUMENTAL
            </span>
            <p className="text-xs text-white/50 leading-relaxed font-light">
              La versión web presenta la dimensión comunitaria como intención espacial y narrativa del diseño, sin atribuir comprobación, participación vecinal, programa u obra construida.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}
