"use client";

import GranularSocioeconomyHero from "./GranularSocioeconomyHero";
import GranularSocioeconomyConcept from "./GranularSocioeconomyConcept";
import GranularCommutingExplorer from "./GranularCommutingExplorer";
import GranularSocioeconomicProfileExplorer from "./GranularSocioeconomicProfileExplorer";
import GranularSocioeconomicMapComparison from "./GranularSocioeconomicMapComparison";
import GranularSocioeconomyLimitations from "./GranularSocioeconomyLimitations";
import GranularSocioeconomyToEnvironment from "./GranularSocioeconomyToEnvironment";

export default function GranularSocioeconomyChapter() {
  return (
    <div className="w-full flex flex-col">
      <GranularSocioeconomyHero />
      <GranularSocioeconomyConcept />
      <GranularCommutingExplorer />
      <GranularSocioeconomicProfileExplorer />
      <GranularSocioeconomicMapComparison />
      <GranularSocioeconomyLimitations />
      <GranularSocioeconomyToEnvironment />
    </div>
  );
}
