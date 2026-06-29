const BASE = 'https://lumina.in';
const DEFAULT_OG_IMAGE = `${BASE}/og-default.jpg`;

export class MetaManager {
  static update({
    title,
    description,
    canonical,
    ogTitle,
    ogDescription,
    ogImage,
    ogType      = 'website',
    ogUrl,
    twitterCard = 'summary_large_image',
    noindex     = false,
    author,
    publishedTime,
    modifiedTime,
    section,
    keywords,
  }) {
    if (title) document.title = title;

    const setMeta = (selector, content) => {
      if (!content) return;
      let el = document.querySelector(selector);
      if (!el) {
        el = document.createElement('meta');
        const isProperty = selector.includes('property=');
        const val = selector.match(/["']([^"']+)["']/)?.[1];
        if (val) el.setAttribute(isProperty ? 'property' : 'name', val);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    const setLink = (rel, href) => {
      if (!href) return;
      let el = document.querySelector(`link[rel="${rel}"]`);
      if (!el) {
        el = document.createElement('link');
        el.rel = rel;
        document.head.appendChild(el);
      }
      el.href = href;
    };

    setMeta('meta[name="description"]', description);
    setMeta('meta[name="author"]', author);
    setMeta('meta[name="keywords"]', keywords);
    setMeta(
      'meta[name="robots"]',
      noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large'
    );

    setLink('canonical', canonical || window.location.href.split('?')[0]);

    const image = ogImage || DEFAULT_OG_IMAGE;
    const url   = ogUrl || canonical || window.location.href;

    setMeta('meta[property="og:type"]',         ogType);
    setMeta('meta[property="og:url"]',          url);
    setMeta('meta[property="og:title"]',        ogTitle || title);
    setMeta('meta[property="og:description"]',  ogDescription || description);
    setMeta('meta[property="og:image"]',        image);
    setMeta('meta[property="og:image:width"]',  '1200');
    setMeta('meta[property="og:image:height"]', '630');
    setMeta('meta[property="og:image:alt"]',    ogTitle || title);
    setMeta('meta[property="og:site_name"]',    'Lumina');
    setMeta('meta[property="og:locale"]',       'en_US');

    if (ogType === 'article') {
      setMeta('meta[property="article:author"]',         author);
      setMeta('meta[property="article:published_time"]', publishedTime);
      setMeta('meta[property="article:modified_time"]',  modifiedTime);
      setMeta('meta[property="article:section"]',        section);
    }

    setMeta('meta[name="twitter:card"]',        twitterCard);
    setMeta('meta[name="twitter:site"]',        '@lumina_in');
    setMeta('meta[name="twitter:title"]',       ogTitle || title);
    setMeta('meta[name="twitter:description"]', ogDescription || description);
    setMeta('meta[name="twitter:image"]',       image);
    setMeta('meta[name="twitter:image:alt"]',   ogTitle || title);
  }

  static forStory(story) {
    const url = `${BASE}/story/${story.slug}`;
    this.update({
      title:         `"${story.title}" — Lumina`,
      description:   story.excerpt || story.body.substring(0, 160),
      canonical:     url,
      ogTitle:       story.title,
      ogDescription: story.excerpt || story.body.substring(0, 200),
      ogImage:       story.ogImage || story.coverImageUrl || this._generateOgImage(story),
      ogType:        'article',
      ogUrl:         url,
      author:        story.author?.name,
      publishedTime: story.createdAt,
      modifiedTime:  story.updatedAt,
      section:       story.topic,
      keywords:      [story.topic, 'personal story', 'lived experience', 'lumina'].join(', '),
    });
  }

  static forTopic(topic) {
    const url = `${BASE}/topic/${topic.slug}`;
    this.update({
      title:         `${topic.name} Stories — Real Experiences | Lumina`,
      description:   `Read honest human stories about ${topic.name.toLowerCase()} from people around the world. Real experiences, no filters. Share yours on Lumina.`,
      canonical:     url,
      ogTitle:       `${topic.name} — Real Stories from Real People`,
      ogDescription: `A community of voices writing about ${topic.name.toLowerCase()}. Honest, unfiltered, and deeply human.`,
      ogImage:       `${BASE}/og/topics/${topic.slug}.jpg`,
      keywords:      `${topic.name.toLowerCase()} stories, ${topic.name.toLowerCase()} experiences, ${topic.name.toLowerCase()} community`,
    });
  }

  static forProfile(user) {
    const url = `${BASE}/u/${user.username}`;
    this.update({
      title:         `${user.name} (@${user.username}) — Lumina`,
      description:   user.bio
        ? `${user.bio.substring(0, 130)} — Read ${user.name}'s stories on Lumina.`
        : `Read ${user.name}'s personal stories on Lumina, a wellbeing community for honest human experiences.`,
      canonical:     url,
      ogTitle:       `${user.name} on Lumina`,
      ogDescription: user.bio || `${user.name} shares stories on Lumina.`,
      ogImage:       user.avatarUrl || DEFAULT_OG_IMAGE,
      ogType:        'profile',
    });
  }

  static forHome() {
    this.update({
      title:         'Lumina — Your story finds its people',
      description:   'A wellbeing community where people share honest experiences, connect with others who understand, and find meaning through real human stories.',
      canonical:     BASE,
      ogTitle:       'Lumina — Your story finds its people',
      ogDescription: 'Real stories. Honest voices. A warm community built around human experience — not algorithms.',
      ogImage:       `${BASE}/og-home.jpg`,
    });
  }

  static forExplore() {
    this.update({
      title:         'Explore Stories — Real Human Experiences | Lumina',
      description:   'Browse honest personal stories from people around the world. Filter by topic: grief, growth, love, joy, purpose, mindfulness, and more.',
      canonical:     `${BASE}/explore`,
      ogTitle:       'Explore Human Stories on Lumina',
      ogDescription: 'Thousands of real stories. No algorithm. No performance. Just honest human writing.',
      ogImage:       `${BASE}/og-explore.jpg`,
      keywords:      'personal stories, life experiences, honest writing, community stories, real people',
    });
  }

  static _generateOgImage(story) {
    const params = new URLSearchParams({
      title:  (story.title || '').substring(0, 60),
      author: story.author?.name || '',
      topic:  story.topic || '',
    });
    return `${BASE}/api/og-image?${params}`;
  }
}
