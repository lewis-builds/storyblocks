/* Story Blocks - About Blocks Publishing */
import './lib/react-global.js';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { asset } from './lib/core.js';
import { PageShell } from './lib/page-shell.jsx';

function About() {
  return (
    <PageShell active={null} wash="green" kicker="About us"
      title="We make building blocks for bright minds."
      intro="Blocks Publishing began at a kitchen table, trying to get one child to swap the screen for a story. Story Blocks is what grew out of that.">

      <p className="lead">We're a small British publisher with one stubborn belief: every child is a
        storyteller who just needs the right little nudge. Not a worksheet, not a wrong answer to get
        - a spark. Three words and a friendly question, and away they go.</p>

      <h2>Why "Blocks"?</h2>
      <p>Our name reflects how we think: modular, imaginative, open-ended. A block can be anything a
        child decides it is. So we design open-ended building blocks for young imaginations - starting
        with the Story Blocks Journal, and the cast of block-character friends who live across
        everything we make.</p>

      <figure style={{ margin: '28px 0', background: '#fff', border: '3px solid var(--sb-ink)', borderRadius: 16, boxShadow: 'var(--shadow-pop)', padding: 14 }}>
        <img src={asset('assets/why-blocks-scene.png')} alt="The Blocks characters reading, camping, singing and playing together"
          style={{ display: 'block', width: '100%', height: 'auto', borderRadius: 8 }} />
      </figure>

      <h2>Made in Britain</h2>
      <p>Every journal is printed and bound in Britain, on good paper made to be written in every day.
        We care about the object as much as the idea - it should feel like a keepsake by the time
        it's full.</p>

      <div className="callout">
        <p><strong>We give back.</strong> For every journal that finds a home, we help more find their
          way into classrooms - free boxes of journals, stickers and reward charts sent to schools
          across the UK. <a href="schools.html">See the schools programme →</a></p>
      </div>

      <h2>Say hello</h2>
      <p>We read everything. If you've got a question, an idea, or a story your child wrote that made
        you laugh, we'd love to hear it. <a href="contact.html">Get in touch →</a></p>

      <p className="muted" style={{ marginTop: 28 }}>Blocks Publishing Ltd · blockspublishing.com · Made in Britain</p>
    </PageShell>
  );
}

createRoot(document.getElementById('root')).render(<About />);
