import Reveal from '../home/motion/Reveal';

interface RelationsProps {
  relations: {
    suelo: string;
    clima: string;
    agua: string;
  };
  mapImage: string;
}

export default function EnvironmentalRelations({ relations, mapImage }: RelationsProps) {
  return (
    <section className="w-full bg-[#050505] py-24 relative overflow-hidden">
      
      <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10">
        
        <Reveal direction="up" className="mb-16">
          <div className="text-mono text-[10px] text-[var(--color-accent)] uppercase tracking-widest mb-4">
            USO ÓPTIMO DEL SUELO
          </div>
          <p className="text-body text-white/50 leading-relaxed max-w-xl">
            El mapa representa una lectura territorial orientada a identificar condiciones de uso del suelo compatibles con café y limón dentro de la cuenca.
          </p>
          <div className="text-mono text-[10px] text-white/30 uppercase tracking-widest mt-6 border-l border-white/20 pl-4">
            La página del portafolio no documenta los parámetros ni ponderaciones utilizados en el análisis.
          </div>
        </Reveal>

        {/* COMPOSICIÓN ASIMÉTRICA DE LAS TRES RELACIONES */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-4 items-center">
          
          {/* SUELO (Izquierda) */}
          <div className="col-span-1 md:col-span-3">
            <Reveal direction="right" delay={0.1}>
              <h3 className="text-display-md text-white tracking-tight mb-2">SUELO</h3>
              <p className="text-label text-white/60">{relations.suelo}</p>
            </Reveal>
          </div>

          {/* MAPA CENTRAL CON CLIMA CRUZANDO */}
          <div className="col-span-1 md:col-span-6 relative aspect-square md:aspect-auto md:h-[400px]">
            <Reveal direction="up" distance={32} className="w-full h-full relative border border-white/10 rounded-[var(--radius-panel)] overflow-hidden bg-white/5">
              {/* Imagen central */}
              <div className="absolute inset-0 opacity-40 mix-blend-lighten saturate-50" style={{ backgroundImage: `url(${mapImage})`, backgroundPosition: 'center', backgroundSize: 'cover' }}></div>
              
              {/* CLIMA superpuesto */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <Reveal direction="up" delay={0.3} className="bg-[#050505]/90 backdrop-blur-sm border border-white/10 p-6 rounded-[var(--radius-sm)] max-w-[80%] text-center shadow-2xl">
                  <h3 className="text-display-md text-white tracking-tight mb-2">CLIMA</h3>
                  <p className="text-label text-white/60">{relations.clima}</p>
                </Reveal>
              </div>
            </Reveal>
          </div>

          {/* AGUA (Derecha / Abajo) */}
          <div className="col-span-1 md:col-span-3 text-left md:text-right flex flex-col justify-end h-full pt-8 md:pt-0">
            <Reveal direction="left" delay={0.2}>
              <h3 className="text-display-md text-white tracking-tight mb-2">AGUA</h3>
              <p className="text-label text-white/60">{relations.agua}</p>
            </Reveal>
          </div>

        </div>

      </div>
    </section>
  );
}
