/**
 * Derivados de impresión del portafolio.
 *
 * El exportador de Chromium incrusta una imagen tal como la recibe: si la
 * fuente es WebP con canal alfa, la vuelve a codificar sin pérdida y una lámina
 * de 2000 px ocupa varios megabytes. Con las mismas figuras servidas como JPEG
 * de alta calidad y **sin alfa**, el mismo exportador las pasa como DCT y el
 * documento baja de 85 MB a la banda que pide el encargo, con idéntica
 * resolución efectiva.
 *
 * El proceso es de dos pasadas y no adivina nada:
 *
 *   1. abre la composición impresa y mide, figura por figura, el ancho real de
 *      su caja en milímetros y el color de fondo de la hoja donde se apoya;
 *   2. genera para cada una un JPEG del ancho exacto que pide esa caja a la
 *      densidad de destino, aplanado sobre ese mismo fondo.
 *
 * El fondo importa: estas láminas son transparentes y, aplanadas sobre blanco,
 * las que van sobre tinta aparecerían recortadas dentro de un rectángulo claro.
 *
 * Nunca amplía: si el original no llega al ancho pedido, se queda en el suyo.
 *
 *   node scripts/build-print-derivatives.mjs
 */
import { mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { chromium } from 'playwright';

const BASE = process.env.BASE ?? 'http://localhost:4100';
const RUTA = '/portafolio-impreso';
const DESTINO = resolve('public/print');
const MANIFIESTO = join(DESTINO, 'manifest.json');

/** Calidad JPEG.
 *
 * Por debajo de 0.90 los diagramas con texto fino cascarillan. Con el documento
 * en 14 MB frente a un objetivo de 20–30 hay margen de sobra, y el encargo pide
 * que la nitidez mande sobre una reducción arbitraria. */
const CALIDAD = 0.95;

/* Densidad de destino. Es el mismo valor que usa `densidadImpresa.ts` para
   elegir el derivado vectorial; aquí no se puede importar el módulo de
   TypeScript, así que se declara y se comprueba con `qa:impresion`. */
const PPP_IMPRESION = 200;
const pixelesPara = (mm) => Math.ceil((mm / 25.4) * PPP_IMPRESION);

const navegador = await chromium.launch();
const ctx = await navegador.newContext({
  viewport: { width: 1123, height: 794 },
  deviceScaleFactor: 1,
});
const page = await ctx.newPage();

const res = await page.goto(BASE + RUTA, { waitUntil: 'networkidle', timeout: 180000 });
if (!res || res.status() !== 200) {
  console.error(`La composición impresa respondió ${res?.status() ?? 'sin respuesta'}`);
  process.exit(1);
}
await page.evaluate(async () => {
  await document.fonts.ready;
  await Promise.all([...document.images].map((i) => i.decode().catch(() => {})));
});
await page.waitForTimeout(1500);

/* --- 1 · Medir ------------------------------------------------------------- */

const piezas = await page.evaluate(() => {
  const MM = 1123 / 297;                       // px CSS por milímetro en A4 apaisado
  const hojas = [...document.querySelectorAll('section')];

  const opaco = (n) => {
    for (let e = n; e; e = e.parentElement) {
      const c = getComputedStyle(e).backgroundColor;
      const v = (c.match(/[\d.]+/g) || []).map(Number);
      if (v.length >= 3 && (v[3] === undefined || v[3] > 0.9)) {
        const esc = c.startsWith('color(') ? 255 : 1;
        return `#${[v[0] * esc, v[1] * esc, v[2] * esc]
          .map((x) => Math.round(x).toString(16).padStart(2, '0')).join('')}`;
      }
    }
    return '#ffffff';
  };

  return [...document.images].map((i) => {
    const r = i.getBoundingClientRect();
    const est = getComputedStyle(i);
    const ratio = i.naturalWidth / i.naturalHeight;
    const pintado = est.objectFit === 'contain' && Number.isFinite(ratio) && ratio > 0
      ? Math.min(r.width, r.height * ratio) : r.width;
    return {
      // `data-origen` es la lámina antes de sustituirla por su JPEG de
      // impresión; sin ella la segunda pasada mediría su propia salida.
      src: new URL(i.dataset.origen || i.currentSrc || i.src, location.href).pathname,
      hoja: hojas.findIndex((h) => h.contains(i)) + 1,
      cajaMm: pintado / MM,
      nativo: i.naturalWidth,
      fondo: opaco(i.parentElement ?? i),
    };
  }).filter((x) => x.cajaMm > 1 && x.nativo > 0);
});

/* Una entrada por lámina. Si la misma aparece en varias hojas manda la caja
   mayor, que es la que fija la resolución necesaria. Un archivo compartido por
   dos superficies distintas se señala: aplanarlo sobre una sola dejaría la otra
   con un recuadro del color equivocado. */
const pedidos = new Map();
const conflictos = [];
for (const p of piezas) {
  const ancho = Math.min(p.nativo, pixelesPara(p.cajaMm));
  const previo = pedidos.get(p.src);
  if (previo && previo.fondo !== p.fondo) conflictos.push(`${p.src} · ${previo.fondo} y ${p.fondo}`);
  if (!previo || ancho > previo.ancho) {
    pedidos.set(p.src, { src: p.src, fondo: p.fondo, ancho, cajaMm: p.cajaMm, hoja: p.hoja });
  }
}
if (conflictos.length) {
  console.error('Láminas usadas sobre dos fondos distintos:');
  [...new Set(conflictos)].forEach((c) => console.error(`  ${c}`));
  process.exit(1);
}

console.log(`${piezas.length} figuras impresas · ${pedidos.size} derivados a generar`
  + ` · destino ${PPP_IMPRESION} ppp`);

/* --- 2 · Generar ----------------------------------------------------------- */

rmSync(DESTINO, { recursive: true, force: true });
mkdirSync(DESTINO, { recursive: true });

const manifiesto = {};
let total = 0;

for (const [clave, p] of pedidos) {
  const base = p.src.split('/').pop().replace(/\.[a-z0-9]+$/i, '');
  const archivo = `${base}-${p.ancho}-${p.fondo.slice(1)}.jpg`;

  const dataUrl = await page.evaluate(async ({ src, ancho, fondo, calidad }) => {
    const im = new Image();
    im.decoding = 'sync';
    await new Promise((ok, err) => {
      im.onload = ok; im.onerror = () => err(new Error(src));
      im.src = src;
    });
    const alto = Math.max(1, Math.round((ancho * im.naturalHeight) / im.naturalWidth));
    const c = document.createElement('canvas');
    c.width = ancho; c.height = alto;
    const g = c.getContext('2d');
    // El fondo se pinta primero: JPEG no lleva alfa y sin esto las zonas
    // transparentes saldrían negras.
    g.fillStyle = fondo;
    g.fillRect(0, 0, ancho, alto);
    g.imageSmoothingQuality = 'high';
    g.drawImage(im, 0, 0, ancho, alto);
    return c.toDataURL('image/jpeg', calidad);
  }, { src: p.src, ancho: p.ancho, fondo: p.fondo, calidad: CALIDAD });

  const buf = Buffer.from(dataUrl.split(',')[1], 'base64');
  writeFileSync(join(DESTINO, archivo), buf);
  total += buf.length;
  manifiesto[clave] = { archivo: `/print/${archivo}`, ancho: p.ancho, fondo: p.fondo };
}

writeFileSync(MANIFIESTO, `${JSON.stringify(manifiesto, null, 1)}\n`);
await navegador.close();

console.log(`${pedidos.size} derivados · ${(total / 1024 / 1024).toFixed(1)} MB en disco`);
console.log(`manifiesto: ${MANIFIESTO}`);
