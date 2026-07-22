export default function Area01Tokens() {
  const colors = [
    { name: '--color-black', val: '#050505', bg: 'var(--color-black)', border: 'var(--color-line-strong)' },
    { name: '--color-black-elevated', val: '#090a0b', bg: 'var(--color-black-elevated)', border: 'transparent' },
    { name: '--color-graphite', val: '#101214', bg: 'var(--color-graphite)', border: 'transparent' },
    { name: '--color-white', val: '#f2f1ec', bg: 'var(--color-white)', color: '#000' },
    { name: '--color-text-muted', val: '#a4a5a1', bg: 'var(--color-text-muted)', color: '#000' },
    { name: '--color-accent', val: '#00a6c7', bg: 'var(--color-accent)', color: '#000' },
  ];

  const accents = [
    { name: 'cdmx', bg: 'var(--accent-cdmx)' },
    { name: 'veracruz', bg: 'var(--accent-veracruz)' },
    { name: 'metztitlan', bg: 'var(--accent-metztitlan)' },
    { name: 'aguascalientes', bg: 'var(--accent-aguascalientes)' },
    { name: 'granular', bg: 'var(--accent-granular)' },
    { name: 'merida', bg: 'var(--accent-merida)' },
  ];

  return (
    <section className="mb-24">
      <h2 className="text-2xl font-bold mb-8 border-b border-gray-800 pb-2">ÁREA 01 — TOKENS</h2>
      
      <div className="mb-8">
        <h3 className="text-label mb-4 text-gray-500">Paleta Base</h3>
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
          {colors.map((c) => (
            <div key={c.name} className="flex flex-col gap-2">
              <div 
                className="h-24 w-full rounded" 
                style={{ backgroundColor: c.bg, border: c.border ? `1px solid ${c.border}` : 'none' }}
              />
              <div className="text-mono text-xs">{c.name}</div>
              <div className="text-caption">{c.val}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-label mb-4 text-gray-500">Acentos Territoriales</h3>
        <div className="flex flex-wrap gap-4">
          {accents.map((c) => (
            <div key={c.name} className="flex flex-col gap-2 w-24">
              <div className="h-12 w-full rounded-full" style={{ backgroundColor: c.bg }} />
              <div className="text-mono text-[10px] text-center">{c.name}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
