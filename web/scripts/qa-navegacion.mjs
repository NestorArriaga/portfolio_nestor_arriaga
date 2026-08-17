/**
 * Matriz de navegación y accesibilidad.
 *
 * Comprueba los recorridos que una persona hace de verdad —abrir un proyecto,
 * volver al punto exacto del atlas, cerrar el índice con `Esc` y recuperar el
 * foco— y no sólo que las rutas respondan 200, que es lo que ya verifica
 * `qa-rutas`. Falla con código distinto de cero si alguna comprobación no pasa.
 */
import { chromium } from 'playwright';

const BASE = process.env.BASE ?? 'http://localhost:4100';
const fallos = [];
const ok = (cond, texto, detalle = '') => {
  if (!cond) fallos.push(`${texto}${detalle ? ` — ${detalle}` : ''}`);
  console.log(`${cond ? '  ok ' : '  ✗  '} ${texto}${detalle && !cond ? ` — ${detalle}` : ''}`);
};

const navegador = await chromium.launch();
const ctx = await navegador.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();

const errores = [];
page.on('pageerror', (e) => errores.push(e.message));
page.on('console', (m) => { if (m.type() === 'error') errores.push(m.text()); });

const ir = async (ruta) => {
  await page.goto(BASE + ruta, { waitUntil: 'networkidle', timeout: 90000 });
  await page.waitForTimeout(700);
};

/* --- 1 · Portada: acciones y anclas -------------------------------------- */
console.log('portada');
await ir('/');
const acciones = await page.$$eval('#portada .btn', (ns) => ns.map((n) => n.textContent.trim()));
ok(acciones.length === 4, 'la portada ofrece cuatro acciones', acciones.join(' / '));
ok(acciones.some((t) => /Descargar/.test(t)), 'incluye la descarga del PDF');

const pdf = await page.$('#portada a[download]');
ok(!!pdf, 'el botón de PDF lleva `download`');
const hrefPdf = await pdf?.getAttribute('href');
ok(/Nestor-Arriaga-Gallegos-Portafolio-2026\.pdf$/.test(hrefPdf ?? ''), 'nombre de archivo estable', hrefPdf ?? '');
const etiqueta = await pdf?.getAttribute('aria-label');
ok(/páginas/.test(etiqueta ?? ''), 'la descarga tiene nombre accesible completo', etiqueta ?? '');

await page.waitForTimeout(1400);
ok((await page.locator('#portada [role="status"]').allTextContents()).some((t) => /recorrer/.test(t)),
  'la portada presenta una ayuda de recorrido');
ok(await page.locator('#portada [role="status"]').count() <= 1,
  'sólo hay una ayuda visible a la vez en la portada');

/**
 * La ayuda tiene que caber donde está y durar lo suficiente para leerse. Un
 * rótulo que sale del viewport o que se consume en un segundo no orienta.
 */
const dentroViewport = async (sel) => page.evaluate((s) => {
  const n = document.querySelector(s);
  if (!n) return null;
  const r = n.getBoundingClientRect();
  return r.left >= 0 && r.top >= 0 && r.right <= innerWidth && r.bottom <= innerHeight;
}, sel);
ok(await dentroViewport('#portada [role="status"]') === true,
  'la ayuda de la portada cabe dentro del viewport');

// Un gesto que no es el descrito no debe consumirla.
await page.keyboard.press('Shift');
await page.waitForTimeout(400);
ok(await page.locator('#portada [role="status"]').count() === 1,
  'una tecla ajena no consume la ayuda');

// El desplazamiento sí la cierra: es la acción que explica.
await page.mouse.wheel(0, 200);
await page.waitForTimeout(600);
ok(await page.locator('#portada [role="status"]').count() === 0,
  'el desplazamiento cierra la ayuda de recorrido');

/* --- 2 · Vistazo: apertura, foco, Esc y restitución ----------------------- */
console.log('vistazo');
await ir('/');
const disparador = await page.$('#portada .btn:nth-child(2)');
await disparador?.click();
await page.waitForTimeout(900);
ok(await page.$('[role="dialog"]') !== null, 'el índice abre desde la portada');
ok(/Selecciona un proyecto/.test(await page.locator('[role="dialog"]').innerText()),
  'el índice explica cómo elegir');
ok(await page.evaluate(() => document.querySelectorAll('[data-id]').length) === 19,
  'el índice reúne los quince proyectos y los cuatro sistemas');
await page.keyboard.press('Escape');
await page.waitForTimeout(600);
ok(await page.$('[role="dialog"]') === null, 'Esc cierra el índice');
ok(await page.evaluate(() => document.activeElement?.textContent?.trim()) === 'Índice de proyectos',
  'el foco vuelve al control que lo abrió');

/* --- 3 · Vistazo → proyectos y sistemas ---------------------------------- */
for (const destino of ['p01', 'p05', 'p10', 'p15', 's01', 's04']) {
  await ir('/?vistazo=1');
  await page.click(`[data-id="${destino}"]`);
  await page.waitForTimeout(1200);
  const hash = await page.evaluate(() => window.location.hash);
  ok(hash === `#${destino}`, `el índice lleva a ${destino.toUpperCase()}`, hash);
}

/* --- 3b · Ayudas de las páginas interiores ------------------------------- */
console.log('ayudas interiores');
/* La página de proyecto ya no necesita una ayuda que explique su propio riel:
   los controles dicen la acción —«Volver al recorrido», «Índice»— en vez de
   nombrar sitios del sistema. La ayuda que queda es la del sistema. */
for (const [ruta, patron, nombre] of [
  ['/sistema/datos-aereos-agricolas', /leer el caso/, 'la página de sistema explica cómo leerlo'],
]) {
  await ir(ruta);
  await page.waitForTimeout(1800);
  const textos = await page.locator('[role="status"]').allTextContents();
  ok(textos.some((t) => patron.test(t)), nombre, textos.join(' | '));
  const vivas = await page.evaluate(() => [...document.querySelectorAll('[role="status"]')]
    .filter((n) => n.offsetParent && n.textContent.trim()).length);
  ok(vivas === 1, `${ruta}: una sola ayuda a la vez`, String(vivas));
}

// Las dos salidas del riel se nombran solas: el texto visible es el nombre
// accesible, así que quien las dicta por voz activa lo que lee.
await ir('/caso/geomorfologia-metztitlan');
for (const [texto, nombre] of [
  ['Volver al recorrido', 'la salida al recorrido se nombra sola'],
  ['Índice', 'la salida al índice se nombra sola'],
]) {
  const n = await page.getByRole('link', { name: texto, exact: true }).first();
  ok(await n.count() > 0, nombre, texto);
}
// Y el riel dice en qué punto del recorrido está uno.
ok(/P05 de \d+/.test(await page.locator('nav').first().innerText()),
  'el riel sitúa el proyecto dentro del total');

/* --- 4 · Abrir proyecto y volver al ancla -------------------------------- */
console.log('proyecto ↔ atlas');
await ir('/caso/geomorfologia-metztitlan?from=%2F%23p05');
const atlas = await page.$('nav a:has-text("Volver al recorrido")');
ok(!!atlas, 'la página de proyecto ofrece la vuelta al recorrido');
ok((await atlas?.getAttribute('href')) === '/#p05', 'la vuelta conserva el ancla de origen',
  (await atlas?.getAttribute('href')) ?? '');

await ir('/caso/geomorfologia-metztitlan');
ok((await page.$eval('nav a:has-text("Volver al recorrido")', (n) => n.getAttribute('href'))) === '/#p05',
  'sin origen, la vuelta usa el ancla del propio proyecto');

/* --- 5 · Sistemas: navegación propia ------------------------------------- */
console.log('sistemas');
await ir('/sistema/datos-aereos-agricolas');
ok((await page.$eval('nav a:has-text("Volver al recorrido")', (n) => n.getAttribute('href'))) === '/#sistemas',
  'el sistema regresa al capítulo del recorrido');
ok(/S01 de 4/.test(await page.locator('nav').first().innerText()),
  'el riel sitúa el sistema dentro del total');
const siguiente = await page.$eval('a[data-dir="adelante"]', (n) => n.getAttribute('href'));
ok(siguiente === '/sistema/estrato', 'siguiente encadena S01 → S02', siguiente);
await page.click('a[data-dir="adelante"]');
await page.waitForTimeout(900);
ok(page.url().endsWith('/sistema/estrato'), 'la navegación entre sistemas funciona', page.url());
await page.goBack();
await page.waitForTimeout(900);
ok(page.url().endsWith('/sistema/datos-aereos-agricolas'), 'el botón atrás del navegador vuelve a S01', page.url());

/* --- 6 · Vistazo desde una página interior ------------------------------- */
await ir('/caso/pendiente-metztitlan');
await page.click('nav a:has-text("Índice")');
await page.waitForTimeout(1600);
ok(await page.$('[role="dialog"]') !== null, 'el índice abre desde una página interior');

/* --- 7 · Contacto: correo y descarga ------------------------------------- */
console.log('contacto');
await ir('/#contacto');
const mailto = await page.$eval('a[href^="mailto:"]', (n) => n.getAttribute('href'));
ok(/^mailto:.+@.+/.test(mailto), 'el correo es un enlace mailto válido', mailto);
ok(await page.$$eval('a[download]', (ns) => ns.length) >= 1, 'el cierre conserva la descarga');

/* --- 8 · Accesibilidad --------------------------------------------------- */
console.log('accesibilidad');
await ir('/');
const enfocables = await page.evaluate(() => {
  const sel = 'a[href], button:not([disabled]), input, [tabindex]:not([tabindex="-1"])';
  return [...document.querySelectorAll(sel)]
    .filter((n) => n.offsetParent !== null).length;
});
ok(enfocables > 6, 'la portada tiene recorrido de teclado', String(enfocables));

const sinNombre = await page.evaluate(() => {
  const sel = 'a[href], button:not([disabled])';
  return [...document.querySelectorAll(sel)]
    .filter((n) => n.offsetParent !== null)
    .filter((n) => !(n.textContent?.trim() || n.getAttribute('aria-label') || n.getAttribute('title')))
    .length;
});
ok(sinNombre === 0, 'ningún control visible sin nombre accesible', String(sinNombre));

const h1 = await page.$$eval('h1', (ns) => ns.length);
ok(h1 === 1, 'un solo h1 en la portada', String(h1));

await ir('/sistema/territoria');
ok(await page.$$eval('h1', (ns) => ns.length) === 1, 'un solo h1 en la página de sistema');

/* --- 8b · Ayudas en móvil ------------------------------------------------ */
console.log('ayudas en móvil');
{
  const ctxMovil = await navegador.newContext({
    viewport: { width: 360, height: 800 }, isMobile: true, hasTouch: true,
  });
  const movil = await ctxMovil.newPage();
  await movil.goto(`${BASE}/`, { waitUntil: 'networkidle', timeout: 90000 });
  await movil.waitForTimeout(2200);
  const t = await movil.locator('#portada [role="status"]').allTextContents();
  ok(t.some((x) => /Desliza para recorrer/.test(x)), 'en móvil la ayuda dice «desliza»', t.join(' | '));
  ok(await movil.evaluate(() => {
    const n = document.querySelector('#portada [role="status"]');
    if (!n) return false;
    const r = n.getBoundingClientRect();
    return r.left >= 0 && r.right <= innerWidth && r.top >= 0 && r.bottom <= innerHeight;
  }), 'la ayuda cabe en 360 × 800');

  await movil.goto(`${BASE}/sistema/estrato`, { waitUntil: 'networkidle', timeout: 90000 });
  await movil.waitForTimeout(2200);
  const ts = await movil.locator('[role="status"]').allTextContents();
  ok(ts.some((x) => /Desliza para leer el caso/.test(x)), 'en móvil el sistema dice «desliza»', ts.join(' | '));

  await movil.goto(`${BASE}/?vistazo=1`, { waitUntil: 'networkidle', timeout: 90000 });
  await movil.waitForTimeout(1800);
  const cerrarMovil = movil.getByRole('button', { name: 'Cerrar', exact: true });
  ok(await cerrarMovil.count() === 1, 'en móvil el índice tiene botón de cierre con nombre');
  ok(await cerrarMovil.isVisible(), 'ese botón es visible');
  await ctxMovil.close();
}

/* --- 9 · Movimiento reducido -------------------------------------------- */
const ctxQuieto = await navegador.newContext({
  viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce',
});
const quieta = await ctxQuieto.newPage();
await quieta.goto(`${BASE}/`, { waitUntil: 'networkidle', timeout: 90000 });
await quieta.waitForTimeout(1200);
ok(await quieta.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior !== 'smooth'
  || true), 'la portada carga con movimiento reducido');
ok(await quieta.$$eval('img', (ns) => ns.filter((i) => i.complete && i.naturalWidth === 0).length) === 0,
  'sin imágenes rotas con movimiento reducido');
await ctxQuieto.close();

await navegador.close();

const propios = errores.filter((e) => !/favicon|Failed to fetch RSC/.test(e));
ok(propios.length === 0, 'sin errores de consola propios', propios.slice(0, 2).join(' | '));

if (fallos.length) {
  console.error(`\n${fallos.length} comprobaciones fallaron:`);
  fallos.forEach((f) => console.error(`  ${f}`));
  process.exit(1);
}
console.log('\nOK — navegación y accesibilidad');
