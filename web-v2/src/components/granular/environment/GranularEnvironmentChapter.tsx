"use client";

import GranularEnvironmentHero from "./GranularEnvironmentHero";
import GranularEnvironmentConcept from "./GranularEnvironmentConcept";
import GranularSoilClassificationExplorer from "./GranularSoilClassificationExplorer";
import GranularEnvironmentLimitations from "./GranularEnvironmentLimitations";
import GranularEnvironmentToConnectivity from "./GranularEnvironmentToConnectivity";

export default function GranularEnvironmentChapter() {
  return (
    <div className="w-full flex flex-col">
      <GranularEnvironmentHero />
      <GranularEnvironmentConcept />
      <GranularSoilClassificationExplorer />
      <GranularEnvironmentLimitations />
      <GranularEnvironmentToConnectivity />
    </div>
  );
}
