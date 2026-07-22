import Link from 'next/link';

export default function ProjectsHeader({ 
  view, 
  resultCount 
}: { 
  view: 'gallery' | 'index',
  resultCount: number 
}) {
  return (
    <header className="w-full pt-12 pb-8 px-6 md:px-12 flex flex-col md:flex-row gap-8 justify-between items-start md:items-end border-b border-white/5">
      <div className="max-w-2xl">

        <h1 className="text-display-md text-white mb-4">PROYECTOS</h1>
        <p className="text-body-lg text-white/70">
          Una colección de cartografía, análisis espacial e investigación aplicada desarrollada en distintos territorios de México.
        </p>
      </div>

      <div className="flex flex-col items-start md:items-end gap-4 w-full md:w-auto">
        <div className="text-mono text-[10px] text-white/40">
          {resultCount} {resultCount === 1 ? 'ESTUDIO' : 'ESTUDIOS'}
        </div>
        
        {/* View Switcher */}
        <div className="flex border border-white/10 rounded-full p-1 bg-white/5">
          <Link 
            href="?view=gallery" 
            scroll={false}
            className={`px-4 py-1.5 rounded-full text-label transition-colors ${view === 'gallery' ? 'bg-white text-black' : 'text-white/60 hover:text-white'}`}
          >
            GALERÍA
          </Link>
          <Link 
            href="?view=index" 
            scroll={false}
            className={`px-4 py-1.5 rounded-full text-label transition-colors ${view === 'index' ? 'bg-white text-black' : 'text-white/60 hover:text-white'}`}
          >
            ÍNDICE
          </Link>
        </div>
      </div>
    </header>
  );
}
