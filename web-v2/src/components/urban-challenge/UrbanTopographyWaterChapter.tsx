"use client";

import UrbanTopographyHero from "./UrbanTopographyHero";
import UrbanTopographyWaterReader from "./UrbanTopographyWaterReader";
import UrbanSiteEvidenceMatrix from "./UrbanSiteEvidenceMatrix";
import UrbanIntegratedSiteReading from "./UrbanIntegratedSiteReading";
import { urbanTopographyWater } from "@/content/cases/urban-challenge/urban-topography-water";

export default function UrbanTopographyWaterChapter() {
  const { chapterIntroduction } = urbanTopographyWater;

  return (
    <section id="topografia-y-agua" className="w-full flex flex-col gap-24 pb-32 border-b border-white/10">
      <UrbanTopographyHero />

      <div className="w-full max-w-4xl mx-auto flex flex-col gap-16 px-6">
        
        {/* Intro */}
        <div className="flex flex-col gap-8">
          <h3 className="text-heading text-white">{chapterIntroduction.statement}</h3>
          <ul className="flex flex-col gap-2">
            {chapterIntroduction.concepts.map((item, i) => (
              <li key={i} className="text-body text-white/50 flex gap-4">
                <span className="text-[var(--urban-accent)]">•</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Reader */}
        <div className="w-full flex flex-col gap-8 border-t border-white/10 pt-16">
          <UrbanTopographyWaterReader />
        </div>

        {/* Evidence Matrix */}
        <div className="w-full mt-12">
          <UrbanSiteEvidenceMatrix />
        </div>

      </div>
      
      {/* Integrated Reading Summary */}
      <div className="w-full max-w-7xl mx-auto px-6">
        <UrbanIntegratedSiteReading />
      </div>

    </section>
  );
}
