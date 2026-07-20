/* Story Blocks - Schools giving page */
import './lib/react-global.js';
import './lib/image-slot.js';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { asset, CHAR_BASE } from './lib/core.js';
import { SiteHeader, SiteFooter, SectionHead, Reveal } from './sections.jsx';
import { sendForm, Honeypot, FormError } from './lib/form-submit.jsx';

const SchoolsDS = window.StoryBlocksJournalDesignSystem_239fa7;
const { Button: SchButton, Card: SchCard, Badge: SchBadge, Input: SchInput, Select: SchSelect } = SchoolsDS;

/* ---------------- Hero ---------------- */
function SchoolsHero() {
  return (
    <section style={{ position: 'relative', overflow: 'hidden', background: 'var(--sb-wash-green)', borderBottom: '3px solid var(--sb-ink)' }}>
      <div className="sb-wrap sb-schools-hero" style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1.15fr) minmax(0,1fr)', gap: 56, alignItems: 'center', padding: '64px 24px 72px' }}>
        <div>
          <div className="sb-marker" style={{ fontSize: '1.5rem', color: 'var(--sb-blue)' }}>Blocks Publishing gives back</div>
          <h1 className="sb-display" style={{ fontSize: 'clamp(2.4rem, 4.8vw, 3.6rem)', lineHeight: 1.04, marginTop: 8 }}>We're giving journals to schools across the UK.</h1>
          <p style={{ marginTop: 18, fontSize: '1.2rem', lineHeight: 1.55, maxWidth: 540 }}>
            Story Blocks began as a way to get one child writing at a kitchen table. Now, for every journal
            that finds a home, we're helping more find their way into classrooms - free boxes of journals,
            stickers and reward charts, sent to schools where they'll be used and loved.
          </p>
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginTop: 26 }}>
            <SchButton as="a" href="#nominate" size="lg" iconRight="→">Nominate your school</SchButton>
            <SchButton as="a" href="#how" size="lg" variant="white">How it works</SchButton>
          </div>
        </div>
        <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
          <div className="snap" style={{ transform: 'rotate(-2.5deg)', width: 'min(400px, 100%)' }}>
            <image-slot id="schools-hero" src="/assets/placeholders/photo.svg" style={{ width: '100%', height: '280px', display: 'block' }} shape="rounded" radius="8"
              placeholder="Drop a classroom photo"></image-slot>
            <figcaption className="sb-marker">Journals arriving at a school near you…</figcaption>
          </div>
          <img className="sb-float sb-deco" src={asset(CHAR_BASE + '/SB47.png')} alt="" style={{ position: 'absolute', width: 110, right: -18, bottom: -26, ['--r']: '-6deg', pointerEvents: 'none' }} />
        </div>
      </div>
    </section>
  );
}

/* ---------------- The story ---------------- */
function SchoolsStory() {
  return (
    <section style={{ padding: 'var(--sec-pad, 72px) 0' }}>
      <div className="sb-wrap sb-story" style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)', gap: 56, alignItems: 'center' }}>
        <div>
          <SectionHead align="left" kicker="Why we're doing this" title="Every child deserves a spark"
            sub="" />
          <div style={{ display: 'grid', gap: 16, marginTop: 18, fontSize: '1.08rem', lineHeight: 1.6 }}>
            <p>
              Ten minutes of storytelling a day changes how a child feels about writing. But the journals,
              like all lovely things, cost money - and school budgets are stretched thin.
            </p>
            <p>
              So we're doing the simple thing: <strong>printing extra copies and giving them away.</strong> Real
              hardback journals - the same ones on this site, stickers and all - boxed up and posted to
              schools across the UK, for classrooms, libraries and writing clubs.
            </p>
            <p>
              Schools don't apply. <strong>People nominate them</strong> - a parent, a teacher, a neighbour,
              anyone who knows a school that would put a box of story sparks to good use.
            </p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 24 }}>
            <img src={asset('assets/made-in-britain.png')} alt="Made in Britain" style={{ height: 46, width: 'auto' }} />
            <span style={{ fontWeight: 700, color: 'var(--sb-muted)', fontSize: '.95rem' }}>Printed and bound in Britain, given to British schools.</span>
          </div>
        </div>
        <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
          <img src={asset('assets/storyblocks-book.png')} alt="The Story Blocks Journal"
            style={{ width: 'min(300px, 80%)', borderRadius: 10, border: '3px solid var(--sb-ink)', boxShadow: 'var(--shadow-pop-lg)', transform: 'rotate(2deg)' }} />
          <img className="sb-float" src={asset(CHAR_BASE + '/SB16.png')} alt="" style={{ position: 'absolute', width: 120, left: '8%', bottom: -30, ['--r']: '5deg', pointerEvents: 'none' }} />
        </div>
      </div>
    </section>
  );
}

/* ---------------- Photo wall ---------------- */
function PhotoWall() {
  const slots = [
    { id: 'schools-photo-1', tilt: -2, caption: 'The first boxes, packed by hand' },
    { id: 'schools-photo-2', tilt: 1.5, caption: 'Story time in class' },
    { id: 'schools-photo-3', tilt: -1, caption: 'A full shelf of sparks' },
  ];
  return (
    <section style={{ background: 'var(--sb-wash-sky)', borderTop: '3px solid var(--sb-ink)', borderBottom: '3px solid var(--sb-ink)', padding: 'var(--sec-pad, 72px) 0' }}>
      <div className="sb-wrap">
        <SectionHead kicker="From the classrooms" title="Photos from the road"
          sub="We're just getting started - more photos land here as more boxes do." />
        <div className="sb-snaps" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0,1fr))', gap: 28, marginTop: 44 }}>
          {slots.map((s) => (
            <figure key={s.id} className="snap" style={{ margin: 0, transform: `rotate(${s.tilt}deg)` }}>
              <image-slot id={s.id} src="/assets/placeholders/photo.svg" style={{ width: '100%', height: '230px', display: 'block' }} shape="rounded" radius="8"
                placeholder="Photo coming soon"></image-slot>
              <figcaption>{s.caption}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- How nomination works ---------------- */
function HowToNominate() {
  const steps = [
    { n: '01', char: 'SB10', tint: 'var(--sb-wash-lemon)', title: 'Tell us about a school', body: 'Any UK school - your child\u2019s, the one you teach at, the one at the end of your road. It takes a minute, and anyone can nominate.' },
    { n: '02', char: 'SB33', tint: 'var(--sb-wash-pink)', title: 'We add it to the list', body: 'Each term we pick schools from the nominations and get boxes ready. We spread them around the country, so every corner gets its share.' },
    { n: '03', char: 'SB44', tint: 'var(--sb-wash-green)', title: 'A box arrives at reception', body: 'Journals, sticker sheets and reward charts - enough for a class to get scribbling. We\u2019ll email you when your school\u2019s box ships.' },
  ];
  return (
    <section id="how" style={{ padding: 'var(--sec-pad, 72px) 0' }}>
      <div className="sb-wrap">
        <SectionHead kicker="How it works" title="Nominating takes a minute"
          sub="No forms for the school, no catch, no cost. You point - we post." />
        <div className="sb-steps" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0,1fr))', gap: 24, marginTop: 44 }}>
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 120}>
              <div style={{ background: s.tint, border: '3px solid var(--sb-ink)', borderRadius: 22, boxShadow: 'var(--shadow-pop)', padding: '26px 24px', height: '100%', position: 'relative' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span className="sb-display" style={{ fontSize: '2rem', opacity: .35 }}>{s.n}</span>
                  <img src={asset(CHAR_BASE + '/' + s.char + '.png')} alt="" style={{ width: 72 }} />
                </div>
                <h3 className="sb-display" style={{ fontSize: '1.35rem', marginTop: 10 }}>{s.title}</h3>
                <p style={{ marginTop: 10, lineHeight: 1.55 }}>{s.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Nomination form ---------------- */
const CONNECTIONS = ['Parent or carer', 'Teacher or staff', 'Governor', 'Pupil', 'Neighbour or friend', 'Other'];

function NominateForm() {
  const [sent, setSent] = React.useState(false);
  const [school, setSchool] = React.useState('');
  const [town, setTown] = React.useState('');
  const [connection, setConnection] = React.useState(CONNECTIONS[0]);
  const [email, setEmail] = React.useState('');
  const [company, setCompany] = React.useState(''); // honeypot
  const [errors, setErrors] = React.useState({});
  const [busy, setBusy] = React.useState(false);
  const [sendError, setSendError] = React.useState('');

  const submit = async () => {
    const e = {};
    if (!school.trim()) e.school = 'Please tell us the school\u2019s name';
    if (!town.trim()) e.town = 'Please add a town or postcode';
    if (!/^\S+@\S+\.\S+$/.test(email)) e.email = 'We need an email to tell you when the box ships';
    setErrors(e);
    if (Object.keys(e).length) return;

    setBusy(true);
    setSendError('');
    const result = await sendForm('schools', { school, town, connection, email, company });
    setBusy(false);
    if (result.ok) setSent(true);
    else setSendError(result.error);
  };

  return (
    <section id="nominate" style={{ background: 'var(--sb-wash-lemon)', borderTop: '3px solid var(--sb-ink)', padding: 'var(--sec-pad, 72px) 0 84px' }}>
      <div className="sb-wrap sb-nominate" style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1.1fr)', gap: 56, alignItems: 'center' }}>
        <div>
          <SectionHead align="left" kicker="Nominate a school" title="Know a school that needs a box of sparks?"
            sub="" />
          <p style={{ marginTop: 16, fontSize: '1.1rem', lineHeight: 1.6, maxWidth: 460 }}>
            Tell us who they are and we'll do the rest. We read every nomination, and the more we grow,
            the more boxes we send.
          </p>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 0, marginTop: 26 }}>
            <img className="sb-float" src={asset(CHAR_BASE + '/SB50.png')} alt="" style={{ width: 130, ['--r']: '-3deg' }} />
            <span className="sb-marker" style={{ background: 'var(--sb-paper)', border: '3px solid var(--sb-ink)', borderRadius: 999, padding: '8px 18px', fontSize: '1.15rem', transform: 'rotate(-2deg)', boxShadow: 'var(--shadow-pop-sm)', marginBottom: 26 }}>Go on - it takes a minute!</span>
          </div>
        </div>

        <div style={{ background: 'var(--sb-paper)', border: '4px solid var(--sb-ink)', borderRadius: 26, boxShadow: 'var(--shadow-pop-lg)', padding: 28 }}>
          {sent ? (
            <div style={{ textAlign: 'center', padding: '26px 10px' }}>
              <img src={asset(CHAR_BASE + '/SB44.png')} alt="" style={{ width: 130 }} />
              <h3 className="sb-display" style={{ fontSize: '1.7rem', marginTop: 14 }}>Nomination received!</h3>
              <p style={{ marginTop: 10, lineHeight: 1.55 }}>
                Thank you - <strong>{school}</strong> is on the list. We'll email you the moment their box is on its way.
              </p>
              <div style={{ marginTop: 20 }}>
                <SchButton variant="white" size="sm" onClick={() => { setSent(false); setSchool(''); setTown(''); setEmail(''); }}>Nominate another school</SchButton>
              </div>
            </div>
          ) : (
            <div style={{ display: 'grid', gap: 16 }}>
              <SchInput label="School name" placeholder="e.g. Hillside Primary School" value={school}
                onChange={(e) => setSchool(e.target.value)} error={errors.school} />
              <SchInput label="Town or postcode" placeholder="e.g. Whitstable, or CT5" value={town}
                onChange={(e) => setTown(e.target.value)} error={errors.town} />
              <SchSelect label="Your connection to the school" options={CONNECTIONS}
                value={connection} onChange={(e) => setConnection(e.target.value)} />
              <SchInput label="Your email" type="email" placeholder="So we can tell you when the box ships" value={email}
                onChange={(e) => setEmail(e.target.value)} error={errors.email} />
              <Honeypot value={company} onChange={(e) => setCompany(e.target.value)} />
              <SchButton size="lg" block iconRight={busy ? null : '→'} onClick={submit} disabled={busy}>
                {busy ? 'Sending…' : 'Nominate this school'}
              </SchButton>
              <FormError>{sendError}</FormError>
              <p style={{ fontSize: '.88rem', color: 'var(--sb-muted)', fontWeight: 600, textAlign: 'center' }}>
                We only use your email to update you about this nomination.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/* ---------------- App ---------------- */
function SchoolsApp() {
  return (
    <React.Fragment>
      <SiteHeader active="schools" />
      <main>
        <SchoolsHero />
        <SchoolsStory />
        <PhotoWall />
        <HowToNominate />
        <NominateForm />
      </main>
      <SiteFooter />
    </React.Fragment>
  );
}

createRoot(document.getElementById('root')).render(<SchoolsApp />);
