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
}

export default function MetztitlanFamilyOverview({ activeId, projects }: { activeId: string, projects: ProjectLink[] }) {
  return (
    <section className="w-full bg-[#050505] py-32 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        <Reveal direction="up" className="text-center mb-16">
          <h2 className="text-display-md text-white mb-4">METZTITLÁN</h2>
          <div className="text-mono text-[10px] text-white/50 uppercase tracking-widest">
            CUATRO LECTURAS DEL PAISAJE
          </div>
          <p className="text-body text-white/50 leading-relaxed max-w-2xl mx-auto mt-6">
            Los proyectos observan Metztitlán desde cuatro enfoques relacionados: formas del terreno, unidades ecológicas, intervalos de pendiente y selección de geomorfones representativos.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
          {projects.map((proj, idx) => {
            const isActive = proj.id === activeId;
            return (
              <Reveal key={proj.id} delay={idx * 0.1} direction="up" distance={16} className="h-full flex">
                <Link 
                  href={`/projects/${proj.slug}`} 
                  scroll={false} 
                  className={`group relative flex flex-col w-full h-full border rounded-[var(--radius-panel)] p-6 transition-all duration-500 overflow-hidden ${
                    isActive 
                      ? 'border-white/30 bg-white/5 shadow-[inset_0_2px_20px_rgba(255,255,255,0.02)]' 
                      : 'border-white/5 bg-transparent hover:border-white/20 hover:bg-white/5'
                  }`}
                  style={{ '--local-accent': proj.accent } as any}
                >
                  <div className="relative w-full aspect-square rounded-[var(--radius-sm)] overflow-hidden mb-6 border border-white/5">
                    <Image 
                      src={proj.thumbnail} 
                      alt={proj.title} 
                      fill 
                      className={`object-cover transition-transform duration-700 ${!isActive && 'group-hover:scale-105'} ${isActive ? 'saturate-100' : 'saturate-50 opacity-60 group-hover:opacity-100 group-hover:saturate-100'}`} 
                      unoptimized 
                    />
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

                  {!isActive && (
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
