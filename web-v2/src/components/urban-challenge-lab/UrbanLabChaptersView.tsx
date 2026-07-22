import { urbanChapters } from "@/content/cases/urban-challenge/urban-chapters";
import { urbanPages } from "@/content/cases/urban-challenge/urban-pages";
import { urbanDesignElements } from "@/content/cases/urban-challenge/urban-design-elements";

export default function UrbanLabChaptersView() {
  const acts = ["I", "II", "III", "IV"];

  return (
    <div className="w-full max-w-7xl mx-auto p-6 md:p-12 flex flex-col gap-12">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-light tracking-wide text-white">CHAPTERS (ACTS I–IV)</h2>
        <p className="text-mono text-xs text-white/50">Estructura narrativa en 16 capítulos derivados de las páginas 41-45.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {acts.map(actNum => {
          const actChapters = urbanChapters.filter(c => c.act === actNum);
          return (
            <div key={actNum} className="flex flex-col gap-6">
              <h3 className="text-mono text-sm tracking-widest text-amber-500 border-b border-white/10 pb-2">
                ACTO {actNum}
              </h3>
              
              <div className="flex flex-col gap-4">
                {actChapters.map(chapter => {
                  const pages = chapter.sourcePages.join(", ");
                  const elements = urbanDesignElements.filter(e => e.relatedChapterIds.includes(chapter.id));
                  
                  return (
                    <div key={chapter.id} className="p-4 bg-white/5 border border-white/10 hover:border-white/20 transition-colors flex flex-col gap-3 rounded-sm">
                      <div className="flex justify-between items-start">
                        <span className="text-mono text-xs text-white/40">{chapter.id}</span>
                        <span className="text-mono text-[10px] bg-white/10 px-2 py-0.5 rounded-sm">Pág: {pages}</span>
                      </div>
                      <h4 className="text-sm font-medium leading-snug">{chapter.title}</h4>
                      
                      {elements.length > 0 && (
                        <div className="flex flex-col gap-1 mt-2 pt-2 border-t border-white/5">
                          <span className="text-mono text-[9px] text-white/40 uppercase">Elementos:</span>
                          <div className="flex flex-wrap gap-1">
                            {elements.map(el => (
                              <span key={el.id} className="text-mono text-[9px] bg-amber-500/10 text-amber-500/80 px-1.5 py-0.5 rounded-sm">
                                {el.canonicalName}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
