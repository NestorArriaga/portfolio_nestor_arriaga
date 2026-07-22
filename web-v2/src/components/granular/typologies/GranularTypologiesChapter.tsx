"use client";

import GranularTypologiesHero from "./GranularTypologiesHero";
import GranularSituatedTypologyConcept from "./GranularSituatedTypologyConcept";
import GranularMultiscaleSynthesisViewer from "./GranularMultiscaleSynthesisViewer";
import GranularTypologiesLimitations from "./GranularTypologiesLimitations";
import GranularTypologiesToSystem from "./GranularTypologiesToSystem";

export default function GranularTypologiesChapter() {
  return (
    <div className="w-full flex flex-col">
      <GranularTypologiesHero />
      <GranularSituatedTypologyConcept />
      <GranularMultiscaleSynthesisViewer />
      <GranularTypologiesLimitations />
      <GranularTypologiesToSystem />
    </div>
  );
}
