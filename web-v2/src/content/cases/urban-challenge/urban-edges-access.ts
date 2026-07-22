export const urbanEdgesAccess = {
  chapterId: "05",
  title: "BORDES Y ACCESOS POTENCIALES",
  shortTitle: "BORDES Y ACCESOS",
  sourcePages: [42],
  
  chapterIntroduction: {
    statement: "El análisis volumétrico permitió identificar relaciones de borde, accesos potenciales y condicionantes espaciales.",
    note: "No se presenta un inventario de accesos, ni se documentan barreras o flujos peatonales."
  },
  
  edgeConditions: {
    builtEdge: {
      title: "BORDE CONSTRUIDO",
      description: "Relación con los volúmenes circundantes."
    },
    voidEdge: {
      title: "BORDE DEL VACÍO",
      description: "Límite morfológico del parque dentro del tejido."
    },
    potentialAccess: {
      title: "ACCESO POTENCIAL",
      description: "Posibilidad mencionada por la fuente, sin inventario espacial explícito."
    },
    constraint: {
      title: "CONDICIONANTE",
      description: "Elemento del contexto que influye en la lectura del sitio."
    }
  },

  socialDynamicsTreatment: {
    statement: "La fuente plantea que la forma urbana influye tanto en procesos ambientales como en la manera potencial de ocupar el espacio.",
    note: "La página no documenta observación de usuarios, encuestas, aforos o análisis de comportamiento."
  },
  
  evidenceStatus: {
    assetId: "project-15-edges-access-context-preview",
    text: "La lectura se basa en el modelo volumétrico y el texto, los accesos permanecen como potenciales sin mapa independiente."
  },
  
  limitations: [
    "No se localizan accesos individualmente ni se muestra jerarquía.",
    "No se muestran calles, dimensiones, barreras ni flujos peatonales.",
    "No se documentan dinámicas sociales observadas."
  ],
  
  figureIds: ["project-15-edges-access-context-preview"],
  claimIds: [],
  warningIds: ["potential-accesses-not-spatially-documented"],
  
  nextChapterTransition: "06",
  chapterStatus: "public"
};
