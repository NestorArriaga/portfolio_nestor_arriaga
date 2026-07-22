export default function Area06Comparison() {
  const comparisons = [
    {
      name: "A — Atlas Editorial",
      idea: "Dominada por tipografía, márgenes masivos y cartografía técnica recortada.",
      resource: "Mapas panorámicos, relieves territoriales, texturas en blend-mode.",
      pros: "Extremadamente elegante, identidad fuerte de 'estudio de arquitectura/cartografía'. Alto impacto con textos gigantes.",
      cons: "Difícil de adaptar si el proyecto no tiene un buen mapa panorámico o si el título es demasiado largo.",
      mobile: "La imagen pasa a ser fondo superior (cover), la tipografía se reduce pero mantiene sangrías fuertes."
    },
    {
      name: "B — Galería Cinematográfica",
      idea: "La fotografía o render es la reina absoluta. UI mínima y marco negro.",
      resource: "Fotografías de campo (Veracruz, Calvillo), renders (Urban Challenge).",
      pros: "Silenciosa, sofisticada, cede todo el protagonismo al material visual real.",
      cons: "Requiere material fotográfico excelente. Los mapas muy técnicos pueden verse extraños encuadrados como arte fotográfico.",
      mobile: "La imagen ocupa el 60% superior de la pantalla, los títulos bajan a un bloque inferior estándar."
    },
    {
      name: "C — Instrumento Territorial",
      idea: "Interfaz modular cruzada por líneas, estructurando la información como en un SIG o dashboard avanzado.",
      resource: "Todo tipo de mapas, legendas cartográficas, miniaturas.",
      pros: "Comunica inmediatamente un perfil analítico, técnico y de ingeniería de datos espaciales.",
      cons: "Puede llegar a parecerse a un template SaaS si los bordes y tipografías no se cuidan con extremo detalle.",
      mobile: "Los módulos colapsan en una sola columna con líneas divisorias 1px entre cada bloque de información."
    }
  ];

  return (
    <section className="mb-24">
      <h2 className="text-2xl font-bold mb-8 border-b border-gray-800 pb-2">ÁREA 06 — COMPARACIÓN DE PORTADAS</h2>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[var(--color-line-strong)] text-label text-[var(--color-text-faint)]">
              <th className="py-4 px-6 font-normal w-1/5">PROPUESTA</th>
              <th className="py-4 px-6 font-normal">IDEA PRINCIPAL</th>
              <th className="py-4 px-6 font-normal">RECURSO IDEAL</th>
              <th className="py-4 px-6 font-normal">VENTAJAS</th>
              <th className="py-4 px-6 font-normal">RIESGOS</th>
              <th className="py-4 px-6 font-normal">EN MÓVIL</th>
            </tr>
          </thead>
          <tbody className="text-body text-gray-300">
            {comparisons.map((c, i) => (
              <tr key={i} className="border-b border-[var(--color-line)] hover:bg-[var(--color-graphite-light)] transition-colors">
                <td className="py-6 px-6 font-bold text-[var(--color-white)] align-top">{c.name}</td>
                <td className="py-6 px-6 align-top">{c.idea}</td>
                <td className="py-6 px-6 align-top text-[var(--color-accent)]">{c.resource}</td>
                <td className="py-6 px-6 align-top text-green-400">{c.pros}</td>
                <td className="py-6 px-6 align-top text-red-400">{c.cons}</td>
                <td className="py-6 px-6 align-top">{c.mobile}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
