import { useState } from 'react';
import {
  Leaf, PenLine, Search, Bell, User, Menu, X
} from 'lucide-react';

export default function Navbar({ onOpenMoodPicker }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        background: 'var(--surface-glass)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: '1px solid var(--border-soft)',
        height: '64px',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <div className="container" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)', height: '100%' }}>
        {/* Logo */}
        <a href="/" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', flexShrink: 0 }}>
          <Leaf size={22} color="var(--soul-500)" strokeWidth={1.5} />
          <span style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 'var(--weight-bold)',
            fontSize: 'var(--text-xl)',
            color: 'var(--text-primary)',
            fontVariationSettings: "'opsz' 24, 'wght' 700",
          }}>
            Lumina
          </span>
        </a>

        {/* Nav links — desktop */}
        <div style={{ display: 'flex', gap: 'var(--space-1)', marginLeft: 'var(--space-6)', flex: 1 }} className="nav-links-desktop">
          {['Explore', 'Community', 'Stories', 'Thoughts'].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="btn btn-ghost" style={{ fontSize: 'var(--text-base)' }}>
              {item}
            </a>
          ))}
        </div>

        {/* Right actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginLeft: 'auto' }}>
          <button className="btn btn-icon btn-ghost" title="Search" aria-label="Search">
            <Search size={18} strokeWidth={1.5} />
          </button>
          <button
            className="btn btn-icon btn-ghost"
            title="Notifications"
            aria-label="Notifications"
            style={{ position: 'relative' }}
          >
            <Bell size={18} strokeWidth={1.5} />
            {/* Gold notification dot — never red */}
            <span style={{
              position: 'absolute', top: '8px', right: '8px',
              width: '7px', height: '7px',
              borderRadius: '50%',
              background: 'var(--soul-400)',
              border: '1.5px solid var(--surface-card)',
            }} />
          </button>
          <button
            className="btn btn-ghost"
            onClick={onOpenMoodPicker}
            title="Change mood theme"
            aria-label="Change mood theme"
            style={{ fontSize: 'var(--text-sm)', display: 'flex', alignItems: 'center', gap: 'var(--space-1)' }}
          >
            <span style={{ fontSize: '1rem' }}>🌿</span>
            <span className="t-label">Mood</span>
          </button>
          <a href="#write" className="btn btn-primary btn-sm" data-magnetic>
            <PenLine size={15} strokeWidth={2} />
            Write
          </a>
          <button className="btn btn-icon btn-secondary" aria-label="Profile">
            <User size={18} strokeWidth={1.5} />
          </button>
          <button
            className="btn btn-icon btn-ghost"
            style={{ display: 'none' }}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            id="mobile-menu-btn"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .nav-links-desktop { display: none !important; }
          #mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </nav>
  );
}
