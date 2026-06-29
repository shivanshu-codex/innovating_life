import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';

export default function AccountSettings() {
  const { user } = useAuth();
  const { addToast } = useToast();
  const [form, setForm] = useState({ firstName: user?.firstName || '', lastName: user?.lastName || '', username: user?.username || '', email: user?.email || '' });

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  return (
    <div>
      <div className="settings-section">
        <h2 className="settings-section-title">Account</h2>
        <p className="settings-section-desc">Update your personal details. Your email is never shared.</p>

        {['firstName', 'lastName', 'username', 'email'].map((key) => (
          <div className="form-field" key={key}>
            <label className="form-label" style={{ textTransform: 'capitalize' }}>
              {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
            </label>
            <input
              className="form-input"
              type={key === 'email' ? 'email' : 'text'}
              value={form[key]}
              onChange={set(key)}
            />
          </div>
        ))}

        <button className="btn btn-primary" onClick={() => addToast({ message: 'Account updated ✓', type: 'success', icon: '✓' })}>
          Save changes
        </button>
      </div>

      <div className="settings-section" style={{ borderColor: 'var(--bloom-200)' }}>
        <h2 className="settings-section-title" style={{ color: 'var(--bloom-600)' }}>Danger zone</h2>
        <p className="settings-section-desc">These actions are permanent and cannot be undone.</p>
        <button className="btn btn-secondary btn-sm" style={{ borderColor: 'var(--bloom-300)', color: 'var(--bloom-600)' }}>
          Delete my account
        </button>
      </div>
    </div>
  );
}
