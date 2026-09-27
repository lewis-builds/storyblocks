/* Story Blocks - Free resources page (email-gated printable pack) */
import './lib/react-global.js';
import './lib/image-slot.js';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { asset, CHAR_BASE } from './lib/core.js';
import { SiteHeader, SiteFooter } from './sections.jsx';

const ResDS = window.StoryBlocksJournalDesignSystem_239fa7;
const { Button: ResButton, Badge: ResBadge, Input: ResInput, Checkbox: ResCheckbox } = ResDS;

const RES_KEY = 'sb_resources_unlocked_email';

/* ---------------- Header - shared SiteHeader from sections.jsx ---------------- */

/* ---------------- Email gate ---------------- */
function EmailGate({ onUnlock }) {
  const [email, setEmail] = React.useState('');
  const [consent, setConsent] = React.useState(false);
  const [errors, setErrors] = React.useState({});

  const submit = () => {
    const e = {};
    if (!/^\S+@\S+\.\S+$/.test(email)) e.email = 'Please enter a valid email address';
    if (!consent) e.consent = 'Please tick the box so we can send you the pack';
    setErrors(e);
    if (Object.keys(e).length === 0) {
      try { localStorage.setItem(RES_KEY, email); } catch (err) {}
      onUnlock(email);
    }
  };

  return (
    <div style={{ background: 'var(--sb-paper)', border: '4px solid var(--sb-ink)', borderRadius: 26, boxShadow: 'var(--shadow-pop-lg)', padding: 28 }}>
      <ResBadge variant="yellow" tilt={false}>Free printable pack</ResBadge>
      <h2 className="sb-display" style={{ fontSize: '1.6rem', marginTop: 12, lineHeight: 1.1 }}>Pop in your email to unlock the pack</h2>
      <p style={{ marginTop: 10, lineHeight: 1.55, color: 'var(--sb-muted)', fontWeight: 600 }}>
        For parents, guardians and teachers. We'll open the downloads right here and send you a copy by email too.
      </p>
      <div style={{ display: 'grid', gap: 14, marginTop: 18 }}>
        <ResInput label="Your email" type="email" placeholder="e.g. jo@example.co.uk" value={email}
          onChange={(e) => setEmail(e.target.value)} error={errors.email} />
        <div>
          <ResCheckbox checked={consent} onChange={(e) => setConsent(e.target.checked)}
            label="Yes - email me the free pack and occasional Story Blocks news. I can unsubscribe any time." />
          {errors.consent && <div style={{ color: 'var(--sb-blue)', fontWeight: 700, fontSize: '.9rem', marginTop: 6 }}>{errors.consent}</div>}
        </div>
        <ResButton size="lg" block iconRight="→" onClick={submit}>Unlock my free pack</ResButton>
        <p style={{ fontSize: '.85rem', color: 'var(--sb-muted)', fontWeight: 600, lineHeight: 1.5 }}>
          We treat your details with care, in line with UK GDPR. We'll never sell your data, and every email
          includes a one-click unsubscribe. See our <a href="#" style={{ color: 'var(--sb-blue)', fontWeight: 800 }}>privacy policy</a>.
        </p>
      </div>
    </div>
  );
}

/* ---------------- Unlocked downloads ---------------- */
function Downloads({ onReset }) {
  return (
    <div>
      <ResBadge variant="green" tilt={false}>Unlocked</ResBadge>
      <div style={{ background: 'var(--sb-wash-lemon)', border: '3px solid var(--sb-ink)', borderRadius: 22, boxShadow: 'var(--shadow-pop)', padding: 26, marginTop: 18, display: 'flex', flexDirection: 'column' }}>
        <img src={asset(CHAR_BASE + '/SB10.png')} alt="" style={{ width: 80 }} />
        <h3 className="sb-display" style={{ fontSize: '1.4rem', marginTop: 12 }}>Your free starter pack</h3>
        <p style={{ marginTop: 8, lineHeight: 1.55 }}>Three story starters - three words, an object and a scenario - plus the reward chart, all in one printable PDF. Print them out and give ten-minute stories a try.</p>
        <div style={{ marginTop: 18 }}>
          <ResButton as="a" href="/Story-Blocks-Starter-Pack.pdf" download iconRight="↓">Download the pack</ResButton>
        </div>
      </div>
      <p style={{ marginTop: 16, fontSize: '.9rem', color: 'var(--sb-muted)', fontWeight: 600 }}>
        Wrong email? <button onClick={onReset} style={{ background: 'none', border: 0, padding: 0, font: 'inherit', fontWeight: 800, color: 'var(--sb-blue)', cursor: 'pointer', textDecoration: 'underline' }}>Start again</button>
      </p>
    </div>
  );
}

/* ---------------- Page ---------------- */
function ResourcesApp() {
  const [email, setEmail] = React.useState(() => {
    try { return localStorage.getItem(RES_KEY) || null; } catch (err) { return null; }
  });
  const reset = () => {
    try { localStorage.removeItem(RES_KEY); } catch (err) {}
    setEmail(null);
  };
  return (
    <React.Fragment>
      <SiteHeader active="resources" />
      <main>
        <section style={{ position: 'relative', overflow: 'hidden', background: 'var(--sb-wash-sky)', borderBottom: '3px solid var(--sb-ink)' }}>
          <div className="sb-wrap sb-res-hero" style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1.05fr) minmax(0,1fr)', gap: 56, alignItems: 'center', padding: '64px 24px 72px' }}>
            <div>
              <div className="sb-marker" style={{ fontSize: '1.5rem', color: 'var(--sb-blue)' }}>Free resources</div>
              <h1 className="sb-display" style={{ fontSize: 'clamp(2.2rem, 4.6vw, 3.4rem)', lineHeight: 1.05, marginTop: 8 }}>Try a taste of Story Blocks - free to print.</h1>
              <p style={{ marginTop: 16, fontSize: '1.15rem', lineHeight: 1.55, maxWidth: 500 }}>
                A pack of printable story starters and the Story Blocks reward chart - a taste of
                ten-minute stories at home or in class. No journal required.
              </p>
            </div>
            <div>
              {email
                ? <Downloads email={email} onReset={reset} />
                : <EmailGate onUnlock={setEmail} />}
            </div>
          </div>
        </section>

        {/* what's in the pack */}
        <section style={{ padding: '64px 0 84px' }}>
          <div className="sb-wrap">
            <div style={{ textAlign: 'center', maxWidth: 640, margin: '0 auto' }}>
              <div className="sb-marker" style={{ fontSize: '1.3rem', color: 'var(--sb-blue)' }}>What's in the pack…</div>
              <h2 className="sb-display" style={{ fontSize: 'clamp(1.8rem, 3.4vw, 2.4rem)', marginTop: 8, lineHeight: 1.1 }}>Three starters and a chart to tick</h2>
              <p style={{ marginTop: 14, fontSize: '1.1rem', lineHeight: 1.6 }}>
                A taste of three starter types - three words, an object and a scenario - plus the
                reward chart from the journal. If they love it, <a href="/" style={{ color: 'var(--sb-blue)', fontWeight: 800 }}>the journal</a> has
                70+ story starters across all four types.
              </p>
            </div>

            {/* pack shot */}
            <figure style={{ margin: '44px auto 0', maxWidth: 820, background: '#fff', border: '3px solid var(--sb-ink)', borderRadius: 14, boxShadow: 'var(--shadow-pop)', padding: '12px 12px 14px', transform: 'rotate(-1deg)' }}>
              <img src={asset('assets/resources-free-pack.jpg')} alt="The free Story Blocks starter pack - three printable story starters and the reward chart" style={{ width: '100%', height: 'auto', display: 'block', borderRadius: 8 }} />
              <figcaption className="sb-marker" style={{ fontSize: '1.15rem', textAlign: 'center', marginTop: 10 }}>The free pack - story starters & reward chart</figcaption>
            </figure>
          </div>
        </section>
      </main>
      <SiteFooter />
    </React.Fragment>
  );
}

createRoot(document.getElementById('root')).render(<ResourcesApp />);
