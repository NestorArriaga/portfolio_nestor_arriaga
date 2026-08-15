'use client';

import Link from 'next/link';
import { CSSProperties, useEffect, useState } from 'react';

import { Ayuda, useAyuda, useCerrarAlDesplazar, useGesto } from '@/components/experience-v5/ayudas';
import { origenSeguro, vistazoHref } from '@/lib/rutas';
import type { Imagen, Sistema as Caso } from './registro';
import styles from './sistema.module.css';

/**
 * Página interior de un sistema.
 *
 * Cuatro momentos y ni uno más: apertura, flujo, detalle y salida. No es un
 * micrositio por caso —eso convertiría cuatro capturas en cuatro portafolios
 * paralelos—, es la misma plantilla leyendo material distinto.
 *
 * El texto es corto a propósito. Lo que explica el sistema son las capturas y
 * sus anotaciones; un párrafo largo sobre una aplicación que no se puede tocar
 * sería una promesa, no una demostración.
 */

export function SistemaPagina({
  caso, vecinos,
}: {
  caso: Caso;
  vecinos: { anterior?: { codigo: string; nombre: string; href: string };
    siguiente?: { codigo: string; nombre: string; href: string } };
}) {
  /**
   * `Atlas` vuelve al ancla desde la que se abrió el caso; si se llegó por
   * enlace directo, al inicio del capítulo. Nunca a una portada anterior.
   */
  const [origen, setOrigen] = useState<string>('/#sistemas');
  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    setOrigen(origenSeguro(q.get('desde')) ?? '/#sistemas');
  }, []);

  // Una sola indicación de entrada. El verbo cambia con el gesto real del
  // dispositivo —puntero, tacto y ancho—, no el mensaje.
  const gesto = useGesto();
  const [listo, setListo] = useState(false);
  useEffect(() => { setListo(true); }, []);
  const leer = useAyuda('sistema-leer', listo, 1000);
  useCerrarAlDesplazar(leer.visible, leer.cerrar);

  // Cuántas capturas comparten la banda de flujo. Con una sola, la rejilla le
  // da el ancho editorial entero y el anuncio de `44vw` hacía que el navegador
  // descargara la variante de 800 px para una caja de 1339: la interfaz llegaba
  // a menos de la mitad de la densidad necesaria y el texto se leía blando.
  const pasos = caso.detalles.length + (caso.segundo?.imagen ? 1 : 0);

  return (
    <main className={styles.sistema} id="contenido" tabIndex={-1}>
      <nav className={styles.riel} aria-label="Navegación del sistema">
        <Link className={`${styles.volver} mono`} href="/#sistemas">← Sistemas</Link>
        <span className={styles.rielCentro}>
          <Link className="btn" data-v="borde" href={origen}>Atlas</Link>
          <Link className="btn" data-v="borde" href={vistazoHref()}
                aria-label="Vistazo · abrir índice de proyectos">Vistazo</Link>
        </span>
      </nav>

      {/* 1 · Apertura: nombre, capacidad, estado y captura dominante. */}
      <header className={styles.apertura}>
        <div className={styles.aperturaTexto}>
          <p className={`${styles.codigo} mono`}>{caso.codigo}</p>
          <h1 className={styles.titulo}>{caso.nombre}</h1>
          <p className={styles.capacidad}>{caso.capacidad}</p>
          <p className={`${styles.estado} mono`}>{caso.estado}</p>
          <ul className={`${styles.acciones} mono`}>
            {caso.acciones.map((a) => <li key={a}>{a}</li>)}
          </ul>

          <span className={styles.ranuraAyuda}>
            {leer.visible ? (
              <Ayuda id={leer.id}
                     texto={gesto === 'desplazar' ? 'Desplázate para leer el caso' : 'Desliza para leer el caso'} />
            ) : null}
          </span>
        </div>
        {caso.principal ? (
          <Lamina im={caso.principal} sizes="(max-width: 900px) 92vw, 58vw" prioridad />
        ) : null}
      </header>

      {/* 2 · Flujo: los estados conectados del sistema. */}
      {caso.detalles.length || caso.segundo?.imagen ? (
        <section className={styles.flujo} aria-label="Estados del sistema">
          <p className={`${styles.rotulo} mono`}>flujo</p>
          <ol className={styles.estados}>
            {caso.segundo?.imagen ? (
              <li>
                <Lamina im={caso.segundo.imagen} sizes={anchoEstado(pasos)} />
                {/* El estado y el crédito ya viven bajo la captura, como
                    etiqueta permanente; aquí sólo se nombra el paso. */}
                <p className={`${styles.estadoPie} mono`}>
                  <b>{caso.segundo.titulo}</b>
                </p>
              </li>
            ) : null}
            {caso.detalles.map((d, i) => (
              <li key={d.src}>
                <Lamina im={d} sizes={anchoEstado(pasos)} />
                {/* Sólo el número del paso: el pie de la captura ya dice qué
                    se ve, y el estado vive en la etiqueta permanente. */}
                <p className={`${styles.estadoPie} mono`}>
                  <b>{String(i + 1).padStart(2, '0')}</b>
                </p>
              </li>
            ))}
          </ol>
        </section>
      ) : null}

      {/* 3 · Detalle: una ventana a resolución nativa sobre la pieza principal. */}
      {caso.principal ? (
        <section className={styles.detalle} aria-label="Detalle a escala legible">
          <p className={`${styles.rotulo} mono`}>detalle</p>
          <div className={styles.ventana}
               style={{ backgroundImage: `url(${caso.principal.src})` } as CSSProperties}
               role="img" aria-label={`Detalle a resolución nativa: ${caso.principal.pie}`} />
          <p className={styles.lectura}>{caso.lectura}</p>
        </section>
      ) : null}

      {/* 4 · Salida: rol, alcance, créditos y regreso. */}
      <footer className={styles.salida}>
        <dl className={`${styles.ficha} mono`}>
          <div><dt>Rol</dt><dd>{caso.rol}</dd></div>
          <div><dt>Alcance</dt><dd>{caso.alcance}</dd></div>
          {caso.principal?.credito ? (
            <div><dt>Créditos</dt><dd>{caso.principal.credito}</dd></div>
          ) : null}
        </dl>

        <nav className={styles.saltos} aria-label="Otros sistemas">
          {vecinos.anterior ? (
            <Link className={styles.salto} href={vecinos.anterior.href}>
              <span className={`${styles.saltoDir} mono`}>anterior</span>
              <span className={`${styles.saltoNum} mono`}>{vecinos.anterior.codigo}</span>
              <span className={styles.saltoNombre}>{vecinos.anterior.nombre}</span>
            </Link>
          ) : <span />}
          {vecinos.siguiente ? (
            <Link className={styles.salto} href={vecinos.siguiente.href} data-dir="adelante">
              <span className={`${styles.saltoDir} mono`}>siguiente</span>
              <span className={`${styles.saltoNum} mono`}>{vecinos.siguiente.codigo}</span>
              <span className={styles.saltoNombre}>{vecinos.siguiente.nombre}</span>
            </Link>
          ) : <span />}
        </nav>
      </footer>
    </main>
  );
}

/** Ancho servido de una captura de la banda de flujo, según cuántas comparten fila. */
function anchoEstado(pasos: number): string {
  return pasos > 1 ? '(max-width: 900px) 92vw, 45vw' : '(max-width: 900px) 92vw, 92vw';
}

/** Captura con su pie y su techo de resolución. */
function Lamina({ im, sizes, prioridad }: { im: Imagen; sizes: string; prioridad?: boolean }) {
  return (
    <figure className={styles.lamina}
            style={{ '--nativo': String(im.nativo), '--ratio': String(im.ratio) } as CSSProperties}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={im.src} srcSet={im.srcSet} sizes={sizes}
           width={im.width} height={im.height} alt={im.pie}
           loading={prioridad ? 'eager' : 'lazy'}
           decoding={prioridad ? 'sync' : 'async'}
           fetchPriority={prioridad ? 'high' : undefined} />
      {/* Etiquetas permanentes: la ayuda desaparece, esto no. Dicen qué se ve,
          en qué estado está y de dónde viene lo que la captura muestra. */}
      <figcaption className="mono">
        {im.pie}
        <span className={styles.laminaMeta}>
          <b>{im.estado}</b>
          {im.credito ? <span>{im.credito}</span> : null}
        </span>
      </figcaption>
    </figure>
  );
}
