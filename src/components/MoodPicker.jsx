import { useMood } from '../hooks/useMood';

const MOOD_META = [
  { key: 'calm',   label: 'Calm',   emoji: '☀️',  desc: 'Warm amber gold' },
  { key: 'bloom',  label: 'Bloom',  emoji: '🌸',  desc: 'Soft rose pink' },
  { key: 'forest', label: 'Forest', emoji: '🌿',  desc: 'Sage green' },
  { key: 'dusk',   label: 'Dusk',   emoji: '🌙',  desc: 'Lavender purple' },
  { key: 'ocean',  label: 'Ocean',  emoji: '🌊',  desc: 'Teal blue' },
];

export default function MoodPicker({ onClose }) {
  const { mood, setMood } = useMood();

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 200,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--surface-overlay)',
        backdropFilter: 'blur(8px)',
      }}
      onClick={onClose}
    >
      <div
        className="card card--thought"
        style={{ maxWidth: '420px', width: '90%' }}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="t-section" style={{ marginBottom: 'var(--space-2)' }}>
          Choose your mood
        </h2>
        <p className="t-body" style={{ marginBottom: 'var(--space-6)', color: 'var(--text-secondary)' }}>
          Your chosen palette shapes how Lumina feels today.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
          {MOOD_META.map((m) => (
            <button
              key={m.key}
              onClick={() => { setMood(m.key); onClose(); }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-4)',
                padding: 'var(--space-4)',
                borderRadius: 'var(--radius-md)',
                border: mood === m.key
                  ? '2px solid var(--soul-400)'
                  : '1.5px solid var(--border-soft)',
                background: mood === m.key ? 'var(--soul-50)' : 'transparent',
                cursor: 'pointer',
                transition: 'all var(--dur-fast) var(--ease-spring)',
                textAlign: 'left',
                width: '100%',
              }}
            >
              <span style={{ fontSize: '1.75rem', lineHeight: 1 }}>{m.emoji}</span>
              <div>
                <div className="t-label" style={{ color: 'var(--text-primary)' }}>{m.label}</div>
                <div className="t-meta">{m.desc}</div>
              </div>
              {mood === m.key && (
                <span style={{ marginLeft: 'auto', color: 'var(--soul-500)', fontWeight: 600, fontSize: 'var(--text-sm)' }}>
                  Active
                </span>
              )}
            </button>
          ))}
        </div>
        <button
          className="btn btn-ghost"
          onClick={onClose}
          style={{ marginTop: 'var(--space-6)', width: '100%' }}
        >
          Close
        </button>
      </div>
    </div>
  );
}
