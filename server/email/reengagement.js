export const REENGAGEMENT_SEQUENCES = {

  week_away: {
    subject: 'A prompt for whenever you\'re ready',
    body: (user, prompt) => `Hi ${user.name.split(' ')[0]},

No pressure — but here's a writing prompt that came up this week and we thought might resonate with you:

"${prompt}"

If the words are there, Lumina is here.

— The Lumina team

P.S. Something new you might like: ${user.topRecommendation?.title || 'explore what people are writing about this week'}
lumina.in/explore

Unsubscribe: lumina.in/unsubscribe?token={{token}}`.trim(),
  },

  month_away: {
    subject: 'Your Lumina is waiting',
    body: (user, communityUpdate) => `Hi ${user.name.split(' ')[0]},

A few things have been happening on Lumina since you were last here:

${communityUpdate.recentHighlights.slice(0, 3).map(h =>
  `  → "${h.title}" by ${h.authorName} (${h.resonanceCount} resonances)`,
).join('\n')}

Your drafts are still here if you have anything you were working on.
Your stories are still reaching people.

Come back whenever you're ready.

lumina.in

Unsubscribe: lumina.in/unsubscribe?token={{token}}`.trim(),
  },

  three_months_away: {
    subject: 'We\'re still here — and we want to make sure you\'re okay',
    body: (user) => `Hi ${user.name.split(' ')[0]},

It's been a while. We don't say that with any kind of nudge — just that we noticed, and genuinely hope you're doing alright.

If life has been busy, or hard, or you just needed a break from writing — that makes complete sense.

If you ever want to come back, your account is exactly as you left it. Your stories are still there.

If you'd rather we stop sending these emails, just unsubscribe below and we'll respect that completely.

Wishing you well either way.

— The Lumina team

lumina.in/feed

Unsubscribe: lumina.in/unsubscribe?token={{token}}`.trim(),
  },
};
