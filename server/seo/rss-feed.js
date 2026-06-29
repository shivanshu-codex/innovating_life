export async function generateRSSFeed(db, { topic = null, limit = 20 } = {}) {
  const where = {
    isPublic: true,
    ...(topic ? { topicSlug: topic } : {}),
  };

  const stories = await db.story.findMany({
    where,
    orderBy: { createdAt: 'desc' },
    take:    limit,
    include: { author: { select: { name: true, username: true } } },
  });

  const channelTitle = topic
    ? `Lumina — ${topic.charAt(0).toUpperCase() + topic.slice(1)} Stories`
    : 'Lumina — Recent Stories';

  const channelDesc = topic
    ? `The latest stories about ${topic} from the Lumina community.`
    : 'The latest honest human stories from the Lumina community.';

  const items = stories.map(s => {
    const pubDate = new Date(s.createdAt).toUTCString();
    const url     = `https://lumina.in/story/${s.slug}`;
    const excerpt = s.body.substring(0, 300)
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    return `
    <item>
      <title><![CDATA[${s.title || 'Untitled story'}]]></title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description><![CDATA[${excerpt}…]]></description>
      <author><![CDATA[${s.author.name} (noreply@lumina.in)]]></author>
      <category><![CDATA[${s.topic}]]></category>
      <pubDate>${pubDate}</pubDate>
      <dc:creator><![CDATA[${s.author.name}]]></dc:creator>
      <content:encoded><![CDATA[
        <p><strong>By ${s.author.name}</strong> · ${s.readingTime || '?'} min read</p>
        <p>${s.body.replace(/\n/g, '</p><p>')}</p>
        <p><a href="${url}">Read on Lumina →</a></p>
      ]]></content:encoded>
    </item>`;
  }).join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
     xmlns:content="http://purl.org/rss/1.0/modules/content/"
     xmlns:dc="http://purl.org/dc/elements/1.1/"
     xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title><![CDATA[${channelTitle}]]></title>
    <link>https://lumina.in</link>
    <description><![CDATA[${channelDesc}]]></description>
    <language>en-us</language>
    <copyright>© ${new Date().getFullYear()} Lumina</copyright>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <ttl>60</ttl>
    <image>
      <url>https://lumina.in/icons/icon-192.png</url>
      <title>Lumina</title>
      <link>https://lumina.in</link>
      <width>192</width>
      <height>192</height>
    </image>
    <atom:link href="https://lumina.in/feed.xml" rel="self" type="application/rss+xml"/>
    ${items}
  </channel>
</rss>`;
}
