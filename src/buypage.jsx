/* Story Blocks Journal - home / sponsorship page app.
   The site's one job: a business (or individual) sponsors a batch of journals
   for a UK primary school they nominate. Flow: choose a tier -> nominate a
   school -> add sponsor details -> Stripe Checkout. No basket, no accounts. */
import './lib/react-global.js';
import './lib/image-slot.js';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { asset, CHAR_BASE, washGrad } from './lib/core.js';
import { SPONSOR_TIERS, TIER_BY_KEY, perBook, gbp, RECOGNITION_PACK, NOMINATION_PROMISE } from './lib/sponsor.js';
import { SchoolSearch, INPUT_STYLE } from './lib/school-search.jsx';
import {
  SiteHeader, TrustStrip, KidsWritingStrip, WhatsInside, SponsorSteps, ProblemSection, Reviews,
  WhyBlocks, SiteFooter, Icon, SectionHead, Reveal, RegisterBand,
} from './sections.jsx';

const { Button: SBButton } = window.StoryBlocksJournalDesignSystem_239fa7;

/* ---------------- Tier card ---------------- */
function TierCard({ tier, selected, onChoose }) {
  return (
    <div style={{
      position: 'relative', background: 'var(--sb-paper)', border: selected ? '4px solid var(--sb-blue)' : '4px solid var(--sb-ink)',
      borderRadius: 22, boxShadow: 'var(--shadow-pop-lg)', padding: '22px 20px 20px', display: 'flex', flexDirection: 'column',
      transform: `rotate(${tier.tilt * 0.4}deg)`,
    }}>
      {tier.popular && (
        <span className="sb-marker" style={{ position: 'absolute', top: -16, right: 16, background: 'var(--sb-blue)', color: '#fff', fontSize: '1.05rem', padding: '4px 14px', borderRadius: 999, border: '2.5px solid var(--sb-ink)', boxShadow: '2px 2px 0 0 var(--sb-ink)', transform: 'rotate(3deg)' }}>Most chosen</span>
      )}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ flexShrink: 0, width: 46, height: 46, borderRadius: 12, background: `var(--sb-${tier.tint})`, border: '3px solid var(--sb-ink)', boxShadow: '2px 2px 0 0 var(--sb-ink)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '1.1rem' }}>{tier.books}</span>
        <div>
          <div className="sb-display" style={{ fontSize: '1.4rem', lineHeight: 1 }}>{tier.name}</div>
          <div style={{ fontWeight: 700, color: 'var(--sb-muted)', fontSize: '.92rem' }}>{tier.books} journals</div>
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginTop: 16 }}>
        <span className="sb-display" style={{ fontSize: '2.2rem', lineHeight: 1 }}>{gbp(tier.price)}</span>
        <span style={{ fontWeight: 700, color: 'var(--sb-muted)', fontSize: '.9rem' }}>{gbp(perBook(tier))}/book</span>
      </div>
      <p style={{ marginTop: 10, lineHeight: 1.4, fontWeight: 600, flex: 1 }}>{tier.blurb}</p>
      {tier.gold && (
        <div style={{ display: 'flex', gap: 9, alignItems: 'flex-start', marginTop: 12, padding: '10px 12px', background: 'var(--sb-wash-lemon)', border: '2.5px solid var(--sb-ink)', borderRadius: 12 }}>
          <Icon name="award" size={18} sw={2.6} />
          <span style={{ fontWeight: 700, fontSize: '.9rem', lineHeight: 1.35 }}>Includes a <strong>Gold Edition award copy</strong> for the school to present to a child.</span>
        </div>
      )}
      <div style={{ marginTop: 16 }}>
        <SBButton variant={selected ? 'green' : 'primary'} size="lg" block iconRight={selected ? null : '→'} onClick={() => onChoose(tier.key)}>
          {selected ? 'Selected ✓' : `Sponsor ${tier.books}`}
        </SBButton>
      </div>
    </div>
  );
}

/* ---------------- Sponsorship flow (tier -> nominate -> details -> Stripe) ---------------- */
function SponsorFlow() {
  const [step, setStep] = React.useState('tier');  // tier | nominate | details
  const [tierKey, setTierKey] = React.useState(null);
  const [school, setSchool] = React.useState(null);
  const [allocate, setAllocate] = React.useState(false);
  const [sponsorName, setSponsorName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [submitting, setSubmitting] = React.useState(false);
  const [error, setError] = React.useState(null);
  const panelRef = React.useRef(null);

  const tier = tierKey ? TIER_BY_KEY[tierKey] : null;
  const toStep = (s) => { setStep(s); setError(null); setTimeout(() => { if (panelRef.current) panelRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' }); }, 40); };

  const chooseTier = (k) => { setTierKey(k); toStep('nominate'); };
  const chooseAllocate = () => { setAllocate(true); setSchool(null); toStep('details'); };
  const pickSchool = (s) => { setSchool(s); setAllocate(false); };

  const canContinueNominate = allocate || !!school;
  const emailValid = /^\S+@\S+\.\S+$/.test(email.trim());
  const canPay = !!tier && (allocate || !!school) && sponsorName.trim().length > 1 && emailValid;

  const pay = async () => {
    if (!canPay || submitting) return;
    setSubmitting(true); setError(null);
    try {
      if (window.gtag) window.gtag('event', 'begin_checkout', { tier: tierKey, value: tier.price, currency: 'GBP' });
      const res = await fetch('/api/checkout', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tier: tierKey,
          sponsorName: sponsorName.trim(),
          email: email.trim(),
          allocate,
          schoolName: school ? school.n : '',
          schoolUrn: school ? school.u : (allocate ? 'ALLOCATE' : ''),
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.url) { window.location.href = data.url; return; }
      setError(data.error || 'Payment isn’t available just now. Please try again, or email hello@blockspublishing.com.');
    } catch (err) {
      setError('Something went wrong starting checkout. Please try again, or email hello@blockspublishing.com.');
    } finally {
      setSubmitting(false);
    }
  };

  const schoolLabel = allocate ? 'a school we’ll choose for you' : (school ? school.n : 'your school');

  return (
    <div ref={panelRef} style={{ scrollMarginTop: 90 }}>
      {/* Step rail */}
      <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginBottom: 22, flexWrap: 'wrap' }}>
        {[['tier', '1 · Choose a tier'], ['nominate', '2 · Nominate a school'], ['details', '3 · Your details']].map(([k, label]) => (
          <span key={k} style={{ fontWeight: 800, fontSize: '.86rem', padding: '6px 13px', borderRadius: 999, border: '2.5px solid var(--sb-ink)', background: step === k ? 'var(--sb-yellow)' : 'var(--sb-paper)', color: 'var(--sb-ink)', opacity: step === k ? 1 : 0.6 }}>{label}</span>
        ))}
      </div>

      {step === 'tier' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20, alignItems: 'stretch' }}>
          {SPONSOR_TIERS.map((t) => (
            <TierCard key={t.key} tier={t} selected={tierKey === t.key} onChoose={chooseTier} />
          ))}
        </div>
      )}

      {step === 'nominate' && tier && (
        <div style={{ maxWidth: 620, margin: '0 auto', background: 'var(--sb-paper)', border: '4px solid var(--sb-ink)', borderRadius: 24, boxShadow: 'var(--shadow-pop-lg)', padding: 'clamp(22px, 4vw, 32px)' }}>
          <button type="button" onClick={() => toStep('tier')} style={{ background: 'none', border: 0, padding: 0, font: 'inherit', fontWeight: 800, color: 'var(--sb-blue)', cursor: 'pointer', marginBottom: 14 }}>← Change tier</button>
          <div className="sb-marker" style={{ fontSize: '1.3rem', color: 'var(--sb-blue)' }}>{tier.name} · {gbp(tier.price)}</div>
          <h2 className="sb-display" style={{ fontSize: 'clamp(1.6rem, 4vw, 2.2rem)', lineHeight: 1.05, margin: '2px 0 6px' }}>Nominate a primary school</h2>
          <p style={{ fontWeight: 600, lineHeight: 1.5, marginBottom: 18 }}>Search the UK primary-school register, or ask us to choose one that’s waiting for books.</p>

          <SchoolSearch value={school} onPick={pickSchool} />

          <div style={{ display: 'flex', alignItems: 'center', gap: 14, margin: '18px 0', color: 'var(--sb-muted)', fontWeight: 800 }}>
            <span style={{ flex: 1, height: 2, background: 'rgba(35,31,32,.12)' }} /> or <span style={{ flex: 1, height: 2, background: 'rgba(35,31,32,.12)' }} />
          </div>

          <button type="button" onClick={chooseAllocate}
            style={{ width: '100%', textAlign: 'left', display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', background: allocate ? 'var(--sb-wash-sky)' : 'var(--sb-paper)', border: '3px solid var(--sb-ink)', borderRadius: 14, boxShadow: '2px 2px 0 0 var(--sb-ink)', cursor: 'pointer', font: 'inherit' }}>
            <Icon name="heart" size={20} sw={2.6} />
            <span><strong style={{ fontWeight: 800, display: 'block' }}>Choose a school for me</strong><span style={{ fontSize: '.9rem', color: 'var(--sb-muted)', fontWeight: 700 }}>We’ll allocate from schools already on our list.</span></span>
          </button>

          <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start', marginTop: 18, padding: '13px 15px', background: 'var(--sb-wash-lemon)', border: '2.5px solid var(--sb-ink)', borderRadius: 12 }}>
            <Icon name="shield" size={18} sw={2.6} />
            <p style={{ fontWeight: 700, fontSize: '.92rem', lineHeight: 1.45, margin: 0 }}>{NOMINATION_PROMISE}</p>
          </div>

          <div style={{ marginTop: 20 }}>
            <SBButton variant="primary" size="lg" block iconRight="→" disabled={!canContinueNominate} onClick={() => toStep('details')}>Continue</SBButton>
          </div>
        </div>
      )}

      {step === 'details' && tier && (
        <div style={{ maxWidth: 620, margin: '0 auto', background: 'var(--sb-paper)', border: '4px solid var(--sb-ink)', borderRadius: 24, boxShadow: 'var(--shadow-pop-lg)', padding: 'clamp(22px, 4vw, 32px)' }}>
          <button type="button" onClick={() => toStep('nominate')} style={{ background: 'none', border: 0, padding: 0, font: 'inherit', fontWeight: 800, color: 'var(--sb-blue)', cursor: 'pointer', marginBottom: 14 }}>← Back to school</button>
          <div className="sb-marker" style={{ fontSize: '1.3rem', color: 'var(--sb-blue)' }}>{tier.name} · {gbp(tier.price)} · {tier.books} journals</div>
          <h2 className="sb-display" style={{ fontSize: 'clamp(1.6rem, 4vw, 2.2rem)', lineHeight: 1.05, margin: '2px 0 6px' }}>Your recognition details</h2>
          <p style={{ fontWeight: 600, lineHeight: 1.5, marginBottom: 18 }}>This is the name we’ll print on the bookplate in every copy, and on your certificate.</p>

          <label style={{ display: 'block', fontWeight: 800, marginBottom: 7 }}>Sponsor name (as it should appear)</label>
          <input type="text" value={sponsorName} onChange={(e) => setSponsorName(e.target.value)} placeholder="e.g. Harper & Co Accountants" style={INPUT_STYLE} />

          <div style={{ margin: '14px 0 20px', padding: '14px 16px', background: 'var(--sb-wash-green)', border: '2.5px solid var(--sb-ink)', borderRadius: 12 }}>
            <div style={{ fontWeight: 800, fontSize: '.82rem', textTransform: 'uppercase', letterSpacing: '.04em', color: 'var(--sb-muted)', marginBottom: 4 }}>Bookplate preview</div>
            <div style={{ fontWeight: 700, lineHeight: 1.4 }}>Donated to <strong>{allocate ? '[your nominated school]' : (school ? school.n : '[school]')}</strong> by <strong>{sponsorName.trim() || '[sponsor]'}</strong></div>
          </div>

          <label style={{ display: 'block', fontWeight: 800, marginBottom: 7 }}>Contact email (for updates + receipt)</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@business.co.uk" style={INPUT_STYLE} />

          <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start', marginTop: 18, padding: '13px 15px', background: 'var(--sb-wash-lemon)', border: '2.5px solid var(--sb-ink)', borderRadius: 12 }}>
            <Icon name="shield" size={18} sw={2.6} />
            <p style={{ fontWeight: 700, fontSize: '.92rem', lineHeight: 1.45, margin: 0 }}>{NOMINATION_PROMISE}</p>
          </div>

          {error && <p style={{ marginTop: 16, color: 'var(--sb-pink-deep, #c2185b)', fontWeight: 700, lineHeight: 1.45 }}>{error}</p>}

          <div style={{ marginTop: 20 }}>
            <SBButton variant="primary" size="lg" block iconRight={submitting ? null : '→'} disabled={!canPay || submitting} onClick={pay}>
              {submitting ? 'Starting secure checkout…' : `Continue to payment · ${gbp(tier.price)}`}
            </SBButton>
            <p style={{ textAlign: 'center', marginTop: 12, color: 'var(--sb-muted)', fontWeight: 700, fontSize: '.9rem' }}>
              Secure payment by Stripe · You’re sponsoring {tier.books} journals for {schoolLabel}.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------------- Hero - shows the journal, CTA scrolls to the sponsor flow ---------------- */
function JournalHero({ onSponsor }) {
  return (
    <section id="top" style={{ position: 'relative', overflow: 'hidden', background: washGrad('sky'), borderBottom: '3px solid var(--sb-ink)' }}>
      <style>{`
        @media (max-width: 820px) {
          .sb-jhero { grid-template-columns: 1fr !important; gap: 24px !important; text-align: center; }
          .sb-jhero__art { order: -1; }
          .sb-jhero__copy p { margin-left: auto; margin-right: auto; }
          .sb-jhero__copy .sb-marker { text-align: center; }
        }
      `}</style>
      <img className="sb-float sb-deco" src={asset(CHAR_BASE + '/SB33.png')} alt="" style={{ position: 'absolute', left: 8, bottom: 28, width: 86, ['--r']: '5deg', zIndex: 1, pointerEvents: 'none', animationDelay: '-2.2s' }} />
      <div className="sb-wrap sb-jhero" style={{ position: 'relative', zIndex: 2, padding: '44px 24px 56px', display: 'grid', gridTemplateColumns: 'minmax(0,1.05fr) minmax(0,.95fr)', gap: 48, alignItems: 'center' }}>
        <div className="sb-jhero__copy">
          <div className="sb-marker" style={{ fontSize: '1.4rem', color: 'var(--sb-blue)' }}>The daily creative-writing journal for kids</div>
          <h1 className="sb-display" style={{ fontSize: 'clamp(2.5rem, 5.4vw, 4rem)', lineHeight: 1.0, marginTop: 6 }}>Sponsor the journal kids love to write in.</h1>
          <p style={{ marginTop: 16, fontSize: '1.15rem', lineHeight: 1.55, maxWidth: 520 }}>
            Story Blocks gives a child a daily spark - three words and a friendly question - and 70+ story starters that make writing feel like play. You sponsor a batch for a UK primary school you nominate; <strong>under £8.50 puts one in a child’s hands.</strong>
          </p>
          <p className="sb-marker" style={{ marginTop: 12, fontSize: '1.2rem', color: 'var(--sb-ink)' }}>No app. No account. No data. Just good books.</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, marginTop: 24 }}>
            <SBButton variant="primary" size="lg" iconRight="→" onClick={onSponsor}>Sponsor a school</SBButton>
            <SBButton as="a" href="#inside" variant="white" size="lg">See what’s inside</SBButton>
          </div>
        </div>
        <div className="sb-jhero__art" style={{ display: 'flex', justifyContent: 'center' }}>
          <img src={asset('assets/storyblocks-cover-combo.png')} alt="The Story Blocks Journal with its sticker sheet"
            style={{ width: 'min(420px, 92%)', height: 'auto', filter: 'drop-shadow(8px 10px 0 rgba(35,31,32,.22))', transform: 'rotate(-2deg)' }} />
        </div>
      </div>
    </section>
  );
}

/* ---------------- Sponsor section - the tier + nomination flow ---------------- */
function SponsorSection() {
  return (
    <section id="sponsor" style={{ scrollMarginTop: 84, background: washGrad('green'), borderTop: '3px solid var(--sb-ink)', borderBottom: '3px solid var(--sb-ink)', padding: 'var(--sec-pad, 72px) 0' }}>
      <div className="sb-wrap">
        <SectionHead kicker="Sponsor a school" title="Choose your sponsorship"
          sub="Pick a tier, nominate a UK primary school (or ask us to choose one), and you’re done. Every tier includes the full recognition pack." />
        <div style={{ marginTop: 40 }}>
          <SponsorFlow />
        </div>
      </div>
    </section>
  );
}

/* ---------------- Recognition pack ---------------- */
function RecognitionPack() {
  return (
    <section style={{ padding: 'var(--sec-pad, 72px) 0', background: washGrad('peach'), borderBottom: '3px solid var(--sb-ink)' }}>
      <div className="sb-wrap">
        <SectionHead kicker="What every sponsor gets" title="Recognition, not just a receipt"
          sub="Every tier - Class, Year Group or Whole School - includes the full recognition pack. This is local goodwill people can see." />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 18, marginTop: 36 }}>
          {RECOGNITION_PACK.map((r, i) => (
            <Reveal key={r.b}>
              <div style={{ background: 'var(--sb-paper)', border: '3px solid var(--sb-ink)', borderRadius: 20, boxShadow: 'var(--shadow-pop)', padding: '22px 20px', height: '100%' }}>
                <span style={{ display: 'inline-flex', width: 48, height: 48, borderRadius: 13, background: `var(--sb-${r.tint})`, border: '3px solid var(--sb-ink)', boxShadow: '2px 2px 0 0 var(--sb-ink)', alignItems: 'center', justifyContent: 'center', transform: `rotate(${i % 2 ? 4 : -4}deg)` }}>
                  <Icon name={r.icon} size={22} sw={2.6} />
                </span>
                <div style={{ fontWeight: 800, fontSize: '1.1rem', marginTop: 14, lineHeight: 1.3 }}>{r.b}</div>
                <p style={{ marginTop: 6, fontWeight: 600, color: 'var(--sb-muted)', lineHeight: 1.45 }}>{r.t}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- App ---------------- */
function App() {
  const scrollToSponsor = () => { const el = document.getElementById('sponsor'); if (el) el.scrollIntoView({ behavior: 'smooth' }); };
  return (
    <React.Fragment>
      <SiteHeader active="sponsor" onCta={scrollToSponsor} />
      <JournalHero onSponsor={scrollToSponsor} />
      <TrustStrip />
      <SponsorSteps />
      <SponsorSection />
      <RecognitionPack />
      <KidsWritingStrip />
      <WhatsInside />
      <ProblemSection />
      <Reviews />
      <RegisterBand />
      <WhyBlocks />
      <SiteFooter />
    </React.Fragment>
  );
}

createRoot(document.getElementById('root')).render(<App />);
