import { useRef, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useLocale } from '../context/LocaleContext';

const PARTNER_LOGOS = [
  'https://res.cloudinary.com/dnxoz9alm/image/upload/v1769355058/ChatGPT_Image_Sep_17_2025_03_37_53_PM_wdzcud.avif',
  'https://res.cloudinary.com/dnxoz9alm/image/upload/v1771146262/3CX_logo_d2gykr.svg',
  'https://res.cloudinary.com/dnxoz9alm/image/upload/v1769719783/FareHarborLogo_tb2mfj.png',
  'https://res.cloudinary.com/dnxoz9alm/image/upload/v1769620957/Lodgify_Logo_cliemn.png',
  'https://res.cloudinary.com/dnxoz9alm/image/upload/v1770807357/LOGOPHOS_a2sbkp.svg',
  'https://res.cloudinary.com/dnxoz9alm/image/upload/v1772481613/logo_refined_4096-Photoroom_c4zzsj.png',
  'https://res.cloudinary.com/dnxoz9alm/image/upload/v1772479726/Sem_t%C3%ADtulo_1_e7gg2f.png',
  'https://res.cloudinary.com/dnxoz9alm/image/upload/v1767807311/501449218_17852143143456062_1859588940980405510_n-removebg-preview_auw6f5.png',
  'https://res.cloudinary.com/dnxoz9alm/image/upload/v1772645531/RG_Automotive_Logo_yhs1uc.png',
];

const ECOSYSTEM_MARQUEE_KEYS = [
  'advertising', 'branding', 'websites', 'sales', 'media',
  'precisionMarketing', 'production', 'gamification', 'softwareForMarketing',
];

const WORLD_CARD_KEYS = [
  { key: 'orchestration', icon: 'ph-duotone ph-magic-wand' },
  { key: 'production', icon: 'ph-duotone ph-tree-structure' },
  { key: 'intelligence', icon: 'ph-duotone ph-target' },
  { key: 'data', icon: 'ph-duotone ph-database' },
  { key: 'mediaBuying', icon: 'ph-duotone ph-chart-line-up' },
  { key: 'geo', icon: 'ph-duotone ph-globe-hemisphere-west' },
];

const NEWS_ITEM_KEYS = ['0', '1', '2', '3', '4'];

export default function Home() {
  const { t } = useLocale();
  const verticalMarqueeRef = useRef(null);
  const verticalMarqueeTrackRef = useRef(null);
  const cardsCarouselRef = useRef(null);
  const newsCarouselRef = useRef(null);

  // Vertical marquee focus/blur effect
  useEffect(() => {
    const container = verticalMarqueeRef.current;
    const track = verticalMarqueeTrackRef.current;
    const items = container?.querySelectorAll('.marquee-item');

    if (!container || !track || !items?.length) return;

    const updateFilters = () => {
      const rect = container.getBoundingClientRect();
      const centerY = rect.top + rect.height / 2;
      const maxDist = rect.height / 2;

      items.forEach((item) => {
        const itemRect = item.getBoundingClientRect();
        const itemCenterY = itemRect.top + itemRect.height / 2;
        const dist = Math.abs(itemCenterY - centerY);
        let normalized = Math.min(dist / maxDist, 1);
        const curve = Math.pow(normalized, 2.5);
        const opacity = 1 - curve * 0.95;
        const blurAmount = curve * 8;
        const scale = 1 - curve * 0.1;

        item.style.opacity = opacity.toFixed(3);
        item.style.filter = `blur(${blurAmount.toFixed(2)}px)`;
        item.style.transform = `scale(${scale.toFixed(3)})`;
      });
      requestAnimationFrame(updateFilters);
    };

    const raf = requestAnimationFrame(updateFilters);

    const handleMouseMove = (e) => {
      const target = e.target.closest('.marquee-item');
      if (target && parseFloat(target.style.opacity) > 0.9) {
        track.style.animationPlayState = 'paused';
        target.style.cursor = 'pointer';
      } else {
        track.style.animationPlayState = 'running';
        if (target) target.style.cursor = 'default';
      }
    };

    const handleMouseLeave = () => {
      track.style.animationPlayState = 'running';
    };

    const handleClick = (e) => {
      const target = e.target.closest('.marquee-item');
      if (target && parseFloat(target.style.opacity) > 0.9) {
        window.location.href = 'https://www.studio17.world';
      }
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);
    container.addEventListener('click', handleClick);

    return () => {
      cancelAnimationFrame(raf);
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
      container.removeEventListener('click', handleClick);
    };
  }, []);

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
    if (!cards || !news) return;

    const unsubCards = setupCarouselDots(cardsCarouselRef, '#carousel-dots .dot');
    const unsubNews = setupCarouselDots(newsCarouselRef, '#news-carousel-dots .dot');

    return () => {
      unsubCards?.();
      unsubNews?.();
    };
  }, []);

  const scrollAmount = typeof window !== 'undefined' && window.innerWidth < 768 ? 300 : 400;

  return (
    <div className="flex flex-col min-h-screen">
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
      <main className="flex-grow flex flex-col justify-center relative z-10 px-6 md:px-12 max-w-[1600px] w-full mx-auto pb-24 md:pb-32 pt-4 md:pt-24 min-h-[90vh]">
        <div className="mb-6 lg:mb-8 flex items-baseline select-none">
          <span className="font-extrabold text-[2rem] md:text-4xl lg:text-[2.75rem] text-dark" style={{ letterSpacing: '-0.05em' }}>Studio</span>
          <span className="font-extrabold text-[2rem] md:text-4xl lg:text-[2.75rem] text-dark ml-1.5 lg:ml-2" style={{ letterSpacing: '-0.12em' }}>17</span>
        </div>

        <h1 className="text-[2.75rem] sm:text-5xl md:text-6xl lg:text-[5.5rem] xl:text-[6rem] font-light text-dark leading-[1.1] md:leading-[1.05] tracking-tight mb-10 lg:mb-16 w-full">
          <span className="block">{t('hero.h1Line1')} <span className="font-serif italic font-normal text-primary tracking-normal pr-1">{t('hero.h1Highlight1')}</span></span>
          <span className="block">{t('hero.h1Line2')} <span className="font-serif italic font-normal text-primary tracking-normal pr-1">{t('hero.h1Highlight2')}</span> {t('hero.h1Line3')}</span>
        </h1>

        <div className="flex flex-col md:flex-row gap-8 lg:gap-24 max-w-[100%] lg:max-w-[70%] items-start">
          <div className="md:w-[35%] flex flex-col pt-1">
            <h3 className="text-[15px] md:text-base font-bold leading-snug text-dark mb-5 md:mb-6 pr-4">
              {t('hero.subtitle')} <br className="hidden lg:block" /> {t('hero.subtitleLine2')}
            </h3>
            <div className="w-full max-w-[140px] h-[2px] bg-dark"></div>
          </div>

          <div className="md:w-[65%] relative text-[15px] md:text-base text-slate-800 leading-[1.65] font-normal">
            <div
              className="absolute -inset-6 md:-inset-10 z-[-1] backdrop-blur-md pointer-events-none"
              style={{
                maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)',
                WebkitMaskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)',
              }}
            />
            <p>
              {t('hero.paragraph')}
            </p>
          </div>
        </div>
      </main>

      {/* Ecosystem */}
      <section id="ecosystem" className="relative z-10 w-full bg-white pt-20 md:pt-32 pb-20 md:pb-32 overflow-hidden">
        <div
          className="absolute top-1/2 right-0 w-full md:w-[60%] h-[120vh] -translate-y-1/2 overflow-hidden pointer-events-none z-0 flex items-center justify-end graphic-container opacity-20"
          style={{
            maskImage: 'linear-gradient(to right, transparent 0%, black 50%)',
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 50%)',
          }}
        >
          <svg className="h-[120vh] w-auto translate-x-[20%]" viewBox="-200 -200 1400 1400" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="ringGrad2" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#2563EB" stopOpacity="0.6" />
                <stop offset="30%" stopColor="#2563EB" stopOpacity="0.1" />
                <stop offset="100%" stopColor="#2563EB" stopOpacity="0" />
              </linearGradient>
            </defs>
            <circle cx="500" cy="500" r="400" stroke="url(#ringGrad2)" strokeWidth="80" strokeLinecap="round" className="blur-[10px]" strokeDasharray="1600 2500" transform="rotate(45 500 500)" />
            <circle cx="500" cy="500" r="400" stroke="url(#ringGrad2)" strokeWidth="40" strokeLinecap="round" className="blur-[3px]" strokeDasharray="1600 2500" transform="rotate(45 500 500)" />
            <circle cx="500" cy="500" r="490" stroke="#2563EB" strokeWidth="20" strokeDasharray="0 60" strokeLinecap="round" className="opacity-30" />
            <circle cx="500" cy="500" r="530" stroke="#2563EB" strokeWidth="10" strokeDasharray="0 40" strokeLinecap="round" className="opacity-15" />
          </svg>
        </div>

        <div className="max-w-[1600px] mx-auto px-6 md:px-12 flex flex-col lg:grid lg:grid-cols-2 gap-10 lg:gap-24 items-center relative z-10">
          <div className="order-1 lg:order-2 flex flex-col w-full text-left lg:pl-16">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-slate-200/80 to-transparent backdrop-blur-md rounded-full pl-4 pr-16 py-1.5 mb-6 md:mb-8 w-max border-l border-slate-300">
              <div className="w-1.5 h-1.5 rounded-full bg-dark"></div>
              <span className="text-sm font-semibold text-dark">{t('ecosystem.badge')}</span>
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-dark leading-[1.15] tracking-tight mb-6 md:mb-8">
              {t('ecosystem.h2')}<br />{t('ecosystem.h2Line2')}
            </h2>

            <p className="text-lg md:text-xl lg:text-2xl text-slate-400 font-serif italic leading-relaxed max-w-[90%] mb-8 md:mb-12 transition-colors duration-500 hover:text-dark cursor-default">
              {t('ecosystem.paragraph')}
            </p>

            <a href="#" className="inline-flex items-center gap-3 w-max group">
              <div className="bg-dark text-white rounded-full px-6 py-4 font-bold text-sm tracking-wide transition-all group-hover:bg-primary group-hover:shadow-lg shadow-primary/20">
                {t('ecosystem.buttonLine1')}<br />{t('ecosystem.buttonLine2')}
              </div>
              <div className="w-12 h-12 rounded-full bg-dark text-white flex items-center justify-center transition-all group-hover:bg-primary group-hover:scale-105">
                <i className="ph-bold ph-arrow-up-right text-lg"></i>
              </div>
            </a>
          </div>

          <div
            ref={verticalMarqueeRef}
            id="vertical-marquee-container"
            className="order-2 lg:order-1 relative w-full h-[320px] md:h-[550px] flex items-center justify-center overflow-hidden mt-4 lg:mt-0"
            style={{
              maskImage: 'linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)',
              WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)',
            }}
          >
            <div ref={verticalMarqueeTrackRef} id="vertical-marquee-track" className="absolute top-0 left-0 flex flex-col items-center w-full animate-scroll-up">
              {[1, 2].map((set) => (
                <div key={set} className="flex flex-col items-center gap-10 md:gap-12 pb-10 md:pb-12 w-full">
                  {ECOSYSTEM_MARQUEE_KEYS.map((key) => (
                    <span key={`${set}-${key}`} className="marquee-item font-serif italic text-3xl md:text-[3.5rem] text-dark text-center leading-tight tracking-tight">
                      {t(`ecosystem.marquee.${key}`)}
                    </span>
                  ))}
                </div>
              ))}
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
                  alert('Message sent successfully!');
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
    </div>
  );
}
