import { NavLink, useNavigate } from 'react-router-dom';
import {
  Leaf, Home, Compass, PenLine, Bell, MessageSquare,
  Bookmark, TrendingUp, Heart, BookOpen, Smile, Feather, Star
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const TOPICS = [
  { label: 'Growth',      icon: TrendingUp, slug: 'growth' },
  { label: 'Joy',         icon: Smile,      slug: 'joy' },
  { label: 'Love',        icon: Heart,      slug: 'love' },
  { label: 'Mindfulness', icon: Feather,    slug: 'mindfulness' },
  { label: 'Purpose',     icon: Star,       slug: 'purpose' },
  { label: 'Stories',     icon: BookOpen,   slug: 'stories' },
];

export default function Sidebar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const navItem = (to, Icon, label, badge) => (
    <NavLink
      to={to}
      className={({ isActive }) => `sidebar-nav-item${isActive ? ' is-active' : ''}`}
    >
      <Icon size={20} strokeWidth={1.5} />
      <span className="nav-label">{label}</span>
      {badge && <span className="sidebar-badge">{badge}</span>}
    </NavLink>
  );

  return (
    <aside className="sidebar">
      {/* Logo */}
      <NavLink to={user ? '/feed' : '/'} className="sidebar-logo">
        <Leaf size={22} color="var(--soul-500)" strokeWidth={1.5} />
        <span className="logo-text">Lumina</span>
      </NavLink>

      <nav className="sidebar-nav">
        {navItem(user ? '/feed' : '/', Home, 'Home')}
        {navItem('/explore', Compass, 'Explore')}
        {navItem('/write', PenLine, 'Write')}
        {user && navItem('/notifications', Bell, 'Notifications', 3)}
        {user && navItem('/messages', MessageSquare, 'Messages', 1)}
        {user && navItem('/saved', Bookmark, 'Saved')}

        <div className="sidebar-divider" />
        <div className="sidebar-section-label">Topics</div>

        {TOPICS.map(({ label, icon: Icon, slug }) => (
          <NavLink
            key={slug}
            to={`/topic/${slug}`}
            className={({ isActive }) => `sidebar-nav-item${isActive ? ' is-active' : ''}`}
          >
            <Icon size={18} strokeWidth={1.5} />
            <span className="nav-label">{label}</span>
          </NavLink>
        ))}
      </nav>

      {/* User footer */}
      {user ? (
        <div className="sidebar-divider" style={{ marginTop: 'var(--space-4)' }} />
      ) : null}
      {user ? (
        <div
          className="sidebar-user"
          onClick={() => navigate('/profile')}
          title="Your profile"
        >
          <div
            className="avatar avatar-sm avatar-initials"
            style={{ fontSize: '0.7rem', width: 32, height: 32 }}
          >
            {user.firstName?.[0]}{user.lastName?.[0] || ''}
          </div>
          <div className="sidebar-user-info">
            <div className="sidebar-user-name">{user.firstName} {user.lastName}</div>
            <div className="sidebar-user-handle">@{user.username}</div>
          </div>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', marginTop: 'auto', paddingTop: 'var(--space-4)' }}>
          <NavLink to="/auth/login" className="btn btn-secondary" style={{ textAlign: 'center', justifyContent: 'center' }}>
            Sign in
          </NavLink>
          <NavLink to="/auth/signup" className="btn btn-primary" style={{ textAlign: 'center', justifyContent: 'center' }}>
            Join Lumina
          </NavLink>
        </div>
      )}
    </aside>
  );
}
