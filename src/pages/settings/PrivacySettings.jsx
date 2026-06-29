import { useState } from 'react';
import { useToast } from '../../context/ToastContext';

export default function PrivacySettings() {
  const { addToast } = useToast();
  const [publicProfile, setPublicProfile] = useState(true);
  const [allowMessages, setAllowMessages] = useState(true);
  const [showInSearch, setShowInSearch] = useState(true);

  const Toggle = ({ on, onToggle }) => (
    <button className={`toggle-switch${on ? ' is-on' : ''}`} onClick={onToggle} aria-pressed={on} />
  );

  return (
    <div>
      <div className="settings-section">
        <h2 className="settings-section-title">Privacy</h2>
        <p className="settings-section-desc">
          Your story, your rules. Control who can see you and reach you.
        </p>

        <div className="settings-row">
          <div className="settings-row-info">
            <div className="settings-row-label">Public profile</div>
            <div className="settings-row-desc">Anyone can see your stories and bio.</div>
          </div>
          <Toggle on={publicProfile} onToggle={() => setPublicProfile(!publicProfile)} />
        </div>

        <div className="settings-row">
          <div className="settings-row-info">
            <div className="settings-row-label">Allow messages</div>
            <div className="settings-row-desc">People who follow you can send you messages.</div>
          </div>
          <Toggle on={allowMessages} onToggle={() => setAllowMessages(!allowMessages)} />
        </div>

        <div className="settings-row">
          <div className="settings-row-info">
            <div className="settings-row-label">Appear in search</div>
            <div className="settings-row-desc">Your username shows in community search.</div>
          </div>
          <Toggle on={showInSearch} onToggle={() => setShowInSearch(!showInSearch)} />
        </div>
      </div>
      <button className="btn btn-primary" onClick={() => addToast({ message: 'Privacy settings saved ✓', type: 'success' })}>
        Save changes
      </button>
    </div>
  );
}
