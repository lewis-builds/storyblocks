/* Story Blocks Journal - buy page sections + helpers */
import React from 'react';
import { asset, CHAR_BASE } from './lib/core.js';

const DS = window.StoryBlocksJournalDesignSystem_239fa7;
const { Button, Card, Badge, Chip, Character, Sticker, Logo } = DS;

/* ---- Icons: inlined Lucide paths (heavy round stroke to match the hand-drawn weight) ---- */
const ICONS = {
  bag: ['M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z', 'M3 6h18', 'M16 10a4 4 0 0 1-8 0'],
  check: ['M20 6 9 17l-5-5'],
  truck: ['M10 17h4V5H2v12h3', 'M20 17h2v-3.34a4 4 0 0 0-1.17-2.83L19 9h-5v8h1', 'circle:5,17,2', 'circle:18,17,2'],
  shield: ['M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z', 'm9 12 2 2 4-4'],
  sparkles: ['M9.94 15.5A2 2 0 0 0 8.5 14.06l-6.14-1.58a.5.5 0 0 1 0-.96L8.5 9.94A2 2 0 0 0 9.94 8.5l1.58-6.14a.5.5 0 0 1 .96 0L14.06 8.5A2 2 0 0 0 15.5 9.94l6.14 1.58a.5.5 0 0 1 0 .96L15.5 14.06a2 2 0 0 0-1.44 1.44l-1.58 6.14a.5.5 0 0 1-.96 0z', 'M20 3v4', 'M22 5h-4', 'M4 17v2', 'M5 18H3'],
  book: ['M12 7v14', 'M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z'],
  mail: ['rect:2,4,20,16,2', 'm22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7'],
  award: ['M15.48 12.89 17 22l-5-3-5 3 1.52-9.11', 'circle:12,8,6'],
  scan: ['M3 7V5a2 2 0 0 1 2-2h2', 'M17 3h2a2 2 0 0 1 2 2v2', 'M21 17v2a2 2 0 0 1-2 2h-2', 'M7 21H5a2 2 0 0 1-2-2v-2', 'M7 12h10'],
  phone: ['M7 2h10a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z', 'M12 18h.01'],
  heart: ['M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-2.826-.02L5 15c-1.5-1.5-3-3.2-3-5.5'],
};
function Icon({ name, size = 24, stroke = 'var(--sb-ink)', fill = 'none', sw = 2.4, style = {} }) {
  const parts = ICONS[name] || [];
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke={stroke} strokeWidth={sw}
      strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block', ...style }} aria-hidden="true">
      {parts.map((p, i) => {
        if (p.startsWith('circle:')) { const [cx, cy, r] = p.slice(7).split(',').map(Number); return <circle key={i} cx={cx} cy={cy} r={r} />; }
        if (p.startsWith('rect:')) { const [x, y, w, h, rx] = p.slice(5).split(',').map(Number); return <rect key={i} x={x} y={y} width={w} height={h} rx={rx} />; }
        return <path key={i} d={p} />;
      })}
    </svg>
  );
}

/* small helper: reveal-on-scroll wrapper */
function Reveal({ children, delay = 0, style = {}, className = '', as = 'div' }) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const show = () => el.classList.add('in');
    let io;
    if ('IntersectionObserver' in window) {
      io = new IntersectionObserver((ents) => {
        ents.forEach((e) => { if (e.isIntersecting) { show(); io.disconnect(); } });
      }, { threshold: 0.12 });
      io.observe(el);
    } else { show(); }
    // safety: never leave content hidden even if the observer doesn't fire
    const t = setTimeout(show, 1300);
    return () => { io && io.disconnect(); clearTimeout(t); };
  }, []);
  const Tag = as;
  return <Tag ref={ref} className={'sb-reveal ' + className} style={{ animationDelay: delay + 'ms', ...style }}>{children}</Tag>;
}

/* section heading block */
function SectionHead({ kicker, title, sub, align = 'center', max = 640 }) {
  return (
    <div style={{ textAlign: align, maxWidth: max, margin: align === 'center' ? '0 auto' : undefined }}>
      {kicker && <div className="sb-marker" style={{ fontSize: '1.4rem', color: 'var(--sb-blue)', marginBottom: 6 }}>{kicker}</div>}
      <h2 className="sb-display" style={{ fontSize: 'clamp(1.9rem, 4vw, 2.75rem)', lineHeight: 1.05 }}>{title}</h2>
      {sub && <p style={{ marginTop: 14, fontSize: '1.15rem', lineHeight: 1.55, color: 'var(--sb-ink)' }}>{sub}</p>}
    </div>
  );
}

/* ============================ TRUST STRIP ============================ */
function TrustStrip() {
  const items = [
    { icon: 'truck', label: 'Free UK delivery' },
    { icon: 'sparkles', label: 'Improves writing skills' },
    { icon: 'award', label: 'Free stickers + reward chart' },
    { icon: 'book', label: 'Free parent guides & printables' },
  ];
  return (
    <div style={{ background: 'var(--sb-ink)' }}>
      <div className="sb-wrap sb-trust" style={{ display: 'flex', flexWrap: 'wrap', gap: '10px 40px', justifyContent: 'center', padding: '16px 24px' }}>
        {items.map((it) => (
          <div key={it.label} style={{ display: 'inline-flex', alignItems: 'center', gap: 10, color: '#fff', fontWeight: 800, fontSize: '.98rem' }}>
            <Icon name={it.icon} size={22} stroke="var(--sb-yellow)" sw={2.6} />
            {it.label}
          </div>
        ))}
      </div>
    </div>
  );
}

/* small inline video peek - thumbnail first, plays on tap */
function VideoPeek({ id, title }) {
  const [playing, setPlaying] = React.useState(false);
  return (
    <div style={{ maxWidth: 640, margin: '40px auto 0' }}>
      <div style={{ position: 'relative', aspectRatio: '16 / 9', border: '3px solid var(--sb-ink)', borderRadius: 18, overflow: 'hidden', boxShadow: 'var(--shadow-pop)', background: 'var(--sb-ink)' }}>
        {playing ? (
          <iframe src={'https://www.youtube-nocookie.com/embed/' + id + '?autoplay=1&rel=0'}
            title={title} allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 0 }}></iframe>
        ) : (
          <button type="button" onClick={() => setPlaying(true)} aria-label={'Play video: ' + title}
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', padding: 0, border: 0, background: 'none', cursor: 'pointer' }}>
            <img src={'https://img.youtube.com/vi/' + id + '/maxresdefault.jpg'} alt=""
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
            <span style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 68, height: 68, borderRadius: 999, background: 'var(--sb-yellow)', border: '3px solid var(--sb-ink)', boxShadow: '4px 4px 0 0 var(--sb-ink)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="26" height="26" viewBox="0 0 24 24" fill="var(--sb-ink)" style={{ marginLeft: 4 }}><path d="M8 5v14l11-7z"/></svg>
            </span>
          </button>
        )}
      </div>
      <div className="sb-marker" style={{ textAlign: 'center', fontSize: '1.15rem', marginTop: 12, color: 'var(--sb-muted)' }}>
        A quick look inside - 30 seconds · <a href={'https://www.youtube.com/watch?v=' + id} target="_blank" rel="noopener" style={{ color: 'var(--sb-blue)' }}>watch on YouTube</a>
      </div>
    </div>
  );
}

/* colour-coded flick-through of the 4 starter types */
const STARTER_TYPES = [
  { name: 'Objects', tint: 'peach', para: <React.Fragment>One curious object - a rusty key, a lost letter, a talking clock - and a friendly question. Your child decides what it is, who it belongs to, and what happens next. <strong>The object sparks the idea; their imagination does the rest.</strong></React.Fragment> },
  { name: 'Scenario', tint: 'sky', para: <React.Fragment>A little situation to land in - <em>you wake up and the house is floating</em>. A friendly question helps your child decide what their character does next, <strong>and the story unfolds from there.</strong></React.Fragment> },
  { name: 'First line', tint: 'pink', para: <React.Fragment>A ready-made opening sentence to run with. Your child reads it, wonders what could possibly happen next - <strong>and the rest of the page is theirs to fill.</strong></React.Fragment> },
  { name: 'Three words', tint: 'green', para: <React.Fragment>Three words and one friendly question - that's the classic starter. Your child weaves the words into a story of their own, <strong>on pages made for young writers.</strong></React.Fragment> },
];

/* row 01 - tabs sit under the spread; the photo and text swap with the selected type */
function StarterSpreadRow({ r, i }) {
  const [sel, setSel] = React.useState(0);
  return (
    <article className={'sb-spread sb-spread--starter' + (r.flip ? ' sb-spread--alt' : '')}>
      <div className="sb-spread__book">
        {STARTER_TYPES.map((ty, k) => (
          <div key={ty.name} style={{ display: sel === k ? 'block' : 'none' }}>
            <image-slot id={'inside-page-starter-' + ty.tint} src="/assets/placeholders/spread.svg"
              style={{ width: '100%', aspectRatio: '296 / 210', height: 'auto', display: 'block' }} shape="rect"
              placeholder={'Drop a photo of a \u201c' + ty.name.toLowerCase() + '\u201d spread'}></image-slot>
          </div>
        ))}
        <div className="sb-spread__spine" aria-hidden="true"></div>
      </div>

      {/* type tabs live in the question card, under the '…4 types to explore' line */}
      <div className="sb-spread__note sb-spread__note--q">
        <span className="sb-marker" style={{ fontSize: '1.3rem', color: 'var(--sb-blue)' }}>{String(i + 1).padStart(2, '0')}</span>
        <h3 className="sb-display" style={{ fontSize: 'clamp(1.4rem, 2.4vw, 1.8rem)', lineHeight: 1.1, marginTop: 4 }}>{r.q}</h3>
        <div className="sb-marker" style={{ fontSize: '1.05rem', color: 'var(--sb-muted)', marginTop: 6 }}>There are 4 types to explore…</div>
        <div className="sb-spread__tabs" role="tablist" aria-label="Story starter types">
          {STARTER_TYPES.map((ty, k) => (
            <button key={ty.name} type="button" role="tab" aria-selected={sel === k} onClick={() => setSel(k)}
              style={{
                fontFamily: 'var(--font-body)', fontWeight: 800, fontSize: '.85rem', color: 'var(--sb-ink)', whiteSpace: 'nowrap',
                background: `var(--sb-${ty.tint})`, border: '2.5px solid var(--sb-ink)', borderRadius: 999,
                padding: '7px 12px', cursor: 'pointer',
                boxShadow: sel === k ? '2px 2px 0 0 var(--sb-ink)' : 'none',
                opacity: sel === k ? 1 : .55, transform: sel === k ? 'none' : 'scale(.96)',
                transition: 'opacity .15s, transform .15s, box-shadow .15s',
              }}>{ty.name}</button>
          ))}
        </div>
      </div>
      <div className="sb-spread__note sb-spread__note--a">
        <p style={{ fontSize: '1.05rem', lineHeight: 1.55 }} role="tabpanel">{STARTER_TYPES[sel].para}</p>
      </div>
    </article>
  );
}

/* ============================ WHAT'S INSIDE ============================ */
function WhatsInside() {
  const rows = [
    {
      q: 'What is a daily story starter?',
      a: <React.Fragment>Three words and one friendly question - that's a story starter. Your child weaves the words into a story of their own, on pages made for young writers. There are <strong>more than 70 of them</strong>, across four types.</React.Fragment>,
      slot: { id: 'inside-page-starter', caption: 'A real daily page' },
      spread: true,
      types: true,
    },
    {
      q: 'How does it build writing confidence?',
      a: <React.Fragment>With writing tips and mini challenges tucked between the days. Gentle nudges - <em>give your hero a secret, end on a cliffhanger</em> - that stretch their skills without ever feeling like homework. No blank-page panic, no wrong answers.</React.Fragment>,
      slot: { id: 'inside-page-tips', caption: 'Tips & challenges, mid-journal' },
      spread: true,
    },
    {
      q: 'What are the stickers and reward chart for?',
      a: <React.Fragment>Finish a story, tick the chart, peel off a sticker. Every journal includes a <strong>free full sticker sheet and reward chart</strong> - little wins that build a daily writing streak and make finishing feel like the best part.</React.Fragment>,
      slot: { id: 'inside-stickers', caption: 'The sticker sheet - in every box', src: 'assets/sticker-sheet.jpg' },
      spread: true,
      flip: true,
      char: 'SB44',
    },
  ];
  return (
    <section id="inside" style={{ background: 'var(--sb-wash-green)', borderTop: '3px solid var(--sb-ink)', borderBottom: '3px solid var(--sb-ink)', padding: 'var(--sec-pad, 72px) 0' }}>
      <div className="sb-wrap">
        <SectionHead kicker="Open it up…" title="What's inside the journal" sub="Everything a young writer needs to swap the screen for a story - and everything a parent needs to cheer them on." />
        <VideoPeek id="LfGmzb0qi9E" title="Inside the Story Blocks Journal" />
        <div style={{ marginTop: 72 }}>
          {rows.map((r, i) => (
            <Reveal key={r.q} className="sb-inside-row-wrap">
              {r.types ? (
                <StarterSpreadRow r={r} i={i} />
              ) : r.spread ? (
                <article className={'sb-spread' + (r.flip ? ' sb-spread--alt' : '')}>
                  <div className="sb-spread__book">
                    <image-slot id={r.slot.id} src={r.slot.src ? asset(r.slot.src) : '/assets/placeholders/spread.svg'}
                      style={{ width: '100%', aspectRatio: '296 / 210', height: 'auto', display: 'block' }} shape="rect"
                      placeholder="Drop a photo of the open spread"></image-slot>
                    <div className="sb-spread__spine" aria-hidden="true"></div>
                  </div>
                  <div className="sb-spread__note sb-spread__note--q">
                    <span className="sb-marker" style={{ fontSize: '1.3rem', color: 'var(--sb-blue)' }}>{String(i + 1).padStart(2, '0')}</span>
                    <h3 className="sb-display" style={{ fontSize: 'clamp(1.4rem, 2.4vw, 1.8rem)', lineHeight: 1.1, marginTop: 4 }}>{r.q}</h3>
                  </div>
                  <div className="sb-spread__note sb-spread__note--a">
                    <p style={{ fontSize: '1.05rem', lineHeight: 1.55 }}>{r.a}</p>
                  </div>
                  {r.char && (
                    <img src={asset(CHAR_BASE + '/' + r.char + '.png')} alt="" className="sb-float sb-deco" style={{ '--r': '6deg', position: 'absolute', width: 104, right: -8, top: -18, zIndex: 4, pointerEvents: 'none' }} />
                  )}
                </article>
              ) : (
              <article className={'sb-inside-row' + (r.flip ? ' sb-inside-row--flip' : '')}>
                <figure className="sb-inside-media snap" style={{ margin: 0, position: 'relative', transform: `rotate(${r.flip ? 1.5 : -1.5}deg)` }}>
                  {r.photo ? (
                    <img src={asset(r.photo.src)} alt={r.photo.alt} style={{ display: 'block', width: '100%', height: 'var(--inside-photo-h, 420px)', objectFit: 'cover', borderRadius: 8 }} />
                  ) : (
                    <image-slot id={r.slot.id} src="/assets/placeholders/photo.svg" style={{ width: '100%', height: 'var(--inside-photo-h, 420px)', display: 'block' }} shape="rounded" radius="8"
                      placeholder="Drop a page photo"></image-slot>
                  )}
                  <figcaption>{r.photo ? r.photo.caption : r.slot.caption}</figcaption>
                  {r.photo && r.photo.char && (
                    <img src={asset(CHAR_BASE + '/' + r.photo.char + '.png')} alt="" className="sb-float" style={{ '--r': '6deg', position: 'absolute', width: 104, right: -18, bottom: -30, pointerEvents: 'none' }} />
                  )}
                </figure>
                <div>
                  <span className="sb-marker" style={{ fontSize: '1.5rem', color: 'var(--sb-blue)' }}>{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="sb-display" style={{ fontSize: 'clamp(1.7rem, 3.2vw, 2.4rem)', lineHeight: 1.1, marginTop: 8 }}>{r.q}</h3>
                  <p style={{ marginTop: 16, fontSize: '1.16rem', lineHeight: 1.65, maxWidth: 480 }}>{r.a}</p>
                </div>
              </article>
              )}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================ HOW IT WORKS ============================ */
function HowItWorks() {
  const steps = [
    { n: '01', char: 'SB16', tint: 'sky', label: 'Get today’s spark', body: 'Three little words and a friendly question. That’s the whole prompt - enough to get the imagination going, not enough to feel like homework.' },
    { n: '02', char: 'SB50', tint: 'peach', label: 'Write the story', body: 'Ten quiet minutes in the journal. Tips and challenges are right there for the days they want a boost.' },
    { n: '03', char: 'SB44', tint: 'pink', label: 'Earn the reward', body: 'Tick the chart, peel a sticker, build the streak. The habit sticks because finishing feels brilliant.' },
  ];
  return (
    <section id="how" style={{ padding: 'var(--sec-pad, 72px) 0' }}>
      <div className="sb-wrap">
        <SectionHead kicker="Ten minutes a day" title="How the habit sticks" sub="No screens, no pressure, no blank page. Just a small daily ritual that kids actually look forward to." />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 24, marginTop: 46 }}>
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 110}>
              <div style={{ position: 'relative', background: `var(--sb-wash-${s.tint === 'sky' ? 'sky' : s.tint === 'peach' ? 'peach' : 'pink'})`, border: '3px solid var(--sb-ink)', borderRadius: 24, boxShadow: 'var(--shadow-pop)', padding: '28px 24px 24px', height: '100%' }}>
                <span className="sb-marker" style={{ position: 'absolute', top: -18, left: 22, background: 'var(--sb-ink)', color: '#fff', fontSize: '1.25rem', lineHeight: 1, padding: '8px 14px', borderRadius: 999, transform: 'rotate(-3deg)' }}>{s.n}</span>
                <div style={{ display: 'flex', justifyContent: 'center', height: 150 }}>
                  <img src={asset(CHAR_BASE + '/' + s.char + '.png')} alt="" style={{ height: 150, width: 'auto' }} />
                </div>
                <h3 className="sb-display" style={{ fontSize: '1.4rem', marginTop: 6 }}>{s.label}</h3>
                <p style={{ marginTop: 8, lineHeight: 1.55 }}>{s.body}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Scan for a spark callout */}
        <Reveal delay={120}>
          <div className="sb-scan" style={{ marginTop: 34, display: 'flex', alignItems: 'center', gap: 24, background: 'var(--sb-yellow)', border: '4px solid var(--sb-ink)', borderRadius: 26, boxShadow: 'var(--shadow-pop-lg)', padding: '22px 28px' }}>
            <div style={{ flexShrink: 0, width: 74, height: 74, borderRadius: 20, background: 'var(--sb-paper)', border: '3px solid var(--sb-ink)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'var(--shadow-pop-sm)' }}>
              <Icon name="phone" size={40} sw={2.4} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div className="sb-marker" style={{ fontSize: '1.3rem' }}>Stuck? Scan for a spark</div>
              <p style={{ marginTop: 2, lineHeight: 1.5, fontWeight: 600 }}>A quick scan gives one gentle nudge when they’re stuck - then puts the screen straight back down. Help when they need it, never a rabbit hole.</p>
            </div>
            <img src={asset('assets/phone-app.png')} alt="The Story Blocks companion app showing today’s three words" className="sb-scan-phone"
              style={{ height: 250, width: 'auto', flexShrink: 0, transform: 'rotate(4deg)', margin: '-52px 6px -52px 0', borderRadius: 24, filter: 'drop-shadow(6px 8px 0 rgba(35,31,32,.35))' }} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ============================ WHY IT MATTERS (the "why now" beat) ============================ */
/* Warm, single-stat problem section. One figure, hope, and a quiet click-through
   to the dedicated /why page — the depth and citations live there, not here. */
function ProblemSection() {
  return (
    <section style={{ background: 'var(--sb-wash-peach)', borderTop: '3px solid var(--sb-ink)', borderBottom: '3px solid var(--sb-ink)', padding: 'var(--sec-pad, 72px) 0' }}>
      <div className="sb-wrap">
        <div className="sb-problem" style={{ display: 'grid', gridTemplateColumns: 'minmax(0,0.85fr) minmax(0,1.15fr)', gap: 52, alignItems: 'center' }}>
          {/* the one stat, as big type */}
          <div style={{ position: 'relative', textAlign: 'center' }}>
            <div className="sb-display" style={{ fontSize: 'clamp(4.5rem, 15vw, 8.5rem)', lineHeight: 0.9, color: 'var(--sb-blue)', letterSpacing: '-0.02em' }}>1 in 4</div>
            <p style={{ margin: '16px auto 0', maxWidth: 320, fontWeight: 700, color: 'var(--sb-ink)', fontSize: '1rem', lineHeight: 1.5 }}>
              Only around 1 in 4 children now enjoy writing in their free time - near a 15-year low.
            </p>
            <p className="sb-marker" style={{ marginTop: 8, color: 'var(--sb-muted)', fontSize: '1.05rem' }}>National Literacy Trust</p>
            <img className="sb-float sb-deco" src={asset(CHAR_BASE + '/SB50.png')} alt="" style={{ position: 'absolute', width: 88, right: '2%', bottom: -18, ['--r']: '-5deg', pointerEvents: 'none' }} />
          </div>

          {/* the turn to hope */}
          <div>
            <div className="sb-marker" style={{ fontSize: '1.4rem', color: 'var(--sb-blue)' }}>Why we made this</div>
            <h2 className="sb-display" style={{ fontSize: 'clamp(1.9rem, 4vw, 2.7rem)', lineHeight: 1.06, marginTop: 6 }}>Kids have stopped writing for the joy of it. We're bringing it back.</h2>
            <p style={{ marginTop: 16, fontSize: '1.16rem', lineHeight: 1.6, maxWidth: 540 }}>
              Writing for pleasure has nearly halved in fifteen years - squeezed out by screens, schedules and school pressure. Story Blocks exists to bring it back: five minutes of storytelling a day, away from screens, until writing stops being a chore and starts being <em>theirs</em>.
            </p>
            <a href="why.html" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginTop: 22, fontWeight: 800, fontSize: '1.08rem', color: 'var(--sb-ink)', textDecoration: 'none' }}>
              <span style={{ borderBottom: '3px solid var(--sb-yellow)', paddingBottom: 2 }}>Read why this matters</span>
              <span aria-hidden="true" style={{ color: 'var(--sb-blue)' }}>→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================ REVIEWS ============================ */
function Stars({ n = 5 }) {
  return (
    <div style={{ display: 'inline-flex', gap: 2 }} aria-label={n + ' out of 5 stars'}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="20" height="20" viewBox="0 0 24 24" fill={i < n ? 'var(--sb-yellow)' : 'none'} stroke="var(--sb-ink)" strokeWidth="2" strokeLinejoin="round" aria-hidden="true">
          <path d="M11.5 2.3a.55.55 0 0 1 1 0l2.6 5.27a.55.55 0 0 0 .41.3l5.82.85a.55.55 0 0 1 .3.93l-4.2 4.1a.55.55 0 0 0-.16.49l1 5.79a.55.55 0 0 1-.8.58l-5.2-2.74a.55.55 0 0 0-.52 0l-5.2 2.74a.55.55 0 0 1-.8-.58l1-5.79a.55.55 0 0 0-.16-.49l-4.2-4.1a.55.55 0 0 1 .3-.93l5.82-.85a.55.55 0 0 0 .41-.3z" />
        </svg>
      ))}
    </div>
  );
}
function Reviews() {
  const quotes = [
    { tint: 'purple', tilt: -1.5, text: 'The first thing she reaches for after school now is the journal, not the tablet. I genuinely didn’t think that was possible.', name: 'Priya', meta: 'mum of two, Bristol' },
    { tint: 'sky', tilt: 1.2, text: 'Three words and he’s off. The stories he comes up with make us properly laugh at the dinner table.', name: 'Tom', meta: 'dad of one, Leeds' },
    { tint: 'peach', tilt: -1, text: 'Lovely quality, and the parent guides tell me exactly how to encourage her without hovering.', name: 'Hannah', meta: 'parent, Glasgow' },
  ];
  return (
    <section id="reviews" style={{ background: 'var(--sb-wash-lemon)', borderTop: '3px solid var(--sb-ink)', borderBottom: '3px solid var(--sb-ink)', padding: 'var(--sec-pad, 72px) 0' }}>
      <div className="sb-wrap">
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20, alignItems: 'flex-end', justifyContent: 'space-between' }}>
          <SectionHead align="left" max={560} kicker="Loved by parents" title="Screens down, stories up" sub={null} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <Stars n={5} />
            <span style={{ fontWeight: 800, fontSize: '1.05rem' }}>4.9 / 5 &nbsp;<span style={{ color: 'var(--sb-muted)', fontWeight: 700 }}>· 2,400+ families</span></span>
          </div>
        </div>

        {/* real families, real journals */}
        <Reveal delay={80}>
          <div className="sb-kids-strip" aria-label="Photos of children writing in their Story Blocks journals">
            <img src={asset('assets/kids-strip.png')} alt="Children writing in their Story Blocks journals" />
          </div>
        </Reveal>

        <div className="sb-reviews" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 22, marginTop: 40 }}>
          {quotes.map((q, i) => (
            <Reveal key={q.name} delay={i * 100}>
              <div style={{ background: 'var(--sb-paper)', border: '3px solid var(--sb-ink)', borderRadius: 22, boxShadow: 'var(--shadow-pop)', padding: 24, height: '100%', transform: `rotate(${q.tilt}deg)` }}>
                <Stars n={5} />
                <p style={{ marginTop: 14, fontSize: '1.12rem', lineHeight: 1.5, fontWeight: 600 }}>“{q.text}”</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 18 }}>
                  <div style={{ width: 40, height: 40, borderRadius: 999, border: '3px solid var(--sb-ink)', background: `var(--sb-${q.tint})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontFamily: 'var(--font-display)' }}>{q.name[0]}</div>
                  <div style={{ lineHeight: 1.2 }}>
                    <div style={{ fontWeight: 800 }}>{q.name}</div>
                    <div style={{ color: 'var(--sb-muted)', fontSize: '.9rem', fontWeight: 700 }}>{q.meta}</div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================ PARENTS' CORNER ============================ */
/* Little stack of resource cards - stands in for the online library. */
function CornerCards() {
  const cards = [
    ['Printable story starters', 'lemon', 'book', -2.5],
    ['Extra reward charts', 'sky', 'award', 1.5],
    ['Guides for grown-ups', 'pink', 'heart', -1],
  ];
  return (
    <div style={{ display: 'grid', gap: 12, width: 'min(300px, 100%)' }}>
      {cards.map(([label, tint, icon, tilt]) => (
        <div key={label} style={{ background: `var(--sb-wash-${tint})`, border: '3px solid var(--sb-ink)', borderRadius: 16, boxShadow: 'var(--shadow-pop)', padding: '15px 18px', transform: `rotate(${tilt}deg)`, display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ flexShrink: 0, width: 34, height: 34, borderRadius: 10, background: 'var(--sb-paper)', border: '2.5px solid var(--sb-ink)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icon name={icon} size={18} sw={2.6} />
          </span>
          <span style={{ fontWeight: 800 }}>{label}</span>
        </div>
      ))}
    </div>
  );
}

function ParentsCorner() {
  return (
    <section style={{ padding: 'var(--sec-pad, 72px) 0' }}>
      <div className="sb-wrap">
        <div className="sb-companion" style={{ display: 'grid', gridTemplateColumns: 'minmax(0,.85fr) minmax(0,1.15fr)', gap: 40, alignItems: 'center', background: 'var(--sb-wash-purple)', border: '4px solid var(--sb-ink)', borderRadius: 30, boxShadow: 'var(--shadow-pop-lg)', padding: '40px' }}>
          <div style={{ display: 'flex', justifyContent: 'center', position: 'relative' }}>
            <CornerCards />
            <span className="sb-marker" style={{ position: 'absolute', top: -18, right: -6, background: 'var(--sb-paper)', border: '3px solid var(--sb-ink)', borderRadius: 999, padding: '6px 14px', fontSize: '1.15rem', transform: 'rotate(6deg)', boxShadow: 'var(--shadow-pop-sm)', zIndex: 2 }}>Included 💛</span>
          </div>
          <div>
            <Badge variant="purple">For the grown-ups</Badge>
            <h2 className="sb-display" style={{ fontSize: 'clamp(1.8rem,3.4vw,2.5rem)', marginTop: 14, lineHeight: 1.08 }}>You’re part of the story too</h2>
            <p style={{ marginTop: 14, fontSize: '1.15rem', lineHeight: 1.55 }}>Every journal unlocks the <strong>Parents’ Corner</strong> - our free online library of printables and short, practical guides to help you cheer a young writer on without hovering.</p>
            <ul style={{ listStyle: 'none', padding: 0, margin: '20px 0 0', display: 'grid', gap: 12 }}>
              {['Printable story starters and extra reward charts', 'Short guides - what to say, and what not to say', 'Free forever, with the code that comes with your journal'].map((t) => (
                <li key={t} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', fontWeight: 600, fontSize: '1.05rem' }}>
                  <span style={{ flexShrink: 0, width: 26, height: 26, borderRadius: 999, background: 'var(--sb-green)', border: '2.5px solid var(--sb-ink)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon name="check" size={16} sw={3} /></span>
                  {t}
                </li>
              ))}
            </ul>
            <div style={{ marginTop: 24 }}>
              <Button as="a" href="parents.html" iconRight="→">See the Parents’ Corner</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================ WHY BLOCKS ============================ */
function WhyBlocks() {
  return (
    <section style={{ padding: 'var(--sec-pad, 72px) 0 var(--sec-pad, 72px)', overflow: 'hidden' }}>
      <div className="sb-wrap">
        <SectionHead kicker="From Blocks Publishing" title="Why Blocks?"
          sub="Our name reflects how we think: modular, imaginative, open-ended. We design building blocks for bright minds - including our own family of original characters, who live across everything we make." />
      </div>
      <div style={{ maxWidth: 1180, margin: '30px auto 0', padding: '0 12px' }}>
        <img src={asset('assets/why-blocks-scene.png')} alt="The Blocks characters reading, camping, singing and playing together"
          style={{ display: 'block', width: '100%', height: 'auto' }} />
      </div>
    </section>
  );
}

/* ============================ FOOTER ============================ */
/* Footer link targets. Entries that map to a real page/section are wired;
   the rest ('#') are placeholders for pages not built yet (privacy, FAQs…). */
const FOOTER_LINKS = {
  'What’s inside': 'index.html#inside',
  'How it works': 'index.html#how',
  'Gold Edition': 'index.html',
  'Gift a journal': 'gift.html',
  'Delivery & returns': 'delivery.html',
  'Parents’ Corner': 'parents.html',
  'Contact us': 'contact.html',
  'FAQs': 'faqs.html',
  'About us': 'about.html',
  'Why Story Blocks': 'why.html',
  'Free books for schools': 'schools.html',
  'Wholesale': 'wholesale.html',
  'Reviews': 'index.html#reviews',
  'Privacy': 'privacy.html',
};
function SiteFooter() {
  const cols = [
    { h: 'The journal', links: ['What’s inside', 'How it works', 'Gold Edition', 'Gift a journal'] },
    { h: 'Support', links: ['Delivery & returns', 'Parents’ Corner', 'Contact us', 'FAQs'] },
    { h: 'Blocks Publishing', links: ['About us', 'Why Story Blocks', 'Free books for schools', 'Wholesale', 'Reviews', 'Privacy'] },
  ];
  return (
    <footer style={{ background: 'var(--sb-ink)', color: '#fff', paddingTop: 56 }}>
      <div className="sb-wrap" style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1.4fr) repeat(3, minmax(0,1fr))', gap: 32, paddingBottom: 40 }}>
        <div>
          <img src={asset('assets/blocks-publishing-logo.png')} alt="Blocks Publishing" style={{ height: 46, width: 'auto', background: '#fff', borderRadius: 12, padding: '10px 14px' }} />
          <p style={{ marginTop: 14, maxWidth: 260, lineHeight: 1.55, color: '#EDE9E3' }}>Daily story starters to spark creative writing for children.</p>
        </div>
        {cols.map((c) => (
          <div key={c.h}>
            <div className="sb-marker" style={{ fontSize: '1.25rem', color: 'var(--sb-yellow)', marginBottom: 12 }}>{c.h}</div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 10 }}>
              {c.links.map((l) => <li key={l}><a href={FOOTER_LINKS[l] || '#'} style={{ color: '#EDE9E3', textDecoration: 'none', fontWeight: 600 }}>{l}</a></li>)}
            </ul>
          </div>
        ))}
      </div>
      <div style={{ borderTop: '2px solid rgba(255,255,255,.18)' }}>
        <div className="sb-wrap" style={{ display: 'flex', flexWrap: 'wrap', gap: 20, alignItems: 'center', justifyContent: 'space-between', padding: '22px 24px' }}>
          <span style={{ color: '#C9C4BC', fontWeight: 600, fontSize: '.92rem' }}>© {new Date().getFullYear()} Blocks Publishing Ltd · blockspublishing.com</span>
          <div style={{ background: '#fff', borderRadius: 12, padding: '6px 10px', display: 'inline-flex' }}>
            <img src={asset('assets/made-in-britain.png')} alt="Made in Britain" style={{ height: 44, width: 'auto' }} />
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ---------------- Shared site header - same nav on every page ---------------- */
/* Responsive header CSS, injected by SiteHeader so every page gets the same
   behaviour without duplicating rules across each page's <style> block. */
const HEADER_CSS = `
.sb-hamburger { display: none; }
.sb-mobile-menu { display: none; }
@media (max-width: 720px) {
  .sb-nav { display: none !important; }
  .sb-hamburger { display: inline-flex !important; }
  .sb-mobile-menu { display: none; flex-direction: column; padding: 6px 24px 16px;
    background: var(--sb-cream); border-top: 2px solid rgba(35,31,32,.12); }
  .sb-mobile-menu.is-open { display: flex; }
}
.sb-mobile-menu a { padding: 13px 4px; font-weight: 800; font-size: 1.1rem; color: var(--sb-ink);
  text-decoration: none; border-bottom: 2px solid rgba(35,31,32,.08); }
.sb-mobile-menu a:last-child { border-bottom: 0; }
.sb-mobile-menu a.is-active { color: var(--sb-blue); }
`;

const NAV_LINKS = [
  ['The journal', 'index.html', 'journal'],
  ['Our mission', 'why.html', 'why'],
  ['Schools', 'schools.html', 'schools'],
  ['Free resources', 'resources.html', 'resources'],
  ['Parents', 'parents.html', 'parents'],
];

function SiteHeader({ active, count, onBasket }) {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [localCount, setLocalCount] = React.useState(0);

  // On pages without a live basket (everything but the buy page), read the
  // saved basket so the cart badge still shows the right number.
  React.useEffect(() => {
    if (count != null) return;
    try {
      const b = JSON.parse(localStorage.getItem('sb_basket_v2')) || {};
      setLocalCount(Object.values(b).reduce((n, q) => n + (q || 0), 0));
    } catch (err) {}
  }, [count]);

  const shownCount = count != null ? count : localCount;
  // Buy page passes a drawer opener; elsewhere the cart takes you to the buy
  // page, which opens the basket drawer on arrival (see the #basket handler).
  const openBasket = onBasket || (() => { window.location.href = 'index.html#basket'; });

  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 50, background: 'var(--sb-cream)', borderBottom: '3px solid var(--sb-ink)' }}>
      <style>{HEADER_CSS}</style>
      <div className="sb-wrap" style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, height: 78 }}>
        <a href="index.html" style={{ display: 'inline-flex', alignItems: 'center', textDecoration: 'none' }}>
          <img src={asset('assets/blocks-publishing-logo.png')} alt="Blocks Publishing" style={{ height: 46, width: 'auto' }} />
        </a>

        {/* nav — absolutely centered so it never shifts the logo or cart */}
        <nav className="sb-nav" style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', display: 'flex', gap: 26 }}>
          {NAV_LINKS.map(([l, h, key]) => (
            <a key={key} href={h} style={{ textDecoration: 'none', fontWeight: 800, fontSize: '1rem', color: 'var(--sb-ink)', borderBottom: key === active ? '3px solid var(--sb-yellow)' : '3px solid transparent' }}>{l}</a>
          ))}
        </nav>

        {/* cart + hamburger — always at the far right via space-between */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <button aria-label={'Basket' + (shownCount > 0 ? ` (${shownCount} item${shownCount > 1 ? 's' : ''})` : '')} onClick={openBasket}
            style={{ position: 'relative', width: 46, height: 46, borderRadius: 14, border: '3px solid var(--sb-ink)', background: 'var(--sb-paper)', boxShadow: 'var(--shadow-pop-sm)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, padding: 0 }}>
            <Icon name="bag" size={22} sw={2.4} />
            {shownCount > 0 && (
              <span style={{ position: 'absolute', top: -9, right: -9, minWidth: 24, height: 24, padding: '0 6px', borderRadius: 999, background: 'var(--sb-pink)', border: '2.5px solid var(--sb-ink)', color: 'var(--sb-ink)', fontWeight: 800, fontSize: '.8rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{shownCount}</span>
            )}
          </button>

          {/* hamburger — mobile only */}
          <button className="sb-hamburger" aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} onClick={() => setMenuOpen((o) => !o)}
            style={{ width: 46, height: 46, borderRadius: 14, border: '3px solid var(--sb-ink)', background: menuOpen ? 'var(--sb-yellow)' : 'var(--sb-paper)', boxShadow: 'var(--shadow-pop-sm)', cursor: 'pointer', alignItems: 'center', justifyContent: 'center', flexShrink: 0, padding: 0 }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--sb-ink)" strokeWidth="3" strokeLinecap="round">
              {menuOpen
                ? <React.Fragment><path d="M6 6l12 12" /><path d="M18 6L6 18" /></React.Fragment>
                : <React.Fragment><path d="M4 7h16" /><path d="M4 12h16" /><path d="M4 17h16" /></React.Fragment>}
            </svg>
          </button>
        </div>
      </div>

      {/* mobile dropdown menu */}
      <nav className={'sb-mobile-menu' + (menuOpen ? ' is-open' : '')} aria-label="Site menu">
        {NAV_LINKS.map(([l, h, key]) => (
          <a key={key} href={h} className={key === active ? 'is-active' : ''}>{l}</a>
        ))}
      </nav>
    </header>
  );
}

export { Icon, Reveal, SectionHead, TrustStrip, WhatsInside, HowItWorks, ProblemSection, Reviews, ParentsCorner, WhyBlocks, SiteFooter, SiteHeader, Stars };
