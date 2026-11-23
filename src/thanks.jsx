/* Story Blocks - post-checkout thank-you page (sponsorship) */
import './lib/react-global.js';
import React from 'react';
import { createRoot } from 'react-dom/client';

const { Button } = window.StoryBlocksJournalDesignSystem_239fa7;

const STEPS = [
  { n: '1', b: 'We confirm with the school', t: 'We check they can accept the books before anything ships - we never send unannounced.' },
  { n: '2', b: 'We box and dispatch', t: 'Each journal carries your named bookplate. Your certificate and social post pack come to you.' },
  { n: '3', b: 'You see it land', t: 'A delivery confirmation - with a photo where the school is happy to share one.' },
];

function Thanks() {
  React.useEffect(() => {
    if (window.gtag) {
      const sid = new URLSearchParams(window.location.search).get('session_id');
      window.gtag('event', 'purchase_confirmed', { transaction_id: sid || undefined });
    }
  }, []);

  return (
    <div style={{ maxWidth: 580, width: '100%', background: 'var(--sb-paper)', border: '4px solid var(--sb-ink)', borderRadius: 30, boxShadow: 'var(--shadow-pop-lg)', padding: '44px 36px', textAlign: 'center', position: 'relative' }}>
      <img className="sb-float" src="/assets/characters/SB44.png" alt="" style={{ width: 140 }} />
      <div className="sb-marker" style={{ fontSize: '1.4rem', color: 'var(--sb-blue)', marginTop: 10 }}>Thank you!</div>
      <h1 className="sb-display" style={{ fontSize: 'clamp(2rem, 6vw, 2.6rem)', lineHeight: 1.05, marginTop: 8 }}>Your sponsorship is in.</h1>
      <p style={{ marginTop: 16, fontSize: '1.12rem', lineHeight: 1.6 }}>
        You’ve just put a batch of Story Blocks journals in the hands of children who’ll love them. A receipt is already in your inbox. Here’s what happens next:
      </p>

      <div style={{ display: 'grid', gap: 12, textAlign: 'left', margin: '24px auto 0', maxWidth: 440 }}>
        {STEPS.map((s) => (
          <div key={s.n} style={{ display: 'flex', gap: 14, alignItems: 'flex-start', background: 'var(--sb-wash-green)', border: '2.5px solid var(--sb-ink)', borderRadius: 14, padding: '14px 16px' }}>
            <span style={{ flexShrink: 0, width: 30, height: 30, borderRadius: 999, background: 'var(--sb-paper)', border: '2.5px solid var(--sb-ink)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800 }}>{s.n}</span>
            <span><strong style={{ fontWeight: 800, display: 'block' }}>{s.b}</strong><span style={{ fontWeight: 600, lineHeight: 1.4 }}>{s.t}</span></span>
          </div>
        ))}
      </div>

      <p style={{ marginTop: 20, fontSize: '.98rem', lineHeight: 1.6, color: 'var(--sb-muted)', fontWeight: 700 }}>
        We’ll confirm with the school before dispatch. If they can’t accept, we’ll arrange your second choice with you - just reply to your receipt or email hello@blockspublishing.com.
      </p>

      <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', marginTop: 24 }}>
        <Button as="a" href="/" variant="primary">Back to the site</Button>
        <Button as="a" href="/resources" variant="white">See the free pack</Button>
      </div>
    </div>
  );
}

createRoot(document.getElementById('root')).render(<Thanks />);
