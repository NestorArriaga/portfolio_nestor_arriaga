import Link from 'next/link';

/**
 * Marcador de posición del home. La Fase 2 lo sustituye por completo.
 * No se compone nada aquí para no fijar decisiones antes de tiempo.
 */
export default function Home() {
  return (
    <main style={{ padding: '6rem 3rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <p className="technical">Fase 1b · sistema visual</p>
      <h1 style={{ fontSize: 'var(--type-display)', margin: 0 }}>Atlas territorial</h1>
      <p style={{ color: 'var(--ink-muted)', maxWidth: 'var(--measure)', margin: 0 }}>
        El home se construye en la Fase 2. El sistema visual está en el laboratorio.
      </p>
      <Link href="/lab" className="technical" style={{ color: 'var(--white)' }}>
        Ir al laboratorio visual →
      </Link>
    </main>
  );
}
