/* Story Blocks - the old wholesale/trade route is retired. In the sponsorship +
   gifting model there's no consumer-retail product to stock, so bulk, trade and
   partnership enquiries now go through Contact. Redirect there. */
import './lib/react-global.js';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { PageShell } from './lib/page-shell.jsx';

const { Button } = window.StoryBlocksJournalDesignSystem_239fa7;

function Wholesale() {
  React.useEffect(() => {
    const t = setTimeout(() => { window.location.replace('/contact'); }, 2500);
    return () => clearTimeout(t);
  }, []);

  return (
    <PageShell active={null} wash="green" kicker="Bulk & partnerships"
      title="Looking to order in bulk?"
      intro="We no longer sell to trade for resale. For a large or ongoing order - sponsoring journals for schools, or a partnership - we'd love to talk. Taking you to our contact page now…">
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 8 }}>
        <Button as="a" href="/contact" variant="primary" iconRight="→">Contact us</Button>
        <Button as="a" href="/" variant="white">See business sponsorship</Button>
      </div>
    </PageShell>
  );
}

createRoot(document.getElementById('root')).render(<Wholesale />);
