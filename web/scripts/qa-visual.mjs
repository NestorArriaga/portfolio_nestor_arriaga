/**
 * QA visual del atlas.
 *
 * Recorre todas las rutas publicadas, mide composición (alto, desbordamiento,
 * densidad de las figuras, vacíos verticales) y deja capturas por viewport para
 * revisar apertura, cuerpo y cierre en escritorio y móvil.
 *
 *   node scripts/qa-visual.mjs [filtro] [destino]
 */
import { chromium } from 'playwright';
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const BASE = process.env.QA_BASE || 'http://localhost:4100';
const OUT = process.argv[3] || '.qa-visual';

export const RUTAS = [
  ['/', 'home'],
  ['/caso/areas-verdes-miguel-hidalgo', 'p01'],
  ['/caso/captura-de-carbono-decozalapa', 'p02'],
  ['/caso/zonas-optimas-limon-cafe', 'p03'],
  ['/caso/uso-optimo-de-suelo-limon-cafe', 'p04'],
  ['/caso/geomorfologia-metztitlan', 'p05'],
  ['/caso/zonas-ecologicas-metztitlan', 'p06'],
  ['/caso/pendiente-metztitlan', 'p07'],
  ['/caso/patrones-geomorfologicos', 'p08'],
  ['/caso/vocaciones-productivas-aguascalientes', 'p09'],
  ['/caso/aptitud-conservacion', 'p10'],
  ['/caso/aptitud-agricola', 'p11'],
  ['/caso/degradacion-del-suelo-calvillo', 'p12'],
  ['/caso/subcuencas-y-rios-calvillo', 'p13'],
  ['/granular', 'p14-entrada'],
  ['/granular/agua', 'p14-agua'],
  ['/granular/agropecuario', 'p14-agropecuario'],
  ['/granular/gobernanza', 'p14-gobernanza'],
  ['/granular/socioeconomia', 'p14-socioeconomia'],
  ['/granular/ambiente', 'p14-ambiente'],
  ['/granular/conectividad', 'p14-conectividad'],
  ['/granular/clustering', 'p14-clustering'],
  ['/caso/urban-challenge', 'p15'],
  ['/sistema/datos-aereos-agricolas', 's01'],
  ['/sistema/estrato', 's02'],
  ['/sistema/maices-nativos', 's03'],
  ['/sistema/territoria', 's04'],
];

const PANTALLAS = (process.env.QA_PANTALLAS || 'esc,mov').split(',');
const TAMANOS = {
  esc: [1440, 900],
  esc13: [1280, 800],
  esc19: [1920, 1080],
  tab: [768, 1024],
  tabh: [1024, 768],
  mov: [390, 844],
  mov375: [375, 812],
  mov360: [360, 800],
};

const filtro = process.argv[2];
const lista = !filtro || filtro === 'all'
  ? RUTAS
  : RUTAS.filter(([, k]) => k.includes(filtro));

mkdirSync(OUT, { recursive: true });

const nav = await chromium.launch();
const informe = [];

for (const tag of PANTALLAS) {
  const [vw, vh] = TAMANOS[tag];
  const movil = vw < 700;
  const ctx = await nav.newContext({
    viewport: { width: vw, height: vh },
    deviceScaleFactor: 1,
    isMobile: movil,
    hasTouch: movil,
  });

  for (const [ruta, clave] of lista) {
    const page = await ctx.newPage();
    const errores = [];
    const fallos = [];
    page.on('console', (m) => { if (m.type() === 'error') errores.push(m.text().slice(0, 160)); });
    page.on('response', (r) => {
      if (r.status() >= 400) fallos.push(`${r.status()} ${r.url().slice(-70)}`);
    });

    try {
      await page.goto(BASE + ruta, { waitUntil: 'networkidle', timeout: 60000 });
    } catch { /* se evalúa lo que haya cargado */ }
    await page.waitForTimeout(700);

    const alto = await page.evaluate(() => Math.max(
      document.documentElement.scrollHeight, document.body.scrollHeight,
    ));

    // Recorrido completo: fuerza la carga diferida antes de medir y capturar.
    for (let y = 0; y < alto; y += Math.round(vh * 0.8)) {
      await page.evaluate((v) => window.scrollTo(0, v), y);
      await page.waitForTimeout(120);
    }
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(400);

    const m = await page.evaluate(() => {
      const d = document.documentElement;

      /* Densidad efectiva de una figura.
       *
       * `naturalWidth` ya viene dividido por la densidad que el navegador
       * eligió del `srcSet`, así que compararlo con la caja mide justo lo que
       * interesa: cuántos píxeles de origen caen en cada píxel CSS pintado.
       * Con `object-fit: contain` lo pintado es menor que la caja, y medir
       * contra la caja daba falsos positivos en toda lámina apaisada. */
      const pintado = (i, r) => {
        const est = getComputedStyle(i);
        const ratio = i.naturalWidth / i.naturalHeight;
        if (!Number.isFinite(ratio) || ratio <= 0) return r.width;
        if (est.objectFit === 'contain') return Math.min(r.width, r.height * ratio);
        return r.width;
      };

      const imgs = [...document.images].filter((i) => {
        // Una figura dentro de una bandeja cerrada todavía no se ha decodificado
        // y eso no es un fallo: se descarga al abrirla.
        const bandeja = i.closest('details');
        return !bandeja || bandeja.open;
      }).map((i) => {
        const r = i.getBoundingClientRect();
        return {
          src: (i.currentSrc || i.src).split('/').pop(),
          w: Math.round(r.width), h: Math.round(r.height),
          nw: i.naturalWidth, nh: i.naturalHeight,
          pintado: Math.round(pintado(i, r)),
          // `alt=""` es la marca correcta de una figura decorativa: la saca
          // del árbol de accesibilidad. El fallo es no declarar el atributo.
          alt: i.hasAttribute('alt'),
        };
      }).filter((i) => i.w > 0);

      /* Vacíos verticales.
       *
       * Se marca cada banda de 25 px que alguna pieza real ocupa —texto,
       * figura, dibujo o control— y se buscan las rachas sin marcar. Un tramo
       * largo sin nada es el hueco de viewport que hay que componer o cerrar. */
      const alto = Math.max(d.scrollHeight, document.body.scrollHeight);
      const BANDA = 25;
      const ocupada = new Uint8Array(Math.ceil(alto / BANDA));
      const piezas = document.querySelectorAll(
        'img, svg, canvas, video, p, h1, h2, h3, li, dd, dt, button, a, summary, input, figure, span',
      );
      for (const n of piezas) {
        const r = n.getBoundingClientRect();
        if (r.width < 2 || r.height < 2) continue;
        const est = getComputedStyle(n);
        if (est.visibility === 'hidden' || est.opacity === '0') continue;
        // Un recorte se pinta con `background-image`: sin contarlo, media
        // composición de P15 aparecía como hueco. Los contenedores sin nada
        // pintado siguen sin contar.
        const dibuja = n.matches('img, svg, canvas, video')
          || est.backgroundImage !== 'none'
          || [...n.childNodes].some((k) => k.nodeType === 3 && k.textContent.trim());
        if (!dibuja) continue;
        const y0 = r.top + window.scrollY;
        for (let b = Math.floor(y0 / BANDA); b <= Math.floor((y0 + r.height) / BANDA); b += 1) {
          if (b >= 0 && b < ocupada.length) ocupada[b] = 1;
        }
      }
      const vacios = [];
      let inicio = -1;
      for (let b = 0; b <= ocupada.length; b += 1) {
        if (b < ocupada.length && !ocupada[b]) { if (inicio < 0) inicio = b; continue; }
        if (inicio >= 0) {
          const px = (b - inicio) * BANDA;
          // El recorrido de la portada compone escenas a sangre con lienzos y
          // geometría posicionada que este barrido no ve; ahí el hueco se
          // revisa mirando la escena, no contando cajas.
          if (px >= window.innerHeight * 0.5 && location.pathname !== '/') {
            vacios.push({ desde: inicio * BANDA, px, vh: +(px / window.innerHeight).toFixed(2) });
          }
          inicio = -1;
        }
      }

      /* Contraste del texto contra su fondo real.
       *
       * Sube por los ancestros hasta encontrar un fondo opaco, que es lo que el
       * ojo ve. Se mide el estado en reposo; los estados activos se comprueban
       * aparte, porque no se pueden provocar todos a la vez. */
      const luz = (c) => {
        const [r, g, b] = c.map((v) => {
          const n = v / 255;
          return n <= 0.03928 ? n / 12.92 : ((n + 0.055) / 1.055) ** 2.4;
        });
        return 0.2126 * r + 0.7152 * g + 0.0722 * b;
      };
      /* `getComputedStyle` devuelve dos formatos según cómo se haya escrito el
       * color: `rgb(0-255)` y, cuando interviene `color-mix`, `color(srgb 0-1)`.
       * Leer el segundo como si fuera el primero convierte un gris claro en
       * negro y produce fallos de contraste que no existen. */
      const color = (s) => {
        const n = (s.match(/[\d.]+/g) || []).map(Number);
        if (n.length < 3) return null;
        const esc = s.startsWith('color(') ? 255 : 1;
        return [n[0] * esc, n[1] * esc, n[2] * esc, n[3] === undefined ? 1 : n[3]];
      };

      /* Fondo pintado bajo un nodo. Devuelve `null` cuando no se puede saber:
       * un degradado o una superficie translúcida sobre una imagen no se
       * resuelven a un color, y adivinarlo daría un veredicto inventado. */
      const fondoDe = (n) => {
        for (let e = n; e; e = e.parentElement) {
          const s = getComputedStyle(e);
          if (s.backgroundImage !== 'none') return null;
          const c = color(s.backgroundColor);
          if (c && c[3] > 0.85) return c;
        }
        return null;
      };

      // El texto se compone sobre su fondo antes de medir: un gris al 74 % no
      // es el mismo color que el gris pleno.
      const sobre = (t, f) => [0, 1, 2].map((i) => t[i] * t[3] + f[i] * (1 - t[3]));

      const razon = (a, b) => {
        const [x, y] = [luz(a), luz(b)].sort((m, n) => n - m);
        return (x + 0.05) / (y + 0.05);
      };

      /* ¿Hay una imagen pintada bajo este nodo? */
      const pintadas = [...document.querySelectorAll('img, canvas, video, svg')]
        .map((e) => ({ e, r: e.getBoundingClientRect() }))
        .filter((x) => x.r.width > 24 && x.r.height > 24);
      const sobreImagen = (n, r) => pintadas.some(({ e, r: q }) => !e.contains(n)
        && r.left >= q.left - 1 && r.right <= q.right + 1
        && r.top >= q.top - 1 && r.bottom <= q.bottom + 1);

      const contraste = [];
      for (const n of document.querySelectorAll('p, span, a, button, li, dd, dt, h1, h2, h3, summary, b')) {
        const propio = [...n.childNodes].some((k) => k.nodeType === 3 && k.textContent.trim());
        if (!propio) continue;
        const r = n.getBoundingClientRect();
        if (r.width < 4 || r.height < 4) continue;
        const est = getComputedStyle(n);
        if (est.visibility === 'hidden') continue;
        // La opacidad se acumula por la cadena: en la portada hay escenas que
        // entran con el capítulo y medir su color mientras están a cero
        // describiría un contraste que nadie llega a ver.
        let visible = 1;
        for (let e = n; e && visible >= 0.15; e = e.parentElement) {
          visible *= Number(getComputedStyle(e).opacity);
        }
        if (visible < 0.15) continue;
        const fondo = fondoDe(n);
        const tinta = color(est.color);
        if (!fondo || !tinta) continue;
        // Un rótulo sobre una fotografía no se mide contra el fondo de la caja:
        // lo que tiene detrás es la imagen, y eso no se resuelve a un color.
        if (sobreImagen(n, r)) continue;
        const px = parseFloat(est.fontSize);
        const grande = px >= 24 || (px >= 18.66 && Number(est.fontWeight) >= 700);
        const min = grande ? 3 : 4.5;
        const v = razon(sobre(tinta, fondo), fondo);
        if (v < min) {
          const hex = (c) => '#' + c.slice(0, 3)
            .map((x) => Math.round(x).toString(16).padStart(2, '0')).join('');
          contraste.push(`${n.tagName.toLowerCase()} "${(n.textContent || '').trim().slice(0, 24)}"`
            + ` ${v.toFixed(2)}:1 (mín ${min}) tinta ${hex(sobre(tinta, fondo))} sobre ${hex(fondo)}`);
        }
      }

      return {
        alto,
        overflow: d.scrollWidth - d.clientWidth,
        vacios,
        contraste: [...new Set(contraste)].slice(0, 12),
        imgs,
        rotas: imgs.filter((i) => i.nw === 0).map((i) => i.src),
        // Umbral 0.85: por debajo de eso la pérdida ya se ve en pantalla.
        sobreescala: imgs
          .filter((i) => i.nw > 0 && i.pintado > 0 && i.nw / i.pintado < 0.85)
          .map((i) => `${i.src} pintado ${i.pintado}px origen ${i.nw}px`
            + ` (${(i.nw / i.pintado).toFixed(2)}×)`),
        sinAlt: imgs.filter((i) => !i.alt && i.w > 48).map((i) => i.src),
      };
    });

    // Capturas por viewport: apertura, cuerpo y cierre.
    const pasos = Math.min(6, Math.max(2, Math.round(m.alto / vh)));
    for (let n = 0; n < pasos; n += 1) {
      const y = Math.round((m.alto - vh) * (n / Math.max(1, pasos - 1)));
      await page.evaluate((v) => window.scrollTo(0, v), y);
      await page.waitForTimeout(450);
      await page.screenshot({
        path: join(OUT, `${clave}-${tag}-${String(n).padStart(2, '0')}.png`),
        animations: 'disabled',
      });
    }

    informe.push({
      clave, tag, ruta,
      alto: m.alto, viewports: +(m.alto / vh).toFixed(1),
      overflow: m.overflow,
      vacios: m.vacios,
      contraste: m.contraste,
      imgs: m.imgs.length,
      rotas: [...new Set(m.rotas)],
      sobreescala: [...new Set(m.sobreescala)],
      sinAlt: [...new Set(m.sinAlt)],
      errores: [...new Set(errores)],
      fallos: [...new Set(fallos)],
    });
    await page.close();
    process.stdout.write(`${clave}/${tag} `);
  }
  await ctx.close();
}
await nav.close();
writeFileSync(join(OUT, 'informe.json'), JSON.stringify(informe, null, 2));

const problemas = informe.filter((r) => r.overflow > 0 || r.rotas.length
  || r.sobreescala.length || r.errores.length || r.fallos.length || r.vacios.length
  || r.contraste.length);
console.log(`\n${informe.length} vistas · ${problemas.length} con hallazgos`);
for (const r of problemas) {
  const hueco = r.vacios.length
    ? ` vacíos=${r.vacios.map((v) => `${v.vh}vh@${v.desde}`).join(',')}` : '';
  console.log(`  ${r.clave}/${r.tag} ovf=${r.overflow} rotas=${r.rotas.length}`
    + ` blandas=${r.sobreescala.length} contraste=${r.contraste.length}`
    + ` err=${r.errores.length} 4xx=${r.fallos.length}${hueco}`);
}
