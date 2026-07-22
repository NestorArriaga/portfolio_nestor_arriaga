import Link from 'next/link';

export default function ActiveProjectInfo({ project }: { project: any }) {
  return (
    <div className="max-w-md bg-[var(--color-black)]/60 backdrop-blur-md p-6 rounded-[var(--radius-md)] border border-white/10">
      <div className="flex items-center gap-3 mb-4">
        <span className="text-mono text-sm" style={{ color: project.accent || 'var(--color-accent)' }}>{project.id} / 15</span>
        <span className="text-label text-[var(--color-white)] tracking-wider px-2 py-1 bg-white/5 border border-white/10 rounded">{project.shortTitle || project.title}</span>
      </div>
      
      <h2 className="text-heading text-white mb-2 leading-tight">
        {project.title}
      </h2>
      
      {project.subtitle && (
        <p className="text-body text-[var(--color-text-muted)] mb-4 leading-relaxed">
          {project.subtitle}
        </p>
      )}

      {project.description && (
        <p className="text-caption text-white/60 mb-6 border-l-2 pl-3" style={{ borderColor: project.accent || 'var(--color-accent)' }}>
          {project.description}
        </p>
      )}
      
      <Link href={`/projects/${project.slug}`} className="inline-block border text-mono text-xs px-6 py-3 hover:bg-white hover:text-black transition-colors rounded-[var(--radius-sm)]" style={{ borderColor: project.accent || 'var(--color-line-strong)', color: project.accent || 'var(--color-white)' }}>
        EXPLORAR PROYECTO
      </Link>
    </div>
  );
}
