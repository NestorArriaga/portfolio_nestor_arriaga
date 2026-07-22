import Link from 'next/link';
import Reveal from './motion/Reveal';

export default function ProfilePreview({ profile }: { profile: any }) {
  return (
    <section id="perfil" className="py-24 px-6 md:px-12 border-t border-white/10 bg-[var(--color-black-elevated)]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-16">
        
        <div className="flex-1">
          <Reveal direction="up" distance={32}>
            <h2 className="text-display-lg text-white mb-8">PERFIL</h2>
          </Reveal>
          <Reveal delay={0.1} direction="up" distance={16}>
            <div className="text-body-lg text-white/80 max-w-xl leading-relaxed mb-8">
              {profile.name} es {profile.profession} con trabajo en cartografía, análisis territorial, sistemas socioambientales, planificación rural, conservación y visualización de información espacial.
            </div>
          </Reveal>
          
          <Reveal delay={0.2} direction="up" distance={16}>
            <div className="flex flex-col gap-4">
              <a href={profile.cvUrl} target="_blank" rel="noreferrer" className="group text-label text-[var(--color-accent)] hover:text-white transition-colors flex items-center gap-2">
                <span>DESCARGAR PORTAFOLIO COMPLETO PDF</span>
                <span className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">↗</span>
              </a>
              <a href={`mailto:${profile.email}`} className="text-label text-[var(--color-text-muted)] hover:text-white transition-colors flex items-center gap-2">
                <span>{profile.email}</span>
              </a>
            </div>
          </Reveal>
        </div>

        <div className="flex-1 max-w-md">
          <Reveal delay={0.3} direction="none">
            <div className="text-mono text-[10px] text-white/40 mb-6">ÁREAS DE TRABAJO</div>
            <ul className="flex flex-col gap-4 text-body text-white/70">
              <li className="border-b border-white/5 pb-2">Cartografía y SIG</li>
              <li className="border-b border-white/5 pb-2">Planificación Territorial</li>
              <li className="border-b border-white/5 pb-2">Gestión de Cuencas y Agua</li>
              <li className="border-b border-white/5 pb-2">Diseño de Información Espacial</li>
            </ul>
          </Reveal>
        </div>

      </div>
    </section>
  );
}
