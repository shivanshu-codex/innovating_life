-- ── Extensions ─────────────────────────────────────────────────
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";
CREATE EXTENSION IF NOT EXISTS "unaccent";

-- ── Profiles (extends Supabase auth.users) ───────────────────────
CREATE TABLE public.profiles (
  id              UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username        TEXT UNIQUE NOT NULL CHECK (length(username) BETWEEN 3 AND 32),
  display_name    TEXT CHECK (length(display_name) <= 64),
  bio             TEXT CHECK (length(bio) <= 280),
  avatar_url      TEXT,
  writing_goal    TEXT CHECK (writing_goal IN (
                    'process','connect','remember','understand','share','just_write'
                  )),
  interests       TEXT[] DEFAULT '{}',
  privacy_default TEXT NOT NULL DEFAULT 'community'
                    CHECK (privacy_default IN ('public','community','anonymous','private')),
  quiet_hours_on  BOOLEAN NOT NULL DEFAULT TRUE,
  quiet_start     TIME NOT NULL DEFAULT '22:00',
  quiet_end       TIME NOT NULL DEFAULT '08:00',
  reading_limit   INTEGER DEFAULT NULL,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ── Stories ──────────────────────────────────────────────────────
CREATE TABLE public.stories (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  author_id       UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  title           TEXT NOT NULL CHECK (length(title) BETWEEN 1 AND 120),
  slug            TEXT UNIQUE NOT NULL,
  body            TEXT NOT NULL,
  excerpt         TEXT CHECK (length(excerpt) <= 300),
  topic           TEXT,
  privacy         TEXT NOT NULL DEFAULT 'community'
                    CHECK (privacy IN ('public','community','anonymous','private')),
  status          TEXT NOT NULL DEFAULT 'draft'
                    CHECK (status IN ('draft','published','archived')),
  word_count      INTEGER NOT NULL DEFAULT 0,
  read_time_mins  INTEGER GENERATED ALWAYS AS (GREATEST(1, CEIL(word_count / 200.0))) STORED,
  resonance_count INTEGER NOT NULL DEFAULT 0,
  view_count      INTEGER NOT NULL DEFAULT 0,
  seo_title       TEXT CHECK (length(seo_title) <= 70),
  seo_description TEXT CHECK (length(seo_description) <= 160),
  published_at    TIMESTAMPTZ,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  search_vector   TSVECTOR
);

CREATE INDEX stories_search_idx ON public.stories USING GIN(search_vector);
CREATE INDEX stories_author_idx ON public.stories(author_id);
CREATE INDEX stories_topic_idx  ON public.stories(topic);
CREATE INDEX stories_status_idx ON public.stories(status, published_at DESC);

-- ── Resonances ───────────────────────────────────────────────────
CREATE TABLE public.resonances (
  id         UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  story_id   UUID NOT NULL REFERENCES public.stories(id) ON DELETE CASCADE,
  user_id    UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(story_id, user_id)
);

CREATE INDEX resonances_story_idx ON public.resonances(story_id);
CREATE INDEX resonances_user_idx  ON public.resonances(user_id);

-- ── Bookmarks ────────────────────────────────────────────────────
CREATE TABLE public.bookmarks (
  id         UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  story_id   UUID NOT NULL REFERENCES public.stories(id) ON DELETE CASCADE,
  user_id    UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(story_id, user_id)
);

-- ── Follows ──────────────────────────────────────────────────────
CREATE TABLE public.follows (
  follower_id  UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  following_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (follower_id, following_id),
  CHECK (follower_id != following_id)
);

-- ── Streaks ──────────────────────────────────────────────────────
CREATE TABLE public.streaks (
  user_id        UUID PRIMARY KEY REFERENCES public.profiles(id) ON DELETE CASCADE,
  current_streak INTEGER NOT NULL DEFAULT 0,
  longest_streak INTEGER NOT NULL DEFAULT 0,
  last_write_date DATE,
  rest_days_used  INTEGER NOT NULL DEFAULT 0,
  is_public       BOOLEAN NOT NULL DEFAULT FALSE,
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ── Notifications ────────────────────────────────────────────────
CREATE TABLE public.notifications (
  id         UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id    UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  type       TEXT NOT NULL CHECK (type IN (
               'resonance','new_follower','story_featured',
               'weekly_digest','milestone','comment',
               're_engagement','prompt_reminder','system'
             )),
  title      TEXT NOT NULL,
  body       TEXT,
  link       TEXT,
  read       BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX notifications_user_idx ON public.notifications(user_id, read, created_at DESC);

-- ── Push subscriptions ───────────────────────────────────────────
CREATE TABLE public.push_subscriptions (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id     UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  endpoint    TEXT NOT NULL UNIQUE,
  p256dh      TEXT NOT NULL,
  auth        TEXT NOT NULL,
  user_agent  TEXT,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ── Moderation reports ───────────────────────────────────────────
CREATE TABLE public.reports (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  reporter_id UUID NOT NULL REFERENCES public.profiles(id),
  story_id    UUID REFERENCES public.stories(id) ON DELETE CASCADE,
  user_id     UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  reason      TEXT NOT NULL,
  detail      TEXT,
  status      TEXT NOT NULL DEFAULT 'pending'
                CHECK (status IN ('pending','reviewing','resolved','dismissed')),
  priority    INTEGER NOT NULL DEFAULT 2,
  resolved_by UUID REFERENCES public.profiles(id),
  resolved_at TIMESTAMPTZ,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX reports_status_priority_idx ON public.reports(status, priority, created_at);

-- ── Analytics events (first-party, privacy-safe) ─────────────────
CREATE TABLE public.analytics_events (
  id         BIGSERIAL PRIMARY KEY,
  event      TEXT NOT NULL,
  user_id    UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  properties JSONB DEFAULT '{}',
  session_id TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX analytics_event_idx    ON public.analytics_events(event, created_at DESC);
CREATE INDEX analytics_user_evt_idx ON public.analytics_events(user_id, event);
