'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';

interface NavItem {
  label: string;
  path: string;
  external?: boolean;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  navigation: NavItem[];
  pathname: string;
}

export default function GlobalMobileNav({ isOpen, onClose, navigation, pathname }: Props) {
  const overlayRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[100] flex flex-col bg-black/95 backdrop-blur-lg"
      role="dialog"
      aria-modal="true"
      id="mobile-nav"
    >
      <div className="flex items-center justify-between px-6 py-6 border-b border-white/5">
        <span className="text-label text-[var(--color-text-muted)] tracking-widest">NAVEGACIÓN</span>
        <button 
          type="button"
          className="text-label text-white hover:text-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          onClick={onClose}
        >
          CERRAR
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-12 flex flex-col gap-8">
        <Link 
          href="/"
          className={`text-display-sm tracking-tighter ${pathname === '/' ? 'text-accent' : 'text-white'}`}
          onClick={onClose}
        >
          INICIO
        </Link>
        {navigation.map((item, index) => {
          const isActive = pathname === item.path || (item.path !== '/' && pathname.startsWith(item.path));
          if (item.external) {
            return (
              <a 
                key={index}
                href={item.path}
                target="_blank"
                rel="noopener noreferrer"
                className="text-display-sm tracking-tighter text-white/50 hover:text-white transition-colors"
                onClick={onClose}
              >
                {item.label}
              </a>
            );
          }
          return (
            <Link 
              key={index}
              href={item.path}
              className={`text-display-sm tracking-tighter ${isActive ? 'text-accent' : 'text-white'}`}
              onClick={onClose}
              aria-current={isActive ? 'page' : undefined}
            >
              {item.label.replace(' ↗', '')}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
