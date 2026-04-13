/**
 * Applies optional per-locale overlays from the case-studies catalog onto the base study.
 * Base content in `studies[slug]` is typically English; `studyLocaleOverlays[locale][slug]` overrides fields.
 */
export function pickLocalizedCaseStudy(catalog, slug, locale) {
  if (!catalog?.studies?.[slug]) return null;
  const base = catalog.studies[slug];
  if (!locale || locale === 'en') return base;
  const overlay = catalog.studyLocaleOverlays?.[locale]?.[slug];
  if (!overlay || typeof overlay !== 'object') return base;
  return { ...base, ...overlay };
}
