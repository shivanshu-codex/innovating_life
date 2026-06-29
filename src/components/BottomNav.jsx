import { NavLink } from 'react-router-dom';
import { Home, Compass, PenLine, Bell, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function BottomNav() {
  const { user } = useAuth();

  return (
    <nav className="bottom-nav" aria-label="Mobile navigation">
      <div className="bottom-nav-inner">
        <NavLink
          to={user ? '/feed' : '/'}
          className={({ isActive }) => `bottom-nav-item${isActive ? ' is-active' : ''}`}
        >
          <Home size={22} strokeWidth={1.5} />
          Home
        </NavLink>

        <NavLink
          to="/explore"
          className={({ isActive }) => `bottom-nav-item${isActive ? ' is-active' : ''}`}
        >
          <Compass size={22} strokeWidth={1.5} />
          Explore
        </NavLink>

        <NavLink
          to="/write"
          className="bottom-nav-item bottom-nav-write"
          aria-label="Write a story"
        >
          <PenLine size={22} strokeWidth={2} />
        </NavLink>

        <NavLink
          to="/notifications"
          className={({ isActive }) => `bottom-nav-item${isActive ? ' is-active' : ''}`}
        >
          <Bell size={22} strokeWidth={1.5} />
          Alerts
        </NavLink>

        <NavLink
          to={user ? '/profile' : '/auth/login'}
          className={({ isActive }) => `bottom-nav-item${isActive ? ' is-active' : ''}`}
        >
          <User size={22} strokeWidth={1.5} />
          {user ? 'Profile' : 'Sign in'}
        </NavLink>
      </div>
    </nav>
  );
}
