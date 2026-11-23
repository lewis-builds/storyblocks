/* Story Blocks - the old "gift a journal" route now points at sponsorship.
   Individual journals are no longer sold; sponsoring a batch for a school
   (with a named bookplate) is the way to give. Redirect to the homepage. */
import './lib/react-global.js';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { PageShell } from './lib/page-shell.jsx';

const { Button } = window.StoryBlocksJournalDesignSystem_239fa7;

function Gift() {
  React.useEffect(() => {
    const t = setTimeout(() => { window.location.replace('/'); }, 2500);
    return () => clearTimeout(t);
  }, []);

  return (
    <PageShell active={null} wash="lemon" kicker="Give the gift of writing"
      title="Sponsoring is the new way to give"
      intro="We no longer sell single journals - but sponsoring a batch for a UK primary school makes a lovely gift or tribute, with the bookplate carrying the name you choose. Taking you there now…">
      <div style={{ marginTop: 8 }}>
        <Button as="a" href="/" variant="primary" iconRight="→">Sponsor a school</Button>
      </div>
    </PageShell>
  );
}

createRoot(document.getElementById('root')).render(<Gift />);
