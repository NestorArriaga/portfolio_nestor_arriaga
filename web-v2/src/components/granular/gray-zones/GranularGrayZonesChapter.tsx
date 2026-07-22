"use client";

import GranularGrayZonesConcept from "./GranularGrayZonesConcept";
import GranularGrayZonesContexts from "./GranularGrayZonesContexts";
import GranularGrayZonesLimitations from "./GranularGrayZonesLimitations";

export default function GranularGrayZonesChapter() {
  return (
    <div className="w-full flex flex-col">
      <GranularGrayZonesConcept />
      <GranularGrayZonesContexts />
      <GranularGrayZonesLimitations />
    </div>
  );
}
