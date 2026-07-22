import Link from 'next/link';
import Image from 'next/image';
import Reveal from '../home/motion/Reveal';

interface ProjectLink {
  id: string;
  slug: string;
  title: string;
  focus: string;
  thumbnail: string;
  accent: string;
  isPlaceholder?: boolean;
}

export default function AguascalientesFamilyOverview({ activeId, projects }: { activeId: string, projects: ProjectLink[] }) {
  return (
    <section className="w-full bg-[#050505] py-32 border-t border-white/10 relative overflow-hidden">
      
      {/* FONDO SUTIL PARA AMBIENTACIÓN TERRITORIAL */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none">
        <Image src="/portfolio-media/curated/territories/territory-aguascalientes-calvillo-photo-landscape.webp" alt="" fill className="object-cover" unoptimized />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        <Reveal direction="up" className="text-center mb-16">
          <h2 className="text-display-md text-white mb-4">AGUASCALIENTES</h2>
          <div className="text-mono text-[10px] text-white/50 uppercase tracking-widest">
            CINCO LECTURAS DEL TERRITORIO
          </div>
          <p className="text-body text-white/50 leading-relaxed max-w-2xl mx-auto mt-6">
            Los proyectos exploran Aguascalientes desde la vocación productiva, la aptitud territorial, la degradación del suelo y la organización hidrológica.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 text-left">
          {projects.map((proj, idx) => {
            const isActive = proj.id === activeId;
            return (
              <Reveal key={proj.id} delay={idx * 0.1} direction="up" distance={16} className={`h-full flex ${proj.isPlaceholder ? 'opacity-70 grayscale-[50%]' : ''}`}>
                <Link 
                  href={`/projects/${proj.slug}`} 
                  scroll={false} 
                  className={`group relative flex flex-col w-full h-full border rounded-[var(--radius-panel)] p-6 transition-all duration-500 overflow-hidden ${
                    isActive 
                      ? 'border-white/30 bg-white/5 shadow-[inset_0_2px_20px_rgba(255,255,255,0.02)]' 
                      : 'border-white/5 bg-transparent hover:border-white/20 hover:bg-white/5'
                  }`}
                  style={{ '--local-accent': proj.accent } as any}
                  aria-disabled={proj.isPlaceholder}
                  onClick={(e) => {
                    if (proj.isPlaceholder) {
                      e.preventDefault(); // Just in case, though placeholders link to current page or do nothing if needed
                    }
                  }}
                >
                  <div className="relative w-full aspect-square rounded-[var(--radius-sm)] overflow-hidden mb-6 border border-white/5">
                    <Image 
                      src={proj.thumbnail} 
                      alt={proj.title} 
                      fill 
                      className={`object-cover transition-transform duration-700 ${!isActive && !proj.isPlaceholder && 'group-hover:scale-105'} ${isActive ? 'saturate-100' : 'saturate-50 opacity-60 group-hover:opacity-100 group-hover:saturate-100'}`} 
                      unoptimized 
                    />
                    {proj.isPlaceholder && (
                      <div className="absolute inset-0 bg-[#050505]/60 flex items-center justify-center">
                        <span className="text-[10px] text-mono text-white/50 uppercase tracking-widest text-center px-4">Caso en construcción</span>
                      </div>
                    )}
                  </div>
                  
                  <div className={`text-mono text-[10px] mb-3 transition-colors ${isActive ? 'text-[var(--local-accent)] font-bold' : 'text-white/40 group-hover:text-[var(--local-accent)]'}`}>
                    PROYECTO {proj.id}
                  </div>
                  <h3 className={`text-body font-bold mb-2 transition-colors ${isActive ? 'text-white' : 'text-white/70 group-hover:text-white'}`}>
                    {proj.title}
                  </h3>
                  <p className="text-label text-white/50 mt-auto pt-4 leading-relaxed">
                    {proj.focus}
                  </p>

                  {!isActive && !proj.isPlaceholder && (
                    <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity text-[10px] text-white tracking-widest uppercase">
                      ↗
                    </div>
                  )}
                </Link>
              </Reveal>
            );
          })}
        </div>

      </div>
    </section>
  );
}
