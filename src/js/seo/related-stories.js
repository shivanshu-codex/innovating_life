export async function loadRelatedStories(storyId, topic, container) {
  if (!container) return;

  let stories;
  try {
    const res = await fetch(
      `/api/stories/related?storyId=${storyId}&topic=${encodeURIComponent(topic)}&limit=4`
    );
    if (!res.ok) return;
    ({ stories } = await res.json());
  } catch {
    return;
  }

  if (!stories?.length) return;

  container.innerHTML = `
    <section class="related-stories" aria-label="Related stories">
      <h2 class="t-section" style="font-size:var(--text-xl);margin-bottom:var(--space-5);">
        More stories like this
      </h2>
      <div class="related-grid">
        ${stories.map(s => `
          <article class="card card--compact card-interactive">
            <a href="/story/${s.slug}" class="related-link" style="text-decoration:none;display:block;">
              <div class="t-meta" style="margin-bottom:var(--space-1);color:var(--soul-600);">${s.topic}</div>
              <h3 class="t-title" style="font-size:var(--text-base);margin-bottom:var(--space-2);">
                ${s.title}
              </h3>
              <p class="t-meta">${s.author?.name} · ${s.readingTime || '?'} min read</p>
            </a>
          </article>
        `).join('')}
      </div>
    </section>
  `;
}
