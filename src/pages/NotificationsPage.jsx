import Topbar from '../components/Topbar';
import { notificationCopy } from '../data/notification-copy';

const NOTIFICATIONS = [
  { id: 1, group: 'Today', icon: '♥', type: 'resonate', text: notificationCopy.resonated_single('Priya'), excerpt: '"What joy felt like at 3am"', time: '2 minutes ago', unread: true },
  { id: 2, group: 'Today', icon: '💬', type: 'comment', text: notificationCopy.comment_reply('Arjun'), excerpt: '"That\'s exactly how I felt too..."', time: '1 hour ago', unread: true },
  { id: 3, group: 'Today', icon: '✨', type: 'save', text: notificationCopy.story_saved_updated('Lena'), excerpt: '"The day I stopped pretending"', time: '3 hours ago', unread: false },
  { id: 4, group: 'Yesterday', icon: '📖', type: 'update', text: notificationCopy.story_from_follow('Tariq'), excerpt: '"On learning to let go"', time: 'Yesterday at 9pm', unread: false },
  { id: 5, group: 'Yesterday', icon: '🌿', type: 'suggest', text: notificationCopy.follow_new('Meera'), excerpt: 'Meera writes about Growth, like you', time: 'Yesterday at 2pm', unread: false },
  { id: 6, group: 'Earlier', icon: '♥', type: 'resonate', text: notificationCopy.resonated_milestone_10(), excerpt: '"Learning to rest without guilt"', time: '3 days ago', unread: false },
];

export default function NotificationsPage() {
  const groups = [...new Set(NOTIFICATIONS.map((n) => n.group))];
  const hasNotifications = NOTIFICATIONS.length > 0;

  return (
    <>
      <Topbar title="Notifications" />
      <div className="page-wrapper" style={{ maxWidth: 'var(--container-sm)', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-6)' }}>
          <h1 className="t-section">What happened</h1>
          {hasNotifications && (
            <button className="btn btn-ghost btn-sm" style={{ color: 'var(--soul-600)' }}>
              Mark all read
            </button>
          )}
        </div>

        {!hasNotifications && (
          <div style={{ textAlign: 'center', padding: 'var(--space-16) var(--space-6)' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: 'var(--space-4)' }}>🌿</div>
            <h2 className="t-title" style={{ marginBottom: 'var(--space-3)', maxWidth: '340px', margin: '0 auto var(--space-3)' }}>
              Nothing yet — but you're here, and that counts.
            </h2>
            <p className="t-body" style={{ color: 'var(--text-secondary)', maxWidth: '280px', margin: '0 auto var(--space-6)' }}>
              When people resonate with your stories, you'll hear about it here.
            </p>
            <a href="/write" className="btn btn-primary btn-sm">Share a story</a>
          </div>
        )}

        {groups.map((group) => (
          <div key={group}>
            <div className="notif-date-label">{group}</div>
            <div className="card" style={{ padding: 'var(--space-2)', marginBottom: 'var(--space-4)' }}>
              {NOTIFICATIONS.filter((n) => n.group === group).map((notif, i, arr) => (
                <div key={notif.id}>
                  <div className={`notif-item${notif.unread ? ' is-unread' : ''}`}>
                    <div className="notif-icon">{notif.icon}</div>
                    <div className="notif-body">
                      <p className="notif-text">{notif.text}</p>
                      <p className="notif-excerpt">{notif.excerpt}</p>
                      <p className="notif-time">{notif.time}</p>
                    </div>
                  </div>
                  {i < arr.length - 1 && (
                    <div style={{ height: '1px', background: 'var(--border-soft)', margin: '0 var(--space-4)' }} />
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
