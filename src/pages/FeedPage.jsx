import { useState } from 'react';
import Topbar from '../components/Topbar';
import PostCard from '../components/PostCard';
import { useAuth } from '../context/AuthContext';
import { useReveal } from '../hooks/useReveal';
import { PenLine, TrendingUp, Users, Lightbulb } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getTodaysPrompt } from '../data/daily-prompts';

const FEED_TABS = ['For you', 'Following', 'New'];

const SAMPLE_POSTS = [
  { id: 1, author: 'Amara Osei', initials: 'AO', online: true, timeAgo: '2h ago', tag: 'Healing', title: 'The day I stopped pretending everything was fine', excerpt: 'For three years I carried the weight of a grief I could not name. It was not dramatic — no sudden collapse, no obvious crisis. Just a slow dimming, like a lamp turned down so gradually you barely notice the room getting darker.', readTime: 4, likes: 127, comments: 34 },
  { id: 2, author: 'Lena Kovárová', initials: 'LK', online: false, timeAgo: '5h ago', tag: 'Growth', title: 'Learning to rest without guilt', excerpt: 'Productivity culture had convinced me that rest was a reward earned through exhaustion. I spent years running on empty, fuelled by the idea that slowing down meant falling behind. This is the story of how a three-week illness forced me to stop.', readTime: 6, likes: 89, comments: 21 },
  { id: 3, author: 'Tariq Mansouri', initials: 'TM', online: true, timeAgo: '1d ago', tag: 'Connection', title: 'What my grandmother taught me about loneliness', excerpt: 'She lived alone for twenty years after my grandfather passed, and everyone assumed she was lonely. She was not. She had cultivated a rich inner life, a garden, and a small circle of friends she saw every Thursday.', readTime: 5, likes: 214, comments: 58 },
];

const SAMPLE_MORE = [
  { id: 4, author: 'Priya Nair', initials: 'PN', online: false, timeAgo: '2d ago', tag: 'Mindfulness', title: 'Five minutes in the morning that changed my year', excerpt: 'I am not a morning person, and I am deeply suspicious of wellness advice that promises transformation through habit. So when I say that sitting in silence for five minutes before reaching for my phone changed something fundamental in my relationship with the day, I say it with full awareness of how that sounds.', readTime: 3, likes: 156, comments: 42 },
  { id: 5, author: 'Elias Bergström', initials: 'EB', online: true, timeAgo: '3d ago', tag: 'Wisdom', title: 'The gift of an ordinary Tuesday', excerpt: 'We are so conditioned to look for peak experiences that we walk past the ordinary Tuesday like it is scenery rather than life itself. I have been trying to notice the Tuesdays more.', readTime: 4, likes: 98, comments: 19 },
  { id: 6, author: 'Yuki Tanaka', initials: 'YT', online: false, timeAgo: '4d ago', tag: 'Peace', title: 'Forgiving myself for the years I lost to anxiety', excerpt: 'Anxiety stole a decade from me. Or at least that is how I used to think about it — as a thief, a parasite, a chapter to be skipped. Learning to see it differently opened a door to a compassion I had withheld from myself.', readTime: 7, likes: 342, comments: 87 },
];

const SUB_GREETINGS = [
  'What will you carry into today?',
  'A quiet moment is waiting for you.',
  'Someone out there wrote something for you today.',
  'Your next story starts whenever you\'re ready.',
  'There\'s no right way to show up here.',
];

export default function FeedPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('For you');
  const [showMore, setShowMore] = useState(false);
  const todaysPrompt = getTodaysPrompt();
  const subGreeting = SUB_GREETINGS[new Date().getDay() % SUB_GREETINGS.length];
  useReveal();

  const greeting = () => {
    const h = new Date().getHours();
    if (h >= 5  && h < 11) return { text: 'Good morning',  emoji: '☀️' };
    if (h >= 11 && h < 17) return { text: 'Good afternoon', emoji: null };
    if (h >= 17 && h < 21) return { text: 'Good evening',  emoji: '🌙' };
    return { text: 'Still up',      emoji: '🌿' };
  };

  const posts = showMore ? [...SAMPLE_POSTS, ...SAMPLE_MORE] : SAMPLE_POSTS;

  return (
    <>
      <Topbar />
      <div className="feed-layout">
        {/* Main column */}
        <main>
          {/* Greeting */}
          <div className="reveal" style={{ marginBottom: 'var(--space-6)' }}>
            <h1 className="t-section">
              {greeting().text}{user ? `, ${user.firstName}.` : '.'}{greeting().emoji ? ` ${greeting().emoji}` : ''}
            </h1>
            <p className="t-body" style={{ color: 'var(--text-secondary)', marginTop: 'var(--space-2)' }}>
              {subGreeting}
            </p>
          </div>

          {/* Inline composer teaser */}
          <Link
            to="/write"
            className="card reveal"
            style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)', marginBottom: 'var(--space-6)', textDecoration: 'none', padding: 'var(--space-4) var(--space-5)' }}
          >
            <div className="avatar avatar-md avatar-initials" style={{ fontSize: '0.8rem', flexShrink: 0 }}>
              {user ? `${user.firstName?.[0]}${user.lastName?.[0] || ''}` : '✦'}
            </div>
            <span className="t-body" style={{ color: 'var(--text-placeholder)', fontStyle: 'italic', flex: 1 }}>
              Start wherever feels true.
            </span>
            <PenLine size={18} strokeWidth={1.5} color="var(--text-muted)" />
          </Link>

          {/* Tabs */}
          <div className="reveal" style={{ display: 'flex', gap: 'var(--space-1)', marginBottom: 'var(--space-6)', borderBottom: '1px solid var(--border-soft)', paddingBottom: 'var(--space-3)' }}>
            {FEED_TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="btn btn-ghost"
                style={{
                  color: activeTab === tab ? 'var(--soul-600)' : 'var(--text-muted)',
                  fontWeight: activeTab === tab ? 'var(--weight-semibold)' : 'var(--weight-medium)',
                  borderBottom: activeTab === tab ? '2px solid var(--soul-500)' : '2px solid transparent',
                  borderRadius: 0,
                  paddingBottom: 'calc(var(--space-3) + 3px)',
                }}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Post cards */}
          <div className="reveal-group" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
            {posts.slice(0, 3).map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>

          {/* Pause card after 3 posts */}
          <div className="pause-card reveal">
            <div className="pause-card-breathe" />
            <p className="pause-card-text">Take a breath.</p>
            <p className="pause-card-sub">You've been reading for a while. The stories will still be here.</p>
          </div>

          {showMore && (
            <div className="reveal-group" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
              {SAMPLE_MORE.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          )}

          {/* Load more — no infinite scroll */}
          {!showMore && (
            <div style={{ textAlign: 'center', marginTop: 'var(--space-8)' }}>
              <button className="btn btn-secondary btn-lg" onClick={() => setShowMore(true)}>
                Load more stories
              </button>
              <p className="t-meta" style={{ marginTop: 'var(--space-3)' }}>Showing 3 of 138 stories</p>
            </div>
          )}
        </main>

        {/* Right panel */}
        <aside className="feed-right-panel" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
          {/* Daily prompt */}
          <div className="card card--featured">
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-3)' }}>
              <Lightbulb size={16} strokeWidth={1.5} color="var(--soul-500)" />
              <span className="t-label" style={{ color: 'var(--soul-600)' }}>Today's prompt</span>
            </div>
            <p className="t-quote" style={{ fontSize: 'var(--text-base)', marginBottom: 'var(--space-2)' }}>
              "{todaysPrompt.text}"
            </p>
            {todaysPrompt.sub && (
              <p className="t-meta" style={{ color: 'var(--text-muted)', marginBottom: 'var(--space-4)' }}>
                {todaysPrompt.sub}
              </p>
            )}
            <Link to="/write" className="btn btn-primary btn-sm" style={{ width: '100%', justifyContent: 'center' }}>
              Write to this
            </Link>
          </div>

          {/* Active community */}
          <div className="card">
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-4)' }}>
              <Users size={16} strokeWidth={1.5} color="var(--sage-500)" />
              <span className="t-label" style={{ color: 'var(--sage-600)' }}>Active today</span>
            </div>
            <div style={{ display: 'flex', marginBottom: 'var(--space-3)' }}>
              {['#FFD166', '#FFB3AA', '#8DD1A4', '#BFA8FF'].map((c, i) => (
                <div key={i} className="avatar avatar-sm" style={{ backgroundColor: c, marginLeft: i > 0 ? '-8px' : 0, border: '2px solid var(--surface-card)', zIndex: 4 - i }} />
              ))}
            </div>
            <p className="t-meta">12 people shared a story today</p>
          </div>

          {/* Topics */}
          <div className="card">
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-4)' }}>
              <TrendingUp size={16} strokeWidth={1.5} color="var(--dusk-500)" />
              <span className="t-label" style={{ color: 'var(--dusk-600)' }}>Topics for you</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
              {['🌱 Growth', '😊 Joy', '🧘 Mindfulness', '🌿 Healing'].map((t) => (
                <Link key={t} to={`/topic/${t.split(' ')[1].toLowerCase()}`} className="btn btn-ghost" style={{ justifyContent: 'flex-start', fontSize: 'var(--text-sm)' }}>
                  {t}
                </Link>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}
