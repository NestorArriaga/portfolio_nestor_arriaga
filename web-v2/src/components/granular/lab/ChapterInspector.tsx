import { granularChapters } from '@/content/cases/granular/granular-chapters';

export default function ChapterInspector() {
  return (
    <div className="w-full">
      <h2 className="text-display-sm text-white mb-8">INSPECTOR DE ARQUITECTURA (CAPÍTULOS)</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {granularChapters.map(chap => (
          <div key={chap.id} className="bg-white/5 border border-white/10 p-4 rounded-md flex flex-col gap-3">
            <div className="flex justify-between items-start">
              <div className="text-mono text-[10px] text-white/40 uppercase tracking-widest">{chap.group}</div>
              <div className="text-mono text-[10px] text-white/40">{chap.order}/16</div>
            </div>
            
            <h3 className="text-label text-white/90">{chap.title}</h3>
            
            <div className="text-body text-white/60 text-sm">{chap.purpose}</div>
            
            <div className="mt-auto pt-4 border-t border-white/10 flex justify-between items-center">
              <div className="flex gap-1">
                {chap.sourcePages.map(p => (
                  <span key={p} className="text-mono text-[9px] bg-white/10 px-1 py-0.5 rounded text-white/70">P.{p}</span>
                ))}
                {chap.sourcePages.length === 0 && (
                  <span className="text-mono text-[9px] bg-red-900/50 text-red-400 px-1 py-0.5 rounded">NO SOURCE</span>
                )}
              </div>
              
              <div className={`text-mono text-[9px] uppercase tracking-widest px-2 py-1 rounded ${
                chap.status === 'audited' ? 'bg-green-900/30 text-green-400' :
                chap.status === 'ambiguous' ? 'bg-yellow-900/30 text-yellow-400' :
                'bg-white/10 text-white/50'
              }`}>
                {chap.status}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
