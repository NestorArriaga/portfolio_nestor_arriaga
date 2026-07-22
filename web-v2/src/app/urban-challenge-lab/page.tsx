"use client";

import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";
import UrbanLabChaptersView from "@/components/urban-challenge-lab/UrbanLabChaptersView";
import UrbanLabPagesView from "@/components/urban-challenge-lab/UrbanLabPagesView";
import UrbanLabAssetsView from "@/components/urban-challenge-lab/UrbanLabAssetsView";
import UrbanLabElementsView from "@/components/urban-challenge-lab/UrbanLabElementsView";
import UrbanLabClaimsView from "@/components/urban-challenge-lab/UrbanLabClaimsView";
import UrbanLabHeroView from "@/components/urban-challenge-lab/UrbanLabHeroView";

function UrbanChallengeLabContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  // Default view is 'pages' if none specified or if 'chapters' is invalidly requested as an action.
  const view = searchParams.get("view") || "pages";

  const renderView = () => {
    switch (view) {
      case "chapters": return <UrbanLabChaptersView />;
      case "pages": return <UrbanLabPagesView />;
      case "assets": return <UrbanLabAssetsView />;
      case "elements": return <UrbanLabElementsView />;
      case "claims": return <UrbanLabClaimsView />;
      case "hero": return <UrbanLabHeroView />;
      default: return <UrbanLabPagesView />;
    }
  };

  const navItems = [
    { id: "chapters", label: "CHAPTERS" },
    { id: "pages", label: "PAGES" },
    { id: "assets", label: "ASSETS" },
    { id: "elements", label: "ELEMENTS" },
    { id: "claims", label: "CLAIMS" },
    { id: "hero", label: "HERO CANDIDATES" },
  ];

  return (
    <div className="w-full flex flex-col min-h-screen">
      
      {/* HEADER & WARNING */}
      <header className="w-full border-b border-white/10 sticky top-0 bg-[#050505]/90 backdrop-blur-md z-50">
        <div className="w-full p-4 border-b border-white/5 bg-amber-500/10 flex items-center justify-center">
          <span className="text-mono text-[10px] text-amber-500 uppercase tracking-widest text-center">
            HERRAMIENTA EDITORIAL INTERNA — PROPUESTA NO DOCUMENTADA COMO CONSTRUIDA
          </span>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center p-6 gap-6">
          <div className="flex flex-col gap-1">
            <h1 className="text-xl md:text-2xl font-light text-white tracking-wide">
              URBAN CHALLENGE LAB
            </h1>
            <div className="flex items-center gap-3">
              <span className="text-mono text-[10px] text-white/50 uppercase tracking-widest">
                Proyecto 15 • Páginas 41–45
              </span>
              <span className="text-mono text-[9px] bg-green-500/20 text-green-400 border border-green-500/30 px-2 py-0.5 rounded">
                PÚBLICO: CAPÍTULOS 00–15
              </span>
            </div>
          </div>

          <nav className="flex flex-wrap gap-2 md:gap-4 justify-center">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => router.push(`/urban-challenge-lab?view=${item.id}`)}
                className={`text-mono text-[10px] uppercase tracking-widest px-3 py-1.5 rounded transition-colors ${
                  view === item.id 
                    ? "bg-white text-black" 
                    : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* VIEW CONTENT */}
      <main className="flex-1 w-full flex flex-col">
        {renderView()}
      </main>

    </div>
  );
}

export default function UrbanChallengeLab() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-mono text-xs text-white/50">Cargando herramienta editorial...</div>}>
      <UrbanChallengeLabContent />
    </Suspense>
  );
}
