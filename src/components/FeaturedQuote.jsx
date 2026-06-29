export default function FeaturedQuote() {
  return (
    <section style={{ padding: 'var(--space-20) 0' }}>
      <div className="container">
        <div
          className="card card--featured reveal"
          style={{
            textAlign: 'center',
            padding: 'var(--space-16) var(--space-8)',
            maxWidth: 'var(--container-md)',
            margin: '0 auto',
          }}
        >
          <span style={{
            display: 'block',
            fontSize: 'var(--text-4xl)',
            color: 'var(--soul-300)',
            fontFamily: 'var(--font-quote)',
            lineHeight: 1,
            marginBottom: 'var(--space-6)',
            opacity: 0.6,
          }}>
            &ldquo;
          </span>
          <blockquote className="t-quote" style={{ marginBottom: 'var(--space-6)' }}>
            Vulnerability is not winning or losing; it's having the courage
            to show up and be seen when we have no control over the outcome.
          </blockquote>
          <cite style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--text-sm)',
            fontWeight: 'var(--weight-semibold)',
            color: 'var(--text-muted)',
            letterSpacing: 'var(--tracking-wide)',
            fontStyle: 'normal',
          }}>
            — Brené Brown
          </cite>
        </div>
      </div>
    </section>
  );
}
