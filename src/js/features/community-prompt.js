export const weeklyPrompts = [
  // Week 1–13 (Q1)
  'Write about a moment when you were completely wrong about something important.',
  'Describe the version of yourself you were five years ago. What would you tell them?',
  'What is a small thing that brings you disproportionate joy?',
  'Tell the story of a goodbye.',
  'Write about a door you decided not to open.',
  'What does home mean to you right now?',
  'Describe a kindness a stranger showed you.',
  'Write about something you changed your mind about this year.',
  'What does rest actually feel like for you?',
  'Tell the story of something you made.',
  'Write about a fear you\'ve been quietly carrying.',
  'What does it feel like to be loved?',
  'Write about the version of success you were sold — and whether you still want it.',

  // Week 14–26 (Q2)
  'What do you wish you\'d said?',
  'Describe a friendship that changed you.',
  'Write about something beautiful you almost missed.',
  'What did grief teach you?',
  'Tell the story of a belief you inherited but had to examine.',
  'Write about a time you were braver than you felt.',
  'What does your body remember that your mind has forgotten?',
  'Tell the story of the last time you laughed so hard it hurt.',
  'Write about a relationship with a place.',
  'What does loneliness feel like to you?',
  'Write about something you\'re still learning to accept.',
  'Tell the story of the moment everything changed.',
  'What does growth actually cost?',

  // Week 27–39 (Q3)
  'Write about a time you were completely present.',
  'What question do you keep coming back to?',
  'Tell the story of a beginning.',
  'Write about something you miss.',
  'What does silence sound like in your life?',
  'Describe a day you\'ll never forget.',
  'Write about a person who believed in you before you believed in yourself.',
  'What are you slowly becoming?',
  'Tell the story of a fight that mattered.',
  'Write about something you do just for yourself.',
  'What does healing actually look like in your life?',
  'Tell the story of the last time you felt truly free.',
  'Write about a habit that changed you.',

  // Week 40–52 (Q4)
  'What did this year take from you?',
  'Write about something you chose.',
  'Tell the story of a conversation that shifted something.',
  'What does forgiveness mean to you?',
  'Write about a version of yourself you had to let go of.',
  'Tell the story of something that surprised you about yourself.',
  'What do you want more of?',
  'Write about the gap between who you are and who you want to be.',
  'Tell the story of something you carry with you.',
  'What does joy without guilt feel like?',
  'Write about something that will outlast you.',
  'Tell the story of the best ordinary day.',
  'What made this year yours?',
];

export function getWeeklyPrompt() {
  const weekOfYear = Math.ceil(
    (new Date() - new Date(new Date().getFullYear(), 0, 1)) / (7 * 24 * 60 * 60 * 1000),
  );
  return weeklyPrompts[(weekOfYear - 1) % weeklyPrompts.length];
}
