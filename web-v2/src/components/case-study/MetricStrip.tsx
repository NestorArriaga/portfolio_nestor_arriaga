import Reveal from '../home/motion/Reveal';

interface Metric {
  value: string;
  label: string;
  unit?: string;
}

export default function MetricStrip({ metrics }: { metrics: Metric[] }) {
  return (
    <div className="w-full border-t border-b border-white/10 my-16 bg-[#050505]/50">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 divide-y sm:divide-y-0 md:divide-x divide-white/10">
        {metrics.map((metric, idx) => (
          <Reveal 
            key={idx} 
            delay={idx * 0.1} 
            direction="up" 
            distance={16}
            className="flex flex-col py-8 px-4 md:px-8"
          >
            <div className="flex items-baseline gap-1 mb-2">
              <span className="text-display-md text-white tabular-nums tracking-tight">
                {metric.value}
              </span>
              {metric.unit && (
                <span className="text-body-lg text-[var(--color-accent)] font-medium">
                  {metric.unit}
                </span>
              )}
            </div>
            <div className="text-mono text-[10px] text-white/50 uppercase tracking-widest leading-relaxed">
              {metric.label}
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
