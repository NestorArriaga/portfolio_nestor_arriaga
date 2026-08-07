import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';

import styles from './pilar.module.css';
import { getPillar, granularProject, pillars } from '@/content/granular';
import { PillarPlate } from '@/components/granular/PillarPlate';
import { MunicipalIndex } from '@/components/granular/MunicipalIndex';
import { getMunicipios } from '@/lib/atlas';
import { SignalPoster } from '@/components/atlas/SignalPoster';
import { TextureOverlay } from '@/components/atlas/TextureOverlay';

/**
 * Un pilar de GRANULAR.
 *
 * Cada pilar recorre la misma secuencia: apertura, variables conceptuales, una
 * lámina por mapa de la fuente, alcance documentado y paso al siguiente. Lo que
 * cambia entre pilares es el acento y las capas, no el orden de lectura.
 */

export function generateStaticParams() {
  return pillars.map((p) => ({ pilar: p.id }));
}

export function generateMetadata({ params }: { params: { pilar: string } }): Metadata {
  const pillar = getPillar(params.pilar);
  if (!pillar) return {};
  return {
    title: `${pillar.title} — GRANULAR | Néstor Arriaga`,
    description: pillar.intro.paragraphs[0],
  };
}

export default function PilarPage({ params }: { params: { pilar: string } }) {
  const pillar = getPillar(params.pilar);
  if (!pillar) notFound();

  const index = pillars.findIndex((p) => p.id === pillar.id);
  const next = pillars[index + 1];

  // Los municipios que este pilar nombra, para marcarlos en el índice.
  const named = Array.from(
    new Set(pillar.plates.flatMap((p) => p.highlightMunicipios ?? [])),
  );
  const municipal = getMunicipios();

  return (
    <main style={{ ['--accent' as string]: pillar.accentVar }}>
      {/* --- Apertura -------------------------------------------------------- */}
      <header className={styles.opening}>
        <div className={styles.marks}>
          <span>
            P{granularProject.id} · {granularProject.territory}
          </span>
          <span>{granularProject.region}</span>
          <span>
            p.{pillar.pages[0]}–{pillar.pages[1]}
          </span>
        </div>

        <p className={styles.kicker}>
          Pilar {pillar.number}
        </p>
        <h1 className={styles.title}>{pillar.title}</h1>
        <p className={styles.subtitle}>{pillar.subtitle}</p>

        <div className={styles.introGrid}>
          <h2 className={styles.introTitle}>{pillar.intro.title}</h2>
          <div className={styles.introText}>
            {pillar.intro.paragraphs.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>
        </div>

        <ul className={styles.variables}>
          {pillar.variables.map((v, i) => (
            <li key={v}>
              <span className={styles.variableIndex}>{String(i + 1).padStart(2, '0')}</span>
              {v}
            </li>
          ))}
        </ul>

        <TextureOverlay kind="grain" />
      </header>

      {/* --- Láminas ---------------------------------------------------------- */}
      {pillar.plates.map((plate) => (
        <PillarPlate key={plate.id} pillar={pillar} plate={plate} />
      ))}

      {/* --- Índice municipal -------------------------------------------------- */}
      {municipal ? (
        <section className={styles.municipal}>
          <header className={styles.municipalHead}>
            <h2 className={styles.sectionTitle}>Los quince municipios</h2>
            <p className={styles.municipalLede}>
              Geometría vectorial real del proyecto. Los marcados son los que el
              texto de este pilar nombra.
            </p>
          </header>
          <MunicipalIndex municipios={municipal.municipios} highlight={named} />
        </section>
      ) : null}

      {/* --- Cifras de la fuente ---------------------------------------------- */}
      {pillar.facts?.length ? (
        <section className={styles.facts}>
          <h2 className={styles.sectionTitle}>Cifras consignadas en la fuente</h2>
          <dl className={styles.factGrid}>
            {pillar.facts.map((f) => (
              <div key={f.label}>
                <dt>{f.label}</dt>
                <dd>{f.value}</dd>
                {f.note ? <p className={styles.factNote}>{f.note}</p> : null}
              </div>
            ))}
          </dl>
        </section>
      ) : null}

      {/* --- Alcance documentado ---------------------------------------------- */}
      <section className={styles.limitations}>
        <h2 className={styles.sectionTitle}>{pillar.limitations.title}</h2>
        <p className={styles.limitationsText}>{pillar.limitations.text}</p>
        <ul className={styles.limitationsList}>
          {pillar.limitations.points.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ul>
      </section>

      {/* --- Paso al siguiente pilar ------------------------------------------ */}
      {next ? (
        <Link href={`/granular/${next.id}`} className={styles.nextLink}>
          <SignalPoster
            words={[pillar.next.title]}
            variant="mineral"
            marks={[
              { label: 'Siguiente', value: `Pilar ${pillar.next.number}` },
              { label: 'Proyecto', value: 'P14 · GRANULAR' },
              { label: 'Territorio', value: granularProject.territory },
            ]}
            note={pillar.next.desc}
          />
        </Link>
      ) : (
        <section className={styles.closing}>
          <p className="technical">Fin del recorrido disponible</p>
          <p className={styles.closingText}>{pillar.next.desc}</p>
        </section>
      )}
    </main>
  );
}
