import Link from 'next/link';
import Reveal from '../home/motion/Reveal';
import AptitudeMapComparison from './AptitudeMapComparison';

interface AguascalientesAptitudePairProps {
  currentProjectId: string;
  map10Src: string;
  map11Src: string;
}

export default function AguascalientesAptitudePair({ currentProjectId, map10Src, map11Src }: AguascalientesAptitudePairProps) {
  
  const is10 = currentProjectId === "10";
  const is11 = currentProjectId === "11";

  return (
    <section className="w-full bg-[#050505] py-32 border-t border-white/10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        <Reveal direction="up" className="text-center mb-16">
          <h2 className="text-display-md text-white mb-4">AGUASCALIENTES</h2>
          <div className="text-mono text-[10px] text-white/50 uppercase tracking-widest">
            DOS LECTURAS DE APTITUD
          </div>
          <p className="text-body text-white/50 leading-relaxed max-w-2xl mx-auto mt-6">
            Los dos mapas emplean ponderación de atributos para representar aptitudes sectoriales distintas dentro del mismo territorio.
            La coincidencia de algunas variables no vuelve equivalentes sus finalidades ni permite resolver automáticamente conflictos de uso del suelo.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          
          {/* TARJETA PROYECTO 10 */}
          <Reveal direction="up" distance={32}>
            <Link 
              href="/projects/aptitud-conservacion-aguascalientes"
              scroll={false}
              className={`block w-full border rounded-[var(--radius-panel)] p-8 transition-colors ${
                is10 ? 'border-[#4caf50]/50 bg-white/5' : 'border-white/10 hover:border-[#4caf50]/30 hover:bg-white/5'
              }`}
            >
              <div className="text-mono text-[10px] text-[#4caf50] uppercase tracking-widest mb-4">PROYECTO 10</div>
              <h3 className="text-display-sm text-white mb-4">APTITUD PARA LA CONSERVACIÓN</h3>
              <p className="text-label text-white/70 mb-4">Cinco atributos relacionados con cobertura natural, fragilidad, función hidrológica, pendiente e inundación.</p>
              <div className="text-mono text-[10px] text-white/40 mb-4">SUMA: 1.00</div>
              <div className="flex gap-2 text-[10px] text-white/40 uppercase tracking-widest">
                <span className="px-2 py-1 bg-white/10 rounded">NULO</span>
                <span className="px-2 py-1 bg-white/10 rounded">MEDIO</span>
                <span className="px-2 py-1 bg-white/10 rounded">ALTO</span>
              </div>
            </Link>
          </Reveal>

          {/* TARJETA PROYECTO 11 */}
          <Reveal direction="up" distance={32} delay={0.1}>
            <Link 
              href="/projects/aptitud-agricola-aguascalientes"
              scroll={false}
              className={`block w-full border rounded-[var(--radius-panel)] p-8 transition-colors ${
                is11 ? 'border-[#ff9800]/50 bg-white/5' : 'border-white/10 hover:border-[#ff9800]/30 hover:bg-white/5'
              }`}
            >
              <div className="text-mono text-[10px] text-[#ff9800] uppercase tracking-widest mb-4">PROYECTO 11</div>
              <h3 className="text-display-sm text-white mb-4">APTITUD AGRÍCOLA</h3>
              <p className="text-label text-white/70 mb-4">Seis atributos relacionados con cobertura, agua, pendiente, inundación, suelo y erosión.</p>
              <div className="text-mono text-[10px] text-white/40 mb-4">SUMA: 1.00</div>
              <div className="flex gap-2 text-[10px] text-white/40 uppercase tracking-widest">
                <span className="px-2 py-1 bg-white/10 rounded">NULO</span>
                <span className="px-2 py-1 bg-white/10 rounded">MEDIO</span>
                <span className="px-2 py-1 bg-white/10 rounded">ALTO</span>
              </div>
            </Link>
          </Reveal>

        </div>

        {/* COMPONENT DE MAPAS LADO A LADO */}
        <AptitudeMapComparison map10Src={map10Src} map11Src={map11Src} />

        {/* MATRIZ DE ATRIBUTOS */}
        <Reveal direction="up" className="mt-24 pt-16 border-t border-white/10">
          <h3 className="text-display-xs text-white mb-8 text-center">MATRIZ DESCRIPTIVA DE ATRIBUTOS</h3>
          
          <div className="w-full overflow-x-auto">
            <table className="w-full text-left min-w-[800px]">
              <thead>
                <tr className="border-b border-white/20">
                  <th scope="col" className="py-4 text-mono text-[10px] text-white/50 w-1/4">ATRIBUTO O DIMENSIÓN</th>
                  <th scope="col" className="py-4 text-mono text-[10px] text-[#4caf50] w-3/8">CONSERVACIÓN</th>
                  <th scope="col" className="py-4 text-mono text-[10px] text-[#ff9800] w-3/8">AGRICULTURA</th>
                </tr>
              </thead>
              <tbody className="text-label text-white/80">
                
                <tr className="border-b border-white/10">
                  <td className="py-6 text-mono text-[10px] text-white/50 tracking-widest pr-4">COBERTURA DEL SUELO</td>
                  <td className="py-6 pr-4">áreas forestales y vegetación natural — <span className="font-bold text-[#4caf50]">0.25</span></td>
                  <td className="py-6">áreas agrícolas, pastizales inducidos y áreas desprovistas de vegetación — <span className="font-bold text-[#ff9800]">0.25</span></td>
                </tr>
                
                <tr className="border-b border-white/10">
                  <td className="py-6 text-mono text-[10px] text-white/50 tracking-widest pr-4">AGUA</td>
                  <td className="py-6 pr-4">función hidrológica forestal — <span className="font-bold text-[#4caf50]">0.25</span></td>
                  <td className="py-6">proximidad a cuerpos de agua — <span className="font-bold text-[#ff9800]">0.20</span></td>
                </tr>

                <tr className="border-b border-white/10">
                  <td className="py-6 text-mono text-[10px] text-white/50 tracking-widest pr-4">PENDIENTE</td>
                  <td className="py-6 pr-4"><span className="font-bold text-[#4caf50]">0.15</span></td>
                  <td className="py-6"><span className="font-bold text-[#ff9800]">0.15</span></td>
                </tr>

                <tr className="border-b border-white/10">
                  <td className="py-6 text-mono text-[10px] text-white/50 tracking-widest pr-4">INUNDACIÓN</td>
                  <td className="py-6 pr-4">distancia de áreas propensas a inundación — <span className="font-bold text-[#4caf50]">0.15</span></td>
                  <td className="py-6">distancia de áreas propensas a inundación — <span className="font-bold text-[#ff9800]">0.15</span></td>
                </tr>

                <tr className="border-b border-white/10">
                  <td className="py-6 text-mono text-[10px] text-white/50 tracking-widest pr-4">FRAGILIDAD ECOLÓGICA</td>
                  <td className="py-6 pr-4"><span className="font-bold text-[#4caf50]">0.20</span></td>
                  <td className="py-6 text-white/30 italic text-[14px]">No aparece como atributo independiente en la tabla.</td>
                </tr>

                <tr className="border-b border-white/10">
                  <td className="py-6 text-mono text-[10px] text-white/50 tracking-widest pr-4">TIPO DE SUELO</td>
                  <td className="py-6 pr-4 text-white/30 italic text-[14px]">No aparece como atributo independiente en la tabla.</td>
                  <td className="py-6"><span className="font-bold text-[#ff9800]">0.20</span></td>
                </tr>

                <tr>
                  <td className="py-6 text-mono text-[10px] text-white/50 tracking-widest pr-4">EROSIÓN</td>
                  <td className="py-6 pr-4 text-white/30 italic text-[14px]">No aparece como atributo independiente en la tabla.</td>
                  <td className="py-6"><span className="font-bold text-[#ff9800]">0.05</span></td>
                </tr>

              </tbody>
            </table>
          </div>
        </Reveal>

      </div>
    </section>
  );
}
