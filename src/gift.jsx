/* Story Blocks - Gift a journal */
import './lib/react-global.js';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { asset, CHAR_BASE } from './lib/core.js';
import { PageShell } from './lib/page-shell.jsx';

const { Button } = window.StoryBlocksJournalDesignSystem_239fa7;

function Gift() {
  const steps = [
    { char: 'SB10', tint: 'var(--sb-wash-lemon)', title: 'Pick the edition', body: 'The Standard journal makes a lovely gift; the Gold Edition adds a gold-foil cover - made for giving.' },
    { char: 'SB33', tint: 'var(--sb-wash-sky)', title: 'Send it their way', body: 'Have it delivered to you to wrap, or straight to them. Free UK mainland postage either way.' },
    { char: 'SB44', tint: 'var(--sb-wash-pink)', title: 'Watch them start', body: 'Three words and a friendly question, and they’re off. The free Parents’ Corner helps the grown-ups cheer them on.' },
  ];
  return (
    <PageShell active={null} wash="pink" kicker="Gift a journal"
      title="The present that gets them writing"
      intro="A year of story sparks, a sticker sheet, a reward chart and a keepsake to fill - it’s the gift that keeps unfolding long after the wrapping's off.">

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)', gap: 40, alignItems: 'center' }} className="gift-grid">
        <div>
          <h2>Why it makes a good gift</h2>
          <ul>
            <li><strong>Not another screen.</strong> Ten quiet minutes of storytelling, not scrolling.</li>
            <li><strong>Made to keep.</strong> Printed and bound in Britain - a keepsake by the time it's full.</li>
            <li><strong>The Gold Edition</strong> adds a gold-foil cover - the one people buy as a present.</li>
            <li><strong>Grown-ups included.</strong> Every journal comes with free <a href="parents.html">Parents’ Corner</a> access - printables and guides to help them cheer the writing on.</li>
          </ul>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 22 }}>
            <Button as="a" href="index.html" size="lg" iconRight="→">Choose a journal</Button>
            <Button as="a" href="index.html" size="lg" variant="white">See the Gold Edition</Button>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', position: 'relative' }}>
          <img src={asset('assets/storyblocks-gold-book.png')} alt="The Gold Edition of the Story Blocks Journal"
            style={{ width: 'min(320px, 82%)', borderRadius: 10, border: '3px solid var(--sb-ink)', boxShadow: 'var(--shadow-pop-lg)', transform: 'rotate(2deg)' }} />
        </div>
      </div>

      <h2 style={{ marginTop: 8 }}>How gifting works</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0,1fr))', gap: 20 }} className="gift-steps">
        {steps.map((s) => (
          <div key={s.title} style={{ background: s.tint, border: '3px solid var(--sb-ink)', borderRadius: 20, boxShadow: 'var(--shadow-pop)', padding: '22px 20px' }}>
            <img src={asset(CHAR_BASE + '/' + s.char + '.png')} alt="" style={{ width: 64 }} />
            <h3 style={{ marginTop: 8 }}>{s.title}</h3>
            <p style={{ marginBottom: 0 }}>{s.body}</p>
          </div>
        ))}
      </div>

      <div className="callout" style={{ marginTop: 32 }}>
        <p><strong>Gift receipts & a note:</strong> want a gift message or receipt included? Add a note
          at checkout, or <a href="contact.html">email us</a> and we'll pop one in.</p>
      </div>
    </PageShell>
  );
}

createRoot(document.getElementById('root')).render(<Gift />);
