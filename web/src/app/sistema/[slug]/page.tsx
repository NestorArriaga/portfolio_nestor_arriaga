import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { SistemaPagina } from '@/components/sistemas/Sistema';
import { sistemas } from '@/components/sistemas/registro';

/**
 * Página de un sistema — una sola plantilla para S01–S04.
 *
 * Los cuatro casos comparten estructura porque comparten pregunta: qué hace el
 * sistema, cómo se opera y hasta dónde llega. Cuatro micrositios distintos sólo
 * añadirían superficie que mantener.
 */

export function generateStaticParams() {
  return sistemas().map((s) => ({ slug: s.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const s = sistemas().find((x) => x.slug === params.slug);
  if (!s) return {};
  return {
    title: s.nombre,
    description: `${s.codigo} · ${s.capacidad}. ${s.estado}.`,
  };
}

export default function SistemaRuta({ params }: { params: { slug: string } }) {
  const casos = sistemas();
  const i = casos.findIndex((s) => s.slug === params.slug);
  if (i < 0) notFound();

  const ficha = (c: typeof casos[number] | undefined) =>
    c ? { codigo: c.codigo, nombre: c.nombre, href: `/sistema/${c.slug}` } : undefined;

  return (
    <SistemaPagina
      caso={casos[i]}
      vecinos={{ anterior: ficha(casos[i - 1]), siguiente: ficha(casos[i + 1]) }}
    />
  );
}
