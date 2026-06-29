export const brandMotion = {

  arrive: {
    from:     { opacity: 0, transform: 'translateY(16px)' },
    to:       { opacity: 1, transform: 'translateY(0)' },
    duration: 500,
    easing:   'cubic-bezier(0.34, 1.56, 0.64, 1)',
    delay:    0,
  },

  surface: {
    from:     { opacity: 0, transform: 'scale(0.95) translateY(8px)' },
    to:       { opacity: 1, transform: 'scale(1) translateY(0)' },
    duration: 380,
    easing:   'cubic-bezier(0.34, 1.56, 0.64, 1)',
  },

  pulse: {
    keyframes: [
      { transform: 'scale(1)',    opacity: 1   },
      { transform: 'scale(1.15)', opacity: 0.8 },
      { transform: 'scale(1)',    opacity: 1   },
    ],
    duration: 800,
    easing:   'cubic-bezier(0.34, 1.56, 0.64, 1)',
  },

  breathe: {
    keyframes: [
      { transform: 'scale(1)',    opacity: 0.6 },
      { transform: 'scale(1.12)', opacity: 1   },
      { transform: 'scale(1)',    opacity: 0.6 },
    ],
    duration:   4000,
    easing:     'ease-in-out',
    iterations: 'infinite',
  },

  resonate: {
    phases: [
      { transform: 'scale(1.4)', duration: 200, easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)' },
      { transform: 'scale(0.9)', duration: 100, easing: 'ease-in'  },
      { transform: 'scale(1.1)', duration: 150, easing: 'ease-out' },
      { transform: 'scale(1)',   duration: 100, easing: 'ease'     },
    ],
    ripple: {
      from:     { transform: 'scale(1)',   opacity: 0.4 },
      to:       { transform: 'scale(2.5)', opacity: 0   },
      duration: 600,
    },
  },

  doNotAnimate: [
    'Body text while reading (no parallax on story body)',
    'Navigation items on hover (underline only, no slide)',
    'Error messages (they appear instantly — no animation on alerts)',
    'Multiple elements simultaneously in the same container',
    'Content that loads asynchronously without skeleton first',
    'Any animation that runs on scroll (no scroll-trigger animations)',
  ],
};
