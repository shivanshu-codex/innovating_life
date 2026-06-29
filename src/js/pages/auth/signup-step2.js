function showToast(message) {
  window.dispatchEvent(new CustomEvent('lumina:toast', { detail: { message } }));
}

export function renderStep2(container, { onNext, onGoogleSignIn }) {
  container.innerHTML = `
    <div class="auth-step" data-step="2">
      <h2 class="auth-step__title">Create your account</h2>
      <p class="auth-step__sub">Free forever. No credit card.</p>

      <button class="btn--google" id="google-signin" type="button">
        <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
          <path fill="#4285F4" d="M16.51 8H8.98v3h4.3c-.18 1-.74 1.48-1.6 2.04v2.01h2.6a7.8 7.8 0 002.38-5.88c0-.57-.05-.66-.15-1.18z"/>
          <path fill="#34A853" d="M8.98 17c2.16 0 3.97-.72 5.3-1.94l-2.6-2a4.8 4.8 0 01-7.18-2.54H1.83v2.07A8 8 0 008.98 17z"/>
          <path fill="#FBBC05" d="M4.5 10.52a4.8 4.8 0 010-3.04V5.41H1.83a8 8 0 000 7.18l2.67-2.07z"/>
          <path fill="#EA4335" d="M8.98 4.18c1.17 0 2.23.4 3.06 1.2l2.3-2.3A8 8 0 001.83 5.4L4.5 7.49a4.77 4.77 0 014.48-3.31z"/>
        </svg>
        Continue with Google
      </button>

      <div class="auth-divider">
        <span class="auth-divider__line"></span>
        <span class="auth-divider__text">or</span>
        <span class="auth-divider__line"></span>
      </div>

      <form class="auth-form" id="signup-form" novalidate>
        <div class="field-group">
          <label class="field-label" for="signup-email">Email address</label>
          <input
            class="field-input"
            type="email"
            id="signup-email"
            name="email"
            placeholder="you@example.com"
            autocomplete="email"
            inputmode="email"
            required
          />
          <span class="field-error" id="email-error" role="alert" aria-live="polite"></span>
        </div>

        <div class="field-group">
          <label class="field-label" for="signup-password">Password</label>
          <div class="field-password-wrap">
            <input
              class="field-input"
              type="password"
              id="signup-password"
              name="password"
              placeholder="At least 8 characters"
              autocomplete="new-password"
              minlength="8"
              required
            />
            <button type="button" class="field-password-toggle" id="pw-toggle"
                    aria-label="Show password">👁</button>
          </div>
          <span class="field-error" id="pw-error" role="alert" aria-live="polite"></span>
        </div>

        <p class="auth-privacy-note">
          We'll never sell your data or spam you.
          <a href="/privacy" target="_blank">Privacy policy →</a>
        </p>

        <button class="btn btn-primary auth-step__next" type="submit" id="step2-next">
          Create account →
        </button>
      </form>

      <p class="auth-terms-note">
        By creating an account you agree to our
        <a href="/terms" target="_blank">Terms</a> and
        <a href="/guidelines" target="_blank">Community Guidelines</a>.
      </p>
    </div>
  `;

  document.getElementById('google-signin').addEventListener('click', onGoogleSignIn);

  const pwInput  = document.getElementById('signup-password');
  const pwToggle = document.getElementById('pw-toggle');
  pwToggle.addEventListener('click', () => {
    const isHidden = pwInput.type === 'password';
    pwInput.type   = isHidden ? 'text' : 'password';
    pwToggle.setAttribute('aria-label', isHidden ? 'Hide password' : 'Show password');
  });

  const emailInput = document.getElementById('signup-email');
  const emailError = document.getElementById('email-error');
  emailInput.addEventListener('blur', () => {
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value.trim());
    emailError.textContent = valid || !emailInput.value ? '' : 'Please enter a valid email address.';
  });

  document.getElementById('signup-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email    = emailInput.value.trim();
    const password = pwInput.value;
    const btn      = document.getElementById('step2-next');

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      emailError.textContent = 'Please enter a valid email address.';
      emailInput.focus();
      return;
    }
    if (password.length < 8) {
      document.getElementById('pw-error').textContent = 'Password needs to be at least 8 characters.';
      pwInput.focus();
      return;
    }

    btn.disabled    = true;
    btn.textContent = 'Creating your account…';

    try {
      const res  = await fetch('/api/auth/register', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (res.ok) {
        localStorage.setItem('lumina_signup_ts', Date.now());
        onNext({ userId: data.userId, email });
      } else if (data.code === 'EMAIL_EXISTS') {
        emailError.textContent = 'An account with this email already exists. Try signing in?';
        btn.disabled    = false;
        btn.textContent = 'Create account →';
      } else {
        throw new Error(data.message);
      }
    } catch {
      showToast('Something went wrong. Please try again.');
      btn.disabled    = false;
      btn.textContent = 'Create account →';
    }
  });
}
