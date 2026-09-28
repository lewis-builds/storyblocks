/* Full-screen single-prompt story-starter experience for Scenario, Objects and
   First-line types (/story-starters/sbNN-s|o|f). The prompt is the hero; the
   original Focus On / Writing Tips / Challenges become tappable nudge cards that
   open a reveal sheet - mirroring the three-word experience. */
import React from 'react';
import { StarterIntro } from './lib/starter-intro.jsx';

const IC = {
  focusOn: '<svg viewBox="0 0 24 24" fill="none" stroke="#231f20" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>',
  writingTips: '<svg viewBox="0 0 24 24" fill="none" stroke="#231f20" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M9.94 15.5A2 2 0 0 0 8.5 14.06l-6.14-1.58a.5.5 0 0 1 0-.96L8.5 9.94A2 2 0 0 0 9.94 8.5l1.58-6.14a.5.5 0 0 1 .96 0L14.06 8.5A2 2 0 0 0 15.5 9.94l6.14 1.58a.5.5 0 0 1 0 .96L15.5 14.06a2 2 0 0 0-1.44 1.44l-1.58 6.14a.5.5 0 0 1-.96 0z"/></svg>',
  challenges: '<svg viewBox="0 0 24 24" fill="none" stroke="#231f20" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="6"/><path d="M15.48 12.89 17 22l-5-3-5 3 1.52-9.11"/></svg>',
};
const LABEL = { focusOn: 'Focus On', writingTips: 'Writing Tips', challenges: 'Challenges' };
const NT = { focusOn: 'var(--sb-wash-peach)', writingTips: 'var(--sb-wash-lemon)', challenges: 'var(--sb-wash-pink)' };
const KEYS = ['focusOn', 'writingTips', 'challenges'];

/* Turn the stored rich-text (<p><strong>Q</strong></p><p>body</p>...) into
   question/body pairs for the reveal sheet. */
function decode(s) { const t = document.createElement('textarea'); t.innerHTML = s; return t.value; }
function toPairs(htmlStr) {
  const blocks = [...(htmlStr || '').matchAll(/<p>([\s\S]*?)<\/p>/g)].map((m) => m[1]);
  const out = []; let cur = null;
  blocks.forEach((b) => {
    const text = decode(b.replace(/<[^>]+>/g, '')).replace(/\s+/g, ' ').trim();
    if (!text) return;
    const isQ = /^\s*<strong>/.test(b);
    if (isQ) { if (cur) out.push(cur); cur = { q: text, body: '' }; }
    else if (cur) { cur.body = (cur.body ? cur.body + ' ' : '') + text; }
    else out.push({ q: text, body: '' });
  });
  if (cur) out.push(cur);
  return out;
}

const CSS = `
html.sp-lock, html.sp-lock body{ height:100%; overflow:hidden; }
html.sp-lock body{ margin:0; background:var(--type-bg,#fff); }
.sp{ height:100%; max-width:520px; margin:0 auto; display:flex; flex-direction:column; color:var(--sb-ink);
  padding:clamp(15px,4vw,24px); padding-block:clamp(16px,4.5vh,30px); gap:clamp(10px,2vh,16px);
  background:radial-gradient(rgba(35,31,32,.05) 1.5px, transparent 1.6px) 0 0/22px 22px, var(--type-bg,#fff); }
.sp-head{ text-align:center; padding-bottom:clamp(12px,3.4vh,30px); }
.sp-logo{ display:block; width:clamp(78px,22vw,98px); height:auto; margin:0 auto; }
.sp-instruction{ font-family:var(--font-display); font-weight:700; color:var(--sb-ink); font-size:clamp(1.3rem,5.2vw,1.7rem); line-height:1.14; margin-top:14px; text-wrap:balance; }
.sp-middle{ flex:1; display:flex; flex-direction:column; justify-content:center; gap:clamp(20px,4vh,36px); min-height:0; }
.sp-prompt-wrap{ display:flex; align-items:center; justify-content:center; }
.sp-prompt{ background:#fff; border:3.5px solid var(--sb-ink); border-radius:22px; box-shadow:7px 9px 0 0 var(--sb-ink);
  padding:clamp(22px,6vw,34px); transform:rotate(-1.6deg); max-width:100%; position:relative;
  font-family:var(--font-display); font-weight:600; font-size:clamp(1.4rem,5.7vw,2rem); line-height:1.16; text-wrap:pretty; }
.sp-prompt--quote{ padding-top:clamp(34px,9vw,50px); }
.sp-quote{ position:absolute; top:6px; left:16px; font-family:var(--font-display); font-weight:700; font-size:3.6rem; line-height:.7; color:var(--sb-blue); }
.sp-nudge-group{ display:flex; flex-direction:column; gap:9px; }
.sp-nudge-label{ text-align:center; font-family:var(--font-display); font-weight:600; color:var(--sb-blue); font-size:1.02rem; }
.sp-nudges{ display:flex; gap:9px; justify-content:center; }
.sp-nudge{ flex:1; max-width:150px; appearance:none; cursor:pointer; background:#fff; border:3px solid var(--sb-ink);
  border-radius:16px; box-shadow:3px 4px 0 0 var(--sb-ink); padding:12px 8px 11px; display:flex; flex-direction:column;
  align-items:center; gap:7px; font-family:var(--font-body); font-weight:800; font-size:.85rem; color:var(--sb-ink);
  text-align:center; line-height:1.08; transition:transform .14s ease, box-shadow .14s ease; }
.sp-nudge:nth-child(1){ transform:rotate(-3deg); } .sp-nudge:nth-child(2){ transform:rotate(1.6deg); } .sp-nudge:nth-child(3){ transform:rotate(-1.4deg); }
.sp-nudge:active{ transform:translate(1px,2px) rotate(0deg); box-shadow:1px 1px 0 0 var(--sb-ink); }
.sp-nudge-ic{ width:36px; height:36px; border-radius:11px; border:2.5px solid var(--sb-ink); display:grid; place-items:center; background:var(--nt); }
.sp-nudge-ic svg{ width:20px; height:20px; }
.sp-lower{ display:flex; align-items:flex-end; justify-content:flex-end; }
.sp-char{ width:clamp(126px,36vw,184px); height:auto; }
.sp-actions{ display:flex; gap:11px; }
.sp-action{ flex:1; min-width:0; cursor:pointer; text-decoration:none; font-family:var(--font-body); font-weight:800; font-size:1rem;
  color:var(--sb-ink); border:3.5px solid var(--sb-ink); border-radius:15px; box-shadow:4px 5px 0 0 var(--sb-ink); padding:14px 10px;
  display:flex; align-items:center; justify-content:center; gap:9px; text-align:center; line-height:1.1; transition:transform .14s, box-shadow .14s; }
.sp-action--print{ background:#fff; } .sp-action--send{ background:var(--sb-yellow); }
.sp-action:active{ transform:translate(2px,3px); box-shadow:1px 2px 0 0 var(--sb-ink); }
.sp-action svg{ width:21px; height:21px; flex:0 0 auto; }
.sp-scrim{ position:fixed; inset:0; background:rgba(33,28,25,.42); backdrop-filter:blur(3px); -webkit-backdrop-filter:blur(3px);
  opacity:0; pointer-events:none; transition:opacity .28s ease; z-index:60; }
.sp-scrim.on{ opacity:1; pointer-events:auto; }
.sp-sheet{ position:fixed; left:0; right:0; bottom:0; z-index:61; max-width:520px; margin:0 auto; background:#fff;
  border:3.5px solid var(--sb-ink); border-bottom:none; border-radius:26px 26px 0 0;
  padding:14px clamp(20px,6vw,28px) calc(24px + env(safe-area-inset-bottom,0px)); transform:translateY(110%);
  transition:transform .4s cubic-bezier(.22,1,.36,1); max-height:82vh; overflow-y:auto; }
.sp-sheet.on{ transform:translateY(0); }
.sp-handle{ width:52px; height:6px; border-radius:99px; background:var(--sb-ink); opacity:.35; margin:2px auto 14px; }
.sp-sheet-title{ display:flex; align-items:center; gap:12px; }
.sp-badge{ width:46px; height:46px; flex:0 0 auto; border-radius:13px; border:3px solid var(--sb-ink); background:var(--sdot,#fff);
  display:grid; place-items:center; box-shadow:2px 2px 0 0 var(--sb-ink); transform:rotate(-6deg); }
.sp-badge svg{ width:26px; height:26px; }
.sp-sheet-title h2{ font-family:var(--font-display); font-weight:700; font-size:clamp(1.7rem,7vw,2.3rem); margin:0; line-height:1; }
.sp-ideas{ list-style:none; margin:16px 0 0; padding:0; display:flex; flex-direction:column; gap:16px; }
.sp-ideas .q{ font-weight:800; font-size:1.1rem; line-height:1.4; display:flex; gap:11px; align-items:flex-start; }
.sp-ideas .q::before{ content:""; flex:0 0 auto; width:16px; height:16px; margin-top:4px; border-radius:5px; background:var(--sdot); border:2.5px solid var(--sb-ink); transform:rotate(12deg); }
.sp-ideas .b{ margin:6px 0 0 27px; font-weight:600; font-size:1.02rem; line-height:1.45; color:#3a352f; }
.sp-got{ appearance:none; margin-top:22px; width:100%; font-family:var(--font-display); font-weight:700; font-size:1.05rem; color:var(--sb-ink);
  background:transparent; border:3px solid var(--sb-ink); border-radius:14px; padding:13px; cursor:pointer; }
.sp-got:active{ background:var(--sb-ink); color:var(--sb-cream); }
@media (prefers-reduced-motion:reduce){ .sp *{transition-duration:.01ms !important} .sp-nudge,.sp-prompt{transform:none} }`;

export function PromptStarter({ starter }) {
  const [open, setOpen] = React.useState(null);
  const [shown, setShown] = React.useState('focusOn');
  const isFirstLine = starter.type === 'First line';

  const facets = React.useMemo(() => ({
    focusOn: toPairs(starter.focusOn), writingTips: toPairs(starter.writingTips), challenges: toPairs(starter.challenges),
  }), [starter]);

  React.useEffect(() => {
    document.documentElement.classList.add('sp-lock');
    document.documentElement.style.setProperty('--type-bg', 'var(--sb-wash-' + starter.tint + ')');
    const snippet = starter.prompt.length > 66 ? starter.prompt.slice(0, 66).trim() + '…' : starter.prompt;
    document.title = snippet + ' | Story Blocks starter';
    const onKey = (e) => { if (e.key === 'Escape') setOpen(null); };
    window.addEventListener('keydown', onKey);
    return () => { document.documentElement.classList.remove('sp-lock'); window.removeEventListener('keydown', onKey); };
  }, [starter]);

  const openFacet = (k) => { setShown(k); setOpen(k); };
  const items = facets[shown] || [];

  return (
    <React.Fragment>
      <style>{CSS}</style>
      <div className="sp">
        <header className="sp-head">
          <img className="sp-logo" src="/assets/blocks-publishing-logo.png" alt="Blocks Publishing" />
          <div className="sp-instruction">{starter.instruction}</div>
        </header>

        <div className="sp-middle">
          <div className="sp-prompt-wrap">
            <div className={'sp-prompt' + (isFirstLine ? ' sp-prompt--quote' : '')}>
              {isFirstLine && <span className="sp-quote" aria-hidden="true">&ldquo;</span>}
              {starter.prompt}
            </div>
          </div>
          <div className="sp-nudge-group">
            <div className="sp-nudge-label">Stuck? Tap a card for ideas</div>
            <div className="sp-nudges">
              {KEYS.map((k) => (
                <button key={k} type="button" className="sp-nudge" onClick={() => openFacet(k)}>
                  <span className="sp-nudge-ic" style={{ ['--nt']: NT[k] }} dangerouslySetInnerHTML={{ __html: IC[k] }} />
                  {LABEL[k]}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="sp-lower"><img className="sp-char" src={'/' + starter.image} alt="" aria-hidden="true" /></div>

        <div className="sp-actions">
          <a className="sp-action sp-action--print" href={'/' + starter.pdf} target="_blank" rel="noopener">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9V2h12v7"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8" rx="1"/></svg>
            Printable
          </a>
          <a className="sp-action sp-action--send" href="/contact">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round"><path d="M22 2 11 13"/><path d="M22 2 15 22l-4-9-9-4Z"/></svg>
            Send your story
          </a>
        </div>
      </div>

      <div className={'sp-scrim' + (open !== null ? ' on' : '')} onClick={() => setOpen(null)}></div>
      <section className={'sp-sheet' + (open !== null ? ' on' : '')} role="dialog" aria-modal="true" aria-label={LABEL[shown]}>
        <div className="sp-handle"></div>
        <div className="sp-sheet-title">
          <span className="sp-badge" style={{ ['--sdot']: NT[shown] }} dangerouslySetInnerHTML={{ __html: IC[shown] }} />
          <h2>{LABEL[shown]}</h2>
        </div>
        <ul className="sp-ideas" style={{ ['--sdot']: NT[shown] }}>
          {items.map((it, i) => (
            <li key={i}>
              <div className="q">{it.q}</div>
              {it.body && <div className="b">{it.body}</div>}
            </li>
          ))}
        </ul>
        <button type="button" className="sp-got" onClick={() => setOpen(null)}>Got it</button>
      </section>

      <StarterIntro image={starter.image} bg={'var(--sb-wash-' + starter.tint + ')'} />
    </React.Fragment>
  );
}
