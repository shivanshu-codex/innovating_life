import { useEffect } from 'react';
import Topbar from '../components/Topbar';
import PostCard from '../components/PostCard';
import Feed from '../components/Feed';
import { useReveal } from '../hooks/useReveal';
import { MetaManager } from '../js/seo/meta-manager';

const TOPICS = [
  { label: 'Growth',      emoji: '🌱', color: 'var(--sage-100)',  border: 'var(--sage-200)' },
  { label: 'Joy',         emoji: '😊', color: 'var(--soul-100)',  border: 'var(--soul-200)' },
  { label: 'Love',        emoji: '❤️', color: 'var(--bloom-100)', border: 'var(--bloom-200)' },
  { label: 'Mindfulness', emoji: '🧘', color: 'var(--dusk-100)',  border: 'var(--dusk-200)' },
  { label: 'Purpose',     emoji: '⭐', color: 'var(--soul-50)',   border: 'var(--soul-200)' },
  { label: 'Healing',     emoji: '🌿', color: 'var(--sage-50)',   border: 'var(--sage-200)' },
  { label: 'Grief',       emoji: '🌊', color: 'var(--dusk-50)',   border: 'var(--dusk-200)' },
  { label: 'Connection',  emoji: '🤝', color: 'var(--bloom-50)',  border: 'var(--bloom-200)' },
];

export default function ExplorePage() {
  useReveal();
  useEffect(() => { MetaManager.forExplore(); }, []);
  return (
    <>
      <Topbar title="Explore" />
      <div className="page-wrapper">
        {/* Page header */}
        <div className="reveal" style={{ marginBottom: 'var(--space-8)' }}>
          <h1 className="t-section" style={{ marginBottom: 'var(--space-2)' }}>Stories from people living it.</h1>
          <p className="t-body" style={{ color: 'var(--text-secondary)', maxWidth: '560px' }}>
            No algorithms. Just honest writing from real humans around the world.
          </p>
        </div>

        {/* Topic cloud */}
        <div className="reveal" style={{ marginBottom: 'var(--space-10)' }}>
          <h2 className="t-title" style={{ marginBottom: 'var(--space-2)', fontSize: 'var(--text-lg)' }}>Browse by topic</h2>
          <p className="t-body" style={{ color: 'var(--text-secondary)', marginBottom: 'var(--space-6)' }}>
            Find stories that speak to where you are right now.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-3)' }}>
            {TOPICS.map((t) => (
              <button
                key={t.label}
                className="card card--compact card-interactive"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 'var(--space-2)',
                  background: t.color,
                  border: `1px solid ${t.border}`,
                  padding: 'var(--space-3) var(--space-5)',
                  cursor: 'pointer',
                  fontSize: 'var(--text-base)',
                  fontFamily: 'var(--font-body)',
                  fontWeight: 'var(--weight-medium)',
                  color: 'var(--text-body)',
                }}
              >
                {t.emoji} {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* All stories */}
        <Feed />
      </div>
    </>
  );
}
