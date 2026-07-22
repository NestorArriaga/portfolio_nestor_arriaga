import Link from 'next/link';
import Reveal from './motion/Reveal';

export default function TerritoryIndex({ territories }: { territories: any[] }) {
  return (
    <section className="py-24 px-6 md:px-12 border-t border-white/10 bg-[var(--color-black)]">
      <div className="max-w-7xl mx-auto">
        <Reveal direction="up" distance={32}>
          <h2 className="text-display-lg text-white mb-16">TERRITORIOS</h2>
        </Reveal>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {territories.map((t, idx) => (
            <Reveal key={idx} delay={idx * 0.1} direction="up" distance={16} amount="some">
              <div className="group relative border-l border-white/20 pl-6 hover:border-[var(--color-accent)] transition-colors h-full">
                <div className="text-mono text-[10px] mb-2" style={{ color: t.accent }}>PROYECTOS {t.range}</div>
                <h3 className="text-heading text-white mb-4 group-hover:text-[var(--color-accent)] transition-colors">{t.name}</h3>
                <div className="text-caption text-white/50">{t.count} {t.count === 1 ? 'Proyecto' : 'Proyectos'}</div>
                <Link href={`/?project=${t.range.split('–')[0]}`} className="absolute inset-0 z-10" scroll={false}>
                  <span className="sr-only">Explorar territorio {t.name}</span>
                </Link>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
