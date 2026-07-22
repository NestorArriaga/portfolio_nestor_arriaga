import Reveal from '../home/motion/Reveal';

interface MapLimitationProps {
  message: string;
}

export default function HydrologyMapLimitation({ message }: MapLimitationProps) {
  return (
    <Reveal direction="up" distance={16} className="mt-8 border border-white/20 p-6 rounded-[var(--radius-panel)] bg-white/5">
      <div className="flex gap-4 items-start">
        <div className="text-mono text-[10px] text-[#4a9eb4] shrink-0 mt-1 uppercase tracking-widest">LÍMITE DOCUMENTAL</div>
        <div className="text-label text-white/70">{message}</div>
      </div>
    </Reveal>
  );
}
