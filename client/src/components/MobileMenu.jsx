import { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function MobileMenu({ open, onClose, links, langOptions = [], onSelectLocale }) {
  useEffect(() => {
    if (open) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
    return () => document.body.classList.remove('overflow-hidden');
  }, [open]);

  return (
    <div
      className={`fixed inset-0 h-[100dvh] bg-white z-[60] transform transition-transform duration-300 flex flex-col items-center lg:hidden ${
        open ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <div className="w-full max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-baseline select-none">
          <span className="font-extrabold text-xl tracking-[-0.05em]">Studio</span>
          <span className="font-extrabold text-xl tracking-[-0.12em] ml-1.5">17</span>
        </div>
        <button
          onClick={onClose}
          className="text-2xl text-dark focus:outline-none -mr-2 p-2 w-12 h-12 flex items-center justify-center rounded-full hover:bg-slate-100 transition-colors"
        >
          <i className="ph-bold ph-x"></i>
        </button>
      </div>

      <div className="flex-1 flex flex-col justify-center items-center gap-8 text-center pb-20">
        {links.map((link) =>
          link.external || link.href.startsWith('#') ? (
            <a
              key={link.href}
              href={link.href}
              onClick={onClose}
              className="text-3xl font-bold text-dark hover:text-primary transition-colors"
            >
              {link.label}
            </a>
          ) : (
            <Link
              key={link.href}
              to={link.href}
              onClick={onClose}
              className="text-3xl font-bold text-dark hover:text-primary transition-colors"
            >
              {link.label}
            </Link>
          )
        )}
        {langOptions.length > 0 && (
          <div className="flex flex-wrap justify-center gap-4 pt-8 border-t border-slate-200 mt-8">
            {langOptions.map(([loc, label]) => (
              <button
                key={loc}
                type="button"
                onClick={() => {
                  onSelectLocale?.(loc);
                  onClose();
                }}
                className="text-lg font-medium text-slate-500 hover:text-primary transition-colors"
              >
                {label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
