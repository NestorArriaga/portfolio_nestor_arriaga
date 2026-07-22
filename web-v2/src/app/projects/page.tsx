import { Metadata } from 'next';
import path from 'path';
import fs from 'fs';

import { galleryConfig } from '@/content/project-gallery';
import ProjectsHeader from '@/components/projects/ProjectsHeader';
import ProjectFilters from '@/components/projects/ProjectFilters';
import FilterMobilePanel from '@/components/projects/FilterMobilePanel';
import EditorialGallery from '@/components/projects/EditorialGallery';
import ProjectIndex from '@/components/projects/ProjectIndex';
import PortfolioClosing from '@/components/global/PortfolioClosing';
import GlobalHeader from '@/components/global/GlobalHeader';
import { SafeModeProvider } from '@/components/home/motion/SafeModeContext';
import Reveal from '@/components/home/motion/Reveal';

export const metadata: Metadata = {
  title: 'Proyectos | Néstor Arriaga',
  description: 'Cartografía, análisis territorial, recursos naturales e investigación aplicada en distintos territorios de México.',
};

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: { view?: string; territory?: string; theme?: string; safeMode?: string };
}) {
  // SSR Data Loading for Assets
  const contentDir = path.join(process.cwd(), 'src/content');
  let assets = [];
  try {
    const assetsData = fs.readFileSync(path.join(contentDir, 'portfolio-assets.json'), 'utf8');
    assets = JSON.parse(assetsData);
  } catch (e) {
    console.error("Error loading assets:", e);
  }

  // Parse Query Params
  const view = (searchParams.view === 'index') ? 'index' : 'gallery';
  const isSafeMode = searchParams.safeMode === '1';
  const filterTerritory = searchParams.territory;
  const filterTheme = searchParams.theme;

  // Filter Projects
  let filteredProjects = [...galleryConfig];
  if (filterTerritory) {
    filteredProjects = filteredProjects.filter(p => p.themes.includes(filterTerritory));
  }
  if (filterTheme) {
    filteredProjects = filteredProjects.filter(p => p.themes.includes(filterTheme));
  }

  // Sort by priority for gallery view
  if (view === 'gallery') {
    filteredProjects.sort((a, b) => a.priority - b.priority);
  }

  return (
    <SafeModeProvider isSafeMode={isSafeMode}>
      <main className="min-h-screen bg-[var(--color-black)] selection:bg-[var(--color-accent)] selection:text-black overflow-x-hidden relative" id="top">
        <GlobalHeader />
        <div className="pt-24">
          <ProjectsHeader view={view} resultCount={filteredProjects.length} />
        </div>

        <div className="max-w-[1600px] mx-auto px-6 md:px-12 py-8 flex flex-col md:flex-row gap-8 relative min-h-[60vh]">
          
          {/* Panel móvil (arriba) */}
          <FilterMobilePanel />

          {/* Panel lateral (escritorio) */}
          <ProjectFilters />

          {/* Contenido Principal */}
          {view === 'gallery' ? (
            <EditorialGallery projects={filteredProjects} assets={assets} />
          ) : (
            <ProjectIndex projects={filteredProjects} assets={assets} />
          )}

        </div>

        <div className="mt-32">
          <PortfolioClosing variant="compact" />
        </div>

      </main>
    </SafeModeProvider>
  );
}
