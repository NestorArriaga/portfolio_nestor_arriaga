import GranularLab from '@/components/granular/lab/GranularLab';
import { SafeModeProvider } from '@/components/home/motion/SafeModeContext';

export default function GranularLabPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  return (
    <SafeModeProvider isSafeMode={searchParams.safeMode === '1'}>
      <GranularLab />
    </SafeModeProvider>
  );
}
