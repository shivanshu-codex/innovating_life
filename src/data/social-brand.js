export const socialBrand = {

  twitter: {
    name:    'Lumina ✦',
    handle:  '@lumina_in',
    bio:     'A warm place for honest human writing. Your story finds its people. ✦',
    website: 'lumina.in',
    pinned:  "We built Lumina because the most important things people write rarely go viral — and they shouldn't have to.",
  },

  instagram: {
    name:   'Lumina ✦',
    handle: '@lumina.in',
    bio:    'Honest stories. Real people.\nA community built for human writing — not algorithms.\n\n✦ lumina.in',
  },

  linkedin: {
    tagline: 'A wellbeing community for honest human writing.',
    about:   `Lumina is a place where people share honest experiences, connect with others who understand, and find meaning through real human stories.

We are not an engagement platform. We don't have an algorithm optimised for outrage. We don't sell your data.

We are a community built around human wellbeing — where the most honest writing finds the people who need it most.`,
  },

  postRules: [
    "Write as if you're sending a message to one person who needs to hear it — not broadcasting to a crowd",
    'Share stories from the community (with permission) — not product updates',
    'Celebrate community milestones honestly — "1,000 stories written" not "1k users onboarded"',
    'Ask genuine questions — not engagement bait ("What do you think??" is banned)',
    'Never post more than once a day. Once every 2-3 days is better.',
    'Emojis: sparingly. ✦ is our only brand emoji. Standard emojis used contextually.',
    "Never repost other brands' content without genuine editorial context",
    'Respond to every reply. Every. One.',
  ],

  postTemplates: {

    storySpotlight: (story) => ({
      text: `"${story.excerpt?.substring(0, 140) || story.title}"\n\n— ${story.author.name}\n\nRead the full story → lumina.in/story/${story.slug}`,
      hashtags: ['#HonestWriting', '#PersonalStories', `#${story.topic?.replace(/\s/g, '')}`],
    }),

    milestone: (count, unit) => ({
      text: `${count.toLocaleString()} ${unit} on Lumina.\n\nEach one is a person who decided their experience was worth writing down.\nEach one found at least one person who needed to read it.\n\nThat's the whole thing. ✦`,
    }),

    mondayPrompt: (prompt) => ({
      text: `This week's writing prompt:\n\n"${prompt}"\n\nWrite it on Lumina → lumina.in/write`,
      hashtags: ['#WritingPrompt', '#LuminaPrompt'],
    }),

    quietThought: (thought) => ({
      text: thought,
    }),
  },

  examplePosts: [
    "The most honest writing often starts: \"I don't know how to say this, but—\"",
    'Someone shared something raw today on Lumina. 47 people said it found them. That\'s what this is for.',
    "Writing about grief doesn't mean you're not healing. Sometimes it means you are.",
    'The word "vulnerable" comes from the Latin for "able to be wounded." Writing honestly requires that.',
    "A story with 3 resonances that changed one person's day is more successful than a viral post that made someone feel bad.",
    "We don't have an algorithm. We have a community. It's slower. It's better.",
  ],
};
