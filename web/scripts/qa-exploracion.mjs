/**
 * QA de exploración.
 *
 * Comprueba en un navegador real los gestos y salidas que hacen navegable el
 * portafolio. Cada prueba corresponde a un fallo que llegó a estar en el sitio:
 * tocar un proyecto giraba el campo en vez de abrirlo, la lista tapaba su
 * propio botón de cierre, el índice montaba un segundo globo WebGL sobre el de
 * la portada y los controles nombraban sitios del sistema en vez de acciones.
 *
 *   node scripts/qa-exploracion.mjs
 */
import { chromium } from 'playwright';

const BASE = process.env.QA_BASE || 'http://localhost:4100';

const fallos = [];
const ok = (n) => console.log(`  ok   ${n}`);
const mal = (n, d) => { fallos.push(`${n}: ${d}`); console.log(`  MAL  ${n} — ${d}`); };
const comprobar = (cond, n, d = '') => (cond ? ok(n) : mal(n, d));

const nav = await chromium.launch();

/** Contexto instrumentado: cuenta contextos WebGL desde antes de cargar. */
async function movil(w = 390, h = 844) {
  const ctx = await nav.newContext({
    viewport: { width: w, height: h }, isMobile: true, hasTouch: true, deviceScaleFactor: 2,
  });
  await ctx.addInitScript(() => {
    window.__webgl = 0;
    const o = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = function (...a) {
      if (String(a[0]).startsWith('webgl')) window.__webgl += 1;
      return o.apply(this, a);
    };
  });
  return ctx;
}

/* --- 1 · Toque frente a arrastre en la órbita ------------------------------ */

console.log('\norbita · toque y arrastre');
{
  const ctx = await nav.newContext({ viewport: { width: 1440, height: 900 } });
  const p = await ctx.newPage();
  await p.goto(`${BASE}/?vistazo=1`, { waitUntil: 'networkidle' });
  await p.waitForTimeout(2200);
  await p.getByRole('button', { name: /ver órbita/i }).click().catch(() => {});
  await p.waitForTimeout(600);

  const nodo = p.locator('[data-campo] [data-id]').first();
  const caja = await nodo.boundingBox();

  // Un toque quieto sobre un nodo abre el proyecto.
  await p.mouse.move(caja.x + caja.width / 2, caja.y + caja.height / 2);
  await p.mouse.down();
  await p.mouse.up();
  await p.waitForTimeout(900);
  comprobar(!p.url().includes('vistazo=1'), 'un toque sobre un nodo abre el proyecto', p.url());

  // Un arrastre sobre el campo gira el atlas y no abre nada.
  await p.goto(`${BASE}/?vistazo=1`, { waitUntil: 'networkidle' });
  await p.waitForTimeout(2200);
  const campo = p.locator('[data-campo]').first();
  const c = await campo.boundingBox();
  const giroAntes = await p.evaluate(() => {
    const n = document.querySelector('[data-campo]');
    return n ? n.style.getPropertyValue('--giro') : null;
  });
  await p.mouse.move(c.x + c.width * 0.2, c.y + c.height * 0.5);
  await p.mouse.down();
  for (let i = 1; i <= 8; i += 1) {
    await p.mouse.move(c.x + c.width * 0.2 + i * 14, c.y + c.height * 0.5);
  }
  await p.mouse.up();
  await p.waitForTimeout(600);
  const giroDespues = await p.evaluate(() => {
    const n = document.querySelector('[data-campo]');
    return n ? n.style.getPropertyValue('--giro') : null;
  });
  comprobar(giroAntes !== giroDespues, 'un arrastre gira el campo', `${giroAntes} → ${giroDespues}`);
  comprobar(p.url().includes('vistazo=1'), 'un arrastre no abre ningún proyecto', p.url());
  await ctx.close();
}

/* --- 2 · Apertura desde móvil --------------------------------------------- */

console.log('\nmóvil · apertura de proyecto');
{
  const ctx = await movil();
  const p = await ctx.newPage();
  await p.goto(`${BASE}/?vistazo=1`, { waitUntil: 'networkidle' });
  await p.waitForTimeout(2200);

  const filas = p.locator('[class*=listado] [data-id]');
  const n = await filas.count();
  comprobar(n === 19, 'la lista abre con los diecinueve proyectos', `${n} filas`);

  const yAntes = await p.evaluate(() => window.scrollY);
  await filas.nth(3).tap();
  await p.waitForTimeout(1200);
  comprobar(!p.url().includes('vistazo=1'), 'un toque en la fila abre el proyecto', p.url());
  comprobar(await p.evaluate(() => window.scrollY) >= yAntes,
    'el fondo no se desplaza al tocar', 'la página saltó');
  await ctx.close();
}

/* --- 3 · Los diecinueve abren --------------------------------------------- */

console.log('\nmóvil · los diecinueve proyectos');
{
  const ctx = await movil();
  const p = await ctx.newPage();
  await p.goto(`${BASE}/?vistazo=1`, { waitUntil: 'networkidle' });
  await p.waitForTimeout(2000);
  const total = await p.locator('[class*=listado] [data-id]').count();
  let abiertos = 0;
  for (let i = 0; i < total; i += 1) {
    await p.goto(`${BASE}/?vistazo=1`, { waitUntil: 'domcontentloaded' });
    await p.waitForTimeout(700);
    await p.locator('[class*=listado] [data-id]').nth(i).tap();
    await p.waitForTimeout(700);
    if (!p.url().includes('vistazo=1')) abiertos += 1;
  }
  comprobar(abiertos === total, 'cada proyecto abre con un solo toque', `${abiertos}/${total}`);
  await ctx.close();
}

/* --- 4 · El cierre nunca se pierde ---------------------------------------- */

console.log('\níndice · cierre siempre visible');
{
  const ctx = await movil(360, 800);
  const p = await ctx.newPage();
  await p.goto(`${BASE}/?vistazo=1`, { waitUntil: 'networkidle' });
  await p.waitForTimeout(2000);

  const visible = async () => p.evaluate(() => {
    const b = [...document.querySelectorAll('button')].find((x) => x.textContent.trim() === 'Cerrar');
    if (!b) return null;
    const r = b.getBoundingClientRect();
    return r.top >= 0 && r.bottom <= innerHeight && r.left >= 0 && r.right <= innerWidth;
  });
  comprobar(await visible() === true, 'el cierre se ve al abrir el índice');

  // Se recorre la lista hasta el final y el cierre sigue en su banda.
  await p.evaluate(() => {
    const l = document.querySelector('[class*=listado]');
    if (l) l.scrollTop = l.scrollHeight;
  });
  await p.waitForTimeout(500);
  comprobar(await visible() === true, 'el cierre sigue visible con la lista recorrida');

  await p.getByRole('button', { name: 'Cerrar' }).tap();
  await p.waitForTimeout(800);
  comprobar(await p.locator('[role="dialog"]').count() === 0, 'el cierre cierra el índice');
  await ctx.close();
}

/* --- 5 · Un solo globo WebGL ---------------------------------------------- */

console.log('\nrendimiento · un solo globo');
{
  for (const [tag, w, h] of [['escritorio', 1440, 900], ['móvil', 390, 844]]) {
    const ctx = w > 900
      ? await nav.newContext({ viewport: { width: w, height: h } })
      : await movil(w, h);
    if (w > 900) {
      await ctx.addInitScript(() => {
        window.__webgl = 0;
        const o = HTMLCanvasElement.prototype.getContext;
        HTMLCanvasElement.prototype.getContext = function (...a) {
          if (String(a[0]).startsWith('webgl')) window.__webgl += 1;
          return o.apply(this, a);
        };
      });
    }
    const p = await ctx.newPage();
    await p.goto(`${BASE}/`, { waitUntil: 'networkidle' });
    await p.waitForTimeout(2200);
    await p.goto(`${BASE}/?vistazo=1`, { waitUntil: 'networkidle' });
    await p.waitForTimeout(2500);
    const vivos = await p.evaluate(() => document.querySelectorAll('canvas').length);
    comprobar(vivos <= 1, `${tag}: nunca hay dos globos a la vez`, `${vivos} lienzos`);
    await ctx.close();
  }
}

/* --- 6 · Sin desbordamiento horizontal ------------------------------------ */

console.log('\ncomposición · desbordamiento horizontal');
{
  const rutas = ['/', '/?vistazo=1', '/caso/captura-de-carbono-decozalapa',
    '/granular/clustering', '/caso/urban-challenge', '/sistema/estrato'];
  for (const [w, h] of [[360, 800], [390, 844], [430, 932], [768, 1024]]) {
    const ctx = await movil(w, h);
    const p = await ctx.newPage();
    let peor = 0; let donde = '';
    for (const r of rutas) {
      await p.goto(BASE + r, { waitUntil: 'networkidle' });
      await p.waitForTimeout(1200);
      const o = await p.evaluate(() => document.documentElement.scrollWidth
        - document.documentElement.clientWidth);
      if (o > peor) { peor = o; donde = r; }
    }
    comprobar(peor === 0, `${w}×${h}: ningún desbordamiento horizontal`, `${peor}px en ${donde}`);
    await ctx.close();
  }
}

/* --- 7 · Regreso desde cualquier proyecto --------------------------------- */

console.log('\nnavegación · regreso');
{
  const ctx = await nav.newContext({ viewport: { width: 1440, height: 900 } });
  const p = await ctx.newPage();
  for (const r of ['/caso/geomorfologia-metztitlan', '/granular/clustering',
    '/caso/urban-challenge', '/sistema/territoria']) {
    await p.goto(BASE + r, { waitUntil: 'networkidle' });
    await p.waitForTimeout(800);
    const volver = p.getByRole('link', { name: /volver al recorrido/i }).last();
    const indice = p.getByRole('link', { name: /índice/i }).last();
    const hrefVolver = await volver.getAttribute('href').catch(() => null);
    const hrefIndice = await indice.getAttribute('href').catch(() => null);
    comprobar(/^\/(#p\d+|#sistemas)?$/.test(hrefVolver ?? ''),
      `${r}: vuelve al recorrido`, String(hrefVolver));
    comprobar((hrefIndice ?? '').includes('vistazo=1'),
      `${r}: abre el índice`, String(hrefIndice));
  }
  await ctx.close();
}

/* --- 8 · Movimiento reducido ---------------------------------------------- */

console.log('\nmovimiento reducido');
{
  const ctx = await nav.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
  const p = await ctx.newPage();
  const errores = [];
  p.on('console', (m) => { if (m.type() === 'error') errores.push(m.text()); });
  for (const r of ['/', '/?vistazo=1', '/caso/captura-de-carbono-decozalapa']) {
    await p.goto(BASE + r, { waitUntil: 'networkidle' });
    await p.waitForTimeout(1400);
  }
  comprobar(errores.filter((e) => !/WebGL|GL_VENDOR/.test(e)).length === 0,
    'sin errores propios con movimiento reducido', errores.join(' | ').slice(0, 120));

  // La escena del rostro se entrega terminada, no a medio dibujar.
  await p.goto(BASE, { waitUntil: 'networkidle' });
  await p.waitForTimeout(1200);
  await p.evaluate(() => document.getElementById('rostro')?.scrollIntoView());
  await p.waitForTimeout(1500);
  const trazo = await p.evaluate(() => {
    const n = document.querySelector('[class*=trazo]');
    return n ? getComputedStyle(n).clipPath : null;
  });
  comprobar(trazo === 'none', 'el rostro se entrega completo', String(trazo));
  await ctx.close();
}

/* --- 9 · Las bandas pegajosas no dejan leer a través --------------------- */

/* Una barra fija con fondo translúcido no separa: deja que el título que pasa
   por debajo se lea encima del suyo. Es la forma de superposición que el
   detector de solapes no ve, porque los dos textos están en su sitio. */

console.log('\nbandas · opacidad');
{
  const ctx = await nav.newContext({ viewport: { width: 1440, height: 900 } });
  const p = await ctx.newPage();
  for (const r of ['/caso/captura-de-carbono-decozalapa', '/sistema/estrato',
    '/granular/clustering', '/']) {
    await p.goto(BASE + r, { waitUntil: 'networkidle' });
    await p.waitForTimeout(900);
    await p.evaluate(() => scrollTo(0, 1200));
    await p.waitForTimeout(700);
    const translucidas = await p.evaluate(() => {
      const malas = [];
      document.querySelectorAll('body *').forEach((e) => {
        const s = getComputedStyle(e);
        if (s.position !== 'sticky' && s.position !== 'fixed') return;
        if (!e.textContent.trim()) return;
        const m = s.backgroundColor.match(/rgba?\(([^)]+)\)/);
        if (!m) return;
        const partes = m[1].split(',').map((v) => parseFloat(v));
        const alfa = partes.length > 3 ? partes[3] : 1;
        // Sin fondo declarado no hay promesa de tapar; con fondo, debe tapar.
        if (alfa > 0 && alfa < 1) malas.push(`${e.className} α=${alfa}`);
      });
      return [...new Set(malas)];
    });
    comprobar(translucidas.length === 0, `${r}: ninguna banda deja leer a través`,
      translucidas.slice(0, 3).join(' | '));
  }
  await ctx.close();
}

await nav.close();

console.log(fallos.length
  ? `\n${fallos.length} comprobaciones fallaron:\n  ${fallos.join('\n  ')}`
  : '\nOK — exploración, gestos y composición');
process.exit(fallos.length ? 1 : 0);
