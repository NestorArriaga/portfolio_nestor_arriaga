/**
 * Pruebas de la resolución de rutas y del origen seguro.
 *
 * El `?from=` viaja en la URL y decide a dónde vuelve `Atlas`: si aceptara
 * cualquier valor sería una redirección abierta, así que los casos de rechazo
 * importan tanto como los de aceptación.
 */
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';

// El módulo es TypeScript: se transpila con el propio compilador del proyecto
// —ya es dependencia— en vez de recortar los tipos con expresiones regulares,
// que se rompía en cuanto una firma cambiaba.
import ts from 'typescript';

const fuente = readFileSync('src/lib/rutas.ts', 'utf8');
const js = ts.transpileModule(fuente, {
  compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 },
}).outputText;

const mod = await import(`data:text/javascript,${encodeURIComponent(js)}`);

test('la raíz del atlas es la portada', () => {
  assert.equal(mod.ATLAS_HOME, '/');
});

test('el ancla de cada proyecto', () => {
  assert.equal(mod.anclaProyecto('01'), '#p01');
  assert.equal(mod.anclaProyecto('15'), '#p15');
});

test('P14 y P15 no viven bajo /caso/[slug]', () => {
  assert.equal(mod.projectHref('14', 'granular'), '/granular');
  assert.equal(mod.projectHref('15', 'urban-challenge'), '/caso/urban-challenge');
  assert.equal(mod.projectHref('05', 'geomorfologia-metztitlan'), '/caso/geomorfologia-metztitlan');
});

test('Atlas vuelve al proyecto exacto, nunca a una portada anterior', () => {
  assert.equal(mod.atlasHref('03'), '/#p03');
  assert.equal(mod.vistazoHref(), '/?vistazo=1');
});

test('abrir proyecto transporta su origen', () => {
  assert.equal(
    mod.abrirProyectoHref('03', 'zonas-optimas-limon-cafe'),
    '/caso/zonas-optimas-limon-cafe?from=%2F%23p03',
  );
});

test('orígenes válidos', () => {
  assert.equal(mod.origenSeguro('%2F%23p05'), '/#p05');
  assert.equal(mod.origenSeguro('/'), '/');
  assert.equal(mod.origenSeguro('/?vistazo=1'), '/?vistazo=1');
});

test('orígenes rechazados', () => {
  // Ausente o vacío.
  assert.equal(mod.origenSeguro(null), null);
  assert.equal(mod.origenSeguro(''), null);
  // Host externo, con y sin esquema.
  assert.equal(mod.origenSeguro('https://evil.com'), null);
  assert.equal(mod.origenSeguro('//evil.com'), null);
  assert.equal(mod.origenSeguro('%2F%2Fevil.com'), null);
  // Otra sección del sitio: `from` sólo sirve para volver al recorrido.
  assert.equal(mod.origenSeguro('/caso/otro'), null);
  assert.equal(mod.origenSeguro('/granular/agua'), null);
  // Codificación rota.
  assert.equal(mod.origenSeguro('%E0%A4%A'), null);
  // Esquemas peligrosos.
  assert.equal(mod.origenSeguro('javascript:alert(1)'), null);
});

test('el regreso usa el origen válido y si no el ancla', () => {
  assert.equal(mod.regresoAtlas('10', '%2F%23p10'), '/#p10');
  assert.equal(mod.regresoAtlas('10', 'https://evil.com'), '/#p10');
  assert.equal(mod.regresoAtlas('10', null), '/#p10');
});
