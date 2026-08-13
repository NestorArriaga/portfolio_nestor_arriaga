/**
 * Rutas del atlas — una sola fuente de verdad.
 *
 * Antes cada archivo construía su destino a mano y el resultado era que desde
 * una página de proyecto `Atlas` volvía a `/` —una portada anterior— e `Índice`
 * buscaba `/#indice`, un índice que ya no existe. Peor: `/caso/${slug}` se
 * escribía directamente también para P14 y P15, que no tienen página bajo
 * `/caso`, y eso producía el 404 de `/caso/granular`.
 *
 * Todo destino del atlas se resuelve aquí.
 */

export const ATLAS_HOME = '/';
export const ATLAS_ORBIT_QUERY = 'vistazo';

/** Ancla del proyecto dentro del recorrido: `#p01` … `#p15`. */
export function anclaProyecto(id: string): string {
  return `#p${id}`;
}

/**
 * Página interior de un proyecto.
 *
 * P14 vive en `/granular/[pilar]` y P15 en `/caso/urban-challenge`; ninguno
 * bajo `/caso/[slug]`. Esta función es el único sitio donde se decide.
 */
export function projectHref(id: string, slug: string): string {
  if (id === '14') return '/granular';
  if (id === '15') return '/caso/urban-challenge';
  return `/caso/${slug}`;
}

/** Regreso al recorrido, en el proyecto exacto: `/#p05`. */
export function atlasHref(id: string): string {
  return `/${anclaProyecto(id)}`;
}

/** Recorrido con el índice orbital abierto: `/?vistazo=1`. */
export function vistazoHref(): string {
  return `/?${ATLAS_ORBIT_QUERY}=1`;
}

/**
 * Enlace de apertura que transporta su contexto de regreso.
 *
 * `?from=` sólo se usa para volver, así que se valida al leerlo: ver
 * `origenSeguro`.
 */
export function abrirProyectoHref(id: string, slug: string): string {
  return `${projectHref(id, slug)}?from=${encodeURIComponent(atlasHref(id))}`;
}

/**
 * Valida un origen recibido por query.
 *
 * Sólo se acepta una ruta interna que empiece por la raíz del atlas. Nada de
 * `//host`, ni esquemas, ni rutas de otras secciones: un parámetro de regreso
 * que acepte cualquier destino es una redirección abierta.
 */
export function origenSeguro(from: string | null | undefined): string | null {
  if (!from) return null;
  let v = from;
  try {
    v = decodeURIComponent(from);
  } catch {
    return null;
  }
  // Sólo la portada con ancla o query. `//evil.com` también empieza por `/`,
  // así que no basta con comprobar el primer carácter: un parámetro de regreso
  // que acepte cualquier destino es una redirección abierta.
  if (!/^\/(?:[#?][^\s]*)?$/.test(v)) return null;
  return v;
}

/** Destino de `Atlas` desde una página interior. */
export function regresoAtlas(id: string, from?: string | null): string {
  return origenSeguro(from) ?? atlasHref(id);
}
