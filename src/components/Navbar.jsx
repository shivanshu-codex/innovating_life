import { useState } from 'react';
import { Leaf, PenLine, Search, Menu, X } from 'lucide-react';

export default function Navbar({ onOpenMoodPicker }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <nav className="lm-nav">
        <div className="lm-nav__inner">
          {/* Logo */}
          <a href="/" className="lm-nav__logo">
            <Leaf size={20} color="var(--soul-500)" strokeWidth={1.5} />
            <span className="lm-nav__wordmark">Lumina</span>
          </a>

          {/* Desktop nav links */}
          <div className="lm-nav__links">
            {['Explore', 'Stories', 'Community'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="lm-nav__link">
                {item}
              </a>
            ))}
          </div>

          {/* Right actions */}
          <div className="lm-nav__actions">
            <button className="lm-nav__icon-btn" aria-label="Search">
              <Search size={18} strokeWidth={1.5} />
            </button>
            <a href="/auth/signup" className="btn btn-primary btn-sm lm-nav__cta">
              <PenLine size={14} strokeWidth={2} />
              Write
            </a>
            {/* Mobile hamburger */}
            <button
              className="lm-nav__icon-btn lm-nav__hamburger"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu drawer */}
      {mobileOpen && (
        <div className="lm-nav__drawer" role="dialog" aria-label="Navigation menu">
          {['Explore', 'Stories', 'Community'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="lm-nav__drawer-link"
              onClick={() => setMobileOpen(false)}
            >
              {item}
            </a>
          ))}
          <a href="/auth/signup" className="btn btn-primary" style={{ marginTop: '0.5rem' }}>
            Start writing
          </a>
          <a href="/auth/login" className="btn btn-secondary">
            Sign in
          </a>
        </div>
      )}

      <style>{`
        .lm-nav {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 100;
          background: rgba(255, 253, 249, 0.88);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border-bottom: 1px solid var(--border-soft);
          height: 64px;
        }

        .lm-nav__inner {
          display: flex;
          align-items: center;
          gap: 1rem;
          height: 100%;
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 1.5rem;
        }

        .lm-nav__logo {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          flex-shrink: 0;
          text-decoration: none;
        }

        .lm-nav__wordmark {
          font-family: var(--font-display);
          font-weight: 700;
          font-size: 1.25rem;
          color: var(--text-primary);
          white-space: nowrap;
        }

        .lm-nav__links {
          display: flex;
          gap: 0.25rem;
          margin-left: 1.5rem;
          flex: 1;
        }

        .lm-nav__link {
          padding: 0.5rem 0.75rem;
          font-size: 0.9375rem;
          font-weight: 500;
          color: var(--text-secondary);
          border-radius: var(--radius-md);
          transition: color 0.15s, background 0.15s;
          text-decoration: none;
          white-space: nowrap;
        }

        .lm-nav__link:hover {
          color: var(--text-primary);
          background: var(--stone-100);
        }

        .lm-nav__actions {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-left: auto;
          flex-shrink: 0;
        }

        .lm-nav__icon-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 38px;
          height: 38px;
          border-radius: var(--radius-md);
          color: var(--text-secondary);
          background: transparent;
          border: none;
          cursor: pointer;
          transition: background 0.15s, color 0.15s;
          flex-shrink: 0;
        }

        .lm-nav__icon-btn:hover {
          background: var(--stone-100);
          color: var(--text-primary);
        }

        .lm-nav__cta {
          white-space: nowrap;
          flex-shrink: 0;
        }

        .lm-nav__hamburger {
          display: none;
        }

        .lm-nav__drawer {
          position: fixed;
          top: 64px;
          left: 0;
          right: 0;
          z-index: 99;
          background: var(--surface-page);
          border-bottom: 1px solid var(--border-soft);
          padding: 1rem 1.5rem 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          box-shadow: 0 8px 24px rgba(61,42,0,0.10);
        }

        .lm-nav__drawer-link {
          padding: 0.75rem 1rem;
          font-size: 1rem;
          font-weight: 500;
          color: var(--text-primary);
          border-radius: var(--radius-md);
          text-decoration: none;
          transition: background 0.15s;
        }

        .lm-nav__drawer-link:hover {
          background: var(--stone-100);
        }

        @media (max-width: 768px) {
          .lm-nav__links { display: none; }
          .lm-nav__hamburger { display: flex; }
        }

        @media (max-width: 480px) {
          .lm-nav__inner { padding: 0 1rem; }
          .lm-nav__drawer { padding: 1rem; }
        }
      `}</style>
    </>
  );
}
