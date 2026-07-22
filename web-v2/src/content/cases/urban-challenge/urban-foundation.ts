import { urbanProject } from "./urban-project";
import { urbanChapters } from "./urban-chapters";
import { urbanAssets } from "./urban-assets";
import { urbanClaims } from "./urban-claims";
import { urbanWarnings } from "./urban-warnings";

export const urbanFoundation = {
  project: urbanProject,
  chapters: urbanChapters,
  
  hero: {
    assetId: "project-15-site-master-plan-work",
    fallbackAssetId: "project-15-central-ring-axonometric-work",
    caption: "Visualización de la propuesta de regeneración urbana para un parque hundido en Mérida.",
    titleLayers: {
      number: "15",
      main: "URBAN CHALLENGE",
      territory: "MÉRIDA",
      words: ["VACÍO", "CUENCA", "CLIMA", "ESTRUCTURA", "COMUNIDAD"]
    }
  },
  
  proposalStatus: {
    type: "Propuesta universitaria para concurso",
    builtStatus: "No documentado en las páginas fuente",
    scope: "Diseño urbano, paisaje e infraestructura ambiental",
    pages: "41–45"
  },
  
  competitionContext: {
    title: "Nodos de Innovación para la Resiliencia Urbana",
    entities: ["SEDATU", "Gobierno de Yucatán", "GIZ"],
    note: "El portafolio identifica el concurso y la propuesta, pero no registra el resultado de la participación."
  },
  
  siteReading: {
    parkType: "Parque hundido — antigua sascabera",
    urbanCondition: "vacío estructural dentro de una trama compacta"
  },

  vulnerabilities: [
    {
      id: "hidrica",
      title: "HÍDRICA",
      description: "La fuente relaciona la condición hundida con susceptibilidad a inundaciones y comportamiento hídrico.",
      limitation: "La página no muestra modelación hidráulica, registros de inundación ni periodo de retorno."
    },
    {
      id: "termica",
      title: "TÉRMICA",
      description: "La fuente menciona acumulación de calor y riesgos térmicos.",
      limitation: "Las páginas no muestran valores de temperatura, LST o condiciones de medición reproducibles."
    },
    {
      id: "ecologica",
      title: "ECOLÓGICA",
      description: "La fuente menciona fragmentación ecológica.",
      limitation: "No se incluye un análisis independiente de conectividad o biodiversidad existente."
    }
  ],

  designSystemPreview: {
    title: "UNA RESPUESTA COMO SISTEMA",
    intro: "La propuesta responde mediante un sistema integrado de infraestructura verde y espacio público. La pasarela, el anillo y el anfiteatro se plantean como partes conectadas, no como objetos independientes.",
    elements: [
      {
        title: "PASARELA ELEVADA",
        intention: "Organizar recorrido, minimizar compactación y favorecer infiltración."
      },
      {
        title: "ANILLO CENTRAL",
        intention: "Nodo comunitario y climático."
      },
      {
        title: "ANFITEATRO HUNDIDO",
        intention: "Aprovechar la morfología como dispositivo social e hidráulico."
      }
    ],
    note: "Las prestaciones ambientales corresponden a intenciones descritas por el diseño. Las páginas no presentan valores de desempeño ni documentan la construcción de la propuesta."
  },

  seo: {
    title: "Urban Challenge: regeneración de un parque hundido en Mérida | Néstor Arriaga",
    description: "Propuesta universitaria de regeneración urbana para un parque hundido de Mérida, desarrollada para Nodos de Innovación para la Resiliencia Urbana.",
    robots: {
      index: true,
      follow: true
    }
  }
};
