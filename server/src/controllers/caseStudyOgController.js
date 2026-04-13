import fs from 'fs';
import path from 'path';
import { REACT_BUILD_DIR } from '../config/paths.js';

function escapeAttr(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function siteBaseUrl(req) {
  if (process.env.SITE_URL) return String(process.env.SITE_URL).replace(/\/$/, '');
  if (process.env.VERCEL_URL) return `https://${String(process.env.VERCEL_URL).replace(/\/$/, '')}`;
  const host = req.get('host');
  if (host) return `${req.protocol}://${host}`;
  return 'https://www.studio17.world';
}

function localeFromAcceptLanguage(header) {
  if (!header || typeof header !== 'string') return 'en';
  const first = header.split(',')[0]?.trim().split(';')[0]?.trim().toLowerCase();
  if (first.startsWith('pt')) return 'pt';
  if (first.startsWith('es')) return 'es';
  if (first.startsWith('el')) return 'el';
  return 'en';
}

function stripExistingSocialTags(html) {
  return html
    .replace(/<meta\s+property="og:[^>]+>/gi, '')
    .replace(/<meta\s+name="twitter:[^>]+>/gi, '')
    .replace(/<meta\s+name="description"[^>]+>/gi, '')
    .replace(/<link\s+rel="canonical"[^>]+>/gi, '');
}

/**
 * Serves SPA index.html with Open Graph / Twitter metadata for a case study slug.
 * Crawlers that do not execute JavaScript still receive correct preview tags.
 */
export function serveCaseStudyWithOg(req, res, next) {
  const slug = req.params?.slug;
  if (!slug) return next();

  const indexPath = path.join(REACT_BUILD_DIR, 'index.html');
  const dataPath = path.join(REACT_BUILD_DIR, 'case-studies.json');

  if (!fs.existsSync(indexPath)) return next();

  let html = fs.readFileSync(indexPath, 'utf8');
  const baseUrl = siteBaseUrl(req);
  const pageUrl = `${baseUrl}/case-studies/${slug}`;

  let title = 'Studio 17 | Concept Hero';
  let description = 'The conversion-first marketing and sales studio for the AI era.';
  let image = 'https://res.cloudinary.com/dnxoz9alm/image/upload/v1772523612/Post_10_-_4_atlsb8.png';
  let ogType = 'website';

  if (fs.existsSync(dataPath)) {
    try {
      const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
      const def = data.defaultOg || {};
      title = def.title || title;
      description = def.description || description;
      image = def.image || image;
      ogType = def.type || ogType;

      const study = data.studies?.[slug];
      const loc = localeFromAcceptLanguage(req.get('accept-language'));
      const overlay = study && loc !== 'en' ? data.studyLocaleOverlays?.[loc]?.[slug] : null;
      const studyForMeta =
        study && overlay && typeof overlay === 'object' ? { ...study, ...overlay } : study;
      if (studyForMeta) {
        title = studyForMeta.ogTitle || title;
        description = studyForMeta.ogDescription || description;
        image = studyForMeta.ogImage || image;
        ogType = 'article';
      }
    } catch {
      /* fall through to defaults */
    }
  }

  html = stripExistingSocialTags(html);

  const block = `
    <meta property="og:title" content="${escapeAttr(title)}" />
    <meta property="og:description" content="${escapeAttr(description)}" />
    <meta property="og:type" content="${escapeAttr(ogType)}" />
    <meta property="og:url" content="${escapeAttr(pageUrl)}" />
    <meta property="og:image" content="${escapeAttr(image)}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeAttr(title)}" />
    <meta name="twitter:description" content="${escapeAttr(description)}" />
    <meta name="twitter:image" content="${escapeAttr(image)}" />
    <meta name="description" content="${escapeAttr(description)}" />
    <link rel="canonical" href="${escapeAttr(pageUrl)}" />
`;

  html = html.replace(/<title>[^<]*<\/title>/, `<title>${escapeAttr(title)}</title>`);
  html = html.replace('</head>', `${block}\n  </head>`);

  res.type('html').send(html);
}
