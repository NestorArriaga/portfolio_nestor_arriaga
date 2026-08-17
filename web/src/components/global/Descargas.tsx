'use client';

import { useCallback, useEffect, useId, useRef, useState } from 'react';

import styles from './Descargas.module.css';

/** Un documento medido sobre el disco en tiempo de compilación. */
export type Documento = {
  href: string;
  mb: string;
  kb: number;
  paginas: number;
  titulo: string;
  idioma: string;
  lang: string;
};

export type Catalogo = {
  portafolio: (Documento & { nota: string }) | null;
  cv: (Documento & { accion: string })[];
};

/**
 * Centro de descargas.
 *
 * Un solo componente para los tres documentos. Antes el portafolio se enlazaba
 * suelto desde la portada y otra vez desde contacto, y los currículos no
 * existían en el sitio; añadir dos enlaces más a cada sitio habría dejado
 * cuatro botones compitiendo en la misma fila. Aquí la portada y el contacto
 * abren la misma pieza y la lógica vive una sola vez.
 *
 * En escritorio es un panel anclado al control que lo abre. En pantalla
 * estrecha es una hoja inferior: el pulgar llega, y el panel no tiene que
 * caber junto a un botón que está en el borde.
 *
 * Ningún archivo se precarga. El portafolio pesa veinte megas y no debe
 * descargarse por abrir la portada: sólo se enlaza, con `download` para que el
 * nombre del archivo guardado sea estable.
 */
export function Descargas({
  catalogo, etiqueta = 'Descargas', variante = 'borde', className,
}: {
  catalogo: Catalogo;
  etiqueta?: string;
  variante?: 'borde' | 'senal';
  className?: string;
}) {
  const [abierto, setAbierto] = useState(false);
  const id = useId();
  const disparador = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);

  const cerrar = useCallback(() => {
    setAbierto(false);
    disparador.current?.focus();
  }, []);

  useEffect(() => {
    if (!abierto) return;

    // El foco entra en el panel; el control que lo abrió lo recupera al salir.
    panel.current?.focus({ preventScroll: true });

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { e.preventDefault(); cerrar(); return; }
      if (e.key !== 'Tab' || !panel.current) return;

      // Ciclo de tabulación dentro del panel: mientras está abierto, nada de
      // fuera puede recibir el foco sin cerrarlo antes.
      const foco = panel.current.querySelectorAll<HTMLElement>('a[href], button');
      if (!foco.length) return;
      const a = foco[0];
      const z = foco[foco.length - 1];
      if (e.shiftKey && document.activeElement === a) { e.preventDefault(); z.focus(); }
      else if (!e.shiftKey && document.activeElement === z) { e.preventDefault(); a.focus(); }
    };

    const fuera = (e: PointerEvent) => {
      const n = e.target as Node;
      if (panel.current?.contains(n) || disparador.current?.contains(n)) return;
      setAbierto(false);
    };

    window.addEventListener('keydown', onKey);
    window.addEventListener('pointerdown', fuera);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('pointerdown', fuera);
    };
  }, [abierto, cerrar]);

  const { portafolio, cv } = catalogo;
  if (!portafolio && !cv.length) return null;

  return (
    <div className={`${styles.envoltura}${className ? ` ${className}` : ''}`}>
      <button
        ref={disparador}
        type="button"
        className="btn"
        data-v={variante}
        data-touch
        aria-expanded={abierto}
        aria-controls={abierto ? id : undefined}
        onClick={() => setAbierto((v) => !v)}
      >
        {etiqueta}
      </button>

      {abierto ? (
        <>
          {/* Sólo en pantalla estrecha: la hoja inferior necesita un fondo que
              la separe del recorrido y absorba el toque de cierre. */}
          <div className={styles.velo} onPointerDown={() => setAbierto(false)} aria-hidden="true" />

          <div
            ref={panel}
            id={id}
            className={styles.panel}
            role="dialog"
            aria-modal="false"
            aria-labelledby={`${id}-t`}
            tabIndex={-1}
          >
            <div className={styles.cabecera}>
              <h2 id={`${id}-t`} className={`${styles.titulo} mono`}>Descargas</h2>
              <button type="button" className={`${styles.cerrar} mono`} data-touch onClick={cerrar}>
                Cerrar
              </button>
            </div>

            {portafolio ? (
              <section className={styles.pieza} data-principal="">
                <p className={styles.piezaNombre}>{portafolio.titulo}</p>
                <p className={styles.piezaNota}>{portafolio.nota}</p>
                <p className={`${styles.ficha} mono`}>
                  <span>{portafolio.idioma}</span>
                  <span>PDF</span>
                  <span>{`${portafolio.paginas} páginas`}</span>
                  <span>{`${portafolio.mb} MB`}</span>
                </p>
                <a
                  className={`${styles.accion} btn`}
                  data-v="senal"
                  data-touch
                  href={portafolio.href}
                  download
                  hrefLang={portafolio.lang}
                  lang={portafolio.lang}
                  type="application/pdf"
                >
                  Descargar portafolio
                </a>
              </section>
            ) : null}

            {cv.length ? (
              <section className={styles.pieza}>
                <p className={styles.piezaNombre}>Curriculum vitae</p>
                {/* La selección de idioma es del currículum, no del sitio: el
                    portafolio sólo existe en español y fingir lo contrario
                    sería prometer un documento que no está hecho. */}
                <p className={styles.piezaNota}>Dos versiones del mismo documento.</p>

                <ul className={styles.lista}>
                  {cv.map((d) => (
                    <li key={d.lang}>
                      <a
                        className={`${styles.fila} mono`}
                        data-touch
                        href={d.href}
                        download
                        hrefLang={d.lang}
                        lang={d.lang}
                        type="application/pdf"
                      >
                        <span className={styles.filaIdioma}>{d.idioma}</span>
                        <span className={styles.filaFicha}>
                          {`PDF · ${d.paginas} páginas · ${d.kb} KB`}
                        </span>
                        <span className={styles.filaAccion}>{d.accion}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}
          </div>
        </>
      ) : null}
    </div>
  );
}
