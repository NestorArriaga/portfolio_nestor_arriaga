import { urbanFoundation } from "@/content/cases/urban-challenge/urban-foundation";

export default function UrbanProposalStatus() {
  return (
    <div className="w-full bg-[var(--urban-bg-surface)] border border-[var(--urban-border)] p-6 rounded-sm flex flex-col md:flex-row gap-8 justify-between">
      
      <div className="flex flex-col gap-4 w-full md:w-1/3 border-b md:border-b-0 md:border-r border-[var(--urban-border)] pb-6 md:pb-0 md:pr-8">
        <div className="flex flex-col gap-1">
          <span className="text-mono text-[10px] text-white/40 uppercase tracking-widest">Tipo</span>
          <span className="text-sm text-white font-medium">{urbanFoundation.proposalStatus.type}</span>
        </div>
      </div>

      <div className="flex flex-col gap-4 w-full md:w-1/3 border-b md:border-b-0 md:border-r border-[var(--urban-border)] pb-6 md:pb-0 md:pr-8">
        <div className="flex flex-col gap-1">
          <span className="text-mono text-[10px] text-[var(--urban-accent)] uppercase tracking-widest">Estado Construido</span>
          <span className="text-sm text-[var(--urban-accent)] font-medium">{urbanFoundation.proposalStatus.builtStatus}</span>
        </div>
      </div>

      <div className="flex flex-col gap-4 w-full md:w-1/3">
        <div className="flex flex-col gap-1">
          <span className="text-mono text-[10px] text-white/40 uppercase tracking-widest">Páginas Fuente</span>
          <span className="text-sm text-white font-medium">Portafolio, p. {urbanFoundation.proposalStatus.pages}</span>
        </div>
      </div>

    </div>
  );
}
