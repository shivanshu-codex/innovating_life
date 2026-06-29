import { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { User, Palette, Lock, Heart } from 'lucide-react';
import Topbar from '../components/Topbar';

const NAV = [
  { to: '/settings/account',    label: 'Account',    icon: User },
  { to: '/settings/appearance', label: 'Appearance',  icon: Palette },
  { to: '/settings/privacy',    label: 'Privacy',     icon: Lock },
  { to: '/settings/wellbeing',  label: 'Wellbeing',   icon: Heart },
];

export default function SettingsPage() {
  return (
    <>
      <Topbar title="Settings" />
      <div className="settings-layout">
        <nav style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1)' }}>
          {NAV.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) => `settings-nav-item${isActive ? ' is-active' : ''}`}
            >
              <Icon size={18} strokeWidth={1.5} />
              {label}
            </NavLink>
          ))}
        </nav>
        <div>
          <Outlet />
        </div>
      </div>
    </>
  );
}
