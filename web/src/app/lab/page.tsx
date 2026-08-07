import type { Metadata } from 'next';

import styles from './lab.module.css';
import { canvasRatio, getAtlasManifest, getLayers, getTerritoryMask, layerColor, layerImage, listTerritoryMasks } from '@/lib/atlas';
import { PATTERN_IDS, PATTERN_LABELS, pattern } from '@/components/atlas/CartoPatterns';
import { CARTO_ICON_NAMES, CartoIcon } from '@/components/atlas/CartoIcon';
import { CoordinateFrame, NorthArrow, ScaleBar } from '@/components/atlas/CoordinateFrame';
import { CartographicPlate, PlateFacts, PlateLede, PlateTitle } from '@/components/atlas/CartographicPlate';
import { LegendRail } from '@/components/atlas/LegendRail';
import { LayerStack, StackLayer } from '@/components/atlas/LayerStack';
import { TerritoryMask } from '@/components/atlas/TerritoryMask';
import { TechnicalCallout } from '@/components/atlas/TechnicalCallout';
import { SignalPoster } from '@/components/atlas/SignalPoster';
import { TextureOverlay } from '@/components/atlas/TextureOverlay';

export const metadata: Metadata = {
  title: 'Laboratorio visual — Atlas',
  robots: { index: false, follow: false },
};

/**
 * Laboratorio visual del sistema.
 *
 * Ruta interna, no indexable. Muestra cada primitiva con activos reales, no con
 * relleno: los mapas son las capas de la Comarca Lagunera producidas en la Fase
 * 1a y las siluetas vienen de los shapefiles. Sirve para comparar contra las
 * nueve referencias antes de tocar los quince casos.
 */
export default function LabPage() {
  const manifest = getAtlasManifest();

  // Capas reales de la Comarca: relieve como base y red de conectividad encima.
  const conectividad = getLayers('comarca-base-conectividad');
  const relieve = conectividad.find((l) => l.layer === 2);
  const red = conectividad.find((l) => l.layer === 4);
  const relieveImg = relieve ? layerImage(relieve, 'gray') : null;
  const redImg = red ? layerImage(red) : null;

  const conectividadRatio = canvasRatio('comarca-base-conectividad');
  // El acento de la lámina es el color con el que la red está dibujada, no un
  // token elegido a mano: si no coinciden, la leyenda describe otro mapa.
  const redColor = red ? layerColor(red) : 'var(--g-conectividad)';

  const sequia = getLayers('sequia', 'overlay')[0];
  const sequiaImg = sequia ? layerImage(sequia) : null;
  const sequiaRatio = canvasRatio('sequia');

  const masks = listTerritoryMasks();
  const yucatan = getTerritoryMask('yucatan');
  const aguascalientes = getTerritoryMask('aguascalientes');

  const usableLayers = manifest.files.reduce(
    (n, f) => n + f.layers.filter((l) => !('error' in l)).length, 0,
  );

  return (
    <main className={styles.page}>
      <header className={styles.masthead}>
        <p className="technical">Laboratorio visual · no indexable</p>
        <h1 className={styles.h1}>Sistema del atlas</h1>
        <p className={styles.lede}>
          Cada primitiva se muestra con material real del portafolio. Ningún dato,
          leyenda ni geometría de esta página es de relleno.
        </p>
        <dl className={styles.stats}>
          <div><dt>Archivos fuente</dt><dd>{manifest.files.length}</dd></div>
          <div><dt>Capas utilizables</dt><dd>{usableLayers}</dd></div>
          <div><dt>Máscaras</dt><dd>{masks.length}</dd></div>
          <div><dt>Patrones</dt><dd>{PATTERN_IDS.length}</dd></div>
          <div><dt>Íconos</dt><dd>{CARTO_ICON_NAMES.length}</dd></div>
        </dl>
      </header>

      {/* --- Color ---------------------------------------------------------- */}
      <Section id="color" number="01" title="Color" note="Base y acentos por familia. Máximo dos acentos simultáneos.">
        <div className={styles.swatches}>
          {[
            ['--black', 'Negro'], ['--black-soft', 'Negro suave'], ['--charcoal', 'Carbón'],
            ['--paper', 'Papel'], ['--paper-cool', 'Papel frío'], ['--white', 'Blanco'],
            ['--p01-verde', 'P01 verde'], ['--p02-carbono', 'P02 carbono'],
            ['--p03-cafe', 'P03 café'], ['--p04-cultivo', 'P04 cultivo'],
            ['--p05-mineral', 'P05 mineral'], ['--p05-registro', 'P05 registro'],
            ['--p09-verde', 'P09 verde'], ['--p09-agua', 'P09 agua'],
            ['--p09-senal', 'P09 señal'], ['--p15-bosque', 'P15 bosque'],
            ['--p15-madera', 'P15 madera'], ['--signal', 'Señal'],
          ].map(([token, label]) => (
            <figure key={token} className={styles.swatch}>
              <div className={styles.chip} style={{ background: `var(${token})` }} />
              <figcaption>
                <span>{label}</span>
                <code>{token}</code>
              </figcaption>
            </figure>
          ))}
        </div>
      </Section>

      {/* --- Tipografía ----------------------------------------------------- */}
      <Section id="tipografia" number="02" title="Tipografía" note="Geist variable. Falta una serif editorial para citas en pausas blancas.">
        <div className={styles.typeSpecimens}>
          <p className={styles.typeCase}>Comarca Lagunera</p>
          <p className={styles.typeDisplay}>Vulnerabilidad a la sequía</p>
          <p className={styles.typeHeading}>Pilar I · Agua</p>
          <p className={styles.typeBody}>
            El cuerpo se compone entre 16 y 20 px con un ancho de línea de 45 a 75
            caracteres. Por encima de esa medida el ojo pierde el renglón al volver,
            y una lámina densa se vuelve ilegible antes que fea.
          </p>
          <p className="technical">Etiqueta técnica · 11 px · 12 px en móvil</p>
        </div>
      </Section>

      {/* --- Patrones ------------------------------------------------------- */}
      <Section id="patrones" number="03" title="Hachuras y tramas" note="Todas heredan currentColor y aceptan opacidad.">
        <div className={styles.patterns}>
          {PATTERN_IDS.map((id) => (
            <figure key={id} className={styles.patternCell}>
              <svg viewBox="0 0 100 60" className={styles.patternSwatch} aria-hidden="true">
                <rect width="100" height="60" fill={pattern(id)} />
                <rect width="100" height="60" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.35" />
              </svg>
              <figcaption>
                <span>{PATTERN_LABELS[id]}</span>
                <code>{id}</code>
              </figcaption>
            </figure>
          ))}
        </div>
      </Section>

      {/* --- Íconos --------------------------------------------------------- */}
      <Section id="iconos" number="04" title="Íconos cartográficos" note="24 unidades, trazo 1.25, terminales rectas.">
        <ul className={styles.icons}>
          {CARTO_ICON_NAMES.map((name) => (
            <li key={name}>
              <CartoIcon name={name} size={28} />
              <code>{name}</code>
            </li>
          ))}
        </ul>
      </Section>

      {/* --- Instrumentos --------------------------------------------------- */}
      <Section id="instrumentos" number="05" title="Escala, norte y coordenadas" note="La escala solo se dibuja si se conoce la extensión real.">
        <div className={styles.instruments}>
          <div className={styles.instrument}>
            <ScaleBar metersPerField={120_000} />
            <p className="technical">Campo de 120 km</p>
          </div>
          <div className={styles.instrument}>
            <NorthArrow size={48} />
            <p className="technical">Orientación</p>
          </div>
          <div className={styles.instrumentWide}>
            <CoordinateFrame
              extent={{ bbox: [2410092, 1067540, 2516929, 1159778], srs: 'EPSG:6372' }}
              columns={4}
              rows={3}
            >
              {aguascalientes ? (
                <div style={{ color: 'var(--p09-verde)', padding: '1.5rem' }}>
                  <TerritoryMask mask={aguascalientes} filled title="Aguascalientes" />
                </div>
              ) : null}
            </CoordinateFrame>
          </div>
        </div>
      </Section>

      {/* --- Máscaras ------------------------------------------------------- */}
      <Section id="mascaras" number="06" title="Máscaras territoriales" note="Shapefiles reales reproyectados a EPSG:6372. El contorno se traza al entrar.">
        <div className={styles.masks}>
          {masks.map((meta) => {
            const mask = getTerritoryMask(meta.slug);
            if (!mask) return null;
            return (
              <figure key={meta.slug} className={styles.maskCell}>
                <div className={styles.maskFigure}>
                  <TerritoryMask mask={mask} filled title={meta.slug} />
                </div>
                <figcaption>
                  <span>{meta.slug}</span>
                  <code>{meta.span_km[0]} × {meta.span_km[1]} km · {meta.points} pts</code>
                </figcaption>
              </figure>
            );
          })}
        </div>
      </Section>

      {/* --- Lámina completa ------------------------------------------------ */}
      <Section id="lamina" number="07" title="Lámina cartográfica" note="28 % de columna y 72 % de campo, con capas reales de la Comarca Lagunera." bare>
        <CartographicPlate
          accent={redColor}
          marks={<>
            <span>P14 · GRANULAR</span>
            <span>Comarca Lagunera · Coahuila–Durango</span>
            <span>Conectividad</span>
          </>}
          heading={
            <>
              <PlateTitle kicker="Pilar VI · Conectividad">Red de conectividad</PlateTitle>
              <PlateLede>
                Relieve sombreado y red de conectividad, separados del mismo archivo
                fuente y recompuestos como capas independientes.
              </PlateLede>
            </>
          }
          aside={
            <LegendRail
              groups={[
                {
                  title: 'Base territorial',
                  keys: [
                    { kind: 'area', label: 'Relieve sombreado', color: 'var(--ink-muted)', note: 'hillshade, escala de grises' },
                  ],
                },
                {
                  title: 'Conectividad',
                  keys: [
                    { kind: 'line', label: 'Enlace de conectividad', color: redColor, note: redColor },
                    { kind: 'node', label: 'Nodo de convergencia', color: redColor, halo: true },
                  ],
                },
              ]}
            >
              <ScaleBar metersPerField={180_000} />
            </LegendRail>
          }
          detail={
            <>
              <PlateFacts items={[
                { label: 'Fuente', value: 'comarca_base_conectividad.svg' },
                { label: 'Capas', value: `${conectividad.length} separadas de 10 mosaicos` },
                { label: 'Nativo', value: relieve ? `${relieve.trimmed_px[0]}×${relieve.trimmed_px[1]} px` : '—' },
              ]} />
              <p>
                La leyenda describe únicamente capas presentes en el mapa. Las
                clases de la red no se han verificado todavía contra el PDF.
              </p>
            </>
          }
        >
          {relieveImg ? (
            <div className={styles.plateField}>
              <LayerStack ratio={conectividadRatio ?? relieveImg.width / relieveImg.height}>
                <StackLayer {...relieveImg} step={0} opacity={0.85} />
                {redImg ? <StackLayer {...redImg} step={1} opacity={0.55} blend="screen" /> : null}
              </LayerStack>
              <TechnicalCallout
                callouts={[
                  { x: 52, y: 46, labelX: 84, labelY: 26, label: 'Convergencia', value: 'Torreón · Gómez Palacio' },
                  { x: 38, y: 68, labelX: 12, labelY: 82, label: 'Periferia sur', align: 'right' },
                ]}
              />
              <div className={styles.plateInstruments}>
                <NorthArrow />
              </div>
              <TextureOverlay kind="grain" />
            </div>
          ) : (
            <p className="technical">Capas no disponibles: ejecutar atlas:sources</p>
          )}
        </CartographicPlate>
      </Section>

      {/* --- Capa temática -------------------------------------------------- */}
      <Section id="capa" number="08" title="Capa temática aislada" note="Sobreposición con transparencia real, revelada por máscara sobre la misma extensión.">
        {sequiaImg ? (
          <div className={styles.singleLayer} style={{ color: 'var(--p02-carbono)' }}>
            <LayerStack ratio={sequiaRatio ?? sequiaImg.width / sequiaImg.height}>
              <StackLayer {...sequiaImg} step={0} />
            </LayerStack>
            <p className="technical">
              sequia.svg · {sequia.trimmed_px[0]}×{sequia.trimmed_px[1]} px · sin texto incrustado
            </p>
          </div>
        ) : null}
      </Section>

      {/* --- Interludios ---------------------------------------------------- */}
      <Section id="poster-signal" number="09" title="Interludio de señal" note="Modo C. Cambia de territorio; no presenta datos." bare>
        <SignalPoster
          words={['Península', 'Yucatán']}
          variant="signal"
          mask={yucatan}
          marks={[
            { label: 'Proyecto', value: 'P15' },
            { label: 'Región', value: 'Mérida, Yucatán' },
            { label: 'Disciplina', value: 'Diseño urbano' },
          ]}
          note="La silueta procede del shapefile real del estado, reproyectada a cónica conforme."
        />
      </Section>

      <Section id="poster-mineral" number="10" title="Interludio mineral" note="Portada y cierre de bloque." bare>
        <SignalPoster
          words={['Comarca', 'Lagunera']}
          variant="mineral"
          marks={[
            { label: 'Proyecto', value: 'P14' },
            { label: 'Región', value: 'Coahuila – Durango' },
            { label: 'Disciplina', value: 'Análisis territorial' },
          ]}
        />
      </Section>
    </main>
  );
}

function Section({
  id, number, title, note, children, bare = false,
}: {
  id: string; number: string; title: string; note?: string;
  children: React.ReactNode; bare?: boolean;
}) {
  return (
    <section id={id} className={styles.section}>
      <header className={styles.sectionHead}>
        <span className="technical">{number}</span>
        <h2 className={styles.h2}>{title}</h2>
        {note ? <p className={styles.note}>{note}</p> : null}
      </header>
      <div className={bare ? styles.bodyBare : styles.body}>{children}</div>
    </section>
  );
}
