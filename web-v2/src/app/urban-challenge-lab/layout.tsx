import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Urban Challenge Lab | Editorial Tool",
  description: "Herramienta editorial interna para auditoría del Proyecto 15.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true
    }
  }
};

export default function UrbanChallengeLabLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#050505] text-white">
      {children}
    </div>
  );
}
