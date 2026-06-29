/* ============================================
   LUMINA — NOTIFICATION COPY
   All in-app and push notification templates.
   Every message should feel like a human wrote it.
   No cold system language.
   ============================================ */

export const notificationCopy = {

  // ── REACTIONS ────────────────────────────────────────────────
  resonated_single: (actor) =>
    `${actor} resonated with your story.`,

  resonated_two: (a, b) =>
    `${a} and ${b} resonated with your story.`,

  resonated_many: (actor, count) =>
    `${actor} and ${count - 1} other${count - 1 === 1 ? '' : 's'} resonated with your story.`,

  resonated_milestone_10: () =>
    `Your story has touched 10 people. That's not nothing. ♥`,

  resonated_milestone_50: () =>
    `50 resonances on your story. It clearly landed somewhere real.`,

  resonated_milestone_100: () =>
    `100 people resonated with something you wrote. Let that settle in.`,

  // ── COMMENTS ─────────────────────────────────────────────────
  comment_new: (actor) =>
    `${actor} responded to your story.`,

  comment_reply: (actor) =>
    `${actor} replied to your comment.`,

  comment_first: (actor) =>
    `${actor} was the first to respond to your story.`,

  // ── FOLLOWS ──────────────────────────────────────────────────
  follow_new: (actor) =>
    `${actor} is now following your stories.`,

  follow_returned: (actor) =>
    `${actor} followed you back.`,

  // ── MESSAGES ─────────────────────────────────────────────────
  message_new: (actor) =>
    `${actor} sent you a message.`,

  message_first: (actor) =>
    `${actor} reached out. They found your story.`,

  // ── STORIES ──────────────────────────────────────────────────
  story_from_follow: (actor) =>
    `${actor} shared a new story.`,

  story_saved_updated: (actor) =>
    `A story you saved was updated by ${actor}.`,

  story_featured: () =>
    `Your story has been featured in today's Explore. ✦`,

  // ── DAILY ────────────────────────────────────────────────────
  daily_prompt: (promptText) =>
    `Today's prompt: "${promptText}"`,

  daily_digest_subject: (date) =>
    `Your Lumina morning — ${date}`,

  morning_summary: (resonances, comments, followers) => {
    const parts = [];
    if (resonances > 0) parts.push(`${resonances} resonance${resonances > 1 ? 's' : ''}`);
    if (comments    > 0) parts.push(`${comments} new response${comments > 1 ? 's' : ''}`);
    if (followers   > 0) parts.push(`${followers} new follower${followers > 1 ? 's' : ''}`);
    if (parts.length === 0) return 'A quiet night. Your stories are still out there.';
    return `While you rested: ${parts.join(', ')}.`;
  },

  // ── WELLBEING ────────────────────────────────────────────────
  reading_break: (minutes) =>
    `You've been reading for ${minutes} minutes. Take a breath?`,

  quiet_hours_start: () =>
    `Quiet hours started. You'll see a summary in the morning. Rest well.`,

  quiet_hours_end: () =>
    `Good morning. Here's what happened while you were away.`,
};
