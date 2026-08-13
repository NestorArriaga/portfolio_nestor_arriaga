/**
 * Identidad, resumen y contacto — archivo único y editable.
 *
 * Todo lo personal que aparece en el sitio sale de aquí. Está separado de
 * `home.ts` (territorios) y de `cases.ts` (proyectos) a propósito: es lo único
 * que cambia por motivos que no tienen que ver con el trabajo, y quien lo edite
 * no debería tener que abrir un componente.
 *
 * Procedencia de cada dato:
 *
 * - Nombre, perfil, universidad y año: impresos en `Portafolio_Sd.pdf`.
 * - `summary`: redactado por el autor y entregado en la instrucción de
 *   dirección. No se amplía ni se reescribe.
 * - `email`: **no procede del PDF.** Sale de la identidad Git local de este
 *   equipo. Se implementa porque la instrucción lo pide, pero queda marcado
 *   como pendiente de confirmar antes de una publicación pública; ver
 *   `emailSource`.
 *
 * No hay teléfono, redes, ubicación ni formulario: no consta ninguno en las
 * fuentes y no se inventan.
 */

export const identity = {
  name: 'Nestor Elihu Arriaga Gallegos',
  /** Partido en dos líneas para la portada. */
  nameLines: ['Nestor Elihu', 'Arriaga Gallegos'] as const,
  role: 'Estudiante de Ingeniería en Recursos Naturales Renovables',
  /** Versión corta para rótulos y microdatos. */
  roleShort: 'Ingeniería en Recursos Naturales Renovables',
  institution: 'Universidad Autónoma Chapingo',
  line: 'Territorio, ruralidad y paisaje',
  year: '2026',
};

/**
 * Resumen visible. Dos líneas en escritorio, tres en móvil.
 *
 * Va partido en frases y no como un bloque para que la escena pueda revelarlo
 * por líneas —que es lo que pide la dirección— sin trocear el texto en el
 * componente ni recurrir a un efecto de máquina de escribir.
 */
export const summary = [
  'Estudiante de Ingeniería en Recursos Naturales Renovables en la Universidad Autónoma Chapingo.',
  'Trabajo con cartografía, análisis territorial y proyectos de paisaje para comprender recursos naturales, territorio y formas de planificar.',
];

export const contact = {
  email: 'nestorarriaga.irnr@gmail.com',
  /**
   * De dónde salió el correo. Se muestra en el informe, no en la interfaz.
   * Mientras valga `git-local`, el correo está sin confirmar por el autor.
   */
  emailSource: 'git-local' as 'git-local' | 'verificado',
  mailtoSubject: 'Portafolio 2026',
};

/** Firma del autor. Activo real de `PORTAFOLIO GIS/firma.png`, p.5 del PDF. */
export const signatureSlug = 'firma';
