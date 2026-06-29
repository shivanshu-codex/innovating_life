import { useMood } from '../../hooks/useMood';
import { useToast } from '../../context/ToastContext';

const MOOD_META = [
  { key: 'calm',   label: 'Calm',   emoji: '☀️',  desc: 'Warm amber gold — the default' },
  { key: 'bloom',  label: 'Bloom',  emoji: '🌸',  desc: 'Soft rose pink' },
  { key: 'forest', label: 'Forest', emoji: '🌿',  desc: 'Sage forest green' },
  { key: 'dusk',   label: 'Dusk',   emoji: '🌙',  desc: 'Lavender purple' },
  { key: 'ocean',  label: 'Ocean',  emoji: '🌊',  desc: 'Teal ocean blue' },
];

export default function AppearanceSettings() {
  const { mood, setMood } = useMood();
  const { addToast } = useToast();

  return (
    <div>
      <div className="settings-section">
        <h2 className="settings-section-title">Appearance</h2>
        <p className="settings-section-desc">Customise how Lumina feels. Your choices are saved locally.</p>

        <h3 className="t-label" style={{ color: 'var(--text-primary)', marginBottom: 'var(--space-4)' }}>Mood theme</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', marginBottom: 'var(--space-8)' }}>
          {MOOD_META.map((m) => (
            <button
              key={m.key}
              onClick={() => { setMood(m.key); addToast({ message: `${m.emoji} Switched to ${m.label} mood`, type: 'info' }); }}
              className={`settings-radio-option${mood === m.key ? ' is-selected' : ''}`}
            >
              <span style={{ fontSize: '1.4rem', lineHeight: 1 }}>{m.emoji}</span>
              <div>
                <div style={{ fontWeight: 'var(--weight-medium)', color: 'var(--text-primary)', fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)' }}>{m.label}</div>
                <div style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-body)', fontSize: 'var(--text-xs)' }}>{m.desc}</div>
              </div>
              {mood === m.key && (
                <span style={{ marginLeft: 'auto', color: 'var(--soul-500)', fontSize: 'var(--text-xs)', fontWeight: 'var(--weight-semibold)', fontFamily: 'var(--font-body)' }}>
                  Active ✓
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
