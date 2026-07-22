"use client";

import { urbanClosing } from "@/content/cases/urban-challenge/urban-closing";

export default function UrbanClosingSynthesis() {
  return (
    <div className="w-full flex flex-col border border-white/10 rounded-sm overflow-hidden bg-black/20">
      
      <div className="p-6 border-b border-white/10">
        <h4 className="text-mono text-[10px] text-white/50 tracking-widest uppercase mb-2">
          {urbanClosing.synthesis.title}
        </h4>
        <p className="text-xs text-white/70 font-light leading-relaxed">
          {urbanClosing.synthesis.description}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-white/10">
        {urbanClosing.synthesis.items.map((item, idx) => (
          <div key={item.id} className="p-6 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <span className="text-mono text-[9px] text-[var(--urban-accent)] opacity-50 uppercase tracking-widest">
                FASE 0{idx + 1}
              </span>
              <h5 className="text-xs text-white uppercase tracking-wider font-light">
                {item.title}
              </h5>
            </div>
            <p className="text-xs text-white/60 font-light leading-relaxed">
              {item.description}
            </p>
          </div>
        ))}
      </div>
      
    </div>
  );
}
