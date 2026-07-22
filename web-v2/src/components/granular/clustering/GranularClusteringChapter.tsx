"use client";

import GranularClusteringHero from "./GranularClusteringHero";
import GranularClusteringIntegration from "./GranularClusteringIntegration";
import GranularMunicipalTypologyExplorer from "./GranularMunicipalTypologyExplorer";
import GranularClusterRelationsDiagram from "./GranularClusterRelationsDiagram";
import GranularClusteringLimitations from "./GranularClusteringLimitations";

export default function GranularClusteringChapter() {
  return (
    <div className="w-full flex flex-col">
      <GranularClusteringHero />
      <GranularClusteringIntegration />
      <GranularMunicipalTypologyExplorer />
      <GranularClusterRelationsDiagram />
      <GranularClusteringLimitations />
    </div>
  );
}
