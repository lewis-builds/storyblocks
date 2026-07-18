/* Story Blocks - Why Story Blocks Exists (the crisis, the evidence, the mission).
   Depth + citations live here; the homepage carries only the single-stat hook. */
import './lib/react-global.js';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { PageShell } from './lib/page-shell.jsx';

const { Button } = window.StoryBlocksJournalDesignSystem_239fa7;

function Stat({ big, tint = 'sky', children }) {
  return (
    <div className="why-stat" style={{ background: `var(--sb-wash-${tint})` }}>
      <div className="why-stat__big sb-display">{big}</div>
      <p className="why-stat__label">{children}</p>
    </div>
  );
}

function Why() {
  return (
    <PageShell active="why" wash="sky" kicker="Why Story Blocks exists"
      title="Why children have stopped writing for fun - and how we bring it back"
      intro="Kids have stopped reading and writing for the joy of it - enjoyment of both is near record lows. We're a small family publisher on a mission to bring it back, five minutes of storytelling at a time.">

      <h2>The writing crisis</h2>
      <p>Somewhere in the last fifteen years, writing for pleasure quietly slipped away. In 2025, only
        about <strong>1 in 4 children</strong> aged 8 to 18 said they enjoy writing in their free time -
        the lowest the National Literacy Trust has recorded in fifteen years, and down from around 1 in 2
        a decade ago.</p>

      <div className="why-stats">
        <Stat big="1 in 4" tint="peach">Enjoyed writing in their free time in 2025 (26.6%) - nearly half the level of 2010.</Stat>
        <Stat big="1 in 9" tint="lemon">Now write something daily in their free time - the everyday habit has all but disappeared.</Stat>
      </div>

      <p>Here's the hopeful part, and we hold onto it: <strong>2026 brought the first upturn in fifteen
        years</strong>, with enjoyment nudging up to 28.7%. It's still far below where it should be - but
        for the first time in a long time, the line is moving the right way. That's exactly the moment to
        lean in.</p>

      <h2>It's not just writing</h2>
      <p>Reading for pleasure has walked the same path - it fell to a twenty-year low in 2025, with only a
        modest rise since. What's really slipped is bigger than any single skill: it's the simple joy of a
        good story, whether a child is reading one or dreaming one up.</p>

      <h2>Why it matters beyond the classroom</h2>
      <div className="why-stats why-stats--one">
        <Stat big="3&times;" tint="green">Children most engaged with reading and writing are around three times more likely to report high mental wellbeing (39.4% vs 11.8%).</Stat>
      </div>
      <p>This was never really about marks on a page. Children who read and write for pleasure tend to be
        happier, more confident, and better at putting how they feel into words. The link runs both ways -
        we're careful not to overclaim - but it's a strikingly consistent one, and it's the real reason we
        care.</p>

      <h2>The moment we're in</h2>
      <p>The tide may be starting to turn. In July 2025 the Department for Education published a new Writing
        Framework that, for the first time, puts <em>writing for pleasure</em> at the heart of how primary
        schools teach. And as families rethink screen time, children stand to get a good deal of their free
        time back. The question is what fills it.</p>

      <h2>What we're doing about it</h2>
      <p>So we made the thing we wished existed. The Story Blocks Journal hands a child a tiny spark every
        day - three words and a friendly question - with tips, challenges and rewards that turn ten quiet
        minutes into a habit they actually look forward to. Five minutes a day, away from screens, no
        blank-page panic and no wrong answers.</p>
      <p>And because we can't reach every child through a shop, we give journals away too. Our goal is to
        put <strong>500 journals</strong> into schools, libraries and children's wards where they'll be
        used and loved - and anyone can <a href="/schools">nominate a school</a>. We can't fix this on
        our own, but we help where we're welcome. (This is just the start - we'll add photos, school names
        and feedback here as the boxes go out.)</p>

      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 28 }}>
        <Button as="a" href="/" size="lg" iconRight="→">See the journal</Button>
        <Button as="a" href="/resources" size="lg" variant="white">Get the free story-starter pack</Button>
      </div>

      <h2 style={{ marginTop: 48 }}>Sources</h2>
      <ul>
        <li>National Literacy Trust - <a href="https://literacytrust.org.uk/research-services/research-reports/children-and-young-peoples-writing-in-2025/" target="_blank" rel="noopener">Children and young people's writing in 2025</a> (writing enjoyment 26.6%; down 20.2 points since 2010).</li>
        <li>National Literacy Trust - <a href="https://literacytrust.org.uk/news/our-latest-research-reveals-slight-upturn-in-childrens-writing-engagement-after-15-year-low/" target="_blank" rel="noopener">Slight upturn in children's writing engagement after a 15-year low</a> (2026: 28.7% enjoy writing; ~1 in 9 write daily).</li>
        <li>National Literacy Trust - <a href="https://literacytrust.org.uk/research-services/research-reports/children-and-young-peoples-reading-in-2025/" target="_blank" rel="noopener">Children and young people's reading in 2025</a> (reading for pleasure at a 20-year low).</li>
        <li>National Literacy Trust - <a href="https://literacytrust.org.uk/research-services/research-reports/mental-wellbeing-reading-and-writing/" target="_blank" rel="noopener">Mental wellbeing, reading and writing</a> (most-engaged children ~3&times; more likely to report high wellbeing).</li>
        <li>Department for Education - <a href="https://www.gov.uk/government/publications/the-writing-framework" target="_blank" rel="noopener">The writing framework</a> (July 2025).</li>
      </ul>
      <p className="muted" style={{ fontSize: '.9rem' }}>Figures are from the National Literacy Trust's Annual Literacy Survey and related reports, and the DfE Writing Framework. We re-check them as each year's data is published.</p>
    </PageShell>
  );
}

createRoot(document.getElementById('root')).render(<Why />);
