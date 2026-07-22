"use client";

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { THEMES, TERRITORIES } from '@/content/project-gallery';

export default function FilterMobilePanel() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const currentTerritory = searchParams.get('territory');
  const currentTheme = searchParams.get('theme');
  const view = searchParams.get('view') || 'gallery';
  const safeMode = searchParams.get('safeMode');

  const updateFilters = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`?${params.toString()}`, { scroll: false });
  };

  const clearFilters = () => {
    const params = new URLSearchParams();
    params.set('view', view);
    if (safeMode) params.set('safeMode', safeMode);
    router.push(`?${params.toString()}`, { scroll: false });
    setIsOpen(false);
  };

  const hasFilters = currentTerritory || currentTheme;

  return (
    <div className="md:hidden w-full mb-6">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-3 px-4 flex justify-between items-center border border-white/10 bg-white/5 rounded-full text-label text-white"
      >
        <span>{isOpen ? 'CERRAR FILTROS' : 'FILTRAR PROYECTOS'}</span>
        {hasFilters && !isOpen && <span className="text-[var(--color-accent)]">•</span>}
      </button>

      {isOpen && (
        <div className="mt-4 p-4 border border-white/10 bg-[var(--color-black-elevated)] rounded-[var(--radius-panel)] flex flex-col gap-6">
          {hasFilters && (
            <button 
              onClick={clearFilters}
              className="text-label text-[var(--color-accent)] hover:text-white transition-colors text-left"
            >
              ✕ LIMPIAR FILTROS
            </button>
          )}

          <div>
            <div className="text-mono text-[10px] text-white/40 mb-3">TERRITORIO</div>
            <div className="flex flex-wrap gap-2">
              {TERRITORIES.map(t => (
                <button
                  key={t}
                  onClick={() => updateFilters('territory', currentTerritory === t ? null : t)}
                  className={`px-3 py-1.5 rounded-full text-body text-sm transition-colors border ${currentTerritory === t ? 'border-[var(--color-accent)] text-[var(--color-accent)]' : 'border-white/10 text-white/60 hover:text-white'}`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="text-mono text-[10px] text-white/40 mb-3">TEMA</div>
            <div className="flex flex-wrap gap-2">
              {THEMES.map(theme => (
                <button
                  key={theme}
                  onClick={() => updateFilters('theme', currentTheme === theme ? null : theme)}
                  className={`px-3 py-1.5 rounded-full text-body text-sm capitalize transition-colors border ${currentTheme === theme ? 'border-white text-white' : 'border-white/10 text-white/60 hover:text-white'}`}
                >
                  {theme}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
