const BASE = 'https://lumina.in';

export const websiteSchema = {
  '@context':    'https://schema.org',
  '@type':       'WebSite',
  name:          'Lumina',
  alternateName: ['Lumina Community', 'Lumina Stories'],
  url:           BASE,
  description:   'A wellbeing community where people share honest human experiences.',
  inLanguage:    'en',
  potentialAction: {
    '@type':       'SearchAction',
    target:        `${BASE}/explore?q={search_term_string}`,
    'query-input': 'required name=search_term_string',
  },
  publisher: {
    '@type': 'Organization',
    name:    'Lumina',
    url:     BASE,
    logo: {
      '@type':  'ImageObject',
      url:      `${BASE}/icons/icon-512.png`,
      width:    512,
      height:   512,
    },
    sameAs: [
      'https://twitter.com/lumina_in',
      'https://instagram.com/lumina.in',
    ],
  },
};

export function articleSchema(story) {
  const wordCount = story.body ? story.body.split(/\s+/).length : 0;
  return {
    '@context':   'https://schema.org',
    '@type':      'Article',
    '@id':        `${BASE}/story/${story.slug}#article`,
    headline:     story.title,
    name:         story.title,
    description:  story.excerpt || story.body?.substring(0, 160),
    articleBody:  story.body,
    url:          `${BASE}/story/${story.slug}`,
    datePublished:story.createdAt,
    dateModified: story.updatedAt || story.createdAt,
    inLanguage:   'en',
    keywords:     [story.topic, 'personal story', 'lived experience'].join(', '),
    articleSection: story.topic,
    wordCount,
    timeRequired: `PT${Math.max(1, Math.ceil(wordCount / 200))}M`,
    author: {
      '@type': 'Person',
      '@id':   `${BASE}/u/${story.author?.username}#person`,
      name:    story.author?.name,
      url:     `${BASE}/u/${story.author?.username}`,
      image:   story.author?.avatarUrl,
    },
    publisher: {
      '@type': 'Organization',
      name:    'Lumina',
      url:     BASE,
      logo: {
        '@type': 'ImageObject',
        url:     `${BASE}/icons/icon-192.png`,
      },
    },
    image: story.coverImageUrl ? {
      '@type':  'ImageObject',
      url:      story.coverImageUrl,
      width:    1200,
      height:   675,
    } : undefined,
    interactionStatistic: [
      {
        '@type':              'InteractionCounter',
        interactionType:      'https://schema.org/LikeAction',
        userInteractionCount: story.reactions?.resonates || 0,
      },
      {
        '@type':              'InteractionCounter',
        interactionType:      'https://schema.org/CommentAction',
        userInteractionCount: story.commentsCount || 0,
      },
    ],
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id':   `${BASE}/story/${story.slug}`,
    },
  };
}

export function personSchema(user) {
  return {
    '@context':   'https://schema.org',
    '@type':      'Person',
    '@id':        `${BASE}/u/${user.username}#person`,
    name:         user.name,
    alternateName:`@${user.username}`,
    url:          `${BASE}/u/${user.username}`,
    description:  user.bio,
    image:        user.avatarUrl ? { '@type': 'ImageObject', url: user.avatarUrl } : undefined,
    mainEntityOfPage: {
      '@type': 'ProfilePage',
      '@id':   `${BASE}/u/${user.username}`,
    },
    sameAs: [user.twitterUrl, user.instagramUrl].filter(Boolean),
  };
}

export function topicPageSchema(topic, stories = []) {
  return {
    '@context':  'https://schema.org',
    '@type':     'CollectionPage',
    name:        `${topic.name} Stories`,
    description: `Real human stories about ${topic.name.toLowerCase()}.`,
    url:         `${BASE}/topic/${topic.slug}`,
    about: {
      '@type': 'Thing',
      name:    topic.name,
    },
    hasPart: stories.slice(0, 10).map(s => ({
      '@type':       'Article',
      headline:      s.title,
      url:           `${BASE}/story/${s.slug}`,
      author:        s.author?.name,
      datePublished: s.createdAt,
    })),
  };
}

export function breadcrumbSchema(crumbs) {
  return {
    '@context': 'https://schema.org',
    '@type':    'BreadcrumbList',
    itemListElement: crumbs.map((crumb, i) => ({
      '@type':   'ListItem',
      position:  i + 1,
      name:      crumb.name,
      item:      `${BASE}${crumb.path}`,
    })),
  };
}

export function storyBreadcrumb(story) {
  return breadcrumbSchema([
    { name: 'Lumina',    path: '/' },
    { name: story.topic, path: `/topic/${story.topicSlug}` },
    { name: story.title, path: `/story/${story.slug}` },
  ]);
}

export function topicBreadcrumb(topic) {
  return breadcrumbSchema([
    { name: 'Lumina',   path: '/' },
    { name: 'Explore',  path: '/explore' },
    { name: topic.name, path: `/topic/${topic.slug}` },
  ]);
}

export const faqSchema = {
  '@context': 'https://schema.org',
  '@type':    'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name:    'What is Lumina?',
      acceptedAnswer: {
        '@type': 'Answer',
        text:    'Lumina is a wellbeing community where people share honest personal experiences, thoughts, and emotions. It is designed to foster genuine human connection through storytelling.',
      },
    },
    {
      '@type': 'Question',
      name:    'Is Lumina free to use?',
      acceptedAnswer: {
        '@type': 'Answer',
        text:    'Yes, Lumina is completely free to join, read, and share stories.',
      },
    },
    {
      '@type': 'Question',
      name:    'Can I share anonymously on Lumina?',
      acceptedAnswer: {
        '@type': 'Answer',
        text:    'Yes. Every story on Lumina can be shared anonymously. Your name will show as "Anonymous" while your account remains private.',
      },
    },
    {
      '@type': 'Question',
      name:    'What topics can I write about on Lumina?',
      acceptedAnswer: {
        '@type': 'Answer',
        text:    'Lumina welcomes stories about any human experience — grief, joy, love, personal growth, mindfulness, purpose, relationships, healing, identity, creativity, and more.',
      },
    },
    {
      '@type': 'Question',
      name:    'How is Lumina different from other platforms?',
      acceptedAnswer: {
        '@type': 'Answer',
        text:    'Lumina has no algorithm promoting viral content. No follower counts as a measure of worth. No infinite scroll designed to trap attention. It is designed around human wellbeing, not engagement metrics.',
      },
    },
  ],
};

export function injectSchema(schema) {
  if (typeof document === 'undefined') return;

  document.querySelectorAll('script[data-schema]').forEach(s => s.remove());

  const schemas = Array.isArray(schema) ? schema : [schema];
  schemas.forEach((s, i) => {
    if (!s) return;
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.dataset.schema = i;
    script.textContent = JSON.stringify(s);
    document.head.appendChild(script);
  });
}
