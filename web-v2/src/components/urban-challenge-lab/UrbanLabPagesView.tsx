import { urbanPages } from "@/content/cases/urban-challenge/urban-pages";

export default function UrbanLabPagesView() {
  return (
    <div className="w-full max-w-7xl mx-auto p-6 md:p-12 flex flex-col gap-12">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-light tracking-wide text-white">PAGES SEQUENCE</h2>
        <p className="text-mono text-xs text-white/50">Auditoría secuencial de las 5 páginas fuente (41-45).</p>
      </div>

      <div className="flex flex-col gap-16">
        {urbanPages.map(page => (
          <div key={page.pdfPage} className="flex flex-col lg:flex-row gap-8 border-t border-white/10 pt-12 first:border-0 first:pt-0">
            {/* Visual Column */}
            <div className="w-full lg:w-1/3 flex flex-col gap-4">
              <div className="aspect-[3/4] bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden rounded-sm relative group">
                <div className="absolute inset-0 flex items-center justify-center p-4">
                  {/* Using standard img for internal tool to avoid next/image complexity with unoptimized paths */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src={`/portfolio-media/audit/block-23/${page.auditImage}`} 
                    alt={`Auditoría pág ${page.pdfPage}`}
                    className="max-w-full max-h-full object-contain opacity-50 group-hover:opacity-100 transition-opacity"
                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                  />
                  <div className="absolute text-mono text-xs text-white/30 group-hover:hidden">Auditoría Pendiente de Generar</div>
                </div>
              </div>
              <div className="flex justify-between items-center text-mono text-[10px]">
                <span className="text-white/40">Fase: <span className="text-white">{page.designPhase}</span></span>
                <span className="text-amber-500/70 border border-amber-500/20 px-2 py-0.5 rounded">{page.confidence} conf.</span>
              </div>
            </div>

            {/* Data Column */}
            <div className="w-full lg:w-2/3 flex flex-col gap-6">
              <div className="flex flex-col gap-1">
                <span className="text-mono text-xs text-amber-500 tracking-widest uppercase">PDF Page {page.pdfPage}</span>
                <h3 className="text-2xl font-light">{page.title}</h3>
                <span className="text-mono text-xs text-white/50 mt-1">{page.act}</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-2">
                    <span className="text-mono text-[10px] uppercase text-white/40 border-b border-white/10 pb-1">Chapters</span>
                    <div className="flex gap-2 flex-wrap">
                      {page.chapterIds.map(id => (
                        <span key={id} className="text-mono text-[10px] bg-white/10 px-2 py-1 rounded-sm">{id}</span>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <span className="text-mono text-[10px] uppercase text-white/40 border-b border-white/10 pb-1">Assets Detectados</span>
                    <div className="flex flex-col gap-1">
                      {page.detectedAssetIds.map(asset => (
                        <span key={asset} className="text-mono text-[10px] text-white/70 truncate">{asset}</span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-2">
                    <span className="text-mono text-[10px] uppercase text-amber-500/70 border-b border-amber-500/20 pb-1">Warnings</span>
                    {page.warnings.length > 0 ? (
                      <div className="flex flex-col gap-1">
                        {page.warnings.map(w => (
                          <span key={w} className="text-mono text-[10px] text-amber-500/90">{w}</span>
                        ))}
                      </div>
                    ) : (
                      <span className="text-mono text-[10px] text-white/30">Sin advertencias.</span>
                    )}
                  </div>

                  <div className="flex flex-col gap-2">
                    <span className="text-mono text-[10px] uppercase text-white/40 border-b border-white/10 pb-1">Intenciones</span>
                    <ul className="list-disc list-inside text-mono text-[10px] text-white/70">
                      {page.intentions.map(int => <li key={int}>{int}</li>)}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
