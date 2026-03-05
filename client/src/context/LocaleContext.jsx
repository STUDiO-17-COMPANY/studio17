import { createContext, useContext, useState, useEffect, useCallback } from 'react';

import en from '../locales/en.json';
import pt from '../locales/pt.json';
import es from '../locales/es.json';
import el from '../locales/el.json';

const LOCALE_STORAGE_KEY = 'studio17_locale';
const LOCALE_MANUAL_KEY = 'studio17_locale_manual'; // true = user chose explicitly
const SUPPORTED_LOCALES = ['en', 'pt', 'es', 'el'];

const LOCALES = { en, pt, es, el };

const COUNTRY_TO_LOCALE = {
  PT: 'pt',   // Portugal
  ES: 'es',   // Spain
  GR: 'el',   // Greece
  CY: 'el',   // Cyprus (Greek)
};
// Any other country → English (en)

const LocaleContext = createContext(null);

export function LocaleProvider({ children }) {
  const [locale, setLocaleState] = useState('en');
  const [loading, setLoading] = useState(true);

  const translations = LOCALES[locale] || en;

  useEffect(() => {
    const langMap = { en: 'en', pt: 'pt-PT', es: 'es-ES', el: 'el-GR' };
    document.documentElement.lang = langMap[locale] || 'en';
  }, [locale]);

  const setLocale = useCallback((newLocale) => {
    if (!SUPPORTED_LOCALES.includes(newLocale)) return;
    setLocaleState(newLocale);
    localStorage.setItem(LOCALE_STORAGE_KEY, newLocale);
    localStorage.setItem(LOCALE_MANUAL_KEY, 'true'); // user chose explicitly
  }, []);

  useEffect(() => {
    let cancelled = false;

    const stored = localStorage.getItem(LOCALE_STORAGE_KEY);
    const manual = localStorage.getItem(LOCALE_MANUAL_KEY) === 'true';
    if (stored && SUPPORTED_LOCALES.includes(stored) && manual) {
      setLocaleState(stored);
      setLoading(false);
      return;
    }

    fetch('https://geo.kamero.ai/api/geo')
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then((data) => {
        if (cancelled) return;
        const countryCode = (data?.country || '').toUpperCase();
        const detected = COUNTRY_TO_LOCALE[countryCode] || 'en';
        setLocaleState(detected);
      })
      .catch(() => {
        if (!cancelled) setLocaleState('en');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const t = useCallback(
    (key) => {
      const keys = key.split('.');
      let value = translations;
      for (const k of keys) {
        value = value?.[k];
      }
      if (value === undefined || value === null) return key;
      return value;
    },
    [translations]
  );

  return (
    <LocaleContext.Provider value={{ locale, setLocale, t, loading }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error('useLocale must be used within LocaleProvider');
  return ctx;
}
