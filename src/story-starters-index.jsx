/* Story Blocks - browsable index of all story starters at /story-starters.
   A filterable gallery that links to each /story-starters/<slug> page. */
import './lib/react-global.js';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { SiteHeader, SiteFooter } from './sections.jsx';
import STARTERS from './lib/story-starters.json';

const TYPES = ['All', 'Scenario', 'Objects', 'First line', 'Three words'];
const countOf = (t) => STARTERS.filter((s) => s.type === t).length;
const trim = (s, n) => (s.length > n ? s.slice(0, n).trim() + '…' : s);

function Card({ s }) {
  return (
    <a href={'/story-starters/' + s.slug} className="starter-card" style={{ background: `var(--sb-wash-${s.tint})` }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
        <span className="sb-marker" style={{ fontSize: '1.05rem', color: 'var(--sb-blue)' }}>No. {s.num}</span>
        <span style={{ fontWeight: 800, fontSize: '.72rem', textTransform: 'uppercase', letterSpacing: '.05em', color: 'var(--sb-muted)' }}>{s.type}</span>
      </div>
      <img src={'/' + s.image} alt="" loading="lazy" style={{ width: 84, height: 'auto', margin: '8px 0 6px' }} />
      <p style={{ fontWeight: 700, lineHeight: 1.42, fontSize: '.98rem', margin: 0 }}>{s.type === 'Three words' ? s.prompt : trim(s.prompt, 96)}</p>
      <span style={{ marginTop: 'auto', paddingTop: 12, fontWeight: 800, color: 'var(--sb-blue)', fontSize: '.9rem' }}>Open →</span>
    </a>
  );
}

function Index() {
  const [filter, setFilter] = React.useState('All');
  const list = filter === 'All' ? STARTERS : STARTERS.filter((s) => s.type === filter);
  return (
    <React.Fragment>
      <SiteHeader active={null} />
      <main>
        <section className="page-hero" style={{ background: 'var(--sb-wash-sky)' }}>
          <div className="sb-wrap">
            <div className="sb-marker page-kicker">Free story starters</div>
            <h1 className="sb-display page-title">77 story starters to spark a story</h1>
            <p className="page-intro">Every prompt from the Story Blocks Journal, free to explore online - each with Focus On, Writing Tips and Challenges to get a young writer going. Pick a type, or just dive in.</p>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 24 }}>
              {TYPES.map((t) => {
                const on = filter === t;
                return (
                  <button key={t} type="button" onClick={() => setFilter(t)}
                    style={{
                      fontFamily: 'var(--font-body)', fontWeight: 800, fontSize: '.92rem', color: 'var(--sb-ink)',
                      background: on ? 'var(--sb-yellow)' : 'var(--sb-paper)', border: '3px solid var(--sb-ink)',
                      borderRadius: 999, padding: '8px 16px', cursor: 'pointer',
                      boxShadow: on ? '3px 3px 0 0 var(--sb-ink)' : 'none', transition: 'background .15s, box-shadow .15s',
                    }}>
                    {t}{t !== 'All' && ' · ' + countOf(t)}
                  </button>
                );
              })}
            </div>
          </div>
        </section>
        <section className="page-body">
          <div className="sb-wrap">
            <div className="starter-grid">
              {list.map((s) => <Card key={s.slug} s={s} />)}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </React.Fragment>
  );
}
createRoot(document.getElementById('root')).render(<Index />);
