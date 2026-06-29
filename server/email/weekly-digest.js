const WEEKLY_PROMPTS = [
  'Write about a moment when you were completely wrong about something important.',
  'Describe the version of yourself you were five years ago. What would you tell them?',
  'What is a small thing that brings you disproportionate joy?',
  'Tell the story of a goodbye.',
  'Write about a door you decided not to open.',
  'What does home mean to you right now?',
  'Describe a kindness a stranger showed you.',
  'Write about something you changed your mind about this year.',
  'What does rest actually feel like for you?',
  'Tell the story of something you made.',
  'Write about a fear you\'ve been quietly carrying.',
  'What does it feel like to be loved?',
  'Write about the version of success you were sold — and whether you still want it.',
  'What do you wish you\'d said?',
  'Describe a friendship that changed you.',
  'Write about something beautiful you almost missed.',
  'What did grief teach you?',
  'Tell the story of a belief you inherited but had to examine.',
  'Write about a time you were braver than you felt.',
  'What does your body remember that your mind has forgotten?',
  'Tell the story of the last time you laughed so hard it hurt.',
  'Write about a relationship with a place.',
  'What does loneliness feel like to you?',
  'Write about something you\'re still learning to accept.',
  'Tell the story of the moment everything changed.',
  'What does growth actually cost?',
];

function getTodaysPromptText() {
  const weekOfYear = Math.ceil(
    (new Date() - new Date(new Date().getFullYear(), 0, 1)) / (7 * 24 * 60 * 60 * 1000),
  );
  return WEEKLY_PROMPTS[(weekOfYear - 1) % WEEKLY_PROMPTS.length];
}

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 18) return 'Good afternoon';
  return 'Good evening';
}

export async function generateWeeklyDigest(userId, db) {
  const user = await db.user.findUnique({
    where:   { id: userId },
    include: { followedTopics: true, followedAuthors: true },
  });

  if (!user?.weeklyDigestEnabled) return null;

  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

  const topicStories = await db.story.findMany({
    where: {
      isPublic:  true,
      topicSlug: { in: user.followedTopics.map(t => t.slug) },
      createdAt: { gte: sevenDaysAgo },
    },
    orderBy: { resonanceCount: 'desc' },
    take:    3,
    include: { author: { select: { name: true, username: true } } },
  });

  const authorStories = await db.story.findMany({
    where: {
      isPublic:  true,
      authorId:  { in: user.followedAuthors.map(a => a.id) },
      createdAt: { gte: sevenDaysAgo },
    },
    orderBy: { createdAt: 'desc' },
    take:    2,
    include: { author: { select: { name: true, username: true } } },
  });

  const discoveryPick = await db.story.findFirst({
    where: {
      isPublic:       true,
      createdAt:      { gte: sevenDaysAgo },
      authorId:       { notIn: user.followedAuthors.map(a => a.id) },
      resonanceCount: { gte: 10 },
    },
    orderBy: { resonanceCount: 'desc' },
    include: { author: { select: { name: true, username: true } } },
  });

  const myStats = await db.story.findMany({
    where:  { authorId: userId, createdAt: { gte: sevenDaysAgo } },
    select: { id: true, title: true, resonanceCount: true },
  });

  return buildDigestEmail({ user, topicStories, authorStories, discoveryPick, myStats });
}

function buildDigestEmail({ user, topicStories, authorStories, discoveryPick, myStats }) {
  const greeting        = getGreeting();
  const totalResonances = myStats.reduce((sum, s) => sum + (s.resonanceCount || 0), 0);
  const prompt          = getTodaysPromptText();

  return {
    subject: 'Your Lumina week ✦',
    htmlBody: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your Lumina week</title>
  <style>
    * { margin:0; padding:0; box-sizing:border-box; }
    body { font-family:Georgia,'Times New Roman',serif; background:#F9F7F4; color:#252320; }
    .wrapper { max-width:560px; margin:0 auto; padding:40px 20px; }
    .logo { font-size:24px; font-weight:700; color:#F5A800; letter-spacing:-0.5px; text-align:center; padding:32px 0 0; }
    .divider { height:1px; background:#E8E3DB; margin:24px 0; }
    .greeting { font-size:22px; font-weight:700; color:#252320; margin-bottom:8px; }
    .subgreeting { font-size:15px; color:#7A736B; line-height:1.6; margin-bottom:32px; }
    .section-label { font-size:11px; font-weight:700; letter-spacing:0.12em;
                     text-transform:uppercase; color:#B0A89E; margin-bottom:16px; }
    .story-card { background:white; border-radius:12px; padding:20px;
                  margin-bottom:12px; border:1px solid #EDE8E1; }
    .story-title { font-size:17px; font-weight:700; color:#252320;
                   margin-bottom:6px; font-family:Georgia,serif; }
    .story-title a { color:inherit; text-decoration:none; }
    .story-title a:hover { text-decoration:underline; }
    .story-meta { font-size:13px; color:#A09890; font-family:system-ui,sans-serif; }
    .story-excerpt { font-size:14px; color:#5A5450; margin-top:10px; line-height:1.6; }
    .read-btn { display:inline-block; margin-top:12px; padding:8px 20px;
                background:#F5A800; color:#141210; border-radius:9999px;
                font-size:13px; font-weight:700; text-decoration:none;
                font-family:system-ui,sans-serif; }
    .discovery { background:linear-gradient(135deg,#FFF3D0,#EDE6FF);
                 border-radius:12px; padding:20px; margin-bottom:12px; }
    .discovery-label { font-size:11px; font-weight:700; color:#F5A800;
                       letter-spacing:0.1em; text-transform:uppercase;
                       margin-bottom:8px; font-family:system-ui,sans-serif; }
    .my-stats { background:#FFF8E6; border:1px solid #F5D680;
                border-radius:12px; padding:20px; margin:24px 0; }
    .stats-grid { display:flex; gap:24px; margin-top:12px; }
    .stat { text-align:center; }
    .stat-num { font-size:28px; font-weight:800; color:#252320;
                font-family:system-ui,sans-serif; display:block; }
    .stat-label { font-size:12px; color:#A09890; font-family:system-ui,sans-serif; }
    .prompt-section { background:#F0F7F4; border-radius:12px; padding:20px; margin:24px 0; }
    .prompt-text { font-size:17px; color:#2D4A3E; font-style:italic;
                   line-height:1.5; font-family:Georgia,serif; }
    .footer { text-align:center; font-size:12px; color:#B0A89E;
              margin-top:40px; font-family:system-ui,sans-serif; }
    .footer a { color:#B0A89E; }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="logo">✦ Lumina</div>
    <div class="divider"></div>
    <p class="greeting">${greeting}, ${user.name.split(' ')[0]}.</p>
    <p class="subgreeting">
      ${totalResonances > 0
        ? `Your writing reached ${totalResonances} people this week. Here's what's been happening on Lumina.`
        : `A week of stories from the Lumina community — curated for you.`
      }
    </p>

    ${myStats.length > 0 ? `
      <div class="my-stats">
        <p class="section-label">Your writing this week</p>
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-num">${myStats.length}</span>
            <span class="stat-label">stor${myStats.length === 1 ? 'y' : 'ies'} written</span>
          </div>
          <div class="stat">
            <span class="stat-num">${totalResonances}</span>
            <span class="stat-label">resonances</span>
          </div>
        </div>
      </div>
    ` : ''}

    ${topicStories.length ? `
      <p class="section-label">From topics you follow</p>
      ${topicStories.map(s => `
        <div class="story-card">
          <p class="story-meta">${s.topic || ''} · ${s.author.name}</p>
          <p class="story-title"><a href="https://lumina.in/story/${s.slug}">"${s.title}"</a></p>
          ${s.excerpt ? `<p class="story-excerpt">${s.excerpt.substring(0, 120)}…</p>` : ''}
          <a class="read-btn" href="https://lumina.in/story/${s.slug}">Read →</a>
        </div>
      `).join('')}
      <div class="divider"></div>
    ` : ''}

    ${authorStories.length ? `
      <p class="section-label">From writers you follow</p>
      ${authorStories.map(s => `
        <div class="story-card">
          <p class="story-meta">${s.author.name}</p>
          <p class="story-title"><a href="https://lumina.in/story/${s.slug}">"${s.title}"</a></p>
          <a class="read-btn" href="https://lumina.in/story/${s.slug}">Read →</a>
        </div>
      `).join('')}
      <div class="divider"></div>
    ` : ''}

    ${discoveryPick ? `
      <div class="discovery">
        <p class="discovery-label">✦ Worth discovering</p>
        <p class="story-title" style="margin-bottom:6px;">
          <a href="https://lumina.in/story/${discoveryPick.slug}"
             style="color:#252320;text-decoration:none;">
            "${discoveryPick.title}"
          </a>
        </p>
        <p class="story-meta">${discoveryPick.author.name} · ${discoveryPick.resonanceCount} resonances</p>
        ${discoveryPick.excerpt
          ? `<p class="story-excerpt">${discoveryPick.excerpt.substring(0, 140)}…</p>`
          : ''}
        <a class="read-btn" href="https://lumina.in/story/${discoveryPick.slug}"
           style="display:inline-block;margin-top:12px;">Read →</a>
      </div>
      <div class="divider"></div>
    ` : ''}

    <div class="prompt-section">
      <p class="section-label">This week's writing prompt</p>
      <p class="prompt-text">"${prompt}"</p>
      <a class="read-btn" href="https://lumina.in/write"
         style="display:inline-block;margin-top:16px;">Write today →</a>
    </div>

    <div class="footer">
      <p>You're receiving this because you subscribed to the Lumina weekly digest.</p>
      <p style="margin-top:8px;">
        <a href="https://lumina.in/settings/notifications">Change preferences</a>
        &nbsp;·&nbsp;
        <a href="https://lumina.in/unsubscribe?token={{unsubscribe_token}}">Unsubscribe</a>
      </p>
    </div>
  </div>
</body>
</html>`,
  };
}
