'use client';

import { useEffect, useRef } from 'react';
import styles from './GranularVisuals.module.css';

interface Props {
  src: string;
  alt: string;
  isOpen: boolean;
  onClose: () => void;
}

export function VisorDiagrama({ src, alt, isOpen, onClose }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
      // Foco al contenedor para accesibilidad
      containerRef.current?.focus();
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className={styles.visorBackdrop}
      role="dialog"
      aria-modal="true"
      aria-label="Visor ampliado de diagrama"
      onClick={onClose}
    >
      <header className={styles.visorHeader}>
        <button
          className="btn"
          data-v="borde"
          onClick={onClose}
          autoFocus
          aria-label="Cerrar visor"
        >
          Cerrar
        </button>
      </header>
      <div
        className={styles.visorContent}
        ref={containerRef}
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          loading="eager"
          decoding="async"
        />
      </div>
    </div>
  );
}
