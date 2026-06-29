import { announce } from './focus-manager.js';
import { SR }       from './announcements.js';

export class AccessibleForm {

  constructor(formEl) {
    this.form   = formEl;
    this.errors = new Map();
    this._init();
  }

  _init() {
    this.form.querySelectorAll('input, textarea, select').forEach(field => {
      const id    = field.id;
      const label = id ? this.form.querySelector(`label[for="${id}"]`) : null;
      if (!label && id && import.meta.env.DEV) {
        console.warn(`♿ A11y: No label found for #${id}`);
      }
    });

    this.form.querySelectorAll('.field-group').forEach(group => {
      const input  = group.querySelector('input, textarea, select');
      const helper = group.querySelector('.field-helper');
      const error  = group.querySelector('.field-error');

      if (!input) return;

      const describedBy = [];

      if (helper && !helper.id) {
        helper.id = `helper-${input.id}`;
      }
      if (helper?.id) describedBy.push(helper.id);

      if (error && !error.id) {
        error.id = `error-${input.id}`;
      }
      if (error?.id) describedBy.push(error.id);

      if (describedBy.length) {
        input.setAttribute('aria-describedby', describedBy.join(' '));
      }
    });
  }

  setError(fieldId, message) {
    const field   = this.form.querySelector(`#${fieldId}`);
    const errorEl = this.form.querySelector(`#error-${fieldId}`)
                 || this.form.querySelector(`[data-error-for="${fieldId}"]`);

    if (field) {
      field.setAttribute('aria-invalid', 'true');
      field.classList.add('has-error');
    }

    if (errorEl) {
      errorEl.textContent = message;
      errorEl.removeAttribute('hidden');
    }

    this.errors.set(fieldId, message);

    const labelText = this.form.querySelector(`label[for="${fieldId}"]`)?.textContent || fieldId;
    announce(SR.fieldError(labelText, message), 'assertive');
  }

  clearError(fieldId) {
    const field   = this.form.querySelector(`#${fieldId}`);
    const errorEl = this.form.querySelector(`#error-${fieldId}`);

    if (field) {
      field.removeAttribute('aria-invalid');
      field.classList.remove('has-error');
    }
    if (errorEl) {
      errorEl.textContent = '';
      errorEl.setAttribute('hidden', '');
    }

    this.errors.delete(fieldId);
  }

  showAllErrors(errorMap) {
    Object.entries(errorMap).forEach(([fieldId, msg]) => this.setError(fieldId, msg));

    const firstErrorId = Object.keys(errorMap)[0];
    const firstField   = this.form.querySelector(`#${firstErrorId}`);
    if (firstField) {
      firstField.focus();
      const count = Object.keys(errorMap).length;
      announce(
        `${count} error${count !== 1 ? 's' : ''} found. Please review the form.`,
        'assertive'
      );
    }
  }

  setLoading(buttonEl, loadingText = 'Submitting…') {
    buttonEl.disabled             = true;
    buttonEl.dataset.originalText = buttonEl.textContent;
    buttonEl.textContent          = loadingText;
    buttonEl.setAttribute('aria-busy', 'true');
  }

  clearLoading(buttonEl) {
    buttonEl.disabled    = false;
    buttonEl.textContent = buttonEl.dataset.originalText || 'Submit';
    buttonEl.setAttribute('aria-busy', 'false');
    delete buttonEl.dataset.originalText;
  }
}
