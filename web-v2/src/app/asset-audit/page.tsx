import fs from 'fs';
import path from 'path';
import Image from 'next/image';

type PageInfo = {
  pageNumber: number;
  section: string;
  projectIds: string[];
  territory: string;
  previewImage: string;
  renderImage: string;
  wordCount: number;
  extractionWarnings: string[];
};

type AssetInfo = {
  id: string;
  sourcePages: number[];
  projectIds: string[];
  section: string;
  type: string;
  role: string;
  src: string;
  width: number;
  height: number;
  pageBounds: { x: number; y: number; width: number; height: number };
  warnings: string[];
};

type Report = {
  processedPages: number;
  assetsFound: number;
  assetsSaved: number;
  duplicatesRemoved: number;
  errors: string[];
};

// Componente SSR
export default async function AssetAuditPage() {
  const contentDir = path.join(process.cwd(), 'src/content');
  const auditDir = path.join(process.cwd(), 'public/portfolio-media/audit');

  let pages: PageInfo[] = [];
  let assets: AssetInfo[] = [];
  let report: Report = { processedPages: 0, assetsFound: 0, assetsSaved: 0, duplicatesRemoved: 0, errors: [] };

  try {
    pages = JSON.parse(fs.readFileSync(path.join(contentDir, 'portfolio-pages.json'), 'utf8'));
    assets = JSON.parse(fs.readFileSync(path.join(contentDir, 'portfolio-assets.json'), 'utf8'));
    report = JSON.parse(fs.readFileSync(path.join(auditDir, 'extraction-report.json'), 'utf8'));
  } catch (e) {
    // Si aún no se extrae, muestra un aviso.
  }

  return (
    <main className="min-h-screen bg-[#050505] text-[#F2F1EC] p-8 font-sans">
      <header className="mb-12 border-b border-gray-800 pb-8">
        <h1 className="text-3xl font-bold text-[#00A6C7] mb-2">AUDITORÍA VISUAL DE EXTRACCIÓN</h1>
        <p className="text-gray-400">Verificación del pipeline de extracción del PDF.</p>
      </header>

      {pages.length === 0 ? (
        <div className="p-8 bg-black border border-gray-800 rounded">
          <p>No se encontraron datos JSON. Ejecuta `npm run extract:portfolio` primero.</p>
        </div>
      ) : (
        <div className="space-y-16">
          {/* SECCIÓN A: RESUMEN */}
          <section>
            <h2 className="text-xl font-bold mb-4 border-b border-gray-800 pb-2">A. RESUMEN</h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div className="p-4 bg-gray-900 rounded"><div className="text-2xl font-mono text-[#00A6C7]">{report.processedPages}/47</div><div className="text-xs uppercase">Páginas</div></div>
              <div className="p-4 bg-gray-900 rounded"><div className="text-2xl font-mono text-[#00A6C7]">15</div><div className="text-xs uppercase">Proyectos</div></div>
              <div className="p-4 bg-gray-900 rounded"><div className="text-2xl font-mono text-[#00A6C7]">{report.assetsFound}</div><div className="text-xs uppercase">Hallazgos</div></div>
              <div className="p-4 bg-gray-900 rounded"><div className="text-2xl font-mono text-[#00A6C7]">{report.assetsSaved}</div><div className="text-xs uppercase">Guardados</div></div>
              <div className="p-4 bg-gray-900 rounded"><div className="text-2xl font-mono text-[#00A6C7]">{report.duplicatesRemoved}</div><div className="text-xs uppercase">Duplicados</div></div>
            </div>
            {report.errors.length > 0 && (
              <div className="mt-4 p-4 bg-red-900/20 text-red-400 rounded text-sm font-mono">
                {report.errors.map((err, i) => <div key={i}>{err}</div>)}
              </div>
            )}
          </section>

          {/* SECCIÓN B/D: NAVEGACIÓN Y DETALLE (Simplificado en una lista de páginas para SSR) */}
          <section>
            <h2 className="text-xl font-bold mb-4 border-b border-gray-800 pb-2">B/D. PÁGINAS Y BOUNDING BOXES</h2>
            <div className="space-y-12">
              {pages.map((page) => {
                const pageAssets = assets.filter(a => a.sourcePages.includes(page.pageNumber));
                return (
                  <div key={page.pageNumber} className="border border-gray-800 rounded bg-black overflow-hidden flex flex-col md:flex-row">
                    <div className="w-full md:w-1/3 p-6 border-r border-gray-800">
                      <div className="text-sm text-gray-500 mb-1">Página {String(page.pageNumber).padStart(3, '0')}</div>
                      <h3 className="font-bold text-lg mb-2">{page.section.toUpperCase()}</h3>
                      <div className="text-xs text-[#00A6C7] mb-4">Proyectos: {page.projectIds.join(', ') || 'N/A'}</div>
                      <div className="text-xs mb-4">Palabras: {page.wordCount}</div>
                      <div className="text-xs mb-4">Recursos extraídos: {pageAssets.length}</div>
                      
                      {page.extractionWarnings.length > 0 && (
                        <div className="text-xs text-yellow-500 mb-4">
                          {page.extractionWarnings.join(', ')}
                        </div>
                      )}
                    </div>
                    <div className="w-full md:w-2/3 bg-gray-900 p-4 relative min-h-[500px]">
                      {/* Render con overlays */}
                      <div className="relative w-full h-full max-w-[500px] mx-auto border border-gray-700 bg-black">
                        <img src={page.renderImage} alt={`Render ${page.pageNumber}`} className="w-full h-auto block" />
                        
                        {/* Overlays de Bounding Boxes */}
                        {pageAssets.map(asset => {
                          const bounds = asset.pageBounds;
                          if (bounds.width === 0) return null;
                          
                          // Color por proyecto
                          let borderColor = '#3b82f6'; // blue
                          if (asset.projectIds.length > 1) borderColor = '#eab308'; // shared yellow
                          else if (asset.section === 'editorial') borderColor = '#a855f7'; // purple
                          else if (asset.role === 'shared') borderColor = '#f97316'; // orange

                          return (
                            <div 
                              key={asset.id} 
                              className="absolute border-2 pointer-events-none group"
                              style={{
                                left: `${bounds.x}%`,
                                top: `${bounds.y}%`,
                                width: `${bounds.width}%`,
                                height: `${bounds.height}%`,
                                borderColor: borderColor,
                                backgroundColor: 'rgba(59, 130, 246, 0.1)'
                              }}
                            >
                              <div className="absolute top-0 left-0 bg-black/80 text-white text-[8px] p-1 whitespace-nowrap transform -translate-y-full opacity-50 group-hover:opacity-100 transition-opacity">
                                {asset.id} ({asset.role})
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

        </div>
      )}
    </main>
  );
}
