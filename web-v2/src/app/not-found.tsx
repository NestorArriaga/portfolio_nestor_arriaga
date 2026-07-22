import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-8 bg-[#050505] text-[#F2F1EC] text-center">
      <div className="max-w-md p-8 border border-gray-800 bg-black rounded-lg">
        <h2 className="text-3xl font-bold mb-4 text-[#00A6C7]">404</h2>
        <p className="mb-8 text-gray-400">
          La ruta que buscas no existe en el Portafolio V2.
        </p>
        <Link
          href="/"
          className="inline-block px-6 py-2 border border-gray-700 text-white rounded hover:bg-gray-800 transition-colors"
        >
          Volver al Inicio
        </Link>
      </div>
    </main>
  );
}
