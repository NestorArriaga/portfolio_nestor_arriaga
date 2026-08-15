import {
  clusteringClasificados, clusteringGrupos, clusteringPorcentaje, comarcaMunicipios,
} from '@/content/granularClustering';
import styles from './GraficaTamanos.module.css';

/**
 * Tamaño de los tres grupos, dibujado.
 *
 * La página mostraba aquí un JPG de una gráfica de oficina —fondo blanco, borde
 * gris, tipografía ajena— pegada sobre la tinta. Es el mismo dato, así que no
 * hace falta una imagen: se compone con los valores documentados y queda dentro
 * del sistema, se escala sin perder nitidez y se imprime nativa en el PDF.
 *
 * El porcentaje se calcula desde el conteo; el ancho de cada regla es esa misma
 * proporción. Un número y su barra no pueden discrepar porque son el mismo dato.
 */
export function GraficaTamanos() {
  const mayor = Math.max(...clusteringGrupos.map((g) => g.municipios));

  return (
    <div className={styles.grafica}>
      <ol className={styles.grupos}>
        {clusteringGrupos.map((g) => {
          const pct = clusteringPorcentaje(g);
          return (
            <li key={g.clave} style={{ '--c': g.color, '--w': `${(g.municipios / mayor) * 100}%` } as React.CSSProperties}>
              <p className={`${styles.clave} mono`}>
                <i aria-hidden="true" />{g.clave}
              </p>
              <p className={styles.nombre}>{g.nombre}</p>
              <p className={styles.cifra}>
                <b>{g.municipios}</b>
                <span className="mono">{`${pct.toFixed(1)} %`}</span>
              </p>
              <span className={styles.regla} aria-hidden="true" />
            </li>
          );
        })}
      </ol>

      <p className={`${styles.total} mono`}>
        {`${clusteringClasificados} municipios clasificados de ${comarcaMunicipios}`}
        <span>{`${comarcaMunicipios - clusteringClasificados} sin asignación en el modelo original`}</span>
      </p>
    </div>
  );
}
