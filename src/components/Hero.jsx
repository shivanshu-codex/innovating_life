import ParticleCanvas from './ParticleCanvas';

export default function Hero() {
  return (
    <section className="hero-section">
      <ParticleCanvas />

      <div className="hero-content">
        {/* Eyebrow */}
        <div className="hero-eyebrow">
          <span aria-hidden="true">✦</span>
          A wellbeing community
        </div>

        {/* Headline */}
        <h1 className="hero-title">
          Your{' '}
          <span className="hero-title__accent">story</span>
          {' '}finds its people.
        </h1>

        {/* Sub-headline */}
        <p className="hero-sub">
          A warm community where honest human experiences are shared, felt, and remembered.
        </p>

        {/* CTAs */}
        <div className="hero-ctas">
          <a href="/auth/signup" className="btn btn-primary btn-lg">
            Start sharing
          </a>
          <a href="/explore" className="btn btn-secondary btn-lg">
            Read stories first
          </a>
        </div>

        {/* Pull quote */}
        <blockquote className="hero-quote">
          "The stories no one tells are the ones that change people."
        </blockquote>

        {/* Social proof */}
        <div className="hero-proof">
          <div className="hero-avatars" aria-hidden="true">
            {['#FFD166', '#FFB3AA', '#8DD1A4', '#BFA8FF'].map((color, i) => (
              <div
                key={i}
                className="hero-avatar"
                style={{ background: color, marginLeft: i > 0 ? '-8px' : 0, zIndex: 4 - i }}
              />
            ))}
          </div>
          <span className="hero-proof__text">
            Real people. Real experiences.{' '}
            <strong>No curated highlight reels.</strong>
          </span>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="hero-scroll" aria-hidden="true">
        <span className="hero-scroll__label">Scroll to explore</span>
        <div className="hero-scroll__line" />
      </div>

      <style>{`
        .hero-section {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          padding-top: 64px;
          box-sizing: border-box;
        }

        .hero-content {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 1.5rem;
          width: 100%;
          max-width: 800px;
          margin: 0 auto;
          padding: 4rem 1.5rem 6rem;
          box-sizing: border-box;
        }

        .hero-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.4rem 1rem;
          border-radius: 9999px;
          border: 1px solid var(--soul-200);
          background: var(--soul-50);
          color: var(--soul-700);
          font-size: 0.8125rem;
          font-weight: 600;
          letter-spacing: 0.04em;
          white-space: nowrap;
        }

        .hero-title {
          font-family: var(--font-display);
          font-size: clamp(2.25rem, 6vw, 4.5rem);
          font-weight: 800;
          color: var(--stone-900);
          line-height: 1.1;
          letter-spacing: -0.02em;
          margin: 0;
          word-break: break-word;
          overflow-wrap: break-word;
        }

        .hero-title__accent {
          background: linear-gradient(135deg, var(--soul-500), var(--bloom-500));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-sub {
          font-size: clamp(1rem, 2vw, 1.2rem);
          color: var(--text-secondary);
          line-height: 1.7;
          max-width: 520px;
          margin: 0;
        }

        .hero-ctas {
          display: flex;
          gap: 0.75rem;
          flex-wrap: wrap;
          justify-content: center;
          width: 100%;
        }

        .hero-quote {
          font-family: var(--font-quote);
          font-style: italic;
          font-size: clamp(0.9375rem, 1.5vw, 1.125rem);
          color: var(--text-secondary);
          line-height: 1.7;
          max-width: 460px;
          padding: 1rem 1.25rem;
          border-left: 3px solid var(--soul-300);
          text-align: left;
          margin: 0;
        }

        .hero-proof {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          flex-wrap: wrap;
          justify-content: center;
        }

        .hero-avatars {
          display: flex;
          flex-shrink: 0;
        }

        .hero-avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          border: 2px solid var(--surface-page);
          flex-shrink: 0;
        }

        .hero-proof__text {
          font-size: 0.875rem;
          color: var(--text-muted);
        }

        .hero-proof__text strong {
          color: var(--text-primary);
        }

        .hero-scroll {
          position: absolute;
          bottom: 2rem;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
        }

        .hero-scroll__label {
          font-size: 0.75rem;
          color: var(--text-muted);
          letter-spacing: 0.05em;
          white-space: nowrap;
        }

        .hero-scroll__line {
          width: 1px;
          height: 40px;
          background: linear-gradient(to bottom, var(--soul-400), transparent);
          animation: pulse-scroll 2s ease-in-out infinite;
        }

        @keyframes pulse-scroll {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 1; }
        }

        @media (max-width: 480px) {
          .hero-content {
            padding: 2.5rem 1rem 5rem;
            gap: 1.25rem;
          }

          .hero-ctas {
            flex-direction: column;
            align-items: stretch;
          }

          .hero-ctas .btn {
            text-align: center;
            justify-content: center;
          }
        }
      `}</style>
    </section>
  );
}
