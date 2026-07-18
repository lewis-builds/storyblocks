/* Story Blocks - Delivery & returns */
import './lib/react-global.js';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { PageShell } from './lib/page-shell.jsx';

function Delivery() {
  return (
    <PageShell active={null} wash="sky" kicker="Delivery & returns"
      title="Getting your journal to you"
      intro="Free UK mainland delivery on every order, and a friendly 30-day returns promise if it isn't quite right.">

      <h2>Delivery</h2>
      <ul>
        <li><strong>Free UK mainland postage</strong> on all orders - no minimum spend.</li>
        <li>Orders are dispatched within <strong>1-2 working days</strong> and typically arrive in
          <strong> 2-4 working days</strong> from dispatch.</li>
        <li>We'll email you a confirmation when your order is on its way.</li>
      </ul>

      <h3>Where we ship</h3>
      <p>We currently ship across the UK. For the Scottish Highlands & Islands, Northern Ireland, and
        other non-mainland addresses, delivery can take a little longer. If you're outside the UK and
        would like to order, <a href="/contact">get in touch</a> and we'll do our best to help.</p>

      <h2>Returns</h2>
      <p>Changed your mind? You can return an unused journal in its original condition within
        <strong> 30 days</strong> of delivery for a full refund of the item price. Just drop us a line
        first so we can tell you where to send it.</p>
      <ul>
        <li>Return postage for a change of mind is covered by you.</li>
        <li>Refunds are issued to your original payment method within 5-10 working days of us
          receiving the return.</li>
      </ul>

      <h3>Damaged or faulty items</h3>
      <p>If your journal arrives damaged or has a printing fault, we're sorry - that's on us. Email us
        a photo within 30 days and we'll send a replacement or a full refund (including postage),
        whichever you prefer. You won't need to pay to return a faulty item.</p>

      <div className="callout">
        <p><strong>Need a hand?</strong> Email <a href="mailto:hello@blockspublishing.com">hello@blockspublishing.com</a> with
          your order number and we'll sort it quickly. More on the <a href="/faqs">FAQs page →</a></p>
      </div>

      <p className="muted" style={{ marginTop: 28 }}>These terms don't affect your statutory rights under UK consumer law.</p>
    </PageShell>
  );
}

createRoot(document.getElementById('root')).render(<Delivery />);
