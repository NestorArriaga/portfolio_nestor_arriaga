import { ProjectGalleryConfig } from '@/content/project-gallery';
import ProjectIndexRow from './ProjectIndexRow';

export default function ProjectIndex({ 
  projects, 
  assets 
}: { 
  projects: ProjectGalleryConfig[], 
  assets: any[] 
}) {
  if (projects.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center py-32 px-6 border border-white/5 rounded-[var(--radius-panel)]">
        <div className="text-mono text-[10px] text-[var(--color-accent)] mb-4">0 RESULTADOS</div>
        <h2 className="text-heading text-white text-center mb-2">NO HAY PROYECTOS CON ESTA COMBINACIÓN.</h2>
        <p className="text-body text-white/50 text-center">Intenta limpiar los filtros o seleccionar otra categoría.</p>
      </div>
    );
  }

  // En la vista de Índice forzamos el orden por ID
  const sortedProjects = [...projects].sort((a, b) => parseInt(a.id) - parseInt(b.id));

  return (
    <div className="flex-1 w-full max-w-5xl mx-auto flex flex-col pt-4">
      <div className="hidden md:flex items-center justify-between py-4 border-b border-white/20 text-mono text-[10px] text-white/40">
        <div className="flex items-center gap-6">
          <div className="w-6">Nº</div>
          <div className="w-16">VISTA</div>
          <div>PROYECTO</div>
        </div>
        <div className="w-48 text-right">CONTEXTO / TERRITORIO</div>
      </div>

      <div className="flex flex-col">
        {sortedProjects.map((project) => {
          const asset = assets.find(a => a.id === project.featuredAssetId);
          return (
            <ProjectIndexRow 
              key={project.id} 
              config={project} 
              asset={asset} 
            />
          );
        })}
      </div>
    </div>
  );
}
