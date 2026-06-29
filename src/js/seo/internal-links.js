const TOPIC_KEYWORDS = {
  'grief':             '/topic/grief',
  'grieving':          '/topic/grief',
  'loss':              '/topic/grief',
  'personal growth':   '/topic/personal-growth',
  'growing':           '/topic/personal-growth',
  'self-improvement':  '/topic/personal-growth',
  'joy':               '/topic/joy',
  'joyful':            '/topic/joy',
  'love':              '/topic/love',
  'relationship':      '/topic/relationships',
  'relationships':     '/topic/relationships',
  'mindfulness':       '/topic/mindfulness',
  'mindful':           '/topic/mindfulness',
  'meditation':        '/topic/mindfulness',
  'purpose':           '/topic/purpose',
  'meaning':           '/topic/purpose',
  'healing':           '/topic/healing',
  'heal':              '/topic/healing',
  'identity':          '/topic/identity',
  'who i am':          '/topic/identity',
  'creativity':        '/topic/creativity',
  'creative':          '/topic/creativity',
  'gratitude':         '/topic/gratitude',
  'grateful':          '/topic/gratitude',
  'change':            '/topic/change',
  'changing':          '/topic/change',
  'connection':        '/topic/connection',
  'connect':           '/topic/connection',
};

export function injectTopicLinks(bodyElement) {
  const linked = new Set();

  const walker = document.createTreeWalker(
    bodyElement,
    NodeFilter.SHOW_TEXT,
    {
      acceptNode(node) {
        const tag = node.parentElement?.tagName;
        if (['A', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'CODE', 'PRE'].includes(tag)) {
          return NodeFilter.FILTER_REJECT;
        }
        return NodeFilter.FILTER_ACCEPT;
      },
    }
  );

  const textNodes = [];
  let node;
  while ((node = walker.nextNode())) textNodes.push(node);

  textNodes.forEach(textNode => {
    const text = textNode.textContent;

    for (const [keyword, url] of Object.entries(TOPIC_KEYWORDS)) {
      if (linked.has(keyword)) continue;

      const regex = new RegExp(`\\b(${keyword.replace(/[-\s]/g, '[\\s-]')})\\b`, 'i');
      if (regex.test(text)) {
        const span = document.createElement('span');
        span.innerHTML = text.replace(regex, match => {
          linked.add(keyword);
          return `<a href="${url}" class="internal-topic-link" title="Explore ${keyword} stories on Lumina">${match}</a>`;
        });
        textNode.parentNode.replaceChild(span, textNode);
        break;
      }
    }
  });
}
