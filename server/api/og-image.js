// GET /api/og-image?title=...&author=...&topic=...
// Returns a 1200×630 PNG using @vercel/og (satori under the hood)
// Install: npm install @vercel/og

import { ImageResponse } from '@vercel/og';

export async function generateOGImage(request) {
  const url    = new URL(request.url);
  const title  = (url.searchParams.get('title')  || 'A story on Lumina').substring(0, 80);
  const author = url.searchParams.get('author') || '';
  const topic  = url.searchParams.get('topic')  || '';

  const fontSize = title.length > 40 ? '48px' : '64px';

  return new ImageResponse(
    {
      type: 'div',
      props: {
        style: {
          width:         '1200px',
          height:        '630px',
          display:       'flex',
          flexDirection: 'column',
          justifyContent:'flex-end',
          padding:       '60px',
          background:    'linear-gradient(135deg, #FFF3D0 0%, #EDE6FF 100%)',
          fontFamily:    'Georgia, serif',
        },
        children: [
          topic ? {
            type: 'span',
            props: {
              style: {
                display:      'inline-block',
                background:   '#F5A800',
                color:        '#141210',
                padding:      '6px 16px',
                borderRadius: '9999px',
                fontSize:     '18px',
                fontWeight:   '600',
                marginBottom: '24px',
                fontFamily:   'system-ui, sans-serif',
              },
              children: topic,
            },
          } : null,
          {
            type: 'h1',
            props: {
              style: {
                fontSize,
                fontWeight:  '700',
                color:       '#252320',
                lineHeight:  '1.2',
                margin:      '0 0 32px 0',
                maxWidth:    '900px',
              },
              children: `"${title}"`,
            },
          },
          {
            type: 'div',
            props: {
              style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
              children: [
                author ? {
                  type: 'span',
                  props: {
                    style: { fontSize: '24px', color: '#5A5450', fontFamily: 'system-ui' },
                    children: `— ${author}`,
                  },
                } : null,
                {
                  type: 'span',
                  props: {
                    style: { fontSize: '28px', fontWeight: '700', color: '#F5A800' },
                    children: '✦ Lumina',
                  },
                },
              ].filter(Boolean),
            },
          },
        ].filter(Boolean),
      },
    },
    { width: 1200, height: 630 }
  );
}
