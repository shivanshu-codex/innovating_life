export const moderationEmails = {
  crisis_response: (recipientName) => ({
    subject: 'We saw your story, and we wanted to reach out',
    body: `Hi ${recipientName},

Someone on our team read what you shared, and we wanted to reach out directly.

We're not here to remove your story or question what you wrote. You're allowed to feel what you're feeling and write about it honestly. That's exactly what Lumina is for.

We just wanted you to know that someone saw it, and it mattered.

If you're going through something really hard right now, there are people who want to talk — not to fix anything, just to be with you in it:

  iCall (India): 9152987821 (Mon–Sat, 8am–10pm)
  Vandrevala Foundation: 1860-2662-345 (24/7)
  Globally: findahelpline.com

You don't have to respond to this email. We just wanted you to know you're not alone here.

With care,
The Lumina Team`,
  }),

  guidance: (recipientName, detail) => ({
    subject: 'A note from the Lumina team about your recent story',
    body: `Hi ${recipientName},

Thank you for being part of Lumina. We wanted to reach out about a story you recently posted.

${detail}

This isn't about removing your story or telling you that you did something wrong. We just wanted to flag this directly, because we think it matters to handle it with you rather than at you.

If you have questions or want to talk through it, you can reply directly to this email.

With respect,
The Lumina Team`,
  }),

  hidden: (recipientName, reason) => ({
    subject: 'Your story has been temporarily hidden',
    body: `Hi ${recipientName},

We've temporarily hidden one of your recent stories while we review a report we received.

Reason for review: ${reason}

This doesn't mean the story has been permanently removed. Our team will review it and reach out within 48 hours.

If you believe this was a mistake, you can appeal by replying to this email. We take appeals seriously and respond to every one.

The Lumina Team`,
  }),

  removed: (recipientName, reason, appealUrl) => ({
    subject: 'Your story has been removed',
    body: `Hi ${recipientName},

After review, we've removed one of your stories from Lumina.

Reason: ${reason}

We don't take removal lightly, and we recognise this may feel frustrating or unfair. If you believe our decision was wrong, please appeal here:
${appealUrl}

We review every appeal and respond within 48 hours.

The Lumina Team`,
  }),

  restricted: (recipientName, restriction, duration) => ({
    subject: 'A temporary restriction on your account',
    body: `Hi ${recipientName},

Following a review, we've placed a temporary restriction on your account: ${restriction}.

This restriction will lift in ${duration}. It is not a permanent ban.

If you'd like to discuss this decision or appeal it, reply to this email directly.

The Lumina Team`,
  }),
};
