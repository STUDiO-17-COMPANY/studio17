import { useState, useEffect } from 'react';
import { useLocale } from '../context/LocaleContext';
import MobileMenu from './MobileMenu';

const NAV_KEYS = [
  { id: 'about', href: '#', key: 'about', external: true },
  { id: 'services', href: '#services', key: 'services', external: true },
  { id: 'reviews', href: '#reviews', key: 'reviews', external: true },
  { id: 'results', href: '#results', key: 'results', external: true },
  { id: 'news', href: '#news', key: 'news', external: true },
];

export default function Navbar({ ctaHref, ctaLabel, links: linksOverride }) {
  const { t, setLocale } = useLocale();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  const defaultLinks = NAV_KEYS.map((item) => ({
    ...item,
    label: t(`nav.${item.key}`),
  }));
  const links = linksOverride ?? defaultLinks;

  const langOptions = t('nav.langOptions');
  const langOptionsList =
    typeof langOptions === 'object' && langOptions !== null
      ? Object.entries(langOptions)
      : [];

  useEffect(() => {
    const handleClickOutside = (e) => {
      const btn = document.getElementById('lang-menu-btn');
      const menu = document.getElementById('lang-menu');
      if (btn && menu && !btn.contains(e.target) && !menu.contains(e.target)) {
        setLangOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <>
      <nav className="w-full relative z-20 py-6 md:py-8 px-6 md:px-12 flex justify-end items-center">
        <div className="hidden lg:flex items-center gap-10 text-base font-semibold text-dark tracking-wide">
          {links.map((link) => (
            <a key={link.id} href={link.href} className="hover:text-primary transition-colors">
              {link.label}
            </a>
          ))}

          {ctaHref && ctaLabel && (
            <a href={ctaHref} className="hidden lg:inline-flex bg-dark text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-primary transition-colors">
              {ctaLabel}
            </a>
          )}

          <div className="relative ml-2">
            <button
              id="lang-menu-btn"
              onClick={(e) => {
                e.stopPropagation();
                setLangOpen(!langOpen);
              }}
              className="flex items-center gap-1 cursor-pointer hover:text-primary transition-colors focus:outline-none py-2"
            >
              {t('nav.langLabel')} <i className={`ph-bold ph-caret-down text-[10px] ml-0.5 transition-transform duration-300 ${langOpen ? 'rotate-180' : ''}`}></i>
            </button>

            <div
              id="lang-menu"
              className={`absolute right-0 top-full mt-2 w-36 bg-white/90 backdrop-blur-xl rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.08)] border border-slate-100 transition-all duration-300 z-50 overflow-hidden ${
                langOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-2'
              }`}
            >
              <div className="py-2 flex flex-col">
                {langOptionsList.map(([loc, label]) => (
                  <button
                    key={loc}
                    type="button"
                    onClick={() => {
                      setLocale(loc);
                      setLangOpen(false);
                    }}
                    className="px-5 py-2.5 text-sm text-slate-600 hover:bg-slate-50/80 hover:text-primary font-medium text-left transition-colors w-full"
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={() => setMobileOpen(true)}
          className="lg:hidden text-2xl text-dark ml-auto relative z-30 focus:outline-none"
        >
          <i className="ph-bold ph-list"></i>
        </button>
      </nav>

      <MobileMenu
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        links={links}
        langOptions={langOptionsList}
        onSelectLocale={setLocale}
      />
    </>
  );
}
