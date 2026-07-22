import Link from 'next/link';
import Reveal from '../home/motion/Reveal';

interface CalvilloTerritorialPairProps {
  currentProjectId: string;
}

export default function CalvilloTerritorialPair({ currentProjectId }: CalvilloTerritorialPairProps) {
  
  const is12 = currentProjectId === "12";
  const is13 = currentProjectId === "13";

  return (
    <section className="w-full bg-[#050505] py-32 border-t border-white/10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        <Reveal direction="up" className="text-center mb-16">
          <h2 className="text-display-md text-white mb-4">CALVILLO</h2>
          <div className="text-mono text-[10px] text-white/50 uppercase tracking-widest">
            DOS COMPONENTES TERRITORIALES
          </div>
          <p className="text-body text-white/50 leading-relaxed max-w-2xl mx-auto mt-6">
            Los proyectos observan dos dimensiones relacionadas con el manejo territorial: la condición física del suelo y la organización superficial del agua.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* TARJETA PROYECTO 12 */}
          <Reveal direction="up" distance={32}>
            <Link 
              href="/projects/degradacion-suelo-calvillo"
              scroll={false}
              className={`block w-full border rounded-[var(--radius-panel)] p-8 transition-colors ${
                is12 ? 'border-[#c18a6d]/50 bg-white/5' : 'border-white/10 hover:border-[#c18a6d]/30 hover:bg-white/5'
              }`}
            >
              <div className="text-mono text-[10px] text-[#c18a6d] uppercase tracking-widest mb-4">PROYECTO 12</div>
              <h3 className="text-display-sm text-white mb-4">DEGRADACIÓN DEL SUELO</h3>
              <p className="text-label text-white/70 mb-4">Áreas diferenciadas dentro de un análisis territorial relacionado con manejo ganadero.</p>
              <div className="text-mono text-[10px] text-white/40 mb-4 tracking-widest uppercase">
                ENFOQUE FÍSICO
              </div>
            </Link>
          </Reveal>

          {/* TARJETA PROYECTO 13 */}
          <Reveal direction="up" distance={32} delay={0.1}>
            <Link 
              href="/projects/subcuencas-rios-calvillo"
              scroll={false}
              className={`block w-full border rounded-[var(--radius-panel)] p-8 transition-colors ${
                is13 ? 'border-[#4a9eb4]/50 bg-white/5' : 'border-white/10 hover:border-[#4a9eb4]/30 hover:bg-white/5'
              }`}
            >
              <div className="text-mono text-[10px] text-[#4a9eb4] uppercase tracking-widest mb-4">PROYECTO 13</div>
              <h3 className="text-display-sm text-white mb-4">SUBCUENCAS Y RÍOS</h3>
              <p className="text-label text-white/70 mb-4">Organización hidrológica superficial representada dentro del mismo territorio.</p>
              <div className="text-mono text-[10px] text-white/40 mb-4 tracking-widest uppercase">
                ENFOQUE HÍDRICO
              </div>
            </Link>
          </Reveal>

        </div>

      </div>
    </section>
  );
}
