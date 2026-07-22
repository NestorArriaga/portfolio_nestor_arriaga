import Image from 'next/image';

export default function Area05Covers() {
  return (
    <section className="mb-24">
      <h2 className="text-2xl font-bold mb-8 border-b border-gray-800 pb-2">ÁREA 05 — TRES ESTUDIOS DE PORTADA</h2>
      
      <div className="flex flex-col gap-16">
        
        {/* PROPUESTA A: ATLAS EDITORIAL */}
        <div>
          <h3 className="text-xl text-[var(--color-accent)] mb-4">A — Atlas Editorial</h3>
          <p className="text-body text-gray-400 mb-4 max-w-2xl">
            Dominada por territorio, tipografía y mapa. Uso intensivo de espacio negativo y tipografía monumental. (Proyecto 14)
          </p>
          <div className="relative w-full aspect-[16/9] bg-black border border-gray-800 overflow-hidden flex font-sans group">
            {/* Ambient Background */}
            <Image src="/portfolio-media/curated/identity/identity-relief-hero-wide-original-clean.webp" alt="bg" fill className="object-cover opacity-10 mix-blend-lighten pointer-events-none" unoptimized />
            
            <div className="absolute top-8 left-12 z-20">
              <div className="text-label text-white/50 mb-2">Néstor Elihu Arriaga Gallegos</div>
            </div>

            <div className="absolute bottom-12 left-12 z-20 flex flex-col max-w-xl">
              <div className="text-mono text-sm text-[var(--accent-cdmx)] mb-4">14 / 15</div>
              <h2 className="text-display-xl text-white leading-[0.85] mb-6">Comarca<br/>Lagunera</h2>
              <div className="flex items-center gap-4 text-mono text-xs text-white/60">
                <span>Tipologías rurales situadas</span>
                <span className="w-8 h-[1px] bg-white/20"></span>
                <span>Cartografía</span>
              </div>
            </div>

            {/* Main Map Cropped */}
            <div className="absolute top-0 right-0 w-[55%] h-full">
              <div className="relative w-full h-full border-l border-white/10 shadow-[var(--shadow-ambient)]">
                <Image src="/portfolio-media/curated/project-14/project-14-water-quality-map-original-clean.webp" alt="map" fill className="object-cover object-left" unoptimized />
              </div>
            </div>

            {/* Side Index */}
            <div className="absolute top-1/4 right-8 z-20 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="text-mono text-[10px] text-white/40 uppercase rotate-90 origin-right whitespace-nowrap mb-12">Índice Territorial</div>
              <div className="h-1 w-1 bg-[var(--accent-cdmx)] rounded-full"></div>
              <div className="h-1 w-1 bg-white/20 rounded-full"></div>
              <div className="h-1 w-1 bg-white/20 rounded-full"></div>
            </div>
          </div>
        </div>


        {/* PROPUESTA B: GALERÍA CINEMATOGRÁFICA */}
        <div>
          <h3 className="text-xl text-[var(--color-accent)] mb-4">B — Galería Cinematográfica</h3>
          <p className="text-body text-gray-400 mb-4 max-w-2xl">
            Imagen dominante (65-75%), marco negro amplio, silenciosa, controles fotográficos. (Territorio Veracruz)
          </p>
          <div className="relative w-full aspect-[16/9] bg-black border border-gray-800 overflow-hidden flex items-center justify-center p-12">
            
            {/* The Main Image */}
            <div className="relative w-[70%] h-full border border-white/5 shadow-2xl z-10 overflow-hidden group">
              <Image src="/portfolio-media/curated/territories/territory-veracruz-photo-heroCinematic.webp" alt="veracruz" fill className="object-cover group-hover:scale-105 transition-transform duration-[2s] ease-out" unoptimized />
            </div>

            {/* Overlapping Text */}
            <div className="absolute bottom-20 left-24 z-20">
              <div className="text-mono text-xs text-[var(--accent-veracruz)] mb-2 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[var(--accent-veracruz)]"></span>
                VERACRUZ
              </div>
              <h2 className="text-display-lg text-white drop-shadow-2xl mb-2">Cuenca de<br/>Decozalapa</h2>
            </div>

            {/* Lateral Info */}
            <div className="absolute top-12 left-12 w-48 text-caption text-white/60">
              Ingeniero en Recursos Naturales Renovables. Documentación fotográfica de territorio.
            </div>

            {/* Thumbnails */}
            <div className="absolute right-12 bottom-12 flex flex-col gap-4 z-20">
              <div className="text-mono text-[10px] text-white/40">SIGUIENTES</div>
              <div className="relative w-24 h-16 border border-white/20 overflow-hidden grayscale hover:grayscale-0 transition-all cursor-pointer">
                 <Image src="/portfolio-media/curated/project-01/project-01-map-thumbnail.webp" alt="t1" fill className="object-cover" unoptimized />
              </div>
              <div className="relative w-24 h-16 border border-white/20 overflow-hidden grayscale hover:grayscale-0 transition-all cursor-pointer">
                 <Image src="/portfolio-media/curated/project-15/project-15-ring-render-thumbnail.webp" alt="t2" fill className="object-cover" unoptimized />
              </div>
            </div>
            
            {/* Numeration */}
            <div className="absolute top-12 right-12 text-mono text-sm text-white">01 / 15</div>
          </div>
        </div>

        {/* PROPUESTA C: INSTRUMENTO TERRITORIAL */}
        <div>
          <h3 className="text-xl text-[var(--color-accent)] mb-4">C — Instrumento Territorial</h3>
          <p className="text-body text-gray-400 mb-4 max-w-2xl">
            Interfaz modular, estructurada con líneas que conectan módulos de información. (Proyecto 01)
          </p>
          <div className="relative w-full aspect-[16/9] bg-[var(--color-graphite-light)] border border-gray-800 overflow-hidden flex flex-col p-8">
            
            {/* Top Bar Module */}
            <div className="flex justify-between items-center pb-4 border-b border-white/10 mb-4">
              <div className="flex gap-4 items-center">
                <div className="text-label text-white">Néstor Elihu Arriaga</div>
                <div className="px-2 py-1 bg-white/5 text-mono text-[10px] text-white/50 border border-white/10">INSTRUMENTO ATLAS</div>
              </div>
              <div className="flex gap-4">
                <div className="text-mono text-[10px] text-[var(--color-accent)]">PROY. 01</div>
                <div className="text-mono text-[10px] text-white/50">47 LÁMINAS</div>
              </div>
            </div>

            {/* Modular Grid */}
            <div className="flex-1 grid grid-cols-12 gap-4">
              
              {/* Info Module */}
              <div className="col-span-3 border border-white/10 bg-[var(--color-graphite)] p-6 flex flex-col justify-between">
                <div>
                  <div className="text-mono text-[10px] text-white/40 mb-4">TERRITORIO</div>
                  <h2 className="text-heading text-white mb-2 leading-tight">Mapeo de Áreas Verdes</h2>
                  <p className="text-caption text-white/60">Ciudad de México, Alcaldía Miguel Hidalgo.</p>
                </div>
                <div className="flex flex-col gap-2">
                  <button className="w-full py-2 border border-[var(--color-accent)] text-[var(--color-accent)] text-mono text-[10px] hover:bg-[var(--color-accent)] hover:text-black transition-colors">VER DETALLE</button>
                  <button className="w-full py-2 bg-white/5 text-mono text-[10px] text-white hover:bg-white/10 transition-colors">CAPAS ESPACIALES</button>
                </div>
              </div>

              {/* Main Visual Module */}
              <div className="col-span-7 border border-white/10 bg-black relative overflow-hidden">
                <Image src="/portfolio-media/curated/project-01/project-01-map-heroWide.webp" alt="map" fill className="object-cover opacity-80" unoptimized />
                {/* Crosshairs for "instrument" feel */}
                <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white/10"></div>
                <div className="absolute top-0 left-1/2 w-[1px] h-full bg-white/10"></div>
                <div className="absolute bottom-4 right-4 bg-black/80 px-2 py-1 text-mono text-[8px] text-white/80 border border-white/10">ESCALA: LOCAL</div>
              </div>

              {/* Side Index Module */}
              <div className="col-span-2 flex flex-col gap-4">
                <div className="flex-1 border border-white/10 bg-[var(--color-graphite)] p-4 relative overflow-hidden group">
                  <Image src="/portfolio-media/curated/project-10/project-10-conservation-thumbnail.webp" alt="p10" fill className="object-cover opacity-30 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all" unoptimized />
                  <div className="relative z-10 text-mono text-[10px] text-white">09. CLÚSTER</div>
                </div>
                <div className="flex-1 border border-white/10 bg-[var(--color-graphite)] p-4 relative overflow-hidden group">
                  <Image src="/portfolio-media/curated/project-14/project-14-cluster-map-thumbnail.webp" alt="p14" fill className="object-cover opacity-30 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all" unoptimized />
                  <div className="relative z-10 text-mono text-[10px] text-white">14. GRANULAR</div>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
