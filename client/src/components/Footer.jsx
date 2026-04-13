import { Link } from 'react-router-dom';
import { useLocale } from '../context/LocaleContext';

export default function Footer() {
  const { t } = useLocale();

  return (
    <footer className="bg-blackbox pt-20 pb-10 relative z-20">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-10">
          <div className="text-left">
            <Link to="/" className="inline-block mb-4 flex items-baseline gap-1 select-none">
              <span className="font-extrabold text-[2rem] md:text-4xl tracking-[-0.05em] text-white">Studio</span>
              <span className="font-extrabold text-[2rem] md:text-4xl tracking-[-0.12em] text-white ml-1.5">17</span>
            </Link>
            <p className="text-slate-400 text-lg md:text-xl font-serif italic max-w-md leading-relaxed">
              {t('footer.tagline')}
            </p>
          </div>

          <div className="flex gap-4">
            <a href="#" className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-primary hover:border-primary transition-all shadow-sm group">
              <i className="ph-bold ph-twitter-logo text-xl group-hover:scale-110 transition-transform"></i>
            </a>
            <a href="#" className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-primary hover:border-primary transition-all shadow-sm group">
              <i className="ph-bold ph-instagram-logo text-xl group-hover:scale-110 transition-transform"></i>
            </a>
            <a href="#" className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-primary hover:border-primary transition-all shadow-sm group">
              <i className="ph-bold ph-linkedin-logo text-xl group-hover:scale-110 transition-transform"></i>
            </a>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col-reverse md:flex-row justify-between items-center text-sm text-slate-500 font-medium">
          <p className="mt-6 md:mt-0">{t('footer.copyright')}</p>
          <div className="flex flex-wrap justify-center gap-8">
            <a href="#" className="hover:text-white transition-colors">{t('footer.about')}</a>
            <a href="#reviews" className="hover:text-white transition-colors">{t('footer.reviews')}</a>
            <a href="#services" className="hover:text-white transition-colors">{t('footer.services')}</a>
            <a href="#results" className="hover:text-white transition-colors">{t('footer.results')}</a>
            <a href="#news" className="hover:text-white transition-colors">{t('footer.news')}</a>
            <a href="#" className="ml-4 border-l border-white/20 pl-8 hover:text-white transition-colors">{t('footer.privacy')}</a>
            <a href="#" className="hover:text-white transition-colors">{t('footer.terms')}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
