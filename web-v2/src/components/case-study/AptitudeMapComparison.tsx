"use client";

import { useState } from 'react';
import Image from 'next/image';
import Reveal from '../home/motion/Reveal';

interface AptitudeMapComparisonProps {
  map10Src: string;
  map11Src: string;
}

export default function AptitudeMapComparison({ map10Src, map11Src }: AptitudeMapComparisonProps) {
  const [activeTab, setActiveTab] = useState<'both' | 'cons' | 'agri'>('both');

  return (
    <div className="w-full flex flex-col gap-8">
      
      {/* CONTROLES */}
      <Reveal direction="up" className="flex justify-center md:justify-end gap-4">
        <button 
          onClick={() => setActiveTab('both')}
          className={`text-mono text-[10px] tracking-widest px-4 py-2 border rounded-full transition-colors ${activeTab === 'both' ? 'border-white text-white' : 'border-white/20 text-white/50 hover:border-white/50'}`}
        >
          LADO A LADO
        </button>
        <button 
          onClick={() => setActiveTab('cons')}
          className={`text-mono text-[10px] tracking-widest px-4 py-2 border rounded-full transition-colors ${activeTab === 'cons' ? 'border-[#4caf50] text-[#4caf50]' : 'border-white/20 text-white/50 hover:border-[#4caf50]/50'}`}
        >
          CONSERVACIÓN
        </button>
        <button 
          onClick={() => setActiveTab('agri')}
          className={`text-mono text-[10px] tracking-widest px-4 py-2 border rounded-full transition-colors ${activeTab === 'agri' ? 'border-[#ff9800] text-[#ff9800]' : 'border-white/20 text-white/50 hover:border-[#ff9800]/50'}`}
        >
          AGRÍCOLA
        </button>
      </Reveal>

      {/* COMPARADOR VISUAL */}
      <div className="relative w-full aspect-[4/3] md:aspect-video flex flex-col md:flex-row gap-4">
        
        {/* MAPA 10: CONSERVACIÓN */}
        <div className={`relative h-full transition-all duration-700 ease-in-out rounded-[var(--radius-panel)] border border-[#4caf50]/20 bg-white/5 overflow-hidden
          ${activeTab === 'both' ? 'w-full md:w-1/2' : activeTab === 'cons' ? 'w-full' : 'hidden'}
        `}>
          <Image src={map10Src} alt="Mapa de aptitud para la conservación" fill className="object-contain p-4" unoptimized />
          <div className="absolute top-4 left-4 bg-black/80 px-3 py-1 rounded text-mono text-[10px] text-[#4caf50] uppercase tracking-widest backdrop-blur-sm">
            APTITUD PARA LA CONSERVACIÓN
          </div>
        </div>

        {/* MAPA 11: AGRÍCOLA */}
        <div className={`relative h-full transition-all duration-700 ease-in-out rounded-[var(--radius-panel)] border border-[#ff9800]/20 bg-white/5 overflow-hidden
          ${activeTab === 'both' ? 'w-full md:w-1/2' : activeTab === 'agri' ? 'w-full' : 'hidden'}
        `}>
          <Image src={map11Src} alt="Mapa de aptitud agrícola" fill className="object-contain p-4" unoptimized />
          <div className="absolute top-4 left-4 bg-black/80 px-3 py-1 rounded text-mono text-[10px] text-[#ff9800] uppercase tracking-widest backdrop-blur-sm">
            APTITUD AGRÍCOLA
          </div>
        </div>

      </div>

      <div className="text-center text-mono text-[10px] text-white/40 tracking-widest uppercase">
        Ambos mapas cubren el estado de Aguascalientes, pero evalúan finalidades distintas. No deben interpretarse mediante superposición directa.
      </div>
    </div>
  );
}
