"use client";

import GranularAgricultureHero from "./GranularAgricultureHero";
import GranularAgricultureConcept from "./GranularAgricultureConcept";
import GranularIrrigationRainfedComparison from "./GranularIrrigationRainfedComparison";
import GranularCropStructure from "./GranularCropStructure";
import GranularWaterParadox from "./GranularWaterParadox";
import GranularDroughtVulnerabilityExplorer from "./GranularDroughtVulnerabilityExplorer";
import GranularProductiveLocalitiesExplorer from "./GranularProductiveLocalitiesExplorer";
import GranularAgricultureScaleComparison from "./GranularAgricultureScaleComparison";
import GranularAgricultureLimitations from "./GranularAgricultureLimitations";
import GranularAgricultureToGovernance from "./GranularAgricultureToGovernance";

export default function GranularAgricultureChapter() {
  return (
    <div className="w-full flex flex-col">
      <GranularAgricultureHero />
      <GranularAgricultureConcept />
      <GranularIrrigationRainfedComparison />
      <GranularCropStructure />
      <GranularWaterParadox />
      <GranularDroughtVulnerabilityExplorer />
      <GranularProductiveLocalitiesExplorer />
      <GranularAgricultureScaleComparison />
      <GranularAgricultureLimitations />
      <GranularAgricultureToGovernance />
    </div>
  );
}
