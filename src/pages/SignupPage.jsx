import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Leaf, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import LuminaBg from '../components/LuminaBg';
import ParticleCanvas from '../components/ParticleCanvas';

const TOPICS = ['Growth', 'Joy', 'Grief', 'Love', 'Purpose', 'Mindfulness', 'Wisdom', 'Healing', 'Connection', 'Peace'];
const MOODS = [
  { key: 'calm',   emoji: '☀️', label: 'Calm' },
  { key: 'bloom',  emoji: '🌸', label: 'Bloom' },
  { key: 'forest', emoji: '🌿', label: 'Forest' },
  { key: 'dusk',   emoji: '🌙', label: 'Dusk' },
  { key: 'ocean',  emoji: '🌊', label: 'Ocean' },
];

export default function SignupPage() {
  const { login } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [selectedMood, setSelectedMood] = useState('calm');
  const [form, setForm] = useState({ firstName: '', lastName: '', username: '', email: '', password: '' });
  const [errors, setErrors] = useState({});

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const validateStep1 = () => {
    const errs = {};
    if (!form.firstName.trim()) errs.firstName = 'Tell us your name to continue';
    if (!form.username.trim()) errs.username = 'Pick a username to continue';
    else if (form.username.length < 3) errs.username = 'A little longer — 3 characters minimum';
    setErrors(errs);
    return !Object.keys(errs).length;
  };

  const validateStep2 = () => {
    const errs = {};
    if (!form.email.trim() || !form.email.includes('@')) errs.email = "That email doesn't look quite right — try once more?";
    if (!form.password) errs.password = 'A little longer — 8 characters minimum';
    else if (form.password.length < 8) errs.password = 'A little longer — 8 characters minimum';
    setErrors(errs);
    return !Object.keys(errs).length;
  };

  const handleStep1 = () => { if (validateStep1()) setStep(2); };
  const handleStep2 = () => { if (validateStep2()) setStep(3); };

  const handleFinish = () => {
    document.documentElement.setAttribute('data-mood', selectedMood);
    localStorage.setItem('lumina_mood', selectedMood);
    login({ ...form, topics: selectedTopics, mood: selectedMood });
    addToast({ message: `Welcome to Lumina, ${form.firstName} 🌿`, type: 'success', icon: '🌿' });
    navigate('/feed');
  };

  const toggleTopic = (t) => {
    setSelectedTopics((prev) =>
      prev.includes(t) ? prev.filter((x) => x !== t) : prev.length < 5 ? [...prev, t] : prev
    );
  };

  return (
    <>
      <LuminaBg />
      <div className="auth-layout">
        {/* Visual panel */}
        <div className="auth-visual">
          <ParticleCanvas />
          <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
            <div className="auth-visual-quote">
              "Your story doesn't need to be perfect. It just needs to be yours."
            </div>
            <div className="t-meta" style={{ color: 'var(--stone-600)' }}>— The Lumina Community</div>
          </div>
          <div className="auth-visual-orb" style={{ width: 400, height: 400, background: 'radial-gradient(circle, var(--soul-200), transparent 70%)', top: -100, left: -100 }} />
          <div className="auth-visual-orb" style={{ width: 300, height: 300, background: 'radial-gradient(circle, var(--dusk-200), transparent 70%)', bottom: -80, right: -80 }} />
        </div>

        {/* Form panel */}
        <div className="auth-form-panel">
          <div className="auth-form-inner">
            <div className="auth-logo">
              <Leaf size={22} color="var(--soul-500)" strokeWidth={1.5} />
              Lumina
            </div>

            {/* Step dots */}
            <div className="auth-steps">
              {[1, 2, 3].map((s) => (
                <div
                  key={s}
                  className={`auth-step-dot${step === s ? ' is-active' : step > s ? ' is-done' : ''}`}
                />
              ))}
            </div>

            {/* Step 1 */}
            {step === 1 && (
              <>
                <h1 className="t-section" style={{ marginBottom: 'var(--space-2)' }}>What shall we call you?</h1>
                <p className="t-body" style={{ color: 'var(--text-secondary)', marginBottom: 'var(--space-6)' }}>
                  This is how your stories will be signed.
                </p>
                <div className="form-field">
                  <label className="form-label">First name</label>
                  <input className={`form-input${errors.firstName ? ' has-error' : ''}`} value={form.firstName} onChange={set('firstName')} placeholder="Your first name" autoFocus />
                  {errors.firstName && <span className="form-error">{errors.firstName}</span>}
                </div>
                <div className="form-field">
                  <label className="form-label">Last name (optional)</label>
                  <input className="form-input" value={form.lastName} onChange={set('lastName')} placeholder="Last name" />
                </div>
                <div className="form-field">
                  <label className="form-label">Username</label>
                  <input className={`form-input${errors.username ? ' has-error' : ''}`} value={form.username} onChange={set('username')} placeholder="@yourhandle" />
                  {errors.username && <span className="form-error">{errors.username}</span>}
                </div>
                <button className="btn btn-primary" style={{ width: '100%' }} onClick={handleStep1}>
                  Continue →
                </button>
                <p className="t-meta" style={{ textAlign: 'center', marginTop: 'var(--space-4)' }}>
                  Already here? <Link to="/auth/login" style={{ color: 'var(--text-link)' }}>Sign in</Link>
                </p>
              </>
            )}

            {/* Step 2 */}
            {step === 2 && (
              <>
                <h1 className="t-section" style={{ marginBottom: 'var(--space-2)' }}>Keep your space safe.</h1>
                <p className="t-body" style={{ color: 'var(--text-secondary)', marginBottom: 'var(--space-6)' }}>
                  Just an email and password — nothing else.
                </p>
                <div className="form-field">
                  <label className="form-label">Email</label>
                  <input type="email" className={`form-input${errors.email ? ' has-error' : ''}`} value={form.email} onChange={set('email')} placeholder="you@example.com" autoFocus />
                  {errors.email && <span className="form-error">{errors.email}</span>}
                </div>
                <div className="form-field">
                  <label className="form-label">Password</label>
                  <div style={{ position: 'relative' }}>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      className={`form-input${errors.password ? ' has-error' : ''}`}
                      value={form.password}
                      onChange={set('password')}
                      placeholder="8+ characters"
                      style={{ paddingRight: 'var(--space-10)' }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      style={{ position: 'absolute', right: 'var(--space-3)', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                  {errors.password && <span className="form-error">{errors.password}</span>}
                </div>
                <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
                  <button className="btn btn-secondary" style={{ flex: 1 }} onClick={() => setStep(1)}>← Back</button>
                  <button className="btn btn-primary" style={{ flex: 2 }} onClick={handleStep2}>Create account →</button>
                </div>
              </>
            )}

            {/* Step 3 */}
            {step === 3 && (
              <>
                <h1 className="t-section" style={{ marginBottom: 'var(--space-2)' }}>Make it feel like yours.</h1>
                <p className="t-body" style={{ color: 'var(--text-secondary)', marginBottom: 'var(--space-6)' }}>
                  These aren't permanent. Change them any time in settings.
                </p>
                <p className="form-label" style={{ marginBottom: 'var(--space-3)' }}>Choose your colour mood</p>
                <div className="auth-chip-grid" style={{ marginBottom: 'var(--space-6)' }}>
                  {MOODS.map((m) => (
                    <button
                      key={m.key}
                      className={`auth-chip${selectedMood === m.key ? ' is-selected' : ''}`}
                      onClick={() => setSelectedMood(m.key)}
                    >
                      {m.emoji} {m.label}
                    </button>
                  ))}
                </div>
                <p className="form-label" style={{ marginBottom: 'var(--space-3)' }}>What brings you here? Pick what resonates. <span className="t-meta">(up to 5)</span></p>
                <div className="auth-chip-grid">
                  {TOPICS.map((t) => (
                    <button
                      key={t}
                      className={`auth-chip${selectedTopics.includes(t) ? ' is-selected' : ''}`}
                      onClick={() => toggleTopic(t)}
                    >
                      {t}
                    </button>
                  ))}
                </div>
                <button className="btn btn-primary" style={{ width: '100%', marginTop: 'var(--space-6)' }} onClick={handleFinish}>
                  Enter Lumina →
                </button>
                <button className="btn btn-ghost" style={{ width: '100%', marginTop: 'var(--space-2)' }} onClick={handleFinish}>
                  Skip for now →
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
