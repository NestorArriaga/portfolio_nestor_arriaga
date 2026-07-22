import Area01Tokens from "@/components/design-lab/Area01Tokens";
import Area02Typography from "@/components/design-lab/Area02Typography";
import Area03Images from "@/components/design-lab/Area03Images";
import Area04Components from "@/components/design-lab/Area04Components";
import Area05Covers from "@/components/design-lab/Area05Covers";
import Area06Comparison from "@/components/design-lab/Area06Comparison";
import "@/styles/tokens.css";

export default function DesignLabPage() {
  return (
    <main className="min-h-screen design-lab-container p-6 md:p-12 lg:p-24 selection:bg-[var(--color-accent)] selection:text-black">
      <header className="mb-24 border-b border-[var(--color-line-strong)] pb-12">
        <div className="text-label text-[var(--color-accent)] mb-4">ENTORNO AISLADO</div>
        <h1 className="text-display-lg mb-6">Laboratorio de Diseño</h1>
        <p className="text-body-lg text-[var(--color-text-muted)] max-w-2xl">
          Pruebas estáticas del sistema visual, componentes tipográficos y estudios 
          de portadas arquitectónicas a partir de los recursos extraídos del PDF original.
        </p>
      </header>

      <Area01Tokens />
      <Area02Typography />
      <Area03Images />
      <Area04Components />
      <Area05Covers />
      <Area06Comparison />

    </main>
  );
}
