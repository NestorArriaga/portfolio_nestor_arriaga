"use client";

import { urbanAssets } from "@/content/cases/urban-challenge/urban-assets";

export default function UrbanLabHeroView() {
  const heroCandidates = urbanAssets.filter(a => a.roleCandidates.includes("hero-candidate"));

  return (
    <div className="w-full max-w-7xl mx-auto p-6 md:p-12 flex flex-col gap-12">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-light tracking-wide text-white">HERO CANDIDATES</h2>
        <p className="text-mono text-xs text-white/50">Análisis de recursos con potencial para encabezar el caso.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
        {heroCandidates.map(candidate => (
          <div key={candidate.id} className="flex flex-col border border-white/10 bg-white/5 rounded-sm overflow-hidden">
            <div className="aspect-[16/9] bg-[#111] border-b border-white/10 flex items-center justify-center p-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                  src={candidate.previewPath} 
                  alt={candidate.id}
                  className="max-w-full max-h-full object-contain"
                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                />
            </div>
            <div className="p-6 flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <span className="text-mono text-[10px] text-white/40 uppercase">Página {candidate.sourcePage}</span>
                <h3 className="text-lg font-light text-white truncate" title={candidate.id}>{candidate.id}</h3>
              </div>

              <div className="grid grid-cols-2 gap-4 text-mono text-xs">
                <div className="flex flex-col gap-1">
                  <span className="uppercase text-white/40">Confianza Semántica</span>
                  <span className={candidate.semanticConfidence === "high" ? "text-green-400" : "text-amber-500"}>
                    {candidate.semanticConfidence.toUpperCase()}
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="uppercase text-white/40">Licencia / Crédito</span>
                  <span className={candidate.licenseStatus === "cleared" ? "text-green-400" : "text-amber-500"}>
                    {candidate.licenseStatus.toUpperCase()}
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-2 mt-2 pt-4 border-t border-white/10">
                <span className="text-mono text-[10px] text-white/40 uppercase">Evaluación</span>
                <p className="text-sm font-light text-white/70 leading-relaxed">
                  {candidate.id.includes("opening") && "Imagen atractiva pero sin origen ni relación territorial confirmada. Alto riesgo de uso indebido."}
                  {candidate.id.includes("master-plan") && "Representa todo el sistema. Excelente lectura horizontal, ideal para Desktop. Refleja sitio, clima y proyecto."}
                  {candidate.id.includes("central-ring") && "Potente calidad arquitectónica, pero corre el riesgo de reducir todo el master plan a un solo pabellón circular."}
                  {candidate.id.includes("play-ring") && "Muestra dimensión humana y comunitaria, pero es un elemento secundario (juego) del proyecto total."}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
