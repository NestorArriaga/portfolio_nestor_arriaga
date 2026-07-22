import Link from 'next/link';
import Image from 'next/image';
import { ProjectGalleryConfig } from '@/content/project-gallery';

export default function ProjectIndexRow({ config, asset }: { config: ProjectGalleryConfig, asset: any }) {
  const imageSrc = asset?.variants?.thumbnail || asset?.variants?.originalClean || "/portfolio-media/curated/identity/identity-relief-hero-wide-original-clean.webp";

  return (
    <Link href={`/projects/${config.slug}`} scroll={false} className="group flex flex-col md:flex-row items-start md:items-center justify-between py-6 border-b border-white/5 hover:border-white/20 transition-colors relative">
      <div className="flex items-center gap-6 w-full md:w-auto">
        <div className="text-mono text-[10px] text-white/40 w-6 shrink-0">{config.id}</div>
        
        {/* Miniatura Visible solo en hover (Escritorio) o estática en móvil si hay espacio */}
        <div className="hidden md:block relative w-16 h-12 bg-white/5 rounded-sm overflow-hidden shrink-0 opacity-50 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300">
          <Image src={imageSrc} alt="" fill className="object-cover" unoptimized sizes="64px" />
        </div>

        <div className="flex flex-col">
          <h3 className="text-body font-medium text-white group-hover:text-[var(--color-accent)] transition-colors">{config.slug.split('-').join(' ').toUpperCase()}</h3>
          <div className="text-label text-[var(--color-text-muted)] mt-1">{config.themes.slice(0,2).join(', ')}</div>
        </div>
      </div>
      
      <div className="mt-4 md:mt-0 flex items-center justify-between w-full md:w-auto gap-8">
        <div className="text-caption text-white/60 md:text-right md:w-48 line-clamp-1">
          {config.themes.includes("Ciudad de México") ? "Ciudad de México" : config.themes[0]} 
        </div>
        
        <div className="text-label text-[var(--color-accent)] opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2">
          ABRIR <span className="group-hover:translate-x-1 transition-transform">→</span>
        </div>
      </div>

      {/* Línea animada inferior (Decorative) */}
      <div className="absolute bottom-[-1px] left-0 h-[1px] bg-[var(--color-accent)] w-0 group-hover:w-full transition-all duration-500 ease-out"></div>
    </Link>
  );
}
