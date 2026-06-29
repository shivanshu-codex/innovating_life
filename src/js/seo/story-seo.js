import { generateSlug } from './slug.js';

const STOP_WORDS = new Set([
  'the','a','an','and','or','but','in','on','at','to','for','of','with','by',
  'from','is','was','are','were','be','been','have','has','had','do','does',
  'did','will','would','could','should','may','might','shall','can','i','you',
  'he','she','we','they','my','your','his','her','our','their','this','that',
  'these','those','it','its','what','which','who','when','where','how','why',
  'all','each','every','both','few','more','most','other','some','such','no',
  'not','only','same','so','than','too','very','just','about','above','after',
  'also','then','into','over','before','between','through','still','while',
]);

export function generateStorySEOData(story) {
  const words     = (story.body || '').trim().split(/\s+/).filter(Boolean);
  const wordCount = words.length;
  const readingTime = Math.max(1, Math.ceil(wordCount / 200));

  const excerpt = (story.body || '')
    .replace(/#+\s/g, '')
    .replace(/\*\*/g, '')
    .replace(/\n+/g, ' ')
    .trim()
    .substring(0, 160)
    .replace(/\s\S*$/, '…');

  const wordFreq = {};
  words.forEach(w => {
    const word = w.toLowerCase().replace(/[^a-z]/g, '');
    if (word.length > 3 && !STOP_WORDS.has(word)) {
      wordFreq[word] = (wordFreq[word] || 0) + 1;
    }
  });

  const topKeywords = Object.entries(wordFreq)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([word]) => word)
    .join(', ');

  return {
    slug:        generateSlug(story.title || excerpt.substring(0, 50)),
    excerpt,
    readingTime,
    wordCount,
    keywords:    story.topic ? `${story.topic}, ${topKeywords}` : topKeywords,
  };
}
