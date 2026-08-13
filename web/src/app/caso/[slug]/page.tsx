import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { cases, getCaseBySlug, neighbours } from '@/content/cases';
import { identity, territories } from '@/content/home';
import { Proyecto } from '@/components/proyecto/Proyecto';
import { plano } from '@/components/proyecto/blueprints';
import { RielCaso } from '@/components/global/RielCaso';
import { atlasHref, projectHref, vistazoHref } from '@/lib/rutas';

/**
 * Página de un caso — cuaderno del atlas.
 *
 * Sustituye al sistema anterior (`CaseOpening`, `CaseFragment`, `CaseSweep`…),
 * que pertenecía a una versión previa del sitio y no compartía retícula, riel
 * ni paleta con el recorrido. Aquí todo sale del mismo registro que V5.
 *
 * P14 y P15 no pasan por aquí: GRANULAR tiene sus pilares en
 * `/granular/[pilar]` y Urban Challenge su propia secuencia. La resolución del
 * destino vive en `projectHref`, no repartida por los archivos.
 */

export function generateStaticParams() {
  return cases
    .filter((c) => c.id !== '14' && c.id !== '15')
    .map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const data = getCaseBySlug(params.slug);
  if (!data) return {};
  // El título oficial completo se conserva en la descripción y en la ficha de
  // la página: no se pierde información, cambia su jerarquía.
  return {
    // Sin el nombre: el `template` del layout ya lo añade. Repetirlo producía
    // «… — Nestor Elihu Arriaga Gallegos — Nestor Elihu Arriaga Gallegos».
    title: data.index,
    description: `P${data.id} · ${data.title}. ${data.place}, escala ${data.scale}.`,
  };
}

export default function CasePage({ params }: { params: { slug: string } }) {
  const data = getCaseBySlug(params.slug);
  if (!data || data.id === '14' || data.id === '15') notFound();

  const p = plano(data.id);
  if (!p) notFound();

  const { prev, next } = neighbours(data.id);
  const territorio = territories.find((t) => t.id === data.territoryId);
  const posicion = cases.findIndex((c) => c.id === data.id) + 1;

  const vecino = (c: typeof prev) =>
    c ? { id: c.id, corto: c.index, href: projectHref(c.id, c.slug) } : undefined;

  return (
    <>
      <RielCaso
        id={data.id}
        corto={data.index}
        territorio={territorio?.short ?? data.place}
        superficie={p.superficie}
        posicion={posicion}
        total={cases.length}
      />
      <Proyecto
        p={p}
        vecinos={{ anterior: vecino(prev), siguiente: vecino(next) }}
        atlasHref={atlasHref(data.id)}
        vistazoHref={vistazoHref()}
      />
    </>
  );
}
