/**
 * Auditoría de las 21 páginas interiores más los estados de la portada.
 *
 * Mide overflow horizontal real (`scrollWidth` contra `clientWidth`), presencia
 * de `h1`, destinos de Atlas y Vistazo, imágenes rotas y errores de consola.
 * No usa media queries como prueba: abre cada ruta en cada viewport.
 */
import { chromium } from 'playwright';

const BASE = process.env.BASE ?? 'http://localhost:4100';

const CASOS = [
  'areas-verdes-miguel-hidalgo', 'captura-de-carbono-decozalapa',
  'zonas-optimas-limon-cafe', 'uso-optimo-de-suelo-limon-cafe',
  'geomorfologia-metztitlan', 'zonas-ecologicas-metztitlan',
  'pendiente-metztitlan', 'patrones-geomorfologicos',
  'vocaciones-productivas-aguascalientes', 'aptitud-conservacion',
  'aptitud-agricola', 'degradacion-del-suelo-calvillo',
  'subcuencas-y-rios-calvillo',
];
const PILARES = ['agua', 'agropecuario', 'gobernanza', 'socioeconomia',
  'ambiente', 'conectividad', 'clustering'];
const SISTEMAS = ['datos-aereos-agricolas', 'estrato', 'maices-nativos', 'territoria'];

const RUTAS = [
  '/', '/?vistazo=1', '/#p03', '/#p14', '/#sistemas', '/#contacto',
  ...CASOS.map((s) => `/caso/${s}`),
  ...PILARES.map((p) => `/granular/${p}`),
  '/caso/urban-challenge',
  ...SISTEMAS.map((s) => `/sistema/${s}`),
];

const VIEWPORTS = [
  { w: 360, h: 800 }, { w: 390, h: 844 }, { w: 430, h: 932 },
  { w: 768, h: 1024 }, { w: 820, h: 1180 }, { w: 1024, h: 768 },
  { w: 1280, h: 720 }, { w: 1366, h: 768 }, { w: 1440, h: 900 },
  { w: 1920, h: 1080 },
];

const fallos = [];

const navegador = await chromium.launch();

for (const vp of VIEWPORTS) {
  const ctx = await navegador.newContext({ viewport: { width: vp.w, height: vp.h } });
  for (const ruta of RUTAS) {
    const page = await ctx.newPage();
    const consola = [];
    page.on('console', (m) => { if (m.type() === 'error' || m.type() === 'warning') consola.push(m.text()); });
    page.on('pageerror', (e) => consola.push(`pageerror: ${e.message}`));

    const res = await page.goto(BASE + ruta, { waitUntil: 'networkidle', timeout: 45000 }).catch(() => null);
    await page.waitForTimeout(700);

    const m = await page.evaluate(() => {
      const de = document.documentElement;
      const rotas = [...document.images].filter((i) => i.complete && i.naturalWidth === 0).length;
      const h1 = document.querySelectorAll('h1').length;
      const anchos = [...document.querySelectorAll('body *')]
        .filter((n) => n.getBoundingClientRect().right > de.clientWidth + 1)
        .slice(0, 3)
        .map((n) => `${n.tagName}.${String(n.className).slice(0, 30)}`);

      /**
       * Texto cortado: un bloque cuyo contenido no cabe en su propia caja y que
       * además no la deja desplazarse ni declara un recorte de líneas. Es la
       * diferencia entre un pie con `line-clamp` —decisión— y un título que
       * pierde su última palabra —defecto—.
       */
      const cortados = [...document.querySelectorAll('h1, h2, h3, p, li, dd, dt, figcaption, span, a, button')]
        .filter((n) => n.offsetParent && n.children.length === 0 && (n.textContent || '').trim())
        .filter((n) => {
          const c = getComputedStyle(n);
          // Texto sólo para lector de pantalla: la caja de 1 px con recorte es
          // la técnica estándar, no un título perdiendo su última palabra.
          const r = n.getBoundingClientRect();
          if (r.width <= 2 || r.height <= 2) return false;
          if (c.clipPath && c.clipPath !== 'none') return false;
          if (c.overflow !== 'hidden' && c.overflowY !== 'hidden') return false;
          if (c.webkitLineClamp && c.webkitLineClamp !== 'none') return false;
          if (c.textOverflow === 'ellipsis') return false;
          return n.scrollHeight > n.clientHeight + 2 || n.scrollWidth > n.clientWidth + 2;
        })
        .slice(0, 3)
        .map((n) => `${n.tagName}:${(n.textContent || '').trim().slice(0, 24)}`);

      // Una sola ayuda a la vez, y siempre dentro del viewport.
      const ayudas = [...document.querySelectorAll('[role="status"]')]
        .filter((n) => n.offsetParent && (n.textContent || '').trim());
      const ayudaFuera = ayudas.some((n) => {
        const r = n.getBoundingClientRect();
        return r.left < 0 || r.top < 0 || r.right > de.clientWidth + 1 || r.bottom > window.innerHeight + 1;
      });

      return {
        scrollWidth: de.scrollWidth, clientWidth: de.clientWidth,
        h1, rotas, culpables: anchos, cortados,
        ayudas: ayudas.length, ayudaFuera,
      };
    });

    const overflow = m.scrollWidth > m.clientWidth;
    const estado = res?.status() ?? 0;
    const interior = ruta.startsWith('/caso') || ruta.startsWith('/granular')
      || ruta.startsWith('/sistema');
    const mal = overflow || estado >= 400 || m.rotas > 0 || consola.length > 0
      || m.cortados.length > 0 || m.ayudas > 1 || m.ayudaFuera
      || (interior ? m.h1 !== 1 : false);

    if (mal) {
      fallos.push({
        ruta, vp: `${vp.w}x${vp.h}`, estado,
        overflow: overflow ? `${m.scrollWidth}>${m.clientWidth}` : null,
        h1: m.h1, rotas: m.rotas, consola: consola.slice(0, 2),
        culpables: m.culpables, cortados: m.cortados,
        ayudas: m.ayudas, ayudaFuera: m.ayudaFuera,
      });
    }
    await page.close();
  }
  await ctx.close();
}

await navegador.close();

import { writeFileSync } from 'node:fs';
writeFileSync('qa-rutas.json', JSON.stringify(fallos, null, 1));

if (fallos.length) {
  // Resumen en consola; el detalle completo queda en `qa-rutas.json`, que no
  // se versiona.
  const porRuta = {};
  for (const f of fallos) (porRuta[f.ruta] ??= []).push(f.vp);
  for (const [r, vps] of Object.entries(porRuta)) console.log(`${r}  ${vps.join(' ')}`);
  console.log(`\n${fallos.length} fallos en ${Object.keys(porRuta).length} rutas`);
  process.exit(1);
}
console.log(`OK — ${RUTAS.length} rutas x ${VIEWPORTS.length} viewports sin fallos`);
