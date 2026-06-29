const BASE_URL = 'https://lumina.in';

export async function generateSitemapIndex() {
  const now      = new Date().toISOString();
  const sitemaps = [
    { loc: `${BASE_URL}/sitemap-static.xml`,   lastmod: now },
    { loc: `${BASE_URL}/sitemap-stories.xml`,  lastmod: now },
    { loc: `${BASE_URL}/sitemap-topics.xml`,   lastmod: now },
    { loc: `${BASE_URL}/sitemap-profiles.xml`, lastmod: now },
  ];

  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemaps.map(s => `  <sitemap>
    <loc>${s.loc}</loc>
    <lastmod>${s.lastmod}</lastmod>
  </sitemap>`).join('\n')}
</sitemapindex>`;
}

export function generateStaticSitemap() {
  const today = new Date().toISOString().split('T')[0];
  const pages = [
    { url: '/',        priority: '1.0', changefreq: 'daily'   },
    { url: '/explore', priority: '0.9', changefreq: 'hourly'  },
    { url: '/about',   priority: '0.5', changefreq: 'monthly' },
  ];

  return buildSitemap(pages.map(p => ({
    loc:        `${BASE_URL}${p.url}`,
    lastmod:    today,
    changefreq: p.changefreq,
    priority:   p.priority,
  })));
}

export async function generateStoriesSitemap(db) {
  const stories = await db.story.findMany({
    where:   { isPublic: true },
    select:  { slug: true, updatedAt: true, createdAt: true },
    orderBy: { createdAt: 'desc' },
    take:    50000,
  });

  return buildSitemap(stories.map(s => ({
    loc:        `${BASE_URL}/story/${s.slug}`,
    lastmod:    (s.updatedAt || s.createdAt).toISOString().split('T')[0],
    changefreq: 'weekly',
    priority:   '0.8',
    image: {
      loc:     `${BASE_URL}/cdn/stories/${s.slug}-800.webp`,
      caption: `Story: ${s.slug.replace(/-/g, ' ')}`,
    },
  })));
}

export function generateTopicsSitemap() {
  const today  = new Date().toISOString().split('T')[0];
  const topics = [
    'personal-growth', 'grief', 'joy', 'love', 'mindfulness',
    'purpose', 'relationships', 'healing', 'identity',
    'creativity', 'gratitude', 'uncertainty', 'simplicity',
    'change', 'connection',
  ];

  return buildSitemap(topics.map(t => ({
    loc:        `${BASE_URL}/topic/${t}`,
    lastmod:    today,
    changefreq: 'daily',
    priority:   '0.85',
  })));
}

export async function generateProfilesSitemap(db) {
  const users = await db.user.findMany({
    where: {
      isPublic: true,
      stories:  { some: { isPublic: true } },
    },
    select:  { username: true, updatedAt: true },
    orderBy: { updatedAt: 'desc' },
    take:    50000,
  });

  return buildSitemap(users.map(u => ({
    loc:        `${BASE_URL}/u/${u.username}`,
    lastmod:    u.updatedAt.toISOString().split('T')[0],
    changefreq: 'weekly',
    priority:   '0.6',
  })));
}

function buildSitemap(urls) {
  const urlElements = urls.map(u => {
    let xml = `  <url>\n    <loc>${escapeXml(u.loc)}</loc>\n`;
    if (u.lastmod)    xml += `    <lastmod>${u.lastmod}</lastmod>\n`;
    if (u.changefreq) xml += `    <changefreq>${u.changefreq}</changefreq>\n`;
    if (u.priority)   xml += `    <priority>${u.priority}</priority>\n`;
    if (u.image) {
      xml += `    <image:image>\n`;
      xml += `      <image:loc>${escapeXml(u.image.loc)}</image:loc>\n`;
      xml += `      <image:caption>${escapeXml(u.image.caption)}</image:caption>\n`;
      xml += `    </image:image>\n`;
    }
    xml += `  </url>`;
    return xml;
  }).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urlElements}
</urlset>`;
}

function escapeXml(str) {
  return String(str)
    .replace(/&/g,  '&amp;')
    .replace(/</g,  '&lt;')
    .replace(/>/g,  '&gt;')
    .replace(/"/g,  '&quot;')
    .replace(/'/g,  '&apos;');
}
