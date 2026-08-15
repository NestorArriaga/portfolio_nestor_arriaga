import { granularVisuals } from '@/content/granularVisuals';
import { comarcaMunicipios } from '@/content/granularClustering';
import styles from './Granular.module.css';
import propio from './Caracterizacion.module.css';

/**
 * Caracterización de la Comarca — pieza de orientación de GRANULAR.
 *
 * Es lo primero que hay que entender del proyecto: dónde está, cuántos
 * municipios lo componen y con qué peso demográfico. Va montada como lámina y
 * acompañada de las tres cifras que la propia composición imprime, no de un
 * párrafo. Los quince nombres se listan porque son el índice del territorio;
 * todo lo demás vive en el alcance.
 */

/**
 * Los quince municipios, leídos de los quince recuadros de la propia lámina.
 *
 * La lista anterior nombraba `Rodeo`, que la caracterización no rotula, y se
 * dejaba fuera `Santa Clara`, que sí aparece. `General Simón Bolívar` va con su
 * nombre completo, como lo imprime la composición.
 */
const MUNICIPIOS = [
  'Cuencamé', 'Francisco I. Madero', 'General Simón Bolívar', 'Gómez Palacio',
  'Lerdo', 'Mapimí', 'Matamoros', 'Nazas', 'San Juan de Guadalupe',
  'San Luis del Cordero', 'San Pedro', 'Santa Clara', 'Tlahualilo', 'Torreón',
  'Viesca',
];

/** Cifras impresas por la composición, con su separador de millares. */
const CIFRAS = [
  { etiqueta: 'Población', valor: '1,628,629' },
  { etiqueta: 'Distribución', valor: '49.2 / 50.8 %' },
  { etiqueta: 'Extensión', valor: `${comarcaMunicipios} municipios` },
];

export function CaracterizacionComarca() {
  const visual = granularVisuals.caracterizacion;

  return (
    <section className={`${styles.ambito} ${propio.caracterizacion}`}
             aria-label={visual.title}>
      <figure className={propio.lamina}>
        <div className={styles.montaje}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={visual.asset.src} srcSet={visual.asset.srcSet} alt={visual.alt}
               width={Math.round(visual.asset.width)} height={Math.round(visual.asset.height)}
               sizes="(max-width: 900px) 92vw, 54vw"
               loading="eager" decoding="async" fetchPriority="high" />
        </div>
        <figcaption className={`${propio.procedencia} mono`}>{visual.source}</figcaption>
      </figure>

      <div className={propio.lectura}>
        <h2 className={propio.titulo}>{visual.title}</h2>

        <dl className={propio.cifras}>
          {CIFRAS.map((c) => (
            <div key={c.etiqueta}>
              <dt className="mono">{c.etiqueta}</dt>
              <dd>{c.valor}</dd>
            </div>
          ))}
        </dl>

        <div className={propio.indiceTerritorio}>
          <p className={`${propio.indiceRotulo} mono`}>Municipios</p>
          <ol className={`${propio.municipios} mono`}>
            {MUNICIPIOS.map((m, i) => (
              <li key={m}>
                <span className={propio.municipioNum}>{String(i + 1).padStart(2, '0')}</span>
                {m}
              </li>
            ))}
          </ol>
        </div>

        <p className={`${styles.alcance} mono`}>
          <b>Alcance. </b>{visual.limitations}
        </p>
      </div>
    </section>
  );
}
