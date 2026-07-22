import Reveal from '../home/motion/Reveal';
import Image from 'next/image';

interface LivingGeographyProps {
  title: string;
  text: string;
  subtext: string;
  photoSrc: string;
}

export default function LivingGeographySection({ title, text, subtext, photoSrc }: LivingGeographyProps) {
  return (
    <section className="relative w-full bg-[#050505] py-32 overflow-hidden border-t border-[var(--color-accent)]/20">
      
      {/* FONDO SUTIL PARA AMBIENTACIÓN */}
      <div className="absolute inset-0 z-0">
        <Image 
          src={photoSrc} 
          alt="" 
          fill 
          className="object-cover opacity-20 saturate-50 mix-blend-lighten" 
          unoptimized 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/80 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-transparent"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12 text-center">
        <Reveal direction="up">
          <h2 className="text-display-lg text-white mb-8">{title}</h2>
          <div className="w-12 h-px bg-[var(--color-accent)] mx-auto mb-12"></div>
        </Reveal>

        <Reveal delay={0.1} direction="up" distance={32}>
          <p className="text-display-xs text-white/90 leading-relaxed font-light mb-8">
            {text}
          </p>
          <p className="text-body-lg text-[var(--color-accent)] leading-relaxed font-light max-w-2xl mx-auto">
            {subtext}
          </p>
        </Reveal>
      </div>
      
    </section>
  );
}
