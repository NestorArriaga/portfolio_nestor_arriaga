import Reveal from '../home/motion/Reveal';

interface Factor {
  title: string;
  description: string;
}

export default function EnvironmentalFactorComposition({ factors }: { factors: Factor[] }) {
  return (
    <section className="w-full bg-[#050505] py-32 border-t border-[var(--color-accent)]/10 relative">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        
        <Reveal direction="up" className="mb-16">
          <div className="text-mono text-[10px] text-[var(--color-accent)] uppercase tracking-widest mb-4">
            FACTORES INTEGRADOS
          </div>
          <p className="text-body text-white/50 leading-relaxed max-w-xl mb-6">
            La reclasificación integra múltiples factores. La página no documenta rangos, ponderaciones ni procedimientos específicos de integración.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-16">
          {factors.map((factor, idx) => (
            <Reveal key={idx} direction="up" delay={idx * 0.1}>
              <div className="relative">
                {/* Línea conectora decorativa */}
                <div className="absolute -left-6 top-0 bottom-0 w-px bg-gradient-to-b from-[var(--color-accent)]/30 to-transparent hidden md:block"></div>
                
                <h3 className="text-display-md text-white/90 tracking-tight mb-4 break-words" style={{ fontSize: 'clamp(2rem, 3vw, 2.5rem)' }}>
                  {factor.title}
                </h3>
                <p className="text-label text-white/60">
                  {factor.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

      </div>
    </section>
  );
}
