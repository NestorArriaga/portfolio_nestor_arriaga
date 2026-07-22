import Link from 'next/link';
import Image from 'next/image';
import Reveal from '../home/motion/Reveal';

interface TerritoryTransitionProps {
  currentFamilySummary: string;
  nextProject: {
    id: string;
    slug: string;
    title: string;
    territory: string;
    thumbnailUrl: string;
  };
}

export default function TerritoryTransition({ currentFamilySummary, nextProject }: TerritoryTransitionProps) {
  return (
    <section className="relative w-full min-h-screen bg-[#050505] flex flex-col justify-between overflow-hidden pt-32">
      
      {/* CIERRE DE LA FAMILIA ACTUAL (METZTITLÁN) */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12 w-full text-center mb-24">
        <Reveal direction="up">
          <div className="text-display-lg text-white mb-6">METZTITLÁN</div>
          <div className="flex justify-center gap-4 text-mono text-[10px] text-white/40 uppercase tracking-widest mb-12 flex-wrap">
            <span>RELIEVE</span>
            <span>•</span>
            <span>FORMA</span>
            <span>•</span>
            <span>PENDIENTE</span>
            <span>•</span>
            <span>ECOLOGÍA</span>
          </div>
          <p className="text-body-lg text-white/60 font-light leading-relaxed max-w-2xl mx-auto">
            {currentFamilySummary}
          </p>
        </Reveal>
      </div>

      {/* TRANSICIÓN AL SIGUIENTE TERRITORIO (AGUASCALIENTES) */}
      <div className="relative w-full h-[60vh] md:h-[70vh] flex items-end justify-center group">
        
        {/* IMAGEN DE APERTURA DEL SIGUIENTE TERRITORIO */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <Image 
            src={nextProject.thumbnailUrl} 
            alt={`Siguiente territorio: ${nextProject.territory}`} 
            fill 
            className="object-cover opacity-50 saturate-50 group-hover:saturate-100 group-hover:opacity-80 transition-all duration-1000 group-hover:scale-105"
            unoptimized 
          />
          {/* GRADIENTES PARA SUAVIZAR EL CORTE */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-transparent opacity-80"></div>
        </div>

        <div className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-12 pb-16 flex flex-col md:flex-row justify-between items-end gap-8">
          
          <Reveal direction="up" distance={32}>
            <div className="text-mono text-[10px] text-white/60 uppercase tracking-widest mb-4">SIGUIENTE TERRITORIO</div>
            <h3 className="text-display-md text-white mb-2">{nextProject.territory}</h3>
            <p className="text-body-lg text-white/80 max-w-xl">{nextProject.title}</p>
          </Reveal>

          <Reveal direction="left" delay={0.2} distance={32}>
            <Link 
              href={`/projects/${nextProject.slug}`}
              className="inline-flex items-center gap-4 text-label text-black bg-white px-8 py-4 rounded-full hover:bg-white/90 hover:scale-105 transition-all"
            >
              <span>PROYECTO {nextProject.id}</span>
              <span>→</span>
            </Link>
          </Reveal>

        </div>
      </div>

    </section>
  );
}
