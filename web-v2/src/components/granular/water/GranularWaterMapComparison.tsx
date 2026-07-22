"use client";

import Image from "next/image";
import { granularWater } from "@/content/cases/granular/granular-water";

export default function GranularWaterMapComparison() {
  const { integratedReading } = granularWater;

  return (
    <section id="lectura-hidrica" className="w-full py-24 md:py-32 flex flex-col gap-12 border-b border-white/10">
      
      <div className="flex flex-col gap-6 max-w-3xl px-6 md:px-0">
        <h3 className="text-display-md text-white">
          {integratedReading.title}
        </h3>
        <div className="flex flex-col gap-4 text-body text-white/80">
          <p>{integratedReading.text1}</p>
          <p className="border-l-2 border-white/20 pl-4 py-1 text-white/70 italic">
            {integratedReading.text2}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-6 md:px-0">
        
        {/* MAPA CALIDAD */}
        <div className="flex flex-col gap-3">
          <div className="relative aspect-[4/3] rounded-[var(--radius-panel)] overflow-hidden border border-white/10 bg-[#0A0A0A]">
            <Image
              src="/portfolio-media/audit/block-17/page-23-water-quality-audit.png" // Fallback to audit image
              alt="Comparación: Calidad del agua"
              fill
              className="object-contain"
              unoptimized
            />
          </div>
          <div className="text-mono text-[10px] text-white/50 uppercase tracking-widest flex items-center justify-between">
            <span>Calidad del Agua</span>
            <span>PÁG 23</span>
          </div>
        </div>

        {/* MAPA ACUÍFEROS */}
        <div className="flex flex-col gap-3">
          <div className="relative aspect-[4/3] rounded-[var(--radius-panel)] overflow-hidden border border-white/10 bg-[#0A0A0A]">
            <Image
              src="/portfolio-media/audit/block-17/page-24-aquifers-audit.png" // Fallback to audit image
              alt="Comparación: Estado de Acuíferos"
              fill
              className="object-contain"
              unoptimized
            />
          </div>
          <div className="text-mono text-[10px] text-[var(--granular-dim-water)]/70 uppercase tracking-widest flex items-center justify-between">
            <span>Estado de Acuíferos</span>
            <span>PÁG 24</span>
          </div>
        </div>

      </div>
      
      <div className="px-6 md:px-0">
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 bg-[#111] border border-white/5 p-6 rounded-[var(--radius-panel)]">
            <div className="flex flex-col gap-2">
               <span className="text-mono text-[9px] text-white/40 uppercase tracking-widest">VARIABLE REPRESENTADA</span>
               <div className="text-xs text-white/70 flex flex-col gap-2">
                  <p><span className="text-white/90">Calidad:</span> severidad asociada con contaminantes mencionados.</p>
                  <p><span className="text-[var(--granular-dim-water)]">Acuíferos:</span> relación textual entre extracción y recarga.</p>
               </div>
            </div>
            <div className="flex flex-col gap-2">
               <span className="text-mono text-[9px] text-white/40 uppercase tracking-widest">CATEGORÍAS</span>
               <div className="text-xs text-white/70 flex flex-col gap-2">
                  <p><span className="text-white/90">Calidad:</span> Alto, Medio, Bajo y Sin riesgo aparente.</p>
                  <p><span className="text-[var(--granular-dim-water)]">Acuíferos:</span> Crítico, Límite, Sobreexplotado y Sostenible.</p>
               </div>
            </div>
            <div className="flex flex-col gap-2 md:col-span-2 lg:col-span-1">
               <span className="text-mono text-[9px] text-amber-500/70 uppercase tracking-widest">ADVERTENCIA PRINCIPAL</span>
               <div className="text-xs text-white/70 flex flex-col gap-2">
                  <p><span className="text-white/90">Calidad:</span> el texto describe tres niveles, pero la leyenda contiene cuatro.</p>
                  <p><span className="text-[var(--granular-dim-water)]">Acuíferos:</span> los rangos de Crítico y Sobreexplotado se superponen.</p>
               </div>
            </div>
         </div>
      </div>

    </section>
  );
}
