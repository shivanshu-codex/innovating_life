export const streakMilestones = {
  7: {
    icon:  '✦',
    title: 'Seven days of showing up.',
    body:  'That\'s a week of choosing to put words down. Most people think about writing. You actually did it.',
  },
  14: {
    icon:  '🌱',
    title: 'Two weeks of practice.',
    body:  'A fortnight of returning to the page. The habit is beginning to become part of you.',
  },
  30: {
    icon:  '🌿',
    title: 'A whole month.',
    body:  'Thirty days is significant. You\'ve written through good days and hard ones. That consistency is rare.',
  },
  60: {
    icon:  '🌊',
    title: 'Sixty days.',
    body:  'Two months of showing up for yourself. Your writing is becoming a record of your life.',
  },
  100: {
    icon:  '💯',
    title: 'One hundred days.',
    body:  'A hundred days of returning to the page. Think about what you\'ve written. Think about who read it. That\'s real.',
  },
  180: {
    icon:  '🌸',
    title: 'Half a year of writing.',
    body:  'Six months. That\'s not a habit anymore — it\'s a practice. You\'ve earned that word.',
  },
  365: {
    icon:  '✦',
    title: 'A year.',
    body:  'Three hundred and sixty-five days of coming back to yourself through writing. We\'re honoured to have been part of that.',
  },
};

export const streakBreakMessages = [
  'Your practice paused. That\'s okay — ready to begin again?',
  'Life stepped in. The page is here when you are.',
  'Every practice has pauses. Yours starts fresh today.',
  'It\'s not about the streak. It\'s about the writing. Begin whenever.',
];

export function getStreakBreakMessage() {
  const day = new Date().getDay();
  return streakBreakMessages[day % streakBreakMessages.length];
}
