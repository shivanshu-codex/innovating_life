const DELETION_CONFIRM_PHRASE = 'delete my account';

function buildDeletionModal({ onPause, onDelete }) {
  const overlay = document.createElement('div');
  overlay.id    = 'deletion-modal-overlay';
  overlay.style.cssText = `
    position:fixed;inset:0;z-index:10000;display:flex;align-items:center;
    justify-content:center;padding:16px;background:rgba(0,0,0,0.6);
    backdrop-filter:blur(6px);
  `;

  overlay.innerHTML = `
    <div style="background:white;border-radius:20px;padding:32px;max-width:420px;width:100%;box-shadow:0 24px 64px rgba(0,0,0,0.2);" role="dialog" aria-modal="true" aria-labelledby="deletion-title">
      <h2 id="deletion-title" style="font-size:1.2rem;font-weight:700;color:#111;margin:0 0 8px;">
        Before you go
      </h2>
      <p style="font-size:0.9rem;color:#64748B;margin:0 0 20px;line-height:1.6;">
        Your stories have been heard. Deleting your account permanently removes all your writing,
        messages, and profile data within 30 days. This can't be undone.
      </p>

      <div id="deletion-pause-option" style="background:#F0FDF4;border:1px solid #BBF7D0;border-radius:12px;padding:16px;margin-bottom:20px;">
        <p style="font-size:0.875rem;font-weight:600;color:#166534;margin:0 0 6px;">
          🌿 Not sure? You can pause instead.
        </p>
        <p style="font-size:0.8rem;color:#4B7C5A;margin:0 0 12px;line-height:1.5;">
          Pausing hides your profile and stories from everyone. Nothing is deleted.
          You can come back any time, exactly where you left off.
        </p>
        <button id="deletion-pause-btn" type="button" style="background:#16A34A;color:white;border:none;border-radius:8px;padding:8px 16px;font-size:0.85rem;font-weight:600;cursor:pointer;">
          Pause my account instead
        </button>
      </div>

      <p style="font-size:0.8rem;color:#9CA3AF;margin:0 0 8px;">
        To confirm deletion, type <strong style="color:#EF4444;">${DELETION_CONFIRM_PHRASE}</strong> below:
      </p>
      <input
        id="deletion-confirm-input"
        type="text"
        placeholder="${DELETION_CONFIRM_PHRASE}"
        autocomplete="off"
        style="width:100%;box-sizing:border-box;padding:10px 12px;border:1.5px solid #E2E8F0;border-radius:8px;font-size:0.875rem;margin-bottom:16px;font-family:inherit;"
      />
      <div style="display:flex;gap:10px;justify-content:flex-end;">
        <button id="deletion-cancel-btn" type="button" style="padding:8px 18px;border:1.5px solid #E2E8F0;border-radius:8px;background:transparent;font-size:0.875rem;font-weight:600;cursor:pointer;color:#64748B;">
          Keep my account
        </button>
        <button id="deletion-confirm-btn" type="button" disabled style="padding:8px 18px;border:none;border-radius:8px;background:#EF4444;color:white;font-size:0.875rem;font-weight:600;cursor:not-allowed;opacity:0.5;transition:all 0.15s;">
          Delete permanently
        </button>
      </div>
    </div>
  `;

  document.body.appendChild(overlay);
  document.body.style.overflow = 'hidden';

  const input      = overlay.querySelector('#deletion-confirm-input');
  const confirmBtn = overlay.querySelector('#deletion-confirm-btn');
  const cancelBtn  = overlay.querySelector('#deletion-cancel-btn');
  const pauseBtn   = overlay.querySelector('#deletion-pause-btn');

  const close = () => {
    overlay.remove();
    document.body.style.overflow = '';
  };

  input.addEventListener('input', () => {
    const match = input.value.trim().toLowerCase() === DELETION_CONFIRM_PHRASE;
    confirmBtn.disabled            = !match;
    confirmBtn.style.opacity       = match ? '1' : '0.5';
    confirmBtn.style.cursor        = match ? 'pointer' : 'not-allowed';
    confirmBtn.style.background    = match ? '#DC2626' : '#EF4444';
  });

  cancelBtn.addEventListener('click', close);

  pauseBtn.addEventListener('click', () => {
    close();
    if (onPause) onPause();
  });

  confirmBtn.addEventListener('click', () => {
    if (input.value.trim().toLowerCase() !== DELETION_CONFIRM_PHRASE) return;
    close();
    if (onDelete) onDelete();
  });

  return overlay;
}

export function openDeletionFlow({ onPause, onDelete }) {
  buildDeletionModal({ onPause, onDelete });
}

export function initAccountDeletion(showToast) {
  const trigger = document.getElementById('delete-account-trigger');
  if (!trigger) return;

  trigger.addEventListener('click', () => {
    openDeletionFlow({
      onPause: () => {
        if (showToast) showToast('Your account is paused. We\'ll be here when you\'re ready.');
        fetch('/api/account/pause', { method: 'POST', credentials: 'include' }).catch(() => {});
      },
      onDelete: () => {
        fetch('/api/account/delete', { method: 'DELETE', credentials: 'include' })
          .then(() => { window.location.href = '/goodbye'; })
          .catch(() => { if (showToast) showToast('Something went wrong. Please try again or contact support.'); });
      },
    });
  });
}
