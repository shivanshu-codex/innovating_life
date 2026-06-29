# Lumina Microcopy Reference

All button labels, placeholders, toggles, errors, toasts, and empty states.

---

## Primary CTAs

| ✓ Use | ✗ Never |
|-------|---------|
| Share this story | Submit |
| Start sharing | Sign up |
| Join Lumina | Register |
| Enter Lumina | Continue |
| Send message | Send |
| Publish story | Post |
| Save for later | Bookmark |
| Follow [Name] | Follow |
| Start writing | Write |
| Reply to this | Comment |

---

## Secondary / Ghost Buttons

| ✓ Use | ✗ Never |
|-------|---------|
| Maybe later | Cancel |
| I'll explore first | Skip |
| Keep editing | Back |
| Save as draft | Save draft |
| Delete this story | Delete |

---

## Destructive Confirmations (always two-step)

- "Yes, delete this story"
- "Remove from saved"
- "Unfollow [Name]"

Never: "Confirm", "OK", "Yes"

---

## Loading States

| Action | Button text while loading |
|--------|--------------------------|
| Publishing | "Sharing your story…" |
| Saving draft | "Saving…" |
| Sending message | "Sending…" |
| Logging in | "Opening your space…" |
| Signing up | "Creating your account…" |

---

## Form Placeholder Text

| Field | Placeholder |
|-------|-------------|
| Name | "Your name" |
| Username | "@yourusername" |
| Email | "your@email.com" |
| Password | "Something you'll remember" |
| Bio | "What would you want someone to know about you?" |
| Story title | "Give it a title, or don't." |
| Story body | "Start wherever feels true. You can always edit." |
| Comment | "What came up for you while reading this?" |
| Chat message | "Say something..." |
| Search | "Search stories, topics, or people..." |
| City (optional) | "Where are you writing from? (optional)" |
| Topic label | "What's this about?" |
| Mood label | "How are you feeling right now?" |

---

## Toggle Labels & Helper Text

**Anonymous posting**
Label: "Share without your name"
Helper: "Your story will show 'Anonymous' instead of your username."

**Allow comments**
Label: "Let people respond to this"
Helper: "Others can leave a comment. You can turn this off later."

**Follow notifications**
Label: "Tell me when [Name] shares something"
Helper: "You'll get a quiet notification when they share."

**Quiet hours**
Label: "Pause notifications while I rest"
Helper: "No notifications between [time] and [time]. You'll see a morning summary instead."

**Reading time limit**
Label: "Remind me to take a break"
Helper: "After [N] minutes of reading, we'll gently suggest you step away."

**Night mode auto**
Label: "Softer colours after sundown"
Helper: "Lumina switches to the Twilight palette after 8pm."

**Data saver**
Label: "Load lighter images"
Helper: "Images load at lower quality. Useful on slow connections."

**Morning digest**
Label: "One summary, every morning"
Helper: "Instead of individual notifications, you get one gentle summary at [time]."

---

## Validation Errors

### Email (invalid)
- ✗ "Invalid email address."
- ✓ "That email doesn't look quite right — try once more?"

### Email (already taken)
- ✗ "Email already in use."
- ✓ "An account with that email already exists. Want to sign in instead?"

### Password (too short)
- ✗ "Password must be at least 8 characters."
- ✓ "A little longer makes it safer — try 8 or more characters."

### Password (too common)
- ✗ "Password is too weak."
- ✓ "That one's a bit easy to guess. Add a mix of letters and numbers?"

### Username (taken)
- ✗ "Username already taken."
- ✓ "That name is taken — but yours is unique, try a small variation."

### Username (invalid characters)
- ✗ "Username contains invalid characters."
- ✓ "Usernames can only contain letters, numbers, and underscores."

### Story (too long)
- ✗ "Character limit exceeded."
- ✓ "You're [N] characters over — what can you trim without losing meaning?"

### Story (empty)
- ✗ "Story body cannot be empty."
- ✓ "There's nothing here yet. Start wherever feels true."

### Story (title too long)
- ✗ "Title too long."
- ✓ "A little shorter — titles work best under 100 characters."

### Comment (empty)
- ✗ "Comment cannot be empty."
- ✓ "Say whatever came up for you — even one sentence counts."

### Network error
- ✗ "Network error. Please try again."
- ✓ "Your connection dropped. Your words are safe — try again when you're back."

### Server error
- ✗ "Server error 500."
- ✓ "Something went gently wrong on our end. We're looking into it."

---

## Success Toasts

| Event | Toast |
|-------|-------|
| Story published | "Your story is out in the world. ✦" |
| Draft saved | "Draft saved — it'll be here when you're ready." |
| Comment posted | "Your response landed." |
| Reaction sent | "Resonance noted. ♥" |
| Story saved | "Saved. Come back to it whenever." |
| Story unsaved | "Removed from saved." |
| Settings saved | "Your changes are saved." |
| Profile updated | "Profile updated." |
| Story deleted | "Your story has been removed." |
| Password changed | "Password updated. You're secure." |
| Follow added | "You'll hear from [Name] now." |
| Follow removed | "Unfollowed. You won't see their stories." |
| Message sent | "Sent." |
| Report submitted | "Thanks for letting us know. We'll look into this." |
| Link copied | "Link copied — share it wherever feels right." |

## Info / Warning Toasts

| Event | Toast |
|-------|-------|
| Auto-save | "Draft auto-saved." |
| Offline | "You're offline. Writing is still saved locally." |
| Back online | "Connection restored. ✓" |
| New stories | "[N] new stories — pull to refresh." |
| Reading limit | "You've been reading for [N] minutes. Take a breath?" |
| Quiet hours start | "Quiet hours started. Notifications paused until morning." |
| Near char limit | "[N] characters left." |
| Image too large | "Image too large — try one under 5MB." |
| Draft unsaved | "You have unsaved changes." |

---

## Empty States

### Feed — no posts yet
**H1:** "This space is waiting for the first story."
**Sub:** "Be the one who starts it. Even one sentence counts."
**CTA:** "Share something"

### Feed — following tab, no follows
**H1:** "You haven't followed anyone yet."
**Sub:** "When you find someone whose writing stays with you — follow them here."
**CTA:** "Explore stories"

### Feed — all caught up
**H1:** "You're all caught up."
**Sub:** "New stories will appear here. The quiet can be good too."
**CTA:** "Explore more stories"

### Search — no results
**H1:** "Nothing matched that search."
**Sub:** "Try different words, or browse topics. Your words might fill this gap."
**CTA:** "Browse topics"

### Saved — empty
**H1:** "Nothing saved yet."
**Sub:** "When a story stops you — save it. It'll be here whenever you come back."
**CTA:** "Explore stories"

### Messages — no conversations
**H1:** "The quietest conversations start with one hello."
**Sub:** "Find someone whose story stayed with you and send them a message."
**CTA:** "Explore stories"

### Notifications — empty
**H1:** "Nothing yet — but you're here, and that counts."
**Sub:** "When people resonate with your stories, you'll hear about it here."
**CTA:** "Share a story"

### Profile — no stories
**H1:** "No stories yet."
**Sub:** "This is a quiet page waiting for something real."
**CTA:** "Write your first story"

### Comments — none yet
**H1:** "No one has responded yet."
**Sub:** "Be the first to say what this brought up for you."
**CTA:** "Add a response"

### Explore — no stories in topic
**H1:** "No stories in [Topic] yet."
**Sub:** "This might mean you'd be the first voice here. That's a rare thing."
**CTA:** "Write about [Topic]"
