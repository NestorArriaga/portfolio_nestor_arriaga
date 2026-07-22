"use client";

import { useRouter, useSearchParams } from 'next/navigation';
import { THEMES, TERRITORIES } from '@/content/project-gallery';

export default function ProjectFilters() {
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
  };

  const hasFilters = currentTerritory || currentTheme;

  return (
    <div className="hidden md:flex flex-col gap-6 w-64 shrink-0 pr-6 border-r border-white/5 sticky top-6 self-start max-h-[calc(100vh-3rem)] overflow-y-auto">
      
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
        <div className="flex flex-col gap-2">
          {TERRITORIES.map(t => (
            <button
              key={t}
              onClick={() => updateFilters('territory', currentTerritory === t ? null : t)}
              className={`text-left text-body text-sm transition-colors ${currentTerritory === t ? 'text-[var(--color-accent)]' : 'text-white/60 hover:text-white'}`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div>
        <div className="text-mono text-[10px] text-white/40 mb-3">TEMA</div>
        <div className="flex flex-col gap-2">
          {THEMES.map(theme => (
            <button
              key={theme}
              onClick={() => updateFilters('theme', currentTheme === theme ? null : theme)}
              className={`text-left text-body text-sm capitalize transition-colors ${currentTheme === theme ? 'text-white' : 'text-white/60 hover:text-white'}`}
            >
              {theme}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
