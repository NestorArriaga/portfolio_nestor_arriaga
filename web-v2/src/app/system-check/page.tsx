import Link from "next/link";

export default function SystemCheckPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-8 bg-[#050505] text-[#F2F1EC]">
      <div className="w-full max-w-xl border border-gray-800 p-8 rounded-lg bg-black">
        <h1 className="text-3xl font-bold mb-8 text-[#00A6C7]">SYSTEM CHECK</h1>
        
        <ul className="space-y-4 mb-12 font-mono text-sm">
          <li className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-green-500"></span>
            App Router: correcto
          </li>
          <li className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-green-500"></span>
            TypeScript: correcto
          </li>
          <li className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-green-500"></span>
            Estilos: correctos
          </li>
          <li className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-green-500"></span>
            Navegación interna: correcta
          </li>
          <li className="flex items-center gap-3 opacity-70">
            <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
            Render en producción: pendiente de validación
          </li>
        </ul>

        <Link
          href="/"
          className="inline-block px-6 py-3 border border-[#00A6C7] text-[#00A6C7] font-semibold rounded hover:bg-[#00A6C7] hover:text-[#050505] transition-colors"
        >
          Volver al Inicio
        </Link>
      </div>
    </main>
  );
}
