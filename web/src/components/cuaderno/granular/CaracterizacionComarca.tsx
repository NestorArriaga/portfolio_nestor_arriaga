'use client';

import { granularVisuals } from '@/content/granularVisuals';
import styles from './GranularVisuals.module.css';

export function CaracterizacionComarca() {
  const visual = granularVisuals.caracterizacion;

  const municipios = [
    'Cuencamé', 'Francisco I. Madero', 'Gómez Palacio', 'Lerdo', 'Mapimí',
    'Matamoros', 'Nazas', 'Rodeo', 'San Juan de Guadalupe', 'San Luis del Cordero',
    'San Pedro', 'Simón Bolívar', 'Tlahualilo', 'Torreón', 'Viesca'
  ];

  return (
    <div className={styles.granularScope} style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
      gap: '2rem',
      background: 'var(--gv-bg)',
      color: 'var(--gv-fg)',
      padding: '2rem',
      borderRadius: '4px',
      alignItems: 'center'
    }}>
      <div style={{ flex: '1 1 50%', maxWidth: '100%' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={visual.asset.src}
          alt={visual.alt}
          style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'contain' }}
          loading="lazy"
          decoding="async"
        />
      </div>

      <div style={{ flex: '1 1 40%', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 500, margin: '0 0 1rem' }}>
            {visual.title}
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', borderBottom: '1px solid var(--gv-line)', paddingBottom: '1rem' }}>
            <div>
              <p className="mono" style={{ fontSize: '0.65rem', textTransform: 'uppercase', opacity: 0.6, margin: 0 }}>Población</p>
              <p style={{ fontSize: '1.25rem', fontWeight: 500, margin: 0 }}>1,629,629</p>
            </div>
            <div>
              <p className="mono" style={{ fontSize: '0.65rem', textTransform: 'uppercase', opacity: 0.6, margin: 0 }}>Distribución</p>
              <p style={{ fontSize: '1.25rem', fontWeight: 500, margin: 0 }}>49.2 % / 50.8 %</p>
            </div>
            <div style={{ gridColumn: '1 / -1' }}>
              <p className="mono" style={{ fontSize: '0.65rem', textTransform: 'uppercase', opacity: 0.6, margin: 0 }}>Extensión</p>
              <p style={{ fontSize: '1.25rem', fontWeight: 500, margin: 0 }}>15 municipios</p>
            </div>
          </div>
        </div>

        <div>
          <ul className="mono" style={{ 
            listStyle: 'none', 
            padding: 0, 
            margin: 0, 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', 
            gap: '0.5rem',
            fontSize: '0.75rem',
            opacity: 0.8
          }}>
            {municipios.map(m => (
              <li key={m}>{m}</li>
            ))}
          </ul>
        </div>

        <div style={{ fontSize: '0.75rem', opacity: 0.6 }} className="mono">
          <p style={{ margin: '0 0 0.5rem' }}>{visual.source}</p>
          <p style={{ margin: 0 }}>{visual.limitations}</p>
        </div>
      </div>
    </div>
  );
}
