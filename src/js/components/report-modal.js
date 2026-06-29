export const REPORT_REASONS = [
  {
    value:   'harmful',
    icon:    '⚠️',
    label:   'Could cause harm',
    sub:     'Self-harm, dangerous instructions, or content that could hurt someone',
  },
  {
    value:   'harassment',
    icon:    '🚫',
    label:   'Harassment or targeting',
    sub:     'Directed at a specific person to intimidate or cause distress',
  },
  {
    value:   'hate',
    icon:    '🛑',
    label:   'Hate speech',
    sub:     'Dehumanises people based on who they are',
  },
  {
    value:   'misinformation',
    icon:    '📰',
    label:   'Dangerous misinformation',
    sub:     'False health or safety claims that could mislead people',
  },
  {
    value:   'spam',
    icon:    '📢',
    label:   'Spam or promotional',
    sub:     'Unsolicited advertising, referral links, or mass content',
  },
  {
    value:   'crisis',
    icon:    '💙',
    label:   'Someone may be in crisis',
    sub:     'This person seems to be in immediate distress',
  },
  {
    value:   'other',
    icon:    '💬',
    label:   'Something else',
    sub:     'I\'ll explain in the details field',
  },
];

const CRISIS_PANEL_HTML = `
<div class="crisis-panel">
  <p class="crisis-panel__title">💙 Thank you for looking out for someone.</p>
  <p class="crisis-panel__text">
    If this is an emergency, please contact local emergency services.
    For immediate support in India: <a class="crisis-panel__link" href="tel:9152987821">iCall 9152987821</a>
    (Mon–Sat 8am–10pm) or globally:
    <a class="crisis-panel__link" href="https://findahelpline.com" target="_blank" rel="noopener">findahelpline.com</a>.
    Your report will be reviewed by our team within 2 hours.
  </p>
</div>
`;

export function openReportModal({ contentId, contentType = 'story', onSubmit, showToast }) {
  let selectedReason = null;

  const backdrop = document.createElement('div');
  backdrop.className = 'report-modal';
  backdrop.innerHTML = `
    <div class="report-modal__backdrop" id="report-backdrop"></div>
    <div class="report-modal__card" role="dialog" aria-modal="true" aria-labelledby="report-title">
      <h2 class="report-modal__title" id="report-title">Report this ${contentType}</h2>
      <p class="report-modal__subtitle">
        Every report goes to a real person. You won't be identified to the person you're reporting.
      </p>
      <div class="report-reasons" id="report-reasons"></div>
      <div id="report-crisis-panel" style="display:none"></div>
      <textarea
        class="report-detail"
        id="report-detail"
        placeholder="Any additional context (optional)"
        rows="3"
        style="display:none"
      ></textarea>
      <div class="report-modal__actions">
        <button type="button" class="btn btn-secondary btn-sm" id="report-cancel">Cancel</button>
        <button type="button" class="btn btn-primary btn-sm" id="report-submit" disabled>Send report</button>
      </div>
    </div>
  `;

  document.body.appendChild(backdrop);
  document.body.style.overflow = 'hidden';

  const reasonsContainer = backdrop.querySelector('#report-reasons');
  const crisisPanel       = backdrop.querySelector('#report-crisis-panel');
  const detailField       = backdrop.querySelector('#report-detail');
  const submitBtn         = backdrop.querySelector('#report-submit');

  REPORT_REASONS.forEach(reason => {
    const btn = document.createElement('button');
    btn.type      = 'button';
    btn.className = 'report-reason';
    btn.dataset.value = reason.value;
    btn.innerHTML = `
      <span class="report-reason__icon">${reason.icon}</span>
      <span>
        <span class="report-reason__text">${reason.label}</span>
        <span class="report-reason__sub">${reason.sub}</span>
      </span>
    `;

    btn.addEventListener('click', () => {
      reasonsContainer.querySelectorAll('.report-reason').forEach(el => el.classList.remove('is-selected'));
      btn.classList.add('is-selected');
      selectedReason = reason.value;
      submitBtn.disabled = false;

      detailField.style.display   = (reason.value === 'other') ? 'block' : 'none';
      crisisPanel.style.display   = (reason.value === 'crisis') ? 'block' : 'none';
      crisisPanel.innerHTML       = (reason.value === 'crisis') ? CRISIS_PANEL_HTML : '';
    });

    reasonsContainer.appendChild(btn);
  });

  const close = () => {
    document.body.removeChild(backdrop);
    document.body.style.overflow = '';
  };

  backdrop.querySelector('#report-backdrop').addEventListener('click', close);
  backdrop.querySelector('#report-cancel').addEventListener('click', close);

  submitBtn.addEventListener('click', () => {
    if (!selectedReason) return;
    const detail = detailField.value.trim();
    if (onSubmit) onSubmit({ contentId, contentType, reason: selectedReason, detail });
    close();
    if (showToast) {
      showToast(
        selectedReason === 'crisis'
          ? 'Report received. Our team will review it within 2 hours.'
          : 'Thanks for the report. We\'ll take a look.',
      );
    }
  });

  const firstReason = reasonsContainer.querySelector('.report-reason');
  if (firstReason) firstReason.focus();
}
