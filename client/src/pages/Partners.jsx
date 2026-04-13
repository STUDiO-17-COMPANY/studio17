import { useMemo } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import MobileFloatingCTA from '../components/MobileFloatingCTA';
import { useLocale } from '../context/LocaleContext';

export default function Partners() {
  const { t } = useLocale();
  const p = t('partnersPage');

  const navLinks = useMemo(() => {
    if (!p?.nav) return [];
    const { nav } = p;
    return [
      { id: 'p-channels', href: '#channels', label: nav.channels, external: true },
      { id: 'p-value', href: '#value', label: nav.value, external: true },
      { id: 'p-process', href: '#process', label: nav.process, external: true },
      { id: 'p-tiers', href: '#tiers', label: nav.tiers, external: true },
      { id: 'p-apply', href: '#apply', label: nav.apply, external: true },
    ];
  }, [p]);

  const channelOptions = Array.isArray(p?.form?.channelOptions) ? p.form.channelOptions : [];
  const referralOptions = Array.isArray(p?.form?.referralOptions) ? p.form.referralOptions : [];
  const marketOptions = Array.isArray(p?.form?.marketOptions) ? p.form.marketOptions : [];
  const channels = Array.isArray(p?.channels) ? p.channels : [];
  const howSteps = Array.isArray(p?.howSteps) ? p.howSteps : [];
  const deliverItems = Array.isArray(p?.deliverItems) ? p.deliverItems : [];
  const transparencyCards = Array.isArray(p?.transparencyCards) ? p.transparencyCards : [];
  const youCanList = Array.isArray(p?.youCanList) ? p.youCanList : [];
  const soYouCanList = Array.isArray(p?.soYouCanList) ? p.soYouCanList : [];
  const heroBullets = Array.isArray(p?.heroBullets) ? p.heroBullets : [];

  return (
    <div>
      <Navbar links={navLinks} ctaHref="#apply" ctaLabel={p.ctaBecomePartner} />
      <MobileFloatingCTA href="#apply" label={p.ctaJoinProgram} />

      <section className="pt-28 pb-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-dark text-white rounded-[2.5rem] p-8 md:p-16 lg:p-24 relative overflow-hidden text-center shadow-2xl shadow-slate-900/10">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-white/5 to-transparent pointer-events-none"></div>
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/20 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl pointer-events-none"></div>

            <div className="relative z-10 max-w-4xl mx-auto">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/10 text-xs font-semibold text-primary mb-6 backdrop-blur-sm">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                {p.heroBadge}
              </div>

              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 leading-[1.1]">
                {p.heroTitleLine1} <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">{p.heroTitleGradient}</span>
              </h1>

              <p className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">{p.heroIntro}</p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
                <a
                  href="#apply"
                  className="w-full sm:w-auto px-8 py-4 bg-primary text-white rounded-full font-bold shadow-xl shadow-primary/30 hover:scale-105 hover:bg-blue-600 transition-all duration-300"
                >
                  {p.heroApply}
                </a>
                <a
                  href="mailto:partners@studio17.com"
                  className="w-full sm:w-auto px-8 py-4 bg-white/10 text-white border border-white/20 rounded-full font-bold hover:bg-white/20 transition-all duration-300 flex items-center justify-center gap-2 group backdrop-blur-sm"
                >
                  {p.heroEmail} <i className="ph-bold ph-envelope-simple"></i>
                </a>
              </div>

              <p className="text-xs text-slate-500 mb-10">{p.heroNote}</p>

              <div className="flex flex-wrap justify-center gap-6 md:gap-12 text-sm font-medium text-slate-400">
                {heroBullets.map((text, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <i className="ph-fill ph-check-circle text-primary"></i> {text}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white" id="value">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-light p-8 md:p-12 rounded-[2.5rem] border border-slate-100 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300">
              <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center text-primary text-2xl mb-8">
                <i className="ph-bold ph-gift"></i>
              </div>
              <h3 className="text-2xl font-bold text-dark mb-6">{p.youCanTitle}</h3>
              <ul className="space-y-4 text-sm md:text-base">
                {youCanList.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <i className="ph-bold ph-check text-primary mt-1 flex-shrink-0"></i>
                    <span className="text-slate-600">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-dark text-white p-8 md:p-12 rounded-[2.5rem] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl"></div>
              <div className="relative z-10">
                <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center text-white text-2xl mb-8 backdrop-blur-sm">
                  <i className="ph-bold ph-rocket-launch"></i>
                </div>
                <h3 className="text-2xl font-bold text-white mb-6">{p.soYouCanTitle}</h3>
                <ul className="space-y-4 text-sm md:text-base">
                  {soYouCanList.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <i className="ph-bold ph-arrow-right text-primary mt-1 flex-shrink-0"></i>
                      <span className="text-slate-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="text-center mt-8">
            <p className="text-sm font-semibold text-slate-500 bg-slate-50 inline-block px-4 py-2 rounded-full border border-slate-100">
              <i className="ph-bold ph-info text-primary mr-1"></i> {p.disclaimer}
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 bg-slate-50" id="channels">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-primary font-semibold text-sm tracking-widest uppercase">{p.ecosystemLabel}</span>
            <h2 className="text-3xl md:text-4xl font-bold text-dark mt-2">{p.channelsTitle}</h2>
            <p className="text-slate-500 mt-4">{p.channelsIntro}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {channels.map((ch, i) => (
              <div
                key={i}
                className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:border-primary/30 hover:shadow-lg transition-all duration-300"
              >
                <i className={`${ch.icon} text-3xl text-primary mb-4`}></i>
                <h4 className="text-lg font-bold text-dark mb-2">{ch.title}</h4>
                <p className="text-sm text-slate-500 leading-relaxed">{ch.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-sm text-slate-400">{p.channelsFooter}</p>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white overflow-hidden" id="process">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-20">
            <div className="lg:w-1/2">
              <h2 className="text-3xl font-bold text-dark mb-8">{p.howTitle}</h2>
              <div className="relative pl-8 border-l-2 border-slate-100 space-y-12">
                {howSteps.map((s, i) => (
                  <div key={i} className="relative">
                    <span
                      className={`absolute -left-[41px] top-0 w-6 h-6 rounded-full ${
                        s.active ? 'bg-primary' : 'bg-slate-200'
                      } border-4 border-white shadow-sm`}
                    ></span>
                    <h4 className="font-bold text-dark text-lg">{s.step}</h4>
                    <p className="text-slate-500 mt-1">{s.desc}</p>
                  </div>
                ))}
              </div>
              <p className="mt-8 text-sm font-semibold text-slate-400">{p.howFooter}</p>
            </div>

            <div className="lg:w-1/2">
              <h2 className="text-3xl font-bold text-dark mb-8">{p.deliverTitle}</h2>
              <div className="space-y-6">
                {deliverItems.map((d, i) => (
                  <div key={i} className="flex items-start gap-4 p-4 rounded-2xl hover:bg-slate-50 transition-colors">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary flex-shrink-0">
                      <i className={d.icon}></i>
                    </div>
                    <div>
                      <h4 className="font-bold text-dark">{d.title}</h4>
                      <p className="text-sm text-slate-500">{d.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-dark relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{p.transparencyTitle}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {transparencyCards.map((card, i) => (
              <div key={i} className="p-8 rounded-2xl bg-white/5 border border-white/10">
                <h3 className="text-xl font-bold text-white mb-2">{card.title}</h3>
                <p className="text-sm text-slate-400">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-white" id="tiers">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4">{p.tiersTitle}</h2>
            <p className="text-slate-500">{p.tiersIntro}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="border border-slate-200 rounded-3xl p-8 hover:shadow-lg transition-all">
              <h3 className="text-xl font-bold text-dark mb-2">{p.tierStarter?.name}</h3>
              <p className="text-sm text-slate-500 mb-6">{p.tierStarter?.desc}</p>
              <ul className="space-y-3 text-sm text-slate-600 mb-8">
                {(p.tierStarter?.bullets || []).map((b, i) => (
                  <li key={i} className="flex gap-2">
                    <i className="ph-bold ph-check text-primary"></i> {b}
                  </li>
                ))}
              </ul>
            </div>

            <div className="border border-primary bg-primary/5 rounded-3xl p-8 relative hover:shadow-xl transition-all scale-105 z-10">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                {p.tierPopular}
              </div>
              <h3 className="text-xl font-bold text-primary mb-2">{p.tierGrowth?.name}</h3>
              <p className="text-sm text-slate-500 mb-6">{p.tierGrowth?.desc}</p>
              <ul className="space-y-3 text-sm text-slate-700 mb-8">
                {(p.tierGrowth?.bullets || []).map((b, i) => (
                  <li key={i} className="flex gap-2">
                    <i className="ph-bold ph-check text-primary"></i> {b}
                  </li>
                ))}
              </ul>
            </div>

            <div className="border border-slate-200 bg-dark text-white rounded-3xl p-8 hover:shadow-lg transition-all">
              <h3 className="text-xl font-bold text-white mb-2">{p.tierElite?.name}</h3>
              <p className="text-sm text-slate-400 mb-6">{p.tierElite?.desc}</p>
              <ul className="space-y-3 text-sm text-slate-300 mb-8">
                {(p.tierElite?.bullets || []).map((b, i) => (
                  <li key={i} className="flex gap-2">
                    <i className="ph-bold ph-check text-primary"></i> {b}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-slate-50" id="apply">
        <div className="max-w-3xl mx-auto px-6">
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-100">
            <h2 className="text-3xl font-bold text-dark mb-6 text-center">{p.applyTitle}</h2>
            <form
              className="space-y-6"
              onSubmit={(e) => {
                e.preventDefault();
                alert(p.form?.applicationReceived);
              }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">{p.form?.name}</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                    placeholder={p.form?.namePlaceholder}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">{p.form?.email}</label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                    placeholder={p.form?.emailPlaceholder}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">{p.form?.channel}</label>
                  <select className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all bg-white">
                    {channelOptions.map((opt, i) => (
                      <option key={i}>{opt}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">{p.form?.referrals}</label>
                  <select className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all bg-white">
                    {referralOptions.map((opt, i) => (
                      <option key={i}>{opt}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">{p.form?.link}</label>
                  <input
                    type="url"
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                    placeholder={p.form?.linkPlaceholder}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">{p.form?.market}</label>
                  <select className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all bg-white">
                    {marketOptions.map((opt, i) => (
                      <option key={i}>{opt}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">{p.form?.collab}</label>
                <textarea
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all h-32"
                  placeholder={p.form?.collabPlaceholder}
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-primary text-white rounded-lg font-bold hover:bg-blue-600 transition-colors shadow-lg shadow-primary/25"
              >
                {p.form?.submit}
              </button>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
