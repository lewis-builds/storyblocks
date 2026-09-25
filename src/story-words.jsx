/* Full-screen "three words" story-starter experience (/story-starters/sbNN-w).
   Tap a word to reveal its sparks + ideas. Content comes from the shared
   word library; each starter just supplies its three words. */
import React from 'react';
import LIB from './lib/word-sparks.json';

const TINTS = ['var(--sb-wash-peach)', 'var(--sb-wash-sky)', 'var(--sb-wash-pink)'];
const SHEETS = ['#FDF2E9', '#EAF5FB', '#FDEDF3'];

function fallback(word) {
  const w = word.toLowerCase();
  return {
    spark: 'Where could "' + word + '" take your story? Follow the first idea that pops into your head.',
    ideas: ['What does ' + w + ' make you picture first?', 'Who in your story would notice it - and why?', 'What happens right after it appears?'],
  };
}

const CSS = `
html.sw-lock, html.sw-lock body { height:100%; overflow:hidden; }
html.sw-lock body { margin:0; background:var(--sb-wash-green); }
.sw{ height:100%; max-width:520px; margin:0 auto; display:flex; flex-direction:column;
  padding:clamp(16px,4vw,26px); padding-block:clamp(18px,5vh,34px); gap:12px; color:var(--sb-ink);
  background:radial-gradient(rgba(35,31,32,.055) 1.5px, transparent 1.6px) 0 0/22px 22px, var(--sb-wash-green); }
.sw-head{ text-align:center; }
.sw-logo{ display:block; width:clamp(79px,23vw,104px); height:auto; margin:0 auto; }
.sw-instruction{ font-family:var(--font-display); font-weight:700; font-size:clamp(1.5rem,6.6vw,2.1rem);
  line-height:1.12; margin:28px auto 0; max-width:42ch; text-wrap:balance; }
.sw-words{ flex:1; display:flex; flex-direction:column; align-items:center; justify-content:space-evenly;
  gap:clamp(12px,3vh,22px); padding:clamp(14px,3.5vh,30px) 0; }
.sw-word{ appearance:none; font-family:var(--font-display); font-weight:700; letter-spacing:.01em; color:var(--sb-ink);
  background:#fff; border:3.5px solid var(--sb-ink); border-radius:20px; box-shadow:7px 8px 0 0 var(--sb-ink);
  padding:clamp(16px,3.6vh,26px) clamp(26px,9vw,46px); font-size:clamp(2.1rem,10.5vw,3.3rem); line-height:.98;
  cursor:pointer; position:relative; display:inline-flex; align-items:center; will-change:transform;
  transition:transform .16s cubic-bezier(.34,1.56,.5,1), box-shadow .16s ease; animation:sw-bob 5s ease-in-out infinite; }
.sw-word:nth-child(1){ --tilt:-9deg; --nudge:-18%; animation-delay:-.3s; }
.sw-word:nth-child(2){ --tilt:6.5deg; --nudge:18%; animation-delay:-1.9s; }
.sw-word:nth-child(3){ --tilt:-4deg; --nudge:-9%; animation-delay:-3.2s; }
@keyframes sw-bob{ 0%,100%{ transform:rotate(var(--tilt)) translate(var(--nudge,0),0); } 50%{ transform:rotate(var(--tilt)) translate(var(--nudge,0),-7px); } }
.sw-word:active{ transform:rotate(var(--tilt)) translate(var(--nudge,0),0) scale(.95); box-shadow:3px 4px 0 0 var(--sb-ink); animation-play-state:paused; }
.sw-word::after{ content:""; position:absolute; top:-11px; right:16px; width:26px; height:26px; border-radius:50%; background:var(--dot); border:3px solid var(--sb-ink); }
.sw-hint{ text-align:center; font-family:var(--font-marker); color:#8a7f6a; font-size:1.15rem; display:flex; align-items:center; justify-content:center; gap:8px; }
.sw-hint svg{ width:20px; height:20px; }
.sw-actions{ display:flex; gap:11px; }
.sw-action{ flex:1; min-width:0; cursor:pointer; text-decoration:none; font-family:var(--font-body); font-weight:800;
  font-size:1rem; color:var(--sb-ink); border:3.5px solid var(--sb-ink); border-radius:15px; box-shadow:4px 5px 0 0 var(--sb-ink);
  padding:14px 10px; display:flex; align-items:center; justify-content:center; gap:9px; text-align:center; line-height:1.1;
  transition:transform .14s ease, box-shadow .14s ease; }
.sw-action--print{ background:#fff; }
.sw-action--send{ background:var(--sb-yellow); }
.sw-action:active{ transform:translate(2px,3px); box-shadow:1px 2px 0 0 var(--sb-ink); }
.sw-action svg{ width:21px; height:21px; flex:0 0 auto; }
.sw-scrim{ position:fixed; inset:0; background:rgba(33,28,25,.42); backdrop-filter:blur(3px); -webkit-backdrop-filter:blur(3px);
  opacity:0; pointer-events:none; transition:opacity .28s ease; z-index:60; }
.sw-scrim.on{ opacity:1; pointer-events:auto; }
.sw-sheet{ position:fixed; left:0; right:0; bottom:0; z-index:61; max-width:520px; margin:0 auto; background:var(--sheet,#fff);
  border:3.5px solid var(--sb-ink); border-bottom:none; border-radius:26px 26px 0 0;
  padding:14px clamp(20px,6vw,28px) calc(24px + env(safe-area-inset-bottom,0px)); transform:translateY(110%);
  transition:transform .4s cubic-bezier(.22,1,.36,1); max-height:82vh; overflow-y:auto; }
.sw-sheet.on{ transform:translateY(0); }
.sw-handle{ width:52px; height:6px; border-radius:99px; background:var(--sb-ink); opacity:.35; margin:2px auto 14px; }
.sw-sheet-word{ font-family:var(--font-display); font-weight:700; font-size:clamp(1.9rem,8vw,2.6rem); margin:0; line-height:1; }
.sw-spark{ font-size:1.16rem; line-height:1.42; font-weight:700; margin:16px 0 4px; }
.sw-ideas{ list-style:none; margin:14px 0 0; padding:0; display:flex; flex-direction:column; gap:12px; }
.sw-ideas li{ display:flex; gap:12px; align-items:flex-start; line-height:1.45; font-size:1.04rem; font-weight:600; }
.sw-ideas li::before{ content:""; flex:0 0 auto; width:16px; height:16px; margin-top:3px; border-radius:5px; background:var(--dot); border:2.5px solid var(--sb-ink); transform:rotate(12deg); }
.sw-got{ appearance:none; margin-top:22px; width:100%; font-family:var(--font-display); font-weight:700; font-size:1.05rem;
  color:var(--sb-ink); background:transparent; border:3px solid var(--sb-ink); border-radius:14px; padding:13px; cursor:pointer;
  display:flex; align-items:center; justify-content:center; gap:8px; }
.sw-got:active{ background:var(--sb-ink); color:var(--sb-cream); }
@media (prefers-reduced-motion:reduce){
  .sw-word{ animation:none; transform:rotate(var(--tilt)) translate(var(--nudge,0),0); }
  .sw-word:active{ transform:rotate(var(--tilt)) translate(var(--nudge,0),0) scale(.97); }
  .sw *{ transition-duration:.01ms !important; }
}`;

export function WordSparks({ starter }) {
  const words = React.useMemo(() => starter.prompt.split(',').map((w) => w.trim()).filter(Boolean), [starter]);
  const [open, setOpen] = React.useState(null);   // which word is currently open (null = closed)
  const [shown, setShown] = React.useState(0);     // last word shown (keeps sheet content during slide-out)

  React.useEffect(() => {
    document.documentElement.classList.add('sw-lock');
    document.title = words.join(', ') + ' | Story Blocks starter';
    const onKey = (e) => { if (e.key === 'Escape') setOpen(null); };
    window.addEventListener('keydown', onKey);
    return () => { document.documentElement.classList.remove('sw-lock'); window.removeEventListener('keydown', onKey); };
  }, [words]);

  const openWord = (i) => { setShown(i); setOpen(i); };
  const data = LIB[words[shown] ? words[shown].toLowerCase() : ''] || fallback(words[shown] || '');
  const tint = TINTS[shown % 3];

  return (
    <React.Fragment>
      <style>{CSS}</style>

      <div className="sw">
        <header className="sw-head">
          <img className="sw-logo" src="/assets/blocks-publishing-logo.png" alt="Blocks Publishing" />
          <h1 className="sw-instruction">Include these three words in a short story...</h1>
        </header>

        <div className="sw-words">
          {words.map((w, i) => (
            <button key={w + i} type="button" className="sw-word" style={{ ['--dot']: TINTS[i % 3] }}
              aria-haspopup="dialog" onClick={() => openWord(i)}>{w}</button>
          ))}
        </div>

        <div className="sw-hint">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M9.94 15.5A2 2 0 0 0 8.5 14.06l-6.14-1.58a.5.5 0 0 1 0-.96L8.5 9.94A2 2 0 0 0 9.94 8.5l1.58-6.14a.5.5 0 0 1 .96 0L14.06 8.5A2 2 0 0 0 15.5 9.94l6.14 1.58a.5.5 0 0 1 0 .96L15.5 14.06a2 2 0 0 0-1.44 1.44l-1.58 6.14a.5.5 0 0 1-.96 0z"/></svg>
          Tap a word for ideas
        </div>

        <div className="sw-actions">
          <a className="sw-action sw-action--print" href={'/' + starter.pdf} target="_blank" rel="noopener">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9V2h12v7"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8" rx="1"/></svg>
            Printable
          </a>
          <a className="sw-action sw-action--send" href="/contact">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round"><path d="M22 2 11 13"/><path d="M22 2 15 22l-4-9-9-4Z"/></svg>
            Send your story
          </a>
        </div>
      </div>

      <div className={'sw-scrim' + (open !== null ? ' on' : '')} onClick={() => setOpen(null)}></div>
      <section className={'sw-sheet' + (open !== null ? ' on' : '')} style={{ ['--sheet']: SHEETS[shown % 3], ['--dot']: tint }}
        role="dialog" aria-modal="true" aria-label={words[shown]}>
        <div className="sw-handle"></div>
        <div className="sw-sheet-head"><h2 className="sw-sheet-word">{words[shown]}</h2></div>
        <p className="sw-spark">{data.spark}</p>
        <ul className="sw-ideas">{data.ideas.map((t, k) => <li key={k}>{t}</li>)}</ul>
        <button type="button" className="sw-got" onClick={() => setOpen(null)}>
          Got it
          <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 18, height: 18 }}><path d="M9.94 15.5A2 2 0 0 0 8.5 14.06l-6.14-1.58a.5.5 0 0 1 0-.96L8.5 9.94A2 2 0 0 0 9.94 8.5l1.58-6.14a.5.5 0 0 1 .96 0L14.06 8.5A2 2 0 0 0 15.5 9.94l6.14 1.58a.5.5 0 0 1 0 .96L15.5 14.06a2 2 0 0 0-1.44 1.44l-1.58 6.14a.5.5 0 0 1-.96 0z"/></svg>
        </button>
      </section>
    </React.Fragment>
  );
}
