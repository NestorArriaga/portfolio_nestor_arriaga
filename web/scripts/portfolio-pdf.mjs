/**
 * Genera el portafolio PDF a partir del propio sitio.
 *
 * No es un `window.print()` de la portada infinita ni una colección de
 * capturas: abre la ruta de composición `/portafolio-impreso`, que lee los mismos
 * registros que el recorrido, espera a que fuentes e imágenes estén decodificadas
 * y exporta A4 horizontal con fondos.
 *
 * Falla con código distinto de cero si falta un asset, si una hoja se sale de su
 * caja o si el documento queda vacío: un PDF con una página rota es peor que no
 * tener PDF.
 */
import { execFileSync } from 'node:child_process';
import { mkdirSync, statSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { chromium } from 'playwright';

const BASE = process.env.BASE ?? 'http://localhost:4100';

/**
 * Metadatos del documento.
 *
 * Chromium sólo escribe el título y su propio productor. La autoría, el asunto
 * y el creador se añaden con una actualización incremental que redefine el
 * objeto `/Info`: el archivo original no se toca, se le anexa una versión nueva
 * de ese objeto y su tabla de referencias cruzadas.
 */
const META = {
  Title: 'Portafolio 2026 — Nestor Elihu Arriaga Gallegos',
  Author: 'Nestor Elihu Arriaga Gallegos',
  Subject: 'Cartografía, análisis territorial, diseño y sistemas digitales',
  Creator: 'Nestor Elihu Arriaga Gallegos — Portafolio Atlas',
};

/** Cadena PDF en UTF-16BE hexadecimal: sobrevive acentos y guiones largos. */
function cadena(txt) {
  const b = Buffer.from(`\ufeff${txt}`, 'utf16le').swap16();
  return `<${b.toString('hex').toUpperCase()}>`;
}

function fechaPdf(d = new Date()) {
  const z = (n) => String(n).padStart(2, '0');
  const off = -d.getTimezoneOffset();
  const signo = off >= 0 ? '+' : '-';
  return `D:${d.getFullYear()}${z(d.getMonth() + 1)}${z(d.getDate())}`
    + `${z(d.getHours())}${z(d.getMinutes())}${z(d.getSeconds())}`
    + `${signo}${z(Math.floor(Math.abs(off) / 60))}'${z(Math.abs(off) % 60)}'`;
}

function conMetadatos(buf) {
  const texto = buf.toString('latin1');
  const iTrailer = texto.lastIndexOf('trailer');
  const iStart = texto.lastIndexOf('startxref');
  if (iTrailer < 0 || iStart < 0) return buf;   // estructura inesperada: no se toca

  const trailer = texto.slice(iTrailer, iStart);
  const size = Number(/\/Size\s+(\d+)/.exec(trailer)?.[1]);
  const root = /\/Root\s+(\d+\s+\d+\s+R)/.exec(trailer)?.[1];
  const info = /\/Info\s+(\d+)\s+\d+\s+R/.exec(trailer)?.[1];
  const prev = Number(/startxref\s+(\d+)/.exec(texto.slice(iStart))?.[1]);
  if (!size || !root || !info || !Number.isFinite(prev)) return buf;

  const base = buf.length;
  const cuerpo = `${info} 0 obj\n<<\n`
    + Object.entries(META).map(([k, v]) => `/${k} ${cadena(v)}`).join('\n')
    + `\n/CreationDate (${fechaPdf()})\n/ModDate (${fechaPdf()})\n>>\nendobj\n`;

  const offXref = base + Buffer.byteLength(cuerpo, 'latin1');
  const ent = (o, g, t) => `${String(o).padStart(10, '0')} ${String(g).padStart(5, '0')} ${t} \n`;
  const xref = `xref\n0 1\n${ent(0, 65535, 'f')}${info} 1\n${ent(base, 0, 'n')}`
    + `trailer\n<< /Size ${size} /Root ${root} /Info ${info} 0 R /Prev ${prev} >>\n`
    + `startxref\n${offXref}\n%%EOF\n`;

  return Buffer.concat([buf, Buffer.from(cuerpo, 'latin1'), Buffer.from(xref, 'latin1')]);
}
const RUTA = '/portafolio-impreso';
const SALIDA = resolve('public/downloads/Nestor-Arriaga-Gallegos-Portafolio-2026.pdf');

const navegador = await chromium.launch();
/**
 * 1123 × 794 px es A4 horizontal a 96 dpi, la caja que el CSS declara en mm.
 *
 * `deviceScaleFactor` multiplica el ancho con el que el navegador elige del
 * `srcSet`, así que fija la resolución efectiva del papel: a 1.9 una lámina que
 * ocupa 186 mm de caja recibe unos 2130 px de origen, es decir **≈ 290 ppp**
 * antes de la compresión. Bajarlo a 1.3 —como se llegó a probar para recortar
 * peso— deja las figuras con texto fino por debajo de los 200 ppp y el
 * documento se lee blando; la nitidez tiene prioridad sobre el peso mientras el
 * archivo se mantenga bajo el límite.
 */
const ctx = await navegador.newContext({
  viewport: { width: 1123, height: 794 },
  deviceScaleFactor: 1.9,
});
const page = await ctx.newPage();

const errores = [];
page.on('pageerror', (e) => errores.push(`pageerror: ${e.message}`));
page.on('console', (m) => { if (m.type() === 'error') errores.push(m.text()); });
page.on('requestfailed', (r) => errores.push(`asset falló: ${r.url()}`));

const res = await page.goto(BASE + RUTA, { waitUntil: 'networkidle', timeout: 120000 });
if (!res || res.status() !== 200) {
  console.error(`La ruta de composición respondió ${res?.status() ?? 'sin respuesta'}`);
  process.exit(1);
}

// Fuentes e imágenes: `networkidle` sólo garantiza que la red calló, no que el
// navegador haya decodificado los rásteres.
await page.evaluate(async () => {
  await document.fonts.ready;
  await Promise.all([...document.images].map((i) => i.decode().catch(() => {})));
});
await page.waitForTimeout(1200);

const diagnostico = await page.evaluate(() => {
  const hojas = [...document.querySelectorAll('section')];
  const rotas = [...document.images]
    .filter((i) => i.complete && i.naturalWidth === 0)
    .map((i) => i.currentSrc || i.src);

  // Una hoja mide 297 × 210 mm. Se comprueba que su contenido no la desborde:
  // en papel, un desbordamiento es un corte, no una barra de scroll.
  const desbordadas = hojas
    .map((h, i) => {
      const r = h.getBoundingClientRect();
      const excedidos = [...h.querySelectorAll('*')].filter((n) => {
        const b = n.getBoundingClientRect();
        return b.right > r.right + 1 || b.bottom > r.bottom + 1;
      });
      return excedidos.length ? { hoja: i + 1, n: excedidos.length } : null;
    })
    .filter(Boolean);

  return { hojas: hojas.length, rotas, desbordadas };
});

if (diagnostico.hojas === 0) { console.error('El documento no tiene hojas.'); process.exit(1); }
if (diagnostico.rotas.length) {
  console.error(`Imágenes rotas (${diagnostico.rotas.length}):`);
  diagnostico.rotas.slice(0, 8).forEach((u) => console.error(`  ${u}`));
  process.exit(1);
}
if (diagnostico.desbordadas.length) {
  console.error('Hojas cuyo contenido se sale de la caja de impresión:');
  diagnostico.desbordadas.forEach((d) => console.error(`  hoja ${d.hoja}: ${d.n} elementos`));
  process.exit(1);
}
if (errores.length) {
  console.error('Errores durante la composición:');
  errores.slice(0, 8).forEach((e) => console.error(`  ${e}`));
  process.exit(1);
}

mkdirSync(dirname(SALIDA), { recursive: true });

/**
 * `tagged` emite la estructura lógica del documento —encabezados, listas,
 * figuras y su texto alternativo—, que es lo que permite leerlo con un lector
 * de pantalla y respetar el orden de lectura. `outline` construye el índice
 * navegable desde los encabezados de cada hoja.
 */
const pdf = await page.pdf({
  width: '297mm',
  height: '210mm',
  printBackground: true,
  margin: { top: '0', right: '0', bottom: '0', left: '0' },
  preferCSSPageSize: true,
  tagged: true,
  outline: true,
});

writeFileSync(SALIDA, conMetadatos(pdf));
await navegador.close();

/**
 * Linearización.
 *
 * Reordena los objetos para que la primera página se pueda mostrar antes de
 * descargar el archivo entero, y comprime los flujos de estructura. No toca las
 * imágenes: no rasteriza ni recomprime nada, así que la nitidez es exactamente
 * la misma antes y después.
 *
 * Si `qpdf` no está instalado el documento se entrega igual, sólo sin ese
 * reordenamiento; no es motivo para no tener PDF.
 */
function linearizar(ruta) {
  try {
    execFileSync('qpdf', ['--linearize', '--object-streams=generate', ruta, `${ruta}.tmp`],
      { stdio: 'pipe' });
    execFileSync('mv', [`${ruta}.tmp`, ruta]);
    return true;
  } catch (e) {
    // qpdf devuelve 3 en avisos recuperables y aun así escribe el archivo.
    if (e.status === 3) {
      try { execFileSync('mv', [`${ruta}.tmp`, ruta]); return true; } catch { /* sin salida */ }
    }
    console.warn('  (sin linearizar: qpdf no disponible o rechazó el archivo)');
    return false;
  }
}

const linearizado = linearizar(SALIDA);

const bytes = statSync(SALIDA).size;
const mb = bytes / 1024 / 1024;
console.log(`${SALIDA}`);
console.log(`hojas compuestas: ${diagnostico.hojas}`);
console.log(`peso: ${mb.toFixed(1)} MB`);
console.log(`linearizado: ${linearizado ? 'sí' : 'no'}`);

if (bytes === 0) { console.error('El PDF quedó vacío.'); process.exit(1); }
if (mb > 40) {
  console.error(`El PDF pesa ${mb.toFixed(1)} MB y el máximo recomendado es 40.`);
  process.exit(1);
}
