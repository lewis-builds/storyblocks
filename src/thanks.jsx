/* Story Blocks - post-checkout thank-you page */
import './lib/react-global.js';
import React from 'react';
import { createRoot } from 'react-dom/client';

const { Button } = window.StoryBlocksJournalDesignSystem_239fa7;

function Thanks() {
  return (
    <div style={{ maxWidth: 560, width: '100%', background: 'var(--sb-paper)', border: '4px solid var(--sb-ink)', borderRadius: 30, boxShadow: 'var(--shadow-pop-lg)', padding: '44px 36px', textAlign: 'center', position: 'relative' }}>
      <img className="sb-float" src="/assets/characters/SB44.png" alt="" style={{ width: 150 }} />
      <div className="sb-marker" style={{ fontSize: '1.4rem', color: 'var(--sb-blue)', marginTop: 10 }}>Order confirmed!</div>
      <h1 className="sb-display" style={{ fontSize: 'clamp(2rem, 6vw, 2.6rem)', lineHeight: 1.05, marginTop: 8 }}>The stories are on their way.</h1>
      <p style={{ marginTop: 16, fontSize: '1.12rem', lineHeight: 1.6 }}>
        Thank you! Your journal is being boxed up with its sticker sheet and reward chart, and
        will be with you in 2–4 working days. A receipt is in your inbox.
      </p>
      <p style={{ marginTop: 12, fontSize: '1rem', lineHeight: 1.6, color: 'var(--sb-muted)', fontWeight: 700 }}>
        While you wait - the free printable pack makes a lovely warm-up.
      </p>
      <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', marginTop: 24 }}>
        <Button as="a" href="resources.html" variant="primary">Get the free pack</Button>
        <Button as="a" href="index.html" variant="white">Back to the site</Button>
      </div>
    </div>
  );
}

createRoot(document.getElementById('root')).render(<Thanks />);
