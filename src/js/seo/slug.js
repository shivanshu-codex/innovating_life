export function generateSlug(text, options = {}) {
  const { maxLength = 70, separator = '-' } = options;

  let slug = text
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[\s\W-]+/g, separator)
    .replace(/^-+|-+$/g, '')
    .substring(0, maxLength)
    .replace(/-[^-]*$/, '');

  return slug || 'untitled';
}

export async function uniqueSlug(baseSlug, db) {
  let slug = baseSlug;
  let count = 1;

  while (await db.story.findUnique({ where: { slug } })) {
    count++;
    slug = `${baseSlug}-${count}`;
  }

  return slug;
}

export const topicSlugs = {
  'Growth':        'personal-growth',
  'Grief':         'grief',
  'Joy':           'joy',
  'Love':          'love',
  'Mindfulness':   'mindfulness',
  'Purpose':       'purpose',
  'Relationships': 'relationships',
  'Healing':       'healing',
  'Identity':      'identity',
  'Creativity':    'creativity',
  'Gratitude':     'gratitude',
  'Uncertainty':   'uncertainty',
  'Simplicity':    'simplicity',
  'Change':        'change',
  'Connection':    'connection',
};
