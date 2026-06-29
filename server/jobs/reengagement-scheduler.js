import { REENGAGEMENT_SEQUENCES } from '../email/reengagement.js';

const WEEKLY_PROMPTS = [
  'Write about a moment when you were completely wrong about something important.',
  'Describe the version of yourself you were five years ago. What would you tell them?',
  'What is a small thing that brings you disproportionate joy?',
  'Tell the story of a goodbye.',
  'Write about a door you decided not to open.',
];

function getWeeklyPrompt() {
  const weekOfYear = Math.ceil(
    (new Date() - new Date(new Date().getFullYear(), 0, 1)) / (7 * 24 * 60 * 60 * 1000),
  );
  return WEEKLY_PROMPTS[(weekOfYear - 1) % WEEKLY_PROMPTS.length];
}

export async function runReengagementJob(db, emailService) {
  const now = new Date();

  const weekAway = await db.user.findMany({
    where: {
      isActive:           true,
      emailOptOut:        false,
      reengagementSentAt: null,
      lastActiveAt: {
        gte: new Date(now - 8 * 24 * 60 * 60 * 1000),
        lte: new Date(now - 7 * 24 * 60 * 60 * 1000),
      },
    },
    take: 200,
  });

  const monthAway = await db.user.findMany({
    where: {
      isActive:          true,
      emailOptOut:       false,
      reengagementLevel: 'week',
      lastActiveAt: {
        gte: new Date(now - 31 * 24 * 60 * 60 * 1000),
        lte: new Date(now - 30 * 24 * 60 * 60 * 1000),
      },
    },
    take: 200,
  });

  const threeMonthsAway = await db.user.findMany({
    where: {
      isActive:          true,
      emailOptOut:       false,
      reengagementLevel: 'month',
      lastActiveAt: {
        gte: new Date(now - 91 * 24 * 60 * 60 * 1000),
        lte: new Date(now - 90 * 24 * 60 * 60 * 1000),
      },
    },
    take: 200,
  });

  const prompt = getWeeklyPrompt();

  for (const user of weekAway) {
    await emailService.send({
      to:      user.email,
      subject: REENGAGEMENT_SEQUENCES.week_away.subject,
      body:    REENGAGEMENT_SEQUENCES.week_away.body(user, prompt),
    });
    await db.user.update({
      where: { id: user.id },
      data:  { reengagementLevel: 'week', reengagementSentAt: now },
    });
  }

  for (const user of monthAway) {
    const communityUpdate = await getCommunityHighlights(db);
    await emailService.send({
      to:      user.email,
      subject: REENGAGEMENT_SEQUENCES.month_away.subject,
      body:    REENGAGEMENT_SEQUENCES.month_away.body(user, communityUpdate),
    });
    await db.user.update({
      where: { id: user.id },
      data:  { reengagementLevel: 'month', reengagementSentAt: now },
    });
  }

  for (const user of threeMonthsAway) {
    await emailService.send({
      to:      user.email,
      subject: REENGAGEMENT_SEQUENCES.three_months_away.subject,
      body:    REENGAGEMENT_SEQUENCES.three_months_away.body(user),
    });
    await db.user.update({
      where: { id: user.id },
      data:  { reengagementLevel: 'final', reengagementSentAt: now },
    });
  }
}

async function getCommunityHighlights(db) {
  const stories = await db.story.findMany({
    where:   { isPublic: true, createdAt: { gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) } },
    orderBy: { resonanceCount: 'desc' },
    take:    5,
    include: { author: { select: { name: true } } },
  });
  return {
    recentHighlights: stories.map(s => ({
      title:          s.title,
      authorName:     s.author.name,
      resonanceCount: s.resonanceCount,
    })),
  };
}
