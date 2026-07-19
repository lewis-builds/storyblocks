/* Story Blocks Journal - buy page app */
import './lib/react-global.js';
import './lib/image-slot.js';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { asset, CHAR_BASE, EDITIONS, SKUS, priceFor, gbp } from './lib/core.js';
import {
  SiteHeader, TrustStrip, WhatsInside, HowItWorks, ProblemSection, Reviews,
  ParentsCorner, WhyBlocks, SiteFooter, Icon,
} from './sections.jsx';
import { BasketDrawer } from './basket.jsx';

const { Button: SBButton, Card: SBCard, Badge: SBBadge, Tabs: SBTabs, Toast: SBToast } = window.StoryBlocksJournalDesignSystem_239fa7;

function BundlePicker({ unit, qty, setQty }) {
  const rows = [
    { n: 1, note: 'Just for them' },
    { n: 2, note: 'Great for siblings' },
  ];
  return (
    <div style={{ display: 'grid', gap: 10, marginTop: 18 }} role="radiogroup" aria-label="How many journals">
      {rows.map(({ n, note, tag }) => {
        const pr = priceFor(unit, n);
        const on = qty === n;
        return (
          <button key={n} type="button" role="radio" aria-checked={on} onClick={() => setQty(n)}
            style={{
              position: 'relative', display: 'flex', alignItems: 'center', gap: 14, textAlign: 'left', width: '100%',
              cursor: 'pointer', fontFamily: 'var(--font-body)', color: 'var(--sb-ink)',
              background: on ? 'var(--sb-wash-lemon)' : 'var(--sb-paper)',
              border: `${on ? 3 : 2}px solid var(--sb-ink)`, borderRadius: 16, padding: '13px 16px',
              boxShadow: on ? '4px 4px 0 0 var(--sb-ink)' : 'none',
              transition: 'box-shadow .15s, background .15s, border-width .05s',
            }}>
            <span style={{ flexShrink: 0, width: 24, height: 24, borderRadius: 999, border: '3px solid var(--sb-ink)', background: on ? 'var(--sb-yellow)' : '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {on && <span style={{ width: 9, height: 9, borderRadius: 999, background: 'var(--sb-ink)' }} />}
            </span>
            <span style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 2 }}>
              <span style={{ fontWeight: 800, fontSize: '1.08rem', display: 'flex', alignItems: 'center', gap: 8 }}>
                {n} {n === 1 ? 'journal' : 'journals'}
                {pr.rate > 0 && <span className="sb-marker" style={{ color: 'var(--sb-blue)', fontSize: '1rem', fontWeight: 400 }}>save {Math.round(pr.rate * 100)}%</span>}
              </span>
              <span style={{ fontSize: '.86rem', color: 'var(--sb-muted)', fontWeight: 700 }}>{note}</span>
            </span>
            <span style={{ textAlign: 'right', flexShrink: 0, lineHeight: 1.1 }}>
              <span className="sb-display" style={{ fontSize: '1.45rem', display: 'block' }}>{gbp(pr.total)}</span>
              {pr.rate > 0 && <span style={{ fontSize: '.82rem', color: 'var(--sb-faint)', textDecoration: 'line-through', fontWeight: 700 }}>{gbp(pr.full)}</span>}
            </span>
            {tag && <span className="sb-marker" style={{ position: 'absolute', top: -11, right: 16, background: 'var(--sb-ink)', color: '#fff', fontSize: '.85rem', padding: '3px 11px', borderRadius: 999, transform: 'rotate(-3deg)' }}>{tag}</span>}
          </button>
        );
      })}
    </div>
  );
}

/* ---------------- Look-inside book (hover / tap to open a spread) ---------------- */
/* Drop the user's real spread scan in here (e.g. 'assets/spread.jpg') to use it instead
   of the placeholder pages - it renders on the blue field automatically. */
const SPREAD_IMG = null;

function WordToken({ children, tint }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', background: `var(--sb-${tint})`, border: '2.5px solid var(--sb-ink)', borderRadius: 999, padding: '5px 14px', fontWeight: 800, fontSize: '1rem', boxShadow: '2px 2px 0 0 var(--sb-ink)', transform: 'rotate(-1.5deg)' }}>{children}</span>
  );
}

function PlaceholderSpread() {
  return (
    <div className="look__spread" role="img" aria-label="A sample daily spread from the journal">
      {/* LEFT PAGE */}
      <div className="look__page look__page--left">
        <div className="sb-marker" style={{ color: 'var(--sb-muted)', fontSize: '1.15rem' }}>Monday · Day 12</div>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 6 }}>
          <img src={asset(CHAR_BASE + '/SB50.png')} alt="" style={{ width: '52%', maxWidth: 150 }} />
        </div>
        <p className="sb-marker" style={{ fontSize: '1.35rem', lineHeight: 1.2, textAlign: 'center', margin: '6px 0 0' }}>Psst - here are today's three little words.</p>
        <div style={{ marginTop: 14, background: 'var(--sb-wash-sky)', border: '2.5px solid var(--sb-ink)', borderRadius: 12, padding: '10px 14px', fontSize: '.92rem', fontWeight: 700, lineHeight: 1.4, transform: 'rotate(-1deg)' }}>
          Tip: you don't have to use them in order!
        </div>
      </div>
      {/* RIGHT PAGE */}
      <div className="look__page look__page--right">
        <div className="sb-marker" style={{ color: 'var(--sb-blue)', fontSize: '1.2rem', lineHeight: 1.15 }}>Include these words in a story…</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 9, marginTop: 12 }}>
          <WordToken tint="pink">Whisper</WordToken>
          <WordToken tint="sky">Door</WordToken>
          <WordToken tint="peach">Secret</WordToken>
        </div>
        <h3 className="sb-display" style={{ fontSize: '1.4rem', lineHeight: 1.08, marginTop: 18 }}>What's behind the door?</h3>
        <div style={{ marginTop: 16, display: 'grid', gap: 28 }}>
          {[0, 1, 2, 3, 4].map((i) => <hr key={i} className="look__rule" />)}
        </div>
        <div style={{ position: 'absolute', bottom: 14, left: 0, right: 0, display: 'flex', justifyContent: 'space-between', padding: '0 20px', fontSize: '.78rem', fontWeight: 700, color: 'var(--sb-faint)' }}>
          <span className="sb-marker" style={{ fontSize: '1.05rem', color: 'var(--sb-muted)' }}>Story Blocks</span>
          <span>12</span>
        </div>
      </div>
      <div className="look__spine" aria-hidden="true"></div>
    </div>
  );
}

/* Wooden milestone coins scattered around the book - a Gold Edition extra, so
   they only appear on the Gold tab. Position + size live in the .sb-coin--n CSS
   classes (index.html) so mobile can be tuned separately; only the per-coin
   rotation and float offset are inline. Art in public/assets/coin-1..5.svg. */
const COINS = [
  { file: 'assets/coin-1.svg', r: -12, delay: '-0.4s' },
  { file: 'assets/coin-2.svg', r: 10, delay: '-1.6s' },
  { file: 'assets/coin-3.svg', r: 8, delay: '-2.4s' },
  { file: 'assets/coin-4.svg', r: -8, delay: '-1.1s' },
  { file: 'assets/coin-5.svg', r: 18, delay: '-3s' },
];

function GoldCoins() {
  return (
    <React.Fragment>
      {COINS.map((c, i) => (
        <span key={i} className={'sb-coin sb-coin--' + (i + 1) + ' sb-float'} aria-hidden="true"
          style={{ ['--r']: c.r + 'deg', animationDelay: c.delay }}>
          <img src={asset(c.file)} alt="" />
        </span>
      ))}
    </React.Fragment>
  );
}

function LookInsideBook({ cover, alt, gold }) {
  return (
    <a className={'look' + (gold ? ' look--gold' : '')} href="#inside" aria-label="Take a look inside the journal">
      <div className="look__float">
        <div className="look__cover">
          <img src={asset(cover)} alt={alt} />
          {gold && <span className="look__sheen" aria-hidden="true"></span>}
        </div>
        <div className="look__shadow" aria-hidden="true"></div>
        <span className="look__sticker" role="img" aria-label="Free sticker sheet and reward chart included">
          <img src={asset('assets/sticker-sheet.jpg')} alt="" />
        </span>
      </div>
      {gold && <GoldCoins />}
      <span className="look__hint">Take a look inside 👀</span>
    </a>
  );
}

/* ---------------- Hero / purchase block ---------------- */
function Hero({ edition, setEdition, qty, setQty, onAdd, added }) {
  const ed = EDITIONS[edition];
  const p = priceFor(ed.priceNum, qty);
  return (
    <section id="top" style={{ position: 'relative', overflow: 'hidden', background: 'var(--sb-wash-sky)', borderBottom: '3px solid var(--sb-ink)' }}>

      {/* scattered block friends */}
      <img className="sb-float sb-deco" src={asset(CHAR_BASE + '/SB33.png')} alt="" style={{ position: 'absolute', left: 8, bottom: 34, width: 98, ['--r']: '5deg', zIndex: 1, pointerEvents: 'none', animationDelay: '-2.2s' }} />
      <img className="sb-float sb-deco" src={asset(CHAR_BASE + '/SB47.png')} alt="" style={{ position: 'absolute', right: 20, bottom: 26, width: 88, ['--r']: '-6deg', zIndex: 1, pointerEvents: 'none', animationDelay: '-0.8s' }} />

      <div className="sb-wrap" style={{ position: 'relative', zIndex: 2, padding: '48px 24px 68px' }}>

        {/* centered header above the book + purchase */}
        <div className="sb-hero-head" style={{ textAlign: 'center', maxWidth: 860, margin: '0 auto 40px' }}>
          <div className="sb-marker" style={{ fontSize: '1.5rem', color: 'var(--sb-blue)' }}>The daily creative-writing journal for kids</div>
          <h1 className="sb-display" style={{ fontSize: 'clamp(2.6rem, 5.2vw, 4rem)', lineHeight: 1.02, marginTop: 6 }}>Build healthier habits.</h1>
          <p style={{ marginTop: 16, fontSize: '1.22rem', lineHeight: 1.5, maxWidth: 620, margin: '16px auto 0' }}>Swap ten minutes of scrolling for ten minutes of storytelling.<br className="sb-desk-br"/>One little spark a day and their imagination does the rest.</p>
        </div>

        <div className="sb-hero" style={{ display: 'grid', gridTemplateColumns: 'minmax(520px, 1fr) minmax(0, 1fr)', gap: 56, alignItems: 'center' }}>

          {/* LEFT - look-inside book */}
          <LookInsideBook cover={ed.cover} alt={'Story Blocks Journal - ' + ed.name} gold={edition === 'gold'} />

          {/* RIGHT - purchase */}
          <div className="sb-purchase">
            {/* purchase card */}
            <div id="purchase-card" style={{ background: 'var(--sb-paper)', border: '4px solid var(--sb-ink)', borderRadius: 26, boxShadow: 'var(--shadow-pop-lg)', padding: 22 }}>
              <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
                <SBTabs tabs={[{ value: 'standard', label: 'Standard' }, { value: 'gold', label: 'Gold Edition' }]} value={edition} onChange={setEdition} color="yellow" />
              </div>

            <p style={{ marginTop: 16, fontSize: '1.02rem', lineHeight: 1.45, fontWeight: 600, color: 'var(--sb-ink)' }}>{ed.tagline}</p>

            <ul style={{ listStyle: 'none', padding: 0, margin: '16px 0 0', display: 'grid', gap: 10 }}>
              {ed.includes.map((t) => (
                <li key={t} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', fontWeight: 600 }}>
                  <span style={{ flexShrink: 0, width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 1 }}><Icon name="check" size={19} sw={3.2} /></span>
                  {t}
                </li>
              ))}
            </ul>

            {/* bundle picker - quantity, saving and price in one tidy control */}
            <BundlePicker unit={ed.priceNum} qty={qty} setQty={setQty} />

            <div style={{ marginTop: 16 }}>
              <SBButton variant={added ? 'green' : 'primary'} size="lg" block iconRight={added ? null : '→'} onClick={onAdd}>
                {added ? 'Added to basket ✓' : `Add to basket · ${gbp(p.total)}`}
              </SBButton>
            </div>
            <div style={{ display: 'flex', gap: 18, flexWrap: 'wrap', marginTop: 14, color: 'var(--sb-muted)', fontWeight: 700, fontSize: '.9rem' }}>
              <span style={{ display: 'inline-flex', gap: 7, alignItems: 'center' }}><Icon name="truck" size={17} stroke="var(--sb-muted)" sw={2.4} />Free UK delivery</span>
              <span style={{ display: 'inline-flex', gap: 7, alignItems: 'center' }}><Icon name="sparkles" size={17} stroke="var(--sb-muted)" sw={2.4} />Improves writing skills</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    </section>
  );
}

/* ---------------- Mobile purchase sheet - always in reach, expands for options ---------------- */
function MobileBuySheet({ edition, setEdition, qty, setQty, onAdd, added }) {
  const [open, setOpen] = React.useState(false);
  const ed = EDITIONS[edition];
  const p = priceFor(ed.priceNum, qty);
  return (
    <div className={'sb-sheet' + (open ? ' is-open' : '')} role="region" aria-label="Buy the journal">
      {/* row 1: edition tabs + expand toggle */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <SBTabs tabs={[{ value: 'standard', label: 'Standard' }, { value: 'gold', label: 'Gold Edition' }]} value={edition} onChange={setEdition} color="yellow" />
        </div>
        <button type="button" onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-label={open ? 'Hide options' : 'Show bundles and details'}
          style={{ flexShrink: 0, width: 46, height: 46, borderRadius: 14, border: '3px solid var(--sb-ink)', background: open ? 'var(--sb-yellow)' : 'var(--sb-paper)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '2px 2px 0 0 var(--sb-ink)', padding: 0 }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--sb-ink)" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round"
            style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform .3s' }}>
            <path d="m18 15-6-6-6 6"></path>
          </svg>
        </button>
      </div>

      {/* expandable: bundles + includes */}
      <div className="sb-sheet__body">
        <BundlePicker unit={ed.priceNum} qty={qty} setQty={setQty} />
        <ul style={{ listStyle: 'none', padding: 0, margin: '14px 0 2px', display: 'grid', gap: 8 }}>
          {ed.includes.map((t) => (
            <li key={t} style={{ display: 'flex', gap: 9, alignItems: 'flex-start', fontWeight: 600, fontSize: '.92rem' }}>
              <span style={{ flexShrink: 0, width: 20, height: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 1 }}>
                <Icon name="check" size={16} sw={3.4} />
              </span>
              {t}
            </li>
          ))}
        </ul>
        <div style={{ fontWeight: 700, color: 'var(--sb-muted)', fontSize: '.85rem', margin: '10px 0 4px' }}>Free UK delivery · Improves writing skills</div>
      </div>

      {/* row 2: price + CTA */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginTop: 10 }}>
        <div style={{ minWidth: 0, lineHeight: 1.12 }}>
          <div className="sb-display" style={{ fontSize: '1.5rem' }}>{gbp(p.total)}</div>
          <div style={{ fontWeight: 700, color: 'var(--sb-muted)', fontSize: '.8rem', whiteSpace: 'nowrap' }}>
            {open ? qty + ' × ' + ed.name.replace(' Edition', '') + (p.saved > 0 ? ' · saving ' + gbp(p.saved) : '') : 'Free UK mainland postage'}
          </div>
        </div>
        <div style={{ marginLeft: 'auto', flexShrink: 0 }}>
          <SBButton variant={added ? 'green' : 'primary'} onClick={open ? onAdd : () => setOpen(true)}>
            {added ? 'Added ✓' : (open ? 'Add to basket' : 'Buy options')}
          </SBButton>
        </div>
      </div>
    </div>
  );
}

/* ---------------- App ---------------- */
function App() {
  const [edition, setEdition] = React.useState('standard');
  const [qty, setQty] = React.useState(1);
  const [basket, setBasket] = React.useState(() => {
    try {
      const b = JSON.parse(localStorage.getItem('sb_basket_v2')) || {};
      return { 'standard-1': 0, 'standard-2': 0, 'gold-1': 0, 'gold-2': 0, ...b };
    } catch (err) { return { 'standard-1': 0, 'standard-2': 0, 'gold-1': 0, 'gold-2': 0 }; }
  });
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [added, setAdded] = React.useState(false);
  const [toast, setToast] = React.useState(null);
  const timers = React.useRef([]);

  React.useEffect(() => {
    try { localStorage.setItem('sb_basket_v2', JSON.stringify(basket)); } catch (err) {}
  }, [basket]);

  // Arriving from another page's cart icon (/#basket) opens the drawer.
  React.useEffect(() => {
    if (window.location.hash === '#basket') setDrawerOpen(true);
  }, []);

  const count = Object.values(basket).reduce((n, q) => n + q, 0); // products, not books - a 2-pack counts as 1

  const showToast = React.useCallback((msg) => {
    setToast(msg);
    timers.current.forEach(clearTimeout);
    timers.current = [setTimeout(() => setToast(null), 3800)];
  }, []);

  const addToBasket = React.useCallback(() => {
    const ed = EDITIONS[edition];
    const p = priceFor(ed.priceNum, qty);
    const sku = edition + '-' + (qty >= 2 ? '2' : '1'); // qty 2 → the 2-pack SKU
    setBasket((b) => ({ ...b, [sku]: Math.min(9, b[sku] + 1) }));
    setAdded(true);
    setToast(p.saved > 0
      ? `${SKUS[sku].name} added - you saved ${gbp(p.saved)}!`
      : `${SKUS[sku].name} added to your basket!`);
    timers.current.forEach(clearTimeout);
    timers.current = [
      setTimeout(() => setAdded(false), 2200),
      setTimeout(() => setToast(null), 3800),
      setTimeout(() => setDrawerOpen(true), 650),
    ];
  }, [edition, qty]);

  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <React.Fragment>
      <SiteHeader active="journal" count={count} onBasket={() => setDrawerOpen(true)} />
      <Hero edition={edition} setEdition={setEdition} qty={qty} setQty={setQty} onAdd={addToBasket} added={added} />
      <TrustStrip />
      <WhatsInside />
      <HowItWorks />
      <ProblemSection />
      <Reviews />
      <ParentsCorner />
      <WhyBlocks />
      <SiteFooter />

      <MobileBuySheet edition={edition} setEdition={setEdition} qty={qty} setQty={setQty} onAdd={addToBasket} added={added} />

      <BasketDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} basket={basket} setBasket={setBasket} onToast={showToast} />

      {toast && (
        <div className="sb-toastwrap" style={{ position: 'fixed', left: '50%', bottom: 26, transform: 'translateX(-50%)', zIndex: 100 }}>
          <SBToast tint="green" icon="🎉" onClose={() => setToast(null)}>{toast}</SBToast>
        </div>
      )}
    </React.Fragment>
  );
}

createRoot(document.getElementById('root')).render(<App />);
