import { Metadata } from "next";
import UrbanChallengeFoundation from "@/components/urban-challenge/UrbanChallengeFoundation";
import { urbanFoundation } from "@/content/cases/urban-challenge/urban-foundation";
import "@/styles/urban-challenge-tokens.css";

export const metadata: Metadata = {
  title: urbanFoundation.seo.title,
  description: urbanFoundation.seo.description,
  robots: {
    index: false,
    follow: true,
  }
};

export default function UrbanChallengePage() {
  return (
    <main className="w-full relative bg-[#050505]">
      <UrbanChallengeFoundation />
    </main>
  );
}
