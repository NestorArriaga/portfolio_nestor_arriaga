import { Metadata } from 'next';
import AtlasView from '@/components/atlas/AtlasView';
import PortfolioClosing from '@/components/global/PortfolioClosing';
import GlobalHeader from '@/components/global/GlobalHeader';
import { SafeModeProvider } from '@/components/home/motion/SafeModeContext';
import { siteMetadata } from '@/content/site/site-metadata';

export const metadata: Metadata = {
  title: siteMetadata.atlas.title,
  description: siteMetadata.atlas.description,
};

export default function AtlasPage() {
  return (
    <SafeModeProvider isSafeMode={false}>
      <main className="min-h-screen bg-[var(--color-black)] selection:bg-[var(--color-accent)] selection:text-black overflow-x-hidden relative">
        <GlobalHeader />
        <AtlasView />
        <div className="mt-32">
          <PortfolioClosing variant="compact" />
        </div>
      </main>
    </SafeModeProvider>
  );
}
