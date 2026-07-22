import Link from 'next/link';
import Image from 'next/image';

interface NextProjectProps {
  nextProject: {
    slug: string;
    id: string;
    title: string;
    territory: string;
    thumbnailUrl: string;
  };
}

export default function NextProject({ nextProject }: NextProjectProps) {
  return (
    <Link 
      href={`/projects/${nextProject.slug}`} 
      className="group block w-full border-t border-white/10 hover:border-white/20 transition-colors bg-[#080808] hover:bg-[#0a0a0a] relative overflow-hidden"
    >
      {/* Imagen de fondo sutil en hover */}
      <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-10 transition-opacity duration-700">
        <Image src={nextProject.thumbnailUrl} alt="" fill className="object-cover blur-sm saturate-0" unoptimized />
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-32 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
        <div>
          <div className="text-mono text-[10px] text-white/40 group-hover:text-white transition-colors uppercase tracking-widest mb-4">SIGUIENTE PROYECTO / {nextProject.territory}</div>
          <h2 className="text-display-md text-white/50 group-hover:text-[var(--color-accent)] transition-colors mb-2">0{nextProject.id} {nextProject.title}</h2>
        </div>
        
        <div className="hidden md:block w-32 h-32 relative rounded-full overflow-hidden border border-white/10 group-hover:border-white/30 transition-colors grayscale group-hover:grayscale-0">
          <Image src={nextProject.thumbnailUrl} alt={nextProject.title} fill className="object-cover group-hover:scale-110 transition-transform duration-700" unoptimized />
        </div>
      </div>
    </Link>
  );
}
