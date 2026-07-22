import { granularPages } from '@/content/cases/granular/granular-pages';
import Image from 'next/image';

export default function PageInspector() {
  return (
    <div className="w-full">
      <h2 className="text-display-sm text-white mb-8">INSPECTOR DE PÁGINAS (21-40)</h2>
      
      <div className="flex flex-col gap-8">
        {granularPages.map(page => (
          <div key={page.pdfPage} className="bg-white/5 border border-white/10 p-6 rounded-md flex flex-col md:flex-row gap-8">
            
            <div className="w-full md:w-1/4 shrink-0">
              <div className="relative aspect-[1.414] bg-black border border-white/20 rounded overflow-hidden">
                {/* Simulated preview, relying on the generated audit images */}
                <Image 
                  src={`/portfolio-media/audit/block-15/page-${page.pdfPage}-audit.png`} 
                  alt={`Página ${page.pdfPage}`}
                  fill
                  className="object-contain"
                  unoptimized
                />
              </div>
            </div>
            
            <div className="flex-1 flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <div className="text-display-xs text-white">Página {page.pdfPage}</div>
                <div className={`text-mono text-[10px] uppercase tracking-widest px-2 py-1 rounded ${
                  page.status === 'audited' ? 'bg-green-900/30 text-green-400' : 'bg-yellow-900/30 text-yellow-400'
                }`}>
                  {page.status}
                </div>
              </div>
              
              <h3 className="text-label text-white/80">{page.title}</h3>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
                <div>
                  <div className="text-mono text-[10px] text-white/40 uppercase">Dimensiones</div>
                  <div className="text-sm text-white/80">{page.dimensions.join(', ')}</div>
                </div>
                <div>
                  <div className="text-mono text-[10px] text-white/40 uppercase">Escalas</div>
                  <div className="text-sm text-white/80">{page.scales.join(', ')}</div>
                </div>
                <div>
                  <div className="text-mono text-[10px] text-white/40 uppercase">Capítulos</div>
                  <div className="text-sm text-white/80">{page.chapterIds.join(', ')}</div>
                </div>
                <div>
                  <div className="text-mono text-[10px] text-white/40 uppercase">Assets detectados</div>
                  <div className="text-sm text-white/80">{page.detectedAssetIds.length}</div>
                </div>
              </div>
              
              {page.warnings.length > 0 && (
                <div className="mt-4 border-l-2 border-yellow-500/50 pl-4 py-1">
                  <div className="text-mono text-[10px] text-yellow-500/80 uppercase tracking-widest mb-1">Advertencias</div>
                  <ul className="list-disc list-inside text-sm text-yellow-500/60">
                    {page.warnings.map(w => <li key={w}>{w}</li>)}
                  </ul>
                </div>
              )}
            </div>
            
          </div>
        ))}
      </div>
    </div>
  );
}
