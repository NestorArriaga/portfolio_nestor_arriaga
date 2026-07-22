export default function UrbanProgress({ currentChapter, page }: { currentChapter: string, page: number }) {
  const chapterNumber = parseInt(currentChapter, 10) + 1; // 00 -> 1
  return (
    <div className="flex items-center gap-4 text-mono text-[9px] md:text-[10px] text-[var(--urban-accent)] tracking-widest uppercase mb-6">
      <span>{String(chapterNumber).padStart(2, '0')} / 16</span>
      <span className="w-1 h-1 rounded-full bg-white/20" />
      <span>CAPÍTULO {currentChapter}</span>
      <span className="w-1 h-1 rounded-full bg-white/20" />
      <span>PÁGINA {page}</span>
    </div>
  );
}
