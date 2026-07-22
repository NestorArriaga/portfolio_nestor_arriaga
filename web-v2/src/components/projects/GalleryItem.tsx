"use client";

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ProjectGalleryConfig } from '@/content/project-gallery';

interface GalleryItemProps {
  config: ProjectGalleryConfig;
  asset: any;
  disableMotion?: boolean;
}

export default function GalleryItem({ config, asset, disableMotion = false }: GalleryItemProps) {
  // Configuración de Grid
  const getGridClasses = () => {
    switch (config.gallerySize) {
      case 'feature': return 'col-span-1 md:col-span-2 lg:col-span-3 row-span-2';
      case 'large': return 'col-span-1 md:col-span-2 row-span-2';
      case 'medium': return 'col-span-1 md:col-span-1 row-span-1';
      case 'small': return 'col-span-1 md:col-span-1 row-span-1';
      default: return 'col-span-1';
    }
  };

  const getAspectClass = () => {
    switch (config.galleryLayout) {
      case 'wide': return 'aspect-[21/9] md:aspect-[3/1]';
      case 'portrait': return 'aspect-[4/5] md:aspect-[3/4]';
      case 'landscape': return 'aspect-[4/3] md:aspect-[3/2]';
      case 'square': return 'aspect-square';
      case 'editorial': return 'aspect-[16/9] md:aspect-[2/1]';
      case 'compact': return 'aspect-[4/3] md:aspect-square';
      default: return 'aspect-video';
    }
  };

  const isMap = asset?.type === 'map';
  const objectFitClass = isMap ? 'object-contain object-center' : 'object-cover';
  const focusStyle = asset?.focalPoint && !isMap ? { objectPosition: `${asset.focalPoint.x * 100}% ${asset.focalPoint.y * 100}%` } : {};
  
  // Fallback si no hay asset
  const imageSrc = asset?.variants?.gallery || asset?.variants?.originalClean || "/portfolio-media/curated/identity/identity-relief-hero-wide-original-clean.webp";

  // Variaciones de título (Superpuesto o Exterior)
  const isOverlayTitle = config.gallerySize === 'feature' || (config.gallerySize === 'large' && !isMap);

  return (
    <motion.div 
      layout={!disableMotion}
      initial={disableMotion ? {} : { opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.4 }}
      className={`group relative flex flex-col gap-3 ${getGridClasses()}`}
    >
      <Link href={`/projects/${config.slug}`} scroll={false} className="absolute inset-0 z-20">
        <span className="sr-only">Abrir proyecto {config.id}</span>
      </Link>

      <div className={`relative w-full overflow-hidden rounded-[var(--radius-sm)] bg-[var(--color-black-elevated)] border border-white/5 group-hover:border-white/20 transition-colors ${getAspectClass()}`}>
        <Image 
          src={imageSrc}
          alt={config.summary}
          fill
          className={`
            ${objectFitClass} 
            ${disableMotion ? '' : 'transition-transform duration-[1.5s] ease-out group-hover:scale-[1.025]'}
          `}
          style={focusStyle}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          unoptimized
        />
        
        {/* Overlay para texto superpuesto */}
        {isOverlayTitle && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6 pointer-events-none">
            <div className="text-mono text-[10px] text-white/60 mb-2">{config.id} • {config.themes[0]}</div>
            <h3 className="text-heading text-white mb-1 drop-shadow-md">{config.slug.split('-').join(' ').toUpperCase()}</h3>
            <div className="text-body text-white/80 line-clamp-2 max-w-2xl">{config.summary}</div>
            {config.status && (
              <div className="mt-3 w-fit border border-[var(--color-accent)] text-[var(--color-accent)] px-2 py-1 rounded text-[9px] tracking-widest uppercase bg-[var(--color-accent)]/10">
                {config.status}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Título Exterior */}
      {!isOverlayTitle && (
        <div className="flex flex-col gap-1 px-1">
          <div className="text-mono text-[10px] text-[var(--color-text-muted)] group-hover:text-[var(--color-accent)] transition-colors">
            {config.id} • {config.themes[0]}
          </div>
          <h3 className="text-body font-medium text-white group-hover:text-white line-clamp-2">
            {config.summary}
          </h3>
          {config.status && (
            <div className="mt-1 w-fit border border-[var(--color-accent)] text-[var(--color-accent)] px-2 py-0.5 rounded text-[9px] tracking-widest uppercase bg-[var(--color-accent)]/10">
              {config.status}
            </div>
          )}
        </div>
      )}
    </motion.div>
  );
}
