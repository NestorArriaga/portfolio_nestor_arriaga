"use client";

import { useState } from 'react';
import Reveal from '../home/motion/Reveal';

interface Attribute {
  id: string;
  label: string;
  detail: string;
  weight: number;
  sourceValue: string;
}

interface WeightedAttributeCompositionProps {
  attributes: Attribute[];
  totalWeight: string;
}

export default function WeightedAttributeComposition({ attributes, totalWeight }: WeightedAttributeCompositionProps) {
  const [activeId, setActiveId] = useState<string | null>(null);

  // El peso máximo en ambos casos es 0.25, así que normalizamos visualmente sobre 0.30 para que no ocupe el 100%
  const maxVisualWeight = 0.30;

  return (
    <div className="w-full">
      <div className="text-mono text-[10px] text-white/50 uppercase tracking-widest mb-6 border-b border-white/10 pb-2 flex justify-between">
        <span>ATRIBUTO / DETALLE DOCUMENTADO</span>
        <span>PESO DE LA VARIABLE</span>
      </div>

      <div className="flex flex-col">
        {attributes.map((attr, idx) => {
          const isActive = attr.id === activeId;
          const isFaded = activeId !== null && !isActive;
          const widthPercent = (attr.weight / maxVisualWeight) * 100;

          return (
            <Reveal key={attr.id} direction="up" delay={idx * 0.1}>
              <button
                onClick={() => setActiveId(isActive ? null : attr.id)}
                aria-selected={isActive}
                className={`w-full text-left flex flex-col md:flex-row gap-4 md:gap-8 py-6 border-b border-white/5 transition-all duration-300 ${
                  isFaded ? 'opacity-40 hover:opacity-70' : 'opacity-100'
                }`}
              >
                {/* Textos */}
                <div className="w-full md:w-2/3 pr-4">
                  <h3 className={`text-label font-bold uppercase tracking-widest mb-2 transition-colors ${isActive ? 'text-[var(--color-accent)]' : 'text-white/90'}`}>
                    {attr.label}
                  </h3>
                  {attr.detail && (
                    <p className="text-body text-white/60 font-light">
                      {attr.detail}
                    </p>
                  )}
                </div>

                {/* Gráfica de peso */}
                <div className="w-full md:w-1/3 flex flex-col justify-center">
                  <div className="flex justify-between items-end mb-2">
                    <span className="text-mono text-[10px] text-white/40">PESO</span>
                    <span className={`text-mono text-[16px] font-bold ${isActive ? 'text-[var(--color-accent)]' : 'text-white'}`}>
                      {attr.sourceValue}
                    </span>
                  </div>
                  <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-[var(--color-accent)] transition-all duration-1000 ease-out" 
                      style={{ width: `${widthPercent}%` }}
                    ></div>
                  </div>
                </div>
              </button>
            </Reveal>
          );
        })}
      </div>

      <div className="mt-8 text-right text-mono text-[10px] text-white/40 uppercase tracking-widest">
        SUMA DE PESOS: {totalWeight}
      </div>
    </div>
  );
}
