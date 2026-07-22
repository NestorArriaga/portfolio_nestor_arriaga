"use client";

export default function UrbanSiteEvidenceMatrix() {
  const rows = [
    { dimension: "TEJIDO URBANO", evidence: "Dos modelos volumétricos", status: "visible-in-figure" },
    { dimension: "BORDES Y ACCESOS", evidence: "Texto fuente y lectura de modelos", status: "explicit-in-text" },
    { dimension: "VIENTO", evidence: "Texto y posible gráfica conceptual", status: "conceptual" },
    { dimension: "CALOR", evidence: "Texto (sin mapa térmico confirmado)", status: "not-visually-documented" },
    { dimension: "TOPOGRAFÍA", evidence: "Condición hundida y formas espaciales (sin cotas)", status: "not-quantified" },
    { dimension: "AGUA", evidence: "Texto e intención de diseño (sin modelación)", status: "explicit-in-text" }
  ];

  const getStatusColor = (status: string) => {
    switch(status) {
      case "visible-in-figure": return "bg-green-500/20 text-green-400 border-green-500/30";
      case "explicit-in-text": return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "conceptual": return "bg-amber-500/20 text-amber-400 border-amber-500/30";
      case "not-visually-documented": return "bg-red-500/20 text-red-400 border-red-500/30";
      case "not-quantified": return "bg-orange-500/20 text-orange-400 border-orange-500/30";
      default: return "bg-white/10 text-white/50 border-white/20";
    }
  };

  const getStatusLabel = (status: string) => {
    return status.replace(/-/g, ' ').toUpperCase();
  };

  return (
    <div className="w-full flex flex-col gap-4 bg-[#0a0a0a] border border-white/10 rounded overflow-hidden">
      <div className="px-6 py-4 border-b border-white/10 bg-white/5">
        <h4 className="text-mono text-xs text-white/70 tracking-widest uppercase">
          MATRIZ DE EVIDENCIA DOCUMENTAL
        </h4>
      </div>
      
      <div className="flex flex-col">
        {rows.map((row, i) => (
          <div key={i} className={`flex flex-col md:flex-row md:items-center gap-4 px-6 py-4 ${i !== rows.length - 1 ? 'border-b border-white/5' : ''}`}>
            <div className="w-48 flex-shrink-0">
              <span className="text-mono text-[10px] text-white/80">{row.dimension}</span>
            </div>
            <div className="flex-1">
              <p className="text-body text-sm text-white/60">{row.evidence}</p>
            </div>
            <div className="w-48 flex-shrink-0 md:text-right">
              <span className={`text-mono text-[8px] px-2 py-1 rounded border ${getStatusColor(row.status)}`}>
                {getStatusLabel(row.status)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
