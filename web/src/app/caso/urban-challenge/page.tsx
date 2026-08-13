import type { Metadata } from 'next';

import { identity } from '@/content/home';
import { credits } from '@/content/park';
import { parkRaster } from '@/lib/plates';
import { parqueEstados, parque } from '@/components/experience-v5/registry';
import { CuadernoParque, ParqueDatos } from '@/components/cuaderno/CuadernoParque';
import { RielCaso } from '@/components/global/RielCaso';
import { atlasHref, projectHref, vistazoHref } from '@/lib/rutas';

/**
 * P15 · Urban Challenge.
 *
 * No usa la plantilla de `/caso/[slug]`: los otros catorce casos son una lámina
 * cartográfica con su leyenda y éste es un proyecto de arquitectura del que
 * existen dibujos vectoriales y ninguna lámina.
 *
 * La versión anterior recorría ocho pasos y abría por el más débil —el modelo
 * de masas del contexto, sin propuesta todavía—, dedicándole tres viewports.
 * Ahora empieza por la planta y sus piezas de programa; el material de proceso
 * sigue disponible en una bandeja cerrada.
 */

export const metadata: Metadata = {
  title: 'Urban Challenge',
  description: `P15 · ${credits.title}. ${credits.place}, escala parque.`,
};

export default function UrbanChallengePage() {
  const estados = parqueEstados();
  const base = parque()?.base ?? null;

  const vistazo = estados.find((e) => e.modo === 'vistazo');
  const sistema = estados.find((e) => e.modo === 'sistema');
  const variaciones = estados.find((e) => e.modo === 'variantes');
  const detalle = estados.find((e) => e.id === 'pk-detalle');

  const d: ParqueDatos = {
    planta: base,
    circulacion: sistema?.circulacion ?? null,
    variaciones: variaciones?.variantes ?? [],
    detalle: detalle?.dibujo ?? null,
    tablero: vistazo?.tablero ?? null,
    piezas: vistazo?.piezas ?? [],
    // El proceso conserva su material; deja de abrir la página.
    proceso: [
      { titulo: 'El predio', nota: 'Modelo de masas del contexto construido. Sin propuesta todavía.', img: parkRaster('parkheat3') },
      { titulo: 'La manzana', nota: 'El mismo modelo con la masa arbórea del predio levantada sobre él.', img: parkRaster('parkheat2') },
      { titulo: 'Levantamiento', nota: 'Traza de la manzana en línea, con el predio dentro.', img: parkRaster('parkheat1') },
    ].filter((p) => p.img),
    lugar: credits.place,
    escala: 'parque',
    // El proyecto no registra su año en ninguna fuente verificable.
    anio: undefined,
    identificacion: credits.title,
    // Nunca `/caso/granular`: el destino sale de `projectHref`.
    anteriorHref: projectHref('14', 'granular'),
    atlasHref: atlasHref('15'),
    vistazoHref: vistazoHref(),
  };

  return (
    <>
      <RielCaso
        id="15"
        corto="Urban Challenge"
        territorio="Mérida"
        superficie="papel"
        posicion={15}
        total={15}
      />
      <CuadernoParque d={d} />
    </>
  );
}
