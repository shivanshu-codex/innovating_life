import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Leaf, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import LuminaBg from '../components/LuminaBg';
import ParticleCanvas from '../components/ParticleCanvas';

export default function LoginPage() {
  const { login } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      setError("You've left something empty — fill in both fields to continue.");
      return;
    }
    // Simulate login — in production, call your API here
    login({ firstName: 'Guest', lastName: '', username: form.email.split('@')[0], email: form.email });
    addToast({ message: 'Welcome back 🌿', type: 'success', icon: '🌿' });
    navigate('/feed');
  };

  return (
    <>
      <LuminaBg />
      <div className="auth-layout">
        <div className="auth-visual">
          <ParticleCanvas />
          <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
            <div className="auth-visual-quote">
              "The quietest conversations start with one hello."
            </div>
          </div>
          <div className="auth-visual-orb" style={{ width: 400, height: 400, background: 'radial-gradient(circle, var(--bloom-200), transparent 70%)', top: -100, right: -100 }} />
          <div className="auth-visual-orb" style={{ width: 300, height: 300, background: 'radial-gradient(circle, var(--sage-200), transparent 70%)', bottom: -80, left: -80 }} />
        </div>

        <div className="auth-form-panel">
          <div className="auth-form-inner">
            <div className="auth-logo">
              <Leaf size={22} color="var(--soul-500)" strokeWidth={1.5} />
              Lumina
            </div>
            <h1 className="t-section" style={{ marginBottom: 'var(--space-2)' }}>Welcome back.</h1>
            <p className="t-body" style={{ color: 'var(--text-secondary)', marginBottom: 'var(--space-8)' }}>
              Your stories are waiting.
            </p>

            <form onSubmit={handleSubmit}>
              {error && (
                <div style={{ background: 'var(--bloom-50)', border: '1px solid var(--bloom-200)', borderRadius: 'var(--radius-md)', padding: 'var(--space-3) var(--space-4)', marginBottom: 'var(--space-4)', color: 'var(--bloom-700)', fontSize: 'var(--text-sm)', fontFamily: 'var(--font-body)' }}>
                  {error}
                </div>
              )}
              <div className="form-field">
                <label className="form-label">Email</label>
                <input type="email" className="form-input" value={form.email} onChange={set('email')} placeholder="your@email.com" autoFocus />
              </div>
              <div className="form-field">
                <label className="form-label">Password</label>
                <div style={{ position: 'relative' }}>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className="form-input"
                    value={form.password}
                    onChange={set('password')}
                    placeholder="Something you'll remember"
                    style={{ paddingRight: 'var(--space-10)' }}
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ position: 'absolute', right: 'var(--space-3)', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}>
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
              <button type="submit" className="btn btn-primary" style={{ width: '100%', marginBottom: 'var(--space-4)' }}>
                Enter Lumina →
              </button>
            </form>

            <p className="t-meta" style={{ textAlign: 'center' }}>
              New here? <Link to="/auth/signup" style={{ color: 'var(--text-link)' }}>Join Lumina</Link>
            </p>
            <p className="t-meta" style={{ textAlign: 'center', marginTop: 'var(--space-2)' }}>
              <Link to="/auth/forgot" style={{ color: 'var(--text-muted)' }}>Forgot your password?</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
