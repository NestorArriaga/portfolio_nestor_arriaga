"use client";

import { useState } from "react";
import { urbanAssets } from "@/content/cases/urban-challenge/urban-assets";

export default function UrbanLabAssetsView() {
  const [filterType, setFilterType] = useState<string>("all");
  const [filterPhase, setFilterPhase] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");

  const types = Array.from(new Set(urbanAssets.map(a => a.type)));
  const phases = Array.from(new Set(urbanAssets.map(a => a.designPhase)));
  const statuses = Array.from(new Set(urbanAssets.map(a => a.status)));

  const filteredAssets = urbanAssets.filter(a => {
    if (filterType !== "all" && a.type !== filterType) return false;
    if (filterPhase !== "all" && a.designPhase !== filterPhase) return false;
    if (filterStatus !== "all" && a.status !== filterStatus) return false;
    return true;
  });

  return (
    <div className="w-full max-w-7xl mx-auto p-6 md:p-12 flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-light tracking-wide text-white">VISUAL INVENTORY</h2>
        <p className="text-mono text-xs text-white/50">Catálogo de recursos clasificados por fase y función.</p>
      </div>

      <div className="flex flex-wrap gap-4 border-y border-white/10 py-4">
        <div className="flex flex-col gap-1">
          <label className="text-mono text-[9px] text-white/40 uppercase">Tipo</label>
          <select 
            className="bg-white/5 border border-white/10 text-mono text-xs p-1.5 outline-none rounded-sm"
            value={filterType} onChange={e => setFilterType(e.target.value)}
          >
            <option value="all">TODOS</option>
            {types.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-mono text-[9px] text-white/40 uppercase">Fase</label>
          <select 
            className="bg-white/5 border border-white/10 text-mono text-xs p-1.5 outline-none rounded-sm"
            value={filterPhase} onChange={e => setFilterPhase(e.target.value)}
          >
            <option value="all">TODAS</option>
            {phases.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-mono text-[9px] text-white/40 uppercase">Estado</label>
          <select 
            className="bg-white/5 border border-white/10 text-mono text-xs p-1.5 outline-none rounded-sm"
            value={filterStatus} onChange={e => setFilterStatus(e.target.value)}
          >
            <option value="all">TODOS</option>
            {statuses.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
        <div className="ml-auto flex items-end">
          <span className="text-mono text-xs text-white/40">{filteredAssets.length} resultados</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredAssets.map(asset => (
          <div key={asset.id} className="flex flex-col bg-white/5 border border-white/10 rounded-sm overflow-hidden group">
            <div className="aspect-video bg-[#111] border-b border-white/10 flex items-center justify-center relative p-2">
               {/* eslint-disable-next-line @next/next/no-img-element */}
               <img 
                  src={asset.previewPath} 
                  alt={asset.id}
                  className="max-w-full max-h-full object-contain"
                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                />
               <div className="absolute top-2 right-2 bg-black/80 backdrop-blur-sm px-2 py-0.5 rounded text-mono text-[9px] border border-white/10">
                 P. {asset.sourcePage}
               </div>
            </div>
            <div className="p-3 flex flex-col gap-3">
              <h4 className="text-mono text-[10px] text-white truncate" title={asset.id}>{asset.id}</h4>
              <div className="grid grid-cols-2 gap-2">
                <div className="flex flex-col gap-0.5">
                  <span className="text-mono text-[8px] text-white/40 uppercase">Tipo</span>
                  <span className="text-mono text-[9px]">{asset.type}</span>
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-mono text-[8px] text-white/40 uppercase">Fase</span>
                  <span className="text-mono text-[9px]">{asset.designPhase}</span>
                </div>
                <div className="flex flex-col gap-0.5 col-span-2">
                  <span className="text-mono text-[8px] text-white/40 uppercase">Estado</span>
                  <span className={`text-mono text-[9px] ${
                    asset.status === 'confirmed' ? 'text-green-500' :
                    asset.status === 'restricted' ? 'text-red-500' : 'text-amber-500'
                  }`}>
                    {asset.status.toUpperCase()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
