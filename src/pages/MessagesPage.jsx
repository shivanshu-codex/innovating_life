import { useState, useRef, useEffect } from 'react';
import { Search, Send, ArrowLeft } from 'lucide-react';
import Topbar from '../components/Topbar';

const CONVERSATIONS = [
  { id: 1, name: 'Priya Sharma', initials: 'PS', color: '#FFB3AA', preview: 'That was so beautiful ♥', time: '2m', unread: true, online: true },
  { id: 2, name: 'Arjun Mehta', initials: 'AM', color: '#8DD1A4', preview: 'Thank you for sharing this', time: '1h', unread: false, online: false },
  { id: 3, name: 'Lena Kovárová', initials: 'LK', color: '#BFA8FF', preview: 'I felt exactly the same way', time: '3h', unread: true, online: true },
  { id: 4, name: 'Tariq Mansouri', initials: 'TM', color: '#FFD166', preview: 'Your story helped me today', time: '1d', unread: false, online: false },
];

const THREAD_MESSAGES = [
  { id: 1, from: 'them', text: 'I just finished reading your story about grief. It moved me deeply.', time: '10:24 AM' },
  { id: 2, from: 'me', text: 'Thank you, that means a lot. It was hard to write.', time: '10:26 AM' },
  { id: 3, from: 'them', text: 'That was so beautiful ♥ The part about the lamp going dim — I felt seen.', time: '10:27 AM' },
  { id: 4, from: 'me', text: 'I am really glad it landed. Writing it helped me too.', time: '10:30 AM' },
];

export default function MessagesPage() {
  const [activeConvo, setActiveConvo] = useState(null);
  const [messages, setMessages] = useState(THREAD_MESSAGES);
  const [input, setInput] = useState('');
  const [showTyping, setShowTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const activeData = CONVERSATIONS.find((c) => c.id === activeConvo);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim()) return;
    const newMsg = { id: Date.now(), from: 'me', text: input, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    setMessages((prev) => [...prev, newMsg]);
    setInput('');
    setShowTyping(true);
    setTimeout(() => {
      setShowTyping(false);
      setMessages((prev) => [...prev, { id: Date.now() + 1, from: 'them', text: 'That means a lot — thank you for sharing.', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
    }, 2000);
  };

  return (
    <>
      <Topbar title="Messages" />
      <div className="messages-layout">
        {/* Sidebar list */}
        <div className={`messages-sidebar${activeConvo ? '' : ''}`}>
          <div className="messages-sidebar-header">Messages</div>
          <div className="messages-search">
            <Search size={14} className="messages-search-icon" strokeWidth={1.5} />
            <input type="search" placeholder="Search conversations..." />
          </div>
          {CONVERSATIONS.map((c) => (
            <div
              key={c.id}
              className={`convo-item${activeConvo === c.id ? ' is-active' : ''}`}
              onClick={() => setActiveConvo(c.id)}
            >
              <div className="avatar-wrapper">
                <div className="avatar avatar-md" style={{ backgroundColor: c.color, border: '2px solid var(--surface-card)' }} />
                {c.online && <span className="avatar-status" />}
              </div>
              <div className="convo-info">
                <div className="convo-name">{c.name}</div>
                <div className="convo-preview">{c.preview}</div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 'var(--space-1)', flexShrink: 0 }}>
                <span className="convo-time">{c.time}</span>
                {c.unread && <span className="convo-unread-dot" />}
              </div>
            </div>
          ))}
        </div>

        {/* Thread or empty state */}
        {!activeConvo ? (
          <div className="messages-empty">
            <div style={{ fontSize: '3rem', marginBottom: 'var(--space-4)' }}>💬</div>
            <h2 className="t-title" style={{ marginBottom: 'var(--space-3)', maxWidth: '360px' }}>The quietest conversations start with one hello.</h2>
            <p className="t-body" style={{ color: 'var(--text-secondary)', maxWidth: '280px', marginBottom: 'var(--space-6)' }}>
              Message someone whose story stayed with you.
            </p>
            <a href="/explore" className="btn btn-secondary btn-sm">Explore stories</a>
          </div>
        ) : (
          <div className="chat-thread">
            {/* Chat header */}
            <div className="chat-header">
              <button className="btn btn-icon btn-ghost" onClick={() => setActiveConvo(null)} aria-label="Back to list" style={{ display: 'none' }} id="chat-back">
                <ArrowLeft size={18} strokeWidth={1.5} />
              </button>
              <div className="avatar-wrapper">
                <div className="avatar avatar-md" style={{ backgroundColor: activeData?.color }} />
                {activeData?.online && <span className="avatar-status" />}
              </div>
              <div>
                <div className="t-label" style={{ color: 'var(--text-primary)' }}>{activeData?.name}</div>
                <div className="t-meta">{activeData?.online ? 'Active now' : 'Offline'}</div>
              </div>
            </div>

            {/* Messages */}
            <div className="chat-messages">
              <div className="chat-date-label">Today</div>
              {messages.map((m) => (
                <div key={m.id} className={m.from === 'me' ? 'sent-row' : 'received-row'}>
                  <div className={`chat-bubble chat-bubble-${m.from === 'me' ? 'sent' : 'received'}`}>
                    {m.text}
                  </div>
                  <div className="chat-bubble-time">{m.time}</div>
                </div>
              ))}
              {showTyping && (
                <div className="received-row">
                  <div className="typing-indicator">
                    <div className="typing-dot" />
                    <div className="typing-dot" />
                    <div className="typing-dot" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="chat-input-bar">
              <textarea
                className="chat-input"
                placeholder="Say something..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); } }}
                rows={1}
              />
              <button
                className="chat-send-btn"
                onClick={sendMessage}
                disabled={!input.trim()}
                aria-label="Send message"
              >
                <Send size={18} strokeWidth={2} />
              </button>
            </div>
          </div>
        )}
      </div>
      <style>{`@media (max-width: 767px) { #chat-back { display: flex !important; } }`}</style>
    </>
  );
}
