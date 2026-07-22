import Reveal from '../home/motion/Reveal';

interface SourceNarrativeClaimProps {
  message: string;
}

export default function SourceNarrativeClaim({ message }: SourceNarrativeClaimProps) {
  return (
    <div className="bg-[#111] border border-white/10 rounded-[var(--radius-panel)] p-6 md:p-8 mt-12">
      <Reveal direction="up" distance={16}>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-2 h-2 rounded-full bg-white/40"></div>
          <div className="text-mono text-[10px] text-white/50 tracking-widest uppercase">
            NARRATIVA DOCUMENTADA
          </div>
        </div>
        <p className="text-label text-white/70 leading-relaxed">
          {message}
        </p>
      </Reveal>
    </div>
  );
}
