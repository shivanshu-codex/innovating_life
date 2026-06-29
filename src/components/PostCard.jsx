import { useState } from 'react';
import { Heart, MessageCircle, Bookmark, Share2, Clock } from 'lucide-react';

export default function PostCard({ post }) {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes);

  function handleLike() {
    if (liked) {
      setLiked(false);
      setLikeCount((n) => n - 1);
    } else {
      setLiked(true);
      setLikeCount((n) => n + 1);
    }
  }

  return (
    <article className="card card-interactive reveal">
      {/* Author row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-4)' }}>
        <div className="avatar-wrapper">
          <div
            className="avatar avatar-md avatar-initials"
            style={{ fontSize: '1rem' }}
            aria-label={post.author}
          >
            {post.initials}
          </div>
          {post.online && <span className="avatar-status" aria-label="Online" />}
        </div>
        <div style={{ flex: 1 }}>
          <div className="t-label" style={{ color: 'var(--text-primary)' }}>{post.author}</div>
          <div className="t-meta">{post.timeAgo}</div>
        </div>
        <span
          style={{
            background: 'var(--soul-100)',
            color: 'var(--soul-700)',
            padding: '2px 10px',
            borderRadius: 'var(--radius-full)',
            fontSize: 'var(--text-xs)',
            fontWeight: 'var(--weight-semibold)',
            fontFamily: 'var(--font-body)',
            letterSpacing: 'var(--tracking-wide)',
          }}
        >
          {post.tag}
        </span>
      </div>

      {/* Content */}
      <h3 className="t-title" style={{ marginBottom: 'var(--space-3)' }}>{post.title}</h3>
      <p className="t-body" style={{
        marginBottom: 'var(--space-4)',
        display: '-webkit-box',
        WebkitLineClamp: 3,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
      }}>
        {post.excerpt}
      </p>

      {/* Reading time */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-1)', marginBottom: 'var(--space-5)' }}>
        <Clock size={13} strokeWidth={1.5} color="var(--text-muted)" />
        <span className="t-meta">{post.readTime} min read</span>
      </div>

      {/* Reaction row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', borderTop: '1px solid var(--border-soft)', paddingTop: 'var(--space-4)' }}>
        <button
          className={`reaction-btn ${liked ? 'is-liked' : ''}`}
          onClick={handleLike}
          aria-pressed={liked}
          aria-label={liked ? 'Unlike' : 'Like this post'}
        >
          <Heart
            size={15}
            strokeWidth={1.5}
            fill={liked ? 'currentColor' : 'none'}
            className="reaction-icon"
          />
          {likeCount > 0 ? likeCount : 'Resonate'}
        </button>
        <button className="reaction-btn" aria-label="Comment">
          <MessageCircle size={15} strokeWidth={1.5} />
          {post.comments}
        </button>
        <div style={{ flex: 1 }} />
        <button
          className={`reaction-btn ${saved ? 'is-liked' : ''}`}
          onClick={() => setSaved(!saved)}
          aria-label={saved ? 'Unsave' : 'Save post'}
          style={saved ? { borderColor: 'var(--soul-300)', background: 'var(--soul-50)', color: 'var(--soul-600)' } : {}}
        >
          <Bookmark size={15} strokeWidth={1.5} fill={saved ? 'currentColor' : 'none'} />
        </button>
        <button className="reaction-btn" aria-label="Share">
          <Share2 size={15} strokeWidth={1.5} />
        </button>
      </div>
    </article>
  );
}
