export const EmailBrand = {

  header: ({ tagline = 'Your story finds its people.' } = {}) => `
    <table width="100%" cellpadding="0" cellspacing="0" border="0"
           style="background:#FFFDF9; padding:32px 0 24px;">
      <tr>
        <td align="center">
          <div style="font-family:Georgia,'Times New Roman',serif;
                      font-size:24px; font-weight:700; color:#252320;
                      letter-spacing:-0.02em; line-height:1;">
            <span style="color:#F5A800;">✦</span> Lumina
          </div>
          ${tagline ? `
            <div style="font-family:Georgia,'Times New Roman',serif;
                        font-size:13px; font-style:italic;
                        color:#A09890; margin-top:6px; line-height:1.4;">
              ${tagline}
            </div>
          ` : ''}
        </td>
      </tr>
      <tr>
        <td style="padding:20px 40px 0;">
          <div style="height:1px; background:#F5D680; width:100%;"></div>
        </td>
      </tr>
    </table>
  `,

  footer: ({ unsubscribeUrl = '#', preferencesUrl = '#' } = {}) => `
    <table width="100%" cellpadding="0" cellspacing="0" border="0"
           style="padding:32px 40px; background:#FFFDF9; border-top:1px solid #EDE8E1;">
      <tr>
        <td align="center">
          <div style="font-family:Georgia,serif; font-size:16px;
                      font-weight:700; color:#A09890; margin-bottom:12px;">
            <span style="color:#F5A800;">✦</span> Lumina
          </div>
          <div style="font-family:system-ui,sans-serif; font-size:12px;
                      color:#B0A89E; margin-bottom:8px;">
            <a href="${preferencesUrl}"
               style="color:#B0A89E; text-decoration:underline;">Email preferences</a>
            &nbsp;·&nbsp;
            <a href="${unsubscribeUrl}"
               style="color:#B0A89E; text-decoration:underline;">Unsubscribe</a>
            &nbsp;·&nbsp;
            <a href="https://lumina.in/privacy"
               style="color:#B0A89E; text-decoration:underline;">Privacy</a>
          </div>
          <div style="font-family:system-ui,sans-serif; font-size:11px; color:#C8C0B8;">
            Lumina · Making honest writing possible<br/>
            You're receiving this because you have a Lumina account.
          </div>
        </td>
      </tr>
    </table>
  `,

  wrapper: (content) => `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8"/>
      <meta name="viewport" content="width=device-width,initial-scale=1.0"/>
      <meta name="color-scheme" content="light"/>
      <title>Lumina</title>
    </head>
    <body style="margin:0; padding:0; background:#F0EDE8; font-family:Georgia,serif;">
      <table width="100%" cellpadding="0" cellspacing="0" border="0">
        <tr>
          <td align="center" style="padding:20px 0;">
            <table width="560" cellpadding="0" cellspacing="0" border="0"
                   style="max-width:560px; width:100%;
                          background:#FFFDF9;
                          border-radius:16px;
                          overflow:hidden;
                          box-shadow:0 2px 16px rgba(0,0,0,0.06);">
              <tr><td>${content}</td></tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `,

  divider: () => `
    <table width="100%" cellpadding="0" cellspacing="0" border="0">
      <tr>
        <td style="padding:0 40px;">
          <div style="height:1px; background:#EDE8E1;"></div>
        </td>
      </tr>
    </table>
  `,

  ctaButton: (text, href) => `
    <table cellpadding="0" cellspacing="0" border="0">
      <tr>
        <td style="background:#F5A800; border-radius:9999px; padding:0;">
          <a href="${href}"
             style="display:inline-block; padding:12px 28px;
                    font-family:system-ui,sans-serif; font-size:14px;
                    font-weight:700; color:#141210; text-decoration:none;
                    line-height:1; border-radius:9999px;">
            ${text}
          </a>
        </td>
      </tr>
    </table>
  `,

  storyCard: (story) => `
    <table width="100%" cellpadding="0" cellspacing="0" border="0"
           style="background:white; border-radius:12px;
                  border:1px solid #EDE8E1; margin-bottom:12px;">
      <tr>
        <td style="padding:20px 24px;">
          <div style="font-family:system-ui,sans-serif; font-size:11px;
                      font-weight:700; color:#F5A800; text-transform:uppercase;
                      letter-spacing:0.1em; margin-bottom:6px;">
            ${story.topic || ''} · ${story.author?.name || ''}
          </div>
          <div style="font-family:Georgia,serif; font-size:18px;
                      font-weight:700; color:#252320; line-height:1.3;
                      margin-bottom:10px;">
            <a href="https://lumina.in/story/${story.slug}"
               style="color:#252320; text-decoration:none;">
              "${story.title}"
            </a>
          </div>
          ${story.excerpt ? `
            <div style="font-family:Georgia,serif; font-size:14px;
                        color:#7A736B; line-height:1.6; margin-bottom:14px;">
              ${story.excerpt.substring(0, 120)}…
            </div>
          ` : ''}
          <a href="https://lumina.in/story/${story.slug}"
             style="font-family:system-ui,sans-serif; font-size:13px;
                    font-weight:600; color:#C47E00; text-decoration:none;">
            Read story →
          </a>
        </td>
      </tr>
    </table>
  `,
};
