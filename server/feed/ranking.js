export function rankFeedStories(stories, userPrefs = {}) {
  const { followedTopics = [], followedAuthors = [] } = userPrefs;
  const now = Date.now();

  const scored = stories.map(story => {
    const ageHours       = (now - new Date(story.createdAt).getTime()) / (60 * 60 * 1000);
    const recencyScore   = Math.max(0, 1 - ageHours / 72);

    const resonanceScore = Math.log1p(story.resonanceCount || 0) / Math.log1p(200);

    const followBoost    = followedTopics.includes(story.topicSlug)    ? 0.3
                         : followedAuthors.includes(story.author?.id)  ? 0.2
                         : 0;

    const isNewWriter    = (story.author?.storyCount ?? 999) <= 5;
    const discoveryBoost = isNewWriter ? 0.15 : 0;

    const negativePct     = story.negativeReactions / Math.max(story.totalReactions, 1);
    const wellbeingPenalty = negativePct > 0.3 ? -0.2 : 0;

    const total = (
      recencyScore   * 0.40 +
      resonanceScore * 0.35 +
      followBoost    * 1.00 +
      discoveryBoost * 1.00 +
      wellbeingPenalty
    );

    return { ...story, _score: total };
  });

  scored.sort((a, b) => b._score - a._score);

  const seenTopics  = {};
  const seenAuthors = new Set();
  const result      = [];

  for (const story of scored) {
    const topicCount = seenTopics[story.topicSlug] || 0;
    const hasAuthor  = seenAuthors.has(story.author?.id);

    if (topicCount >= 2)                       continue;
    if (hasAuthor && result.length < 10)        continue;

    seenTopics[story.topicSlug] = topicCount + 1;
    if (story.author?.id) seenAuthors.add(story.author.id);
    result.push(story);

    if (result.length >= stories.length) break;
  }

  return result;
}
