import { useState, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Eye, Save, Bold, Italic, Quote, List, Link2, ChevronDown } from 'lucide-react';
import { useToast } from '../context/ToastContext';
import { initWellbeingMonitor } from '../js/features/wellbeing-safety';

const TOPICS = ['Growth', 'Joy', 'Grief', 'Love', 'Purpose', 'Mindfulness', 'Healing', 'Wisdom', 'Connection', 'Peace'];
const MOODS = [
  { emoji: '😊', label: 'Hopeful' },
  { emoji: '😢', label: 'Sad' },
  { emoji: '🤔', label: 'Reflective' },
  { emoji: '🥺', label: 'Vulnerable' },
  { emoji: '😤', label: 'Frustrated' },
  { emoji: '🤩', label: 'Grateful' },
  { emoji: '😶', label: 'Numb' },
];

const MAX_CHARS = 3000;

export default function WritePage() {
  const { addToast } = useToast();
  const navigate = useNavigate();
  const bodyRef = useRef(null);
  const titleRef = useRef(null);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [topic, setTopic] = useState('');
  const [selectedMood, setSelectedMood] = useState(null);
  const [anonymous, setAnonymous] = useState(false);
  const [allowComments, setAllowComments] = useState(true);
  const [topicOpen, setTopicOpen] = useState(false);

  const remaining = MAX_CHARS - body.length;
  const pct = (body.length / MAX_CHARS) * 100;

  const autoGrow = (ref) => {
    if (ref.current) {
      ref.current.style.height = 'auto';
      ref.current.style.height = ref.current.scrollHeight + 'px';
    }
  };

  useEffect(() => { autoGrow(titleRef); }, [title]);
  useEffect(() => { autoGrow(bodyRef); }, [body]);
  useEffect(() => { initWellbeingMonitor('.write-body-input'); }, []);

  const handlePublish = () => {
    if (!body.trim()) {
      addToast({ message: 'Add a few words first. There\'s no rush.', type: 'info', icon: '✍️' });
      return;
    }
    addToast({ message: 'Your story is out there. Someone needed it.', type: 'success', icon: '🌿', duration: 4000 });
    navigate('/feed');
  };

  const handleSaveDraft = () => {
    addToast({ message: 'Draft saved. Your words are safe.', type: 'info', icon: '📝' });
  };

  return (
    <div className="write-page">
      {/* Write topbar */}
      <div className="write-topbar">
        <Link to="/feed" className="btn btn-ghost btn-sm" style={{ gap: 'var(--space-1)' }}>
          <ArrowLeft size={16} strokeWidth={1.5} />
          Back
        </Link>
        <div style={{ flex: 1 }} />
        <button className="btn btn-ghost btn-sm" onClick={handleSaveDraft}>
          <Save size={15} strokeWidth={1.5} />
          Save draft
        </button>
        <button className="btn btn-ghost btn-sm">
          <Eye size={15} strokeWidth={1.5} />
          Preview
        </button>
        <button className="btn btn-primary btn-sm" onClick={handlePublish}>
          Share this story →
        </button>
      </div>

      <div className="write-container">
        {/* Topic picker */}
        <div className="write-topic-picker" style={{ position: 'relative' }}>
          <button
            className="write-topic-btn"
            onClick={() => setTopicOpen(!topicOpen)}
          >
            {topic || 'Choose a topic'}
            <ChevronDown size={14} strokeWidth={1.5} style={{ transition: 'transform 0.2s', transform: topicOpen ? 'rotate(180deg)' : 'none' }} />
          </button>
          {topicOpen && (
            <div className="card card--compact" style={{ position: 'absolute', top: 'calc(100% + var(--space-2))', left: 0, zIndex: 10, minWidth: '200px', display: 'flex', flexDirection: 'column', gap: 'var(--space-1)', padding: 'var(--space-2)' }}>
              {TOPICS.map((t) => (
                <button
                  key={t}
                  className="btn btn-ghost"
                  style={{ justifyContent: 'flex-start', fontWeight: topic === t ? 'var(--weight-semibold)' : 'var(--weight-regular)', color: topic === t ? 'var(--soul-600)' : 'var(--text-body)' }}
                  onClick={() => { setTopic(t); setTopicOpen(false); }}
                >
                  {t}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Mood selector */}
        <p className="write-mood-label">How are you feeling right now?</p>
        <div className="mood-selector">
          {MOODS.map((m) => (
            <button
              key={m.label}
              className={`mood-pill${selectedMood === m.label ? ' is-selected' : ''}`}
              onClick={() => setSelectedMood(selectedMood === m.label ? null : m.label)}
            >
              {m.emoji} {m.label}
            </button>
          ))}
        </div>

        {/* Title */}
        <textarea
          ref={titleRef}
          className="write-title-input"
          placeholder="Give it a title, or don't."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          rows={1}
          maxLength={120}
        />

        {/* Formatting toolbar */}
        <div className="write-toolbar">
          {[
            { icon: Bold, label: 'Bold' },
            { icon: Italic, label: 'Italic' },
            { icon: Quote, label: 'Quote' },
            { icon: List, label: 'List' },
            { icon: Link2, label: 'Link' },
          ].map(({ icon: Icon, label }) => (
            <button key={label} className="toolbar-btn" title={label} aria-label={label}>
              <Icon size={15} strokeWidth={1.5} />
            </button>
          ))}
          <div className="toolbar-sep" />
          <div
            className={`write-char-counter${pct > 85 ? ' is-near-limit' : ''}${pct >= 100 ? ' is-at-limit' : ''}`}
            style={{ marginLeft: 'auto' }}
          >
            {body.length} / {MAX_CHARS}
          </div>
        </div>

        {/* Body */}
        <textarea
          ref={bodyRef}
          className="write-body-input"
          placeholder="Start wherever feels true. You can always edit."
          value={body}
          onChange={(e) => {
            if (e.target.value.length <= MAX_CHARS) setBody(e.target.value);
          }}
          rows={10}
        />

        {/* Options */}
        <div className="write-options">
          <label className="write-toggle-label">
            <button
              className={`write-toggle${anonymous ? ' is-on' : ''}`}
              onClick={() => setAnonymous(!anonymous)}
              aria-pressed={anonymous}
              aria-label="Share without your name"
            />
            Share without your name
          </label>
          <label className="write-toggle-label">
            <button
              className={`write-toggle${allowComments ? ' is-on' : ''}`}
              onClick={() => setAllowComments(!allowComments)}
              aria-pressed={allowComments}
              aria-label="Let people respond to this"
            />
            Let people respond to this
          </label>
        </div>

        <button className="btn btn-primary btn-lg" style={{ width: '100%' }} onClick={handlePublish}>
          Share this story →
        </button>
      </div>
    </div>
  );
}
