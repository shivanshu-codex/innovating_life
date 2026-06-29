export const a11yChecklist = {

  keyboard: [
    'Tab through entire page — focus order is logical (top-to-bottom, left-to-right)',
    'Focus indicator visible on every interactive element',
    'No keyboard trap (can Tab out of every component)',
    'Modal: focus moves to modal on open, returns to trigger on close',
    'Modal: Escape key closes modal',
    'Custom dropdowns: Arrow keys navigate options, Enter selects, Escape closes',
    'Tab panel: Arrow keys navigate between tabs (not Tab key)',
    'Skip links appear on first Tab press and work correctly',
    'All keyboard shortcuts documented and accessible via ? key',
    'No accidental keyboard traps on drag-drop components',
  ],

  screenReader: [
    'NVDA+Chrome: read through landing page — content makes sense in linear order',
    'VoiceOver+Safari: read through story page — heading structure logical',
    'Every form field has a visible label AND an accessible label',
    'Error messages announced immediately (assertive live region)',
    'Success toasts announced (polite live region)',
    'Dynamic content updates (new stories loaded) announced',
    'Images have appropriate alt text (decorative = empty string)',
    'Buttons describe their action, not appearance ("Close" not "X")',
    'Links describe their destination, not "click here" or "read more"',
    'Modals have aria-modal and aria-label or aria-labelledby',
    'Tab panels use role="tablist", role="tab", role="tabpanel" correctly',
    'Progress bars have role="progressbar" with aria-valuenow/min/max',
    'Notifications in bell panel readable by screen reader',
  ],

  visual: [
    'Zoom to 400% — no content overlaps, no horizontal scroll on desktop',
    'Text resize to 200% — page still functional',
    'Windows High Contrast Mode — all text and UI visible',
    'macOS Increased Contrast — borders visible',
    'All information conveyed by colour also conveyed by shape/text',
    'Error states have icon + colour + text (not colour alone)',
    'Focus indicators visible in Windows High Contrast Mode',
  ],

  cognitive: [
    'Reading time shown on all stories (from Pillar 5)',
    'No content that flashes more than 3 times per second',
    'Auto-playing media can be paused',
    'Session timeout warned 2 minutes before expiry',
    'Error messages written in plain language (from Pillar 5)',
    'Complex actions have confirmation step (delete, account removal)',
    'Loading states clearly indicated with text, not spinner alone',
    'No time-limited interactions (no countdown timers)',
  ],

  motion: [
    'prefers-reduced-motion: all animations disabled',
    'Particle system disabled when reduced motion preferred',
    'Page transitions instant when reduced motion preferred',
    'No parallax scrolling effects when reduced motion preferred',
    'Auto-playing animations stopped when reduced motion preferred',
  ],

  touch: [
    'All touch targets minimum 44×44px (from Pillar 3)',
    'No hover-only interactions (all hover states also accessible on touch)',
    'Swipe gestures have button alternatives',
    'Custom gestures (long press, pull-to-refresh) have alternatives',
    'Pinch-to-zoom not blocked (no user-scalable=no in viewport)',
    'Touch targets do not overlap',
  ],
};
