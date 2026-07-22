"use client";

import { useEffect, useState } from "react";
import UrbanChallengeHero from "./UrbanChallengeHero";
import UrbanChapterNav from "./UrbanChapterNav";
import UrbanMobileChapterNav from "./UrbanMobileChapterNav";
import UrbanOpeningChapter from "./UrbanOpeningChapter";
import UrbanCompetitionChapter from "./UrbanCompetitionChapter";
import UrbanSunkenParkChapter from "./UrbanSunkenParkChapter";
import UrbanVulnerabilityChapter from "./UrbanVulnerabilityChapter";
import UrbanFabricChapter from "./UrbanFabricChapter";
import UrbanEdgesAccessChapter from "./UrbanEdgesAccessChapter";
import UrbanClimateChapter from "./UrbanClimateChapter";
import UrbanTopographyWaterChapter from "./UrbanTopographyWaterChapter";
import UrbanMasterPlanChapter from "./UrbanMasterPlanChapter";
import UrbanElevatedSpineChapter from "./UrbanElevatedSpineChapter";
import UrbanCentralRingChapter from "./UrbanCentralRingChapter";
import UrbanAmphitheaterChapter from "./UrbanAmphitheaterChapter";
import UrbanVegetationInfiltrationChapter from "./UrbanVegetationInfiltrationChapter";
import UrbanCommunityNodeChapter from "./UrbanCommunityNodeChapter";
import UrbanPlayRingChapter from "./UrbanPlayRingChapter";
import UrbanClosingChapter from "./UrbanClosingChapter";

export default function UrbanChallengeFoundation() {
  const [activeChapter, setActiveChapter] = useState("00");

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -60% 0px",
      threshold: 0
    };

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          // Map hash anchors to chapter IDs
          const mapping: Record<string, string> = {
            "urban-challenge": "00",
            "concurso": "01",
            "parque-hundido": "02",
            "vulnerabilidad": "03",
            "tejido-urbano": "04",
            "bordes-y-accesos": "05",
            "viento-y-calor": "06",
            "topografia-y-agua": "07",
            "plan-maestro": "08",
            "espina-dorsal": "09",
            "anillo-central": "10",
            "anfiteatro": "11",
            "vegetacion-e-infiltracion": "12",
            "nodo-comunitario": "13",
            "juego": "14",
            "cierre": "15"
          };
          if (mapping[id]) {
            setActiveChapter(mapping[id]);
            // Update hash without scrolling
            window.history.replaceState(null, "", `#${id}`);
          }
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);
    
    const sections = document.querySelectorAll("section[id]");
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <article className="urban-case w-full min-h-screen">
      
      <UrbanChallengeHero />
      <UrbanMobileChapterNav currentChapterId={activeChapter} />

      <div className="w-full max-w-[1440px] mx-auto px-6 md:px-12 xl:px-24 flex gap-16 relative">
        <UrbanChapterNav currentChapterId={activeChapter} />
        
        <div className="flex-1 min-w-0 flex flex-col pt-12 pb-24">
          <UrbanOpeningChapter />
          <UrbanCompetitionChapter />
          <UrbanSunkenParkChapter />
          <UrbanVulnerabilityChapter />
          <UrbanFabricChapter />
          <UrbanEdgesAccessChapter />
          <UrbanClimateChapter />
          <UrbanTopographyWaterChapter />
          <UrbanMasterPlanChapter />
          <UrbanElevatedSpineChapter />
          <UrbanCentralRingChapter />
          <UrbanAmphitheaterChapter />
          <UrbanVegetationInfiltrationChapter />
          <UrbanCommunityNodeChapter />
          <UrbanPlayRingChapter />
          <UrbanClosingChapter />
        </div>
      </div>

    </article>
  );
}
