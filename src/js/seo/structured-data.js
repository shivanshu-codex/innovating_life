/* ============================================
   LUMINA — JSON-LD STRUCTURED DATA
   Injects schema.org markup for SEO.
   Call injectSchema() in page-level useEffect.
   ============================================ */

const BASE_URL = 'https://lumina.in';

// Story page — Article schema
export function getStorySchema(story) {
  return {
    '@context':    'https://schema.org',
    '@type':       'Article',
    headline:      story.title,
    description:   story.excerpt ?? story.body?.substring(0, 200) ?? '',
    author: {
      '@type':     'Person',
      name:        story.author?.name ?? 'Anonymous',
      url:         story.author?.username
        ? `${BASE_URL}/u/${story.author.username}`
        : BASE_URL,
    },
    publisher: {
      '@type':     'Organization',
      name:        'Lumina',
      url:         BASE_URL,
      logo: {
        '@type':   'ImageObject',
        url:       `${BASE_URL}/icons/icon-192.png`,
      },
    },
    datePublished:  story.createdAt,
    dateModified:   story.updatedAt ?? story.createdAt,
    url:            `${BASE_URL}/story/${story.slug}`,
    image:          story.coverImageUrl ?? `${BASE_URL}/og-default.jpg`,
    articleBody:    story.body ?? '',
    keywords:       story.topic ?? '',
    inLanguage:     'en',
  };
}

// Landing page — WebSite schema with SearchAction
export function getWebsiteSchema() {
  return {
    '@context':   'https://schema.org',
    '@type':      'WebSite',
    name:         'Lumina',
    url:          BASE_URL,
    description:  'A wellbeing community where people share honest human experiences.',
    potentialAction: {
      '@type':    'SearchAction',
      target:     `${BASE_URL}/explore?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };
}

// Story / topic / profile pages — BreadcrumbList
export function getBreadcrumbSchema(crumbs) {
  return {
    '@context':  'https://schema.org',
    '@type':     'BreadcrumbList',
    itemListElement: crumbs.map((crumb, i) => ({
      '@type':   'ListItem',
      position:  i + 1,
      name:      crumb.name,
      item:      `${BASE_URL}${crumb.path}`,
    })),
  };
}

// Inject any schema into <head> as a <script type="application/ld+json">
export function injectSchema(schema) {
  if (typeof document === 'undefined') return;

  // Remove existing schema of same type to avoid duplicates
  const existing = document.querySelector(
    `script[type="application/ld+json"][data-schema="${schema['@type']}"]`
  );
  if (existing) existing.remove();

  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.dataset.schema = schema['@type'];
  script.textContent = JSON.stringify(schema);
  document.head.appendChild(script);
}
