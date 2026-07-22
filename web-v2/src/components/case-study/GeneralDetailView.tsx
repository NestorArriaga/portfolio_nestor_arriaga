import { useState } from 'react';
import Image from 'next/image';
import Reveal from '../home/motion/Reveal';

interface GeneralDetailViewProps {
  generalSrc: string;
  detailSrc: string;
  title: string;
  onExpand: () => void;
  accentColor: string;
  isSoil: boolean;
}

export default function GeneralDetailView({ generalSrc, detailSrc, title, onExpand, accentColor, isSoil }: GeneralDetailViewProps) {
  const [showDetail, setShowDetail] = useState(false);

  return (
    <div className="w-full">
      <Reveal direction="up" className="flex justify-between items-end mb-6">
        <h3 className="text-display-xs text-white">{title}</h3>
        <div className="flex gap-4">
          <button 
            onClick={() => setShowDetail(false)}
            className={`text-mono text-[10px] tracking-widest px-4 py-2 border rounded-full transition-colors ${!showDetail ? `border-[${accentColor}] text-[${accentColor}]` : 'border-white/20 text-white/50 hover:border-white/50'}`}
            style={!showDetail ? { borderColor: accentColor, color: accentColor } : {}}
          >
            GENERAL
          </button>
          <button 
            onClick={() => setShowDetail(true)}
            className={`text-mono text-[10px] tracking-widest px-4 py-2 border rounded-full transition-colors ${showDetail ? `border-[${accentColor}] text-[${accentColor}]` : 'border-white/20 text-white/50 hover:border-white/50'}`}
            style={showDetail ? { borderColor: accentColor, color: accentColor } : {}}
          >
            DETALLE
          </button>
        </div>
      </Reveal>

      <Reveal direction="up" distance={32}>
        <div 
          className="relative w-full aspect-video md:aspect-[21/9] rounded-[var(--radius-panel)] border overflow-hidden cursor-zoom-in bg-[#050505]"
          style={{ borderColor: `${accentColor}33` }}
          onClick={onExpand}
        >
          <Image 
            src={!showDetail ? generalSrc : detailSrc} 
            alt={title} 
            fill 
            className={`object-cover md:object-contain transition-opacity duration-500 ${!showDetail ? 'p-4' : 'p-0'}`} 
            unoptimized 
          />
          <div className="absolute inset-0 bg-black/10 hover:bg-transparent transition-colors duration-300"></div>
          
          <div className="absolute top-4 left-4 bg-black/80 px-3 py-1 rounded text-mono text-[10px] uppercase tracking-widest backdrop-blur-sm" style={{ color: accentColor }}>
            {!showDetail ? 'VISIÓN GENERAL' : 'DETALLE AMPLIADO'}
          </div>
        </div>
      </Reveal>
      
      <div className="mt-4 text-center text-mono text-[10px] text-white/40 uppercase tracking-widest">
        Haz clic para ampliar la composición cartográfica.
      </div>
    </div>
  );
}
