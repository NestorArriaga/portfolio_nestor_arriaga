import Reveal from '../home/motion/Reveal';

interface SectorAptitudeDefinitionProps {
  text: string;
  attribution: string;
}

export default function SectorAptitudeDefinition({ text, attribution }: SectorAptitudeDefinitionProps) {
  return (
    <Reveal direction="up" distance={32}>
      <figure className="border-l-2 border-[var(--color-accent)] pl-6 py-2 mb-12">
        <blockquote className="text-body-lg text-[var(--color-accent)] italic mb-3 font-light leading-relaxed">
          “{text}”
        </blockquote>
        <figcaption className="text-mono text-[10px] text-white/50 uppercase tracking-widest">— {attribution}</figcaption>
      </figure>
    </Reveal>
  );
}
