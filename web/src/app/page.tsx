import Link from 'next/link';

import styles from './home.module.css';
import {
  canvasRatio,
  getLayers,
  getNationalFrame,
  layerColor,
  layerImage,
} from '@/lib/atlas';
import { heroCallouts, identity, projects, territories } from '@/content/home';
import { SpecimenHero } from '@/components/home/SpecimenHero';
import { NationalIndex } from '@/components/home/NationalIndex';
import { SignalPoster } from '@/components/atlas/SignalPoster';
import { CartographicPlate, PlateFacts, PlateLede, PlateTitle } from '@/components/atlas/CartographicPlate';
import { LegendRail } from '@/components/atlas/LegendRail';
import { LayerStack, StackLayer } from '@/components/atlas/LayerStack';
import { NorthArrow, ScaleBar } from '@/components/atlas/CoordinateFrame';
import { TechnicalCallout } from '@/components/atlas/TechnicalCallout';
import { TextureOverlay } from '@/components/atlas/TextureOverlay';

/**
 * Home.
 *
 * Cinco movimientos: espécimen territorial, índice por coordenadas, interludio
 * mineral, GRANULAR destacado y cierre. Sin tarjetas y sin retículas de
 * miniaturas: cada bloque es una composición distinta, como en una publicación.
 */
export default function Home() {
  // Hero: la Comarca recortada de satélite real, con transparencia.
  const specimenLayer = getLayers('comarca-satelite-b', 'overlay')[0];
  const specimen = specimenLayer ? layerImage(specimenLayer) : null;
  const specimenRatio = canvasRatio('comarca-satelite-b') ?? 0.88;

  // Índice: solo los territorios con shapefile local.
  const frame = getNationalFrame(
    territories.map((t) => t.maskSlug).filter(Boolean) as string[],
  );

  // GRANULAR destacado: relieve y red, del mismo archivo fuente.
  const conectividad = getLayers('comarca-base-conectividad');
  const relieve = conectividad.find((l) => l.layer === 2);
  const red = conectividad.find((l) => l.layer === 4);
  const relieveImg = relieve ? layerImage(relieve) : null;
  const redImg = red ? layerImage(red) : null;
  const redColor = red ? layerColor(red) : 'var(--g-conectividad)';
  const granularRatio = canvasRatio('comarca-base-conectividad') ?? 1.4;

  const granular = projects.find((p) => p.id === '14');

  return (
    <main>
      {specimen ? (
        <SpecimenHero
          object={specimen}
          ratio={specimenRatio}
          callouts={heroCallouts}
          identity={identity}
        />
      ) : null}

      {/* --- Índice por coordenadas ----------------------------------------- */}
      <section className={styles.section} id="indice">
        <header className={styles.sectionHead}>
          <p className="technical">Índice territorial</p>
          <h2 className={styles.h2}>Quince casos, seis territorios</h2>
          <p className={styles.lede}>
            Cada silueta ocupa su posición real dentro de un marco cónico
            conforme. Las distancias entre territorios son verdaderas.
          </p>
        </header>

        <div className={styles.sectionBody}>
          {frame ? (
            <NationalIndex frame={frame} territories={territories} projects={projects} />
          ) : (
            <p className="technical">Sin geometría disponible: ejecutar atlas:masks</p>
          )}
        </div>
      </section>

      {/* --- Interludio mineral --------------------------------------------- */}
      <SignalPoster
        words={['Comarca', 'Lagunera']}
        variant="mineral"
        marks={[
          { label: 'Proyecto', value: 'P14' },
          { label: 'Región', value: 'Coahuila – Durango' },
          { label: 'Escala', value: 'Multiescalar' },
        ]}
        note="El caso más extenso del portafolio: seis dimensiones territoriales sobre veinte páginas."
      />

      {/* --- GRANULAR destacado --------------------------------------------- */}
      {relieveImg && granular ? (
        <CartographicPlate
          accent={redColor}
          marks={
            <>
              <span>P14 · GRANULAR</span>
              <span>Comarca Lagunera · Coahuila–Durango</span>
              <span>
                p.{granular.pages[0]}–{granular.pages[granular.pages.length - 1]}
              </span>
            </>
          }
          heading={
            <>
              <PlateTitle kicker="Caso destacado">Tipologías rurales situadas</PlateTitle>
              <PlateLede>
                Análisis territorial multiescalar de la Comarca Lagunera. El
                relieve sombreado y la red de conectividad proceden del mismo
                archivo fuente y se recomponen como capas independientes.
              </PlateLede>
            </>
          }
          aside={
            <LegendRail
              groups={[
                {
                  title: 'Base territorial',
                  keys: [
                    {
                      kind: 'area',
                      label: 'Relieve sombreado',
                      color: 'var(--ink-muted)',
                      note: 'hillshade',
                    },
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
            <PlateFacts
              items={[
                { label: 'Páginas', value: `${granular.pages[0]}–${granular.pages[granular.pages.length - 1]}` },
                { label: 'Escala', value: granular.scale },
                { label: 'Capas', value: `${conectividad.length} separadas` },
              ]}
            />
            <Link href="/granular/agua" className={styles.caseLink}>
              Recorrer el caso →
            </Link>
            </>
          }
        >
          <div className={styles.plateField}>
            <LayerStack ratio={granularRatio}>
              <StackLayer {...relieveImg} step={0} opacity={0.85} />
              {redImg ? <StackLayer {...redImg} step={1} opacity={0.55} blend="screen" /> : null}
            </LayerStack>
            <TechnicalCallout
              callouts={[
                {
                  x: 52,
                  y: 46,
                  labelX: 84,
                  labelY: 26,
                  label: 'Convergencia',
                  value: 'Zona metropolitana',
                },
              ]}
            />
            <div className={styles.plateInstruments}>
              <NorthArrow />
            </div>
            <TextureOverlay kind="grain" />
          </div>
        </CartographicPlate>
      ) : null}

      {/* --- Cierre ---------------------------------------------------------- */}
      <footer className={styles.footer}>
        <div className={styles.footerGrid}>
          <div>
            <p className="technical">Autor</p>
            <p className={styles.footerValue}>{identity.name}</p>
          </div>
          <div>
            <p className="technical">Formación</p>
            <p className={styles.footerValue}>{identity.institution}</p>
          </div>
          <div>
            <p className="technical">Portafolio</p>
            <p className={styles.footerValue}>{identity.year}</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
