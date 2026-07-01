/* ============================================================
   INNOVATING LIFE — App Logic v2
   ============================================================ */

'use strict';

/* ─── SUPABASE ───────────────────────────────────────────── */
const _SB_URL = 'https://ahomhbsvynfdawaxqbuw.supabase.co';
const _SB_KEY = 'sb_publishable_SI7PwnyiN010Cbnu50F28Q_0N2H13aJ';
const db = supabase.createClient(_SB_URL, _SB_KEY);

/* ─── ORACLE MESSAGES (Part 7: 24+ messages) ─────────────── */
const ORACLE_MESSAGES = {
  morning: [
    {
      message: "Good morning, {name}! {city} is buzzing with energy today and so are you. This morning is your blank canvas — and you already have everything you need to make it brilliant. Go out there and own it!",
      quote: "Every morning is a chance to be better than yesterday. — Unknown"
    },
    {
      message: "Hey {name}, the people of {city} who are making things happen today? You are one of them. The energy you carry this morning is contagious — someone around you is going to smile because you showed up.",
      quote: "Believe you can and you're halfway there. — Theodore Roosevelt"
    },
    {
      message: "Rise and shine, {name}! There is something amazing waiting for you in {city} today — a conversation, an idea, a little win you didn't see coming. Keep your eyes open and your heart ready. Today is going to be good.",
      quote: "The secret of getting ahead is getting started. — Mark Twain"
    }
  ],
  afternoon: [
    {
      message: "You are right in the middle of a great day, {name}! Look at everything you have already done since morning — the people of {city} are lucky to have your energy in their city. Keep the momentum going, the best part is still ahead!",
      quote: "Keep going. Everything you need will come to you at the right time. — Unknown"
    },
    {
      message: "Hey {name}, the afternoon in {city} is full of possibilities. That idea you had this morning? Now is the perfect time to act on it. You have got the skills, the drive, and the right moment. Make it happen!",
      quote: "You are braver than you believe, stronger than you seem, and smarter than you think. — A.A. Milne"
    },
    {
      message: "{name}, right now in {city} people are building their dreams one step at a time — just like you are. Every small action you take today adds up to something wonderful. You are doing better than you think!",
      quote: "Small steps every day lead to big results every year. — Unknown"
    }
  ],
  evening: [
    {
      message: "What a day, {name}! {city} was better today because you were in it. Tonight, take a moment to smile at everything you did — even the smallest win counts. You showed up, and that is always worth celebrating.",
      quote: "At the end of each day, you should play back the tapes of your performance. — Tom Hopkins"
    },
    {
      message: "Evening in {city} is beautiful, {name}, and so is the story you are building. Tonight is the perfect time to dream a little bigger about tomorrow. The energy you have built today is just the beginning — your best chapters are still being written!",
      quote: "Every day is a new beginning. Take a deep breath and start again. — Unknown"
    },
    {
      message: "Good evening, {name}! The city of {city} has seen a lot of great people — and you are one of them. Tonight, rest easy knowing that every step you took today was moving you closer to the life you want. Tomorrow, you go again!",
      quote: "Success is the sum of small efforts repeated day in and day out. — Robert Collier"
    }
  ],
  any: [
    {
      message: "Hey {name}! Living in {city} means you are surrounded by energy, culture, and opportunity every single day. You are in exactly the right place to do something amazing. What is the one thing you are going to make happen today?",
      quote: "The future belongs to those who believe in the beauty of their dreams. — Eleanor Roosevelt"
    },
    {
      message: "{name}, you are the kind of person who makes {city} a better place just by being in it. Your ideas matter, your enthusiasm is real, and the world genuinely needs what only you can bring. Go show them what you are made of!",
      quote: "You have everything you need to build something far bigger than yourself. — Unknown"
    },
    {
      message: "Life in {city} moves fast, {name} — but you are keeping up beautifully. Every experience you have had, every connection you have made, is sharpening you into someone extraordinary. The best version of you is showing up more every day!",
      quote: "Growth is never by mere chance; it is the result of forces working together. — James Cash Penney"
    },
    {
      message: "Something exciting is heading your way, {name}. The good energy you put out in {city} every day has a way of coming right back to you — as opportunities, as new people, as great moments. Stay open and stay excited!",
      quote: "Positive energy generates positive results. — Scott Johnson"
    },
    {
      message: "{name}, the most exciting thing about your life right now is that you are still writing it! Every person in {city} who inspires you started exactly where you are. Your moment is not coming — it is already here. Step into it!",
      quote: "Don't wait for opportunity. Create it. — George Bernard Shaw"
    },
    {
      message: "You know what is genuinely great about you, {name}? You care. About your life, your people, your city. {city} is full of amazing humans and you are one of them. That caring spirit of yours is your superpower — use it today!",
      quote: "In a gentle way, you can shake the world. — Mahatma Gandhi"
    },
    {
      message: "Big things are built by people just like you, {name} — people from places like {city} who decided to back themselves fully. You do not need to have it all figured out. You just need to take the next exciting step. What is yours?",
      quote: "A year from now you will wish you had started today. — Karen Lamb"
    },
    {
      message: "The energy in {city} is electric, {name}, and you are a part of that pulse! Every conversation you have, every idea you share, every smile you give out today ripples further than you know. You are making a real difference!",
      quote: "Act as if what you do makes a difference. It does. — William James"
    },
    {
      message: "{name}, picture the most exciting version of your life — the one where everything comes together beautifully. That version is not a fantasy. It is a destination, and you are already on the road. Every day in {city} is a step closer. Keep going!",
      quote: "The only limit to our realization of tomorrow is our doubts of today. — Franklin D. Roosevelt"
    },
    {
      message: "Here is something true about you, {name}: you have already done hard things and come out stronger on the other side. Whatever you are building in {city} right now, you have got exactly what it takes to make it real and make it great!",
      quote: "Strength grows in the moments when you think you can't go on but you keep going anyway. — Unknown"
    },
    {
      message: "The world is genuinely better with your voice in it, {name}. The stories, thoughts, and ideas you carry from {city} deserve to be heard. Do not hold back — share them, live them out loud, and watch how many people you inspire!",
      quote: "Your life is your message to the world. Make sure it's inspiring. — Lorrin L. Lee"
    },
    {
      message: "Guess what, {name}? The happiest and most successful people in {city} are not the ones who had perfect conditions — they are the ones who brought their best energy anyway. You have that energy. Today is your day to shine!",
      quote: "The big secret in life is that there is no big secret. Whatever your goal, you can get there if you are willing to work. — Oprah Winfrey"
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
function savePosts() { /* posts now live in Supabase */ }

async function loadPosts() {
  try {
    const { data, error } = await db
      .from('stories')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    posts = (data || []).map(row => ({
      id: row.id,
      name: row.name,
      city: row.city || '',
      category: row.category || 'Life',
      title: row.title,
      content: row.content,
      mood: row.mood || null,
      likes: row.likes || 0,
      time: new Date(row.created_at).getTime(),
      isQuestion: false
    }));
  } catch (e) {
    console.error('Could not load stories:', e);
    posts = [];
  }
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

async function deletePost(id) {
  if (!confirm('Delete this story? This cannot be undone.')) return;
  await db.from('stories').delete().eq('id', id);
  posts = posts.filter(p => p.id !== id);
  removeMyPostId(id);
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

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = (document.getElementById('postName')?.value || '').trim();
    const city = (document.getElementById('postCity')?.value || '').trim();
    const title = (document.getElementById('postTitle')?.value || '').trim();
    const content = (document.getElementById('postContent')?.value || '').trim();
    const category = document.getElementById('postCategory')?.value || 'Life';

    if (!name || !city || !title || !content) { showToast('Please fill in all required fields.'); return; }
    if (content.length > 1000) { showToast('Content is too long. Keep it under 1000 characters.'); return; }

    const submitBtn = document.getElementById('submitBtn');
    if (submitBtn) submitBtn.disabled = true;

    if (editMode && editPostId) {
      const idx = posts.findIndex(p => p.id === editPostId);
      if (idx !== -1) {
        posts[idx] = { ...posts[idx], name, city, title, content, category, mood: selectedMood ? selectedMood.toLowerCase() : posts[idx].mood };
        resetForm(form);
        renderPosts(activeFilter);
        showToast('Your story has been updated!');
      }
    } else {
      const { data, error } = await db.from('stories').insert({
        name, city, title, content, category,
        mood: selectedMood ? selectedMood.toLowerCase() : null,
        likes: 0
      }).select().single();

      if (error) {
        showToast('Something went wrong. Please try again.');
        console.error(error);
      } else {
        addMyPostId(data.id);
        await loadPosts();
        resetForm(form);
        renderPosts(activeFilter);
        updateHeroStats();
        showToast('Your story has been shared with the world!');
        document.querySelector('#community')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }

    if (submitBtn) submitBtn.disabled = false;
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
document.addEventListener('DOMContentLoaded', async () => {
  localStorage.removeItem('il_posts');
  setupNavbar();
  initParticles();
  setupFilters();
  setupMoodTags();
  setupPostForm();
  setupQuestionLinks();
  initOnboarding();
  observeReveal();
  await loadPosts();
  renderPosts('all');
  updateHeroStats();
});
