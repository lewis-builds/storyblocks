/* Story Blocks - Story starter pages served at /story-starters/sbNN-x.
   One template renders every starter; a Vercel rewrite points all
   /story-starters/* at this page and the slug picks the starter from the
   bundled data (migrated from the original Webflow pages). */
import './lib/react-global.js';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { SiteHeader, SiteFooter, Icon } from './sections.jsx';
import STARTERS from './lib/story-starters.json';

const { Button } = window.StoryBlocksJournalDesignSystem_239fa7;
const BY_SLUG = Object.fromEntries(STARTERS.map((s) => [s.slug, s]));

function slugFromPath() {
  const m = window.location.pathname.match(/story-starters\/([^/?#]+)/i);
  return m ? m[1].toLowerCase() : null;
}

const TAB_META = [
  { key: 'focusOn', label: 'Focus On', icon: 'scan' },
  { key: 'writingTips', label: 'Writing Tips', icon: 'sparkles' },
  { key: 'challenges', label: 'Challenges', icon: 'award' },
];

function Tabs({ starter }) {
  const [sel, setSel] = React.useState(0);
  return (
    <div>
      <div role="tablist" aria-label="Extra help" style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
        {TAB_META.map((t, k) => (
          <button key={t.key} role="tab" aria-selected={sel === k} type="button" onClick={() => setSel(k)}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: 'var(--font-body)', fontWeight: 800,
              fontSize: '.98rem', color: 'var(--sb-ink)', background: sel === k ? 'var(--sb-yellow)' : 'var(--sb-paper)',
              border: '3px solid var(--sb-ink)', borderRadius: 999, padding: '9px 16px', cursor: 'pointer',
              boxShadow: sel === k ? '3px 3px 0 0 var(--sb-ink)' : 'none', transition: 'background .15s, box-shadow .15s',
            }}>
            <Icon name={t.icon} size={18} sw={2.6} /> {t.label}
          </button>
        ))}
      </div>
      <div role="tabpanel" className="starter-rich" style={{ marginTop: 22 }}
        dangerouslySetInnerHTML={{ __html: starter[TAB_META[sel].key] || '' }} />
    </div>
  );
}

function PromptDisplay({ starter }) {
  if (starter.type === 'Three words') {
    const words = starter.prompt.split(',').map((w) => w.trim()).filter(Boolean);
    return (
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 16 }}>
        {words.map((w) => (
          <span key={w} className="sb-display" style={{ fontSize: 'clamp(1.5rem, 4vw, 2.4rem)', background: 'var(--sb-paper)', border: '3px solid var(--sb-ink)', borderRadius: 16, padding: '8px 22px', boxShadow: 'var(--shadow-pop)' }}>{w}</span>
        ))}
      </div>
    );
  }
  return <p className="sb-display" style={{ fontSize: 'clamp(1.7rem, 4.2vw, 2.9rem)', lineHeight: 1.14, marginTop: 14 }}>{starter.prompt}</p>;
}

function StarterPage({ starter }) {
  React.useEffect(() => {
    const snippet = starter.prompt.length > 66 ? starter.prompt.slice(0, 66).trim() + '…' : starter.prompt;
    document.title = snippet + ' | Story Blocks starter';
    const setMeta = (sel, val) => { const el = document.querySelector(sel); if (el) el.setAttribute('content', val); };
    setMeta('meta[name="description"]', starter.instruction + ' ' + starter.prompt);
    setMeta('meta[property="og:title"]', snippet + ' | Story Blocks starter');
    setMeta('meta[property="og:description"]', starter.instruction + ' ' + starter.prompt);
    const canon = document.querySelector('link[rel="canonical"]');
    if (canon) canon.href = 'https://blockspublishing.com/story-starters/' + starter.slug;
  }, [starter]);

  return (
    <React.Fragment>
      <SiteHeader active={null} />
      <main>
        <section style={{ background: `var(--sb-wash-${starter.tint})`, borderBottom: '3px solid var(--sb-ink)', padding: 'clamp(40px, 7vw, 72px) 0' }}>
          <div className="sb-wrap" style={{ maxWidth: 820 }}>
            <div className="sb-marker" style={{ fontSize: '1.35rem', color: 'var(--sb-blue)' }}>{starter.type} starter · No. {starter.num}</div>
            <div style={{ fontWeight: 800, textTransform: 'uppercase', letterSpacing: '.05em', fontSize: '.92rem', color: 'var(--sb-muted)', marginTop: 12 }}>{starter.instruction}</div>
            <PromptDisplay starter={starter} />
          </div>
        </section>

        <section style={{ padding: 'clamp(36px, 6vw, 64px) 0' }}>
          <div className="sb-wrap" style={{ maxWidth: 820 }}>
            <div className="sb-marker" style={{ fontSize: '1.3rem', color: 'var(--sb-blue)' }}>Stuck? Here's a nudge…</div>
            <h2 className="sb-display" style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', marginTop: 4, marginBottom: 22 }}>Ideas to get you going</h2>
            <Tabs starter={starter} />

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, marginTop: 38 }}>
              <Button as="a" href={'/' + starter.pdf} target="_blank" rel="noopener" iconRight="↓">Printable version</Button>
              <Button as="a" href="/contact" variant="white" iconRight="→">Send us your story</Button>
            </div>
          </div>
        </section>

        <section style={{ background: 'var(--sb-wash-lemon)', borderTop: '3px solid var(--sb-ink)', padding: 'clamp(36px, 6vw, 56px) 0' }}>
          <div className="sb-wrap" style={{ maxWidth: 820, textAlign: 'center' }}>
            <h2 className="sb-display" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.1rem)' }}>77 more starters where this came from</h2>
            <p style={{ marginTop: 10, fontSize: '1.1rem', lineHeight: 1.6, maxWidth: 560, margin: '10px auto 0' }}>Every one is ready in the Story Blocks Journal - a daily writing habit that gets kids off screens and into stories.</p>
            <div style={{ marginTop: 20 }}><Button as="a" href="/" size="lg" iconRight="→">See the journal</Button></div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </React.Fragment>
  );
}

function NotFound() {
  return (
    <React.Fragment>
      <SiteHeader active={null} />
      <main>
        <section style={{ padding: '80px 0', textAlign: 'center' }}>
          <div className="sb-wrap" style={{ maxWidth: 620 }}>
            <h1 className="sb-display" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)' }}>Story starter not found</h1>
            <p style={{ marginTop: 14, fontSize: '1.1rem', lineHeight: 1.6 }}>We couldn't find that one - it may have moved. Head back to <a href="/" style={{ color: 'var(--sb-blue)', fontWeight: 800 }}>the journal</a>.</p>
          </div>
        </section>
      </main>
      <SiteFooter />
    </React.Fragment>
  );
}

const slug = slugFromPath();
const starter = slug && BY_SLUG[slug];
createRoot(document.getElementById('root')).render(starter ? <StarterPage starter={starter} /> : <NotFound />);
