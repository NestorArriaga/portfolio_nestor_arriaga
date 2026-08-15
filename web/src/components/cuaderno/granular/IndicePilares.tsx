import Link from 'next/link';

import { pillars } from '@/content/granular';
import styles from './IndicePilares.module.css';

/**
 * Índice de los siete pilares.
 *
 * La entrada resolvía esto con siete pastillas en una columna de 400 px, así
 * que la mitad inferior de la pantalla quedaba en negro sin función y el índice
 * —que es el instrumento de navegación del proyecto— parecía una lista de
 * ajustes. Aquí ocupa el ancho editorial y cada entrada trae lo que hace falta
 * para elegir: número romano, nombre, subtítulo, variables y páginas de origen.
 *
 * Sigue siendo una lista de enlaces: se recorre con el tabulador en su orden y
 * no depende de ningún gesto de puntero.
 */
function rangoPaginas(paginas: number[]): string {
  const primera = Math.min(...paginas);
  const ultima = Math.max(...paginas);
  return primera === ultima ? `p. ${primera}` : `pp. ${primera}–${ultima}`;
}

export function IndicePilares() {
  return (
    <nav className={styles.indice} aria-label="Pilares de GRANULAR">
      <ol>
        {pillars.map((p) => (
          <li key={p.id} style={{ '--acento': p.accentVar } as React.CSSProperties}>
            <Link href={`/granular/${p.id}`} data-touch>
              <span className={`${styles.num} mono`}>{p.number}</span>
              <span className={styles.nombre}>{p.title}</span>
              <span className={styles.subtitulo}>{p.subtitle}</span>
              <span className={`${styles.variables} mono`} aria-hidden="true">
                {p.variables.join(' · ')}
              </span>
              {/* Un pilar que empieza y acaba en la misma página es una página,
                  no un rango: `pp. 35–35` es un error de lectura, no un dato. */}
              <span className={`${styles.paginas} mono`}>{rangoPaginas(p.pages)}</span>
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
}
