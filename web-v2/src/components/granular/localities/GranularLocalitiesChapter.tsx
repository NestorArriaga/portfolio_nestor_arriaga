"use client";

import GranularLocalitiesHero from "./GranularLocalitiesHero";
import GranularScaleChangeConcept from "./GranularScaleChangeConcept";
import GranularLocalityFigure from "./GranularLocalityFigure";
import GranularMunicipalLocalityComparison from "./GranularMunicipalLocalityComparison";
import GranularLocalitiesLimitations from "./GranularLocalitiesLimitations";

export default function GranularLocalitiesChapter() {
  return (
    <div className="w-full flex flex-col">
      <GranularLocalitiesHero />
      <GranularScaleChangeConcept />
      <GranularLocalityFigure />
      <GranularMunicipalLocalityComparison />
      <GranularLocalitiesLimitations />
    </div>
  );
}
