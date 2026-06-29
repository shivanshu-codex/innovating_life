import { useState } from 'react';
import { useToast } from '../../context/ToastContext';

const SENSITIVITY_OPTIONS = [
  { key: 'all', label: 'Show all stories', desc: 'See everything the community shares.' },
  { key: 'note', label: 'Show with a content note', desc: 'Sensitive stories show a note before the full text.' },
  { key: 'hide', label: 'Hide sensitive content', desc: 'Stories marked as heavy or triggering are hidden.' },
];

export default function WellbeingSettings() {
  const { addToast } = useToast();
  const [readLimit, setReadLimit] = useState('30');
  const [quietHours, setQuietHours] = useState(true);
  const [quietFrom, setQuietFrom] = useState('22:00');
  const [quietTo, setQuietTo] = useState('07:00');
  const [morningDigest, setMorningDigest] = useState(false);
  const [digestTime, setDigestTime] = useState('07:30');
  const [focusMode, setFocusMode] = useState(true);
  const [sensitivity, setSensitivity] = useState('note');

  const save = () => addToast({ message: 'Wellbeing settings saved 🌿', type: 'success', icon: '🌿' });

  const Row = ({ label, desc, control }) => (
    <div className="settings-row">
      <div className="settings-row-info">
        <div className="settings-row-label">{label}</div>
        {desc && <div className="settings-row-desc">{desc}</div>}
      </div>
      {control}
    </div>
  );

  const Toggle = ({ on, onToggle }) => (
    <button className={`toggle-switch${on ? ' is-on' : ''}`} onClick={onToggle} aria-pressed={on} />
  );

  return (
    <div>
      <div className="settings-section">
        <h2 className="settings-section-title">Your Wellbeing Settings</h2>
        <p className="settings-section-desc">
          These settings give you control over your emotional relationship with Lumina.
          No other platform offers this — we built it because your peace of mind matters.
        </p>

        <Row
          label="Reading time limit"
          desc="Remind you after reading for this long."
          control={
            <div style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'center' }}>
              <select className="settings-select" value={readLimit} onChange={(e) => setReadLimit(e.target.value)}>
                <option value="15">15 min</option>
                <option value="30">30 min</option>
                <option value="60">1 hour</option>
                <option value="0">No limit</option>
              </select>
            </div>
          }
        />

        <Row
          label="Quiet hours"
          desc={`Pause all notifications from ${quietFrom} to ${quietTo}.`}
          control={
            <div style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'center' }}>
              <input type="time" className="settings-select" value={quietFrom} onChange={(e) => setQuietFrom(e.target.value)} />
              <span className="t-meta">to</span>
              <input type="time" className="settings-select" value={quietTo} onChange={(e) => setQuietTo(e.target.value)} />
              <Toggle on={quietHours} onToggle={() => setQuietHours(!quietHours)} />
            </div>
          }
        />

        <Row
          label="Morning summary"
          desc="Instead of pings, one calm digest each morning."
          control={
            <div style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'center' }}>
              <input type="time" className="settings-select" value={digestTime} onChange={(e) => setDigestTime(e.target.value)} />
              <Toggle on={morningDigest} onToggle={() => setMorningDigest(!morningDigest)} />
            </div>
          }
        />

        <Row
          label="Focus mode"
          desc="While writing, hide all notifications."
          control={<Toggle on={focusMode} onToggle={() => setFocusMode(!focusMode)} />}
        />
      </div>

      <div className="settings-section">
        <h2 className="settings-section-title">Content sensitivity</h2>
        <p className="settings-section-desc">
          Some stories deal with heavy emotions. How would you like to handle this?
        </p>
        <div className="settings-radio-group">
          {SENSITIVITY_OPTIONS.map((opt) => (
            <button
              key={opt.key}
              className={`settings-radio-option${sensitivity === opt.key ? ' is-selected' : ''}`}
              onClick={() => setSensitivity(opt.key)}
            >
              <div className="settings-radio-dot" />
              <div>
                <div style={{ fontWeight: 'var(--weight-medium)', color: 'var(--text-primary)', fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)' }}>{opt.label}</div>
                <div style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-body)', fontSize: 'var(--text-xs)' }}>{opt.desc}</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <button className="btn btn-primary" onClick={save}>Save wellbeing settings</button>
    </div>
  );
}
