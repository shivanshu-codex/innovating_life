import ParticleCanvas from './ParticleCanvas';

export default function Hero() {
  return (
    <section
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        paddingTop: '64px',
      }}
    >
      <ParticleCanvas />

      <div
        className="container"
        style={{
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 'var(--space-8)',
          padding: 'var(--space-20) var(--space-6)',
        }}
      >
        {/* Eyebrow label */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 'var(--space-2)',
          padding: 'var(--space-2) var(--space-4)',
          borderRadius: 'var(--radius-full)',
          border: '1px solid var(--soul-300)',
          background: 'var(--soul-50)',
          color: 'var(--soul-700)',
          fontSize: 'var(--text-sm)',
          fontFamily: 'var(--font-body)',
          fontWeight: 'var(--weight-semibold)',
          letterSpacing: 'var(--tracking-wide)',
        }}>
          <span style={{ fontSize: '0.85rem' }}>✦</span>
          A wellbeing community
        </div>

        {/* Hero headline */}
        <h1 className="t-hero" style={{ maxWidth: '800px' }}>
          Your{' '}
          <span style={{
            background: 'linear-gradient(135deg, var(--soul-500), var(--bloom-500))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            story
          </span>{' '}
          finds its people.
        </h1>

        {/* Sub-headline */}
        <p className="t-body" style={{
          maxWidth: '560px',
          fontSize: 'var(--text-lg)',
          lineHeight: 'var(--leading-relaxed)',
          color: 'var(--text-secondary)',
        }}>
          A warm community where honest human experiences are shared, felt, and remembered.
        </p>

        {/* CTAs */}
        <div style={{ display: 'flex', gap: 'var(--space-4)', flexWrap: 'wrap', justifyContent: 'center' }}>
          <a href="/auth/signup" className="btn btn-primary btn-lg" data-magnetic>
            Start sharing
          </a>
          <a href="/explore" className="btn btn-secondary btn-lg">
            Read stories first
          </a>
        </div>

        {/* Pull quote */}
        <blockquote
          className="t-quote"
          style={{
            maxWidth: '500px',
            padding: 'var(--space-6)',
            borderLeft: '3px solid var(--soul-300)',
            textAlign: 'left',
            color: 'var(--text-secondary)',
          }}
        >
          "The stories no one tells are the ones that change people."
        </blockquote>

        {/* Social proof */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--space-4)',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}>
          {/* Avatar stack */}
          <div style={{ display: 'flex' }}>
            {['#FFD166', '#FFB3AA', '#8DD1A4', '#BFA8FF'].map((color, i) => (
              <div
                key={i}
                className="avatar avatar-sm"
                style={{
                  background: `linear-gradient(135deg, ${color}, transparent)`,
                  backgroundColor: color,
                  marginLeft: i > 0 ? '-8px' : 0,
                  border: '2px solid var(--surface-page)',
                  zIndex: 4 - i,
                }}
                aria-hidden="true"
              />
            ))}
          </div>
          <span className="t-meta">
            Real people. Real experiences.{' '}
            <strong style={{ color: 'var(--text-primary)' }}>No curated highlight reels.</strong>
          </span>
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: 'absolute',
        bottom: 'var(--space-8)',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 'var(--space-2)',
      }}>
        <span className="t-meta">Scroll to explore</span>
        <div style={{
          width: '1px',
          height: '40px',
          background: 'linear-gradient(to bottom, var(--soul-400), transparent)',
          animation: 'pulse-line 2s ease-in-out infinite',
        }} aria-hidden="true" />
        <style>{`
          @keyframes pulse-line {
            0%, 100% { opacity: 0.4; transform: scaleY(1); }
            50% { opacity: 1; transform: scaleY(1.2); }
          }
        `}</style>
      </div>
    </section>
  );
}
