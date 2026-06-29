const PRINCIPLES = [
  {
    emoji: '🌅',
    title: 'Warmth over sterility',
    desc: 'No cold blues or harsh blacks. Warm neutrals and soft organics create a space that feels alive.',
  },
  {
    emoji: '🍃',
    title: 'Alive but calm',
    desc: 'Motion exists but never startles. Everything moves like a physical object — spring-based and organic.',
  },
  {
    emoji: '☁️',
    title: 'Breathe to focus',
    desc: 'Generous whitespace. Content is never packed. Your eyes always have somewhere to rest.',
  },
  {
    emoji: '✨',
    title: 'Delight in the details',
    desc: 'Hover states, scroll reveals, micro-interactions — rewards for the curious.',
  },
  {
    emoji: '🛡️',
    title: 'Never dark-pattern',
    desc: 'No red notification dots. No infinite scroll traps. No manipulative urgency design. Ever.',
  },
];

export default function WellbeingPrinciples() {
  return (
    <section
      style={{
        padding: 'var(--space-20) 0',
        background: 'linear-gradient(180deg, transparent, var(--soul-50) 40%, transparent)',
      }}
    >
      <div className="container">
        <div className="reveal" style={{ textAlign: 'center', marginBottom: 'var(--space-12)' }}>
          <h2 className="t-section" style={{ marginBottom: 'var(--space-4)' }}>
            Designed around you
          </h2>
          <p className="t-body" style={{ color: 'var(--text-secondary)', maxWidth: '480px', margin: '0 auto' }}>
            Five principles guide every pixel of Lumina. Not engagement metrics — human flourishing.
          </p>
        </div>

        <div
          className="reveal-group"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            gap: 'var(--space-6)',
          }}
        >
          {PRINCIPLES.map((p) => (
            <div key={p.title} className="card card--thought" style={{ textAlign: 'center' }}>
              <div style={{
                fontSize: '2.5rem',
                marginBottom: 'var(--space-4)',
                display: 'block',
              }}>
                {p.emoji}
              </div>
              <h3 className="t-title" style={{ marginBottom: 'var(--space-3)' }}>{p.title}</h3>
              <p className="t-body" style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-base)' }}>
                {p.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
