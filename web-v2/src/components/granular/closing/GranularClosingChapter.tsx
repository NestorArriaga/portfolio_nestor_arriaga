"use client";

import GranularClosingSummary from "./GranularClosingSummary";
import GranularProjectCredits from "./GranularProjectCredits";
import GranularNextProject from "./GranularNextProject";

export default function GranularClosingChapter() {
  return (
    <div className="w-full flex flex-col">
      <GranularClosingSummary />
      <GranularProjectCredits />
      <GranularNextProject />
    </div>
  );
}
