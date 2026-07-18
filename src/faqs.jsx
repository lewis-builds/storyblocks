/* Story Blocks - Frequently asked questions */
import './lib/react-global.js';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { PageShell } from './lib/page-shell.jsx';

const FAQS = [
  {
    q: 'What age is the Story Blocks Journal for?',
    a: "It's designed for children aged 6 and up (Key Stage 2 & 3) - old enough to write a little independently, young enough to love a sticker reward. Younger children enjoy it too with a grown-up scribing for them.",
  },
  {
    q: 'What is a daily story starter?',
    a: 'Three words and one friendly question - that’s a story starter. Your child weaves the words into a story of their own, on pages made for young writers. There are 70+ of them, across four types: three words, objects, scenarios and first lines.',
  },
  {
    q: 'Do we have to use it every day?',
    a: "Not at all. The date pages aren't fixed, so you can dip in whenever suits - a few times a week is plenty to build the habit. The streak chart is there to encourage, never to nag.",
  },
  {
    q: "What's the difference between the Standard and Gold editions?",
    a: 'The writing inside is identical. The Gold Edition adds a gold-foil cover and a set of wooden collector coins - milestone rewards for you to award as their writing grows. It’s the one people buy as a present.',
  },
  {
    q: 'What are the stickers and reward chart for?',
    a: 'Finish a story, tick the chart, peel off a sticker. Every journal includes a free full sticker sheet and reward chart - little wins that build a daily writing streak and make finishing feel like the best part.',
  },
  {
    q: 'What is the Parents’ Corner?',
    a: 'A free online area for grown-ups, included with every journal. It’s full of printable story starters, extra reward charts and short, practical guides on helping a reluctant writer - what to say, what not to say, and how to keep the habit going. Buy the journal from our website and you’ll get an access code to unlock it.',
  },
  {
    q: 'How much is delivery and how long does it take?',
    a: 'UK mainland delivery is free on every order. Orders are dispatched within 1-2 working days and usually arrive within 2-4 working days. Full details are on the delivery & returns page.',
  },
  {
    q: 'Can I return it if it isn’t right?',
    a: 'Yes - unused journals can be returned within 30 days for a full refund of the item price, and anything damaged or faulty is replaced or refunded in full. See delivery & returns for how.',
  },
  {
    q: 'Do you work with schools?',
    a: 'We do - we send free boxes of journals, stickers and reward charts to schools across the UK. Anyone can nominate a school on our schools page.',
  },
];

function FaqItem({ q, a, open, onToggle, id }) {
  return (
    <div className="faq" data-open={open ? '' : undefined}>
      <button className="faq__q" aria-expanded={open} aria-controls={id} onClick={onToggle}>
        <span>{q}</span>
        <svg className="faq__chev" width="22" height="22" viewBox="0 0 24 24" fill="none"
          stroke="var(--sb-ink)" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>
      <div className="faq__a" id={id} role="region" hidden={!open}><p>{a}</p></div>
    </div>
  );
}

function Faqs() {
  const [open, setOpen] = React.useState(0);
  return (
    <PageShell active={null} wash="lemon" kicker="FAQs"
      title="Questions, answered"
      intro="The things parents, guardians and teachers ask us most. Can't see yours? We're one email away.">

      <div style={{ display: 'grid', gap: 14 }}>
        {FAQS.map((f, i) => (
          <FaqItem key={i} id={'faq-' + i} q={f.q} a={f.a} open={open === i}
            onToggle={() => setOpen(open === i ? -1 : i)} />
        ))}
      </div>

      <div className="callout" style={{ marginTop: 28 }}>
        <p><strong>Still stuck?</strong> Email <a href="mailto:hello@blockspublishing.com">hello@blockspublishing.com</a> or
          use the <a href="/contact">contact form</a> - we read every message.</p>
      </div>
    </PageShell>
  );
}

createRoot(document.getElementById('root')).render(<Faqs />);
