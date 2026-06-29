export const brandGuidelines = {

  name:        'Lumina',
  version:     '1.0',
  lastUpdated: '2025-06-01',

  positioning: {
    tagline:  'Your story finds its people.',
    promise:  'When someone encounters Lumina — anywhere, in any form — they should feel like they have arrived somewhere warm, honest, and unhurried.',
    audience: 'Adults who want to write and read honest human experiences. Not hobbyist writers. Not journalists. Ordinary people with extraordinary inner lives.',
    against:  ['Algorithm-driven engagement', 'Performance metrics as validation', 'Extractive data practices', 'Wellness-washing'],
  },

  voice: {
    pillars: ['Warm', 'Honest', 'Unhurried', 'Alive'],
    tone:    'A thoughtful friend who has read widely and listens well',
    never:   ['Exclamation marks in UI copy', 'FOMO language', 'Urgency manufacturing', 'Buzzwords (leverage, synergy, disrupt)', 'Vague positivity ("Amazing!", "Great!")'],
    always:  ['Specific over vague', 'Concrete over abstract', 'Human over technical', 'Understated over superlative'],
  },

  visual: {
    colours: {
      primary:    '#F5A800',
      secondary:  '#F472B6',
      tertiary:   ['#4ADE80', '#A78BFA'],
      neutral:    '#252320',
      background: '#FFFDF9',
    },
    fonts: {
      display: 'Fraunces (variable)',
      body:    'Plus Jakarta Sans',
      quote:   'Lora',
    },
    mark:  '✦',
    doNot: [
      'Use pure white (#FFFFFF) as page background',
      'Use cool gray neutrals',
      'Use blue as a primary brand colour',
      'Use red for any non-error purpose',
      'Use all-caps in body copy',
      'Use more than 2 font families in a single layout',
    ],
  },

  motion: {
    easing:    'cubic-bezier(0.34, 1.56, 0.64, 1)',
    character: "Unhurried spring — things settle, they don't snap",
    doNot: [
      'Bounce animations (too playful)',
      'Linear easing (too mechanical)',
      'Animations competing simultaneously',
      'Scroll-triggered animations',
      'Any motion without prefers-reduced-motion guard',
    ],
  },

  photography: {
    style:   'Real moments, natural light, emotional truth over aesthetic perfection',
    subjects:'Hands writing, notebooks, dawn light, people in thought — not smiling-at-camera stock',
    never:   ['Stock photos of diverse groups laughing', 'Staged "authentic" moments', 'High-contrast editorial photography (too cold)', 'Abstract tech imagery'],
    filters: 'Warm tone, slight desaturation, never heavily filtered',
  },

  naming: {
    product: 'Lumina',
    symbol:  '✦',
    never:   ['LUMINA (all caps)', 'lumina (no capital)', 'LuminaApp', 'Lumina.in (with TLD in product name)', 'The Lumina Platform (drop "the" and "platform")'],
  },
};
