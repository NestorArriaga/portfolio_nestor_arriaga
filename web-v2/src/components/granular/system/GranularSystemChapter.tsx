"use client";

import GranularSystemHero from "./GranularSystemHero";
import GranularSystemIntroduction from "./GranularSystemIntroduction";
import GranularSystemDiagramReader from "./GranularSystemDiagramReader";
import GranularSystemLimitations from "./GranularSystemLimitations";

export default function GranularSystemChapter() {
  return (
    <div className="w-full flex flex-col">
      <GranularSystemHero />
      <GranularSystemIntroduction />
      <GranularSystemDiagramReader />
      <GranularSystemLimitations />
    </div>
  );
}
