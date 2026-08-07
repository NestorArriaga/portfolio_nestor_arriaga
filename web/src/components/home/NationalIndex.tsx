'use client';

import { useState } from 'react';
import styles from './NationalIndex.module.css';
import type { NationalFrame } from '@/lib/atlas';
import type { ProjectEntry, Territory } from '@/content/home';
import { useReveal, stagger } from '@/lib/motion';

/**
 * Índice territorial por coordenadas.
 *
 * El mapa no es decorativo: cada silueta está en su posición real dentro de un
 * marco EPSG:6372 compartido, calculado desde la extensión de su shapefile. Las
 * distancias entre territorios son verdaderas.
 *
 * Los territorios sin geometría local aparecen en la lista pero no en el mapa.
 * Colocarlos en una posición aproximada los volvería un dato falso; ausentes
 * son un dato honesto sobre lo que falta.
 */

/** Lado mínimo del marco localizador, en unidades del viewBox del marco. */
const MIN_LOCATOR = 46;
/** Separación de la retícula, en kilómetros reales. */
const GRID_KM = 200;

type Props = {
  frame: NationalFrame;
  territories: Territory[];
  projects: ProjectEntry[];
};

export function NationalIndex({ frame, territories, projects }: Props) {
  const { ref, revealed } = useReveal<HTMLDivElement>({ threshold: 0.15 });
  const [active, setActive] = useState<string | null>(null);

  const bySlug = new Map(
    territories.filter((t) => t.maskSlug).map((t) => [t.maskSlug as string, t]),
  );

  const withGeometry = territories.filter((t) => t.maskSlug);
  const withoutGeometry = territories.filter((t) => !t.maskSlug);

  // Retícula cada 200 km reales, convertidos a unidades del viewBox.
  const unitsPerKm = frame.width / (frame.metersWide / 1000);
  const step = GRID_KM * unitsPerKm;
  const gridLines = {
    vertical: Array.from({ length: Math.floor(frame.width / step) }, (_, i) => (i + 1) * step),
    horizontal: Array.from({ length: Math.floor(frame.height / step) }, (_, i) => (i + 1) * step),
  };

  return (
    <div ref={ref} className={styles.index} data-revealed={revealed ? 'true' : 'false'}>
      <div className={styles.mapColumn}>
        <svg
          className={styles.map}
          viewBox={`0 0 ${frame.width} ${frame.height}`}
          role="img"
          aria-label={`Mapa de ${withGeometry.length} territorios con geometría disponible`}
        >
          {/* Retícula de coordenadas cada 200 km reales. Da la referencia
              métrica que un puñado de siluetas sueltas no tiene. */}
          <g className={styles.graticule} aria-hidden="true">
            {gridLines.vertical.map((x) => (
              <line key={`v${x}`} x1={x} y1={0} x2={x} y2={frame.height} vectorEffect="non-scaling-stroke" />
            ))}
            {gridLines.horizontal.map((y) => (
              <line key={`h${y}`} x1={0} y1={y} x2={frame.width} y2={y} vectorEffect="non-scaling-stroke" />
            ))}
          </g>

          {frame.placements.map((p, i) => {
            const territory = bySlug.get(p.slug);
            const isActive = active === territory?.id;

            // A escala real, la Ciudad de México (45 km) es un punto al lado de
            // Yucatán (494 km): la silueta existe pero no se puede encontrar.
            // Un marco localizador de tamaño mínimo la vuelve visible sin
            // falsear su tamaño, que sigue siendo el verdadero dentro del marco.
            const cx = p.x + p.width / 2;
            const cy = p.y + p.height / 2;
            const box = Math.max(p.width, p.height, MIN_LOCATOR);
            const half = box / 2;

            return (
              <g
                key={p.slug}
                className={styles.territory}
                data-active={isActive ? 'true' : 'false'}
                data-small={box > Math.max(p.width, p.height) ? 'true' : 'false'}
                style={{ transitionDelay: stagger(i, 90) }}
                onMouseEnter={() => setActive(territory?.id ?? null)}
                onMouseLeave={() => setActive(null)}
              >
                <rect
                  className={styles.locator}
                  x={cx - half}
                  y={cy - half}
                  width={box}
                  height={box}
                  vectorEffect="non-scaling-stroke"
                />

                {/* Cada silueta se reescala de su viewBox propio a su
                    rectángulo real dentro del marco compartido. */}
                <svg
                  x={p.x}
                  y={p.y}
                  width={p.width}
                  height={p.height}
                  viewBox={p.mask.viewBox}
                  preserveAspectRatio="none"
                  overflow="visible"
                >
                  {p.mask.paths.map((d, j) => (
                    <path key={j} d={d} className={styles.shape} vectorEffect="non-scaling-stroke" />
                  ))}
                </svg>

                {/* El rótulo se acota al marco: el de Mérida caía en y
                    negativa y quedaba cortado por arriba. */}
                <text
                  className={styles.mapLabel}
                  x={cx}
                  y={Math.max(10, cy - half - 7)}
                  textAnchor="middle"
                >
                  {territory?.short ?? p.slug}
                </text>
                <text
                  className={styles.mapCount}
                  x={cx}
                  y={Math.min(frame.height - 3, cy + half + 13)}
                  textAnchor="middle"
                >
                  {territory ? `${territory.projectIds.length}` : ''}
                </text>
              </g>
            );
          })}
        </svg>

        <div className={styles.mapFooter}>
          <div className={styles.mapScale} style={{ width: `${(GRID_KM * unitsPerKm / frame.width) * 100}%` }}>
            <span className={styles.mapScaleBar} />
            <span className={styles.mapScaleLabel}>0<span>{GRID_KM} km</span></span>
          </div>
          <p className={styles.mapNote}>
            {withGeometry.length} de {territories.length} territorios con geometría
            local · EPSG:6372 · retícula de {GRID_KM} km
          </p>
        </div>
      </div>

      <ol className={styles.list}>
        {territories.map((territory) => {
          const items = projects.filter((p) => p.territoryId === territory.id);
          return (
            <li
              key={territory.id}
              className={styles.group}
              data-active={active === territory.id ? 'true' : 'false'}
              data-located={territory.maskSlug ? 'true' : 'false'}
              onMouseEnter={() => setActive(territory.id)}
              onMouseLeave={() => setActive(null)}
            >
              <header className={styles.groupHead}>
                <h3 className={styles.territoryName}>{territory.name}</h3>
                <span className={styles.region}>{territory.region}</span>
                {!territory.maskSlug ? (
                  <span className={styles.missing} title="No hay shapefile local de este territorio">
                    sin geometría
                  </span>
                ) : null}
              </header>

              <ul className={styles.projects}>
                {items.map((project) => (
                  <li key={project.id} className={styles.project}>
                    <span className={styles.projectId}>{project.id}</span>
                    <span className={styles.projectTitle}>{project.title}</span>
                    <span className={styles.projectMeta}>
                      {project.scale}
                      <span aria-hidden="true"> · </span>
                      p.{project.pages.length > 1
                        ? `${project.pages[0]}–${project.pages[project.pages.length - 1]}`
                        : project.pages[0]}
                    </span>
                  </li>
                ))}
              </ul>
            </li>
          );
        })}
      </ol>

      {withoutGeometry.length ? (
        <p className={styles.footnote}>
          {withoutGeometry.map((t) => t.name).join(' y ')}{' '}
          {withoutGeometry.length > 1 ? 'no aparecen' : 'no aparece'} en el mapa: su
          geometría no existe entre los shapefiles disponibles. Situarlos de forma
          aproximada sería inventar una posición.
        </p>
      ) : null}
    </div>
  );
}
