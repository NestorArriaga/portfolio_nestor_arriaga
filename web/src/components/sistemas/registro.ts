import fs from 'node:fs';
import path from 'node:path';

/**
 * SISTEMAS — capacidad de diseño y desarrollo aplicada al territorio.
 *
 * No son cuatro proyectos territoriales más: la numeración P01–P15 no se toca.
 * Es una familia paralela que enseña lo que el portafolio no puede enseñar con
 * una lámina —un sistema que se opera— y por eso su material son capturas de
 * aplicaciones reales, no maquetas.
 *
 * El estado de cada caso se declara con la palabra que le corresponde y no con
 * la que conviene: un demostrador no se presenta como producto, y un prototipo
 * con datos de demostración lo dice.
 */

export type CapturaSistema = {
  id: string;
  caso: string;
  proyecto: string;
  pantalla: string;
  estado: string;
  papel: 'principal' | 'detalle';
  fecha: string;
  credito: string;
  nativo: [number, number];
  ratio: number;
  archivos: Record<string, string>;
};

export type Imagen = {
  src: string; srcSet: string; width: number; height: number; ratio: number;
  nativo: number; pie: string; credito: string;
  /** Estado de la pantalla concreta: dentro de un mismo caso conviven un
      producto en desarrollo y su demostrador, y no dicen lo mismo. */
  estado: string;
  proyecto: string;
  /** Nombre de la pantalla en el sistema, tal como la declara la procedencia. */
  pantalla: string;
};

export type Sistema = {
  id: string;          // `s01`
  slug: string;        // `datos-aereos-agricolas`
  codigo: string;      // `S01`
  nombre: string;
  estado: string;
  capacidad: string;   // 4–8 palabras
  acciones: [string, string, string];
  /** Lectura larga, sólo en la página interior. */
  lectura: string;
  rol: string;
  alcance: string;
  principal: Imagen | null;
  detalles: Imagen[];
  /** Segundo estado del mismo ecosistema, cuando existe. */
  segundo?: { titulo: string; estado: string; imagen: Imagen | null };
};

let cache: CapturaSistema[] | null = null;

function capturas(): CapturaSistema[] {
  if (!cache) {
    const f = path.join(process.cwd(), 'public', 'sistemas', 'manifest.json');
    cache = fs.existsSync(f)
      ? (JSON.parse(fs.readFileSync(f, 'utf8')).capturas as CapturaSistema[])
      : [];
  }
  return cache;
}

/** Una captura convertida en imagen servible, con su escalera real de anchos. */
function img(id: string, pie: string): Imagen | null {
  const c = capturas().find((x) => x.id === id);
  if (!c) return null;
  const anchos = Object.keys(c.archivos).map(Number).sort((a, b) => b - a);
  return {
    src: c.archivos[String(anchos[0])],
    srcSet: anchos.map((w) => `${c.archivos[String(w)]} ${w}w`).join(', '),
    width: anchos[0],
    height: Math.round(anchos[0] / c.ratio),
    ratio: c.ratio,
    // Techo real: por encima del nativo la interfaz se lee blanda.
    nativo: c.nativo[0],
    pie,
    credito: c.credito,
    estado: c.estado,
    proyecto: c.proyecto,
    pantalla: c.pantalla,
  };
}

const DECLARACION: Omit<Sistema, 'principal' | 'detalles' | 'segundo'>[] = [
  {
    id: 's01', slug: 'datos-aereos-agricolas', codigo: 'S01',
    nombre: 'DATOS AÉREOS AGRÍCOLAS',
    estado: 'producto en desarrollo',
    capacidad: 'plataforma de visualización de datos de drones para agricultura de precisión',
    acciones: ['capturar', 'interpretar', 'decidir'],
    lectura: 'Territorio persistente: la parcela y el vuelo no se pierden al cambiar de vista. '
      + 'Los índices y las capas se leen sobre el mismo encuadre, y cada decisión deja '
      + 'trazabilidad entre lo prescrito y lo aplicado.',
    rol: 'Diseño de producto, arquitectura de información y desarrollo de la interfaz.',
    alcance: 'Sistema en desarrollo y demostrador operativo con datos simulados.',
  },
  {
    id: 's02', slug: 'estrato', codigo: 'S02', nombre: 'ESTRATO',
    estado: 'prototipo',
    capacidad: 'inteligencia territorial sobre capas oficiales',
    acciones: ['cruzar', 'relacionar', 'comparar'],
    lectura: 'Cruce de capas oficiales para diagnosticar restricciones y riesgos de un polígono. '
      + 'La red de actores y la comparación de escenarios convierten el diagnóstico en una '
      + 'decisión discutible.',
    rol: 'Diseño de producto y desarrollo de la interfaz.',
    alcance: 'Prototipo funcional con proyecto y cifras de demostración.',
  },
  {
    id: 's03', slug: 'maices-nativos', codigo: 'S03', nombre: 'Maíces nativos',
    estado: 'prototipo',
    capacidad: 'cartografía de diversidad y consulta por raza',
    acciones: ['localizar', 'filtrar', 'reconocer'],
    lectura: 'Distribución nacional de razas de maíz sobre cartografía base, con filtro por '
      + 'variedad. Al elegir una raza, mapa, estadísticas y ficha responden al mismo estado.',
    rol: 'Diseño de la visualización y desarrollo del visor.',
    alcance: 'Prototipo con datos de distribución de CONABIO.',
  },
  {
    id: 's04', slug: 'territoria', codigo: 'S04', nombre: 'TERRITORIA',
    estado: 'prototipo',
    capacidad: 'operación de proyectos ambientales con contexto espacial',
    acciones: ['planear', 'documentar', 'seguir'],
    lectura: 'Expedientes ambientales —MIA, CUSTF, ordenamiento, gestión hídrica— con mapa '
      + 'persistente, tareas de campo y documentos. El avance regulatorio y el trabajo de '
      + 'campo viven en el mismo expediente.',
    rol: 'Diseño de producto y desarrollo de la interfaz.',
    alcance: 'Prototipo funcional con expedientes de demostración.',
  },
];

const PIEZAS: Record<string, { principal: [string, string]; detalles: [string, string][];
  segundo?: { titulo: string; estado: string; captura: [string, string] } }> = {
  s01: {
    principal: ['s01-sistema-parcela', 'Parcela sobre imagen satelital: vigor del cultivo, próxima acción y perfil.'],
    detalles: [
      ['s01-demo-indices', 'Índice activo, control ráster y serie temporal sobre el mismo encuadre.'],
      ['s01-demo-resultados', 'Resultado verificado: vigor antes y después de la aplicación correctiva.'],
    ],
    segundo: {
      titulo: 'prueba operativa',
      estado: 'demostrador',
      captura: ['s01-demo-territorio', 'Explorador de parcelas sobre el territorio, en el demostrador.'],
    },
  },
  s02: {
    principal: ['s02-diagnostico', 'Centro de diagnóstico: visor de impacto, dictamen y riesgo por componente.'],
    detalles: [
      ['s02-actores', 'Red de actores con tipo de relación y peso de influencia.'],
      ['s02-escenarios', 'Dos escenarios enfrentados con su desglose por componente.'],
    ],
  },
  s03: {
    principal: ['s03-distribucion', 'Distribución nacional por variedad, con leyenda y estadísticas.'],
    detalles: [
      ['s03-raza', 'Filtro por raza: el mapa, las tres gráficas y la ficha responden al mismo estado.'],
    ],
  },
  s04: {
    principal: ['s04-custf', 'Expediente CUSTF: capas activas, alertas regulatorias e inventario forestal.'],
    detalles: [
      ['s04-hidrica', 'Gestión hídrica: indicadores acumulados y avance del plan de manejo.'],
    ],
  },
};

/** Los cuatro casos, en orden de recorrido. */
export function sistemas(): Sistema[] {
  return DECLARACION.map((d) => {
    const p = PIEZAS[d.id];
    return {
      ...d,
      principal: img(p.principal[0], p.principal[1]),
      detalles: p.detalles.map(([id, pie]) => img(id, pie)).filter((x): x is Imagen => !!x),
      segundo: p.segundo
        ? { titulo: p.segundo.titulo, estado: p.segundo.estado,
            imagen: img(p.segundo.captura[0], p.segundo.captura[1]) }
        : undefined,
    };
  });
}

export function sistemaPorSlug(slug: string): Sistema | undefined {
  return sistemas().find((s) => s.slug === slug);
}

/**
 * Fichas de SISTEMAS para el índice orbital.
 *
 * Comparten el registro del Vistazo con los quince proyectos —no hay un segundo
 * menú— y llevan valores propios en los tres ejes, así que al reordenar la
 * órbita por territorio, método o escala los cuatro casos quedan contiguos y se
 * leen como la familia que son.
 */
export function fichasSistemas() {
  return sistemas().map((s) => ({
    id: s.id,
    num: s.codigo,
    titulo: s.nombre,
    /* Los sistemas no ocupan un territorio: son la herramienta con la que se
       trabajan todos. Van en su propio grupo del Explorador. */
    territorioId: 'sistemas',
    lugar: s.capacidad,
    territorio: 'sistemas',
    metodo: 'sistemas digitales',
    escala: 'aplicación',
    href: `/sistema/${s.slug}`,
    mini: s.principal
      ? { src: s.principal.src, srcSet: s.principal.srcSet,
          width: s.principal.width, height: s.principal.height, ratio: s.principal.ratio }
      : null,
  }));
}
