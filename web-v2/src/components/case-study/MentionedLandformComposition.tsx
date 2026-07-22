import Reveal from '../home/motion/Reveal';

interface Landform {
  name: string;
  description: string;
}

export default function MentionedLandformComposition({ landforms }: { landforms: Landform[] }) {
  return (
    <section className="w-full bg-[#050505] py-32 border-t border-[var(--color-accent)]/10 relative">
      <div className="max-w-6xl mx-auto px-6 md:px-12 flex flex-col md:flex-row gap-16">
        
        <div className="w-full md:w-1/3">
          <Reveal direction="up">
            <div className="text-mono text-[10px] text-[var(--color-accent)] uppercase tracking-widest mb-4">
              FORMAS MENCIONADAS EN EL PROYECTO
            </div>
            <p className="text-body text-white/60 leading-relaxed">
              El portafolio menciona estas unidades como ejemplos de formas que ayudan a comprender los patrones geomorfológicos del paisaje, sin afirmar que sean las únicas.
            </p>
          </Reveal>
        </div>

        <div className="w-full md:w-2/3 grid grid-cols-1 sm:grid-cols-3 gap-8">
          {landforms.map((form, idx) => (
            <Reveal key={idx} direction="up" delay={idx * 0.1}>
              <div className="relative border-t border-white/10 pt-4">
                <h3 className="text-body-lg text-white font-bold mb-4">
                  {form.name}
                </h3>
                <p className="text-label text-white/60">
                  {form.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

      </div>
    </section>
  );
}
