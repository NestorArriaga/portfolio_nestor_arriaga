import Reveal from '../home/motion/Reveal';

interface SourceConsistencyNoteProps {
  warnings: string[];
  limitations: string;
}

export default function SourceConsistencyNote({ warnings, limitations }: SourceConsistencyNoteProps) {
  return (
    <section className="w-full bg-[#050505] py-24 border-t border-white/10 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 md:px-12 relative z-10">
        <Reveal direction="up">
          <div className="flex items-center gap-4 mb-8 border-b border-white/10 pb-4">
            <div className="text-mono text-[10px] text-white/50 uppercase tracking-widest">ALCANCE DOCUMENTADO</div>
          </div>
          
          <div className="flex flex-col gap-6">
            <p className="text-body text-white/70 leading-relaxed font-light">
              La versión web conserva el contenido y las categorías mostradas en el portafolio original. Cuando la página presenta ambigüedades internas, éstas se documentan sin completar los vacíos mediante inferencias externas.
            </p>
            
            <div className="flex flex-col gap-4 pl-4 border-l border-[var(--color-accent)]/30">
              {warnings.map((warning, idx) => (
                <p key={idx} className="text-label text-white/60 leading-relaxed">
                  <span className="text-[var(--color-accent)] font-bold mr-2">0{idx + 1}</span> {warning}
                </p>
              ))}
              <p className="text-label text-white/60 leading-relaxed">
                <span className="text-[var(--color-accent)] font-bold mr-2">0{warnings.length + 1}</span> {limitations}
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
