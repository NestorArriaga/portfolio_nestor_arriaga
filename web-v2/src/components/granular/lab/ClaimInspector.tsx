import { granularClaims } from '@/content/cases/granular/granular-claims';

export default function ClaimInspector() {
  return (
    <div className="w-full">
      <h2 className="text-display-sm text-white mb-8">REGISTRO DE AFIRMACIONES Y CIFRAS</h2>
      
      <div className="flex flex-col gap-4 max-w-4xl">
        {granularClaims.map(claim => (
          <div key={claim.id} className="bg-white/5 border border-white/10 p-4 rounded-md">
            
            <div className="flex justify-between items-start mb-3">
              <div className="text-mono text-[10px] text-white/40 uppercase tracking-widest">{claim.dimension}</div>
              <div className="text-mono text-[10px] bg-white/10 px-2 py-0.5 rounded text-white/70">P.{claim.page}</div>
            </div>
            
            <p className="text-body font-medium text-white/90 mb-4">&quot;{claim.text}&quot;</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-auto pt-4 border-t border-white/10">
              <div>
                <div className="text-mono text-[9px] text-white/30 uppercase">Tipo de afirmación</div>
                <div className={`text-[12px] font-mono mt-1 ${
                  claim.type === 'source-narrative' || claim.type === 'source-interpretation' 
                  ? 'text-[#e91e63]' 
                  : 'text-white/70'
                }`}>
                  {claim.type}
                </div>
              </div>
              <div>
                <div className="text-mono text-[9px] text-white/30 uppercase">Estatus visual</div>
                <div className="text-[12px] font-mono mt-1 text-white/70">
                  {claim.status}
                </div>
              </div>
            </div>
            
          </div>
        ))}
      </div>
    </div>
  );
}
