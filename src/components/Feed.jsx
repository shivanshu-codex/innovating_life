import PostCard from './PostCard';

const SAMPLE_POSTS = [
  {
    id: 1,
    author: 'Amara Osei',
    initials: 'AO',
    online: true,
    timeAgo: '2 hours ago',
    tag: 'Healing',
    title: 'The day I stopped pretending everything was fine',
    excerpt: 'For three years I carried the weight of a grief I could not name. It was not dramatic — no sudden collapse, no obvious crisis. Just a slow dimming, like a lamp turned down so gradually you barely notice the room getting darker. Until one morning I sat with my coffee and realized I could not remember the last time I had felt genuinely warm inside.',
    readTime: 4,
    likes: 127,
    comments: 34,
  },
  {
    id: 2,
    author: 'Lena Kovárová',
    initials: 'LK',
    online: false,
    timeAgo: '5 hours ago',
    tag: 'Growth',
    title: 'Learning to rest without guilt',
    excerpt: 'Productivity culture had convinced me that rest was a reward earned through exhaustion. I spent years running on empty, fuelled by the idea that slowing down meant falling behind. This is the story of how a three-week illness forced me to stop — and what I discovered in the quiet.',
    readTime: 6,
    likes: 89,
    comments: 21,
  },
  {
    id: 3,
    author: 'Tariq Mansouri',
    initials: 'TM',
    online: true,
    timeAgo: '1 day ago',
    tag: 'Connection',
    title: 'What my grandmother taught me about loneliness',
    excerpt: 'She lived alone for twenty years after my grandfather passed, and everyone — including me — assumed she was lonely. She was not. She had cultivated a rich inner life, a garden, and a small circle of friends she saw every Thursday. When I asked her secret she said: "I stopped waiting to feel less alone and started building belonging."',
    readTime: 5,
    likes: 214,
    comments: 58,
  },
  {
    id: 4,
    author: 'Priya Nair',
    initials: 'PN',
    online: false,
    timeAgo: '2 days ago',
    tag: 'Mindfulness',
    title: 'Five minutes in the morning that changed my year',
    excerpt: 'I am not a morning person, and I am deeply suspicious of wellness advice that promises transformation through habit. So when I say that sitting in silence for five minutes before reaching for my phone changed something fundamental in my relationship with the day, I say it with full awareness of how that sounds.',
    readTime: 3,
    likes: 156,
    comments: 42,
  },
  {
    id: 5,
    author: 'Elias Bergström',
    initials: 'EB',
    online: true,
    timeAgo: '3 days ago',
    tag: 'Wisdom',
    title: 'The gift of an ordinary Tuesday',
    excerpt: 'We are so conditioned to look for peak experiences — the trip, the promotion, the revelation — that we walk past the ordinary Tuesday like it is scenery rather than life itself. I have been trying to notice the Tuesdays more. Here is what I have found.',
    readTime: 4,
    likes: 98,
    comments: 19,
  },
  {
    id: 6,
    author: 'Yuki Tanaka',
    initials: 'YT',
    online: false,
    timeAgo: '4 days ago',
    tag: 'Peace',
    title: 'Forgiving myself for the years I lost to anxiety',
    excerpt: 'Anxiety stole a decade from me. Or at least that is how I used to think about it — as a thief, a parasite, a chapter to be skipped. Learning to see it differently, as something that was trying (however clumsily) to protect me, opened a door to a compassion I had withheld from myself for far too long.',
    readTime: 7,
    likes: 342,
    comments: 87,
  },
];

export default function Feed() {
  return (
    <section id="feed" style={{ padding: 'var(--space-20) 0' }}>
      <div className="container">
        {/* Section header */}
        <div className="reveal" style={{ marginBottom: 'var(--space-12)', textAlign: 'center' }}>
          <h2 className="t-section" style={{ marginBottom: 'var(--space-4)' }}>Stories from the community</h2>
          <p className="t-body" style={{ color: 'var(--text-secondary)', maxWidth: '520px', margin: '0 auto' }}>
            Real experiences, shared with care. Each story is a window into a
            human life worth understanding.
          </p>
        </div>

        {/* Filter tabs */}
        <div className="reveal" style={{ display: 'flex', gap: 'var(--space-2)', marginBottom: 'var(--space-10)', flexWrap: 'wrap' }}>
          {['All', 'Healing', 'Growth', 'Mindfulness', 'Connection', 'Wisdom', 'Peace'].map((tab, i) => (
            <button
              key={tab}
              className={`btn ${i === 0 ? 'btn-primary btn-sm' : 'btn-secondary btn-sm'}`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Post grid */}
        <div
          className="reveal-group"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
            gap: 'var(--space-6)',
          }}
        >
          {SAMPLE_POSTS.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>

        {/* Load more — no infinite scroll */}
        <div style={{ textAlign: 'center', marginTop: 'var(--space-12)' }}>
          <button className="btn btn-secondary btn-lg">
            Read more stories
          </button>
          <p className="t-meta" style={{ marginTop: 'var(--space-3)' }}>
            Showing 6 of 138 stories
          </p>
        </div>
      </div>
    </section>
  );
}
