/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  reactStrictMode: true,

  /**
   * Defensa de la ruta vieja.
   *
   * `/caso/granular` nunca existió como página —P14 vive en `/granular/[pilar]`—
   * pero se enlazaba desde PARK CHALLENGE y devolvía 404. Los enlaces ya salen
   * todos de `projectHref`, así que esta redirección no la usa nadie del sitio;
   * está para que la dirección antigua, si alguien la guardó, aterrice donde
   * debe en vez de en un error.
   */
  async redirects() {
    return [
      { source: '/caso/granular', destination: '/granular/agua', permanent: false },
      { source: '/caso/granular/:pilar', destination: '/granular/:pilar', permanent: false },

      /* La experiencia se construyó en rutas de laboratorio y ahora vive en la
         portada. Las direcciones antiguas son permanentes: no hay una versión
         alternativa detrás de ellas, es la misma que está en `/`. */
      { source: '/laboratorio-v5', destination: '/', permanent: true },
      { source: '/laboratorio-v4', destination: '/', permanent: true },
      { source: '/laboratorio-v3', destination: '/', permanent: true },
      { source: '/recorrido-v2', destination: '/', permanent: true },
      { source: '/lab', destination: '/', permanent: true },

      /* S01 cambió de nombre público. La dirección anterior sólo sobrevive aquí,
         como regla de compatibilidad para enlaces guardados: no está enlazada en
         la interfaz, ni en el índice, ni en el PDF, ni en los canónicos. */
      { source: '/sistema/agrosphere', destination: '/sistema/datos-aereos-agricolas', permanent: true },
    ];
  },
};

export default nextConfig;
