import Reveal from '../home/motion/Reveal';

interface MethodStep {
  step: number;
  text: string;
}

export default function MethodRoute({ steps }: { steps: MethodStep[] }) {
  return (
    <section className="w-full bg-[#050505] py-32 border-t border-[var(--color-accent)]/10 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10">
        
        <Reveal direction="up" className="mb-24 text-center">
          <div className="text-mono text-[10px] text-[var(--color-accent)] uppercase tracking-widest mb-4">
            RUTA METODOLÓGICA
          </div>
          <p className="text-body text-white/50 leading-relaxed max-w-xl mx-auto">
            Ruta metodológica reproducida a partir de la página 17 del portafolio. La fuente no detalla variables, parámetros, insumos ni procedimientos estadísticos.
          </p>
        </Reveal>

        <div className="flex flex-col md:flex-row justify-between relative">
          {/* LÍNEA CONECTORA (ESCRITORIO) */}
          <div className="hidden md:block absolute top-[24px] left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--color-accent)]/50 to-transparent z-0"></div>
          
          {/* LÍNEA CONECTORA (MÓVIL) */}
          <div className="block md:hidden absolute top-0 bottom-0 left-[24px] w-px bg-gradient-to-b from-transparent via-[var(--color-accent)]/50 to-transparent z-0"></div>

          {steps.map((s, idx) => (
            <Reveal key={idx} direction="up" delay={idx * 0.15} className="relative z-10 flex flex-row md:flex-col items-start md:items-center w-full md:w-1/4 px-0 md:px-4 mb-12 md:mb-0">
              
              {/* NODO */}
              <div className="w-12 h-12 md:mb-8 shrink-0 rounded-full border-2 border-[#050505] bg-[var(--color-accent)] flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.1)] relative">
                <span className="text-[#050505] font-bold text-mono text-[14px]">0{s.step}</span>
                {/* Halo pulsante sutil */}
                <div className="absolute inset-0 rounded-full border border-[var(--color-accent)] animate-ping opacity-20"></div>
              </div>

              {/* TEXTO */}
              <div className="ml-8 md:ml-0 md:text-center mt-2 md:mt-0">
                <p className="text-label text-white/90 font-bold uppercase tracking-wide">
                  {s.text}
                </p>
              </div>

            </Reveal>
          ))}
        </div>

      </div>
    </section>
  );
}
