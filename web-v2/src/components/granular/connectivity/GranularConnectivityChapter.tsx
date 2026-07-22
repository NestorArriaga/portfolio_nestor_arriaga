"use client";

import GranularConnectivityHero from "./GranularConnectivityHero";
import GranularConnectivityConcept from "./GranularConnectivityConcept";
import GranularConnectivityDistanceExplorer from "./GranularConnectivityDistanceExplorer";
import GranularEnvironmentConnectivityComparison from "./GranularEnvironmentConnectivityComparison";
import GranularConnectivityLimitations from "./GranularConnectivityLimitations";
import GranularConnectivityToClustering from "./GranularConnectivityToClustering";

export default function GranularConnectivityChapter() {
  return (
    <div className="w-full flex flex-col">
      <GranularConnectivityHero />
      <GranularConnectivityConcept />
      <GranularConnectivityDistanceExplorer />
      <GranularEnvironmentConnectivityComparison />
      <GranularConnectivityLimitations />
      <GranularConnectivityToClustering />
    </div>
  );
}
