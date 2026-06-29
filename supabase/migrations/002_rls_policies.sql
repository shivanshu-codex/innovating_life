-- Row Level Security — every table locked down

ALTER TABLE public.profiles           ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.stories            ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resonances         ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookmarks          ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.follows            ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.streaks            ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications      ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.push_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reports            ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analytics_events   ENABLE ROW LEVEL SECURITY;

-- ── Profiles ─────────────────────────────────────────────────────
CREATE POLICY "Public profiles are viewable by all"
  ON public.profiles FOR SELECT USING (true);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- ── Stories — privacy-aware ───────────────────────────────────────
-- Private stories: only the author can see them — never exposed to others
CREATE POLICY "Stories visible per privacy tier"
  ON public.stories FOR SELECT
  USING (
    (status = 'published' AND privacy = 'public')
    OR (status = 'published' AND privacy IN ('community','anonymous') AND auth.uid() IS NOT NULL)
    OR (author_id = auth.uid())
  );

CREATE POLICY "Authors manage own stories"
  ON public.stories FOR ALL
  USING (author_id = auth.uid())
  WITH CHECK (author_id = auth.uid());

-- ── Resonances ───────────────────────────────────────────────────
CREATE POLICY "Anyone can see resonance counts"
  ON public.resonances FOR SELECT USING (true);

CREATE POLICY "Auth users can resonate"
  ON public.resonances FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can remove own resonance"
  ON public.resonances FOR DELETE
  USING (auth.uid() = user_id);

-- ── Bookmarks ────────────────────────────────────────────────────
CREATE POLICY "Users see own bookmarks"
  ON public.bookmarks FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users manage own bookmarks"
  ON public.bookmarks FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- ── Follows ──────────────────────────────────────────────────────
CREATE POLICY "Follows are public"
  ON public.follows FOR SELECT USING (true);

CREATE POLICY "Users manage own follows"
  ON public.follows FOR ALL
  USING (auth.uid() = follower_id)
  WITH CHECK (auth.uid() = follower_id);

-- ── Streaks ──────────────────────────────────────────────────────
CREATE POLICY "Public streaks visible to all"
  ON public.streaks FOR SELECT
  USING (is_public = true OR auth.uid() = user_id);

CREATE POLICY "Users manage own streak"
  ON public.streaks FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- ── Notifications — private ───────────────────────────────────────
CREATE POLICY "Users see own notifications only"
  ON public.notifications FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users update own notifications"
  ON public.notifications FOR UPDATE
  USING (auth.uid() = user_id);

-- ── Push subscriptions ───────────────────────────────────────────
CREATE POLICY "Users manage own push subscriptions"
  ON public.push_subscriptions FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- ── Analytics ────────────────────────────────────────────────────
CREATE POLICY "Users see own analytics"
  ON public.analytics_events FOR SELECT
  USING (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "Anyone can insert analytics"
  ON public.analytics_events FOR INSERT
  WITH CHECK (true);
