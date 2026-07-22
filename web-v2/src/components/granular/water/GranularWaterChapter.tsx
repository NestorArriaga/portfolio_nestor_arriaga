"use client";

import GranularWaterHero from "./GranularWaterHero";
import GranularWaterConcept from "./GranularWaterConcept";
import GranularWaterQualityExplorer from "./GranularWaterQualityExplorer";
import GranularAquiferStatusExplorer from "./GranularAquiferStatusExplorer";
import GranularWaterMapComparison from "./GranularWaterMapComparison";
import GranularWaterLimitations from "./GranularWaterLimitations";
import GranularWaterToAgriculture from "./GranularWaterToAgriculture";

export default function GranularWaterChapter() {
  return (
    <div className="w-full flex flex-col">
      <GranularWaterHero />
      <GranularWaterConcept />
      <GranularWaterQualityExplorer />
      <GranularAquiferStatusExplorer />
      <GranularWaterMapComparison />
      <GranularWaterLimitations />
      <GranularWaterToAgriculture />
    </div>
  );
}
