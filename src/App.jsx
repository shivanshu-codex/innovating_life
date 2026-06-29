import { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { applyIndexingRule } from './js/seo/indexing-rules';
import './styles/main.css';

import { AuthProvider, useAuth } from './context/AuthContext';
import { ToastProvider }         from './context/ToastContext';
import { useMood }               from './hooks/useMood';
import AppShell                  from './components/AppShell';

// ── Route-level code splitting ─────────────────────────────────
// Each lazy() call becomes its own JS chunk.
// Vite only ships a chunk when that route is first visited.
const LandingPage        = lazy(() => import('./pages/LandingPage'));
const SignupPage         = lazy(() => import('./pages/SignupPage'));
const LoginPage          = lazy(() => import('./pages/LoginPage'));
const FeedPage           = lazy(() => import('./pages/FeedPage'));
const ExplorePage        = lazy(() => import('./pages/ExplorePage'));
const WritePage          = lazy(() => import('./pages/WritePage'));
const StoryPage          = lazy(() => import('./pages/StoryPage'));
const MessagesPage       = lazy(() => import('./pages/MessagesPage'));
const NotificationsPage  = lazy(() => import('./pages/NotificationsPage'));
const ProfilePage        = lazy(() => import('./pages/ProfilePage'));
const SettingsPage       = lazy(() => import('./pages/SettingsPage'));
const AccountSettings    = lazy(() => import('./pages/settings/AccountSettings'));
const AppearanceSettings = lazy(() => import('./pages/settings/AppearanceSettings'));
const WellbeingSettings  = lazy(() => import('./pages/settings/WellbeingSettings'));
const PrivacySettings    = lazy(() => import('./pages/settings/PrivacySettings'));

// Minimal skeleton shown while any lazy chunk is loading
function PageSkeleton() {
  return (
    <div
      aria-hidden="true"
      style={{
        minHeight: '100vh',
        background: 'var(--surface-page)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div className="skeleton" style={{ width: 48, height: 48, borderRadius: '50%' }} />
    </div>
  );
}

function MoodInit() {
  useMood();
  return null;
}

function SEOGuard() {
  const { pathname } = useLocation();
  useEffect(() => { applyIndexingRule(pathname); }, [pathname]);
  return null;
}

function PrivateRoute({ children }) {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? children : <Navigate to="/auth/login" replace />;
}

function AppRoutes() {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <Routes>
        {/* Public standalone pages */}
        <Route path="/"            element={<LandingPage />} />
        <Route path="/auth/signup" element={<SignupPage />} />
        <Route path="/auth/login"  element={<LoginPage />} />

        {/* App shell wraps all nav-bearing pages */}
        <Route element={<AppShell />}>
          <Route path="/explore"     element={<ExplorePage />} />
          <Route path="/story/:slug" element={<StoryPage />} />

          {/* Private routes */}
          <Route path="/feed"          element={<PrivateRoute><FeedPage /></PrivateRoute>} />
          <Route path="/write"         element={<PrivateRoute><WritePage /></PrivateRoute>} />
          <Route path="/messages"      element={<PrivateRoute><MessagesPage /></PrivateRoute>} />
          <Route path="/notifications" element={<PrivateRoute><NotificationsPage /></PrivateRoute>} />
          <Route path="/profile"       element={<PrivateRoute><ProfilePage /></PrivateRoute>} />
          <Route path="/saved"         element={<PrivateRoute><ExplorePage /></PrivateRoute>} />

          <Route path="/settings" element={<PrivateRoute><SettingsPage /></PrivateRoute>}>
            <Route index element={<Navigate to="/settings/account" replace />} />
            <Route path="account"    element={<AccountSettings />} />
            <Route path="appearance" element={<AppearanceSettings />} />
            <Route path="privacy"    element={<PrivacySettings />} />
            <Route path="wellbeing"  element={<WellbeingSettings />} />
          </Route>

          <Route path="/topic/:slug" element={<ExplorePage />} />
          <Route path="*"            element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ToastProvider>
          <MoodInit />
          <SEOGuard />
          <AppRoutes />
        </ToastProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
