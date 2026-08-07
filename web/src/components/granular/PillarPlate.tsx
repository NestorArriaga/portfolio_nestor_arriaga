import styles from './PillarPlate.module.css';
import { CartographicPlate, PlateLede, PlateTitle } from '@/components/atlas/CartographicPlate';
import { LegendRail, LayerKeySpec } from '@/components/atlas/LegendRail';
import { LayerStack, StackLayer } from '@/components/atlas/LayerStack';
import { NorthArrow } from '@/components/atlas/CoordinateFrame';
import { TextureOverlay } from '@/components/atlas/TextureOverlay';
import { canvasRatio, getLayers, layerColor, layerImage } from '@/lib/atlas';
import type { Category, LayerRef, Pillar } from '@/content/granular';

/**
 * Lámina de un pilar de GRANULAR.
 *
 * Gramática común a los seis pilares: columna editorial al 28 %, campo
 * cartográfico al 72 %, leyenda que solo declara capas presentes en el mapa,
 * lectura interpretativa separada del dato y nota de fuente cuando la fuente no
 * está documentada.
 *
 * Cada pilar cambia de acento y de capas, no de estructura.
 */

type Props = {
  pillar: Pillar;
  plate: Pillar['plates'][number];
};

/** Resuelve una capa del contenido contra el manifiesto del atlas. */
function resolve(ref: LayerRef) {
  const layers = getLayers(ref.slug);
  const layer = ref.layer ? layers.find((l) => l.layer === ref.layer) : layers[0];
  if (!layer) return null;
  const image = layerImage(layer);
  if (!image) return null;
  return { ref, layer, image, color: layerColor(layer) };
}

export function PillarPlate({ pillar, plate }: Props) {
  const resolved = plate.layers.map(resolve).filter(Boolean) as NonNullable<
    ReturnType<typeof resolve>
  >[];
  const base = plate.base ? resolve(plate.base) : null;

  // La proporción del campo sale del lienzo de la primera capa presente.
  const ratio =
    canvasRatio(base?.ref.slug ?? resolved[0]?.ref.slug ?? '') ??
    (resolved[0] ? resolved[0].image.width / resolved[0].image.height : 1.4);

  // La leyenda toma su color de la capa, no de la paleta: un ráster no se
  // puede recolorear y una clave con otro tono describiría otro mapa.
  const layerKeys: LayerKeySpec[] = resolved.map((r) => ({
    kind: 'area',
    label: r.ref.label,
    color: r.color,
    note: r.ref.note,
  }));

  return (
    <CartographicPlate
      accent={pillar.accentVar}
      marks={
        <>
          <span>
            Pilar {pillar.number} · {pillar.title}
          </span>
          <span>Comarca Lagunera</span>
          <span>p.{plate.page}</span>
        </>
      }
      heading={
        <>
          <PlateTitle kicker={plate.subtitle}>{plate.title}</PlateTitle>
          <PlateLede>{plate.caption}</PlateLede>
        </>
      }
      aside={
        <>
          <LegendRail
            groups={[
              ...(base
                ? [{ title: 'Base territorial', keys: [{ kind: 'area' as const, label: base.ref.label, color: 'var(--ink-muted)', note: base.ref.note }] }]
                : []),
              { title: 'Capas', keys: layerKeys },
            ]}
          />
          {plate.categories ? <CategoryList categories={plate.categories} /> : null}
        </>
      }
      detail={
        <>
          {plate.reading ? <p className={styles.reading}>{plate.reading}</p> : null}
          {plate.sourceNote ? (
            <p className={styles.source}>
              <span className={styles.sourceLabel}>Fuente</span> {plate.sourceNote}
            </p>
          ) : null}
        </>
      }
    >
      {resolved.length && plate.mode === 'compare' ? (
        /* Pequeños múltiplos: cada capa trae su propia base, así que se leen
           una al lado de otra y no superpuestas. */
        <div className={styles.compare} data-count={resolved.length}>
          {resolved.map((r) => (
            <figure key={r.ref.slug} className={styles.compareCell}>
              <LayerStack ratio={canvasRatio(r.ref.slug) ?? ratio}>
                <StackLayer
                  {...r.image}
                  sizes="(max-width: 900px) 90vw, 24vw"
                  alt={`${plate.title}: ${r.ref.label}`}
                />
              </LayerStack>
              <figcaption>
                <span className={styles.compareLabel} style={{ color: r.color }}>
                  {r.ref.label}
                </span>
                {r.ref.note ? <span className={styles.compareNote}>{r.ref.note}</span> : null}
              </figcaption>
            </figure>
          ))}
          <TextureOverlay kind="grain" />
        </div>
      ) : resolved.length ? (
        <div className={styles.field}>
          <LayerStack ratio={ratio}>
            {base ? <StackLayer {...base.image} step={0} opacity={0.8} /> : null}
            {resolved.map((r, i) => (
              <StackLayer
                key={r.ref.slug}
                {...r.image}
                step={i + (base ? 1 : 0)}
                opacity={r.ref.opacity ?? 1}
                blend={r.ref.blend === 'normal' ? undefined : r.ref.blend}
              />
            ))}
          </LayerStack>
          <div className={styles.instruments}>
            <NorthArrow />
          </div>
          <TextureOverlay kind="grain" />
        </div>
      ) : (
        <p className="technical">
          Capas no disponibles para esta lámina: ejecutar atlas:sources
        </p>
      )}
    </CartographicPlate>
  );
}

/**
 * Categorías de la leyenda original.
 *
 * Cuando una categoría aparece en la leyenda de la fuente pero el texto no la
 * define, se marca. Omitirla falsearía la leyenda; presentarla como si
 * estuviera documentada, también.
 */
function CategoryList({ categories }: { categories: Category[] }) {
  return (
    <dl className={styles.categories}>
      {categories.map((c) => (
        <div key={c.name} className={styles.category}>
          <dt>
            {c.name}
            {c.range ? <span className={styles.range}>{c.range}</span> : null}
          </dt>
          <dd>
            {c.desc}
            {c.warning ? <em className={styles.warning}>{c.warning}</em> : null}
          </dd>
        </div>
      ))}
    </dl>
  );
}
