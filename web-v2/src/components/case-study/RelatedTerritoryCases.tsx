import Link from 'next/link';
import Reveal from '../home/motion/Reveal';

export default function RelatedTerritoryCases() {
  return (
    <section className="w-full bg-[#050505] py-24 border-t border-white/10">
      <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
        
        <Reveal direction="up">
          <div className="text-mono text-[10px] text-[var(--color-accent)] uppercase tracking-widest mb-4">
            CUENCA DE DECOZALAPA — DOS LECTURAS
          </div>
          <p className="text-body text-white/50 leading-relaxed max-w-2xl mx-auto mb-16">
            El portafolio expone dos perspectivas analíticas sobre el mismo espacio geográfico: 
            su capacidad de retención ambiental y su vocación agrícola.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
          
          <Reveal delay={0.1} direction="up" distance={16}>
            <Link href="/projects/captura-carbono-decozalapa" scroll={false} className="group block border border-white/10 hover:border-white/30 rounded-[var(--radius-panel)] p-8 transition-colors bg-white/5">
              <div className="text-mono text-[10px] text-white/40 mb-4 group-hover:text-white transition-colors">PROYECTO 02</div>
              <h3 className="text-body-lg text-white mb-2 group-hover:text-[var(--color-accent)] transition-colors">Función ecológica y captura de carbono.</h3>
              <p className="text-label text-white/50">Delimitación de zonas críticas ambientales.</p>
            </Link>
          </Reveal>

          <Reveal delay={0.2} direction="up" distance={16}>
            <Link href="/projects/zonas-optimas-limon-cafe" scroll={false} className="group block border border-white/10 hover:border-white/30 rounded-[var(--radius-panel)] p-8 transition-colors bg-white/5">
              <div className="text-mono text-[10px] text-white/40 mb-4 group-hover:text-white transition-colors">PROYECTO 03</div>
              <h3 className="text-body-lg text-white mb-2 group-hover:text-[var(--color-accent)] transition-colors">Aptitud territorial para café y limón.</h3>
              <p className="text-label text-white/50">Distribución de zonas óptimas productivas.</p>
            </Link>
          </Reveal>

        </div>
      </div>
    </section>
  );
}
