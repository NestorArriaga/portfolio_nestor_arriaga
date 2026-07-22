export default function Area04Components() {
  return (
    <section className="mb-24">
      <h2 className="text-2xl font-bold mb-8 border-b border-gray-800 pb-2">ÁREA 04 — COMPONENTES UI</h2>
      
      <div className="grid md:grid-cols-2 gap-12 bg-black p-8 rounded border border-gray-800">
        
        {/* Navegación Superior */}
        <div className="md:col-span-2">
          <div className="text-caption mb-4">Navegación Superior</div>
          <nav className="flex justify-between items-center px-6 py-4 border-b border-[var(--color-line)]">
            <div className="text-mono text-sm tracking-widest text-[var(--color-white)]">NEAG</div>
            <div className="flex gap-6 text-label text-[var(--color-text-faint)]">
              <span className="hover:text-white transition-colors cursor-pointer">Atlas</span>
              <span className="text-white">Galería</span>
              <span className="hover:text-white transition-colors cursor-pointer">Info</span>
            </div>
          </nav>
        </div>

        {/* Botones */}
        <div>
          <div className="text-caption mb-4">Botones y Enlaces</div>
          <div className="flex flex-col items-start gap-4">
            <button className="px-6 py-3 bg-[var(--color-white)] text-black text-label rounded hover:bg-gray-200 transition-colors">
              Explorar Atlas
            </button>
            <button className="px-6 py-3 border border-[var(--color-line-strong)] text-white text-label rounded hover:border-white transition-colors">
              Siguiente Proyecto
            </button>
            <a href="#" className="text-body-lg text-[var(--color-accent)] hover:underline underline-offset-4 decoration-[var(--color-line-strong)]">
              Descargar CV.pdf ↗
            </a>
          </div>
        </div>

        {/* Metadatos */}
        <div>
          <div className="text-caption mb-4">Chips y Etiquetas</div>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[var(--accent-cdmx)]"></span>
              <span className="text-mono text-xs text-[var(--color-text-muted)]">CIUDAD DE MÉXICO</span>
            </div>
            
            <div className="flex gap-2">
              <span className="px-3 py-1 bg-[var(--color-graphite-light)] text-[var(--color-text-muted)] text-[10px] uppercase tracking-wider rounded-full border border-[var(--color-line)]">
                Geomorfones
              </span>
              <span className="px-3 py-1 bg-[var(--color-graphite-light)] text-[var(--color-text-muted)] text-[10px] uppercase tracking-wider rounded-full border border-[var(--color-line)]">
                Metztitlán
              </span>
            </div>

            <div className="px-4 py-3 bg-[var(--color-graphite)] border border-[var(--color-line)] rounded flex items-center justify-between w-64">
              <span className="text-label text-white">Categoría</span>
              <span className="text-mono text-xs text-[var(--color-accent)]">Análisis Espacial</span>
            </div>
          </div>
        </div>

        {/* Controles y Navegación */}
        <div>
          <div className="text-caption mb-4">Controles de Paginación</div>
          <div className="flex items-center gap-4">
            <button className="h-12 w-12 rounded-full border border-[var(--color-line-strong)] flex items-center justify-center text-white hover:border-white transition-colors">
              ←
            </button>
            <div className="flex flex-col items-center">
              <span className="text-mono text-xs">01 / 15</span>
            </div>
            <button className="h-12 w-12 rounded-full border border-[var(--color-line-strong)] flex items-center justify-center text-white hover:border-white transition-colors">
              →
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
