/**
 * QA de la resolución impresa.
 *
 * Recorre la composición del PDF y comprueba, figura por figura, que el archivo
 * que se va a incrustar tiene píxeles suficientes para la caja donde se imprime.
 * Es la prueba de regresión de un fallo que ya ocurrió dos veces: una lámina
 * servida por debajo de su caja se ve blanda en papel y en pantalla no se nota.
 *
 *   node scripts/qa-impresion.mjs
 */
import { chromium } from 'playwright';

const BASE = process.env.BASE ?? 'http://localhost:4100';

/** Mínimo aceptable en papel. Por debajo, el detalle deja de resolverse. */
const PPP_MINIMO = 160;
/** Techo razonable: más allá sólo se paga peso. */
const PPP_MAXIMO = 340;

const nav = await chromium.launch();
const ctx = await nav.newContext({ viewport: { width: 1123, height: 794 }, deviceScaleFactor: 1 });
const page = await ctx.newPage();

const res = await page.goto(`${BASE}/portafolio-impreso`, { waitUntil: 'networkidle', timeout: 180000 });
if (!res || res.status() !== 200) {
  console.error(`La composición impresa respondió ${res?.status() ?? 'sin respuesta'}`);
  process.exit(1);
}
await page.evaluate(async () => {
  await document.fonts.ready;
  await Promise.all([...document.images].map((i) => i.decode().catch(() => {})));
});
await page.waitForTimeout(1500);

const figuras = await page.evaluate(() => {
  const MM = 1123 / 297;
  const hojas = [...document.querySelectorAll('section')];
  return [...document.images].map((i) => {
    const r = i.getBoundingClientRect();
    const est = getComputedStyle(i);
    const ratio = i.naturalWidth / i.naturalHeight;
    const pintado = est.objectFit === 'contain' && Number.isFinite(ratio) && ratio > 0
      ? Math.min(r.width, r.height * ratio) : r.width;
    const mm = pintado / MM;
    return {
      hoja: hojas.findIndex((h) => h.contains(i)) + 1,
      archivo: (i.currentSrc || i.src).split('/').pop(),
      mm: Math.round(mm),
      px: i.naturalWidth,
      ppp: Math.round(i.naturalWidth / (mm / 25.4)),
    };
  }).filter((x) => x.mm > 1 && x.px > 0);
});

await nav.close();

const blandas = figuras.filter((f) => f.ppp < PPP_MINIMO);
const sobradas = figuras.filter((f) => f.ppp > PPP_MAXIMO);

console.log(`${figuras.length} figuras impresas`);
if (sobradas.length) {
  console.log(`\n${sobradas.length} por encima de ${PPP_MAXIMO} ppp (peso sin ganancia visible):`);
  sobradas.forEach((f) => console.log(`  h.${f.hoja} ${f.ppp} ppp · ${f.mm}mm · ${f.archivo}`));
}
if (blandas.length) {
  console.error(`\n${blandas.length} por debajo de ${PPP_MINIMO} ppp:`);
  blandas.forEach((f) => console.error(`  h.${f.hoja} ${f.ppp} ppp · ${f.mm}mm · ${f.archivo}`));
  process.exit(1);
}
console.log(`todas por encima de ${PPP_MINIMO} ppp`);
