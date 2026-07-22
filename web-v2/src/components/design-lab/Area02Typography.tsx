export default function Area02Typography() {
  return (
    <section className="mb-24">
      <h2 className="text-2xl font-bold mb-8 border-b border-gray-800 pb-2">ÁREA 02 — PRUEBA TIPOGRÁFICA</h2>
      
      <div className="flex flex-col gap-12 bg-[var(--color-graphite)] p-8 rounded-[var(--radius-panel)] border border-[var(--color-line)]">
        
        <div>
          <div className="text-label mb-2 text-[var(--color-accent)]">Display Monumental</div>
          <h1 className="text-display-xl">Néstor Elihu<br/>Arriaga Gallegos</h1>
        </div>

        <div className="grid md:grid-cols-2 gap-8 border-t border-[var(--color-line)] pt-8">
          <div>
            <div className="text-label mb-2 text-[var(--color-accent)]">Título Territorial</div>
            <h2 className="text-display-lg">Comarca<br/>Lagunera</h2>
          </div>
          <div>
            <div className="text-label mb-2 text-[var(--color-accent)]">Título de Proyecto</div>
            <h3 className="text-heading mb-4">Tipologías rurales situadas</h3>
            <p className="text-subheading">Cartografía y análisis territorial multiescalar</p>
          </div>
        </div>

        <div className="border-t border-[var(--color-line)] pt-8 max-w-2xl">
          <div className="text-label mb-2 text-[var(--color-accent)]">Cuerpo y Profesión</div>
          <p className="text-body-lg mb-4">Ingeniero en Recursos Naturales Renovables</p>
          <p className="text-body text-[var(--color-text-muted)]">
            Atlas interactivo de territorios, sistemas y proyectos. Este texto de prueba permite comprobar 
            el comportamiento de grandes bloques, contrastes y jerarquías sin utilizar texto falso.
          </p>
        </div>

        <div className="flex flex-wrap gap-8 border-t border-[var(--color-line)] pt-8">
          <div>
            <div className="text-label mb-2 text-[var(--color-accent)]">Numeración</div>
            <div className="text-mono text-xl">01 / 15</div>
          </div>
          <div>
            <div className="text-label mb-2 text-[var(--color-accent)]">Coordenadas</div>
            <div className="text-mono text-[var(--color-text-muted)]">23°37&apos;59&quot; N — 103°31&apos;00&quot; W</div>
          </div>
          <div>
            <div className="text-label mb-2 text-[var(--color-accent)]">Pie de figura</div>
            <div className="text-caption">Elaboración propia con datos de CONAGUA 2023.</div>
          </div>
        </div>

      </div>
    </section>
  );
}
