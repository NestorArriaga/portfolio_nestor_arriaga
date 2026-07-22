"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Evita revelar stack traces visuales en producción; el log se manda a consola.
    console.error("Fallo capturado por el Error Boundary:", error);
  }, [error]);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-8 bg-[#050505] text-[#F2F1EC] text-center">
      <div className="max-w-md p-8 border border-red-900/50 bg-black rounded-lg">
        <h2 className="text-2xl font-bold mb-4 text-red-500">Error en el Sistema</h2>
        <p className="mb-8 text-gray-400">
          Ocurrió un problema inesperado. No te preocupes, el entorno está protegido.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => reset()}
            className="px-6 py-2 bg-white text-black font-semibold rounded hover:bg-gray-200 transition-colors"
          >
            Reintentar
          </button>
          <Link
            href="/"
            className="px-6 py-2 border border-gray-700 text-white rounded hover:bg-gray-800 transition-colors"
          >
            Ir al inicio
          </Link>
        </div>
      </div>
    </main>
  );
}
