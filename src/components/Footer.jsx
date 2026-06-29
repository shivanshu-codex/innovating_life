import { Leaf } from 'lucide-react';

export default function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid var(--border-soft)',
      padding: 'var(--space-16) 0 var(--space-8)',
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr 1fr 1fr',
          gap: 'var(--space-8)',
          marginBottom: 'var(--space-12)',
        }}>
          {/* Brand column */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-4)' }}>
              <Leaf size={20} color="var(--soul-500)" strokeWidth={1.5} />
              <span style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 'var(--weight-bold)',
                fontSize: 'var(--text-lg)',
                color: 'var(--text-primary)',
              }}>
                Lumina
              </span>
            </div>
            <p className="t-body" style={{ fontSize: 'var(--text-base)', color: 'var(--text-secondary)', maxWidth: '280px', marginBottom: 'var(--space-6)' }}>
              A wellbeing-first community where every story is held with warmth and care.
            </p>
            <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
              {['🌿', '🌸', '☀️', '🌊'].map((emoji) => (
                <button
                  key={emoji}
                  className="btn btn-ghost"
                  style={{ fontSize: '1.2rem', width: '36px', height: '36px', padding: 0 }}
                  aria-label="Social link"
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>

          {/* Nav columns */}
          {[
            { heading: 'Community', links: ['Explore', 'Stories', 'Thoughts', 'Members'] },
            { heading: 'Support', links: ['Help Center', 'Community Guidelines', 'Wellbeing Resources', 'Report a Concern'] },
            { heading: 'Company', links: ['About Lumina', 'Our Values', 'Privacy', 'Terms'] },
          ].map((col) => (
            <div key={col.heading}>
              <h4 className="t-label" style={{ marginBottom: 'var(--space-4)', color: 'var(--text-primary)' }}>
                {col.heading}
              </h4>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="t-meta"
                      style={{
                        transition: 'color var(--dur-fast)',
                        cursor: 'pointer',
                      }}
                      onMouseEnter={(e) => e.target.style.color = 'var(--text-body)'}
                      onMouseLeave={(e) => e.target.style.color = ''}
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: '1px solid var(--border-soft)',
          paddingTop: 'var(--space-6)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 'var(--space-4)',
        }}>
          <span className="t-meta">© 2026 Lumina. Made with care.</span>
          <span className="t-meta" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
            <span style={{ fontSize: '0.9rem' }}>🌿</span>
            Your wellbeing matters
          </span>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          footer .container > div:first-child {
            grid-template-columns: 1fr 1fr !important;
          }
          footer .container > div:first-child > div:first-child {
            grid-column: 1 / -1;
          }
        }
        @media (max-width: 480px) {
          footer .container > div:first-child {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </footer>
  );
}
