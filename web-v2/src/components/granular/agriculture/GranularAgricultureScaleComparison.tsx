"use client";

import { granularAgriculture } from "@/content/cases/granular/granular-agriculture";

export default function GranularAgricultureScaleComparison() {
  const { scaleComparison } = granularAgriculture;

  return (
    <section id="lectura-agricola" className="w-full py-24 md:py-32 flex flex-col gap-12 border-b border-white/10">
      
      <div className="flex flex-col gap-6 max-w-3xl px-6 md:px-0">
        <h3 className="text-display-md text-white">
          {scaleComparison.title}
        </h3>
        <div className="flex flex-col gap-4 text-body text-white/80">
          <p>{scaleComparison.text1}</p>
          <p>{scaleComparison.text2}</p>
        </div>
        <p className="text-xs text-white/60 border-l-2 border-white/20 pl-4 py-1 italic mt-2">
          {scaleComparison.disclaimer}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-6 md:px-0 mt-8">
        
        {/* ESCALA MUNICIPAL */}
        <div className="flex flex-col gap-4 p-6 md:p-8 bg-white/5 border border-white/10 rounded-[var(--radius-panel)] hover:border-[var(--granular-dim-agriculture)]/50 transition-colors focus-within:ring-2 focus-within:ring-[var(--granular-dim-agriculture)]" tabIndex={0}>
           <span className="text-mono text-[10px] text-[var(--granular-dim-agriculture)] uppercase tracking-widest border-b border-white/10 pb-4">
             Escala Municipal
           </span>
           <p className="text-sm md:text-base text-white/80 pt-2">
             Utilizada en la medición de <span className="text-white">riego y temporal</span>, la <span className="text-white">estructura de cultivos</span> y la <span className="text-white">vulnerabilidad a la sequía</span>. Organiza patrones productivos amplios.
           </p>
        </div>

        {/* ESCALA DE LOCALIDAD */}
        <div className="flex flex-col gap-4 p-6 md:p-8 bg-white/5 border border-white/10 rounded-[var(--radius-panel)] hover:border-[var(--granular-dim-agriculture)]/50 transition-colors focus-within:ring-2 focus-within:ring-[var(--granular-dim-agriculture)]" tabIndex={0}>
           <span className="text-mono text-[10px] text-[var(--granular-dim-agriculture)] uppercase tracking-widest border-b border-white/10 pb-4">
             Escala de Localidad
           </span>
           <p className="text-sm md:text-base text-white/80 pt-2">
             Utilizada en la <span className="text-white">clasificación agroproductiva</span> y para describir la <span className="text-white">heterogeneidad interna</span>. Permite observar cómo las estructuras productivas se fragmentan en configuraciones más desiguales.
           </p>
        </div>

      </div>

    </section>
  );
}
