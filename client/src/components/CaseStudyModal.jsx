import { useEffect, useState, useCallback, useRef } from 'react';
import { useLocale } from '../context/LocaleContext';

export default function CaseStudyModal({ open, study, slug, reviewName, avatarSrc, onClose }) {
  const { t } = useLocale();
  const [entered, setEntered] = useState(false);
  const [animatingOut, setAnimatingOut] = useState(false);
  const [copied, setCopied] = useState(false);
  const closeTimer = useRef(null);

  const live = Boolean(open && study);

  useEffect(() => {
    if (live) {
      setAnimatingOut(false);
      setEntered(false);
      const enterTimer = setTimeout(() => setEntered(true), 50);
      return () => clearTimeout(enterTimer);
    }
    setEntered(false);
    return undefined;
  }, [live]);

  useEffect(() => {
    if (!live && !animatingOut) return;
    document.body.classList.add('modal-open');
    return () => {
      document.body.classList.remove('modal-open');
    };
  }, [live, animatingOut]);

  useEffect(() => () => clearTimeout(closeTimer.current), []);

  const handleClose = useCallback(() => {
    if (animatingOut) return;
    setAnimatingOut(true);
    setEntered(false);
    closeTimer.current = setTimeout(() => {
      setAnimatingOut(false);
      onClose();
    }, 420);
  }, [animatingOut, onClose]);

  useEffect(() => {
    if (!live) return;
    const onKey = (e) => {
      if (e.key === 'Escape') handleClose();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [live, handleClose]);

  const shareUrl = typeof window !== 'undefined' && slug ? `${window.location.origin}/case-studies/${slug}` : '';

  const handleShare = useCallback(async () => {
    if (!shareUrl || !study) return;
    const title = study.ogTitle || study.headerTitle;
    const text = study.ogDescription || '';
    try {
      if (navigator.share) {
        await navigator.share({ title, text, url: shareUrl });
        return;
      }
    } catch {
      /* cancelled or unavailable */
    }
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.prompt(t('caseStudy.copyFallback'), shareUrl);
    }
  }, [shareUrl, study, t]);

  const showLayer = live || animatingOut;
  if (!showLayer || !study) return null;

  const panelUp = entered && !animatingOut;
  const overlayVisible = !animatingOut;

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col justify-end transition-opacity duration-500 ${overlayVisible ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="case-study-title"
    >
      <button
        type="button"
        className="absolute inset-0 bg-dark/70 backdrop-blur-md border-0 p-0 cursor-pointer"
        aria-label={t('caseStudy.closeOverlay')}
        onClick={handleClose}
      />

      <div
        className={`relative w-full h-[95vh] bg-light rounded-t-[2.5rem] md:rounded-t-[3rem] shadow-2xl flex flex-col overflow-hidden transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${panelUp ? 'translate-y-0' : 'translate-y-full'}`}
      >
        <div className="absolute top-0 right-0 w-full h-[60vh] bg-gradient-to-b from-primary/5 to-transparent pointer-events-none z-0" />

        <div className="flex-shrink-0 w-full bg-white/80 backdrop-blur-xl border-b border-slate-200/60 px-4 sm:px-6 md:px-12 py-4 md:py-6 flex items-center gap-3 z-20">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
            <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-primary bg-blue-50 px-2 sm:px-3 md:px-4 py-1.5 rounded-full border border-blue-100 shrink-0">
              {t('caseStudy.badge')}
            </span>
            <span className="font-bold text-dark hidden sm:inline text-sm md:text-base truncate">{study.headerTitle}</span>
          </div>

          <div className="flex justify-center shrink-0 px-1">
            <button
              type="button"
              onClick={handleShare}
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 sm:px-4 py-2 text-xs sm:text-sm font-bold text-slate-600 hover:text-dark hover:border-slate-300 hover:bg-slate-50 transition-all shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
            >
              <i className="ph-bold ph-share-network text-base text-primary shrink-0" aria-hidden="true" />
              <span>{copied ? t('caseStudy.linkCopied') : t('caseStudy.share')}</span>
            </button>
          </div>

          <div className="flex justify-end flex-1 min-w-0">
            <button
              type="button"
              onClick={handleClose}
              className="flex items-center gap-2 md:gap-3 text-sm font-bold text-slate-500 hover:text-dark transition-colors group focus:outline-none"
            >
              <span className="hidden md:inline group-hover:underline decoration-slate-300 underline-offset-4 truncate">{t('caseStudy.close')}</span>
              <span className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center group-hover:bg-dark group-hover:text-white group-hover:border-dark transition-all shadow-sm shrink-0">
                <i className="ph-bold ph-x text-lg" aria-hidden="true" />
              </span>
            </button>
          </div>
        </div>

        <div
          className="flex-grow min-h-0 overflow-y-auto overscroll-contain relative z-10 hide-scrollbar touch-pan-y"
          data-lenis-prevent
        >
          <div className="max-w-4xl mx-auto px-6 md:px-12 py-16 md:py-24">
            <h2 id="case-study-title" className="text-4xl md:text-5xl lg:text-6xl font-bold text-dark tracking-tight leading-[1.1] mb-8">
              {study.headlineBefore}
              <span className="font-serif italic text-primary">{study.headlineAccent}</span>
              {study.headlineAfter}
            </h2>

            <div className="flex items-center gap-4 mb-16 pb-12 border-b border-slate-200">
              <img src={avatarSrc} alt="" className="w-14 h-14 rounded-full shadow-sm" width={56} height={56} />
              <div>
                <p className="font-bold text-dark text-lg">{reviewName}</p>
                <p className="text-sm text-slate-500">{study.clientRole}</p>
              </div>
            </div>

            <div className="mb-16">
              <h3 className="text-2xl font-bold text-dark mb-4 flex items-center gap-3">
                <i className="ph-duotone ph-warning-circle text-red-500 text-3xl" aria-hidden="true" />
                {t('caseStudy.challenge')}
              </h3>
              <p className="text-lg text-slate-600 leading-relaxed font-serif italic border-l-4 border-slate-300 pl-6 py-2 mb-6">
                &ldquo;{study.challengeQuote}&rdquo;
              </p>
              <p className="text-slate-600 leading-relaxed">{study.challengeBody}</p>
            </div>

            <div className="mb-16">
              <h3 className="text-2xl font-bold text-dark mb-4 flex items-center gap-3">
                <i className="ph-duotone ph-magic-wand text-primary text-3xl" aria-hidden="true" />
                {t('caseStudy.approach')}
              </h3>
              <p className="text-slate-600 leading-relaxed mb-6">{study.approachIntro}</p>
              <ul className="space-y-4 text-slate-600">
                {study.approachPoints?.map((pt) => (
                  <li key={pt.title} className="flex items-start gap-3 bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
                    <i className="ph-fill ph-check-circle text-primary text-xl mt-0.5 shrink-0" aria-hidden="true" />
                    <div>
                      <strong className="text-dark block mb-1">{pt.title}</strong>
                      {pt.body}
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-20">
              <h3 className="text-2xl font-bold text-dark mb-6 flex items-center gap-3">
                <i className="ph-duotone ph-chart-line-up text-green-500 text-3xl" aria-hidden="true" />
                {t('caseStudy.results')}
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {study.metrics?.map((m, i) => (
                  <div
                    key={i}
                    className={`p-8 rounded-[2rem] text-center shadow-lg ${m.tone === 'primary' ? 'bg-primary shadow-primary/20' : 'bg-dark'}`}
                  >
                    <span className="block text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2">{m.value}</span>
                    <span className={`text-sm md:text-base ${m.tone === 'primary' ? 'text-blue-100' : 'text-slate-400'}`}>{m.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-slate-100 border border-slate-200 p-8 md:p-12 rounded-[2.5rem] text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-white/60 to-transparent pointer-events-none" />
              <div className="relative z-10">
                <h4 className="text-2xl md:text-3xl font-bold text-dark mb-4">{study.ctaTitle}</h4>
                <p className="text-slate-500 mb-8 max-w-md mx-auto">{study.ctaBody}</p>
                <a
                  href="https://calendar.app.google/Sz5iJwCW8h3EuRzt6"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex px-8 py-4 bg-dark text-white font-bold rounded-full hover:bg-primary transition-all shadow-lg hover:-translate-y-1"
                  onClick={handleClose}
                >
                  {t('contact.bookCall')}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
