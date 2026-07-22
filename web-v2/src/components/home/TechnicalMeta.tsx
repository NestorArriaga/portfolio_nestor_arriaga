export default function TechnicalMeta({ project }: { project: any }) {
  return (
    <div className="hidden md:flex flex-col items-end text-right gap-2">
      <div className="text-mono text-[10px] text-[var(--color-text-faint)]">TERRITORIO</div>
      <div className="text-label text-[var(--color-white)] mb-4">{project.territory}</div>

      <div className="text-mono text-[10px] text-[var(--color-text-faint)]">CATEGORÍA</div>
      <div className="text-label text-[var(--color-white)] mb-4">{project.category || 'ANÁLISIS ESPACIAL'}</div>

      {project.pagesRelated && (
        <>
          <div className="text-mono text-[10px] text-[var(--color-text-faint)]">PÁGINAS PDF</div>
          <div className="text-mono text-[10px] text-[var(--color-white)] mb-4">{project.pagesRelated}</div>
        </>
      )}

      <div className="mt-8 flex flex-col items-center gap-2 opacity-50">
        <div className="h-12 w-[1px] bg-white/30"></div>
        <div className="text-mono text-[8px] tracking-widest rotate-180" style={{ writingMode: 'vertical-rl' }}>DESPLAZA PARA EXPLORAR</div>
      </div>
    </div>
  );
}
