import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import MobileFloatingCTA from '../components/MobileFloatingCTA';

const NAV_LINKS = [
  { href: '#channels', label: 'Channels', external: true },
  { href: '#value', label: 'Value', external: true },
  { href: '#process', label: 'Process', external: true },
  { href: '#tiers', label: 'Tiers', external: true },
  { href: '#apply', label: 'Apply', external: true, active: true },
];

export default function Partners() {
  return (
    <div>
      <Navbar links={NAV_LINKS} ctaHref="#apply" ctaLabel="Become a Partner" />
      <MobileFloatingCTA href="#apply" label="Join Program" />

      {/* Hero */}
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
                Rewards scale with performance and deal size.
              </div>

              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 leading-[1.1]">
                Refer. We execute. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">You get rewarded.</span>
              </h1>

              <p className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
                Introduce businesses that need websites, funnels, or conversion upgrades. We handle sales + delivery. You get rewarded — with full tracking and clean communication.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
                <a href="#apply" className="w-full sm:w-auto px-8 py-4 bg-primary text-white rounded-full font-bold shadow-xl shadow-primary/30 hover:scale-105 hover:bg-blue-600 transition-all duration-300">
                  Apply to Partner Program
                </a>
                <a href="mailto:partners@studio17.com" className="w-full sm:w-auto px-8 py-4 bg-white/10 text-white border border-white/20 rounded-full font-bold hover:bg-white/20 transition-all duration-300 flex items-center justify-center gap-2 group backdrop-blur-sm">
                  Email Partnerships <i className="ph-bold ph-envelope-simple"></i>
                </a>
              </div>

              <p className="text-xs text-slate-500 mb-10">2-minute application. We reply within 48 hours.</p>

              <div className="flex flex-wrap justify-center gap-6 md:gap-12 text-sm font-medium text-slate-400">
                <div className="flex items-center gap-2"><i className="ph-fill ph-check-circle text-primary"></i> Tracked referrals</div>
                <div className="flex items-center gap-2"><i className="ph-fill ph-check-circle text-primary"></i> Fast quoting</div>
                <div className="flex items-center gap-2"><i className="ph-fill ph-check-circle text-primary"></i> Reliable execution</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Value Section */}
      <section className="py-24 bg-white" id="value">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-light p-8 md:p-12 rounded-[2.5rem] border border-slate-100 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300">
              <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center text-primary text-2xl mb-8"><i className="ph-bold ph-gift"></i></div>
              <h3 className="text-2xl font-bold text-dark mb-6">You can get</h3>
              <ul className="space-y-4 text-sm md:text-base">
                {['Rewards per closed deal you introduce', 'Tiered rewards as performance grows', 'Fast quoting (scope + range, quickly)', 'Partner tracking (status of every referral)', 'Dedicated partner contact', 'Partner kit (deck, 1-pagers, messaging)', 'Co-marketing (featured partners, collaborations)', 'Priority scheduling for partner leads'].map((item, i) => (
                  <li key={i} className="flex items-start gap-3"><i className="ph-bold ph-check text-primary mt-1 flex-shrink-0"></i><span className="text-slate-600">{item}</span></li>
                ))}
              </ul>
            </div>

            <div className="bg-dark text-white p-8 md:p-12 rounded-[2.5rem] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl"></div>
              <div className="relative z-10">
                <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center text-white text-2xl mb-8 backdrop-blur-sm"><i className="ph-bold ph-rocket-launch"></i></div>
                <h3 className="text-2xl font-bold text-white mb-6">So you can</h3>
                <ul className="space-y-4 text-sm md:text-base">
                  {['Monetize your network without building a delivery team', 'Move faster when clients ask "who can do this?"', 'Protect your reputation with reliable execution', 'Close better opportunities by bringing real solutions', 'Save time (we run sales + delivery)', 'Increase trust with transparent progress + outcomes'].map((item, i) => (
                    <li key={i} className="flex items-start gap-3"><i className="ph-bold ph-arrow-right text-primary mt-1 flex-shrink-0"></i><span className="text-slate-300">{item}</span></li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="text-center mt-8">
            <p className="text-sm font-semibold text-slate-500 bg-slate-50 inline-block px-4 py-2 rounded-full border border-slate-100">
              <i className="ph-bold ph-info text-primary mr-1"></i> No white-label. We work directly with the client — you remain the introducer and we keep you informed.
            </p>
          </div>
        </div>
      </section>

      {/* Partner Channels */}
      <section className="py-24 bg-slate-50" id="channels">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-primary font-semibold text-sm tracking-widest uppercase">The Ecosystem</span>
            <h2 className="text-3xl md:text-4xl font-bold text-dark mt-2">Partner Channels</h2>
            <p className="text-slate-500 mt-4">Choose the channel that matches how you create introductions.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: 'ph-duotone ph-briefcase', title: 'Advisor', desc: 'Accountants, lawyers, & consultants who refer trusted clients.' },
              { icon: 'ph-duotone ph-broadcast', title: 'Audience', desc: 'Creators, newsletter writers & podcasters with SME audiences.' },
              { icon: 'ph-duotone ph-users-three', title: 'Community', desc: 'Discord/Slack groups, coworking spaces & local networks.' },
              { icon: 'ph-duotone ph-pencil-circle', title: 'Agency', desc: 'Complementary services: PPC, SEO, Branding & Automation.' },
            ].map((ch, i) => (
              <div key={i} className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:border-primary/30 hover:shadow-lg transition-all duration-300">
                <i className={`${ch.icon} text-3xl text-primary mb-4`}></i>
                <h4 className="text-lg font-bold text-dark mb-2">{ch.title}</h4>
                <p className="text-sm text-slate-500 leading-relaxed">{ch.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-sm text-slate-400">We also partner with SaaS/tools, distribution networks, education programs, and enterprise ecosystems.</p>
          </div>
        </div>
      </section>

      {/* How it Works & What We Deliver */}
      <section className="py-24 bg-white overflow-hidden" id="process">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-20">
            <div className="lg:w-1/2">
              <h2 className="text-3xl font-bold text-dark mb-8">How it works</h2>
              <div className="relative pl-8 border-l-2 border-slate-100 space-y-12">
                {[
                  { step: '1. Apply', desc: '2 minutes. Tell us your channel + market.', active: true },
                  { step: '2. Alignment Call', desc: 'We confirm fit, referral process, and rewards structure.' },
                  { step: '3. Introduce', desc: 'You submit a referral or do a warm intro using our template.' },
                  { step: '4. We Close + Deliver', desc: 'You get updates throughout — and rewards when the deal closes.' },
                ].map((s, i) => (
                  <div key={i} className="relative">
                    <span className={`absolute -left-[41px] top-0 w-6 h-6 rounded-full ${s.active ? 'bg-primary' : 'bg-slate-200'} border-4 border-white shadow-sm`}></span>
                    <h4 className="font-bold text-dark text-lg">{s.step}</h4>
                    <p className="text-slate-500 mt-1">{s.desc}</p>
                  </div>
                ))}
              </div>
              <p className="mt-8 text-sm font-semibold text-slate-400">You'll never wonder what's happening — every referral is tracked.</p>
            </div>

            <div className="lg:w-1/2">
              <h2 className="text-3xl font-bold text-dark mb-8">What we deliver</h2>
              <div className="space-y-6">
                {[
                  { icon: 'ph-bold ph-desktop', title: 'High-converting websites', desc: 'Business-first design, not just pretty pictures.' },
                  { icon: 'ph-bold ph-funnel', title: 'Landing pages + Funnels', desc: 'Built to convert traffic into leads (paid-ready).' },
                  { icon: 'ph-bold ph-arrows-clockwise', title: 'Conversion-focused redesigns', desc: "Fix what's leaking money." },
                  { icon: 'ph-bold ph-chart-bar', title: 'Analytics Setup', desc: 'Events, pixels, funnels. Tracking ready.' },
                ].map((d, i) => (
                  <div key={i} className="flex items-start gap-4 p-4 rounded-2xl hover:bg-slate-50 transition-colors">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary flex-shrink-0"><i className={d.icon}></i></div>
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

      {/* Transparency */}
      <section className="py-24 bg-dark relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Transparency is our currency.</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {[
              { title: 'Pipeline Visibility', desc: 'Track every referral: received → qualified → proposal → won/lost.' },
              { title: 'Update Cadence', desc: 'Get updates weekly or bi-weekly — no chasing.' },
              { title: 'Delivery Standards', desc: 'Clear scope, timelines, and acceptance criteria (no ambiguity).' },
            ].map((t, i) => (
              <div key={i} className="p-8 rounded-2xl bg-white/5 border border-white/10">
                <h3 className="text-xl font-bold text-white mb-2">{t.title}</h3>
                <p className="text-sm text-slate-400">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partner Tiers */}
      <section className="py-24 bg-white" id="tiers">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4">Partner Tiers</h2>
            <p className="text-slate-500">Rewards scale with performance.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="border border-slate-200 rounded-3xl p-8 hover:shadow-lg transition-all">
              <h3 className="text-xl font-bold text-dark mb-2">Starter</h3>
              <p className="text-sm text-slate-500 mb-6">1–2 qualified referrals / quarter</p>
              <ul className="space-y-3 text-sm text-slate-600 mb-8">
                <li className="flex gap-2"><i className="ph-bold ph-check text-primary"></i> Standard referral rewards</li>
                <li className="flex gap-2"><i className="ph-bold ph-check text-primary"></i> Partner kit access</li>
              </ul>
            </div>

            <div className="border border-primary bg-primary/5 rounded-3xl p-8 relative hover:shadow-xl transition-all scale-105 z-10">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Most Popular</div>
              <h3 className="text-xl font-bold text-primary mb-2">Growth</h3>
              <p className="text-sm text-slate-500 mb-6">1–2 qualified referrals / month</p>
              <ul className="space-y-3 text-sm text-slate-700 mb-8">
                <li className="flex gap-2"><i className="ph-bold ph-check text-primary"></i> <strong>Higher</strong> rewards</li>
                <li className="flex gap-2"><i className="ph-bold ph-check text-primary"></i> Priority scheduling</li>
                <li className="flex gap-2"><i className="ph-bold ph-check text-primary"></i> Partner review call</li>
              </ul>
            </div>

            <div className="border border-slate-200 bg-dark text-white rounded-3xl p-8 hover:shadow-lg transition-all">
              <h3 className="text-xl font-bold text-white mb-2">Elite</h3>
              <p className="text-sm text-slate-400 mb-6">3+ qualified referrals / month</p>
              <ul className="space-y-3 text-sm text-slate-300 mb-8">
                <li className="flex gap-2"><i className="ph-bold ph-check text-primary"></i> Max rewards</li>
                <li className="flex gap-2"><i className="ph-bold ph-check text-primary"></i> Priority response times</li>
                <li className="flex gap-2"><i className="ph-bold ph-check text-primary"></i> Early access to new offers</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-24 bg-slate-50" id="apply">
        <div className="max-w-3xl mx-auto px-6">
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-100">
            <h2 className="text-3xl font-bold text-dark mb-6 text-center">Apply to Partner</h2>
            <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); alert('Application received. We\'ll reply within 48 hours.'); }}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Name</label>
                  <input type="text" className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" placeholder="Your name" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
                  <input type="email" className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" placeholder="name@company.com" required />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Partner Channel</label>
                  <select className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all bg-white">
                    <option>Advisor (Legal/Finance)</option>
                    <option>Audience (Creator/Media)</option>
                    <option>Community</option>
                    <option>Agency (Service)</option>
                    <option>Tech / Platform</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Est. Referrals / Month</label>
                  <select className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all bg-white">
                    <option>0-1</option>
                    <option>2-5</option>
                    <option>6-10</option>
                    <option>10+</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Link (Website/Social)</label>
                  <input type="url" className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" placeholder="https://" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Market</label>
                  <select className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all bg-white">
                    <option>Cyprus</option>
                    <option>Europe</option>
                    <option>Global</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">How do you want to collaborate?</label>
                <textarea className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all h-32" placeholder="Tell us a bit about your typical clients..."></textarea>
              </div>

              <button type="submit" className="w-full py-4 bg-primary text-white rounded-lg font-bold hover:bg-blue-600 transition-colors shadow-lg shadow-primary/25">
                Apply Now
              </button>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
