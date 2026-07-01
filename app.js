/* ============================================================
   INNOVATING LIFE — App Logic v2
   ============================================================ */

'use strict';

/* ─── ORACLE MESSAGES (Part 7: 24+ messages) ─────────────── */
const ORACLE_MESSAGES = {
  morning: [
    {
      message: "This morning holds an invitation for you, {name}. In {city} and everywhere else, the day begins before we're ready — but perhaps readiness is overrated. What if you simply showed up, exactly as you are, and let life surprise you?",
      quote: "The morning comes whether you set the alarm or not. — Ursula K. Le Guin"
    },
    {
      message: "Good morning, {name}. The first thought you had today — that small flicker before the world rushed in — that was the truest version of you. Everything else is negotiation. Honor that flicker.",
      quote: "Each morning we are born again. What we do today is what matters most. — Buddha"
    },
    {
      message: "There's something almost sacred about the hour you find yourself in now, {name}. {city} is waking up around you, and so are you — not just from sleep, but from yesterday's version of yourself.",
      quote: "With the new day comes new strength and new thoughts. — Eleanor Roosevelt"
    }
  ],
  afternoon: [
    {
      message: "Mid-afternoon in {city} — and somewhere in the rhythm of your day, {name}, you paused here. That pause is not nothing. It might be the most alive moment you've had today. What does your life feel like right now, at this exact moment?",
      quote: "The present moment always will have been. — Unknown"
    },
    {
      message: "You've made it to the middle of the day, {name}. Not everything has gone to plan — it rarely does. But here you are, still navigating, still thinking, still curious. That counts for more than you know.",
      quote: "Life is what happens when you're busy making other plans. — John Lennon"
    },
    {
      message: "Somewhere in {city} right now, someone is laughing loudly, someone is crying quietly, someone is falling in love. And you, {name}, are here — thinking about what it means to live. That is not nothing. That is everything.",
      quote: "Not all those who wander are lost. — J.R.R. Tolkien"
    }
  ],
  evening: [
    {
      message: "The evening belongs to reflection, {name}. As {city} settles into night, what part of today would you want to carry into tomorrow? Not the whole day — just a thread. That thread is your compass.",
      quote: "At the end of the day, let there be no excuses, no explanations, no regrets. — Steve Maraboli"
    },
    {
      message: "Evening has a way of softening things, {name}. The urgencies of morning seem smaller now. What feels true to you tonight — not what should be true, or what you wish were true — just what actually feels real?",
      quote: "The evening is an invitation to rest in who you are before the world asks you to be something else. — Unknown"
    },
    {
      message: "You are ending this day, {name}, having survived every hard moment so far — which is a perfect record. {city} grows quiet. Let your mind grow quiet too, just for now.",
      quote: "Be kind to yourself this evening. — Atticus"
    }
  ],
  any: [
    {
      message: "Life, {name}, is less a destination than a practice. And like any practice — music, meditation, love — it demands your presence more than your perfection. What are you practicing today?",
      quote: "We are what we repeatedly do. Excellence, then, is not an act, but a habit. — Aristotle"
    },
    {
      message: "{name}, from {city}: your perspective on living matters more than you think. Not because it will change the world (though it might), but because naming what you believe helps you live it more faithfully.",
      quote: "An unexamined life is not worth living. — Socrates"
    },
    {
      message: "The question isn't whether you are living the 'right' life, {name}. The question is whether the life you're living feels like yours. Do you recognize yourself in it?",
      quote: "To live is the rarest thing in the world. Most people exist, that is all. — Oscar Wilde"
    },
    {
      message: "People in {city} and everywhere carry invisible weights, {name}. You do too. The goal isn't to have no weight — it's to carry yours with dignity and set it down sometimes. What do you need to set down today?",
      quote: "You don't have to be positive all the time. — Lori Deschene"
    },
    {
      message: "There is a version of your life that is entirely possible from where you stand today, {name}. Not a perfect version. Not a dramatically different one. Just one where you're slightly more honest, slightly more present, slightly more yourself.",
      quote: "The only journey is the one within. — Rainer Maria Rilke"
    },
    {
      message: "Something brought you here today, {name}. Maybe curiosity. Maybe loneliness. Maybe a question you can't stop turning over. Whatever it was — trust it. It knows more than you think.",
      quote: "Follow the energy of what makes you come alive. — Howard Thurman"
    },
    {
      message: "In {city} and in the quiet of your own mind, {name}, you've been carrying ideas about life that deserve to be spoken. This is the place. No performance needed — just your honest voice.",
      quote: "Your story is the greatest legacy that you will leave to your friends. — Steve Saint"
    },
    {
      message: "You will not live this day again, {name}. That is not a threat — it is an invitation. What would make today, even slightly, worth the fact that it existed?",
      quote: "Do not go where the path may lead; go instead where there is no path and leave a trail. — Ralph Waldo Emerson"
    },
    {
      message: "The most radical thing you can do in a world of noise, {name}, is to know what you actually think. Not what you should think. Not what is trending. What you, living your life in {city}, actually believe about how to be alive.",
      quote: "Dare to be yourself. — Andre Gide"
    },
    {
      message: "{name}, the people who have shaped you most probably don't know it. And you have shaped others in ways you'll never fully see. We're all invisible threads in each other's stories. What story are you threading into the world right now?",
      quote: "No man is an island, entire of itself. — John Donne"
    },
    {
      message: "If your life were a book, {name}, this chapter — the one you're living right now — what would it be titled? Not what you wish it were titled. What it actually is.",
      quote: "Life isn't about finding yourself. Life is about creating yourself. — George Bernard Shaw"
    },
    {
      message: "There is so much pressure to have life figured out, {name}. To have the answer. But the people who seem most alive are often the ones most comfortable not knowing — and still showing up anyway.",
      quote: "Embrace uncertainty. Some of the most beautiful chapters in our lives won't have a title until much later. — Bob Goff"
    }
  ]
};

/* ─── STATE ──────────────────────────────────────────────── */
let posts = [];
let selectedMood = null;
let activeFilter = 'all';
let activeReportPostId = null;
let currentQuestionContext = null;
let editMode = false;
let editPostId = null;

/* ─── AVATAR COLORS ──────────────────────────────────────── */
const AVATAR_COLORS = [
  '#7C5CFC','#E8A0BF','#7EC8C8','#7AB89B','#E8A849',
  '#C47A6A','#A78BFA','#B5537A','#0E7490','#1A5C42'
];

function avatarColor(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = ((h << 5) - h + str.charCodeAt(i)) | 0;
  return AVATAR_COLORS[Math.abs(h) % AVATAR_COLORS.length];
}

function initials(name) {
  return name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
}

/* ─── TIME OF DAY (Part 7) ───────────────────────────────── */
function getTimeOfDay() {
  const h = new Date().getHours();
  if (h >= 5 && h < 12) return 'morning';
  if (h >= 12 && h < 17) return 'afternoon';
  return 'evening';
}

/* ─── ORACLE MESSAGE (Part 7) ────────────────────────────── */
function getOracleMessage(name, city) {
  const seen = JSON.parse(localStorage.getItem('il_oracle_seen') || '[]');
  const tod = getTimeOfDay();
  const todPool = ORACLE_MESSAGES[tod] || [];
  const anyPool = ORACLE_MESSAGES.any;
  const allMsgs = [...todPool, ...anyPool];
  const unseen = allMsgs.filter((_, i) => !seen.includes(tod + ':' + i));
  const pool = unseen.length ? unseen : allMsgs;
  const idx = Math.floor(Math.random() * pool.length);
  const chosen = pool[idx];
  const seenKey = tod + ':' + allMsgs.indexOf(chosen);
  if (!seen.includes(seenKey)) {
    seen.push(seenKey);
    if (seen.length > 20) seen.splice(0, seen.length - 20);
    localStorage.setItem('il_oracle_seen', JSON.stringify(seen));
  }
  return {
    message: chosen.message.replace(/\{name\}/g, name).replace(/\{city\}/g, city),
    quote: chosen.quote
  };
}

/* ─── HERO STATS (Part 12) ───────────────────────────────── */
function updateHeroStats() {
  const citiesSet = new Set(posts.map(p => p.city).filter(Boolean));
  const wordCount = posts.reduce((sum, p) => sum + (p.content ? p.content.split(/\s+/).length : 0), 0);
  const statPosts = document.getElementById('statPosts');
  const statCities = document.getElementById('statCities');
  const statWords = document.getElementById('statWords');
  if (statPosts) statPosts.dataset.target = Math.max(posts.length, 1200);
  if (statCities) statCities.dataset.target = Math.max(citiesSet.size, 40);
  if (statWords) statWords.dataset.target = Math.max(wordCount, 18000);
  animateCounters();
}

function animateCounters() {
  document.querySelectorAll('[data-target]').forEach(el => {
    const target = parseInt(el.dataset.target) || 0;
    const duration = 1800;
    const step = 16;
    const increment = target / (duration / step);
    let current = 0;
    const timer = setInterval(() => {
      current = Math.min(current + increment, target);
      const n = Math.floor(current);
      el.textContent = n >= 1000 ? (n / 1000).toFixed(1).replace('.0', '') + 'K+' : n + '+';
      if (current >= target) clearInterval(timer);
    }, step);
  });
}

/* ─── LOCAL STORAGE ──────────────────────────────────────── */
function savePosts() { localStorage.setItem('il_posts', JSON.stringify(posts)); }

function loadPosts() {
  try {
    const stored = localStorage.getItem('il_posts');
    if (stored) posts = JSON.parse(stored);
  } catch (e) { posts = []; }
}

function getMyPostIds() {
  try { return JSON.parse(localStorage.getItem('il_my_posts') || '[]'); } catch (e) { return []; }
}
function addMyPostId(id) {
  const mine = getMyPostIds(); mine.push(id);
  localStorage.setItem('il_my_posts', JSON.stringify(mine));
}
function removeMyPostId(id) {
  localStorage.setItem('il_my_posts', JSON.stringify(getMyPostIds().filter(i => i !== id)));
}
function isMyPost(id) { return getMyPostIds().includes(id); }
function getLikes() { try { return JSON.parse(localStorage.getItem('il_likes') || '[]'); } catch (e) { return []; } }
function hasLiked(id) { return getLikes().includes(id); }
function toggleLikeStore(id) {
  const likes = getLikes(); const i = likes.indexOf(id);
  if (i === -1) likes.push(id); else likes.splice(i, 1);
  localStorage.setItem('il_likes', JSON.stringify(likes));
}


/* ─── MOOD COLORS ────────────────────────────────────────── */
const MOOD_COLORS = {
  hopeful:    { bg: '#E8F5E9', text: '#1A5C42', border: '#7AB89B' },
  reflective: { bg: '#EDE9FE', text: '#5B21B6', border: '#A78BFA' },
  grateful:   { bg: '#FFF3E0', text: '#9B6B10', border: '#E8A849' },
  curious:    { bg: '#E0F2FE', text: '#0E7490', border: '#7EC8C8' },
  peaceful:   { bg: '#F0FDF4', text: '#166534', border: '#7AB89B' },
  joyful:     { bg: '#FFF0F6', text: '#B5537A', border: '#E8A0BF' },
  determined: { bg: '#F3E8FF', text: '#7C3AED', border: '#7C5CFC' },
  vulnerable: { bg: '#FFF7ED', text: '#9A3412', border: '#C47A6A' },
  nostalgic:  { bg: '#F5F0EB', text: '#6B5744', border: '#C47A6A' },
  playful:    { bg: '#FFF9EC', text: '#9B6B10', border: '#E8A849' },
  uncertain:  { bg: '#F1F5F9', text: '#475569', border: '#94A3B8' },
  heartbroken:{ bg: '#FFF1F2', text: '#9F1239', border: '#E8A0BF' }
};

/* ─── HTML ESCAPE ────────────────────────────────────────── */
function escHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;')
    .replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

/* ─── TIME AGO ───────────────────────────────────────────── */
function getTimeAgo(ts) {
  const diff = Date.now() - ts;
  const mins = Math.floor(diff / 60000);
  if (mins < 2) return 'just now';
  if (mins < 60) return mins + 'm ago';
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return hrs + 'h ago';
  const days = Math.floor(hrs / 24);
  if (days < 30) return days + 'd ago';
  return new Date(ts).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

/* ─── CREATE POST CARD ────────────────────────────────────── */
function createPostCard(post) {
  const mine = isMyPost(post.id);
  const liked = hasLiked(post.id);
  const color = avatarColor(post.name);
  const init = initials(post.name);
  const timeAgo = getTimeAgo(post.time);
  const isLong = post.content && post.content.length > 200;
  const moodKey = post.mood ? post.mood.toLowerCase() : null;
  const moodStyle = moodKey && MOOD_COLORS[moodKey] ? MOOD_COLORS[moodKey] : null;

  const card = document.createElement('article');
  card.className = 'post-card reveal cat-' + (post.category || '');
  card.dataset.id = post.id;
  card.setAttribute('aria-label', 'Post by ' + escHtml(post.name) + ': ' + escHtml(post.title));

  const ownControls = mine ? `
    <div class="post-own-controls">
      <button class="own-ctrl-btn edit" onclick="editPost('${post.id}')" aria-label="Edit post" title="Edit your post">
        <i class="fa-solid fa-pen" aria-hidden="true"></i>
      </button>
      <button class="own-ctrl-btn del" onclick="deletePost('${post.id}')" aria-label="Delete post" title="Delete your post">
        <i class="fa-solid fa-trash" aria-hidden="true"></i>
      </button>
    </div>` : '';

  const moodBadge = moodStyle
    ? `<span class="post-mood-badge" style="color:${moodStyle.text};border-color:${moodStyle.border};background:${moodStyle.bg}">${escHtml(moodKey)}</span>`
    : '';

  const questionBadge = (post.isQuestion && post.questionText)
    ? `<div class="question-response-badge"><i class="fa-solid fa-lightbulb" aria-hidden="true"></i><span>In response to: <em>${escHtml(post.questionText)}</em></span></div>`
    : '';

  const readMoreBtn = isLong
    ? `<button class="read-more-btn" onclick="toggleReadMore('${post.id}')" aria-expanded="false">Read more <i class="fa-solid fa-chevron-down" aria-hidden="true"></i></button>`
    : '';

  card.innerHTML = `
    ${ownControls}
    <header class="post-card-header">
      <div class="post-avatar" style="background:${color}" aria-hidden="true">${init}</div>
      <div class="post-author-info">
        <div class="post-author-name">${escHtml(post.name)}</div>
        <div class="post-author-location"><i class="fa-solid fa-location-dot" aria-hidden="true"></i>${escHtml(post.city)}</div>
      </div>
      <div class="post-badges">
        <span class="post-category-badge">${escHtml(post.category || 'Life')}</span>
        ${moodBadge}
      </div>
    </header>
    ${questionBadge}
    <h3 class="post-title">${escHtml(post.title)}</h3>
    <p class="post-body${isLong ? ' truncated' : ''}">${escHtml(post.content)}</p>
    ${readMoreBtn}
    <footer class="post-footer">
      <time class="post-time" datetime="${new Date(post.time).toISOString()}">${timeAgo}</time>
      <div class="post-actions">
        <button class="like-btn${liked ? ' liked' : ''}" onclick="likePost('${post.id}', this)" aria-label="${liked ? 'Unlike' : 'Like'} post" aria-pressed="${liked}">
          <i class="fa-${liked ? 'solid' : 'regular'} fa-heart" aria-hidden="true"></i>
          <span>${post.likes || 0}</span>
        </button>
        <button class="action-btn" onclick="sharePost('${post.id}')" aria-label="Share post" title="Share">
          <i class="fa-solid fa-arrow-up-from-bracket" aria-hidden="true"></i>
        </button>
        <button class="action-btn report-btn" onclick="showReportMenu('${post.id}', this)" aria-label="Report post" title="Report">
          <i class="fa-solid fa-flag" aria-hidden="true"></i>
        </button>
      </div>
    </footer>`;

  return card;
}

/* ─── RENDER POSTS ────────────────────────────────────────── */
function renderPosts(filter) {
  const grid = document.getElementById('postsGrid');
  if (!grid) return;
  grid.innerHTML = '';

  let filtered = [...posts];
  if (filter && filter !== 'all') filtered = filtered.filter(p => p.category === filter);
  filtered.sort((a, b) => b.time - a.time);

  if (!filtered.length) {
    grid.innerHTML = `
      <div class="empty-state" style="grid-column:1/-1">
        <div class="empty-illustration" aria-hidden="true">
          <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="60" cy="60" r="50" fill="#F0EBF8"/>
            <path d="M40 60 Q60 38 80 60 Q60 82 40 60Z" fill="#A78BFA" opacity="0.5"/>
            <circle cx="60" cy="60" r="8" fill="#7C5CFC"/>
          </svg>
        </div>
        <p>No stories here yet. Be the first to share in this space.</p>
        <a href="#share" class="btn btn-primary"><i class="fa-solid fa-pen-nib" aria-hidden="true"></i> Share your perspective</a>
      </div>`;
    return;
  }

  filtered.forEach((post, i) => {
    const card = createPostCard(post);
    card.style.animationDelay = Math.min(i * 0.06, 0.4) + 's';
    grid.appendChild(card);
  });
  observeReveal();
}

/* ─── LIKE ───────────────────────────────────────────────── */
function likePost(id, btn) {
  const post = posts.find(p => p.id === id);
  if (!post) return;
  const wasLiked = hasLiked(id);
  toggleLikeStore(id);
  post.likes = wasLiked ? Math.max(0, (post.likes || 0) - 1) : (post.likes || 0) + 1;
  savePosts();
  const icon = btn.querySelector('i');
  const count = btn.querySelector('span');
  btn.classList.toggle('liked', !wasLiked);
  if (icon) {
    icon.className = wasLiked ? 'fa-regular fa-heart' : 'fa-solid fa-heart';
    icon.classList.add('heart-pop');
    setTimeout(() => icon.classList.remove('heart-pop'), 500);
  }
  if (count) count.textContent = post.likes;
  btn.setAttribute('aria-pressed', String(!wasLiked));
  btn.setAttribute('aria-label', (wasLiked ? 'Like' : 'Unlike') + ' post');
}

/* ─── READ MORE (Part 9.2) ───────────────────────────────── */
function toggleReadMore(id) {
  const card = document.querySelector('.post-card[data-id="' + id + '"]');
  if (!card) return;
  const body = card.querySelector('.post-body');
  const btn = card.querySelector('.read-more-btn');
  const expanded = btn.getAttribute('aria-expanded') === 'true';
  body.classList.toggle('truncated', expanded);
  btn.setAttribute('aria-expanded', String(!expanded));
  btn.innerHTML = expanded
    ? 'Read more <i class="fa-solid fa-chevron-down" aria-hidden="true"></i>'
    : 'Show less <i class="fa-solid fa-chevron-up" aria-hidden="true"></i>';
}

/* ─── SHARE ──────────────────────────────────────────────── */
function sharePost(id) {
  const post = posts.find(p => p.id === id);
  if (!post) return;
  const text = '"' + post.title + '" — ' + post.name + ' from ' + post.city + '\n\n' + post.content.slice(0, 120) + '...\n\nRead more on Innovating Life';
  if (navigator.share) {
    navigator.share({ title: post.title, text }).catch(() => {});
  } else {
    navigator.clipboard.writeText(text)
      .then(() => showToast('Post copied to clipboard!'))
      .catch(() => showToast('Copy the URL from your address bar to share.'));
  }
}

/* ─── REPORT (Part 13) ───────────────────────────────────── */
function showReportMenu(postId, btn) {
  closeReport();
  activeReportPostId = postId;
  const dropdown = document.getElementById('reportDropdown');
  if (!dropdown) return;
  const rect = btn.getBoundingClientRect();
  dropdown.style.top = (rect.bottom + window.scrollY + 6) + 'px';
  dropdown.style.left = (rect.left + window.scrollX - 130) + 'px';
  dropdown.removeAttribute('hidden');
  dropdown.style.display = 'block';
  const first = dropdown.querySelector('.report-option');
  if (first) first.focus();
}

function submitReport(reason) {
  closeReport();
  showToast('Report submitted. Thank you for keeping this space safe.');
  activeReportPostId = null;
}

function closeReport() {
  const dropdown = document.getElementById('reportDropdown');
  if (dropdown) { dropdown.setAttribute('hidden', ''); dropdown.style.display = 'none'; }
}

document.addEventListener('click', (e) => {
  const dropdown = document.getElementById('reportDropdown');
  if (dropdown && !dropdown.contains(e.target) && !e.target.closest('.report-btn')) closeReport();
});

/* ─── EDIT / DELETE (Part 6) ─────────────────────────────── */
function editPost(id) {
  const post = posts.find(p => p.id === id);
  if (!post) return;
  editMode = true;
  editPostId = id;
  document.querySelector('#share')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  setTimeout(() => {
    setField('postName', post.name);
    setField('postCity', post.city);
    setField('postTitle', post.title);
    setField('postContent', post.content);
    const catEl = document.getElementById('postCategory');
    if (catEl) catEl.value = post.category || '';
    const editIdEl = document.getElementById('editPostId');
    if (editIdEl) editIdEl.value = id;
    if (post.mood) {
      selectedMood = post.mood;
      document.querySelectorAll('.mood-pill').forEach(p => p.classList.toggle('active', p.dataset.mood === post.mood));
    }
    const submitBtn = document.getElementById('submitBtn');
    if (submitBtn) submitBtn.innerHTML = '<i class="fa-solid fa-floppy-disk" aria-hidden="true"></i> Update Story';
    updateCharCount();
    showToast('Editing your story — make changes and click Update.');
  }, 450);
}

function deletePost(id) {
  if (!confirm('Delete this story? This cannot be undone.')) return;
  posts = posts.filter(p => p.id !== id);
  removeMyPostId(id);
  savePosts();
  renderPosts(activeFilter);
  updateHeroStats();
  showToast('Your story has been removed.');
}

function setField(id, value) {
  const el = document.getElementById(id);
  if (el) el.value = value || '';
}

/* ─── MOOD TAGS (Part 4) ─────────────────────────────────── */
function setupMoodTags() {
  document.querySelectorAll('.mood-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      if (selectedMood === pill.dataset.mood) {
        selectedMood = null;
        pill.classList.remove('active');
      } else {
        document.querySelectorAll('.mood-pill').forEach(p => p.classList.remove('active'));
        selectedMood = pill.dataset.mood;
        pill.classList.add('active');
      }
    });
  });
}

/* ─── QUESTION LINKS (Part 8) ───────────────────────────── */
function setupQuestionLinks() {
  document.querySelectorAll('.q-link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const question = link.dataset.question;
      if (!question) return;
      currentQuestionContext = question;
      const indicator = document.getElementById('questionIndicator');
      const qText = document.getElementById('questionIndicatorText');
      if (indicator) indicator.style.display = 'flex';
      if (qText) qText.textContent = question;
      document.getElementById('share')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setTimeout(() => {
        const titleField = document.getElementById('postTitle');
        if (titleField && !titleField.value) titleField.value = question;
        document.getElementById('postContent')?.focus();
      }, 500);
    });
  });
}

function clearQuestionContext() {
  currentQuestionContext = null;
  const indicator = document.getElementById('questionIndicator');
  if (indicator) indicator.style.display = 'none';
  setField('postTitle', '');
}

/* ─── GUIDELINES MODAL (Part 13.2) ──────────────────────── */
function showGuidelines() {
  const modal = document.getElementById('guidelinesModal');
  if (modal) { modal.style.display = 'flex'; modal.querySelector('button')?.focus(); }
}

function closeGuidelines() {
  const modal = document.getElementById('guidelinesModal');
  if (modal) modal.style.display = 'none';
}

/* ─── CHAR COUNTER ───────────────────────────────────────── */
function updateCharCount() {
  const content = document.getElementById('postContent');
  const counter = document.getElementById('charCount');
  if (!content || !counter) return;
  const len = content.value.length;
  counter.textContent = len;
  counter.classList.toggle('char-over', len > 1000);
}

/* ─── POST FORM ──────────────────────────────────────────── */
function setupPostForm() {
  const form = document.getElementById('postForm');
  if (!form) return;
  document.getElementById('postContent')?.addEventListener('input', updateCharCount);

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = (document.getElementById('postName')?.value || '').trim();
    const city = (document.getElementById('postCity')?.value || '').trim();
    const title = (document.getElementById('postTitle')?.value || '').trim();
    const content = (document.getElementById('postContent')?.value || '').trim();
    const category = document.getElementById('postCategory')?.value || 'Life';

    if (!name || !city || !title || !content) { showToast('Please fill in all required fields.'); return; }
    if (content.length > 1000) { showToast('Content is too long. Keep it under 1000 characters.'); return; }

    if (editMode && editPostId) {
      const idx = posts.findIndex(p => p.id === editPostId);
      if (idx !== -1) {
        posts[idx] = { ...posts[idx], name, city, title, content, category, mood: selectedMood ? selectedMood.toLowerCase() : posts[idx].mood };
        savePosts();
        resetForm(form);
        renderPosts(activeFilter);
        showToast('Your story has been updated!');
      }
    } else {
      const newPost = {
        id: 'post_' + Date.now(),
        name, city, title, content, category,
        likes: 0, time: Date.now(),
        mood: selectedMood ? selectedMood.toLowerCase() : null,
        isQuestion: !!currentQuestionContext,
        questionText: currentQuestionContext || null
      };
      posts.unshift(newPost);
      addMyPostId(newPost.id);
      savePosts();
      resetForm(form);
      renderPosts(activeFilter);
      updateHeroStats();
      showToast('Your story has been shared with the world!');
      document.querySelector('#community')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
}

function resetForm(form) {
  form.reset();
  editMode = false;
  editPostId = null;
  selectedMood = null;
  currentQuestionContext = null;
  const submitBtn = document.getElementById('submitBtn');
  if (submitBtn) submitBtn.innerHTML = '<i class="fa-solid fa-paper-plane" aria-hidden="true"></i> Share Your Story';
  const editIdEl = document.getElementById('editPostId');
  if (editIdEl) editIdEl.value = '';
  const qi = document.getElementById('questionIndicator');
  if (qi) qi.style.display = 'none';
  document.querySelectorAll('.mood-pill').forEach(p => p.classList.remove('active'));
  const counter = document.getElementById('charCount');
  if (counter) counter.textContent = '0/1000';
}

/* ─── FILTER BUTTONS ─────────────────────────────────────── */
function setupFilters() {
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeFilter = btn.dataset.filter || 'all';
      renderPosts(activeFilter);
    });
  });
  document.querySelectorAll('.pill').forEach(pill => {
    pill.addEventListener('click', () => {
      document.querySelectorAll('.pill').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      const catInput = document.getElementById('postCategory');
      if (catInput) catInput.value = pill.dataset.val || pill.textContent.trim();
    });
  });
}

/* ─── ORACLE FORM ────────────────────────────────────────── */
function consultOracle() {
  const name = (document.getElementById('oracleName')?.value || '').trim();
  const city = (document.getElementById('oracleCity')?.value || '').trim();
  if (!name || !city) { showToast('Please enter your name and city.'); return; }

  const msg = getOracleMessage(name, city);
  const color = avatarColor(name);
  const init = initials(name);
  const tod = getTimeOfDay();
  const greeting = { morning: 'Good morning', afternoon: 'Hello', evening: 'Good evening' }[tod] || 'Hello';

  const placeholder = document.getElementById('oraclePlaceholder');
  const responseEl = document.getElementById('oracleResponse');
  if (placeholder) placeholder.style.display = 'none';
  if (!responseEl) return;
  responseEl.style.display = 'block';
  responseEl.innerHTML = `
    <div class="response-greeting">
      <div class="resp-avatar" style="background:${color}" aria-hidden="true">${init}</div>
      <div>
        <h3>${greeting}, ${escHtml(name)}</h3>
        <p>A message from ${escHtml(city)}</p>
      </div>
    </div>
    <div class="response-message">${escHtml(msg.message)}</div>
    <div class="response-quote"><i class="fas fa-quote-left" aria-hidden="true"></i> ${escHtml(msg.quote)}</div>
    <div class="response-actions">
      <button class="btn btn-ghost btn-sm" onclick="resetOracle()">
        <i class="fas fa-rotate" aria-hidden="true"></i> New Message
      </button>
      <button class="btn btn-primary btn-sm" onclick="document.querySelector('#share').scrollIntoView({behavior:'smooth'})">
        <i class="fas fa-pen-nib" aria-hidden="true"></i> Share Your Story
      </button>
    </div>`;
}

function resetOracle() {
  const placeholder = document.getElementById('oraclePlaceholder');
  const responseEl = document.getElementById('oracleResponse');
  if (placeholder) placeholder.style.display = 'block';
  if (responseEl) { responseEl.style.display = 'none'; responseEl.innerHTML = ''; }
}

/* ─── ONBOARDING (Part 10) ───────────────────────────────── */
function initOnboarding() {
  if (localStorage.getItem('il_visited')) return;
  const overlay = document.getElementById('onboardingOverlay');
  if (overlay) overlay.style.display = 'flex';
}

function dismissOnboarding() {
  localStorage.setItem('il_visited', '1');
  const overlay = document.getElementById('onboardingOverlay');
  if (!overlay) return;
  overlay.style.opacity = '0';
  overlay.style.transition = 'opacity 0.4s ease';
  setTimeout(() => { overlay.style.display = 'none'; overlay.style.opacity = ''; }, 400);
}

/* ─── NAVBAR ─────────────────────────────────────────────── */
function setupNavbar() {
  const navbar = document.querySelector('.navbar');
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  window.addEventListener('scroll', () => {
    if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 30);
  }, { passive: true });

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      const open = navLinks.classList.toggle('open');
      hamburger.classList.toggle('open', open);
      hamburger.setAttribute('aria-expanded', String(open));
    });
    navLinks.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });
  }
}

/* ─── PARTICLES (30% fewer, slower) ─────────────────────── */
function initParticles() {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const isMobile = window.innerWidth < 768;
  let particles = [];

  function resize() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    const area = canvas.width * canvas.height;
    const count = Math.floor(area / (isMobile ? 36000 : 25000));
    particles = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.8 + 0.4,
      vx: (Math.random() - 0.5) * 0.22,
      vy: (Math.random() - 0.5) * 0.22,
      alpha: Math.random() * 0.35 + 0.1,
      color: ['#A78BFA','#E8A0BF','#7EC8C8','#7AB89B','#ffffff'][Math.floor(Math.random() * 5)]
    }));
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      ctx.globalAlpha = p.alpha;
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0) p.x = canvas.width;
      if (p.x > canvas.width) p.x = 0;
      if (p.y < 0) p.y = canvas.height;
      if (p.y > canvas.height) p.y = 0;
    });
    ctx.globalAlpha = 1;
    requestAnimationFrame(draw);
  }

  resize();
  window.addEventListener('resize', resize, { passive: true });
  draw();
}

/* ─── SCROLL REVEAL ──────────────────────────────────────── */
function observeReveal() {
  const items = document.querySelectorAll('.reveal:not(.visible)');
  if (!items.length) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach(en => {
      if (en.isIntersecting) { en.target.classList.add('visible'); io.unobserve(en.target); }
    });
  }, { threshold: 0.1 });
  items.forEach(el => io.observe(el));
}

/* ─── TOAST ──────────────────────────────────────────────── */
let toastTimer = null;
function showToast(msg, duration) {
  duration = duration || 3200;
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.querySelector('span').textContent = msg;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), duration);
}

/* ─── KEYBOARD ───────────────────────────────────────────── */
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeReport();
    closeGuidelines();
    const overlay = document.getElementById('onboardingOverlay');
    if (overlay && overlay.style.display !== 'none') dismissOnboarding();
  }
});

/* ─── INIT ───────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  loadPosts();
  setupNavbar();
  initParticles();
  setupFilters();
  setupMoodTags();
  setupPostForm();
  setupQuestionLinks();
  renderPosts('all');
  updateHeroStats();
  initOnboarding();
  observeReveal();
});
