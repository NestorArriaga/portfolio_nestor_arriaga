import { getMarkers, getPlate } from '@/lib/plates';
import { guarda, lamina, mascaras } from '@/components/experience-v5/registry';
import type { ClaseMascara, Guarda, Lamina } from '@/components/experience-v5/registry';
import { getCase } from '@/content/cases';

/**
 * Planos de las páginas interiores P01–P13.
 *
 * Sustituyen al sistema anterior —`support[] → primera imagen → cuadrícula
 * automática`—, donde el orden del array decidía la composición y una
 * fotografía, una gráfica y un glifo recibían el mismo trato. Aquí cada
 * proyecto declara su propia secuencia de capítulos con recursos que tienen
 * **función semántica** declarada: qué es la pieza, qué resolución tiene, de
 * qué página del PDF sale, qué pie le corresponde y en qué capítulo entra.
 *
 * Un recurso que no comunica nada no aparece. Lo que se descarta y por qué está
 * anotado en cada proyecto, no borrado en silencio.
 */

export type Recurso = {
  img: Lamina;
  guarda: Guarda | null;
  /** Qué es la pieza, en los términos del proyecto. Nunca «Figura del análisis». */
  pie: string;
  /** Página del PDF de la que sale. */
  origen?: string;
  /** Resolución nativa, para no ampliarla por encima de ella. */
  nativo: [number, number];
};

export type Clase = { label: string; color: string; mascara?: string };
export type Nodo = { x: number; y: number; r: number };
export type Metrica = { valor: string; unidad?: string; etiqueta: string };
export type Criterio = { nombre: string; peso: number };

export type Capitulo =
  | { id: string; nombre: string; tipo: 'localizador'; contorno: Recurso | null; foco: string; coordenada?: string }
  | { id: string; nombre: string; tipo: 'mapa'; recurso: Recurso; clases: Clase[]; nota?: string }
  | { id: string; nombre: string; tipo: 'gradiente'; recurso: Recurso; clases: Clase[]; unidad: string }
  | { id: string; nombre: string; tipo: 'nodos'; recurso: Recurso; nodos: Nodo[]; etiqueta: string }
  | { id: string; nombre: string; tipo: 'metricas'; metricas: Metrica[]; apoyo?: Recurso }
  | { id: string; nombre: string; tipo: 'comparador'; a: Recurso; b: Recurso; etiquetaA: string; etiquetaB: string }
  | { id: string; nombre: string; tipo: 'detalles'; recurso: Recurso; puntos: { x: number; y: number; nombre: string }[] }
  | { id: string; nombre: string; tipo: 'perfil'; mapa: Recurso; perfil: Recurso; clases: Clase[]; unidad: string }
  | { id: string; nombre: string; tipo: 'criterios'; recurso: Recurso; criterios: Criterio[]; clases: Clase[] }
  | { id: string; nombre: string; tipo: 'evidencia'; piezas: Recurso[] }
  | { id: string; nombre: string; tipo: 'flujo'; recurso: Recurso; detalle: Recurso | null; clases: Clase[] };

export type Plano = {
  id: string;
  corto: string;
  oficial: string;
  lugar: string;
  territorio: string;
  escala: string;
  familia: 'urbana' | 'cuenca' | 'mineral' | 'tecnica' | 'suelo';
  superficie: 'tinta' | 'papel';
  /** Operación cartográfica del proyecto, en dos palabras. */
  operacion: string;
  hero: { recurso: Recurso | null; metrica?: Metrica };
  capitulos: Capitulo[];
  fuente?: string;
  creditos?: string[];
  /** Recursos disponibles que no se usan, con el motivo. */
  descartes: { slug: string; motivo: string }[];
};

/* -------------------------------------------------------------------------- */

function rec(slug: string, pie: string): Recurso | null {
  const img = lamina(slug);
  const plate = getPlate(slug);
  if (!img || !plate) return null;
  const px = (plate.trimmed_px ?? plate.native_px) as [number, number];
  return {
    img,
    guarda: guarda(slug),
    pie,
    origen: plate.page ? `Documento original, p. ${plate.page}` : undefined,
    nativo: px,
  };
}

/** Clases de la leyenda con su máscara real cuando existe. */
function clases(slug: string, keys: { label: string; color: string }[]): Clase[] {
  const m = mascaras(slug) ?? [];
  const porEtiqueta = new Map<string, ClaseMascara>(m.map((c) => [c.label, c]));
  return keys.map((k) => ({ ...k, mascara: porEtiqueta.get(k.label)?.file }));
}

function nodos(slug: string): Nodo[] {
  return (getMarkers(slug)?.points ?? []).map((p) => ({ x: p.x, y: p.y, r: p.r }));
}

function leyenda(id: string): { label: string; color: string }[] {
  return getCase(id)?.legend?.[0]?.keys.map((k) => ({ label: k.label, color: k.color })) ?? [];
}

function datos(id: string) {
  return getCase(id)?.facts ?? [];
}

/* -------------------------------------------------------------------------- */

const FAMILIA: Record<string, Plano['familia']> = {
  '01': 'urbana',
  '02': 'cuenca', '03': 'cuenca', '04': 'cuenca',
  '05': 'mineral', '06': 'mineral', '07': 'mineral', '08': 'mineral',
  '09': 'tecnica', '10': 'tecnica', '11': 'tecnica',
  '12': 'suelo', '13': 'suelo',
};

const SUPERFICIE: Record<string, 'tinta' | 'papel'> = {
  '01': 'tinta',
  '02': 'papel', '03': 'papel', '04': 'papel',
  '05': 'papel', '06': 'papel', '07': 'papel', '08': 'tinta',
  '09': 'tinta', '10': 'tinta', '11': 'tinta',
  '12': 'tinta', '13': 'tinta',
};

const OPERACION: Record<string, string> = {
  '01': 'localizar / medir',
  '02': 'captura / zonas críticas',
  '03': 'comparar / seleccionar',
  '04': 'calibrar / comparar',
  '05': 'ampliar / clasificar',
  '06': 'clasificar / aislar',
  '07': 'estratificar / sincronizar',
  '08': 'seleccionar / enfocar',
  '09': 'agrupar / relacionar',
  '10': 'ponderar / ensamblar',
  '11': 'ponderar / contrastar',
  '12': 'diagnosticar / evidenciar',
  '13': 'trazar / seguir el agua',
};

/**
 * Devuelve el plano de un proyecto.
 *
 * Cada `case` construye su propia secuencia. Ninguno comparte composición con
 * el siguiente: es la regla que evita que trece páginas se sientan la misma
 * diapositiva con otra imagen.
 */
export function plano(id: string): Plano | null {
  const c = getCase(id);
  if (!c || id === '14' || id === '15') return null;

  const base = {
    id,
    corto: c.index,
    oficial: c.title,
    lugar: c.place,
    territorio: c.place,
    escala: c.scale,
    familia: FAMILIA[id],
    superficie: SUPERFICIE[id],
    operacion: OPERACION[id],
    fuente: c.dataSource,
    creditos: c.credits,
  };

  const principal = rec(c.artifact, `${c.index}. ${c.place}.`);
  if (!principal) return null;

  switch (id) {
    /* --- P01 · red verde urbana ------------------------------------------ */
    case '01': {
      const alcaldias = rec('cdmx-alcaldias', 'Alcaldías de la Ciudad de México');
      const grafica = rec('p01-colonias-grafica', 'Superficie verde por colonia');
      const d = datos('01');
      return {
        ...base,
        hero: {
          recurso: principal,
          metrica: { valor: d[1]?.value ?? '', etiqueta: d[1]?.label ?? '' },
        },
        capitulos: [
          { id: 'localizar', nombre: 'localizar', tipo: 'localizador',
            contorno: alcaldias, foco: 'Miguel Hidalgo', coordenada: '19.43° −99.20°' },
          { id: 'cobertura', nombre: 'cobertura', tipo: 'mapa',
            recurso: principal, clases: clases(c.artifact, leyenda('01')) },
          { id: 'medir', nombre: 'medir', tipo: 'metricas',
            metricas: d.map((x) => ({ valor: x.value, etiqueta: x.label })),
            apoyo: grafica ?? undefined },
        ],
        descartes: [],
      };
    }

    /* --- P02 · gradiente y nodos ----------------------------------------- */
    case '02': {
      const foto = rec('veracruz-foto', 'Bosque de la cuenca de Decozalapa');
      return {
        ...base,
        hero: { recurso: foto },
        capitulos: [
          { id: 'cuenca', nombre: 'cuenca', tipo: 'localizador',
            contorno: principal, foco: 'Cuenca de Decozalapa', coordenada: '19.51° −96.91°' },
          // Sin unidad: la leyenda de la lámina imprime los ocho valores
          // desnudos, sin declarar en qué se miden. Escribir «%» sería
          // inventarla.
          { id: 'gradiente', nombre: 'gradiente', tipo: 'gradiente',
            recurso: principal, clases: clases(c.artifact, leyenda('02')), unidad: '' },
          { id: 'criticas', nombre: 'zonas críticas', tipo: 'nodos',
            recurso: principal, nodos: nodos('p02-carbono'), etiqueta: 'Zona crítica' },
          ...(foto ? [{ id: 'evidencia', nombre: 'evidencia', tipo: 'evidencia' as const,
            piezas: [foto] }] : []),
        ],
        descartes: [{
          slug: 'carbono-grafica',
          motivo: 'Dona sin categorías, valores ni unidad verificables en la fuente.',
        }],
      };
    }

    /* --- P03 · máscara dual ---------------------------------------------- */
    case '03': {
      const d = datos('03');
      return {
        ...base,
        hero: { recurso: principal, metrica: d[0] ? { valor: d[0].value, etiqueta: d[0].label } : undefined },
        capitulos: [
          { id: 'condiciones', nombre: 'dos condiciones', tipo: 'mapa',
            recurso: principal, clases: clases(c.artifact, leyenda('03')),
            nota: 'Un mismo encuadre, dos cultivos.' },
          { id: 'optimas', nombre: 'zonas óptimas', tipo: 'nodos',
            recurso: principal, nodos: nodos('p03-zonas-optimas'), etiqueta: 'Zona óptima' },
          { id: 'medir', nombre: 'superficie', tipo: 'metricas',
            metricas: d.map((x) => ({ valor: x.value, etiqueta: x.label })) },
        ],
        descartes: [{ slug: 'glyph-cafe', motivo: 'Glifo del sistema visual, no evidencia del proyecto.' }],
      };
    }

    /* --- P04 · comparador calibrado -------------------------------------- */
    case '04': {
      const previo = rec('p03-zonas-optimas', 'P03 · potencial de cultivo');
      return {
        ...base,
        hero: { recurso: principal },
        capitulos: [
          ...(previo ? [{ id: 'comparar', nombre: 'comparar', tipo: 'comparador' as const,
            a: previo, b: { ...principal, pie: 'P04 · uso óptimo de suelo' },
            etiquetaA: 'potencial', etiquetaB: 'uso óptimo' }] : []),
          { id: 'resultado', nombre: 'resultado', tipo: 'mapa',
            recurso: principal, clases: clases(c.artifact, leyenda('04')) },
        ],
        descartes: [{ slug: 'glyph-agricultura', motivo: 'Glifo del sistema visual, no evidencia del proyecto.' }],
      };
    }

    /* --- P05 · microscopio territorial ----------------------------------- */
    case '05': {
      // Derivado limpio: la lámina original trae dos diagonales que llevan a
      // una vista pequeña de la misma reserva. Separadas, la relación la dibuja
      // la interfaz en vez de una línea heredada que cruza la composición.
      const limpio = rec('p05-geomorfones-clean', `${c.index}. ${c.place}.`) ?? principal;
      const localizador = rec('p05-geomorfones-locator', 'La reserva completa, a menor escala');
      const apertura = rec('metz-apertura', 'Reserva de la Biosfera de Metztitlán');
      const d = datos('05');
      return {
        ...base,
        hero: { recurso: apertura ?? limpio },
        capitulos: [
          ...(localizador ? [{ id: 'localizar', nombre: 'localizar', tipo: 'localizador' as const,
            contorno: localizador, foco: 'Reserva de Metztitlán', coordenada: '20.60° −98.76°' }] : []),
          { id: 'general', nombre: 'mapa general', tipo: 'mapa',
            recurso: limpio, clases: [],
            nota: 'Geomorfones de la reserva.' },
          // Los tres encuadres salen de barrer el alfa del **derivado limpio**
          // en una rejilla de 12×12 y quedarse con celdas de cobertura total,
          // separadas entre sí. Medidos sobre el archivo original caían en el
          // papel: el recorte movió el encuadre.
          //
          // Se rotulan por su posición en el encuadre y no con el nombre de un
          // patrón: la fuente enumera tres patrones dominantes de la reserva,
          // pero no dice que se observen en estas tres ventanas.
          { id: 'detalles', nombre: 'detalles', tipo: 'detalles',
            recurso: limpio,
            puntos: [
              { x: 54, y: 46, nombre: '54 · 46 del encuadre' },
              { x: 38, y: 29, nombre: '38 · 29 del encuadre' },
              { x: 13, y: 38, nombre: '13 · 38 del encuadre' },
            ] },
          { id: 'patrones', nombre: 'patrones', tipo: 'metricas',
            metricas: d.map((x) => ({ valor: x.value, etiqueta: x.label })) },
        ],
        descartes: [
          { slug: 'glyph-geoformas', motivo: 'Glifo del sistema visual, no evidencia del proyecto.' },
          { slug: 'p05-geomorfones', motivo: 'Se usa su derivado limpio, sin las diagonales de la lámina.' },
        ],
      };
    }

    /* --- P06 · clasificador cromático ------------------------------------ */
    case '06': {
      const limpio = rec('p06-zonas-ecologicas-clean', `${c.index}. ${c.place}.`) ?? principal;
      return {
        ...base,
        hero: { recurso: limpio },
        capitulos: [
          // Las máscaras se leen del mismo derivado que la lámina: con las del
          // archivo original, el aislamiento caía desplazado.
          { id: 'clases', nombre: 'siete clases', tipo: 'mapa',
            recurso: limpio, clases: clases('p06-zonas-ecologicas-clean', leyenda('06')) },
        ],
        descartes: [
          { slug: 'glyph-uso-suelo', motivo: 'Glifo del sistema visual, no evidencia del proyecto.' },
          { slug: 'p06-zonas-ecologicas', motivo: 'Se usa su derivado limpio: el inset periférico no explica su función.' },
        ],
      };
    }

    /* --- P07 · sincronía mapa–perfil ------------------------------------- */
    case '07': {
      // El perfil existe en dos resoluciones; se usa la mayor.
      const perfil = rec('metz-pendiente-perfil', 'Perfil de clasificación de pendiente')
        ?? rec('p07-pendiente-grafica', 'Perfil de clasificación de pendiente');
      const limpio = rec('p07-pendiente-clean', `${c.index}. ${c.place}.`) ?? principal;
      return {
        ...base,
        hero: { recurso: limpio },
        capitulos: [
          { id: 'mapa', nombre: 'mapa', tipo: 'mapa',
            recurso: limpio, clases: clases('p07-pendiente-clean', leyenda('07')) },
          // La unidad sí está aquí: la leyenda imprime los intervalos como
          // porcentajes de pendiente.
          ...(perfil ? [{ id: 'perfil', nombre: 'perfil', tipo: 'perfil' as const,
            mapa: limpio, perfil, clases: clases('p07-pendiente-clean', leyenda('07')), unidad: '%' }] : []),
        ],
        descartes: [
          { slug: 'p07-pendiente-grafica', motivo: 'Misma figura a 926 px; se usa la versión de 2790 px.' },
          { slug: 'p07-pendiente', motivo: 'Se usa su derivado limpio, sin la diagonal de la lámina.' },
        ],
      };
    }

    /* --- P08 · mira de selección ----------------------------------------- */
    case '08':
      return {
        ...base,
        hero: { recurso: principal },
        capitulos: [
          { id: 'campo', nombre: 'campo de selección', tipo: 'nodos',
            recurso: principal, nodos: nodos('p08-patrones'), etiqueta: 'Geomorfón representativo' },
          { id: 'detalles', nombre: 'detalles', tipo: 'detalles',
            recurso: principal,
            // Ubicaciones tomadas de los propios marcadores verificados.
            puntos: nodos('p08-patrones').slice(0, 3).map((n, i) => ({
              x: Math.round(n.x * 100), y: Math.round(n.y * 100), nombre: `Geomorfón ${i + 1}`,
            })) },
        ],
        descartes: [],
      };

    /* --- P09 · convergencia de vocaciones -------------------------------- */
    case '09':
      return {
        ...base,
        hero: { recurso: principal },
        capitulos: [
          { id: 'territorio', nombre: 'territorio', tipo: 'localizador',
            contorno: principal, foco: 'Aguascalientes', coordenada: '22.04° −102.36°' },
          { id: 'clusteres', nombre: 'clústeres', tipo: 'mapa',
            recurso: principal, clases: clases(c.artifact, leyenda('09')) },
        ],
        descartes: [],
      };

    /* --- P10 y P11 · ensamblaje ponderado -------------------------------- */
    case '10':
    case '11': {
      const criterios = CRITERIOS[id];
      const otro = id === '11' ? rec('p10-conservacion', 'P10 · aptitud para conservación') : null;
      return {
        ...base,
        hero: { recurso: principal },
        capitulos: [
          { id: 'resultado', nombre: 'resultado', tipo: 'mapa',
            recurso: principal, clases: clases(c.artifact, leyenda(id)) },
          { id: 'criterios', nombre: 'criterios', tipo: 'criterios',
            recurso: principal, criterios, clases: clases(c.artifact, leyenda(id)) },
          ...(otro ? [{ id: 'contraste', nombre: 'contraste', tipo: 'comparador' as const,
            a: otro, b: { ...principal, pie: 'P11 · aptitud agrícola' },
            etiquetaA: 'conservación', etiquetaB: 'agricultura' }] : []),
        ],
        descartes: [{ slug: 'slab-*', motivo: 'Losetas del sistema visual, no capas del análisis.' }],
      };
    }

    /* --- P12 · diagnóstico y evidencia ----------------------------------- */
    case '12': {
      const suelo = rec('p12-suelo-foto', 'Suelo degradado por manejo ganadero');
      const contexto = rec('calvillo-foto', 'Calvillo, Aguascalientes');
      return {
        ...base,
        hero: { recurso: principal },
        capitulos: [
          { id: 'degradacion', nombre: 'degradación', tipo: 'mapa',
            recurso: principal, clases: clases(c.artifact, leyenda('12')) },
          { id: 'campo', nombre: 'evidencia de campo', tipo: 'evidencia',
            piezas: [suelo, contexto].filter((x): x is Recurso => !!x) },
        ],
        descartes: [],
      };
    }

    /* --- P13 · trazado aguas abajo --------------------------------------- */
    case '13': {
      const detalle = rec('calvillo-subcuencas', 'Subcuencas a mayor resolución');
      return {
        ...base,
        hero: { recurso: principal },
        capitulos: [
          { id: 'subcuencas', nombre: 'subcuencas', tipo: 'flujo',
            recurso: principal, detalle, clases: clases(c.artifact, leyenda('13')) },
          { id: 'localizar', nombre: 'localizar', tipo: 'localizador',
            contorno: principal, foco: 'Calvillo', coordenada: '21.85° −102.72°' },
        ],
        descartes: [],
      };
    }

    default:
      return null;
  }
}

/**
 * Pesos de los criterios, tal como los imprime el PDF.
 *
 * No se normalizan ni se redondean: la regla proporcional los dibuja con el
 * valor que el documento declara.
 */
const CRITERIOS: Record<string, Criterio[]> = {
  '10': [
    { nombre: 'Tipo de cobertura del suelo', peso: 0.25 },
    { nombre: 'Función hidrológica forestal', peso: 0.25 },
    { nombre: 'Fragilidad del ecosistema', peso: 0.20 },
    { nombre: 'Pendiente del terreno', peso: 0.15 },
    { nombre: 'Distancia a áreas inundables', peso: 0.15 },
  ],
  '11': [
    { nombre: 'Tipo de cobertura del suelo', peso: 0.25 },
    { nombre: 'Proximidad a cuerpos de agua', peso: 0.20 },
    { nombre: 'Tipo de suelo', peso: 0.20 },
    { nombre: 'Pendiente del terreno', peso: 0.15 },
    { nombre: 'Distancia a áreas inundables', peso: 0.15 },
    { nombre: 'Susceptibilidad a la erosión', peso: 0.05 },
  ],
};
