import Link from 'next/link';
import Reveal from '../home/motion/Reveal';

export default function GranularTransitionPreview() {
  return (
    <section className="w-full bg-[#050505] pt-32 pb-48 relative overflow-hidden">
      
      {/* GRADIENTE DE TRANSICIÓN HACIA GRANULAR (MAGENTA/TURQUESA SUTIL) */}
      <div className="absolute inset-0 z-0">
        <div className="absolute bottom-0 w-full h-[500px] bg-gradient-to-t from-[#2a1332] via-[#0b1f2e] to-transparent opacity-20 pointer-events-none"></div>
      </div>

      <div className="max-w-4xl mx-auto px-6 md:px-12 relative z-10 text-center">
        
        <Reveal direction="up">
          <div className="text-mono text-[10px] text-white/50 tracking-widest uppercase mb-8">
            DE LA LECTURA LOCAL AL SISTEMA REGIONAL
          </div>
          <h2 className="text-display-md text-white mb-8">
            PRÓXIMAMENTE: LA COMARCA LAGUNERA
          </h2>
          <p className="text-body-lg text-white/70 leading-relaxed font-light mb-16">
            El siguiente proyecto amplía la escala hacia la Comarca Lagunera y reúne agua, agricultura, gobernanza, socioeconomía, ambiente y conectividad dentro de un análisis territorial multiescalar.
          </p>
        </Reveal>

        <Reveal direction="up" distance={32} delay={0.1}>
          <Link 
            href="/projects/granular-comarca-lagunera"
            scroll={false}
            className="inline-block group border border-[#8b5cf6]/30 hover:border-[#8b5cf6] rounded-[var(--radius-panel)] p-8 bg-[#8b5cf6]/5 transition-colors text-left w-full max-w-xl mx-auto"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="text-mono text-[10px] text-[#8b5cf6] tracking-widest">14 / 15</div>
              <div className="text-mono text-[10px] text-white/30 tracking-widest uppercase">CASO DE ESTUDIO EN CONSTRUCCIÓN</div>
            </div>
            
            <h3 className="text-display-sm text-white mb-2">TIPOLOGÍAS RURALES SITUADAS</h3>
            <p className="text-label text-white/50 mb-6">PROYECTO GRANULAR — HORIZON EUROPE</p>

            <div className="flex flex-wrap gap-2">
              <span className="px-2 py-1 bg-white/5 border border-white/10 rounded text-[10px] text-white/40 tracking-widest uppercase">Agua</span>
              <span className="px-2 py-1 bg-white/5 border border-white/10 rounded text-[10px] text-white/40 tracking-widest uppercase">Socioeconomía</span>
              <span className="px-2 py-1 bg-white/5 border border-white/10 rounded text-[10px] text-white/40 tracking-widest uppercase">Gobernanza</span>
              <span className="px-2 py-1 bg-white/5 border border-white/10 rounded text-[10px] text-white/40 tracking-widest uppercase">Conectividad</span>
            </div>
          </Link>
        </Reveal>

      </div>
    </section>
  );
}
