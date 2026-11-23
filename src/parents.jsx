/* Story Blocks - The Parents' Corner. A free, open online library of printables
   and guides for grown-ups - handy whether a child writes in a journal at home
   or has a sponsored one from school. No code, no account. */
import './lib/react-global.js';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { asset, CHAR_BASE } from './lib/core.js';
import { PageShell } from './lib/page-shell.jsx';

const { Button } = window.StoryBlocksJournalDesignSystem_239fa7;

/* The library. PDFs live in /public and download directly; guides are on-site
   articles (coming soon). Set `ready: true` once an item's file/link is live. */
const RESOURCES = [
  {
    char: 'SB10', tint: 'var(--sb-wash-lemon)',
    title: 'Printable story starters',
    body: 'Fresh three-word prompts, objects, scenarios and first lines to print, cut out and pull from a jar. New sets added through the year.',
    file: '/Story-Blocks-Starter-Pack.pdf', ready: true,
  },
  {
    char: 'SB44', tint: 'var(--sb-wash-pink)',
    title: 'Extra reward charts',
    body: 'Run out of squares to tick? Print another reward chart any time to keep the daily streak going strong.',
    file: '/Story-Blocks-Reward-Chart.pdf', ready: true,
  },
  {
    char: 'SB33', tint: 'var(--sb-wash-sky)',
    title: 'Guides for grown-ups',
    body: 'Short, practical reads: helping a reluctant writer, what to say (and what not to say), and how to keep ten minutes a day going.',
    ready: false,
  },
];

/* ---------------- The library ---------------- */
function Library() {
  return (
    <React.Fragment>
      <h2>Your printables &amp; guides</h2>
      <div className="parents-grid">
        {RESOURCES.map((r) => (
          <div key={r.title} style={{ background: r.tint, border: '3px solid var(--sb-ink)', borderRadius: 22, boxShadow: 'var(--shadow-pop)', padding: 24, display: 'flex', flexDirection: 'column' }}>
            <img src={asset(CHAR_BASE + '/' + r.char + '.png')} alt="" style={{ width: 72 }} />
            <h3 style={{ marginTop: 10 }}>{r.title}</h3>
            <p style={{ marginTop: 8, flex: 1 }}>{r.body}</p>
            <div style={{ marginTop: 16 }}>
              {r.ready
                ? <Button as="a" href={r.file} download iconRight="↓">Download</Button>
                : <Button disabled>Coming soon</Button>}
            </div>
          </div>
        ))}
      </div>
    </React.Fragment>
  );
}

/* ---------------- Page ---------------- */
function Parents() {
  const uses = [
    { char: 'SB16', tint: 'var(--sb-wash-lemon)', title: 'At home', body: 'Print a few starters, pop them in a jar, and pull one out whenever a child fancies writing a story.' },
    { char: 'SB50', tint: 'var(--sb-wash-sky)', title: 'In the classroom', body: 'Teachers are welcome to print and share these with a class - a quick, screen-free writing warm-up.' },
    { char: 'SB44', tint: 'var(--sb-wash-pink)', title: 'Alongside a journal', body: 'Got a Story Blocks journal from a school sponsorship? These keep the daily habit going when the pages run low.' },
  ];

  return (
    <PageShell active="parents" wash="purple" kicker="The Parents’ Corner"
      title="Everything you need to cheer them on"
      intro="A free online corner for the grown-ups - printables, extra reward charts and short guides on helping a young writer find their feet. No code, no account: just print and go."
      heroChildren={null}>

      <Library />

      <h2>What’s included</h2>
      <p>The Corner is our way of being useful beyond the journal itself - free to everyone, and it grows:
        we add new printables and guides through the year.</p>
      <ul>
        <li><strong>Printable story starters</strong> - fresh prompts to print, cut out and pull from a jar.</li>
        <li><strong>Extra reward charts</strong> - print another any time, including seasonal ones.</li>
        <li><strong>Guides for grown-ups</strong> - helping a reluctant writer, what to say and what not to say, and how to keep the habit going when motivation dips.</li>
      </ul>

      <h2>Ways to use it</h2>
      <div className="parents-steps">
        {uses.map((s) => (
          <div key={s.title} style={{ background: s.tint, border: '3px solid var(--sb-ink)', borderRadius: 20, boxShadow: 'var(--shadow-pop)', padding: '22px 20px' }}>
            <img src={asset(CHAR_BASE + '/' + s.char + '.png')} alt="" style={{ width: 56 }} />
            <h3 style={{ marginTop: 10 }}>{s.title}</h3>
            <p style={{ marginBottom: 0 }}>{s.body}</p>
          </div>
        ))}
      </div>

      <div className="callout" style={{ marginTop: 32 }}>
        <p><strong>Know a school that would love these?</strong> Businesses can sponsor a batch of Story
          Blocks journals for a UK primary school, and schools can join our receiving list. <a href="/">Sponsor a school →</a></p>
      </div>

      <p className="muted" style={{ marginTop: 28, fontSize: '.9rem' }}>
        Questions? <a href="/contact">Get in touch</a> - we’re happy to help.
      </p>
    </PageShell>
  );
}

createRoot(document.getElementById('root')).render(<Parents />);
