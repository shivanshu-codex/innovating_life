async function getUserPref(key) {
  try { return JSON.parse(localStorage.getItem(`lumina_pref_${key}`) ?? 'null'); } catch { return null; }
}

async function setUserPref(key, value) {
  try { localStorage.setItem(`lumina_pref_${key}`, JSON.stringify(value)); } catch {}
}

function showToast(message) {
  window.dispatchEvent(new CustomEvent('lumina:toast', { detail: { message } }));
}

export async function requestPushPermission({ trigger = 'first_resonance' } = {}) {
  if (!('Notification' in window)) return;
  if (Notification.permission !== 'default') return;

  const dismissed = await getUserPref('push_dismissed');
  if (dismissed) return;

  const agreed = await showSoftPrompt(trigger);
  if (!agreed) {
    await setUserPref('push_dismissed', true);
    return;
  }

  const permission = await Notification.requestPermission();
  if (permission === 'granted') {
    await subscribeToPush();
    showToast('You\'ll hear when your words reach someone. ✦');
  }
}

async function showSoftPrompt(trigger) {
  return new Promise((resolve) => {
    const copy = {
      first_resonance: {
        title: 'Someone just resonated with your words',
        body:  'Would you like to hear when your writing reaches people?',
        yes:   'Yes, let me know',
        no:    'Not right now',
      },
      after_publish: {
        title: 'Your story is out there',
        body:  'Want to know when someone connects with it?',
        yes:   'Yes, tell me',
        no:    'Maybe later',
      },
    };

    const c = copy[trigger] || copy.first_resonance;

    const toast = document.createElement('div');
    toast.style.cssText = `
      position:fixed; bottom:calc(var(--bottom-nav-height, 72px) + var(--space-4, 16px));
      left:50%; transform:translateX(-50%);
      max-width:360px; width:calc(100% - 32px);
      background:white; border-radius:var(--radius-xl, 16px);
      padding:var(--space-5, 20px); box-shadow:var(--shadow-xl);
      border:1px solid var(--soul-200); z-index:9998;
    `;
    toast.innerHTML = `
      <p style="font-size:var(--text-sm);font-weight:700;color:var(--stone-900);
                margin-bottom:var(--space-1);">${c.title}</p>
      <p style="font-size:var(--text-sm);color:var(--stone-500);margin-bottom:var(--space-4);
                line-height:1.5;">${c.body}</p>
      <div style="display:flex;gap:var(--space-2);">
        <button id="push-yes" class="btn btn-primary" style="flex:1;">${c.yes}</button>
        <button id="push-no"  class="btn btn-ghost">${c.no}</button>
      </div>
    `;

    document.body.appendChild(toast);
    document.getElementById('push-yes').addEventListener('click', () => { toast.remove(); resolve(true);  });
    document.getElementById('push-no').addEventListener('click',  () => { toast.remove(); resolve(false); });
  });
}

async function subscribeToPush() {
  try {
    const reg = await navigator.serviceWorker.ready;
    const sub = await reg.pushManager.subscribe({
      userVisibleOnly:      true,
      applicationServerKey: await getVapidPublicKey(),
    });
    await fetch('/api/push/subscribe', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify(sub),
    });
  } catch {}
}

async function getVapidPublicKey() {
  const res  = await fetch('/api/push/vapid-key');
  const data = await res.json();
  return urlBase64ToUint8Array(data.publicKey);
}

function urlBase64ToUint8Array(base64String) {
  const padding   = '='.repeat((4 - base64String.length % 4) % 4);
  const base64    = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const rawData   = window.atob(base64);
  const outputArr = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) outputArr[i] = rawData.charCodeAt(i);
  return outputArr;
}
