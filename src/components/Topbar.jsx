import { useEffect, useRef } from 'react';
import { Search, Bell, Settings } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Topbar({ title }) {
  const topbarRef = useRef(null);
  const { user } = useAuth();

  useEffect(() => {
    const el = topbarRef.current;
    if (!el) return;
    let lastY = window.scrollY;

    const onScroll = () => {
      const y = window.scrollY;
      el.classList.toggle('is-scrolled', y > 10);
      if (window.innerWidth < 768) {
        if (y > lastY && y > 100) el.classList.add('is-hidden');
        else el.classList.remove('is-hidden');
      } else {
        el.classList.remove('is-hidden');
      }
      lastY = y;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className="topbar" ref={topbarRef}>
      {title && <h1 className="topbar-title">{title}</h1>}

      <div className="topbar-search">
        <Search size={16} className="topbar-search-icon" strokeWidth={1.5} />
        <input type="search" placeholder="Search stories, people, topics..." aria-label="Search" />
      </div>

      <div className="topbar-actions">
        {user && (
          <NavLink to="/notifications" className="btn btn-icon btn-ghost" aria-label="Notifications" style={{ position: 'relative' }}>
            <Bell size={18} strokeWidth={1.5} />
            <span style={{
              position: 'absolute', top: 8, right: 8,
              width: 7, height: 7, borderRadius: '50%',
              background: 'var(--soul-400)',
              border: '1.5px solid var(--surface-page)',
            }} />
          </NavLink>
        )}
        <NavLink to="/settings/appearance" className="btn btn-icon btn-ghost" aria-label="Settings">
          <Settings size={18} strokeWidth={1.5} />
        </NavLink>
        {user && (
          <NavLink to="/profile" aria-label="Profile">
            <div className="avatar avatar-sm avatar-initials" style={{ fontSize: '0.65rem', cursor: 'pointer' }}>
              {user.firstName?.[0]}{user.lastName?.[0] || ''}
            </div>
          </NavLink>
        )}
        {!user && (
          <NavLink to="/auth/login" className="btn btn-primary btn-sm">
            Sign in
          </NavLink>
        )}
      </div>
    </header>
  );
}
