"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { ProjectGalleryConfig } from '@/content/project-gallery';
import GalleryItem from './GalleryItem';
import { useSafeMode } from '../home/motion/SafeModeContext';
import { useReducedMotion } from 'framer-motion';

export default function EditorialGallery({ 
  projects, 
  assets 
}: { 
  projects: ProjectGalleryConfig[], 
  assets: any[] 
}) {
  const isSafeMode = useSafeMode();
  const shouldReduceMotion = useReducedMotion();
  const disableMotion = !!(isSafeMode || shouldReduceMotion);

  if (projects.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center py-32 px-6 border border-white/5 rounded-[var(--radius-panel)]">
        <div className="text-mono text-[10px] text-[var(--color-accent)] mb-4">0 RESULTADOS</div>
        <h2 className="text-heading text-white text-center mb-2">NO HAY PROYECTOS CON ESTA COMBINACIÓN.</h2>
        <p className="text-body text-white/50 text-center">Intenta limpiar los filtros o seleccionar otra categoría.</p>
      </div>
    );
  }

  return (
    <motion.div 
      layout={!disableMotion}
      className="flex-1 w-full"
    >
      <motion.div 
        layout={!disableMotion}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-min"
      >
        <AnimatePresence mode="popLayout">
          {projects.map((project) => {
            const asset = assets.find(a => a.id === project.featuredAssetId);
            return (
              <GalleryItem 
                key={project.id} 
                config={project} 
                asset={asset} 
                disableMotion={disableMotion} 
              />
            );
          })}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
