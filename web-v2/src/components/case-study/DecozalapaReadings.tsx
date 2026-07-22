import Link from 'next/link';
import Image from 'next/image';
import Reveal from '../home/motion/Reveal';

interface Reading {
  id: string;
  slug: string;
  title: string;
  focus: string;
  thumbnail: string;
}

export default function DecozalapaReadings({ activeId, readings }: { activeId: string, readings: Reading[] }) {
  return (
    <section className="w-full bg-[#050505] py-32 border-t border-white/10">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        
        <Reveal direction="up" className="text-center mb-16">
          <h2 className="text-display-sm text-white mb-4">DECOZALAPA</h2>
          <div className="text-mono text-[10px] text-[var(--color-accent)] uppercase tracking-widest">
            TRES LECTURAS DEL MISMO TERRITORIO
          </div>
          <p className="text-body text-white/50 leading-relaxed max-w-2xl mx-auto mt-6">
            El portafolio expone tres análisis territoriales relacionados por la cuenca de Decozalapa, abordando su función ecológica, su aptitud y su uso de suelo.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          {readings.map((reading, idx) => {
            const isActive = reading.id === activeId;
            return (
              <Reveal key={reading.id} delay={idx * 0.1} direction="up" distance={16} className="h-full">
                <Link 
                  href={`/projects/${reading.slug}`} 
                  scroll={false} 
                  className={`group relative flex flex-col h-full border rounded-[var(--radius-panel)] p-6 md:p-8 transition-all duration-500 overflow-hidden ${
                    isActive 
                      ? 'border-[var(--color-accent)]/50 bg-[var(--color-accent)]/5' 
                      : 'border-white/10 hover:border-white/30 bg-white/5 hover:bg-white/10'
                  }`}
                >
                  <div className="relative w-full aspect-video rounded-[var(--radius-sm)] overflow-hidden mb-6 border border-white/5">
                    <Image 
                      src={reading.thumbnail} 
                      alt={reading.title} 
                      fill 
                      className={`object-cover transition-transform duration-700 ${!isActive && 'group-hover:scale-105'} ${isActive ? 'saturate-100' : 'saturate-50 opacity-60'}`} 
                      unoptimized 
                    />
                  </div>
                  
                  <div className={`text-mono text-[10px] mb-4 transition-colors ${isActive ? 'text-[var(--color-accent)]' : 'text-white/40 group-hover:text-white'}`}>
                    PROYECTO {reading.id}
                  </div>
                  <h3 className={`text-body-lg mb-2 transition-colors ${isActive ? 'text-white' : 'text-white/80 group-hover:text-[var(--color-accent)]'}`}>
                    {reading.title}
                  </h3>
                  <p className="text-label text-white/50 mt-auto pt-4">
                    {reading.focus}
                  </p>

                  {!isActive && (
                    <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity text-[10px] text-white tracking-widest uppercase">
                      Abrir ↗
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
