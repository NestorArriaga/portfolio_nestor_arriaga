import { galleryConfig } from "../project-gallery";

export const siteAtlas = {
  title: "ATLAS DE PROYECTOS",
  subtitle: "QUINCE CASOS\nSEIS TERRITORIOS EDITORIALES",
  territoryGroups: [
    { id: "cdmx", name: "Ciudad de México", projectIds: ["01"] },
    { id: "veracruz", name: "Veracruz", projectIds: ["02", "03", "04"] },
    { id: "hidalgo", name: "Metztitlán, Hidalgo", projectIds: ["05", "06", "07", "08"] },
    { id: "aguascalientes", name: "Aguascalientes y Calvillo", projectIds: ["09", "10", "11", "12", "13"] },
    { id: "comarca-lagunera", name: "Comarca Lagunera", projectIds: ["14"] },
    { id: "merida", name: "Mérida, Yucatán", projectIds: ["15"] }
  ],
  projects: galleryConfig.map(project => {
    // Determine territory group
    let territoryGroup = "Unknown";
    if (["01"].includes(project.id)) territoryGroup = "Ciudad de México";
    else if (["02", "03", "04"].includes(project.id)) territoryGroup = "Veracruz";
    else if (["05", "06", "07", "08"].includes(project.id)) territoryGroup = "Metztitlán, Hidalgo";
    else if (["09", "10", "11", "12", "13"].includes(project.id)) territoryGroup = "Aguascalientes y Calvillo";
    else if (["14"].includes(project.id)) territoryGroup = "Comarca Lagunera";
    else if (["15"].includes(project.id)) territoryGroup = "Mérida, Yucatán";

    let scale = "sitio";
    if (project.id === "14") scale = "multiescalar";
    if (["09", "10", "11"].includes(project.id)) scale = "estado";
    if (["05", "06", "07", "08"].includes(project.id)) scale = "reserva";
    if (["12", "13"].includes(project.id)) scale = "municipio";
    if (["02", "03", "04"].includes(project.id)) scale = "cuenca";
    if (["01"].includes(project.id)) scale = "alcaldía";
    if (["15"].includes(project.id)) scale = "parque";

    let methods: string[] = ["análisis espacial", "cartografía"];
    if (["09", "14"].includes(project.id)) methods.push("clustering");
    if (["03", "04", "10", "11"].includes(project.id)) methods.push("aptitud territorial");
    if (["06"].includes(project.id)) methods.push("zonificación");
    if (["15"].includes(project.id)) methods.push("diseño urbano");

    return {
      id: project.id,
      title: project.summary, // using summary as full title, or map it properly later
      shortTitle: project.summary.split(" en ")[0] || project.summary,
      route: `/projects/${project.slug}`,
      territory: project.themes.find(t => ["Ciudad de México", "Veracruz", "Metztitlán", "Aguascalientes", "Calvillo", "Comarca Lagunera", "Mérida"].includes(t)) || "Varios",
      territoryGroup,
      sourcePages: "Varios", // We can refine this using portfolio-projects.json if needed
      scale,
      themes: project.themes,
      methods,
      projectType: "Análisis Espacial",
      heroAssetId: project.featuredAssetId,
      status: project.status || "COMPLETO",
      slug: project.slug
    };
  })
};
