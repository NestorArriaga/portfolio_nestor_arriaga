"use client";

import { useSearchParams, useRouter } from 'next/navigation';
import { granularProjectData } from '@/content/cases/granular/granular-project';
import ChapterInspector from './ChapterInspector';
import PageInspector from './PageInspector';
import AssetInspector from './AssetInspector';
import ClaimInspector from './ClaimInspector';
import { useSafeMode } from '@/components/home/motion/SafeModeContext';
import Link from 'next/link';

export default function GranularLab() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const safeMode = useSafeMode();
  
  const currentView = searchParams.get('view') || 'chapters';

  const setView = (view: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('view', view);
    router.push(`/granular-lab?${params.toString()}`);
  };

  return (
    <div className={`min-h-screen bg-[#050505] text-white flex flex-col font-sans ${safeMode ? 'safe-mode' : ''}`}>
      
      {/* HEADER */}
      <header className="sticky top-0 z-50 bg-[#050505]/90 backdrop-blur border-b border-white/10 px-4 py-3 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-display-xs text-white">GRANULAR LAB</h1>
          <div className="text-mono text-[10px] text-white/50 uppercase tracking-widest mt-1">
            {granularProjectData.initiative} — {granularProjectData.totalSourcePages} PÁGINAS DETECTADAS
          </div>
        </div>
        
        {/* NAV TABS */}
        <nav className="flex gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide" aria-label="Modos de Laboratorio">
          <button 
            onClick={() => setView('chapters')}
            className={`px-4 py-2 rounded-full text-mono text-[10px] tracking-widest uppercase transition-colors whitespace-nowrap ${currentView === 'chapters' ? 'bg-white text-black' : 'bg-white/10 hover:bg-white/20'}`}
            aria-current={currentView === 'chapters'}
          >
            Capítulos
          </button>
          <button 
            onClick={() => setView('pages')}
            className={`px-4 py-2 rounded-full text-mono text-[10px] tracking-widest uppercase transition-colors whitespace-nowrap ${currentView === 'pages' ? 'bg-white text-black' : 'bg-white/10 hover:bg-white/20'}`}
            aria-current={currentView === 'pages'}
          >
            Páginas (21-40)
          </button>
          <button 
            onClick={() => setView('assets')}
            className={`px-4 py-2 rounded-full text-mono text-[10px] tracking-widest uppercase transition-colors whitespace-nowrap ${currentView === 'assets' ? 'bg-white text-black' : 'bg-white/10 hover:bg-white/20'}`}
            aria-current={currentView === 'assets'}
          >
            Assets
          </button>
          <button 
            onClick={() => setView('claims')}
            className={`px-4 py-2 rounded-full text-mono text-[10px] tracking-widest uppercase transition-colors whitespace-nowrap ${currentView === 'claims' ? 'bg-white text-black' : 'bg-white/10 hover:bg-white/20'}`}
            aria-current={currentView === 'claims'}
          >
            Claims & Cifras
          </button>
        </nav>
      </header>

      {/* CONTENT */}
      <main className="flex-1 p-4 md:p-8">
        {currentView === 'chapters' && <ChapterInspector />}
        {currentView === 'pages' && <PageInspector />}
        {currentView === 'assets' && <AssetInspector />}
        {currentView === 'claims' && <ClaimInspector />}
      </main>
      
      <footer className="border-t border-white/10 p-4 text-center">
        <Link href="/projects/granular-comarca-lagunera" className="text-mono text-[10px] text-white/50 hover:text-white uppercase tracking-widest underline underline-offset-4">
          VOLVER AL PLACEHOLDER PÚBLICO
        </Link>
      </footer>
    </div>
  );
}
