/* ============================================
   LUMINA — DAILY WRITING PROMPTS
   52 prompts across 7 categories (one per week).
   getTodaysPrompt() is deterministic — same prompt
   for everyone on the same calendar day.
   ============================================ */

export const prompts = [
  // ── GRATITUDE ──────────────────────────────────────────────────
  {
    id: 'g01',
    category: 'Gratitude',
    text: "What made you smile today — even just a little?",
    sub:  "It doesn't have to be remarkable. Small things count.",
    mood: ['Grateful', 'Hopeful', 'Peaceful'],
  },
  {
    id: 'g02',
    category: 'Gratitude',
    text: "What's something you have right now that a year ago you hoped for?",
    sub:  "Progress is quieter than we expect.",
    mood: ['Grateful', 'Reflective'],
  },
  {
    id: 'g03',
    category: 'Gratitude',
    text: "Name one person who made your life better without knowing it.",
    sub:  "You don't have to tag them. Just hold them in mind.",
    mood: ['Grateful', 'Warm'],
  },
  {
    id: 'g04',
    category: 'Gratitude',
    text: "What part of your ordinary day is actually extraordinary?",
    sub:  "The things we stop seeing because they're always there.",
    mood: ['Grateful', 'Mindful'],
  },
  {
    id: 'g05',
    category: 'Gratitude',
    text: "What skill or quality in yourself are you most quietly proud of?",
    sub:  "Not the ones you perform — the ones you actually value.",
    mood: ['Grateful', 'Self-aware'],
  },
  {
    id: 'g06',
    category: 'Gratitude',
    text: "What book, song, or film arrived at exactly the right moment?",
    sub:  "The ones that felt like they were written for you.",
    mood: ['Grateful', 'Nostalgic'],
  },
  {
    id: 'g07',
    category: 'Gratitude',
    text: "What does your body do for you every day that you rarely acknowledge?",
    sub:  "We spend a lot of time at war with it.",
    mood: ['Grateful', 'Honest'],
  },
  {
    id: 'g08',
    category: 'Gratitude',
    text: "What's a kindness someone showed you that you still carry?",
    sub:  "The ones that arrive unexpectedly and stay forever.",
    mood: ['Grateful', 'Tender'],
  },

  // ── REFLECTION ─────────────────────────────────────────────────
  {
    id: 'r01',
    category: 'Reflection',
    text: "What's something you believed five years ago that you no longer do?",
    sub:  "Changing your mind is a sign of growth, not weakness.",
    mood: ['Reflective', 'Curious'],
  },
  {
    id: 'r02',
    category: 'Reflection',
    text: "What moment do you keep coming back to, and why?",
    sub:  "The ones that replay themselves must be trying to say something.",
    mood: ['Reflective', 'Searching'],
  },
  {
    id: 'r03',
    category: 'Reflection',
    text: "If you could send one message to yourself from three years ago, what would it say?",
    sub:  "Be specific. Your past self needed something real, not advice.",
    mood: ['Reflective', 'Compassionate'],
  },
  {
    id: 'r04',
    category: 'Reflection',
    text: "What decision are you at peace with that once kept you up at night?",
    sub:  "Something shifted. What was it?",
    mood: ['Reflective', 'Peaceful'],
  },
  {
    id: 'r05',
    category: 'Reflection',
    text: "What do you wish someone had told you before you went through something hard?",
    sub:  "Someone reading this might need exactly that.",
    mood: ['Reflective', 'Generous'],
  },
  {
    id: 'r06',
    category: 'Reflection',
    text: "What's the kindest thing you've ever done that no one knows about?",
    sub:  "You can tell us. This is a safe place for quiet goodness.",
    mood: ['Reflective', 'Warm'],
  },
  {
    id: 'r07',
    category: 'Reflection',
    text: "What chapter of your life would you title, and what would the title be?",
    sub:  "You're probably in one right now.",
    mood: ['Reflective', 'Creative'],
  },
  {
    id: 'r08',
    category: 'Reflection',
    text: "When did you last surprise yourself with what you were capable of?",
    sub:  "Not the big things. The quiet ones you almost didn't notice.",
    mood: ['Reflective', 'Hopeful'],
  },

  // ── GROWTH ─────────────────────────────────────────────────────
  {
    id: 'gw01',
    category: 'Growth',
    text: "What's the hardest thing you've ever had to learn about yourself?",
    sub:  "The truths that were hard to see but changed everything.",
    mood: ['Honest', 'Brave'],
  },
  {
    id: 'gw02',
    category: 'Growth',
    text: "What habit, tiny or significant, changed how you feel about your days?",
    sub:  "Small shifts compound into different lives.",
    mood: ['Optimistic', 'Grounded'],
  },
  {
    id: 'gw03',
    category: 'Growth',
    text: "What failure taught you something that success never could have?",
    sub:  "The stories we don't share because we're embarrassed by them.",
    mood: ['Honest', 'Resilient'],
  },
  {
    id: 'gw04',
    category: 'Growth',
    text: "Where are you braver than you were a year ago?",
    sub:  "Even in one small way counts.",
    mood: ['Hopeful', 'Self-aware'],
  },
  {
    id: 'gw05',
    category: 'Growth',
    text: "What are you in the middle of learning right now?",
    sub:  "Not what you've mastered — what you're still figuring out.",
    mood: ['Curious', 'Honest'],
  },
  {
    id: 'gw06',
    category: 'Growth',
    text: "What did you have to unlearn to become who you are now?",
    sub:  "Sometimes growth is subtraction.",
    mood: ['Thoughtful', 'Brave'],
  },
  {
    id: 'gw07',
    category: 'Growth',
    text: "What's the best advice you've ever received — and did you follow it?",
    sub:  "Honesty about the second part is where the story lives.",
    mood: ['Reflective', 'Honest'],
  },

  // ── CONNECTION ─────────────────────────────────────────────────
  {
    id: 'c01',
    category: 'Connection',
    text: "Describe a stranger who left a mark on you.",
    sub:  "The ones who changed something in a few minutes.",
    mood: ['Warm', 'Curious'],
  },
  {
    id: 'c02',
    category: 'Connection',
    text: "What does feeling truly understood feel like to you?",
    sub:  "Not just heard — understood. What's the difference?",
    mood: ['Longing', 'Warm'],
  },
  {
    id: 'c03',
    category: 'Connection',
    text: "What have you never said to someone you love, and why?",
    sub:  "You don't have to name them here.",
    mood: ['Vulnerable', 'Honest'],
  },
  {
    id: 'c04',
    category: 'Connection',
    text: "Who in your life shows up without being asked?",
    sub:  "The people who are just there.",
    mood: ['Grateful', 'Tender'],
  },
  {
    id: 'c05',
    category: 'Connection',
    text: "What's a conversation you had that you still think about?",
    sub:  "The ones that reorganised something in you.",
    mood: ['Reflective', 'Connected'],
  },
  {
    id: 'c06',
    category: 'Connection',
    text: "What do you wish people knew about loneliness?",
    sub:  "Especially things that aren't said out loud.",
    mood: ['Honest', 'Vulnerable'],
  },
  {
    id: 'c07',
    category: 'Connection',
    text: "What does home mean to you — and do you have it?",
    sub:  "It might be a place, a person, or a feeling.",
    mood: ['Searching', 'Honest'],
  },

  // ── CHALLENGE ──────────────────────────────────────────────────
  {
    id: 'ch01',
    category: 'Challenge',
    text: "What's the hardest season of your life — and what got you through it?",
    sub:  "You don't have to make it inspirational. Just make it real.",
    mood: ['Resilient', 'Honest'],
  },
  {
    id: 'ch02',
    category: 'Challenge',
    text: "What are you carrying right now that you haven't told anyone?",
    sub:  "This is as safe a place as any.",
    mood: ['Vulnerable', 'Brave'],
  },
  {
    id: 'ch03',
    category: 'Challenge',
    text: "What do you do when everything feels like too much?",
    sub:  "Not what you're supposed to do. What you actually do.",
    mood: ['Honest', 'Human'],
  },
  {
    id: 'ch04',
    category: 'Challenge',
    text: "What has grief taught you that nothing else could?",
    sub:  "Any kind of loss — people, versions of yourself, possibilities.",
    mood: ['Tender', 'Honest'],
  },
  {
    id: 'ch05',
    category: 'Challenge',
    text: "When did you keep going even when you didn't want to?",
    sub:  "Not the heroic version — the quiet, exhausted version.",
    mood: ['Resilient', 'Real'],
  },
  {
    id: 'ch06',
    category: 'Challenge',
    text: "What fear have you made peace with — or are still trying to?",
    sub:  "Either answer is honest. Both are worth writing.",
    mood: ['Brave', 'Vulnerable'],
  },
  {
    id: 'ch07',
    category: 'Challenge',
    text: "What does rest look like for you — and do you allow yourself to have it?",
    sub:  "Rest is harder than it sounds for a lot of people.",
    mood: ['Honest', 'Tender'],
  },

  // ── SIMPLICITY ─────────────────────────────────────────────────
  {
    id: 's01',
    category: 'Simplicity',
    text: "Describe your favourite hour of the day.",
    sub:  "The specific one, not the ideal one.",
    mood: ['Peaceful', 'Present'],
  },
  {
    id: 's02',
    category: 'Simplicity',
    text: "What does a good morning feel like for you?",
    sub:  "Not productive. Not optimised. Just good.",
    mood: ['Peaceful', 'Warm'],
  },
  {
    id: 's03',
    category: 'Simplicity',
    text: "What small, strange thing makes you feel more like yourself?",
    sub:  "The rituals that don't make sense to anyone else.",
    mood: ['Playful', 'Honest'],
  },
  {
    id: 's04',
    category: 'Simplicity',
    text: "What do you always notice that other people walk past?",
    sub:  "The textures of your particular attention.",
    mood: ['Curious', 'Gentle'],
  },
  {
    id: 's05',
    category: 'Simplicity',
    text: "What's a place that makes you feel safe?",
    sub:  "Describe it so a stranger could feel it too.",
    mood: ['Peaceful', 'Warm'],
  },
  {
    id: 's06',
    category: 'Simplicity',
    text: "What's the meal you come back to when you need comfort?",
    sub:  "And what does it actually taste like — not what it's supposed to.",
    mood: ['Warm', 'Nostalgic'],
  },
  {
    id: 's07',
    category: 'Simplicity',
    text: "What's a sound that immediately changes how you feel?",
    sub:  "For better or worse. Sounds carry more memory than we think.",
    mood: ['Curious', 'Present'],
  },

  // ── IMAGINATION ────────────────────────────────────────────────
  {
    id: 'i01',
    category: 'Imagination',
    text: "What does the best version of your life look like at 80?",
    sub:  "Not the impressive version — the one that actually sounds good.",
    mood: ['Hopeful', 'Reflective'],
  },
  {
    id: 'i02',
    category: 'Imagination',
    text: "If you could master one thing in the next year, what would it be?",
    sub:  "And what's one concrete step toward it you haven't taken yet?",
    mood: ['Motivated', 'Honest'],
  },
  {
    id: 'i03',
    category: 'Imagination',
    text: "What would you do this week if you weren't afraid of looking foolish?",
    sub:  "Fear of embarrassment shapes more decisions than we admit.",
    mood: ['Brave', 'Playful'],
  },
  {
    id: 'i04',
    category: 'Imagination',
    text: "What kind of person do you want someone to remember you as?",
    sub:  "Not on a stage. In a kitchen. In a quiet moment.",
    mood: ['Meaningful', 'Tender'],
  },
  {
    id: 'i05',
    category: 'Imagination',
    text: "If your life were a book, what genre would it be?",
    sub:  "And is that the genre you want it to be?",
    mood: ['Playful', 'Curious'],
  },
  {
    id: 'i06',
    category: 'Imagination',
    text: "What would you tell your future self about this exact moment?",
    sub:  "You'll look back at today eventually. What will matter?",
    mood: ['Reflective', 'Hopeful'],
  },
  {
    id: 'i07',
    category: 'Imagination',
    text: "What's something you've always wanted to do — and what's the smallest possible first step?",
    sub:  "Sometimes naming the first step is enough to make it real.",
    mood: ['Motivated', 'Hopeful'],
  },
  {
    id: 'i08',
    category: 'Imagination',
    text: "What would your life feel like if you let go of one thing you're holding on to?",
    sub:  "You don't have to let go today. Just imagine it.",
    mood: ['Reflective', 'Free'],
  },
];

// Deterministic daily selection — same prompt for everyone on the same day.
// Rotates through all prompts across the year.
export function getTodaysPrompt() {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const dayOfYear = Math.floor((now - start) / 86400000);
  return prompts[dayOfYear % prompts.length];
}

// Get a prompt by category (for topic-seeded writing pages)
export function getPromptByCategory(category) {
  const matching = prompts.filter(p => p.category === category);
  const now = new Date();
  const dayOfYear = Math.floor((now - new Date(now.getFullYear(), 0, 0)) / 86400000);
  return matching[dayOfYear % matching.length];
}
