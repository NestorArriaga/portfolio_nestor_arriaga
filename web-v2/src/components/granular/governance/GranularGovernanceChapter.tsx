"use client";

import GranularGovernanceHero from "./GranularGovernanceHero";
import GranularGovernanceConcept from "./GranularGovernanceConcept";
import GranularInstitutionalScaleExplorer from "./GranularInstitutionalScaleExplorer";
import GranularGovernanceTerritoryExplorer from "./GranularGovernanceTerritoryExplorer";
import GranularGovernanceLimitations from "./GranularGovernanceLimitations";
import GranularGovernanceToSocioeconomy from "./GranularGovernanceToSocioeconomy";

export default function GranularGovernanceChapter() {
  return (
    <div className="w-full flex flex-col">
      <GranularGovernanceHero />
      <GranularGovernanceConcept />
      <GranularInstitutionalScaleExplorer />
      <GranularGovernanceTerritoryExplorer />
      <GranularGovernanceLimitations />
      <GranularGovernanceToSocioeconomy />
    </div>
  );
}
