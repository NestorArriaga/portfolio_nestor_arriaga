"use client";

import { useState } from "react";
import Image from "next/image";
import { granularConnectivity } from "@/content/cases/granular/granular-connectivity";
import ImageViewer from "@/components/case-study/ImageViewer";

export default function GranularEnvironmentConnectivityComparison() {
  const { environmentConnectivityComparison } = granularConnectivity;
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  return (
    <section id="comparacion-ambiental-conectividad" className="w-full py-24 md:py-32 flex flex-col gap-12 border-b border-white/10 bg-[#0A0A0A]">
      
      <div className="flex flex-col gap-6 max-w-4xl px-6 md:px-12">
        <h3 className="text-display-md text-white">
          {environmentConnectivityComparison.title}
        </h3>
        <div className="flex flex-col gap-4 text-body text-white/80">
          <p>{environmentConnectivityComparison.text1}</p>
          <p className="border-l-2 border-amber-500/50 pl-4 text-amber-500/90 bg-amber-500/5 py-2">
            {environmentConnectivityComparison.text2}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-6 md:px-12 items-start mt-8">
        
        {/* LADO AMBIENTE */}
        <div className="flex flex-col gap-4">
          <div className="text-mono text-[10px] text-[var(--granular-dim-environment)] uppercase tracking-widest bg-[var(--granular-dim-environment)]/10 px-3 py-1 rounded-full w-fit border border-[var(--granular-dim-environment)]/20 mb-2">
            {environmentConnectivityComparison.envLabel}
          </div>
          <button 
            onClick={() => setIsViewerOpen(true)}
            className="w-full relative aspect-[3/4] md:aspect-square rounded-[var(--radius-panel)] overflow-hidden border border-white/10 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--granular-dim-environment)] bg-[#111]"
          >
            <Image
              src="/portfolio-media/audit/block-20/page-35-soil-audit.png" // Fallback to audit
              alt="Ambiente - Clasificación Funcional del Suelo"
              fill
              className="object-contain transition-transform duration-700 group-hover:scale-[1.02]"
              unoptimized
            />
          </button>
          <p className="text-sm text-white/70 mt-2 border-l border-white/10 pl-3">
            {environmentConnectivityComparison.envDesc}
          </p>
        </div>

        {/* LADO CONECTIVIDAD (FONDO BLANCO) */}
        <div className="flex flex-col gap-4">
          <div className="text-mono text-[10px] text-[var(--granular-dim-connectivity)] uppercase tracking-widest bg-[var(--granular-dim-connectivity)]/10 px-3 py-1 rounded-full w-fit border border-[var(--granular-dim-connectivity)]/20 mb-2">
            {environmentConnectivityComparison.connLabel}
          </div>
          <button 
            onClick={() => setIsViewerOpen(true)}
            className="w-full relative aspect-[3/4] md:aspect-square rounded-[var(--radius-panel)] overflow-hidden border border-white/10 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--granular-dim-connectivity)] bg-white"
          >
            <Image
              src="/portfolio-media/audit/block-20/page-35-connectivity-audit.png" // Fallback to audit
              alt="Conectividad - Distancias y Patrones Espaciales"
              fill
              className="object-contain transition-transform duration-700 group-hover:scale-[1.02]"
              unoptimized
            />
          </button>
          <p className="text-sm text-white/70 mt-2 border-l border-white/10 pl-3">
            {environmentConnectivityComparison.connDesc}
          </p>
        </div>

      </div>

      <ImageViewer 
        isOpen={isViewerOpen}
        onClose={() => setIsViewerOpen(false)}
        highResSrc="/portfolio-media/audit/block-20/page-35-split-audit.png"
        altText="Página 35 Completa - Comparación Ambiente y Conectividad"
      />
    </section>
  );
}
