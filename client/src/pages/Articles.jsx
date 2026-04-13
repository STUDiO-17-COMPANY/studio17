import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import MobileFloatingCTA from '../components/MobileFloatingCTA';
import { useLocale } from '../context/LocaleContext';

export default function Articles() {
  const { t } = useLocale();
  const nav = t('articlesPage.nav');
  const articles = t('articlesPage.articles');
  const articleList = Array.isArray(articles) ? articles : [];

  const navLinks = useMemo(
    () => [
      { id: 'art-process', href: '/#process', label: nav.howItWorks, external: true },
      { id: 'art-articles', href: '/articles', label: nav.articles },
      { id: 'art-partners', href: '/partners', label: nav.partners },
      { id: 'art-testimonials', href: '/#reviews', label: nav.testimonials, external: true },
      { id: 'art-pricing', href: '/#pricing', label: nav.pricing, external: true },
      { id: 'art-faq', href: '/#faq', label: nav.faq, external: true },
    ],
    [nav]
  );

  return (
    <div>
      <Navbar links={navLinks} ctaHref="/#pricing" ctaLabel={t('articlesPage.ctaStartNow')} />
      <MobileFloatingCTA href="/#pricing" label={t('articlesPage.ctaFloating')} />

      <section className="pt-32 pb-16 px-6 md:pt-40">
        <div className="max-w-7xl mx-auto">
          <div className="relative bg-dark rounded-[2.5rem] p-8 md:p-12 overflow-hidden group hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500">
            <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-l from-primary/20 to-transparent opacity-50"></div>
            <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-primary/40 rounded-full blur-3xl group-hover:bg-primary/60 transition-colors duration-500"></div>

            <div className="relative z-10 flex flex-col md:flex-row gap-12 items-center">
              <div className="md:w-1/2">
                <div className="inline-block px-3 py-1 mb-4 text-xs font-bold tracking-wider text-primary uppercase bg-primary/10 rounded-full">
                  {t('articlesPage.featuredBadge')}
                </div>
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">{t('articlesPage.featuredTitle')}</h2>
                <p className="text-slate-400 text-lg mb-8">{t('articlesPage.featuredDesc')}</p>
                <a href="#" className="inline-flex items-center gap-2 text-white font-bold border-b border-primary pb-1 hover:text-primary transition-colors">
                  {t('articlesPage.readArticle')} <i className="ph-bold ph-arrow-right"></i>
                </a>
              </div>
              <div className="md:w-1/2 w-full">
                <div className="aspect-video bg-white/5 rounded-2xl border border-white/10 overflow-hidden">
                  <img
                    src="https://res.cloudinary.com/dnxoz9alm/image/upload/v1769593906/ChatGPT_Image_Jan_27_2026_10_29_15_PM_olw6yd.png"
                    alt={t('articlesPage.featuredImageAlt')}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articleList.map((article, i) => (
              <article key={i} className="group cursor-pointer">
                <div className="aspect-[4/3] bg-slate-100 rounded-2xl mb-6 overflow-hidden relative">
                  <div className="absolute inset-0 bg-slate-200 group-hover:scale-105 transition-transform duration-500"></div>
                  <div className="absolute top-4 left-4 bg-white px-3 py-1 rounded-full text-xs font-bold text-dark shadow-sm">{article.tag}</div>
                </div>
                <h3 className="text-xl font-bold text-dark mb-3 group-hover:text-primary transition-colors">{article.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-4">{article.desc}</p>
                <span className="text-primary font-semibold text-sm flex items-center gap-1">
                  {t('articlesPage.readMore')} <i className="ph-bold ph-arrow-right"></i>
                </span>
              </article>
            ))}

            <div className="bg-primary rounded-2xl p-8 flex flex-col justify-center items-center text-center hover:scale-[1.02] transition-transform duration-300">
              <i className="ph-bold ph-lightning text-4xl text-white mb-4"></i>
              <h3 className="text-2xl font-bold text-white mb-2">{t('articlesPage.ctaCardTitle')}</h3>
              <p className="text-blue-100 text-sm mb-6">{t('articlesPage.ctaCardDesc')}</p>
              <Link to="/#pricing" className="bg-white text-primary px-6 py-3 rounded-full font-bold shadow-lg hover:shadow-xl transition-all w-full">
                {t('articlesPage.ctaCardButton')}
              </Link>
            </div>
          </div>

          <div className="mt-16 text-center">
            <button
              type="button"
              className="px-8 py-3 bg-white border border-slate-200 text-dark font-semibold rounded-full hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm group"
            >
              {t('articlesPage.loadMore')}{' '}
              <i className="ph-bold ph-caret-down ml-2 group-hover:translate-y-0.5 transition-transform inline-block"></i>
            </button>
          </div>
        </div>
      </section>

      <section className="py-20 bg-dark">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/10 text-xs font-semibold text-primary mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            {t('articlesPage.newsletterBadge')}
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{t('articlesPage.newsletterTitle')}</h2>
          <p className="text-slate-400 text-lg mb-8 max-w-lg mx-auto">{t('articlesPage.newsletterDesc')}</p>

          <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder={t('articlesPage.newsletterEmailPlaceholder')}
              className="flex-1 px-6 py-4 rounded-full bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
            />
            <button
              type="button"
              className="px-8 py-4 bg-primary text-white rounded-full font-bold hover:bg-blue-600 transition-colors shadow-lg shadow-primary/25"
            >
              {t('articlesPage.newsletterSubscribe')}
            </button>
          </form>
          <p className="mt-4 text-xs text-slate-500">{t('articlesPage.newsletterUnsubscribe')}</p>
        </div>
      </section>

      <section className="py-24 bg-light border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-dark mb-6">{t('articlesPage.bottomTitle')}</h2>
          <p className="text-slate-500 text-lg mb-10 max-w-xl mx-auto">{t('articlesPage.bottomDesc')}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/#pricing" className="px-8 py-4 bg-primary text-white rounded-full font-bold shadow-xl shadow-primary/30 hover:scale-105 transition-transform">
              {t('articlesPage.bottomPlans')}
            </Link>
            <Link to="/#process" className="px-8 py-4 bg-white border border-slate-200 text-dark rounded-full font-bold hover:bg-slate-50 transition-colors">
              {t('articlesPage.bottomProcess')}
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
