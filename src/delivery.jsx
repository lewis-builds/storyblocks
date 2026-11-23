/* Story Blocks - Delivery & returns */
import './lib/react-global.js';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { PageShell } from './lib/page-shell.jsx';

function Delivery() {
  return (
    <PageShell active={null} wash="sky" kicker="Delivery & dispatch"
      title="Getting the journals to the school"
      intro="Sponsored journals are delivered free to the nominated UK primary school - but only after we've confirmed with them. We never send unannounced.">

      <h2>How dispatch works</h2>
      <ul>
        <li>Once you sponsor, we <strong>confirm with the nominated school</strong> before anything ships.</li>
        <li>If they can accept, we box up the journals - each carrying your <strong>named bookplate</strong> - and
          post them straight to the school, free.</li>
        <li>Journals usually arrive <strong>within a couple of weeks</strong> of us confirming with the school.</li>
        <li>You get a <strong>delivery confirmation</strong>, with a photo where the school is happy to share one.</li>
      </ul>

      <h3>If a school can’t accept</h3>
      <p>Occasionally a nominated school already has plenty, or can’t take a delivery right now. If that
        happens, we’ll come back to you and <strong>arrange your second choice</strong> - your sponsorship is never
        lost. Prefer us to choose? Pick <em>“Choose a school for me”</em> at checkout and we’ll match you with a
        registered school that’s waiting for books.</p>

      <h2>Your recognition pack</h2>
      <p>Your certificate and ready-made social post pack come to you by email, so you can share the good
        news whenever you like - you don’t have to wait for the books to land.</p>

      <h3>Receipts</h3>
      <p>Payment is handled securely by Stripe, and Stripe emails you a receipt as soon as you pay - that’s
        all a business buyer needs for their records. Questions about a sponsorship? Just reply to your
        receipt or email us.</p>

      <div className="callout">
        <p><strong>Need a hand?</strong> Email <a href="mailto:hello@blockspublishing.com">hello@blockspublishing.com</a> and
          we'll sort it quickly. More on the <a href="/faqs">FAQs page →</a></p>
      </div>

      <p className="muted" style={{ marginTop: 28 }}>These terms don't affect your statutory rights under UK consumer law.</p>
    </PageShell>
  );
}

createRoot(document.getElementById('root')).render(<Delivery />);
