import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, LogOut, Edit3 } from 'lucide-react';
import Topbar from '../components/Topbar';
import PostCard from '../components/PostCard';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { useReveal } from '../hooks/useReveal';

const MY_STORIES = [
  { id: 1, author: 'You', initials: 'Y', online: true, timeAgo: '2h ago', tag: 'Growth', title: 'Learning to rest without guilt', excerpt: 'Productivity culture had convinced me that rest was a reward earned through exhaustion. I spent years running on empty...', readTime: 6, likes: 89, comments: 21 },
  { id: 2, author: 'You', initials: 'Y', online: true, timeAgo: '1w ago', tag: 'Mindfulness', title: 'Five minutes in the morning', excerpt: 'I am not a morning person, and I am deeply suspicious of wellness advice that promises transformation through habit...', readTime: 3, likes: 44, comments: 12 },
];

const TOPIC_COLORS = ['var(--soul-100)', 'var(--sage-100)', 'var(--dusk-100)', 'var(--bloom-100)'];

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Stories');
  useReveal();

  const handleLogout = () => {
    logout();
    addToast({ message: 'See you next time 🌿', type: 'info', icon: '🌿' });
    navigate('/');
  };

  if (!user) {
    return (
      <>
        <Topbar />
        <div className="page-wrapper" style={{ textAlign: 'center', paddingTop: 'var(--space-20)' }}>
          <p className="t-body" style={{ color: 'var(--text-secondary)' }}>Sign in to view your profile.</p>
        </div>
      </>
    );
  }

  const topics = user.topics?.length ? user.topics : ['Growth', 'Mindfulness', 'Joy'];

  return (
    <>
      <Topbar />
      <div className="page-wrapper" style={{ maxWidth: 'var(--container-md)', margin: '0 auto' }}>
        {/* Profile header */}
        <div className="card reveal" style={{ padding: 'var(--space-8)', marginBottom: 'var(--space-6)' }}>
          <div style={{ display: 'flex', gap: 'var(--space-6)', alignItems: 'flex-start', flexWrap: 'wrap' }}>
            <div className="avatar avatar-xl avatar-initials" style={{ fontSize: '1.8rem', flexShrink: 0 }}>
              {user.firstName?.[0]}{user.lastName?.[0] || ''}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <h1 className="t-section" style={{ marginBottom: 'var(--space-1)' }}>
                {user.firstName} {user.lastName}
              </h1>
              <div className="t-meta" style={{ marginBottom: 'var(--space-2)' }}>@{user.username}</div>
              {user.email && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-1)', marginBottom: 'var(--space-4)' }}>
                  <MapPin size={13} strokeWidth={1.5} color="var(--text-muted)" />
                  <span className="t-meta">Joined Lumina</span>
                </div>
              )}
              <p className="t-body" style={{ color: 'var(--text-secondary)', marginBottom: 'var(--space-4)', fontStyle: 'italic' }}>
                "Writing to understand myself."
              </p>

              {/* Topics */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)', marginBottom: 'var(--space-4)' }}>
                {topics.slice(0, 5).map((t, i) => (
                  <span key={t} style={{ padding: '2px 12px', borderRadius: 'var(--radius-full)', background: TOPIC_COLORS[i % TOPIC_COLORS.length], fontSize: 'var(--text-xs)', fontFamily: 'var(--font-body)', fontWeight: 'var(--weight-semibold)', color: 'var(--text-secondary)' }}>
                    {t}
                  </span>
                ))}
              </div>

              <div style={{ display: 'flex', gap: 'var(--space-6)', marginBottom: 'var(--space-6)' }}>
                <div className="t-meta"><strong style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-body)' }}>{MY_STORIES.length}</strong> stories</div>
                <div className="t-meta"><strong style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-body)' }}>133</strong> resonances</div>
              </div>

              <div style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
                <button className="btn btn-secondary btn-sm">
                  <Edit3 size={14} strokeWidth={1.5} />
                  Edit profile
                </button>
                <button className="btn btn-ghost btn-sm" onClick={handleLogout} style={{ color: 'var(--bloom-500)' }}>
                  <LogOut size={14} strokeWidth={1.5} />
                  Sign out
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: 'var(--space-1)', marginBottom: 'var(--space-6)', borderBottom: '1px solid var(--border-soft)', paddingBottom: 'var(--space-3)' }}>
          {['Stories', 'Saved'].map((tab) => (
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

        {/* Posts */}
        <div className="reveal-group" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
          {MY_STORIES.map((post) => (
            <PostCard key={post.id} post={{ ...post, author: `${user.firstName} ${user.lastName}`.trim(), initials: `${user.firstName?.[0] || ''}${user.lastName?.[0] || ''}` }} />
          ))}
        </div>
      </div>
    </>
  );
}
