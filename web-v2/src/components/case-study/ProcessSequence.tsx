import Reveal from '../home/motion/Reveal';

interface ProcessStep {
  step: number;
  title: string;
  description: string;
}

export default function ProcessSequence({ steps, title, note, accentColor }: { steps: ProcessStep[], title?: string, note?: string, accentColor?: string }) {
  return (
    <div className="w-full my-24 max-w-6xl mx-auto px-6 md:px-12">
      <Reveal direction="up" distance={32}>
        <div className="mb-12">
          <h2 className="text-display-md text-white mb-2">{title || "PROCESO CARTOGRÁFICO"}</h2>
          <div className="text-mono text-[10px] text-white/40 uppercase tracking-widest border border-white/10 inline-block px-3 py-1 rounded-sm">
            {note || "Secuencia reconstruida a partir del contenido mostrado en el portafolio."}
          </div>
        </div>
      </Reveal>
      
      <div className="relative">
        {/* Línea conectora (Escritorio) */}
        <div className="hidden md:block absolute top-6 left-0 w-full h-px bg-white/10 z-0"></div>

        <div className="grid grid-cols-1 md:grid-cols-6 gap-8 md:gap-4 relative z-10">
          {steps.map((item, idx) => (
            <Reveal 
              key={idx} 
              delay={idx * 0.15} 
              direction="up" 
              distance={16}
              className="flex flex-row md:flex-col items-start gap-6 md:gap-4"
            >
              <div className="w-12 h-12 shrink-0 rounded-full bg-[#050505] border border-white/20 flex items-center justify-center text-mono text-sm text-[var(--color-accent)] relative z-10">
                0{item.step}
              </div>
              
              <div className="flex flex-col mt-2 md:mt-4">
                <div className="text-label text-white mb-2 uppercase tracking-widest">{item.title}</div>
                <div className="text-body text-white/50 text-sm leading-relaxed">{item.description}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}
