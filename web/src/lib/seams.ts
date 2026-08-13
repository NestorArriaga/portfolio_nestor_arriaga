import { cases } from '@/content/cases';
import { getMarkers } from '@/lib/plates';
import type { SeamData, SeamKind } from '@/components/recorrido/Seam';

/**
 * Qué entrega cada proyecto al siguiente.
 *
 * El recorrido tenía quince momentos y catorce cortes secos. La costura es lo
 * que convierte la sucesión en un paso: el proyecto que sale deja un elemento
 * suyo sobre el negro y el que entra lo recoge.
 *
 * Dos de las catorce se construyen con **evidencia medida**: las posiciones
 * horizontales reales de las zonas críticas de P02 y de los geomorfones de P08,
 * tal como `build_marker_points.py` las localizó sobre la lámina del PDF. Una
 * tercera lleva los **siete colores impresos** en la leyenda de zonas ecológicas
 * de la p.27.
 *
 * Las once restantes son forma, color y retícula, que es exactamente lo que la
 * dirección autoriza cuando no hay evidencia: una línea, una hachura, una pila,
 * una curva. Ninguna lleva número, escala ni leyenda, porque ninguna mide nada.
 *
 * El interludio del rostro se lleva la costura de P13: el agua entra en él como
 * el hilo amarillo que ya dibuja. Meter otra entre el rostro y P14 sería un
 * segundo corte donde el rostro ya es la bisagra.
 */

/** Elemento que entrega cada proyecto, por su número. */
const HANDOFF: Record<string, SeamKind> = {
  '01': 'linea',    // el trazado urbano de Miguel Hidalgo
  '02': 'puntos',   // las zonas críticas medidas
  '03': 'hachura',  // la trama de cultivo
  '04': 'senal',    // cambio de territorio: Veracruz cierra, Hidalgo abre
  '05': 'materia',  // el grano de la roca
  '06': 'clases',   // las siete zonas ecológicas, con su color impreso
  '07': 'perfil',   // los intervalos de pendiente como perfil
  '08': 'puntos',   // los geomorfones seleccionados
  '09': 'nodos',    // los clústeres municipales
  '10': 'capas',    // los criterios apilados de aptitud
  '11': 'mascara',  // el barrido entre dos aptitudes sobre la misma extensión
  '12': 'drenaje',  // la ramificación de la degradación
  '13': 'agua',     // los ríos, que entran en el rostro
  '14': 'reticula', // la retícula de síntesis de GRANULAR
  '15': 'circulo',  // la geometría circular del parque, hacia el cierre
};

/** De qué lámina salen los puntos, cuando la costura los lleva de verdad. */
const MEASURED: Record<string, string> = {
  '02': 'p02-carbono',
  '08': 'p08-patrones',
};

export function buildSeams(): Record<string, SeamData> {
  const out: Record<string, SeamData> = {};

  cases.forEach((c, i) => {
    const kind = HANDOFF[c.id];
    if (!kind) return;

    // El último entrega al cierre, que no es un caso y no tiene acento propio:
    // hereda el blanco de papel del contacto.
    const next = cases[i + 1];
    const seam: SeamData = {
      kind,
      from: c.accent,
      to: next ? next.accent : 'var(--paper)',
    };

    if (kind === 'puntos') {
      const set = getMarkers(MEASURED[c.id] ?? '');
      // Sin el conjunto completo no hay costura de puntos: `getMarkers`
      // devuelve `null` a propósito cuando el pipeline no pudo recuperarlos
      // todos, y una nube parcial afirmaría otra distribución.
      if (!set) {
        out[c.id] = { ...seam, kind: 'linea' };
        return;
      }
      // De izquierda a derecha: el escalonado de entrada recorre entonces el
      // territorio en vez de saltar por el orden en que el pipeline los halló.
      seam.points = set.points
        .map((p) => ({ x: p.x, y: p.y }))
        .sort((a, b) => a.x - b.x);
    }

    if (kind === 'clases') {
      const keys = c.legend?.[0]?.keys ?? [];
      if (!keys.length) {
        out[c.id] = { ...seam, kind: 'linea' };
        return;
      }
      seam.swatches = keys.map((k) => k.color);
    }

    out[c.id] = seam;
  });

  return out;
}
