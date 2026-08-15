import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { getPillar, granularProject, pillars } from '@/content/granular';
import { capa } from '@/components/experience-v5/registry';
import { PilarGranular, PilarDatos } from '@/components/cuaderno/PilarGranular';
import { RielCaso } from '@/components/global/RielCaso';
import { atlasHref, projectHref, vistazoHref } from '@/lib/rutas';

/**
 * Un pilar de GRANULAR.
 *
 * Conserva los siete pilares, sus mapas, sus categorías y sus cautelas. Lo que
 * cambia es la presentación: la página anterior era un informe con tres
 * párrafos de apertura, subtítulos explicativos y una barra de pilares que se
 * cortaba en pantalla, y no parecía del mismo portafolio que el recorrido.
 *
 * Nada de la fuente se pierde: el planteamiento, las lecturas largas y las
 * limitaciones viven en `Notas y alcance`, desplegable.
 */

export function generateStaticParams() {
  return pillars.map((p) => ({ pilar: p.id }));
}

export function generateMetadata({ params }: { params: { pilar: string } }): Metadata {
  const pillar = getPillar(params.pilar);
  if (!pillar) return {};
  return {
    title: `${pillar.title} — GRANULAR`,
    description: `P14 · ${granularProject.territory} · ${pillar.subtitle}.`,
  };
}

export default function PilarPage({ params }: { params: { pilar: string } }) {
  const pillar = getPillar(params.pilar);
  if (!pillar) notFound();

  const i = pillars.findIndex((p) => p.id === pillar.id);
  const next = pillars[i + 1];

  const laminas: PilarDatos['laminas'] = pillar.plates.map((p) => ({
    id: p.id,
    titulo: p.title,
    pagina: p.page,
    img: capa(p.layers[0]?.slug ?? '', 0),
    // La segunda capa sólo se apila cuando la fuente la declara apilable: con
    // `compare` cada capa trae su propia base opaca y superponerlas mostraría
    // una prometiendo tres.
    sobre: p.mode === 'stack' && p.layers[1] ? capa(p.layers[1].slug, 0) : null,
    categorias: p.categories ?? [],
    municipios: p.highlightMunicipios ?? [],
    pie: p.caption,
    lectura: p.reading,
    fuente: p.sourceNote,
  }));

  const d: PilarDatos = {
    id: pillar.id,
    numero: pillar.number,
    nombre: pillar.title,
    variables: pillar.variables,
    acento: pillar.accentVar,
    laminas,
    datos: pillar.facts ?? [],
    alcance: pillar.limitations,
    parrafos: pillar.intro.paragraphs,
    pilares: pillars.map((p) => ({
      id: p.id, numero: p.number, nombre: p.title, href: `/granular/${p.id}`,
    })),
    siguiente: next ? { nombre: next.title, href: `/granular/${next.id}` } : undefined,
    proyectoAnterior: { num: 'P13', nombre: 'Subcuencas y ríos', href: projectHref('13', 'subcuencas-y-rios-calvillo') },
    proyectoSiguiente: { num: 'P15', nombre: 'Urban Challenge', href: projectHref('15', 'urban-challenge') },
    atlasHref: atlasHref('14'),
    vistazoHref: vistazoHref(),
  };

  return (
    <>
      <RielCaso
        id="14"
        corto={granularProject.title}
        territorio={granularProject.territory}
        superficie="tinta"
        posicion={14}
        total={15}
      />
      <PilarGranular d={d} />
    </>
  );
}
