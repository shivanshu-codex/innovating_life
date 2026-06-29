export const BrandIcons = {

  luminaMark: (size = 24, color = 'currentColor') => `
    <svg width="${size}" height="${size}" viewBox="0 0 24 24"
         fill="${color}" xmlns="http://www.w3.org/2000/svg"
         aria-hidden="true">
      <path d="M12 2 L13.5 10.5 L22 12 L13.5 13.5 L12 22 L10.5 13.5 L2 12 L10.5 10.5 Z"/>
    </svg>
  `,

  resonance: (size = 24) => `
    <svg width="${size}" height="${size}" viewBox="0 0 24 24"
         fill="none" stroke="currentColor" stroke-width="2"
         stroke-linecap="round" stroke-linejoin="round"
         xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
      <line x1="12" y1="1"  x2="12"   y2="3"   stroke-width="1.5"/>
      <line x1="20" y1="5"  x2="18.5" y2="6.5" stroke-width="1.5"/>
      <line x1="23" y1="12" x2="21"   y2="12"  stroke-width="1.5"/>
    </svg>
  `,

  pauseBreath: (size = 48) => `
    <svg width="${size}" height="${size}" viewBox="0 0 48 48"
         fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="24" cy="24" r="20" stroke="var(--soul-300)" stroke-width="1.5"/>
      <circle cx="24" cy="24" r="12" fill="var(--soul-100)"/>
      <circle cx="24" cy="24" r="6"  fill="var(--soul-400)"/>
    </svg>
  `,

  streakFlame: (size = 24) => `
    <svg width="${size}" height="${size}" viewBox="0 0 24 24"
         fill="none" stroke="currentColor" stroke-width="2"
         stroke-linecap="round" stroke-linejoin="round"
         xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M12 2c0 0-4 4-4 9a4 4 0 0 0 8 0c0-1.5-.5-3-1.5-4C14 9 12 2 12 2z"/>
      <path d="M12 14a2 2 0 0 1-2-2c0-1 .5-2 1-2.5C11.5 11 12 12.5 12 14z" fill="currentColor"/>
    </svg>
  `,
};
