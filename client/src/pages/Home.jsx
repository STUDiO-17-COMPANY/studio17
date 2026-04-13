import { useRef, useEffect, useState, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CaseStudyModal from '../components/CaseStudyModal';
import { useLocale } from '../context/LocaleContext';
import { pickLocalizedCaseStudy } from '../utils/localizeCaseStudy';

const PARTNER_LOGOS = [
  'https://res.cloudinary.com/dnxoz9alm/image/upload/v1769355058/ChatGPT_Image_Sep_17_2025_03_37_53_PM_wdzcud.avif',
  'https://res.cloudinary.com/dnxoz9alm/image/upload/v1769719783/FareHarborLogo_tb2mfj.png',
  'https://res.cloudinary.com/dnxoz9alm/image/upload/v1769620957/Lodgify_Logo_cliemn.png',
  'https://res.cloudinary.com/dnxoz9alm/image/upload/v1770807357/LOGOPHOS_a2sbkp.svg',
  'https://res.cloudinary.com/dnxoz9alm/image/upload/v1772481613/logo_refined_4096-Photoroom_c4zzsj.png',
  'https://res.cloudinary.com/dnxoz9alm/image/upload/v1772479726/Sem_t%C3%ADtulo_1_e7gg2f.png',
  'https://res.cloudinary.com/dnxoz9alm/image/upload/v1767807311/501449218_17852143143456062_1859588940980405510_n-removebg-preview_auw6f5.png',
  'https://res.cloudinary.com/dnxoz9alm/image/upload/v1772645531/RG_Automotive_Logo_yhs1uc.png',
];

const SERVICES_TAB_KEYS = ['websitesFunnels', 'branding', 'contentSocial', 'adsGrowth', 'systemsCrm'];

const WORLD_CARD_KEYS = [
  { key: 'orchestration', icon: 'ph-duotone ph-magic-wand' },
  { key: 'production', icon: 'ph-duotone ph-tree-structure' },
  { key: 'intelligence', icon: 'ph-duotone ph-target' },
  { key: 'data', icon: 'ph-duotone ph-database' },
  { key: 'mediaBuying', icon: 'ph-duotone ph-chart-line-up' },
  { key: 'geo', icon: 'ph-duotone ph-globe-hemisphere-west' },
];

const NEWS_ITEM_KEYS = ['0', '1', '2', '3', '4'];

const REVIEW_ITEM_KEYS = ['0', '1', '2', '3', '4', '5', '6', '7'];

/** Maps case study URL slug → review card index (avatars + locale names). */
const CASE_STUDY_SLUG_TO_INDEX = {
  'optics-clinic-cyprus': 0,
  'strategic-journey-giulia': 1,
  'brand-presence-joao': 2,
  'clarity-mariana': 3,
  'growth-andreas': 4,
  'execution-elena': 5,
  'focus-lukas': 6,
  'credible-modern-hannah': 7,
};

const HERO_METHODOLOGY_IMAGE =
  'https://res.cloudinary.com/dwvhqhtts/image/upload/v1775824087/Group_30_jbetfw.png';

const HERO_SERVICE_CARDS = [
  { serviceKey: 'websites', icon: 'ph-duotone ph-desktop' },
  { serviceKey: 'brandVisuals', icon: 'ph-duotone ph-camera' },
  { serviceKey: 'adsFunnels', icon: 'ph-duotone ph-trend-up' },
];

/** ui-avatars.com params per review card (order matches locale keys). */
const REVIEW_AVATARS = [
  { name: 'Marco+B', bg: '0F172A' },
  { name: 'Giulia+M', bg: '2563EB' },
  { name: 'Joao+F', bg: '0456FE' },
  { name: 'Mariana+C', bg: '0F172A' },
  { name: 'Andreas+N', bg: '2563EB' },
  { name: 'Elena+P', bg: '0456FE' },
  { name: 'Lukas+S', bg: '0F172A' },
  { name: 'Hannah+W', bg: '2563EB' },
];

export default function Home() {
  const { t, locale } = useLocale();
  const { slug: caseSlugParam } = useParams();
  const navigate = useNavigate();
  const [caseCatalog, setCaseCatalog] = useState(null);
  const [activeServiceTab, setActiveServiceTab] = useState('websitesFunnels');
  const reviewsCarouselRef = useRef(null);
  const cardsCarouselRef = useRef(null);
  const newsCarouselRef = useRef(null);

  const activeService = t(`servicesSection.tabs.${activeServiceTab}`);
  const includedList = Array.isArray(activeService?.included) ? activeService.included : [];

  useEffect(() => {
    let cancelled = false;
    fetch('/case-studies.json', { cache: 'no-store' })
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then((data) => {
        if (!cancelled) setCaseCatalog(data);
      })
      .catch(() => {
        if (!cancelled) setCaseCatalog({ studies: {}, defaultOg: {} });
      });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!caseCatalog?.studies || !caseSlugParam) return;
    if (!caseCatalog.studies[caseSlugParam]) {
      navigate('/', { replace: true });
    }
  }, [caseCatalog, caseSlugParam, navigate]);

  const caseStudyReviewIndex = caseSlugParam != null ? CASE_STUDY_SLUG_TO_INDEX[caseSlugParam] : undefined;
  const activeCaseStudy = useMemo(() => {
    if (!caseSlugParam || !caseCatalog?.studies) return null;
    return pickLocalizedCaseStudy(caseCatalog, caseSlugParam, locale);
  }, [caseSlugParam, caseCatalog, locale]);

  const caseReviewItem =
    caseStudyReviewIndex != null ? t(`reviews.items.${REVIEW_ITEM_KEYS[caseStudyReviewIndex]}`) : null;
  const caseAvatar =
    caseStudyReviewIndex != null
      ? `https://ui-avatars.com/api/?name=${encodeURIComponent(REVIEW_AVATARS[caseStudyReviewIndex].name.replace(/\+/g, ' '))}&background=${REVIEW_AVATARS[caseStudyReviewIndex].bg}&color=fff`
      : '';

  const handleCaseStudyClose = () => {
    navigate('/');
  };

  // Carousel scroll handlers
  const scrollCarousel = (ref, amount) => {
    if (ref.current) {
      ref.current.scrollBy({ left: amount, behavior: 'smooth' });
    }
  };

  const setupCarouselDots = (carouselRef, dotsSelector) => {
    const carousel = carouselRef.current;
    const dots = document.querySelectorAll(dotsSelector);
    if (!carousel || !dots.length) return;

    const updateDots = () => {
      const scrollableWidth = carousel.scrollWidth - carousel.clientWidth;
      if (scrollableWidth <= 0) return;
      const scrollPercentage = carousel.scrollLeft / scrollableWidth;
      const activeIndex = Math.min(Math.max(Math.round(scrollPercentage * (dots.length - 1)), 0), dots.length - 1);
      dots.forEach((dot, i) => {
        if (i === activeIndex) {
          dot.classList.remove('w-2', 'bg-slate-300');
          dot.classList.add('w-8', 'bg-dark');
        } else {
          dot.classList.remove('w-8', 'bg-dark');
          dot.classList.add('w-2', 'bg-slate-300');
        }
      });
    };

    carousel.addEventListener('scroll', updateDots);
    return () => carousel.removeEventListener('scroll', updateDots);
  };

  useEffect(() => {
    const cards = cardsCarouselRef.current;
    const news = newsCarouselRef.current;
    const reviews = reviewsCarouselRef.current;
    if (!cards || !news || !reviews) return;

    const unsubCards = setupCarouselDots(cardsCarouselRef, '#carousel-dots .dot');
    const unsubNews = setupCarouselDots(newsCarouselRef, '#news-carousel-dots .dot');
    const unsubReviews = setupCarouselDots(reviewsCarouselRef, '#reviews-carousel-dots .dot');

    return () => {
      unsubCards?.();
      unsubNews?.();
      unsubReviews?.();
    };
  }, []);

  const scrollAmount = typeof window !== 'undefined' && window.innerWidth < 768 ? 300 : 400;

  return (
    <div className="flex flex-col min-h-screen relative overflow-x-hidden">
      {/* Abstract graphic - Hero background */}
      <div
        className="absolute top-0 right-0 w-full md:w-[80%] h-[100svh] overflow-hidden pointer-events-none z-0 flex items-center justify-end graphic-container"
        style={{
          maskImage: 'linear-gradient(to right, transparent 5%, black 30%)',
          WebkitMaskImage: 'linear-gradient(to right, transparent 5%, black 30%)',
        }}
      >
        <svg
          className="h-[140vh] md:h-[140vh] lg:h-[180vh] w-auto opacity-60 md:opacity-100 translate-x-[40%] md:translate-x-0"
          viewBox="-200 -200 1400 1400"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="ringGrad1" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#2563EB" stopOpacity="0.6" />
              <stop offset="30%" stopColor="#2563EB" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#2563EB" stopOpacity="0" />
            </linearGradient>
          </defs>
          <circle cx="500" cy="500" r="400" stroke="url(#ringGrad1)" strokeWidth="80" strokeLinecap="round" className="blur-[10px]" strokeDasharray="1600 2500" transform="rotate(120 500 500)" />
          <circle cx="500" cy="500" r="400" stroke="url(#ringGrad1)" strokeWidth="40" strokeLinecap="round" className="blur-[3px]" strokeDasharray="1600 2500" transform="rotate(120 500 500)" />
          <circle cx="500" cy="500" r="490" stroke="#2563EB" strokeWidth="20" strokeDasharray="0 60" strokeLinecap="round" className="opacity-30" />
          <circle cx="500" cy="500" r="530" stroke="#2563EB" strokeWidth="10" strokeDasharray="0 40" strokeLinecap="round" className="opacity-15" />
        </svg>
      </div>

      <Navbar />

      {/* Hero */}
      <main className="flex-grow flex flex-col justify-center relative z-10 px-6 md:px-12 max-w-[1600px] w-full mx-auto pb-24 md:pb-32 pt-4 md:pt-24 min-h-[90vh] min-w-0">
        <div className="flex flex-col lg:flex-row lg:items-center gap-12 lg:gap-10 w-full mb-16 lg:mb-24 min-w-0">
          <div className="w-full lg:w-1/2 flex flex-col z-10 min-w-0">
            <div className="mb-6 lg:mb-10 flex items-baseline select-none">
              <span className="font-extrabold text-[2rem] md:text-4xl lg:text-[2.75rem] text-dark" style={{ letterSpacing: '-0.05em' }}>
                Studio
              </span>
              <span className="font-extrabold text-[2rem] md:text-4xl lg:text-[2.75rem] text-dark ml-1.5 lg:ml-2" style={{ letterSpacing: '-0.12em' }}>
                17
              </span>
            </div>

            <h1 className="text-[2.75rem] sm:text-5xl md:text-6xl lg:text-[4.5rem] xl:text-[5rem] font-light text-dark leading-[1.1] md:leading-[1.05] tracking-tight w-full">
              <span className="block">
                {t('hero.h1Line1')}{' '}
                <span className="font-serif italic font-normal text-primary tracking-normal pr-1">{t('hero.h1Highlight1')}</span>
              </span>
              <span className="block">
                {t('hero.h1Line2')}{' '}
                <span className="font-serif italic font-normal text-primary tracking-normal pr-1">{t('hero.h1Highlight2')}</span>{' '}
                {t('hero.h1Line3')}
              </span>
            </h1>
          </div>

          <div className="w-full lg:w-1/2 min-w-0 flex justify-center lg:justify-end relative z-10 mt-10 lg:mt-0">
            <div className="relative w-full max-w-[min(100%,34rem)] sm:max-w-[min(100%,36rem)] lg:max-w-[min(100%,28rem)] xl:max-w-[min(100%,32rem)] 2xl:max-w-[min(100%,36rem)]">
              <img
                src={HERO_METHODOLOGY_IMAGE}
                alt={t('hero.imageAlt')}
                width={1100}
                height={900}
                decoding="async"
                fetchPriority="high"
                className="w-full h-auto max-h-[min(52vh,22rem)] sm:max-h-[min(56vh,28rem)] lg:max-h-none object-contain object-center lg:object-right drop-shadow-2xl hover:-translate-y-2 transition-transform duration-500"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 w-full z-10 min-w-0">
          {HERO_SERVICE_CARDS.map(({ serviceKey, icon }) => (
            <div
              key={serviceKey}
              className="bg-white/80 backdrop-blur-md border border-slate-200 rounded-[2rem] p-8 md:p-10 shadow-[0_8px_30px_rgba(0,0,0,0.03)] hover:-translate-y-2 transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary text-2xl mb-6 group-hover:scale-110 transition-transform">
                <i className={icon} aria-hidden="true"></i>
              </div>
              <h3 className="text-xl font-bold text-dark mb-3">{t(`hero.services.${serviceKey}.title`)}</h3>
              <p className="text-sm md:text-base text-slate-500 leading-relaxed">{t(`hero.services.${serviceKey}.desc`)}</p>
            </div>
          ))}
        </div>
      </main>

      {/* Services */}
      <section id="services" className="relative z-10 w-full bg-white pt-24 pb-20 md:pb-32 border-t border-slate-200">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 relative z-10">
          <div className="flex flex-col items-start text-left mb-12">
            <h2 className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-dark leading-[1.15] tracking-tight">
              {t('servicesSection.h2')}{' '}
              <span className="font-serif italic font-normal text-primary">{t('servicesSection.h2Italic')}</span>
            </h2>
          </div>

          <div className="flex justify-start overflow-x-auto hide-scrollbar mb-16 pb-4 w-full">
            <div className="flex items-center gap-3 border-b border-slate-200 min-w-max pr-6 pb-4" role="tablist" aria-label={t('servicesSection.tablistLabel')}>
              {SERVICES_TAB_KEYS.map((tabKey) => {
                const isActive = activeServiceTab === tabKey;
                const tabLabel = t(`servicesSection.tabs.${tabKey}.tabLabel`);
                return (
                  <button
                    key={tabKey}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActiveServiceTab(tabKey)}
                    className={`px-6 py-3 rounded-full text-sm font-bold tracking-wide inline-flex items-center cursor-pointer focus:outline-none transition-all duration-300 relative translate-y-[1px] ${
                      isActive
                        ? 'bg-dark text-white shadow-lg shadow-dark/20'
                        : 'text-slate-500 hover:text-dark hover:bg-slate-50'
                    }`}
                  >
                    {tabLabel}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-center">
            <div className="w-full lg:w-[45%] flex flex-col items-start">
              <h3 className="text-3xl md:text-4xl font-bold text-dark mb-6 tracking-tight">{activeService?.title}</h3>
              <p className="text-lg text-slate-600 leading-relaxed mb-8">{activeService?.body}</p>

              <div className="mb-12">
                <a
                  href="#contact"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-dark text-white rounded-full font-bold text-sm tracking-wide hover:bg-primary transition-colors shadow-lg shadow-dark/20"
                >
                  {t('servicesSection.cta')}
                  <i className="ph-bold ph-arrow-right" aria-hidden="true"></i>
                </a>
              </div>

              <div className="w-full">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">{t('servicesSection.includedLabel')}</p>
                <div className="flex flex-wrap gap-2">
                  {includedList.map((item) => (
                    <a
                      key={item}
                      href="#contact"
                      className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-50 border border-slate-200 text-slate-600 hover:text-primary hover:bg-blue-50/50 hover:border-primary/30 text-xs font-bold rounded-full transition-all group"
                    >
                      {item}
                      <i
                        className="ph-bold ph-arrow-up-right group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                        aria-hidden="true"
                      ></i>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div className="w-full lg:w-[55%] relative">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-primary/10 blur-[80px] rounded-full pointer-events-none" />
              <img
                src={activeService?.imageSrc}
                alt={activeService?.imageAlt || ''}
                width={1200}
                height={900}
                decoding="async"
                className="w-full h-auto object-contain relative z-10 drop-shadow-[0_20px_50px_rgba(0,0,0,0.1)] hover:-translate-y-2 transition-transform duration-500 rounded-3xl border border-slate-100 bg-white"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Reviews / Testimonials */}
      <section id="reviews" className="relative z-10 w-full bg-slate-50 pt-20 md:pt-24 pb-20 md:pb-24 border-t border-slate-200">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
            <div>
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-slate-200/80 to-transparent backdrop-blur-md rounded-full pl-4 pr-16 py-1.5 mb-6 w-max border-l border-slate-300">
                <div className="w-1.5 h-1.5 rounded-full bg-dark"></div>
                <span className="text-sm font-semibold text-dark">{t('reviews.badge')}</span>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-dark leading-[1.15] tracking-tight">
                {t('reviews.h2')}
              </h2>
            </div>
            <div className="flex gap-1.5 text-primary" aria-hidden="true">
              {[1, 2, 3, 4, 5].map((i) => (
                <i key={i} className="ph-fill ph-star text-2xl md:text-3xl drop-shadow-sm"></i>
              ))}
            </div>
          </div>

          <div className="relative">
            <div ref={reviewsCarouselRef} id="reviews-carousel" className="flex gap-6 overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-8 pt-4">
              {REVIEW_ITEM_KEYS.map((key, index) => {
                const item = t(`reviews.items.${key}`);
                const avatar = REVIEW_AVATARS[index];
                const langKey = item?.originalLangKey;
                const langLabel = langKey ? t(`reviews.languages.${langKey}`) : '';
                const caseSlug = item?.caseStudySlug;
                const showCaseStudy = typeof caseSlug === 'string' && caseSlug.length > 0;
                const avatarSrc = `https://ui-avatars.com/api/?name=${avatar.name}&background=${avatar.bg}&color=fff`;

                return (
                  <article
                    key={key}
                    className="snap-start shrink-0 w-[300px] md:w-[380px] lg:w-[420px] bg-white rounded-[2rem] p-8 md:p-10 flex flex-col justify-between shadow-[0_8px_30px_rgba(0,0,0,0.03)] border border-slate-100 hover:-translate-y-2 transition-transform duration-300 group"
                  >
                    <div>
                      <i className="ph-fill ph-quotes text-4xl text-slate-200 mb-6 group-hover:text-primary transition-colors duration-500"></i>
                      <p className="text-base md:text-lg text-dark leading-relaxed mb-5">
                        {item?.quote}
                      </p>
                      <a
                        href={item?.originalHref || '#'}
                        className="inline-flex items-center gap-2 text-[11px] md:text-xs font-semibold uppercase tracking-wide text-slate-400 hover:text-slate-600 transition-colors mb-4"
                      >
                        <i className="ph ph-globe text-base text-slate-400" aria-hidden="true"></i>
                        {t('reviews.readOriginal', { language: langLabel })}
                      </a>
                      {showCaseStudy && (
                        <Link
                          to={`/case-studies/${caseSlug}`}
                          className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:text-blue-700 transition-colors mb-4 group/link"
                        >
                          {t('reviews.viewCaseStudy')}
                          <i className="ph-bold ph-arrow-right group-hover/link:translate-x-1 transition-transform"></i>
                        </Link>
                      )}
                    </div>
                    <div className="flex items-center gap-4 pt-6 border-t border-slate-100 mt-auto">
                      <img src={avatarSrc} alt={item?.name || ''} className="w-12 h-12 rounded-full shadow-sm" width={48} height={48} />
                      <div>
                        <h3 className="font-bold text-dark text-sm md:text-base">{item?.name}</h3>
                        <p className="text-xs md:text-sm text-slate-500">{item?.location}</p>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mt-4 md:mt-6 gap-6 px-2">
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => scrollCarousel(reviewsCarouselRef, -scrollAmount)}
                  className="w-12 h-12 rounded-full bg-white border border-slate-200 flex items-center justify-center text-dark hover:bg-slate-50 hover:scale-105 active:scale-95 transition-all shadow-sm focus:outline-none"
                  aria-label={t('reviews.carouselPrev')}
                >
                  <i className="ph-bold ph-arrow-left text-lg"></i>
                </button>
                <button
                  type="button"
                  onClick={() => scrollCarousel(reviewsCarouselRef, scrollAmount)}
                  className="w-12 h-12 rounded-full bg-white border border-slate-200 flex items-center justify-center text-dark hover:bg-slate-50 hover:scale-105 active:scale-95 transition-all shadow-sm focus:outline-none"
                  aria-label={t('reviews.carouselNext')}
                >
                  <i className="ph-bold ph-arrow-right text-lg"></i>
                </button>
              </div>
              <div className="flex gap-2" id="reviews-carousel-dots" role="tablist" aria-label={t('reviews.carouselDots')}>
                {REVIEW_ITEM_KEYS.map((_, i) => (
                  <div
                    key={i}
                    className={`dot rounded-full h-1.5 transition-all duration-300 ${i === 0 ? 'w-8 bg-dark' : 'w-2 bg-slate-300'}`}
                    aria-hidden="true"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partners */}
      <section id="partners" className="relative z-10 w-full bg-white pt-10 pb-20 md:pb-24 overflow-hidden border-t border-slate-100">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 mb-10 md:mb-12 flex justify-start">
          <h3 className="text-base md:text-xl font-bold text-slate-400 uppercase tracking-widest">{t('partners.heading')}</h3>
        </div>

        <div className="flex overflow-hidden relative w-full" style={{ maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)', WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}>
          <div className="flex w-max min-w-max flex-nowrap shrink-0 animate-scroll-horizontal hover:[animation-play-state:paused]">
            {[1, 2].map((set) => (
              <div key={set} className="flex flex-nowrap shrink-0 items-center justify-center gap-16 md:gap-24 px-8 md:px-12">
                {PARTNER_LOGOS.map((src, i) => (
                  <img key={`${set}-${i}`} src={src} alt="Partner Logo" className="h-10 md:h-14 w-auto max-w-none shrink-0 object-contain transition-all duration-500" />
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* World AI */}
      <section id="world-ai" className="relative z-10 w-full bg-light pt-20 md:pt-24 pb-20 md:pb-32">
        <div className="absolute bottom-0 left-0 w-full h-[400px] bg-gradient-to-t from-slate-200/40 to-transparent pointer-events-none" />

        <div className="max-w-[1600px] mx-auto px-6 md:px-12 relative z-10">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-24 mb-12 lg:mb-20 items-start">
            <div className="w-full lg:w-1/2">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-slate-200/80 to-transparent backdrop-blur-md rounded-full pl-4 pr-16 py-1.5 mb-6 md:mb-8 w-max border-l border-slate-300">
                <div className="w-1.5 h-1.5 rounded-full bg-dark"></div>
                <span className="text-sm font-semibold text-dark">{t('world.badge')}</span>
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-dark leading-[1.15] tracking-tight">
                {t('world.h2')}
              </h2>
            </div>
            <div className="w-full lg:w-1/2 lg:pt-20">
              <p className="text-xl md:text-2xl text-slate-600 font-serif italic leading-relaxed max-w-[95%]">
                {t('world.paragraph')}
              </p>
            </div>
          </div>

          <div className="relative">
            <div ref={cardsCarouselRef} id="cards-carousel" className="flex gap-6 overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-8 pt-4">
              <div className="snap-start shrink-0 w-[280px] md:w-[350px] lg:w-[380px] aspect-[4/5] bg-primary rounded-[2rem] flex flex-col items-center justify-center p-8 shadow-xl shadow-primary/20 relative overflow-hidden group hover:-translate-y-2 transition-transform duration-300">
                <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-white/20 to-transparent pointer-events-none" />
                <h3 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight flex items-center gap-2 relative z-10">
                  WORLD <i className="ph-fill ph-sparkle text-3xl"></i>
                </h3>
              </div>

              {WORLD_CARD_KEYS.map((card) => (
                <div
                  key={card.key}
                  className="snap-start shrink-0 w-[280px] md:w-[350px] lg:w-[380px] aspect-[4/5] bg-blackbox rounded-[2rem] p-8 md:p-10 flex flex-col justify-between border border-slate-800 hover:-translate-y-2 transition-transform duration-300 group"
                >
                  <h4 className="text-white text-xl md:text-2xl font-bold leading-tight">{t(`world.cards.${card.key}.title`)}</h4>
                  <div className="flex-grow flex items-center justify-center">
                    <div className="w-28 h-28 md:w-32 md:h-32 rounded-full border border-slate-700 flex items-center justify-center border-dashed group-hover:border-slate-500 transition-colors">
                      <i className={`${card.icon} text-5xl md:text-6xl text-white`}></i>
                    </div>
                  </div>
                  <p className="text-slate-400 font-serif italic text-lg md:text-xl whitespace-pre-line">{t(`world.cards.${card.key}.desc`)}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mt-6 md:mt-8 gap-6 px-2">
              <div className="flex gap-4">
                <button onClick={() => scrollCarousel(cardsCarouselRef, -scrollAmount)} className="w-12 h-12 rounded-full bg-white border border-slate-200 flex items-center justify-center text-dark hover:bg-slate-50 hover:scale-105 active:scale-95 transition-all shadow-sm focus:outline-none">
                  <i className="ph-bold ph-arrow-left text-lg"></i>
                </button>
                <button onClick={() => scrollCarousel(cardsCarouselRef, scrollAmount)} className="w-12 h-12 rounded-full bg-white border border-slate-200 flex items-center justify-center text-dark hover:bg-slate-50 hover:scale-105 active:scale-95 transition-all shadow-sm focus:outline-none">
                  <i className="ph-bold ph-arrow-right text-lg"></i>
                </button>
              </div>
              <div className="flex gap-2" id="carousel-dots">
                {[...Array(7)].map((_, i) => (
                  <div key={i} className={`dot rounded-full h-1.5 transition-all duration-300 ${i === 0 ? 'w-8 bg-dark' : 'w-2 bg-slate-300'}`} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Results */}
      <section id="results" className="relative z-10 w-full h-[80vh] min-h-[600px] flex items-center justify-center overflow-hidden bg-blackbox">
        <div className="absolute inset-0 w-full h-full z-0">
          <img
            src="https://res.cloudinary.com/dnxoz9alm/image/upload/v1772378939/hf_20260301_152410_1646b2fe-e4d2-43ca-86d2-50f555f94fff_qsjdes.jpg"
            alt="Studio 17 Results"
            className="w-full h-full object-cover object-center"
          />
        </div>

        <div className="max-w-[1600px] mx-auto px-6 md:px-12 w-full h-full relative z-20 flex flex-col md:grid md:grid-cols-12 gap-10 md:gap-0 pt-20 md:pt-32">
          <div className="w-full md:col-span-5 text-white">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-white/40 to-white/0 backdrop-blur-lg rounded-full pl-4 pr-16 py-1.5 mb-6 w-max border-l border-white/20">
              <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
              <span className="text-sm font-semibold tracking-wide text-white drop-shadow-md">{t('results.badge')}</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-white leading-[1.15] tracking-tight drop-shadow-lg">
              {t('results.h2')}<br />{t('results.h2Line2')}
            </h2>
          </div>

          <div className="w-full md:col-span-4 md:col-start-8 pt-2 md:pt-[3.5rem] text-left">
            <p className="text-base md:text-lg lg:text-xl text-white font-serif italic leading-relaxed mb-8 drop-shadow-md">
              {t('results.paragraph')}
            </p>
            <a href="#" className="inline-flex items-center gap-3 w-max group">
              <div className="bg-royal text-white rounded-full px-6 py-4 font-bold text-sm tracking-wide transition-all group-hover:bg-blue-700 group-hover:shadow-lg shadow-royal/30">
                {t('results.button')}
              </div>
              <div className="w-12 h-12 rounded-full bg-royal text-white flex items-center justify-center transition-all group-hover:bg-blue-700 group-hover:scale-105 shadow-royal/30">
                <i className="ph-bold ph-arrow-up-right text-lg"></i>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* News */}
      <section id="news" className="relative z-10 w-full bg-[#F8FAFC] pt-20 md:pt-32 pb-20 md:pb-40 overflow-hidden">
        <div
          className="absolute top-1/2 left-0 w-full md:w-[60%] h-[120vh] -translate-y-1/2 overflow-hidden pointer-events-none z-0 flex items-center justify-start graphic-container-left opacity-30"
          style={{
            maskImage: 'linear-gradient(to left, transparent 0%, black 50%)',
            WebkitMaskImage: 'linear-gradient(to left, transparent 0%, black 50%)',
          }}
        >
          <svg className="h-[120vh] w-auto -translate-x-[30%]" viewBox="-200 -200 1400 1400" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="ringGrad3" x1="1" y1="1" x2="0" y2="0">
                <stop offset="0%" stopColor="#2563EB" stopOpacity="0.6" />
                <stop offset="30%" stopColor="#2563EB" stopOpacity="0.1" />
                <stop offset="100%" stopColor="#2563EB" stopOpacity="0" />
              </linearGradient>
            </defs>
            <circle cx="500" cy="500" r="400" stroke="url(#ringGrad3)" strokeWidth="80" strokeLinecap="round" className="blur-[10px]" strokeDasharray="1600 2500" transform="rotate(225 500 500)" />
            <circle cx="500" cy="500" r="400" stroke="url(#ringGrad3)" strokeWidth="40" strokeLinecap="round" className="blur-[3px]" strokeDasharray="1600 2500" transform="rotate(225 500 500)" />
            <circle cx="500" cy="500" r="490" stroke="#2563EB" strokeWidth="20" strokeDasharray="0 60" strokeLinecap="round" className="opacity-30" />
          </svg>
        </div>

        <div className="max-w-[1600px] mx-auto px-6 md:px-12 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-8">
            <h2 className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-dark leading-[1.15] tracking-tight max-w-xl">
              {t('news.h2')}<br />{t('news.h2Line2')}
            </h2>
            <a href="#" className="inline-flex items-center gap-3 w-max group">
              <div className="bg-blackbox text-white rounded-full px-6 py-4 font-bold text-sm tracking-wide transition-all group-hover:bg-primary group-hover:shadow-lg">
                {t('news.viewAll')}
              </div>
              <div className="w-12 h-12 rounded-full bg-blackbox text-white flex items-center justify-center transition-all group-hover:bg-primary group-hover:scale-105">
                <i className="ph-bold ph-arrow-up-right text-lg"></i>
              </div>
            </a>
          </div>

          <div className="relative">
            <div ref={newsCarouselRef} id="news-carousel" className="flex gap-6 overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-8 pt-4">
              {NEWS_ITEM_KEYS.map((key) => (
                <div
                  key={key}
                  className="snap-start shrink-0 w-[280px] md:w-[350px] lg:w-[400px] bg-white rounded-[2rem] p-8 md:p-10 flex flex-col justify-between min-h-[320px] shadow-[0_8px_30px_rgba(0,0,0,0.03)] border border-slate-100 hover:-translate-y-2 transition-transform duration-300 group cursor-pointer"
                >
                  <h3 className="text-xl md:text-2xl font-bold text-dark leading-snug">{t(`news.items.${key}.title`)}</h3>
                  <div className="flex items-end justify-between mt-8">
                    <span className="text-slate-400 font-medium text-sm">{t(`news.items.${key}.date`)}</span>
                    <div className="w-14 h-14 rounded-full bg-blackbox text-white flex items-center justify-center transition-all group-hover:bg-primary">
                      <i className="ph-bold ph-arrow-up-right text-xl"></i>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mt-6 md:mt-8 gap-6 px-2">
              <div className="flex gap-4">
                <button onClick={() => scrollCarousel(newsCarouselRef, -scrollAmount)} className="w-12 h-12 rounded-full bg-white border border-slate-200 flex items-center justify-center text-dark hover:bg-slate-50 hover:scale-105 active:scale-95 transition-all shadow-sm focus:outline-none">
                  <i className="ph-bold ph-arrow-left text-lg"></i>
                </button>
                <button onClick={() => scrollCarousel(newsCarouselRef, scrollAmount)} className="w-12 h-12 rounded-full bg-white border border-slate-200 flex items-center justify-center text-dark hover:bg-slate-50 hover:scale-105 active:scale-95 transition-all shadow-sm focus:outline-none">
                  <i className="ph-bold ph-arrow-right text-lg"></i>
                </button>
              </div>
              <div className="flex gap-2" id="news-carousel-dots">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className={`dot rounded-full h-1.5 transition-all duration-300 ${i === 0 ? 'w-8 bg-dark' : 'w-2 bg-slate-300'}`} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="relative z-10 w-full bg-blackbox pt-20 md:pt-32 overflow-hidden">
        <div
          className="absolute top-1/2 right-0 w-full md:w-[60%] h-[120vh] -translate-y-1/2 overflow-hidden pointer-events-none z-0 flex items-center justify-end graphic-container opacity-20"
          style={{
            maskImage: 'linear-gradient(to right, transparent 0%, black 50%)',
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 50%)',
          }}
        >
          <svg className="h-[120vh] w-auto translate-x-[20%]" viewBox="-200 -200 1400 1400" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="ringGradContact" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#2563EB" stopOpacity="0.6" />
                <stop offset="30%" stopColor="#2563EB" stopOpacity="0.1" />
                <stop offset="100%" stopColor="#2563EB" stopOpacity="0" />
              </linearGradient>
            </defs>
            <circle cx="500" cy="500" r="400" stroke="url(#ringGradContact)" strokeWidth="80" strokeLinecap="round" className="blur-[10px]" strokeDasharray="1600 2500" transform="rotate(90 500 500)" />
            <circle cx="500" cy="500" r="400" stroke="url(#ringGradContact)" strokeWidth="40" strokeLinecap="round" className="blur-[3px]" strokeDasharray="1600 2500" transform="rotate(90 500 500)" />
            <circle cx="500" cy="500" r="490" stroke="#2563EB" strokeWidth="20" strokeDasharray="0 60" strokeLinecap="round" className="opacity-30" />
          </svg>
        </div>

        <div className="max-w-[1600px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-start relative z-10 border-b border-white/10 pb-20 md:pb-32">
          <div className="lg:col-span-6 flex flex-col">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-white/10 to-transparent backdrop-blur-md rounded-full pl-4 pr-16 py-1.5 mb-6 md:mb-8 w-max border-l border-white/20">
              <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
              <span className="text-sm font-semibold tracking-wide text-white drop-shadow-md">{t('contact.badge')}</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-white leading-[1.15] tracking-tight mb-8">
              {t('contact.h2')}<br />{t('contact.h2Line2')}
            </h2>
            <p className="text-lg md:text-xl lg:text-2xl text-slate-400 font-serif italic leading-relaxed max-w-[90%] mb-12">
              {t('contact.paragraph')}
            </p>
          </div>

          <div className="lg:col-span-5 lg:col-start-8 flex flex-col gap-10 lg:pt-2">
            <div className="w-full">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-6">{t('contact.dropLine')}</p>
              <form
                className="flex flex-col gap-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  alert(t('contact.messageSentSuccess'));
                }}
              >
                <input
                  type="email"
                  placeholder={t('contact.emailPlaceholder')}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-slate-500 focus:outline-none focus:border-primary focus:bg-white/10 transition-all"
                  required
                />
                <textarea
                  placeholder={t('contact.messagePlaceholder')}
                  rows="3"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-slate-500 focus:outline-none focus:border-primary focus:bg-white/10 transition-all resize-none"
                  required
                />
                <button type="submit" className="w-max inline-flex items-center gap-3 group mt-2 focus:outline-none">
                  <div className="bg-primary text-white rounded-full px-6 py-3 font-bold text-sm tracking-wide transition-all group-hover:bg-blue-600 shadow-lg shadow-primary/20">
                    {t('contact.sendMessage')}
                  </div>
                  <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center transition-all group-hover:bg-blue-600 group-hover:scale-105 shadow-primary/20">
                    <i className="ph-bold ph-paper-plane-tilt text-lg"></i>
                  </div>
                </button>
              </form>
            </div>

            <div className="flex items-center gap-4 w-full">
              <div className="h-px bg-white/10 flex-grow"></div>
              <span className="text-xs font-bold text-slate-600 uppercase tracking-widest">{t('contact.or')}</span>
              <div className="h-px bg-white/10 flex-grow"></div>
            </div>

            <div className="flex flex-col gap-8">
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">{t('contact.scheduleMeeting')}</p>
                <a
                  href="https://calendar.app.google/Sz5iJwCW8h3EuRzt6"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-4 group text-white hover:text-primary transition-colors"
                >
                  <div className="w-12 h-12 flex-shrink-0 rounded-full bg-white/5 border border-white/10 flex items-center justify-center transition-all group-hover:bg-primary/20 group-hover:border-primary/30">
                    <i className="ph-bold ph-calendar-plus text-xl"></i>
                  </div>
                  <span className="font-semibold text-base tracking-wide">{t('contact.bookCall')}</span>
                </a>
              </div>
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">{t('contact.directInquiry')}</p>
                <a
                  href="mailto:contact@studio17.world"
                  className="inline-flex items-center gap-4 group text-white hover:text-primary transition-colors"
                >
                  <div className="w-12 h-12 flex-shrink-0 rounded-full bg-white/5 border border-white/10 flex items-center justify-center transition-all group-hover:bg-primary/20 group-hover:border-primary/30">
                    <i className="ph-bold ph-envelope-simple text-xl"></i>
                  </div>
                  <span className="font-semibold text-base tracking-wide">contact@studio17.world</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      <CaseStudyModal
        open={Boolean(caseSlugParam && activeCaseStudy && caseReviewItem)}
        study={activeCaseStudy}
        slug={caseSlugParam || ''}
        reviewName={caseReviewItem?.name || ''}
        avatarSrc={caseAvatar}
        onClose={handleCaseStudyClose}
      />
    </div>
  );
}
