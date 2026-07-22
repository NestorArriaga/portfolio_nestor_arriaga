import Link from 'next/link';

export default function PortfolioHeader() {
  return (
    <header className="absolute top-0 left-0 w-full z-50 flex items-start justify-between px-6 py-8 md:px-12 md:py-12 pointer-events-none">
      <div className="flex-1 pointer-events-auto">
        <Link href="/" className="text-label text-[var(--color-white)] tracking-[0.1em] hover:text-[var(--color-accent)] transition-colors">
          NÉSTOR ARRIAGA
        </Link>
      </div>
      
      <div className="hidden md:flex flex-1 justify-center pointer-events-auto">
        <div className="text-label text-[var(--color-text-muted)] tracking-widest text-center">
          PORTAFOLIO<br/>2026
        </div>
      </div>
      
      <div className="flex-1 flex justify-end pointer-events-auto">
        <nav className="flex flex-col items-end gap-3 text-label text-[var(--color-text-muted)] tracking-[0.05em]">
          <Link href="/projects" className="text-[var(--color-white)] hover:text-[var(--color-accent)] transition-colors">
            PROYECTOS
          </Link>
          <span className="opacity-40 cursor-not-allowed group relative">
            ATLAS
            <span className="absolute right-full mr-4 opacity-0 group-hover:opacity-100 transition-opacity text-[8px] whitespace-nowrap">PRÓXIMAMENTE</span>
          </span>
          <Link href="#perfil" className="hover:text-[var(--color-white)] transition-colors">
            PERFIL
          </Link>
          <a href="/Portafolio_pliego.pdf" target="_blank" rel="noreferrer" className="hover:text-[var(--color-white)] transition-colors">
            PDF ↗
          </a>
        </nav>
      </div>
    </header>
  );
}
