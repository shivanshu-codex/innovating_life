export const MODERATION_ACTIONS = {
  DISMISS:      'dismiss',
  HIDE:         'hide',
  REMOVE:       'remove',
  WARN:         'warn',
  RESTRICT:     'restrict',
  BAN:          'ban',
  ESCALATE:     'escalate',
};

export async function getModerationQueue(db, { status = 'pending', page = 1, limit = 20 } = {}) {
  const offset = (page - 1) * limit;

  const reports = await db.query(
    `SELECT
       r.id,
       r.content_id,
       r.content_type,
       r.reason,
       r.detail,
       r.created_at,
       u.display_name AS reporter_name,
       s.body         AS story_preview,
       s.author_id,
       a.display_name AS author_name,
       COUNT(r2.id)   AS total_reports
     FROM reports r
     JOIN users   u  ON r.reporter_id = u.id
     LEFT JOIN stories s  ON r.content_id = s.id AND r.content_type = 'story'
     LEFT JOIN users   a  ON s.author_id = a.id
     LEFT JOIN reports r2 ON r2.content_id = r.content_id AND r2.content_type = r.content_type
     WHERE r.status = $1
     GROUP BY r.id, u.display_name, s.body, s.author_id, a.display_name
     ORDER BY r.created_at DESC
     LIMIT $2 OFFSET $3`,
    [status, limit, offset],
  );

  const total = await db.queryOne(
    'SELECT COUNT(DISTINCT id) AS count FROM reports WHERE status = $1',
    [status],
  );

  return {
    reports: reports.rows,
    total:   parseInt(total.rows[0].count, 10),
    page,
    pages:   Math.ceil(parseInt(total.rows[0].count, 10) / limit),
  };
}

export async function executeModerationAction(db, { reportId, contentId, contentType, action, moderatorId, note = '', duration = null }) {
  const validActions = Object.values(MODERATION_ACTIONS);
  if (!validActions.includes(action)) throw new Error(`Invalid moderation action: ${action}`);

  await db.transaction(async (tx) => {
    await tx.query(
      `INSERT INTO moderation_log (report_id, content_id, content_type, action, moderator_id, note, created_at)
       VALUES ($1, $2, $3, $4, $5, $6, NOW())`,
      [reportId, contentId, contentType, action, moderatorId, note],
    );

    await tx.query(
      `UPDATE reports SET status = 'resolved', resolved_at = NOW(), resolved_by = $1 WHERE id = $2`,
      [moderatorId, reportId],
    );

    if (action === MODERATION_ACTIONS.HIDE) {
      await tx.query(`UPDATE ${contentType}s SET hidden = true WHERE id = $1`, [contentId]);
    }

    if (action === MODERATION_ACTIONS.REMOVE) {
      await tx.query(`UPDATE ${contentType}s SET removed = true, removed_at = NOW() WHERE id = $1`, [contentId]);
    }

    if (action === MODERATION_ACTIONS.RESTRICT || action === MODERATION_ACTIONS.BAN) {
      const until = duration
        ? new Date(Date.now() + parseDuration(duration))
        : null;
      await tx.query(
        `INSERT INTO account_restrictions (user_id, type, reason, expires_at, created_by)
         SELECT author_id, $1, $2, $3, $4 FROM stories WHERE id = $5
         ON CONFLICT (user_id, type) DO UPDATE SET expires_at = EXCLUDED.expires_at`,
        [action, note, until, moderatorId, contentId],
      );
    }
  });

  return { success: true, action };
}

function parseDuration(str) {
  const map = { h: 3600000, d: 86400000, w: 604800000 };
  const match = str.match(/^(\d+)([hdw])$/);
  if (!match) return 86400000;
  return parseInt(match[1], 10) * (map[match[2]] ?? 86400000);
}
