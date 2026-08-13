import type { Metadata } from 'next';

import { cases } from '@/content/cases';
import { granularProject, pillars } from '@/content/granular';
import { credits as parkCredits } from '@/content/park';
import { identity } from '@/content/home';
import { getPlate, parkRaster } from '@/lib/plates';
import { capa, lamina, parque, parqueEstados, piezas } from '@/components/experience-v5/registry';
import { Impreso, PaginaProyecto } from '@/components/impreso/Impreso';
import { hojasProyectos, hojasSistemas } from '@/components/impreso/hojas';

/**
 * Ruta de composición del portafolio impreso.
 *
 * No es otra versión del sitio: es una salida del mismo producto. Los títulos,
 * cifras, leyendas, fuentes y símbolos se leen de los mismos registros que
 * alimentan el recorrido, así que una corrección en el contenido aparece en la
 * web y en el PDF sin tocar dos sitios.
 *
 * No se enlaza desde ninguna parte del sitio y va marcada `noindex`: sólo la
 * abre el generador. Se llamaba `_portfolio-print`, pero el App Router trata
 * como privada cualquier carpeta que empiece por guion bajo y la ruta daba 404.
 */

export const metadata: Metadata = {
  title: 'Portafolio impreso',
  robots: { index: false, follow: false },
};

export default function PortfolioPrint() {
  const proyectos: PaginaProyecto[] = cases
    .filter((c) => c.id !== '14' && c.id !== '15')
    .map((c) => {
      const plate = getPlate(c.artifact);
      const apoyos = piezas(c.support, c.artifact);

      return {
        id: c.id,
        corto: c.index,
        oficial: c.title,
        lugar: c.place,
        escala: c.scale,
        anio: c.year,
        lamina: lamina(c.artifact),
        apoyos,
        datos: c.facts ?? [],
        clave: c.legend?.[0]?.keys.map((k) => ({ label: k.label, color: k.color })) ?? [],
        fuente: c.dataSource,
        creditos: c.credits,
        origen: plate?.page ? `Documento original, p. ${plate.page}` : undefined,
      };
    });

  const granular = pillars.map((p) => ({
    numero: p.number,
    nombre: p.title,
    variables: p.variables,
    laminas: p.plates.map((l) => ({
      titulo: l.title,
      pagina: l.page,
      img: capa(l.layers[0]?.slug ?? '', 0),
      categorias: (l.categories ?? []).map((c) => ({ name: c.name, range: c.range })),
      municipios: l.highlightMunicipios ?? [],
      fuente: l.sourceNote,
    })),
    datos: (p.facts ?? []).map((f) => ({ label: f.label, value: f.value })),
    alcance: p.limitations,
  }));

  const estados = parqueEstados();
  const planta = parque()?.base ?? null;

  return (
    <Impreso
      identidad={{ nombre: identity.name, linea: identity.line }}
      hojas={hojasProyectos()}
      sistemas={hojasSistemas()}
      proyectos={proyectos}
      granular={{
        titulo: granularProject.title,
        territorio: granularProject.territory,
        region: granularProject.region,
        pilares: granular,
      }}
      parque={{
        titulo: 'Urban Challenge',
        marco: parkCredits.title,
        lugar: parkCredits.place,
        planta,
        variaciones: estados.find((e) => e.modo === 'variantes')?.variantes ?? [],
        detalle: estados.find((e) => e.id === 'pk-detalle')?.dibujo ?? null,
        piezas: estados.find((e) => e.modo === 'vistazo')?.piezas ?? [],
        proceso: [
          { titulo: 'El predio', img: parkRaster('parkheat3') },
          { titulo: 'La manzana', img: parkRaster('parkheat2') },
        ].filter((x) => x.img) as { titulo: string; img: NonNullable<ReturnType<typeof parkRaster>> }[],
      }}
      correo="nestorarriaga.irnr@gmail.com"
    />
  );
}
