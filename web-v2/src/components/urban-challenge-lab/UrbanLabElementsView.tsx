import { urbanDesignElements } from "@/content/cases/urban-challenge/urban-design-elements";

export default function UrbanLabElementsView() {
  return (
    <div className="w-full max-w-7xl mx-auto p-6 md:p-12 flex flex-col gap-12">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-light tracking-wide text-white">DESIGN ELEMENTS SYSTEM</h2>
        <p className="text-mono text-xs text-white/50">Componentes estructurales, urbanos y lúdicos propuestos, y sus intenciones.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {urbanDesignElements.map(el => (
          <div key={el.id} className="flex flex-col border border-white/10 bg-white/5 rounded-sm p-6 gap-6">
            <div className="flex flex-col gap-1">
              <span className="text-mono text-xs text-amber-500 tracking-widest uppercase">{el.id}</span>
              <h3 className="text-2xl font-light">{el.canonicalName}</h3>
              <p className="text-mono text-[10px] text-white/50">{el.function}</p>
            </div>

            <div className="flex flex-col gap-4 text-mono text-xs">
              <div className="flex flex-col gap-2">
                <span className="uppercase text-white/40 border-b border-white/10 pb-1">Nombres Fuente</span>
                <div className="flex flex-wrap gap-2">
                  {el.sourceNames.map(name => (
                    <span key={name} className="bg-white/10 px-2 py-0.5 rounded-sm">{name}</span>
                  ))}
                </div>
              </div>

              {el.environmentalIntentions.length > 0 && (
                <div className="flex flex-col gap-2">
                  <span className="uppercase text-white/40 border-b border-white/10 pb-1">Intenciones Ambientales</span>
                  <ul className="list-disc list-inside text-white/70">
                    {el.environmentalIntentions.map(int => <li key={int}>{int}</li>)}
                  </ul>
                </div>
              )}

              {el.socialIntentions.length > 0 && (
                <div className="flex flex-col gap-2">
                  <span className="uppercase text-white/40 border-b border-white/10 pb-1">Intenciones Sociales</span>
                  <ul className="list-disc list-inside text-white/70">
                    {el.socialIntentions.map(int => <li key={int}>{int}</li>)}
                  </ul>
                </div>
              )}

              {el.distincitons.length > 0 && (
                <div className="flex flex-col gap-2">
                  <span className="uppercase text-amber-500/70 border-b border-amber-500/20 pb-1">Distinciones / Aclaraciones</span>
                  <ul className="list-disc list-inside text-amber-500/90">
                    {el.distincitons.map(dist => <li key={dist}>{dist}</li>)}
                  </ul>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
