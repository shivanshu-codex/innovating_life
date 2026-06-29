/* ============================================
   LUMINA — SEO META TEMPLATES
   All page titles and descriptions.
   Title format: "Page — Lumina" (em dash).
   Descriptions: 140–160 chars. No keyword stuffing.
   ============================================ */

export const seoTemplates = {

  home: {
    title:       'Lumina — Your story finds its people',
    description: 'A wellbeing community where people share honest experiences, connect with others who understand, and find meaning through real human stories.',
    ogTitle:     'Lumina — Your story finds its people',
    ogDesc:      'Real stories. Honest voices. A warm community built around human experience — not algorithms.',
  },

  explore: {
    title:       'Explore Stories — Lumina',
    description: 'Read honest, human stories from people around the world. Filter by topic: growth, grief, love, joy, purpose, and more.',
    ogTitle:     'Explore Human Stories on Lumina',
    ogDesc:      'Thousands of honest stories from real people, shared without filters or algorithms.',
  },

  story: (story) => ({
    title:       `"${story.title}" by ${story.author?.name ?? 'Anonymous'} — Lumina`,
    description: story.excerpt ?? story.body?.substring(0, 160) ?? '',
    ogTitle:     story.title,
    ogDesc:      story.excerpt ?? story.body?.substring(0, 200) ?? '',
    ogImage:     story.coverImageUrl ?? '/og-default.jpg',
  }),

  topic: (topicName) => ({
    title:       `${topicName} Stories — Lumina`,
    description: `Read honest human stories about ${topicName.toLowerCase()} from people around the world. Share your own experience.`,
    ogTitle:     `${topicName} — Real Stories from Real People`,
    ogDesc:      `A community of voices writing about ${topicName.toLowerCase()}. No algorithms. No performance. Just honesty.`,
  }),

  profile: (user) => ({
    title:       `${user.name} (@${user.username}) — Lumina`,
    description: user.bio
      ? `${user.bio} — Read ${user.name}'s stories on Lumina.`
      : `Read ${user.name}'s stories on Lumina — a wellbeing community for honest human experiences.`,
    ogTitle:     `${user.name} on Lumina`,
    ogDesc:      user.bio ?? `${user.name} shares stories on Lumina.`,
    ogImage:     user.avatarUrl ?? '/og-default.jpg',
  }),

  signup: {
    title:       'Join Lumina — Share Your Story',
    description: 'Create a free account and join a community of people sharing honest human experiences. Your story matters here.',
  },

  login: {
    title:       'Sign In — Lumina',
    description: 'Welcome back. Your stories are waiting.',
  },

  settings: {
    title:       'Settings — Lumina',
    description: 'Manage your account, appearance, privacy, and wellbeing settings.',
  },

  feed: {
    title:       'Your Feed — Lumina',
    description: 'Stories from the people you follow and topics you care about.',
  },

  write: {
    title:       'Write a Story — Lumina',
    description: 'Share something true. Say what\'s on your mind. Your story finds its people here.',
  },

  saved: {
    title:       'Saved Stories — Lumina',
    description: 'Stories you wanted to keep. Come back to them whenever.',
  },

  messages: {
    title:       'Messages — Lumina',
    description: 'Conversations with people whose stories moved you.',
  },

  notifications: {
    title:       'Notifications — Lumina',
    description: 'See who resonated with your stories and responded.',
  },
};
