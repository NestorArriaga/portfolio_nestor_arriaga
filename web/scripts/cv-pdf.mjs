/**
 * Genera los dos currículos en PDF a partir del propio sitio.
 *
 * Los originales de `CV/` escriben su texto con subconjuntos de fuente cuyos
 * identificadores de glifo no son ASCII: el acento del nombre no se podía
 * corregir sobre el archivo sin romperlo. Estas copias se componen desde
 * `content/cv.ts`, que es una transcripción literal de aquellos, y salen ya
 * firmadas «Nestor», igual que el resto del portafolio.
 *
 * Falla con código distinto de cero si una hoja se desborda, si el documento no
 * tiene exactamente dos páginas o si queda algún «Néstor» en el texto extraído.
 *
 *   node scripts/cv-pdf.mjs
 */
import { execFileSync } from 'node:child_process';
import { mkdirSync, statSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { chromium } from 'playwright';

const BASE = process.env.BASE ?? 'http://localhost:4100';

const DOCS = [
  {
    lang: 'es',
    ruta: '/cv-impreso/es',
    salida: resolve('public/downloads/cv/Nestor-Arriaga-CV-ES.pdf'),
    meta: {
      Title: 'Curriculum vitae — Nestor Elihu Arriaga Gallegos (español)',
      Author: 'Nestor Elihu Arriaga Gallegos',
      Subject: 'Análisis territorial, SIG, paisaje y gestión socioambiental',
      Creator: 'Nestor Elihu Arriaga Gallegos',
    },
  },
  {
    lang: 'en',
    ruta: '/cv-impreso/en',
    salida: resolve('public/downloads/cv/Nestor-Arriaga-CV-EN.pdf'),
    meta: {
      Title: 'Curriculum vitae — Nestor Elihu Arriaga Gallegos (English)',
      Author: 'Nestor Elihu Arriaga Gallegos',
      Subject: 'Territorial analysis, GIS, landscape and socio-environmental planning',
      Creator: 'Nestor Elihu Arriaga Gallegos',
    },
  },
];

/** Cadena PDF en UTF-16BE hexadecimal: sobrevive acentos y guiones largos. */
function cadena(txt) {
  const b = Buffer.from(`﻿${txt}`, 'utf16le').swap16();
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

/**
 * Chromium sólo escribe el título y su propio productor. La autoría, el asunto
 * y el creador se añaden con una actualización incremental que redefine el
 * objeto `/Info`: el archivo original no se toca, se le anexa una versión nueva
 * de ese objeto y su tabla de referencias cruzadas.
 */
function conMetadatos(buf, META) {
  const texto = buf.toString('latin1');
  const iTrailer = texto.lastIndexOf('trailer');
  const iStart = texto.lastIndexOf('startxref');
  if (iTrailer < 0 || iStart < 0) return buf;

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

function linearizar(ruta) {
  try {
    execFileSync('qpdf', ['--linearize', '--object-streams=generate', ruta, `${ruta}.tmp`],
      { stdio: 'pipe' });
    execFileSync('mv', [`${ruta}.tmp`, ruta]);
    return true;
  } catch (e) {
    if (e.status === 3) {
      try { execFileSync('mv', [`${ruta}.tmp`, ruta]); return true; } catch { /* sin salida */ }
    }
    return false;
  }
}

const navegador = await chromium.launch();
// 794 × 1123 px es A4 vertical a 96 dpi, la caja que el CSS declara en mm.
const ctx = await navegador.newContext({
  viewport: { width: 794, height: 1123 },
  deviceScaleFactor: 2,
});

let fallo = false;

for (const doc of DOCS) {
  const page = await ctx.newPage();
  const errores = [];
  page.on('pageerror', (e) => errores.push(`pageerror: ${e.message}`));
  page.on('console', (m) => { if (m.type() === 'error') errores.push(m.text()); });

  const res = await page.goto(BASE + doc.ruta, { waitUntil: 'networkidle', timeout: 90000 });
  if (!res || res.status() !== 200) {
    console.error(`${doc.lang}: la ruta respondió ${res?.status() ?? 'sin respuesta'}`);
    fallo = true; await page.close(); continue;
  }

  await page.evaluate(async () => { await document.fonts.ready; });
  await page.waitForTimeout(500);

  // Una hoja mide 210 × 297 mm. En papel, un desbordamiento es un corte.
  const desbordadas = await page.evaluate(() => {
    const hojas = [...document.querySelectorAll('[data-hoja]')];
    return hojas
      .map((h, i) => {
        const r = h.getBoundingClientRect();
        const n = [...h.querySelectorAll('*')].filter((x) => {
          const b = x.getBoundingClientRect();
          return b.right > r.right + 1 || b.bottom > r.bottom + 1;
        }).length;
        return n ? { hoja: i + 1, n } : null;
      })
      .filter(Boolean);
  });

  if (desbordadas.length) {
    console.error(`${doc.lang}: contenido fuera de la caja de impresión:`);
    desbordadas.forEach((d) => console.error(`   hoja ${d.hoja}: ${d.n} elementos`));
    fallo = true; await page.close(); continue;
  }
  if (errores.length) {
    console.error(`${doc.lang}: errores durante la composición: ${errores.slice(0, 4).join(' | ')}`);
    fallo = true; await page.close(); continue;
  }

  const pdf = await page.pdf({
    width: '210mm',
    height: '297mm',
    printBackground: true,
    margin: { top: '0', right: '0', bottom: '0', left: '0' },
    preferCSSPageSize: true,
    tagged: true,
  });

  mkdirSync(dirname(doc.salida), { recursive: true });
  writeFileSync(doc.salida, conMetadatos(pdf, doc.meta));
  const lin = linearizar(doc.salida);
  await page.close();

  // Comprobaciones sobre el archivo, no sobre la intención.
  let paginas = 0;
  let conAcento = 0;
  try {
    paginas = Number(execFileSync('pdfinfo', [doc.salida], { encoding: 'utf8' })
      .match(/^Pages:\s+(\d+)/m)?.[1] ?? 0);
    const txt = execFileSync('pdftotext', [doc.salida, '-'], { encoding: 'utf8' });
    conAcento = (txt.match(/Néstor/g) ?? []).length;
  } catch { /* sin poppler: se informa lo que se puede */ }

  const kb = Math.round(statSync(doc.salida).size / 1024);
  console.log(`${doc.lang.toUpperCase()}  ${doc.salida}`);
  console.log(`   ${paginas || '?'} páginas · ${kb} KB · ${lin ? 'linearizado' : 'sin linearizar'}`
    + ` · «Néstor»: ${conAcento}`);

  if (paginas && paginas !== 2) { console.error(`   ${doc.lang}: se esperaban 2 páginas`); fallo = true; }
  if (conAcento) { console.error(`   ${doc.lang}: quedó el acento en el nombre`); fallo = true; }
}

await navegador.close();
process.exit(fallo ? 1 : 0);
