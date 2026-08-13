import { plano, type Capitulo, type Plano, type Recurso } from '@/components/proyecto/blueprints';
import { sistemas, type Imagen, type Sistema } from '@/components/sistemas/registro';

/**
 * Traducción editorial de los planos a páginas impresas.
 *
 * El PDF no lee `cases.support[]` ni reutiliza el DOM interactivo: cada
 * proyecto declara aquí sus hojas a partir de `plano(id)`, y cada hoja dice qué
 * composición impresa es. Un estado interactivo se traduce, no se fotografía:
 *
 *   máscaras            → mapa completo con su leyenda al lado
 *   comparador          → díptico calibrado
 *   nodos animados      → mapa final numerado con su contador
 *   detalles            → mapa + recortes + conectores dibujados
 *   perfil sincronizado → mapa y perfil con llamadas cromáticas
 *   criterios animados  → matriz de pesos + mapa de resultado
 *   flujo               → mapa con dirección declarada
 *   evidencia           → contacto editorial con pies
 *
 * Nada entra por existir en el manifiesto. Si un capítulo no aporta una lectura
 * impresa distinta, no genera hoja.
 */

export type HojaImpresa = {
  proyecto: string;
  clase:
    | 'apertura-mapa' | 'atlas-detalle' | 'comparacion' | 'perfil'
    | 'criterios' | 'evidencia' | 'flujo' | 'metricas';
  titulo: string;
  /** Recursos en el orden en que la composición los coloca. */
  recursos: Recurso[];
  clases?: { label: string; color: string }[];
  metricas?: { valor: string; etiqueta: string }[];
  criterios?: { nombre: string; peso: number }[];
  nodos?: { x: number; y: number; r: number }[];
  puntos?: { x: number; y: number; nombre: string }[];
  etiquetas?: [string, string];
  /** Rótulo del contador cuando la hoja lleva nodos. */
  contador?: string;
  fuente?: string;
  superficie: 'tinta' | 'papel';
  familia: Plano['familia'];
};

const cap = <T extends Capitulo['tipo']>(p: Plano, t: T) =>
  p.capitulos.find((c) => c.tipo === t) as Extract<Capitulo, { tipo: T }> | undefined;

/** Las hojas de un proyecto, en orden de lectura impresa. */
export function hojasDe(id: string): HojaImpresa[] {
  const p = plano(id);
  if (!p) return [];

  const comun = {
    proyecto: p.id,
    superficie: p.superficie,
    familia: p.familia,
    fuente: p.fuente,
  };

  const hojas: HojaImpresa[] = [];

  // 1 · Apertura con el mapa dominante y su leyenda. Es la hoja que todo
  //     proyecto tiene: el artefacto principal a tamaño de página.
  const mapa = cap(p, 'mapa') ?? cap(p, 'gradiente') ?? cap(p, 'flujo');
  const principal = mapa && 'recurso' in mapa ? mapa.recurso : p.hero.recurso;
  const apertura: HojaImpresa | undefined = principal ? {
    ...comun,
    clase: 'apertura-mapa',
    titulo: p.corto,
    recursos: [principal],
    clases: mapa && 'clases' in mapa ? mapa.clases : undefined,
    metricas: p.hero.metrica ? [{ valor: p.hero.metrica.valor, etiqueta: p.hero.metrica.etiqueta }] : undefined,
  } : undefined;
  if (apertura) hojas.push(apertura);

  /**
   * En pantalla, dos capítulos pueden mirar la misma lámina y aún así decir
   * cosas distintas, porque el estado cambia bajo el cursor. En papel el estado
   * no existe: dos hojas seguidas con la misma imagen se leen como un error de
   * imposición. Cuando un instrumento comparte lámina con la apertura, no genera
   * hoja propia; se pliega dentro de ella y la apertura llega más cargada.
   */
  const repiteApertura = (r: Recurso | undefined) =>
    !!apertura && !!r && r.img.src === apertura.recursos[0]?.img.src;

  // 2 · Nodos: el mapa numerado con el contador que en pantalla se construye
  //     por animación.
  const nodos = cap(p, 'nodos');
  if (nodos?.nodos.length) {
    if (repiteApertura(nodos.recurso) && apertura) {
      apertura.nodos = nodos.nodos;
      apertura.contador = nodos.etiqueta;
    } else {
      hojas.push({ ...comun, clase: 'flujo', titulo: nodos.etiqueta, recursos: [nodos.recurso], nodos: nodos.nodos, contador: nodos.etiqueta });
    }
  }

  // 3 · Detalles: las ventanas mandan y el mapa baja a localizador. Invertir la
  //     jerarquía es lo que impide que la hoja repita la apertura.
  const det = cap(p, 'detalles');
  if (det?.puntos.length) {
    hojas.push({
      ...comun,
      clase: 'atlas-detalle',
      titulo: 'Detalles',
      recursos: [det.recurso],
      puntos: det.puntos,
    });
  }

  // 4 · Perfil: mapa y perfil enfrentados con sus llamadas cromáticas.
  const perf = cap(p, 'perfil');
  if (perf) {
    hojas.push({
      ...comun,
      clase: 'perfil',
      titulo: 'Perfil e intervalos',
      recursos: [perf.perfil, perf.mapa],
      clases: perf.clases,
    });
  }

  // 5 · Criterios: la matriz de pesos. Si el resultado es la misma lámina de la
  //     apertura, la matriz viaja en su columna de instrumentos.
  const cri = cap(p, 'criterios');
  if (cri) {
    if (repiteApertura(cri.recurso) && apertura) {
      apertura.criterios = cri.criterios;
      apertura.clases = apertura.clases ?? cri.clases;
    } else {
      hojas.push({
        ...comun,
        clase: 'criterios',
        titulo: 'Criterios ponderados',
        recursos: [cri.recurso],
        criterios: cri.criterios,
        clases: cri.clases,
      });
    }
  }

  // 6 · Comparación: díptico calibrado con sus dos estados rotulados.
  const comp = cap(p, 'comparador');
  if (comp) {
    hojas.push({
      ...comun,
      clase: 'comparacion',
      titulo: 'Comparación',
      recursos: [comp.a, comp.b],
      etiquetas: [comp.etiquetaA, comp.etiquetaB],
    });
  }

  // 7 · Evidencia: contacto editorial con pies completos.
  const ev = cap(p, 'evidencia');
  if (ev?.piezas.length) {
    hojas.push({ ...comun, clase: 'evidencia', titulo: 'Evidencia de campo', recursos: ev.piezas });
  }

  // 8 · Métricas: sólo las que no viajan ya en la apertura, y sólo si quedan
  //     tres o más; con menos, la hoja sería un hueco.
  const met = cap(p, 'metricas');
  if (met) {
    const yaEstan = new Set((apertura?.metricas ?? []).map((m) => m.etiqueta));
    const propias = met.metricas.filter((m) => !yaEstan.has(m.etiqueta));
    if (propias.length >= 3) {
      hojas.push({
        ...comun,
        // Las cifras son la pausa de baja densidad después de una lámina llena,
        // y sus apoyos son gráficas de fondo blanco: sobre tinta se leen como un
        // recuadro pegado, sobre papel se funden con la hoja.
        superficie: 'papel',
        clase: 'metricas',
        titulo: 'Cifras',
        recursos: met.apoyo && !repiteApertura(met.apoyo) ? [met.apoyo] : [],
        metricas: propias,
      });
    }
  }

  return hojas;
}

/** Todas las hojas de P01–P13, en orden. */
export function hojasProyectos(): HojaImpresa[] {
  return ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13']
    .flatMap(hojasDe);
}


/* -------------------------------------------------------------------------- */
/* SISTEMAS                                                                    */
/* -------------------------------------------------------------------------- */

export type HojaSistema = {
  codigo: string;
  nombre: string;
  capacidad: string;
  estado: string;
  acciones: string[];
  anotacion: string;
  rol: string;
  alcance: string;
  principal: Imagen | null;
  detalles: Imagen[];
  /** Rótulo de cada estado, cuando la hoja narra una secuencia. */
  secuencia?: string[];
};

/**
 * Las hojas del capítulo SISTEMAS.
 *
 * S01 ocupa dos: el sistema y su prueba operativa. No son dos proyectos
 * —es el mismo ecosistema en dos estados— y separarlos es la única forma de que
 * la palabra «demostrador» quede pegada a las pantallas que lo son.
 */
export function hojasSistemas(): HojaSistema[] {
  const hojas: HojaSistema[] = [];

  for (const s of sistemas()) {
    const base = {
      codigo: s.codigo, nombre: s.nombre, capacidad: s.capacidad,
      acciones: s.acciones as unknown as string[], rol: s.rol, alcance: s.alcance,
    };

    if (s.segundo?.imagen) {
      // Estado 1: el sistema. Sus detalles pertenecen al demostrador, así que
      // viajan con él y no aquí.
      hojas.push({
        ...base,
        estado: s.principal?.estado ?? s.estado,
        anotacion: s.lectura,
        principal: s.principal,
        detalles: [],
      });
      // Estado 2: la prueba operativa. Tres estados del mismo flujo —territorio,
      // índice y resultado— con una sola declaración de datos simulados, en vez
      // de repetir la misma advertencia bajo cada imagen.
      hojas.push({
        ...base,
        nombre: `${s.nombre} · ${s.segundo.titulo}`,
        estado: s.segundo.estado,
        anotacion: 'El demostrador recorre el flujo completo: se elige la parcela sobre el '
          + 'territorio, se lee su índice en el mismo encuadre y se verifica el resultado '
          + 'de la aplicación.',
        principal: s.segundo.imagen,
        detalles: s.detalles.slice(0, 2),
        secuencia: ['territorio', 'índice', 'prescripción / resultado'],
      });
      continue;
    }

    hojas.push({
      ...base,
      estado: s.estado,
      anotacion: s.lectura,
      principal: s.principal,
      detalles: s.detalles.slice(0, 2),
    });
  }

  return hojas;
}

export type { Sistema };
