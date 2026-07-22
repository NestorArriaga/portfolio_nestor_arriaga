"use client";

import GranularPolicyHero from "./GranularPolicyHero";
import GranularPolicyApplicationExplorer from "./GranularPolicyApplicationExplorer";
import GranularPolicyLimitations from "./GranularPolicyLimitations";

export default function GranularPolicyChapter() {
  return (
    <div className="w-full flex flex-col">
      <GranularPolicyHero />
      <GranularPolicyApplicationExplorer />
      <GranularPolicyLimitations />
    </div>
  );
}
