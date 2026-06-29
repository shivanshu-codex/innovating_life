-- Full-text search trigger for stories
CREATE OR REPLACE FUNCTION update_story_search_vector()
RETURNS TRIGGER AS $$
BEGIN
  NEW.search_vector :=
    setweight(to_tsvector('english', coalesce(NEW.title,   '')), 'A') ||
    setweight(to_tsvector('english', coalesce(NEW.excerpt, '')), 'B') ||
    setweight(to_tsvector('english', coalesce(NEW.body,    '')), 'C');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER stories_search_update
  BEFORE INSERT OR UPDATE ON public.stories
  FOR EACH ROW EXECUTE FUNCTION update_story_search_vector();

-- Trigram index for partial / "contains" search on title
CREATE INDEX stories_title_trgm_idx ON public.stories
  USING GIN(title gin_trgm_ops);
