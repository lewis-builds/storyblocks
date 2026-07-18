/* Story Blocks - The Parents' Corner. Free online library for journal owners,
   unlocked with the access code that comes with the journal. The code itself is
   checked server-side by /api/unlock so it never ships in this bundle. */
import './lib/react-global.js';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { asset, CHAR_BASE } from './lib/core.js';
import { PageShell } from './lib/page-shell.jsx';

const { Button, Input } = window.StoryBlocksJournalDesignSystem_239fa7;
const UNLOCK_KEY = 'sb_parents_unlocked';

/* The library itself. Drop the real PDFs into /public and keep these filenames
   (or update them here) - each one is a direct download. */
const RESOURCES = [
  {
    char: 'SB10', tint: 'var(--sb-wash-lemon)',
    title: 'Printable story starters',
    body: 'Fresh three-word prompts, objects, scenarios and first lines to print, cut out and pull from a jar. New sets added through the year.',
    file: 'Story-Blocks-Story-Starters.pdf',
  },
  {
    char: 'SB44', tint: 'var(--sb-wash-pink)',
    title: 'Extra reward charts',
    body: 'Run out of squares to tick? Print another chart any time - plus seasonal ones to keep the streak feeling new.',
    file: 'Story-Blocks-Reward-Chart.pdf',
  },
  {
    char: 'SB33', tint: 'var(--sb-wash-sky)',
    title: 'Guides for grown-ups',
    body: 'Short, practical reads: helping a reluctant writer, what to say (and what not to say), and how to keep ten minutes a day going.',
    file: 'Story-Blocks-Parent-Guides.pdf',
  },
];

/* ---------------- The gate (hero) ---------------- */
function AccessGate({ onUnlock }) {
  const [code, setCode] = React.useState('');
  const [error, setError] = React.useState('');
  const [busy, setBusy] = React.useState(false);

  const submit = async () => {
    if (!code.trim()) { setError('Please enter your access code'); return; }
    setBusy(true);
    setError('');
    try {
      const res = await fetch('/api/unlock', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: code.trim() }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.ok) {
        try { localStorage.setItem(UNLOCK_KEY, '1'); } catch (err) {}
        onUnlock();
        return;
      }
      setError(data.error || 'That code doesn’t look right.');
    } catch (err) {
      setError('We couldn’t check that code just now. Please try again in a moment.');
    }
    setBusy(false);
  };

  return (
    <div className="panel" style={{ maxWidth: 520, marginTop: 26 }}>
      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.35rem', margin: 0 }}>Got your journal? Pop in your code.</h2>
      <p className="muted" style={{ margin: '8px 0 16px', fontSize: '.95rem', lineHeight: 1.5 }}>
        You’ll find it on the card inside the front cover.
      </p>
      <div style={{ display: 'grid', gap: 14 }}>
        <Input label="Access code" placeholder="e.g. STORYBLOCKS" value={code}
          onChange={(e) => { setCode(e.target.value); if (error) setError(''); }}
          onKeyDown={(e) => { if (e.key === 'Enter') submit(); }}
          error={error} />
        <Button size="lg" block iconRight={busy ? null : '→'} onClick={submit} disabled={busy}>
          {busy ? 'Checking…' : 'Unlock the Parents’ Corner'}
        </Button>
        <p className="muted" style={{ margin: 0, fontSize: '.86rem', lineHeight: 1.5 }}>
          No journal yet? <a href="/">Grab one here</a> - the code comes with it.
        </p>
      </div>
    </div>
  );
}

/* ---------------- Unlocked confirmation (hero) ---------------- */
function UnlockedBanner({ onLock }) {
  return (
    <div className="panel" style={{ maxWidth: 520, marginTop: 26, display: 'flex', alignItems: 'center', gap: 16 }}>
      <img src={asset(CHAR_BASE + '/SB44.png')} alt="" className="sb-float" style={{ width: 64, flexShrink: 0 }} />
      <div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', margin: 0 }}>You’re in! 🎉</h2>
        <p className="muted" style={{ margin: '4px 0 0', fontSize: '.95rem', lineHeight: 1.5 }}>
          Everything below is yours. <button onClick={onLock} style={{ background: 'none', border: 0, padding: 0, font: 'inherit', fontWeight: 800, color: 'var(--sb-blue)', cursor: 'pointer', textDecoration: 'underline' }}>Not your device?</button>
        </p>
      </div>
    </div>
  );
}

/* ---------------- The library (unlocked) ---------------- */
function Library() {
  return (
    <React.Fragment>
      <h2>Your printables & guides</h2>
      <div className="parents-grid">
        {RESOURCES.map((r) => (
          <div key={r.title} style={{ background: r.tint, border: '3px solid var(--sb-ink)', borderRadius: 22, boxShadow: 'var(--shadow-pop)', padding: 24, display: 'flex', flexDirection: 'column' }}>
            <img src={asset(CHAR_BASE + '/' + r.char + '.png')} alt="" style={{ width: 72 }} />
            <h3 style={{ marginTop: 10 }}>{r.title}</h3>
            <p style={{ marginTop: 8, flex: 1 }}>{r.body}</p>
            <div style={{ marginTop: 16 }}>
              <Button as="a" href={r.file} download iconRight="↓">Download</Button>
            </div>
          </div>
        ))}
      </div>
    </React.Fragment>
  );
}

/* ---------------- Page ---------------- */
function Parents() {
  const [unlocked, setUnlocked] = React.useState(() => {
    try { return localStorage.getItem(UNLOCK_KEY) === '1'; } catch (err) { return false; }
  });

  const lock = () => {
    try { localStorage.removeItem(UNLOCK_KEY); } catch (err) {}
    setUnlocked(false);
  };

  const steps = [
    { char: 'SB16', tint: 'var(--sb-wash-lemon)', title: 'Buy from our website', body: 'Order a journal here on blockspublishing.com - that’s where the access codes come from. Journals from other shops don’t include one.' },
    { char: 'SB50', tint: 'var(--sb-wash-sky)', title: 'Find your code', body: 'It’s on the card inside the front cover of every journal.' },
    { char: 'SB44', tint: 'var(--sb-wash-pink)', title: 'Unlock it, for good', body: 'Enter it once here and the Corner stays open on this device. Free forever - no subscription.' },
  ];

  return (
    <PageShell active="parents" wash="purple" kicker="The Parents’ Corner"
      title="Everything you need to cheer them on"
      intro="A free online corner for the grown-ups - printables, extra reward charts, and short guides on helping a young writer find their feet. It’s included free with every journal bought on our website; your access code comes tucked inside."
      heroChildren={unlocked ? <UnlockedBanner onLock={lock} /> : <AccessGate onUnlock={() => setUnlocked(true)} />}>

      {unlocked && <Library />}

      <h2>What’s included</h2>
      <p>The Corner is our way of staying useful long after the journal lands on the doormat. It’s all
        free with your journal, and it grows - we add new printables and guides through the year.</p>
      <ul>
        <li><strong>Printable story starters</strong> - fresh prompts to print, cut out and pull from a jar when the journal’s done for the day.</li>
        <li><strong>Extra reward charts</strong> - print another any time, including seasonal ones.</li>
        <li><strong>Guides for grown-ups</strong> - helping a reluctant writer, what to say and what not to say, and how to keep the habit going when motivation dips.</li>
        <li><strong>Sticker sheets to reprint</strong> - because they always run out of the good ones first.</li>
      </ul>

      <h2>How it works</h2>
      <div className="parents-steps">
        {steps.map((s) => (
          <div key={s.title} style={{ background: s.tint, border: '3px solid var(--sb-ink)', borderRadius: 20, boxShadow: 'var(--shadow-pop)', padding: '22px 20px' }}>
            <img src={asset(CHAR_BASE + '/' + s.char + '.png')} alt="" style={{ width: 64 }} />
            <h3 style={{ marginTop: 8 }}>{s.title}</h3>
            <p style={{ marginBottom: 0 }}>{s.body}</p>
          </div>
        ))}
      </div>

      {!unlocked && (
        <div className="callout" style={{ marginTop: 32 }}>
          <p><strong>No journal yet?</strong> Every Story Blocks Journal bought on our website comes
            with a code for the Corner - along with 70+ story starters, a sticker sheet and a reward
            chart. <a href="/">See the journal →</a></p>
        </div>
      )}

      <p className="muted" style={{ marginTop: 28, fontSize: '.9rem' }}>
        Trouble with your code? <a href="/contact">Get in touch</a> and we’ll sort it out.
      </p>
    </PageShell>
  );
}

createRoot(document.getElementById('root')).render(<Parents />);
