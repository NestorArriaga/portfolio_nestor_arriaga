import Link from 'next/link';
import Image from 'next/image';

interface CaseNavigationProps {
  currentProjectNumber: string;
  currentProjectTitle: string;
  nextProject: {
    slug: string;
    id: string;
    title: string;
    territory: string;
    thumbnailUrl: string;
  };
}

export default function CaseNavigation({ currentProjectNumber, currentProjectTitle, nextProject }: CaseNavigationProps) {
  return (
    <div className="w-full bg-[#050505] border-t border-white/5 relative z-10">
      
      {/* Cierre del Caso Actual */}
      <div className="max-w-4xl mx-auto px-6 md:px-12 py-24 text-center">
        <div className="text-mono text-[10px] text-[var(--color-accent)] mb-4 uppercase tracking-widest">PROYECTO {currentProjectNumber}</div>
        <h2 className="text-display-md text-white mb-12">{currentProjectTitle}</h2>
        <div className="flex flex-wrap justify-center gap-8 text-label text-white/50">
          <Link href="/projects" className="hover:text-white transition-colors">VOLVER A GALERÍA</Link>
          <a href="/Portafolio_pliego.pdf" target="_blank" rel="noreferrer" className="hover:text-[var(--color-accent)] transition-colors">VER EN PORTAFOLIO ORIGINAL PDF ↗</a>
        </div>
      </div>

      {/* Siguiente Proyecto (Link Gigante) */}
      <Link 
        href={`/projects/${nextProject.slug}`} 
        className="group block w-full border-t border-white/10 hover:border-white/20 transition-colors bg-[#080808] hover:bg-[#0a0a0a] relative overflow-hidden"
      >
        {/* Imagen de fondo sutil en hover */}
        <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-10 transition-opacity duration-700">
          <Image src={nextProject.thumbnailUrl} alt="" fill className="object-cover blur-sm saturate-0" unoptimized />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-32 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div className="flex flex-col gap-4 max-w-2xl">
            <div className="text-mono text-[10px] text-white/40 group-hover:text-[var(--color-accent)] transition-colors uppercase tracking-widest flex items-center gap-4">
              <span>SIGUIENTE PROYECTO</span>
              <div className="w-12 h-px bg-current"></div>
            </div>
            <h3 className="text-display-md md:text-display-lg text-white group-hover:text-white transition-colors leading-[0.9]">{nextProject.title}</h3>
            <div className="text-label text-white/50">{nextProject.territory}</div>
          </div>
          
          <div className="flex items-center gap-6 shrink-0">
            <div className="text-mono text-[10px] text-white/30 group-hover:text-white/80 transition-colors">PROYECTO {nextProject.id}</div>
            <div className="w-16 h-16 rounded-full border border-white/10 group-hover:border-[var(--color-accent)] flex items-center justify-center text-white/40 group-hover:text-[var(--color-accent)] transition-all group-hover:translate-x-2">
              →
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
