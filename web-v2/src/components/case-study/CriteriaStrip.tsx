import Reveal from '../home/motion/Reveal';

interface Criterion {
  name: string;
  description: string;
}

export default function CriteriaStrip({ criteria }: { criteria: Criterion[] }) {
  return (
    <div className="w-full border-t border-b border-[var(--color-accent)]/20 my-24 bg-[var(--color-accent)]/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-[var(--color-accent)]/20">
        
        {/* Leyenda aclaratoria a un lado */}
        <div className="w-full md:w-1/4 pr-0 md:pr-8 py-6 md:py-0 flex items-center">
          <div className="text-mono text-[10px] text-white/50 uppercase tracking-widest leading-relaxed border-l-2 border-[var(--color-accent)] pl-4">
            El portafolio menciona estos criterios, pero no documenta en esta página sus rangos ni ponderaciones.
          </div>
        </div>

        {/* Criterios */}
        <div className="w-full md:w-3/4 grid grid-cols-1 md:grid-cols-3">
          {criteria.map((c, idx) => (
            <Reveal 
              key={idx} 
              delay={idx * 0.15} 
              direction="up" 
              distance={16}
              className="flex flex-col py-8 px-0 md:px-8"
            >
              <div className="text-display-md text-white tracking-tight mb-2">
                {c.name}
              </div>
              <div className="text-body text-white/60 leading-relaxed font-light">
                {c.description}
              </div>
            </Reveal>
          ))}
        </div>

      </div>
    </div>
  );
}
