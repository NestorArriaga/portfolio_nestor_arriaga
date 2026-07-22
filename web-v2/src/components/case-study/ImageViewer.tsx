"use client";

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useSafeMode } from '../home/motion/SafeModeContext';
import { useReducedMotion } from 'framer-motion';

export default function ImageViewer({
  highResSrc,
  altText,
  isOpen,
  onClose
}: {
  highResSrc: string;
  altText: string;
  isOpen: boolean;
  onClose: () => void;
}) {
  const isSafeMode = useSafeMode();
  const shouldReduceMotion = useReducedMotion();
  const disableMotion = !!(isSafeMode || shouldReduceMotion);

  const [scale, setScale] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Bloquear scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Focus management
      setTimeout(() => {
        const closeBtn = document.getElementById('viewer-close-btn');
        closeBtn?.focus();
      }, 100);
    } else {
      document.body.style.overflow = '';
      setScale(1);
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Tecla Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleZoomIn = () => setScale(s => Math.min(s + 0.5, 4));
  const handleZoomOut = () => setScale(s => Math.max(s - 0.5, 1));
  const handleReset = () => setScale(1);

  if (isSafeMode && isOpen) {
    // Fallback estático simple en modo seguro
    return (
      <div className="fixed inset-0 z-50 bg-[#050505] flex flex-col p-4">
        <div className="flex justify-between items-center mb-4">
          <div className="text-mono text-[10px] text-[var(--color-accent)]">VISOR SEGURO</div>
          <button id="viewer-close-btn" onClick={onClose} className="text-white border border-white/20 px-4 py-2 text-label">CERRAR VISOR ✕</button>
        </div>
        <div className="flex-1 relative border border-white/10 overflow-auto">
          <Image src={highResSrc} alt={altText} fill className="object-contain" unoptimized />
        </div>
      </div>
    );
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: disableMotion ? 0.1 : 0.4 }}
          className="fixed inset-0 z-50 bg-[#050505]/95 backdrop-blur-xl flex flex-col items-center justify-center"
          role="dialog"
          aria-modal="true"
          aria-label="Visor ampliado de mapa"
        >
          {/* Controles Top */}
          <div className="absolute top-6 w-full px-6 flex justify-between items-center z-20 pointer-events-none">
            <div className="flex items-center gap-4 pointer-events-auto">
              <button onClick={handleZoomIn} className="w-10 h-10 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors" aria-label="Acercar">
                +
              </button>
              <button onClick={handleZoomOut} className="w-10 h-10 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors" aria-label="Alejar">
                -
              </button>
              <button onClick={handleReset} className="px-4 h-10 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-full text-label text-white transition-colors">
                RESTABLECER
              </button>
            </div>

            <button 
              id="viewer-close-btn"
              onClick={onClose} 
              className="px-6 h-10 flex items-center justify-center bg-[var(--color-accent)]/20 text-[var(--color-accent)] hover:bg-[var(--color-accent)] hover:text-black rounded-full text-label transition-colors pointer-events-auto"
            >
              CERRAR VISOR ✕
            </button>
          </div>

          {/* Área de Imagen Draggeable */}
          <div ref={containerRef} className="relative w-full h-full overflow-hidden flex items-center justify-center cursor-grab active:cursor-grabbing">
            <motion.div
              drag
              dragConstraints={containerRef}
              dragElastic={0.1}
              animate={{ scale }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="relative w-[90vw] h-[90vh]"
            >
              <Image 
                src={highResSrc} 
                alt={altText} 
                fill 
                className="object-contain"
                unoptimized
                priority
              />
            </motion.div>
          </div>
          
        </motion.div>
      )}
    </AnimatePresence>
  );
}
