"use client";

import { useSafeMode, SafeModeProvider } from "@/components/home/motion/SafeModeContext";
import GranularHeader from "./GranularHeader";
import GranularHero from "./GranularHero";
import GranularChapterNav from "./GranularChapterNav";
import GranularProjectChapter from "./GranularProjectChapter";
import GranularCompassChapter from "./GranularCompassChapter";
import GranularScalesChapter from "./GranularScalesChapter";
import GranularConceptFlow from "./GranularConceptFlow";
import GranularWaterChapter from "./water/GranularWaterChapter";
import GranularAgricultureChapter from "./agriculture/GranularAgricultureChapter";
import GranularGovernanceChapter from "./governance/GranularGovernanceChapter";
import GranularSocioeconomyChapter from "./socioeconomy/GranularSocioeconomyChapter";
import GranularEnvironmentChapter from "./environment/GranularEnvironmentChapter";
import GranularConnectivityChapter from "./connectivity/GranularConnectivityChapter";
import GranularClusteringChapter from "./clustering/GranularClusteringChapter";
import GranularLocalitiesChapter from "./localities/GranularLocalitiesChapter";
import GranularTypologiesChapter from "./typologies/GranularTypologiesChapter";
import GranularSystemChapter from "./system/GranularSystemChapter";
import GranularGrayZonesChapter from "./gray-zones/GranularGrayZonesChapter";
import GranularPolicyChapter from "./policy/GranularPolicyChapter";
import GranularClosingChapter from "./closing/GranularClosingChapter";
import { useChapterTracker } from "./useChapterTracker";
import Link from "next/link";
import { granularFoundation } from "@/content/cases/granular/granular-foundation";

function GranularCaseContent() {
  const chapterIds = granularFoundation.chapters.map(c => c.slug);
  const activeChapterId = useChapterTracker(chapterIds);

  return (
    <div className="min-h-screen bg-[#050505] text-white granular-theme font-sans selection:bg-[var(--granular-dim-water)] selection:text-black">
      <GranularHeader />
      <GranularHero />
      
      <div className="w-full max-w-[1440px] mx-auto px-6 md:px-12 flex items-start gap-12 lg:gap-24 relative">
        <GranularChapterNav activeChapterId={activeChapterId} />
        
        <main className="flex-1 w-full max-w-4xl pb-32">
          <GranularProjectChapter />
          <GranularCompassChapter />
          <GranularScalesChapter />
          <GranularConceptFlow />
          <GranularWaterChapter />
          <GranularAgricultureChapter />
          <GranularGovernanceChapter />
          <GranularSocioeconomyChapter />
          <GranularEnvironmentChapter />
          <GranularConnectivityChapter />
          <GranularClusteringChapter />
          <GranularLocalitiesChapter />
          <GranularTypologiesChapter />
          <GranularSystemChapter />
          <GranularGrayZonesChapter />
          <GranularPolicyChapter />
          <GranularClosingChapter />
        </main>
      </div>
    </div>
  );
}

export default function GranularCaseFoundation({ isSafeMode = false }: { isSafeMode?: boolean }) {
  return (
    <SafeModeProvider isSafeMode={isSafeMode}>
      <GranularCaseContent />
    </SafeModeProvider>
  );
}
