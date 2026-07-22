import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { galleryConfig } from '@/content/project-gallery';
import Project01Content from '@/components/projects/project-01/Project01Content';
import Project02Content from '@/components/projects/project-02/Project02Content';
import Project03Content from '@/components/projects/project-03/Project03Content';
import Project04Content from '@/components/projects/project-04/Project04Content';
import Project05Content from '@/components/projects/project-05/Project05Content';
import Project06Content from '@/components/projects/project-06/Project06Content';
import Project07Content from '@/components/projects/project-07/Project07Content';
import Project08Content from '@/components/projects/project-08/Project08Content';
import Project09Content from '@/components/projects/project-09/Project09Content';
import Project10Content from '@/components/projects/project-10/Project10Content';
import Project11Content from '@/components/projects/project-11/Project11Content';
import Project12Content from '@/components/projects/project-12/Project12Content';
import Project13Content from '@/components/projects/project-13/Project13Content';
import GranularCaseFoundation from '@/components/granular/GranularCaseFoundation';
import { SafeModeProvider } from '@/components/home/motion/SafeModeContext';

export async function generateStaticParams() {
  const contentDir = path.join(process.cwd(), 'src/content');
  try {
    const projects = JSON.parse(fs.readFileSync(path.join(contentDir, 'portfolio-projects.json'), 'utf8'));
    return projects.map((p: any) => ({
      slug: p.slug,
    }));
  } catch (e) {
    return [];
  }
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const contentDir = path.join(process.cwd(), 'src/content');
  let projects = [];
  try {
    projects = JSON.parse(fs.readFileSync(path.join(contentDir, 'portfolio-projects.json'), 'utf8'));
  } catch (e) {}

  const project = projects.find((p: any) => p.slug === params.slug);
  const galleryInfo = galleryConfig.find(p => p.slug === params.slug);

  if (!project) return { title: 'No encontrado' };

  return {
    title: `${project.title} | Néstor Arriaga`,
    description: galleryInfo?.summary || project.title
  };
}

export default async function ProjectPlaceholderPage({ params, searchParams }: { params: { slug: string }, searchParams: { from?: string, safeMode?: string } }) {
  const contentDir = path.join(process.cwd(), 'src/content');
  let projects = [];
  let assets = [];
  
  try {
    projects = JSON.parse(fs.readFileSync(path.join(contentDir, 'portfolio-projects.json'), 'utf8'));
    assets = JSON.parse(fs.readFileSync(path.join(contentDir, 'featured-assets.json'), 'utf8'));
  } catch (e) {
    // handled
  }

  const projectIndex = projects.findIndex((p: any) => p.slug === params.slug);
  if (projectIndex === -1) {
    notFound();
  }

  const project = projects[projectIndex];
  const galleryInfo = galleryConfig.find(p => p.slug === params.slug);
  const prevProject = projectIndex > 0 ? projects[projectIndex - 1] : null;
  const nextProject = projectIndex < projects.length - 1 ? projects[projectIndex + 1] : null;

  const projectAssets = assets.filter((a: any) => a.projectId === project.id);
  
  if (params.slug === 'areas-verdes-miguel-hidalgo') {
    return (
      <SafeModeProvider isSafeMode={searchParams.safeMode === '1'}>
        <Project01Content assets={assets} />
      </SafeModeProvider>
    );
  }
  
  if (params.slug === 'captura-carbono-decozalapa') {
    return (
      <SafeModeProvider isSafeMode={searchParams.safeMode === '1'}>
        <Project02Content assets={assets} />
      </SafeModeProvider>
    );
  }

  if (params.slug === 'zonas-optimas-limon-cafe') {
    return (
      <SafeModeProvider isSafeMode={searchParams.safeMode === '1'}>
        <Project03Content assets={assets} />
      </SafeModeProvider>
    );
  }

  if (params.slug === 'uso-optimo-suelo-limon-cafe') {
    return (
      <SafeModeProvider isSafeMode={searchParams.safeMode === '1'}>
        <Project04Content assets={assets} />
      </SafeModeProvider>
    );
  }

  if (params.slug === 'geomorfologia-metztitlan') {
    return (
      <SafeModeProvider isSafeMode={searchParams.safeMode === '1'}>
        <Project05Content assets={assets} />
      </SafeModeProvider>
    );
  }

  if (params.slug === 'zonas-ecologicas-metztitlan') {
    return (
      <SafeModeProvider isSafeMode={searchParams.safeMode === '1'}>
        <Project06Content assets={assets} />
      </SafeModeProvider>
    );
  }

  if (params.slug === 'pendiente-metztitlan') {
    return (
      <SafeModeProvider isSafeMode={searchParams.safeMode === '1'}>
        <Project07Content assets={assets} />
      </SafeModeProvider>
    );
  }

  if (params.slug === 'geomorfones-representativos') {
    return (
      <SafeModeProvider isSafeMode={searchParams.safeMode === '1'}>
        <Project08Content assets={assets} />
      </SafeModeProvider>
    );
  }

  if (params.slug === 'vocaciones-productivas-aguascalientes') {
    return (
      <SafeModeProvider isSafeMode={searchParams.safeMode === '1'}>
        <Project09Content assets={assets} />
      </SafeModeProvider>
    );
  }

  if (params.slug === 'aptitud-conservacion-aguascalientes') {
    return (
      <SafeModeProvider isSafeMode={searchParams.safeMode === '1'}>
        <Project10Content assets={assets} />
      </SafeModeProvider>
    );
  }

  if (params.slug === 'aptitud-agricola-aguascalientes') {
    return (
      <SafeModeProvider isSafeMode={searchParams.safeMode === '1'}>
        <Project11Content assets={assets} />
      </SafeModeProvider>
    );
  }

  if (params.slug === 'degradacion-suelo-calvillo') {
    return (
      <SafeModeProvider isSafeMode={searchParams.safeMode === '1'}>
        <Project12Content assets={assets} />
      </SafeModeProvider>
    );
  }

  if (params.slug === 'subcuencas-rios-calvillo') {
    return (
      <SafeModeProvider isSafeMode={searchParams.safeMode === '1'}>
        <Project13Content assets={assets} />
      </SafeModeProvider>
    );
  }

  if (params.slug === 'granular-comarca-lagunera') {
    return <GranularCaseFoundation isSafeMode={searchParams.safeMode === '1'} />;
  }

  const heroAsset = projectAssets.find((a: any) => a.role === 'hero-candidate') || projectAssets[0];
  const mainImageSrc = heroAsset?.variants?.heroWide || heroAsset?.variants?.gallery || heroAsset?.variants?.originalClean || '/portfolio-media/curated/identity/identity-relief-hero-wide-original-clean.webp';
  
  // URL de regreso
  const backUrl = searchParams.from === 'home' ? '/?project=' + project.id : '/projects';

  return (
    <SafeModeProvider isSafeMode={searchParams.safeMode === '1'}>
      <main className="min-h-screen bg-[var(--color-black)] text-white flex flex-col relative overflow-x-hidden pt-24 md:pt-32 px-6 md:px-12 pb-24">
      
      {/* Header Contextual */}
      <div className="max-w-4xl mx-auto w-full mb-12">
        <Link href={backUrl} className="text-mono text-[10px] text-white/50 hover:text-white transition-colors flex items-center gap-2 mb-12">
          <span>← VOLVER A {searchParams.from === 'home' ? 'PORTADA' : 'PROYECTOS'}</span>
        </Link>
        <div className="text-mono text-sm text-[var(--color-accent)] mb-4">PROYECTO {project.id}</div>
        <h1 className="text-display-lg leading-[0.9] mb-8">{project.title}</h1>
        
        <div className="flex flex-wrap gap-8 text-label text-white/50 uppercase tracking-widest mb-16">
          <div>TERRITORIO: {project.territory}</div>
          <div>PÁGINAS: {project.pages.length}</div>
          {galleryInfo && <div>TEMAS: {galleryInfo.themes.join(', ')}</div>}
        </div>
      </div>

      {/* Imagen Principal */}
      <div className="max-w-6xl mx-auto w-full mb-16">
        <div className="relative w-full aspect-[21/9] bg-white/5 border border-white/10 rounded-[var(--radius-panel)] overflow-hidden">
          <Image src={mainImageSrc} alt={project.title} fill className="object-cover" unoptimized priority />
        </div>
      </div>

      <div className="max-w-4xl mx-auto w-full flex justify-center mb-32">
        <div className="border border-[var(--color-accent)] text-[var(--color-accent)] px-6 py-3 rounded text-label tracking-widest bg-[var(--color-accent)]/5">
          CASO DE ESTUDIO EN CONSTRUCCIÓN
        </div>
      </div>

      {/* Navegación Inferior */}
      <div className="max-w-6xl mx-auto w-full border-t border-white/10 pt-12 flex justify-between">
        {prevProject ? (
          <Link href={`/projects/${prevProject.slug}`} className="group flex flex-col items-start gap-2 max-w-[40%]">
            <span className="text-mono text-[10px] text-white/40 group-hover:text-[var(--color-accent)] transition-colors">← ANTERIOR</span>
            <span className="text-body text-white/80 line-clamp-2">{prevProject.title}</span>
          </Link>
        ) : <div></div>}
        
        {nextProject ? (
          <Link href={`/projects/${nextProject.slug}`} className="group flex flex-col items-end gap-2 text-right max-w-[40%]">
            <span className="text-mono text-[10px] text-white/40 group-hover:text-[var(--color-accent)] transition-colors">SIGUIENTE →</span>
            <span className="text-body text-white/80 line-clamp-2">{nextProject.title}</span>
          </Link>
        ) : <div></div>}
      </div>

      </main>
    </SafeModeProvider>
  );
}
