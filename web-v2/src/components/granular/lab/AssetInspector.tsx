import { granularAssets } from '@/content/cases/granular/granular-assets';

export default function AssetInspector() {
  return (
    <div className="w-full">
      <h2 className="text-display-sm text-white mb-8">INSPECTOR DE ASSETS VISUALES</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {granularAssets.map((asset: any) => (
          <div key={asset.assetId} className="bg-white/5 border border-white/10 p-4 rounded-md flex flex-col gap-3">
            
            <div className="flex justify-between items-start">
              <div className="text-mono text-[10px] text-white/40 uppercase tracking-widest">{asset.type}</div>
              <div className="text-mono text-[10px] bg-white/10 px-2 py-0.5 rounded text-white/70">P.{asset.page}</div>
            </div>
            
            <h3 className="text-sm font-mono text-[var(--color-accent,white)] break-all">{asset.assetId}</h3>
            
            <div className="grid grid-cols-2 gap-2 mt-2">
              <div>
                <div className="text-mono text-[9px] text-white/30 uppercase">Dimensión</div>
                <div className="text-[12px] text-white/70">{asset.dimension}</div>
              </div>
              <div>
                <div className="text-mono text-[9px] text-white/30 uppercase">Escala</div>
                <div className="text-[12px] text-white/70">{asset.scale}</div>
              </div>
              <div>
                <div className="text-mono text-[9px] text-white/30 uppercase">Rol sugerido</div>
                <div className="text-[12px] text-white/70">{asset.role}</div>
              </div>
              <div>
                <div className="text-mono text-[9px] text-white/30 uppercase">Estado</div>
                <div className={`text-[12px] ${asset.status === 'ambiguous' ? 'text-yellow-400' : 'text-white/70'}`}>
                  {asset.status}
                </div>
              </div>
            </div>
            
          </div>
        ))}
      </div>
    </div>
  );
}
