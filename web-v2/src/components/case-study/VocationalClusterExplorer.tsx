"use client";

import { useState } from 'react';
import Image from 'next/image';
import Reveal from '../home/motion/Reveal';

interface Cluster {
  id: string;
  label: string;
  orientation: string;
  colorToken: string;
  description: string;
  recommendationsMentioned: string[];
  visibleLabels: string[];
  warning: string | null;
}

export default function VocationalClusterExplorer({ clusters }: { clusters: Cluster[] }) {
  const [activeId, setActiveId] = useState<string | null>(null);

  const activeCluster = clusters.find(c => c.id === activeId);

  return (
    <section className="w-full bg-[#050505] py-32 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col lg:flex-row gap-16 items-start">
        
        {/* SELECTOR */}
        <div className="w-full lg:w-1/3 flex flex-col gap-8">
          <Reveal direction="up">
            <h2 className="text-display-md text-white mb-2">DOS CLÚSTERES</h2>
            <p className="text-body text-white/50 mb-8">Selecciona una agrupación para consultar sus características y las etiquetas visibles en la composición original.</p>
          </Reveal>
          
          <div className="flex flex-col gap-4">
            {clusters.map(cluster => {
              const isActive = cluster.id === activeId;
              return (
                <button
                  key={cluster.id}
                  onClick={() => setActiveId(isActive ? null : cluster.id)}
                  className={`flex items-center gap-4 text-left p-4 rounded-[var(--radius-sm)] transition-colors border ${
                    isActive ? 'bg-white/10 border-white/20' : 'bg-transparent border-transparent hover:bg-white/5'
                  }`}
                  aria-selected={isActive}
                >
                  <div className="w-6 h-6 shrink-0 rounded-full border border-white/20" style={{ backgroundColor: cluster.colorToken }}></div>
                  <div className="flex flex-col">
                    <span className={`text-label font-bold uppercase tracking-widest ${isActive ? 'text-white' : 'text-white/60'}`}>{cluster.label}</span>
                    <span className={`text-mono text-[10px] ${isActive ? 'text-white/80' : 'text-white/40'}`}>{cluster.orientation}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* DETALLE Y EXPLICACIÓN */}
        <div className="w-full lg:w-2/3 bg-white/5 border border-white/10 rounded-[var(--radius-panel)] p-8 md:p-12 min-h-[500px] flex flex-col relative overflow-hidden">
          {activeCluster ? (
            <Reveal direction="up" key={activeCluster.id} className="relative z-10 flex flex-col h-full">
              
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-full shadow-[0_0_20px_rgba(255,255,255,0.2)]" style={{ backgroundColor: activeCluster.colorToken }}></div>
                <div>
                  <div className="text-mono text-[10px] text-white/50 tracking-widest">{activeCluster.label}</div>
                  <h3 className="text-display-sm text-white" style={{ color: activeCluster.colorToken }}>{activeCluster.orientation}</h3>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-8">
                <div>
                  <h4 className="text-mono text-[10px] text-white/60 tracking-widest mb-4 border-b border-white/10 pb-2">DESCRIPCIÓN</h4>
                  <p className="text-body text-white/80 leading-relaxed font-light">{activeCluster.description}</p>
                </div>
                <div>
                  <h4 className="text-mono text-[10px] text-white/60 tracking-widest mb-4 border-b border-white/10 pb-2">ORIENTACIÓN SUGERIDA</h4>
                  <ul className="flex flex-col gap-3">
                    {activeCluster.recommendationsMentioned.map((rec, i) => (
                      <li key={i} className="flex gap-3 text-label text-white/70">
                        <span style={{ color: activeCluster.colorToken }}>•</span> {rec}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-auto pt-8 border-t border-white/10">
                <h4 className="text-mono text-[10px] text-white/60 tracking-widest mb-4">ETIQUETAS MUNICIPALES VISIBLES EN LA COMPOSICIÓN ORIGINAL</h4>
                <div className="flex flex-wrap gap-2 mb-4">
                  {activeCluster.visibleLabels.map((lbl, i) => (
                    <span key={i} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-label text-white/80">
                      {lbl}
                    </span>
                  ))}
                </div>
                {activeCluster.warning && (
                  <div className="text-mono text-[10px] text-[var(--color-accent)] mt-4 p-3 bg-[var(--color-accent)]/10 rounded-[var(--radius-sm)]">
                    Nota de consistencia: {activeCluster.warning}
                  </div>
                )}
              </div>
            </Reveal>
          ) : (
            <div className="m-auto text-center relative z-10">
              <div className="w-16 h-16 rounded-full border border-white/10 mx-auto mb-6 flex items-center justify-center opacity-50 text-white/30 text-2xl">+</div>
              <p className="text-body text-white/40">Selecciona un clúster para visualizar sus características y membresía visible.</p>
            </div>
          )}

          {/* FONDO SUTIL DEL CLUSTER ACTIVO */}
          {activeCluster && (
            <div 
              className="absolute -right-[20%] -bottom-[20%] w-[80%] aspect-square rounded-full blur-[120px] opacity-[0.03] z-0 pointer-events-none transition-colors duration-1000"
              style={{ backgroundColor: activeCluster.colorToken }}
            ></div>
          )}
        </div>

      </div>
    </section>
  );
}
