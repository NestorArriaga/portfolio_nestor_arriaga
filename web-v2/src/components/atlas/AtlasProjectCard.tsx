import React from 'react';
import Link from 'next/link';

interface AtlasProjectCardProps {
  project: {
    id: string;
    title: string;
    shortTitle: string;
    route: string;
    territory: string;
    scale: string;
    themes: string[];
    status: string;
  };
}

export default function AtlasProjectCard({ project }: AtlasProjectCardProps) {
  return (
    <Link href={project.route} className="block group">
      <div className="w-full aspect-[4/3] bg-[var(--color-surface)] border border-white/10 rounded-[var(--radius-sm)] mb-4 overflow-hidden relative">
        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10" />
        {/* Usamos una capa de fondo simulada por ahora o un fallback a una textura */}
        <div className="absolute inset-0 bg-black flex items-center justify-center pointer-events-none opacity-50">
          <div className="text-display-lg text-white/10">{project.id}</div>
        </div>
      </div>
      
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-label text-[var(--color-text-faint)] mb-2 flex items-center gap-2">
            <span>{project.id}</span>
            <span className="w-1 h-1 rounded-full bg-white/20"></span>
            <span>{project.scale.toUpperCase()}</span>
          </div>
          <h3 className="text-body text-white group-hover:text-accent transition-colors mb-2 leading-tight">
            {project.shortTitle}
          </h3>
          <div className="text-caption text-white/50 line-clamp-2">
            {project.themes.slice(0, 2).join(', ')}
          </div>
        </div>
      </div>
    </Link>
  );
}
