'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { siteNavigation } from '@/content/site/site-navigation';
import GlobalMobileNav from './GlobalMobileNav';

export default function GlobalHeader() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header 
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled ? 'bg-black/90 backdrop-blur-md border-b border-white/5 py-4' : 'bg-transparent py-6'
        } px-6 md:px-12 flex items-center justify-between pointer-events-none`}
      >
        <div className="flex-1 pointer-events-auto">
          <Link 
            href="/" 
            className="text-label text-[var(--color-white)] tracking-[0.1em] hover:text-[var(--color-accent)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            NÉSTOR ARRIAGA
          </Link>
        </div>
        
        <div className="hidden md:flex flex-1 justify-center pointer-events-auto">
          <nav className="flex items-center gap-8 text-label tracking-[0.05em]" aria-label="Global Navigation">
            {siteNavigation.items.map((item, index) => {
              const isActive = pathname === item.path;
              if (item.external) {
                return (
                  <a 
                    key={index} 
                    href={item.path} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-[var(--color-text-muted)] hover:text-[var(--color-white)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                  >
                    {item.label}
                  </a>
                );
              }
              return (
                <Link 
                  key={index} 
                  href={item.path}
                  aria-current={isActive ? 'page' : undefined}
                  className={`${isActive ? 'text-[var(--color-white)]' : 'text-[var(--color-text-muted)]'} hover:text-[var(--color-accent)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Mobile menu toggle */}
        <div className="md:hidden flex-1 flex justify-end pointer-events-auto">
          <button 
            type="button"
            className="text-label text-[var(--color-white)] tracking-[0.1em] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            onClick={() => setMobileNavOpen(true)}
            aria-expanded={mobileNavOpen}
            aria-controls="mobile-nav"
          >
            MENÚ
          </button>
        </div>
      </header>

      <GlobalMobileNav 
        isOpen={mobileNavOpen} 
        onClose={() => setMobileNavOpen(false)} 
        navigation={siteNavigation.items}
        pathname={pathname || ''}
      />
    </>
  );
}
