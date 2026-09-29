/* Story Blocks - digital reward-sticker milestone pages.
   Reached by scanning a QR code on the reward chart (e.g. /stickers/15d475).
   The code's leading number is the milestone day (5, 10, 15 ... 60); each
   shows that day's die-cut sticker with a little confetti celebration and
   lets the child save/share it. */
import './lib/react-global.js';
import React from 'react';
import { createRoot } from 'react-dom/client';

const MILESTONES = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60];

function dayFromPath() {
  const m = window.location.pathname.match(/stickers\/(\d+)/i);
  const n = m ? parseInt(m[1], 10) : NaN;
  return MILESTONES.includes(n) ? n : null;
}

const REDUCED = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const CSS = `
html.stk-lock body { margin:0; background:#F9E25E; overflow-x:hidden; }
.stk-rays{ position:fixed; left:50%; top:50%; width:175vmax; height:175vmax; margin-left:-87.5vmax; margin-top:-87.5vmax;
  object-fit:cover; z-index:0; opacity:.55; pointer-events:none; animation:stk-spin 64s linear infinite; }
.stk{ position:relative; z-index:2; min-height:100vh; min-height:100dvh; max-width:540px; margin:0 auto;
  display:flex; flex-direction:column; align-items:center; text-align:center; color:var(--sb-ink);
  padding:clamp(20px,5vw,32px); padding-block:clamp(22px,5vh,34px); }
.stk-top{ width:100%; max-width:460px; }
.stk-top img{ width:100%; height:auto; display:block; }
.stk-body{ flex:1; width:100%; display:flex; flex-direction:column; align-items:center; justify-content:center; }
.stk-stage{ position:relative; display:flex; align-items:center; justify-content:center; padding:4px 0; }
.stk-sticker{ width:clamp(190px,56vw,310px); height:auto; filter:drop-shadow(0 12px 16px rgba(35,31,32,.16));
  animation:stk-pop .6s cubic-bezier(.34,1.6,.6,1) both, stk-bob 4.2s ease-in-out .6s infinite; }
.stk-days{ font-family:var(--font-display); font-weight:700; font-size:clamp(2.6rem,13vw,4rem); line-height:1; margin-top:8px; }
.stk-share{ font-family:var(--font-display); font-weight:600; font-size:1.15rem; color:#8a7a28; margin-top:10px; }
.stk-save{ appearance:none; margin-top:16px; cursor:pointer; font-family:var(--font-body); font-weight:800;
  font-size:1.1rem; color:var(--sb-ink); background:#fff; border:3.5px solid var(--sb-ink); border-radius:16px;
  box-shadow:4px 5px 0 0 var(--sb-ink); padding:14px 26px; display:inline-flex; align-items:center; gap:10px;
  transition:transform .14s ease, box-shadow .14s ease; }
.stk-save:active{ transform:translate(2px,3px); box-shadow:1px 2px 0 0 var(--sb-ink); }
.stk-save svg{ width:20px; height:20px; }
.stk-foot{ margin-top:18px; font-weight:700; font-size:.9rem; }
.stk-foot a{ color:var(--sb-blue); font-weight:800; }
@keyframes stk-spin{ to{ transform:rotate(360deg); } }
@keyframes stk-pop{ 0%{ opacity:0; transform:scale(.55) rotate(-6deg); } 100%{ opacity:1; transform:scale(1) rotate(0); } }
@keyframes stk-bob{ 0%,100%{ transform:translateY(0) rotate(-1.5deg); } 50%{ transform:translateY(-12px) rotate(1.5deg); } }
@media (prefers-reduced-motion:reduce){ .stk-rays{ animation:none; } .stk-sticker{ animation:none; } }`;

/* ---- confetti / fireworks burst on arrival ---- */
function Confetti({ fireKey }) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (REDUCED) return;
    const canvas = ref.current; const ctx = canvas.getContext('2d');
    const COLORS = ['#FDCD2A', '#4368B0', '#F59DB2', '#BDDC94', '#AFB6DC', '#F9A67D', '#8ECFE8', '#fff'];
    let W, H, dpr;
    const resize = () => { dpr = Math.min(2, window.devicePixelRatio || 1); W = canvas.width = innerWidth * dpr; H = canvas.height = innerHeight * dpr; canvas.style.width = innerWidth + 'px'; canvas.style.height = innerHeight + 'px'; };
    resize(); window.addEventListener('resize', resize);
    const parts = [];
    const burst = (cx, cy, n) => {
      for (let i = 0; i < n; i++) {
        const a = Math.random() * Math.PI * 2, sp = (4 + Math.random() * 8) * dpr;
        parts.push({ x: cx, y: cy, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp - 5 * dpr, g: 0.16 * dpr,
          w: (6 + Math.random() * 6) * dpr, h: (9 + Math.random() * 9) * dpr, rot: Math.random() * 6.28,
          vr: (Math.random() - 0.5) * 0.35, c: COLORS[(Math.random() * COLORS.length) | 0], life: 0, max: 95 + Math.random() * 55 });
      }
    };
    burst(W * 0.5, H * 0.42, 110);
    const t1 = setTimeout(() => burst(W * 0.26, H * 0.5, 70), 240);
    const t2 = setTimeout(() => burst(W * 0.74, H * 0.5, 70), 460);
    let raf;
    const tick = () => {
      ctx.clearRect(0, 0, W, H);
      for (let i = parts.length - 1; i >= 0; i--) {
        const p = parts[i]; p.vy += p.g; p.vx *= 0.99; p.x += p.vx; p.y += p.vy; p.rot += p.vr; p.life++;
        if (p.life >= p.max || p.y > H + 40) { parts.splice(i, 1); continue; }
        ctx.save(); ctx.globalAlpha = Math.max(0, 1 - p.life / p.max); ctx.translate(p.x, p.y); ctx.rotate(p.rot);
        ctx.fillStyle = p.c; ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h); ctx.restore();
      }
      if (parts.length) raf = requestAnimationFrame(tick); else ctx.clearRect(0, 0, W, H);
    };
    tick();
    return () => { cancelAnimationFrame(raf); clearTimeout(t1); clearTimeout(t2); window.removeEventListener('resize', resize); };
  }, [fireKey]);
  return <canvas ref={ref} aria-hidden="true" style={{ position: 'fixed', inset: 0, zIndex: 50, pointerEvents: 'none' }} />;
}

function SavedToast({ show }) {
  return <div aria-live="polite" style={{ position: 'fixed', left: '50%', bottom: 22, transform: 'translateX(-50%) translateY(' + (show ? '0' : '20px') + ')', opacity: show ? 1 : 0, transition: 'opacity .25s ease, transform .25s ease', background: 'var(--sb-ink)', color: '#fff', fontWeight: 800, fontSize: '.95rem', padding: '11px 18px', borderRadius: 999, pointerEvents: 'none', zIndex: 90 }}>Sticker saved! 🎉</div>;
}

function Milestone({ day }) {
  const [toast, setToast] = React.useState(false);
  const [fireKey, setFireKey] = React.useState(0);

  React.useEffect(() => {
    document.documentElement.classList.add('stk-lock');
    document.title = day + ' days | Story Blocks Journal';
    return () => document.documentElement.classList.remove('stk-lock');
  }, [day]);

  const save = React.useCallback(async () => {
    const url = '/assets/stickers/share-' + day + '.png';
    const filename = 'story-blocks-' + day + '-days.png';
    try {
      if (navigator.canShare) {
        const blob = await (await fetch(url)).blob();
        const file = new File([blob], filename, { type: 'image/png' });
        if (navigator.canShare({ files: [file] })) {
          await navigator.share({ files: [file], title: 'Story Blocks sticker unlocked!', text: day + ' days of writing - keep going!' });
          return;
        }
      }
    } catch (err) { if (err && err.name === 'AbortError') return; }
    const a = document.createElement('a');
    a.href = url; a.download = filename;
    document.body.appendChild(a); a.click(); a.remove();
    setToast(true);
    setFireKey((k) => k + 1); // little extra celebration
    setTimeout(() => setToast(false), 2600);
  }, [day]);

  return (
    <React.Fragment>
      <style>{CSS}</style>
      <img className="stk-rays" src="/assets/stickers/sunburst.png" alt="" aria-hidden="true" />

      <main className="stk">
        <div className="stk-top">
          <img src="/assets/stickers/header.png" alt="New sticker! Story Blocks Journal" />
        </div>

        <div className="stk-body">
          <div className="stk-stage">
            <img className="stk-sticker" src={'/assets/stickers/sticker-' + day + '.png'} alt={day + '-day reward sticker'} />
          </div>
          <div className="stk-days">{day} days</div>
          <div className="stk-share">Share the good news!</div>
          <button type="button" className="stk-save" onClick={save}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-6"/><path d="M12 3v12"/><path d="m7 10 5 5 5-5"/></svg>
            Save sticker
          </button>
        </div>

        <div className="stk-foot">Part of the <a href="/">Story Blocks Journal</a></div>
      </main>

      <Confetti fireKey={fireKey} />
      <SavedToast show={toast} />
    </React.Fragment>
  );
}

function NotFound() {
  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: 24, fontFamily: 'var(--font-body)', color: 'var(--sb-ink)' }}>
      <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.8rem' }}>Hmm, no sticker here</div>
      <p style={{ marginTop: 10, maxWidth: 360, lineHeight: 1.5, fontWeight: 600 }}>
        Scan a reward-chart QR code to unlock your sticker, or head to <a href="/" style={{ color: 'var(--sb-blue)', fontWeight: 800 }}>the journal</a>.
      </p>
    </main>
  );
}

const day = dayFromPath();
createRoot(document.getElementById('root')).render(day ? <Milestone day={day} /> : <NotFound />);
