'use client';

import React, { useState, useMemo } from 'react';
import { siteAtlas } from '@/content/site/site-atlas';
import AtlasProjectCard from './AtlasProjectCard';
import Reveal from '../home/motion/Reveal';

export default function AtlasView() {
  const [search, setSearch] = useState('');
  const [filterTerritory, setFilterTerritory] = useState('all');
  const [filterScale, setFilterScale] = useState('all');

  const filteredProjects = useMemo(() => {
    let result = siteAtlas.projects;
    
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(p => 
        p.title.toLowerCase().includes(q) || 
        p.territory.toLowerCase().includes(q) || 
        p.themes.some(t => t.toLowerCase().includes(q)) ||
        p.methods.some(m => m.toLowerCase().includes(q)) ||
        p.id.includes(q)
      );
    }
    
    if (filterTerritory !== 'all') {
      result = result.filter(p => p.territoryGroup === filterTerritory);
    }
    
    if (filterScale !== 'all') {
      result = result.filter(p => p.scale === filterScale);
    }

    return result;
  }, [search, filterTerritory, filterScale]);

  return (
    <div className="w-full flex flex-col min-h-screen pt-32 px-6 md:px-12">
      <Reveal direction="up" distance={32}>
        <div className="mb-12 md:mb-24">
          <h1 className="text-display-lg text-white tracking-tighter mb-4">{siteAtlas.title}</h1>
          <p className="text-body text-[var(--color-text-muted)] max-w-xl whitespace-pre-line">
            {siteAtlas.subtitle}
          </p>
        </div>
      </Reveal>

      <div className="flex flex-col md:flex-row gap-8 items-start justify-between mb-16 relative z-20">
        <div className="w-full md:w-1/3">
          <input 
            type="text" 
            placeholder="Buscar por título, territorio, tema..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-transparent border-b border-white/20 text-white py-2 focus:outline-none focus:border-accent text-body"
            aria-label="Buscar proyectos"
          />
        </div>
        
        <div className="flex flex-wrap gap-4 text-label">
          <select 
            value={filterTerritory}
            onChange={(e) => setFilterTerritory(e.target.value)}
            className="bg-transparent text-white/70 border-b border-white/20 py-2 focus:outline-none focus:border-accent cursor-pointer"
            aria-label="Filtrar por territorio"
          >
            <option value="all" className="bg-black text-white">Todos los territorios</option>
            {siteAtlas.territoryGroups.map(tg => (
              <option key={tg.id} value={tg.name} className="bg-black text-white">{tg.name}</option>
            ))}
          </select>

          <select 
            value={filterScale}
            onChange={(e) => setFilterScale(e.target.value)}
            className="bg-transparent text-white/70 border-b border-white/20 py-2 focus:outline-none focus:border-accent cursor-pointer"
            aria-label="Filtrar por escala"
          >
            <option value="all" className="bg-black text-white">Todas las escalas</option>
            <option value="sitio" className="bg-black text-white">Sitio</option>
            <option value="parque" className="bg-black text-white">Parque</option>
            <option value="alcaldía" className="bg-black text-white">Alcaldía</option>
            <option value="cuenca" className="bg-black text-white">Cuenca</option>
            <option value="reserva" className="bg-black text-white">Reserva</option>
            <option value="municipio" className="bg-black text-white">Municipio</option>
            <option value="estado" className="bg-black text-white">Estado</option>
            <option value="multiescalar" className="bg-black text-white">Multiescalar</option>
          </select>
        </div>
      </div>

      <div className="flex-1 w-full relative z-10">
        <div className="text-label text-[var(--color-text-faint)] mb-8">
          MOSTRANDO {filteredProjects.length} PROYECTO{filteredProjects.length !== 1 ? 'S' : ''}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-12">
          {filteredProjects.map((project, index) => (
            <Reveal key={project.id} delay={Math.min(index * 0.05, 0.5)} direction="up" distance={24}>
              <AtlasProjectCard project={project} />
            </Reveal>
          ))}
        </div>
        
        {filteredProjects.length === 0 && (
          <div className="py-24 text-center text-body text-white/40">
            No se encontraron proyectos con los filtros actuales.
            <div className="mt-4">
              <button 
                onClick={() => { setSearch(''); setFilterTerritory('all'); setFilterScale('all'); }}
                className="text-accent hover:text-white transition-colors underline"
              >
                Limpiar filtros
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
