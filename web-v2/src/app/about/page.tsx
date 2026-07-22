import { Metadata } from 'next';
import AboutProfile from '@/components/about/AboutProfile';
import AboutApproach from '@/components/about/AboutApproach';
import AboutCapabilities from '@/components/about/AboutCapabilities';
import AboutCredits from '@/components/about/AboutCredits';
import AboutContact from '@/components/about/AboutContact';
import PortfolioClosing from '@/components/global/PortfolioClosing';
import GlobalHeader from '@/components/global/GlobalHeader';
import { SafeModeProvider } from '@/components/home/motion/SafeModeContext';
import { siteMetadata } from '@/content/site/site-metadata';

export const metadata: Metadata = {
  title: siteMetadata.about.title,
  description: siteMetadata.about.description,
};

export default function AboutPage() {
  return (
    <SafeModeProvider isSafeMode={false}>
      <main className="min-h-screen bg-[var(--color-black)] selection:bg-[var(--color-accent)] selection:text-black overflow-x-hidden relative" id="top">
        <GlobalHeader />
        
        <AboutProfile />
        <AboutApproach />
        <AboutCapabilities />
        <AboutCredits />
        <AboutContact />
        
        <PortfolioClosing variant="full" />
      </main>
    </SafeModeProvider>
  );
}
