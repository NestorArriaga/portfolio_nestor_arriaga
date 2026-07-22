import Image from "next/image";

export default function Area03Images() {
  const images = [
    { id: "identity-relief", src: "/portfolio-media/curated/identity/identity-relief-hero-wide-original-clean.webp", label: "Relieve Identidad", focus: "left" },
    { id: "territory-veracruz", src: "/portfolio-media/curated/territories/territory-veracruz-photo-original-clean.webp", label: "Fotografía Veracruz", focus: "center" },
    { id: "territory-aguascalientes", src: "/portfolio-media/curated/territories/territory-aguascalientes-photo-original-clean.webp", label: "Fotografía Calvillo", focus: "center" },
    { id: "project-01-map", src: "/portfolio-media/curated/project-01/project-01-map-original-clean.webp", label: "Mapa CDMX", focus: "right" },
    { id: "project-14-quality", src: "/portfolio-media/curated/project-14/project-14-water-quality-map-original-clean.webp", label: "Mapa GRANULAR", focus: "center" },
    { id: "project-15-ring", src: "/portfolio-media/curated/project-15/project-15-ring-render-original-clean.webp", label: "Render Urban Challenge", focus: "center" },
  ];

  return (
    <section className="mb-24">
      <h2 className="text-2xl font-bold mb-8 border-b border-gray-800 pb-2">ÁREA 03 — TRATAMIENTOS DE IMAGEN</h2>
      
      <div className="flex flex-col gap-12">
        {images.map((img) => (
          <div key={img.id} className="border border-gray-800 rounded p-6 bg-black">
            <h3 className="text-label text-[var(--color-accent)] mb-4">{img.label}</h3>
            
            <div className="grid md:grid-cols-2 gap-4">
              
              {/* Sin Tratamiento */}
              <div>
                <div className="text-caption mb-2">A. Sin Tratamiento (contain)</div>
                <div className="relative h-48 w-full bg-gray-900 overflow-hidden border border-gray-800">
                  <Image src={img.src} alt={img.label} fill className="object-contain" unoptimized />
                </div>
              </div>

              {/* Comportamiento Cover con Focal Point */}
              <div>
                <div className="text-caption mb-2">B. Comportamiento Cover (focal point: {img.focus})</div>
                <div className="relative h-48 w-full bg-gray-900 overflow-hidden">
                  <Image src={img.src} alt={img.label} fill className="object-cover" style={{ objectPosition: img.focus }} unoptimized />
                </div>
              </div>

              {/* Composición con Capa Ambiental */}
              <div className="md:col-span-2 mt-4">
                <div className="text-caption mb-2">C. Composición de Portada (Capa Ambiental + Cover con sombra + Texto)</div>
                <div className="relative h-96 w-full bg-black overflow-hidden flex items-center justify-center p-8 group">
                  {/* Capa Ambiental */}
                  <Image src={img.src} alt="Ambient" fill className="object-cover blur-3xl opacity-30 mix-blend-screen scale-110" unoptimized />
                  
                  {/* Imagen Principal */}
                  <div className="relative w-full max-w-2xl h-full shadow-[var(--shadow-image)] hover:scale-[1.02] transition-transform duration-700 ease-out z-10 border border-white/5">
                    <Image src={img.src} alt={img.label} fill className="object-cover" unoptimized />
                  </div>

                  {/* Texto Superpuesto */}
                  <div className="absolute bottom-8 left-8 z-20 pointer-events-none">
                    <div className="text-mono text-[10px] text-white/50 mb-1">TRATAMIENTO ESTÁTICO</div>
                    <div className="text-display-lg text-white drop-shadow-2xl">{img.label}</div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
