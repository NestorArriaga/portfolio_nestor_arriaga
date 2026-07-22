import { urbanClaims } from "@/content/cases/urban-challenge/urban-claims";

export default function UrbanLabClaimsView() {
  const getTypeColor = (type: string) => {
    switch (type) {
      case "direct-text": return "text-blue-400 bg-blue-400/10";
      case "source-interpretation": return "text-purple-400 bg-purple-400/10";
      case "design-intention": return "text-green-400 bg-green-400/10";
      case "performance-not-verified": return "text-amber-500 bg-amber-500/10";
      case "direct-figure": return "text-indigo-400 bg-indigo-400/10";
      default: return "text-white/70 bg-white/10";
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-6 md:p-12 flex flex-col gap-12">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-light tracking-wide text-white">CLAIMS & NARRATIVE</h2>
        <p className="text-mono text-xs text-white/50">Clasificación de afirmaciones, interpretaciones y métricas no verificadas.</p>
      </div>

      <div className="flex flex-col gap-4">
        {urbanClaims.map(claim => (
          <div key={claim.id} className="flex flex-col md:flex-row gap-6 p-6 border border-white/10 bg-white/5 rounded-sm">
            <div className="w-full md:w-1/4 flex flex-col gap-2">
              <span className="text-mono text-[10px] text-white/40 uppercase">Tipo de Claim</span>
              <span className={`text-mono text-[10px] px-2 py-1 rounded-sm w-fit ${getTypeColor(claim.type)}`}>
                {claim.type}
              </span>
              
              <div className="flex items-center gap-2 mt-2">
                <span className="text-mono text-[10px] text-white/40 uppercase">Confianza:</span>
                <span className="text-mono text-[10px] text-white">{claim.associationConfidence}</span>
              </div>
            </div>

            <div className="w-full md:w-3/4 flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <span className="text-mono text-[10px] text-white/40 uppercase">Texto Normalizado (Uso público)</span>
                <h4 className="text-lg font-light text-white">{claim.normalizedText}</h4>
              </div>
              
              <div className="flex flex-col gap-1">
                <span className="text-mono text-[10px] text-white/40 uppercase">Fuente Exacta (Página {claim.page})</span>
                <p className="text-sm font-serif text-white/70 italic">&quot;{claim.exactSourceText}&quot;</p>
              </div>

              <div className="flex flex-col gap-1 mt-2 p-3 bg-black/30 rounded border border-white/5">
                <span className="text-mono text-[10px] text-amber-500/70 uppercase">Tratamiento Recomendado</span>
                <p className="text-mono text-xs text-white/80 leading-relaxed">
                  {claim.publicUseRecommendation}
                </p>
                {claim.warnings.length > 0 && (
                  <div className="mt-2 flex gap-2 flex-wrap">
                    {claim.warnings.map(w => (
                      <span key={w} className="text-mono text-[9px] text-amber-500 border border-amber-500/30 px-1.5 py-0.5 rounded">
                        Warning: {w}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
