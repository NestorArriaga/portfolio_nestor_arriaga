import { homeData } from '@/content/homepage';
import fs from 'fs';
import path from 'path';

import GlobalHeader from '@/components/global/GlobalHeader';
import AnimatedHeroIdentity from '@/components/home/motion/AnimatedHeroIdentity';
import AnimatedHeroScene from '@/components/home/motion/AnimatedHeroScene';
import ProjectSelector from '@/components/home/ProjectSelector';
import MiniGallery from '@/components/home/MiniGallery';
import TerritoryIndex from '@/components/home/TerritoryIndex';
import ProfilePreview from '@/components/home/ProfilePreview';
import PortfolioClosing from '@/components/global/PortfolioClosing';
import { SafeModeProvider } from '@/components/home/motion/SafeModeContext';

export default async function HomePage({ searchParams }: { searchParams: { project?: string, safeMode?: string } }) {
  // SSR Data Loading
  const contentDir = path.join(process.cwd(), 'src/content');
  let assets = [];
  try {
    assets = JSON.parse(fs.readFileSync(path.join(contentDir, 'featured-assets.json'), 'utf8'));
  } catch (e) {
    // Fallback if missing
  }

  // Determine active project
  const requestedId = searchParams.project;
  const isSafeMode = searchParams.safeMode === '1';

  let activeProject = homeData.featuredProjects.find(p => p.id === requestedId);
  if (!activeProject) {
    activeProject = homeData.featuredProjects.find(p => p.id === '14'); // Default GRANULAR
  }

  const defaultTexture = "/portfolio-media/curated/identity/identity-relief-hero-wide-original-clean.webp";

  return (
    <SafeModeProvider isSafeMode={isSafeMode}>
      <main className="min-h-screen bg-[var(--color-black)] selection:bg-[var(--color-accent)] selection:text-black overflow-x-hidden relative" id="top">
      
      {/* 
        ========================================
        ZONA 1: VIEWPORT PRINCIPAL (100svh)
        ========================================
      */}
      <div className="relative w-full min-h-[100svh] flex flex-col md:p-6 lg:p-8">
        <GlobalHeader />
        
        {/* Core Layout para Escritorio/Móvil */}
        <div className="flex-1 relative w-full h-full flex rounded-[var(--radius-panel)] md:border border-white/5 overflow-hidden bg-[var(--color-black)]">
          
          <AnimatedHeroIdentity profile={homeData.profile} />
          
          {activeProject && (
            <AnimatedHeroScene 
              activeProject={activeProject} 
              assets={assets} 
              defaultTexture={defaultTexture} 
            />
          )}

          <ProjectSelector 
            projects={homeData.featuredProjects} 
            activeId={activeProject?.id || '14'} 
            assets={assets} 
          />
          
          <MiniGallery 
            items={homeData.microGallery} 
            assets={assets} 
          />

        </div>
      </div>

      {/* 
        ========================================
        ZONA 2: ÍNDICE DE TERRITORIOS
        ========================================
      */}
      <TerritoryIndex territories={homeData.territories} />

      {/* 
        ========================================
        ZONA 3: PERFIL
        ========================================
      */}
      <ProfilePreview profile={homeData.profile} />

      {/* 
        ========================================
        ZONA 4: CIERRE TÉCNICO
        ========================================
      */}
      <div className="mt-32">
        <PortfolioClosing variant="compact" />
      </div>

      </main>
    </SafeModeProvider>
  );
}
