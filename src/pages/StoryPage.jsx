import { useEffect, useRef, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Heart, ThumbsDown, Bookmark, Share2, Clock, Send } from 'lucide-react';
import Topbar from '../components/Topbar';
import { useReveal } from '../hooks/useReveal';

const STORY = {
  slug: 'the-day-i-stopped-pretending',
  topic: 'Healing',
  readTime: 4,
  title: 'The day I stopped pretending everything was fine',
  author: 'Amara Osei',
  initials: 'AO',
  online: true,
  timeAgo: '2 hours ago',
  mood: { emoji: '🥺', label: 'Vulnerable' },
  likes: 127,
  comments: 34,
  body: [
    'For three years I carried the weight of a grief I could not name. It was not dramatic — no sudden collapse, no obvious crisis. Just a slow dimming, like a lamp turned down so gradually you barely notice the room getting darker. Until one morning I sat with my coffee and realized I could not remember the last time I had felt genuinely warm inside.',
    'The strange thing about this kind of sadness is how invisible it is. From the outside everything looked fine. I was showing up to work. I was laughing at dinner parties. I was answering messages. I was performing "doing okay" with such conviction that I had almost convinced myself.',
    'The moment that changed things was embarrassingly small. I was on the phone with my mother — a routine Sunday call — and she asked how I was, and instead of saying "fine, tired but fine," I said: "Actually, I don\'t really know." There was a pause. And then she said, "Tell me."',
    'So I did. And nothing collapsed. The world did not end. The phone call lasted two hours. By the end I felt wrung out but lighter, like a cloth that has been thoroughly washed for the first time in years.',
    'I don\'t have a tidy ending for this. I am still in the middle of it. But I have stopped pretending, and that has made more space for real things to move through. If you\'re carrying something unnamed — you don\'t have to be okay. You just have to be honest, even if only to one person, even if that person is yourself.',
  ],
};

const COMMENTS = [
  { id: 1, author: 'Priya N.', initials: 'PN', text: 'Thank you for writing this. The phrase "performing doing okay" landed somewhere very real for me.', timeAgo: '1h ago' },
  { id: 2, author: 'Elias B.', initials: 'EB', text: 'The detail about the phone call with your mother — I felt that. Sometimes one honest sentence opens everything.', timeAgo: '3h ago' },
  { id: 3, author: 'Yuki T.', initials: 'YT', text: 'This is beautifully written. Thank you for the reminder that we don\'t need a tidy ending.', timeAgo: '5h ago' },
];

export default function StoryPage() {
  const { slug } = useParams();
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [likeCount, setLikeCount] = useState(STORY.likes);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState(COMMENTS);
  const progressRef = useRef(null);
  const articleRef = useRef(null);
  useReveal();

  useEffect(() => {
    const bar = progressRef.current;
    const article = articleRef.current;
    if (!bar || !article) return;

    const update = () => {
      const rect = article.getBoundingClientRect();
      const total = article.offsetHeight - window.innerHeight;
      const scrolled = Math.max(0, -rect.top);
      const pct = total <= 0 ? 100 : Math.min(100, (scrolled / total) * 100);
      bar.style.width = `${pct}%`;
    };

    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  const handleLike = () => {
    if (liked) { setLiked(false); setLikeCount((n) => n - 1); }
    else { setLiked(true); setLikeCount((n) => n + 1); }
  };

  const handleComment = () => {
    if (!comment.trim()) return;
    setComments([{ id: Date.now(), author: 'You', initials: 'Y', text: comment, timeAgo: 'just now' }, ...comments]);
    setComment('');
  };

  return (
    <>
      <div ref={progressRef} className="reading-progress" />
      <Topbar />
      <div className="reading-layout">
        {/* Back */}
        <Link to="/feed" className="story-back-btn">
          <ArrowLeft size={16} strokeWidth={1.5} />
          Back to feed
        </Link>

        {/* Meta */}
        <div className="story-meta-row">
          <span className="story-topic-pill">{STORY.topic}</span>
          <span className="story-read-time">
            <Clock size={13} strokeWidth={1.5} />
            {STORY.readTime} min read
          </span>
        </div>

        {/* Title */}
        <h1 className="story-title">{STORY.title}</h1>

        {/* Author */}
        <div className="story-author-row">
          <div className="avatar-wrapper">
            <div className="avatar avatar-md avatar-initials" style={{ fontSize: '0.8rem' }}>
              {STORY.initials}
            </div>
            {STORY.online && <span className="avatar-status" />}
          </div>
          <div>
            <div className="t-label" style={{ color: 'var(--text-primary)' }}>{STORY.author}</div>
            <div className="t-meta">{STORY.timeAgo}</div>
          </div>
          <span className="story-mood-badge">
            {STORY.mood.emoji} {STORY.mood.label}
          </span>
        </div>

        {/* Body */}
        <div className="story-body" ref={articleRef}>
          {STORY.body.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>

        {/* Reactions */}
        <div className="story-reactions">
          <p className="story-reactions-label">Did this story land with you?</p>
          <div className="story-reactions-row">
            <button
              className={`reaction-btn${liked ? ' is-liked' : ''}`}
              onClick={handleLike}
              aria-pressed={liked}
            >
              <Heart size={15} strokeWidth={1.5} fill={liked ? 'currentColor' : 'none'} className="reaction-icon" />
              {likeCount > 0 ? `Resonates ${likeCount}` : 'Resonate'}
            </button>
            <button className="reaction-btn">
              <ThumbsDown size={15} strokeWidth={1.5} />
              {STORY.comments}
            </button>
            <button
              className={`reaction-btn${saved ? ' is-liked' : ''}`}
              onClick={() => setSaved(!saved)}
              style={saved ? { borderColor: 'var(--soul-300)', background: 'var(--soul-50)', color: 'var(--soul-600)' } : {}}
            >
              <Bookmark size={15} strokeWidth={1.5} fill={saved ? 'currentColor' : 'none'} />
              Save
            </button>
            <button className="reaction-btn">
              <Share2 size={15} strokeWidth={1.5} />
              Share
            </button>
          </div>
        </div>

        {/* Comments */}
        <div className="comments-section reveal">
          <h2 className="t-title" style={{ marginBottom: 'var(--space-6)' }}>
            Comments ({comments.length})
          </h2>
          <div className="comment-input-area">
            <textarea
              className="comment-input"
              placeholder="Share a thought..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter' && e.metaKey) handleComment(); }}
            />
          </div>
          {comment.trim() && (
            <button className="btn btn-primary btn-sm" style={{ marginBottom: 'var(--space-6)' }} onClick={handleComment}>
              <Send size={14} strokeWidth={2} /> Post comment
            </button>
          )}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {comments.map((c) => (
              <div key={c.id} className="comment-item">
                <div className="avatar avatar-sm avatar-initials" style={{ fontSize: '0.65rem', flexShrink: 0 }}>
                  {c.initials}
                </div>
                <div className="comment-body">
                  <div style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'baseline' }}>
                    <span className="comment-author">{c.author}</span>
                    <span className="t-meta">{c.timeAgo}</span>
                  </div>
                  <p className="comment-text">{c.text}</p>
                  <div className="comment-actions">
                    <button className="comment-action-btn">Reply</button>
                    <button className="comment-action-btn">❤ Like</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
