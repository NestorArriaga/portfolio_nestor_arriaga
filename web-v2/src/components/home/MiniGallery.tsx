import Image from 'next/image';
import Link from 'next/link';

export default function MiniGallery({ items, assets }: { items: any[], assets: any[] }) {
  return (
    <div className="absolute top-1/3 left-6 md:left-12 z-20 flex flex-col gap-4 pointer-events-auto hidden lg:flex">
      {items.map((item, idx) => {
        const asset = assets.find(a => a.id === item.assetId);
        const src = asset?.variants?.thumbnail || asset?.variants?.originalClean || '/portfolio-media/curated/identity/identity-relief-hero-wide-original-clean.webp';
        
        return (
          <div key={idx} className="group flex items-center gap-4">
            <div className="relative w-16 h-24 border border-white/10 overflow-hidden cursor-pointer">
              <Image src={src} alt={item.title} fill className="object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500" unoptimized />
            </div>
            <div className="flex flex-col opacity-0 group-hover:opacity-100 transition-opacity -translate-x-4 group-hover:translate-x-0 duration-300">
              <span className="text-mono text-[10px] text-white/50">{item.territory}</span>
              <span className="text-label text-white">{item.title}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
