import Image from 'next/image';
import Link from 'next/link';
import ActiveProjectInfo from './ActiveProjectInfo';
import TechnicalMeta from './TechnicalMeta';

export default function HeroScene({ activeProject, assets, defaultTexture }: { activeProject: any, assets: any[], defaultTexture: string }) {
  // Encontrar el hero-candidate para este proyecto
  const projectAssets = assets.filter(a => a.projectId === activeProject.id);
  const heroAsset = projectAssets.find(a => a.role === 'hero-candidate') || projectAssets[0];
  
  const mainImageSrc = heroAsset?.variants?.heroWide || heroAsset?.variants?.originalClean || defaultTexture;
  const isMap = heroAsset?.type === 'map';
  const objectFitClass = isMap ? 'object-contain object-right' : 'object-cover';
  const focusStyle = heroAsset?.focalPoint && !isMap ? { objectPosition: `${heroAsset.focalPoint.x * 100}% ${heroAsset.focalPoint.y * 100}%` } : {};

  return (
    <div className="absolute top-0 right-0 w-full md:w-[70%] h-full z-10 flex flex-col justify-end pointer-events-none">
      
      {/* CAPA 1: Fondo Ambiental */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-[var(--color-graphite-light)]">
        <Image 
          src={mainImageSrc} 
          alt="Ambient" 
          fill 
          className="object-cover blur-[100px] opacity-40 mix-blend-screen scale-110 saturate-[1.2]" 
          unoptimized 
          priority
        />
        {/* Gradiente de integración */}
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-black)] via-[var(--color-black)]/80 to-transparent w-full md:w-1/2"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-black)] to-transparent h-48 mt-auto"></div>
      </div>

      {/* CAPA 2 y 3: Escena Principal y Textura */}
      <div className="absolute inset-0 z-10 flex items-center justify-end p-6 md:p-12 pb-32">
        <div className="relative w-full h-[70vh] max-w-4xl border border-white/10 shadow-[var(--shadow-image)] bg-[var(--color-black-elevated)] overflow-hidden rounded-[var(--radius-sm)] pointer-events-auto group">
          <Image 
            src={mainImageSrc} 
            alt={activeProject.title} 
            fill 
            className={`${objectFitClass} group-hover:scale-[1.02] transition-transform duration-[2s] ease-out`} 
            style={focusStyle}
            unoptimized 
            priority
          />
          {/* Textura cartográfica superpuesta (Capa 3) */}
          <Image 
            src={defaultTexture} 
            alt="Texture" 
            fill 
            className="object-cover opacity-[0.03] mix-blend-color-dodge pointer-events-none" 
            unoptimized 
          />
        </div>
      </div>

      {/* CAPA 4 y 5: Info y Metadatos */}
      <div className="relative z-20 w-full flex flex-col md:flex-row justify-between items-end p-6 md:p-12 pointer-events-auto">
        <ActiveProjectInfo project={activeProject} />
        <TechnicalMeta project={activeProject} />
      </div>

    </div>
  );
}
