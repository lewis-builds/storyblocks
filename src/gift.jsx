/* Story Blocks - Gift a journal (Phase 1).
   Individuals gift journals at £8.50 each; we deliver them to UK primary
   schools in classroom batches of 30 (open pool - no named school at
   purchase). One manual rolling tracker, no accounts, no backend.
   Visually its own thing (purple/pink, a big classroom meter) but built from
   the same brand tokens + components as the rest of the site. */
import './lib/react-global.js';
import './lib/image-slot.js';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { asset, CHAR_BASE, washGrad, cornerGrad, gbp } from './lib/core.js';
import { SiteHeader, SiteFooter, SectionHead, Reveal, Icon, WhatsInside, Reviews, WhyBlocks, AudienceToggle } from './sections.jsx';
import { SchoolSearch, INPUT_STYLE } from './lib/school-search.jsx';
import { sendForm, Honeypot, FormError } from './lib/form-submit.jsx';
import { GIFT_PRICE, CLASSROOM_SIZE, GIFT_PROGRESS, DELIVERED_CLASSROOMS } from './lib/gift-data.js';

const { Button: SBButton } = window.StoryBlocksJournalDesignSystem_239fa7;

/* ---------------- Classroom meter - the signature visual ---------------- */
/* Book glyph with the spine line drawn ON TOP of the fill, so a filled (gifted)
   journal still reads as a book. */
function BookGlyph({ filled, size = 26 }) {
  const stroke = filled ? 'var(--sb-ink)' : 'rgba(59,55,52,0.26)';
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={2}
      strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block' }} aria-hidden="true">
      <path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"
        fill={filled ? 'var(--sb-yellow)' : 'none'} />
      <path d="M12 7v14" />
    </svg>
  );
}

function ClassroomMeter() {
  // Live from real Stripe sales ( /api/gift-progress ); starts on the seed
  // values so the page always renders, then updates when the count loads.
  const [data, setData] = React.useState(() => ({
    current: GIFT_PROGRESS.current, target: GIFT_PROGRESS.target,
    gifters: GIFT_PROGRESS.gifters || [], delivered: 0,
  }));
  const [sel, setSel] = React.useState(null);
  const ref = React.useRef(null);

  React.useEffect(() => {
    let live = true;
    fetch('/api/gift-progress')
      .then((r) => r.json())
      .then((d) => {
        if (live && d && typeof d.current === 'number' && Array.isArray(d.gifters)) {
          setData({ current: d.current, target: d.target || GIFT_PROGRESS.target, gifters: d.gifters, delivered: d.delivered || 0 });
        }
      })
      .catch(() => {});
    return () => { live = false; };
  }, []);

  React.useEffect(() => {
    const onDoc = (e) => { if (ref.current && !ref.current.contains(e.target)) setSel(null); };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, []);

  const { current, target, gifters, delivered } = data;
  const nameFor = (i) => gifters[i] || null; // null = gifted without a name

  const books = [];
  for (let i = 0; i < target; i++) {
    const filled = i < current;
    const open = sel === i;
    // Accelerating sweep: slower at the start, quicker across (exponent < 1).
    const delay = Math.round(1200 * Math.pow(target > 1 ? i / (target - 1) : 0, 0.6));
    books.push(
      <button key={i} type="button" className="sb-book-in" onClick={() => setSel(open ? null : i)}
        aria-label={filled ? `#${i + 1}, ${nameFor(i) ? 'gifted by ' + nameFor(i) : 'gifted anonymously'}` : `#${i + 1}, not gifted yet`}
        style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 44, height: 44,
          padding: 0, border: 'none', background: open ? 'rgba(67,104,176,0.14)' : 'none',
          borderRadius: 12, lineHeight: 0, cursor: 'pointer', animationDelay: `${delay}ms` }}>
        <BookGlyph filled={filled} />
      </button>
    );
  }

  let caption;
  if (current >= target) {
    caption = 'This classroom is full - we’re matching it to a school now.';
  } else if (sel !== null && sel < current) {
    caption = nameFor(sel) ? `#${sel + 1} - gifted by ${nameFor(sel)}.` : `#${sel + 1} - gifted anonymously.`;
  } else if (sel !== null) {
    caption = `#${sel + 1} isn’t gifted yet - it could be you.`;
  } else {
    caption = `${target - current} to go. Click a book to see who gifted it.`
      + (delivered > 0 ? ` ${delivered} classroom${delivered === 1 ? '' : 's'} delivered so far.` : '');
  }

  return (
    <div>
      <div>
        <div className="sb-display" style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', lineHeight: 1.05 }}>{current} of {target} journals gifted so far</div>
      </div>
      <div ref={ref} role="group" aria-label={`${current} of ${target} journals gifted toward the next classroom`}
        style={{ display: 'flex', flexWrap: 'wrap', gap: 2, marginTop: 14 }}>
        {books}
      </div>
      <p aria-live="polite" style={{ marginTop: 12, fontWeight: 700, color: 'var(--sb-muted)', fontSize: '.92rem' }}>
        {caption}
      </p>
    </div>
  );
}

/* ---------------- Quantity picker -> Stripe ---------------- */
const PRESETS = [1, 5, 10];

function GiftPicker() {
  const [qty, setQty] = React.useState(1);
  const [customOn, setCustomOn] = React.useState(false);
  const [custom, setCustom] = React.useState('');
  const [busy, setBusy] = React.useState(false);
  const [error, setError] = React.useState('');

  const chosen = customOn ? Math.max(0, Math.floor(Number(custom)) || 0) : qty;
  const total = chosen * GIFT_PRICE;
  const canPay = chosen >= 1 && chosen <= 300;

  const pick = (n) => { setCustomOn(false); setQty(n); setError(''); };
  const pickCustom = () => { setCustomOn(true); setError(''); };

  const pay = async () => {
    if (!canPay || busy) return;
    setBusy(true); setError('');
    try {
      if (window.gtag) window.gtag('event', 'begin_checkout', { items: chosen, value: total, currency: 'GBP', kind: 'gift' });
      const res = await fetch('/api/gift-checkout', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quantity: chosen }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.url) { window.location.href = data.url; return; }
      setError(data.error || 'Payment isn’t available just now. Please try again, or email hello@blockspublishing.com.');
    } catch (err) {
      setError('Something went wrong starting checkout. Please try again, or email hello@blockspublishing.com.');
    } finally {
      setBusy(false);
    }
  };

  const tile = (n, label, active, onClick) => (
    <button key={String(n)} type="button" onClick={onClick} aria-pressed={active}
      style={{
        flex: '1 1 0', minWidth: 72, padding: '14px 10px', cursor: 'pointer', fontFamily: 'inherit',
        background: active ? 'var(--sb-purple)' : 'var(--sb-paper)', color: 'var(--sb-ink)',
        border: 'none', borderRadius: 16,
        boxShadow: active ? 'none' : 'none',
        transform: active ? 'translate(-1px,-1px)' : 'none', transition: 'transform .12s, box-shadow .12s',
      }}>
      <div className="sb-display" style={{ fontSize: '1.5rem', lineHeight: 1 }}>{n}</div>
      <div style={{ fontWeight: 700, fontSize: '.82rem', marginTop: 4 }}>{label}</div>
    </button>
  );

  return (
    <div>
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
        {PRESETS.map((n) => tile(n, n === 1 ? 'journal' : 'journals', !customOn && qty === n, () => pick(n)))}
        {tile('✎', 'choose', customOn, pickCustom)}
      </div>
      {customOn && (
        <input type="number" min="1" max="300" value={custom} autoFocus
          onChange={(e) => setCustom(e.target.value)} placeholder="How many journals?"
          style={{ ...INPUT_STYLE, marginTop: 12 }} />
      )}
      <div style={{ marginTop: 16 }}>
        <SBButton variant="primary" size="lg" block iconRight={busy ? null : '→'} disabled={!canPay || busy} onClick={pay}>
          {busy ? 'Starting secure checkout…' : (canPay ? `Gift ${chosen} ${chosen === 1 ? 'journal' : 'journals'} · ${gbp(total)}` : 'Choose an amount')}
        </SBButton>
        {error && <p style={{ marginTop: 12, color: '#c2185b', fontWeight: 700, lineHeight: 1.45 }}>{error}</p>}
        <p style={{ textAlign: 'center', marginTop: 12, color: 'var(--sb-muted)', fontWeight: 700, fontSize: '.88rem' }}>
          {gbp(GIFT_PRICE)} per journal
        </p>
      </div>
    </div>
  );
}

/* ---------------- Hero + give card ---------------- */
function GiftHero() {
  return (
    <section style={{ position: 'relative', overflow: 'hidden', background: washGrad('purple'), borderBottom: 'none' }}>
      <div className="sb-wrap" style={{ position: 'relative', zIndex: 2, padding: '48px 24px 56px' }}>
        {/* Toggle pinned top-left in the full-width wrap, so it sits in the
           exact same place as the business page; the hero content below stays
           centred in its own narrower column. */}
        <AudienceToggle active="individuals" />
        <div style={{ maxWidth: 780, margin: '0 auto', textAlign: 'center' }}>
          <h1 className="sb-display" style={{ fontSize: 'clamp(2.4rem, 5.6vw, 4rem)', lineHeight: 1.0, marginTop: 6 }}>
            Gift a journal to a child at school.
          </h1>
          <p style={{ marginTop: 18, fontSize: '1.12rem', lineHeight: 1.55, maxWidth: 520, marginLeft: 'auto', marginRight: 'auto' }}>
            Just <strong>1 in 4 children*</strong> now write for the joy of it. For <strong>{gbp(GIFT_PRICE)}</strong> you can put a journal of their own in a child’s hands.
          </p>

          {/* the give card */}
          <div style={{ marginTop: 32, textAlign: 'left', background: 'var(--sb-paper)', border: 'none', borderRadius: 28, boxShadow: 'var(--shadow-pop-lg)', padding: 'clamp(22px, 4vw, 32px)' }}>
            <ClassroomMeter />
            <hr style={{ border: 0, borderTop: '2.5px dashed rgba(35,31,32,.2)', margin: '22px 0' }} />
            <div className="sb-display" style={{ fontSize: '1.3rem', marginBottom: 12 }}>How many will you gift?</div>
            <GiftPicker />
          </div>

          <p style={{ marginTop: 18, fontWeight: 700, fontSize: '.95rem' }}>
            Want to gift a whole classroom at once? <a href="/#sponsor" style={{ color: 'var(--sb-blue)', fontWeight: 800 }}>Sponsor as a business →</a>
          </p>
        </div>
      </div>
    </section>
  );
}

/* ---------------- How it works ---------------- */
function HowItWorks() {
  const steps = [
    { n: '01', char: 'SB16', tint: 'var(--sb-wash-pink)', title: 'Gift journals', body: `Give one, five, ten or as many as you like at ${gbp(GIFT_PRICE)} each. They join the classroom that’s currently filling.` },
    { n: '02', char: 'SB33', tint: 'var(--sb-wash-lemon)', title: 'A classroom fills', body: 'At 30 journals we match the classroom to a UK state primary school and confirm they’d like them - we never deliver unannounced.' },
    { n: '03', char: 'SB44', tint: 'var(--sb-wash-sky)', title: 'The books arrive', body: 'The journals are delivered to the school. Everyone who gifted gets the delivery email, with a photo where the school is happy to share one.' },
  ];
  return (
    <section id="how" style={{ padding: 'var(--sec-pad, 72px) 0' }}>
      <div className="sb-wrap">
        <SectionHead kicker="How it works" title="From your gift to their classroom"
          sub="No named school to pick, no account to make. You gift; we get the books where they’re needed." />
        <div className="sb-steps" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0,1fr))', gap: 24, marginTop: 44 }}>
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 110}>
              <div style={{ background: s.tint, border: 'none', borderRadius: 22, boxShadow: 'var(--shadow-pop)', padding: '26px 24px', height: '100%', position: 'relative' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span className="sb-display" style={{ fontSize: '2rem', opacity: .35 }}>{s.n}</span>
                  <img src={asset(CHAR_BASE + '/' + s.char + '.png')} alt="" style={{ width: 72 }} />
                </div>
                <h3 className="sb-display" style={{ fontSize: '1.35rem', marginTop: 10 }}>{s.title}</h3>
                <p style={{ marginTop: 10, lineHeight: 1.55 }}>{s.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- The promises (required copy) ---------------- */
function Promises() {
  const items = [
    { icon: 'heart', tint: 'pink', b: 'Where every penny goes', t: `Your ${gbp(GIFT_PRICE)} covers the journal, delivery to the school, and keeps us making them.` },
    { icon: 'shield', tint: 'green', b: 'Every journal reaches a school - guaranteed', t: 'If a classroom hasn’t completed within 3 months, we complete it ourselves.' },
    { icon: 'book', tint: 'sky', b: 'We always confirm first', t: 'We match completed classrooms to schools and always confirm with the school before delivery.' },
    { icon: 'sparkles', tint: 'purple', b: 'You hear where it lands', t: 'When your classroom completes, we email you the school it was matched to - so you know exactly where your journals went.' },
  ];
  return (
    <section style={{ padding: 'var(--sec-pad, 72px) 0', background: cornerGrad('--sb-green'), borderTop: 'none', borderBottom: 'none' }}>
      <div className="sb-wrap" style={{ maxWidth: 760 }}>
        <div style={{ display: 'grid', gap: 14 }}>
          {items.map((it, i) => (
            <div key={it.b} style={{ display: 'flex', gap: 16, alignItems: 'flex-start', background: 'var(--sb-paper)', border: 'none', borderRadius: 18, boxShadow: 'var(--shadow-pop)', padding: '18px 20px' }}>
              <span style={{ flexShrink: 0, width: 46, height: 46, borderRadius: 13, background: `var(--sb-${it.tint})`, border: 'none', boxShadow: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `rotate(${i % 2 ? 4 : -4}deg)` }}>
                <Icon name={it.icon} size={22} sw={2.6} />
              </span>
              <div>
                <div style={{ fontWeight: 800, fontSize: '1.12rem', lineHeight: 1.3 }}>{it.b}</div>
                <p style={{ marginTop: 5, lineHeight: 1.5, fontWeight: 600 }}>{it.t}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Delivered wall ---------------- */
function DeliveredWall() {
  return (
    <section style={{ padding: 'var(--sec-pad, 72px) 0' }}>
      <div className="sb-wrap">
        {DELIVERED_CLASSROOMS.length === 0 ? (
          <SectionHead kicker="Where they land" title="Where your journals will land"
            sub="Each completed classroom is matched to a UK primary school — and we always confirm with the school before any journals are sent." />
        ) : (
          <SectionHead kicker="Delivered classrooms" title="Where the journals have landed"
            sub="Every completed classroom, delivered to a confirmed UK primary school." />
        )}
        {DELIVERED_CLASSROOMS.length === 0 ? (
          <div style={{ marginTop: 32 }}>
            <div style={{ borderRadius: 24, overflow: 'hidden' }}>
              <img src={asset('assets/kids-strip.png')} alt="Children writing in their Story Blocks journals" style={{ width: '100%', height: 'auto', display: 'block' }} />
            </div>
            <p className="sb-display" style={{ fontSize: '1.4rem', marginTop: 22, textAlign: 'center' }}>The first classroom is filling now.</p>
            <p style={{ marginTop: 8, fontWeight: 600, color: 'var(--sb-muted)', textAlign: 'center' }}>Be one of the people who starts it off — this is the joy your gift brings.</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20, marginTop: 36 }}>
            {DELIVERED_CLASSROOMS.map((c, i) => (
              <Reveal key={c.school + i}>
                <div style={{ background: 'var(--sb-paper)', border: 'none', borderRadius: 20, boxShadow: 'var(--shadow-pop)', overflow: 'hidden', height: '100%' }}>
                  <div style={{ aspectRatio: '4 / 3', background: 'var(--sb-wash-sky)', borderBottom: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {c.photo ? <img src={asset(c.photo)} alt={`Journals delivered to ${c.school}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      : <Icon name="book" size={40} sw={2.2} />}
                  </div>
                  <div style={{ padding: '16px 18px' }}>
                    <div style={{ fontWeight: 800, fontSize: '1.05rem', lineHeight: 1.3 }}>{c.school}</div>
                    <div style={{ fontWeight: 700, color: 'var(--sb-muted)', fontSize: '.9rem', marginTop: 4 }}>{[c.town, c.month].filter(Boolean).join(' · ')}</div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

/* ---------------- Nominate a school (public door into the one pipeline) ---------------- */
const RELATIONSHIPS = ['Parent or carer', 'School staff', 'PTA', 'Other'];

function NominateForm() {
  const [sent, setSent] = React.useState(false);
  const [school, setSchool] = React.useState(null);
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [relationship, setRelationship] = React.useState(RELATIONSHIPS[0]);
  const [consent, setConsent] = React.useState(false);
  const [company, setCompany] = React.useState('');   // honeypot
  const [errors, setErrors] = React.useState({});
  const [busy, setBusy] = React.useState(false);
  const [sendError, setSendError] = React.useState('');

  const submit = async () => {
    const e = {};
    if (!school) e.school = 'Please find and select the school';
    if (!name.trim()) e.name = 'Please add your name';
    if (!/^\S+@\S+\.\S+$/.test(email)) e.email = 'Please add a valid email';
    if (!consent) e.consent = 'Please tick the box so we can email you when the school is confirmed';
    setErrors(e);
    if (Object.keys(e).length) return;

    setBusy(true); setSendError('');
    const result = await sendForm('nominate', {
      school: school.n, town: [school.t, school.p].filter(Boolean).join(', '), urn: school.u,
      name, email, relationship, consent: 'yes', company,
    });
    setBusy(false);
    if (result.ok) setSent(true);
    else setSendError(result.error);
  };

  return (
    <section id="nominate" style={{ background: washGrad('pink'), borderTop: 'none', padding: 'var(--sec-pad, 72px) 0 84px' }}>
      <div className="sb-wrap sb-nominate" style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1.1fr)', gap: 56, alignItems: 'center' }}>
        <div>
          <SectionHead align="left" kicker="Nominate a school" title="Know a school that should get the next classroom?" sub="" />
          <p style={{ marginTop: 16, fontSize: '1.1rem', lineHeight: 1.6, maxWidth: 460 }}>
            Anyone can nominate a UK state primary — a parent, teacher or PTA. We just reach out and ask; only schools that say yes are matched, and <strong>confirmed schools jump the queue</strong> for the next completed classroom.
          </p>
        </div>

        <div style={{ background: 'var(--sb-paper)', border: 'none', borderRadius: 26, boxShadow: 'var(--shadow-pop-lg)', padding: 28 }}>
          {sent ? (
            <div style={{ textAlign: 'center', padding: '26px 10px' }}>
              <img src={asset(CHAR_BASE + '/SB44.png')} alt="" style={{ width: 130 }} />
              <h3 className="sb-display" style={{ fontSize: '1.7rem', marginTop: 14 }}>Nomination received!</h3>
              <p style={{ marginTop: 10, lineHeight: 1.55 }}>
                Thank you - we’ll reach out to <strong>{school && school.n}</strong>. If they say yes, we’ll email you.
              </p>
              <div style={{ marginTop: 20 }}>
                <SBButton variant="cream" size="sm" onClick={() => { setSent(false); setSchool(null); setName(''); setEmail(''); setConsent(false); }}>Nominate another school</SBButton>
              </div>
            </div>
          ) : (
            <div style={{ display: 'grid', gap: 16 }}>
              <div>
                <label style={{ display: 'block', fontWeight: 800, marginBottom: 7 }}>The school</label>
                <SchoolSearch value={school} onPick={setSchool} placeholder="Search a school name, town or postcode…" />
                {errors.school && <p style={{ color: '#c2185b', fontWeight: 700, fontSize: '.9rem', marginTop: 6 }}>{errors.school}</p>}
              </div>
              <div>
                <label style={{ display: 'block', fontWeight: 800, marginBottom: 7 }}>Your name</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Sam Okafor" style={INPUT_STYLE} />
                {errors.name && <p style={{ color: '#c2185b', fontWeight: 700, fontSize: '.9rem', marginTop: 6 }}>{errors.name}</p>}
              </div>
              <div>
                <label style={{ display: 'block', fontWeight: 800, marginBottom: 7 }}>Your email</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@email.com" style={INPUT_STYLE} />
                {errors.email && <p style={{ color: '#c2185b', fontWeight: 700, fontSize: '.9rem', marginTop: 6 }}>{errors.email}</p>}
              </div>
              <div>
                <label style={{ display: 'block', fontWeight: 800, marginBottom: 7 }}>Your relationship to the school</label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {RELATIONSHIPS.map((r) => (
                    <button key={r} type="button" onClick={() => setRelationship(r)} aria-pressed={relationship === r}
                      style={{ padding: '9px 14px', cursor: 'pointer', fontFamily: 'inherit', fontWeight: 700, fontSize: '.9rem',
                        background: relationship === r ? 'var(--sb-sky)' : 'var(--sb-paper)', color: 'var(--sb-ink)',
                        border: 'none', borderRadius: 999, boxShadow: relationship === r ? 'none' : 'none' }}>{r}</button>
                  ))}
                </div>
              </div>
              <label style={{ display: 'flex', gap: 11, alignItems: 'flex-start', cursor: 'pointer', fontWeight: 600, lineHeight: 1.4 }}>
                <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)}
                  style={{ width: 22, height: 22, flexShrink: 0, marginTop: 1, accentColor: 'var(--sb-blue)' }} />
                <span>Email me when this school is confirmed, so I can help bring the next completed classroom to them.</span>
              </label>
              {errors.consent && <p style={{ color: '#c2185b', fontWeight: 700, fontSize: '.9rem', marginTop: -6 }}>{errors.consent}</p>}
              <Honeypot value={company} onChange={(e) => setCompany(e.target.value)} />
              <SBButton size="lg" block iconRight={busy ? null : '→'} onClick={submit} disabled={busy}>
                {busy ? 'Sending…' : 'Nominate this school'}
              </SBButton>
              <FormError>{sendError}</FormError>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/* ---------------- App ---------------- */
function GiftApp() {
  return (
    <React.Fragment>
      <SiteHeader active="gift" />
      <main>
        <GiftHero />
        <HowItWorks />
        <Promises />
        <DeliveredWall />
        <WhatsInside />
        <Reviews />
        <WhyBlocks />
        <NominateForm />
        <div className="sb-wrap" style={{ padding: '22px 24px' }}>
          <p style={{ color: 'var(--sb-muted)', fontWeight: 600, fontSize: '.84rem', lineHeight: 1.5, margin: 0, maxWidth: 680 }}>
            * Writing-for-pleasure figure: National Literacy Trust annual literacy survey - the share of children and young people who say they enjoy writing in their free time.
          </p>
        </div>
      </main>
      <SiteFooter />
    </React.Fragment>
  );
}

createRoot(document.getElementById('root')).render(<GiftApp />);
