/* Story Blocks - Frequently asked questions */
import './lib/react-global.js';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { PageShell } from './lib/page-shell.jsx';

const FAQS = [
  {
    q: 'How does sponsoring work?',
    a: 'In three steps: choose a tier (Class, Year Group or Whole School), nominate a UK primary school - search the register or ask us to choose one that’s waiting for books - then add your recognition details and pay securely by Stripe. We handle the rest.',
  },
  {
    q: 'What do the tiers cost?',
    a: 'Three one-off prices: Class is 30 journals for £249, Year Group is 60 journals for £475, and Whole School is 90 journals for £675. That’s under £8.50 per journal - the Year Group and Whole School tiers also include a Gold Edition award copy.',
  },
  {
    q: 'What’s in the recognition pack?',
    a: 'Every tier includes it: a named bookplate in every copy ("Donated to [school] by [sponsor]"), a certificate for your business to frame or post, and a ready-made social post pack - images and words you can share straight away.',
  },
  {
    q: 'Can I choose which school?',
    a: 'Yes - you nominate the school. Search by name, town or postcode, or ask us to choose one from our registered-schools list. Important: nominating isn’t the same as the school agreeing. We always confirm with the school before dispatch - we never send unannounced. If they can’t accept, we arrange your second choice with you.',
  },
  {
    q: 'What is the Gold Edition award copy?',
    a: 'Included with the Year Group (60) and Whole School (90) tiers, it’s a special gold-foil edition of the journal for the school to present to a child - a little moment of recognition for a budding writer. It isn’t sold separately.',
  },
  {
    q: 'What’s in the journals themselves?',
    a: 'Each Story Blocks Journal gives a child aged 6+ a daily spark to write their own stories: three words and a friendly question, 70+ story starters across four types, writing tips and challenges, plus a sticker sheet and reward chart. Made in Britain.',
  },
  {
    q: 'How and when are the journals delivered?',
    a: 'Straight to the nominated school, free, once we’ve confirmed with them - usually within a couple of weeks. You’ll get a delivery confirmation, with a photo where the school is happy to share one. Your Stripe receipt covers the payment.',
  },
  {
    q: 'I’m a school - how do we receive journals?',
    a: 'Join our receiving list on the register-your-school page. It’s free, with no commitment. When a sponsor asks us to choose a school, we match them with registered schools - and we always confirm with you before anything ships.',
  },
  {
    q: 'What is the Parents’ Corner?',
    a: 'A free, open online area for grown-ups - printable story starters, extra reward charts and short guides on helping a young writer. No code or account needed; just print and go.',
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
